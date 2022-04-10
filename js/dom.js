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

  return {
    el,
    els,
    create,
    storage,
    setStorage,
    getStorage,
  };
}

export default Dom;
