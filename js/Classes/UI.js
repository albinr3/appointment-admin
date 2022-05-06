import {deleteAppointment, editAppointment} from "../functions.js"
import {ulAppointment, form} from "../variables.js"

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

export default UI;