document.addEventListener('DOMContentLoaded', () => {
    // Get Directions button functionality
    const getDirectionsBtn = document.getElementById('getDirections');
    if (getDirectionsBtn) {
        getDirectionsBtn.addEventListener('click', () => {
            const address = "LDC, RCP, Navi Mumbai, Maharashtra 400701";
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(mapsUrl, '_blank');
        });
    }
    
    // Check if app is running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('Running as PWA');
    }
    
    // Handle offline status
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    function updateOnlineStatus() {
        if (!navigator.onLine) {
            alert('You are currently offline. Some features may not be available.');
        }
    }
});