/***********************************************************************************************************************
 * Program name :           game.js
 * Description :            the class for the game
 * Author :                 Cédric Jankiewicz
 * Creation date :          4.03.2026
 * Modified by :            Thierry Perroud
 * Modification date :      25.03.2026
 * Version :                0.1.6
 **********************************************************************************************************************/
"use strict";
import Player from "./player.js";
import Tile from "./tile.js";
import objects from "../object.js";



export default class Game {
    /**
     * Create a new Game instance.
     *
     * @param {number} nb_player - Number of players in the game.
     * @param {number} [board_size=40] - Number of tiles on the board.
     */
    constructor(nb_player, board_size = 40) {
        this.nb_player = nb_player;
        this.board_size = board_size;
        this.players = [];
        this.board = [];
        this.current_player = 0;
        this.nb_doubles = 0;

        /**
         * List of currently possible actions for the player.
         * @type {string[]}
         */
        this.possible_actions = ["dice"];

        // game innit
        for (let i = 0; i < this.nb_player; i++) {
            this.players.push(new Player());
        }


        const TilesType = [
            "start", "brown", "community", "brown", "tax", "station", "cyan", "luck", "cyan", "cyan",
            "prison", "magenta", "company", "magenta", "magenta", "station", "orange", "community", "orange", "orange",
            "free_parking", "red", "luck", "red", "red", "station", "yellow", "yellow", "company", "yellow",
            "go_to_prison", "green", "green", "community", "green", "station", "luck", "blue", "tax", "blue",
        ]

        const TilesObject = [
            null, objects.streets[0], null, objects.streets[1], null, objects.companies[0], objects.streets[2], null, objects.streets[3], objects.streets[4],
            null, objects.streets[5], objects.companies[4], objects.streets[6], objects.streets[7], objects.companies[1], objects.streets[8], null, objects.streets[9], objects.streets[10],
            null, objects.streets[11], null, objects.streets[12], objects.streets[13], objects.companies[2], objects.streets[14], objects.streets[15], objects.companies[5], objects.streets[16],
            null, objects.streets[17], objects.streets[18], null, objects.streets[19], objects.companies[3], null, objects.streets[20], null, objects.streets[21]
        ]

        const TilesPrice = [
            0, 100, 0, 100, 0, 100, 100, 0, 100, 100,
            0, 100, 100, 100, 100, 100, 100, 0, 100, 100,
            0, 100, 0, 100, 100, 100, 100, 100, 100, 100,
            0, 100, 100, 0, 100, 100, 0, 100, 0, 100,
        ]

        const TilesName = [
            "départ", "brown", "community", "brown", "taxe", "gare", "cyan", "chance", "cyan", "cyan",
            "prison", "magenta", "entreprise\nd\'énergie", "magenta", "magenta", "gare", "orange", "community", "orange", "orange",
            "parking\ngratuit", "red", "chance", "red", "red", "gare", "yellow", "yellow", "entreprise\nd\'eau", "yellow",
            "aller en\nprison", "green", "green", "community", "green", "gare", "chance", "blue", "taxe", "blue",
        ]

        const TilesCoords = [];
        for (let i = 0; i < 40; i++) {
            if (i <= 9)
                TilesCoords.push({ x: 1813 - (i * 75) - 8, y: 823 });
            else if (i <= 20)
                TilesCoords.push({ x: 1063 - 35, y: 820 - ((i - 10) * 75) });
            else if (i <= 30)
                TilesCoords.push({ x: 1063 + ((i - 20) * 75) - 6, y: 45 + 8 });
            else
                TilesCoords.push({ x: 1813, y: 70 + ((i - 30) * 75) });
        }


        for (let i = 0; i < this.board_size; i++) {
            this.board.push(new Tile(TilesType[i], TilesName[i], TilesObject[i] ,null, TilesCoords[i]));
        }

    }

    /**
     * Determine the possible actions available to a player.
     *
     * @param {number} player_index - Index of the player.
     * @returns {void}
     */
    getPossibleActions(player_index) {
        this.possible_actions = ["dice"];
        let player = this.players[player_index];

        if (player.in_prison) {
            this.possible_actions.push("go_out_of_prison");
        }

        if (player.inventory.length > 0) {
            this.possible_actions.push("trade", "sell", "build");
        }

        if (this.board[player.placement].object && !this.board[player.placement].owned &&
            this.board[player.placement].object.price <= player.money) {
            this.possible_actions.push("buy");
        }
    }

    /**
     * Finish the current player's turn and switch to the next non-eliminated player.
     *
     * @returns {void}
     */
    finishTurn() {
        let cant_play = true
        while (cant_play) {
            this.current_player = (this.current_player + 1) % this.nb_player;
            if (!this.players[this.current_player].bankrupt) {cant_play = false}
        }
        this.getPossibleActions(this.current_player);
        this.nb_doubles = 0;
        this.possible_actions.push("dice");
    }

    /**
     * Roll the dice for the current player.
     * @param {int} dice_1 value of dice 1
     * @param {int} dice_2 value of dice 2
     * @returns {void}
     */
    throwTheDice(dice_1, dice_2) {
        let can_rethrow = true;

        if (!this.players[this.current_player].in_prison) {
            this.players[this.current_player].move(dice_1 + dice_2);
        }

        if (dice_1 !== dice_2 || this.nb_doubles > 2) {    // No doubles or 3 doubles
            if (this.players[this.current_player].in_prison) {
                this.players[this.current_player].blockedTurns--;
                if (this.players[this.current_player].blockedTurns === 0) { // 3 misses in prison is a fine of 200$
                    this.players[this.current_player].releaseFromPrison();
                    this.players[this.current_player].removeMoney(200);
                }
            }

            if (this.nb_doubles > 2) this.players[this.current_player].putInPrison(); // put in prison if 3 doubles
            can_rethrow = false;
        }
        else {                                              // Doubles
            if (this.players[this.current_player].in_prison) {
                this.goOutOfPrison()
                can_rethrow = false;
            }
            else this.nb_doubles++;
        }

        this.getPossibleActions(this.current_player);
        if (!can_rethrow) this.possible_actions = this.possible_actions.filter(action => action !== "dice");
    }

    /**
     * Buy the tile the current player is standing on.
     *
     * @returns {void}
    */
    buy() {
        const player = this.players[this.current_player];
        const tile = this.board[player.placement];

        // Déduire le prix
        player.removeMoney(tile.object.price);

        // Ajouter l'objet à l'inventaire
        player.addToInventory(tile.object);

        // Assigner le propriétaire
        tile.owned = true;

        // Mettre à jour les actions
        this.getPossibleActions(this.current_player);
    }

    /**
     * Sell a property from the current player's inventory.
     *
     * @param {number} tile_index the tile being sold
     * @returns {void}
     */
    sell(tile_index) {
        console.log(tile_index);
        this.players[this.current_player].addMoney(this.board[tile_index].object.mortgage);
        let inv_index = this.players[this.current_player].inventory.indexOf(this.board[tile_index].object);
        this.players[this.current_player].removeFromInventory(inv_index);
        this.board[tile_index].owned = false;
    }

    /**
     * Build a structure on a property owned by the player.
     *
     * @returns {void}
     */
    build() {
        console.log("building");
    }

    /**
     * Trade with another player.
     *
     * @param {number} player_to_trade_index - Index of the player to trade with.
     * @returns {void}
     */
    trade(player_to_trade_index) {
        console.log(this.players[this.current_player].inventory);
        console.log(this.players[player_to_trade_index].inventory);
    }

    /**
     * Release the current player from prison.
     *
     * @returns {void}
     */
    goOutOfPrison() {
        this.players[this.current_player].releaseFromPrison();
        console.log(this.players[this.current_player].in_prison);
    }
}