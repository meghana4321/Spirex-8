
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const emptyMessage = document.getElementById("emptyMessage");

let expenses = JSON.parse(
    localStorage.getItem("expenses")
) || [];

// Format amount into Indian currency
function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR"
    }).format(amount);
}

// Calculate total expenses
function calculateTotal() {
    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount, 0
    );

    totalAmount.textContent = formatAmount(total);
}

// Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    emptyMessage.style.display =
        expenses.length === 0 ? "block" : "none";

    expenses.forEach((expense) => {

        const li = document.createElement("li");
        li.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const title = document.createElement("strong");
        title.textContent = expense.description;

        const category = document.createElement("small");
        category.textContent = expense.category;

        details.appendChild(title);
        details.appendChild(category);

        const right = document.createElement("div");
        right.className = "expense-right";

        const amount = document.createElement("span");
        amount.className = "expense-amount";
        amount.textContent = formatAmount(expense.amount);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            deleteExpense(expense.id);
        });

        right.appendChild(amount);
        right.appendChild(deleteBtn);

        li.appendChild(details);
        li.appendChild(right);

        expenseList.appendChild(li);
    });

    calculateTotal();

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}

// Add a new expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description =
        document.getElementById("description").value.trim();

    const amount =
        Number(document.getElementById("amount").value);

    const category =
        document.getElementById("category").value;

    if (!description || !category ||
        !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        id: Date.now() + Math.random(),
        description: description,
        amount: amount,
        category: category
    };

    expenses.push(expense);

    displayExpenses();

    expenseForm.reset();
});

// Delete an expense
function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    displayExpenses();
}

// Initial display
displayExpenses();
