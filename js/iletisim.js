/* =========================================================
   İLETİŞİM BİLGİLERİ — telefon, WhatsApp, saatler ve konum.
   Sitede bu bilgilerin geçtiği her yer buradan beslenir.
   ========================================================= */

const ILETISIM = {
  telefonYazi: '0532 365 00 40',
  telefonLink: 'tel:+905323650040',
  whatsappLink: 'https://wa.me/905323650040',
  eposta: 'info@lidyakuyum.com',
  adres: 'Yukarı Hisar, Antalya Cd. No:50, 07600 Manavgat/Antalya',
  instagramKullanici: 'lidyakuyum',   // @ işareti olmadan; profil linki bundan üretilir
  instagramTakipci: '35 bin',      // yaklaşık takipçi sayısı; arttıkça buradan güncellenir
  get instagram() { return `https://www.instagram.com/${this.instagramKullanici}/`; },

  saatler: [
    ['Pazartesi – Cumartesi', '08.30 – 21.00'],
    ['Pazar', 'Kapalı'],
  ],

  konum: {
    yolTarifi: 'https://maps.app.goo.gl/f1KgRL3tKb4TAHyH9',
    enlem: 36.7870367,
    boylam: 31.4430691,
  },
};

// Gömülü harita adresi (koordinatlardan)
function haritaAdresi() {
  const { enlem, boylam } = ILETISIM.konum;
  return `https://maps.google.com/maps?q=${enlem},${boylam}&z=17&hl=tr&output=embed`;
}
