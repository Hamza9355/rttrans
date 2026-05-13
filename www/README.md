# RT Touristique - Site Web Professionnel

## 📋 Description

Site web moderne et fluide pour RT Touristique, votre partenaire de référence pour le transport de prestige au Maroc.

## 🌟 Caractéristiques

### Technologies Utilisées
- **HTML5** - Structure sémantique optimisée
- **CSS3** - Design moderne et responsive avec animations fluides
- **JavaScript Vanilla** - Interactivité sans framework, performances optimales
- **Responsive Design** - Adapté à tous les appareils (mobile, tablet, desktop)

### Pages Disponibles
1. **Accueil (index.html)** - Page principale avec présentation complète
2. **Réservation (reservation.html)** - Formulaire de réservation sécurisé
3. **Contact (contact.html)** - Page de contact avec formulaire et localisation

### Sections Principales
- Navigation fluide avec menu responsive
- Hero section avec vidéo de fond
- Présentation de l'entreprise
- Services signature (6 services)
- Pourquoi nous choisir (3 arguments clés)
- Flotte de véhicules
- Statistiques d'activité
- Appel à l'action
- Footer complet

## 📁 Structure du Projet

```
www/
├── index.html              # Page d'accueil
├── reservation.html        # Page de réservation
├── contact.html            # Page de contact
├── css/
│   ├── styles.css          # Styles principaux
│   ├── reservation.css     # Styles réservation
│   └── contact.css         # Styles contact
├── js/
│   ├── script.js           # Script principal
│   ├── reservation.js      # Script réservation
│   └── contact.js          # Script contact
└── assets/                 # Images et médias
    ├── logo.png
    ├── bureau-office.jpeg
    └── bureau-face.jpeg
```

## 🚀 Comment Utiliser

### Option 1: Serveur Local (Python)
```bash
cd c:\Users\HP\Desktop\rttrans\www
python -m http.server 8000
```
Accédez à `http://localhost:8000`

### Option 2: Serveur Local (Node.js)
```bash
npm install -g http-server
cd c:\Users\HP\Desktop\rttrans\www
http-server
```

### Option 3: Ouvrir directement dans le navigateur
Double-cliquez sur `index.html` pour l'ouvrir dans votre navigateur par défaut.

## ✨ Fonctionnalités JavaScript

### Interactivité
- Menu mobile responsive avec toggle
- Animations au défilement (scroll effects)
- Validation de formulaires en temps réel
- Notifications toast pour les messages
- Calcul automatique des devis
- Animations fluides et ripple effects sur les boutons

### Performance
- Code vanilla (pas de dépendances externes)
- Optimisé pour les performances
- Chargement rapide
- Animations GPU-optimisées

## 🎨 Design et UX

- **Couleurs**: Variables CSS personnalisées
  - Primaire: #1a1a2e (bleu marine)
  - Secondaire: #d4af37 (or)
  - Accent: #e94b3c (rouge)
  
- **Typographie**: Poppins pour le body, Playfair Display pour les titres
- **Responsive**: Mobile-first, adapté à toutes les résolutions
- **Accessibilité**: Sémantique HTML correcte, contraste suffisant

## 📞 Informations de Contact

**RT Touristique**
- 📍 Business Center Orchidées (Bâtiment A), Mohammedia, Maroc
- 📱 +212 5XX XXX XXX
- 📧 info@rttouristique.com
- 🔔 Service 24/7

## 🔒 Sécurité

- Validation des formulaires côté client et serveur (à implémenter)
- Pas de données sensibles exposées
- HTTPS recommandé en production
- CSRF tokens à ajouter en production

## 📱 Responsive Breakpoints

- **Desktop**: 1200px et plus
- **Tablet**: 768px - 1199px
- **Mobile**: Moins de 768px
- **Extra Small**: Moins de 480px

## 🎯 À Faire Avant le Déploiement

1. [ ] Ajouter les images dans le dossier `assets/`
2. [ ] Mettre à jour les numéros de téléphone et emails
3. [ ] Intégrer un système de réservation backend (PHP, Node.js, Python)
4. [ ] Configurer l'envoi d'emails
5. [ ] Ajouter un système de paiement
6. [ ] Mettre en place HTTPS
7. [ ] Tester sur tous les navigateurs
8. [ ] Optimiser les images
9. [ ] Ajouter Google Analytics
10. [ ] Activer la compression GZIP

## 🛠️ Personnalisation

### Changer les couleurs
Modifiez les variables CSS dans `css/styles.css`:
```css
:root {
    --primary-color: #1a1a2e;
    --secondary-color: #d4af37;
    --accent-color: #e94b3c;
    /* ... autres variables */
}
```

### Ajouter du contenu
- Modifiez le HTML des pages `.html`
- Ajoutez des images dans `assets/`
- Personnalisez les textes selon vos besoins

## 📊 Analytics et SEO

Le site inclut:
- Meta description et keywords
- Structure sémantique optimisée
- Open Graph tags (à compléter)
- Sitemap (à générer)

## 🌐 Déploiement

Pour déployer en production:
1. Optimisez les images
2. Minifiez CSS et JavaScript
3. Activez la compression GZIP
4. Mettez en cache les ressources statiques
5. Utilisez un CDN si possible

## 💡 Améliorations Futures

- [ ] Dark mode
- [ ] Multi-langue
- [ ] Blog/Actualités
- [ ] Galerie photos interactive
- [ ] Live chat
- [ ] App mobile native
- [ ] Progressive Web App (PWA)
- [ ] Intégration API de paiement

## 📄 Licence

&copy; 2026 RT Touristique. Tous droits réservés.

---

**Créé avec ❤️ en HTML5, CSS3 et JavaScript Vanilla**
