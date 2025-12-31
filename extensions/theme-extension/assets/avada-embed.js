document.querySelectorAll('.avada-root').forEach(el => {
  if (el.__mounted) return;
  el.__mounted = true;

  el.innerHTML = `
    <div class="avada-ui">
      <h3>${el.dataset.title}</h3>
    </div>
  `;
});

console.log(document.querySelectorAll('.avada-root'));
