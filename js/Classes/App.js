import {petInput, ownerInput, telInput, 
    dateInput, hourInput, symptomInput, form} from "../variables.js";

import { appointmentInfo, newAppointment } from "../functions.js";

class App {
    constructor(){
        this.initApp();
    }

    initApp(){
        petInput.addEventListener("input", appointmentInfo);
        ownerInput.addEventListener("input", appointmentInfo);
        telInput.addEventListener("input", appointmentInfo);
        dateInput.addEventListener("input", appointmentInfo);
        hourInput.addEventListener("input", appointmentInfo);
        symptomInput.addEventListener("input", appointmentInfo);
    
        form.addEventListener("submit", newAppointment);
    };
};

export default App;

