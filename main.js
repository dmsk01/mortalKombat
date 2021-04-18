const arenas = document.querySelector(".arenas");

const randomButton = document.querySelector(".button");

const formFight = document.querySelector(".control");

const chat = document.querySelector(".chat");

const logs = {
  start: "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: ["Результат удара [playerWins]: [playerLose] - труп", "[playerLose] погиб от удара бойца [playerWins]", "Результат боя: [playerLose] - жертва, [playerWins] - убийца"],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const player1 = {
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

const player2 = {
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

function createElement(tagName, className) {
  const tag = document.createElement(tagName);
  if (className) {
    tag.classList.add(className);
  }

  return tag;
}

function createPlayer(playerObj) {
  const playerContainer = createElement("div", `player${playerObj.player}`);

  const progressbar = createElement("div", "progressbar");

  const character = createElement("div", "character");

  const characterImage = createElement("img");
  characterImage.src = playerObj.img;

  character.appendChild(characterImage);

  playerContainer.appendChild(progressbar);
  playerContainer.appendChild(character);

  const life = createElement("div", "life");

  life.style.width = `${playerObj.hp}%`;

  const name = createElement("div", "name");
  name.innerText = playerObj.name;

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  return playerContainer;
}

function createReloadButton() {
  const buttonWrap = createElement("div", "reloadWrap");

  const button = createElement("button", "button");

  button.innerText = "Restart";

  button.addEventListener("click", function () {
    window.location.reload();
  });

  buttonWrap.appendChild(button);

  arenas.appendChild(buttonWrap);
}

function attack() {
  return `${this.name} Fight...`;
}

function getRandom(num) {
  return Math.ceil(Math.random() * num);
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

function playerWins(name) {
  const winTitle = createElement("div", "loseTitle");
  if (name) {
    winTitle.innerText = `${name} wins!`;
  } else {
    winTitle.innerText = `Draw!`;
  }
  return winTitle;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
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

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    arenas.appendChild(playerWins(player1.name));
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
    generateLogs("draw");
  }
}

function twoNumbersTimeFormat(num) {
  return num <= 9 ? "0" + num : num;
}

function getTime() {
  const date = new Date();
  let hours = twoNumbersTimeFormat(date.getHours());
  let minutes = twoNumbersTimeFormat(date.getMinutes());
  let seconds = twoNumbersTimeFormat(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}

function generateLogs(type, player1, player2, playerHp) {
  let text;
  switch (type) {
    case "start":
      text = logs[type].replace("[time]", getTime()).replace("[player1]", player1.name).replace("[player2]", player2.name);
      break;
    case "hit":
      text = logs[type][getRandom(logs.hit.length - 1)].replace("[playerKick]", player1.name).replace("[playerDefence]", player2.name) + `, -${playerHp}HP, [${player2.hp}/100]`;
      break;
    case "defence":
      text = logs[type][getRandom(logs.defence.length - 1)].replace("[playerKick]", player2.name).replace("[playerDefence]", player1.name);
      break;
    case "draw":
      text = logs[type];
      break;
    case "end":
      text = logs[type][getRandom(logs.end.length)].replace("[playerWins]", player1.name).replace("[playerLose]", player2.name);
      break;
  }
  const el = `<p>${getTime()} ${text}</p>`;
  chat.insertAdjacentHTML("afterbegin", el);
}

formFight.addEventListener("submit", function (e) {
  e.preventDefault();

  const enemy = enemyAttack();

  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP(player1.elHP());
    generateLogs("hit", player2, player1, enemy.value);
  } else {
    generateLogs("defence", player1, player2);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP(player2.elHP());
    generateLogs("hit", player1, player2, player.value);
  } else {
    generateLogs("defence", player2, player1);
  }

  showResult();
});

generateLogs("start", player1, player2);
