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

  export const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!/^\d+$/.test(phoneNumber)) {
      return false;
    }
    if (phoneNumber.length < 10) {
      return false;
    }
    if (phoneNumber.length > 11) {
      return false;
    }
    return true;
  };

  export const validateForm = (dadosPessoais: DadosPessoais): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!validateCPF(dadosPessoais.cpf)) {
      return false;
    }

    if (!validateRG(dadosPessoais.rg)) {
      return false;
    }

    if (!validateEmail(dadosPessoais.email)) {
      return false;
    }

    if (dadosPessoais.password !== dadosPessoais.passwordRepeat) {
      return false;
    }

    if (!passwordRegex.test(dadosPessoais.password)) {
      return false;
    }

    if (!passwordRegex.test(dadosPessoais.password)) {
      return false;
    }

    if (!validateBirthDate(dadosPessoais.data_de_nascimento)) {
      return false;
    }

    if (!validatePhoneNumber(dadosPessoais.telefone)) {
      return false;
    }

    if (!validatePhoneNumber(dadosPessoais.telefone_emergencia)) {
      return false;
    }

    return true;
  };