let table = document.querySelector(".table-block");

let buttons= document.querySelectorAll(".node");
let goals = document.querySelectorAll(".goal");// this might not needed
let rowLength = table.rows.length;// be sure to suptract it when you add the col goals
let colLength= table.rows.item(0).cells.length-1;
buttons.forEach((button)=> button.addEventListener("click", trueOrFalse));


function round(){

    goalsCreaterR();
    goalsCreaterC();
}

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
    let rowGoal= tableRow.cells.item(colLength).innerHTML;
    let values=[];

    for ( let cell = 0; cell< tableRow.cells.length-1; cell++){
        values.push(tableRow.cells.item(cell).innerHTML);
    }

    if(rowGoal== parseInt(values.join(""),2).toString(10)){
        tableRow.cells.item(colLength).classList.add("goal-achived");
    }else{
        tableRow.cells.item(colLength).classList.remove("goal-achived");
    }
}

// generates rows's goals
function goalsCreaterR(){
    for ( let i=0;i<rowLength;i++){
        let randomNum = Math.floor(Math.random() * (Math.pow(2, rowLength) - 1))+1;
        table.rows.item(i).cells.item(rowLength).innerHTML= randomNum;
    }
}

// generates columns's goals
function goalsCreaterC() {

}

round();