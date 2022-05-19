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

import red_task from './img/red-task.png';
import blue_task from './img/blue-task.png';
import green1_task from './img/green1-task.png';
import green2_task from './img/green2-task.png';

const color_img = {
  blue,
  red,
  green1: green,
  green2: green,
};

const color_bg = {
  blue: blue_task,
  red: red_task,
  green1: green1_task,
  green2: green2_task,
};

const color_text = {
  blue: 'text-blue',
  red: 'text-red',
  green1: 'text-green',
  green2: 'text-green',
};

document.querySelector('#enable').addEventListener('click', () => {
  const welcome =
    'ATTENTION CREWMATES! There is [ONE] emergency that requires: [IMMEDIATE ATTENTION]. A non-bean lifeform has been detected onboard and has sabotaged the oxygen systems. It is up to you and your fellow crewmates to find the impostor, fix the problem, and save us all.';
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
  red: [69, 69],
  blue: [69, 69],
  green1: [0, 100],
  green2: [0, 100],
};
let vote = [];
const audio = new Audio(song_song);

const instructions = () => {
  const welcome =
    'Utilize your map and your brains to find each crewmate throughout the ship. When you find each crewmate, type in their code to access their problem and help them with their task. When you have helped all the crewmates, call in a meeting to vote out the impostor. Pay attention to what each crew member has to say!';
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
          ${vote.length === 4
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
            : html`<div>
                <input
                  type="text"
                  id="code"
                  placeholder="Enter crewmate code"
                /><br /><br />
                <button
                  onClick=${() => {
                    const crewmate_code = {
                      r: 'red',
                      b: 'blue',
                      g1: 'green1',
                      g2: 'green2',
                    };
                    const input = document.querySelector('#code').value.trim();

                    if (Object.keys(crewmate_code).includes(input)) {
                      const color = crewmate_code[input];
                      if (vote.includes(color)) {
                        window.speechSynthesis.cancel();
                        const msg = new SpeechSynthesisUtterance();
                        let message;
                        if (color === 'red') {
                          msg.lang = 'en';
                          message = `Hey! I've already completed my task.`;
                        } else if (color === 'green1') {
                          msg.lang = 'de';
                          message = `Dumbo, I've done this task already. Go help me on my next task`;
                        } else if (color === 'green2') {
                          msg.lang = 'de';
                          message = `Stew peed. I'm done with both my tasks.`;
                        } else if (color === 'blue') {
                          msg.lang = 'zh';
                          message = `Hallo. I already complete task`;
                        }
                        msg.text = message;
                        window.speechSynthesis.speak(msg);
                      } else {
                        window.speechSynthesis.cancel();
                        task(color);
                      }
                    }
                  }}
                >
                  Submit
                </button>
              </div>`}
        </div>
        <div>
          <br /><br />
          ${['red', 'blue', 'green2'].map((color) => {
            return html`<button disabled=${!vote.includes(color)}>
              <img class="small" src=${color_img[color]} width="50" />
            </button>`;
          })}
          <br /><br />
        </div>
      </div>
    </div>`
  );
};

const task = (color) => {
  let lock = false;
  let welcome = '';

  const msg = new SpeechSynthesisUtterance();
  if (color === 'red') {
    msg.lang = 'en';
    welcome = `Hia! I was goin’ about my tasks when I ran into trouble calibrating the scanner. I was hoping you could help me find this average crewmate surface area so that the scanner can scan me properly. You should be able to approximate this using the functions [insert functions here] and rotating them around the y-axis as shown in this diagram. Once you get the answer you can put the value of the surface area below.`;
  } else if (color === 'green1') {
    msg.lang = 'de';
    welcome = `Hey there, I was trying to fill up this engine with fuel but the stupid guide numbers rubbed off! The schematics for the tank are below, we should be able to calculate the volume of it from those. It’s just [insert function here] rotated around the x-axis for the interval [interval]. Give me the value below when you get it.`;
  } else if (color === 'green2') {
    msg.lang = 'de';
    welcome = `Oh hey again HAHAHAH hello ....`;
  } else if (color === 'blue') {
    msg.lang = 'zh';
    welcome = `heya, its blue! darn im having a hard time fixing wires, you think you can help me with it? lmk your answer asap.`;
  }

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  hasReadInstructions = true;

  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src=${title} width="300" />
        </div>
        <div class="mx-auto">
          <img src=${color_bg[color]} width="300" />
        </div>
        <button
          onClick=${() => {
            window.speechSynthesis.cancel();
            instructions();
          }}
        >
          Go Back
        </button>
        <p id="wel1" class=${color_text[color]}>${welcome}</p>
        <input
          required
          type="submit"
          id="val"
          type="number"
          placeholder="Enter here"
        /><br /><br />
        <button
          id="check"
          onClick=${() => {
            if (lock) return;
            lock = true;
            window.speechSynthesis.cancel();
            const answer = Number(document.querySelector('#val').value);
            if (map[color][0] <= answer && map[color][1] >= answer) {
              const msg = new SpeechSynthesisUtterance();
              let message = '';
              if (color === 'red') {
                msg.lang = 'en';
                message = `[scan success; non-impostor lifeform confirmed.] Awesome! Thanks for helping me out; you’ll definitely have my vote for whoever during the meeting. I don’t know much about what was going on around the time of the sabotage, but I was around O2 and I saw that someone was watching the cameras. Bya!`;
              } else if (color === 'green1') {
                msg.lang = 'de';
                message = `Ummmmm haha thank you. I guess i'll SEE you around haha. Anyway BYE I gotta go!`;
              } else if (color === 'green2') {
                msg.lang = 'de';
                message = `HEHEHE hi`;
              } else if (color === 'blue') {
                msg.lang = 'zh';
                message = `wow tysm!! u got my vote :))`;
              }
              msg.text = message;
              window.speechSynthesis.speak(msg);
              document.querySelector('#wel1').textContent = message;
              vote.push(color);
              document.querySelector('#check').remove();
              msg.onend = () => {
                instructions();
              };
            } else {
              let message = '';
              if (color === 'red') {
                msg.lang = 'en';
                message = `[SCAN FAILURE]. Huh, looks like that didn’t work. Maybe try again. You’re trying to get the Surface area when [insert functions here] are rotated around the y-axis as shown in the diagram. I believe in you!`;
              } else if (color === 'green1') {
                msg.lang = 'de';
                message = `wrong`;
              } else if (color === 'green2') {
                msg.lang = 'de';
                message = `wrong`;
              } else if (color === 'blue') {
                msg.lang = 'zh';
                message = `wrong! i beet u up!`;
              }
              msg.text = message;
              window.speechSynthesis.speak(msg);
              lock = false;
            }
          }}
        >
          Check answer</button
        ><br /><br />
      </div>
    </div>`
  );
};

let imposter = 'green';

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

  let canSpeak = false;
  msg.onend = () => {
    canSpeak = true;
  }

  const squeal = new SpeechSynthesisUtterance();
  render(
    document.body,
    html`<div class="app">
      <div>
        <div class="mx-auto">
          <img src=${title} width="300" />
        </div>
        <p>${welcome}</p>
        <div>
          ${['red', 'blue', 'green1'].map((color) => {
            return html`<button
              class="shaker"
              onMouseOver=${() => {
                if (canSpeak) {
                window.speechSynthesis.cancel();
                let message = '';
                if (color === 'red') {
                  squeal.lang = 'en';
                  message = `It's not me, you saw me scan`;
                } else if (color === 'green1') {
                  squeal.lang = 'de';
                  message = `I swear on my homeland I am not the imposter baka`;
                } else if (color === 'blue') {
                  squeal.lang = 'zh';
                  message = `Not me, I no imposter`;
                }
                squeal.text = message;
                window.speechSynthesis.speak(squeal);
              }
              }}
              onClick=${() => {
                if (!confirm('Are you sure')) return;
                window.speechSynthesis.cancel();
                audio.pause();
                if (color.includes(imposter)) win();
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

window.onbeforeunload = () => {
  return 'Are you sure?';
};
