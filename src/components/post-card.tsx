
import { Post } from "@/types/post";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit2, Mail } from "lucide-react";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onEmailPreview: (post: Post) => void;
}

export function PostCard({ post, onEdit, onEmailPreview }: PostCardProps) {
  return (
    <Card className="w-full glass-panel animate-in hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <Badge variant="outline" className="w-fit capitalize">
            {post.type}
          </Badge>
          <Badge variant="secondary" className="w-fit capitalize">
            {post.status}
          </Badge>
        </div>
        {post.scheduledFor && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {format(post.scheduledFor, "PPP")}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
          <Edit2 className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEmailPreview(post)}>
          <Mail className="h-4 w-4 mr-2" />
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
