const $ = id => document.getElementById(id);

// Light / dark mode
document.querySelectorAll('.mode-toggle').forEach(b => b.addEventListener('click', () => {
  const next = document.documentElement.dataset.mode === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.mode = next;
  try { localStorage.setItem('mode', next); } catch (e) {}
}));

// "Who I work with": show what could be built for the chosen industry
const industryButtons = document.querySelectorAll('.industries .chips button');
industryButtons.forEach(b => b.addEventListener('click', () => {
  industryButtons.forEach(x => x.setAttribute('aria-pressed', x === b));
  const name = b.textContent.trim();
  const done = b.closest('.chips').classList.contains('done');
  const ideas = b.dataset.ideas.split('|').map(i => `<li>${i}</li>`).join('');
  const subject = encodeURIComponent(`Inquiry: ${name}`);
  $('indPanel').innerHTML =
    `<h4>For ${name.toLowerCase()}, I could build:</h4><ul>${ideas}</ul>` +
    (done ? '<p class="past">✓ I\'ve already built systems for this type of business.</p>' : '') +
    `<a class="pill dark" href="mailto:keyorx@gmail.com?subject=${subject}">Let's talk about your business →</a>`;
  const r = $('indPanel').getBoundingClientRect();
  if (r.bottom > innerHeight) window.scrollBy({ top: Math.min(r.bottom - innerHeight + 16, r.top - 80), behavior: 'smooth' });
}));

$('year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
