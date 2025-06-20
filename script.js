// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Product category filtering
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Shopping cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const addToCartBtns = document.querySelectorAll('.btn-add-cart');

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        cartCount++;
        cartCountElement.textContent = cartCount;
        
        // Add animation effect
        btn.style.transform = 'scale(1.2)';
        btn.style.background = '#45a049';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.background = '#4CAF50';
        }, 200);
        
        // Show notification
        showNotification('Mahsulot savatga qo\'shildi!');
    });
});

// Wishlist functionality
const wishlistBtns = document.querySelectorAll('.btn-wishlist');

wishlistBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        btn.classList.toggle('active');
        
        if (btn.classList.contains('active')) {
            btn.style.background = '#ff3742';
            showNotification('Mahsulot sevimlilar ro\'yxatiga qo\'shildi!');
        } else {
            btn.style.background = '#ff4757';
            showNotification('Mahsulot sevimlilar ro\'yxatidan olib tashlandi!');
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    if (name && email && message) {
        showNotification('Xabaringiz muvaffaqiyatli yuborildi!');
        contactForm.reset();
    } else {
        showNotification('Iltimos, barcha maydonlarni to\'ldiring!', 'error');
    }
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#ff4757'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .about-text, .contact-item');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
});

// Product hover effects
productCards.forEach(card => {
    const img = card.querySelector('.product-image img');
    
    card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Hero image parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const speed = scrolled * 0.5;
        heroImage.style.transform = `translateY(${speed}px) scale(1.05)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
});

// Search functionality
const searchIcon = document.querySelector('.nav-icons .fa-search');

searchIcon.addEventListener('click', () => {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Mahsulot qidiring...';
    searchInput.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem;
        border: 2px solid #4CAF50;
        border-radius: 25px;
        font-size: 1rem;
        width: 300px;
        z-index: 10000;
        background: white;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    
    document.body.appendChild(overlay);
    document.body.appendChild(searchInput);
    searchInput.focus();
    
    const closeSearch = () => {
        document.body.removeChild(overlay);
        document.body.removeChild(searchInput);
    };
    
    overlay.addEventListener('click', closeSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase();
            closeSearch();
            
            // Filter products based on search term
            productCards.forEach(card => {
                const productName = card.querySelector('h3').textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (searchTerm) {
                showNotification(`"${searchTerm}" uchun qidiruv natijalari`);
            }
        }
    });
});

// Dynamic product data for additional products
const additionalProducts = {
    fruits: [
        { name: "Toza Olma", price: "25,000", oldPrice: "30,000", rating: 4.7, image: "images/fruits_vegetables_1.jpg" },
        { name: "Shirin Nok", price: "28,000", oldPrice: "35,000", rating: 4.8, image: "images/fruits_vegetables_2.jpg" },
        { name: "Toza Uzum", price: "40,000", oldPrice: "48,000", rating: 4.9, image: "images/fruits_vegetables_3.jpg" },
        { name: "Shaftoli", price: "35,000", oldPrice: "42,000", rating: 4.6, image: "images/fruits_vegetables_4.jpg" },
        { name: "Anor", price: "50,000", oldPrice: "60,000", rating: 4.8, image: "images/fruits_vegetables_1.jpg" },
        { name: "Banan", price: "30,000", oldPrice: "35,000", rating: 4.7, image: "images/fruits_vegetables_2.jpg" },
        { name: "Apelsin", price: "32,000", oldPrice: "38,000", rating: 4.8, image: "images/fruits_vegetables_3.jpg" },
        { name: "Mandarin", price: "28,000", oldPrice: "33,000", rating: 4.6, image: "images/fruits_vegetables_4.jpg" },
        { name: "Limon", price: "25,000", oldPrice: "30,000", rating: 4.5, image: "images/fruits_vegetables_1.jpg" },
        { name: "Kivi", price: "45,000", oldPrice: "52,000", rating: 4.7, image: "images/fruits_vegetables_2.jpg" },
        { name: "Mango", price: "80,000", oldPrice: "95,000", rating: 4.9, image: "images/fruits_vegetables_3.jpg" },
        { name: "Avokado", price: "70,000", oldPrice: "85,000", rating: 4.8, image: "images/fruits_vegetables_4.jpg" },
        { name: "Ananas", price: "60,000", oldPrice: "75,000", rating: 4.7, image: "images/fruits_vegetables_1.jpg" },
        { name: "Kokos", price: "35,000", oldPrice: "42,000", rating: 4.6, image: "images/fruits_vegetables_2.jpg" },
        { name: "Papaya", price: "55,000", oldPrice: "65,000", rating: 4.8, image: "images/fruits_vegetables_3.jpg" },
        { name: "Passion Fruit", price: "90,000", oldPrice: "105,000", rating: 4.9, image: "images/fruits_vegetables_4.jpg" }
    ],
    vegetables: [
        { name: "Toza Kartoshka", price: "15,000", oldPrice: "18,000", rating: 4.5, image: "images/fruits_vegetables_1.jpg" },
        { name: "Piyoz", price: "12,000", oldPrice: "15,000", rating: 4.6, image: "images/fruits_vegetables_2.jpg" },
        { name: "Sabzi", price: "18,000", oldPrice: "22,000", rating: 4.7, image: "images/fruits_vegetables_3.jpg" },
        { name: "Sholg'om", price: "14,000", oldPrice: "17,000", rating: 4.5, image: "images/fruits_vegetables_4.jpg" },
        { name: "Bodring", price: "20,000", oldPrice: "25,000", rating: 4.8, image: "images/fruits_vegetables_1.jpg" },
        { name: "Pomidor", price: "22,000", oldPrice: "28,000", rating: 4.7, image: "images/fruits_vegetables_2.jpg" },
        { name: "Qalampir", price: "25,000", oldPrice: "30,000", rating: 4.8, image: "images/fruits_vegetables_3.jpg" },
        { name: "Baqlajon", price: "18,000", oldPrice: "23,000", rating: 4.6, image: "images/fruits_vegetables_4.jpg" },
        { name: "Karam", price: "16,000", oldPrice: "20,000", rating: 4.5, image: "images/fruits_vegetables_1.jpg" },
        { name: "Salat", price: "12,000", oldPrice: "15,000", rating: 4.7, image: "images/fruits_vegetables_2.jpg" },
        { name: "Ismaloq", price: "8,000", oldPrice: "10,000", rating: 4.6, image: "images/fruits_vegetables_3.jpg" },
        { name: "Jag'jag'", price: "10,000", oldPrice: "12,000", rating: 4.5, image: "images/fruits_vegetables_4.jpg" },
        { name: "Qovun", price: "30,000", oldPrice: "38,000", rating: 4.8, image: "images/fruits_vegetables_1.jpg" },
        { name: "Tarvuz", price: "25,000", oldPrice: "32,000", rating: 4.7, image: "images/fruits_vegetables_2.jpg" },
        { name: "Qovoq", price: "20,000", oldPrice: "25,000", rating: 4.6, image: "images/fruits_vegetables_3.jpg" },
        { name: "Turp", price: "14,000", oldPrice: "18,000", rating: 4.5, image: "images/fruits_vegetables_4.jpg" }
    ],
    meat: [
        { name: "Tovuq Go'shti", price: "80,000", oldPrice: "95,000", rating: 4.6, image: "images/meat_5.jpg" },
        { name: "Baliq", price: "100,000", oldPrice: "120,000", rating: 4.7, image: "images/meat_6.jpg" },
        { name: "Qo'zi Go'shti", price: "160,000", oldPrice: "180,000", rating: 4.8, image: "images/meat_7.png" },
        { name: "Kolbasa", price: "90,000", oldPrice: "110,000", rating: 4.5, image: "images/meat_8.jpg" },
        { name: "Sosiska", price: "70,000", oldPrice: "85,000", rating: 4.4, image: "images/meat_1.png" },
        { name: "Mol Jigar", price: "85,000", oldPrice: "100,000", rating: 4.6, image: "images/meat_2.jpg" },
        { name: "Qo'y Jigar", price: "95,000", oldPrice: "115,000", rating: 4.7, image: "images/meat_3.jpg" },
        { name: "Buyrak", price: "75,000", oldPrice: "90,000", rating: 4.5, image: "images/meat_4.jpg" },
        { name: "Yurak", price: "80,000", oldPrice: "95,000", rating: 4.6, image: "images/meat_5.jpg" },
        { name: "Til", price: "120,000", oldPrice: "140,000", rating: 4.8, image: "images/meat_6.jpg" },
        { name: "Miya", price: "110,000", oldPrice: "130,000", rating: 4.7, image: "images/meat_7.png" },
        { name: "Qovurga", price: "130,000", oldPrice: "150,000", rating: 4.8, image: "images/meat_8.jpg" },
        { name: "Bifshteks", price: "200,000", oldPrice: "230,000", rating: 4.9, image: "images/meat_1.png" },
        { name: "Shashlyk Go'shti", price: "180,000", oldPrice: "210,000", rating: 4.8, image: "images/meat_2.jpg" },
        { name: "Qiyma", price: "90,000", oldPrice: "110,000", rating: 4.6, image: "images/meat_3.jpg" },
        { name: "Dumba", price: "70,000", oldPrice: "85,000", rating: 4.5, image: "images/meat_4.jpg" }
    ],
    bread: [
        { name: "Oq Non", price: "6,000", oldPrice: "8,000", rating: 4.5, image: "images/bread_5.jpg" },
        { name: "Qora Non", price: "7,000", oldPrice: "9,000", rating: 4.6, image: "images/bread_6.jpg" },
        { name: "Lavash", price: "5,000", oldPrice: "7,000", rating: 4.4, image: "images/bread_7.jpg" },
        { name: "Patir", price: "4,000", oldPrice: "6,000", rating: 4.3, image: "images/bread_8.jpg" },
        { name: "Kulcha", price: "3,000", oldPrice: "5,000", rating: 4.2, image: "images/bread_1.jpg" },
        { name: "Somsa", price: "15,000", oldPrice: "18,000", rating: 4.8, image: "images/bread_2.jpg" },
        { name: "Cheburek", price: "12,000", oldPrice: "15,000", rating: 4.7, image: "images/bread_3.jpg" },
        { name: "Belyash", price: "10,000", oldPrice: "13,000", rating: 4.6, image: "images/bread_4.jpg" },
        { name: "Pishiriq", price: "8,000", oldPrice: "10,000", rating: 4.5, image: "images/bread_5.jpg" },
        { name: "Keks", price: "25,000", oldPrice: "30,000", rating: 4.7, image: "images/bread_6.jpg" },
        { name: "Tort", price: "80,000", oldPrice: "100,000", rating: 4.9, image: "images/bread_7.jpg" },
        { name: "Pirog", price: "35,000", oldPrice: "42,000", rating: 4.8, image: "images/bread_8.jpg" },
        { name: "Bulochka", price: "5,000", oldPrice: "7,000", rating: 4.4, image: "images/bread_1.jpg" },
        { name: "Croissant", price: "18,000", oldPrice: "22,000", rating: 4.7, image: "images/bread_2.jpg" },
        { name: "Bagel", price: "12,000", oldPrice: "15,000", rating: 4.6, image: "images/bread_3.jpg" },
        { name: "Donut", price: "15,000", oldPrice: "18,000", rating: 4.5, image: "images/bread_4.jpg" }
    ],
    clothing: [
        { name: "Ko'ylak", price: "120,000", oldPrice: "150,000", rating: 4.6, image: "images/clothing_5.png" },
        { name: "Shim", price: "180,000", oldPrice: "220,000", rating: 4.7, image: "images/clothing_6.png" },
        { name: "Kurtka", price: "300,000", oldPrice: "380,000", rating: 4.8, image: "images/clothing_7.jpg" },
        { name: "Palto", price: "450,000", oldPrice: "550,000", rating: 4.9, image: "images/clothing_8.png" },
        { name: "Futbolka", price: "80,000", oldPrice: "100,000", rating: 4.5, image: "images/clothing_1.jpg" },
        { name: "Sviter", price: "200,000", oldPrice: "250,000", rating: 4.7, image: "images/clothing_2.jpg" },
        { name: "Jins", price: "220,000", oldPrice: "280,000", rating: 4.8, image: "images/clothing_3.jpg" },
        { name: "Kostyum", price: "500,000", oldPrice: "650,000", rating: 4.9, image: "images/clothing_4.png" },
        { name: "Galstuk", price: "50,000", oldPrice: "65,000", rating: 4.4, image: "images/clothing_5.png" },
        { name: "Shapka", price: "70,000", oldPrice: "90,000", rating: 4.5, image: "images/clothing_6.png" },
        { name: "Qo'lqop", price: "40,000", oldPrice: "50,000", rating: 4.3, image: "images/clothing_7.jpg" },
        { name: "Paypoq", price: "25,000", oldPrice: "30,000", rating: 4.2, image: "images/clothing_8.png" },
        { name: "Ichki Kiyim", price: "60,000", oldPrice: "75,000", rating: 4.4, image: "images/clothing_1.jpg" },
        { name: "Pijama", price: "90,000", oldPrice: "110,000", rating: 4.6, image: "images/clothing_2.jpg" },
        { name: "Sport Kiyim", price: "150,000", oldPrice: "190,000", rating: 4.7, image: "images/clothing_3.jpg" },
        { name: "Yomg'ir Kiyim", price: "180,000", oldPrice: "220,000", rating: 4.6, image: "images/clothing_4.png" }
    ]
};

// Load more products functionality
let currentlyShown = {};
const loadMoreBtn = document.getElementById('load-more-btn');
const productsGrid = document.getElementById('products-grid');

// Initialize shown count for each category
Object.keys(additionalProducts).forEach(category => {
    currentlyShown[category] = 0;
});

function createProductCard(product, category) {
    return `
        <div class="product-card hidden" data-category="${category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="btn-add-cart">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                    <button class="btn-wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${generateStars(product.rating)}
                    <span>(${product.rating})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${product.price} so'm</span>
                    <span class="old-price">${product.oldPrice} so'm</span>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="far fa-star"></i>';
    }
    
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

loadMoreBtn.addEventListener('click', () => {
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
    
    if (activeCategory === 'all') {
        // Load more from all categories
        Object.keys(additionalProducts).forEach(category => {
            const products = additionalProducts[category];
            const startIndex = currentlyShown[category];
            const endIndex = Math.min(startIndex + 4, products.length);
            
            for (let i = startIndex; i < endIndex; i++) {
                const productHTML = createProductCard(products[i], category);
                productsGrid.insertAdjacentHTML('beforeend', productHTML);
            }
            
            currentlyShown[category] = endIndex;
        });
    } else {
        // Load more from specific category
        const products = additionalProducts[activeCategory];
        if (products) {
            const startIndex = currentlyShown[activeCategory];
            const endIndex = Math.min(startIndex + 8, products.length);
            
            for (let i = startIndex; i < endIndex; i++) {
                const productHTML = createProductCard(products[i], activeCategory);
                productsGrid.insertAdjacentHTML('beforeend', productHTML);
            }
            
            currentlyShown[activeCategory] = endIndex;
        }
    }
    
    // Re-attach event listeners to new buttons
    attachEventListeners();
    
    // Check if we should hide the load more button
    checkLoadMoreVisibility();
});

function attachEventListeners() {
    // Re-attach cart and wishlist event listeners
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.removeEventListener('click', handleAddToCart);
        btn.addEventListener('click', handleAddToCart);
    });
    
    document.querySelectorAll('.btn-wishlist').forEach(btn => {
        btn.removeEventListener('click', handleWishlist);
        btn.addEventListener('click', handleWishlist);
    });
}

function handleAddToCart(e) {
    e.preventDefault();
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    const btn = e.target.closest('.btn-add-cart');
    btn.style.transform = 'scale(1.2)';
    btn.style.background = '#45a049';
    
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
        btn.style.background = '#4CAF50';
    }, 200);
    
    showNotification('Mahsulot savatga qo\'shildi!');
}

function handleWishlist(e) {
    e.preventDefault();
    const btn = e.target.closest('.btn-wishlist');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
        btn.style.background = '#ff3742';
        showNotification('Mahsulot sevimlilar ro\'yxatiga qo\'shildi!');
    } else {
        btn.style.background = '#ff4757';
        showNotification('Mahsulot sevimlilar ro\'yxatidan olib tashlandi!');
    }
}

function checkLoadMoreVisibility() {
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
    let hasMore = false;
    
    if (activeCategory === 'all') {
        hasMore = Object.keys(additionalProducts).some(category => 
            currentlyShown[category] < additionalProducts[category].length
        );
    } else {
        hasMore = additionalProducts[activeCategory] && 
                  currentlyShown[activeCategory] < additionalProducts[activeCategory].length;
    }
    
    loadMoreBtn.style.display = hasMore ? 'block' : 'none';
}

// Update category filtering to work with dynamically loaded products
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setTimeout(() => {
            checkLoadMoreVisibility();
        }, 100);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
`;

document.head.appendChild(style);

// Add pulse animation to featured products
setTimeout(() => {
    const featuredProducts = document.querySelectorAll('.product-card:nth-child(-n+2)');
    featuredProducts.forEach(product => {
        product.classList.add('pulse');
    });
}, 2000);

// Initialize load more button visibility
document.addEventListener('DOMContentLoaded', () => {
    checkLoadMoreVisibility();
});

