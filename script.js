// Variáveis globais
let runningTotal = 0;
let buffer = "0";
let previusOperator;

// Referência ao elemento de exibição na tela
const screen = document.querySelector('.screen');

// Função chamada quando um botão é clicado
function buttonClick(value){
    // Verifica se o valor é um número ou um símbolo
    if(isNaN(value)){
        // Se for um símbolo, chama a função para lidar com símbolos
        handleSymbol(value);
    } else {
        // Se for um número, chama a função para lidar com números
        handleNumber(value);
    }
    // Atualiza o conteúdo exibido na tela
    screen.innerText = buffer;
}

// Função para lidar com símbolos
function handleSymbol(symbol){
    switch(symbol){
        // Limpa tudo (C)
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        // Realiza a operação e exibe o resultado (=)
        case '=':
            if(previusOperator === null){
                return;
            }         
            flushOperation(parseInt(buffer));
            previusOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            break;
        // Remove o último caractere (←)
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        // Lida com operadores matemáticos (+, −, ×, ÷)
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

// Função para lidar com operadores matemáticos
function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }
    previusOperator = symbol;
    buffer = '0';
}

// Função para executar a operação pendente
function flushOperation(intBuffer){
    if(previusOperator === '+'){
        runningTotal += intBuffer;
    } else if(previusOperator === '−'){
        runningTotal -= intBuffer;
    } else if(previusOperator === '×'){
        runningTotal *= intBuffer;
    } else if(previusOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

// Função para lidar com números
function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// Inicialização - Adiciona um ouvinte de evento de clique aos botões da calculadora
function init(){
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}

// Inicializa a calculadora
init();
