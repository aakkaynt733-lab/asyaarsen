// Модуль управления модальным письмом с анимацией фото-фонтана
(function () {
  // Элементы DOM
  const envelopeTrigger = document.getElementById("envelope");
  const openLetterButtons = document.querySelectorAll("[data-open-letter]");
  const modalOverlay = document.getElementById("letterModal");
  const modalClose = document.getElementById("modalClose");
  const photoFountainContainer = document.getElementById("modalPhotoFountain");

  // Массив URL фото для анимации
  const photoUrls = [
    "./img/swiper/photo.jpg",
    "./img/swiper/photo2.jpg",
    "./img/swiper/photo3.jpg",
    "./img/swiper/photo4.jpg",
    "./img/swiper/photo5.jpg",
    "./img/swiper/photo6.jpg",
    "./img/swiper/photo7.jpg",
    "./img/swiper/photo8.jpg",
  ];

  // Проверка наличия элементов
  if (
    !envelopeTrigger ||
    !modalOverlay ||
    !modalClose ||
    !photoFountainContainer
  ) {
    console.warn("Не найдены необходимые элементы для модального письма");
    return;
  }

  // Обработчики событий
  envelopeTrigger.addEventListener("click", openModal);
  openLetterButtons.forEach((button) =>
    button.addEventListener("click", openModal),
  );
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  // Функция открытия модального окна
  function openModal() {
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Запуск анимации фото-фонтана
    startPhotoFountain();
  }

  // Функция закрытия модального окна
  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Очистка фото от предыдущей анимации
    clearFlyingPhotos();
  }

  // Запуск анимации фото-фонтана
  function startPhotoFountain() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createFlyingPhoto();
      }, i * 100);
    }
  }

  // Создание и анимация одного фото
  function createFlyingPhoto() {
    const photo = document.createElement("div");
    photo.classList.add("flying-photo");

    // Выбор случайного фото
    const randomUrl = photoUrls[Math.floor(Math.random() * photoUrls.length)];
    photo.style.backgroundImage = `url(${randomUrl})`;

    // Случайные параметры движения
    const x = (Math.random() - 0.5) * 600 + "px";
    const y = -(Math.random() * 400 + 200) + "px";
    const r = (Math.random() - 0.5) * 90 + "deg";

    photo.style.setProperty("--x", x);
    photo.style.setProperty("--y", y);
    photo.style.setProperty("--r", r);

    photo.style.animation = "flyOut 2s forwards ease-out";

    photoFountainContainer.appendChild(photo);

    
    setTimeout(() => {
      photo.remove();
    }, 2100);
  }

  
  function clearFlyingPhotos() {
    const photos = photoFountainContainer.querySelectorAll(".flying-photo");
    photos.forEach((photo) => photo.remove());
  }
})();
