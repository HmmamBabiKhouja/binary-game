let table = document.querySelector(".table-block");
let buttons= document.querySelectorAll(".node");
// console.log(table.rows.item(3).cells.item(2).innerHTML);

buttons.forEach((button)=> button.addEventListener("click", trueOrFalse));


function trueOrFalse(){
    if(this.innerHTML==1){
        this.classList.remove("node-true");
        this.innerHTML=0;
        return;
    }
    this.classList.add("node-true");
    this.innerHTML=1;
}