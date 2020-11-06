import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";

import "./Home/Home.css";

export const Home: React.FC = () => {
  const history = useHistory();

  const logout = () => {
    window.localStorage.removeItem("token");
    console.log("logged out!");
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Next Great Idea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};
