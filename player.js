import { getRandom } from "./utils.js";

export const player1 = {
  player: 1,
  name: "sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["Ssanaya tryapka"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

export const player2 = {
  player: 2,
  name: "subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ssanyi venik"],
  attack,
  changeHP,
  elHP,
  renderHP,
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

function attack() {
  return `${this.name} Fight...`;
}

function changeHP(num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP(elHP) {
  elHP.style.width = this.hp + "%";
}

export function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

export function playerAttack(formFight) {
  const attack = {};

  for (let item of formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  return attack;
}

