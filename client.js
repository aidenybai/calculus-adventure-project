import { render } from 'million';
import { html } from 'million/html';
import confetti from 'canvas-confetti';

document.querySelector('#enable').addEventListener('click', () => {
  const welcome =
    "Welcome to AMONG US, Sussy Solver! We have an emergency, Oxygen is sabotaged but they're really bad at it. It's gonna take 45 minutes before the spaceship explodes! We need to vote out the imposter quick! Will you help us complete tasks and save the day?";
  const audio = new Audio('/img/sabotage.mp3');
  const msg = new SpeechSynthesisUtterance();

  audio.volume = 0.5;
  audio.loop = true;

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  audio.play();

  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <p>${welcome}</p>
        <button
          onClick=${() => {
            audio.pause();
            window.speechSynthesis.cancel();
            instructions();
          }}
        >
          YES!
        </button>
      </div>
    </div>`
  );
});

let hasReadInstructions = false;

const map = {
  red: 1,
  blue: 2,
  green: 3,
};
let vote = [];
const audio = new Audio('/img/song.mp3');

const instructions = () => {
  const welcome =
    "Poggers! Let's get started. The game will... The crewmates are RED, BLUE, and GREEN. Select an amogus to enter your answer for a task!";
  if (!hasReadInstructions) {
    const msg = new SpeechSynthesisUtterance();

    audio.volume = 0.1;
    audio.loop = true;

    msg.text = welcome;
    window.speechSynthesis.speak(msg);
    audio.play();
  }
  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <p>${welcome}</p>
        <div>
          ${['red', 'blue', 'green'].map((color) => {
            return html`<button
              disabled=${vote.includes(color)}
              onClick=${() => {
                window.speechSynthesis.cancel();
                task(color);
              }}
            >
              <img src="/img/${color}.webp" width="100" />
            </button>`;
          })}
        </div>
        <div>
          ${vote.length === 3
            ? html`<button
                onClick=${() => {
                  audio.pause();
                  voteScreen();
                }}
              >
                Begin vote
              </button>`
            : ''}
        </div>
      </div>
    </div>`
  );
};

const task = (color) => {
  const welcome = `Hello! I am ${color} amogus! Please enter your answer below:`;
  const msg = new SpeechSynthesisUtterance();

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  hasReadInstructions = true;
  let lock = false;

  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <button
          onClick=${() => {
            window.speechSynthesis.cancel();
            instructions();
          }}
        >
          Go Back
        </button>
        <p>${welcome}</p>
        <input id="val" type="number" placeholder="Enter here" /><br /><br />
        <button
          onClick=${() => {
            if (lock) return;
            lock = true;
            window.speechSynthesis.cancel();
            if (map[color] === Number(document.querySelector('#val').value)) {
              const msg = new SpeechSynthesisUtterance();

              msg.text = 'Correct! You got my vote! Pog ger sus!';
              window.speechSynthesis.speak(msg);
              vote.push(color);
              msg.onend = () => {
                instructions();
                lock = false;
              };
            } else {
              msg.text = "Hmm.. that isn't quite right";
              window.speechSynthesis.speak(msg);
              lock = false;
            }
          }}
        >
          Check answer
        </button>
      </div>
    </div>`
  );
};

let imposter = 'red';

const voteScreen = () => {
  const welcome =
    'Good work on getting all the votes. It has come time to vote out the imposter... Choose wisely. If you choose wrong, you will be murdered by the sussy baka imposter. Win, and you save the spaceship. Can you do this crewmate?';
  const msg = new SpeechSynthesisUtterance();
  const audio = new Audio('/img/vote.mp3');

  audio.volume = 0.75;
  audio.loop = true;

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  audio.play();

  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <p>${welcome}</p>
        <div>
          ${['red', 'blue', 'green'].map((color) => {
            return html`<button
              onClick=${() => {
                if (!confirm('Are you sure')) return;
                window.speechSynthesis.cancel();
                audio.pause();
                if (color === imposter) win();
                else lose();
              }}
            >
              <img src="/img/${color}.webp" width="100" />
            </button>`;
          })}
        </div>
      </div>
    </div>`
  );
};

const win = () => {
  const welcome =
    'Congrats crewmate. You have saved the entire spaceship and the sussy baka crew! Thank you for your bravery.';
  const msg = new SpeechSynthesisUtterance();
  const audio = new Audio('/img/win.mp3');

  audio.volume = 0.55;
  audio.loop = true;

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  audio.play();
  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <p>${welcome}</p>
        <img src="/img/dance.gif" width="500" />
      </div>
    </div>`
  );
  setInterval(() => {
    confetti();
  }, 750);
};

const lose = () => {
  const welcome =
    `You lost!! The impsoter was ${imposter}! Unfortunately, the imposters won, leading the spaceship to blow up and you getting sussy baka murdered`;
  const msg = new SpeechSynthesisUtterance();
  const audio = new Audio('/img/DEATH.mp3');

  audio.volume = 0.55;
  audio.loop = true;

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  audio.play();
  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src="/img/title.png" width="300" />
        </div>
        <p>${welcome}</p>
        <img src="/img/death.gif" width="500" />
      </div>
    </div>`
  );
};