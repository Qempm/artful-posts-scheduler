
import { Shell } from "@/components/shell";

export default function Settings() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground mt-2">
            Configurez vos préférences de génération et de publication.
          </p>
        </div>
        
        {/* TODO: Implement settings components */}
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Configuration à venir</h2>
            <p className="text-muted-foreground">
              Les paramètres de configuration seront affichés ici.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
