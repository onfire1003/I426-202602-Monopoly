/***********************************************************************************************************************
 * Program name :           player.js
 * Description :            the class for the players
 * Author :                 Cédric Jankiewicz
 * Creation date :          4.03.2026
 * Modified by :            Cédric Jankiewicz
 * Modification date :      24.03.2026
 * Version :                0.1.5
 **********************************************************************************************************************/
"use strict";

// Player class represents a single player in the game
export default class Player {

    /**
     * Creates a new player
     * @param {number} placement - Player's position on the board (0–39)
     * @param {number} money - Player's starting money
     * @param {Array} inventory - Items owned by the player
     * @param {boolean} in_prison - Whether the player is in prison
     */
    constructor(placement = 0, money = 1500, inventory = [], in_prison = false, in_bankrupt = false) {
        this.placement = placement;      // Current board position
        this.money = money;            // Player's money balance
        this.inventory = inventory;      // Owned items/properties
        this.in_prison = in_prison;   // Prison status
        this.bankrupt = in_bankrupt;  // bankrupt status
        this.blockedTurns = 0; // nombre de tours restants bloqués
    }

    getTileCoords(board) {
        return board[this.placement].coords;
    }
    /**
     * Moves player directly to a specific position
     * @param {number} position
     */
    bringTo(position) {
        this.placement = position;
    }

    /**
     * Moves player forward by a number of spaces
     * Board wraps around at 40 spaces
     * @param {number} number
     */
    move(number) {
        const start = this.placement;
        this.placement = (this.placement + number) % 40;
        if (this.placement < start) {
            this.addMoney(200)
        }
    }

    /**
     * Adds money to the player's balance
     * @param {number} amount
     */
    addMoney(amount) {
        this.money += amount;
    }

    /**
     * Removes money from the player's balance
     * @param {number} amount
     * @returns {boolean} if the player had enough money to pay
     */
    removeMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            return true
        }
        else {return false}
    }

    /**
     * Adds an item to the player's inventory
     * @param {*} object
     */
    addToInventory(object) {
        this.inventory.push(object);
    }

    /**
     * Removes an item from inventory by index
     * @param {number} object_index
     */
    removeFromInventory(object_index) {
        this.inventory.splice(object_index, 1);
    }

    /**
     * Sends the player to prison
     * Sets prison status and moves player to position 10
     */
    putInPrison() {
        this.in_prison = true;
        this.blockedTurns = 3; // bloqué pendant 3 tours
        this.bringTo(10);
    }

    /**
     * Releases the player from prison
     */
    releaseFromPrison() {
        this.in_prison = false;
        this.blockedTurns = 0;
        this.removeMoney(50)
    }

    /**
     * if the player don't have any money and nothing in their inventory
     * */
    playerEliminated(){
        if (this.money <= 0 && this.inventory.length === 0){
            this.in_bankrupt = true;
            return true;
        }else{
            return false;
        }
    }
}