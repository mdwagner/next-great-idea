import React from "react";
import { IonInput } from "@ionic/react";
import { Controller, Control } from "react-hook-form";

interface IonInputControllerProps {
  name: string;
  control: Control<any>;
  rules: Partial<{}>;
  defaultValue: unknown;
  ionInputProps: Partial<{}>;
}

export const IonInputController: React.FC<IonInputControllerProps> = ({
  name,
  control,
  rules,
  defaultValue,
  ionInputProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={(ctrlProps) => (
        <IonInput
          onIonChange={ctrlProps.onChange}
          onIonBlur={ctrlProps.onBlur}
          value={ctrlProps.value}
          {...ionInputProps}
        />
      )}
    />
  );
};
