
import { useState } from "react";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";
import { Shell } from "@/components/shell";
import { EditPostDialog } from "@/components/edit-post-dialog";

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: "1",
    hook: "Découvrez comment j'ai surmonté...",
    content: "Sample storytelling post about entrepreneurship...",
    type: "storytelling",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    hook: "La clé du succès réside dans...",
    content: "Sample reflection post about success...",
    type: "reflection",
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const Index = () => {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setEditDialogOpen(true);
  };

  const handleEmailPreview = (post: Post) => {
    console.log("Sending email preview for:", post);
  };

  const handleSavePost = (updatedPost: Post) => {
    setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenue sur votre tableau de bord de gestion de contenu Facebook.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onEmailPreview={handleEmailPreview}
            />
          ))}
        </div>

        {selectedPost && (
          <EditPostDialog
            post={selectedPost}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSave={handleSavePost}
          />
        )}
      </div>
    </Shell>
  );
}

export default Index;
