export function renderCheckoutHeader(cartQuantity) {
    document.querySelector('.js-checkout-items').innerHTML =
        `
            Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} Items</a>)
        `;
}