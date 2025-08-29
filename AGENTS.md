# Agent Guidelines – Micro Royal

## Context
- Repo cible : https://github.com/fuwu-yuan/micro-royal
- Repo moteur (lecture seule) : https://github.com/fuwu-yuan/bgew
- Objectif : développer le jeu "Micro Royal" en suivant la roadmap située dans `docs/ROADMAP.md`.

## Rules
1. **Toujours travailler dans le repo cible** (`micro-royal`).
2. **Ne jamais modifier le repo moteur** (`bgew`). Il est uniquement en lecture pour référence.
3. Chaque tâche = une PR unique.
   - Créer une branche `feature/pr-XX-*`.
   - Committer les changements.
   - Pousser sur le remote `origin`.
   - Ouvrir une Pull Request vers `main`.

## Deliverables par PR
- Diff exact (`git diff`).
- Tests ou scripts garantissant CI verte.
- Titre et description de PR (résumé clair, risques, perf, étapes suivantes).
- Mise à jour de la doc si nécessaire (`README.md`, `ROADMAP.md`, `TECH_DECISIONS.md`).

## Constraints
- Durée max par PR ≈ 15 min de travail.
- Si une tâche dépasse, fractionner en PR-XXa, PR-XXb… et mettre à jour `ROADMAP.md`.
- Ne jamais proposer une PR sans diff. Si aucun changement détecté, ajouter un commit trivial (ex: mise à jour de `README.md` ou `ROADMAP.md`) pour déclencher la PR.

## Git / Remote
- Toujours vérifier le remote : `git remote -v` doit montrer  
  `origin https://github.com/fuwu-yuan/micro-royal.git`
- Si aucun remote, configurer :  
  `git remote add origin https://github.com/fuwu-yuan/micro-royal.git`
- Utiliser un Personal Access Token (PAT) ou l’auth du connecteur pour `git push`.

## Workflow attendu
1. Lire la tâche active dans `ROADMAP.md`.
2. Créer/mettre à jour la branche `feature/pr-XX`.
3. Implémenter la tâche.
4. Commit + push.
5. Ouvrir une PR vers `main` avec le titre/description formatés.
6. Signaler la PR créée avec son lien.

---

