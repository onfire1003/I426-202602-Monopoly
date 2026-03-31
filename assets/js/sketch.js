"use strict";
import Dice from "./class/dice.js";
const StreetsColors = {
    "brown": "#8c3916",
    "cyan": "#b9f1fb",
    "magenta": "#f241a2",
    "orange": "#f0a933",
    "red": "#de1c1c",
    "yellow": "#e8ee3a",
    "green": "#14a14a",
    "blue": "#3982e4"
}


// variables globales
let pawns = [];
let diceImages = [];

// Objects
let dice_1;
let dice_2;


// on garde les références des boutons si besoin
let inventoryBtns = [];
let roll_btn, finish_btn, jail_btn, buy_btn, exchange_btn, sell_btn, build_btn;


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

    const bg = createDiv('')
        .id(`popup-${id}`)
        .addClass('inventory-overlay');

    const popup = createDiv('').addClass('inventory-popup');
    popup.parent(bg);

    createElement('h2', title).parent(popup);

    const inv = game.players[id].inventory;

    // 🟦 TRI PAR ID
    const sorted = [...inv].sort((a, b) => {
        const idA = typeof a === "string" ? 9999 : a.id ?? 9999;
        const idB = typeof b === "string" ? 9999 : b.id ?? 9999;
        return idA - idB;
    });

    // 🏷️ LISTES PAR CATEGORIES
    let streetsList = [];
    let railroadsList = [];
    let utilitiesList = [];
    let consumablesList = [];

    sorted.forEach(item => {
        if (typeof item === "string") {
            consumablesList.push(item);
        } else if (item.type === "railroad") {
            railroadsList.push(`${item.name} — ${item.price}$`);
        } else if (item.type === "utility") {
            utilitiesList.push(`${item.name} — ${item.price}$`);
        } else if (item.color) {
            streetsList.push(`${item.name} (${item.color}) — ${item.price}$`);
        }
    });

    // 🖨️ HTML FINAL
    let message = `
        <div class="inv-section">
            <h3>🏠 Propriétés</h3>
            ${streetsList.length ? streetsList.join("<br>") : "<i>Aucune</i>"}
        </div>

        <div class="inv-section">
            <h3>🚆 Gares</h3>
            ${railroadsList.length ? railroadsList.join("<br>") : "<i>Aucune</i>"}
        </div>

        <div class="inv-section">
            <h3>⚡ Compagnies</h3>
            ${utilitiesList.length ? utilitiesList.join("<br>") : "<i>Aucune</i>"}
        </div>

        <div class="inv-section">
            <h3>🎟️ Consommables</h3>
            ${consumablesList.length ? consumablesList.join("<br>") : "<i>Aucune</i>"}
        </div>
    `;

    const content = createDiv(`<div class="inventory-content">${message}</div>`);
    content.parent(popup);

    const closeBtn = createButton('Fermer');
    closeBtn.addClass('inventory-close');
    closeBtn.parent(popup);
    closeBtn.mousePressed(() => bg.remove());

    bg.mousePressed((e) => {
        if (e.target.classList.contains('inventory-overlay')) bg.remove();
    });
}


function mortgagePopup(id, title) {
    // fermer si ouvert
    const old = document.getElementById(`mortgage-${id}`);
    if (old) old.remove();

    const bg = createDiv('')
        .id(`mortgage-${id}`)
        .addClass('inventory-overlay');

    const popup = createDiv('').addClass('inventory-popup');
    popup.parent(bg);

    createElement('h2', title).parent(popup);

    const inv = game.players[game.current_player].inventory;

    // 🟦 TRI PAR ID
    const sorted = [...inv].sort((a, b) => {
        const idA = typeof a === "string" ? 9999 : a.id ?? 9999;
        const idB = typeof b === "string" ? 9999 : b.id ?? 9999;
        return idA - idB;
    });

    // 🏷️ LISTES PAR CATEGORIES
    let streetsList = [];
    let railroadsList = [];
    let utilitiesList = [];

    sorted.forEach(item => {
        if (typeof item === "string") return;

        if (item.type === "railroad") {
            railroadsList.push({
                label: `${item.name} — ${item.mortgage}$`,
                id: item.id
            });
        } else if (item.type === "utility") {
            utilitiesList.push({
                label: `${item.name} — ${item.mortgage}$`,
                id: item.id
            });
        } else if (item.color) {
            streetsList.push({
                label: `${item.name} (${item.color}) — ${item.mortgage}$`,
                id: item.id
            });
        }
    });

    function addSection(title, list, parent) {
        const section = createDiv('').addClass('inv-section');
        section.parent(parent);

        createElement('h3', title).parent(section);

        if (!list.length) {
            createElement('i', 'Aucune').parent(section);
            return;
        }

        list.forEach(item => {
            const row = createDiv('').addClass('inv-row');
            row.parent(section);

            // texte
            createSpan(item.label).parent(row);

            // bouton
            const btn = createButton(
                'Hypothéquer'
            );
            btn.addClass('inventory-btn');
            btn.parent(row);

            btn.mousePressed(() => {
                game.sell(item.id)

                // refresh popup
                bg.remove();
                mortgagePopup(id, title);
            });
        });
    }

    const content = createDiv('').addClass('inventory-content');
    content.parent(popup);

    addSection('🏠 Propriétés', streetsList, content);
    addSection('🚆 Gares', railroadsList, content);
    addSection('⚡ Compagnies', utilitiesList, content);

    const closeBtn = createButton('Fermer');
    closeBtn.addClass('inventory-close');
    closeBtn.parent(popup);
    closeBtn.mousePressed(() => bg.remove());

    bg.mousePressed((e) => {
        if (e.target.classList.contains('inventory-overlay')) bg.remove();
    });
}


async function throwTheDices(dice_1, dice_2) {
    return await rollTheDices(dice_1, dice_2);
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
    let n = window.game.nb_player || 0;

    inventoryBtns.forEach(btn => btn.remove());
    inventoryBtns = [];
    for (let i = 0; i < n; i++) {
        const inventory_btn = createButton('Inventaire');
        inventory_btn.position(625, 75 + (i * 95));
        inventory_btn.mousePressed(() => {
                inventoryPopup(i, `Inventaire du joueur ${i + 1}`);
        });
         // Store a reference
        inventoryBtns.push(inventory_btn);
    }
    
    // button zone action
    // buttom menu
    const menu_btn = createButton('Menu');
    menu_btn.position(60, 850);
    menu_btn.mousePressed(openMenu);

    // buttom exchange
    exchange_btn = createButton('Echange');
    exchange_btn.position(360, 850);
    exchange_btn.mousePressed(() => {
        game.trade(1);
    });

    // buttom sell
    sell_btn = createButton('Vendre');
    sell_btn.position(660, 850);
    sell_btn.mousePressed(() => {
        mortgagePopup();
    });

    // button board game
    // button roll
    roll_btn = createButton('Lancer les dés');
    roll_btn.position(1170, 700);

    roll_btn.mousePressed(async () => {
        const result = await throwTheDices(dice_1, dice_2);
        console.log(result);
        game.throwTheDice(result.dice1, result.dice2);

        if (game.players[game.current_player].placement === 30) {
            game.players[game.current_player].putInPrison();
        }
    });

    // button finish turn
    finish_btn = createButton('Finir le tour');
    finish_btn.position(1170, 700);
    finish_btn.mousePressed(() => {
        dice_1.resetDice();
        dice_2.resetDice();
        window.game.finishTurn()
    });
    finish_btn.hide();

    // buttom get out off jail
    jail_btn = createButton('Sortir de prison');
    jail_btn.position(1380, 700);
    jail_btn.mousePressed(() => {
        window.game.goOutOfPrison()
    });

    buy_btn = createButton('Acheter');
    buy_btn.position(1380, 700);
    buy_btn.mousePressed(() => {
        window.game.buy()
    });

    // buttom build
    build_btn = createButton('Construire');
    build_btn.position(1590, 700);
    build_btn.mousePressed(() => {
        window.game.build()
    });
}

window.draw = function() {
    //draw users zones
    //draw background players
    for (let i = 0; i < (window.game.nb_player); i++) {
        stroke('white');
        fill('#242424');
        rect(60, 60 + (i * 95), 750, 80);

        //draw icon players
        noStroke();
        if (game.players[i].bankrupt) {
            tint(128, 128)
            image(pawns[i], 70, 78 + (i * 95), 45, 45);
            inventoryBtns[i].hide();
        }
        else {
            tint(255, 255)
            image(pawns[i], 70, 78 + (i * 95), 45, 45);
        }

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

    triangle(120, 100+95*game.current_player, 150, 90+95*game.current_player, 150, 110+95*game.current_player);

    //buttons
    jail_btn[window.game.possible_actions.includes("go_out_of_prison") ? 'show' : 'hide']();
    buy_btn[window.game.possible_actions.includes("buy") ? 'show' : 'hide']();
    exchange_btn[window.game.possible_actions.includes("exchange") ? 'show' : 'hide']();
    sell_btn[window.game.possible_actions.includes("sell") ? 'show' : 'hide']();
    build_btn[window.game.possible_actions.includes("build") ? 'show' : 'hide']();
    if (window.game.possible_actions.includes("dice")) {
        finish_btn.hide();
        roll_btn.show();
    } else {
        roll_btn.hide();
        finish_btn.show();
    }
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
        for (let i = 0; i < window.game.board_size; i++) {
            // street colors
            if (StreetsColors[window.game.board[i].type]) {
                // right
                if (i > 30) {
                    fill(StreetsColors[window.game.board[i].type]);
                    rect(1787, 62 + ((i - 30) * 75), 26, 71);
                }
                // top
                else if (i > 20) {
                    fill(StreetsColors[window.game.board[i].type]);
                    rect(1037 + ((i - 20) * 75), 108, 71, 26);
                }
                // left
                else if (i > 10) {
                    fill(StreetsColors[window.game.board[i].type]);
                    rect(1083, 812 + (-(i - 10) * 75), 26, 71);
                }
                // bottom
                else {
                    fill(StreetsColors[window.game.board[i].type]);
                    rect(1787 + (-i * 75), 811, 71, 26);
                }
            }
            // price
            textSize(16);
            fill("white");
            if (window.game.board[i].object) {
                // right
                if (i > 30) {
                    push();
                    textAlign(LEFT);
                    translate(1845, 128 + ((i - 30) * 75)); // 126 + 2
                    rotate(0);
                    text(window.game.board[i].object.price, 0, 0);
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
                    text(window.game.board[i].object.price, 0, 0);
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
                    text(window.game.board[i].object.price, 0, 0);
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
                    text(window.game.board[i].object.price, 1815 + (-i * 75), 905)
                }
            }
            textSize(14);
            textAlign(CENTER);
            // corners
            if (i === 0 || i === 10 || i === 20 || i === 30) {
                if (i === 0)  text(window.game.board[i].name, 1835, 870);
                if (i === 10) text(window.game.board[i].name, 1060, 870);
                if (i === 20) text(window.game.board[i].name, 1060, 85);
                if (i === 30) text(window.game.board[i].name, 1835, 85);
            }
            // right
            else if (i > 30) {
                push();
                translate(1845, 100 + ((i - 30) * 75));
                rotate(0);
                text(window.game.board[i].name, 0, 0)
                pop();
            }
            // top
            else if (i > 20) {
                push();
                translate(1075 + ((i - 20) * 75), 69);
                rotate(0);
                text(window.game.board[i].name, 0, 0)
                pop();
            }
            // left.
            else if (i > 10) {
                push();
                translate(1052, 840 + (-(i - 10) * 75));
                rotate(0);
                text(window.game.board[i].name, 0, 0)
                pop();
            }
            // bottom
            else {
                text(window.game.board[i].name, 1822 + (-i * 75), 870)
            }
            textAlign(LEFT);
        }
    }

    dice_1.displayDice();
    dice_2.displayDice();
    drawPawnsOnBoard();
}

// ↓ EN DEHORS de draw()
function drawPawnsOnBoard() {
    for (let i = 0; i < (window.game.nb_player || 0); i++) {
        const coords = game.board[game.players[i].placement].coords;
        const offset = getOffsetForPlayer(i);
        //console.log(`Joueur ${i} → case ${game.players[i].placement} → x:${coords.x} y:${coords.y}`); //Affiche les joueur 1,2,3,4,5,6,7,8 + numéro de la case actuelle + posisiton du pion
        if (!game.players[i].bankrupt) {
            image(pawns[i], coords.x + offset.x, coords.y + offset.y, 32, 32);
        }
    }
}
