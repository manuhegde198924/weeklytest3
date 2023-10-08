# weeklytest3

The given assignment tests various skills on HTML5,CSS3 AND VANILLA JAVASCRIPT.[DOM MANIPULATION MAINLY]
THE UI HAS PRODUCT LIST WITH A CART THAT SUMS UP A PRODUCT ADDED ON THE CART
I HAVE CREATED AN UI ALMOST SIMILAR TO THE ABOVE MENTIONED TASK.
HERE ARE THE STEPS THAT I HAVE FOLLOWED------------------------>
STEP 1: WRITE HTML BOILER PLATE,IN THE BODY-------------------->
Create a component with two boxes side by side as shown in the picture. 
The left box should show the list of products available in the store along with the add and remove button against each product.
The product quantity which is added in the cart is also show between the two buttons.
The right box should show the cart with products added along with quantity and total Price.
 We'll create the HTML structure, add event listeners,
 and handle the logic to display products and manage the shopping cart
 the HTML structure for  component:
WE HAVE CONTAINER DIV WHICH IS MAIN CONTAINER AND WE HAVE 2 
DIV CLASEES PRODUCTS LIST AND CART
IN PRODUCT LIST WE HAVE HEADER AND AN UNORDERED LIST FOR WHICH LISTS WILL BE ADDED DYNAMICALLY USING THE
VANILLA JS,SIMILARLY IN CART LIST WE HAVE A HEDER AND INITIALLY CART WILL BE EMPTY,AFTER THE HTML SKELETON
WE CAN STYLE USING CSS ,I HAVE USED FLEXBOX,AND MADE IT ALIGN AS PER THE UI USING ALIGN ITEMS AND JUSTIFY CONTENT,
SIMILARLY WE CAN GIVE BORDERS TO BOTH BOXES CREATED TO MAKE UI ATTRACTIVE,
WE SHOULD KNOW THAT jAVSCRIPT READS HTML FILE AFTER CONSTRUCTING DOM TREE,
AFTER HTML PARSES WE GET A DOM TREE CREATED AND JAVASCRIPT ADDS UP DYNAMICITY BY TARGETING THAT USING dOcument. property
DOCUMENT IS A CHILD OF WINDOW in browser WHICH IS A GLOBAL OBJECT
AFTER CREATING HTML AND CSS, IN OUR CODE WE WILL GET HTML PARSED TREE WHICH IS DOM TREE, SIMILARLY WE HAVE CSS(CSS- -OM) AFTER PARSING
AND JS TARGETS THE DOM TREE.
WE HAVE LINKED THE CSS FILE USING LINK TAG,NEXT WE WRITE THE SCRIPT TAG AT THE END WHICH MEANS JAVASCRIPT STARTS DOWNLOADING AFTER THE HTML DOM TREE
OR DOM API GETS CREATED,AFTER SCRIPT TAG,GIVING SRC--WE ENTER INTO OUR SEPERATE JS FILE,WHERE WE ADD INTERACTIVITY TO THE STATIC WEBPAGE CREATED....
IN THE .JS FILE
--------------------------------->
Initialize variables and get references to DOM elements:
const Products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

const productList = document.getElementById('product-list');
const cart = document.getElementById('cart');
const cartTotal = document.getElementById('cart-total');
const cartItems = {}; // To keep track of items in the cart
let total = 0; // To keep track of the total price
Create a function to render the product list:
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
Create functions to handle adding and removing items from the cart:
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
Create a function to render the shopping cart:

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

    Finally, call renderProductList() to initialize the product list when the component is loaded:

javascript

renderProductList();

Now, when you load the page, you should see the two boxes side by side with the product list on the left and an empty shopping cart on the right.
 You can click the '+' and '-' buttons to add and remove items from the cart, and the cart's contents and total price will be updated accordingly.
User
 If no product is in the cart, display “No Product added to the cart”.

To display the message "No Product added to the cart" when there are no items in the cart, you can add a conditional check in the renderCart function. 
Here's an updated version of the renderCart function that includes this check:

javascript

function renderCart() {
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
    cart.innerHTML = '<p>No Product added to the cart</p>';
    cartTotal.textContent = 'Total Price: $0';
  } else {
    cartTotal.textContent = `Total Price: $${total}`;
  }
}

In this updated code, we initialize a isEmpty flag to true. As we iterate through the cart items, if we find any item in the cart, we set isEmpty to false. After the loop, we check the isEmpty flag. If it's true, we display the "No Product added to the cart" message and set the total price to "$0". If it's false, we display the cart's contents and total price as before.

This modification will ensure that the message is displayed when the cart is empty and hidden when there are items in the cart.
User
 If no product is in the cart, display “No Product added to the cart”.

Sure, let's update the code step by step to display "No Product added to the cart" when there are no items in the cart.

    First, add a placeholder message for the empty cart in your HTML structure:

html

<div class="cart">
  <h2>Shopping Cart</h2>
  <div id="cart">
    <p id="empty-cart-message">No Product added to the cart</p>
  </div>
  <p id="cart-total">Total Price: $0</p>
</div>

We've added a <p> element with the id "empty-cart-message" to display the message.

    Update your JavaScript code to include logic to show/hide the empty cart message based on the cart's content:

javascript

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

FOREXTRA REFERENCE:------->
The Document Object Model (DOM) is a programming interface for HTML(Hypertext Markup Language) and XML(Extensible markup language) documents.
 It defines the logical structure of documents and the way a document is accessed and manipulated.

Note: It is called a Logical structure because DOM doesn’t specify any relationship between objects. 

DOM is a way to represent the webpage in a structured hierarchical way so that it will become easier for programmers and users to glide through the document.
 With DOM, we can easily access and manipulate tags, IDs, classes, Attributes, or Elements of HTML using commands or methods provided by the Document object.
 Using DOM, the JavaScript gets access to HTML as well as CSS of the web page and can also add behavior to the HTML elements.
 so basically Document Object Model is an API that represents and interacts with HTML or XML documents.

Why DOM is required?

HTML is used to structure the web pages and JavaScript is used to add behavior to our web pages.
 When an HTML file is loaded into the browser, the JavaScript can not understand the HTML document directly.
 So, a corresponding document is created(DOM). DOM is basically the representation of the same HTML document but in a different format with the use of objects.
 JavaScript interprets DOM easily i.e. JavaScript can not understand the tags(<h1>H</h1>) in HTML document but can understand object h1 in DOM.
 Now, JavaScript can access each of the objects (h1, p, etc) by using different functions.

Structure of DOM: DOM can be thought of as a Tree or Forest(more than one tree). 
The term structure model is sometimes used to describe the tree-like representation of a document.  Each branch of the tree ends in a node, and each node contains objects
  Event listeners can be added to nodes and triggered on an occurrence of a given event. One important property of DOM structure models is structural isomorphism: 
if any two DOM implementations are used to create a representation of the same document, they will create the same structure model,
 with precisely the same objects and relationships.

Why called an Object Model?
Documents are modeled using objects, and the model includes not only the structure of a document but also 
the behavior of a document and the objects of which it is composed like tag elements with attributes in HTML.

Properties of DOM: Let’s see the properties of the document object that can be accessed and modified by the document object.
Properties of DOM

 

    Window Object: Window Object is object of the browser which is always at top of the hierarchy.  
It is like an API that is used to set and access all the properties and methods of the browser. It is automatically created by the browser.
    Document object: When an HTML document is loaded into a window, it becomes a document object.
 The ‘document’ object has various properties that refer to other objects which allow access to and modification of the content of the web page.
 If there is a need to access any element in an HTML page, we always start with accessing the ‘document’ object. Document object is property of window object.
    Form Object: It is represented by form tags.
    Link Object: It is represented by link tags.
    Anchor Object: It is represented by a href tags.
    Form Control Elements:: Form can have many control elements such as text fields, buttons, radio buttons, checkboxes, etc.HTML DOM getElementByID() Method 

The getElementById() method returns the elements that have given an ID which is passed to the function. 
This function is a widely used HTML DOM method in web designing to change the value of any particular element or get a particular element. 
If the passed ID to the function does not exist then it returns null. The element is required to have a unique id,
 in order to get access to that specific element quickly, & also that particular id should only be used once in the entire document.

Syntax:

document.getElementById( element_ID )

Parameter: This function accepts single parameter element_ID which is used to hold the ID of the element.

Return Value: It returns the object of the given ID. If no element exists with the given ID then it returns null.
DOM querySelectorAll() Method

The querySelectorAll() method in HTML is used to return a collection of an element’s child elements that match a specified CSS selector(s), as a static NodeList object. 
The NodeList object represents a collection of nodes. The nodes can be accessed by index numbers. The index starts at 0. 
Note: If we want to apply CSS property to all the child nodes that match the specified selector, then we can just iterate through all nodes and apply that particular property.
Syntax: 
 

element.querySelectorAll(selectors)

Selectors is the required field. It specifies one or more CSS selectors to match the element.
These selectors are used to select HTML elements based on their id, classes, types, etc. 
In case of multiple selectors, comma is used to separate each selector.
An event is an important part of JavaScript.A web page respond according to an event occurred. Some events are user generated and some are generated by API’s. An event listener is a procedure in JavaScript that waits for an event to occur. The simple example of an event is a user clicking the mouse or pressing a key on the keyboard.

The addEventListener() is an inbuilt function in JavaScript which takes the event to listen for, and a second argument to be called whenever the described event gets fired. Any number of event handlers can be added to a single element without overwriting existing event handlers. 

Syntax:  

element.addEventListener(event, listener, useCapture);

Parameters: 

    event : event can be any valid JavaScript event.Events are used without “on” prefix like use “click” instead of “onclick” or “mousedown” instead of “onmousedown”.
    listener(handler function) : It can be a JavaScript function which respond to the event occur.
    useCapture: It is an optional parameter used to control event propagation.
 A boolean value is passed where “true” denotes capturing phase and “false” denotes the bubbling phase.
