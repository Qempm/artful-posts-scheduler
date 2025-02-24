
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Post } from "@/types/post";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface EditPostDialogProps {
  post: Post;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedPost: Post) => void;
}

export function EditPostDialog({ post, open, onOpenChange, onSave }: EditPostDialogProps) {
  const [hook, setHook] = useState(post.hook);
  const [content, setContent] = useState(post.content);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour modifier un post");
        return;
      }

      const { data, error } = await supabase
        .from('posts')
        .update({ 
          hook,
          body: content
        })
        .eq('id', post.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      onSave(data as Post);
      toast.success("Post mis à jour avec succès");
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error("Erreur lors de la mise à jour du post");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le post</DialogTitle>
          <DialogDescription>
            Modifiez le contenu de votre post. Les modifications seront sauvegardées automatiquement.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Accroche du post..."
              value={hook}
              onChange={(e) => setHook(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Contenu du post..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
