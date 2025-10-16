// Когда страница загрузилась
document.addEventListener("DOMContentLoaded", async () => {
  // 1️⃣ Получаем ID товара из URL (например product.html?id=3)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // 2️⃣ Загружаем товар по ID через API
  const productData = await getProductById(id);

  // 3️⃣ Находим блок для вывода информации
  const container = document.getElementById("product-details");

  // 4️⃣ Отрисовываем карточку товара
  container.innerHTML = `
    <div class="product-page">
      <img src="${productData.image}" alt="${productData.title}">
      <h2>${productData.title}</h2>
      <p>${productData.description}</p>
      <p><strong>${productData.price} $</strong></p>
      <button id="add-to-cart">Добавить в корзину</button>
    </div>
  `;

  // 5️⃣ Кнопка "Добавить в корзину"
  const addBtn = document.getElementById("add-to-cart");
  addBtn.addEventListener("click", () => {
    // Берём корзину из localStorage (если нет — создаём пустую)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Проверяем, есть ли этот товар уже в корзине
    const found = cart.find(item => item.id === productData.id);

    if (found) {
      found.quantity++; // если есть — увеличиваем количество
    } else {
      cart.push({ id: productData.id, title: productData.title, price: productData.price, image: productData.image, quantity: 1 });
    }

    // Сохраняем обновлённую корзину обратно в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Товар добавлен в корзину!");
  });

  // 6️⃣ Кнопка "В каталог" — возвращаемся на главную страницу
  document.getElementById("to-catalog").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // 7️⃣ Кнопка "В корзину" — переходим на страницу корзины
  document.getElementById("to-cart").addEventListener("click", () => {
    window.location.href = "cart.html";
  });
});
