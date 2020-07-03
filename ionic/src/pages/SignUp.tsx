import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonButton, IonItemDivider } from '@ionic/react';


import './SignUp/SignUp.css';

export const SignUp: React.FC = () => {

  const [text, setText] = useState<string>();

  const history = useHistory();
  const goToLogin = () => history.push('/login');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Email Address: </IonLabel>
            <IonInput value={text} type="email" placeholder="test@example.com" clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>First Name: </IonLabel>
            <IonInput value={text} type="text" placeholder="John" clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Middle Name: </IonLabel>
            <IonInput value={text} type="text" placeholder="Sam" clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Last Name: </IonLabel>
            <IonInput value={text} type="text" placeholder="Doe" clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password: </IonLabel>
            <IonInput value={text} type="password" clearInput></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Password Confirmation: </IonLabel>
            <IonInput value={text} type="password" clearInput></IonInput>
          </IonItem>
          <IonButton type="submit">
            Create New Account
          </IonButton>
          <IonButton type="submit" onClick = {goToLogin}>
            Return to Login Page
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
