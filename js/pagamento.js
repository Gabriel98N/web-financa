import Dom from "./dom.js";
import Transacao from "./transacao.js";

const dom = Dom();

function Pagamento() {
  const btnConfirmar = dom.el(".btn-confirmar");
  const inputPagamento = dom.el("#pagamento");

  const cartaoPrincipal = dom.el(".cartao-principal");
  const arrPagamento = dom.storage("pagamento");
  const arrTransacao = dom.getStorage("transacao");

  function realizarPagamento() {
    if (cartaoPrincipal && arrPagamento) {
      btnConfirmar.addEventListener("click", (e) => {
        e.preventDefault();
        const despesas = dom.converterValor(
          dom.el('[data-transacao="despesas"]')
        );
        const despesaAtual = despesas - Number(inputPagamento.value);
      });
    }
  }

  function init() {
    realizarPagamento();
  }

  return { init };
}

export default Pagamento;
