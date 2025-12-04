// Основний слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide--;
    showSlide(currentSlide);
}

function goToSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
}

// Автоматичне перемикання слайдів
setInterval(nextSlide, 5000);

// ========== СЛАЙДЕР "КІНО ЗАРАЗ" ==========
let currentMovieSlide = 0;
let movieSlides;
let moviesSlider;

function initMovieSlider() {
    movieSlides = document.querySelectorAll('.movie-slide');
    moviesSlider = document.getElementById('moviesSlider');
    
    if (!movieSlides.length || !moviesSlider) {
        console.log("Слайдер фільмів не знайдено");
        return;
    }
    
    // Встановлюємо початкову позицію
    updateMovieSlider();
    
    // Показуємо стрілки
    document.querySelector('.prev-movie-btn').style.display = 'flex';
    document.querySelector('.next-movie-btn').style.display = 'flex';
}

function updateMovieSlider() {
    if (!movieSlides || !moviesSlider) return;
    
    const slideWidth = movieSlides[0].offsetWidth;
    const gap = 30; // відступ між слайдами
    const containerWidth = document.querySelector('.movies-slider-container').offsetWidth;
    
    // Обчислюємо максимальну позицію
    const maxPosition = Math.max(0, (movieSlides.length * (slideWidth + gap) - containerWidth));
    
    // Обмежуємо поточну позицію
    currentMovieSlide = Math.max(0, Math.min(currentMovieSlide, maxPosition));
    
    // Застосовуємо трансформацію
    moviesSlider.style.transform = `translateX(-${currentMovieSlide}px)`;
}

function prevMovieSlide() {
    if (!movieSlides || !moviesSlider) return;
    
    const slideWidth = movieSlides[0].offsetWidth;
    const gap = 30;
    const moveBy = slideWidth + gap;
    
    currentMovieSlide = Math.max(0, currentMovieSlide - moveBy);
    moviesSlider.style.transform = `translateX(-${currentMovieSlide}px)`;
    
    console.log('Prev movie slide, position:', currentMovieSlide);
}

function nextMovieSlide() {
    if (!movieSlides || !moviesSlider) return;
    
    const slideWidth = movieSlides[0].offsetWidth;
    const gap = 30;
    const moveBy = slideWidth + gap;
    const containerWidth = document.querySelector('.movies-slider-container').offsetWidth;
    const totalWidth = movieSlides.length * (slideWidth + gap);
    const maxPosition = Math.max(0, totalWidth - containerWidth);
    
    if (currentMovieSlide < maxPosition) {
        currentMovieSlide = Math.min(maxPosition, currentMovieSlide + moveBy);
        moviesSlider.style.transform = `translateX(-${currentMovieSlide}px)`;
    }
    
    console.log('Next movie slide, position:', currentMovieSlide, 'max:', maxPosition);
}

// Слайдер кінотеатрів
let currentCinemaSlide = 0;
let cinemaSlidesPerView = 3;

function updateCinemaSlidesPerView() {
    if (window.innerWidth < 768) {
        cinemaSlidesPerView = 1;
    } else if (window.innerWidth < 992) {
        cinemaSlidesPerView = 2;
    } else {
        cinemaSlidesPerView = 3;
    }
}

function updateCinemaSlider() {
    const slider = document.getElementById('cinemasSlider');
    const slideWidth = document.querySelector('.cinema-slide').offsetWidth;
    const gap = 30;
    const translateX = -currentCinemaSlide * (slideWidth + gap);
    slider.style.transform = `translateX(${translateX}px)`;
}

function nextCinemaSlide() {
    const slides = document.querySelectorAll('.cinema-slide');
    updateCinemaSlidesPerView();
    
    if (currentCinemaSlide < slides.length - cinemaSlidesPerView) {
        currentCinemaSlide++;
    } else {
        currentCinemaSlide = 0;
    }
    updateCinemaSlider();
}

function prevCinemaSlide() {
    const slides = document.querySelectorAll('.cinema-slide');
    updateCinemaSlidesPerView();
    
    if (currentCinemaSlide > 0) {
        currentCinemaSlide--;
    } else {
        currentCinemaSlide = slides.length - cinemaSlidesPerView;
    }
    updateCinemaSlider();
}

// Дані про кінотеатри (місця та ряди)
const cinemaData = {
    1: {
        name: "КІНОВОЛЯ Центр",
        image: "images/cinema1.jpg",
        address: "м. Львів, вул. Кіноплівкова, 7",
        halls: 5,
        totalSeats: 450,
        phone: "+380 68 68 66 868",
        hours: "Щодня 10:00 - 23:00",
        hallsDetails: [
            { name: "Зал 1 - IMAX", rows: 12, seatsPerRow: 15, total: 180, type: "IMAX" },
            { name: "Зал 2 - Premium", rows: 8, seatsPerRow: 8, total: 64, type: "VIP" },
            { name: "Зал 3 - Стандарт", rows: 10, seatsPerRow: 12, total: 120, type: "Стандарт" },
            { name: "Зал 4 - 4D", rows: 6, seatsPerRow: 10, total: 60, type: "4D" },
            { name: "Зал 5 - Small", rows: 5, seatsPerRow: 5, total: 25, type: "Малий" }
        ],
        features: ["🎬 5 залів", "🛋️ VIP зона", "🍽️ Кафе-бар", "🔊 Dolby Atmos", "💺 Крісла з підігрівом", "🚗 Паркінг"]
    },
    2: {
        name: "КІНОВОЛЯ Плаза",
        image: "images/cinema2.jpg",
        address: "м. Львів, вул. Січових Стрільців, 45",
        halls: 3,
        totalSeats: 280,
        phone: "+380 68 68 66 868",
        hours: "Щодня 11:00 - 22:30",
        hallsDetails: [
            { name: "Зал 1 - Сімейний", rows: 10, seatsPerRow: 12, total: 120, type: "Стандарт" },
            { name: "Зал 2 - 3D", rows: 8, seatsPerRow: 10, total: 80, type: "3D" },
            { name: "Зал 3 - Дитячий", rows: 8, seatsPerRow: 10, total: 80, type: "Дитячий" }
        ],
        features: ["🎬 3 зали", "🍿 Снек-бар", "👶 Дитяча кімната", "🎪 Анімація", "🎨 Майстер-класи"]
    },
    3: {
        name: "КІНОВОЛЯ Артхаус",
        image: "images/cinema3.jpg",
        address: "м. Львів, вул. Вірменська, 15",
        halls: 2,
        totalSeats: 120,
        phone: "+380 68 68 66 868",
        hours: "Пн-Пт 12:00 - 23:00<br>Сб-Нд 10:00 - 24:00",
        hallsDetails: [
            { name: "Зал 1 - Артхаус", rows: 6, seatsPerRow: 10, total: 60, type: "Артхаус" },
            { name: "Зал 2 - Кіноклуб", rows: 5, seatsPerRow: 12, total: 60, type: "Клубний" }
        ],
        features: ["🎬 2 зали", "🎨 Артхаус кіно", "☕ Кав'ярня", "📚 Бібліотека", "🎭 Обговорення фільмів"]
    },
    4: {
        name: "КІНОВОЛЯ Плаза - Зал 1",
        image: "images/cinema4.jpg",
        address: "м. Львів, вул. Січових Стрільців, 45",
        halls: 1,
        totalSeats: 120,
        phone: "+380 68 68 66 868",
        hours: "Щодня 11:00 - 22:30",
        hallsDetails: [
            { name: "4D Зал", rows: 10, seatsPerRow: 12, total: 120, type: "4D" }
        ],
        features: ["🎬 4D кіно", "🔊 Dolby Atmos", "💺 Комфорт місця", "🍿 Снек-бар"]
    },
    5: {
        name: "КІНОВОЛЯ Плаза - Зал 2",
        image: "images/cinema5.jpg",
        address: "м. Львів, вул. Січових Стрільців, 45",
        halls: 1,
        totalSeats: 150,
        phone: "+380 68 68 66 868",
        hours: "Щодня 11:00 - 22:30",
        hallsDetails: [
            { name: "IMAX Зал", rows: 10, seatsPerRow: 15, total: 150, type: "IMAX" }
        ],
        features: ["🎬 IMAX", "🍿 Каво-бар", "🪑 Розкладні крісла", "🔊 Об'ємний звук"]
    },
    6: {
        name: "КІНОВОЛЯ Плаза - Зал 3",
        image: "images/cinema6.jpg",
        address: "м. Львів, вул. Січових Стрільців, 45",
        halls: 1,
        totalSeats: 80,
        phone: "+380 68 68 66 868",
        hours: "Щодня 11:00 - 22:30",
        hallsDetails: [
            { name: "3D Дитячий зал", rows: 8, seatsPerRow: 10, total: 80, type: "3D Дитячий" }
        ],
        features: ["🎬 3D кіно", "👶 Дитяча кімната", "🎪 Анімація для дітей", "🍭 Солодощі"]
    }
};

// Відкриття модального вікна з деталями
function openCinemaDetails(cinemaId) {
    const cinema = cinemaData[cinemaId];
    if (!cinema) return;
    
    // Заповнюємо заголовок та зображення
    document.getElementById('modalCinemaName').textContent = cinema.name;
    document.getElementById('modalCinemaImage').src = cinema.image;
    document.getElementById('modalCinemaImage').alt = cinema.name;
    
    // Заповнюємо основну інформацію
    document.getElementById('modalAddress').innerHTML = cinema.address;
    document.getElementById('modalHalls').textContent = cinema.halls;
    document.getElementById('modalTotalSeats').textContent = cinema.totalSeats;
    document.getElementById('modalHours').innerHTML = cinema.hours;
    document.getElementById('modalPhone').textContent = cinema.phone;
    
    // Заповнюємо інформацію про зали
    const hallsContainer = document.getElementById('hallsContainer');
    hallsContainer.innerHTML = '';
    
    cinema.hallsDetails.forEach(hall => {
        const hallElement = document.createElement('div');
        hallElement.className = 'hall-item';
        hallElement.innerHTML = `
            <div class="hall-name">${hall.name} (${hall.type})</div>
            <div class="hall-details">
                <div class="hall-detail">
                    <span>Рядів</span>
                    <span>${hall.rows}</span>
                </div>
                <div class="hall-detail">
                    <span>Місць в ряду</span>
                    <span>${hall.seatsPerRow}</span>
                </div>
                <div class="hall-detail">
                    <span>Всього місць</span>
                    <span>${hall.total}</span>
                </div>
            </div>
        `;
        hallsContainer.appendChild(hallElement);
    });
    
    // Заповнюємо особливості
    const featuresList = document.getElementById('featuresList');
    featuresList.innerHTML = '';
    
    cinema.features.forEach(feature => {
        const featureElement = document.createElement('div');
        featureElement.className = 'feature-tag';
        featureElement.textContent = feature;
        featuresList.appendChild(featureElement);
    });
    
    // Показуємо модальне вікно
    document.getElementById('cinemaModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Блокуємо прокрутку сторінки
}

// Закриття модального вікна
function closeCinemaModal() {
    document.getElementById('cinemaModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Відновлюємо прокрутку
}

// Бронювання квитків в конкретному кінотеатрі
function bookCinemaTickets() {
    const cinemaName = document.getElementById('modalCinemaName').textContent;
    alert(`Переходимо до бронювання квитків в кінотеатрі: ${cinemaName}`);
    
    // Тут можна додати перенаправлення на форму бронювання
    // або відкрити форму бронювання з вибраним кінотеатром
    closeCinemaModal();
    
    // Прокручуємо до форми бронювання
    const bookingSection = document.getElementById('booking-form');
    if (bookingSection) {
        window.scrollTo({
            top: bookingSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// Закриття модального вікна при кліку поза ним
window.onclick = function(event) {
    const modal = document.getElementById('cinemaModal');
    if (event.target === modal) {
        closeCinemaModal();
    }
}

// Закриття модального вікна клавішею ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCinemaModal();
    }
});

// Ініціалізація слайдера при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    updateCinemaSlidesPerView();
    updateCinemaSlider();
    
    // Автоматична зміна слайдів кожні 5 секунд
    setInterval(() => {
        nextCinemaSlide();
    }, 5000);
    
    // Перерахунок кількості слайдів при зміні розміру вікна
    window.addEventListener('resize', function() {
        updateCinemaSlidesPerView();
        updateCinemaSlider();
    });
});

// Таймер до прем'єри "28 років по тому"
class PremiereCountdown {
    constructor() {
        // Дата прем'єри: 30 грудня 2025
        this.premiereDate = new Date('2025-12-30T00:00:00');
        
        // Елементи DOM для відображення
        this.daysElement = document.getElementById('days');
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        
        // ID таймера
        this.timerId = null;
        
        // Стан таймера
        this.isRunning = false;
        
        // Автоматичний запуск при ініціалізації
        this.init();
    }
    
    init() {
        console.log('Таймер прем\'єри ініціалізовано');
        this.updateDisplay(); // Оновлюємо відразу
        this.start();
        
        // Додаємо обробник для вимкнення при закритті сторінки
        window.addEventListener('beforeunload', () => this.stop());
    }
    
    // Розрахунок залишкового часу
    calculateTimeRemaining() {
        const now = new Date();
        const difference = this.premiereDate.getTime() - now.getTime();
        
        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isExpired: true
            };
        }
        
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        
        return {
            days,
            hours,
            minutes,
            seconds,
            isExpired: false
        };
    }
    
    // Форматування чисел до двох цифр
    formatNumber(num) {
        return num < 10 ? `0${num}` : `${num}`;
    }
    
    // Оновлення відображення
    updateDisplay() {
        try {
            const time = this.calculateTimeRemaining();
            
            // Оновлюємо тільки якщо значення змінилися
            if (this.daysElement && this.daysElement.textContent !== this.formatNumber(time.days)) {
                this.daysElement.textContent = this.formatNumber(time.days);
            }
            if (this.hoursElement && this.hoursElement.textContent !== this.formatNumber(time.hours)) {
                this.hoursElement.textContent = this.formatNumber(time.hours);
            }
            if (this.minutesElement && this.minutesElement.textContent !== this.formatNumber(time.minutes)) {
                this.minutesElement.textContent = this.formatNumber(time.minutes);
            }
            if (this.secondsElement && this.secondsElement.textContent !== this.formatNumber(time.seconds)) {
                this.secondsElement.textContent = this.formatNumber(time.seconds);
            }
            
            // Перевіряємо чи час вийшов
            if (time.isExpired) {
                this.handleCountdownEnd();
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('Помилка при оновленні таймера:', error);
            return false;
        }
    }
    
    // Обробка завершення відліку
    handleCountdownEnd() {
        console.log('Прем\'єра відбулась!');
        
        // Зупиняємо таймер
        this.stop();
        
        // Змінюємо текст
        const timerDisplay = document.querySelector('.timer-display');
        if (timerDisplay) {
            timerDisplay.innerHTML = `
                <div class="premiere-today">
                    <span style="font-size: 2.5rem;">🎉</span>
                    <h3 style="margin: 10px 0; color: #4CAF50;">Прем'єра сьогодні!</h3>
                    <p>Фільм вже в кінотеатрах</p>
                </div>
            `;
        }
        
        // Оновлюємо кнопки
        const btnNotify = document.querySelector('.btn-notify');
        if (btnNotify) {
            btnNotify.innerHTML = '<span>🎬</span> Купити квитки';
            btnNotify.onclick = () => window.open('https://cinema.example.com/tickets', '_blank');
        }
    }
    
    // Запуск таймера
    start() {
        if (this.isRunning) {
            console.warn('Таймер вже запущено');
            return;
        }
        
        this.isRunning = true;
        console.log('Таймер запущено');
        
        // Оновлюємо відразу
        const shouldContinue = this.updateDisplay();
        if (!shouldContinue) return;
        
        // Запускаємо інтервал
        this.timerId = setInterval(() => {
            const shouldContinue = this.updateDisplay();
            if (!shouldContinue) {
                this.stop();
            }
        }, 1000);
    }
    
    // Зупинка таймера
    stop() {
        if (!this.isRunning) return;
        
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        
        this.isRunning = false;
        console.log('Таймер зупинено');
    }
    
    // Перезапуск таймера
    restart() {
        this.stop();
        this.start();
    }
    
    // Отримати залишковий час
    getTimeRemaining() {
        return this.calculateTimeRemaining();
    }
}

// Ініціалізація таймера при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    // Затримка для гарантії завантаження DOM
    setTimeout(() => {
        window.premiereCountdown = new PremiereCountdown();
    }, 100);
});

// Функції для кнопок (якщо ще не визначені)
function setNotification() {
    if (Notification.permission === 'granted') {
        new Notification('Прем\'єра "28 років по тому"', {
            body: 'Ми повідомимо вас за день до прем\'єри!',
            icon: 'images/notification-icon.png'
        });
        alert('Ви отримаєте сповіщення за день до прем\'єри!');
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                alert('Дозвіл на сповіщення надано!');
            }
        });
    }
}

function showTrailer() {
    // Відкриваємо трейлер у модальному вікні або посилання
    const trailerUrl = 'https://www.youtube.com/watch?v=EXAMPLE_TRAILER';
    window.open(trailerUrl, '_blank');
    
}

// Опційно: Пауза таймера при неактивній вкладці
document.addEventListener('visibilitychange', () => {
    if (window.premiereCountdown) {
        if (document.hidden) {
            console.log('Вкладка неактивна, оптимізуємо таймер...');
            // Можна зменшити частоту оновлення
        } else {
            console.log('Вкладка активна, оновлюємо таймер...');
            window.premiereCountdown.restart();
        }
    }
});

// ========== МОДАЛЬНЕ ВІКНО ДЛЯ ТРЕЙЛЕРА ==========
let trailerModal;

function showTrailer() {
    // Закриваємо попереднє модальне вікно, якщо воно існує
    if (trailerModal) {
        closeTrailer();
    }
    
    // Створюємо нове модальне вікно
    trailerModal = document.createElement('div');
    trailerModal.id = 'trailerModal';
    trailerModal.style.display = 'flex';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    
    // Створюємо iframe без автопрогравання
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/e67K9lCl8qY?si=rQmmuV6krtcCeFUQ&rel=0&showinfo=0';
    iframe.title = 'Трейлер фільму "28 років по тому"';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    
    // Кнопка закриття
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeTrailer;
    
    // Додаємо обробники подій
    trailerModal.onclick = (e) => {
        if (e.target === trailerModal) {
            closeTrailer();
        }
    };
    
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeTrailer();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
    
    // Збираємо все разом
    modalContent.appendChild(iframe);
    modalContent.appendChild(closeBtn);
    trailerModal.appendChild(modalContent);
    document.body.appendChild(trailerModal);
    
    // Блокуємо прокрутку сторінки
    document.body.style.overflow = 'hidden';
    
    // Запускаємо відео через 500мс
    setTimeout(() => {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        }
    }, 500);
}

function closeTrailer() {
    if (trailerModal) {
        // Зупиняємо відео перед закриттям
        const iframe = trailerModal.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
        
        // Видаляємо модальне вікно
        trailerModal.remove();
        trailerModal = null;
        
        // Відновлюємо прокрутку сторінки
        document.body.style.overflow = 'auto';
    }
}

// ========== СПОВІЩЕННЯ ПРО ПРЕМ'ЄРУ ==========
function setNotification() {
    if (!("Notification" in window)) {
        alert("Ваш браузер не підтримує сповіщення. Дозвольте сповіщення в налаштуваннях браузера.");
        return;
    }
    
    if (Notification.permission === "granted") {
        createNotification();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                createNotification();
            } else {
                alert("Дякуємо за інтерес! Ви можете відслідковувати прем'єру на нашому сайті.");
            }
        });
    } else {
        alert("Ви заблокували сповіщення. Розблокуйте їх в налаштуваннях браузера, щоб отримувати інформацію про прем'єри.");
    }
}

function createNotification() {
    const notification = new Notification("КІНОВОЛЯ 🎬", {
        body: "Не забудьте про прем'єру '28 років по тому' 30 грудня 2025 року!",
        icon: "images/logo.svg",
        tag: "premiere-notification"
    });
    
    notification.onclick = () => {
        window.focus();
        notification.close();
    };
    
    // Оновлюємо кнопку
    const notifyBtn = document.querySelector('.btn-notify');
    if (notifyBtn) {
        const originalText = notifyBtn.innerHTML;
        notifyBtn.innerHTML = '<span>✅</span> Сповіщення налаштовано';
        notifyBtn.style.backgroundColor = '#594C40';
        notifyBtn.disabled = true;
        
        setTimeout(() => {
            notifyBtn.innerHTML = originalText;
            notifyBtn.style.backgroundColor = '';
            notifyBtn.disabled = false;
        }, 3000);
    }
}

// ========== НАВІГАЦІЯ ПО ТИЖНЯХ ==========
function prevWeek() {
    alert('Функція перегляду попереднього тижня в розробці');
}

function nextWeek() {
    alert('Функція перегляду наступного тижня в розробці');
}

// ========== ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ СТОРІНКИ ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM завантажено");
    
    // Ініціалізація головного слайдера
    showSlide(currentSlide);
    
    // Ініціалізація слайдерів
    initMovieSlider();
    initCinemaSlider();
    
    // Запускаємо таймер
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Обробники кліків на фільми в розкладі
    document.querySelectorAll('.schedule-movie').forEach(item => {
        item.addEventListener('click', function() {
            const movieId = this.getAttribute('data-movie');
            if (movieId) {
                window.location.href = `index2.html#${movieId}`;
            }
        });
    });
    
    // Обробка зміни розміру вікна
    window.addEventListener('resize', function() {
        console.log("Вікно змінило розмір");
        initMovieSlider();
        initCinemaSlider();
    });
    
    // Дебаг-інформація
    console.log("Слайдів фільмів:", document.querySelectorAll('.movie-slide').length);
    console.log("Слайдів кінотеатрів:", document.querySelectorAll('.cinema-slide').length);
});

// При закритті сторінки зупиняємо відео
window.addEventListener('beforeunload', function() {
    closeTrailer();
});

// Анімації та інтерактивність для сторінки "Про нас"

document.addEventListener('DOMContentLoaded', function() {
    // Ініціалізація анімацій (без анімацій для відгуків)
    initAboutAnimations();
    
    // Ініціалізація інтерактивних елементів
    initInteractiveElements();
    
    // Паралакс ефект для герой секції
    initParallaxEffect();
    
    // Плавна прокрутка
    initSmoothScroll();
    
    // Відразу показуємо всі відгуки
    showAllReviews();
});

// Функція для негайного відображення всіх відгуків
function showAllReviews() {
    const reviewCards = document.querySelectorAll('.review-card');
    const statItems = document.querySelectorAll('.stat-item');
    
    // Відразу показуємо всі відгуки без анімацій
    reviewCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.visibility = 'visible';
        card.style.display = 'block';
    });
    
    // Відразу показуємо статистику
    statItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
        item.style.visibility = 'visible';
    });
}

function initAboutAnimations() {
    // Тільки анімації для карток команди та автора
    const animatedElements = document.querySelectorAll('.team-member-card, .author-content');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('team-member-card')) {
                    // Анімація для карток команди
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    const delay = index * 0.1;
                    
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay * 1000);
                } else {
                    // Анімація для блоку автора
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Спостереження тільки за потрібними елементами
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Інтерактивні елементи
function initInteractiveElements() {
    // Ховер ефекти для міток програмного забезпечення
    const softwareTags = document.querySelectorAll('.software-tag');
    
    softwareTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Інтерактивність для карток команди
    const teamCards = document.querySelectorAll('.team-member-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
    
    // Ефекти для фотографій
    const photos = document.querySelectorAll('.member-photo img, .author-real-photo');
    
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    });
}

// Паралакс ефект
function initParallaxEffect() {
    const aboutHero = document.querySelector('.about-hero');
    
    if (aboutHero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            aboutHero.style.transform = `translateY(${rate * 0.5}px)`;
            aboutHero.style.opacity = 1 - (scrolled * 0.001);
        });
    }
}

// Плавна прокрутка
function initSmoothScroll() {
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}


/*допомога сторінка*/
// Акардеон для частых питань
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация акардеона
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий вопрос
            item.classList.toggle('active');
        });
    });
    
    // Форма бронирования
    const bookingForm = document.getElementById('ticketBookingForm');
    
    if (bookingForm) {
        // Устанавливаем минимальную дату (сегодня)
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        document.getElementById('date').min = todayFormatted;
        
        // Устанавливаем дату по умолчанию (завтра)
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        document.getElementById('date').value = tomorrowFormatted;
        
        // Обработка отправки формы
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь будет отправка данных на сервер
            // В этом примере просто покажем сообщение
            const formData = new FormData(bookingForm);
            const movie = formData.get('movie');
            const date = formData.get('date');
            const time = formData.get('time');
            const tickets = formData.get('tickets');
            const name = formData.get('name');
            
            alert(`Дякуємо за бронювання, ${name}!\n\nДеталі:\nФільм: ${getMovieName(movie)}\nДата: ${formatDate(date)}\nЧас: ${time}\nКвитків: ${tickets}\n\nНаш менеджер зв'яжеться з вами найближчим часом для підтвердження.`);
            
            // Очистка формы (кроме даты)
            bookingForm.reset();
            document.getElementById('date').value = tomorrowFormatted;
        });
    }
    
    // Функция для получения названия фильма
    function getMovieName(movieId) {
        const movies = {
            'lion-heart': 'ЛЕВОВЕ СЕРЦЕ',
            'cosmic-journey': 'КОСМІЧНА ПОДОРОЖ',
            'eternal-sunshine': 'ВІЧНЕ СЯЙВО',
            'shadow-warrior': 'ВОЇН ТІНІ',
            'family-magic': 'СІМЕЙНА МАГІЯ',
            'classic-4k': 'КЛАСИКА 4K'
        };
        
        return movies[movieId] || movieId;
    }
    
    // Функция для форматирования даты
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date.toLocaleDateString('uk-UA', options);
    }
    
    // Слайдер (если еще не добавлен)
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    window.nextSlide = function() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    window.prevSlide = function() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    window.goToSlide = function(n) {
        currentSlide = n;
        showSlide(currentSlide);
    }
    
    // Автоматическая смена слайдов
    setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
});

// ===== КАТАЛОГ ФІЛЬМІВ =====

// Дані про всі фільми
const moviesData = {
    nowShowing: [
        {
            id: 1,
            title: "Зоотрополіс 2",
            year: 2025,
            duration: "1:47",
            genre: "Пригоди, Анімація, Сімейний, Комедія",
            rating: 7.7,
            criticRating: 93,
            description: "Хоробра детективка Джуді Гопс і її кмітливий напорник Нік Крутихвіст знову беруться за справу — цього разу найзагадковішу в їхній кар'єрі. У Зоотрополісі з'являється таємнича рептилія, яка перевертає життя мешканців метаполіса догори дригом.",
            fullDescription: "У Зоотрополісі, місті де тварини всіх видів живуть у гармонії, з'являється загадкова істота - рептилія з незвичайними здібностями. Джуді Гопс і Нік Крутихвіст, тепер досвідчені детективи, отримують найскладнішу справу у своїй кар'єрі. Вони повинні розкрити таємницю цієї рептилії та з'ясувати, чому вона викликає хаос у місті.",
            cast: ["Джинніфер Гудвін", "Джейсон Бейтман", "Джонатан Ке Каан", "Фортун Феймстер", "Квінта Брансон"],
            ticketsLeft: 45,
            image: "images/film6.jpg",
            trailerId: "y985bpg3h7U"
        },
        {
            id: 2,
            title: "Однієї тихої ночі",
            year: 2025,
            duration: "1:44",
            genre: "Жахи, Трилер",
            rating: 8.4,
            criticRating: 94,
            description: "",
            fullDescription: "Творці горору Жахаючий 3 представляють ремейк культової стрічки про вбивцю у костюмі Санти, який виходить на полювання однієї тихої Різдвяної ночі.",
            cast: ["Роен Кемпбелл", "Рубі Модін", "Ерік Атхавале", "Девід Лоренс Браун", "Марк Ачесон"],
            ticketsLeft: 12,
            image: "images/film1.jpg",
            trailerId: "NrlTH7i6V6A"
        },
        {
            id: 3,
            title: "Аватар: Вогонь і Попіл",
            year: 2025,
            duration: "192 хв ",
            genre: "екшн, фантастика, пригоди, трилер, фентезі",
            rating: 6.0,
            criticRating: 58,
            description: "Через рік після поселення в клані Меткаїна, родина Джейка та Нейтірі переживає страшне горе від нещодавньої болючої втрати. Несподівано герої зіштовхуються зі ще більш небезпечним та могутнім ворогом племені, яким керує надзвичайно потужний лідер Варанг.",
            fullDescription: "Через рік після поселення в клані Меткаїна, родина Джейка та Нейтірі переживає страшне горе від нещодавньої болючої втрати. Несподівано герої зіштовхуються зі ще більш небезпечним та могутнім ворогом племені, яким керує надзвичайно потужний лідер Варанг. Останній об’єднався з найлютішим Джейковим суперником. Поволі конфлікт на Пандорі загострюється до дійсно руйнівних наслідків.",
            cast: ["Сем Вортінґтон", "Зої Салдана", "Сіґурні Вівер", "Кейт Вінслет", "Кліфф Кертіс"],
            ticketsLeft: 28,
            image: "images/film2.jpg",
            trailerId: "d9MyW72ELq0"
        },
        {
            id: 4,
            title: "Потяг до Різдва",
            year: 2024,
            duration: "1:30",
            genre: "Сімейний, Комедія",
            rating: 8.7,
            criticRating: 92,
            description: "Волею випадку напередодні Різдва в один потяг сідають абсолютно різні пасажири зі своїми проблемами та мріями, і тепер їм усім доведеться організовувати Святу вечерю просто в вагоні ресторані.",
            fullDescription: "Волею випадку напередодні Різдва в один потяг сідають абсолютно різні пасажири зі своїми проблемами та мріями, і тепер їм усім доведеться організовувати Святу вечерю просто в вагоні ресторані. В очікуванні першої зірки всі пасажири об’єднуються в одну велику українську родину. І починають ставатися дива.",
            cast: ["Станіслав Боклан", "Антоніна Хижняк", "Михайло Хома", "Юрій Горбунов", "Лілія Ребрик"],
            ticketsLeft: 5,
            image: "images/film3.jpg",
            trailerId:  "8kGu0n_sfng"
        },
        {
            id: 5,
            title: "СНІГОВА КОРОЛЕВА",
            year: 2025,
            duration: "1:54",
            genre: "Анімація",
            rating: 7.0,
            criticRating: 88,
            description: "Анімація «Снігова королева» створена за мотивами казки данського письменника Ганса Крістіана Андерсена. Юна Герда вирушає на пошуки зниклого друга Кая — і потрапляє у вир пригод, де добро змагається з холодом Снігової королеви. ",
            fullDescription: "Анімація «Снігова королева» створена за мотивами казки данського письменника Ганса Крістіана Андерсена. Юна Герда вирушає на пошуки зниклого друга Кая — і потрапляє у вир пригод, де добро змагається з холодом Снігової королеви. Попереду — дивовижні зустрічі, небезпечна подорож до крижаного палацу й найтепліше Різдво, яке тільки можна уявити",

            cast: ["Марґот Роббі", "Раян Гослінг", "Америка Феррера", "Кейт Маккіннон", "Вілл Феррелл"],
            ticketsLeft: 32,
            image: "images/film4.jpg",
            trailerId: "gH_U_oUTTtQ"
        },
        {
            id: 6,
            title: "ТИ — КОСМОС",
            year: 2023,
            duration: "2:00",
            genre: "Наукова фантастика",
            rating: 8.3,
            criticRating: 93,
            description: "Фільм «Ти — Космос» — справжня українська кіноперлина: ще до прем’єри він здобув 13 міжнародних нагород і 9 номінацій.",
            fullDescription: "Події відбуваються у майбутньому: український космічний далекобійник Андрій перевозить ядерні відходи з Землі на супутник Юпітера. Коли Земля несподівано вибухає, а її уламки знищують усе навколо, Андрій залишається єдиною людиною у Всесвіті. Зі співрозмовників у нього лише робот, аж поки на зв’язок не виходить француженка Катрін. Вона потребує допомоги, і, попри всі небезпеки, Андрій вирушає їй назустріч. Режисер Павло Остріков витратив десять років на роботу над фільмом, але це точно було того варте. ",
            cast: ["Кілліан Мерфі", "Емілі Блант", "Метт Деймон", "Роберт Дауні мол.", "Флоренс П'ю"],
            ticketsLeft: 18,
            image: "images/film5.jpg",
            trailerId: "tFMo3UJ4B4g"
        }
    ],
    // Додайте ці дані в масив comingSoon в moviesData:
comingSoon: [
    {
        id: 7,
        title: "Губка Боб у кіно: у пошуках квадратних штанів",
        year: 2025,
        duration: "2:35",
        genre: "Сімейний, Комедія, Анімація, Пригоди",
        description: "Губка Боб та його невгамовні друзі з Бікіні Ботом повертаються у найбожевільнішій та наймасштабнішій пригоді на великому екрані — «Губка Боб у кіно: У пошуках Квадратних Штанів»!Мріючи стати справжнім героєм, Губка Боб вирішує довести свою відвагу містеру Крабсу — і вирушає навздогін Летючому Голландцю, легендарному привиду-пірату. На нього чекає шалена подорож морськими глибинами, повна гумору, небезпек і несподіваних відкриттів. Цього разу він запливе туди, де ще не бував жоден морський губкоподібний сміливець!",
        cast: ["Том Кенні", "Кленсі Браун", "Марк Гемілл", "Білл Фагербаккі"],
        image: "images/film7.jpg",
        trailerId: "iDqackX1A3o" // Додано трейлер
    },
    {
        id: 8,
        title: "Замок монстрів",
        year: 2025,
        duration: "1:29",
        genre: "Пригоди, Анімація, Комедія, Сімейний",
        description: "Маленьке створіння оживає в замку Божевільного Професора, щоб захистити його монстрів від допитливих мешканців містечка Ґрабберс-Наббін. Веселі пригоди, кумедні монстри та неймовірні винаходи чекають на всіх, хто готовий повірити у чудо!",
        cast: ["Том Харді", "Джуні Смоллетт", "Мішель Вільямс", "Стівен Грем"],
        image: "images/film8.jpg",
        trailerId: "mYfJxlgR2jw" // Додано трейлер
    },
    {
        id: 9,
        title: "Книжкові пригоди",
        year: 2025,
        duration: "1:38",
        genre: "Сімейний, Комедія",
        description: "Автоботи та Десептикони продовжують свою вікову війну на Землі.",
        cast: ["Крістоф Марія Гербст ", "Юна Беннетт", "Едін Гасановіч"],
        image: "images/film9.jpg",
        trailerId: "8hP9D6kZseM"// Додано трейлер
    },
    {
        id: 10,
        title: "Крик 7",
        year: 2025,
        duration: "2:00",
        genre: "Трилер, Жахи, Містика",
        description: "Коли в тихому містечку, де Сідні Прескотт (Нів Кемпбелл) зуміла почати нове життя, з’являється новий убивця в масці Примари, її давні страхи знову оживають — цього разу небезпека нависла над її донькою (Ізабель Мей). Щоб урятувати близьких і остаточно зупинити кривавий цикл, Сідні доведеться знову зіткнутися з тінями минулого.",
        cast: ["Нів Кемпбелл ", "Кортні Кокс", "Маккенна Грейс", "Ізабель Мей"],
        image: "images/film10.jpg",
        trailerId:"EFCNs4iVGZU" // Додано трейлер
    },
    {
        id: 11,
        title: "Мавка. Справжній міф",
        year: 2026,
        duration: "1:30",
        genre: "Фентезі, Романтика",
        description: "Мавка, містична і небезпечна лісова німфа, закохується у біолога Лук’яна замість того, щоб згубити його у таємничому лісовому озері, де на чоловічі душі чекають русалки та інші мавки. І вони ладні на все, щоб Мавка залишилась на темній стороні.",
        cast: ["Ярослав Войцешек"],
        image: "images/film11.jpg",
        trailerId:  "N2r6qgsSYBQ" // Додано трейлер
    },
    {
        id: 12,
        title: "Чарлі суперпес",
        year: 2024,
        duration: "2:00",
        genre: "Пригоди, Анімація, Сімейний, Комедія",
        description: "Одного ранку 9-річний Сашко виявляє, що його пес Чарлі - вміє говорити, більше того - він ще й отримав супер-здібності, завдяки яким має рятувати людство від небезпек. Тепер двоє друзів мусять об'єднати зусилля, аби протистояти злому коту Падді, який задумав знищити світ.",
        cast: ["Стив Балл", "Шея Вейгеман"],
        image: "images/film12.jpg",
        trailerId: "2z9h5SbWxOc" // Додано трейлер
    },
    {
        id: 13,
        title: "Випробувальний термін",
        year: 2026,
        duration:  "1:36 ",
        genre: "Фантастика, Пригоди",
        description: "Головна героїня Поліна — гламурна донька бізнесмена, яка звикла до безтурботного життя. Після зради батька вона опиняється на випробувальному терміні в рекламній агенції. Там вона протягом місяця змагається за посаду з Романом — амбітним і принциповим колегою, який бачить світ зовсім інакше. Їхнє професійне суперництво поступово переростає у конфлікти, несподівані зближення й ситуації, де важко відрізнити робочі завдання від особистих почуттів.Це романтична комедія з актуальним гумором про пошук довіри, нові початки й те, як навіть найжорсткіша конкуренція може несподівано стати історією кохання.",
        cast: ["Катерина Кузнєцова", "Кирило Парастаєв", "Вʼячеслав Довженко", "Олена Узлюк"],
        image: "images/film13.jpg",
        trailerId:  "Jst33rorkjo" // Додано трейлер
    },
    {
        id: 14,
        title: "7 бажань",
        year: 2026,
        duration: "2:35",
        genre: "Комедія, Пригоди, Сімейний",
        description: "Юристу Олександру (Артур Логай) випадає шанс отримати роботу мрії, і нарешті звільнитися від нинішнього шефа-дивака. Заради цього він навіть готовий пожертвувати дорогоцінним часом сімейного відпочинку із сином та дружиною (Дар’я Петрожицька). Проте усе його життя раптом перевертається догори дригом: уся їжа перетворюється на смаколики, поруч бігає кудлатий пес, а друзі та колеги вважають, що він поліцейський. Більше того - однокласниця-зірка (Олександра Мішина), яку він не бачив роками, раптом закохується в нього по вуха. Тепер Олександр мусить вберегти власне життя та здоровий глузд, бо колись він загадав не те бажання Святому Миколаю...",
        cast: ["Артур Логай ", "Дар'я Петрожицька ", " Ксенія Мішина ", "Римма Зюбіна"],
        image: "images/film14.jpg",
        trailerId: "urS5noEYZMc" // Додано трейлер
    }
]
    
};

// Функція для визначення класу доступності квитків
function getTicketClass(ticketsLeft) {
    if (ticketsLeft > 20) return "high";
    if (ticketsLeft > 10) return "medium";
    return "low";
}

// Функція для створення картки фільму
function createMovieCard(movie, isNowShowing = true) {
    const ticketClass = isNowShowing ? getTicketClass(movie.ticketsLeft) : "";
    
    return `
        <div class="movie-item" data-movie-id="${movie.id}">
            <div class="movie-item-content">
                <div class="movie-poster-medium">
                    <img src="${movie.image}" alt="${movie.title}">
                </div>
                
                <div class="movie-info-catalog">
                    <h3 class="movie-title-catalog">${movie.title}</h3>
                    
                    ${movie.rating ? `
                    <div class="movie-rating-catalog">
                        <span class="rating-badge">
                            <i class="fas fa-star"></i> ${movie.rating}/10
                        </span>
                        ${movie.criticRating ? `
                        <span class="rating-badge critic">
                            <i class="fas fa-trophy"></i> ${movie.criticRating}%
                        </span>` : ''}
                    </div>` : ''}
                    
                    <div class="movie-details-catalog">
                        <div class="detail-item-catalog">
                            <i class="fas fa-calendar-alt"></i>
                            <span><strong>Рік:</strong> ${movie.year}</span>
                        </div>
                        <div class="detail-item-catalog">
                            <i class="fas fa-clock"></i>
                            <span><strong>Тривалість:</strong> ${movie.duration}</span>
                        </div>
                        <div class="detail-item-catalog">
                            <i class="fas fa-film"></i>
                            <span><strong>Жанр:</strong> ${movie.genre}</span>
                        </div>
                        ${movie.rating ? `
                        <div class="detail-item-catalog">
                            <i class="fas fa-chart-line"></i>
                            <span><strong>Рейтинг:</strong> ${movie.rating}/10</span>
                        </div>` : ''}
                    </div>
                    
                    <div class="movie-genres-catalog">
                        ${movie.genre.split(', ').map(genre => 
                            `<span class="genre-tag-catalog">${genre}</span>`
                        ).join('')}
                    </div>
                    
                    <div class="movie-description-catalog">
                        <p>${movie.fullDescription || movie.description}</p>
                    </div>
                    
                    ${movie.cast && movie.cast.length > 0 ? `
                    <div class="movie-cast">
                        <h4><i class="fas fa-users"></i> У головних ролях</h4>
                        <ul class="cast-list">
                            ${movie.cast.slice(0, 4).map(actor => `<li>${actor}</li>`).join('')}
                            ${movie.cast.length > 4 ? `<li>та інші...</li>` : ''}
                        </ul>
                    </div>` : ''}
                    
                    <div class="movie-actions">
                        ${isNowShowing ? `
                        <div class="ticket-info">
                            <span class="tickets-available ${ticketClass}">
                                <i class="fas fa-ticket-alt"></i> Залишилось: ${movie.ticketsLeft} квитків
                            </span>
                        </div>
                        
                        <div class="action-buttons-catalog">
                            <a href="index4.html" class="btn-buy">
                                <i class="fas fa-shopping-cart"></i> Купити квиток
                            </a>
                            <a href="index4.html" class="btn-reserve">
                                <i class="fas fa-calendar-check"></i> Забронювати
                            </a>
                        </div>` : 
                        `<div class="coming-soon-label">
                            <i class="fas fa-clock"></i> Скоро у кіно
                        </div>`
                        }
                        
                        ${movie.trailerId ? `
                        <button class="btn-trailer" data-trailer-id="${movie.trailerId}">
                            <i class="fas fa-play-circle"></i> Дивитись трейлер
                        </button>` : 
                        `<button class="btn-trailer" disabled>
                            <i class="fas fa-calendar-alt"></i> Трейлер скоро
                        </button>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Функція для завантаження фільмів
function loadMoviesCatalog() {
    const nowShowingContainer = document.getElementById('now-showing-container');
    const comingSoonContainer = document.getElementById('coming-soon-container');
    
    // Очищаємо контейнери
    nowShowingContainer.innerHTML = '';
    comingSoonContainer.innerHTML = '';
    
    // Додаємо фільми "Зараз у кіно"
    if (moviesData.nowShowing.length > 0) {
        moviesData.nowShowing.forEach(movie => {
            const movieCard = createMovieCard(movie, true);
            nowShowingContainer.insertAdjacentHTML('beforeend', movieCard);
        });
    } else {
        nowShowingContainer.innerHTML = '<p class="no-movies">Наразі фільмів у прокаті немає</p>';
    }
    
    // Додаємо фільми "Скоро у кіно"
    if (moviesData.comingSoon.length > 0) {
        moviesData.comingSoon.forEach(movie => {
            const movieCard = createMovieCard(movie, false);
            comingSoonContainer.insertAdjacentHTML('beforeend', movieCard);
        });
    }
    
    // Додаємо обробники подій для кнопок трейлерів
    addTrailerEventListeners();
}

// Функція для обробки трейлерів
function addTrailerEventListeners() {
    const trailerButtons = document.querySelectorAll('.btn-trailer:not([disabled])');
    const trailerModal = document.getElementById('trailer-modal');
    const closeTrailerBtn = document.querySelector('.close-trailer');
    const trailerVideo = document.getElementById('trailer-video');
    
    // Відкриття трейлера
    trailerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trailerId = this.getAttribute('data-trailer-id');
            if (trailerId) {
                trailerVideo.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
                trailerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Закриття трейлера
    closeTrailerBtn.addEventListener('click', function() {
        trailerModal.style.display = 'none';
        trailerVideo.src = '';
        document.body.style.overflow = 'auto';
    });
    
    // Закриття по кліку на задній фон
    trailerModal.addEventListener('click', function(e) {
        if (e.target === this) {
            trailerModal.style.display = 'none';
            trailerVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Закриття по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && trailerModal.style.display === 'flex') {
            trailerModal.style.display = 'none';
            trailerVideo.src = '';
            document.body.style.overflow = 'auto';
        }
    });
}

// Завантажуємо каталог при завантаженні сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Перевіряємо, чи ми на сторінці з каталогом
    if (document.getElementById('now-showing-container')) {
        loadMoviesCatalog();
    }
});

// Форма відгуку
document.addEventListener('DOMContentLoaded', function() {
    // ... попередній код ...
    
    // Обробка форми відгуку
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Отримуємо дані з форми
            const formData = new FormData(feedbackForm);
            const name = formData.get('name');
            const type = formData.get('type');
            const subject = formData.get('subject');
            const message = formData.get('message');
            const rating = formData.get('rating') || 'Не вказано';
            
            // Тексти для типів повідомлень
            const typeTexts = {
                'question': 'Запитання',
                'feedback': 'Відгук',
                'complaint': 'Скарга',
                'suggestion': 'Пропозиція',
                'other': 'Інше'
            };
            
            const typeText = typeTexts[type] || type;
            
            // Показуємо повідомлення про успішну відправку
            alert(`Дякуємо, ${name}!\n\nВаше повідомлення успішно відправлено.\n\nДеталі:\nТип: ${typeText}\nТема: ${subject}\nОцінка: ${rating === 'Не вказано' ? rating : rating + ' зірок'}\n\nМи відповімо вам протягом 24 годин.`);
            
            // Скидаємо форму
            feedbackForm.reset();
            
            // Скидаємо вибір зірочок
            const ratingInputs = document.querySelectorAll('input[name="rating"]');
            ratingInputs.forEach(input => input.checked = false);
        });
        
        // Обмеження розміру файлу
        const fileInput = document.getElementById('feedback-file');
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                const maxSize = 5 * 1024 * 1024; // 5MB
                
                if (this.files[0] && this.files[0].size > maxSize) {
                    alert('Файл занадто великий! Максимальний розмір: 5MB');
                    this.value = '';
                }
            });
        }
    }
    
    // Ініціалізація рейтингу зірочок
    const stars = document.querySelectorAll('.rating-stars input');
    stars.forEach(star => {
        star.addEventListener('change', function() {
            const ratingValue = this.value;
            console.log(`Вибрано рейтинг: ${ratingValue} зірок`);
        });
    });
    
    // Плавна прокрутка до форм при кліку на посилання
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});


// Повні дані про всі фільми
const moviesFullData = {
    1: {
        id: 1,
        title: "Зоотрополіс 2",
        originalTitle: "Zootopia 2",
        year: 2025,
        duration: "1:47",
        genre: "Пригоди, Анімація, Сімейний, Комедія",
        ageRating: "0+",
        language: "українська мова",
        country: "США",
        studio: "Walt Disney Animation Studios",
        director: "Джерел Буш, Байрон Говорд",
        screenwriter: "Джерел Буш, Байрон Ховорд",
        rating: 7.7,
        criticRating: 93,
        description: "Хоробра детективка Джуді Гопс і її кмітливий напорник Нік Крутихвіст знову беруться за справу — цього разу найзагадковішу в їхній кар'єрі. У Зоотрополісі з'являється таємнича рептилія, яка перевертає життя мешканців метаполіса догори дригом. Щоб розкрити цю справу, напорники вирушають під прикриттям у заповідні райони мегаполісу.",
        fullDescription: "У Зоотрополісі, місті де тварини всіх видів живуть у гармонії, з'являється загадкова істота - рептилія з незвичайними здібностями. Джуді Гопс і Нік Крутихвіст, тепер досвідчені детективи, отримують найскладнішу справу у своїй кар'єрі. Вони повинні розкрити таємницю цієї рептилії та з'ясувати, чому вона викликає хаос у місті. Подорож під прикриттям приведе їх до несподіваних відкриттів про Зоотрополіс та його мешканців.",
        cast: ["Джинніфер Гудвін", "Джейсон Бейтман", "Джонатан Ке Каан", "Фортун Феймстер", "Квінта Брансон"],
        ticketsLeft: 45,
        image: "https://images.unsplash.com/photo-1595769812725-4c6564ca7837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        trailerId: "g9KItPuTv-s",
        isNowShowing: true,
        inclusiveAdaptation: "Фільм адаптовано для людей з порушенням слуху чи вадами зору. Щоб скористатися цією опцією, завантаж додаток 'GRETA' на свій смартфон."
    },
   
};
// Функція для отримання ID фільму з URL
function getMovieIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id') || 1; // За замовчуванням показуємо перший фільм
}

// Функція для створення HTML сторінки фільму
function createMoviePage(movie) {
    return `
        <div class="movie-header">
            <div class="movie-poster-large">
                <img src="${movie.image}" alt="${movie.title}">
            </div>
            
            <div class="movie-main-info">
                <h1 class="movie-title-main">${movie.title}</h1>
                ${movie.rating ? `
                <div class="movie-rating">
                    <div class="rating-circle">
                        <span class="rating-number">${movie.rating}</span>
                        <span class="rating-label">глдч.</span>
                    </div>
                    ${movie.criticRating ? `
                    <div class="rating-circle critic">
                        <span class="rating-number">${movie.criticRating}%</span>
                        <span class="rating-label">крт.</span>
                    </div>` : ''}
                </div>` : ''}
                
                <div class="movie-details-main">
                    <div class="detail-item">
                        <i class="fas fa-calendar-alt"></i>
                        <span><strong>Рік:</strong> ${movie.year}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-clock"></i>
                        <span><strong>Тривалість:</strong> ${movie.duration}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-globe"></i>
                        <span><strong>Мова:</strong> ${movie.language}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-friends"></i>
                        <span><strong>Вік:</strong> ${movie.ageRating}</span>
                    </div>
                </div>
                
                <div class="movie-genres">
                    ${movie.genre.split(', ').map(genre => 
                        `<span class="genre-tag">${genre}</span>`
                    ).join('')}
                </div>
                
                <div class="action-buttons">
                    ${movie.isNowShowing ? 
                        `<a href="index4.html" class="buy-btn-large">
                            <i class="fas fa-ticket-alt"></i> Купити квиток
                            ${movie.ticketsLeft ? `<span class="ticket-count">Залишилось: ${movie.ticketsLeft} квитків</span>` : ''}
                        </a>` :
                        `<button class="buy-btn-large coming-soon" disabled>
                            <i class="fas fa-calendar-alt"></i> Скоро у кіно
                            <span class="ticket-count">Квитків ще немає у продажі</span>
                        </button>`
                    }
                    ${movie.trailerId !== 'placeholder' ? 
                        `<a href="#trailer" class="trailer-btn">
                            <i class="fas fa-play-circle"></i> Дивитись трейлер
                        </a>` :
                        `<button class="trailer-btn" disabled>
                            <i class="fas fa-calendar-alt"></i> Трейлер скоро
                        </button>`
                    }
                </div>
            </div>
        </div>
        
        <div class="movie-content">
            <div class="movie-description">
                <h2><i class="fas fa-info-circle"></i> Про фільм</h2>
                <p>${movie.fullDescription || movie.description}</p>
            </div>
            
            <div class="movie-details-extended">
                <div class="details-column">
                    <h3><i class="fas fa-info"></i> Детальна інформація</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <strong>Оригінальна назва:</strong>
                            <span>${movie.originalTitle}</span>
                        </div>
                        <div class="info-item">
                            <strong>Режисер:</strong>
                            <span>${movie.director}</span>
                        </div>
                        <div class="info-item">
                            <strong>Сценарій:</strong>
                            <span>${movie.screenwriter}</span>
                        </div>
                        <div class="info-item">
                            <strong>Виробництво:</strong>
                            <span>${movie.country}</span>
                        </div>
                        <div class="info-item">
                            <strong>Студія:</strong>
                            <span>${movie.studio}</span>
                        </div>
                    </div>
                </div>
                
                <div class="details-column">
                    <h3><i class="fas fa-users"></i> У головних ролях</h3>
                    <ul class="cast-list">
                        ${movie.cast.map(actor => `<li>${actor}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            ${movie.inclusiveAdaptation ? `
            <div class="inclusive-section">
                <h3><i class="fas fa-universal-access"></i> Інклюзивна адаптація</h3>
                <p>${movie.inclusiveAdaptation}</p>
            </div>` : ''}
            
            ${movie.trailerId !== 'placeholder' ? `
            <div id="trailer" class="trailer-section">
                <h2><i class="fas fa-video"></i> Трейлер фільму</h2>
                <div class="video-container">
                    <iframe 
                        width="100%" 
                        height="500" 
                        src="https://www.youtube.com/embed/${movie.trailerId}" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>` : ''}
        </div>
    `;
}

// Функція для завантаження деталей фільму
function loadMovieDetails() {
    const movieId = getMovieIdFromURL();
    const movieContainer = document.getElementById('movie-details');
    
    // Перевіряємо, чи існує фільм з таким ID
    if (moviesFullData[movieId]) {
        const movie = moviesFullData[movieId];
        
        // Оновлюємо заголовок сторінки
        document.title = `${movie.title} - Кінотеатр "КІНОВОЛЯ"`;
        
        // Створюємо сторінку фільму
        movieContainer.innerHTML = createMoviePage(movie);
        
        // Додаємо клас для кнопки "Скоро у кіно"
        if (!movie.isNowShowing) {
            const buyBtn = movieContainer.querySelector('.buy-btn-large');
            if (buyBtn) {
                buyBtn.classList.add('coming-soon');
            }
        }
    } else {
        // Якщо фільм не знайдено
        movieContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Фільм не знайдено</h2>
                <p>На жаль, ми не змогли знайти інформацію про цей фільм.</p>
                <a href="index.html" class="details-btn">Повернутися до каталогу</a>
            </div>
        `;
    }
}

// Додаємо CSS для повідомлення про помилку
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .error-message {
        text-align: center;
        padding: 60px 20px;
        background-color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--card-shadow);
    }
    
    .error-message i {
        font-size: 4rem;
        color: #e74c3c;
        margin-bottom: 20px;
    }
    
    .error-message h2 {
        color: #333;
        margin-bottom: 15px;
    }
    
    .error-message p {
        color: #666;
        margin-bottom: 30px;
        font-size: 1.1rem;
    }
    
    .coming-soon {
        background-color: #cccccc !important;
        color: #666 !important;
        cursor: not-allowed !important;
    }
`;
document.head.appendChild(errorStyles);

// Завантажуємо деталі фільму після завантаження сторінки
document.addEventListener('DOMContentLoaded', loadMovieDetails);

