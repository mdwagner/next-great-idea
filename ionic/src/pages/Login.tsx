import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import '../components/UserList'
import { UserList } from '../components/UserList';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    console.log('email', email);
    console.log('password', password);
    setEmail('');
    setPassword('');
  }

  const history = useHistory();
  const goToSignUp = () => history.push('/signup');

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

          <IonButton
            type="submit"
            onClick={goToSignUp}>
            Sign Up As New User
          </IonButton>

          <UserList></UserList>
        </IonList>
      </IonContent>

    </IonPage>
  );
};
