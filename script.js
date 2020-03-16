let table = document.querySelector(".table-block");

let buttons= document.querySelectorAll(".node");
let goals = document.querySelectorAll(".goal");// this might not needed

let rowLength = table.rows.length -1;
let colLength= table.rows.item(0).cells.length-1;
buttons.forEach((button)=> button.addEventListener("click", trueOrFalse));


function round(){

    rowGoalsGenerater();
    colGoalsGenerater();
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
    checkCol(col);
}

function checkRow(row){
    let rowGoal= table.rows.item(row).cells.item(colLength).innerHTML;
    let userInput=[];

    for ( let column = 0; column< rowLength; column++){
        userInput.push(table.rows.item(row).cells.item(column).innerHTML);
    }

    if(rowGoal== parseInt(userInput.join(""),2).toString(10)){
        table.rows.item(row).cells.item(colLength).classList.add("goal-achived");
    }else{
        table.rows.item(row).cells.item(colLength).classList.remove("goal-achived");
    }
}

function checkCol(col){
    let colGoal = table.rows.item(rowLength).cells.item(col).innerHTML;
    let userInput=[];

    for( let row=0; row< colLength; row++){
        userInput.push(table.rows.item(row).cells.item(col).innerHTML)
    }

    if (colGoal == parseInt(userInput.join(""), 2).toString(10)) {
        table.rows.item(rowLength).cells.item(col).classList.add("goal-achived");
    } else {
        table.rows.item(rowLength).cells.item(col).classList.remove("goal-achived");
    }
}


// generates rows's goals
function rowGoalsGenerater(){
    for ( let col=0;col<rowLength;col++){
        let randomNum = Math.floor(Math.random() * (Math.pow(2, rowLength) - 1))+1;
        table.rows.item(col).cells.item(rowLength).innerHTML= randomNum;
    }
}

// generates columns's goals
// for compatibility's sake, it won't generate like the rowGoalsGenerater()
// but it will collect the columns cells and set it as goal 
function colGoalsGenerater() {
    let rowsGoals = [];

    for ( let row =0; row<colLength; row++){
        rowsGoals.push(table.rows.item(row).cells.item(rowLength).innerHTML);
    }
    
    rowsGoals=rowsGoals.map((item)=>{
        item=Number(item).toString(2);  
        
        if( item.length<rowLength){
            let addZeros="0".repeat(rowLength-item.length);
            item=addZeros.concat(item)
        }
        return item.split("")
    })

    for( let col=0; col<colLength; col++){
        let colGoal= []
        for( let row=0; row<rowLength; row++){
            colGoal.push(rowsGoals[row][col]);
        }
        table.rows.item(rowLength).cells.item(col).innerHTML = parseInt(colGoal.join(""),2).toString(10);
    }
}

round();