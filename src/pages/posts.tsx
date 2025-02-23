
import { Shell } from "@/components/shell";
import { PostCard } from "@/components/post-card";
import { useState } from "react";
import { Post } from "@/types/post";

// Utilizing the same mock data for now
const mockPosts: Post[] = [
  {
    id: "1",
    content: "Sample storytelling post about entrepreneurship...",
    type: "storytelling",
    status: "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    content: "Sample reflection post about success...",
    type: "reflection",
    status: "scheduled",
    scheduledFor: new Date(Date.now() + 86400000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Posts() {
  const [posts] = useState<Post[]>(mockPosts);

  const handleEdit = (post: Post) => {
    console.log("Editing post:", post);
  };

  const handleEmailPreview = (post: Post) => {
    console.log("Sending email preview for:", post);
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Posts</h1>
          <p className="text-muted-foreground mt-2">
            Gérez et organisez vos posts Facebook.
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
      </div>
    </Shell>
  );
}
