import App from "./app.js";
import cartaoCadastro from "./cartao-cadastro.js";
import { Validacao } from "./validacao.js";

Validacao(".btn-cadastrar", ".box-cadastro form [required]");

const app = App();
app.init();

const addCartao = cartaoCadastro();
addCartao.init();
