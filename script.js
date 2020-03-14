let table = document.querySelector(".table-block");

let buttons= document.querySelectorAll(".node");
let goals = document.querySelectorAll(".goal");// this might not needed
// console.log(table.rows.item(3).cells.item(2).innerHTML);
// when you collect data from user try to be sure to remove last row and last cell of each row 

buttons.forEach((button)=> button.addEventListener("click", trueOrFalse));


function trueOrFalse(){
    let row = this.parentElement.rowIndex;
    let col= this.cellIndex;
    let val= this.innerHTML;

    if(val==1){
        this.classList.remove("node-true");
        this.innerHTML=0;
    }else{
        this.classList.add("node-true");
        this.innerHTML=1;
    }
    
    checkRow(row);
    // checkCol(col);
}

function checkRow(row, col){
    let tableRow = table.rows.item(row);
    let rowGoal= tableRow.cells.item(tableRow.cells.length-1).innerHTML;
    let values=[];

    for ( let cell = 0; cell< tableRow.cells.length-1; cell++){
        values.push(tableRow.cells.item(cell).innerHTML);
    }

    if(rowGoal== parseInt(values.join(""),2).toString(10)){
        tableRow.cells.item(tableRow.cells.length - 1).classList.add("goal-achived");
    }else{
        tableRow.cells.item(tableRow.cells.length - 1).classList.remove("goal-achived");
    }
}
