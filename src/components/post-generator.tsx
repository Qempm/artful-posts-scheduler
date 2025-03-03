
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
import { Sparkles, Save, Zap, BarChart3, Rocket, CircuitBoard } from "lucide-react";
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
    <div className="grid gap-8 lg:grid-cols-2 animate-fade-in">
      {/* Formulaire de génération avec design futuriste */}
      <Card className="backdrop-blur-md bg-gradient-to-br from-primary/10 to-purple-500/20 border border-white/10 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/5 z-0"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center mb-2">
            <CircuitBoard className="w-5 h-5 mr-2 text-purple-400" />
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Générer un post futuriste</CardTitle>
          </div>
          <CardDescription className="text-slate-200">
            Créez du contenu engageant pour captiver votre audience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 relative z-10">
          <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
            <Label className="text-blue-300 flex items-center"><Rocket className="w-4 h-4 mr-2" /> Sujet du post</Label>
            <Textarea
              placeholder="Entrez votre sujet ici..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[100px] bg-black/20 border-purple-500/30 focus:border-purple-500 placeholder:text-slate-400 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
            <Label className="text-blue-300 flex items-center"><BarChart3 className="w-4 h-4 mr-2" /> Type de post</Label>
            <Select defaultValue={type} onValueChange={(v) => setType(v as PostType)}>
              <SelectTrigger className="bg-black/20 border-purple-500/30 focus:border-purple-500">
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-purple-500/50 text-slate-200">
                <SelectItem value="storytelling" className="focus:bg-purple-800/30">📖 Storytelling</SelectItem>
                <SelectItem value="reflection" className="focus:bg-purple-800/30">🤔 Réflexion</SelectItem>
                <SelectItem value="thread" className="focus:bg-purple-800/30">🧵 Thread</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
            <Label className="text-blue-300 flex items-center"><Zap className="w-4 h-4 mr-2" /> Mode de génération</Label>
            <RadioGroup
              defaultValue={mode}
              onValueChange={(v) => setMode(v as GenerationMode)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" className="border-purple-500 text-purple-500" />
                <Label htmlFor="manual" className="text-slate-200">Manuel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="automatic" id="automatic" className="border-purple-500 text-purple-500" />
                <Label htmlFor="automatic" className="text-slate-200">Automatique</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            onClick={handleGenerate}
            disabled={!subject.trim() || isGenerating}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-blue-400/20 transform skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Sparkles className="w-4 h-4 mr-2" />
            {isGenerating ? "Génération en cours..." : "🚀 Générer le post"}
          </Button>
        </CardContent>
      </Card>

      {/* Aperçu et édition du post généré */}
      <Card className={cn(
        "backdrop-blur-md bg-gradient-to-br from-purple-500/10 to-blue-500/20 border border-white/10 shadow-lg overflow-hidden transition-all duration-300",
        !generatedContent ? "opacity-50" : "opacity-100"
      )}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 z-0"></div>
        <CardHeader className="relative z-10">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 mr-2 text-blue-400" />
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">Édition du post</CardTitle>
          </div>
          <CardDescription className="text-slate-200">
            Personnalisez votre contenu avant de le valider
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 relative z-10">
          <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
            <Label className="text-purple-300 flex items-center"><Rocket className="w-4 h-4 mr-2" /> Accroche</Label>
            <Textarea
              value={editedHook}
              onChange={(e) => setEditedHook(e.target.value)}
              placeholder="L'accroche de votre post..."
              className="min-h-[80px] bg-black/20 border-blue-500/30 focus:border-blue-500 placeholder:text-slate-400 transition-all duration-300"
              disabled={!generatedContent}
            />
          </div>

          <div className="space-y-2 transition-all duration-200 hover:translate-y-[-2px]">
            <Label className="text-purple-300 flex items-center"><BarChart3 className="w-4 h-4 mr-2" /> Contenu</Label>
            <Textarea
              value={editedBody}
              onChange={(e) => setEditedBody(e.target.value)}
              placeholder="Le contenu de votre post..."
              className="min-h-[200px] bg-black/20 border-blue-500/30 focus:border-blue-500 placeholder:text-slate-400 transition-all duration-300"
              disabled={!generatedContent}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={!generatedContent || isSaving}
            className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-purple-400/20 transform skew-x-[-20deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Sauvegarde..." : "💾 Valider le post"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
