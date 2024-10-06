export const formatPaymentType = (type: string): string => {
    switch (type) {
        case 'bank_transfer':
            return 'Pix';
        case 'credit_card':
            return 'Cartão de Crédito';
        case 'debit_card':
            return 'Cartão de Débito';
        default:
            return type;
    }
};

export const formatPaymentStatus = (status: string): string => {
    switch (status) {
        case 'pending':
            return 'Pendente';
        case 'in_process':
            return 'Em processamento';
        case 'approved':
            return 'Aprovado';
        case 'rejected':
            return 'Recusado';
        default:
            return status;
    }
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};
