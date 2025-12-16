import { showToast } from './ui.js';

export const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];

export const addToCart = (product) => {
    let cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast("Item added to cart");
    updateBadge();
};

export const removeFromCart = (id) => {
    let cart = getCart().filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateBadge();
    return cart; // Return new state
};

export const updateBadge = () => {
    const count = getCart().reduce((acc, item) => acc + item.qty, 0);
    const badge = document.getElementById('cart-badge');
    if(badge) {
        badge.innerText = count;
        badge.style.display = count > 0 ? 'block' : 'none';
    }
};
