export default function vsadit(vlozils, vlozeno, vsadils, vsazenePole, celkemVsazeno) {
  let castka = Number(document.getElementById("sazka").value);
  let vymaz = (document.getElementById("sazka").value = "");
  let vkladStorage = localStorage.getItem("penize");
  vsazenePole.push(castka);
  celkemVsazeno = vsazenePole.reduce((partialSum, a) => partialSum + a, 0);
  // console.log(celkemVsazeno);

  if (vlozeno === undefined) {
    if(vlozils > 0){
      vlozeno = vlozils;
    }else{
      vlozeno = vkladStorage;
    }
  }
  if (vsadils) {
    vlozeno = vsadils;
  }

  if ((castka !== 0 && castka <= vlozeno)) {
    console.log(castka);
    vlozeno = vlozeno - castka;
    document.getElementById(
      "vlozeno"
    ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
    vymaz;
    return {vlozeno, celkemVsazeno};
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
        // while(castka > vlozeno){
        let novaCastka = prompt("Notaaak, nezkoušej sázet víc, než máš");
        castka = Number(novaCastka);
        // }
      } else if (isNaN(castka)) {
        let novaCastka = prompt("Notaaak, peníze, jakože číslo...");
        castka = Number(novaCastka);
      }
      if (!isNaN(castka) && castka > 0 && castka < vlozeno || castka === vlozeno) {
        vlozeno = vlozeno - castka;
        document.getElementById(
          "vlozeno"
        ).innerHTML = `Zbývá ti <span class="font-bold">${vlozeno}</span> Kč`;
        vymaz;
        return {vlozeno, celkemVsazeno};
      }
      if(!castka){
        return {vlozeno, celkemVsazeno, castka};
      }
    }
  }
}
