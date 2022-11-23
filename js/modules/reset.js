export default function reset(jeKonec) {
    if(jeKonec){
        location.reload();
    }
    else if(confirm("Opravdu to chceš resetovat a přijít o celej průběh hry??!")){
        localStorage.setItem("zivoty", 3);
        localStorage.setItem("penize", 0);
        location.reload();
    }else return;
}