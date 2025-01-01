import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';


// Using Async Await
async function loadPage() {
    try {

        // throw 'error3';

        // await Promise.all([
        //     loadProductsFetch(),
        //     loadCartFetch()
        // ]);

        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            loadCartFetch(() => {
                // reject();
                resolve();
            });
        }
        )

        // loadCart();

        renderOrderSummary();
        renderPaymentSummary();
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }
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