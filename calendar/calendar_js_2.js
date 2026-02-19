// Календарь Футбо-Кэмп - все функции в одном объекте
const calendar = {
    // Переключение месяцев (аккордеон)
    toggleMonth: function(index) {
        const content = document.getElementById(`month-${index}`);
        if (!content) {
            console.log(`Месяц с индексом ${index} не найден`);
            return;
        }
        
        const button = content.previousElementSibling;
        const icon = button ? button.querySelector('.toggle-icon i') : null;
        
        if (content.style.display === 'block') {
            content.style.display = 'none';
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        } else {
            // Закрываем все другие месяцы
            for (let i = 0; i < 3; i++) {
                if (i !== index) {
                    const otherContent = document.getElementById(`month-${i}`);
                    if (otherContent && otherContent.style.display === 'block') {
                        otherContent.style.display = 'none';
                        const otherButton = otherContent.previousElementSibling;
                        const otherIcon = otherButton ? otherButton.querySelector('.toggle-icon i') : null;
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                    }
                }
            }
            
            content.style.display = 'block';
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
            
            // Прокрутка к открытому месяцу
            setTimeout(() => {
                content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    },

    // Бронирование даты
    bookDate: function(month, period) {
        const selectedDate = document.getElementById('selectedDate');
        if (selectedDate) {
            selectedDate.value = `${month}, ${period}`;
        }
        
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
            setTimeout(() => {
                bookingForm.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    },

    // Показать информацию о смене
    showDateInfo: function(period) {
        alert(`Информация о смене ${period}:\n\n• 3 тренировки в день\n• Мастер-классы с профи\n• Медицинское сопровождение\n• Развлекательные мероприятия\n• Фото- и видеоотчеты`);
    },

    // Инициализация страницы сезона
    init: function() {
        console.log("✅ Календарь инициализирован");
        
        // Открыть первый месяц
        setTimeout(() => {
            this.toggleMonth(0);
        }, 200);
        
        // Назначить обработчик формы
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            // Удаляем старый обработчик, если был
            bookingForm.removeEventListener('submit', this.handleSubmit);
            // Добавляем новый
            this.handleSubmit = (e) => {
                e.preventDefault();
                
                const selectedDate = document.getElementById('selectedDate');
                const childName = document.getElementById('childName');
                const childAge = document.getElementById('childAge');
                const parentPhone = document.getElementById('parentPhone');
                const parentEmail = document.getElementById('parentEmail');
                
                const formData = {
                    date: selectedDate?.value || '',
                    name: childName?.value || '',
                    age: childAge?.value || '',
                    phone: parentPhone?.value || '',
                    email: parentEmail?.value || ''
                };
                
                if (!formData.date) {
                    alert('⚠️ Сначала выберите дату смены!');
                    return;
                }
                
                alert(`✅ Заявка отправлена!\n\nС вами свяжутся по телефону ${formData.phone} для подтверждения бронирования.`);
                
                // Очистить форму
                bookingForm.reset();
                if (selectedDate) {
                    selectedDate.value = '';
                }
            };
            bookingForm.addEventListener('submit', this.handleSubmit);
        }
    }
};

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log("📅 Страница загружена");
    
    // Анимация карточек сезонов на главной странице
    const seasonCards = document.querySelectorAll('.season-card');
    if (seasonCards.length > 0) {
        seasonCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Автоматически инициализируем календарь, если есть месяцы
    if (document.querySelector('.months-accordion')) {
        calendar.init();
    }
});