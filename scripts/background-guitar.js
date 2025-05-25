window.addEventListener('scroll', function () {
  const scrollY = window.scrollY;
  const parallax = document.querySelector('.parallax-bg');
  if (parallax) {
    parallax.style.transform = `translateY(calc(-50vh + ${scrollY * 0.3}px))`;
  }
});
