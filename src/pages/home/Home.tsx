import "../../styles/global.scss";
import "./home.scss";
import { Link } from "react-router-dom";
import LogoHeader from "../../assets/logo-header.svg";
import Instragram from "../../assets/Instagram.svg";
import Linkedin from "../../assets/Linkedin.svg";
import Facebook from "../../assets/Facebook.svg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth";

export function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div id="home-container">
      <div className="back-transparent-layer">
        <header>
          <img src={LogoHeader} alt="seeFleet" />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Nós</Link>
            </li>
            <li>
              <Link to="/">Soluções</Link>
            </li>
            <li>
              <Link to="/">Contato</Link>
            </li>
            <li className="login-btn">
              <Link to={isAuthenticated ? "/app" : "/sign-in"}>
                {isAuthenticated ? "Gerenciar Frota" : "Login"}
              </Link>
            </li>
            <li className="social-icon">
              <img src={Instragram} alt="Instagram" />
            </li>
            <li className="social-icon">
              <img src={Facebook} alt="Facebook" />
            </li>
            <li className="social-icon">
              <img src={Linkedin} alt="Linkedin" />
            </li>
          </ul>
        </header>
        <h1>GESTÃO DIGITAL DE FROTAS</h1>
        <div id="saiba">
          <h2>Saiba Mais</h2>
        </div>
      </div>
    </div>
  );
}
