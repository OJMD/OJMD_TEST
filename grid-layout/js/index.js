// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.nav__menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle ARIA-Attribut
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle Sidebar
            sidebar.classList.toggle('active');
            
            // Toggle Body-Overlay
            body.classList.toggle('sidebar-open');
        });

        // Schließe Sidebar bei Klick auf Overlay
        body.addEventListener('click', (e) => {
            if (body.classList.contains('sidebar-open') && 
                !sidebar.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                closeSidebar();
            }
        });

        // Schließe Sidebar bei ESC-Taste
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && body.classList.contains('sidebar-open')) {
                closeSidebar();
            }
        });

        // Schließe Sidebar bei Klick auf Link
        const sidebarLinks = sidebar.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeSidebar();
                }
            });
        });
    }

    function closeSidebar() {
        menuToggle.setAttribute('aria-expanded', 'false');
        sidebar.classList.remove('active');
        body.classList.remove('sidebar-open');
    }

    // User Avatar Keyboard Navigation
    const userAvatar = document.querySelector('.nav__user-avatar');
    if (userAvatar) {
        userAvatar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                // Hier könnte ein Profilmenü geöffnet werden
                console.log('User Avatar aktiviert');
            }
        });
    }
});
