let lootItems = [];

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);

function addLoot() {
    let nameInput = document.getElementById("lootName").value;
    let valueInput = document.getElementById("lootValue").value;
    let errorMsg = document.getElementById("lootError");

    errorMsg.innerHTML = "";

    if (nameInput === "") {
        errorMsg.innerHTML = "Error: Please enter a loot name.";
        return;
    }

    if (valueInput === "" || Number(valueInput) < 0) {
        errorMsg.innerHTML = "Error: Please enter a valid positive number for loot value.";
        return;
    }

    let newItem = {
        name: nameInput,
        value: Number(valueInput)
    };

    lootItems.push(newItem);

    document.getElementById("lootName").value = "";
    document.getElementById("lootValue").value = "";

    renderLoot();
}

function renderLoot() {
    let displayList = document.getElementById("lootDisplay");
    let runningTotalDisplay = document.getElementById("runningTotal");

    displayList.innerHTML = "";
    
    let total = 0;

    for (let i = 0; i < lootItems.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = lootItems[i].name + " - $" + lootItems[i].value.toFixed(2);
        displayList.appendChild(li);

        total = total + lootItems[i].value;
    }

    runningTotalDisplay.innerHTML = total.toFixed(2);
}

function splitLoot() {
    let partySize = document.getElementById("partySize").value;
    let splitErrorMsg = document.getElementById("splitError");
    let finalTotalDisplay = document.getElementById("finalTotal");
    let lootPerMemberDisplay = document.getElementById("lootPerMember");

    splitErrorMsg.innerHTML = "";

    if (partySize === "" || Number(partySize) < 1) {
        splitErrorMsg.innerHTML = "Error: Party size must be 1 or greater.";
        return;
    }

    if (lootItems.length === 0) {
        splitErrorMsg.innerHTML = "Error: No loot has been added yet.";
        return;
    }

    let total = 0;
    
    for (let i = 0; i < lootItems.length; i++) {
        total = total + lootItems[i].value;
    }

    let splitAmount = total / Number(partySize);

    finalTotalDisplay.innerHTML = total.toFixed(2);
    lootPerMemberDisplay.innerHTML = splitAmount.toFixed(2);
}