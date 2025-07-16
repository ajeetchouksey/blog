/*!
 * Dark Mode Toggle for Jekyll Blog
 * Handles theme switching with localStorage persistence
 */

(function() {
    'use strict';
    
    // Get the toggle button and HTML element
    const toggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    const toggleIndicator = toggle ? toggle.querySelector('.toggle-indicator') : null;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Function to update theme
    function updateTheme(theme) {
        if (theme === 'dark') {
            html.setAttribute('data-color-mode', 'dark');
            if (toggleIndicator) {
                toggleIndicator.textContent = '☀️';
                toggle.classList.add('dark');
            }
        } else {
            html.setAttribute('data-color-mode', 'light');
            if (toggleIndicator) {
                toggleIndicator.textContent = '🌙';
                toggle.classList.remove('dark');
            }
        }
        localStorage.setItem('theme', theme);
    }
    
    // Set initial theme
    updateTheme(currentTheme);
    
    // Add click event listener to toggle button
    if (toggle) {
        toggle.addEventListener('click', function() {
            const currentTheme = localStorage.getItem('theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            updateTheme(newTheme);
        });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Only use system preference if no theme is saved
        if (!localStorage.getItem('theme')) {
            updateTheme(mediaQuery.matches ? 'dark' : 'light');
        }
        
        // Listen for changes to system preference
        mediaQuery.addEventListener('change', function(e) {
            // Only update if no manual preference is set
            if (!localStorage.getItem('theme')) {
                updateTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
})();