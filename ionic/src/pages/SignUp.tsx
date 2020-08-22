import React from "react";
import { useHistory } from "react-router-dom";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonList,
  IonButton,
  IonText,
} from "@ionic/react";
import { useForm, Resolver } from "react-hook-form";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

import "./SignUp/SignUp.css";
import { IonInputController } from "../components/form/IonInputController";
import { signUpUser, signUpUserVariables } from "./types/signUpUser";

interface SignUpInput {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const SIGN_UP_USER = gql`
  mutation signUpUser($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      success
    }
  }
`;

const validate: Resolver<SignUpInput> = async (values) => {
  let error = false;
  if (values.password !== values.passwordConfirmation) {
    error = true;
  }

  return {
    values: error ? {} : values,
    errors: error
      ? {
          passwordConfirmation: {
            type: "mismatch",
            message: "This does not match with password.",
          },
        }
      : {},
  };
};

export const SignUp: React.FC = () => {
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm<SignUpInput>({
    resolver: validate,
  });
  const [signUp, { loading }] = useMutation<signUpUser, signUpUserVariables>(
    SIGN_UP_USER
  );
  const goToLogin = () => history.push("/login");
  const submit = handleSubmit(async (input) => {
    delete input.passwordConfirmation;
    signUp({
      variables: input,
    })
      .then((result) => {
        if (result.data?.signUp.success) {
          goToLogin();
        }
      })
      .finally(() => {
        reset({
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        });
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={submit}>
          <IonList>
            <IonItem>
              <IonLabel>
                Email Address <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInputController
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "email",
                  required: true,
                  clearInput: true,
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                Username <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInputController
                name="username"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "text",
                  required: true,
                  clearInput: true,
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                Password <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInputController
                name="password"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "password",
                  required: true,
                  clearInput: true,
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>
                Password Confirmation <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInputController
                name="passwordConfirmation"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "password",
                  required: true,
                  clearInput: true,
                }}
              />
            </IonItem>

            <IonButton type="submit" disabled={loading}>
              Create New Account
            </IonButton>

            <IonButton type="button" onClick={goToLogin}>
              Return to Login Page
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};
