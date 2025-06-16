// app.js

// Manejo de formulario citas
document.getElementById("formCita").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value.trim();
    const mascota = document.getElementById("mascota").value.trim();
    const fecha = document.getElementById("fecha").value;
    const motivo = document.getElementById("motivo").value;
  
    if (!nombre || !mascota || !fecha || !motivo) {
      alert("Por favor completa todos los campos.");
      return;
    }
  
    const cita = {
      nombre,
      mascota,
      fecha,
      motivo,
    };
  
    let citas = JSON.parse(localStorage.getItem("citas") || "[]");
    citas.push(cita);
    localStorage.setItem("citas", JSON.stringify(citas));
  
    alert("Cita agendada correctamente!");
  
    e.target.reset();
  
    mostrarRecordatorios();
  });
  
  // Mostrar recordatorios para citas próximas
  function mostrarRecordatorios() {
    const contenedor = document.getElementById("recordatorios");
    let citas = JSON.parse(localStorage.getItem("citas") || "[]");
    if (citas.length === 0) {
      contenedor.innerHTML = "<p>No hay recordatorios todavía.</p>";
      return;
    }
  
    // Filtrar citas próximas (dentro de 7 días)
    const hoy = new Date();
    const sieteDiasDespues = new Date();
    sieteDiasDespues.setDate(hoy.getDate() + 7);
  
    const proximas = citas.filter((cita) => {
      const fechaCita = new Date(cita.fecha);
      return fechaCita >= hoy && fechaCita <= sieteDiasDespues;
    });
  
    if (proximas.length === 0) {
      contenedor.innerHTML = "<p>No hay recordatorios próximos.</p>";
      return;
    }
  
    contenedor.innerHTML = proximas
      .map(
        (cita) =>
          `<p><strong>${cita.mascota}</strong> - ${cita.fecha} (${cita.motivo})</p>`
      )
      .join("");
  }
  
  // Enviar consulta (simulada)
  document
    .getElementById("btnEnviarConsulta")
    .addEventListener("click", () => {
      const texto = document.getElementById("consultaTexto").value.trim();
      const mensaje = document.getElementById("mensajeConsulta");
  
      if (!texto) {
        mensaje.innerHTML =
          '<div class="alert alert-danger">Por favor, escribe tu consulta.</div>';
        return;
      }
  
      mensaje.innerHTML =
        '<div class="alert alert-success">Consulta enviada con éxito. Te responderemos pronto.</div>';
      document.getElementById("consultaTexto").value = "";
    });
  
  // Cargar recordatorios al cargar la página
  window.addEventListener("load", () => {
    mostrarRecordatorios();
  });
  