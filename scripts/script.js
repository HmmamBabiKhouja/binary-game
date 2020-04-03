///////////////////
// DOM variables //
///////////////////

let table = document.querySelector("#table-block");

let buttons= document.querySelectorAll(".node");
buttons.forEach(button => button.addEventListener("click", trueOrFalse));
let goals = document.querySelectorAll(".goal");

let scoreDsipaly = document.querySelector("#score");
let dispalaySeconds = document.querySelector("#seconds");

let levelSelector = document.querySelector("#levels");
levelSelector.addEventListener("change", createTable, false);

//////////////////////
// global variables //
//////////////////////

let roundTime = 30+1;
let score=0;
let tableSize = table.rows.length -1;
// added for clarity's sake
let goalPos=tableSize;

///////////////
// functions // 
///////////////

function createTable(){
    let lowestLevel=4;
    tableSize = lowestLevel + levelSelector.selectedIndex;
    goalPos = tableSize;
    table.innerHTML="";

    let cellClass;
    for( let row=0;row<tableSize+1;row++){ // +1 to create goals too
    
        let currentRow=table.insertRow();
        currentRow.className="row";

        for ( let col = 0; col< tableSize+1; col++){ // +1 to create goals too
            
            if(col === goalPos && row === goalPos){// to avoid creting the down right corner which will have no nodes to affect it and it will be a bug
                break;
            } 
            
            cellClass = "node";
            if (row === goalPos || col === goalPos) {
                cellClass = "goal";
            }
    
            let currentCell = currentRow.insertCell();
            currentCell.className=cellClass;
            currentCell.innerHTML="0";
        }
    }
    init();
}

function init(){
    resetValues();

    rowsGoalsGenerater();
    colsGoalsGenerater();
}

function resetValues() {
    buttons = document.querySelectorAll(".node");
    buttons.forEach(button => button.addEventListener("click", trueOrFalse));
    goals = document.querySelectorAll(".goal");
    
    roundTime = 30 + 1;

    for (let button = 0; button < buttons.length; button++) {
        buttons[button].classList.remove("node-true");
        buttons[button].innerHTML = 0;
    }

    for (let goal = 0; goal < goals.length; goal++) {
        goals[goal].classList.remove("goal-achived");
    }
}

// generates rows's goals
function rowsGoalsGenerater(){
    for ( let col=0;col<tableSize;col++){
        let randomNum = Math.floor(Math.random() * (Math.pow(2, tableSize) - 1))+1;
        table.rows.item(col).cells.item(goalPos).innerHTML= randomNum;
    }
}

// generates columns's goals
// for compatibility's sake, they will be made from rows goals 
function colsGoalsGenerater() {
    let goalsArray = [];// row's goals

    for ( let row =0; row<tableSize; row++){
        goalsArray.push(table.rows.item(row).cells.item(goalPos).innerHTML);
    }
    
    goalsArray=goalsArray.map((item)=>{
        item=Number(item).toString(2);  
        
        if( item.length<tableSize){
            let addZeros="0".repeat(tableSize-item.length);
            item=addZeros.concat(item)
        }
        return item.split("")
    })

    for( let col=0; col<tableSize; col++){
        let newGoal= []// col goal 
        for( let row=0; row<tableSize; row++){
            newGoal.push(goalsArray[row][col]);
        }
        newGoal = parseInt(newGoal.join(""), 2).toString(10);
        if (newGoal==0){// to avoid zero values on col goals
            setTimeout(init, 10);
        }
        
        table.rows.item(goalPos).cells.item(col).innerHTML =newGoal;
    }
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

    if(checkGoals()){
        score+=tableSize;
        scoreDsipaly.innerHTML=score;
        init();
    }
}

// checks if nodes values equals the row's goal
function checkRow(row){
    let rowGoal= table.rows.item(row).cells.item(goalPos).innerHTML;
    let userInput=[];

    for ( let column = 0; column< tableSize; column++){
        userInput.push(table.rows.item(row).cells.item(column).innerHTML);
    }

    if(rowGoal== parseInt(userInput.join(""),2).toString(10)){
        table.rows.item(row).cells.item(goalPos).classList.add("goal-achived");
    }else{
        table.rows.item(row).cells.item(goalPos).classList.remove("goal-achived");
    }
}

// checks if nodes values equals the col's goal
function checkCol(col){
    let colGoal = table.rows.item(goalPos).cells.item(col).innerHTML;
    let userInput=[];

    for( let row=0; row< tableSize; row++){
        userInput.push(table.rows.item(row).cells.item(col).innerHTML)
    }

    if (colGoal == parseInt(userInput.join(""), 2).toString(10)) {
        table.rows.item(goalPos).cells.item(col).classList.add("goal-achived");
    } else {
        table.rows.item(goalPos).cells.item(col).classList.remove("goal-achived");
    }
}

function checkGoals(){
    for ( let goal=0;goal< goals.length;goal++){
        if (!goals[goal].classList.contains("goal-achived")) return false;
    }
    return true;
}

function timeReducer() {
    if (roundTime > 0) {
        roundTime--;
    } else {
        window.location.href = `../game-over-page/game-over.html?score=${score}`;
    }
    dispalaySeconds.innerHTML = roundTime;
}

////////////
// runing //
////////////

init();
setInterval(timeReducer, 1000);