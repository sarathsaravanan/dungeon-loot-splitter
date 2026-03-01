let lootItems = [];

// listens for the clicks on our main buttons
document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);

function addLoot() {
    let nameInput = document.getElementById("lootName").value;
    let valueInput = document.getElementById("lootValue").value;
    let errorMsg = document.getElementById("lootError");
    // clears our any old error messages before checking new unputs
    errorMsg.innerHTML = "";
    // conditional to prevent the user from submitting if they forgot the item name (if it's empty)
    if (nameInput === "") {
        errorMsg.innerHTML = "Error: Please enter a loot name.";
        return;
    }
    // this prevents the user from submitting no value or a negative value
    if (valueInput === "" || Number(valueInput) < 0) {
        errorMsg.innerHTML = "Error: Please enter a valid positive number for loot value.";
        return;
    }
    // new object to bundle the name and value together
    let newItem = {
        name: nameInput,
        value: Number(valueInput)
    };
    // adds the new items into our master array
    lootItems.push(newItem);

    document.getElementById("lootName").value = "";
    document.getElementById("lootValue").value = "";

    renderLoot();
}
// function to update teh screen to show the newly added item
function renderLoot() {
    let displayList = document.getElementById("lootDisplay");
    let runningTotalDisplay = document.getElementById("runningTotal");

    displayList.innerHTML = "";
    
    let total = 0;
    // loop through the entire array to build the list items and sum up the value
    for (let i = 0; i < lootItems.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = lootItems[i].name + " - $" + lootItems[i].value.toFixed(2);
        displayList.appendChild(li);

        total = total + lootItems[i].value;
    }
    // just displays the total on the screen, forced 2 decimal places like real money
    runningTotalDisplay.innerHTML = total.toFixed(2);
}

function splitLoot() {
    let partySize = document.getElementById("partySize").value;
    let splitErrorMsg = document.getElementById("splitError");
    let finalTotalDisplay = document.getElementById("finalTotal");
    let lootPerMemberDisplay = document.getElementById("lootPerMember");
    // clears old errors before calculating
    splitErrorMsg.innerHTML = "";
    // ensures we have at least one person to give loot
    if (partySize === "" || Number(partySize) < 1) {
        splitErrorMsg.innerHTML = "Error: Party size must be 1 or greater.";
        return;
    }
    // stops the math entirely if the array is empty
    if (lootItems.length === 0) {
        splitErrorMsg.innerHTML = "Error: No loot has been added yet.";
        return;
    }

    let total = 0;
    // loop through everything one more time to get the final total for splitting 
    for (let i = 0; i < lootItems.length; i++) {
        total = total + lootItems[i].value;
    }
    // divide the total gold by the number of party members
    let splitAmount = total / Number(partySize);
    // final math showcased on screen, formatted into currency
    finalTotalDisplay.innerHTML = total.toFixed(2);
    lootPerMemberDisplay.innerHTML = splitAmount.toFixed(2);
}
