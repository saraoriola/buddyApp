// Manejar el cambio de rutas
function handleRouteChange() {
    const hash = window.location.hash.slice(2);
    const app = document.getElementById('app');
  
    switch (hash) {
      case '/':
        app.innerHTML = '<h2>Welcome to the Home Page</h2>';
        break;
      case '/register':
        renderRegisterForm(app);
        break;
      case '/login':
        renderLoginForm(app);
        break;
      default:
        app.innerHTML = '<h2>Page Not Found</h2>';
        break;
    }
  }
  
  // Renderizar el formulario de registro
  function renderRegisterForm(container) {
    container.innerHTML = `
      <h2>Register Page</h2>
      <form id='registerForm' onsubmit='submitRegisterForm(event)'>
        <label for='name'>Name:</label>
        <input type='text' id='name' name='name' required>
        <label for='lastName'>Last Name:</label>
        <input type='text' id='lastName' name='lastName' required>
        <label for='email'>Email:</label>
        <input type='email' id='email' name='email' required>
        <label for='password'>Password:</label>
        <input type='password' id='password' name='password' required>
        <button type='submit'>Register</button>
      </form>
    `;
  }
  
  // Renderizar el formulario de inicio de sesión
  function renderLoginForm(container) {
    container.innerHTML = `
      <h2>Login Page</h2>
      <form id='loginForm' onsubmit='submitLoginForm(event)'>
        <label for='email'>Email:</label>
        <input type='email' id='email' name='email' required>
        <label for='password'>Password:</label>
        <input type='password' id='password' name='password' required>
        <button type='submit'>Login</button>
      </form>
    `;
  }
  
  // Función para enviar el formulario de registro
  function submitRegisterForm(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Realizar la solicitud HTTP de registro a la API
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, lastName, email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Error durante el registro
          alert(data.message);
        } else {
          // Registro exitoso
          alert(data.message);
          // Redirigir a la página de inicio de sesión
          window.location.hash = '#/login';
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error during registration');
      });
  }
  
  // Función para enviar el formulario de inicio de sesión
  function submitLoginForm(event) {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Realizar la solicitud HTTP de inicio de sesión a la API
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          // Error durante el inicio de sesión
          alert(data.message);
        } else {
          // Inicio de sesión exitoso
          alert(data.message);
          // Redirigir a otra página
          // ...
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error during login');
      });
  }
  
  window.addEventListener('hashchange', handleRouteChange);
  handleRouteChange();
  