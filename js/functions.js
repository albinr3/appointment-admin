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
        ui.printAlert("Edited succesful");

        //pass the object to the editing appointment
        adminAppointment.editAppointment({...appointmentObj});


        //change the button text to original
        btnMake.textContent = "Create new Appointment";

        editing = false;
    } else {
       ui.printAlert("Appointment created!!!")

        // add a new unique id
        appointmentObj.id = Date.now();

        //we add a new appointment to the appointment class
        adminAppointment.addAppointment({...appointmentObj}); //we use spread operation to avoid duplicate the same object so we clone the object.
    }

    
    
    //reset form and the object
    form.reset();
    resetObj(appointmentObj);

    //show the appointments on the DOM
    ui.showAppointmentsHTML(adminAppointment)
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

    //call the method
    adminAppointment.deleteAppointment(id);

    //show a message
    ui.printAlert("Appointment deleted!!", "Success");

    //update HTML
    ui.showAppointmentsHTML(adminAppointment);
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