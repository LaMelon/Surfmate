/**
 * Interactions Module
 * User interactions seperti volunteer registration dan environmental pledge
 */

class Interactions {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize interactions
     */
    init() {
        this.setupVolunteerRegistration();
        this.setupEnvironmentalPledge();
        this.setupShareMessage();
    }
    
    /**
     * Setup volunteer registration
     */
    setupVolunteerRegistration() {
        const volunteerBtn = document.querySelector('.beach-cleanup .btn-primary');
        
        if (volunteerBtn) {
            volunteerBtn.addEventListener('click', () => {
                const name = prompt('Nama Anda:');
                if (name) {
                    alert(`Terima kasih ${name}! Anda telah terdaftar sebagai relawan bersih pantai. Kami akan menghubungi Anda untuk detail lebih lanjut.`);
                }
            });
        }
    }
    
    /**
     * Setup environmental pledge
     */
    setupEnvironmentalPledge() {
        const pledgeBtn = document.querySelector('.message-actions .btn-primary');
        
        if (pledgeBtn) {
            pledgeBtn.addEventListener('click', () => {
                alert('Terima kasih atas komitmen Anda! Mari kita jaga keindahan Pantai Wediombo bersama.');
            });
        }
    }
    
    /**
     * Setup share message
     */
    setupShareMessage() {
        const shareBtn = document.querySelector('.message-actions .btn-secondary');
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Pantai Wediombo - Surfing Paradise',
                        text: 'Jaga keindahan Pantai Wediombo! Take nothing but pictures, leave nothing but footprints, kill nothing but time.',
                        url: window.location.href
                    });
                } else {
                    alert('Bagikan pesan ini untuk menjaga keindahan Pantai Wediombo!');
                }
            });
        }
    }
}

export default Interactions;
