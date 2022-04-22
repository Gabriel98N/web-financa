function Dom() {
  function el(element) {
    return document.querySelector(element);
  }

  function els(element) {
    return document.querySelectorAll(element);
  }

  function create(tag) {
    return document.createElement(tag);
  }

  function storage(key) {
    const itemStorage = JSON.parse(localStorage.getItem(key)) || [];
    return itemStorage;
  }

  function setStorage(key, arr) {
    return localStorage.setItem(key, JSON.stringify(arr));
  }

  function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  function reloadLoader(mensagem, element) {
    const loader = document.querySelector(element);

    loader.classList.add("active");
    loader.querySelector("p").innerHTML = mensagem;

    setTimeout(() => location.reload(), 2000);
  }

  function zeroAEsquerda(num) {
    return num < 10 ? `0${num}` : num;
  }

  function conversorMoeda(numero, lang, type) {
    return new Intl.NumberFormat(lang, {
      style: "currency",
      currency: type,
    }).format(numero);
  }

  function firstLetter(text) {
    return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
  }

  function converterValor(element) {
    return parseFloat(
      element.replace("R$", "").replace(/\./gi, "").replace(/,/gi, ".")
    );
  }

  function cardAviso(texto) {
    const containerAviso = document.querySelector(".container-aviso");

    const div = document.createElement("div");
    div.classList.add("aviso");
    div.innerHTML = `<p>${texto}</p>`;
    containerAviso.prepend(div);

    setTimeout(() => {
      div.classList.add("active");
    });

    document.querySelectorAll(".aviso").forEach((aviso) => {
      setTimeout(() => {
        aviso.classList.remove("active");
      }, 2000);
    });
  }

  return {
    el,
    els,
    create,
    storage,
    setStorage,
    getStorage,
    reloadLoader,
    zeroAEsquerda,
    conversorMoeda,
    firstLetter,
    converterValor,
    cardAviso,
  };
}

export default Dom;
