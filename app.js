// js/app.js

// Abrir la base de datos local (IndexedDB)
const request = indexedDB.open('pwaDB', 1);

request.onerror = (event) => {
  console.log('Error al abrir la base de datos:', event);
};

request.onsuccess = (event) => {
  const db = event.target.result;
  console.log('Base de datos abierta con éxito');

  // Mostrar usuarios
  displayUsers(db);
};

// Crear la base de datos y la tabla de usuarios
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  const objectStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
  objectStore.createIndex('name', 'name', { unique: false });
  objectStore.createIndex('email', 'email', { unique: true });
};

// Agregar un usuario
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const user = { name, email };

  // Agregar a la base de datos
  request.onsuccess = (event) => {
    const db = event.target.result;
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');
    objectStore.add(user);

    transaction.oncomplete = () => {
      console.log('Usuario registrado con éxito');
      displayUsers(db);
    };

    transaction.onerror = (event) => {
      console.log('Error al agregar el usuario:', event);
    };
  };
});

// Mostrar los usuarios registrados
function displayUsers(db) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Limpiar la lista

  const transaction = db.transaction(['users'], 'readonly');
  const objectStore = transaction.objectStore('users');
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const users = event.target.result;
    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = `${user.name} - ${user.email}`;
      userList.appendChild(li);
    });
  };
}
