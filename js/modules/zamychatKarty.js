export default function zamychatKarty (karty, zamychane) {
    let pocet = karty.length;
    while(pocet) {
      zamychane.push(karty.splice(Math.floor(Math.random() * pocet), 1)[0]);
      pocet -= 1;
    }
    return zamychane;
  };