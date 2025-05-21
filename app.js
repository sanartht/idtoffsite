document.addEventListener('DOMContentLoaded', () => {
    // Initialize Material Components
    const buttons = document.querySelectorAll('.mdc-button');
    buttons.forEach(button => {
        mdc.ripple.MDCRipple.attachTo(button);
    });

    const iconButtons = document.querySelectorAll('.mdc-icon-button');
    iconButtons.forEach(iconButton => {
        mdc.ripple.MDCRipple.attachTo(iconButton);
    });

    // Get Directions functionality
    const getDirectionsBtn = document.getElementById('getDirections');
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', () => {
            const address = "LDC, RCP, Navi Mumbai, Maharashtra 400701";
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(mapsUrl, '_blank');
        });
    }

    // Share functionality
    const shareBtn = document.querySelector('.mdc-icon-button[aria-label="Share"]');
    if (shareBtn && navigator.share) {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: 'IDTO Event',
                    text: 'Check out this upcoming IDTO event!',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    } else {
        shareBtn.style.display = 'none';
    }

    // Bookmark functionality
    const bookmarkBtn = document.querySelector('.mdc-icon-button[aria-label="Bookmark"]');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            const icon = bookmarkBtn.querySelector('i');
            if (icon.textContent === 'bookmark_border') {
                icon.textContent = 'bookmark';
                // Add to favorites logic here
            } else {
                icon.textContent = 'bookmark_border';
                // Remove from favorites logic here
            }
        });
    }
});
