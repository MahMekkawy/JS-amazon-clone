import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';






async function loadPage() {


    const url = new URL(window.location.href)
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    let html;

    try {

        await loadProductsFetch();

        function renderTrackedOrder() {

            // Get matching order
            let matchingOrder;
            orders.forEach((order) => {
                if (order.id === orderId) {
                    matchingOrder = order;
                }
            });

            // Get matching product from matching order
            let productDetails = matchingOrder.products.find((product) => {
                return product.productId === productId;
            })


            const matchingProduct = getProduct(productDetails.productId)
            const dateString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');


            // Calculate progress bar prcent 
            function progress() {
                const currentTime = new dayjs();
                const orderTime = dayjs(matchingOrder.orderTime);
                const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

                const diff1 = currentTime.diff(orderTime, 'days');
                const diff2 = deliveryTime.diff(orderTime, 'days');
                const progressBar = ((diff1 / diff2) * 100);

                return progressBar;
            }

            let progressBar = progress();

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

                <div class="progress-labels-container js-progress-labels-container" data-progress="${progressBar}">
                    <div class="progress-label js-progress-label1">
                    Preparing
                    </div>
                    <div class="progress-label js-progress-label2">
                    Shipped
                    </div>
                    <div class="progress-label js-progress-label3">
                    Delivered
                    </div>
                </div>

                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progressBar}%"></div>
                </div>
            `;



            return html;

        }

        document.querySelector('.js-order-tracking').innerHTML = renderTrackedOrder();

        // Make Prgress bar Dynamic
        const progressBar = document.querySelector('.js-progress-labels-container').dataset.progress;
        console.log(progressBar);

        if (progressBar < 49) {
            document.querySelector('.js-progress-label1').classList.add('current-status');
        } else if (progressBar > 49 && progressBar < 99) {
            document.querySelector('.js-progress-label2').classList.add('current-status');
        } else if (progressBar >= 100) {
            document.querySelector('.js-progress-label3').classList.add('current-status');
        }


    } catch (error) {
        console.log(error)
        console.log('Something Went Wrong. Please Try Again Later');
    }

}

loadPage();

