# Tsunamiiiii

## Présentation global du projet

### Tech Stack

- API ([nestjs](https://nestjs.com))
- Web ([react](https://reactjs.com))
- Rabbitmq ([rabbitmq](https://rabbitmq.com))
- [Docker](https://docker.com)
- Base de donnée de session ([redis](https://redis.io))
- Base de donnée principal ([mongodb](https://mongodb.com))
- Web Server ([Caddy](https://caddyserver.com))
- Formatteur ([Prettier](https://prettier.io))
- Linter ([Eslint](https://eslint.org))
- Version Control ([git](https://git-scm.com))
- Transpiler ([babel](https://babeljs.io))
- Type Check ([Typescript](https://typescriptlang.org))
- Monorepos ([nx](https://nx.dev))

### Architecture

- apps
  - api
    - rest api
    - websocket (gateway)
  - rabbitmq (client)
  - web
- config
- libs
  - constants
  - scanner
  - types

Utilisation de docker pour la base de donnée de session ([redis](https://redis.io)) et la base de donnée principale ([mongodb](https://mongodb.com)), pour mettre en place [rabbitmq](https://rabbitmq.com) et pour la mise en place du Web Server [Caddy](https://caddyserver.com)

## Démarrage de l'architecture

### Installation des modules

*`npm`, `yarn` ou `pnpm` libre à vous de choisir moi je préfère yarn*

```bash
yarn
```

### Démarrage des services en dehors du code

J'ai créé un script dans le package.json qui me permet de lancer les containers docker de mon fichier `docker-commpose.yml`
*encore une fois libre à vous de le lancer ou non avec `npm`, `yarn` ou `pnpm`*

```bash
yarn docker
```

*si vous voulez le faire vous même*

```bash
docker-compose up -d
```

### Démarrage en mode développement

```bash
yarn start
```

En exécutant cette commande vous allez lancer nx qui va se charger de build grâce à babel tous les fichiers qui par la suite vont être lancer avec leur port attitrer dans un fichier `.env` (uniquement pour l'api)

### Build du projet

Lancement du build de tous les apps et libs nécessaires au bon fonctionnement du projet

```bash
yarn build
```
