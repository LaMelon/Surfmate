/**
 * Main Entry Point
 * Mengorganisir dan menginisialisasi semua modules
 */

import Navigation from './modules/navigation.js';
import WaveMonitor from './modules/waveMonitor.js';
import Gallery from './modules/gallery.js';
import Booking from './modules/booking.js';
import Animations from './modules/animations.js';
import Interactions from './modules/interactions.js';

/**
 * Component Loader
 * Memuat semua komponen HTML secara dinamis
 */
class ComponentLoader {
    constructor() {
        this.components = [
            { id: 'navigation', path: 'components/navigation.html' },
            { id: 'hero', path: 'components/hero.html' },
            { id: 'wave-monitoring', path: 'components/wave-monitoring.html' },
            { id: 'surfing-activities', path: 'components/surfing-activities.html' },
            { id: 'facilities', path: 'components/facilities.html' },
            { id: 'gallery', path: 'components/gallery.html' },
            { id: 'safety', path: 'components/safety.html' },
            { id: 'conservation', path: 'components/conservation.html' },
            { id: 'message', path: 'components/message.html' },
            { id: 'footer', path: 'components/footer.html' }
        ];
    }

    /**
     * Load satu komponen
     */
    async loadComponent(component) {
        try {
            const response = await fetch(component.path);
            if (!response.ok) {
                throw new Error(`Failed to load ${component.path}`);
            }
            const html = await response.text();
            
            // Create temporary container untuk parsing
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Insert di body
            document.body.appendChild(temp.firstElementChild);
            
            console.log(`✅ Loaded: ${component.id}`);
            return true;
        } catch (error) {
            console.error(`❌ Error loading ${component.id}:`, error);
            return false;
        }
    }

    /**
     * Load semua komponen secara berurutan
     */
    async loadAllComponents() {
        console.log('🔄 Loading HTML components...');
        
        for (const component of this.components) {
            await this.loadComponent(component);
        }
        
        console.log('✅ All HTML components loaded successfully!');
        
        // Trigger event setelah semua components loaded
        document.dispatchEvent(new CustomEvent('componentsLoaded'));
    }
}

class App {
    constructor() {
        this.componentLoader = null;
        this.navigation = null;
        this.waveMonitor = null;
        this.gallery = null;
        this.booking = null;
        this.animations = null;
        this.interactions = null;
    }
    
    /**
     * Initialize application
     */
    init() {
        // Wait untuk DOM ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    /**
     * Setup semua modules setelah components loaded
     */
    async setup() {
        console.log('🌊 Initializing Wediombo Surf Application...');
        
        // Load HTML components first
        this.componentLoader = new ComponentLoader();
        await this.componentLoader.loadAllComponents();
        
        // Wait untuk components fully loaded
        await new Promise(resolve => {
            document.addEventListener('componentsLoaded', resolve, { once: true });
        });
        
        // Initialize modules setelah components ready
        this.navigation = new Navigation();
        this.waveMonitor = new WaveMonitor();
        this.gallery = new Gallery();
        this.booking = new Booking();
        this.animations = new Animations();
        this.interactions = new Interactions();
        
        // Setup wave monitoring
        this.waveMonitor.initChart();
        this.waveMonitor.startMonitoring();
        
        // Setup animations
        this.animations.init();
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
        
        console.log('✅ Application initialized successfully!');
    }
    
    /**
     * Cleanup resources
     */
    cleanup() {
        if (this.waveMonitor) {
            this.waveMonitor.stopMonitoring();
        }
    }
}

// Start application
const app = new App();
app.init();
