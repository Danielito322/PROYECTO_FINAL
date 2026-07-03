(function(){
  const bookings=NUBA_STORE.bookings();document.querySelectorAll('[data-profile-bookings]').forEach(el=>el.textContent=bookings.length+2);document.getElementById('clear-data').addEventListener('click',()=>{if(confirm('¿Deseas borrar las reservas y el carrito de esta demostración?')){NUBA_STORE.remove('nuba_bookings');NUBA_STORE.remove('nuba_cart');renderCartCount();showToast('Datos locales eliminados.')}});
})();
