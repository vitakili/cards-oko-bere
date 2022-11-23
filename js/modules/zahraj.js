export default function zahraj(tazene, soucet, tazenePc, soucetPc, jeKonec) {
  if(tazene.length > 0) {
    if (soucet > soucetPc && soucet < 21) {
      alert(
        "Vyhráls nad počítačem se součtem " + soucet + "\npc měl " + soucetPc
      );
      //return location.reload();
      jeKonec = true;
    }
    if (soucet < soucetPc && soucetPc < 21) {
      localStorage.setItem("zivoty", zivoty - 1);
      alert("Přohráls s počítačem se součtem " + soucet + "\npc měl " + soucetPc);
      //return location.reload();
      jeKonec = true;

    }
    if (soucet === soucetPc) {
      alert(
        "Remízoval jsi s počítačem \nTy máš " + soucet + "\nPočítač má" + soucetPc
      );
      //return location.reload();
      jeKonec = true;

    }
  }else {
    alert('Musíš nejdřív táhnout, abys mohl pokračovat');
  }
}
