/* eslint-disable @typescript-eslint/no-unused-vars */
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

import "./SignUp/SignUp.css";
import { useSignUpUserMutation } from "./SignUp/SignUp.generated";
import { IonInputController } from "../components/form/IonInputController";

interface SignUpInput {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const resolver: Resolver<SignUpInput> = async (values) => {
  const hasError = values.password !== values.passwordConfirmation;

  return {
    values: hasError ? {} : values,
    errors: hasError
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
    resolver,
  });
  const [{ fetching: loading }, signUpUser] = useSignUpUserMutation();
  const goToLogin = () => history.push("/login");

  const submit = handleSubmit(async (input) => {
    console.log("signed up!");
    goToLogin();

    // @todo
    // signUpUser({
    //   email: input.email,
    //   username: input.username,
    //   password: input.password,
    // })
    //   .then((result) => {
    //     if (result.data?.signUp?.success) {
    //       goToLogin();
    //     }
    //   })
    //   .finally(() => {
    //     reset({
    //       email: "",
    //       username: "",
    //       password: "",
    //       passwordConfirmation: "",
    //     });
    //   });
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
