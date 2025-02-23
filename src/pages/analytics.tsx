
import { Shell } from "@/components/shell";

export default function Analytics() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analyse & Statistiques</h1>
          <p className="text-muted-foreground mt-2">
            Visualisez les performances de vos posts et obtenez des insights.
          </p>
        </div>
        
        {/* TODO: Implement analytics components */}
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Performances à venir</h2>
            <p className="text-muted-foreground">
              Les graphiques et statistiques seront affichés ici.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
