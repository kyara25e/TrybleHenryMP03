import { useContext } from 'react';
import Styles from './Turno.module.css';
import { UsersContext } from '../../context/UsersContext';
import Swal from 'sweetalert2';




function  Turno({ id, date, time, status}) {

    const { cancelAppointment } = useContext(UsersContext)
    const handleCancel = async () => {
        try {
            cancelAppointment(id)
            Swal.fire({
                icon: 'success',
                title: 'Turno cancelado con exito'
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'No se pudo cancelar el turno'
            })
        }
    }

  return(
    <div className={Styles.appointmentCard}>
        <div className={Styles.appointmentHeader}>
            <h3>Tuno #{id}</h3>
            <span className={status === 'Active' ? Styles.statusActive : Styles.statusInactive}>{status}</span>
        </div>
        <div className={Styles.appointmentDetails}>
            <p><strong>Fecha:</strong> <span> {date}</span></p>
            <p><strong>Hora:</strong> <span>{time}</span></p>
        </div>
        <button className={`${Styles.CancelButton} ${status === "Cancelled" ? Styles.disabled : ""}`}
            onClick={handleCancel}
            disabled={status === "Cancelled"}
        >Cancelar turno</button>

          

    </div>
    )
}

export default Turno;