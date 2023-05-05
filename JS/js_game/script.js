const choices = document.querySelectorAll('#choices button');
const result = document.getElementById('result');

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    // Генерируем случайный выбор компьютера
    let computerOption = Math.random();
    if (computerOption < 0.34) {
        computerOption = 'rock';
    } else if (computerOption <= 0.67) {
        computerOption = 'scissors';
    } else {
        computerOption = 'paper';
    }

    // Определяем победителя
    let winner;
    if (playerChoice === computerOption) {
        winner = 'Ничья!';
    } else if (playerChoice === 'rock') {
        winner = (computerOption === 'scissors') ? 'Вы победили!' : 'Компьютер победил!';
    } else if (playerChoice === 'scissors') {
        winner = (computerOption === 'paper') ? 'Вы победили!' : 'Компьютер победил!';
    } else if (playerChoice === 'paper') {
        winner = (computerOption === 'rock') ? 'Вы победили!' : 'Компьютер победил!';
    }

    // Выводим результаты
    result.innerHTML = `${winner} Вы выбрали ${playerChoice}, компьютер выбрал ${computerOption}.`;
    if (winner === 'Вы победили!') {
        playerScore++;
    } else if (winner === 'Компьютер победил!') {
        computerScore++;
    }
}

// Обрабатываем клик на кнопке
choices.forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});

