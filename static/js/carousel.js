document.querySelectorAll('[data-carousel]').forEach(carousel => {
  if (carousel.dataset.initialized) return;
  carousel.dataset.initialized = 'true';
  const slides = [...carousel.querySelectorAll('.carousel-slide')];
  const dots = [...carousel.querySelectorAll('[data-indicator]')];
  if (!slides.length) return;
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.classList.toggle('current', i === current));
  }
  carousel.querySelector('[data-prev]')?.addEventListener('click', () => show(current - 1));
  carousel.querySelector('[data-next]')?.addEventListener('click', () => show(current + 1));
  show(0);
});
document.querySelectorAll('[data-sq]').forEach(gallery => {
  if (gallery.dataset.initialized) return;
  gallery.dataset.initialized = 'true';
  const cards = [...gallery.querySelectorAll('[data-category]')];
  const panels = [...gallery.querySelectorAll('.sq-panel')];
  cards.forEach(card => card.addEventListener('click', () => {
    const wasOpen = card.getAttribute('aria-expanded') === 'true';
    cards.forEach(c => c.setAttribute('aria-expanded', 'false'));
    panels.forEach(p => { p.hidden = true; });
    if (!wasOpen) {
      card.setAttribute('aria-expanded', 'true');
      const panel = gallery.querySelector('#sq-' + card.dataset.category);
      panel.hidden = false;
      panel.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest'});
    }
  }));
});
