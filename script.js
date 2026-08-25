/* script.js
   Comentarios en español: JS mínimo para mejorar UX.
   Funcionalidades:
   - Toggle menú en mobile
   - IntersectionObserver para animar secciones (fade-in)
   - Resaltar enlace de navegación activo al hacer scroll
   - Botón volver arriba
*/

/* Elementos clave */
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const backToTop = document.getElementById('backToTop');
const sections = document.querySelectorAll('main .section, .hero');

/* Toggle menú para móviles */
if(navToggle){
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
}

/* IntersectionObserver: revelar elementos con la clase .reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Resaltar nav activo según scroll */
const navItems = document.querySelectorAll('.nav-links a');
const sectionMap = Array.from(navItems).map(a => {
  const id = a.getAttribute('href').replace('#','');
  return document.getElementById(id);
});

window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sectionMap.forEach((sec, i) => {
    if(!sec) return;
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    if(y >= top && y < bottom){
      navItems.forEach(x => x.classList.remove('active'));
      navItems[i].classList.add('active');
    }
  });

  // mostrar/ocultar backToTop
  if(window.scrollY > 500) backToTop.style.display = 'block';
  else backToTop.style.display = 'none';
});

/* Smooth scroll for anchor clicks (complemento) */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      // cerrar menú móvil si está abierto
      if(navLinks.classList.contains('open')) navLinks.classList.remove('open');
    }
  });
});

/* Back to top click */
if(backToTop){
  backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
}

/* Pequeño ajuste: marcar el primer nav item al cargar */
document.addEventListener('DOMContentLoaded', () => {
  if(navItems[0]) navItems[0].classList.add('active');
});
