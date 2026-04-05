import { useFormik } from 'formik';
import Styles from './Register.module.css';
import { registerFormValidates } from '../../utils/validates';
import { Link } from 'react-router-dom';
import registerImg from '../../assets/registerImg.webp';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { UsersContext } from '../../context/UsersContext';

function Register(){

    const { registerUser } = useContext(UsersContext)

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: ''
        },
        initialErrors: {
            name: 'name is required',
            email: 'email is required',
            birthdate: 'birthdate is required',
            nDni: 'nDni is required',
            username: 'username is required',
            password: 'password is required',
        },
        validate: registerFormValidates,
        onSubmit: (values) => {
           
            registerUser(values)
                .then((response) => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario registrado con exito',
                        });
                    
                })
                .catch((errors) => {
                    Swal.fire({
                        icon: 'error',
                        title: `${errors.response.data.msg}`,
                        text: 'Intentelo de nuevo',
                    })
                })
        }      

    })


    return (

        <div className={Styles.page}>
        <div className={Styles.formContainer}>
        <div className={Styles.innerCard}>

            <form className={Styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={Styles.formTitle}>Formulario De Registro</h2>

            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Nombre:</label>
                <input
                className={Styles.formInput}
                type="text"
                name="name"
                placeholder="Tu nombre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                />
                {formik.errors.name && formik.errors.name ? (
                    <label className={Styles.errorLabel}>{formik.errors.name}</label>
                ) : null}
            </div>
            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Email:</label>
                <input
                className={Styles.formInput}
                type="text"
                name="email"
                placeholder="Tu email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                />
                {formik.errors.email && formik.errors.email ? (
                    <label className={Styles.errorLabel}>{formik.errors.email}</label>
                ) : null}
            </div>

            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Fecha de nacimiento:</label>
                <input
                className={Styles.formInput}
                type="date"
                name="birthdate"
                placeholder="Ingrese su fecha de nacimiento"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthdate}
                />
                {formik.errors.birthdate && formik.errors.birthdate ? (
                    <label className={Styles.errorLabel}>{formik.errors.birthdate}</label>
                ) : null}
            </div>

            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>nDni:</label>
                <input
                className={Styles.formInput}
                type="text"
                name="nDni"
                placeholder="Ingrese su nDni"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nDni}
                />
                {formik.errors.nDni && formik.errors.nDni ? (
                    <label className={Styles.errorLabel}>{formik.errors.nDni}</label>
                ) : null}
            </div>


            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Username:</label>
                <input
                className={Styles.formInput}
                type="text"
                name="username"
                placeholder="Tu nombre de usuario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                />
                {formik.errors.username && formik.errors.username ? (
                    <label className={Styles.errorLabel}>{formik.errors.username}</label>
                ) : null}
            </div>

            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Password:</label>
                <input
                className={Styles.formInput}
                type="password"
                name="password"
                placeholder="Ingrese su contraseña"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                />
                {formik.errors.password && formik.errors.password ? (
                    <label className={Styles.errorLabel}>{formik.errors.password}</label>
                ) : null}
            </div>

            <button
                className={Styles.formButton}
                type="submit"
                disabled={
                    Object.keys(formik.errors).length > 0 ||
                    !formik.values.name ||
                    !formik.values.email ||
                    !formik.values.birthdate ||
                    !formik.values.nDni ||
                    !formik.values.username ||
                    !formik.values.password 
                }
            >
                    Submit
                </button>

                <br/>
                <label className={Styles.registerText}>
                    Ya tenes una cuenta? <Link to="/login">Login</Link>
                </label>

                <div className={Styles.rightImageWrap}>
                <img
                    className={Styles.rightImage}
                    src={registerImg}
                    alt="Register"
                />
            </div>
            </form>
        </div>
        </div>
        </div>
    )
}


export default Register;