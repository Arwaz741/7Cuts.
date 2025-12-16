import { db } from './firebase.js';
import { collection, onSnapshot, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { showLoader, formatPrice } from './ui.js';

// Fetch Banners
export const loadBanners = (elementId) => {
    onSnapshot(collection(db, "banners"), (snapshot) => {
        const banners = snapshot.docs.map(doc => doc.data()).sort((a,b) => a.order - b.order);
        if(banners.length > 0) {
            document.getElementById(elementId).src = banners[0].imageUrl;
            // Note: Full slider logic omitted for brevity, but array is ready
        }
    });
};

// Fetch Products (Real-time)
export const loadProducts = (containerId, category = null) => {
    showLoader(true);
    let q = collection(db, "products");
    if(category) q = query(q, where("category", "==", category));

    onSnapshot(q, (snapshot) => {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        snapshot.forEach(doc => {
            const p = doc.data();
            const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
            
            const card = `
                <div class="product-card" onclick="window.location.href='product.html?id=${doc.id}'">
                    <img src="${p.image}" class="product-img" alt="${p.name}">
                    <div class="p-title">${p.name}</div>
                    <div style="width:100%">
                        <span class="p-price">${formatPrice(p.price)}</span>
                        <span class="p-mrp">${formatPrice(p.mrp)}</span>
                        <span class="p-off">${discount}% off</span>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
        showLoader(false);
    });
};

// Fetch Single Product
export const loadProductDetails = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() };
    return null;
};
