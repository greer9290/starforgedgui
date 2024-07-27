const categoryDropdown = document.querySelector('select');
const categoryContainer = document.querySelector('#selection-container');
const subcategoryDropdown = document.createElement('select');
const descriptionField = document.createElement('div');
const rollOracleBtn = document.querySelector('button');
const resultsField = document.querySelector('div[id=results]');
const mainContainer = document.querySelector('div[id=main-container]');
const bodySelector = document.querySelector('body');

let originalHeight = `${bodySelector.offsetHeight}px`;

const getData = async () => {
    try {
        const url = 'https://raw.githubusercontent.com/greer9290/starforgedgui/main/dataforged.json'; //raw content link to json for GH pages deployment
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
    const dataRec = data;
    const categories = dataRec.map((obj) => obj['Name']);
    console.log(categories);
    categories.map(oracleName => {
        let oracleOption = document.createElement('option');
        oracleOption.innerText = oracleName;
        categoryDropdown.appendChild(oracleOption);
    })
    
    categoryDropdown.addEventListener("change", () => getSelected())

    const getSelected = async () => {
        while(subcategoryDropdown.firstChild && subcategoryDropdown.removeChild(subcategoryDropdown.firstChild));
        categoryContainer.appendChild(subcategoryDropdown);
        let selected = categoryDropdown.value;
        let subcategoriesTop = dataRec.filter(obj => obj.Name === selected);
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
            let subcategoriesTop = dataRec.filter(obj => obj.Name === selected);
            let subcatOracles = subcategoriesTop.map(obj => obj['Oracles'])
            let selectedSubcatMap = subcatOracles[0].filter(obj => obj['Name'] === selectedSubcat);
            let subcatDescription = selectedSubcatMap[0]['Description'];
            if (subcatDescription) {
                descriptionField.id = "desc-field";
                mainContainer.appendChild(descriptionField);
                descriptionField.textContent = '';
                descriptionField.textContent = subcatDescription;
                bodySelector.style.height = originalHeight;
                bodySelector.style.height = `${bodySelector.offsetHeight + descriptionField.offsetHeight}px`;
            } else {
                if (descriptionField) {
                descriptionField.remove()};
                bodySelector.style.height = originalHeight;
                console.log(bodySelector.offsetHeight);
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
                let rollTable = data[0]['Table'];
                let filteredTable = rollTable.filter(index => ((index['Floor'] <= rollDice && index['Ceiling'] >= rollDice) ? true : false));
                let rollResult = filteredTable[0]['Result'];
                let rollSummary = filteredTable[0]['Summary'];
                let diceRow = document.createElement('tr');
                if (rollSummary) {
                    resultsField.textContent = '';
                    resultsField.textContent =  `${rollSummary}`;
                    diceRow.textContent = `(You rolled a ${rollDice})`
                    resultsField.appendChild(diceRow);
                    
                } else {
                    resultsField.textContent = '';
                    resultsField.textContent = `${rollResult}`;
                    diceRow.textContent = `(You rolled a ${rollDice})`
                    resultsField.appendChild(diceRow);
                }
        });
    })

})   // end of Data scope