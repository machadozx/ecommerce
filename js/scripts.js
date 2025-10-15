// =========================
// Dados dos produtos
// =========================
const products = [
    { id: 1, name: "Escrivaninha", price: 599.99, image: "image/escrivaninha.jpg" },
    { id: 2, name: "Sofá cor Beje", price: 349.99, image: "image/sofa cor beje.jpg" },
    { id: 3, name: "Kit sala de Estar", price: 999.99, image: "image/kit completo para sala de estar.jpg" },
    { id: 4, name: "Jogo de cozinha", price: 899.99, image: "image/jogo de cozinha.jpg" },
    { id: 5, name: "Hack tv", price: 399.99, image: "image/hack para tv.jpg" },
    { id: 6, name: "Guarda roupas", price: 29.99, image: "image/guarda roupas.jpg" },
    { id: 7, name: "Escrivaninha", price: 399.99, image: "image/escrivaninha.jpg" },
    { id: 8, name: "Estante", price: 599.99, image: "image/estante.jpg" },
    { id: 9, name: "Cadeira", price: 199.99, image: "image/cadeira.jpg" },
    { id: 10, name: "Kit de Cozinha", price: 99.99, image: "image/kit de cozinha.jpg" },
    { id: 11, name: "Relógio", price: 89.99, image: "image/relógio.jpg" },
];

// =========================
// Estado do carrinho
// =========================
let cart = [];

// =========================
// Elementos DOM
// =========================
const productsGrid = document.getElementById('products-grid');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

// =========================
// Inicialização
// =========================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCart();
});

// =========================
// Renderizar produtos
// =========================
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Eventos de adicionar ao carrinho
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// =========================
// Adicionar produto ao carrinho
// =========================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// =========================
// Remover produto do carrinho
// =========================
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// =========================
// Atualizar carrinho
// =========================
function updateCart() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color:#c7c7c7;">Seu carrinho está vazio</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="cart-item-remove" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);

    // Eventos para remover item
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// =========================
// Notificação estilo Steam
// =========================
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #141414;
        color: #66c0f4;
        border: 1px solid #66c0f4;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        z-index: 1001;
        font-weight: 500;
        opacity: 1;
        transition: transform 0.5s, opacity 0.5s;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateY(-20px)';
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
}

// =========================
// Abrir/Fechar carrinho
// =========================
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    // === Buscador de CEP ===
const cepForm = document.getElementById("cep-form");
if (cepForm) {
  const cepInput = document.getElementById("cep");
  const rua = document.getElementById("rua");
  const bairro = document.getElementById("bairro");
  const cidade = document.getElementById("cidade");
  const estado = document.getElementById("estado");

  cepForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) {
      alert("Digite um CEP válido com 8 dígitos!");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      rua.textContent = data.logradouro || "Não informado";
      bairro.textContent = data.bairro || "Não informado";
      cidade.textContent = data.localidade || "Não informado";
      estado.textContent = data.uf || "Não informado";

      cepForm.style.boxShadow = "0 0 20px rgba(102,192,244,0.3)";
    } catch (error) {
      alert("Erro ao buscar CEP. Tente novamente mais tarde.");
      console.error(error);
    }
  });
}

});
