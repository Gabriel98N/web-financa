async function dadosJSON() {
  const dados = await (await fetch("js/dados.json")).json();
  return dados;
}

export { dadosJSON };
