import { movesCnt, movesBtn, bodySelector, originalHeight } from "./nav.js";

const moveDropdown = document.querySelector("select[id=moves]");
const movesSelectCnt = document.querySelector('div[id=moves-select-cnt]');
const movesSubcatDropdown = document.createElement('select');
movesSubcatDropdown.className = 'category-select';
const movesDescField = document.createElement('span');
movesDescField.setAttribute("markdown", "1");
const movesContainer = document.querySelector('div[id=moves-cnt]');
const rollMoveBtn = document.querySelector('button[id=roll-move-btn]');

    const getData = async () => {
        try {
            const url = '/src/data/starforged/moves.json'; //raw content link to json for GH pages deployment
            const res = await fetch(url);
            let json = await res.json();
            return json;
        }
        catch (error) {
            console.error('Failed to get Starforged Data');
            return [];
        }
        }

    movesBtn.addEventListener("click", () => {getData().then(data => {
        const moveTypes = data.map((obj) => obj['Name']);
        console.log(moveTypes);
        moveTypes.map(moveName => {
            let moveOption = document.createElement('option');
            moveOption.innerText = moveName;
            moveDropdown.appendChild(moveOption);
        })

    moveDropdown.addEventListener("change", () => getSelected())

    const getSelected = async () => {
        while(movesSubcatDropdown.firstChild && movesSubcatDropdown.removeChild(movesSubcatDropdown.firstChild));
        movesSelectCnt.appendChild(movesSubcatDropdown);
        let selected = moveDropdown.value;
        let subcategoriesTop = data.filter(obj => obj.Name === selected);
        let subcatMoves = subcategoriesTop.map(obj => obj['Moves'])
        let subcategories = subcatMoves[0].map(obj => obj['Name']);
        subcategories.map(subcatName => {
            let subcatDropdownOption = document.createElement('option');
            subcatDropdownOption.innerText = subcatName;
            movesSubcatDropdown.appendChild(subcatDropdownOption);    
        })
    }

    movesSubcatDropdown.addEventListener("change", () => getSelectedSub());

    const getSelectedSub = async () => {
        let selected = moveDropdown.value;
        let selectedSubcat = movesSubcatDropdown.value;
        if (selectedSubcat) {
            let subcategoriesTop = data.filter(obj => obj.Name === selected);
            let subcatMoves = subcategoriesTop.map(obj => obj['Moves'])
            let selectedSubcatMap = subcatMoves[0].filter(obj => obj['Name'] === selectedSubcat);
            let subcatDescription = selectedSubcatMap[0]['Text'];
            if (subcatDescription) {
                movesDescField.className = "desc-field";
                movesDescField.textContent = '';
                movesDescField.textContent = subcatDescription;
                movesDescField.style.overflow = "scroll";
                movesDescField.style.height = "35vh";
                movesDescField.style.fontSize = "0.8em";
                movesContainer.appendChild(movesDescField);
            } else {
                if (movesDescField) {
                movesDescField.remove()};
            }
            return selectedSubcatMap;
        } else {
            alert("Please select a subcategory!");
            return;
        } 
    }

    rollMoveBtn.addEventListener("click", () => {
        let rollDice = Math.round((Math.random(1)*100));
        if (rollDice == 0) {
            rollDice = 1;
        }
        console.log(rollDice);
        getSelectedSub().then(data => {
            console.table(data);
            let rollTable = data[0]['Table'];
            let filteredTable = rollTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false));
            let rollResult = filteredTable[0]['Result'];
            appendResult(rollResult);
            
            function appendResult(results){
                let diceRow = document.createElement('tr');
                diceRow.className = "dice-result";
                resultsField.textContent = '';
                resultsField.textContent = `${results}`;
                diceRow.textContent = `(You rolled a ${rollDice})`
                resultsField.appendChild(diceRow);
            }
        });
    })

    
    
})

})
