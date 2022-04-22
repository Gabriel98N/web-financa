import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";
import outsideEvent from "./outside-event.js";

const dom = Dom();

function App() {
  const inputInstituicao = dom.els("#instituicao");
  const cartao = dom.el(".cartao-principal");
  const active = "active";

  const boxListaCartao = dom.el(".cartao-cadastrado");
  const abrirLista = dom.el(".abrir-lista-cartao");
  const arrCartao = dom.getStorage("cartao");

  const btnAdicionar = dom.el(".add-transacao");

  function showBoxCard() {
    const boxCard = dom.els("[data-box]");
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
    if (inputInstituicao.length) {
      const dados = await dadosJSON();

      inputInstituicao.forEach((select) => {
        dados.forEach(({ instituicao }) => {
          const option = dom.create("option");
          option.value = instituicao;
          option.innerText = instituicao;
          select.appendChild(option);
        });
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

  function init() {
    selectCartao();
    showBoxCard();
    abrirListaCartao();
    listaCartao();
    cartaoAtivo();
  }

  return { init };
}

export default App;
