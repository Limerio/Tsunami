# 🌊 Tsunamiiiii

## 🏠 Présentation global du projet

### 📼 Tech Stack

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

### 🗿 Architecture

- apps
  - api
    - rest api
    - websocket (gateway)
    - Docs ([swagger](https://swagger.io))
  - rabbitmq (client)
  - web
- config
- libs
  - constants
  - scanner
  - types

Utilisation de docker pour la base de donnée de session ([redis](https://redis.io)) et la base de donnée principale ([mongodb](https://mongodb.com)), pour mettre en place [rabbitmq](https://rabbitmq.com) et pour la mise en place du Web Server [Caddy](https://caddyserver.com)

## 🗿 Démarrage de l'architecture

### 📦 Installation des modules

*`npm`, `yarn` ou `pnpm` libre à vous de choisir moi je préfère yarn*

```bash
yarn
```

### 🎛️ Démarrage des services en dehors du code

J'ai créé un script dans le package.json qui me permet de lancer les containers docker de mon fichier `docker-commpose.yml`
*encore une fois libre à vous de le lancer ou non avec `npm`, `yarn` ou `pnpm`*

```bash
yarn docker
```

*si vous voulez le faire vous même*

```bash
docker-compose up -d
```

### 💻 Démarrage en mode développement

```bash
yarn dev
```

En exécutant cette commande vous allez lancer nx qui va se charger de build grâce à babel tous les fichiers qui par la suite vont être lancer avec leur port attitrer dans un fichier `.env` (uniquement pour l'api)

*information supplémentaire vérifier bien que dans libs/scanner/utils/constants la constante `API_URL` a bien le même port qu'il y a écrit dans votre fichier `.env` sinon la communication en simultaner ne fonctionnera pas*

### 🔨 Build du projet

Lancement du build de tous les apps et libs nécessaires au bon fonctionnement du projet

```bash
yarn build
```

### 👥 Production

J'aurai aimé pouvoir faire une partie pour le déploiment de tous les apps mais malheuresement par manque de temps je n'ai pas pu le faire mais vous pouvez tout de même démarrer tout avec l'explication plus haut de la partie **💻 Démarrage en mode développement**

### ⌨️ Explication de son fonctionnement

Pour commencer nous avons l'application api qui est composé de trois systèmes 🎛️

1. Une documentation qui est gestionné par swagger qui permet de vous donner les informations nécessaire au fonctionnement de l'api (disponible quand vous ouvrez votre navigateur http://localhost:[Le port défini dans votre fichier .env]/docs)
2. Un serveur websocket sur le même que vous avez mis dans le .env qui permet la communication entre l'app web l'api et le scanner qui permet d'envoyer les différentes informations sur le scan
3. Et l'api REST qui est constitué d'un système d'authentification et la gestion des scanners

> **Attention** : L'app api est le système central si elle n'est pas démarré des erreurs surviendront avec le reste du système et pareil pour les autres applications elles sont toutes autant importantes

Ensuite, l'application rabbitmq est une instance client du serveur rabbitmq qui permet quand un scan lancé ça envoie un JSON contenant les informations nécessaires au bon fonctionnement du scanner

Pour terminer, nous avons l'application web qui est l'interface graphique, celle-ci vous permet un suivie du scan et d'avoir une lisibilité plus global sur les statistiques qui est retourné dessus et c'est un peu plus jolie que de voir des requêtes api 🤮
