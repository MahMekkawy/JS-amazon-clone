import { cart, removeFromCart, updateDeliveryOption, updateCartQuantity, updateCartItemQuantity } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, deliveryDay } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';

export function renderOrderSummary() {

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {

        const { productId } = cartItem;

        const matchingProduct = getProduct(productId);

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${deliveryOptionsHTML(matchingProduct, cartItem, 'done')}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">
                    <div class="cart-item-details">
                        <div class="product-name js-product-name-${matchingProduct.id}">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price js-product-price-${matchingProduct.id}">
                            ${matchingProduct.getPrice()}
                        </div>
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <input class="quantity-input js-qantity-input-${matchingProduct.id}">
                            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                                Save
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `
    });


    // Generate HTML for delivery options 
    function deliveryOptionsHTML(matchingProduct, cartItem, deliveryId = 'none') {

        let html = '';
        let itemDate = '';

        deliveryOptions.forEach((deliveryOption) => {

            const dateString = deliveryDay(deliveryOption);

            const priceString = deliveryOption.priceCent
                === 0
                ? 'FREE'
                : `${formatCurrency(deliveryOption.priceCent)} -`

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            isChecked ? itemDate = dateString : itemDate;

            html += `
                <div class="delivery-option js-delivery-option js-delivery-opthion-${matchingProduct.id}-${deliveryOption.id}" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input js-delivery-opthion-input-${matchingProduct.id}-${deliveryOption.id}" name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `
        })

        if (deliveryId === 'none') {
            return html;
        } else {
            return itemDate;
        };

    }


    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    // Make delete link delete the item from Checkout Page
    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                const container = document.querySelector(`.js-cart-item-container-${productId}`)
                container.remove();
                renderCheckoutHeader(updateCartQuantity());
                updateCartQuantity();
                renderPaymentSummary();
                renderOrderSummary();
            })
        })

    // Show save link and quantity input using Update link
    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                console.log(container);
                container.classList.add('is-editing-quantity');
            })
        })

    // Update product quantity using Save Link
    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity');

                const quantity = document.querySelector(`.js-quanity-lable-${productId}`);
                const newQuantity = Number(document.querySelector(`.js-qantity-input-${productId}`).value);

                if (newQuantity <= 0 || newQuantity >= 100) {
                    alert('Quantity Must be between 1 and 99');
                } else {
                    updateCartItemQuantity(productId, newQuantity);
                    renderOrderSummary();
                    renderPaymentSummary();
                }
            })
        })

    // Make Delivery options interactive
    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const { productId } = element.dataset;
                const { deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);

                renderOrderSummary();
                renderPaymentSummary();
            })
        })

    renderCheckoutHeader(updateCartQuantity());


    if (updateCartQuantity() === 0) {
        document.querySelector('.js-order-summary').innerHTML = `
            <div class="js-continue-shopping">
                <p>No Orders Yet</p>

                <a href="../../amazon.html" class="">
                    <button class="js-continue-shopping-button button-primary">
                        Continue Shopping
                    </button>
                </a>
            </div>
        `;
    }

}