const items = [
  {name: "Product 1", price: 1999, img: "https://picsum.photos/id/101/400/300"},
  {name: "Product 2", price: 2999, img: "https://picsum.photos/id/102/400/300"},
  {name: "Product 3", price: 2499, img: "https://picsum.photos/id/103/400/300"},
  {name: "Product 4", price: 999, img: "https://picsum.photos/id/104/400/300"},
  {name: "Product 5", price: 799, img: "https://picsum.photos/id/105/400/300"},
  {name: "Product 6", price: 1499, img: "https://picsum.photos/id/106/400/300"},
  {name: "Product 7", price: 55999, img: "https://picsum.photos/id/107/400/300"},
  {name: "Product 8", price: 1199, img: "https://picsum.photos/id/108/400/300"},
  {name: "Product 9", price: 45999, img: "https://picsum.photos/id/109/400/300"},
  {name: "Product 10", price: 699, img: "https://picsum.photos/id/110/400/300"},
  {name: "Product 11", price: 499, img: "https://picsum.photos/id/111/400/300"},
  {name: "Product 12", price: 1299, img: "https://picsum.photos/id/112/400/300"},
  {name: "Product 13", price: 20999, img: "https://picsum.photos/id/113/400/300"},
  {name: "Product 14", price: 15999, img: "https://picsum.photos/id/114/400/300"},
  {name: "Product 15", price: 899, img: "https://picsum.photos/id/115/400/300"},
  {name: "Product 16", price: 4999, img: "https://picsum.photos/id/116/400/300"},
  {name: "Product 17", price: 299, img: "https://picsum.photos/id/117/400/300"},
  {name: "Product 18", price: 1999, img: "https://picsum.photos/id/118/400/300"},
  {name: "Product 19", price: 3499, img: "https://picsum.photos/id/119/400/300"},
  {name: "Product 20", price: 39999, img: "https://picsum.photos/id/120/400/300"}
];

let cart = 0;

function loadItems() {
  const container = document.getElementById("products");

  items.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addCart('${item.name}')">Add</button>
      </div>
    `;
  });
}

function addCart(name) {
  cart++;
  document.getElementById("cart-count").innerText = cart;
  alert(name + " added to cart!");
}

loadItems();