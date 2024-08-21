# Okanban

Petite démonstration des technologies suivantes : 
- `Vue 3` (avec l'`Option API` provenant de Vue 2)
- `pnpm` comme gestionnaire de packages (surcouche à `npm`)


## Installation

- Installer `pnpm` 

- Installer les dépendances : 
  - `pnpm i`

- Créer votre BDD `okanban`

- Générer les tables adaptées au front : 
  - `pnpm db:setup`

- Lancer le backend et le client Vue en concurrence :
  - `pnpm dev`
    - le serveur se lance alors sur le port `3000`
    - et le client sur le port `5173`

# Amélioration pour une V2
- Utilisation de sqitch 
- Création d'une feature connexion
- Importation de securité back et front (JWT, Bcrypt, Cors, RateLimite, Joi, Formik...)
