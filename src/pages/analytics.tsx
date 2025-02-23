
import { useState } from "react";
import { Shell } from "@/components/shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  HeatMapGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Données simulées pour les graphiques
const mockEngagementData = [
  { date: "Lun", likes: 120, comments: 20, engagement: 15 },
  { date: "Mar", likes: 150, comments: 25, engagement: 18 },
  { date: "Mer", likes: 180, comments: 30, engagement: 22 },
  { date: "Jeu", likes: 200, comments: 35, engagement: 25 },
  { date: "Ven", likes: 250, comments: 40, engagement: 30 },
  { date: "Sam", likes: 220, comments: 38, engagement: 28 },
  { date: "Dim", likes: 190, comments: 32, engagement: 24 },
];

const mockInsights = [
  "📈 Les posts du lundi matin ont +30% d'engagement",
  "🎯 Les posts de type storytelling performent mieux",
  "⏰ La meilleure heure de publication est 18h",
];

type Period = "7j" | "30j" | "3m";

export default function Analytics() {
  const [period, setPeriod] = useState<Period>("7j");
  const [postType, setPostType] = useState<string>("all");

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analyse & Statistiques</h1>
          <p className="text-muted-foreground mt-2">
            Visualisez les performances de vos posts et obtenez des insights.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label>📅 Période</Label>
            <RadioGroup
              defaultValue={period}
              onValueChange={(v) => setPeriod(v as Period)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="7j" id="7j" />
                <Label htmlFor="7j">7 jours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30j" id="30j" />
                <Label htmlFor="30j">30 jours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3m" id="3m" />
                <Label htmlFor="3m">3 mois</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>🎯 Type de post</Label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tous les types" />
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

        {/* Graphiques */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Graphique des likes */}
          <Card>
            <CardHeader>
              <CardTitle>👍 Évolution des likes</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Graphique des commentaires */}
          <Card>
            <CardHeader>
              <CardTitle>💬 Évolution des commentaires</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="comments"
                    stroke="#16a34a"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Taux d'engagement */}
          <Card>
            <CardHeader>
              <CardTitle>🔥 Taux d'engagement</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#dc2626"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 rounded-lg bg-muted"
                  >
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
}
