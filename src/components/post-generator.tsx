
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { PostType } from "@/types/post";
import { Sparkles } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type GenerationMode = "manual" | "automatic";

export function PostGenerator() {
  const [type, setType] = useState<PostType>("storytelling");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState<GenerationMode>("manual");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    
    setIsGenerating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Vous devez être connecté pour générer un post");
        return;
      }

      const { data, error } = await supabase.functions.invoke('generate-post', {
        body: {
          subject,
          type,
          userId: user.id
        },
      });

      if (error) throw error;

      const post = data.post;
      setGeneratedContent(`${post.hook}\n\n${post.body}`);
      toast.success("Post généré avec succès !");
    } catch (error) {
      console.error('Error generating post:', error);
      toast.error("Erreur lors de la génération du post");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Formulaire de génération */}
      <Card>
        <CardHeader>
          <CardTitle>Générer un nouveau post</CardTitle>
          <CardDescription>
            Entrez votre sujet et configurez les options de génération
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>📜 Sujet du post</Label>
            <Textarea
              placeholder="Entrez votre sujet ici..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label>📌 Type de post</Label>
            <Select defaultValue={type} onValueChange={(v) => setType(v as PostType)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="storytelling">📖 Storytelling</SelectItem>
                <SelectItem value="reflection">🤔 Réflexion</SelectItem>
                <SelectItem value="thread">🧵 Thread</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>🔄 Mode de génération</Label>
            <RadioGroup
              defaultValue={mode}
              onValueChange={(v) => setMode(v as GenerationMode)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual">Manuel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" />
                <Label htmlFor="automatic">Automatique</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!subject.trim() || isGenerating}
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? "Génération en cours..." : "🚀 Générer le post"}
          </Button>
        </CardContent>
      </Card>

      {/* Aperçu du post généré */}
      <Card className={cn(
        "transition-opacity duration-200",
        !generatedContent && "opacity-50"
      )}>
        <CardHeader>
          <CardTitle>Aperçu du post</CardTitle>
          <CardDescription>
            Prévisualisez votre post avant de le valider
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedContent ? (
            <div className="whitespace-pre-wrap rounded-lg bg-gray-50 p-4 font-medium">
              {generatedContent}
            </div>
          ) : (
            <div className="text-center text-muted-foreground p-4">
              Le contenu généré apparaîtra ici...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
