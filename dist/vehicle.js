"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
class Vehicle {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
    describe() {
        return `This is a ${this.type} named ${this.name}.`;
    }
}
exports.Vehicle = Vehicle;
