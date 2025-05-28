// DOM Elements
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-list a');
const installBtn = document.getElementById('installBtn');
const upcomingEvents = document.getElementById('upcomingEvents');
const pastEvents = document.getElementById('pastEvents');
const eventForm = document.getElementById('eventForm');
const currentYear = document.getElementById('currentYear');

// Sample data - in a real app, this would come from an API
let events = [
    {
        id: 1,
        title: "Quarterly Strategy Meeting",
        date: "2023-12-15T09:00",
        description: "Review of Q3 results and planning for Q4 initiatives.",
        location: "Conference Room A",
        image: "https://source.unsplash.com/random/600x400/?meeting"
    },
    {
        id: 2,
        title: "Tech Knowledge Share: React 18",
        date: "2023-12-18T14:00",
        description: "Deep dive into the new features of React 18 with practical examples.",
        location: "Zoom Meeting",
        image: "https://source.unsplash.com/random/600x400/?coding"
    },
    {
        id: 3,
        title: "Team Building Workshop",
        date: "2023-12-20T10:00",
        description: "Activities and exercises to improve team collaboration and communication.",
        location: "Outdoor Pavilion",
        image: "https://source.unsplash.com/random/600x400/?team"
    }
];

// Initialize the app
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();
    
    // Load events
    loadEvents();
    
    // Setup navigation
    setupNavigation();
    
    // Setup form submission
    setupForm();
    
    // Register service worker
    registerServiceWorker();
    
    // Setup install prompt
    setupInstallPrompt();
}

// Load events into the UI
function loadEvents() {
    const now = new Date();
    
    // Clear existing events
    upcomingEvents.innerHTML = '';
    pastEvents.innerHTML = '';
    
    // Sort events by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Categorize events
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const eventElement = createEventElement(event);
        
        if (eventDate > now) {
            upcomingEvents.appendChild(eventElement);
        } else {
            pastEvents.appendChild(eventElement);
        }
    });
    
    // If no events, show message
    if (upcomingEvents.children.length === 0) {
        upcomingEvents.innerHTML = '<div class="no-events">No upcoming events scheduled. Check back later!</div>';
    }
    
    if (pastEvents.children.length === 0) {
        pastEvents.innerHTML = '<div class="no-events">No past events to display.</div>';
    }
}

// Create an event card element
function createEventElement(event) {
    const eventDate = new Date(event.date);
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    const eventElement = document.createElement('div');
    eventElement.className = 'event-card';
    eventElement.innerHTML = `
        <div class="event-image" style="background-image: url('${event.image}')"></div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <div class="event-date">
                <i>📅</i>
                <span>${eventDate.toLocaleDateString('en-US', options)}</span>
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-location">
                <i>📍</i>
                <span>${event.location}</span>
            </div>
            <div class="event-actions">
                <button class="btn btn-primary">Register</button>
                <button class="btn btn-secondary">Details</button>
            </div>
        </div>
    `;
    
    return eventElement;
}

// Setup navigation between sections
function setupNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the section to show
            const sectionId = link.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            // Show the selected section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Setup form submission
function setupForm() {
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const title = document.getElementById('eventTitle').value;
            const date = document.getElementById('eventDate').value;
            const description = document.getElementById('eventDescription').value;
            const location = document.getElementById('eventLocation').value;
            
            // Create new event
            const newEvent = {
                id: events.length + 1,
                title,
                date,
                description,
                location,
                image: "https://source.unsplash.com/random/600x400/?event"
            };
            
            // Add to events array
            events.push(newEvent);
            
            // Reload events
            loadEvents();
            
            // Reset form
            eventForm.reset();
            
            // Show upcoming events
            document.querySelector('[data-section="upcoming"]').click();
            
            // Show success message (in a real app, this would be more robust)
            alert('Event created successfully!');
        });
    }
}

// Register service worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}

// Handle install prompt
let deferredPrompt;

function setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        deferredPrompt = e;
        // Show the install button
        installBtn.style.display = 'block';
    });
    
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
            // Hide the install button
            installBtn.style.display = 'none';
        }
    });
    
    window.addEventListener('appinstalled', () => {
        // Hide the install button
        installBtn.style.display = 'none';
        // Clear the deferredPrompt so it can be garbage collected
        deferredPrompt = null;
        console.log('PWA was installed');
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);