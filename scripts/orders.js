import { orders } from "../data/orders.js";
import { getProduct } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { loadProductsFetch } from "../data/products.js";
import { addToCart } from "../data/cart.js";

async function loadPage() {
    try {
        await loadProductsFetch();

        function renderOrderProducts(products, orderId) {
            let html = '';

            products.forEach((product) => {

                const dateString = dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D');
                const matchingProduct = getProduct(product.productId);

                html += `
                <div class="product-image-container">
                        <img src="${matchingProduct.image}">
                    </div>
        
                    <div class="product-details">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-delivery-date">
                        Arriving on: ${dateString}
                        </div>
                        <div class="product-quantity">
                        Quantity: ${product.quantity}
                        </div>
                        <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.productId}" data-quantity="${product.quantity}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>
        
                    <div class="product-actions">
                        <a href="tracking.html?orderId=${orderId}&productId=${product.productId}">
                        <button class="track-package-button button-secondary js-track-package"  data-product-id="${product.productId}">
                            Track package
                        </button>
                        </a>
                    </div>
                `

            });

            return html;
        }

        // console.log(renderOrderProducts([{ "id": "4f49da3d-4bd8-465a-9c72-bc5d9c8e0b60", "orderTime": "2024-12-31T17:01:19.034Z", "totalCostCents": 8990, "products": [{ "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "quantity": 2, "estimatedDeliveryTime": "2025-01-07T17:01:19.034Z", "variation": null }, { "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d", "quantity": 1, "estimatedDeliveryTime": "2025-01-03T17:01:19.034Z", "variation": null }, { "productId": "dd82ca78-a18b-4e2a-9250-31e67412f98d", "quantity": 1, "estimatedDeliveryTime": "2025-01-01T17:01:19.034Z", "variation": null }] }, { "id": "83cbf0c8-4eb0-4729-bc2b-9fc46a98e18e", "orderTime": "2024-12-30T04:28:31.352Z", "totalCostCents": 8990, "products": [{ "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "quantity": 2, "estimatedDeliveryTime": "2025-01-02T04:28:31.352Z", "variation": null }, { "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d", "quantity": 1, "estimatedDeliveryTime": "2024-12-31T04:28:31.352Z", "variation": null }, { "productId": "dd82ca78-a18b-4e2a-9250-31e67412f98d", "quantity": 1, "estimatedDeliveryTime": "2025-01-06T04:28:31.352Z", "variation": null }] }, { "id": "d1266033-e4fa-4cbf-a67b-9d77eb0cea99", "orderTime": "2024-12-29T20:46:50.194Z", "totalCostCents": 9540, "products": [{ "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "quantity": 2, "estimatedDeliveryTime": "2024-12-30T20:46:50.194Z", "variation": null }, { "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d", "quantity": 1, "estimatedDeliveryTime": "2024-12-30T20:46:50.194Z", "variation": null }, { "productId": "dd82ca78-a18b-4e2a-9250-31e67412f98d", "quantity": 1, "estimatedDeliveryTime": "2025-01-05T20:46:50.194Z", "variation": null }] }, { "id": "68d245ac-fe1c-449d-a455-37d096ef6238", "orderTime": "2024-12-29T20:45:55.743Z", "totalCostCents": 9540, "products": [{ "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "quantity": 2, "estimatedDeliveryTime": "2024-12-30T20:45:55.743Z", "variation": null }, { "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d", "quantity": 1, "estimatedDeliveryTime": "2024-12-30T20:45:55.743Z", "variation": null }, { "productId": "dd82ca78-a18b-4e2a-9250-31e67412f98d", "quantity": 1, "estimatedDeliveryTime": "2025-01-05T20:45:55.743Z", "variation": null }] }]));

        function renderOrders() {

            let html = '';

            orders.forEach((order) => {

                const date = order.orderTime;
                const dateString = dayjs(date).format('dddd, MMMM D');
                const total = order.totalCostCents;
                const products = order.products;

                html += `
                    <div class="order-container">
        
                        <div class="order-header">
                        <div class="order-header-left-section">
                            <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${dateString}</div>
                            </div>
                            <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>${formatCurrency(total)}</div>
                            </div>
                        </div>
        
                        <div class="order-header-right-section">
                            <div class="order-header-label">Order ID:</div>
                            <div>${order.id}</div>
                        </div>
                        </div>
        
                        <div class="order-details-grid">
                        ${renderOrderProducts(products, order.id)}
                        </div>
                    </div>
                `
            })



            return html;
        }


        document.querySelector('.js-order-grid').innerHTML = renderOrders();

        document.querySelectorAll('.js-buy-again').forEach((button) => {
            button.addEventListener('click', () => {
                const { productId } = button.dataset;
                const { quantity } = button.dataset;

                addToCart(productId, Number(quantity));

                console.log('Product Added Successfully')
            });
        });

    } catch (error) {
        console.log('Something went wrong. Please try again later');
    }
}

loadPage();