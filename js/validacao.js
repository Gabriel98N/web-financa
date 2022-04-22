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

  inputsRequired.forEach((input) => {
    input.addEventListener("keypress", (e) => {
      const target = e.target;
    });
  });
}

export { Validacao };
