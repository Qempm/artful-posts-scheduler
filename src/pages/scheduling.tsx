
import { useState } from "react";
import { Shell } from "@/components/shell";
import { PostType } from "@/types/post";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type WeekDay = "Lundi" | "Mercredi" | "Vendredi";

interface ScheduleSettings {
  type: PostType;
  day: WeekDay;
  enabled: boolean;
}

const defaultSettings: ScheduleSettings[] = [
  { type: "storytelling", day: "Lundi", enabled: true },
  { type: "reflection", day: "Mercredi", enabled: true },
  { type: "thread", day: "Vendredi", enabled: true },
];

export default function Scheduling() {
  const [settings, setSettings] = useState<ScheduleSettings[]>(defaultSettings);
  
  const updateSchedule = (type: PostType, day: WeekDay) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.type === type ? { ...setting, day } : setting
      )
    );
  };

  const toggleEnabled = (type: PostType) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.type === type ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const saveSettings = () => {
    // TODO: Implement saving to Supabase
    console.log("Saving settings:", settings);
    toast.success("Paramètres de planification enregistrés");
  };

  const getEmojiForType = (type: PostType) => {
    switch(type) {
      case "storytelling": return "📖";
      case "reflection": return "🤔";
      case "thread": return "🧵";
    }
  };

  const days: WeekDay[] = ["Lundi", "Mercredi", "Vendredi"];

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programmation</h1>
          <p className="text-muted-foreground mt-2">
            Planifiez la génération automatique de vos posts.
          </p>
        </div>
        
        <div className="grid gap-6">
          {settings.map((setting) => (
            <Card key={setting.type}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {getEmojiForType(setting.type)}{" "}
                    {setting.type.charAt(0).toUpperCase() + setting.type.slice(1)}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`enable-${setting.type}`}>Activer</Label>
                    <Switch
                      id={`enable-${setting.type}`}
                      checked={setting.enabled}
                      onCheckedChange={() => toggleEnabled(setting.type)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={setting.day}
                  onValueChange={(value: WeekDay) => updateSchedule(setting.type, value)}
                  className="flex gap-4"
                  disabled={!setting.enabled}
                >
                  {days.map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <RadioGroupItem value={day} id={`${setting.type}-${day}`} />
                      <Label htmlFor={`${setting.type}-${day}`}>{day}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <Button 
            onClick={saveSettings} 
            className="w-full md:w-auto"
          >
            💾 Enregistrer les réglages
          </Button>
        </div>
      </div>
    </Shell>
  );
}
