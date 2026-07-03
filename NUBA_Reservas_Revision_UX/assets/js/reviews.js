document.addEventListener('DOMContentLoaded',()=>{
  const host=document.getElementById('reviews-app');
  const venue=NUBA_DATA.getVenue(NUBA.qs('venue'));
  let score=5;
  const profanity=['idiota','imbecil','imbécil','estupido','estúpido','mierda','carajo'];
  function stars(rating){return `<span class="review-stars" aria-label="${rating} de 5">${Array.from({length:5},(_,i)=>NUBA.icon('star',`sm ${i<rating?'star-on':''}`)).join('')}</span>`}
  function average(reviews){return reviews.length?(reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1):'—'}
  function reviewCard(review,own=false){return `<article class="review-card"><div class="review-head"><div class="review-avatar">${review.name.charAt(0)}</div><div class="review-copy"><strong>${review.name}</strong><small>${new Intl.DateTimeFormat('es-PE',{day:'numeric',month:'short',year:'numeric'}).format(new Date(review.createdAt))}</small></div>${stars(review.rating)}</div><p>${review.comment}</p>${review.reply?`<div class="review-reply"><strong>Respuesta del local</strong><span>${review.reply}</span></div>`:''}<div class="review-actions">${review.status==='reported'?`<span class="badge amber">En revisión</span>`:`<span class="badge green">Verificada</span>`}${!own?`<button class="review-report" data-report="${review.id}">${NUBA.icon('flag','sm')} Reportar</button>`:''}</div></article>`}
  function render(){
    const reviews=NUBA_STORE.getReviews(venue.id);
    const canReview=NUBA_STORE.getBookings().some(b=>b.venueId===venue.id&&b.status==='confirmed');
    host.innerHTML=`<section class="page-content"><header class="topbar"><div><div class="eyebrow">Experiencias verificadas</div><h1>Reseñas</h1><p>Lo que otros usuarios cuentan sobre ${venue.name}.</p></div><button class="icon-btn" data-back="detalle.html?venue=${venue.id}" aria-label="Volver">${NUBA.icon('arrowLeft')}</button></header><section class="review-summary card"><div><span class="review-average">${average(reviews)}</span><span class="review-scale">de 5</span>${stars(Math.round(Number(average(reviews))||0))}</div><div><strong>${reviews.length} opiniones</strong><p>Las reseñas ayudan a elegir y mejorar cada local.</p></div></section>${canReview?`<section class="card review-form-card"><div class="section-inline"><div><div class="eyebrow">Tu opinión</div><h3>Califica tu experiencia</h3></div><span class="badge">Reserva verificada</span></div><form id="review-form"><label class="form-label">¿Cómo estuvo tu experiencia?</label><div class="rating-selector">${[1,2,3,4,5].map(n=>`<button class="rating-btn ${score===n?'active':''}" type="button" data-rating="${n}" aria-label="${n} estrellas">${n}</button>`).join('')}</div><div class="form-field" style="margin-top:13px"><label class="form-label">Cuéntanos qué fue bien o qué se puede mejorar</label><textarea class="textarea" id="review-comment" required maxlength="260" placeholder="Escribe una reseña clara y respetuosa."></textarea><p class="field-help">No publiques datos personales ni lenguaje ofensivo.</p></div><button class="btn btn-primary btn-block">${NUBA.icon('send')} Publicar reseña</button></form></section>`:`<section class="card review-locked"><span>${NUBA.icon('calendar','lg')}</span><div><strong>Reserva una experiencia para calificarla</strong><p>Las reseñas están vinculadas a reservas confirmadas para cuidar la confianza.</p></div></section>`}<div class="section-head"><h3>Opiniones de usuarios</h3><p>${reviews.length} publicadas</p></div><div id="reviews-list">${reviews.length?reviews.map(reviewCard).join(''):`<div class="empty-state">${NUBA.icon('message')}<h3>Aún no hay reseñas</h3><p>Sé la primera persona en compartir tu experiencia.</p></div>`}</div></section>`;
    NUBA.refresh(host);
  }
  host.addEventListener('click',event=>{
    const rating=event.target.closest('[data-rating]');
    if(rating){score=Number(rating.dataset.rating);render();return;}
    const report=event.target.closest('[data-report]');
    if(report){NUBA_STORE.updateReview(report.dataset.report,{reported:true,status:'reported',reportReason:'Reportada por un usuario para moderación.'});NUBA.toast('La reseña fue enviada a moderación.');render();}
  });
  host.addEventListener('submit',event=>{
    if(event.target.id!=='review-form')return;
    event.preventDefault();
    const comment=host.querySelector('#review-comment').value.trim();
    if(comment.length<12){NUBA.toast('Escribe al menos 12 caracteres para publicar.');return;}
    const normalized=comment.toLowerCase();
    const requiresReview=profanity.some(word=>normalized.includes(word));
    const booking=NUBA_STORE.getBookings().find(b=>b.venueId===venue.id&&b.status==='confirmed');
    NUBA_STORE.addReview({venueId:venue.id,venue:venue.name,bookingId:booking?.id||`demo-${Date.now()}`,name:'Daniel Apaza',rating:score,comment,status:requiresReview?'reported':'published',reported:requiresReview,reportReason:requiresReview?'El texto se envió a moderación automática.':''});
    NUBA.toast(requiresReview?'Tu reseña quedó en revisión por lenguaje sensible.':'Gracias, tu reseña fue publicada.');
    render();
  });
  render();
});
