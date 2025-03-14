const products = [
    {
        id: 1,
        name: "Classic Runner",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        description: "Timeless design meets modern comfort in these versatile runners."
    },
    {
        id: 2,
        name: "Urban Sport",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
        description: "Perfect for city life with enhanced cushioning and style."
    },
    {
        id: 3,
        name: "Performance Elite",
        price: 179.99,
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570",
        description: "Professional-grade athletic shoes for serious athletes."
    },
    {
        id: 4,
        name: "Street Style Pro",
        price: 139.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        description: "Urban fashion meets performance in these street-ready kicks."
    },
    {
        id: 5,
        name: "Comfort Plus",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
        description: "Maximum comfort for all-day wear with premium materials."
    }
];


let cart = [];
let wishlist = [];


const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const cartItems = document.getElementById('cartItems');
const wishlistItems = document.getElementById('wishlistItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const wishlistCount = document.querySelector('.wishlist-count');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const closeCart = document.getElementById('closeCart');
const closeWishlist = document.getElementById('closeWishlist');
const checkoutBtn = document.getElementById('checkoutBtn');


function initializeProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" 
                        onclick="toggleWishlist(${product.id})">
                    ♥
                </button>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price} × ${item.quantity}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

   
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);

    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;
}


function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index === -1) {
        wishlist.push(productId);
    } else {
        wishlist.splice(index, 1);
    }
    updateWishlist();
    initializeProducts(); 
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    updateWishlist();
    initializeProducts();
}

function updateWishlist() {
    wishlistCount.textContent = wishlist.length;
    
    
    wishlistItems.innerHTML = wishlist.map(productId => {
        const product = products.find(p => p.id === productId);
        return `
            <div class="wishlist-item">
                <img src="${product.image}" alt="${product.name}">
                <div class="wishlist-item-info">
                    <h4>${product.name}</h4>
                    <p>$${product.price}</p>
                </div>
                <button class="remove-btn" onclick="removeFromWishlist(${product.id})">×</button>
            </div>
        `;
    }).join('');
}


cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    wishlistSidebar.classList.remove('open');
});

wishlistBtn.addEventListener('click', () => {
    wishlistSidebar.classList.add('open');
    cartSidebar.classList.remove('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});

closeWishlist.addEventListener('click', () => {
    wishlistSidebar.classList.remove('open');
});


checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your purchase! This is a dummy checkout.');
    cart = [];
    updateCart();
    cartSidebar.classList.remove('open');
});


initializeProducts();
updateCart();
updateWishlist();


document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartBtn.contains(e.target)) {
        cartSidebar.classList.remove('open');
    }
    if (!wishlistSidebar.contains(e.target) && !wishlistBtn.contains(e.target)) {
        wishlistSidebar.classList.remove('open');
    }
});


function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}


const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
});


function initializeAnimations() {
    
    document.querySelector('.hero-content').classList.add('slide-in-left');
    document.querySelector('.hero-image').classList.add('slide-in-right');

    
    const aboutSection = document.querySelector('.about');
    aboutSection.querySelector('h2').classList.add('fade-in');
    aboutSection.querySelector('.about-text').classList.add('slide-in-left');
    aboutSection.querySelector('.about-image').classList.add('slide-in-right');

    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });

   
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        setTimeout(() => {
            section.classList.add('slide-up');
        }, index * 200);
    });
}


document.addEventListener('DOMContentLoaded', initializeAnimations);