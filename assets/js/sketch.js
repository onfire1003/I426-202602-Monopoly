"use strict";
import Game from "./class/game.js";
import Dice from "./class/dice.js";

const game = new Game(8);
const GameBoard = game.board.map(tile => tile.type);
const GameBoardPrice = game.board.map(tile => tile.price);
const GameBoardName = game.board.map(tile => tile.name);


const StreetsColors = {
    "brown": "#8c3916",
    "cyan": "#b9f1fb",
    "magenta": "#f241a2",
    "orange": "#f0a933",
    "red": "#de1c1c",
    "yellow": "#e8ee3a",
    "green": "#14a14a",
    "blue": "#3982e4"
// A FAIRE !!!
}


// variables globales
let pawns = [];
let diceImages = [];

// Objects
let dice_1;
let dice_2;


// on garde les références des boutons si besoin
let inventoryBtns = [];

let n = window.nbPlayers || 0;

// ---------------- Style ----------------
function addGlobalButtonStyle() {
    const css = `
        button {
            width: 150px;
            height: 50px;
            background-color: #4F46E5;
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 17px;
            font-family: system-ui, sans-serif;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: 0.2s;
        }

        button:hover {
            background-color: #4338CA;
            transform: scale(1.05);
        }

        button:active {
            transform: scale(0.97);
        }
    `;

    const styleTag = createElement('style', css);
    styleTag.parent(document.head);
}

// ---------------- fonction play button ----------------
function inventoryPopup(id, title) {
    // fermer si ouvert
    const old = document.getElementById(`popup-${id}`);
    if (old) old.remove();

    // Overlay
    const bg = createDiv('')
        .id(`popup-${id}`)
        .addClass('inventory-overlay');

    // Container panel
    const popup = createDiv('').addClass('inventory-popup');
    popup.parent(bg);

    // Titre
    const h = createElement('h2', title);
    h.parent(popup);

    // Contenu exemple
    const content = createDiv(`
        <div class="inventory-content">
            Inventaire vide pour le moment.
        </div>
    `);
    content.parent(popup);

    // Bouton fermer
    const closeBtn = createButton('Fermer');
    closeBtn.addClass('inventory-close');
    closeBtn.parent(popup);

    // Fermeture
    closeBtn.mousePressed(() => bg.remove());

    // Fermeture en cliquant hors du popup
    bg.mousePressed((e) => {
        if (e.target.classList.contains('inventory-overlay')) {
            bg.remove();
        }
    });
}

async function throwTheDices(dice_1, dice_2) {
    const result = await rollTheDices(dice_1, dice_2);
    return result;
}

function rollTheDices(dice_1, dice_2) {
    return new Promise((resolve) => {
        let finished = 0;

        function checkEnd() {
            finished++;

            if (finished === 2) {
                let dice1Result = dice_1.finalValue;
                let dice2Result = dice_2.finalValue;

                // Si un seul résultat existe, on le duplique
                if (dice1Result != null && dice2Result == null) {
                    dice2Result = dice1Result;
                }
                if (dice2Result != null && dice1Result == null) {
                    dice1Result = dice2Result;
                }

                // Sécurité ultime : si les 2 sont null
                if (dice1Result == null && dice2Result == null) {
                    dice1Result = 1;
                    dice2Result = 1;
                }

                const total = dice1Result + dice2Result;

                resolve({
                    dice1: dice1Result,
                    dice2: dice2Result,
                    total: total
                });
            }
        }

        dice_1.rollDice(20, checkEnd);
        dice_2.rollDice(20, checkEnd);
    });
}
function getOffsetForPlayer(playerIndex) {
    let sameCase = 0;
    for (let j = 0; j < playerIndex; j++) {
        if (game.players[j].placement === game.players[playerIndex].placement)
            sameCase++;
    }
    return { x: (sameCase % 2) * 18, y: Math.floor(sameCase / 2) * 18 };
}
// ---------------- ASSETS ----------------
window.preload = function() {
    // load dice
    diceImages = [
        loadImage('/assets/images/dice_1.png'),
        loadImage('/assets/images/dice_2.png'),
        loadImage('/assets/images/dice_3.png'),
        loadImage('/assets/images/dice_4.png'),
        loadImage('/assets/images/dice_5.png'),
        loadImage('/assets/images/dice_6.png')
    ];

    // load pawns
    pawns = [
        loadImage('/assets/images/pawn_0.png'),
        loadImage('/assets/images/pawn_1.png'),
        loadImage('/assets/images/pawn_2.png'),
        loadImage('/assets/images/pawn_3.png'),
        loadImage('/assets/images/pawn_4.png'),
        loadImage('/assets/images/pawn_5.png'),
        loadImage('/assets/images/pawn_6.png'),
        loadImage('/assets/images/pawn_7.png')
    ];
}


window.setup = function() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    background('bisque');

    dice_1 = new Dice(diceImages, [1325, 430, 100, 100]);
    dice_2 = new Dice(diceImages, [1475, 430, 100, 100]);
    addGlobalButtonStyle()
    let n = window.nbPlayers || 0;

    for (let i = 0; i < n; i++) {
        const inventory_btn = createButton('Inventaire');
        inventory_btn.position(625, 75 + (i * 95));
        inventory_btn.mousePressed(() => {
            inventoryPopup(`inventaire-${i}`, `Inventaire du joueur ${i + 1}`);
        });
         // Store a reference
        inventoryBtns.push(inventory_btn);
    }
    
    // button zone action
    // buttom menu
    const menu_btn = createButton('Menu');
    menu_btn.position(60, 850);
    menu_btn.mousePressed(openMenu);

    // buttom change
    const change_btn = createButton('Echange');
    change_btn.position(360, 850);

    // buttom sell
    const sell_btn = createButton('Vendre');
    sell_btn.position(660, 850);

    // button board game
    // buttom roll
    const roll_btn = createButton('Lancer les dés');
    roll_btn.position(1170, 700);
    let currentPlayer = 0;

    roll_btn.mousePressed(async () => {
        const n = window.nbPlayers || 0;
        if (n === 0) return;

        const result = await throwTheDices(dice_1, dice_2);

        game.players[currentPlayer].move(result.total);

        playerInPrison(game.players[currentPlayer]);

        currentPlayer = (currentPlayer + 1) % n;
    });

    // button end turn
    const turn_btn = createButton('Fin du tour');
    // TODO handle tun_btn position and display depending on when turn ends
    turn_btn.position(-100, -100);
    turn_btn.mousePressed(() => {
       dice_1.resetDice();
       dice_2.resetDice();
       // TODO change the player's turn
    });

    // buttom get out off jail
    const jail_btn = createButton('Sortir de prison');
    jail_btn.position(1380, 700);

    // buttom build
    const build_btn = createButton('Construire');
    build_btn.position(1590, 700);
}

/**
 * Updates a player's balance.
 * Returns true if successful, false otherwise.
 */


window.draw = function() {
    //draw users zones
    //draw background players
    for (let i = 0; i < window.nbPlayers; i++) {
        stroke('white');
        fill('#242424');
        rect(60, 60 + (i * 95), 750, 80);

        //draw icon players
        noStroke();
        image(pawns[i], 70, 78 + (i * 95), 45, 45);

        //draw wallet players
        textSize(32);
        fill("white");

        push();
        translate(300, 93 + (i * 95));
        rotate(180);
        text('₩', 0, 0);
        pop();

        text(': ' + game.players[i].money, 300, 115 + (i * 95));
    }

    triangle(120, 100, 150, 90, 150, 110);

    //draw game board
    let widthRect = 875;
    let heightRect = 875;

    noStroke();
    fill('#242424');
    rect(width - widthRect - 35, height / 2 - heightRect / 2, widthRect, heightRect);

    //draw square
    // corner left top
    stroke('white');
    fill('#242424');
    rect(1011, 36, 98, 98);

    //corner right top
    rect(1786, 36, 98, 98);

    //corner left bottom
    rect(1011, 811, 98, 98);

    //corner right bottom
    rect(1786, 811, 98, 98);

    //square
    for (let i = 0; i < 9; i++) {
        fill('#242424');

        //square top
        stroke('white')
        rect(1111 + (i * 75), 36, 73, 98);

        //square right
        stroke('white')
        rect(1786, 136 + (i * 75), 98, 73);

        //square bottom
        stroke('white')
        rect(1111 + (i * 75), 811, 73, 98);

        //square left
        stroke('white')
        rect(1011, 136 + (i * 75), 98, 73);

        noStroke();

        // put info on tiles
        for (let i = 0; i < GameBoard.length; i++) {
            // street colors
            if (StreetsColors[GameBoard[i]]) {
                // right
                if (i > 30) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1787, 62 + ((i - 30) * 75), 26, 71);
                }
                // top
                else if (i > 20) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1037 + ((i - 20) * 75), 108, 71, 26);
                }
                // left
                else if (i > 10) {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1083, 812 + (-(i - 10) * 75), 26, 71);
                }
                // bottom
                else {
                    fill(StreetsColors[GameBoard[i]]);
                    rect(1787 + (-i * 75), 811, 71, 26);
                }
            }
            // price
            textSize(16);
            fill("white");
            if (GameBoardPrice[i] !== 0) {
                // right
                if (i > 30) {
                    push();
                    textAlign(LEFT);
                    translate(1845, 128 + ((i - 30) * 75)); // 126 + 2
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1841, 116 + ((i - 30) * 75)); // 114 + 2
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // top
                else if (i > 20) {
                    push();
                    textAlign(LEFT);
                    translate(1068 + ((i - 20) * 75), 106); // 1060 + 8
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1064 + ((i - 20) * 75), 94); // 1056 + 8
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // left
                else if (i > 10) {
                    push();
                    textAlign(LEFT);
                    translate(1047, 876 + (-(i - 10) * 75)); // 1050 - 3
                    rotate(0);
                    text(GameBoardPrice[i], 0, 0);
                    pop();
                    push();
                    textAlign(LEFT);
                    translate(1043, 864 + (-(i - 10) * 75)); // 1046 - 3
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                }
                // bottom
                else {
                    push();
                    translate(1810 + (-i * 75), 892);
                    rotate(180);
                    text('₩', 0, 0);
                    pop();
                    text(GameBoardPrice[i], 1815 + (-i * 75), 905)
                }
            }
            textSize(14);
            textAlign(CENTER);
            // corners
            if (i === 0 || i === 10 || i === 20 || i === 30) {
                if (i === 0)  text(GameBoardName[i], 1835, 870);
                if (i === 10) text(GameBoardName[i], 1060, 870);
                if (i === 20) text(GameBoardName[i], 1060, 85);
                if (i === 30) text(GameBoardName[i], 1835, 85);
            }
            // right
            else if (i > 30) {
                push();
                translate(1845, 100 + ((i - 30) * 75));
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // top
            else if (i > 20) {
                push();
                translate(1075 + ((i - 20) * 75), 69);
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // left.
            else if (i > 10) {
                push();
                translate(1052, 840 + (-(i - 10) * 75));
                rotate(0);
                text(GameBoardName[i], 0, 0)
                pop();
            }
            // bottom
            else {
                text(GameBoardName[i], 1822 + (-i * 75), 870)
            }
            textAlign(LEFT);
        }
    }

    dice_1.displayDice();
    dice_2.displayDice();
    drawPawnsOnBoard();
}
function testMovePlayer(playerIndex, steps) {
    if (!game.players[playerIndex]) {
        console.log("Joueur introuvable");
        return;
    }

    game.players[playerIndex].move(steps);

    if (game.players[playerIndex].placement === 30) {
        game.players[playerIndex].placement = 10;
        console.log(`Joueur ${playerIndex + 1} envoyé en prison (case 10)`);
    }

    console.log(
        `Joueur ${playerIndex + 1} a avancé de ${steps} cases. Nouvelle position : ${game.players[playerIndex].placement}`
    );
}

function playerInPrison(player) {
    if (player.placement === 30) {
        player.placement = 10;
        return true;
    }
    return false;
}
// ↓ EN DEHORS de draw()
function drawPawnsOnBoard() {
    for (let i = 0; i < (window.nbPlayers || 0); i++) {
        const coords = game.players[i].getTileCoords(game.board);
        const offset = getOffsetForPlayer(i);
        console.log(`Joueur ${i} → case ${game.players[i].placement} → x:${coords.x} y:${coords.y}`); //Affiche les joueur 1,2,3,4,5,6,7,8 + numéro de la case actuelle + posisiton du pion
        image(pawns[i], coords.x + offset.x, coords.y + offset.y, 32, 32);
    }
}
