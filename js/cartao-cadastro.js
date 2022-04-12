import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";

const dom = Dom();

function cartaoCadastro() {
  const formCadastro = dom.el('[data-formulario="cadastro-cartao"]');
  const selectInstituicao = dom.el("#instituicao");
  const nomeImpresso = dom.el("#nome-impresso");
  const limite = dom.el("#limite");
  const btnCadastrar = dom.el(".btn-cadastrar");
  const loader = dom.el("[data-loader]");

  const cartao = dom.el(".show-cartao .cartao");
  const arrCartao = dom.storage("cartao");
  const active = "active";

  async function criarCartao() {
    const cartao = dom.create("div");
    cartao.classList.add("cartao");

    const handleClickCartao = async () => {
      try {
        loader.style.display = "flex";

        const dados = await dadosJSON();
        dados.forEach((dado) => {
          if (dado.instituicao == selectInstituicao.value) {
            arrCartao.push({
              instituicao: dado.instituicao,
              nomeImpresso: nomeImpresso.value.toUpperCase(),
              limite: limite.value,
              cor: dado.cor,
              bandeira: dado.bandeira,
              logo: dado.logo,
            });
            dom.setStorage("cartao", arrCartao);
          }
        });
        location.reload();
      } catch (e) {
        console.log("Não foi possível concluir o cadastro");
        console.log(e);
      }
    };

    btnCadastrar.addEventListener("click", handleClickCartao);
  }

  async function showCartaoSelecionado() {
    const dados = await dadosJSON();

    const handleSelectInst = (e) => {
      const target = e.target;

      dados.forEach(({ instituicao, logo, bandeira, cor }) => {
        if (instituicao === selectInstituicao.value) {
          if (target.id == "instituicao" || target.id === "nome-impresso") {
            dom.el(".show-cartao").classList.add(active);

            cartao.style.backgroundColor = cor;

            cartao.querySelector(".logo-bandeira img").src = logo;
            cartao.querySelector(".logo-bandeira img").alt = bandeira;

            cartao.querySelector("p").innerText = nomeImpresso.value;
          }
        }
      });
    };

    formCadastro.addEventListener("input", handleSelectInst);
  }

  function init() {
    if (btnCadastrar) {
      criarCartao();
      showCartaoSelecionado();
    }
  }

  return { init };
}

export default cartaoCadastro;
