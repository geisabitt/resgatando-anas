import { Users } from "@prisma/client";

// Função para validar os dados do usuário
export function validateUserData(userData: Partial<Users>): string | null {

    for (const [key, value] of Object.entries(userData)) {
        if (!value) {
            return `${key} não pode estar vazio.`;
        }

        if (typeof value === 'string' && value.length > 100) {
            return `${key} não pode ultrapassar a quantidade de caracteres permitidos.`;
        }
    }

    if (!isValidCPF(userData.cpf!)) {
        return "CPF inválido. Deve conter apenas números e ter 11 dígitos.";
    }

    if (!isValidRG(userData.rg!)) {
        return "RG inválido. Deve conter apenas números e entre 7 e 8 dígitos.";
    }

    if (!isValidTelefone(userData.telefone!)) {
        return "Telefone inválido. Deve conter apenas números e entre 10 e 11 dígitos.";
    }

    if (!isValidTelefone(userData.telefone_emergencia!)) {
        return "Telefone de Emergência inválido. Deve conter apenas números e entre 10 e 11 dígitos.";
    }

    if (!isValidEmail(userData.email!)) {
        return "Email inválido.";
    }

    if (!isValidBirthDate(userData.data_de_nascimento!)) {
        return "Data de nascimento inválida. O usuário deve ter mais de 18 anos e menos de 99 anos.";
    }

    if (!isValidPassword(userData.password!)) {
        return "Senha inválida. Deve conter letras maiúsculas, minúsculas, números e ter no mínimo 8 caracteres.";
    }

    return null; // Retorna null se todas as validações passarem
}

// Função para validar CPF
function isValidCPF(cpf: string): boolean {
    const cpfRegex = /^\d{11}$/;
    return cpfRegex.test(cpf);
}

// Função para validar RG
function isValidRG(rg: string): boolean {
    const rgRegex = /^\d{7,8}$/;
    return rgRegex.test(rg);
}

// Função para validar telefone
function isValidTelefone(telefone: string): boolean {
    const telefoneRegex = /^\d{10,11}$/;
    return telefoneRegex.test(telefone);
}
// Função para validar email utilizando regex
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailRegex.test(email);
}

// Função para validar data de nascimento
function isValidBirthDate(birthDate: string): boolean {
    const today = new Date();
    const userBirthDate = new Date(birthDate);
    const userAge = today.getFullYear() - userBirthDate.getFullYear();
    return userAge >= 18 && userAge < 99;
}

// Função para validar senha
function isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}