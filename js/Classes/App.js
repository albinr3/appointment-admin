import {petInput, ownerInput, telInput, 
    dateInput, hourInput, symptomInput, form} from "../variables.js";

import { appointmentInfo, newAppointment, createDB} from "../functions.js";

class App {
    constructor(){
        this.initApp();
        this.createDB();
    }

    initApp() {
        petInput.addEventListener("input", appointmentInfo);
        ownerInput.addEventListener("input", appointmentInfo);
        telInput.addEventListener("input", appointmentInfo);
        dateInput.addEventListener("input", appointmentInfo);
        hourInput.addEventListener("input", appointmentInfo);
        symptomInput.addEventListener("input", appointmentInfo);
    
        form.addEventListener("submit", newAppointment);
        
    };

    createDB(){
        createDB();
    }
};

export default App;

