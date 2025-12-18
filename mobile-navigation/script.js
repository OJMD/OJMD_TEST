// Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const body = document.body;
const navItems = document.querySelectorAll('.nav-item');

// Toggle Menu
menuToggle.addEventListener('click', () => {
    body.classList.toggle('menu-open');
    
    // Aria-Label aktualisieren
    const isOpen = body.classList.contains('menu-open');
    menuToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Navigation Items Click
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Visuelles Feedback
        const icon = item.querySelector('.nav-icon');
        icon.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            icon.style.transform = '';
            
            // Hier Navigation durchführen
            console.log('Navigation zu:', item.querySelector('.nav-label').textContent);
            
            // Menü schließen
            body.classList.remove('menu-open');
        }, 200);
    });
});

// ESC-Taste zum Schließen
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
        body.classList.remove('menu-open');
    }
});

// Klick außerhalb des Menüs
document.addEventListener('click', (e) => {
    if (body.classList.contains('menu-open') && 
        !e.target.closest('.mobile-nav') && 
        !e.target.closest('.menu-toggle')) {
        body.classList.remove('menu-open');
    }
});
