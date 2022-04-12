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
    loader.querySelector("p").innerText = mensagem;

    setTimeout(() => location.reload(), 2000);
  }

  return {
    el,
    els,
    create,
    storage,
    setStorage,
    getStorage,
    reloadLoader,
  };
}

export default Dom;
