
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileUp } from "lucide-react";
import { Textarea } from "./ui/textarea";

export interface WritingStyle {
  tone: string[];
  structure: string[];
  expressions: string[];
  emojiUsage: "high" | "medium" | "low";
}

export function StyleAnalyzer() {
  const [posts, setPosts] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      // TODO: Implement AI analysis
      console.log("Analyzing posts:", posts);
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileUp className="h-4 w-4" />
          Import Posts
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Import & Analyze Writing Style</DialogTitle>
          <DialogDescription>
            Paste your previous Facebook posts here. The AI will analyze your writing style to generate content that matches your tone and structure.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Paste your previous Facebook posts here..."
            value={posts}
            onChange={(e) => setPosts(e.target.value)}
            className="min-h-[300px]"
          />
          <Button 
            onClick={handleAnalyze}
            disabled={!posts.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Writing Style"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
