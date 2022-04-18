import Dom from "./dom.js";

const dom = Dom();

function Validacao(button, inputs) {
  const btn = dom.el(button);
  const required = dom.els(inputs);
  const active = "active";

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
    required.forEach((item) => {
      item.addEventListener("input", () => {
        if (checarInputs(required)) {
          btn.disabled = false;
        } else {
          btn.disabled = true;
        }
      });
    });
  }
  validarInputs();

  required.forEach((input) => {
    const mensagem = input.nextElementSibling;

    input.addEventListener("keypress", (e) => {
      const typeInput = input.type;
      const code = e.which;
      const stylesInput = {
        borderErro() {
          input.style.borderColor = "#fe6263";
        },
        borderSucess() {
          input.style.borderColor = "";
        },
      };

      if (typeInput == "text") {
        if (
          !(
            (code >= 65 && code <= 90) ||
            (code >= 96 && code <= 122) ||
            code == 32
          )
        ) {
          e.preventDefault();
          mensagem.classList.add(active);
          mensagem.innerHTML = "Por favor, digite apenas letras.";
          stylesInput.borderErro();
          return;
        }
        mensagem.innerHTML = "";
        mensagem.classList.remove(active);
        stylesInput.borderSucess();
      } else if (typeInput == "number") {
        if (!(code >= 48 && code <= 57)) {
          e.preventDefault();
          mensagem.classList.add(active);
          mensagem.innerHTML = "Por favor, digite apenas números.";
          stylesInput.borderErro();
        } else {
          mensagem.innerHTML = "";
          mensagem.classList.remove(active);
          stylesInput.borderSucess();
        }
      }
    });

    input.addEventListener("input", (e) => {
      const target = e.target;
      if (Math.sign(target.value) == "-1" || target.value == "0") {
        target.value = "";
        btn.disabled = true;
      }

      if (target.id == "dia-transacao") {
        if (target.value.length > 2) {
          target.value = "";
          btn.disabled = true;
        }
      }
    });
  });
}

export { Validacao };
