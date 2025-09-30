// Clientes (ejemplo)
const clientes = [
  { nombre: "Empresa A", descripcion: "Software de gestión empresarial", },
  { nombre: "Startup B", descripcion: "Infraestructura en la nube", },
  { nombre: "Corporación C", descripcion: "Aplicaciones personalizadas",  }
];

// Renderizar clientes
const contenedor = document.getElementById("clientes-container");
clientes.forEach(cliente => {
  const col = document.createElement("div");
  col.className = "col-md-4";
  col.innerHTML = `
    <div class="card h-100 shadow-sm">
      <img src="${cliente.logo}" class="card-img-top" alt="${cliente.nombre}">
      <div class="card-body text-center">
        <h5 class="card-title">${cliente.nombre}</h5>
        <p class="card-text">${cliente.descripcion}</p>
      </div>
    </div>
  `;
  contenedor.appendChild(col);
});

// Softwares disponibles
const softwares = [
  { nombre: "ERP Empresarial", precio: 1200 },
  { nombre: "CRM de Ventas", precio: 800 },
  { nombre: "Punto de Venta", precio: 600 },
  { nombre: "Gestor de Inventario", precio: 500 }
];

// Llenar select de licencias
const selectSoftware = document.getElementById("software");
softwares.forEach(soft => {
  const option = document.createElement("option");
  option.value = soft.nombre;
  option.textContent = `${soft.nombre} - $${soft.precio}`;
  selectSoftware.appendChild(option);
});

// Evento compra licencia
document.getElementById("licenciaForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const seleccionado = selectSoftware.value;

  const toastEl = document.getElementById("toastCompra");
  const toast = new bootstrap.Toast(toastEl);

  document.querySelector("#toastCompra .toast-body").textContent =
    ` Compra realizada: ${seleccionado}`;

  toast.show();

  // Cierra el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById("licenciasModal"));
  modal.hide();
});
const container = document.getElementById("clientes-container");
const cotizarForm = document.getElementById("cotizarForm");
const licenciaForm = document.getElementById("licenciaForm");
const toastEl = document.getElementById("toastCompra");
const toast = new bootstrap.Toast(toastEl);

// Renderizar clientes al cargar
function renderClientes() {
  container.innerHTML = "";
  clientes.forEach(cliente => {
    const card = document.createElement("div");
    card.classList.add("col-md-4", "mb-3");
    card.innerHTML = `
      <div class="card h-100 shadow-sm text-center">
        <div class="card-body">
          <h5 class="card-title">${cliente.nombre}</h5>
          <p class="card-text">${cliente.descripcion}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Evento al enviar cotización
cotizarForm.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const tipo = document.getElementById("tipo").value;

  clientes.push({
    nombre: nombre,
    descripcion: `Cotizó un software: ${tipo}`
  });

  renderClientes();
  toast.show();

  cotizarForm.reset();
  bootstrap.Modal.getInstance(document.getElementById("cotizarModal")).hide();
});

// Evento al comprar licencia
licenciaForm.addEventListener("submit", e => {
  e.preventDefault();
  const nombre = prompt("Ingrese su nombre para registrar la compra:");
  const software = document.getElementById("software").value;

  clientes.push({
    nombre: nombre || "Cliente Anónimo",
    descripcion: `Compró licencia de: ${software}`
  });

  renderClientes();
  toast.show();

  licenciaForm.reset();
  bootstrap.Modal.getInstance(document.getElementById("licenciasModal")).hide();
});



// Inicializar lista
renderClientes();
// Evento cotización
document.getElementById("cotizarForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Cotización enviada correctamente ");
  const modal = bootstrap.Modal.getInstance(document.getElementById("cotizarModal"));
  modal.hide();
});
