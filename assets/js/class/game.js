/***********************************************************************************************************************
 * Program name :           game.js
 * Description :            the class for the game
 * Author :                 Cédric Jankiewicz
 * Creation date :          4.03.2026
 * Modified by :            Cédric Jankiewicz
 * Modification date :      24.03.2026
 * Version :                0.1.5
 **********************************************************************************************************************/
"use strict";
import Player from "./player.js";
import Tile from "./tile.js";


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
            this.board.push(new Tile(TilesType[i], TilesPrice[i], TilesName[i], null, TilesCoords[i]));
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

        if (this.board[player.placement].price > 0) {
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
    }

    /**
     * Roll the dice for the current player.
     * @param {int} dice_1 value of dice 1
     * @param {int} dice_2 value of dice 2
     * @returns {void}
     */
    throwTheDice(dice_1, dice_2) {
        this.players[this.current_player].move(dice_1 + dice_2);
        if (dice_1 !== dice_2) {
            this.possible_actions = this.possible_actions.filter(action => action !== "dice");
        }
    }

    /**
     * Buy the tile the current player is standing on.
     *
     * @returns {void}
     */
    buy() {
        console.log(this.board[this.players[this.current_player].placement])
    }

    /**
     * Sell a property from the current player's inventory.
     *
     * @returns {void}
     */
    sell() {
        console.log(this.players[this.current_player].inventory);
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