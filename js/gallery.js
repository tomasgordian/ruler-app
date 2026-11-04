const shots = [...document.querySelectorAll('.shot-row img')];
const viewer = document.querySelector('.viewer');
const viewerImg = viewer.querySelector('.viewer-img');
const viewerCount = viewer.querySelector('.viewer-count');
const prevButton = viewer.querySelector('.viewer-prev');
const nextButton = viewer.querySelector('.viewer-next');
let index = 0;
let swipeStartX = null;

const show = (i) => {
  index = Math.min(Math.max(i, 0), shots.length - 1);
  viewerImg.src = shots[index].src;
  viewerImg.alt = shots[index].alt;
  viewerCount.textContent = `${index + 1} / ${shots.length}`;
  const focused = document.activeElement;
  prevButton.hidden = index === 0;
  nextButton.hidden = index === shots.length - 1;
  if (focused === prevButton || focused === nextButton) {
    if (focused.hidden) viewer.focus();
  }
};

shots.forEach((shot, i) => shot.closest('button').addEventListener('click', () => {
  show(i);
  viewer.showModal();
  viewer.focus();
}));
prevButton.addEventListener('click', () => show(index - 1));
nextButton.addEventListener('click', () => show(index + 1));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});
document.addEventListener('keydown', (event) => {
  if (!viewer.open) return;
  if (event.key === 'ArrowLeft') show(index - 1);
  if (event.key === 'ArrowRight') show(index + 1);
});
viewerImg.addEventListener('pointerdown', (event) => {
  swipeStartX = event.clientX;
});
viewerImg.addEventListener('pointerup', (event) => {
  if (swipeStartX === null) return;
  const distance = event.clientX - swipeStartX;
  swipeStartX = null;
  if (Math.abs(distance) > 40) show(index + (distance < 0 ? 1 : -1));
});
viewerImg.addEventListener('pointercancel', () => {
  swipeStartX = null;
});
