// Toggle navigation menu
const toggle = document.querySelector('.toggle');
const links = document.querySelector('.links');

toggle.addEventListener('click', () => {
  links.classList.toggle('show');
});


// Store page functionality
const productContainer = document.getElementById('product-container');
const moreProductContainer = document.getElementById('more-product-container');
const seeMoreBtn = document.getElementById('see-more-btn');

// product data
const products = [
  {
    id: 1,
    image:"https://m.media-amazon.com/images/I/61MQz+cz+kL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Emsile",
    price: "N30,000"
  },
  {
      id: 2,
      image: "https://m.media-amazon.com/images/I/71QQNfZKnXL._AC_UL480_FMwebp_QL65_.jpg",
      name: "Loafers Slip",
      price: "N25,000"
  },
  {
    id: 3,
    image: "https://m.media-amazon.com/images/I/7154MvlDc8L._AC_UL480_FMwebp_QL65_.jpg",
    name: "Elaina Ruby",
    price: "N15,000"
  },
  {
    id: 4,
    image: "https://m.media-amazon.com/images/I/71z4pnVo3eL._AC_UL480_FMwebp_QL65_.jpg",
    name: "May Maeigold",
    price: "N10,000"
  },
  {
    id: 5,
    image: "https://m.media-amazon.com/images/I/71GXEuiO5OL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Wendy Loafers",
    price: "N50,000"
  },
  {
    id: 6,
    image: "https://m.media-amazon.com/images/I/71WlbfbG8HL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Joy Paradise",
    price: "N60,000"
  },
  {
    id: 7,
    image: "https://m.media-amazon.com/images/I/81YnjpZjPzL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Flex Vella",
    price: "N20,000"
  },
  {
    id: 8,
    image: "https://m.media-amazon.com/images/I/71sKjPdlZPL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Frank Mully",
    price: "N45,000"
  },
  {
    id: 9,
    image: "https://m.media-amazon.com/images/I/71K09AAwVPL._AC_UL480_FMwebp_QL65_.jpg",
    name: "5 Alive",
    price: "N25,000"
  },
  {
    id: 10,
    image: "https://m.media-amazon.com/images/I/719Us-i56AL._AC_UL480_FMwebp_QL65_.jpg",
    name: "Belos Sneaker",
    price: "N80,000"
  }
];

const addProducts = (products) => {
  if (productContainer) {
    products.forEach((product) => {
      const productHTML = `
        <section>
          <img src="${product.image}" alt="product-img">
          <p class="name">${product.name}</p>
          <p class="price">${product.price}</p>
          <button class="shoe-1 btn">ADD TO CART</button>
        </section>
      `;
      productContainer.insertAdjacentHTML('beforeend', productHTML);
      
      // Add event listener to the new button
      const button = productContainer.querySelector('.btn:last-child');
      button.addEventListener('click', (e) => {
        const product = e.target.closest('section');
        const productData = {
          id: product.querySelector('.name').textContent,
          image: product.querySelector('img').src,
          name: product.querySelector('.name').textContent,
          price: product.querySelector('.price').textContent,
        };
        addToCart(productData);
      });
    });
  }
};

// initial products to the page
addProducts(products.slice(0, 4));

// Cart page functionality
const cartContainer = document.querySelector('.cart-container');
let cart = [];

// Function to update the cart
const updateCart = () => {
  if (cartContainer) {
    const cartHTML = cart.map((product, index) => {
      return `
        <tr>
          <td><img src="${product.image}" alt="product-img"></td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td><input type="number" value="${product.quantity}" min="1" oninput="validity.valid||(value='1')"</input></td>
          <td><button class="remove-btn" data-index="${index}">Remove</button></td>
        </tr>
      `;
    }).join('');
    cartContainer.innerHTML = `
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Remove</th>
        </tr>
        ${cartHTML}
        <tr>
          <td colspan="4">Total:</td>
          <td id="total">${cart.reduce((total, product) => {
            const price = parseInt(product.price.replace("N", "").replace(",", ""));
            return total + (isNaN(price) ? 0 : price) * product.quantity;
          }, 0)}</td>
        </tr>
      </table>
      <button id="purchase-btn">Purchase</button>
    `;
    
    const totalElement = document.getElementById('total');
    totalElement.textContent = cart.reduce((total, product) => {
      const price = parseInt(product.price.replace("N", "").replace(",", ""));
      return total + (isNaN(price) ? 0 : price) * product.quantity;
    }, 0);

    const removeButtons = cartContainer.querySelectorAll('.remove-btn');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        removeFromCart(index);
      });
    });

    const quantityInputs = cartContainer.querySelectorAll('input[type="number"]');
    quantityInputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener('change', () => {
        const quantity = parseInt(input.value);
        updateQuantity(index, quantity);
      });
    });
  }
};

// Function to remove products from the cart
const removeFromCart = (index) => {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
};


// Function to add products to the cart
const addToCart = (product) => {
  const existingProduct = cart.find((p) => p.name === product.name);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
};

// Function to update the quantity of a product in the cart
const updateQuantity = (index, quantity) => {
  if (quantity <= 0) {
    quantity = 1;
  }
  cart[index].quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
  const totalElement = document.getElementById('total');
  totalElement.textContent = cart.reduce((total, product) => {
    const price = parseInt(product.price.replace("N", "").replace(",", ""));
    return total + (isNaN(price) ? 0 : price) * product.quantity;
  }, 0);
};

// Initialize cart from local storage
const initCart = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
    cart.forEach((product, index) => {
      product.quantity = parseInt(product.quantity);
    });
  }
  updateCart();
};


initCart();

// Add event listeners to the add to cart buttons
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('section');
    const productData = {
      id: product.querySelector('.name').textContent,
      image: product.querySelector('img').src,
      name: product.querySelector('.name').textContent,
      price: product.querySelector('.price').textContent,
    };
    addToCart(productData);
  });
});

// function to Load more products when the button is clicked
if (seeMoreBtn) {
  seeMoreBtn.addEventListener('click', () => {
    addProducts(products.slice(4));
    seeMoreBtn.style.display = 'none';

    productContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    const product = e.target.closest('section');
    const productData = {
      id: product.querySelector('.name').textContent,
      image: product.querySelector('img').src,
      name: product.querySelector('.name').textContent,
      price: product.querySelector('.price').textContent,
    };
    addToCart(productData);
  }
});
  });
}

document.getElementById('purchase-btn').addEventListener('click', () => {
  document.getElementById('purchase-form').style.display = 'block';
});

document.getElementById('submit-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const address = document.getElementById('address').value;
  const phoneNumber = document.getElementById('phoneNumber').value;

  if (address && phoneNumber) {
    alert('Purchase successful! Your product is on its way.');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    const totalElement = document.getElementById('total');
    totalElement.textContent = 0;
    document.getElementById('purchase-form').style.display = 'none';
  } else {
    alert('Please enter both address and phone number.');
  }
});
