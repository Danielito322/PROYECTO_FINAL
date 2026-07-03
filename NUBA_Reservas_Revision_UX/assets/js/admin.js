document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('admin-app');
  function render(){
    const admin=NUBA_STORE.getAdmin();
    const bookings=NUBA_STORE.getBookings();
    const reviews=NUBA_STORE.getReviews(null,true);
    const reported=reviews.filter(review=>review.status==='reported').length;
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Cuenta administrador</div><h1>Panel general</h1><p>Controla negocios, usuarios, reservas y calidad de la plataforma.</p></div><a class="icon-btn" href="perfil.html" aria-label="Perfil">${NUBA.icon('user')}</a></header><section class="provider-hero"><span class="badge">Control central</span><h2>Todo bajo seguimiento.</h2><p>Revisa solicitudes nuevas y mantén una experiencia confiable para todos.</p></section><div class="section-head"><h3>Indicadores</h3></div><div class="stat-grid"><div class="stat"><strong>${admin.venues.filter(item=>item.status==='pending').length}</strong><span>Por aprobar</span></div><div class="stat"><strong>${bookings.length}</strong><span>Reservas</span></div><div class="stat"><strong>${reported}</strong><span>Reseñas</span></div></div><div class="section-head"><h3>Administrar</h3></div><div class="dashboard-grid"><a class="dashboard-card" href="admin-aprobaciones.html">${NUBA.icon('clipboard')}<strong>Aprobaciones</strong><span>Revisa locales pendientes.</span></a><a class="dashboard-card" href="admin-negocios.html">${NUBA.icon('building')}<strong>Negocios</strong><span>Activa o suspende locales.</span></a><a class="dashboard-card" href="admin-usuarios.html">${NUBA.icon('users')}<strong>Usuarios</strong><span>Consulta roles y accesos.</span></a><a class="dashboard-card" href="admin-reportes.html">${NUBA.icon('shield')}<strong>Reportes</strong><span>Resuelve incidencias abiertas.</span></a><a class="dashboard-card" href="admin-resenas.html">${NUBA.icon('message')}<strong>Reseñas</strong><span>Modera y publica comentarios.</span></a></div></section>`;
    NUBA.refresh(host);
  }
  render();
});
