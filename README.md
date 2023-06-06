# FirstProject

Projet test

## Description du projet

Application vueJS 3 permettant de créer et d'assigner des tâches à des utilisateurs fonctionnant
avec un serveur NodeJS Express et une base de données MongoDB.

## Installation

1. Assurez-vous d'avoir Node.js et MongoDB installé sur votre machine.
2. Installez les dépendances dans le dossier client et gtp-server: `npm install`.

## Utilisation

1. Démarrez l'application depuis le dossier '/client': `npm start`.
2. Démarrez le serveur depuis le dossier '/gtp-server': `npm start` 
  (`http://localhost:8000/`).
3. Assurez vous de lancer le service Mongo au préalable 
  (`'mongodb://127.0.0.1:27017'`).
2. Ouvrez votre navigateur et accédez à l'URL suivante : `http://localhost:8080`.
3. Vous verrez un formulaire d'inscription, inscivez vous pour pouvoir vous rendre sur la page de création de tâches.
4. Pensez à bien remplir le formulaire en specifiant le nom de la tâche et les heures de debut et de fin (interval max de 8 heures).
5. Vous pouvez également supprimer une tâche en cliquant sur le bouton "Supprimer".
6. Vous pouvez assigner une tâche a un utilisateur (une liste des utilisateurs est affiché à droite, une classe css spécifique est appliqué à l'ulisateur si il est occupé).

## Structure du projet

- `client/` : Ce répertoire contient l'ensemble du projet vuejs
- `src/`: Ce répertoire contient le code source de l'application Vue.js.
  - `components/` : Les composants Vue réutilisables utilisés dans l'application.
  - `App.vue` : Le composant racine de l'application.
  - `main.js` : Le point d'entrée de l'application.
- `gtp-server` : Ce répertoire contient l'ensemble du projet Nodejs.
- `server.js` : Le point d'entrée du serveur.
- `src/`: Ce répertoire contient le code source du serveur Express.
    - `database/database.js`: Fichier contenant la connexion à la BDD MongoDB tournant sur le port `mongodb://127.0.0.1:27017`.
    - `model/`: Ce répertoire contient les modèles des documents. 
    - `router/`: Ce répertoire contient les routes du serveur.
