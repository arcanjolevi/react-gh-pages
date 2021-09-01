import { useEffect } from "react";
import { ReactNode } from "react";
import { useState } from "react";
import { createContext } from "react";
import { firebase, auth } from "../services/firebase";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import toast, { Toaster } from "react-hot-toast";

type ComponentProps = {
  children: ReactNode;
};

type AuthObject = {
  isAuthenticated: boolean;
  signInWithGoogle: () => void;
  signOut: () => void;
  user: firebase.User;
};

export const AuthContext = createContext({} as AuthObject);

export function AuthContextProvider(props: ComponentProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<firebase.User>({} as firebase.User);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((_user) => {
      if (_user) {
        setIsAuthenticated(true);
        setUser(_user);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */

        var user = result.user;
        firebase.auth().signOut();
        api
          .post("supervisor", {
            supervisorId: user?.uid,
            supervisorName: user?.displayName,
            supervisorPicture: user?.photoURL,
          })
          .then((r) => {
            toast.success("Login realizado com sucesso");
            setIsAuthenticated(true);
            history.push("/");
          })
          .catch(async (err) => {
            toast.error("Erro no login, tente novamente");
            //signOut();
            history.push("/");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function signOut() {
    await firebase.auth().signOut();
    setIsAuthenticated(false);
    toast.success("Logout realizado");
    history.push("/");
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signInWithGoogle, signOut }}
    >
      <Toaster />
      {props.children}
    </AuthContext.Provider>
  );
}
