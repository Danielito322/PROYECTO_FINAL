(function(){
  const list = document.getElementById('booking-list');
  const tabs = Array.from(document.querySelectorAll('.chips .chip'));
  const heading = document.querySelector('.section-head h3');
  const subtitle = document.querySelector('.section-head p');
  if (!list || !tabs.length) return;

  const root = APP_CONFIG.root;
  const bookings = NUBA_STORE.bookings();
  const upcomingDemo = {id:'NUBA-DEMO',venueName:'Arena Norte',venueImage:NUBA_DATA.venues[0].image,venueType:'Canchas',date:'sábado, 5 de julio',time:'19:00',total:45,status:'Pendiente de pago'};
  const historyDemo = {id:'NUBA-HIST',venueName:'Terra Lounge',venueImage:NUBA_DATA.venues[1].image,venueType:'Restaurantes',date:'sábado, 2 de mayo',time:'20:00',total:72,status:'Completada'};
  const favoriteDemo = [
    {id:'fav-canchas',venueName:'Arena Norte',venueImage:NUBA_DATA.venues[0].image,venueType:'Canchas',note:'Lugar favorito'},
    {id:'fav-belleza',venueName:'Lumen Studio',venueImage:NUBA_DATA.venues[2].image,venueType:'Belleza',note:'Servicio preferido'}
  ];

  let mode = 'Próximas';

  function formatReservation(b){
    return `<article class="reservation-card"><img src="${b.venueImage}" alt="${b.venueName}" style="width:58px;height:58px;border-radius:14px;object-fit:cover"><div style="flex:1"><strong style="font-size:12px;display:block">${b.venueName}</strong><span style="font-size:10px;color:var(--muted);font-weight:650;display:block;margin-top:3px">${b.date} · ${b.time}<br>${b.status}</span></div><div style="text-align:right"><b style="display:block;font-size:11px">${money(b.total)}</b>${b.status==='Confirmada'?`<a class="btn btn-ghost btn-small" style="display:inline-block;margin-top:7px" href="${root}pages/confirmacion.html?code=${b.id}">QR</a>`:''}</div></article>`;
  }

  function formatFavorite(item){
    return `<article class="reservation-card"><img src="${item.venueImage}" alt="${item.venueName}" style="width:58px;height:58px;border-radius:14px;object-fit:cover"><div style="flex:1"><strong style="font-size:12px;display:block">${item.venueName}</strong><span style="font-size:10px;color:var(--muted);font-weight:650;display:block;margin-top:3px">${item.venueType}<br>${item.note}</span></div><div style="text-align:right"><button class="btn btn-secondary btn-small" style="display:inline-block;margin-top:7px">Ver</button></div></article>`;
  }

  function render(){
    tabs.forEach(tab => tab.classList.toggle('active', tab.textContent === mode));
    if (mode === 'Próximas'){
      heading.textContent = 'Reservas activas';
      subtitle.textContent = 'Con QR de ingreso';
      const items = bookings.filter(b => b.status !== 'Completada');
      const listItems = items.length ? items.map(formatReservation) : [formatReservation(upcomingDemo)];
      list.innerHTML = listItems.join('');
    } else if (mode === 'Historial'){
      heading.textContent = 'Historial de reservas';
      subtitle.textContent = 'Tus planes ya realizados';
      const items = bookings.filter(b => b.status === 'Completada');
      const listItems = items.length ? items.map(formatReservation) : [formatReservation(historyDemo)];
      list.innerHTML = listItems.join('');
    } else {
      heading.textContent = 'Favoritos';
      subtitle.textContent = 'Lugares que te gustan';
      list.innerHTML = favoriteDemo.map(formatFavorite).join('');
    }
  }

  document.querySelector('.chips').addEventListener('click', e => {
    const button = e.target.closest('.chip');
    if (!button) return;
    mode = button.textContent;
    render();
  });

  render();
})();
