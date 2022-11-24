export default function zahraj(tazene, soucet, tazenePc, soucetPc, zivoty, vlozeno, celkemVsazeno) {
  if (tazene.length > 0) {
    console.log('vlozeno',vlozeno);
    console.log('celkem vsazeno', celkemVsazeno);
    if (soucet > soucetPc && soucet < 21) {
      localStorage.setItem("penize", vlozeno + (2 * celkemVsazeno));
      alert(
        "Vyhráls nad počítačem se součtem " + soucet + "\npc měl " + soucetPc
      );
      //return location.reload();
    }
    if (soucet < soucetPc && soucetPc < 21) {
      localStorage.setItem("zivoty", zivoty - 1);
      console.log('kolik zivotu v zahraj.js', localStorage.getItem("zivoty"));
      alert(
        "Přohráls s počítačem se součtem " + soucet + "\npc měl " + soucetPc
      );
      //return location.reload();
    }
    if (soucet === soucetPc) {
      localStorage.setItem("penize", vlozeno + celkemVsazeno);
      alert(
        "Remízoval jsi s počítačem \nTy máš " +
          soucet +
          "\nPočítač má" +
          soucetPc
      );
      //return location.reload();
    }
  } else {
    alert("Musíš nejdřív táhnout, abys mohl pokračovat");
  }
}
