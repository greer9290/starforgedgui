import { oraclesCnt, originalHeight, bodySelector } from "./nav.js"

const categoryDropdown = document.querySelector('select');
const categoryContainer = document.querySelector('div[id=oracles-sel-cnt]');
const subcategoryDropdown = document.createElement('select');
subcategoryDropdown.className = 'category-select';
const descriptionField = document.createElement('span');
const resultsField = document.querySelector('div[id=oracle-results]');
const mainContainer = document.querySelector('div[id=oracles-cnt]');
const rollOracleBtn = document.querySelector('button[id=roll-oracle-btn]');

/** 07/28/2024
 *  TODO: Add background color changes based on color tags in JSON 
 *  TODO: Add other 3 pages
 *  TODO: Add roll + strong hit + weak hit functionality to moves
 *  TODO: Add in images tagged in JSON
 *  TODO: Add full table view
 *  TODO: Add formatting and line breaks in result text
*/

if(oraclesCnt.offsetParent) {
    const getData = async () => {
        try {
            const url = 'https://raw.githubusercontent.com/greer9290/starforgedgui/main/src/data/starforged/oracles.json' //raw content link to json for GH pages deployment
            //const url = '/src/data/starforged/oracles.json'; //for local editing
            const res = await fetch(url);
            let json = await res.json();
            return json;
        }
        catch (error) {
            console.error('Failed to get Starforged Data');
            return [];
        }
    }

    getData().then(data => {
        const categories = data.map((obj) => obj['Name']);
        console.log(categories);
        categories.map(oracleName => {
            let oracleOption = document.createElement('option');
            oracleOption.innerText = oracleName;
            categoryDropdown.appendChild(oracleOption);
        })
    
    categoryDropdown.addEventListener("change", () => getSelected());

		 getSelected();

    const getSelected = async () => {
        while(subcategoryDropdown.firstChild && subcategoryDropdown.removeChild(subcategoryDropdown.firstChild));
        categoryContainer.appendChild(subcategoryDropdown);
        let selected = categoryDropdown.value;
        let subcategoriesTop = data.filter(obj => obj.Name === selected);
        let subcatOracles = subcategoriesTop.map(obj => obj['Oracles'])
        let subcategories = subcatOracles[0].map(obj => obj['Name']);
        subcategories.map(subcatName => {
            let subcatDropdownOption = document.createElement('option');
            subcatDropdownOption.innerText = subcatName;
            subcategoryDropdown.appendChild(subcatDropdownOption);    
        })
    }

    subcategoryDropdown.addEventListener("change", () => getSelectedSub());

    const getSelectedSub = async () => {
        let selected = categoryDropdown.value;
        let selectedSubcat = subcategoryDropdown.value;
        if (selectedSubcat) {
            let subcategoriesTop = data.filter(obj => obj.Name === selected);
            let subcatOracles = subcategoriesTop.map(obj => obj['Oracles'])
            let selectedSubcatMap = subcatOracles[0].filter(obj => obj['Name'] === selectedSubcat);
            let subcatDescription = selectedSubcatMap[0]['Description'];
            if (subcatDescription) {
                descriptionField.className = "desc-field";
                descriptionField.textContent = '';
                descriptionField.textContent = subcatDescription;
                descriptionField.style.overflow = "scroll";
                descriptionField.style.height = "35vh";
                descriptionField.style.fontSize = "0.8em";
                mainContainer.appendChild(descriptionField);
            } else {
                if (descriptionField) {
                descriptionField.remove()};
            }
            return selectedSubcatMap;
        } else {
            alert("Please select a subcategory!");
            return;
        } 
    }

    rollOracleBtn.addEventListener("click", () => {
        let rollDice = Math.round((Math.random(1)*100));
        if (rollDice == 0) {
            rollDice = 1;
        }
        console.log(rollDice);
        getSelectedSub().then(data => {
            if (subcategoryDropdown.value === 'Name') {
                givenNameTable = data[0]['Oracles'][0]['Table'];
                familyNameTable = data[0]['Oracles'][1]['Table'];
                callsignTable = data[0]['Oracles'][2]['Table'];
                givenName = givenNameTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false))[0]['Result'];
                familyName = familyNameTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false))[0]['Result'];
                callsign = callsignTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false))[0]['Result'];
                let rollResult = `${givenName} ${familyName}, Callsign: ${callsign}`;
                appendResult(rollResult);
            } else { 
                let rollTable = data[0]['Table'];
                let filteredTable = rollTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false));
                let rollResult = filteredTable[0]['Result'];
                appendResult(rollResult);
            }
            function appendResult(results){
                let diceRow = document.createElement('tr');
                diceRow.className = "dice-result";
                resultsField.textContent = '';
                resultsField.style.fontSize = "1.1em";
                resultsField.style.fontStyle = "bold";
                resultsField.textContent = `${results}`;
                diceRow.textContent = `(You rolled a ${rollDice})`
                resultsField.appendChild(diceRow);
            }
        });
    })
})
}  // end of Data scope