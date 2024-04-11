import {Alert,AlertDescription,AlertTitle, } from "@/components/ui/alert"

interface AlertSistemProps {
  title: string;
  message: string;
}
export function AlertSistem(props: AlertSistemProps) {
  return (
    <Alert>
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>
        {props.message}
      </AlertDescription>
    </Alert>
  )
}