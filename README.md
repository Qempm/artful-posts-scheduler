# 📢 **ContentFlow - SaaS d’Automatisation et Analyse de Contenu Facebook**  

**ContentFlow** est une plateforme SaaS qui permet aux créateurs de contenu, entrepreneurs et community managers de **générer, organiser et analyser** automatiquement leurs posts Facebook en fonction de leur style d’écriture personnel. 🚀  

Ce projet utilise **l’IA d’OpenAI (GPT-4)** pour rédiger des posts engageants, un **tableau de bord interactif** pour gérer le contenu et **des statistiques avancées** pour optimiser les performances.  

---

## **🌟 Fonctionnalités Principales**  

### 🔹 **1. Génération Automatique de Posts avec IA (OpenAI)**  
- Création instantanée de posts Facebook basés sur **le style d’écriture de l’utilisateur**  
- Génération de plusieurs formats :  
  - **📖 Storytelling** : Raconter une histoire captivante  
  - **🤔 Réflexion** : Partager une pensée inspirante  
  - **🧵 Thread** : Post principal + plusieurs commentaires pour enrichir le contenu  
- **Optimisation automatique des accroches et structures** pour maximiser l’engagement  

### 🔹 **2. Tableau de Bord de Gestion des Posts**  
- **Stockage et organisation** des posts générés  
- **Édition rapide** : Modifier le **hook (accroche) et le corps** du post en un clic  
- **Statut des posts** : Brouillon, Planifié, Publié  
- **Programmation des posts** selon un calendrier défini  

### 🔹 **3. Analyse des Performances & Stratégie de Contenu**  
- **Graphiques interactifs 📊** : Évolution des likes, commentaires et partages  
- **Heatmap des meilleures heures de publication 🔥**  
- **Classement des posts par engagement** pour identifier les meilleures stratégies  
- **Recommandations intelligentes** pour améliorer les résultats  

### 🔹 **4. Envoi des Posts par Email pour Validation**  
- Chaque post généré est **envoyé par email** avant publication  
- L’utilisateur peut **valider, modifier ou ajuster son post** directement depuis l’email  
- Historique des emails envoyés et suivi des ouvertures  

### 🔹 **5. Automatisation et Programmation des Posts**  
- **Définition de règles automatiques** (ex : Storytelling = lundi, Réflexion = mercredi)  
- **CRON Job** qui génère des posts en fonction des jours programmés  
- Intégration avec **Supabase** pour stocker et suivre les posts automatiquement  

---

## **🛠️ Stack Technologique**  

| Composant | Technologie Utilisée |
|-----------|----------------------|
| **Backend** | Node.js  |
| **Base de Données** | Supabase |
| **IA** | OpenAI API (GPT-4) |
| **Automatisation** | CRON Jobs |
| **Frontend** | React.js / Next.js |
| **Emailing** | Resend / Postmark / Nodemailer |

---

## **📂 Structure du Projet**  

```
📦 contentflow
├── 📁 backend
│   ├── generatePost.js  # Fonction pour générer un post via OpenAI
│   ├── sendEmail.js     # Fonction d'envoi d’email avec Resend/Postmark
│   ├── cronJob.js       # Automatisation des posts programmés
│   └── database.js      # Connexion à Supabase
│
├── 📁 frontend
│   ├── pages
│   │   ├── dashboard.js  # Tableau de bord principal
│   │   ├── generate.js   # Interface de génération de post
│   │   ├── posts.js      # Liste et gestion des posts
│   │   ├── analytics.js  # Analyse et statistiques
│   │   └── settings.js   # Paramètres et préférences
│
└── README.md
```

---

## **🚀 Installation & Configuration**  

### **1️⃣ Cloner le projet**  
```bash
git clone https://github.com/mon-compte/contentflow.git
cd contentflow
```

### **2️⃣ Installer les dépendances**  
```bash
npm install
```

### **3️⃣ Ajouter les variables d’environnement (`.env` dans le dossier backend)**  
```plaintext
SUPABASE_URL = "https://xyzcompany.supabase.co"
SUPABASE_KEY = "ton_supabase_key"
OPENAI_API_KEY = "ta_cle_openai"
EMAIL_API_KEY = "ta_cle_resend_postmark"
```

### **4️⃣ Démarrer le backend et le frontend**  
```bash
# Lancer le backend
cd backend
node server.js

# Lancer le frontend
cd frontend
npm run dev
```

---

## **📌 Utilisation**  

### **📢 1. Générer un Post**  
1. Accédez à **"Générer un Post"**  
2. Entrez un **sujet** et sélectionnez le **type de post**  
3. Cliquez sur **"🚀 Générer"** → L’IA propose un texte adapté à votre style  

### **📅 2. Programmer un Post**  
1. Accédez à **"Mes Posts"**  
2. Sélectionnez un post et cliquez sur **"📅 Planifier"**  
3. Définissez une **date de publication automatique**  

### **📊 3. Analyser les Performances**  
1. Accédez à **"Analyse & Statistiques"**  
2. Consultez **les graphiques d’évolution** et **les insights**  
3. Ajustez votre stratégie de contenu en fonction des recommandations  

---

## **🤝 Contribuer au Projet**  

Les contributions sont les bienvenues ! 🛠️  
Si vous souhaitez **ajouter une fonctionnalité** ou **corriger un bug**, suivez ces étapes :  

1. **Fork le projet**  
2. **Créer une branche** (`git checkout -b feature-ma-fonctionnalité`)  
3. **Faire vos modifications** et tester  
4. **Créer une pull request** 🚀  

---

## **📜 Licence**  
Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le partager.  

📢 **Créé avec ❤️ par Emma-Alk DOHOU**  
🚀 **ContentFlow - Automatiser & Optimiser vos posts Facebook**  

