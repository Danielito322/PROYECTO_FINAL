document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('business-app');
  function render(){
    const provider=NUBA_STORE.getProvider();
    const bookings=NUBA_STORE.getBookings().filter(item=>item.status==='confirmed');
    const reviews=NUBA_STORE.getReviews('arena-sur',true);
    const average=reviews.length?(reviews.reduce((sum,item)=>sum+item.rating,0)/reviews.length).toFixed(1):'—';
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Cuenta proveedor</div><h1>Mi negocio</h1><p>Gestiona reservas, disponibilidad, tienda y reseñas.</p></div><a class="icon-btn" href="perfil.html" aria-label="Perfil">${NUBA.icon('user')}</a></header>${NUBA_PROVIDER.tabs('panel')}<section class="provider-hero" style="margin-top:14px"><span class="badge">Local activo</span><h2>${provider.name}</h2><p>${provider.type} · ${provider.address}</p></section><div class="section-head"><h3>Resumen de hoy</h3><p>Actualizado ahora</p></div><div class="stat-grid"><div class="stat"><strong>${bookings.length}</strong><span>Reservas</span></div><div class="stat"><strong>${NUBA.money(bookings.reduce((sum,item)=>sum+item.total,0))}</strong><span>Ingresos</span></div><div class="stat"><strong>${average}</strong><span>Calificación</span></div></div><div class="section-head"><h3>Administrar</h3></div><div class="dashboard-grid"><a class="dashboard-card" href="proveedor-reservas.html">${NUBA.icon('calendar')}<strong>Solicitudes</strong><span>Aprueba, rechaza y revisa reservas.</span></a><a class="dashboard-card" href="proveedor-local.html">${NUBA.icon('edit')}<strong>Mi local</strong><span>Fotos, categoría y descripción.</span></a><a class="dashboard-card" href="proveedor-disponibilidad.html">${NUBA.icon('clock')}<strong>Disponibilidad</strong><span>Define horarios por día.</span></a><a class="dashboard-card" href="proveedor-productos.html">${NUBA.icon('bag')}<strong>Productos</strong><span>Fotos, precios y stock.</span></a><a class="dashboard-card" href="proveedor-resenas.html">${NUBA.icon('message')}<strong>Reseñas</strong><span>Responde y reporta comentarios.</span></a><a class="dashboard-card" href="validar-qr.html">${NUBA.icon('qr')}<strong>Validar QR</strong><span>Registra el ingreso del cliente.</span></a></div></section>`;
    NUBA.refresh(host);
  }
  render();
});
