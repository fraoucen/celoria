# Organisation du développement

## Branches

- `main` : version stable et déployable en production.
- `develop` : prochaine version en préparation.
- `feature/nom-court` : nouvelle fonctionnalité ou amélioration.
- `fix/nom-court` : correction ciblée.

## Parcours d’une modification

1. Mettre `develop` à jour.
2. Créer une branche depuis `develop`.
3. Développer et tester la modification.
4. Fusionner la branche dans `develop` après validation.
5. Fusionner `develop` dans `main` uniquement pour publier une version stable.

## Commandes utiles

```bash
git switch develop
git pull
git switch -c feature/nom-court
```

Après validation :

```bash
git switch develop
git merge --no-ff feature/nom-court
git push
```

Pour une mise en production :

```bash
git switch main
git merge --no-ff develop
git push
```

## Règles simples

- Ne pas développer directement sur `main`.
- Ne pas versionner `out`, `.vercel`, les fichiers `.env` ou `node_modules`.
- Faire un commit court et compréhensible par changement logique.
- Vérifier le build avant de fusionner dans `main`.
- Ne jamais placer de secret, mot de passe ou jeton dans Git.
