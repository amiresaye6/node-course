/*
Coding Task 01

Create a Vehicle class which has 3 properties: color, number of wheels and horn. The color defaults to "blue", 
the default value of number of wheels is 4 and the horn defaults to "beep beep".

Add a method honkHorn() which prints the value of the horn of the vehicle.

Then create a Bicycle subclass that extends the Vehicle class. The Bicycle subclass should override Vehicle's
constructor function by changing the default values for wheels from 4 to 2 and horn from 'beep beep' to 'honk honk'.

Bonus (optional): Make each class in a separate module and use them together in a different module (main.js)

*/


export default class Vehicle {
    constructor (color = 'blue', numberOfWheels = 4, horn = 'beep beep') {
        this.color = color;
        this.numberOfWheels = numberOfWheels;
        this.horn = horn;
    }

    honkHorn() {
        console.log(this.horn);
        
    }
}


export class Bicycle extends Vehicle {
    constructor() {
        super(this.numberOfWheels, 2); // set the number of wheels to 2
    }
}
