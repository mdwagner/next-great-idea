import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonButton,
  IonInput,
} from '@ionic/react';

import './Login/Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    console.log('email', email);
    console.log('password', password);
    setEmail('');
    setPassword('');
  }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              Email
              &nbsp;
              <IonText color="danger">*</IonText>
            </IonLabel>
            <IonInput
              type="text"
              required
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              clearInput
            />
          </IonItem>

          <IonItem>
            <IonLabel>
              Password
              &nbsp;
              <IonText color="danger">*</IonText>
            </IonLabel>
            <IonInput
              type="password"
              required
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              clearOnEdit={false}
              clearInput
            />
          </IonItem>

          <IonButton
            type="submit"
            onClick={submit}>
            Sign In
          </IonButton>
        </IonList>
      </IonContent>

    </IonPage>
  );
};
