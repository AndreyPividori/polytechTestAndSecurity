# Projet Test et Sécurité

## Pré-requis 
Télécharger nodeJS : https://nodejs.org/en/download/  
Télécharger gitHub : https://git-scm.com/downloads  
Télécharger Vue CLI : ```npm install -g @vue/cli``` (le -g permet de l'installer en global)

## Cloner le repository git
```
git clone https://github.com/AndreyPividori/polytechTestAndSecurity.git
```

## Project setup
Ouvrir un terminal dans le projet et récupérer les packages
```
cd project  
npm install  
```

### Compilation et HotFix pour le développement 
```
npm run serve
```

### Compilation et HotFix pour la MeP
```
npm run build
```

### Linter
```
npm run lint
```

## Début d'une sessions de travail 
Chaque fonctionnalitée sera développée sur une branche dédiée à cette fonctionnalité

### Récupération du la dernière version du code
```
git pull
```

### Redirection vers la branche de votrre fonctionnalité
Si la branche n'existe pas, la créer :  
```
git checkout -b NomDeLaFonctionnalite
```
Si la branche existe déja, vous avez juste à switcher dessus :  
```
git switch NomDeLaFonctionnalite
```

## Fin d'une session de travail
Ouvrir un terminal dans le dossier polytechTestAndSecurity  

### A chaque nouvelle partie de fonctionnalité validée
```
git add .  
git commit -m "REF XYZ : Bref descriptif du début de fonctionnalité validé"  
```

### A chaque nouvelle fonctionnalité validée
```
git add .  
git commit -m "REF XYZ du Cahier des spécification terminée et fonctionnelle"  
git push  
```

### Avant de quitter le projet sur lequel on travaille
Vérifier que le master est au même niveau que nous-même :  
```
git switch main
git checkout  
```
Si ce n'est pas le cas, effectuer les étapes ci-dessus pour se mettre à niveau  

### Merge de la fonctionnalité
On se déplace sur la branche master, on récupère la dernière version de la branche master (optionnel),  
on fusionne notre fonctionnalité puis on supprime notre branche.
```
git checkout main
git pull
git merge NomDeLaFonctionnalite
git branch -d NomDeLaFonctionnalite
```