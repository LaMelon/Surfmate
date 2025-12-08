/**
 * Wave Monitor Module
 * Real-time wave monitoring dan chart visualization
 */

class WaveMonitor {
    constructor() {
        this.waveData = this.generateWaveData();
        this.updateInterval = null;
        this.chart = null;
    }

    /**
     * Generate dummy wave data untuk 24 jam
     */
    generateWaveData() {
        const hours = [];
        const waveHeights = [];
        const windSpeeds = [];
        
        for (let i = 0; i < 24; i++) {
            hours.push(`${i.toString().padStart(2, '0')}:00`);
            const baseHeight = 1.2 + Math.sin(i / 4) * 0.5;
            waveHeights.push(baseHeight + (Math.random() - 0.5) * 0.3);
            const baseWind = 15 + Math.cos(i / 6) * 5;
            windSpeeds.push(baseWind + (Math.random() - 0.5) * 3);
        }
        
        return { hours, waveHeights, windSpeeds };
    }

    /**
     * Update real-time data setiap interval
     */
    updateRealTimeData() {
        const waveHeight = (1.0 + Math.random() * 1.5).toFixed(1);
        document.getElementById('wave-height').textContent = `${waveHeight}m`;
        
        const windSpeed = (10 + Math.random() * 15).toFixed(0);
        document.getElementById('wind-speed').textContent = `${windSpeed} km/h`;
        
        const waterTemp = (26 + Math.random() * 4).toFixed(0);
        document.getElementById('water-temp').textContent = `${waterTemp}°C`;
        
        this.updateWaveStatus(parseFloat(waveHeight));
        
        if (this.chart) {
            this.updateChart();
        }
    }

    /**
     * Update wave status indicator
     */
    updateWaveStatus(height) {
        const statusElement = document.querySelector('.status-indicator');
        const statusText = statusElement.querySelector('span');
        const statusIcon = statusElement.querySelector('i');
        
        statusElement.classList.remove('safe', 'moderate', 'danger');
        
        if (height < 1.0) {
            statusElement.classList.add('safe');
            statusText.textContent = 'Kondisi Ombak: Aman';
            statusIcon.className = 'fas fa-check-circle';
        } else if (height < 2.0) {
            statusElement.classList.add('moderate');
            statusText.textContent = 'Kondisi Ombak: Sedang';
            statusIcon.className = 'fas fa-exclamation-circle';
        } else {
            statusElement.classList.add('danger');
            statusText.textContent = 'Kondisi Ombak: Berbahaya';
            statusIcon.className = 'fas fa-times-circle';
        }
    }

    /**
     * Initialize Chart.js
     */
    initChart() {
        const ctx = document.getElementById('waveChart');
        if (!ctx) return;
        
        this.chart = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: this.waveData.hours,
                datasets: [{
                    label: 'Ketinggian Ombak (m)',
                    data: this.waveData.waveHeights,
                    borderColor: '#0077be',
                    backgroundColor: 'rgba(0, 119, 190, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Kecepatan Angin (km/h)',
                    data: this.waveData.windSpeeds,
                    borderColor: '#00a8cc',
                    backgroundColor: 'rgba(0, 168, 204, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Grafik Kondisi Ombak 24 Jam',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    /**
     * Update chart dengan data baru
     */
    updateChart() {
        if (!this.chart) return;
        
        this.chart.data.datasets[0].data.shift();
        this.chart.data.datasets[0].data.push(parseFloat(document.getElementById('wave-height').textContent));
        
        this.chart.data.datasets[1].data.shift();
        this.chart.data.datasets[1].data.push(parseFloat(document.getElementById('wind-speed').textContent));
        
        this.chart.update('none');
    }

    /**
     * Start monitoring dengan interval
     */
    startMonitoring() {
        this.updateRealTimeData();
        this.updateInterval = setInterval(() => {
            this.updateRealTimeData();
        }, 5000);
    }

    /**
     * Stop monitoring
     */
    stopMonitoring() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}

export default WaveMonitor;
