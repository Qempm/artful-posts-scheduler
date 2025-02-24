
import { Shell } from "@/components/shell";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface Email {
  id: string;
  date: string;
  subject: string;
  status: "confirmed" | "pending" | "modified";
}

const mockEmails: Email[] = [
  {
    id: "1",
    date: "19/02/25",
    subject: "Storytelling",
    status: "confirmed",
  },
  {
    id: "2",
    date: "15/02/25",
    subject: "Réflexion",
    status: "pending",
  },
];

const getStatusEmoji = (status: Email["status"]) => {
  switch (status) {
    case "confirmed":
      return "✅";
    case "pending":
      return "⏳";
    case "modified":
      return "📝";
  }
};

const getStatusText = (status: Email["status"]) => {
  switch (status) {
    case "confirmed":
      return "Confirmé";
    case "pending":
      return "En attente";
    case "modified":
      return "Modifié";
  }
};

export default function Emails() {
  const handleResend = (id: string) => {
    // TODO: Implement email resend logic
    console.log("Resending email:", id);
    toast.success("Email programmé pour renvoi");
  };

  const handleToggleAutoSend = (enabled: boolean) => {
    // TODO: Implement auto-send toggle logic
    console.log("Auto-send enabled:", enabled);
    toast.success(
      enabled 
        ? "Envoi automatique activé" 
        : "Envoi automatique désactivé"
    );
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emails & Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Gérez vos notifications et validations de posts.
          </p>
        </div>

        {/* Configuration de l'envoi automatique */}
        <Card>
          <CardHeader>
            <CardTitle>Configuration des emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-send">Envoi automatique des posts</Label>
              <Switch
                id="auto-send"
                onCheckedChange={handleToggleAutoSend}
                defaultChecked
              />
            </div>
          </CardContent>
        </Card>

        {/* Tableau des emails */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des emails</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>📅 Date Envoi</TableHead>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEmails.map((email) => (
                  <TableRow key={email.id}>
                    <TableCell>{email.date}</TableCell>
                    <TableCell>{email.subject}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        {getStatusEmoji(email.status)} {getStatusText(email.status)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResend(email.id)}
                      >
                        🔄 Re-envoyer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Shell>
  );
}
