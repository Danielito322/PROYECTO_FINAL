document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('profile-app');
  function render(){
    const bookings=NUBA_STORE.getBookings().length;
    const myReviews=NUBA_STORE.getReviews(null,true).filter(review=>review.name==='Daniel Apaza').length;
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Tu cuenta</div><h1>Perfil</h1><p>Datos, preferencias, historial y soporte.</p></div><button class="icon-btn" id="logout" aria-label="Cerrar sesión">${NUBA.icon('logout')}</button></header><section class="profile-card"><div class="avatar-wrap"><div class="avatar">D</div><button class="avatar-edit" id="avatar" aria-label="Cambiar foto">${NUBA.icon('camera','sm')}</button></div><h2>Daniel Apaza</h2><p>Usuario de ${NUBA_CONFIG.brand} · Puno, Perú</p><div class="profile-desc"><p id="bio">Estudiante y usuario de experiencias reservadas desde una sola app.</p><button class="desc-edit" id="edit">Editar</button></div></section><div class="section-head"><h3>Mi actividad</h3></div><div class="stat-grid"><div class="stat"><strong>${bookings}</strong><span>Reservas</span></div><div class="stat"><strong>${myReviews}</strong><span>Reseñas</span></div><div class="stat"><strong>${NUBA_STORE.cartCount()}</strong><span>Productos</span></div></div><div class="section-head"><h3>Opciones</h3></div><div class="menu-list"><a class="menu-row" href="mis-reservas.html"><span class="menu-icon">${NUBA.icon('calendar')}</span><span><strong>Mis reservas</strong><span>QR, historial y próximos planes</span></span><i>›</i></a><a class="menu-row" href="carrito.html"><span class="menu-icon">${NUBA.icon('bag')}</span><span><strong>Mis compras</strong><span>Productos agregados al carrito</span></span><i>›</i></a><a class="menu-row" href="resenas.html?venue=arena-sur"><span class="menu-icon">${NUBA.icon('message')}</span><span><strong>Mis reseñas</strong><span>Califica experiencias y consulta respuestas</span></span><i>›</i></a><button class="menu-row" id="notify"><span class="menu-icon">${NUBA.icon('bell')}</span><span><strong>Notificaciones</strong><span>Confirmaciones y recordatorios</span></span><i>›</i></button><button class="menu-row" id="help"><span class="menu-icon">${NUBA.icon('shield')}</span><span><strong>Ayuda y soporte</strong><span>Preguntas frecuentes y contacto</span></span><i>›</i></button></div></section>`;
    NUBA.refresh(host);
  }
  host.addEventListener('click',event=>{
    if(event.target.closest('#logout')){NUBA_STORE.setRole('client');location.href='../index.html';}
    if(event.target.closest('#edit')){const text=prompt('Escribe tu descripción:',host.querySelector('#bio').textContent);if(text?.trim()){host.querySelector('#bio').textContent=text.trim();NUBA.toast('Descripción actualizada.');}}
    if(event.target.closest('#avatar'))NUBA.toast('Cambio de foto simulado.');
    if(event.target.closest('#notify'))NUBA.toast('Notificaciones activadas.');
    if(event.target.closest('#help'))NUBA.toast('Soporte: soporte@nuba.app');
  });
  render();
});
