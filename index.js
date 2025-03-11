// Фонды өзгерту үшін батырманы басқанда орындалатын функция
const toggleButton = document.querySelector('#toggle-theme');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Скидка қосу функциясы
function applyDiscount(price) {
    const discountPercentage = Math.floor(Math.random() * 26) + 5; // 5% - 30% аралығындағы кездейсоқ скидка
    const discountAmount = (price * discountPercentage) / 100;
    const newPrice = price - discountAmount;
    return { newPrice, discountPercentage };
}

// Барлық тауарларға скидка қосу
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    const originalPrice = parseInt(card.querySelector('.buy-button').dataset.price);
    const { newPrice, discountPercentage } = applyDiscount(originalPrice);
    card.querySelector('.discount-price').textContent = `Скидка: ${discountPercentage}% - Жаңа баға: ${newPrice.toFixed(2)} ₸`;
    card.querySelector('.original-price').textContent = `Бағасы: ${originalPrice} ₸`;
});

// Сатып алу батырмасын басқанда корзинаға қосу
const buyButtons = document.querySelectorAll('.buy-button');
const cartItems = document.querySelector('#cart-items');
const totalPriceElem = document.querySelector('#total-price');
let totalPrice = 0;

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        const productPrice = parseFloat(button.closest('.product-card').querySelector('.discount-price').textContent.match(/\d+\.\d+/)[0]);
        const li = document.createElement('li');
        li.textContent = `${productName} - ${productPrice.toFixed(2)} ₸`;
        cartItems.appendChild(li);

        totalPrice += productPrice;
        totalPriceElem.textContent = `Жалпы баға: ${totalPrice.toFixed(2)} ₸`;
    });
});

// Төлеу батырмасын басқанда хабарлама шығару
const checkoutButton = document.querySelector('#checkout');
const paymentMessage = document.querySelector('#payment-message');
checkoutButton.addEventListener('click', () => {
    if (totalPrice > 0) {
        paymentMessage.textContent = `Төлем жасалынды. Рақмет! Сіздің жалпы сомаңыз: ${totalPrice.toFixed(2)} ₸`;
        window.location.href = 'tolem.html';  // Төлем жасалған соң осы бетке өтеді
    } else {
        paymentMessage.textContent = 'Корзина бос, тауар қосыңыз.';
    }
});

// Джекбот нәтижесі
const jackpotButton = document.querySelector('#jackpot-button');
const jackpotResult = document.querySelector('#jackpot-result');

jackpotButton.addEventListener('click', () => {
    const jackpotChance = Math.random();
    if (jackpotChance > 0.5) {
        const discountAmount = (totalPrice * 0.2).toFixed(2); // 20% жеңілдік
        jackpotResult.textContent = `Құттықтаймыз! Сіз жеңіп алдыңыз! Сіздің жеңілдігіңіз: ${discountAmount} ₸`;
        totalPrice -= discountAmount;
        totalPriceElem.textContent = `Жалпы баға: ${totalPrice.toFixed(2)} ₸`;
    } else {
        jackpotResult.textContent = 'Бұл жолы сәттілік жетпеді, бірақ қайтадан қолданып көріңіз!';
    }
});
