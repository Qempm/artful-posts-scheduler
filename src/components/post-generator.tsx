
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PostType } from "@/types/post";
import { Sparkles } from "lucide-react";

export function PostGenerator() {
  const [type, setType] = useState<PostType>("storytelling");
  const [subject, setSubject] = useState("");

  const handleGenerate = async () => {
    // TODO: Implement generation logic
    console.log("Generating post with:", { type, subject });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="glass-panel">
          <Sparkles className="w-4 h-4 mr-2" />
          Generate Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate New Post</DialogTitle>
          <DialogDescription>
            Choose the type of post and enter your subject to generate content.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Post Type</label>
            <Select defaultValue={type} onValueChange={(v) => setType(v as PostType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="storytelling">Storytelling</SelectItem>
                <SelectItem value="reflection">Reflection</SelectItem>
                <SelectItem value="thread">Thread</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <Textarea
              placeholder="Enter your subject here..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <Button onClick={handleGenerate} className="w-full">
          Generate
        </Button>
      </DialogContent>
    </Dialog>
  );
}
