
import { Shell } from "@/components/shell";
import { Post, PostType } from "@/types/post";
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Mail } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Données de test étendues
const mockPosts: Post[] = [
  {
    id: "1",
    hook: "J'étais en crise...",
    content: "et voici comment j'ai tout surmonté pour réussir",
    type: "storytelling",
    status: "scheduled",
    scheduledFor: new Date(2025, 1, 20, 18, 0),
    likes: 150,
    comments: 25,
    engagement: 185,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    hook: "Pourquoi l'échec?",
    content: "Sans échec, pas de succès. Voici pourquoi...",
    type: "reflection",
    status: "draft",
    likes: 75,
    comments: 10,
    engagement: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Posts() {
  const [posts] = useState<Post[]>(mockPosts);
  const [typeFilter, setTypeFilter] = useState<PostType | "all">("all");

  const handleEdit = (post: Post) => {
    console.log("Édition du post:", post);
  };

  const handlePreview = (post: Post) => {
    console.log("Aperçu du post:", post);
  };

  const handleEmailPreview = (post: Post) => {
    console.log("Envoi par email:", post);
  };

  const filteredPosts = typeFilter === "all" 
    ? posts
    : posts.filter(post => post.type === typeFilter);

  return (
    <Shell>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mes Posts</h1>
            <p className="text-muted-foreground mt-2">
              Gérez et organisez vos posts Facebook.
            </p>
          </div>

          {/* Filtres */}
          <div className="flex items-center gap-4">
            <Select 
              value={typeFilter} 
              onValueChange={(value) => setTypeFilter(value as PostType | "all")}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="storytelling">📖 Storytelling</SelectItem>
                <SelectItem value="reflection">🤔 Réflexion</SelectItem>
                <SelectItem value="thread">🧵 Thread</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">📅 Date Publication</TableHead>
                <TableHead className="w-[130px]">🎯 Type</TableHead>
                <TableHead>🎤 Hook & Corps</TableHead>
                <TableHead className="w-[100px] text-right">👍 Likes</TableHead>
                <TableHead className="w-[100px] text-right">💬 Com</TableHead>
                <TableHead className="w-[100px] text-right">🔥 Eng%</TableHead>
                <TableHead className="w-[150px] text-right">🛠️ Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    {post.scheduledFor ? (
                      format(post.scheduledFor, "dd/MM/yy HH'h'")
                    ) : (
                      "Non planifié"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {post.type === "storytelling" && "📖 "}
                      {post.type === "reflection" && "🤔 "}
                      {post.type === "thread" && "🧵 "}
                      {post.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{post.hook}</div>
                      <div className="text-muted-foreground line-clamp-1 text-sm">
                        {post.content}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{post.likes}</TableCell>
                  <TableCell className="text-right font-medium">{post.comments}</TableCell>
                  <TableCell className="text-right font-medium">
                    {post.engagement}%
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(post)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEmailPreview(post)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Shell>
  );
}
