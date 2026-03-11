"use strict"
import Game from "./game.js";

//test game innit
let game = new Game(4);
console.log(game.nb_player);
console.log(game.players);
console.log(game.board_size);
console.log(game.board);

//-----test player-----
//money
game.players[0].addMoney(1000);
console.log(game.players[0]);
game.players[1].removeMoney(1000);
console.log(game.players[1]);
//inventory
game.players[2].addToInventory("brown 1");
game.players[2].addToInventory("brown 2");
console.log(game.players[2]);
game.players[2].removeFromInventory(1);
console.log(game.players[2]);
//movement
game.players[3].bringTo(37);
console.log(game.players[3]);
game.players[3].move(11);
console.log(game.players[3]);
//prison
game.players[3].putInPrison()
console.log(game.players[3]);
game.players[3].releaseFromPrison()
console.log(game.players[3]);