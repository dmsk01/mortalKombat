const arenas = document.querySelector(".arenas");

const randomButton = document.querySelector(".button");

const formFight = document.querySelector(".control");

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

// randomButton.addEventListener("click", function () {
//   player1.changeHP(getRandom(20));
//   player1.renderHP(player1.elHP());

//   player2.changeHP(getRandom(20));
//   player2.renderHP(player2.elHP());

//   if (player1.hp === 0 || player2.hp === 0) {
//     randomButton.disabled = true;
//     createReloadButton();
//   }

//   if (player1.hp === 0 && player1.hp < player2.hp) {
//     arenas.appendChild(playerWins(player2.name));
//   } else if (player2.hp === 0 && player1.hp > player2.hp) {
//     arenas.appendChild(playerWins(player1.name));
//   } else if (player1.hp === 0 && player2.hp === 0) {
//     arenas.appendChild(playerWins());
//   }
// });

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

function hitDefenceEquality(player, enemy) {
  if (player.hit !== enemy.defence) {
    console.log("hitted");
    player2.changeHP(player.value);
    player2.renderHP(player2.elHP());
  }

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP(player1.elHP());
  }

  console.log(player);
  console.log(enemy);
}

formFight.addEventListener("submit", function (e) {
  e.preventDefault();

  const enemy = enemyAttack();

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

  hitDefenceEquality(attack, enemy);
  // if (attack.hit !== enemy.defence) {
  //   player2.changeHP(attack.value);
  //   player2.renderHP(player2.elHP());
  // }

  // if (enemy.hit !== attack.defence) {
  //   player1.changeHP(enemy.value);
  //   player1.renderHP(player1.elHP());
  // }

  if (player1.hp === 0 || player2.hp === 0) {
    randomButton.disabled = true;
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
});
