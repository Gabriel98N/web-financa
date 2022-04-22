import Dom from "./dom.js";

const dom = Dom();

function Validacao(button, inputs) {
  const btn = dom.el(button);
  const inputsRequired = dom.els(inputs);

  function checarInputs(inputs) {
    let campo = true;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        campo = false;
      }
    });
    return campo;
  }

  function validarInputs() {
    inputsRequired.forEach((item) => {
      item.addEventListener("input", () => {
        if (checarInputs(inputsRequired)) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
    });
  }
  validarInputs();

  function validationMessage(tipo, mensagem, texto = "") {
    const input = mensagem.parentElement.querySelector("[required]");
    const label = mensagem.parentElement.querySelector(".label");

    const red = "#fe6263";
    mensagem.style.marginTop = "7px";

    if (tipo == "block") {
      mensagem.innerText = texto;
      input.style.borderColor = red;
      label.style.color = red;
      input.value = "";
    } else if (tipo == "none") {
      mensagem.innerText = texto;
      input.style.borderColor = "";
      label.style.color = "";
    }
  }

  inputsRequired.forEach((input) => {
    const mensagem = input.nextElementSibling;
    const block = "block";
    const none = "none";

    input.addEventListener("keypress", (e) => {
      const target = e.target;
      const code = e.which;
      const atrInput = target.dataset.input;

      if (atrInput == "caractere") {
        if (
          !(
            (code >= 65 && code <= 90) ||
            (code >= 96 && code <= 122) ||
            code == 32
          )
        ) {
          e.preventDefault();
          validationMessage(block, mensagem, "Digite um nome válido");
        } else {
          validationMessage(none, mensagem);
        }
      } else if (atrInput == "valor") {
        if (
          (code >= 32 && code <= 45) ||
          code == 47 ||
          (code >= 58 && code <= 255)
        ) {
          e.preventDefault();
          validationMessage(block, mensagem, "Não é um valor válido");
        }
      }
    });

    input.addEventListener("input", (e) => {
      const target = e.target;
      const atrInput = target.dataset.input;

      if (atrInput == "valor") {
        if (target.value == ".") {
          validationMessage(
            block,
            mensagem,
            "Digite um número antes da vírgula"
          );
        } else if (target.value == 0) {
          validationMessage(block, mensagem, "Digite um valor maior que 0");
        } else {
          validationMessage(none, mensagem);
        }
      }
    });
  });
}

export { Validacao };
