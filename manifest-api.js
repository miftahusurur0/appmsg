/**
 * Dynamic Manifest Handler
 * Mengambil manifest dari localStorage (yang sudah di-update saat profile disimpan)
 * Berguna untuk PWA yang bisa customize icon dan metadata
 */

function getManifestFromStorage() {
    try {
        const stored = localStorage.getItem('amp_manifest');
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error reading manifest from storage:', error);
    }
    
    // Default manifest jika tidak ada stored
    return {
        name: "Sistem Penjualan Gas - AMP",
        short_name: "AMP POS",
        description: "Aplikasi Sistem Penjualan Gas terintegrasi dengan Database Real-time",
        start_url: "./",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        theme_color: "#1f2937",
        background_color: "#ffffff",
        categories: ["business", "productivity"],
        icons: [
            {
                src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192'><rect fill='%231f2937' width='192' height='192'/><text x='50%' y='50%' font-size='80' font-weight='bold' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'>AMP</text></svg>",
                sizes: "192x192",
                type: "image/svg+xml",
                purpose: "any"
            },
            {
                src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect fill='%231f2937' width='512' height='512'/><text x='50%' y='50%' font-size='240' font-weight='bold' fill='%23ffffff' text-anchor='middle' dominant-baseline='central'>AMP</text></svg>",
                sizes: "512x512",
                type: "image/svg+xml",
                purpose: "any maskable"
            }
        ]
    };
}

/**
 * Intercept manifest.json requests dan serve dynamic version
 * Dijalankan saat Service Worker activate
 */
async function initDynamicManifest() {
    try {
        // Saat SW Register selesai, update manifest link dengan data terbaru
        const manifest = getManifestFromStorage();
        
        // Create blob dari manifest object
        const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
        const manifestUrl = URL.createObjectURL(manifestBlob);
        
        // Update manifest link di DOM (jika perlu refresh)
        const manifestLink = document.querySelector('link[rel="manifest"]');
        if (manifestLink) {
            // Note: sebagian browser tidak support dynamic manifest link update
            // Tapi kita coba untuk compatibility
            manifestLink.href = manifestUrl;
        }
        
        console.log('✅ Dynamic manifest initialized:', manifest.name);
        return manifest;
    } catch (error) {
        console.error('Error initializing dynamic manifest:', error);
        return null;
    }
}

// Export untuk digunakan di script utama
if (typeof window !== 'undefined') {
    window.manifestAPI = {
        getManifestFromStorage,
        initDynamicManifest
    };
}
