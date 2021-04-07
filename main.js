const player1 = {
  name: "sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["Ssanaya tryapka"],
  attack: function () {
    return `${this.name} fight...`;
  },
};

const player2 = {
  name: "subzero",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
  weapon: ["Ssanyi venik"],
  attack: function () {
    return `${this.name} Fight...`;
  },
};

const createPlayer = function (player, playerObj) {
  const playerContainer = document.createElement("div");
  playerContainer.classList.add(player);

  const progressbar = document.createElement("div");
  progressbar.classList.add("progressbar");

  const character = document.createElement("div");
  character.classList.add("character");

  const characterImage = document.createElement("img");
  characterImage.src = playerObj.img;

  character.appendChild(characterImage);

  playerContainer.appendChild(progressbar);
  playerContainer.appendChild(character);

  const life = document.createElement("div");
  life.classList.add("life");
  life.innerText = playerObj.hp;
  life.style.width = "100%";

  const name = document.createElement("div");
  name.classList.add("name");
  name.innerText = playerObj.name;

  progressbar.appendChild(life);
  progressbar.appendChild(name);

  const arenas = document.querySelector(".arenas");
  arenas.appendChild(playerContainer);
};

createPlayer("player1", player1);
createPlayer("player2", player2);
