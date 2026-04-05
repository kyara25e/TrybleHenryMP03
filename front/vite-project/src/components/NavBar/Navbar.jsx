import { Link, useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css"
import Swal from "sweetalert2";
import img from "../../assets/logoImg.png"
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const Navbar = () =>{

    const { logOutUser } = useContext(UsersContext)
    
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("user");
        navigate("/login");
        logOutUser();
        Swal.fire({
            icon: "warning",
            title: "Logout exitoso"
        })
    }
    return(
        <div>
            <nav className={Styles.navbar}>
                <div className={Styles.img}>
                    <img
                        className={Styles.img}
                        src={img}
                        alt="img"
                    />
                </div>
                <ul className={Styles.navList}>
                    <li className={Styles.navItem}>
                        <Link
                         to="/"
                         className={`${Styles.navLink} ${location.pathname === "/" ? Styles.active : ""}`}
                         >Home</Link>
                    </li>
                    <li className={Styles.navItem}>
                        <Link
                         to="/agendarturno"
                         className={`${Styles.navLink} ${location.pathname === "/agendarturno" ? Styles.active : ""}`}
                         >Agendar Turno</Link>
                    </li>


                    <li className={Styles.navItem}>
                        <Link 
                        to="/mis-turnos"
                        className={`${Styles.navLink} ${location.pathname === "/misturnos" ? Styles.active : ""}`}
                        >Mis Turnos</Link>
                    </li>
                    <li className={Styles.navItem} onClick={handleLogOut}>
                        LogOut
                        
                    </li>
                    
                </ul>
            </nav>
        </div>
    )
}


export default Navbar;