import Dom from "./dom.js";

const dom = Dom();

function Transacao() {
  const arrTransacao = dom.storage("transacao");
  const arrCartao = dom.getStorage("cartao");

  const cartao = dom.el(".cartao-principal");
  const tipo_transacao = dom.el("#tipo-transacao");
  const estabelecimento = dom.el("#estabelecimento");
  const valor_transacao = dom.el("#valor-transacao");
  const dia_transacao = dom.el("#dia-transacao");
  const mes_transacao = dom.el("#mes-transacao");
  const tabelaTransacao = dom.el(".tabela-transacao");

  function adicionarTransacao() {
    const addTransacao = dom.el(".btn-adicionar");

    const fnTransacao = () => {
      const idCartao = cartao.id;
      const { instituicao } = arrCartao[idCartao];
      const ano = new Date().getFullYear();
      const data = `${dom.zeroAEsquerda(dia_transacao.value)} ${
        mes_transacao.value
      } ${ano}`;
      arrTransacao.push({
        tipo: tipo_transacao.value,
        estabelecimento: estabelecimento.value,
        valor: valor_transacao.value,
        data: data,
        id: idCartao,
      });
      dom.setStorage("transacao", arrTransacao);
      dom.reloadLoader(
        `Adicionando transação no cartão <b>${instituicao}</b>`,
        '[data-loader="geral"]'
      );
      dom.cardAviso("Transação adicionado com sucesso");
    };

    if (arrCartao && cartao) {
      const idCartao = cartao.id;
      if (idCartao) {
        addTransacao.addEventListener("click", (e) => {
          e.preventDefault();
          if (tipo_transacao.value == "despesas") {
            const limiteDisponivel = dom.converterValor(
              dom.el(".limite-disponivel")
            );
            const mensagem = valor_transacao.nextElementSibling;
            if (Number(valor_transacao.value) > Number(limiteDisponivel)) {
              mensagem.style.display = "block";
              mensagem.innerText = `Digite um valor menor que o limite disponivel no cartão. (limite: ${dom.conversorMoeda(
                limiteDisponivel,
                "PT-BR",
                "BRL"
              )})`;
              valor_transacao.style.borderColor = "#fe6263";
              valor_transacao.focus();
              valor_transacao.value = "";
              addTransacao.disabled = true;
            } else {
              fnTransacao();
            }
          } else {
            fnTransacao();
          }
        });
      }
    }
  }

  function criarTransacao() {
    if (arrTransacao && cartao) {
      const idCartao = cartao.id;
      arrTransacao.forEach((transacao) => {
        if (transacao.id == idCartao) {
          const div = dom.create("div");
          div.classList.add("transacao");

          const estabelecimento = dom.firstLetter(transacao.estabelecimento);
          const valor = dom.conversorMoeda(transacao.valor, "PT-BR", "BRL");
          const sinal =
            transacao.tipo == "despesas" ? "arrow_drop_down" : "arrow_drop_up";

          div.innerHTML = `
            <div class="box-estabelecimento">
              <div>
                <div class="estabelecimento">
                  <p>${estabelecimento}</p>
                </div>
                <div>
                  <p class="data">${transacao.data}</p>
                </div>
              </div>
            </div>
            <div class="valor">
              <span class="material-icons ${sinal}">${sinal}</span>
              <p>${valor}</p>
            </div>
          `;
          tabelaTransacao.prepend(div);
        }
      });
    }
  }

  function somarTransacao() {
    const arrTipoTransacao = { despesas: [], receitas: [] };

    const fnSomar = (tipo, valor) => {
      const valores = arrTipoTransacao[tipo];
      valores.push(valor);
      const total = valores.reduce((ac, valor) => {
        return ac + Number(valor);
      }, 0);

      return total;
    };

    if (arrTransacao && cartao) {
      const idCartao = cartao.id;

      const filterTransacao = arrTransacao.filter(({ id }) => {
        return idCartao == id;
      });

      dom.el(".qt-transacao").innerText = filterTransacao.length;

      filterTransacao.forEach(({ tipo, valor }) => {
        const totalTransacao = fnSomar(tipo, valor);
        dom.el(`[data-transacao=${tipo}]`).innerText = dom.conversorMoeda(
          totalTransacao,
          "PT-BR",
          "BRL"
        );
      });
    }
  }

  function init() {
    adicionarTransacao();
    criarTransacao();
    somarTransacao();
  }

  return {
    init,
  };
}

export default Transacao;
