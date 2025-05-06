/**
 * HTTP5121 CSS Animation Project
 * Weather-Themed Interactive Portfolio
 * 
 * Main JavaScript for theme switching functionality
 * All animations are handled via CSS - this only handles:
 * - Theme switching logic
 * - Creating/destroying theme elements
 * - Mobile menu toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuButton = document.querySelector('.mobile-menu-icon');
    const menu = document.querySelector('.desktop-menu');

    menuButton.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', isOpen);
        menuButton.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    });

    // Theme Switcher Implementation
    const themeBtns = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'default';
    const resumeButton = document.querySelector('.resume-button');

    /**
     * Clears all weather effects from the page
     * (Removes all dynamically created elements)
     */
    function clearEffects() {
        document.querySelectorAll('.snowflake, .raindrop, .ripple, .star, .moon, .lightning').forEach(el => el.remove());
    }

    /**
     * Creates stars for the night theme
     * @param {number} count - Number of stars to create
     * @param {number} sizeVariation - Max size variation for stars
     */
    function createStars(count = 200, sizeVariation = 3) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}vw`;
            star.style.top = `${Math.random() * 100}vh`;
            const size = 0.5 + Math.random() * sizeVariation;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = 0.3 + Math.random() * 0.7;
            star.style.animationDuration = `${2 + Math.random() * 5}s`;
            star.style.animationDelay = `${Math.random() * 10}s`;
            document.body.appendChild(star);
        }
    }

    /**
     * Creates moon element for night theme
     */
    function createMoon() {
        const moon = document.createElement('div');
        moon.className = 'moon';
        document.body.appendChild(moon);
    }

    /**
     * Creates snowflakes for snow theme
     */
    function createSnow() {
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = '❄';
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.top = `${Math.random() * -100}px`;
            snowflake.style.opacity = Math.random();
            snowflake.style.animationDuration = `${8 + Math.random() * 15}s`;
            snowflake.style.fontSize = `${0.5 + Math.random()}em`;
            document.body.appendChild(snowflake);
        }
    }

    /**
     * Creates rain effects for rain theme
     * Includes raindrops and ripple effects
     */
    function createRain() {
        // Create raindrops
        for (let i = 0; i < 60; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            raindrop.style.left = `${Math.random() * 100}vw`;
            raindrop.style.top = `${Math.random() * -100}px`;
            raindrop.style.height = `${10 + Math.random() * 20}px`;
            raindrop.style.animationDuration = `${1 + Math.random() * 1.5}s`;
            document.body.appendChild(raindrop);

            // Create ripple effects for some raindrops
            if (i % 5 === 0) {
                setTimeout(() => {
                    const ripple = document.createElement('div');
                    ripple.className = 'ripple';
                    ripple.style.left = `${parseFloat(raindrop.style.left) - 10}px`;
                    ripple.style.top = '90vh';
                    ripple.style.width = '20px';
                    ripple.style.height = '20px';
                    document.body.appendChild(ripple);
                }, parseFloat(raindrop.style.animationDuration) * 1000 * 0.9);
            }
        }

        // Add lightning element (hidden by default)
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        document.body.appendChild(lightning);
    }

    // Lightning effect on resume button hover for rain theme
    if (resumeButton) {
        resumeButton.addEventListener('mouseenter', function () {
            if (document.body.classList.contains('rain-theme')) {
                const lightning = document.querySelector('.lightning');
                if (lightning) {
                    lightning.style.opacity = '0.9';
                    lightning.style.transition = 'none';
                    setTimeout(() => {
                        lightning.style.opacity = '0';
                        lightning.style.transition = 'opacity 0.3s';
                    }, 50);
                    setTimeout(() => {
                        lightning.style.opacity = '0.6';
                        lightning.style.transition = 'none';
                        setTimeout(() => {
                            lightning.style.opacity = '0';
                            lightning.style.transition = 'opacity 0.3s';
                        }, 100);
                    }, 200);
                }
            }
            // Enhanced star sparkle on resume hover (default theme)
            resumeButton.addEventListener('mouseenter', function () {
                if (document.body.classList.contains('default-theme')) {
                    document.querySelectorAll('.star').forEach(star => {
                        star.style.animationDuration = '0.8s'; // Faster twinkle
                    });
                }
            });

            resumeButton.addEventListener('mouseleave', function () {
                if (document.body.classList.contains('default-theme')) {
                    document.querySelectorAll('.star').forEach(star => {
                        star.style.animationDuration = `${2 + Math.random() * 5}s`; // Reset to normal speed
                    });
                }
            });

        });
    }

    // Theme switching logic
    themeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const theme = this.dataset.theme;

            // Update active button
            themeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Update body class
            document.body.className = '';
            document.body.classList.add(`${theme}-theme`);
            localStorage.setItem('portfolio-theme', theme);

            // Create theme-specific effects
            clearEffects();
            if (theme === 'snow') {
                createStars(150, 2); // Fewer, smaller stars for snow theme
                createSnow();
            }
            else if (theme === 'rain') {
                createRain();
            }
            else if (theme === 'default') {
                createStars(300, 4); // More, larger stars for night theme
                createMoon();
            }
        });
    });

    // Initialize with saved theme
    document.body.className = `${savedTheme}-theme`;
    document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');

    // Initialize theme effects
    if (savedTheme === 'snow') {
        createStars(150, 2);
        createSnow();
    }
    else if (savedTheme === 'rain') {
        createRain();
    }
    else if (savedTheme === 'default') {
        createStars(300, 4);
        createMoon();
    }
});