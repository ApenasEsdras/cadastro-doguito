// chama toda vez q o campo estiver sem foco

export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }
    // validaty.valid == estaõ presente no cor da o input
    // para obter os campos add: $0.validity no concole.
    if (input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ""
    } else {
        input.parentElement.classList.add('input-container--invalido');
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)
    }
};

// Arry para armazenar os tipos de erros
const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError'
];


// mesagems de Erro para os campos de vaidaçõa
const mensagensDeErro = {
    // tenho que criar um campo para cada input
    nome: {
        valueMissing: 'O campo (nome) não pode ficar vazio.'
    },
    email: {
        valueMissing: 'O campo de (Email) não pode estar vazio.',
        typeMismatch: 'O email digitado não é valido.'
    },
    senha: {
        valueMissing: 'O campo de (senha) não pode estar vazio.',
        patternMismatch: 'A senhar deve conter: '+  '</br>' +
         'De 6 a 12 caracteres ' + '</br>' +
         'Pelomenos uma letra maiuscula e uma minucula,'+'</br>' +
         'Pelomenos um numero não deve conter símbolos.'
    },
    dataNascimento: {
        valueMissing: 'O campo de (Data de nascimento) não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },
    cpf: {
        valueMissing: 'O campo de (CPF) não pode estar vazio.',
        customError: 'O CPF é Invalido'
    }

};

const validadores = {
    dataNascimento: input => validaDataNascimento(input),
    cpf: input => validaCPF(input)
};

function mostraMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''

    tiposDeErro.forEach(erro =>{
        if (input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mensagem
};


function validaDataNascimento(input) {
    // trazer o valor inserido no input: Date
    const dataRecebida = new Date(input.value);
    let mensagem = '';

    if (!mainorQue18(dataRecebida)) {
        mensagem = 'Vc presisa ser maior de idade '
    }
    // responsável por fazer validação com comparações de datas
    input.setCustomValidity(mensagem);

};

// gera e caucula a datainseria + 18 anos paara fazer soma.
function mainorQue18(data) {
    // traz a data atual
    const dataAtual = new Date();
    // data recebido mais o ano (idade minima para validação);
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual;
};

// valida cpf

// esse replace() == função presente no input responsável 
// por subistituir um vlaor por outro

// replace(/\D/g, '') == subistitui tudo que não for numero etraca por um ascring vazia
function validaCPF(input){
    const cpfFormatado = input.value.replace(/\D/g, '');
    let mensagem = ''
    if(!checaCPFrepetido(cpfFormatado) || !checaEstruturaCPF(cpfFormatado)){
        mensagem = "O valor digitado é invalido"
    }

    input.setCustomValidity(mensagem);
}

function checaCPFrepetido(cpf){
    const valoresRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]
    let cpfValido = true;
    
    valoresRepetidos.forEach(valor =>{
        if(valor == cpf){
            cpfValido = false
        }
    })
    return cpfValido
}

// valida numeros do cpf

function checaEstruturaCPF(cpf){
    const multiplicador = 10;
    return checaDigitoVerificador(cpf, multiplicador);

}
function checaDigitoVerificador(cpf, multiplicador){
    if (multiplicador >= 12){
        return true
    }
    let multiplicadorInicial = multiplicador
    let soma = 0;
    const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('');
    const digitoVerificador = cpf.charAt(multiplicador - 1);
    for(let contador = 0; multiplicadorInicial > 1; multiplicadorInicial--){
        soma = soma + cpfSemDigitos[contador] * multiplicadorInicial
        contador++
    }
    if (digitoVerificador == confirmaDigito(soma)){
        return checaDigitoVerificador(cpf, multiplicador + 1)
    }

    return false

}
function confirmaDigito(soma){
    return 11 - (soma % 11)
}


// função que valida o primeiro dígito verificador:sa

// function checaDigitoVerificadorCPF(cpf, multiplicador) {
//     let soma = 0
//     let contador = 0
//     const cpfSemDigitos = cpf.substr(0, multiplicador - 1).split('')
//     const digitoVerificador = cpf.charAt(multiplicador - 1)
//     for(; multiplicador > 1 ; multiplicador--) {
//         soma = soma + cpfSemDigitos[contador] * multiplicador
//         contador++
//     }

//     if(soma % 11 > 9) {
//         return digitoVerificador == 0
//     }

//     return digitoVerificador == 11 - (soma % 11)
// }