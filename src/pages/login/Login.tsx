import "../../styles/global.scss";
import "./login.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-header.svg";
import Svg1 from "../../assets/svg1.svg";
import GoogleIcon from "../../assets/googleLogo.png";
import { ArrowLeft } from "react-feather";
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";

export function Login() {
  const { signInWithGoogle } = useContext(AuthContext);

  return (
    <div id="login-container">
      <Link to="/">
        <ArrowLeft />
      </Link>
      <div id="left-side">
        <img src={Logo} alt="seeFleetLogo" />
      </div>
      <div id="right-side">
        <img src={Svg1} alt="svg" />
        <h1>Bem Vindo/a!!</h1>
        <p>Faça login para gerenciar sua frota de forma digital</p>
        <div onClick={signInWithGoogle} id="google-login">
          <img src={GoogleIcon} alt="googleIcon" />
          <h2>Entrar com o Google</h2>
        </div>
      </div>
    </div>
  );
}
