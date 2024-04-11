"use client"
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaCheckSquare   } from "react-icons/fa";
import * as validations from "./formValidations";
import { DadosPessoais } from "./model";
import { useRouter } from "next/navigation";
import TermosDeUso from './termosDeUso/termosDeUso';


function ProgressBullet({ active, status }: { active: boolean; status: "filled" | "notFilled" }) {
  return (
    <div
      className={`w-5 h-5 rounded-full ${
        active && status === "filled" ? "bg-success900" : active ? "bg-success" : "bg-primary"
      } flex items-center justify-center text-success`}>
      {active && <FaCheckSquare className="w-2.5 h-2.5" />}
    </div>
  );
}

function ProgressLine({ active }: { active: boolean }) {
  return (
    <div
      className={`flex-1 h-0.5 bg-${active ? "success" : "primary"} rounded-lg`}
    />
  );
}

export function SigninProgressiveForm() {
  const [showTermosDeUso, setShowTermosDeUso] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [termoDeUso, setTermoDeUso] = useState(false);
  const [dadosPessoais, setDadosPessoais] = useState<DadosPessoais>({
    nome: "",
    telefone: "",
    telefone_emergencia: "",
    rg: "",
    cpf: "",
    data_de_nascimento: "",
    email: "",
    password: "",
    passwordRepeat:"",
    termos_de_uso: "",
  });

  React.useEffect(() => {
    console.log('termos de uso',termoDeUso)
    console.log('dados pessoais',dadosPessoais)
  }, [termoDeUso,dadosPessoais]);

  const toggleTermosDeUso = () => {
    setShowTermosDeUso(!showTermosDeUso);
  };
  const [groups, setGroups] = useState<{label: string; status: "notFilled" | "filled"; cards: { label: string; name: keyof DadosPessoais; type: string; placeholder: string }[] }[]>([
    {
      label: "Informações Pessoais",
      status: "notFilled",
      cards: [
        { label: "Nome", name: "nome", type: "text", placeholder: "Digite seu nome" },
        { label: "Telefone", name: "telefone", type: "text", placeholder: "(21)98999-9999" },
        { label: "Telefone de emergência", name: "telefone_emergencia", type: "text", placeholder: "(21)98999-9999" },
      ],
    },
    {
      label: "Informações de Conta",
      status: "notFilled",
      cards: [
        { label: "E-mail", name: "email", type: "email", placeholder: "Digite seu email" },
        { label: "Senha", name: "password", type: "password", placeholder: "Digite uma senha segura" },
        { label: "Confirmar Senha", name: "passwordRepeat", type: "password", placeholder: "Confirmar senha" }
      ],
    },
    {
      label: "Documentos",
      status: "notFilled",
      cards: [
        { label: "RG", name: "rg", type: "text", placeholder: "Digite seu RG" },
        { label: "CPF", name: "cpf", type: "text", placeholder: "Digite seu CPF" },
        { label: "Data de Nascimento", name: "data_de_nascimento", type: "date", placeholder: "dd/mm/aaaa" },
      ],
    },
  ]);

  const isFieldValid = (card: any, value: string): boolean => {
    switch (card.name) {
      case 'cpf':
        return validations.validateCPF(value);
      case 'rg':
        return validations.validateRG(value);
      case 'email':
        return validations.validateEmail(value);
      case 'password':
        return validations.validatePassword(value);
      case 'passwordRepeat':
        return value === dadosPessoais.password;
      case 'data_de_nascimento':
        return validations.validateBirthDate(value);
      default:
        return !!value.trim();
    }
  };
  const handleNextButtonClick = () => {
    const currentCard = groups[currentIndex].cards;

    for (const card of currentCard) {
      const fieldValue = dadosPessoais[card.name];

      if (!isFieldValid(card, fieldValue)) {
        if (card.name === "passwordRepeat") {
          alert(`As senhas não são iguais.`);
        } else {
          alert(`Campo inválido no campo ${card.label}.`);
        }
        return;
      }
    }

    const updatedGroups = [...groups];
    updatedGroups[currentIndex].status = "filled";
    setGroups(updatedGroups);

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleAcceptTerms = () => {
    setTermoDeUso(true);
    setDadosPessoais((prevState) => ({
      ...prevState,
      termos_de_uso: `${termoDeUso}`,
    }));
    console.log('termosDeUso', true);
    console.log('termosDeUso', termoDeUso)
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDadosPessoais((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validations.validateForm(dadosPessoais)) {
      if (currentIndex === cards.length - 1) {
        console.log(dadosPessoais)
        router.push("/retiro/cadastro/dadosAdicionais");
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }
  };

  const isFormValid = () => {
    return Object.values(dadosPessoais).every((value) => value.trim() !== "");
  };



  const cards = groups[currentIndex].cards;

  return (
    <Card className="w-[350px]">
      <form onSubmit={handleFormSubmit}>
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-8">
            {groups.map((group, index) => (
              <React.Fragment key={index}>
                <ProgressBullet
                  active={index <= currentIndex}
                  status={group.status}
                />
                {index < groups.length - 1 && (
                  <ProgressLine active={index < currentIndex} />
                )}
              </React.Fragment>
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
                  value={dadosPessoais[card.name]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </div>
          {currentIndex === 0 && !showTermosDeUso && (
              <Button  onClick={toggleTermosDeUso} type="button" className="w-full mt-4 bg-blue900 hover:bg-blue-900">
                Contrato
              </Button>
            )}
            <div>{showTermosDeUso && <TermosDeUso onClose={toggleTermosDeUso} onAcceptTerms={handleAcceptTerms} />}</div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
            {currentIndex < groups.length - 1 && (
              <Button
                className="w-full mb-1 bg-success hover:bg-success"
                onClick={handleNextButtonClick} >
                Próximo
              </Button>
            )}
            {currentIndex === groups.length - 1 && (
              <Button className="w-full mb-1 bg-success" type="submit" disabled={!isFormValid()}>Cadastrar</Button>
            )}
          {currentIndex > 0 && (
            <Button
              className="w-full mb-1 bg-success hover:bg-success"
              onClick={() => setCurrentIndex((prevIndex) => prevIndex - 1)}>
              Voltar
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

