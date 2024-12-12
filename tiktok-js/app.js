
class TikTokApp {
    constructor() {
        this.api = new TikTokAPI();
        this.content = document.getElementById('app-content');
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.dataset.page;
                this.loadPage(page);
            });
        });

        // Initial load
        this.loadPage('home');
    }

    loadPage(page) {
        // Aktifkan navigasi aktif
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        switch(page) {
            case 'home':
                this.renderHomePage();
                break;
            case 'download':
                this.renderDownloadPage();
                break;
            case 'profile':
                this.renderProfilePage();
                break;
        }
    }

    renderHomePage() {
        this.content.innerHTML = `
            <div class="home-page">
                <h1>Selamat Datang di TikTok Downloader</h1>
                <div class="features">
                    <div class="feature">
                        <i class="icon">🎥</i>
                        <h3>Download Video</h3>
                        <p>Download video TikTok tanpa watermark</p>
                    </div>
                    <div class="feature">
                        <i class="icon">👤</i>
                        <h3>Cari Profil</h3>
                        <p>Temukan informasi detail akun TikTok</p>
                    </div>
                </div>
            </div>
        `;
    }

    renderDownloadPage() {
        this.content.innerHTML = `
            <div class="download-page">
                <h2>Download Video TikTok</h2>
                <form id="download-form">
                    <input 
                        type="url" 
                        id="video-url" 
                        placeholder="Masukkan URL Video TikTok" 
                        required
                    >
                    <button type="submit">Download</button>
                </form>
                <div id="download-result" class="result-container"></div>
            </div>
        `;

        document.getElementById('download-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const urlInput = document.getElementById('video-url');
            const resultContainer = document.getElementById('download-result');
            
            resultContainer.innerHTML = '<p>Sedang memproses...</p>';

            try {
                const videoData = await this.api.downloadVideo(urlInput.value);
                
                resultContainer.innerHTML = `
                    <div class="video-result">
                        <img src="${videoData.author.avatar}" alt="Avatar" class="avatar">
                        <h3>${videoData.author.nickname}</h3>
                        <p>${videoData.desc}</p>
                        <video controls>
                            <source src="${videoData.video}" type="video/mp4">
                        </video>
                        <div class="download-actions">
                            <a href="${videoData.video}" download class="btn">Download Video</a>
                            <a href="${videoData.music}" download class="btn">Download Musik</a>
                        </div>
                    </div>
                `;
            } catch (error) {
                resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
            }
        });
    }

    renderProfilePage() {
        this.content.innerHTML = `
            <div class="profile-page">
                <h2>Cari Profil TikTok</h2>
                <form id="profile-form">
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Masukkan Username TikTok" 
                        required
                    >
                    <button type="submit">Cari Profil</button>
                </form>
                <div id="profile-result" class="result-container"></div>
            </div>
        `;

        document.getElementById('profile-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById('username');
            const resultContainer = document.getElementById('profile-result');
            
            resultContainer.innerHTML = '<p>Sedang mencari...</p>';

            try {
                const profileData = await this.api.getUserProfile(usernameInput.value);
                
                resultContainer.innerHTML = `
                    <div class="profile-result">
                        <img src="${profileData.user.avatarLarger}" alt="Avatar" class="avatar-large">
                        <h3>${profileData.user.nickname}</h3>
                        <p>@${profileData.user.uniqueId}</p>
                        
                        <div class="profile-stats">
                            <div class="stat">
                                <strong>${profileData.stats.followerCount}</strong>
                                <span>Pengikut</span>
                            </div>
                            <div class="stat">
                                <strong>${profileData.stats.followingCount}</strong>
                                <span>Mengikuti</span>
                            </div>
                            <div class="stat">
                                <strong>${profileData.stats.videoCount}</strong>
                                <span>Video</span>
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {
                resultContainer.innerHTML = `<p class="error">${error.message}</p>`;
            }
        });
    }
}

// Inisialisasi Aplikasi
document.addEventListener('DOMContentLoaded', () => {
    new TikTokApp();
});
