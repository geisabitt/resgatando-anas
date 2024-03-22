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

type Questions = {
  label: string;
  cards: {
    label: string;
    name: keyof FormData;
    type: string;
    placeholder?: string;
    options?: string[];
    } [] }

type FormData = {
  possui_doenca: string;
  qual_doenca: string;
  uso_de_medicamento: string;
  qual_medicamento: string;
  alergia_medicamento: string;
  qual_alergia_medicamento: string;
  dieta_alergia_alimentar: string;
  qual_dieta_alergia_alimentar: string;
  tamanho_blusa: string;
};

export function AnamineseProgressiveForm() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    possui_doenca: "",
    qual_doenca: "",
    uso_de_medicamento: "",
    qual_medicamento: "",
    alergia_medicamento: "",
    qual_alergia_medicamento: "",
    dieta_alergia_alimentar: "",
    qual_dieta_alergia_alimentar: "",
    tamanho_blusa: "",
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
      console.log('<<<<<formData>>>>>>',formData);
      redirect('/retiro/cadastro/status')
    } else {
      console.log('<<<<<formData>>>>>>',formData);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };


  const groups: Questions[] = [
    {
      label: "Doença",
      cards: [
        { label: "Possui alguma doença?", name: "possui_doenca", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual doença ?", name: "qual_doenca", type: "text"},
      ],
    },
    {
      label: "Medicamento",
      cards: [
        { label: "Faz uso de algum medicamento?", name: "uso_de_medicamento", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual medicamento ?", name: "qual_medicamento", type: "text"},
      ],
    },
    {
      label: "Alergia a Medicamento",
      cards: [
        { label: "Tem alergia a algum medicamento ?", name: "alergia_medicamento", type: "radio", options: ["Sim", "Não"]},
        { label: "Qual medicamento ?", name: "qual_alergia_medicamento", type: "text"},
      ],
    },
    {
      label: "Dieta Restrita",
      cards: [
        { label: "Faz alguma dieta obrigatória devido à doença ou algum tipo de restrição alimentar causada por alergia ou intolerância a algum tipo de alimento?", name: "dieta_alergia_alimentar", type: "radio", options: ["Sim", "Não"]},
        { label: "Quais alimentos ?", name: "qual_dieta_alergia_alimentar", type: "text"},
      ],
    },
    {
      label: "Tamanho da Blusa",
      cards: [
        { label: "Selecione o tamanho", name: "tamanho_blusa", type: "radio", options: ["PP", "P", "M", "G", "GG", "XG", "XGG"] },
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
          <CardTitle>Preencha os campos abaixo</CardTitle>
          <CardDescription>para uma melhor expêriencia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col space-y-1.5">
              <Label htmlFor={card.name}>{card.label}</Label>
              {card.type === "radio" ? (
                <div className="flex flex-wrap gap-4">
                  {card.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <input
                        type="radio"
                        id={`${card.name}_${optionIndex}`}
                        name={card.name}
                        value={option}
                        checked={formData[card.name] === option}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="pl-2" htmlFor={`${card.name}_${optionIndex}`}>{option}</label>
                    </div>
                  ))}
                </div>
              ) : (
                <Input
                  name={card.name}
                  id={card.name}
                  type={card.type}
                  placeholder={card.placeholder}
                  value={formData[card.name]}
                  onChange={handleInputChange}
                  required
                />
              )}
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
               <Link href="/retiro/cadastro/status">Cadastrar</Link>
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

