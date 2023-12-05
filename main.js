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

