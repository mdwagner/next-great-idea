import React from "react";
import { Route, Redirect } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Amplify from "aws-amplify";

import { GraphqlProvider } from "./utils/GraphqlProvider";
import { Home } from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Configure Amplify */
Amplify.configure({
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_nTZEGMXaV",
    userPoolWebClientId: "mtanpn75j134d6hmecjuf4ib0",
    authenticationFlowType: "USER_SRP_AUTH",
    oauth: {
      domain: "next-great-idea.auth.us-east-2.amazoncognito.com",
      scope: ["email", "openid", "profile"],
      redirectSignIn: "http://localhost:8100/callback",
      redirectSignOut: "http://localhost:8100/logout",
      responseType: "code",
    },
  },
});

export const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <GraphqlProvider>
        <IonRouterOutlet>
          <Route path="/" exact children={<Home />} />
          <Redirect to="/" />
        </IonRouterOutlet>
      </GraphqlProvider>
    </IonReactRouter>
  </IonApp>
);
