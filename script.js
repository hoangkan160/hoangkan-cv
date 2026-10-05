(() => {
  const dot = document.querySelector('.cursor-dot');
  if (dot && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
    }, {passive:true});
  }

  const header = document.querySelector('.site-header');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.style.transform = y > lastY && y > 120 ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, {passive:true});
  header.style.transition = 'transform .35s ease';

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, {threshold:.08});
  document.querySelectorAll('.project-card,.project-feature,.cap-row,.about-statement,.evidence-big,.now-items div').forEach(el => {
    el.classList.add('reveal');
    reveal.observe(el);
  });

  document.querySelectorAll('.project-feature,.project-card').forEach(el => {
    el.addEventListener('click', () => {
      const name = el.dataset.project;
      if (name) document.body.dataset.focus = name;
    });
  });
})();