import Styles from "./AgendarTurno.module.css"
import { useFormik } from "formik";
import { dateTimeValidates } from "../../utils/validates";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";
import tutorImg from "../../assets/agendarTurnoImg.png"


function AgendarTurno() {

    const { scheduleAppointment } = useContext(UsersContext)
 
    const formik = useFormik({
        initialValues: {
            date: "",
            time: ""
        },
        initialErrors: {
            date: 'date is required',
            time: 'time is required'
        },
        validate: dateTimeValidates,
        onSubmit: async (values) => {
            try {
                scheduleAppointment(values)
                Swal.fire({
                    icon: "success",
                    title: "Turno agendado con exito"
                })
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "No se pudo agendar la cita"
                })
            }
            
        }
    })

    return (
        <div className={Styles.page}>
            <div className={Styles.layout}>
            <div className={Styles.left}>
            <h1 className={Styles.title}>Agendar Turno</h1>
            <form className={Styles.form} onSubmit={formik.handleSubmit}>
                <div className={Styles.formGroup}>
                    <label htmlFor="date">Fecha:</label>
                    <input
                        id="date"
                        name="date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                        className={
                            formik.touched.date && formik.errors.date
                                ? Styles.errorInput
                                : Styles.input
                        }
                    />
                    {formik.errors.date ? (
                        <>
                            <div className={Styles.error}>{formik.errors.date}</div>
                        </>
                    ) : null}
                </div>
            
                <div className={Styles.formGroup}>
                    <label htmlFor="time">Hora:</label>
                    <input
                        id="time"
                        name="time"
                        type="time"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.time}
                        className={
                            formik.touched.time && formik.errors.time
                                ? Styles.errorInput
                                : Styles.input
                        }
                    />
                    {formik.errors.time ? (
                        <div className={Styles.error}>{formik.errors.time}</div>                        
                    ) : null}
                </div>

                <button type="submit" 
                className={Styles.submitButton}
                disabled={Object.keys(formik.errors).length > 0}
                >Agendar Turno</button>

              
            </form>
            </div>

            <div className={Styles.right}>
                <img
                src={tutorImg}
                alt="Tutores disponibles"
                className={Styles.image}
                />
            </div>
        </div>
        </div>
    );
}


export default AgendarTurno;