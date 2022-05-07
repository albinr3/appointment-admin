import UI from "./Classes/UI.js";
import Appointment from "./Classes/Appointment.js";
import { btnMake, form, petInput, ownerInput, telInput, dateInput,
hourInput, symptomInput} from "./variables.js";


//instances
const ui = new UI();
const adminAppointment = new Appointment();

// object with the appointment info
const appointmentObj = {
    pet : "",
    owner : "",
    tel : "",
    date : "",
    hour : "",
    symptom : "",
}

//editing boolean
let editing;

//database
export let DB;

//functions
//add info to the appointment object
export function appointmentInfo(e) {
    appointmentObj[e.target.name] = e.target.value;
    
};

//Validate and add a new appointment to the appointment class
export function newAppointment(e) {
    e.preventDefault();

    const {pet, owner, tel, date, hour, symptom} = appointmentObj;
    if (!pet || !owner || !tel || !date || !hour || !symptom){
        ui.printAlert("All fields are required!!", "error");
        return;
    }

    
    if(editing){
        //editing appointment
        ui.printAlert("Edited succesful");

        //pass the object to the editing appointment
        adminAppointment.editAppointment({...appointmentObj});

        //edit the appointment on the DB
        const transaction = DB.transaction("AppointmentsTable", "readwrite");
        const objectStore = transaction.objectStore("AppointmentsTable");
        objectStore.put(appointmentObj);

        //on success
        transaction.oncomplete = function() {
            //change the button text to original
            btnMake.textContent = "Create new Appointment";
            console.log("debe cambiar el boton");
            editing = false;
        };

        //on error
        transaction.onerror = () => console.log("THERE WAS AN ERROR EDITING THE APPOINTMENT");


        
    } else {
       

        // add a new unique id
        appointmentObj.id = Date.now();

        //we add a new appointment to the appointment class
        adminAppointment.addAppointment({...appointmentObj}); //we use spread operation to avoid duplicate the same object so we clone the object.

        //we add the new appointment to the DB
        const transaction = DB.transaction(["AppointmentsTable"], "readwrite");

        // allow objectstore
        const objectStore = transaction.objectStore("AppointmentsTable");

        //insert to the database
        objectStore.add(appointmentObj);
        
        
        transaction.oncomplete = () => {
            console.log("La cita de guardo correctamente!");
           
             //new appointment
            ui.printAlert("Appointment created!!!")
         };
    }

    
    
    //reset form and the object
    form.reset();
    resetObj(appointmentObj);

    //show the appointments on the DOM
    ui.showAppointmentsHTML()
};

//reset the object to the validation
export function resetObj(obj){
    obj.pet = "";
    obj.owner = "";
    obj.tel = "";
    obj.date = "";
    obj.hour = "";
    obj.symptom = "";
};

export function deleteAppointment(id) {

    //this delete the appointment from the database
    const transaction = DB.transaction("AppointmentsTable", "readwrite");
    const objectStore = transaction.objectStore("AppointmentsTable");
    objectStore.delete(id);

    transaction.oncomplete = () => {
        
        //show a message
        ui.printAlert("Appointment deleted!!", "Success");

        //update HTML
        ui.showAppointmentsHTML();
    };

    transaction.onerror = () => {
        console.log("There was an error deleting the appointment!");
    }

    
}

export function editAppointment(appointment) {

    const {pet, owner, tel, date, hour, symptom, id} = appointment;

    //fill the fields
    petInput.value = pet;
    ownerInput.value = owner;
    telInput.value = tel;
    dateInput.value = date;
    hourInput.value = hour;
    symptomInput.value = symptom;

    //fill the object with the edited info
    appointmentObj.pet = pet;
    appointmentObj.owner = owner;
    appointmentObj.tel = tel;
    appointmentObj.date = date;
    appointmentObj.hour = hour;
    appointmentObj.symptom = symptom;
    appointmentObj.id = id;

    //change button text
    btnMake.textContent = "Save changes";

    editing = true;
    
}

export function createDB() {
    //we create the database
    const createDB = window.indexedDB.open("AppointmentsDB", 1.0);


    //if there is and error
    createDB.onerror = () => console.log("ERROR creating DB!");

    //if it is success
    createDB.onsuccess = () => {
        console.log("DB created successful!");
        DB = createDB.result;

        //show appointments when the DB is ready
        ui.showAppointmentsHTML();
    }

    //define schema
    createDB.onupgradeneeded = (e) => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('AppointmentsTable', { keyPath: 'id',  autoIncrement: true } );
        
        //we define all the columns
        objectStore.createIndex('Pet', 'pet', { unique: false } );
        objectStore.createIndex('Owner', 'owner', { unique: true } );
        objectStore.createIndex('Tel', 'tel', { unique: false } );
        objectStore.createIndex('Date', 'date', { unique: false } );
        objectStore.createIndex('Hour', 'hour', { unique: false } );
        objectStore.createIndex('Symptom', 'symptom', { unique: false } );
        objectStore.createIndex('Id', 'id', { unique: true } );

        console.log("Tabla creada!")

    }
}