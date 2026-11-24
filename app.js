const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');
if (menu && nav) {
  const close = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => { const opened = nav.classList.toggle('is-open'); menu.setAttribute('aria-expanded', String(opened)); });
  nav.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { close(); menu.focus(); } });
  document.addEventListener('click', event => { if (!event.target.closest('.header')) close(); });
}
document.addEventListener('visibilitychange', () => document.body.classList.toggle('motion-paused', document.hidden));
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('motion-paused', !entry.isIntersecting)));
  document.querySelectorAll('.connection-art, .use-card').forEach(element => observer.observe(element));
}
const welcome = document.querySelector('.welcome');
if (welcome && typeof welcome.showModal === 'function') {
  let seconds = Math.max(0, Number(welcome.dataset.wait) || 0);
  const stay = welcome.querySelector('.welcome-stay');
  const cross = welcome.querySelector('.welcome-close');
  const counter = welcome.querySelector('.welcome-count');
  const paint = () => { stay.disabled = cross.disabled = seconds > 0; counter.textContent = seconds > 0 ? `（${seconds} 秒）` : ''; };
  const close = () => { if (!seconds) { welcome.close(); document.body.style.overflow = ''; document.querySelector('.hero .button')?.focus(); } };
  paint(); welcome.showModal(); document.body.style.overflow = 'hidden';
  cross.addEventListener('click', close); stay.addEventListener('click', close);
  welcome.addEventListener('cancel', event => { event.preventDefault(); close(); });
  const timer = setInterval(() => { seconds = Math.max(0, seconds - 1); paint(); if (!seconds) clearInterval(timer); }, 1000);
}
