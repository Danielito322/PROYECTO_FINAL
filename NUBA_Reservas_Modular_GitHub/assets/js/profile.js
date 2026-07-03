(function(){
  const bookings = NUBA_STORE.bookings();
  document.querySelectorAll('[data-profile-bookings]').forEach(el => el.textContent = bookings.length + 2);

  const clearBtn = document.getElementById('clear-data');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (confirm('¿Deseas borrar las reservas y el carrito de esta demostración?')) {
      NUBA_STORE.remove('nuba_bookings');
      NUBA_STORE.remove('nuba_cart');
      renderCartCount();
      showToast('Datos locales eliminados.');
    }
  });

  const changeBtn = document.getElementById('change-avatar');
  if (changeBtn) changeBtn.addEventListener('click', () => {
    showToast('Cambio de foto (decorativo): aquí se integraría la subida en el futuro.');
  });

  // Descripción de perfil (decorativa)
  const descEl = document.getElementById('profile-desc');
  const saved = NUBA_STORE.get('nuba_profile', {description: ''});
  if (descEl && saved && saved.description) descEl.textContent = saved.description;

  const editDesc = document.getElementById('edit-desc');
  if (editDesc) editDesc.addEventListener('click', () => {
    const current = (descEl && descEl.textContent) || '';
    const value = prompt('Editar descripción de perfil (decorativo):', current) || current;
    if (descEl) descEl.textContent = value;
    NUBA_STORE.set('nuba_profile', {description: value});
    showToast('Descripción actualizada (decorativo).');
  });
})();
