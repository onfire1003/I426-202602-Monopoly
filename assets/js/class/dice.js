/***********************************************************************************************************************
 * Program name :           dice.js
 * Description :            Dice class
 * Author :                 Thierry Perroud
 * Creation date :          04.03.2026
 * Modified by :
 * Modification date :
 * Version :                0.1
 **********************************************************************************************************************/
"use strict";

/***********************************************************************************************************************
 * Classes
 **********************************************************************************************************************/
export default class Dice {
    constructor(images, position) {
        this.value = 1;
        this.images = images
        this.selectedImage = this.images[0];
        this.position = position;
    }

    getRandomRoll(max) {
        return Math.floor(Math.random() * max + 1);
    }

    throwDice() {
        this.value = this.getRandomRoll(6);
        this.displayDice(this.value);
    }

    displayDice(value) {
        switch (value) {
            case 1:
                this.selectedImage = this.images[1];
                break;

            case 2:
                this.selectedImage = this.images[2];
                break;

            case 3:
                this.selectedImage = this.images[3];
                break;

            case 4:
                this.selectedImage = this.images[4];
                break;

            case 5:
                this.selectedImage = this.images[5];
                break;

            case 6:
                this.selectedImage = this.images[6];
                break;
        }
    }
}