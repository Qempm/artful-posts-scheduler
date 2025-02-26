
import { useState } from "react";
import { Shell } from "@/components/shell";
import { PostType } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type WeekDay = "Lundi" | "Mercredi" | "Vendredi";

interface ScheduleSettings {
  type: PostType;
  date: Date | undefined;
  enabled: boolean;
}

const defaultSettings: ScheduleSettings[] = [
  { type: "storytelling", date: undefined, enabled: true },
  { type: "reflection", date: undefined, enabled: true },
  { type: "thread", date: undefined, enabled: true },
];

export default function Scheduling() {
  const [settings, setSettings] = useState<ScheduleSettings[]>(defaultSettings);
  
  const updateSchedule = (type: PostType, date: Date | undefined) => {
    setSettings(prev => 
      prev.map(setting => 
        setting.type === type ? { ...setting, date } : setting
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
            <Card key={setting.type} className="animate-in">
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
                <div className="flex flex-col space-y-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !setting.date && "text-muted-foreground"
                        )}
                        disabled={!setting.enabled}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {setting.date ? (
                          format(setting.date, "PPP", { locale: fr })
                        ) : (
                          <span>Choisir une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={setting.date}
                        onSelect={(date) => updateSchedule(setting.type, date)}
                        disabled={!setting.enabled}
                        initialFocus
                        locale={fr}
                        className="rounded-md border bg-popover text-popover-foreground shadow-md"
                      />
                    </PopoverContent>
                  </Popover>

                  {setting.date && (
                    <p className="text-sm text-muted-foreground">
                      Prochain post programmé pour le {format(setting.date, "PPPP", { locale: fr })}
                    </p>
                  )}
                </div>
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
