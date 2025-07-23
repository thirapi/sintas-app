# SINTAS – Sistem Integrasi Data Santri Al-Matlab

**SINTAS (Sistem Integrasi Data Santri Al-Matlab)** adalah aplikasi dashboard web yang digunakan untuk mengelola dan menyajikan data santri secara terintegrasi di Pondok Pesantren **Matlabus Salik (Al-Matlab)**.

---
##  Installation

Berikut adalah langkah-langkah untuk menginstal dan menjalankan proyek ini di lingkungan lokal:

---

1. **Pastikan Node.js telah terinstal**  
   Proyek ini membutuhkan **Node.js versi minimal `v18.0.0` atau lebih tinggi** (disarankan menggunakan versi LTS seperti `v18.20.0` atau `v20.x`).

    ```bash
    node --version
    ```


2. **Clone repository dan masuk ke direktori proyek**

    ```bash
    # Clone repository
    git clone https://github.com/thirapi/sintas-app.git

    # Masuk ke direktori proyek
    cd sintas-app
    ```

3. **Install dependensi proyek**

    ```bash
    npm install
    ```

4. **Pastikan database MySQL telah aktif dan dapat diakses.**

5. **Buat file `.env`**  
   Buat file `.env` di direktori utama proyek dengan menyalin isi dari `env.example`, lalu sesuaikan nilainya sesuai kebutuhan Anda (seperti konfigurasi database MySQL).

6. **Jalankan migrasi database dengan Prisma**

    ```bash
    npx prisma db push
    ```

7. **Jalankan seed untuk membuat akun Super Admin**
    
    ```bash
    npx prisma db seed
    ```

8. **Menjalankan aplikasi dalam mode development**

    ```bash
    npm run dev
    ```

---
