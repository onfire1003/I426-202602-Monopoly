"use strict";
import Player from "./player.js";
import Tile from "./tile.js";

export default class Game {
    constructor(nb_player, board_size = 40) {
        this.nb_player = nb_player;
        this.board_size = board_size;
        this.players = [];
        this.board = [];


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

    getPlayerPosition(playerIndex) {
        return this.players[playerIndex].placement;
    }
}