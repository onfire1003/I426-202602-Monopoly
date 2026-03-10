"use strict"
import Game from "./game.js";

//-----test game innit-----
console.log("//////////////Innit//////////////");
let game = new Game(4);
console.log(game.nb_player);
console.log(game.players);
console.log(game.board_size);
console.log(game.board);

//-----test player-----
console.log("//////////////Player//////////////");
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

//-----test turn-----
console.log("//////////////Turn//////////////");
console.log(game.players[game.current_player]);
game.finishTurn()
console.log(game.players[game.current_player]);
console.log(game.possible_actions);
game.throwTheDice()
game.buy()
game.sell()
game.build()
game.trade(2)
game.goOutOfPrison()