function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function id(valor) {
    return document.getElementById(valor);
}

function iniciarValidacao() {

    //limpando as menssagens
    id('msgErro').innerHTML = '';

    let cpf = id('validarCpf').value;

    if (cpf != '') {
        validarCpf();
    } else {
        id('msgErro').innerHTML = 'Que tal você digitar alguma coisa primeiro 😛';
    }

    function validarCpf() {
        // tem jeito mais dahora pra fazer isso mas... por enquanto é isso!
        listaBloqueada = [11111111111, 22222222222, 33333333333, 44444444444, 55555555555, 66666666666, 77777777777, 88888888888, 99999999999];
        controle = 0;
        for (let i = 0; i < 9; i++) {
            // dava pra fazer tudo junto, mas sei lá ia ficar grande e repetitivo!
            if (cpf != listaBloqueada[i]) {
                controle++;
            } else {
                id('msgErro').innerHTML = 'CPF Inválido';
            }
        }

        if (controle === 9) {
            if (cpf.length === 11 && isNumber(cpf)) {
                validandoCpf();
            } else {
                id('msgErro').innerHTML = 'CPF Inválido';
            }
        }
    }


    function validandoCpf() {
        // 1º parte
        controle = 10;
        let guardarValor = [];
        let soma = 0;

        for (let i = 0; i < 9; i++) {
            guardarValor.push(parseInt(cpf[i]) * controle)
            soma = soma + guardarValor[i];
            controle--;
        }

        let primeiroDigito = (soma * 10) % 11;
        if (primeiroDigito > 9) {
            primeiroDigito = 0;
        }

        // 2º parte
        controle = 11;
        guardarValor = [];
        soma = 0;

        for (let i = 0; i < 10; i++) {
            guardarValor.push(parseInt(cpf[i]) * controle)
            soma = soma + guardarValor[i];
            controle--;
        }

        let segundoDigito = (soma * 10) % 11;
        if (segundoDigito > 9) {
            segundoDigito = 0;
        }

        if (primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10])) {
            id('msgErro').innerHTML = 'CPF Válido';
        } else {
            id('msgErro').innerHTML = 'CPF Inválido';
        }

    }
}

function gerarCpf() {

    function gerarNumero(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    let numero = `${gerarNumero(000000000, 999999999)}`;


    let controle = 10;
    let soma = 0;
    let guardarValor = [];

    for (let i = 0; i < 9; i++) {
        guardarValor.push(parseInt(numero[i] * controle));
        soma = soma + guardarValor[i];
        controle--;
    }

    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito > 9) {
        numero += 0;

    } else {
        numero += primeiroDigito;

    }

    controle = 11;
    soma = 0;
    guardarValor = [];

    for (let i = 0; i < 10; i++) {
        guardarValor.push(parseInt(numero[i] * controle));
        soma = soma + guardarValor[i];
        controle--;
    }

    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito > 9) {
        numero += 0;
    } else {
        numero += segundoDigito;
    }

    // por causa dos NaN (ainda não sei onde corrigir)
    // solução temporaria
    if (!parseInt(numero[9]) || !parseInt(numero[10])) {
        gerarCpf();
    } else {
        id('gerarCpf').value = numero;
    }

}