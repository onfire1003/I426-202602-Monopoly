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
            this.finalValue = null; // résultat final sauvegardé
            this.images = images;
            this.selectedImage = this.images[0];
            this.position = position;
        }

        getRandomRoll(max) {
            return Math.floor(Math.random() * max + 1);
        }

        throwDice() {
            this.value = this.getRandomRoll(6);
            this.selectDisplayDice(this.value);
        }

        selectDisplayDice(value) {
            switch (value) {
                case 1:
                    this.selectedImage = this.images[0];
                    break;

                case 2:
                    this.selectedImage = this.images[1];
                    break;

                case 3:
                    this.selectedImage = this.images[2];
                    break;

                case 4:
                    this.selectedImage = this.images[3];
                    break;

                case 5:
                    this.selectedImage = this.images[4];
                    break;

                case 6:
                    this.selectedImage = this.images[5];
                    break;
            }
        }

            displayDice() {
                return image(this.selectedImage, this.position[0], this.position[1], this.position[2], this.position[3]);
            }

        rollDice(i, callback) {
            setTimeout(() => {
                let randomValue = this.getRandomRoll(6);
                this.value = randomValue;
                this.selectDisplayDice(randomValue);

                i--;

                if (i > 0) {
                    this.rollDice(i, callback);
                } else {
                    this.finalValue = this.value;

                    if (callback) callback(this.finalValue);
                }
            }, 50);
        }

        resetDice() {
            this.value = 1;
            this.selectedImage = this.images[0];
        }
    }