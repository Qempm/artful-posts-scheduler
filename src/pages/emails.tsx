
import { Shell } from "@/components/shell";

export default function Emails() {
  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emails & Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos notifications et validations de posts.
          </p>
        </div>
        
        {/* TODO: Implement email components */}
        <div className="grid gap-6">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Emails à venir</h2>
            <p className="text-muted-foreground">
              L'historique des emails sera affiché ici.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
}
