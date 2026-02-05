# 📱 PWA - Panduan Penginstalan sebagai Aplikasi

Aplikasi ini sudah dikonfigurasi sebagai **Progressive Web App (PWA)** dan dapat diinstal di layar utama perangkat mobile.

## ✅ Checklist Persyaratan Chrome PWA

- ✅ **HTTPS** - Vercel otomatis menyediakan HTTPS  
- ✅ **Web App Manifest** - File `manifest.json` sudah dibuat  
- ✅ **Service Worker** - File `service-worker.js` sudah dibuat & terintegrasi  
- ✅ **Display Mode standalone** - `"display": "standalone"` di manifest.json  
- ✅ **Ikon 192x512px** - SVG icons dengan resolusi benar  
- ✅ **Vercel Configuration** - File `vercel.json` mengatur headers & routing  

---

## 📂 File-file yang dibuat/diubah

| File | Fungsi |
|------|--------|
| **manifest.json** | Konfigurasi PWA (nama, ikon, theme color) |
| **service-worker.js** | Cache & offline support |
| **vercel.json** | Konfigurasi Vercel deployment |
| **index.html** | Diupdate dengan PWA meta tags & SW registration |

---

## 🚀 Cara Deployment di Vercel

### 1️⃣ Push ke Git
```bash
git add .
git commit -m "Add PWA support - manifest, service worker, vercel config"
git push
```

### 2️⃣ Vercel akan otomatis deploy
Setiap push ke main branch akan auto-deploy.

---

## 📲 Cara Menginstal di Mobile (Android)

### Chrome Mobile:
1. Buka aplikasi di Chrome
2. Tap menu ⋮ (tiga titik) → "Install app" / "Add to Home Screen"
3. Aplikasi akan ditambahkan ke home screen

**Note:** Tombol "Install app" hanya muncul jika PWA sudah sesuai standar Chrome (checklist di atas terpenuhi).

### Cara Verifikasi di Chrome:
1. Buka DevTools (F12)
2. Tab **Application**
3. Section **Manifest** → Pastikan data muncul dengan benar
4. Section **Service Workers** → Pastikan status "activated"

---

## 🍎 Cara Menginstal di iOS (Safari)

1. Buka aplikasi di Safari
2. Tap tombol **Share** (kotak dengan anak panah)
3. Pilih **Add to Home Screen**
4. Berikan nama aplikasi (atau gunakan default)
5. Tap **Add**

---

## 📊 Fitur PWA yang Sudah Aktif

✔️ **Offline Support**  
- Service Worker meng-cache aset penting  
- Network-first strategy untuk data real-time (Firebase)  
- Fallback ke cache jika offline  

✔️ **App Shell Model**  
- Manifest mempercepat loading Android app  
- Display standalone = fullscreen experience  

✔️ **Update Check**  
- Service Worker check update setiap menit  
- Auto-revalidate di background  

✔️ **Icons & Branding**  
- Theme color: Dark Gray (#1f2937)  
- Short name: "AMP POS"  
- Icons: Responsive SVG (192x512px)  

---

## 🔄 Update Aplikasi

Ketika Anda push update:
1. Service Worker akan detect versi baru dalam 1 menit
2. App akan menampilkan notifikasi update (jika diimplementasikan)
3. User dapat refresh atau restart app untuk update

---

## 🛠 Troubleshooting

### Tombol "Install" Tidak Muncul?
- ✓ Pastikan HTTPS aktif (otomatis di Vercel)
- ✓ Cek manifest.json valid di DevTools
- ✓ Pastikan service-worker.js terintegrasi (cek tab "Service Workers")
- ✓ Buka Dev Console → cek error messages

### Service Worker Tidak Teractifasi?
- ✓ Refresh halaman (Ctrl+Shift+R / Cmd+Shift+R)
- ✓ Cek di DevTools → Application → Service Workers
- ✓ Pastikan service-worker.js accessible

### Cache Lama Masih Muncul?
- ✓ Clear cache di DevTools → Application → Clear site data
- ✓ Atau refresh dengan Shift+Refresh

---

## 📝 File Manifest Details

**manifest.json** berisi:
- `name`: Nama lengkap aplikasi
- `short_name`: Nama singkat (untuk home screen)
- `start_url`: URL saat app dibuka
- `scope`: Jangkauan app
- `display`: "standalone" = fullscreen app
- `theme_color`: Warna UI
- `icons`: Asset 192x512 (SVG)
- `categories`: Business, productivity

---

## 🔐 Security Headers (vercel.json)

File `vercel.json` mengatur:
- **manifest.json**: Cache 1 jam
- **service-worker.js**: No cache (always fresh)
- **HTML files**: Cache 1 jam
- **CORS headers**: Untuk Firebase requests

---

## ✨ Kesimpulan

Aplikasi Anda sekarang memenuhi **semua persyaratan Chrome untuk installable PWA**:
- Accessible via HTTPS ✅
- Manifest valid ✅
- Service Worker aktif ✅
- Icon assets lengkap ✅
- Standalone mode ✅

**Setelah deploy di Vercel, users bisa install aplikasi langsung dari browser!** 🎉

---

*Last Updated: Feb 5, 2026*
