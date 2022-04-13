import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";
import outsideEvent from "./outside-event.js";

const dom = Dom();

function App() {
  const loader = dom.el("[data-loader]");
  const inputInstituicao = dom.el("#instituicao");
  const cartao = dom.el(".area-cartao .cartao");
  const active = "active";
  const arrCartao = dom.getStorage("cartao");

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

  async function selectInstituicao() {
    loader.style.display = "flex";

    const dados = await dadosJSON();
    dados.forEach(({ instituicao }) => {
      const option = dom.create("option");
      option.value = instituicao;
      option.innerText = instituicao;
      inputInstituicao.appendChild(option);
    });

    loader.style.display = "none";
  }

  async function showCartaoCadastrado() {
    const abrirLista = dom.el(".abrir-lista-cartao");
    const boxCartao = dom.el(".cartao-cadastrado");
    const dados = await dadosJSON();

    if (abrirLista) {
      abrirLista.addEventListener("click", (e) => {
        e.preventDefault();
        boxCartao.classList.add(active);
        outsideEvent(
          boxCartao,
          () => {
            boxCartao.classList.remove(active);
          },
          ["click"]
        );
      });
    }

    if (boxCartao && arrCartao) {
      arrCartao.forEach(({ instituicao, nomeImpresso }, index) => {
        const div = dom.create("div");
        div.classList.add("cartao");

        dados.forEach((dado) => {
          if (dado.instituicao == instituicao) {
            div.style.backgroundColor = dado.cor;
            div.innerHTML = `
              <a href="#" class="link-cartao" title=${nomeImpresso} id="${index}"></a>
            `;
          }
        });

        boxCartao.append(div);
      });

      cartaoAtivo();
    }
  }

  function cartaoAtivo() {
    const linkCartao = dom.els(".cartao-cadastrado .link-cartao");
    const vazio = dom.el(".vazio");

    if (linkCartao.length) vazio.style.display = "none";
    else vazio.style.display = "flex";

    linkCartao.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        arrCartao.forEach((dado, index) => {
          if (item.id == index) {
            dado.status = true;
            dom.reloadLoader(
              `Buscando dados do cartão <b>${dado.instituicao}</b>`,
              '[data-loader="geral"]'
            );
          } else {
            dado.status = false;
          }
        });
        dom.setStorage("cartao", arrCartao);
      });
    });

    arrCartao.forEach(
      ({ instituicao, status, cor, bandeira, logo, nomeImpresso }, index) => {
        if (status) {
          const logoBandeira = cartao.querySelector(".logo-bandeira img");
          const nome = cartao.querySelector("p");
          const cartaoAtivo = linkCartao[index];

          dom.el(
            ".box-lista-cartao h3"
          ).innerHTML = `Meu cartão <span>(${instituicao})</span>`;

          cartao.style.backgroundColor = cor;
          logoBandeira.src = logo;
          logoBandeira.alt = bandeira;
          nome.innerText = nomeImpresso;

          cartaoAtivo.innerHTML += `
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>  
          `;
        }
      }
    );
  }

  function init() {
    if (inputInstituicao) {
      selectInstituicao();
    }
    showCartaoCadastrado();
    showBoxCard();
  }

  return { init };
}

export default App;
