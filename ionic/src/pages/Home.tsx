import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Home/Home.css";

export const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Next Great Idea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent></IonContent>
    </IonPage>
  );
};
