const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');

// Buka dan tutup navigasi ringkas pada layar kecil.
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu' : 'Tutup menu');
  navLinks.classList.toggle('is-open', !isOpen);
});

navItems.forEach((item) => {
  item.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu');
    navLinks.classList.remove('is-open');
  });
});

// Tampilkan section dengan lembut saat masuk ke area pandang.
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle('is-active', item.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });

  pageSections.forEach((section) => sectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Placeholder tanpa URL tidak mengarahkan pengunjung ke halaman kosong.
document.querySelectorAll('.social-link[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});