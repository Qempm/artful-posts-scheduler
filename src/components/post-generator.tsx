
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
import { Sparkles, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type GenerationMode = "manual" | "automatic";

export function PostGenerator() {
  const [type, setType] = useState<PostType>("storytelling");
  const [subject, setSubject] = useState("");
  const [mode, setMode] = useState<GenerationMode>("manual");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedHook, setEditedHook] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    
    setIsGenerating(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Vous devez être connecté pour générer un post");
        navigate("/login");
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
      setEditedHook(post.hook);
      setEditedBody(post.body);
      setGeneratedContent(`${post.hook}\n\n${post.body}`);
      toast.success("Post généré avec succès !");
    } catch (error) {
      console.error('Error generating post:', error);
      toast.error("Erreur lors de la génération du post");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!editedHook.trim() || !editedBody.trim()) {
      toast.error("Le contenu du post ne peut pas être vide");
      return;
    }

    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("Vous devez être connecté pour sauvegarder un post");
        navigate("/login");
        return;
      }

      const { error } = await supabase
        .from('posts')
        .insert({
          hook: editedHook,
          body: editedBody,
          type,
          user_id: user.id,
          status: 'draft'
        });

      if (error) throw error;

      toast.success("Post sauvegardé avec succès !");
      navigate("/posts"); // Redirection vers le tableau de bord
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error("Erreur lors de la sauvegarde du post");
    } finally {
      setIsSaving(false);
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
            <Label>📝 Sujet du post</Label>
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

      {/* Aperçu et édition du post généré */}
      <Card className={cn(
        "transition-opacity duration-200",
        !generatedContent && "opacity-50"
      )}>
        <CardHeader>
          <CardTitle>Édition du post</CardTitle>
          <CardDescription>
            Modifiez votre post avant de le valider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>🎯 Accroche</Label>
            <Textarea
              value={editedHook}
              onChange={(e) => setEditedHook(e.target.value)}
              placeholder="L'accroche de votre post..."
              className="min-h-[80px]"
              disabled={!generatedContent}
            />
          </div>

          <div className="space-y-2">
            <Label>📝 Contenu</Label>
            <Textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              placeholder="Le contenu de votre post..."
              className="min-h-[200px]"
              disabled={!generatedContent}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!generatedContent || isSaving}
            className="w-full"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Sauvegarde..." : "💾 Valider le post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
