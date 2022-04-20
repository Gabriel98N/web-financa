import Dom from "./dom.js";

const dom = Dom();

function Validacao(button, inputs) {
  const btn = dom.el(button);
  const required = dom.els(inputs);

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
}

export { Validacao };
