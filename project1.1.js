let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
    setTimeout(showSlides, 3000);
}
if (slides.length > 0) {
    slides[0].classList.add('active');
    showSlides();
}
if (next && prev) {
    next.addEventListener('click', () => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add('active');
    });
    prev.addEventListener('click', () => {
        slides[slideIndex].classList.remove('active');
        slideIndex = (slideIndex - 1 + slides.length) % slides.length;
        slides[slideIndex].classList.add('active');
    });
}
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartBtn = document.getElementById('cart-btn');

function updateCart() {
    if (cartBtn) {
        cartBtn.textContent = `🛒 Cart (${cart.length})`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const listItem = this.closest('.list-item');
        const itemName = listItem.querySelector('h3').textContent;
        const priceText = listItem.querySelector('span').textContent;
        const price = parseInt(priceText.replace('Rs ', ''));
        
        cart.push({name: itemName, price: price});
        updateCart();
  
        const originalText = this.textContent;
        this.textContent = '✓ Added';
        this.style.background = '#4CAF50';
        
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '#181818';
        }, 1000);
    });
});
const searchInput = document.getElementById('search-input');
const menuList = document.getElementById('menu-list');

if (searchInput && menuList) {
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const items = menuList.querySelectorAll('.list-item');
        
        items.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            item.style.display = itemName.includes(searchText) ? 'flex' : 'none';
        });
    });
}
if (cartBtn) {
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            window.location.href = 'bill.html';
        }
    });
}
updateCart();