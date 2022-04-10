import Dom from "./dom.js";
import { dadosJSON } from "./dados.js";

const dom = Dom();

function cartaoCadastro() {
  const selectInstituicao = dom.el("#instituicao");
  const nomeImpresso = dom.el("#nome-impresso");
  const limite = dom.el("#limite");
  const btnCadastrar = dom.el(".btn-cadastrar");
  const loader = dom.el("[data-loader]");

  const arrCartao = dom.storage("cartao");

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

  function init() {
    if (btnCadastrar) {
      criarCartao();
    }
  }

  return { init };
}

export default cartaoCadastro;
