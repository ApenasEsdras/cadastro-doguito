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

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customErro'
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
        customErro: 'Você deve ser maior de 18 anos para se cadastrar.'
    }

};

function mostraMensagemDeErro(tipoDeInput, input) {
    let mesagem = ''

    tiposDeErro.forEach(erro =>{
        if (input.validity[erro]) {
            mesagem = mensagensDeErro[tipoDeInput][erro]
        }
    })

    return mesagem
};

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
};

function validaDataNascimento(input) {
    // trazer o valor inserido no input: Date
    const dataRecebida = new Date(input.value);
    let mensagem = '';

    if (!mainorQue18(dataRecebida)) {
        mensagem = 'Vc presisa ser maior de idade '
    }
    // reposnsavel por fazer validação com comparaçõa de datas
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