import { karty } from "./karty.js";
import reset from "./modules/reset.js";
import vklad from "./modules/vklad.js";
import vsadit from "./modules/vsadit.js";
import zahraj from "./modules/zahraj.js";
import zamichatKarty from "./modules/zamichatKarty.js";
import liznout from "./modules/liznout.js";

const zamichane = [];
const tazene = [];
const tazenePc = [];
const vsaditHTML = `<label class="block mb-2 font-medium text-gray-900"
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
const staciHTML = `<button
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
let jeVsazeno = false;
let vlozeno;
let soucetPc = 0;
let soucet = 0;
let vlozils;
let upravZamich;
let upravZamichPc;
const controller = new AbortController();
let jeKonec = false;

// Pouze ID z index.html
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
if (zivoty == 0 || isNaN(zivoty)) {
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


if (getPenize() == 0 || getPenize() == null || getPenize() == "undefined") {
  vlozColEl.innerHTML = `<input
  type="number"
  id="vloz"
  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-blue-500 block w-full p-2.5"
/><button
  class="text-gray-100 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
  type="button"
  id="vklad"
>
  Vložit vklad
</button>`;
} else {
  vlozColEl.innerHTML =
    '<span class="font-semibold">Vložil jsi:<span class="font-bold">' +
    getPenize() +
    "</span> Kč </span>";
  vkladRow.innerHTML = vsaditHTML;
  zahrajEl.innerHTML = staciHTML;
  // setPenize(vlozils);
}

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
    if (e.target && e.target.id == "vklad") {
      vlozils = vklad();
      setPenize(vlozils);
      vlozColEl.innerHTML =
        '<span class="font-semibold">Vložil jsi:<span class="font-bold">' +
        vlozils +
        "</span> Kč </span>";
      vkladRow.innerHTML = vsaditHTML;
      zahrajEl.innerHTML = staciHTML;
    }
    if (e.target && e.target.id == "zahrat") {
      if (!jeKonec) {
        zahraj(tazene, soucet, tazenePc, soucetPc, zivoty, jeVsazeno.vlozeno, jeVsazeno.celkemVsazeno);
      }
      jeKonec = true;
      setPenize(getPenize());
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
const vsazenePole =[];
let celkemVsazeno;
document.addEventListener(
  "click",
  function (e) {
    if (e.target && e.target.id == "vsadit") {
      if (zamichane.length > 1) {
        if (!jeKonec) {
          jeVsazeno = vsadit(vlozils, vlozeno, jeVsazeno.vlozeno, vsazenePole, celkemVsazeno);
          rozdejKarty();
          if (jeVsazeno.vlozeno) {
            let poleTahnutych = Object.values(tazene).map(function (element) {
              return `<span class="font-semibold">${element.name}</span><br/>`;
            });
            tahnutoEl.innerHTML = `<span class="font-bold">Na ruce máš</span><br>${poleTahnutych}`;
          }
          setPenize(jeVsazeno.vlozeno);
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
    setPenize(jeVsazeno.vlozeno + jeVsazeno.celkemVsazeno * jeVsazeno.celkemVsazeno);
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
    setPenize(jeVsazeno.vlozeno + jeVsazeno.celkemVsazeno);
    jeKonec = true;
  }
  if (soucet > 21) {
    controller.abort();
    localStorage.setItem("zivoty", zivoty - 1);
    console.log("kolik zivotu", zivoty);
    alert("Heh, jsi přes čáru, teda 21");
    //return location.reload();
    jeKonec = true;
  } else if (soucetPc > 21) {
    controller.abort();
    setPenize(jeVsazeno.vlozeno + 2*(jeVsazeno.celkemVsazeno));
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
  return localStorage.getItem("penize");
}
function setPenize(penize) {
  localStorage.setItem("penize", penize);
}
