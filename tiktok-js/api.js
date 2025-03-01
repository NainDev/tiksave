class TikTokAPI {
    constructor() {
        this.BASE_URL = 'https://api.botcahx.eu.org';
    }

    async downloadVideo(url) {
        try {
            const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${text}&apikey=mS4bOjqu`);
            const data = await response.json();
            
            if (data.status === 200) {
                return data.result;
            } else {
                throw new Error(data.message || 'Gagal mengunduh video');
            }
        } catch (error) {
            console.error('Error download video:', error);
            throw error;
        }
    }

    async getUserProfile(username) {
        try {
            const response = await fetch(`${this.BASE_URL}/user?username=${encodeURIComponent(username)}`);
            const data = await response.json();
            
            if (data.status === 200) {
                return data.data;
            } else {
                throw new Error(data.message || 'Gagal mengambil profil');
            }
        } catch (error) {
            console.error('Error ambil profil:', error);
            throw error;
        }
    }
}
