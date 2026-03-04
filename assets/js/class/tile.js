"use strict";

export default class Tile {
    constructor(type, price, name, action = null) {
        this.type = type;
        this.price = price;
        this.name = name;
        this.action = action;
    }
}