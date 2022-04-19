import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";
import outsideEvent from "./outside-event.js";

const dom = Dom();

function App() {
  const inputInstituicao = dom.el("#instituicao");
  const cartao = dom.el(".cartao-principal");
  const active = "active";

  const boxListaCartao = dom.el(".cartao-cadastrado");
  const abrirLista = dom.el(".abrir-lista-cartao");
  const arrCartao = dom.getStorage("cartao");
  const arrTransacao = dom.storage("transacao");

  const btnAdicionar = dom.el(".add-transacao");
  const tipo_transacao = dom.el("#tipo-transacao");
  const estabelecimento = dom.el("#estabelecimento");
  const valor_transacao = dom.el("#valor-transacao");
  const dia_transacao = dom.el("#dia-transacao");
  const mes_transacao = dom.el("#mes-transacao");
  const tabelaTransacao = dom.el(".tabela-transacao");

  function showBoxCard() {
    const boxCard = dom.els(".box-card");
    const abrirBox = dom.els(".abrir-box");

    abrirBox.forEach((abrir, index) => {
      abrir.addEventListener("click", (e) => {
        e.preventDefault();
        const box = boxCard[index];

        box.classList.add(active);
        outsideEvent(
          box,
          () => {
            box.classList.remove(active);
          },
          ["click"]
        );
      });
    });
  }

  function abrirListaCartao() {
    if (abrirLista) {
      abrirLista.addEventListener("click", (e) => {
        e.preventDefault();
        boxListaCartao.classList.add(active);
        outsideEvent(
          boxListaCartao,
          () => {
            boxListaCartao.classList.remove(active);
          },
          ["click"]
        );
      });
    }
  }

  async function selectCartao() {
    if (inputInstituicao) {
      const dados = await dadosJSON();
      dados.forEach(({ instituicao }) => {
        const option = dom.create("option");
        option.value = instituicao;
        option.innerText = instituicao;
        inputInstituicao.appendChild(option);
      });
    }
  }

  function listaCartao() {
    const vazioCartao = dom.el(".vazio");

    if (arrCartao && vazioCartao) {
      vazioCartao.style.display = "none";
      arrCartao.forEach((item, index) => {
        item.id = index;

        const div = dom.create("div");
        div.classList.add("cartao");

        div.style.backgroundColor = item.cor;
        div.innerHTML = `
          <a href="#" class="link-cartao"></a>
        `;
        boxListaCartao.appendChild(div);
      });

      dom.setStorage("cartao", arrCartao);
    }
  }

  function cartaoAtivo() {
    const linksCartao = dom.els(".link-cartao");

    if (linksCartao.length) {
      linksCartao.forEach((link, index) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          arrCartao.forEach((itemCartao) => {
            if (index == itemCartao.id) {
              itemCartao.status = true;
              dom.reloadLoader(
                `Buscando dados do cartão <b>${itemCartao.instituicao}</b>`,
                '[data-loader="geral"]'
              );
            } else {
              itemCartao.status = false;
            }
            dom.setStorage("cartao", arrCartao);
          });
        });
      });

      arrCartao.forEach((itemCartao, index) => {
        const qtCartao = dom.el(".qt-cartao");
        qtCartao.innerText = arrCartao.length;

        if (itemCartao.status) {
          const imgBandeira = cartao.querySelector(".logo-bandeira img");
          const imgCartao = cartao.querySelector(".box-logo-cartao img");
          const nomeImpresso = cartao.querySelector("p");

          btnAdicionar.disabled = false;
          const cartaoAtivo = linksCartao[index];

          cartao.id = index;
          cartao.style.backgroundColor = itemCartao.cor;

          imgBandeira.src = itemCartao.logo_bandeira;
          imgBandeira.alt = itemCartao.bandeira;

          imgCartao.src = itemCartao.logo_inst;
          imgCartao.alt = itemCartao.instituicao;

          nomeImpresso.innerText = itemCartao.nomeImpresso;

          cartaoAtivo.innerHTML += `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
          `;
        }
      });
    }
  }

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
    selectCartao();
    showBoxCard();
    abrirListaCartao();
    listaCartao();
    cartaoAtivo();
    adicionarTransacao();
    criarTransacao();
    somarTransacao();
  }

  return { init };
}

export default App;
