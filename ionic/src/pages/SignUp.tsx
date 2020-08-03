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
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { gql } from "apollo-boost";

import "./SignUp/SignUp.css";
import { IonInputController } from "../components/form/IonInputController";

interface SignUpInput {
  email: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  password: string;
  passwordConfirmation: string;
}

const SIGN_UP_USER = gql`
  mutation signUpUser(
    $email: String!
    $firstName: String!
    $lastName: String!
    $middleName: String
    $password: String!
  ) {
    signUp(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      middleName: $middleName
    ) {
      success
    }
  }
`;

export const SignUp: React.FC = () => {
  const history = useHistory();
  const { handleSubmit, control } = useForm<SignUpInput>();
  const goToLogin = () => history.push("/login");
  const submit = handleSubmit(async (input) => {
    console.log("call mutation", input);
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
              <IonLabel>Email Address: </IonLabel>
              <IonInputController
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "email",
                  required: true,
                  clearInput: true,
                  placeholder: "John",
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>First Name: </IonLabel>
              <IonInputController
                name="firstName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "text",
                  required: true,
                  clearInput: true,
                  placeholder: "John",
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Middle Name: </IonLabel>
              <IonInputController
                name="middleName"
                control={control}
                rules={{ required: false }}
                defaultValue=""
                ionInputProps={{
                  type: "text",
                  required: true,
                  clearInput: true,
                  placeholder: "Sam",
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Last Name: </IonLabel>
              <IonInputController
                name="lastName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                ionInputProps={{
                  type: "text",
                  required: true,
                  clearInput: true,
                  placeholder: "Doe",
                }}
              />
            </IonItem>
            <IonItem>
              <IonLabel>Password: </IonLabel>
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
              {/* FE validation: check if passwords match */}
              <IonLabel>Password Confirmation: </IonLabel>
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

            <IonButton
              type="submit"
              disabled={/* TODO: loading on mutation */ false}
            >
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
