(function(){
  const venue=getVenue(query('id') || (NUBA_STORE.draft()||{}).venueId);const root=APP_CONFIG.root;
  let dateIndex=0, selectedTime='', segment='Mañana', extras=[];
  const baseDate=new Date();baseDate.setHours(12,0,0,0);
  const times={Mañana:['08:00','09:00','10:00','11:00'],Tarde:['13:00','14:00','15:00','16:00','17:00'],Noche:['18:00','19:00','20:00','21:00']};
  function dateLabel(index){const d=new Date(baseDate);d.setDate(d.getDate()+index);return d.toLocaleDateString('es-PE',{weekday:'short',day:'numeric',month:'short'})}
  function total(){return venue.price+extras.reduce((s,id)=>s+(venue.extras.find(x=>x.id===id)?.price||0),0)}
  document.getElementById('booking-venue').innerHTML=`<img src="${venue.image}" alt="${venue.name}"><div><strong>${venue.icon} ${venue.name}</strong><span>${venue.type} · ${venue.location}<br>Base: ${money(venue.price)} / ${venue.unit}</span></div>`;
  const days=document.getElementById('booking-days');
  days.innerHTML=Array.from({length:7},(_,i)=>{const d=new Date(baseDate);d.setDate(d.getDate()+i);return `<button class="day-btn ${i===0?'active':''}" data-day="${i}"><small>${d.toLocaleDateString('es-PE',{weekday:'short'}).replace('.','')}</small><strong>${d.getDate()}</strong></button>`}).join('');
  function drawTimes(){document.getElementById('time-date').textContent=`Horario para ${dateLabel(dateIndex)}`;document.getElementById('time-grid').innerHTML=times[segment].map((t,i)=>`<button class="time-slot ${i===2&&segment==='Tarde'?'busy':''} ${selectedTime===t?'active':''}" data-time="${t}" ${i===2&&segment==='Tarde'?'disabled':''}>${t}</button>`).join('')}
  function drawExtras(){document.getElementById('extra-list').innerHTML=venue.extras.map(x=>`<button class="extra-row ${extras.includes(x.id)?'checked':''}" data-extra="${x.id}"><span class="extra-check">${extras.includes(x.id)?'✓':''}</span><span class="extra-copy"><strong>${x.name}</strong><span>${x.desc}</span></span><span class="extra-price">+${money(x.price)}</span></button>`).join('');document.getElementById('booking-total').textContent=money(total())}
  days.addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(!b)return;dateIndex=Number(b.dataset.day);days.querySelectorAll('.day-btn').forEach(x=>x.classList.toggle('active',x===b));drawTimes()});
  document.getElementById('time-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-segment]');if(!b)return;segment=b.dataset.segment;document.querySelectorAll('[data-segment]').forEach(x=>x.classList.toggle('active',x===b));drawTimes()});
  document.getElementById('time-grid').addEventListener('click',e=>{const b=e.target.closest('[data-time]');if(!b||b.disabled)return;selectedTime=b.dataset.time;drawTimes();document.getElementById('selected-time').textContent=`Hora seleccionada: ${selectedTime}`});
  document.getElementById('extra-list').addEventListener('click',e=>{const b=e.target.closest('[data-extra]');if(!b)return;const id=b.dataset.extra;extras=extras.includes(id)?extras.filter(x=>x!==id):[...extras,id];drawExtras()});
  document.getElementById('continue-booking').addEventListener('click',()=>{if(!selectedTime){showToast('Selecciona una hora disponible antes de continuar.');return}const draft={venueId:venue.id,date:dateLabel(dateIndex),time:selectedTime,extras,total:total(),createdAt:Date.now()};NUBA_STORE.setDraft(draft);window.location.href=`${root}pages/pago.html`;});
  drawTimes();drawExtras();
})();
