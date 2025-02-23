
import { Shell } from "@/components/shell";
import { PostGenerator } from "@/components/post-generator";
import { StyleAnalyzer } from "@/components/style-analyzer";

export default function Generate() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Générer un Post</h1>
          <p className="text-muted-foreground mt-2">
            Créez un nouveau post avec l'aide de l'IA.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <StyleAnalyzer />
          <PostGenerator />
        </div>
      </div>
    </Shell>
  );
}
