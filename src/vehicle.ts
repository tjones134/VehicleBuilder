export class Vehicle {
    constructor(public name: string, public type: string) {}

    describe(): string {
        return `This is a ${this.type} named ${this.name}.`;
    }


}

