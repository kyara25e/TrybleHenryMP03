import { useEffect, useContext } from "react";
import Turno from "../../components/Turno/Turno";
import Styles from "./Misturnos.module.css"
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";
import dataImg from "../../assets/dataImg.png"

function MisTurnos() {

  const { myApp, getUserAppointments } = useContext(UsersContext)

    useEffect ( () => {
        try {
        getUserAppointments();
        } catch (error) {
            Swal.fire({
                icon:"error",
                title: "Ocurrio un error al solicitar los turnos",
                text: error.msg
            })
        }

    }, [])
    
  return (
    <div >
    <div >
    <div className={Styles.contenedorTarjetas}>
        <div className={Styles.header}>
            <h2>Mis Turnos </h2>
        </div>
        <div className={Styles.infoBox}>
                <img
                    className={Styles.dataImg}
                    src={dataImg}
                    alt="dataImg"
                />
            </div>

        <div className={Styles.tarjetas}>
        {
            myApp.length > 0 ? myApp.map( app => {
                return <Turno 
                    id={app.id}
                    date={app.date}
                    time={app.time}
                    status={app.status}
                />
            }) : (
                <h1>No hay turnos para mostrar</h1>
            )
        }
        </div>

      
    </div> 
    </div>
    </div>     
    
  )
}   

export default MisTurnos;