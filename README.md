# Portail RH - Gestion des demandes du personnel

📌 Description

Le projet "Portail RH" est une application web de gestion administrative des ressources humaines.  
Il a été développé dans le cadre de notre Projet de Fin d'Études (PFE) pour l'obtention de la licence en *Sciences et Technologies de l'Information et de la Communication à l'ISET Gabès, réalisé au sein de l'entreprise ArabSoft Tunisie.

# Problématique
Actuellement, la gestion des demandes (congés, autorisations, prêts, mutations, etc.) se fait de manière manuelle :
- Formulaires papier
- Saisie manuelle des données par l'agent RH
- Transmission physique des demandes
- Délais importants et risques d'erreurs

# Solution proposée
Notre application offre une plateforme centralisée permettant aux employés de soumettre leurs demandes en ligne, aux chefs hiérarchiques et administrateurs de les traiter efficacement, avec un suivi en temps réel.

# 🎥 Démonstration vidéo

<video width="100%" controls>
  <source src="docs/video/demo.mp4" type="video/mp4">
  Votre navigateur ne supporte pas la vidéo.
  <a href="docs/video/demo.mp4">📥 Télécharger la vidéo</a>
</video>

# 👥 Acteurs du système

| Acteur | Rôle |
|--------|------|
| Administrateur (RH) | Gestion des utilisateurs, services, et toutes les demandes |
| Chef hiérarchique| Gestion des demandes des employés de son service |
| Personnel (Employé)| Soumission de demandes et suivi |

---

# 📋 Fonctionnalités principales

## Administrateur
- Gestion des services (ajout, modification, suppression)
- Gestion des utilisateurs (ajout, modification, désactivation)
- Gestion de toutes les demandes (approbation / rejet)
- Consultation des statistiques (tableaux de bord)

## Chef hiérarchique
- Consultation des demandes des employés de son service
- Approbation / Rejet des demandes (congés, mutations, autorisations)

## Personnel (Employé)
- Soumissions des demandes :
  - Demande de congé (maladie, mariage, paternité, occasionnel)
  - Demande d'autorisation
  - Demande de prêt et avance sur salaire
  - Demande de mutation professionnelle
  - Demande de changement de situation personnelle
  - Demande de documents administratifs
- Suivi de l'état des demandes (en attente, approuvé, refusé)
- Consultation et modification du profil
- Téléchargement de PDF pour les demandes approuvées

## 🛠 Technologies utilisées

# Backend
- Spring Boot
- Spring Security
- JWT
- MySQL
- Maven

# Frontend
- Angular
- Bootstrap
- HTML5 / CSS3 / TypeScript

# Outils
- Postman
- Visual Studio Code
- Visual Paradigm
- Git & GitHub

---

## ⚙️ Installation et exécution

# Prérequis
- Java 17+
- Node.js 18+
- MySQL 8+
- Angular CLI

# Backend
cd backend
mvn spring-boot:run

# Fontend
cd frontend
npm install
ng serve

## 📊 Méthodologie
Ce projet a été réalisé selon la méthode SCRUM.

## 👩‍💻 Auteur

"Mariem Ounissi"
- Licence STIC - ISET Gabès
- 📧 mariem.ounissiii@gmail.com
- 🔗 [GitHub](https://github.com/mariem-ounissi1)
- 💼 [LinkedIn](https://linkedin.com/in/mariem-ounissi)


## 📅 Contexte
Élément	       Détail
Projet	       Projet de Fin d'Études (PFE)
Diplôme        Licence STIC
Établissement	 ISET Gabès
Entreprise	   ArabSoft Tunisie
Période       	Février - Mai 2024

