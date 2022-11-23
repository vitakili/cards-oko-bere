import { karty } from "./karty.js";
import reset from "./modules/reset.js";
import vklad from "./modules/vklad.js";
import vsadit from "./modules/vsadit.js";
import zahraj from "./modules/zahraj.js";
import zamichatKarty from "./modules/zamichatKarty.js";
import liznout from "./modules/liznout.js";

const zamichane = [];
let jeVsazeno = false;
let vlozeno;
const tazene = [];
const tazenePc = [];
let soucetPc = 0;
let soucet = 0;
let vlozils;
let upravZamich;
let upravZamichPc;
const controller = new AbortController();
let jeKonec = false;

const tahnutoEl = document.getElementById("tahnuto");
const soucetEl = document.getElementById("soucet");
const vlozColEl = document.getElementById("vlozCol");
const buttonsEl = document.getElementById("buttons");
const zahrajEl = document.getElementById("zahrajBtn");
const zivotyEl = document.getElementById("zivoty");
const vkladRow = document.getElementById("vkladRow");

// let penize = localStorage.getItem("penize");

let zivoty = localStorage.getItem("zivoty");
if (!zivoty) {
  localStorage.setItem("zivoty", 3);
}
if (zivoty == 0) {
  alert("Prohráls, přišels o všechny životy");
  localStorage.setItem("zivoty", 3);
  setPenize(0);
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
  setPenize(vlozils);
  vlozColEl.innerHTML =
    '<span class="font-semibold">Vložil jsi:<span class="font-bold">' +
    vlozils +
    "</span> Kč </span>";
  vkladRow.innerHTML = `<label class="block mb-2 font-medium text-gray-900"
    >Částka kterou chceš vsadit (Kč)</label
  >
  <div class="grid gap-6 grid-cols-2">
    <input
      type="number"
      id="sazka"
      placholder="Sázka"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-blue-500 block w-full p-2.5"
    />
    <button
      class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      type="button"
      id="vsadit"
    >
      Vsadit
    </button>
  </div>`;
  zahrajEl.innerHTML = `<button
      class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center"
      type="button"
      id="liznout"
      >
      Líznout si kartu
    </button>
    <label class="block mb-2 font-medium text-gray-900">Zahraj s tim, co máš</label>
      <button
      class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center"
      type="button"
      id="zahrat"
      >
      Stačí
    </button>`;
});

const zamichatEl = document.getElementById("zamichat");
zamichatEl.addEventListener("click", () => {
  zamichatKarty(karty, zamichane);
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
    reset(jeKonec);
  }
  if (zamichane.length > 1) {
    if (e.target && e.target.id == "zahrat") {
      if (!jeKonec) {
        zahraj(tazene, soucet, tazenePc, soucetPc, jeKonec);
      }
      setPenize(vlozeno);
      // console.log(jeKonec);
    }
    if (e.target && e.target.id == "liznout") {
      if (!jeKonec) {
        liznout(tazene, soucet, tazenePc, soucetPc, vlozeno);
        rozdejKarty();
        // if (jeVsazeno) {
        let poleTahnutych = Object.values(tazene).map(function (element) {
          return `<span class="font-semibold">${element.name}</span><br/>`;
        });
        tahnutoEl.innerHTML = `<span class="font-bold">Na ruce máš</span><br>${poleTahnutych}`;
        // }
      }
    }
  } else {
    return alert("Zamíchat karty bys nechtěl?");
  }
});
document.addEventListener(
  "click",
  function (e) {
    if (e.target && e.target.id == "vsadit") {
      if (zamichane.length > 1) {
        if (!jeKonec) {
          jeVsazeno = vsadit(vlozils, vlozeno, jeVsazeno);
          rozdejKarty();
          if (jeVsazeno) {
            let poleTahnutych = Object.values(tazene).map(function (element) {
              return `<span class="font-semibold">${element.name}</span><br/>`;
            });
            tahnutoEl.innerHTML = `<span class="font-bold">Na ruce máš</span><br>${poleTahnutych}`;
          }
          setPenize(jeVsazeno);
          console.log(jeVsazeno);
        } else {
          return alert("Zamíchat karty bys nechtěl?");
        }
      }
    }
  },
  { signal: controller.signal }
);

function rozdejKarty() {
  zivoty = localStorage.getItem("zivoty");
  upravZamich = zamichane.shift();
  upravZamichPc = zamichane.shift();
  tazene.push(upravZamich);
  tazenePc.push(upravZamichPc);
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
    //return location.reload();
    jeKonec = true;
  }
  if (soucetPc === 21) {
    controller.abort();
    alert(
      "Zahrál jsi 21!!!\nPočítač, ale má taky 21 a hrál kartami:\n" +
        Object.values(tazenePc).map(function (element) {
          return element.name;
        })
    );
    //return location.reload();
    jeKonec = true;
  }
  if (soucet > 21) {
    controller.abort();
    localStorage.setItem("zivoty", zivoty - 1);
    alert("Heh, jsi přes čáru, teda 21");
    //return location.reload();
    jeKonec = true;
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
    //return location.reload();
    jeKonec = true;
  }
}

function getPenize() {
  localStorage.getItem("penize");
}
function setPenize(penize){
  localStorage.setItem("penize", penize);
}