var lastpainttime=0
let snakespeed=2
const snakebody=[
    { x:8 , y:8},
]
let inputdirection={ x : 0, y : 0}
let lastinputdirection=inputdirection;
let expendamountt=2;
var score=0;
let snakefood=snakefoodrandomposition()

const gameBoard=document.querySelector(".gameboard")
const scorebox=document.getElementById("score")

function paint(currenttime){
    requestAnimationFrame(paint)
    let seconds=(currenttime-lastpainttime)/1000
    if(seconds < 1/snakespeed) return;
    lastpainttime = currenttime;


    update();
    draw();
}

window.requestAnimationFrame(paint)



function draw(){
    drawsnake();
    drawfood();
}

function update(){
    gameBoard.innerHTML="";
    snakemove();
    snakeeatfood();
}


function drawsnake(){
    snakebody.forEach((segment,index)=>{
    var snakeElement=document.createElement("div");
    snakeElement.style.gridColumnStart= segment.x
    snakeElement.style.gridRowStart= segment.y

   
    if(index==0){
        snakeElement.classList.add("head")
    }
    else{
         snakeElement.classList.add("snake")
    }
    gameBoard.appendChild(snakeElement);
    });
}

function snakemove(){
    inputdirection=getInputdirection();

    for(i=snakebody.length-2; i>=0; i--){
        snakebody[i+1]={...snakebody[i]}
    }
    snakebody[0].x +=inputdirection.x;
    snakebody[0].y +=inputdirection.y;
    snakegameover();
}

function drawfood(){
    var foodElement=document.createElement("div");
    foodElement.style.gridColumnStart= snakefood.x
    foodElement.style.gridRowStart= snakefood.y
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement)
}


function getInputdirection(){
    window.addEventListener("keydown",e=>{
      
        switch(e.key){
            
           case 'ArrowUp' :
            if(lastinputdirection.y==1) break;
             inputdirection = { x : 0, y : -1}
           break;
           case 'ArrowDown' : 
            if(lastinputdirection.y==-1) break;
           inputdirection = { x : 0, y : 1}
           break;
           case 'ArrowRight' : 
            if(lastinputdirection.x==-1) break;
           inputdirection = { x : 1, y : 0}
           break;
           case 'ArrowLeft' : 
           if(lastinputdirection.x==1) break;
           inputdirection = { x : -1, y : 0}
           break;
           default : inputdirection= { x : 0, y : 0};
        }
        
    })
    lastinputdirection=inputdirection;
    return inputdirection;
}

function snakeeatfood(){
    if(isEat()){
        score += 5;
        scorebox.innerHTML=score;
        snakefood=snakefoodrandomposition();
        snakespeed+=0.5;
        snakeexpend();
        }
}

function isEat(){
    return snakebody[0].x===snakefood.x && snakebody[0].y===snakefood.y
}

function snakefoodrandomposition(){
    let a,b, condition=true;

    while(condition){
      a=Math.ceil(Math.random()*16);
      b=Math.ceil(Math.random()*16);

      condition=snakebody.some(segment=>{
        return segment.x===a && segment.y===b;
      })
    }
    return { x:a,y:b};
}

function snakeexpend(){
    for(i=0;i<expendamountt;i++){
       snakebody.push(snakebody.length-1);
    }
} 

function snakegameover(){
    if(snakeoutofgrid() || snakeintersect()){
         location.reload();
         alert("Game Over: You Loose")
         }
}

function snakeoutofgrid(){
    if(snakebody[0].x < 0 || snakebody[0].x > 16 || snakebody[0].y < 0 || snakebody[0].y > 16)
        return true;
}


function snakeintersect(){
    for(i=1;i<snakebody.length;i++){
         if(snakebody[0].x === snakebody[i].x && snakebody[0].y === snakebody[i].y)
         return true;
    }
}