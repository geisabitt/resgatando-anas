import {Alert,AlertDescription,AlertTitle, } from "@/components/ui/alert"

interface AlertSistemProps {
  message: string;
}
export function AlertSistem(props: AlertSistemProps) {
  return (
    <Alert>
      <AlertTitle>Mensagen do sistema</AlertTitle>
      <AlertDescription>
        {props.message}
      </AlertDescription>
    </Alert>
  )
}