export default function vsadit(vlozils, vlozeno, vsadils) {
  let castka = Number(document.getElementById("sazka").value);
  // var vlozeno = Number(document.getElementById("vlozeno").innerHTML);

  if (vlozeno === undefined) {
    vlozeno = vlozils;
  }
  if (vsadils) {
    vlozeno = vsadils;
  }
  if ((castka !== 0 && castka < vlozeno) || castka === vlozeno) {
    vlozeno = vlozeno - castka;
    document.getElementById(
      "vlozeno"
    ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
    return vlozeno;
  } else {
    if (vlozeno === 0) {
      return alert("Nemůžeš již vsázet, jsi na nule");
    }
    while (castka === 0 || isNaN(castka) || castka > vlozeno) {
      if (castka === 0) {
        let novaCastka = prompt(
          "Notaaak, peníze, jakože číslo a větší než nula..."
        );
        castka = Number(novaCastka);
      } else if (castka > vlozeno) {
        let novaCastka = prompt("Notaaak, nezkoušej sázet víc, než máš");
        castka = Number(novaCastka);
      } else if (isNaN(castka)) {
        let novaCastka = prompt("Notaaak, peníze, jakože číslo...");
        castka = Number(novaCastka);
      }
      vlozeno = vlozeno - castka;
      document.getElementById(
        "vlozeno"
      ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
      return vlozeno;
    }
  }
}
