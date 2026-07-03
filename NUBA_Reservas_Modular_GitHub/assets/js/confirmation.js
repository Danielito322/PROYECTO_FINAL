(function(){
  const root=APP_CONFIG.root;const booking=NUBA_STORE.bookings().find(b=>b.id===query('code'))||NUBA_STORE.bookings()[0];if(!booking){window.location.href=`${root}index.html`;return}
  document.getElementById('ticket-name').textContent=booking.venueName;document.getElementById('ticket-code').textContent=booking.id;document.getElementById('ticket-date').textContent=booking.date;document.getElementById('ticket-time').textContent=booking.time;document.getElementById('ticket-total').textContent=money(booking.total);document.getElementById('go-bookings').href=`${root}pages/mis-reservas.html`;document.getElementById('go-home').href=`${root}index.html`;
})();
