/* 

Jogo: Chute o número

Objetivos: 

1. Gerar um número de 1 a 100 (aleatório);

2. Gravar os números que o jogador informar. O número mínimo é 1;

3. Prover o jogador uma forma de saber se o número que ele chutou está correto;

4. Uma vez que o jogador iniciar o jogo e chutar um número esse número deve ser registrado para que 
o jogador possa ver qual número ele já tentou;

5. Depois da inserção do número, validar se esse número é o número correto;

6. Se for o número correto: (a) Mostrar uma mensagem de congratulação; (b) Impedir que mais chutes sejam informados; (c) Mostrar um controle
que permita o jogador reiniciar o jogo;

7. Se for o número errado e o jogador ainda tiver mais chances: (a) Informar que o jogador chutou o número errado e prover uma forma dele saber
se foi perto ou longe o chute; (b) Permitir mais chutes (até o limite máximo); (c) incrementar o número de chutes sempre +1;

8. Se o jogador errar todos os chutes: (a) informar que o jogo temrinou; (b) Impedir que mais chutes sejam informados; (c) Permitir
que o jogador reinicie o jogo;

9. Ao reiniciar, os números gerados devem ser novamente aleatórios, sempre.

*/

/*Passo 1 

Note que as constantes estão associadas as classes dos elementos HTML. O nome das variáveis é o mesmo nome das classes CSS.
Ainda, pelo método let foram criadas as variáveis: (a) número aleatório; (b) guessCount; e (c) o botão de reiniciar (resetButton)

*/



let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

/* Depois das definições das constantes e variáveis, inserimos uma função. 
    As funções são blocos de códigos reutilizáveis que podem ser inseridos no nosso código de acordo com a necessidade. 

    Temos a função -- function checkGuess() -- e dentro dela, sinalizado pelas chaves {}, nós inserimos o que queremos que aconteça
    quando a função for invocada. 

    A função resume os eventos possíveis do jogo. Cada um dos condicionais indica o que deve ocorrer caso o jogador insira o númro correto, 
    caso as chances se esgotem ou caso ele erre e receba feedback. 

    É um exemplo de Decisão Encadeadas Simples.

    */

    function checkGuess() {

        const userGuess = Number(guessField.value); /*A variável constante userGuess recebe uma informação pelo usuário que será transformada em um número inteiro. Entre parênteses no método NUmber() está a classe do input HTML */
            if (guessCount === 1) {
                guesses.textContent = 'Previous guesses: ';
            }
                guesses.textContent += `${userGuess} `;

            if (userGuess === randomNumber) {
                lastResult.textContent = 'Congratulations! You got it right!';
                lastResult.style.backgroundColor = 'green';
                lowOrHi.textContent = '';
                    setGameOver();

            } else if (guessCount === 10) {
                lastResult.textContent = '!!!GAME OVER!!!';
                lowOrHi.textContent = '';
                    setGameOver();
            } else {
                lastResult.textContent = 'Wrong!';
                lastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
            } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
            }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
    }

    /*Adicionando um evento para que o código acima funcione */

    guessSubmit.addEventListener('click', checkGuess);

    /*Adiciona a parte final do código que permite que o jogo termine */

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        document.body.append(resetButton);
        resetButton.addEventListener('click', resetGame);
        }

/*Após adicionar a função que encerra o jogo, adicionamos a função que o reinicia */

    function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
    resetPara.textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}