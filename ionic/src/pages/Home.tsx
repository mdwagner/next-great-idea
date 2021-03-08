import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { logInOutline, logOutOutline } from "ionicons/icons";
import { Auth, Hub } from "aws-amplify";

import "./Home/Home.css";

export const Home: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  const getUser = () => {
    return Auth.currentAuthenticatedUser().catch(() => {
      console.log("Not signed in");
    });
  };

  useEffect(() => {
    let rendered = true;

    if (rendered) {
      Hub.listen("auth", ({ payload: { event, data } }) => {
        switch (event) {
          case "signIn":
          case "cognitoHostedUI":
            getUser().then((userData) => setUser(userData));
            break;
          case "signOut":
            setUser(null);
            break;
          case "signIn_failure":
          case "cognitoHostedUI_failure":
            console.error("Sign in failure", data);
            break;
        }
      });

      getUser().then((userData) => setUser(userData));
    }

    return () => {
      rendered = false;
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Next Great Idea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {user ? (
          <IonButton expand="full" onClick={() => Auth.signOut()}>
            <IonIcon icon={logInOutline} slot="start" />
            Logout
          </IonButton>
        ) : (
          <IonButton expand="full" onClick={() => Auth.federatedSignIn()}>
            <IonIcon icon={logOutOutline} slot="start" />
            Open Hosted UI
          </IonButton>
        )}
        Hello {user ? user.username : "Public user"}!
      </IonContent>
    </IonPage>
  );
};
