export default function vklad(vlozeno) {
  vlozeno = Number(document.getElementById("vloz").value);
  if (vlozeno !== 0) {
    document.getElementById("vlozeno").innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
    return vlozeno;
  } else {
    while (vlozeno === 0 || isNaN(vlozeno)) {
      let novyVklad = prompt("Notaaak, peníze, jakože číslo a jiný než nula");
      vlozeno = Number(novyVklad);
      document.getElementById("vlozeno").innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
      return vlozeno;
    }
  }
}
