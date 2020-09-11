import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
} from "@ionic/react";

import "./CreateIdea/CreateIdea.css";

export const CreateIdea: React.FC = () => {
  const [text, setText] = useState<string>();
  const [number, setNumber] = useState<number>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create A New Idea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel position="fixed">Title</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">Description</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="fixed">BG Color</IonLabel>
            <IonInput value={text}></IonInput>
          </IonItem>
        </IonList>

        <IonButton color="primary">Back to Index</IonButton>
        <IonButton color="secondary">Submit Idea</IonButton>
      </IonContent>
    </IonPage>
  );
};
