import { getRandom } from "./utils.js";

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.HIT = {
      head: 30,
      body: 25,
      foot: 20,
    };

    this.ATTACK = ["head", "body", "foot"];
  }
  attack = () => {
    return `${this.name} Fight...`;
  };

  changeHP = (num) => {
    this.hp -= num;

    if (this.hp <= 0) {
      this.hp = 0;
    }
  };

  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  };

  renderHP = (elHP) => {
    elHP.style.width = this.hp + "%";
  };
}
class Player1 extends Player {
  constructor(props) {
    super(props);
  }
  playerAttack = (formFight) => {
    const attack = {};

    for (let item of formFight) {
      if (item.checked && item.name === "hit") {
        attack.value = getRandom(this.HIT[item.value]);
        attack.hit = item.value;
      }

      if (item.checked && item.name === "defence") {
        attack.defence = item.value;
      }

      item.checked = false;
    }

    return attack;
  };
}
class Player2 extends Player {
  constructor(props) {
    super(props);
  }
  enemyAttack = () => {
    const hit = this.ATTACK[getRandom(3) - 1];
    const defence = this.ATTACK[getRandom(3) - 1];

    return {
      value: getRandom(this.HIT[hit]),
      hit,
      defence,
    };
  };
}

export const player1 = new Player1({
  player: 1,
  name: "sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
});
export const player2 = new Player2({
  player: 2,
  name: "subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
});
