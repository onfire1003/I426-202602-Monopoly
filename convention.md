# fichier de conventions
1. [commentaire](#commentaire)
2. [code](#code)
3. [fichier](#fichier)
4. [branch](#branch)
5. [commit](#commit)

## commentaire
### description
- Cartouche d'en-tête du code doivent reprendre ces conventions.
- les commentaires du code doivent être en anglais.
- les commentaires doivent décrire la fonction / le code.
- Cartouche de fonction obligatoire.
### exemple
```js
/***********************************************************************************************************************
 * Program name :           value
 * Description :            value
 * Author :                 value
 * Creation date :          value
 * Modified by :
 * Modification date :
 * Version :                0.1.0
 **********************************************************************************************************************/
```

```js
/**
 * Adds money to the player's balance
 * @param {number} amount
 */
addMoney(amount){
    this.money += amount;
}
```
---

## code
### description
- le nom des fonctions et des variables doivent être en anglais.
- le nom des fonctions et des variables doivent signifier quelque chose.
- les fonctions, les variables globales et les classes sont en camelCase.
- les variables locales et les fichiers sont en snake_case.

### exemple
```js
// pas acceptable
let a = 0;

```

```js
let globalVariableNameExample = 0;

function nameOfExample (){
    let local_variable_name_example = 0;
}

export default class nameExample {
    
}
```
---

## fichier
### description
- les noms des fichiers doivent être en anglais.
- les noms des fichiers doivent signifier quelque chose.
- les fichiers sont en snake_case.

### exemple
```text
I426-2026-02-Monopoly
├── assets
│   ├── css
│   │   └── style.css
│   ├── images
│   │   ├── image_exemple 
│   │   └── image_1
│   └── js
│       ├── javascipt_exemple.js
│       └── sketch.js
├── index.html
└── README.md
```
---
## git
- on utilise ces convention pour git
1. git flow
2. [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### branch
#### description
- le nom des branches doivent être en anglais.
- le nom des branches doivent signifier quelque chose.
- les branches sont en camelCase.
- il faut que les branches utilise les conventions cité plus haut.

#### exemple
``` text
I426-202602-Monopoly
├── main
├── develop
├── feature
│   └── nameOfBranch
└── fix
    └── nameOfBranch
```
```bash
git branch feature/nameOfBranch
```
```bash
git branch fix/nameOfBranch
```

### commit
#### description
- le commit doit être en anglais.
- le commentaire du commit doit faire une brève description de ce qui a été fait dans le commit.
- il faut que le commit utilise les conventions cité ci-dessus.
- le commit doit correspondre aux exemples.

#### exemple
#### pour ajouter les fichier dans le commit 
```bash
git add nameOfFile
```
#### pour commit une feature
```bash
git commit -m "feat: description of commit changes"
```
#### pour commit un fix
```bash
git commit -m "fix: description of commit fix"
```
#### pour le premier push qui créer la branche dans le repository
```bash
git push --set-upstream origin nameOfBranch
```
#### pour push 
```bash
git push
```
