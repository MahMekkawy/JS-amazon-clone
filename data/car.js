class Car {
    #brand;
    #model;
    speed = 0;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.#brand = brand;
        this.#model = model;
    }

    displayInfo() {
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk: ${this.isTrunkOpen === false ? 'Closed' : 'Opened'}`)
    }

    go() {
        if (this.speed < 200 && this.isTrunkOpen === false) {
            this.speed += 5;
        } else {
            console.log('Warning Trunk Is Opend!');
        }
    }

    break() {
        if (this.speed >= 5) {
            this.speed -= 5;
        }
    }

    openTrunk() {
        if (this.speed === 0) {
            this.isTrunkOpen = true;
        } else {
            console.log('Can not open trunk while vehicle is moving!');
        }
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }
};

class RaceCar extends Car {
    acceleration;

    constructor(brand, model, acc) {
        super(brand, model);

        this.acceleration = acc;
    }

    displayInfo() {
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h}`)
    }

    go() {
        if (this.speed < 300) {
            this.speed += this.acceleration;
        } else {
            console.log('Max Speed');
        }
    }

    openTrunk() {
    }

    closeTrunk() {
    }


}

const car1 = new Car('Toyota', 'Corolla');
const car2 = new Car('Tesla', 'Model 3');
const raceCar = new RaceCar('Mclaren', 'F1', 20);

console.log(car1);
console.log(car2);
console.log(raceCar);

car1.openTrunk();
car1.go();


car1.closeTrunk();
car1.go();

car1.openTrunk();

raceCar.go();
raceCar.go();

car1.displayInfo();
car2.displayInfo();
raceCar.displayInfo();

