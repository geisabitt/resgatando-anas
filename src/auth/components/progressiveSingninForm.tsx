"use client"
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCheckCircle  } from "react-icons/fa";
import { redirect } from "next/navigation";
import Link from "next/link";

type FormData = {
  nome: string;
  telefone: string;
  telefone_emergencia: string;
  rg: string;
  cpf: string;
  data_de_nascimento: string;
  email: string;
  password: string;
  passwordRepeat:string;
};

const validateCPF = (cpf: string): boolean => {
  const regex = /^[0-9]{11}$/;
  return regex.test(cpf);
};

const formatCPF = (cpf: string): string => {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

const validateRG = (rg: string): boolean => {
  const regex = /^[0-9]{8}$/;
  return regex.test(rg);
};

const formatRG = (rg: string): string => {
  return rg.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3");
};

const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
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
    passwordRepeat:"",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

  if (name === "cpf") {
    formattedValue = value.replace(/\D/g, "");
    formattedValue = formatCPF(formattedValue);
  }

  if (name === "rg") {
    formattedValue = value.replace(/\D/g, "");
    formattedValue = formatRG(formattedValue);
  }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentIndex === cards.length - 1 && isFormValid()) {
      console.log('<<<<<Cadastro Concluido?>>>>>>',formData);
      redirect('retiro/cadastro/dadosAdicionais')
    } else {
      console.log('<<<<<Button Next>>>>>>',formData);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
    if (!validateCPF(formData.cpf)) {
      alert("CPF inválido!");
      return;
    }

    if (!validateRG(formData.rg)) {
      alert("RG inválido!");
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Email inválido!");
      return;
    }

    if (formData.password !== formData.passwordRepeat) {
      alert("As senhas não são iguais!");
      return;
    }

    if (
      !formData.password.match(/[a-z]/) ||
      !formData.password.match(/[A-Z]/) ||
      !formData.password.match(/[0-9]/) ||
      formData.password.length < 8
    ) {
      alert(
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e ter no mínimo 8 caracteres."
      );
    }

  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const groups: { label: string; cards: { label: string; name: keyof FormData; type: string; placeholder: string }[] }[] = [
    {
      label: "Informações Pessoais",
      cards: [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome" },
        { label: "Telefone", name: "telefone", type: "text", placeholder: "(21)98999-9999" },
        { label: "Telefone de emergência", name: "telefone_emergencia", type: "text", placeholder: "Digite seu nome" },
      ],
    },
    {
      label: "Informações de Conta",
      cards: [
        { label: "E-mail", name: "email", type: "email", placeholder: "Digite seu email" },
        { label: "Senha", name: "password", type: "password", placeholder: "Digite uma senha segura" },
        { label: "Repita a Senha", name: "passwordRepeat", type: "password", placeholder: "Repita a senha" }
      ],
    },
    {
      label: "Documentos",
      cards: [
        { label: "RG", name: "rg", type: "text", placeholder: "Digite seu RG" },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF" },
        { label: "Data de Nascimento", name: "data_de_nascimento", type: "date", placeholder: "Digite sua data de nascimento" },
      ],
    },
  ];

  const cards = groups[currentIndex].cards;

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            {groups.map((group, index) => (
              <FaCheckCircle
                key={index}
                className={`w-4 h-4 ${index <= currentIndex ? "text-success" : "text-primary"}`}
              />
            ))}
          </div>
          <CardTitle>Cadastre-se no site </CardTitle>
          <CardDescription>Você e terra fértil</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {cards.map((card, index) => (
              <div key={index} className="flex flex-col space-y-1.5">
                <Label htmlFor={card.name}>{card.label}</Label>
                <Input
                  name={card.name}
                  id={card.name}
                  type={card.type}
                  placeholder={card.placeholder}
                  value={formData[card.name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {currentIndex < groups.length - 1 && (
              <Button
                className="w-full mb-1 bg-success hover:bg-success"
                onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
              >
                Próximo
              </Button>
            )}
            {currentIndex === groups.length - 1 && (
              <Button className="w-full mb-1 bg-success" type="submit" disabled={!isFormValid()}>
                <Link href="/retiro/cadastro/dadosAdicionais">Cadastrar</Link>
              </Button>
            )}
            {currentIndex === 0 && (
              <Button variant="outline" className="w-full mb-1">
                <Link href="login">Já tenho cadastro</Link>
              </Button>
            )}
          {currentIndex > 0 && (
            <Button
              className="w-full mb-1 bg-success hover:bg-success"
              onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}
            >
              Voltar
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

