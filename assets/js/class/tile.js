"use strict";

export default class Tile {
    constructor(type, price, name, action, coords = { x: 0, y: 0 }){
        this.type = type;
        this.price = price;
        this.name = name;
        this.action = action;
        this.coords = coords;
    }
}