import { formValidates } from '../../utils/validates';
import Styles from './Login.module.css';
import { useFormik } from 'formik';
import logingImg from '../../assets/loginImg.webp';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersContext } from '../../context/UsersContext';


function Login() {

    const { loginUser } = useContext(UsersContext)
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        initialErrors: {
            username: 'username is required',
            password: 'password is required',
        },
        validate: formValidates,
        onSubmit: (values) => {
            

            loginUser(values)
                .then((response) => {
                    if(response.status === 200){
                        
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario logueado con exito',
                        });
                    }
                    navigate('/');
                    
                })
                .catch((errors) => {
                    Swal.fire({
                        icon: 'error',
                        title: `${errors.response.data.msg}`,
                        text: 'Intentelo de nuevo',
                    });
          
                })
        }        
    })


  return (

    <div className={Styles.page}>
    <div className={Styles.formContainer}>
    <div className={Styles.innerCard}>

        <form className={Styles.formContainer} onSubmit={formik.handleSubmit}>
            <h2 className={Styles.formTitle}>Formulario De Login</h2>
            
            <div className={Styles.formGroup}>
                <label className={Styles.formLabel}>Username:</label>
                <input
                className={Styles.formInput}
                type="text"
                name="username"
                placeholder="Ingrese su nombre de usuario"
                onChange={formik.handleChange}
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
                    !formik.values.username ||
                    !formik.values.password
                }
                >
                    Submit
            </button>

            
            <br/>
            <label className={Styles.registerText}>
                Todavia no tenes una cuenta? <Link to="/register">Registrate</Link>
            </label>

            <div className={Styles.rightImageWrap}>
                <img
                    className={Styles.rightImage}
                    src={logingImg}
                    alt="Login"
                />
            </div>

        </form>
    </div>
    </div>
    </div>
  )
}

export default Login;