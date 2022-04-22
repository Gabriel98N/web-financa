import Dom from "./dom.js";

const dom = Dom();

function limiteCartao() {
  const arrCartao = dom.getStorage("cartao");
  const cartao = dom.el(".cartao-principal");

  function limite() {
    if (cartao && arrCartao) {
      const idCartao = cartao.id;
      const { limite, cor } = arrCartao[idCartao];
      const despesas = dom.converterValor(
        dom.el('[data-transacao="despesas"]').innerText
      );
      const limiteDisponivel = limite - despesas;
      const porcentagem = (despesas * 100) / limite;

      dom.el(".limite-disponivel").innerText = dom.conversorMoeda(
        limiteDisponivel,
        "PT-BR",
        "BRL"
      );

      dom.el(".limite-utilizado").innerText = dom.conversorMoeda(
        despesas,
        "PT-BR",
        "BRL"
      );

      dom.el(".limite-total").innerText = dom.conversorMoeda(
        limite,
        "PT-BR",
        "BRL"
      );

      dom
        .el(".liquido-limite")
        .animate([{ width: "0" }, { width: `${porcentagem}%` }], {
          duration: 1000,
          fill: "forwards",
        });

      dom.el(".liquido-limite").style.backgroundColor = cor;
    }
  }

  function init() {
    limite();
  }

  return { init };
}
export default limiteCartao;
