import { karty } from "./karty.js";
import reset from "./modules/reset.js";
import vklad from "./modules/vklad.js";
import vsadit from "./modules/vsadit.js";
import zahraj from "./modules/zahraj.js";
import zamychatKarty from "./modules/zamychatKarty.js";

const zamychane = [];
let jeVsazeno = false;
let vlozeno;
const tazene = [];
const tazenePc = [];
let soucetPc = 0;
let soucet = 0;
let vlozils;
const controller = new AbortController();

const tahnutoEl = document.getElementById("tahnuto");
const soucetEl = document.getElementById("soucet");
const vlozColEl = document.getElementById("vlozCol");
const buttonsEl = document.getElementById("buttons");
const zahrajEl = document.getElementById("zahrajBtn");
const zivotyEl = document.getElementById("zivoty");

let zivoty = localStorage.getItem("zivoty");
if (!zivoty) {
  localStorage.setItem("zivoty", 3);
}
if (zivoty == 0) {
  alert("Prohráls, přišels o všechny životy");
  localStorage.setItem("zivoty", 3);
}

let zobrazZivot = Array.from({ length: zivoty })
  .map(function (element) {
    return `<img class="w-6 mx-1" src="./assets/heart-svgrepo-com.svg" alt="zivot-${element}"/>`;
  })
  .join("");
zivotyEl.innerHTML = zobrazZivot;

const vkladEl = document.getElementById("vklad");
vkladEl.addEventListener("click", () => {
  vlozils = vklad();
  vlozColEl.innerHTML =
    '<span class="font-semibold">Vložil jsi:<span class="font-bold">' +
    vlozils +
    "</span> Kč </span>";
});

const zamychatEl = document.getElementById("zamychat");
zamychatEl.addEventListener("click", () => {
  zamychatKarty(karty, zamychane);
  buttonsEl.innerHTML = `
    <button
    class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    type="button"
    id="reset"
  >
    Reset
  </button>
  <button
    class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    type="button"
    id="opust"
    >
    Odejít
  </button>
  `;
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "reset") {
    reset();
  }
});

document.addEventListener("click", function (e) {
  if (e.target && e.target.id == "zahrat") {
    zahraj(tazene, soucet, tazenePc, soucetPc);
  }
});

const vsaditEl = document.getElementById("vsadit");
vsaditEl.addEventListener(
  "click",
  () => {
    if (zamychane.length > 1) {
      zivoty = localStorage.getItem("zivoty");
      let upravZamych = zamychane.shift();
      let upravZamychPc = zamychane.shift();
      tazene.push(upravZamych);
      tazenePc.push(upravZamychPc);
      soucet = 0;
      soucetPc = 0;
      tazene.forEach((element) => {
        soucet += element.value;
      });
      tazenePc.forEach((element) => {
        soucetPc += element.value;
      });
      soucetEl.innerHTML = `Součet táhnutých karet <span class="font-bold">${soucet}</span><br>
      `;
      if (soucet === 21) {
        controller.abort();
        alert("Je to tak, vyhráls, máš 21!");
        return location.reload();
      }
      if (soucetPc === 21) {
        controller.abort();
        alert(
          "Zahrál jsi 21!!!\nPočítač, ale má taky 21 a hrál kartami:\n" +
            Object.values(tazenePc).map(function (element) {
              return element.name;
            })
        );
        return location.reload();
      }
      if (soucet > 21) {
        controller.abort();
        localStorage.setItem("zivoty", zivoty - 1);
        alert("Heh, jsi přes čáru, teda 21");
        return location.reload();
      } else if (soucetPc > 21) {
        controller.abort();
        alert(
          "Fajn, vyhráls... \nPočítač to přestřelil a zahrál: " +
            Object.values(tazenePc).map(function (element) {
              return element.name;
            }) +
            "\nse součtem " +
            soucetPc
        );
        return location.reload();
      }
      jeVsazeno = vsadit(vlozils, vlozeno, jeVsazeno);

      if (jeVsazeno) {
        let poleTahnutych = Object.values(tazene).map(function (element) {
          return `<span class="font-semibold">${element.name}</span><br/>`;
        });
        tahnutoEl.innerHTML = `<span class="font-bold">Na ruce máš</span><br>${poleTahnutych}`;
        zahrajEl.innerHTML = `<label class="block mb-2 font-medium text-gray-900">Zahraj s tim, co máš</label>
        <button
        class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center"
        type="button"
        id="zahrat"
        >
        Stačí
      </button>`;
      }
    } else {
      return alert("Zamíchat karty bys nechtěl?");
    }
  },
  { signal: controller.signal }
);
