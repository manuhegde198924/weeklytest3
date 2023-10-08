

const Products = [
    { id: 1, name: 'Product-1', price: 100 },
    { id: 2, name: 'Product-2', price: 200 },
    { id: 3, name: 'Product-3', price: 300 },
  ];
  
  const productList = document.getElementById('product-list');
  const cart = document.getElementById('cart');
  const cartTotal = document.getElementById('cart-total');
  const cartItems = {}; // To keep track of items in the cart
  let total = 0; // To keep track of the total pric

  


  //Create a function to render the product list:
  function renderProductList() {
    productList.innerHTML = ''; // Clear existing list
    Products.forEach((product) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <span>${product.name} - $${product.price}</span>
        <button class="add-btn" data-id="${product.id}">+</button>
        <button class="remove-btn" data-id="${product.id}">-</button>
        <span class="quantity">0</span>
      `;
      productList.appendChild(item);
  
      // Add event listeners for + and - buttons
      item.querySelector('.add-btn').addEventListener('click', addToCart);
      item.querySelector('.remove-btn').addEventListener('click', removeFromCart);
    });
  }
  //
  //
  //Create functions to handle adding and removing items from the cart:
  function addToCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    if (!cartItems[productId]) {
      cartItems[productId] = 0;
    }
    cartItems[productId]++;
    total += Products.find((product) => product.id === productId).price;
    renderCart();
  }
  
  function removeFromCart(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    if (cartItems[productId] > 0) {
      cartItems[productId]--;
      total -= Products.find((product) => product.id === productId).price;
      renderCart();
    }
  }
  //Create a function to render the shopping cart:
  function renderCart() {
    cart.innerHTML = ''; // Clear existing cart
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        const product = Products.find((p) => p.id === parseInt(productId));
        const item = document.createElement('div');
        item.innerHTML = `
          <span>${product.name} x${cartItems[productId]}</span>
          <span>$${product.price * cartItems[productId]}</span>
        `;
        cart.appendChild(item);
      }
    }
    cartTotal.textContent = `Total Price: $${total}`;
  }
  //Finally, call renderProductList() to initialize the product list when the component is loaded:
  renderProductList();
  function renderCart() {
    const cart = document.getElementById('cart');
    const emptyCartMessage = document.getElementById('empty-cart-message');
  
    cart.innerHTML = ''; // Clear existing cart
    let isEmpty = true; // Flag to check if the cart is empty
  
    for (const productId in cartItems) {
      if (cartItems[productId] > 0) {
        isEmpty = false; // Cart is not empty if we find any item
        const product = Products.find((p) => p.id === parseInt(productId));
        const item = document.createElement('div');
        item.innerHTML = `
          <span>${product.name} x${cartItems[productId]}</span>
          <span>$${product.price * cartItems[productId]}</span>
        `;
        cart.appendChild(item);
      }
    }
  
    if (isEmpty) {
      emptyCartMessage.style.display = 'block'; // Show the message
    } else {
      emptyCartMessage.style.display = 'none'; // Hide the message
    }
  
    cartTotal.textContent = `Total Price: $${total}`;
  }