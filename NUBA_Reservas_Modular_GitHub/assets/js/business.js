(function(){
  const bars=[58,76,42,91,66,82,72];document.getElementById('owner-chart').innerHTML=bars.map((h,i)=>`<div class="bar" style="height:${h}%"><small>${['L','M','X','J','V','S','D'][i]}</small></div>`).join('');document.querySelectorAll('[data-owner-action]').forEach(b=>b.addEventListener('click',()=>showToast(`${b.dataset.ownerAction}: acción simulada correctamente.`)));
})();
