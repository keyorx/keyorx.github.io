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
  $('indPanel').innerHTML =
    `<h4>For ${name.toLowerCase()}, I could build:</h4><ul>${ideas}</ul>` +
    (done ? '<p class="past">✓ I\'ve already built systems for this type of business.</p>' : '') +
    '<p class="ind-cta">Let\'s talk about your business:</p>' +
    '<div class="ind-contact">' +
      '<a class="pill dark" href="https://m.me/keyorx" target="_blank" rel="noopener">Messenger</a>' +
      '<a class="pill" href="viber://chat?number=%2B639173292884">Viber</a>' +
      '<span class="detail">0917 329 2884<button type="button" class="copy" data-copy="09173292884">Copy</button></span>' +
      '<span class="detail">keyorx@gmail.com<button type="button" class="copy" data-copy="keyorx@gmail.com">Copy</button></span>' +
    '</div>';
  const r = $('indPanel').getBoundingClientRect();
  if (r.bottom > innerHeight) window.scrollBy({ top: Math.min(r.bottom - innerHeight + 16, r.top - 80), behavior: 'smooth' });
}));

// Copy buttons for the phone number and email (works for buttons added later too)
document.addEventListener('click', e => {
  const b = e.target.closest('.copy');
  if (!b) return;
  const done = () => { b.textContent = 'Copied!'; setTimeout(() => { b.textContent = 'Copy'; }, 1600); };
  if (navigator.clipboard) {
    navigator.clipboard.writeText(b.dataset.copy).then(done, () => { prompt('Copy this:', b.dataset.copy); });
  } else {
    prompt('Copy this:', b.dataset.copy);
  }
});

$('year').textContent = new Date().getFullYear();

// Fade sections in as they scroll into view
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
