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
  .map(function () {
    return ` <svg class="w-6 mx-1" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 471.701 471.701">
<g>
	<path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
		c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
		l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
		C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
		s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
		c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
		C444.801,187.101,434.001,213.101,414.401,232.701z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
    `;
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
