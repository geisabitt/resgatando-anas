import { DadosPessoais } from './model';

export const validateCPF = (cpf: string): boolean => {
    const regex = /^[0-9]{11}$/;
    return regex.test(cpf);
  };

  export const validateRG = (rg: string): boolean => {
    const regex = /^[0-9]{8}$/;
    return regex.test(rg);
  };

  export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  export const validateBirthDate = (birthDate: string): boolean => {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 99, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    const inputDate = new Date(birthDate);

    return inputDate >= minAgeDate && inputDate <= maxAgeDate;
  };

  export const validateForm = (dadosPessoais: DadosPessoais): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!validateCPF(dadosPessoais.cpf)) {
      alert("CPF inválido!");
      return false;
    }

    if (!validateRG(dadosPessoais.rg)) {
      alert("RG inválido!");
      return false;
    }

    if (!validateEmail(dadosPessoais.email)) {
      alert("Email inválido!");
      return false;
    }

    if (dadosPessoais.password !== dadosPessoais.passwordRepeat) {
      alert("As senhas não são iguais!");
      return false;
    }

    if (!passwordRegex.test(dadosPessoais.password)) {
      alert(
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e ter no mínimo 8 caracteres."
      );
      return false;
    }

    if (!passwordRegex.test(dadosPessoais.password)) {
      alert(
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e ter no mínimo 8 caracteres."
      );
      return false;
    }

    if (!validateBirthDate(dadosPessoais.data_de_nascimento)) {
      alert("A idade deve estar entre 18 e 99 anos.");
      return false;
    }

    return true;
  };