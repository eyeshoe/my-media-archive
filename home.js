// Newsletter form handling
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = newsletterForm.querySelector('input[type="email"]').value;

            // For now, just store in localStorage (you can integrate with a real service later)
            let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');

            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('subscribers', JSON.stringify(subscribers));

                // Show success message
                alert('Thanks for subscribing! You\'ll get my monthly blog in your inbox :)');
                newsletterForm.reset();
            } else {
                alert('You\'re already subscribed!');
            }
        });
    }
});
