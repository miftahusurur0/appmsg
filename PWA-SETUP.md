# 📱 PWA - Panduan Penginstalan sebagai Aplikasi

Aplikasi ini sudah dikonfigurasi sebagai **Progressive Web App (PWA)** dan dapat diinstal di layar utama perangkat mobile dengan **LOGO CUSTOM**.

## ✅ Checklist Persyaratan Chrome PWA

- ✅ **HTTPS** - Vercel otomatis menyediakan HTTPS  
- ✅ **Web App Manifest** - File `manifest.json` + dynamic logo support
- ✅ **Service Worker** - File `service-worker.js` dengan manifest caching
- ✅ **Display Mode standalone** - `"display": "standalone"` di manifest.json  
- ✅ **Ikon 192x512px** - Custom logo upload + SVG fallback icons  
- ✅ **Vercel Configuration** - File `vercel.json` mengatur headers & routing  
- ✅ **Dynamic Logo API** - `manifest-api.js` untuk handle logo dari localStorage

---

## 🎨 FITUR BARU: Mengubah Logo Aplikasi

### ⚡ Quick Start - Upload Logo Custom

**Lokasi:** Menu Profil Usaha → Section "🎨 Logo Aplikasi"

**Langkah-Langkah:**
1. Buka tab "Profil Usaha" di sidebar
2. Scroll ke section "🎨 Logo Aplikasi"
3. Klik area upload atau drag & drop logo
4. Format: **PNG atau JPG** (Max 2MB)
5. Preview akan muncul otomatis
6. Klik "Simpan Perubahan" di bawah
7. **PENTING:** Untuk update di device:
   - Uninstall app dari home screen
   - Buka browser → install ulang
   - Logo baru akan ditampilkan

### 💡 Tips Logo Terbaik

**Rekomendasi Teknis:**
- Format: **PNG** (transparent background lebih baik)
- Ukuran: **512x512px** minimum (square shape)
- Warna: Jelas dan mudah dikenali di ukuran kecil
- Hindari: Teks kecil, gradien kompleks

**Preview Size:**
- 192x192px: Home screen icon (kecil di home)
- 512x512px: Splash screen, app drawer (medium)

---

## 📂 File-file yang dibuat/diubah

| File | Fungsi | Status |
|------|--------|--------|
| **manifest.json** | Konfigurasi PWA static | ✅ |
| **manifest-api.js** | 🆕 Handle dynamic logo | ✅ NEW |
| **service-worker.js** | Cache + manifest handling | ✅ Updated |
| **vercel.json** | Konfigurasi Vercel | ✅ |
| **index.html** | PWA meta tags + logo UI | ✅ Updated |
| **PWA-SETUP.md** | Dokumentasi (file ini) | ✅ |

---

## 🚀 Cara Deployment di Vercel

### 1️⃣ Push ke Git
```bash
git add .
git commit -m "Add PWA support + dynamic logo upload feature"
git push
```

### 2️⃣ Vercel Automatic Deploy
Setiap push ke main branch akan auto-deploy dalam 1-2 menit.

### 3️⃣ Verify di Vercel
App akan tersedia di: `https://apmsg.vercel.app`

---

## 📲 Cara Menginstal di Mobile

### Android - Chrome Browser

**Step 1: Buka Aplikasi**
```
Chrome → https://apmsg.vercel.app
```

**Step 2: Tunggu Install Button Muncul**
- Tombol "Install app" akan muncul otomatis saat criteria PWA terpenuhi
- Biasanya dalam 5-10 detik

**Step 3: Tap Install**
- Menu ⋮ (tiga titik) → "Install app" 
- Atau tunggu banner "Install app" muncul

**Step 4: Konfirmasi**
- Aplikasi akan ditambahkan ke home screen
- Logo custom Anda akan ditampilkan
- Tap untuk membuka full-screen app

### iOS - Safari Browser

**Step 1: Buka di Safari**
```
Safari → https://apmsg.vercel.app
```

**Step 2: Tap Share Button**
- Kotak dengan anak panah di bawah browser

**Step 3: Add to Home Screen**
- Scroll ke bawah → pilih "Add to Home Screen"
- Pastikan nama sudah sesuai

**Step 4: Confirm**
- Tap "Add"
- Aplikasi akan di-install

**Note:** iOS punya keterbatasan PWA support dan menggunakan `apple-touch-icon` untuk logo.

---

## 🔍 Cara Verifikasi PWA di Chrome DevTools

### Check Manifest
1. DevTools (F12) → **Application** tab
2. Section **Manifest** di kiri
3. Pastikan:
   - ✅ Name terisi
   - ✅ Icons tersedia (dengan logo Anda)
   - ✅ Display: "standalone"
   - ✅ Theme color: #1f2937

### Check Service Worker
1. DevTools → **Application** tab
2. Section **Service Workers**
3. Status harus **activated and running**

### Test Installability
1. Chrome DevTools → **Lighthouse** tab
2. Click "Analyze page load"
3. Cari "PWA" section
4. Semua items harus ✅

---

## 🔄 Update Logo & Aplikasi

### Mengubah Logo

**Di Profile:**
1. Upload logo baru
2. Klik "Simpan Perubahan"
3. Notifikasi akan muncul

**Di Device (Android):**
1. **Uninstall** app dari home screen (PENTING!)
2. Buka Chrome → https://apmsg.vercel.app
3. Tap "Install app"
4. Logo baru akan digunakan

**Di Device (iOS):**
1. Remove dari home screen
2. Buka Safari → apmsg.vercel.app
3. Tap Share → Add to Home Screen
4. Logo diupdate sesuai terakhir

### Automatic Update Flow
1. Service Worker check for updates setiap 1 menit
2. Jika ada update, cache akan di-clear
3. Refresh browser untuk mendapat versi terbaru
4. Manifest akan ter-update otomatis

---

## 🛠 Troubleshooting

### ❌ Tombol "Install" Tidak Muncul

**Kemungkinan Penyebab & Solusi:**

1. **Service Worker belum fully activated**
   - ✓ Refresh halaman (Ctrl+Shift+R / Cmd+Shift+R)
   - ✓ Tunggu 5-10 detik
   - ✓ Buka DevTools → Application → Service Workers (cek status)

2. **Manifest.json tidak valid**
   - ✓ DevTools → Application → Manifest (cek ada error?)
   - ✓ Pastikan manifest-api.js ter-load (cek Network tab)
   - ✓ Console log should show "✅ Service Worker registered"

3. **HTTPS tidak aktif**
   - ✓ Pastikan URL di official Vercel domain
   - ✓ Local development harus di localhost

4. **Browser compatibility**
   - ✓ Gunakan Chrome/Edge versi terbaru
   - ✓ Safari/iOS punya limited PWA support

**Debug Steps:**
```javascript
// Buka Console (F12 → Console) dan paste:
console.log('SW:', navigator.serviceWorker.controller ? '✅ Active' : '❌ Not active');
console.log('Manifest:', fetch('/manifest.json').then(r => r.json()));
```

---

### ❌ Logo Tidak Berubah Setelah Upload

**Solusi Step-by-Step:**

1. Di Profile:
   - ✓ Klik "Simpan Perubahan" (PENTING!)
   - ✓ Lihat notifikasi "✅ Profil disimpan"

2. Di Browser:
   - ✓ Refresh (Ctrl+R)
   - ✓ Clear cache (DevTools → Application → Clear site data)
   - ✓ Hard refresh (Ctrl+Shift+R)

3. Di Device:
   - ✓ **UNINSTALL app dari home screen** (ini kunci!)
   - ✓ Buka browser kembali
   - ✓ Buka https://apmsg.vercel.app
   - ✓ Tap "Install app" → akan pakai logo terbaru

---

### ❌ Service Worker Tidak Teractifasi

**Langkah Perbaikan:**

1. Cek di DevTools:
   - Application → Service Workers
   - Status harus "activated"

2. Jika belum:
   - ✓ Hard refresh (Ctrl+Shift+R)
   - ✓ Buka developer console (F12)
   - ✓ Cari error messages

3. Manual register ulang:
   - ✓ Clear site data (DevTools → Clear)
   - ✓ Refresh halaman
   - ✓ Tunggu service worker register lagi

---

### ❌ Cache Lama Masih Muncul

**Solution:**

1. Clear Cache:
   ```
   DevTools → Application → "Clear site data"
   Pilih: Cache storage, Local storage, Cookies
   ```

2. Hard Refresh:
   - Windows: **Ctrl+Shift+R**
   - Mac: **Cmd+Shift+R**

3. Service Worker Cache Clear:
   - DevTools → Service Workers → Click "Unregister"
   - Refresh page (akan register ulang)

---

## 📡 Cara Kerja Dynamic Logo System

### Architecture Diagram

```
User Upload Logo
      ↓
index.html (handleLogoUpload)
      ↓
Convert to Base64
      ↓
Save to localStorage (data.profile.logoBase64)
      ↓
generateManifest() function
      ↓
Update localStorage['amp_manifest']
      ↓
manifest-api.js reads from localStorage
      ↓
Service Worker cache updated manifest
      ↓
PWA install dengan logo terbaru
```

### Data Flow

**Storage Locations:**
```
localStorage['amp_data'] 
  → data.profile.logoBase64 (base64 image)
  
localStorage['amp_manifest']
  → manifest JSON dengan logo dalam icons array
  
Service Worker Cache
  → manifest.json (cached for offline)
  → service-worker.js (always fresh)
```

**Update Sequence:**
1. User upload & save → localStorage updated
2. manifest-api.js detect change
3. Service Worker check manifest (network-first)
4. Cache updated
5. Next install akan gunakan logo terbaru

---

## 📊 Fitur PWA Lengkap

| Fitur | Status | Keterangan |
|-------|--------|-----------|
| **HTTPS** | ✅ | Vercel automatic |
| **Manifest** | ✅ | Static + dynamic logo |
| **Service Worker** | ✅ | Network-first strategy |
| **Offline Support** | ✅ | Aset ter-cache |
| **Installable** | ✅ | Android Chrome, Edge |
| **Dynamic Logo** | ✅ | Upload di profile |
| **Splash Screen** | ✅ | Icon 192x512px |
| **Standalone Mode** | ✅ | Fullscreen app |
| **iOS Support** | ⚠️ | Limited PWA, apple-touch-icon |
| **Auto Update** | ✅ | Check every 1 minute |

---

## 🔐 Security & Performance

### Headers (dari vercel.json)
```json
manifest.json → Cache-Control: public, max-age=3600
service-worker.js → Cache-Control: max-age=0, must-revalidate
HTML → Cache-Control: public, max-age=3600
```

### Service Worker Strategy
- **manifest.json**: Network-first (always get latest)
- **Lainnya**: Network-first with cache fallback
- **Offline**: Fallback ke cache

### Data Encryption
- localStorage dienkryption oleh browser
- Base64 logo tidak sensitive (tidak ada password)
- Firebase connection via HTTPS

---

## 🎯 Best Practices

### Untuk User
- ✅ Upload logo square (1:1 ratio)
- ✅ Gunakan PNG dengan transparent background
- ✅ Minimal 512x512px untuk kualitas terbaik
- ✅ Uninstall app sebelum update logo

### Untuk Developer  
- ✅ Monitor localStorage size (max 5-10MB di browser)
- ✅ Service Worker cache size keep minimum 10MB
- ✅ Test di multiple browsers (Chrome, Edge, Firefox)
- ✅ Use DevTools to verify PWA installability

---

## 📞 Support & Documentation

### Useful Links
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Chrome DevTools PWA Guide](https://developer.chrome.com/docs/devtools/progressive-web-apps/)

### File References
- Manifest: `/manifest.json`
- Service Worker: `/service-worker.js`
- Logo API: `/manifest-api.js`
- Main App: `/index.html`
- Deploy Config: `/vercel.json`

---

## ✨ Summary

✅ **PWA Fully Configured:**
- Installable on Android & desktop browsers
- Dynamic custom logo support
- Offline-ready with Service Worker
- HTTPS enforced via Vercel
- Auto-update capability

✅ **User Can:**
- Upload logo dari profile
- Install sebagai native app
- Akses dengan custom icon
- Work offline with cached data
- Auto-update saat ada versi baru

✅ **Developer Can:**
- Deploy directly to Vercel
- Monitor via DevTools
- Clear cache anytime
- Test on multiple devices
- Update logo real-time

🎉 **Ready to go live!**

---

*Last Updated: Feb 5, 2026*  
*Features: PWA ✅ | Manifest ✅ | Service Worker ✅ | Dynamic Logo ✅ | HTTPS ✅ | Icons ✅*
