import { render } from 'million';
import { html } from 'million/html';
import confetti from 'canvas-confetti';

import dance from './img/dance.gif';
import death from './img/death.gif';
import death_song from './img/DEATH.mp3';
import sabotage_song from './img/sabotage.mp3';
import vote_song from './img/vote.mp3';
import win_song from './img/win.mp3';
import song_song from './img/song.mp3';
import meeting_song from './img/meeting.mp3';
import title from './img/title.png';
import blue from './img/blue.webp';
import red from './img/red.webp';
import green from './img/green.webp';
import button_img from './img/button.webp';

const color_img = {
  blue,
  red,
  green,
};

document.querySelector('#enable').addEventListener('click', () => {
  const welcome =
    "Welcome to AMONG US, Sussy Solver! We have an emergency, Oxygen is sabotaged and we need to figure out the imposter FAST! It's 45 minutes before the spaceship explodes! Will you help us complete tasks and save the day?";
  const audio = new Audio(sabotage_song);
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
          <img src=${title} width="300" />
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
  red: 69,
  blue: 69,
  green: 69,
};
let vote = [];
const audio = new Audio(song_song);

const instructions = () => {
  const welcome =
    "Poggers! Let's get started. Refer to the materials given to you to find the crewmates and help them with their tasks. The crewmates are RED, BLUE, and GREEN. When you are done with a task, select an amogus to check your answer!";
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
          <img src=${title} width="300" />
        </div>
        <p>${welcome}</p>
        <div>
          ${vote.length === 3
            ? html`<button
                onClick=${() => {
                  const buzz = new Audio(meeting_song);
                  buzz.play();
                  audio.pause();
                  voteScreen();
                }}
              >
                <img src=${button_img} width="150" />
              </button>`
            : ''}
        </div>
        <div>
          ${['red', 'blue', 'green'].map((color) => {
            return html`<button disabled=${!vote.includes(color)}>
              <img class="small" src=${color_img[color]} width="50" />
            </button>`;
          })}
        </div>
        <div>
          <input
            type="text"
            id="code"
            placeholder="Enter crewmate code"
          /><br /><br />
          <button
            onClick=${() => {
              const crewmate_code = {
                r: 'red',
                g: 'blue',
                b: 'green',
              };
              const input = document.querySelector('#code').value.trim();
              if (Object.keys(crewmate_code).includes(input)) {
                window.speechSynthesis.cancel();
                task(crewmate_code[input]);
              }
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>`
  );
};

const task = (color) => {
  let welcome = '';
  if (color === 'red') {
    welcome = `Yo! I'm red. I'm trying to do scan right now, but the scanner isnt calibrated right. Could you help scan me? My estimates tell me my surface area is between X and X. Lemme know ya answer if ya know!`;
  } else if (color === 'green') {
    welcome = `Um hey. My name is pin-... I mean green. Yeah I've just been running that's why I'm sweaty. Ummmmmm I was just at wires HAHAHA. Anyway, I can help you if you can help me with this task. `;
  } else if (color === 'blue') {
    welcome = `heya, its blue! darn im having a hard time fixing wires, you think you can help me with it? lmk your answer asap.`;
  }
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
          <img src=${title} width="300" />
        </div>
        <div class="mx-auto">
          <img src=${color_img[color]} width="100" />
        </div>
        <button
          onClick=${() => {
            window.speechSynthesis.cancel();
            instructions();
          }}
        >
          Go Back
        </button>
        <p id="wel1">${welcome}</p>
        <input
          required
          type="submit"
          id="val"
          type="number"
          placeholder="Enter here"
        /><br /><br />
        <button
          onClick=${() => {
            if (lock) return;
            lock = true;
            window.speechSynthesis.cancel();
            if (map[color] === Number(document.querySelector('#val').value)) {
              const msg = new SpeechSynthesisUtterance();
              let message = '';
              if (color === 'red') {
                message = `Eyyy thank you so much homie!! I trust you for sure for sure. No kizzy, on god, homies for life!`;
              } else if (color === 'green') {
                message = `Ummmmm haha thank you. I guess i'll SEE you around haha. Anyway BYE I gotta go!`;
              } else if (color === 'blue') {
                message = `wow tysm!! u got my vote :))`;
              }
              msg.text = message;
              window.speechSynthesis.speak(msg);
              document.querySelector('#wel1').textContent = message;
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
  const audio = new Audio(vote_song);

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
          <img src=${title} width="300" />
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
              <img src=${color_img[color]} width="100" />
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
  const audio = new Audio(win_song);

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
          <img src=${title} width="300" />
        </div>
        <p>${welcome}</p>
        <img src=${dance} width="500" />
      </div>
    </div>`
  );
  setInterval(() => {
    confetti();
  }, 750);
};

const lose = () => {
  const welcome = `You lost!! The impsoter was ${imposter}! Unfortunately, the imposters won, leading the spaceship to blow up and you getting sussy baka murdered`;
  const msg = new SpeechSynthesisUtterance();
  const audio = new Audio(death_song);

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
          <img src=${title} width="300" />
        </div>
        <p>${welcome}</p>
        <img src=${death} width="500" />
      </div>
    </div>`
  );
};
