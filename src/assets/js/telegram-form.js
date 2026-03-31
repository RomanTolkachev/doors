document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
			const formResult = document.querySelector('.form-result');
			formResult.textContent = '';

            if (!name || !phone) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            const messageText = `Новая заявка с сайта!\n\n Имя: ${name}\n Телефон: ${phone}\n\n Время: ${new Date().toLocaleString('ru-RU')}`;

            
            sendToTelegram(messageText, this);
        });
    }
});

async function sendToTelegram(messageText, form) {
    const submitBtn = form.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    const formResult = document.querySelector('.form-result');
    
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Отправка...';
    
    try {
        const response = await fetch(TELEGRAM_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: messageText
            })
        });
        
        const result = await response.json();
        
        if (result.ok) {
            formResult.textContent = 'Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в течение часа.';
            form.reset();
        } else {
            throw new Error('Telegram API Error: ' + result.statusText);
        }
    } catch (error) {
        console.error('Network Error:', error);
        formResult.textContent = 'Произошла ошибка при отправке. Попробуйте позже.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
    }
} 