import { cart, addToCart, updateCartQuantity } from "../data/cart.js";
import { products, loadProducts, setProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";



loadProducts(renderProductsGrid);

const url = new URL(window.location.href)
const searchWord = url.searchParams.get('search');

function renderProductsGrid() {

  let productHTML = '';

  if (searchWord) {

    const newProducts = products.filter((product) => {

      if (product.name.toLocaleLowerCase().includes(searchWord.toLowerCase())) {
        return product;
      } else if (product.keywords.includes(searchWord.toLowerCase())) {
        return product;
      }

    });



    setProducts(newProducts);

  }


  products.forEach((product) => {
    console.log(product);
    productHTML += `
        <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart added-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id ="${product.id}">
          Add to Cart
        </button>
      </div>
    `
  });

  document.querySelector('.products-grid').innerHTML = productHTML;


  // Make Add to cart button interactive 
  let cartQuantity = document.querySelector('.js-cart-quantity');

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantitySelector = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      document.querySelector(`.added-${productId}`).classList.add("added-to-cart-visible");
      setTimeout(() => {
        document.querySelector(`.added-${productId}`).classList.remove("added-to-cart-visible");
      }, 2000)

      addToCart(productId, quantitySelector);
      cartQuantity.innerHTML = updateCartQuantity();

    });
  })

  updateCartQuantity() > 0 ? cartQuantity.innerHTML = updateCartQuantity() : cartQuantity.innerHTML = '';

  // Make search Bar Interactive
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchWord = document.querySelector('.js-search-bar').value;
    if (searchWord === '') {
      window.location.href = '../amazon.html';
    } else {
      window.location.href = `../amazon.html?search=${searchWord}`;

    }
  })

}
