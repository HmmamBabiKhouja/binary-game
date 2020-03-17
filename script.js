let table = document.querySelector(".table-block");

let buttons= document.querySelectorAll(".node");
// let goals = document.querySelectorAll(".goal");// this might not needed
buttons.forEach(button => button.addEventListener("click", trueOrFalse));

let rowLength = table.rows.length -1;
let colLength= table.rows.item(0).cells.length-1;
// added for clarity's sake
let rowGoal=rowLength;
let colGoal=colLength;

function init(){

    rowsGoalsGenerater();
    colsGoalsGenerater();
}

// turns the value of a node 1/0 or true/ false
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

// generates rows's goals
function rowsGoalsGenerater(){
    for ( let col=0;col<rowLength;col++){
        let randomNum = Math.floor(Math.random() * (Math.pow(2, rowLength) - 1))+1;
        table.rows.item(col).cells.item(rowGoal).innerHTML= randomNum;
    }
}

// generates columns's goals
// for compatibility's sake, they will be made from rows goals 
function colsGoalsGenerater() {
    let goals = [];// row's goals

    for ( let row =0; row<colLength; row++){
        goals.push(table.rows.item(row).cells.item(rowGoal).innerHTML);
    }
    
    goals=goals.map((item)=>{
        item=Number(item).toString(2);  
        
        if( item.length<rowLength){
            let addZeros="0".repeat(rowLength-item.length);
            item=addZeros.concat(item)
        }
        return item.split("")
    })

    for( let col=0; col<colLength; col++){
        let newGoal= []// col goal 
        for( let row=0; row<rowLength; row++){
            newGoal.push(goals[row][col]);
        }
        newGoal = parseInt(newGoal.join(""), 2).toString(10);
        if (newGoal==0){// to avoid zero values on col goals
            setTimeout(init, 10);
        }

        table.rows.item(rowGoal).cells.item(col).innerHTML =newGoal;
    }
}

// checks if nodes values equals the row's goal
function checkRow(row){
    let rowGoal= table.rows.item(row).cells.item(colGoal).innerHTML;
    let userInput=[];

    for ( let column = 0; column< rowLength; column++){
        userInput.push(table.rows.item(row).cells.item(column).innerHTML);
    }

    if(rowGoal== parseInt(userInput.join(""),2).toString(10)){
        table.rows.item(row).cells.item(colGoal).classList.add("goal-achived");
    }else{
        table.rows.item(row).cells.item(colGoal).classList.remove("goal-achived");
    }
}

// checks if nodes values equals the col's goal
function checkCol(col){
    let colGoal = table.rows.item(rowGoal).cells.item(col).innerHTML;
    let userInput=[];

    for( let row=0; row< colLength; row++){
        userInput.push(table.rows.item(row).cells.item(col).innerHTML)
    }

    if (colGoal == parseInt(userInput.join(""), 2).toString(10)) {
        table.rows.item(rowGoal).cells.item(col).classList.add("goal-achived");
    } else {
        table.rows.item(rowGoal).cells.item(col).classList.remove("goal-achived");
    }
}

init();