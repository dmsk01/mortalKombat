export async function getPlayers() {
  const body = await fetch("https://reactmarathon-api.herokuapp.com/api/mk/players", {
    method: "GET",
  }).then((res) => res.json());

  return body;
}
export async function getRandomPlayer() {
  const body = await fetch("https://reactmarathon-api.herokuapp.com/api/mk/player/choose", {
    method: "GET",
  }).then((res) => res.json());

  return body;
}
export async function fightPlayers(player) {
  const { hit, defence } = player;
  await fetch("http://reactmarathon-api.herokuapp.com/api/mk/player/fight", {
    method: "POST",
    body: JSON.stringify({ hit, defence }),
  });
}
