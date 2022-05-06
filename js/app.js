//Variables
//form fields
const petInput = document.querySelector("#mascota");
const ownerInput = document.querySelector("#propietario");
const telInput = document.querySelector("#telefono");
const dateInput = document.querySelector("#fecha");
const hourInput = document.querySelector("#hora");
const symptomInput = document.querySelector("#sintomas");
const btnMake = document.querySelector("#btn-crear");

let editing;

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

    deleteAppointment(id){
        this.appointments = this.appointments.filter( (appointment) => appointment.id != id);
    }

    editAppointment(appointmentObj){
        
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

    showAppointmentsHTML({appointments}) {

        //to clear previus html
        this.cleanHTML();

        appointments.forEach( appointment => {
            const {pet, owner, tel, date, hour, symptom, id} = appointment;
            
            const divAppointment = document.createElement("div");
            divAppointment.classList.add("cita", "p-3");
            divAppointment.dataset.id = id;

            //creating the html of each field
            const petTitle = document.createElement("h2");
            petTitle.classList.add("card-title", "font-weight-bolder");
            petTitle.textContent = pet;

            const ownerText = document.createElement("p");
            ownerText.innerHTML = `
                <span class="font-weight-bolder">Owner: </span>${owner}
            `;

            const telText = document.createElement("p");
            telText.innerHTML = `
                <span class="font-weight-bolder">Tel: </span>${tel}
            `;

            const dateText = document.createElement("p");
            dateText.innerHTML = `
                <span class="font-weight-bolder">Date: </span>${date}
            `;

            const hourText = document.createElement("p");
            hourText.innerHTML = `
                <span class="font-weight-bolder">Hour: </span>${hour}
            `;

            const symptomText = document.createElement("p");
            symptomText.innerHTML = `
                <span class="font-weight-bolder">Symptom: </span>${symptom}
            `;

            //delete this appointment button
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("btn", "btn-danger", "mr-2");
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => deleteAppointment(id);

            //edit this appointment button
            const editBtn = document.createElement("button");
            editBtn.classList.add("btn", "btn-info", "mr-2");
            editBtn.innerHTML = `
                Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            `;
            editBtn.onclick = () => editAppointment(appointment);

            //adding each text to the div
            divAppointment.appendChild(petTitle);
            divAppointment.appendChild(ownerText);
            divAppointment.appendChild(telText);
            divAppointment.appendChild(dateText);
            divAppointment.appendChild(hourText);
            divAppointment.appendChild(symptomText);
            divAppointment.appendChild(deleteBtn);
            divAppointment.appendChild(editBtn);

            //adding the div to the dom
            ulAppointment.appendChild(divAppointment);


        })
    }

    //clear previus html
    cleanHTML(){
        while(ulAppointment.firstChild) {
            ulAppointment.removeChild(ulAppointment.firstChild);
        };
    };

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
    // if (!pet || !owner || !tel || !date || !hour || !symptom){
    //     ui.printAlert("All fields are required!!", "error");
    //     return;
    // }


    if(editing){
        ui.printAlert("Edited succesful");
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
function resetObj(obj){
    obj.pet = "";
    obj.owner = "";
    obj.tel = "";
    obj.date = "";
    obj.hour = "";
    obj.symptom = "";
};

function deleteAppointment(id) {

    //call the method
    adminAppointment.deleteAppointment(id);

    //show a message
    ui.printAlert("Appointment deleted!!", "Success");

    //update HTML
    ui.showAppointmentsHTML(adminAppointment);
}

function editAppointment(appointment) {

    const {pet, owner, tel, date, hour, symptom, id} = appointment;

    //fill the fields
    petInput.value = pet;
    ownerInput.value = owner;
    telInput.value = tel;
    dateInput.value = date;
    hourInput.value = hour;
    symptomInput.value = symptom;

    //fill the object with the edited info
    appointment.pet = pet;
    appointment.owner = owner;
    appointment.tel = tel;
    appointment.date = date;
    appointment.hour = hour;
    appointment.symptom = symptom;
    appointment.id = id;

    //change button text
    btnMake.textContent = "Save changes";

    editing = true;
    
}