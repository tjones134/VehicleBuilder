import * as readline from 'readline';
import { Vehicle } from './Vehicle';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let vehicles: Vehicle[] = []; // Store created vehicles
let selectedVehicle: Vehicle | null = null; // Currently selected vehicle

function mainMenu() {
    console.log('\n1. Create a new vehicle');
    console.log('2. Select an existing vehicle');
    console.log('3. Exit');

    rl.question('Select an option: ', (option) => {
        switch (option) {
            case '1':
                createVehicle();
                break;
            case '2':
                selectVehicle();
                break;
            case '3':
                console.log('Exiting...');
                rl.close();
                break;
            default:
                console.log('Invalid option. Please try again.');
                mainMenu();
        }
    });
}

function createVehicle() {
    rl.question('Enter vehicle name: ', (name) => {
        rl.question('Enter vehicle type (car/truck/motorbike): ', (type) => {
            if (['car', 'truck', 'motorbike'].includes(type.toLowerCase())) {
                const vehicle = new Vehicle(name, type);
                vehicles.push(vehicle); // Store the created vehicle
                console.log(vehicle.describe());
                selectedVehicle = vehicle; // Set as the currently selected vehicle
                vehicleActions(); // Call vehicleActions after creation
            } else {
                console.log('Invalid vehicle type. Please choose car, truck, or motorbike.');
                createVehicle(); // Retry vehicle creation
            }
        });
    });
}

function selectVehicle() {
    if (vehicles.length === 0) {
        console.log('No vehicles available. Please create a vehicle first.');
        mainMenu();
        return;
    }

    console.log('Select an existing vehicle:');
    vehicles.forEach((vehicle, index) => {
        console.log(`${index + 1}. ${vehicle.describe()}`);
    });

    rl.question('Select a vehicle by number: ', (index) => {
        const vehicleIndex = parseInt(index) - 1;
        if (vehicleIndex >= 0 && vehicleIndex < vehicles.length) {
            selectedVehicle = vehicles[vehicleIndex];
            console.log(`You selected: ${selectedVehicle.describe()}`);
            vehicleActions();
        } else {
            console.log('Invalid selection. Please try again.');
            selectVehicle();
        }
    });
}

function vehicleActions() {
    if (!selectedVehicle) {
        console.log('No vehicle selected.');
        mainMenu();
        return;
    }

    console.log(`\nYou are now using: ${selectedVehicle.describe()}`);
    console.log('1. Perform an action');
    console.log('2. Return to main menu');

    rl.question('Select an option: ', (option) => {
        switch (option) {
            case '1':
                console.log(`Performing action on ${selectedVehicle.name}...`);
                console.log(`${selectedVehicle.name} is being driven!`);
                vehicleActions(); // Return to vehicle actions after performing
                break;
            case '2':
                mainMenu();
                break;
            default:
                console.log('Invalid option. Please try again.');
                vehicleActions();
        }
    });
}

// Start the application
mainMenu();

