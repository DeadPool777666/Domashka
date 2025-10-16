document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  const showLoginBtn = document.getElementById("show-login");
  const showRegisterBtn = document.getElementById("show-register");

  // 🔹 Переключение вкладок (Вход / Регистрация)
  showLoginBtn.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  });

  showRegisterBtn.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // 🔹 Обработка регистрации
  const registerBtn = document.getElementById("register-btn");
  if (registerBtn) {
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value.trim();

      if (!name || !email || !password) {
        alert("Пожалуйста, заполните все поля!");
        return;
      }

      // Загружаем список пользователей из localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Проверяем, есть ли уже пользователь с таким email
      const existing = users.find(u => u.email === email);
      if (existing) {
        alert("Пользователь с таким email уже зарегистрирован!");
        return;
      }

      // Создаём нового пользователя (можно без класса, просто объект)
      const newUser = { name, email, password };

      // Добавляем в список и сохраняем
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("Регистрация прошла успешно! Теперь войдите.");
      loginForm.style.display = "block";
      registerForm.style.display = "none";
    });
  }

  // 🔹 Обработка входа
  const loginBtn = document.getElementById("login-btn");
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!email || !password) {
        alert("Введите email и пароль!");
        return;
      }

      // Получаем всех пользователей
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Проверяем, есть ли пользователь с таким email и паролем
      const found = users.find(u => u.email === email && u.password === password);

      if (found) {
        // Сохраняем текущего пользователя
        localStorage.setItem("currentUser", JSON.stringify(found));
        alert("Добро пожаловать, " + found.name + "!");
        window.location.href = "index.html";
      } else {
        alert("Неверный email или пароль!");
      }
    });
  }
});
