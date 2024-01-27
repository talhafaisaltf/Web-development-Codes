// const selectAllAddToCartBtn = document.querySelector(".custom-shop-container");
// const selectCartRow = document.querySelector(".cart-items");

// selectAllAddToCartBtn.addEventListener("click", function (e) {
//   e.preventDefault();
//   const currentElement = e.target;

//   if (currentElement.classList.contains("shop-item-button")) {
//     const shopItemDiv = currentElement.closest(".shop-item");
//     const cartName = shopItemDiv.querySelector(".shop-item-title");
//     const cartImage = shopItemDiv.querySelector(".shop-item-image");
//     const cartPrice = shopItemDiv.querySelector(".shop-item-price");

//     const selectAllCartRow = document.querySelector(".cart-items .cart-row");

//     let cartItem = false;

//     if(selectAllCartRow?.length > 0){
//       selectAllCartRow?.forEach(function(singleCartRow){
//         const singleCartName = singleCartRow.querySelector(".cart-item-title");
//         if (cartName?.innerText == singleCartRow?.innerText){
//           cartItem = true;
//         }
//       });
//     }

//     const createCartRowEl = document.createElement("div");
//     createCartRowEl.className = "cart-row";
//     createCartRowEl.innerHTML = `<div class="cart-item cart-column">
//          <img
//            class="cart-item-image"
//            src="${cartImage?.src}"
//            width="100"
//            height="100"
//          />
//          <span class="cart-item-title">${cartName?.innerText}</span>
//        </div>
//        <span class="cart-column">
//          $ <span class="cart-price-item-item">${cartPrice?.innerText}</span>
//        </span>
//        <div class="cart-quantity cart-column">
//          <input class="cart-quantity-input" type="number" value="1" />
//          <button class="btn btn-danger btn-remove" type="button">
//            REMOVE
//          </button>
//        </div>`;

//     selectCartRow.append(createCartRowEl);

//     updateCartTotal();
//   }
// });
// function updateCartTotal(){
//   const selectAllCartRow = document.querySelectorAll(".cart-items .cart-row");
//   const cartTotalPriceElement = document.querySelector(".cart-total-price");

//   if (selectAllCartRow?. lenght > 0){
//     let total = 0;

//     selectAllCartRow.forEach(function(singleCartRow){
//       const cartPrice = singleCartRow.querySelector(".cart-price-item-item")?.innerText;
//       const cartQuantity = singleCartRow.querySelector(".cart-quantity-input");

//       total += cartPrice * cartQuantity?.value;
//       cartQuantity.addEventListener("change", function(e){
//         const currentElement = e.target;
//         if (currentElement.value <= 0) {
//           currentElement.value = 1;
//         }
//         updateCartTotal();
//       });
//     });

//     const totalPrice = document.querySelector(".cart-total-price");

//     totalPrice.innerText = `$ ${total.toFixed(2)}`;
//   } else {
//     cartTotalPriceElement.innerText = `$ 0`
//   }
// }

// selectCartRow.addEventListener("click", function (event) {
//   // console.log(event.target, "event.target");
//   const currentElement = event.target;

//   if (
//     currentElement?.classList?.contains("btn-remove") &&
//     confirm("Are you sure ?")
//   ) {
//     currentElement.parentElement.parentElement.remove();
//     updateCartTotal();
//   }
// });

const selectAllAddToCartBtn = document.querySelector(".custom-shop-container");
const selectCartRow = document.querySelector(".cart-items");

selectAllAddToCartBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const currentElement = e.target;

  if (currentElement.classList.contains("shop-item-button")) {
    const shopItemDiv = currentElement.closest(".shop-item");
    const cartName = shopItemDiv.querySelector(".shop-item-title");
    const cartImage = shopItemDiv.querySelector(".shop-item-image");
    const cartPrice = shopItemDiv.querySelector(".shop-item-price");

    //CHECK IF THIS ITEM IS ALREADY EXIST IN CART

    const selectAllCartRows = document.querySelectorAll(
      ".cart-items .cart-row"
    );

    let isCartItemIsAlreadyExist = false;

    if (selectAllCartRows?.length > 0) {
      selectAllCartRows?.forEach(function (singleCartRow) {
        const singleCartName = singleCartRow.querySelector(".cart-item-title");
        if (cartName?.innerText == singleCartName?.innerText) {
          isCartItemIsAlreadyExist = true;
        }
      });

      if (isCartItemIsAlreadyExist) {
        alert("This item is already exist in our cart");
        return;
      }
    }
    //CHECK IF THIS ITEM IS ALREADY EXIST IN CART

    // console.log({ cartName, cartImage, cartPrice });
    // ?. optional chaining

    const createCartRowEl = document.createElement("div");
    createCartRowEl.className = "cart-row";
    createCartRowEl.innerHTML = `<div class="cart-item cart-column">
         <img
           class="cart-item-image"
           src="${cartImage?.src}"
           width="100"
           height="100"
         />
         <span class="cart-item-title">${cartName?.innerText}</span>
       </div>
       <span class="cart-column">
         $ <span class="cart-price-item-item">${cartPrice?.innerText}</span>
       </span>
       <div class="cart-quantity cart-column">
         <input class="cart-quantity-input" type="number" value="1" />
         <button class="btn btn-danger btn-remove" type="button">
           REMOVE
         </button>
       </div>`;

    selectCartRow.append(createCartRowEl);

    updateCartTotal();
  }
});

function updateCartTotal() {
  const selectAllCartRows = document.querySelectorAll(".cart-items .cart-row");

  const cartTotalPriceElement = document.querySelector(".cart-total-price");
  // console.log(selectAllCartRows, "selectAllCartRows");
  if (selectAllCartRows?.length > 0) {
    // agar cart row ki length 0 se zayada hai tu true
    let total = 0;
    selectAllCartRows.forEach(function (singleCartRow) {
      // console.log(singleCartRow, "singleCartRow");
      const cartPrice = singleCartRow.querySelector(
        ".cart-price-item-item"
      )?.innerText;
      const cartQuantity = singleCartRow.querySelector(".cart-quantity-input");

      total += cartPrice * cartQuantity?.value;

      //bind change event listener in cart quantity input field

      cartQuantity.addEventListener("change", function (e) {
        const currentElement = e.target;
        if (currentElement.value <= 0) {
          currentElement.value = 1;
        }
        updateCartTotal();
      });
    });

    cartTotalPriceElement.innerText = `$ ${total.toFixed(2)}`;

    // console.log(total, "total");
  } else {
    cartTotalPriceElement.innerText = `$ 0`;
  }
}

//bind delete button

selectCartRow.addEventListener("click", function (event) {
  // console.log(event.target, "event.target");
  const currentElement = event.target;

  if (
    currentElement?.classList?.contains("btn-remove") &&
    confirm("Are you sure ?")
  ) {
    currentElement.parentElement.parentElement.remove();
    updateCartTotal();
  }
});