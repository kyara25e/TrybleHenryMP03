import { Link } from "react-router-dom";
import Styles from "./NotFound.module.css"

function NotFound(){
    return(
        <div className={Styles.notFoundContainer}>
            <h1 className={Styles.notFoundTitle}>404 - Página No Encontrada</h1>
            <p className={Styles.notFoundMessage}>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" className={Styles.homeButton}>Volver al Home</Link>
        </div>
    );
}

export default NotFound;