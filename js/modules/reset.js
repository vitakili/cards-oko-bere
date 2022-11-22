export default function reset() {
    if(confirm("Opravdu to chceš resetovat??")){
        location.reload();
    }else return;
}