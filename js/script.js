import App from "./app.js";
import cartaoCadastro from "./cartao-cadastro.js";
import { Validacao } from "./validacao.js";
import limiteCartao from "./limite.js";

Validacao(".btn-cadastrar", ".box-cadastro form [required]");
Validacao(".btn-adicionar", "[data-formulario='transacao'] [required]");

const app = App();
app.init();

const addCartao = cartaoCadastro();
addCartao.init();

const limite = limiteCartao();
limite.init();
