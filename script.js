'use strict';
// Selecting elements
const PLayer0L = document.querySelector('.player--0');
const PLayer1L = document.querySelector('.player--1');

const score0L = document.querySelector('#score--0'); //when slecting elements, . is used for selecting class, # is used for selecting id.
const score1L = document.getElementById('score--1'); // the above works the same as this
const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const Current0L = document.getElementById('current--0');
const Current1L = document.getElementById('current--1');

let score, CurrentScore, ActivePlayer, playing;

const restart = function () {
  score = [0, 0];
  CurrentScore = 0;
  ActivePlayer = 0;
  playing = true;

  score0L.textContent = 0;
  score1L.textContent = 0;
  Current0L.textContent = 0;
  Current1L.textContent = 0;

  diceE1.classList.add('hidden');
  PLayer0L.classList.remove('player--winner');
  PLayer1L.classList.remove('player--winner');
  PLayer0L.classList.add('player--active');
  PLayer1L.classList.remove('player--active');
};

restart();

const switchPlayer = function () {
  CurrentScore = 0;
  document.getElementById(`current--${ActivePlayer}`).textContent =
    CurrentScore;
  ActivePlayer = ActivePlayer === 0 ? 1 : 0;
  PLayer0L.classList.toggle('player--active');
  PLayer1L.classList.toggle('player--active');
};

//New Game Funtionality

//Rolling Dice Funcationality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const RolledDice = Math.trunc(Math.random() * 6) + 1; //generating a random dice number

    diceE1.classList.remove('hidden'); // remove the hidden and make the dice happen again
    diceE1.src = `dice-${RolledDice}.png`; // change src to the picture information name

    //check for rolled 1:
    if (RolledDice !== 1) {
      //add dice number to current score
      CurrentScore += RolledDice; //add dice number to current score
      document.getElementById(`current--${ActivePlayer}`).textContent =
        CurrentScore; //display current score to the webpage , changre later
    } // switching the user
    else {
      switchPlayer();
    }
  }
});
//button functionary

btnHold.addEventListener('click', function () {
  if (playing) {
    //Add cuurent score to the active payer's score
    score[ActivePlayer] += CurrentScore;
    document.getElementById(`score--${ActivePlayer}`).textContent =
      score[ActivePlayer];

    //check if the sore >=100
    if (score[ActivePlayer] >= 100) {
      playing = false;
      diceE1.classList.remove('hidden');

      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${ActivePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', restart); // you put the const which is a function there as the augurment so dont need to declare it with  restart ()
