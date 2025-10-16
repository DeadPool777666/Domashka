// Адрес Fake Store API
const API_URL = "https://fakestoreapi.com";

// Получить все товары
async function getProducts() {
  const res = await fetch(`${API_URL}/products`);
  const data = await res.json(); // превращаем ответ в обычный JS-массив
  return data;
}

// Получить товар по ID
async function getProductById(id) {
  const res = await fetch(`${API_URL}/products/${id}`);
  const data = await res.json();
  return data;
}

// Получить список категорий
async function getCategories() {
  const res = await fetch(`${API_URL}/products/categories`);
  const data = await res.json();
  return data;
}

// Получить товары по категории
async function getProductsByCategory(category) {
  const res = await fetch(`${API_URL}/products/category/${category}`);
  const data = await res.json();
  return data;
}
