fetch('./data/data.json')
    .then(response => response.json())
    .then(data => {
        const menuContainer = document.getElementById('menu');
        menuContainer.innerHTML = data.map(product => `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>${product.price} ₽</p>
                <a href="card.html" class="buy-button" data-id="${product.id}">Купить</a>
            </div>
        `).join('');

        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const product = data.find(item => item.id === productId);
                localStorage.setItem('selectedProductId', productId);
               });
        });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));