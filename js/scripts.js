// ========== SISTEMA DE CARRINHO ==========
document.addEventListener("DOMContentLoaded", () => {
    const addButtons = document.querySelectorAll(".add-cart");
    const cartCount = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
  
    // Carregar carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Atualizar contador no menu
    function updateCartCount() {
      if (cartCount) cartCount.textContent = cart.length;
    }
  
    // Salvar no localStorage
    function saveCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
    }
  
    // Adicionar produto
    if (addButtons) {
      addButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
          const product = e.target.closest(".product");
          const name = product.querySelector("h3").textContent;
          const price = parseFloat(product.querySelector(".price").textContent);
          const img = product.querySelector("img").src;
  
          cart.push({ name, price, img });
          saveCart();
          alert("✅ Produto adicionado ao carrinho!");
        });
      });
    }
  
    // Exibir produtos no carrinho.html
    if (cartItemsList) {
      function renderCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
  
        if (cart.length === 0) {
          cartItemsList.innerHTML = "<p>Seu carrinho está vazio.</p>";
        } else {
          cart.forEach((item, index) => {
            total += item.price;
  
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
              <img src="${item.img}" alt="${item.name}">
              <div class="cart-info">
                <h3>${item.name}</h3>
                <p>R$ ${item.price.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remover</button>
              </div>
            `;
            cartItemsList.appendChild(div);
          });
        }
  
        cartTotal.textContent = total.toFixed(2);
  
        document.querySelectorAll(".remove-btn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            saveCart();
            renderCart();
          });
        });
      }
      renderCart();
    }
  
    updateCartCount();
  });
  