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

import red_task_img from './img/problem1pic.png';
import blue_task_img from './img/problem2pic.png';
import green1_task_img from './img/problem3pic.png';
import green2_task_img from './img/problem3pic1.png';

import green1intro_line from './img/green1intro.wav';
import green1win_line from './img/green1win.wav';
import green1lose_line from './img/green1lose.wav';
import green2intro_line from './img/green2intro.wav';
import green2win_line from './img/green2win.wav';
import green2lose_line from './img/green2lose.wav';
import redintro_line from './img/redintro.wav';
import redwin_line from './img/redwin.wav';
import redlose_line from './img/redlose.wav';
import redclue_line from './img/redclue.wav';
import greenclue_line from './img/greenclue.wav';
import blueintro_line from './img/blue1intro.mp3';
import bluelose_line from './img/blue1lose.mp3';
import bluewin_line from './img/bluewin.mp3';
import blueclue_line from './img/blueclue.mp3';
import WIN from './img/W.mp3';
import LOSE from './img/L.mp3';

let task_audio;

const color_lines = {
  red: {
    intro: redintro_line,
    lose: redwin_line,
    win: redlose_line,
    clue: redclue_line,
  },
  blue: {
    intro: blueintro_line,
    lose: bluelose_line,
    win: bluewin_line,
    clue: blueclue_line,
  },
  green1: {
    intro: green1intro_line,
    lose: green1win_line,
    win: green1lose_line,
    clue: greenclue_line,
  },
  green2: {
    intro: green2intro_line,
    lose: green2win_line,
    win: green2lose_line,
  },
};

const color_problems = {
  red: red_task_img,
  blue: blue_task_img,
  green1: green1_task_img,
  green2: green2_task_img,
};

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
          <img
            src=${title}
            width="300"
            ondblclick=${() => {
              if (prompt('password?') === 'amogus') {
                window.speechSynthesis.cancel();
                audio.pause();
                voteScreen();
              }
            }}
          />
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
  red: [52, 53], // 52.704
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

    audio.volume = 0.025;
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
                      RED1: 'red',
                      BLUE1: 'blue',
                      GREEN1: 'green1',
                      GREEN2: 'green2',
                    };
                    const input = document.querySelector('#code').value.trim();

                    if (Object.keys(crewmate_code).includes(input)) {
                      const color = crewmate_code[input];
                      if (vote.includes(color)) {
                        window.speechSynthesis.cancel();
                        const msg = new SpeechSynthesisUtterance();
                        let message = `You've already done this task. Proceed to the next crewmate code`;
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

  task_audio = new Audio(color_lines[color].intro);
  if (color === 'red') {
    welcome = `Hia! I was goin’ about my tasks when I ran into trouble calibrating the scanner. I was hoping you could help me find this average crewmate surface area so that the scanner can scan me properly. You should be able to approximate this using the functions [f(x) is equal to negative one fourth x to the fourth plus four] and [g(x) is equal to negative square root of 1 minus the quantity of x minus one squared] and rotating them around the y-axis as shown in this diagram. Once you get the answer you can put the value of the surface area below.`;
  } else if (color === 'green1') {
    welcome = `Hey there, I was trying to fill up this engine with fuel but the stupid guide numbers rubbed off! The schematics for the tank are below, we should be able to calculate the volume of it from those. It’s just [sin of x plus two] rotated around the x-axis for the interval [zero to two pi]. Give me the value below when you get it.`;
  } else if (color === 'green2') {
    welcome = `This tank is also unlabeled. This one is the shape of [cosine of x plus two] rotated around the x-axis also for [zero to two pi]. It looks pretty similar to the other tank… put the volume below.`;
  } else if (color === 'blue') {
    welcome = `Yo Yo Yo! I’m shootin’ sum asteroids here. Mind helpin’ me with shootin’ em’ down? Our VELOCITY vector is [x equals cosine t plus two t] and [y equals negative sine of t plus pi over two]. Now, find a way to get this to estimate where the asteroid is gunna be at t=5 seconds. Dad’gum ‘roids.`;
  }

  task_audio.play();
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
          <details>
            <summary><b>View Problem Materials (click me)</b></summary>
            <div>
              <img src=${color_problems[color]} width="300" />
            </div>
          </details>
        </div>
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
            if (task_audio) task_audio.pause();
            const answer = Number(document.querySelector('#val').value);
            if (map[color][0] <= answer && map[color][1] >= answer) {
              let message = '';
              if (color === 'red') {
                message = `[scan success; non-impostor lifeform confirmed.] Awesome! Thanks for helping me out; you’ll definitely have my vote for whoever during the meeting. I don’t know much about what was going on around the time of the sabotage, but I was around O2 and I saw that someone was watching the cameras. Bya!`;
              } else if (color === 'green1') {
                message = `Looks like that worked! We still need to fill the other fuel tank though, so meet me in the same place on the opposite side of the engine wing.`;
              } else if (color === 'green2') {
                message = `Of course the two tanks would have the same volume! That filled it right up! I’ll make sure to vote for whoever you say next meeting. If you want any help figuring out the impostor, I saw red doing “tasks” in O2 around the time the sabotage happened, but I don’t think she saw me. I didn’t see blue all round either though, which is kinda suspicious as well. Good luck!`;
              } else if (color === 'blue') {
                message = `Good work my gunslinging’ friend!  I was monitorin’ cams earlier and I saw private Blue and Red at O2, roger that? You got my trust, now proceed to the next task.`;
              }
              task_audio = new Audio(color_lines[color].win);
              task_audio.play();
              document.querySelector('#note').textContent = `✅ ${message}`;
              vote.push(color);
              document.querySelector('#check').remove();
            } else {
              let message = '';
              if (color === 'red') {
                message = `[SCAN FAILURE]. Huh, looks like that didn’t work. Maybe try again. You’re trying to get the Surface area when [Negative one fourth x to the fourth plus four and negative square root of 1 minus the quantity of x minus one squared] are rotated around the y-axis as shown in the diagram. I believe in you!`;
              } else if (color === 'green1') {
                message = `*sigh*; Wrong amount of gas. Make sure to find the volume when [sin of x plus two] is rotated around the x-axis for the interval [zero to two pi]. It’s not that hard.`;
              } else if (color === 'green2') {
                message = `Didn’t fill the thing up correctly, maybe try something else. You’re rotating [cosine of x plus 2] around the x-axis for [zero to two pi] and looking for the volume, just like the other tank. It looks very similar to the other tank, if that helps…`;
              } else if (color === 'blue') {
                message = `Dad’gum it private! We missed that ‘roid. Better try again with correct coordinates or I’ll shove you in the cannon! We have our VELOCITY equations, but it might be more useful to turn them into POSITION equations first. Use [x equals cosine t plus two t] and [y equals negative sine of t plus pi over two] to find where the asteroid is gunna be at t=5 seconds.`;
              }
              document.querySelector('#note').textContent = `❌ ${message}`;
              task_audio = new Audio(color_lines[color].lose);
              task_audio.play();
              lock = false;
            }
          }}
        >
          Check answer</button
        ><button
          class="fade"
          onClick=${() => {
            if (task_audio) task_audio.pause();
            window.speechSynthesis.cancel();
            instructions();
          }}
        >
          Go Back</button
        ><br /><br /><small class=${color_text[color]} id="note"></small
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

  audio.volume = 0.25;
  audio.loop = true;

  msg.text = welcome;
  window.speechSynthesis.speak(msg);
  audio.play();

  let canSpeak = false;
  msg.onend = () => {
    canSpeak = true;
  };

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
                if (task_audio) task_audio.pause();
                task_audio = new Audio(color_lines[color].clue);
                task_audio.play();
                let message = '';
                if (color === 'red') {
                  message = `I don’t know much about what was going on around the time of the sabotage, but I was around O2 and I saw that someone was watching the cameras.`;
                } else if (color === 'blue') {
                  message = `I was monitorin’ cams earlier and I saw private Green and Red at O2, roger that?`;
                } else if (color === 'green1') {
                  message = `If you want any help figuring out the impostor, I saw red doing “tasks” in O2 around the time the sabotage happened, but I don’t think she saw me. I didn’t see blue all round either though, which is kinda suspicious as well`;
                }
                document.querySelector('#clue').textContent = message;
                document.querySelector('#clue').className = color_text[color];
              }}
              onClick=${() => {
                if (!confirm('Are you sure')) return;
                if (task_audio) task_audio.pause();

                window.speechSynthesis.cancel();
                audio.pause();
                if (color.includes(imposter)) win();
                else lose();
              }}
            >
              <img src=${color_img[color]} width="100" />
            </button>`;
          })}
        </div><br />
        <small id="clue"></small>
      </div>
    </div>`
  );
};

const win = () => {
  const welcome =
    'Congrats crewmate. You have saved the entire spaceship and the sussy baka crew! Thank you for your bravery.';
  const audio = new Audio(win_song);
  const W = new Audio(WIN);

  audio.volume = 0.55;
  audio.loop = true;

  audio.play();
  W.play();
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
  const welcome = `You lost!! The imposter was ${imposter}! Unfortunately, the imposters won, leading the spaceship to blow up and you getting sussy baka murdered`;
  const audio = new Audio(death_song);
  const L = new Audio(LOSE);

  audio.volume = 0.55;
  audio.loop = true;

  audio.play();
  L.play();
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
