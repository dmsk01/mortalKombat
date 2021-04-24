import { player1, player2 } from "./player.js";
import Game from "./game.js";

const formFight = document.querySelector(".control");

const game = new Game({ formFight, player1, player2 });

formFight.addEventListener("submit", function (e) {
  e.preventDefault();

  const { value: enemyValue, hit: enemyHit, defence: enemyDefence } = player2.enemyAttack();
  const { value: playerValue, hit: playerHit, defence: playerDefence } = player1.playerAttack(formFight);

  if (playerDefence !== enemyHit) {
    player1.changeHP(enemyValue);
    player1.renderHP(player1.elHP());
    game.generateLogs("hit", player2, player1, enemyValue);
  } else {
    game.generateLogs("defence", player1, player2);
  }

  if (enemyDefence !== playerHit) {
    player2.changeHP(playerValue);
    player2.renderHP(player2.elHP());
    game.generateLogs("hit", player1, player2, playerValue);
  } else {
    game.generateLogs("defence", player2, player1);
  }

  game.showResult(player1, player2);
});

game.start();
