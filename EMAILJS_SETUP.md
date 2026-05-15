# Configuration Gmail pour RT Touristique

## Envoyer des Emails avec le Compte Gmail RT Touristique

### Configuration Requise:

Les formulaires de contact et réservation utilisent maintenant Gmail directement via EmailJS.

### Email Gmail:
```
info@rttouristique.com
```

### Mot de Passe Application:
Pour envoyer des emails depuis Gmail via EmailJS, générez un **mot de passe d'application**:

1. Allez sur: https://myaccount.google.com/security
2. Activez l'authentification 2FA si ce n'est pas fait
3. Allez à "Appareils et accès à Google"
4. Sélectionnez "Mots de passe d'application"
5. Choisissez "Courrier" et "Windows"
6. Copiez le mot de passe généré (16 caractères)
7. Ce mot de passe sera utilisé pour authentifier EmailJS

### Configuration EmailJS:

1. Inscription: https://www.emailjs.com/
2. Service: Gmail (host: smtp.gmail.com, port: 465)
3. Email: info@rttouristique.com
4. Mot de passe: [Votre mot de passe d'application Gmail]
5. Deux Templates EmailJS:
   - **template_contact** - Pour les formulaires de contact
   - **template_reservation** - Pour les réservations
6. Copiez votre **PUBLIC_KEY** depuis EmailJS
7. Remplacez "YOUR_PUBLIC_KEY" dans:
   - `js/contact.js` ligne ~5
   - `js/reservation.js` ligne ~5

### Coordonnées de Contact:

**Siège Social:** Boulevard Zerktouni, Casablanca, Maroc  
**Email:** info@rttouristique.com  
**Téléphone:** +212 661-917453  
**Horaires:** 24/7  

### Notes de Sécurité:
- ⚠️ Ne partagez JAMAIS votre PRIMARY_KEY (clé privée)
- PUBLIC_KEY est sûr à partager et utilisé côté client
- Les mots de passe d'application sont spécifiques à EmailJS
- Conservez vos identifiants éloignés des fichiers versionés
