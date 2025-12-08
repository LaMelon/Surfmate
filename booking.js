/**
 * Booking Module
 * Modal booking dan form handling
 */

import { DOM } from '../utils/dom.js';

class Booking {
    constructor() {
        this.init();
    }
    
    /**
     * Initialize booking buttons
     */
    init() {
        this.setupBookingButtons();
        this.setupContactButton();
    }
    
    /**
     * Setup booking buttons untuk facilities
     */
    setupBookingButtons() {
        const buttons = DOM.selectAll('.facility-card .btn-primary');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = button.closest('.facility-card');
                const title = card.querySelector('h3').textContent;
                
                if (title.includes('Penyewaan') || title.includes('Pelatih')) {
                    e.preventDefault();
                    this.showBookingModal(title);
                }
            });
        });
    }
    
    /**
     * Show booking modal
     */
    showBookingModal(title) {
        const modal = DOM.createElement('div', 'booking-modal');
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form id="bookingForm">
                            <div class="form-group">
                                <label for="name">Nama Lengkap</label>
                                <input type="text" id="name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Nomor Telepon</label>
                                <input type="tel" id="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="date">Tanggal</label>
                                <input type="date" id="date" required>
                            </div>
                            <div class="form-group">
                                <label for="message">Pesan Tambahan</label>
                                <textarea id="message" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn-primary">Kirim Pesanan</button>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.addModalStyles();
        
        this.setupModalListeners(modal);
    }
    
    /**
     * Setup modal listeners
     */
    setupModalListeners(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        const form = modal.querySelector('#bookingForm');
        
        closeBtn.addEventListener('click', () => {
            DOM.remove(modal);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                DOM.remove(modal);
            }
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesanan Anda telah diterima. Kami akan menghubungi Anda segera.');
            DOM.remove(modal);
        });
    }
    
    /**
     * Setup contact button
     */
    setupContactButton() {
        const contactButtons = DOM.selectAll('.facility-card .btn-primary');
        
        contactButtons.forEach(button => {
            if (button.textContent.includes('Kontak')) {
                button.addEventListener('click', () => {
                    alert('Hubungi kami di:\n📞 +62 812-3456-7890\n📧 info@wediombo-surf.com\n📍 Pantai Wediombo, Gunungkidul');
                });
            }
        });
    }
    
    /**
     * Add modal styles
     */
    addModalStyles() {
        const styles = `
            .booking-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 3000;
            }
            .modal-overlay {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                color: var(--primary-blue);
                margin: 0;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                transition: color 0.3s ease;
            }
            .modal-close:hover {
                color: var(--danger);
            }
            .modal-body {
                padding: 1.5rem;
            }
            .form-group {
                margin-bottom: 1rem;
            }
            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                color: var(--primary-blue);
                font-weight: 500;
            }
            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 0.75rem;
                border: 2px solid #eee;
                border-radius: 8px;
                font-family: inherit;
                transition: border-color 0.3s ease;
            }
            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--primary-blue);
            }
            @keyframes slideUp {
                from {
                    transform: translateY(50px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        
        DOM.addStyle(styles);
    }
}

export default Booking;
