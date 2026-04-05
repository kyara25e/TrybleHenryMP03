export const formValidates = (input) => {

    const errors = {}
    
    if(!input.username) errors.username = 'el usuario es requerido'
    if(!input.password) errors.username = 'la contraseña es requerida'

    if(!/^[a-zA-Z0-9]+$/.test(input.username)) errors.username = 'el username no puede tener caracteres especiales'

    if(input.password.length < 8) errors.password = 'la contraseña debe tener al menos 8 caracteres'
    if( !/[A-Z]/.test(input.password)) errors.password = 'la contraseña debe tener al menos 1 letra mayuscula'
    if( !/[0-9]/.test(input.password)) errors.password = 'la contraseña debe tener al menos 1 numero'
    if( !/[!@#$%^&*]/.test(input.password)) errors.password = 'la contraseña debe tener al menos 1 caracter especial'

    return errors
}


export const registerFormValidates = (input) => {
    const errors = {}

    if(!input.name.trim()) {
     errors.name = 'el nombre es requerido'
    } else if (!/^[a-zA-Z\s]+$/.test(input.name)) {
     errors.name = 'el nombre solo puede contener letras y espacios'
    }

    if (!input.email.trim()) {
     errors.email = 'el email es requerido'
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
     errors.email = 'el email no es valido'
    }

    if (!input.birthdate) {
     errors.birthdate = 'la fecha de nacimiento es requerida'
    } else {
     const today = new Date()
     const birthdate = new Date(input.birthdate)
     let age = today.getFullYear() - birthdate.getFullYear()
     const monthDiff = today.getMonth() - birthdate.getMonth()
     const dayDiff = today.getDate() - birthdate.getDate()
    

     if (
        age < 18 ||
        (age < 18 && monthDiff < 0 || (monthDiff === 0 && dayDiff < 0))
        ) {
        errors.birthdate = 'debes ser mayor de 18 años'
     }
    }

    if (!input.nDni) {
     errors.nDni = 'el nDni es requerido'
    } else if (!/^\d{7,8}$/.test(input.nDni)) {
     errors.nDni = 'el nDni debe tener entre 7 y 8 digitos'
    } else if (input.nDni.length < 7 || input.nDni.length > 8) {
     errors.nDni = 'el nDni debe tener entre 7 y 8 digitos'
    }

    if(!input.username.trim()) {
     errors.username = 'el username es requerido'
    } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
     errors.username = 'el username no puede tener caracteres especiales'
    }

    if(!input.password) {
     errors.password = 'la contraseña es requerida'
    } else {
     if(input.password.length < 8) {
      errors.password = 'la contraseña debe tener al menos 8 caracteres'
     }
     if(!/[A-Z]/.test(input.password)) {
      errors.password = 'la contraseña debe tener al menos 1 letra mayuscula'
     }
     if(!/[0-9]/.test(input.password)) {
      errors.password = 'la contraseña debe tener al menos 1 numero'
     }
     if(!/[!@#$%^&*]/.test(input.password)) {
      errors.password = 'la contraseña debe tener al menos 1 caracter especial'
     }
    }

    return errors

}

const isTimeValid = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startTime = 8 * 60; // 8:00 AM in minutes
    const endTime = 18 * 60; // 6:00 PM in minutes

    return totalMinutes >= startTime && totalMinutes < endTime;
};

export const dateTimeValidates = (input) => {
    const errors = {}
    const { date, time } = input;
    const selesctedDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    if (!date) {
        errors.date = "La fecha es obligatoria";
    } else if (selesctedDateTime < now) {
        errors.date = "No podes seleccionar una fecha pasada";
    } else if (selesctedDateTime < twentyFourHoursLater) {
        errors.date = "Debes seleccionar una fecha con al menos 24 horas de anticipación";
    } else if (
        selesctedDateTime.getDay() === 0 ||
        selesctedDateTime.getDay() === 6
    ){
        errors.date = "No se puede agendar turnos los fines de semana";
    }
    if  (!time) {
        errors.time = "La hora es obligatoria";
    } else if (!isTimeValid(time)) {
        errors.time = "La hora debe estar entre 8 AM y 6 PM";
    }
    return errors;
}