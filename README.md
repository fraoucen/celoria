# Celoria Facture

Diagnostic d’orientation sur la réforme française de la facturation électronique et recommandation facultative de solutions adaptées.

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir `http://localhost:3000`.

## Organisation Git

- `main` contient uniquement la version stable déployée en production.
- `develop` contient la prochaine version en préparation.
- chaque évolution est développée dans une branche `feature/nom-court`, créée depuis `develop`.

Le fonctionnement complet est décrit dans [CONTRIBUTING.md](CONTRIBUTING.md).

## Important

- Le résultat est une pré-orientation, pas un conseil fiscal personnalisé.
- Les sources officielles sont visibles depuis l’interface.
- L’envoi d’e-mail est simulé dans cette V1 et devra être relié à un service transactionnel avant commercialisation.
- Les règles doivent être revues par un professionnel avant lancement public.
