import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";
import outsideEvent from "./outside-event.js";

const dom = Dom();

function App() {
  const loader = dom.el("[data-loader]");
  const formCadastro = dom.el('[data-formulario="cadastro-cartao"]');
  const inputInstituicao = dom.el("#instituicao");
  const nomeImpresso = dom.el("#nome-impresso");

  const cartao = dom.el(".show-cartao .cartao");
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

  async function showCartaoSelecionado() {
    const dados = await dadosJSON();

    const handleSelectInst = (e) => {
      const target = e.target;

      dados.forEach(({ instituicao, logo, bandeira, cor, logo_inst }) => {
        if (instituicao === inputInstituicao.value) {
          if (target.id == "instituicao" || target.id === "nome-impresso") {
            dom.el(".show-cartao").classList.add(active);

            cartao.style.backgroundColor = cor;

            cartao.querySelector(".logo-bandeira img").src = logo;
            cartao.querySelector(".logo-bandeira img").alt = bandeira;

            cartao.querySelector(".logo-instituicao img").src = logo_inst;
            cartao.querySelector(".logo-instituicao img").alt = instituicao;

            cartao.querySelector("p").innerText = nomeImpresso.value;
          }
        }
      });
    };

    formCadastro.addEventListener("input", handleSelectInst);
  }

  async function showCartaoCadastrado() {
    const abrirLista = dom.el(".abrir-lista-cartao");
    const boxCartao = dom.el(".cartao-cadastrado");
    const dados = await dadosJSON();

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

    if (arrCartao) {
      arrCartao.forEach((cartao) => {
        const div = dom.create("div");
        div.classList.add("cartao");

        dados.forEach(({ instituicao, logo, bandeira, logo_inst, cor }) => {
          if (cartao.instituicao == instituicao) {
            div.style.backgroundColor = cor;
            div.innerHTML = `
            <a href="#" class="link-cartao">
              <div class="logos-cartao">
              <div class="logo-bandeira">
                <img src="${logo}" alt="${bandeira}">
              </div>
              <div class="logo-instituicao">
                <img src="${logo_inst}" alt="${instituicao}">
                </div>
              </div>
            </a>
          `;
          }
        });

        boxCartao.prepend(div);
        cartaoAtivo();
      });
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
      });
    });
  }

  function init() {
    if (inputInstituicao) {
      selectInstituicao();
      showCartaoSelecionado();
    }
    showCartaoCadastrado();
  }

  return { init };
}

export default App;
