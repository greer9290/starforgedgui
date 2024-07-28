const navBtn = document.querySelector('button#shownav');
const navBar = document.querySelector('nav');
const navImg = document.getElementById('navmenubtn');
export const bodySelector = document.querySelector('body');
export const oraclesBtn = document.getElementById('oracles-btn');
export const movesBtn = document.getElementById('moves-btn');
export const encountersBtn = document.getElementById('encounters-btn');
export const assetsBtn = document.getElementById('assets-btn');
export const truthsBtn = document.getElementById('truths-btn');
export const oraclesCnt = document.getElementById('oracles-cnt');
export const movesCnt = document.getElementById('moves-cnt');
export const encountersCnt = document.getElementById('encounters-cnt');
export const assetsCnt = document.getElementById('assets-cnt');
export const truthsCnt = document.getElementById('truths-cnt');
export let originalHeight = `${bodySelector.offsetHeight}px`;
let navSet = 1;


navBtn.style.left = `${navBar.offsetWidth}px`;
hideNav();

function hideNav(){
    navBar.style.display = "none";
    navBtn.style.left = "0px";
    navImg.style.opacity = "100%";
};

navBtn.addEventListener("click", () => {
    navSet = !navSet;
    if (navSet == 0) {
        navBar.style.display = "grid";
        navBtn.style.left = `${navBar.offsetWidth}px`;
        navImg.style.opacity = "20%";
    } else {
        hideNav();
    }

});

//Nav Button and Page Handling
oraclesBtn.addEventListener("click", () => {
    oraclesCnt.style.display = "grid";
    movesCnt.style.display = "none";
    encountersCnt.style.display = "none";
    assetsCnt.style.display = "none";
    truthsCnt.style.display = "none";
});

movesBtn.addEventListener("click", () => {
    oraclesCnt.style.display = "none";
    movesCnt.style.display = "grid";
    encountersCnt.style.display = "none";
    assetsCnt.style.display = "none";
    truthsCnt.style.display = "none";
});

encountersBtn.addEventListener("click", () => {
    oraclesCnt.style.display = "none";
    movesCnt.style.display = "none";
    encountersCnt.style.display = "grid";
    assetsCnt.style.display = "none";
    truthsCnt.style.display = "none";
});

assetsBtn.addEventListener("click", () => {
    oraclesCnt.style.display = "none";
    movesCnt.style.display = "none";
    encountersCnt.style.display = "none";
    assetsCnt.style.display = "grid";
    truthsCnt.style.display = "none";
});

truthsBtn.addEventListener("click", () => {
    oraclesCnt.style.display = "none";
    movesCnt.style.display = "none";
    encountersCnt.style.display = "none";
    assetsCnt.style.display = "none";
    truthsCnt.style.display = "grid";
});