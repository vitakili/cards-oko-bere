export default function vklad(vlozeno) {
  vlozeno = Number(document.getElementById("vloz").value);
  let vymaz = (document.getElementById("vloz").value = "");
  if (vlozeno !== 0) {
    document.getElementById(
      "vlozeno"
    ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
    vymaz;
    return vlozeno;
  } else {
    while (vlozeno === 0 || isNaN(vlozeno)) {
      let novyVklad = prompt("Notaaak, peníze, jakože číslo a jiný než nula");
      vlozeno = Number(novyVklad);
      document.getElementById(
        "vlozeno"
      ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
      vymaz;
      if (vlozeno !== 0 && !isNaN(vlozeno)) {
        return vlozeno;
      }
    }
  }
}
