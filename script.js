const helloBtn = document.getElementById("hello");
const messageEl = document.getElementById("message");

if (helloBtn && messageEl) {
  helloBtn.addEventListener("click", function () {
    messageEl.textContent = "谢谢你来看我的作品，很高兴认识你。";
  });
}

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

const zoomables = Array.from(
  document.querySelectorAll(".work-visual img, .gallery-item img")
);

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  const img = zoomables[currentIndex];
  if (!img) return;

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt || "";
  lightboxCaption.textContent = img.alt || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  lightboxImg.src = "";
}

function showPrev() {
  if (!zoomables.length) return;
  currentIndex = (currentIndex - 1 + zoomables.length) % zoomables.length;
  openLightbox(currentIndex);
}

function showNext() {
  if (!zoomables.length) return;
  currentIndex = (currentIndex + 1) % zoomables.length;
  openLightbox(currentIndex);
}

zoomables.forEach(function (img, index) {
  img.addEventListener("click", function () {
    openLightbox(index);
  });
});

if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
if (prevBtn) prevBtn.addEventListener("click", showPrev);
if (nextBtn) nextBtn.addEventListener("click", showNext);

if (lightbox) {
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
}

document.addEventListener("keydown", function (e) {
  if (!lightbox || !lightbox.classList.contains("is-open")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});