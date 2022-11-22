export default function zahraj (tazene, soucet, tazenePc, soucetPc) {
    console.log('zahrano', tazene);
    console.log('počítač zahrál', tazenePc);
    if(soucet > soucetPc && soucet < 21){
        return alert('Vyhráls nad počítačem se součtem '+soucet+ '\npc měl '+soucetPc);
    }
    if(soucet < soucetPc && soucetPc < 21){
        localStorage.setItem("zivoty", zivoty - 1);
        return alert('Přohráls s počítačem se součtem '+soucet+ '\npc měl '+soucetPc);
    }
    if(soucet === soucetPc) {
        return alert('Remízoval jsi s počítačem \nTy máš '+soucet+'\nPočítač má'+soucetPc);
    }
}