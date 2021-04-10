const arenas = document.querySelector(".arenas");

const randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["Ssanaya tryapka"],
  attack: function () {
    return `${this.name} fight...`;
  },
};

const player2 = {
  player: 2,
  name: "subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ssanyi venik"],
  attack: function () {
    return `${this.name} Fight...`;
  },
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
  //life.innerText = playerObj.hp;
  life.style.width = `${playerObj.hp}%`;

  const name = createElement("div", "name");
  name.innerText = playerObj.name;

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  return playerContainer;
}

function randomHP() {
  return Math.ceil(Math.random() * 20);
}

function changeHP(player) {
  const playerLife = document.querySelector(`.player${player.player} .life`);
  player.hp -= randomHP();
  playerLife.style.width = player.hp + "%";

  if (player.hp <= 0) {
    player.hp = 0;
    playerLife.style.width = 0;
    randomButton.disabled = true;
  }
  console.log(player.name, player.hp);
}

function checkingPlayersHp() {
  let winner;
  if (player1.hp > player2.hp) {
    winner = player1;
  } else if (player1.hp < player2.hp) {
    winner = player2;
  } else {
    winner = null;
  }

  if (player1.hp === 0 || player2.hp === 0) {
    arenas.appendChild(playerLose(winner));
  }
}

function playerLose(player) {
  const loseTitle = createElement("div", "loseTitle");
  if (player) {
    loseTitle.innerText = `${player.name} win!`;
  } else {
    loseTitle.innerText = `Draw!`;
  }

  return loseTitle;
}

randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
  checkingPlayersHp();
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
