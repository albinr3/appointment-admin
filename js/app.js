//Variables
//form fields
const petInput = document.querySelector("#mascota");
const ownerInput = document.querySelector("#propietario");
const telInput = document.querySelector("#telefono");
const dateInput = document.querySelector("#fecha");
const hourInput = document.querySelector("#hora");
const symptomInput = document.querySelector("#sintomas");
const btnMake = document.querySelector("#btn-crear");

//UI
const form = document.querySelector("#nueva-cita")
const ulAppointment = document.querySelector("#citas");

//classes

class Appointment {
    constructor() {
        this.appointments = [];
    }

    addAppointment(appointment){
        this.appointments = [...this.appointments, appointment];
        console.log(this.appointments);
    }

    
};

class UI {
    printAlert(message, type) {

        //we create the div alert
        const alertDiv = document.createElement("div");
        alertDiv.textContent = message;
        alertDiv.classList.add("text-center", "alert", "d-block", "col-12")

        //add classes depending if it is an error or not.
        if(type === "error"){
            alertDiv.classList.add("alert-danger");
        } else {
            alertDiv.classList.add("alert-success");
        };
        
        //add to the html
        form.insertBefore(alertDiv, form.children[7]);

        //remove alert after 4 seconds
        setTimeout( () => alertDiv.remove(), 4000);
    }


};

const ui = new UI();
const adminAppointment = new Appointment();

//Eventlisteners
eventlisteners();
function eventlisteners(){
    petInput.addEventListener("input", appointmentInfo);
    ownerInput.addEventListener("input", appointmentInfo);
    telInput.addEventListener("input", appointmentInfo);
    dateInput.addEventListener("input", appointmentInfo);
    hourInput.addEventListener("input", appointmentInfo);
    symptomInput.addEventListener("input", appointmentInfo);

    form.addEventListener("submit", newAppointment);
};


// object with the appointment info
const appointmentObj = {
    pet : "",
    owner : "",
    tel : "",
    date : "",
    hour : "",
    symptom : "",
}

//functions

//add info to the appointment object
function appointmentInfo(e) {
    appointmentObj[e.target.name] = e.target.value;
};

//Validate and add a new appointment to the appointment class
function newAppointment(e) {
    e.preventDefault();

    const {pet, owner, tel, date, hour, symptom} = appointmentObj;
    if (!pet || !owner || !tel || !date || !hour || !symptom){
        ui.printAlert("All fields are required!!", "error");
        return;
    }

    // add a new unique id
    appointmentObj.id = Date.now();

    //we add a new appointment to the appointment class
    adminAppointment.addAppointment({...appointmentObj}); //we use spread operation to avoid duplicate the same object so we clone the object.
};