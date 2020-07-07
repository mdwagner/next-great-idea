import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { gql } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

import './Login/Login.css';
import '../components/UserList'
import { loginUser, loginUserVariables } from './types/loginUser';

interface LoginInput {
  email: string;
  password: string;
}

const LOGIN_USER = gql`
  mutation loginUser($loginId: String!, $password: String!) {
    login(loginId: $loginId, password: $password) {
      id
      email
      token
      active
    }
  }
`;

export const Login: React.FC = () => {
  const history = useHistory(); // eslint-disable-line
  const { handleSubmit, control, reset } = useForm<LoginInput>();
  const client = useApolloClient();
  const [ login, { loading } ] = useMutation<loginUser, loginUserVariables>(LOGIN_USER, {
    onCompleted({ login: { token } }) {
      // set token in localStorage
      window.localStorage.setItem('token', token);

      // set client cache for logged in state
      client.cache.writeData({ data: { isLoggedIn: true } });

      // reset form state
      reset({ email: '', password: '' });

      // display login message
      console.info('logged in!')

      // history.replace('/home');
    },
    onError(error) {
      // reset form state
      reset({ email: '', password: '' });

      // display error message
      console.error(error.message);
    }
  });
  const submit = handleSubmit(
    async ({ email: loginId, password }) => {
      await login({
        variables: {
          loginId,
          password
        }
      });
    }
  );

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form
          noValidate
          onSubmit={submit}
        >
          <IonList>
            <IonItem>
              <IonLabel>
                Email
                &nbsp;
                <IonText color="danger">*</IonText>
              </IonLabel>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={(props) => (
                  <IonInput
                    onIonChange={props.onChange}
                    onIonBlur={props.onBlur}
                    value={props.value}
                    type="email"
                    required
                    clearInput
                  />
                )}
              />
            </IonItem>

            <IonItem>
              <IonLabel>
                Password
                &nbsp;
                <IonText color="danger">*</IonText>
              </IonLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={(props) => (
                  <IonInput
                    onIonChange={props.onChange}
                    onIonBlur={props.onBlur}
                    value={props.value}
                    type="password"
                    required
                    clearInput
                    clearOnEdit={false}
                  />
                )}
              />
            </IonItem>

            <IonButton
              type="submit"
              disabled={loading}
            >
              Sign In
            </IonButton>

          </IonList>
        </form>
      </IonContent>

    </IonPage>
  );
};
