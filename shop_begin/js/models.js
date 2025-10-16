// Класс пользователя
class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  // Проверка пароля (сравнивает введённый пароль с сохранённым)
  checkPassword(password) {
    return this.password === password;
  }
}

// Класс товара
class Product {
  constructor(id, title, price, description, image, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    this.category = category;
  }

  // Возвращает HTML карточку товара
  renderCard() {
    return `
      <div class="product-card" data-id="${this.id}">
        <img src="${this.image}" alt="${this.title}">
        <h3>${this.title}</h3>
        <p>${this.price} $</p>
        <button class="details-btn" data-id="${this.id}">Подробнее</button>
      </div>
    `;
  }
}

// Класс одного товара в корзине
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;  // сам товар (объект Product)
    this.quantity = quantity; // сколько штук
  }

  // Считает общую цену за этот товар
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

// Класс корзины (все товары)
class Cart {
  constructor(items = []) {
    this.items = items; // массив товаров (CartItem)
  }

  // Добавить товар
  addItem(product) {
    // ищем, есть ли уже такой товар
    const found = this.items.find(item => item.product.id === product.id);
    if (found) {
      found.quantity++; // если есть — увеличиваем количество
    } else {
      this.items.push(new CartItem(product, 1)); // если нет — добавляем новый
    }
  }

  // Удалить товар по ID
  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  // Посчитать общую сумму
  getTotal() {
    let sum = 0;
    for (let item of this.items) {
      sum += item.getTotalPrice();
    }
    return sum;
  }

  // Очистить корзину
  clear() {
    this.items = [];
  }
}



