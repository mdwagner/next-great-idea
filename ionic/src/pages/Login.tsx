/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
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
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import "./Login/Login.css";
import { useLoginUserMutation } from "./Login/Login.generated";
import { IonInputController } from "../components/form/IonInputController";

interface LoginInput {
  loginId: string;
  password: string;
}

export const Login: React.FC = () => {
  const history = useHistory();
  const { handleSubmit, control, reset } = useForm<LoginInput>();
  const [{ fetching: loading }, loginUser] = useLoginUserMutation();
  const goToHome = () => history.replace("/home");

  const submit = handleSubmit(async ({ loginId, password }) => {
    window.localStorage.setItem("token", "test123");
    console.log("logged in!");
    goToHome();

    // @todo
    // return loginUser({
    //   loginId,
    //   password,
    // })
    //   .then((result) => {
    //     if (result.data) {
    //       // set token in localStorage
    //       window.localStorage.setItem("token", result.data?.login?.token);

    //       // display login message
    //       console.info("logged in!");

    //       // TODO: add home page redirect
    //       // history.replace('/home');
    //     }
    //   })
    //   .finally(() => {
    //     // reset form state
    //     reset({ loginId: "", password: "" });
    //   });
  });
  const goToSignUp = () => history.push("/signup");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form noValidate onSubmit={submit}>
          <IonList>
            <IonItem>
              <IonLabel>
                Email/Username <IonText color="danger">*</IonText>
              </IonLabel>
              <IonInputController
                name="loginId"
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
                  clearOnEdit: false,
                }}
              />
            </IonItem>

            <IonButton type="submit" disabled={loading}>
              Sign In
            </IonButton>

            <IonButton type="button" onClick={goToSignUp}>
              Sign Up As New User
            </IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};
