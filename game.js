import { getRandom, getTime, LOGS } from "./utils.js";
import { player1, player2 } from "./player.js";

export default class Game {
  constructor() {
    this.player1 = player1;
    this.player2 = player2;
    this.arenas = document.querySelector(".arenas");
    this.randomButton = document.querySelector(".button");
    this.chat = document.querySelector(".chat");
    this.formFight = document.querySelector(".control");
    this.logs = LOGS;
  }
  
  createElement = (tagName, className) => {
    const tag = document.createElement(tagName);
    if (className) {
      tag.classList.add(className);
    }
    return tag;
  };

  createPlayer = ({ player, img, hp, name }) => {
    const playerContainer = this.createElement("div", `player${player}`);

    const progressbar = this.createElement("div", "progressbar");

    const character = this.createElement("div", "character");

    const characterImage = this.createElement("img");
    characterImage.src = img;

    character.appendChild(characterImage);

    playerContainer.appendChild(progressbar);
    playerContainer.appendChild(character);

    const life = this.createElement("div", "life");

    life.style.width = `${hp}%`;

    const playerName = this.createElement("div", "name");
    playerName.innerText = name;

    progressbar.appendChild(life);
    progressbar.appendChild(playerName);

    return playerContainer;
  };
  createReloadButton = () => {
    const buttonWrap = this.createElement("div", "reloadWrap");

    const button = this.createElement("button", "button");

    button.innerText = "Restart";

    button.addEventListener("click", function () {
      window.location.reload();
    });

    buttonWrap.appendChild(button);

    this.arenas.appendChild(buttonWrap);
  };
  generateLogs = (type, { name } = {}, { name: player2Name, hp } = {}, playerHp) => {
    let text;
    switch (type) {
      case "start":
        text = this.logs[type].replace("[time]", getTime()).replace("[player1]", name).replace("[player2]", player2Name);
        break;
      case "hit":
        text = this.logs[type][getRandom(this.logs.hit.length - 1) - 1].replace("[playerKick]", name).replace("[playerDefence]", player2Name) + `, -${playerHp}HP, [${hp}/100]`;
        break;
      case "defence":
        text = this.logs[type][getRandom(this.logs.defence.length - 1) - 1].replace("[playerKick]", player2Name).replace("[playerDefence]", name);
        break;
      case "draw":
        text = this.logs[type];
        break;
      case "end":
        text = this.logs[type][getRandom(this.logs.end.length - 1) - 1].replace("[playerWins]", name).replace("[playerLose]", player2Name);
        break;
      default:
        text = "Something went wrong!";
    }
    const el = `<p>${getTime()} ${text}</p>`;
    this.chat.insertAdjacentHTML("afterbegin", el);
  };
  playerWins = (name) => {
    const winTitle = this.createElement("div", "loseTitle");
    if (name) {
      winTitle.innerText = `${name} wins!`;
    } else {
      winTitle.innerText = `Draw!`;
    }
    return winTitle;
  };
  showResult = (player1, player2) => {
    if (player1.hp === 0 || player2.hp === 0) {
      this.randomButton.disabled = true;
      this.createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
      this.arenas.appendChild(this.playerWins(player2.name));
      this.generateLogs("end", player2, player1);
    } else if (player2.hp === 0 && player1.hp > player2.hp) {
      this.arenas.appendChild(this.playerWins(player1.name));
      this.generateLogs("end", player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
      this.arenas.appendChild(this.playerWins());
      this.generateLogs("draw");
    }
  };
  start = () => {
    this.arenas.appendChild(this.createPlayer(this.player1));
    this.arenas.appendChild(this.createPlayer(this.player2));
    this.generateLogs("start", this.player1, this.player2);
    this.formFight.addEventListener("submit", (e) => {
      e.preventDefault();

      const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = this.player2.enemyAttack();
      const { value: playerValue, hit: playerHit, defence: playerDefence } = this.player1.playerAttack(this.formFight);

      if (playerDefence !== enemyHit) {
        this.player1.changeHP(enemyValue);
        this.player1.renderHP(this.player1.elHP());
        this.generateLogs("hit", this.player2, this.player1, enemyValue);
      } else {
        this.generateLogs("defence", this.player1, this.player2);
      }

      if (enemyDefence !== playerHit) {
        this.player2.changeHP(playerValue);
        this.player2.renderHP(this.player2.elHP());
        this.generateLogs("hit", this.player1, this.player2, playerValue);
      } else {
        this.generateLogs("defence", this.player2, this.player1);
      }

      this.showResult(this.player1, this.player2);
    });
  };
}
