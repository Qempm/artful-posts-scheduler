
import { Shell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Calendar, BarChart3, Mail, CheckCircle, PlayCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for testimonials
const testimonials = [
  {
    name: "Julie M.",
    role: "Community Manager",
    content: "Avant ContentFlow, je passais des heures à rédiger mes posts. Aujourd'hui, je publie plus, sans effort, et mon engagement a explosé !",
    rating: 5
  },
  {
    name: "Thomas R.",
    role: "Entrepreneur",
    content: "Un outil indispensable pour ma présence sur Facebook. La génération IA est bluffante de naturel !",
    rating: 5
  },
  {
    name: "Sarah L.",
    role: "Marketing Manager",
    content: "La planification automatique m'a fait gagner un temps précieux. Je recommande à 100% !",
    rating: 5
  }
];

const features = [
  {
    icon: Zap,
    title: "Génération IA",
    description: "L'IA rédige pour toi des posts Facebook engageants basés sur ton style"
  },
  {
    icon: Calendar,
    title: "Planification Automatique",
    description: "Programme tes posts selon les jours et heures les plus performants"
  },
  {
    icon: BarChart3,
    title: "Analyse des Performances",
    description: "Suis tes likes, commentaires et engagement en temps réel"
  },
  {
    icon: Mail,
    title: "Envoi par Email",
    description: "Reçois tes posts générés par email avant publication"
  }
];

const pricingPlans = [
  {
    name: "Gratuit",
    price: "0€",
    features: ["Génération IA limitée", "3 posts par mois", "Support communautaire"],
    cta: "S'inscrire",
    variant: "outline" as const
  },
  {
    name: "Pro",
    price: "29€",
    features: ["Accès illimité", "Planification automatique", "Analyse complète", "Support prioritaire"],
    cta: "Essai 7 Jours",
    variant: "default" as const
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    features: ["Plan personnalisé", "Support VIP", "API & Intégrations", "Formation dédiée"],
    cta: "Contactez-nous",
    variant: "secondary" as const
  }
];

const faqs = [
  {
    question: "L'IA comprend-elle vraiment mon style ?",
    answer: "Oui, elle est entraînée sur tes anciens posts."
  },
  {
    question: "Puis-je modifier un post avant de le publier ?",
    answer: "Bien sûr, tu peux tout ajuster."
  },
  {
    question: "L'essai gratuit est-il vraiment sans engagement ?",
    answer: "Oui, aucun paiement demandé."
  }
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                🚀 Génère, Planifie et Analyse tes Posts Facebook en 1 Clic
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                L'IA rédige pour toi des posts engageants en respectant ton style unique. Plus de temps perdu, plus d'engagement !
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/signup">Essai Gratuit 🚀</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <PlayCircle className="mr-2" />
                  Voir une Démo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="glass-panel p-6 rounded-xl">
                <img
                  src="/placeholder.svg"
                  alt="Interface ContentFlow"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Pourquoi ContentFlow ?</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">🌪️ Le problème :</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-red-500">
                      <span>❌</span> Créer du contenu engageant prend trop de temps
                    </li>
                    <li className="flex items-center gap-2 text-red-500">
                      <span>❌</span> Difficile de trouver des idées et d'écrire efficacement
                    </li>
                    <li className="flex items-center gap-2 text-red-500">
                      <span>❌</span> Aucune stratégie claire pour optimiser ses publications
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">🚀 La solution :</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" /> Génération automatique de posts en un clic
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" /> Planification intelligente basée sur l'engagement
                    </li>
                    <li className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-5 h-5" /> Analyse des performances pour optimiser sa stratégie
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-2xl font-bold">⏳ 85%</h4>
                <p className="text-muted-foreground">des créateurs passent plus de 5h par semaine à rédiger leurs posts.</p>
              </div>
              <div className="glass-panel p-6 rounded-xl">
                <h4 className="text-2xl font-bold">📈 40%</h4>
                <p className="text-muted-foreground">d'augmentation de l'engagement avec les publications optimisées par IA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités Clés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Voir ContentFlow en action</h2>
          <div className="max-w-4xl mx-auto glass-panel p-6 rounded-xl">
            <div className="aspect-video rounded-lg overflow-hidden bg-black/10">
              <img
                src="/placeholder.svg"
                alt="Vidéo démonstration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xl mt-8 mb-6">
            Créer des posts engageants en 1 clic, c'est possible. Teste ContentFlow dès maintenant !
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">Essayer Gratuitement</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce qu'en disent nos utilisateurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4">{testimonial.content}</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Des tarifs adaptés à tes besoins</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.variant} asChild>
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-6">
            Sans engagement. Résiliation en un clic.
          </p>
        </div>
      </section>

      {/* CTA & FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Commence dès maintenant, c'est gratuit !</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Créer mon compte</h3>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Nom" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" />
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link to="/signup">🚀 Créer mon compte</Link>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
