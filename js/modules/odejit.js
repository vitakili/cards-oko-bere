export default function odejit(vlozeno) {
  if (
    confirm(
      "Gratuluji, vyhráls!! Toto je opravdu jediný způsob, jak vyhrát a nepřijít o barák\n Zůstalo ti " +
        vlozeno
    )
  );
  {
    localStorage.setItem("zivoty", 3);
    localStorage.setItem("penize", 0);
    location.reload();
  }
}
