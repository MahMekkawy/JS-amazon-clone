import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


const url = new URL(window.location.href)
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');


async function loadPage() {

    let html;

    try {

        await loadProductsFetch();

        function renderTrackedOrder() {

            let matchingOrder;

            orders.forEach((order) => {

                if (order.id === orderId) {
                    matchingOrder = order;
                }

            });

            let productDetails = matchingOrder.products.find((product) => {
                return product.productId = productId;
            })

            const matchingProduct = getProduct(productDetails.productId)

            const dateString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');


            html = `
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                ${dateString}
            </div>

            <div class="product-info">
                ${matchingProduct.name}
            </div>

            <div class="product-info">
                Quantity: ${productDetails.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
                <div class="progress-label">
                Preparing
                </div>
                <div class="progress-label current-status">
                Shipped
                </div>
                <div class="progress-label">
                Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar"></div>
            </div>
        `;

            return html;

        }

        document.querySelector('.js-order-tracking').innerHTML = renderTrackedOrder();


    } catch (error) {
        console.log('Something Went Wrong. Please Try Again Later');
    }

}

loadPage();

