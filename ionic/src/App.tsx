import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { GraphqlProvider } from "./utils/GraphqlProvider";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { CreateIdea } from "./pages/CreateIdea";

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

export const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <GraphqlProvider>
        <IonRouterOutlet>
          <Route path="/home" children={<Home />} />
          <Route path="/login" children={<Login />} />
          <Route path="/signup" children={<SignUp />} />
          <Route path="/createidea" children={<CreateIdea />} />
          <Route path="/" children={<Home />} />
          {/* <Route path="/" exact children={<Redirect to="/login" />} /> */}
        </IonRouterOutlet>
      </GraphqlProvider>
    </IonReactRouter>
  </IonApp>
);
