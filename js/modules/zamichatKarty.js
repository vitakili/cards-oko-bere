export default function zamichatKarty (karty, zamichane) {
    let pocet = karty.length;
    while(pocet) {
      zamichane.push(karty.splice(Math.floor(Math.random() * pocet), 1)[0]);
      pocet -= 1;
    }
    return zamichane;
  };