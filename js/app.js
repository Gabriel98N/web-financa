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
      arrCartao.forEach(({ instituicao, nomeImpresso }) => {
        const div = dom.create("div");
        div.classList.add("cartao");

        dados.forEach((dado) => {
          if (dado.instituicao == instituicao) {
            div.style.backgroundColor = dado.cor;
            div.innerHTML = `
              <a href="#" class="link-cartao" title=${nomeImpresso}>
                <p>${instituicao}</p>
              </a>
            `;
          }
        });

        boxCartao.prepend(div);
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
        const banco = e.currentTarget.querySelector("p").innerText;
        arrCartao.forEach((dado) => {
          if (dado.instituicao.toLowerCase() == banco.toLowerCase())
            dado.status = true;
          else dado.status = false;
        });
        dom.setStorage("cartao", arrCartao);
        dom.reloadLoader("Criando cartão", '[data-loader="geral"]');
        location.reload();
      });
    });

    arrCartao.forEach(
      ({
        instituicao,
        status,
        cor,
        logo_inst,
        bandeira,
        logo,
        nomeImpresso,
      }) => {
        if (status) {
          const logoBandeira = cartao.querySelector(".logo-bandeira img");
          const logoInst = cartao.querySelector(".logo-instituicao img");
          const nome = cartao.querySelector("p");

          cartao.style.backgroundColor = cor;

          logoBandeira.src = logo;
          logoBandeira.alt = bandeira;

          logoInst.src = logo_inst;
          logoInst.alt = instituicao;

          nome.innerText = nomeImpresso;
        }
      }
    );
  }

  function init() {
    if (inputInstituicao) {
      selectInstituicao();
    }
    showCartaoCadastrado();
  }

  return { init };
}

export default App;
