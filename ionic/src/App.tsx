import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

import { Login } from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const client = new ApolloClient({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT || "http://localhost:8080/v1/graphql",
  headers: {
      "x-hasura-admin-secret": "secret"
  }
});

// client
//   .query({
//     query: gql`
//     query MyQuery {
//         ideas {
//           id
//         }
//       }
//     `
//   })
//   .then(result => console.log(result))

export const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <ApolloProvider client={client}>
      <IonRouterOutlet>
        <Route path="/login" children={<Login />} />
        <Route path="/" exact children={<Redirect to="/login" />} />
      </IonRouterOutlet>
      </ApolloProvider>
    </IonReactRouter>
  </IonApp>
);
