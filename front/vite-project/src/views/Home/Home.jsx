
import Styles from "./Home.module.css"
import homeImg from "../../assets/homeImg.png"
import { useNavigate } from "react-router-dom";
import dataImg from "../../assets/dataImg1.png"



function Home(){
  const navigate = useNavigate();
return (
    <>
    

    <main className={Styles.home}>
      <section className={Styles.hero}>
        <div className={Styles.heroContent}>
          <h1>
            Aprende más rápido con lo mejor de tu <br />
            tutor de idiomas.
          </h1>

          <p>
            Clases personalizadas, recursos interactivos y seguimiento de
            progreso. Todo a tu ritmo, empeza ahora.
          </p>

        </div>

        <div className={Styles.heroImage}>
        <img
            className={Styles.rightImage}
            src={homeImg}
            alt="homeImg"
        />
        </div>

      </section>


      <section className={Styles.tutors}>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores español</div>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores alemán</div>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores francés</div>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores chino</div>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores inglés</div>
        
          <div className={Styles.tutorCard}
          onClick={() => navigate("/agendarturno")}
          >Tutores griego</div>
        
      </section>

      
      <div className={Styles.infoBox}>
        
                <img
                    className={Styles.dataImg}
                    src={dataImg}
                    alt="dataImg"
                    onClick={() => navigate("/agendarturno")}
                    style={{ cursor: "pointer"}}
                />
            </div>
    </main>
    </>
  )
}


export default Home;