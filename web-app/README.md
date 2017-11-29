# Bepp WebApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.9.  
Run all given command in `[BEPP-ROOT]/web-app` where BEPP-ROOT is the root of the git project.

## Required installation
* npm / yarn: prefers yarn for install and update dependencies.
* run npm update / yarn before use build

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

* For dev build: Run `ng build -dev --watch` to build the project. The build artifacts will be stored in the `dist/` directory. `--watch` option run a watcher on source files ;
if you save one file in `src/`, program will recompile automatically.
* For production build: Use the `ng build -prod`.

## Lien Présentation / métier T8_PM

Tous les services hormis POST `/tokens` devrait être appelés avec un token d'authentification (dans le headers / Authorization de la requête pour oauth), pour permettre la sécurisation de l'application.

* page `/login`  

| Données nécessaires | Requested api services  |
| --- | --- |
| les données de l'utilisateur connecté, redirection si défini | GET `/users/:id` (id de l'utilisateur courant) |
| Enregistrer un token | POST `/token`: enregistre un token avec les identifiants donnés et le renvoie | 

* `/dashboard`  

| Données nécessaires | Requested api services  |
| --- | --- |
| La liste des projets (nom) de l'utilisateur connecté | Déjà récupéré dans le GET `/users/:id`, si besoin: GET `/users/:id/projects/`|
| possibilité de se déconnecter | DELETE `/tokens/:token` |
| Liste des sprints pour un projet (nombre) | Récupérée avec le projet |
 
* `/dashboard/overview`  

| Données nécessaires | Requested api services  |
| --- | --- |
| Listes des membres d'un projet (email, prénom, nom, rôle dans le projet) | déjà récupérés dans GET `/users/:id` ou GET `/users/:id/projects`, sinon GET `/users/:iduser/projects/:idproject/members` |
| Ajouter / supprimer un utilisateur à un projet | POST/DELETE `/projects/:idproject/members/:idUtilisateur` (avec le role en paramètre pour le POST) |
| Précisions d'un projet (date début, date fin, nom, description) | Récupérées avec le projet |

## Lien Présentation / métier (pour la suite)

* `/dashboard/backlog`  

| Données nécessaires | Requested api services  |
| --- | --- |
| Liste des US (backlog): id, desc, difficulté, priorité, done | déjà récupérés avec le projet, sinon GET `/users/:iduser/projects/:idproject/user-stories` |

* `/dashboard/sprints`  

| Données nécessaires | Requested api services  |
| --- | --- |
| Liste des US pour le sprint (mini-backlog) : id, desc, difficulté, priorité, done | champ backlog de l'opbjet que renvoie GET `/users/:iduser/projects/:idproject/sprints/:idsprint` |
| Liste des tâches pour le sprint : id, intitulé, affectation, difficulté, état | champ tasks de l'objet que renvoie GET `/users/:iduser/projects/:idproject/sprints/:idsprint` |
| Liste des US (backlog): id, desc, difficulté, priorité, done | déjà récupérés avec le projet |
| Ajouter/supprimer un US à un sprint | POST / DELETE `/projects/:idproject/sprints/:idsprint/user-stories` avec en paramètre l'id de l'us à ajouter / supprimer |
| Ajouter/supprimer une tâche à un sprint | POST / DELETE `/projects/:idproject/sprints/:idsprint/tasks` avec en paramètre l'id de la tâche à ajouter / supprimer |


## More options
### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
