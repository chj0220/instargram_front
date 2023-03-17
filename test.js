const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const e = document.getElementById("e");

a.innerHTML = a.innerText(localStorage.getItem('accessToken'));


localStorage.clear();