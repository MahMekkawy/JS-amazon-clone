import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';


// Using Async Await
async function loadPage() {
    await loadProductsFetch();

    /*
    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    }
    )
    */

    loadCart();

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
// Using Promise all to make many prmises work together 
Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve('Value2');
        });
    })

]).then((value) => {
    console.log(value)
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('Value1');
    });
}).then((value) => {
    console.log(value);

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    console.log('step 3')
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*

// Using Callback function
loadProducts(() => {
    loadCart(() => {
        console.log('cart loaded successfully');
        renderOrderSummary();
        renderPaymentSummary();
    });

});
*/