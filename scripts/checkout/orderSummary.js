import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct } from '../../data/products.js'
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

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
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
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

            const today = dayjs();
            const deliveryDays = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDays.format('dddd, MMMM D');

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
                renderPaymentSummary();
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
}