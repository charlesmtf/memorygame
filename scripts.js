const cards = document.querySelectorAll('.memory-card');
const gameContainer = document.querySelector('.memory-game');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

  // Verificar se todas as cartas foram encontradas
  if (document.querySelectorAll('.memory-card.flip').length === cards.length) {
    endGame();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function endGame() {
  // Remover a função de clique das cartas
  cards.forEach(card => card.removeEventListener('click', flipCard));

  // Criar o elemento de mensagem
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';

  // Criar a mensagem de parabéns
  const message = document.createElement('h2');
  message.textContent = 'PARABÉNS';
  messageContainer.appendChild(message);

  // Criar o botão de jogar novamente
  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Jogar Novamente';
  playAgainButton.className = 'play-again-button';
  playAgainButton.addEventListener('click', resetGame);
  messageContainer.appendChild(playAgainButton);

  // Estilizar a mensagem e o botão
  messageContainer.style.position = 'fixed';
  messageContainer.style.top = 0;
  messageContainer.style.left = 0;
  messageContainer.style.width = '100%';
  messageContainer.style.height = '100%';
  messageContainer.style.display = 'flex';
  messageContainer.style.flexDirection = 'column';
  messageContainer.style.justifyContent = 'center';
  messageContainer.style.alignItems = 'center';
  messageContainer.style.fontSize = '48px';
  messageContainer.style.color = '#ffffff';
  messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  message.style.marginBottom = '20px';

  playAgainButton.style.padding = '10px 20px';
  playAgainButton.style.fontSize = '24px';
  playAgainButton.style.color = '#ffffff';
  playAgainButton.style.backgroundColor = '#f8e71c';
  playAgainButton.style.border = 'none';
  playAgainButton.style.borderRadius = '5px';
  playAgainButton.style.cursor = 'pointer';

  // Adicionar a mensagem ao elemento gameContainer
  gameContainer.appendChild(messageContainer);
}

function resetGame() {
  // Remover a mensagem e o botão
  const messageContainer = document.querySelector('.message-container');
  gameContainer.removeChild(messageContainer);

  // Reiniciar o jogo
  cards.forEach(card => {
    card.classList.remove('flip');
    card.addEventListener('click', flipCard);
  });

  shuffleCards();
}

function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffleCards();

cards.forEach(card => card.addEventListener('click', flipCard));
