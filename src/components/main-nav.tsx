
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Home, 
  Settings, 
  FilePen, 
  FolderOpen,
  Calendar,
  Mail
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/dashboard",
    description: "Vue d'ensemble de vos posts et statistiques",
  },
  {
    title: "Générer un Post",
    icon: FilePen,
    href: "/generate",
    description: "Créer un nouveau post avec l'IA",
  },
  {
    title: "Mes Posts",
    icon: FolderOpen,
    href: "/posts",
    description: "Gérer et organiser vos posts",
  },
  {
    title: "Analyse",
    icon: BarChart3,
    href: "/analytics",
    description: "Statistiques et performances",
  },
  {
    title: "Programmation",
    icon: Calendar,
    href: "/scheduling",
    description: "Planification automatique des posts",
  },
  {
    title: "Emails",
    icon: Mail,
    href: "/emails",
    description: "Gestion des notifications et validations",
  },
  {
    title: "Paramètres",
    icon: Settings,
    href: "/settings",
    description: "Configuration de votre compte",
  },
];

export function MainNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col space-y-1 w-full">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            )}
          >
            <Icon className="w-4 h-4 mr-2" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
