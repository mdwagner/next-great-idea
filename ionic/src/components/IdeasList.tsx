import React from "react";
import { IonList, IonItem, IonLabel, IonContent } from "@ionic/react";
import { useGetIdeasQuery } from "./IdeasList/IdeasList.generated";
import "./IdeasList/IdeasList.css";

export const IdeasList: React.FC = () => {
  const [result] = useGetIdeasQuery();

  if (result.fetching) return <p>Loading...</p>;
  if (result.error) return <p>Error :(</p>;

  return (
    <>
      <IonContent>
        <IonList>
          {result.data?.ideas.map(({ id, title, description, user }) => (
            <IonItem className="center" key={id}>
              <IonLabel>title: {title}</IonLabel>
              <IonLabel>description: {description}</IonLabel>
              <IonLabel>creator: {user.username}</IonLabel>
              <IonLabel>id: {id}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </>
  );
};
