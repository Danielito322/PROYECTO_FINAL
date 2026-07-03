document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('bookings-app');
  let filter='active';

  function actions(booking){
    if(booking.status==='confirmed'){
      return `<button class="btn btn-secondary btn-sm" data-qr="${booking.code}">${NUBA.icon('qr','sm')} QR</button>
              <button class="btn btn-secondary btn-sm" data-review="${booking.venueId}">${NUBA.icon('message','sm')} Calificar</button>
              <button class="btn btn-danger btn-sm" data-cancel="${booking.id}">Cancelar</button>`;
    }
    if(booking.status==='completed'){
      return `<button class="btn btn-secondary btn-sm" data-review="${booking.venueId}">${NUBA.icon('message','sm')} Ver / calificar</button>`;
    }
    return `<span class="booking-cancelled">Esta reserva ya no está activa.</span>`;
  }

  function card(booking){
    const statusClass=booking.status==='confirmed'?'green':booking.status==='cancelled'?'red':'amber';
    const statusLabel=booking.status==='confirmed'?'Confirmada':booking.status==='cancelled'?'Cancelada':'Completada';
    return `<article class="booking-card card">
      <div class="booking-top"><img src="${booking.image}" alt="${booking.venue}">
        <div class="booking-copy"><span class="badge ${statusClass}">${statusLabel}</span>
          <h3>${booking.venue}</h3><p>${booking.prettyDate||booking.date} · ${booking.time}</p>
          <p>${booking.payment||'Yape'} · ${NUBA.money(booking.total)}</p>
        </div>
      </div>
      <div class="booking-actions">${actions(booking)}</div>
    </article>`;
  }

  function render(){
    const all=NUBA_STORE.getBookings();
    const today=new Date().toISOString().slice(0,10);
    const list=all.filter(booking=>{
      if(filter==='active')return booking.status==='confirmed'&&booking.date>=today;
      if(filter==='history')return booking.date<today||booking.status==='completed';
      return booking.status==='cancelled';
    });
    const title=filter==='active'?'Próximas reservas':filter==='history'?'Historial':'Reservas canceladas';
    host.innerHTML=`<section class="page-content">
      <header class="topbar"><div><div class="eyebrow">Tu agenda</div><h1>Mis reservas</h1><p>Consulta tu QR, gestiona cada plan y deja tu reseña.</p></div><a class="icon-btn" href="mapa.html" aria-label="Ver mapa">${NUBA.icon('map')}</a></header>
      <div class="chips"><button class="chip ${filter==='active'?'active':''}" data-filter="active">Activas</button><button class="chip ${filter==='history'?'active':''}" data-filter="history">Historial</button><button class="chip ${filter==='cancelled'?'active':''}" data-filter="cancelled">Canceladas</button></div>
      <div class="section-head"><h3>${title}</h3><p>${list.length} registros</p></div>
      <div class="venue-list">${list.length?list.map(card).join(''):`<div class="empty-state">${NUBA.icon('calendar')}<h3>No hay reservas aquí</h3><p>Cuando realices una reserva aparecerá en esta sección.</p><a class="btn btn-primary" href="explorar.html" style="margin-top:13px">Explorar lugares</a></div>`}</div>
    </section>`;
    NUBA.refresh(host);
  }

  host.addEventListener('click',event=>{
    const control=event.target.closest('[data-filter]');
    if(control){filter=control.dataset.filter;render();return;}
    const cancel=event.target.closest('[data-cancel]');
    if(cancel){NUBA_STORE.setBookings(NUBA_STORE.getBookings().map(booking=>booking.id===cancel.dataset.cancel?{...booking,status:'cancelled'}:booking));NUBA.toast('Reserva cancelada.');render();return;}
    const qr=event.target.closest('[data-qr]');
    if(qr){const booking=NUBA_STORE.getBookings().find(item=>item.code===qr.dataset.qr);localStorage.setItem('nuba_last_booking',JSON.stringify(booking));location.href='confirmacion.html';return;}
    const review=event.target.closest('[data-review]');
    if(review)location.href=`resenas.html?venue=${review.dataset.review}`;
  });
  render();
});
