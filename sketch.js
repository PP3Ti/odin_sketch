let gridSize = 64;          //set default gridsize
let numOfSquares = gridSize * gridSize;
let drawing = true;             // start the game with drawing enabled
const gameSpace = document.querySelector(".game");   // select game area
let currentPaint = "black";

const slider = document.getElementById("gridSizeSlider");       //display slider value
let output = document.getElementById("gridSliderValue");
output.innerHTML = `<p style="text-align:center">${slider.value} x ${slider.value}</p>`; 

slider.oninput = function(){                        //set grid size to slider value
    output.innerHTML = `<p style="text-align:center">${slider.value} x ${slider.value}</p>`;
    gridSize = slider.value;
}
function createGrid(gridSize){
    const gameContainer = document.querySelector(".game");              
    gameContainer.style.gridTemplate = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;

    for(let i = 0; i < (numOfSquares); i++){                    // create square divs and give them unique id
        const square = document.createElement("div");
        square.classList.add("square");
        square.setAttribute("id", `square${i}`);
        gameContainer.appendChild(square);
    }
}
function randomHslColor() {                                     // geenrate random vibrating color
    return 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 1)';
}
function resetCanvas(){
    gameSpace.addEventListener("mouseover", paint);     // always enable draw on reset
    drawing = true;  

    const squares = document.querySelectorAll(".square");       // reset color of squares 
    squares.forEach(element => {
        element.style.cssText = "background:white"
    });
}
function setGridResolution(){
    createGrid(gridSize);
    resetCanvas();
}
function paint(e){                                      // color squares with desired color
    if (e.target.classList.contains("square")){
        switch(currentPaint){                       
            case "rainbow": e.target.style.cssText = `background:${randomHslColor()}`; break
            default: e.target.style.cssText = "background:black";
        }
    }
}

createGrid(gridSize);       // create first canvas

gameSpace.addEventListener("mouseover", paint);
gameSpace.addEventListener("mousedown", function toggleDrawing(){           // clicking toggles the drawing
    switch(drawing) {
        case true: gameSpace.removeEventListener("mouseover", paint); drawing = false; break
        case false: gameSpace.addEventListener("mouseover", paint); drawing = true; break
        default: console.log("something is really broken");
    }
})

const resetButton = document.getElementById("resetCanvas");    // give reset button functionality
resetButton.addEventListener("click", resetCanvas);

const paintItBlackButton = document.getElementById("paintBlack");       // set paint color to black
paintItBlackButton.addEventListener("click", function(){    
    currentPaint = "black";
});

const rainbowButton = document.getElementById("rainbow");   // set paint color to random
rainbowButton.addEventListener("click", function(){
    currentPaint = "rainbow";
})

const setGridButton = document.getElementById("setGridResolutionButton");
setGridButton.addEventListener("click", setGridResolution);
