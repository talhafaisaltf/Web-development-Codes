
const selectForm = document.querySelector(".budget-form");
const selectBudget = document.querySelector(".budget-input");
const selectBtn = document.querySelector(".budget-submit");
const budgetAmount = document.querySelector("#budget-amount");
const selectExpenseList = document.querySelector(".expense-list");
const expenseAmountTotal = document.querySelector("#expense-amount");

selectForm.addEventListener("submit", function(e){
    e.preventDefault();
    const currentElement = selectBudget.value;
    // console.log(selectForm, "selectForm")
    // if(!currentElement, confirm("Please Enter Your Budget")){
    //     return;
    // }
    budgetAmount.innerText = currentElement;
    selectBudget.value = "";
    updateTotal();
})

const selectExpenseForm = document.querySelector(".expense-form");
const selectExpenseInput = document.querySelector("#expense-input");
const selectAmount = document.querySelector("#amount-input");
const selectList = document.querySelector(".expense-list");

selectExpenseForm.addEventListener("submit", function(e){
    e.preventDefault();
    const currentElement = selectExpenseInput.value;
    const currentAmount = selectAmount.value;
    // console.log(selectExpenseForm, "selectExpenseForm");
    if(!currentElement){
        alert("Please Enter Your Expense");
        return;
    }
    if(!currentAmount){
        alert("Please Enter Your Expense amount");
        return;
    }

    const createLi = document.createElement("div");
    createLi.className = ".expense-list";
    createLi.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

     <h6 class="expense-title mb-0 text-uppercase list-item">- ${currentElement}</h6>
     <h5 class="expense-amount mb-0 list-item">${currentAmount}</h5>

     <div class="expense-icons list-item">

      
      <a href="#" class="delete-icon" data-id="${expense.id}">
       <i class="fas fa-trash"></i>
      </a>
     </div>
    </div>`

   selectList.append(createLi);
   selectExpenseInput.value = "";
   selectAmount.value = "";
   updateTotal();
})

// function updateTotal(){
//     const selectAllList = document.querySelector(".expense-list .expense-item");
//     // console.log(selectAllList, "selectAllList");
//     if(selectAllList?.length > 0){
//         let total = 0;
//         selectAllList.forEach(function(singleExpense){
//             const expensePrice = (singleExpense.querySelector(".expense-amount").innerText);
//             total += expensePrice;
//         })
//         expensePriceTotal.innerText = total;
//         const expenseAmountFinal = document.querySelector('#expense-amount').innerText;
//         const budgetFinal = document.querySelector("#budget-amount");
//         let totalPrice = 0;
//         totalPrice -= expenseAmountFinal - budgetFinal;
//         let balaceAmount = document.querySelector("#balance-amount");
//       balaceAmount.innerText = totalPrice;
//      }else {
//         let total = 0;
//         expensePriceTotal.innerText = total;
//         // updateExpenseTotal()
//     }

// }

function updateTotal() {
     const selectExpenseRow = document.querySelectorAll(".expense-list .expense-item");
        if(selectExpenseRow?.length > 0){
            let total = 0;
             selectExpenseRow.forEach(function(singleRow) {
             const expenseAmount = parseFloat(singleRow.querySelector(".expense-amount").innerText);
               total += expenseAmount;
             })
            expenseAmountTotal.innerText = total;
          const expenseAmountTotalFinal = parseFloat(document.querySelector("#expense-amount").innerText);
          const budgetAmount = parseFloat(document.querySelector("#budget-amount").innerText)
          // console.log(expenseAmountTotalFinal)
          // console.log(budgetAmount)
          let totalPrice = 0;
          totalPrice -= expenseAmountTotalFinal - budgetAmount;
          // console.log(totalPrice)
          let balaceAmount = document.querySelector("#balance-amount");
          balaceAmount.innerText = totalPrice;
         }else {
            let total = 0;
            expenseAmountTotal.innerText = total;
            // updateExpenseTotal()
         }
       }

selectList.addEventListener("click", function(e){
        const currentElement = e.target;
        // console.log(currentElement);
        if(currentElement.classList.contains(".fas fa-trash") && confirm("Are you sure?")){
          currentElement.parentElement.parentElement.parentElement.remove();
          // console.log(currentElement);
          // currentElement.closest(remove);
          updateTotal();
        }
       })