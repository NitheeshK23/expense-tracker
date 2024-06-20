let tableEntries = []; // Empty array for expense entries

let currentFilter = 'all'; // To keep track of the current filter
let isSorted = false; // To keep track of the sort state

// Function to update data expense summary
function updateSummary() {
    let totalIncome = tableEntries.reduce((t, e) => {
        if (e.type === 1) t += e.amount;
        return t;
    }, 0);
    let totalExpense = tableEntries.reduce((ex, e) => {
        if (e.type === 0) ex += e.amount;
        return ex;
    }, 0);
    updatedInc.innerText = totalIncome;
    updatedExp.innerText = totalExpense;
    updatedBal.innerText = totalIncome - totalExpense;
}

// Function to add new entry to the dataset and expense table
function addItem() {
    let type = itemType.value;
    let name = document.getElementById("name");
    let amount = document.getElementById("amount");

    // Input validation
    if (name.value === "" || Number(amount.value) === 0)
        return alert("Incorrect Input");
    if (Number(amount.value) <= 0)
        return alert(
            "Incorrect amount! can't add negative"
        );

    // Push new data
    tableEntries.push({
        type: Number(type),
        name: name.value,
        amount: Number(amount.value),
    });

    updateTable();
    name.value = "";
    amount.value = 0;
}

// Function to load all entry in the expense table
function loadItems(e, i) {
    let cls;

    let table = document.getElementById("table");
    let row = table.insertRow(i + 1);
    let cell0 = row.insertCell(0);
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let c3 = row.insertCell(3);
    let c4 = row.insertCell(4);
    let c5 = row.insertCell(5);
    cell0.innerHTML = i + 1;
    cell1.innerHTML = e.name;
    cell2.innerHTML = e.amount;
    c5.innerHTML = "☒";
    c5.classList.add("zoom");
    c5.addEventListener("click", () => del(e));
    if (e.type == 0) {
        cls = "red";
        c3.innerHTML = "➚";
    } else {
        cls = "green";
        c3.innerHTML = "➘";
    }
    c3.style.color = cls;
    c4.innerHTML = "✎";
    c4.classList.add("zoom");
    c4.addEventListener("click", () => edit(e));
}

// Clear the table before updating
function remove() {
    while (table.rows.length > 1) table.deleteRow(-1);
}

// Function to delete a specific entry
function del(el) {
    remove();
    tableEntries = tableEntries.filter(
        (e) => e.name !== el.name
    );
    tableEntries.map((e, i) => loadItems(e, i));
    updateSummary();
}

// Function to edit a specific entry
function edit(el) {
    document.getElementById("itemType").value = el.type;
    document.getElementById("name").value = el.name;
    document.getElementById("amount").value = el.amount;
    del(el); // Remove the old entry
}

// Function to filter items by type
function filterItems(type) {
    currentFilter = type;
    updateTable();
}

// Function to sort items by amount
function sortItems() {
    isSorted = !isSorted;
    tableEntries.sort((a, b) => isSorted ? a.amount - b.amount : b.amount - a.amount);
    updateTable();
}

// To render all entries
function updateTable() {
    remove();
    let filteredEntries = tableEntries.filter((e) => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'income') return e.type === 1;
        if (currentFilter === 'expense') return e.type === 0;
    });
    filteredEntries.map((e, i) => {
        loadItems(e, i);
    });
    updateSummary();
}

// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

updateTable();
