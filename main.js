// ----------------------customised selector -----------------------------------------//
function selector(clasName) {
  return document.querySelector(`.${clasName}`);
}
// ------------------------------ function for custom alert------------------------//

function cAlert(title, masg) {
    popUp.querySelector("h2").innerText = title;
    popUp.querySelector("p").innerText = masg;
  }

// -----------------------DOM Elements targeted--------------------------------------//

let popWrapper = selector("pop-wrapper");
let popOk = selector("pop-ok");
let formAddBtn = selector("add-deposit");
let popUp = selector("pop-up");
let toggler = selector("W-D")

// ---------------------------GLOBAL VARIABLES--------------------------------------//
let PopUpResponse = false;
let isWitdrawl = false;

//------------------- customizing selector and event listeners----------------------//

function onClick(element, task) {
  element.addEventListener("click", task);
}

// ----------------------adding customised event listeners--------------------------//
onClick(popOk, (e) => {
  e.stopPropagation();
  popWrapper.style.display = "none";
  PopUpResponse = true;
});

onClick(popWrapper, (e) => {
  e.stopPropagation();
  popWrapper.style.display = "none";
  popUp.style.display = "none";
  PopUpResponse = false;
});

//-------------------------toggling witdrawl or deposit for the form------------------//
onClick(toggler,()=>{
    if(!isWitdrawl){
        toggler.innerText='Witdrawl';
        toggler.style.background='red'
        isWitdrawl=true;
    }else{
        toggler.innerText='Deposit';
        toggler.style.background='green'
        isWitdrawl=false; 
    }
})
onClick(formAddBtn, (e) => {
  e.preventDefault();
  formAmount = selector("form-amount").value;
  formNote = selector("form-note").value;
  popWrapper.style.display = "flex";
  popUp.style.display = "block";
  if (formAmount > 0 || formAmount != "") {

    cAlert(toggler.innerText+"ed", toggler.innerHTML+" amount: "+formAmount+" INR");
    document.querySelectorAll("input").forEach((e) => (e.value = ""));

    return;
  }
  cAlert("Heyy !!", "Please fill out the input fields?");
  document.querySelectorAll("input").forEach((e) => (e.value = ""));
});

// -------------------------------on clicking each row line-----------------------//

document.querySelectorAll(".row-line").forEach((line) => {
  onClick(line, () => {
    masg = line.querySelector(".boxes-note").innerText;
    title =
      line.querySelector(".boxes-type").innerText +
      "ed " +
      line.querySelector(".boxes-amount").innerText;
    cAlert(title, masg);
    popWrapper.style.display = "flex";
    popUp.style.display = "block";
  });
});

// -------------------------drag to move calculator------------------------------//
let dragstarted = false;
let calcBar = selector("calc-bar")
let wholeCalc = selector("calculator-screen");

calcBar.onmousedown = () => {
  dragstarted = true;
}

calcBar.onmouseup = () => {
  dragstarted = false;
}

window.addEventListener("mousemove", e => {
  if (dragstarted) {
    movecalc(e);
  }
});

function movecalc(e) {
  if (dragstarted) {
    let newX = e.clientX;
    let newY = e.clientY;

    newX = Math.max(newX, 0);
    newY = Math.max(newY, 0);

    newY = Math.min(newY, window.innerHeight - wholeCalc.clientHeight);

    wholeCalc.style.top = newY + "px";
    wholeCalc.style.left = newX + "px";
  }
}

// -------------------------on clicking the mkinimize button --------------------------//

let minimizer = selector("minimize-calc");
let calcDialpad = selector("calc-dialpad");
let calcScreen = selector("screen");
let calcMeta = selector("calc-meta");
let isMinimized = null;
let opencalc = selector("calculator");

opencalc.onclick = () => {
  wholeCalc.style.display = "block";
  isMinimized = false;
}

minimizer.onclick = () => {
  if (isMinimized === false) {
    wholeCalc.style.height = 15 + "vmin";
    wholeCalc.style.top = 80 + "vh";
    wholeCalc.style.left = 83 + "vw";
    calcDialpad.style.display = "none";
    calcScreen.style.display = "none";
    isMinimized = true;
    minimizer.innerText="Maximize"
  } else {
    wholeCalc.style.height = 70 + "vmin";
    wholeCalc.style.top = 13 + "%";
    wholeCalc.style.right = -3 + "%";
    calcDialpad.style.display = "grid";
    calcScreen.style.display = "flex";
    isMinimized = false;
    minimizer.innerText="Minimize"

  }
}


// ------------------------calculator functioning------------------------------//
let resultSreen= selector("result-screen");
let historySreen= selector("history-screen");
let c = selector("c")
let AC = selector("ac")

function display(e){
  resultSreen.innerHTML+=e
}

AC.onclick=()=>{
  historySreen.innerHTML=''
  resultSreen.innerHTML=''
}

function equal(){
  historySreen.innerHTML= resultSreen.innerHTML;
  resultSreen.innerHTML=eval( resultSreen.innerHTML)
}
