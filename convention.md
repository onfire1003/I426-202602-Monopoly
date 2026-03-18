# fichier de convention 
1. [commentaire](#commentaire)
2. [code](#code)
3. [fichier](#fichier)
4. [branch](#branch)
5. [commit](#commit)

## commentaire
### description
- Cartouche d'en tête du code doivent reprendre ces conventions.
- les commentaires du code doivent être en anglais.
- les commentaires doivent décrire la fonction / le code.
- cartouche de fonction obligatoire.
### exemeple
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
- le nom des fonctions et des variables doivent êtres en anglais.
- le nom des fonctions et des variables doivent signifier quelque chose.
- les fonctions, les variable global et les class sont en camelCase.
- les variables locale et les fichiers sont en snake_case.

### exemeple
```js
// pas acceptable
let a = 0;

```

```js
let globalVariableNameExample = 0;

function nameOfExemple (){
    let local_variable_name_exemple = 0;
}

export default class nameExemple {
    
}
```
---

## fichier
### description
- le nom des fichiers doivent être en anglais.
- le nom des fichiers doivent signifier quelque chose.
- les fichiers sont en snake_case.

### exemeple
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
- on utilise c'est convention pour git
1. git flow
2. [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

### branch
#### description
- le nom des branches doivent être en anglais.
- le nom des branches doivent signifier quelque chose.
- les branches sont en camelCase.
- il faut que les branches utilise les conventions cité plus haut.

#### exemeple
``` text
I426-202602-Monopoly
├── main
├── develop
├── feature
│   └── nameOfBrach
└── fix
    └── nameOfBrach
```
```bash
git branch feature/nameOfBanch
```
```bash
git branch fix/nameOfBanch
```

### commit
#### description
- le commit doit être en anglais.
- le commentaire du commit doi fair une description breve de ce qui a été fait dans le commit.
- il que le commit utilise les conventions cité plus haut.
- le commit doit correspondre aux exemple.

#### exemeple
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
git push --set-upstream origin nameOfBrach
```
#### pour push 
```bash
git push
```