const arenas = document.querySelector(".arenas");

const randomButton = document.querySelector(".button");

arenas.appendChild(createReloadButton());

const reloadButton = document.querySelector(".reloadWrap .button");

reloadButton.addEventListener("click", function () {
  window.location.reload();
});

const player1 = {
  player: 1,
  name: "sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["Ssanaya tryapka"],
  attack: function () {
    return `${this.name} fight...`;
  },
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
  attack: function () {
    return `${this.name} Fight...`;
  },
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
  //life.innerText = playerObj.hp;
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
  button.style.display = "none";

  buttonWrap.appendChild(button);

  return buttonWrap;
}

function randomHP(num) {
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

randomButton.addEventListener("click", function () {
  player1.changeHP(randomHP(20));
  player1.renderHP(player1.elHP());

  player2.changeHP(randomHP(20));
  player2.renderHP(player2.elHP());

  if (player1.hp === 0 || player2.hp === 0) {
    randomButton.disabled = true;
    reloadButton.style.display = "block";
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player1.hp > player2.hp) {
    arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    arenas.appendChild(playerWins());
  }
});

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
