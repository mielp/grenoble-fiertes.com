# Grenoble Fiertés

Le site web de l'association Grenoble Fiertés, qui organise la Marche et la Quinzaine des Fiertés
de Grenoble.

## Technique

Site statique développé à partir du starter [Hyas](https://gethyas.com/)
pour le générateur [Hugo](https://gohugo.io/).

## Quickstart
Avant de procéder, il est nécessaire d'avoir installé `npm` et `node>16.12.0`.
Mise en place de l'environnement de dev :
``` bash
npm run clean:install # optional clean to avoid conflicts with previous versions
npm install
```
Si problèmes suite à une ancienne version de Hyas présente sur le projet, se référer au [guide de migration](https://docs.gethyas.com/guides/upgrade-to/v2/).

Pour visualiser les changements en cours de développement (hot reloading), exécuter :
``` bash
npm run dev
```

Pour builder le site et visualiser la preview :
``` bash
npm run clean:build
npm run build
npm run preview
```

Attention, lors de la visualisation de la preview, il peut être nécessaire de nettoyer le cache de son navigateur.

## Licence

L'ensemble du code original de ce projet est placé sous
[licence EUPL 1.2 par l'association Grenoble Fiertés](LICENSE).

Tout le code issu de Hyas est placé sous
[licence MIT par Henk Verlinde](https://github.com/h-enk/hyas/blob/master/LICENSE).

Tout contenu, média ou autre œuvre intellectuelle de ce site web est placé sous licence
[Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/)
par l'association Grenoble Fiertés, sauf mention contraire.
