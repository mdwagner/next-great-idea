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
import { ExploreContainer } from "../components/ExploreContainer";
import { UserList } from "../components/UserList";

import "./Home/Home.css";

export const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => history.push("/login");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Next Great Idea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <UserList />
        <ExploreContainer />
        <IonButton onClick={goToLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};
