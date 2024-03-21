"use client"
import * as React from "react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaCheckCircle  } from "react-icons/fa";

type FormData = {
  nome: string;
  telefone: string;
  telefone_emergencia: string;
  rg: string;
  cpf: string;
  data_de_nascimento: string;
  email: string;
  password: string;
};

export function SigninProgressiveForm() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    telefone: "",
    telefone_emergencia: "",
    rg: "",
    cpf: "",
    data_de_nascimento: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentIndex === cards.length - 1 && isFormValid()) {
      // Envie os dados do formulário
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const isFormValid = () => {
    // Verifique se todos os campos obrigatórios foram preenchidos
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const cards: { label: string; name: keyof FormData; type: string; placeholder: string }[] = [
    { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome" },
    { label: "Telefone", name: "telefone", type: "text", placeholder: "(21)98999-9999" },
    { label: "Telefone de emergência", name: "telefone_emergencia", type: "text", placeholder: "Digite seu nome" },
    { label: "RG", name: "rg", type: "text", placeholder: "Digite seu nome" },
    { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu nome" },
    { label: "Data de Nascimento", name: "data_de_nascimento", type: "date", placeholder: "" },
    { label: "E-mail", name: "email", type: "email", placeholder: "Digite seu email" },
    { label: "Senha", name: "password", type: "password", placeholder: "Digite uma senha segura" },
  ];

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            {cards.map((_, index) => (
              <FaCheckCircle 
                key={index}
                className={`w-4 h-4 ${index <= currentIndex ? "text-[#60F5B7]" : "text-[#E6C6C8]"}`}
              />
            ))}
          </div>
          <CardTitle>Cadastre-se no site </CardTitle>
          <CardDescription>Você e terra fértil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              {cards[currentIndex] && (
                <>
                  <Label htmlFor={cards[currentIndex].name}>{cards[currentIndex].label}</Label>
                  <Input
                    name={cards[currentIndex].name}
                    id={cards[currentIndex].name}
                    type={cards[currentIndex].type}
                    placeholder={cards[currentIndex].placeholder}
                    value={formData[cards[currentIndex].name]}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {/* {currentIndex > 0 && (
            <Button onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}>Voltar</Button>
          )} */}
          {currentIndex < cards.length - 1 && (
            <Button className="w-full" onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}>Próximo</Button>
          )}
          <Button className="w-full" type="submit" disabled={!isFormValid()}>
            Cadastrar
          </Button>
          <Button className="w-full outline"><Link href="login">
            Já tenho cadastro
          </Link>
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
