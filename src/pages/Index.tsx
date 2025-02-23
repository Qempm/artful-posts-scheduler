
import { useState } from "react";
import { Post } from "@/types/post";
import { PostCard } from "@/components/post-card";
import { PostGenerator } from "@/components/post-generator";
import { StyleAnalyzer } from "@/components/style-analyzer";

// Mock data for demonstration
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

const Index = () => {
  const [posts] = useState<Post[]>(mockPosts);

  const handleEdit = (post: Post) => {
    console.log("Editing post:", post);
  };

  const handleEmailPreview = (post: Post) => {
    console.log("Sending email preview for:", post);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Content Manager</h1>
            <p className="text-muted-foreground mt-2">
              Generate, schedule and manage your Facebook posts
            </p>
          </div>
          <div className="flex gap-2">
            <StyleAnalyzer />
            <PostGenerator />
          </div>
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
    </div>
  );
}

export default Index;
