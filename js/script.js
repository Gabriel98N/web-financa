import App from "./app.js";
import cartaoCadastro from "./cartao-cadastro.js";
import { Validacao } from "./validacao.js";
import Transacao from "./transacao.js";
import limiteCartao from "./limite.js";
import Pagamento from "./pagamento.js";

Validacao(".btn-cadastrar", ".box-cadastro form [required]");
Validacao(".btn-adicionar", "[data-formulario='transacao'] [required]");
Validacao(".btn-confirmar", "#pagamento[required]");

const app = App();
app.init();

const addCartao = cartaoCadastro();
addCartao.init();

const transacao = Transacao();
transacao.init();

const limite = limiteCartao();
limite.init();

const pagamento = Pagamento();
pagamento.init();
