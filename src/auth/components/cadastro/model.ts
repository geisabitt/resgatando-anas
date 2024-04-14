export type DadosPessoais = {
    name: string;
    telefone: string;
    telefone_emergencia: string;
    rg: string;
    cpf: string;
    data_de_nascimento: string;
    email: string;
    password: string;
    passwordRepeat:string;
    termos_de_uso: string;
  };

export type AlertMessage = {
  title: string
  message: string
}
export type DadosAnaminese = {
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
export type CardData = {
  label: string;
  name: keyof DadosPessoais;
  type: string;
  placeholder: string;
}

export type GroupData = {
  label: string;
  status: "notFilled" | "filled";
  cards: CardData[];
}