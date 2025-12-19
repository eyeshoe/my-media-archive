// Gallery Lightbox
(function() {
    let currentImageIndex = 0;
    let galleryImages = [];

    // Initialize lightbox on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Create lightbox HTML
        const lightboxHTML = `
            <div id="lightbox" class="lightbox">
                <span class="lightbox-close">&times;</span>
                <span class="lightbox-prev">&#10094;</span>
                <span class="lightbox-next">&#10095;</span>
                <img class="lightbox-content" id="lightbox-img" alt="Fullscreen image">
                <div class="lightbox-counter" id="lightbox-counter"></div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Get all images in the gallery
        const galleryContainer = document.querySelector('.gallery-container');
        if (!galleryContainer) return;

        galleryImages = Array.from(galleryContainer.querySelectorAll('img'));

        // Add click event to each image
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function() {
                openLightbox(index);
            });
        });

        // Set up lightbox controls
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');

        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        // Close on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        lightboxImg.src = galleryImages[index].src;
        lightbox.classList.add('active');
        updateCounter();

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');

        // Restore body scroll
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        document.getElementById('lightbox-img').src = galleryImages[currentImageIndex].src;
        updateCounter();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        document.getElementById('lightbox-img').src = galleryImages[currentImageIndex].src;
        updateCounter();
    }

    function updateCounter() {
        const counter = document.getElementById('lightbox-counter');
        counter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    }
})();
