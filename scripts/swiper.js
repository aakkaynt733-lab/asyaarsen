var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  loop: true,
});

const swiperElement = document.querySelector(".swiper").swiper;
window.setInterval(() => {
  swiperElement.slideNext();
}, 2000);
