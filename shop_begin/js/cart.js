document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("cart-items"); // блок для товаров
  const totalElem = document.getElementById("cart-total"); // блок для суммы

  // 1️⃣ Загружаем корзину из localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Если корзина пуста — показываем сообщение
  if (cart.length === 0) {
    container.innerHTML = "<p>Корзина пуста</p>";
    totalElem.textContent = "0 $";
    return;
  }

  // 2️⃣ Очищаем контейнер перед отрисовкой
  container.innerHTML = "";

  // 3️⃣ Переменная для общей суммы
  let total = 0;

  // 4️⃣ Перебираем товары в корзине
  for (let item of cart) {
    // Подгружаем данные о товаре из API (на всякий случай, если они устарели)
    const product = await getProductById(item.id);

    // Считаем общую сумму
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Создаём элемент для товара
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.price} $ × ${item.quantity}</p>
      <p><strong>${itemTotal.toFixed(2)} $</strong></p>
      <button class="remove-btn" data-id="${item.id}">Удалить</button>
    `;

    container.appendChild(div);
  }

  // 5️⃣ Показываем итоговую сумму
  totalElem.textContent = total.toFixed(2) + " $";

  // 6️⃣ Удаление товара
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const id = Number(e.target.dataset.id);

      // Удаляем товар из массива
      cart = cart.filter(item => item.id !== id);

      // Сохраняем обновлённую корзину
      localStorage.setItem("cart", JSON.stringify(cart));

      // Перерисовываем корзину
      location.reload();
    }
  });
});
