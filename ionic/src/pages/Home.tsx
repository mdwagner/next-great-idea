import React from "react";
import { useHistory } from "react-router-dom";

import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import { personCircle, search } from "ionicons/icons";

// import { ExploreContainer } from "../components/ExploreContainer";
import { IdeasList } from "../components/IdeasList";

import "./Home/Home.css";

export const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => history.push("/login");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="secondary">
            <IonButton>
              <IonIcon slot="icon-only" icon={personCircle} />
            </IonButton>
            <IonButton>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
          <IonTitle>Next Great Idea</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton autoHide={false} />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IdeasList />
        <IonButton onClick={goToLogin}>Back to Login</IonButton>
      </IonContent>
    </IonPage>
  );
};
