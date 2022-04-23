import Dom from "./dom.js";

const dom = Dom();

function Notificacao() {
  const boxNotificacao = dom.el(".box-notificacao");
  const arrNotificacao = dom.storage("notificacao");
  const vazioNot = dom.el(".vazio-notificacao");

  function criarNotificacao(texto) {
    arrNotificacao.push(texto);
    dom.setStorage("notificacao", arrNotificacao);
  }

  function getNotificacao() {
    if (boxNotificacao) {
      if (arrNotificacao.length) {
        vazioNot.style.display = "none";
        arrNotificacao.forEach((texto) => {
          const div = dom.create("div");
          div.classList.add("notificacao");

          div.innerHTML = `<p>${texto}</p>`;
          boxNotificacao.prepend(div);
        });
      } else {
        vazioNot.style.display = "flex";
      }
    }
  }

  function init() {
    getNotificacao();
  }

  return {
    criarNotificacao,
    init,
  };
}
export default Notificacao;
