// Когда страница загрузилась
document.addEventListener("DOMContentLoaded", async () => {
  // Получаем список товаров с Fake Store API
  const products = await getProducts();

  // Находим блок, куда будем вставлять карточки
  const container = document.getElementById("catalog");

  // Перебираем все товары и создаём для каждого карточку
  products.forEach(p => {
    // Создаём контейнер карточки
    const card = document.createElement("div");
    card.className = "card";

    // Заполняем карточку содержимым
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p>${p.price} $</p>
      <a href="product.html?id=${p.id}">Подробнее</a>
    `;

    // Добавляем карточку на страницу
    container.appendChild(card);
  });
});
