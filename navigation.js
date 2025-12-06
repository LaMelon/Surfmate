/**
 * Navigation Module
 * Menangani mobile menu toggle dan smooth scrolling
 */

import { DOM } from '../utils/dom.js';

class Navigation {
    constructor() {
        this.hamburger = DOM.select('.hamburger');
        this.navMenu = DOM.select('.nav-menu');
        this.navLinks = DOM.selectAll('.nav-link');
        this.navbar = DOM.select('.navbar');
        
        this.init();
    }
    
    /**
     * Initialize navigation listeners
     */
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavbarScroll();
    }
    
    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        if (!this.hamburger) return;
        
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
    }
    
    /**
     * Setup smooth scrolling untuk navigation links
     */
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            // Close mobile menu saat click
            link.addEventListener('click', () => {
                this.hamburger?.classList.remove('active');
                this.navMenu?.classList.remove('active');
            });
            
            // Smooth scroll
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    /**
     * Setup navbar scroll effect
     */
    setupNavbarScroll() {
        if (!this.navbar) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

export default Navigation;
