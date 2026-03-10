"use strict";

export default class Tile {
    /**
     * Creates a new tile
     * @param type the type of the tile (color start ect)
     * @param price the price of the tile (0 if not buyable)
     * @param name the of the tile to show
     * @param action the action done when landed on the tile
     */
    constructor(type, price, name, action = null) {
        this.type = type;
        this.price = price;
        this.name = name;
        this.action = action;
    }
}