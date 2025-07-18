
import { Shell } from "@/components/shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type StyleProfile = {
  tone?: string[];
  structure?: string[];
  expressions?: string[];
  emojiUsage?: "none" | "minimal" | "moderate" | "heavy";
};

type Settings = {
  storytelling_schedule?: string;
  reflection_schedule?: string;
  thread_schedule?: string;
  auto_send_email?: boolean;
  style_profile?: StyleProfile;
};

// Helper function to validate StyleProfile shape
const isStyleProfile = (profile: any): profile is StyleProfile => {
  return (
    profile &&
    typeof profile === 'object' &&
    (!profile.tone || Array.isArray(profile.tone)) &&
    (!profile.structure || Array.isArray(profile.structure)) &&
    (!profile.expressions || Array.isArray(profile.expressions)) &&
    (!profile.emojiUsage || ['none', 'minimal', 'moderate', 'heavy'].includes(profile.emojiUsage))
  );
};

const defaultStyleProfile: StyleProfile = {
  tone: [],
  structure: [],
  expressions: [],
  emojiUsage: "moderate"
};

export default function Settings() {
  const [settings, setSettings] = useState<Settings>({
    storytelling_schedule: "",
    reflection_schedule: "",
    thread_schedule: "",
    auto_send_email: false,
    style_profile: defaultStyleProfile
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour accéder aux paramètres");
        return;
      }

      // Initialize settings if they don't exist
      const { error: initError } = await supabase
        .from('settings')
        .upsert({
          id: user.id,
          storytelling_schedule: "0 9 * * 1,4", // Default: Monday and Thursday at 9am
          reflection_schedule: "0 14 * * 2,5", // Default: Tuesday and Friday at 2pm
          thread_schedule: "0 11 * * 3,6", // Default: Wednesday and Saturday at 11am
          auto_send_email: false
        }, {
          onConflict: 'id'
        });

      if (initError) throw initError;

      // Initialize profile if it doesn't exist
      const { error: profileInitError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          style_profile: defaultStyleProfile
        }, {
          onConflict: 'id'
        });

      if (profileInitError) throw profileInitError;

      // Now load the settings
      const { data: userSettings, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .eq('id', user.id)
        .single();

      if (settingsError) throw settingsError;

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('style_profile')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      const styleProfile = isStyleProfile(profile?.style_profile) 
        ? profile.style_profile 
        : defaultStyleProfile;

      setSettings({
        ...userSettings,
        style_profile: styleProfile
      });

      toast.success("Paramètres chargés avec succès");
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error("Erreur lors du chargement des paramètres");
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Vous devez être connecté pour sauvegarder les paramètres");
        return;
      }

      // Update settings
      const { error: settingsError } = await supabase
        .from('settings')
        .upsert({
          id: user.id,
          storytelling_schedule: settings.storytelling_schedule,
          reflection_schedule: settings.reflection_schedule,
          thread_schedule: settings.thread_schedule,
          auto_send_email: settings.auto_send_email,
        });

      if (settingsError) throw settingsError;

      // Update style profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          style_profile: settings.style_profile,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast.success("Paramètres sauvegardés avec succès");
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Erreur lors de la sauvegarde des paramètres");
    } finally {
      setLoading(false);
    }
  };

  const updateStyleProfile = (field: keyof StyleProfile, value: any) => {
    setSettings(prev => ({
      ...prev,
      style_profile: {
        ...prev.style_profile,
        [field]: value
      }
    }));
  };

  return (
    <Shell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground mt-2">
            Configurez vos préférences de génération et de publication.
          </p>
        </div>
        
        <div className="grid gap-6">
          {/* Style Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Style d'écriture</CardTitle>
              <CardDescription>
                Personnalisez votre style d'écriture pour la génération de contenu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ton</Label>
                <Textarea 
                  placeholder="Professionnel, Amical, Inspirant..."
                  value={settings.style_profile?.tone?.join(', ') || ''}
                  onChange={(e) => updateStyleProfile('tone', e.target.value.split(',').map(t => t.trim()))}
                />
              </div>

              <div className="space-y-2">
                <Label>Structure préférée</Label>
                <Textarea 
                  placeholder="Introduction, Corps, Conclusion..."
                  value={settings.style_profile?.structure?.join(', ') || ''}
                  onChange={(e) => updateStyleProfile('structure', e.target.value.split(',').map(s => s.trim()))}
                />
              </div>

              <div className="space-y-2">
                <Label>Expressions favorites</Label>
                <Textarea 
                  placeholder="Vos expressions préférées..."
                  value={settings.style_profile?.expressions?.join(', ') || ''}
                  onChange={(e) => updateStyleProfile('expressions', e.target.value.split(',').map(e => e.trim()))}
                />
              </div>

              <div className="space-y-2">
                <Label>Utilisation des émojis</Label>
                <Select 
                  value={settings.style_profile?.emojiUsage || 'moderate'}
                  onValueChange={(value) => updateStyleProfile('emojiUsage', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucun</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="moderate">Modéré</SelectItem>
                    <SelectItem value="heavy">Fréquent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Planning de publication</CardTitle>
              <CardDescription>
                Définissez vos horaires de publication par type de contenu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Storytelling</Label>
                <Input 
                  type="text"
                  placeholder="0 9 * * 1,4 (Lundi et Jeudi à 9h)"
                  value={settings.storytelling_schedule || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, storytelling_schedule: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Réflexion</Label>
                <Input 
                  type="text"
                  placeholder="0 14 * * 2,5 (Mardi et Vendredi à 14h)"
                  value={settings.reflection_schedule || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, reflection_schedule: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label>Thread</Label>
                <Input 
                  type="text"
                  placeholder="0 11 * * 3,6 (Mercredi et Samedi à 11h)"
                  value={settings.thread_schedule || ''}
                  onChange={(e) => setSettings(prev => ({ ...prev, thread_schedule: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Email Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Préférences d'email</CardTitle>
              <CardDescription>
                Configurez vos préférences de notification par email
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center space-x-2">
              <Switch 
                id="auto-email"
                checked={settings.auto_send_email}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, auto_send_email: checked }))}
              />
              <Label htmlFor="auto-email">Envoyer automatiquement les posts générés par email</Label>
            </CardContent>
          </Card>

          <Button 
            onClick={saveSettings} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Sauvegarde en cours..." : "💾 Sauvegarder les paramètres"}
          </Button>
        </div>
      </div>
    </Shell>
  );
}
