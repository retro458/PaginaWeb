// Registro de usuario
const registerForm = document.querySelector('form');

if(registerForm && window.location.pathname.includes('registro.html')) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if(!name || !email || !password) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    //confirm password
    if (password !== confirmPassword) {
        const toastEl = document.getElementById('passwordToast');
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
        //dar un tiempo para que el usuario vea el mensaje
        setTimeout(() => {
          toast.hide();
        }, 3000);
        return;
    }   
  
    // Verifica si el correo ya existe
    if(users.some(u => u.email === email)) {
      //alerta con toast
      const toastEL = document.getElementById('emailToast');
      const toast = new bootstrap.Toast(toastEL);
      toast.show();
      //dar un tiempo para que el usuario vea el mensaje
      setTimeout(() => {
        toast.hide();
      }, 3000);
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
      const toastEL = document.getElementById('registroToast');
      const toast = new bootstrap.Toast(toastEL);
      toast.show();
    registerForm.reset();
    //dar un tiempo para que el usuario vea el mensaje y luego redirigir
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
    
  });
}

// Login de usuario
const loginForm = document.querySelector('form');

if(loginForm && window.location.pathname.includes('login.html')) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if(user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert(`Bienvenido, ${user.name}!`);
      window.location.href = 'Index.html';
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  });
  
   
}

// Mantener sesión activa en Home
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// Ocultar links de login/registro si hay usuario
if(currentUser && window.location.pathname.includes('Index.html')) {
    const loginLink = document.querySelector('a[href="login.html"]');
    const registroLink = document.querySelector('a[href="registro.html"]'); 
    if (loginLink) loginLink.style.display = 'none';
    if (registroLink) registroLink.style.display = 'none';
}


if(currentUser && window.location.pathname.includes('Index.html')) {
  const nav = document.querySelector('.navbar-nav');

  const welcome = document.createElement('li');
  welcome.classList.add('nav-item');
  welcome.innerHTML = `<span class="nav-link">Hola, ${currentUser.name}</span>`;
  nav.appendChild(welcome);

  const logout = document.createElement('li');
  logout.classList.add('nav-item');
  logout.innerHTML = `<a class="nav-link" href="#" id="logoutBtn">Cerrar sesión</a>`;
  nav.appendChild(logout);

  document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.reload(); // tras recargar, los links volverán a mostrarse
  });
}
