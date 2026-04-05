import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/NavBar/Navbar"
import Home from "./views/Home/Home"
import Login from "./views/Login/Login"
import MisTurnos from "./views/MisTurnos/MisTurnos"
import Register from "./views/Register/Register"
import { useContext, useEffect } from "react"
import Styles from "./App.module.css"
import NotFound from "./components/NotFound/NotFound"
import { UsersContext } from "./context/UsersContext"
import AgendarTurno from "./views/AgendarTurno/AgendarTurno"

function App() { 

  const { isLogged } = useContext(UsersContext)


  const navigate = useNavigate();

  useEffect(() => {

    if(!isLogged && location.pathname !== "/login" && location.pathname !== "/register"){
      navigate("/login");
    }
  },[])

  return (
    <>
      {
        !isLogged ? (
          <main className={Styles.main}>
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/register" element={<Register />}/>
            </Routes>
          </main>
        ) : (
          <>
            <header>
             
              <Navbar />
        
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mis-turnos" element={<MisTurnos />} />
                <Route path="/agendarturno" element={<AgendarTurno />} />
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </main>
          </>
        )
      }
    </>
  )
}

export default App;
