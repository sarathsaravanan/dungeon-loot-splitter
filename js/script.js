let lootItems = [];

// listens for the clicks on our main buttons
document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", updateUI);
document.getElementById("partySize").addEventListener("input", updateUI);

function addLoot() {
    let nameInput = document.getElementById("lootName").value;
    let valueInput = document.getElementById("lootValue").value;
    let qtyInput = document.getElementById("lootQuantity").value;
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

    if (qtyInput === "" || Number(qtyInput) < 1) {
        errorMsg.innerHTML = "Error: Please enter a valid quantity of 1 or more.";
        return;
    }

    // new object to bundle the name and value together
    let newItem = {
        name: nameInput,
        value: Number(valueInput),
        quantity: Number(qtyInput)
    };

    // adds the new items into our master array
    lootItems.push(newItem);

    document.getElementById("lootName").value = "";
    document.getElementById("lootValue").value = "";
    document.getElementById("lootQuantity").value = "1";

    updateUI();
}

function removeLoot(index) {
    lootItems.splice(index, 1);
    updateUI();
}

// function to update teh screen to show the newly added item
function updateUI() {
    let partySizeInput = document.getElementById("partySize").value;
    let partySize = Number(partySizeInput);
    
    let lootRows = document.getElementById("lootRows");
    let noLootMessage = document.getElementById("noLootMessage");
    let lootTableContainer = document.getElementById("lootTableContainer");
    let runningTotalDisplay = document.getElementById("runningTotal");
    
    let splitBtn = document.getElementById("splitLootBtn");
    let splitResults = document.getElementById("splitResults");
    let finalTotalDisplay = document.getElementById("finalTotal");
    let lootPerMemberDisplay = document.getElementById("lootPerMember");

    lootRows.innerHTML = ""; 
    let total = 0;

    // loop through the entire array to build the list items and sum up the value
    for (let i = 0; i < lootItems.length; i++) {
        total = total + (lootItems[i].value * lootItems[i].quantity);

        let row = document.createElement("div");
        row.className = "loot-row";

        let nameCell = document.createElement("div");
        nameCell.className = "loot-cell";
        nameCell.innerText = lootItems[i].name;

        let valueCell = document.createElement("div");
        valueCell.className = "loot-cell";
        valueCell.innerText = "$" + lootItems[i].value.toFixed(2);

        let quantityCell = document.createElement("div");
        quantityCell.className = "loot-cell";
        quantityCell.innerText = lootItems[i].quantity;

        let actionCell = document.createElement("div");
        actionCell.className = "loot-cell loot-actions";
        
        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.addEventListener("click", function () {
            removeLoot(i);
        });

        actionCell.appendChild(removeBtn);
        row.appendChild(nameCell);
        row.appendChild(valueCell);
        row.appendChild(quantityCell);
        row.appendChild(actionCell);
        
        lootRows.appendChild(row);
    }

    // just displays the total on the screen, forced 2 decimal places like real money
    runningTotalDisplay.innerHTML = total.toFixed(2);

    let isValidState = true;

    // stops the math entirely if the array is empty
    if (lootItems.length === 0) {
        noLootMessage.classList.remove("hidden");
        lootTableContainer.classList.add("hidden");
        isValidState = false; 
    } else {
        noLootMessage.classList.add("hidden");
        lootTableContainer.classList.remove("hidden");
    }

    // ensures we have at least one person to give loot
    if (partySize < 1 || partySizeInput === "") {
        isValidState = false; 
    }

    if (isValidState) {
        splitBtn.disabled = false;
        splitResults.classList.remove("hidden");
        
        // divide the total gold by the number of party members
        let splitAmount = total / partySize;
        
        // final math showcased on screen, formatted into currency
        finalTotalDisplay.innerHTML = total.toFixed(2);
        lootPerMemberDisplay.innerHTML = splitAmount.toFixed(2);
    } else {
        splitBtn.disabled = true;
        splitResults.classList.add("hidden");
    }
}

updateUI();