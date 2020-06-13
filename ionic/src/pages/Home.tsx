import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { ExploreContainer } from '../components/ExploreContainer';

import './Home/Home.css';

export const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => history.push('/login');

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ExploreContainer />
        <IonButton onClick={goToLogin}>
          Login
        </IonButton>
      </IonContent>

    </IonPage>
  );
};
