const $ = id => document.getElementById(id);

// Light / dark mode
document.querySelectorAll('.mode-toggle').forEach(b => b.addEventListener('click', () => {
  const next = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.mode = next;
  try { localStorage.setItem('mode', next); } catch (e) {}
}));

// Project filters
const filters = document.querySelectorAll('.filters button');
filters.forEach(b => b.addEventListener('click', () => {
  filters.forEach(x => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.proj').forEach(p => { p.hidden = b.dataset.filter !== 'all' && p.dataset.kind !== b.dataset.filter; });
}));

$('year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
