/* =========================================================
   FİYAT AYARLARI ve FORMÜL — sitedeki tüm altın fiyatları buradan hesaplanır.
   Gerçek formül gelince sadece bu dosyayı değiştirmeniz yeterli.
   ========================================================= */

const FIYAT_AYARLARI = {
  // Güncel has (24 ayar) altın gram fiyatı, TL. ÖRNEK DEĞERDİR.
  altinGramFiyati: 4000,

  // Ayar oranları (milyem / 1000)
  ayarOranlari: { 14: 0.585, 22: 0.916 },
};

// YER TUTUCU FORMÜL: gram × altın fiyatı × ayar oranı + işçilik
function altinFiyatHesapla(gram, ayar, iscilik) {
  const fiyat = gram * FIYAT_AYARLARI.altinGramFiyati * FIYAT_AYARLARI.ayarOranlari[ayar] + iscilik;
  return Math.round(fiyat / 10) * 10; // 10 TL'ye yuvarla
}

// Katalog ürününün fiyatı (urunler.js'teki bir ürün + seçilen ayar)
function urunFiyati(urun, ayar) {
  if (urun.sabitFiyat) return urun.sabitFiyat; // doğal taş vb. sabit fiyatlı ürünler
  const secenek = urun.secenekler[ayar];
  return altinFiyatHesapla(secenek.gram, ayar, secenek.iscilik);
}

/* ---------- Kendi Tasarımını Yap: gram ve işçilik değerleri (ÖRNEK) ---------- */
const TASARIM_DEGERLERI = {
  isim: {
    tabanGram: 0.6,                 // yazı plakasının sabit kısmı
    harfBasinaGram: 0.15,           // her harf için eklenen gram
    iscilik: 1500,
    zincirGram: { 40: 0.9, 45: 1.0, 50: 1.15 },
  },
  harf: {
    gram: 1.2,
    iscilik: 1000,
    zincirGram: 1.0,                // 45 cm zincir dahil
  },
  lazer: {
    gram: { daire: 2.0, kalp: 2.2, plaka: 2.6 },
    iscilik: 1800,
    zincirGram: 1.0,                // 45 cm zincir dahil
  },
};

// Tasarım ürününün gramı ve fiyatı
function tasarimHesapla(tur, secim) {
  const d = TASARIM_DEGERLERI[tur];
  let gram, iscilik;
  if (tur === 'isim') {
    const harfSayisi = secim.isim.replace(/\s/g, '').length || 1;
    gram = d.tabanGram + harfSayisi * d.harfBasinaGram + d.zincirGram[secim.zincir];
    iscilik = d.iscilik;
  } else if (tur === 'harf') {
    gram = d.gram + d.zincirGram;
    iscilik = d.iscilik;
  } else {
    gram = d.gram[secim.sekil] + d.zincirGram;
    iscilik = d.iscilik;
  }
  return { gram: Math.round(gram * 100) / 100, fiyat: altinFiyatHesapla(gram, secim.ayar, iscilik) };
}

function paraYaz(tl) {
  return tl.toLocaleString('tr-TR') + ' TL';
}

function gramYaz(gram) {
  return gram.toLocaleString('tr-TR') + ' g';
}

/* =========================================================
   SATIŞ AYARLARI — ÖRNEK DEĞERLER.
   Gerçek fiyatlar girilirken bunlar da birlikte güncellenecek.
   ========================================================= */
const SATIS_AYARLARI = {
  ucretsizKargoSiniri: 2000,               // bu tutar ve üzeri siparişlerde kargo ücretsiz (TL)
  kargoUcreti: 150,                        // sınırın altındaki siparişlerde kargo ücreti (TL)
  uygunHediyeSinirlari: [1000, 5000, 7500], // "Uygun Hediyeler" ve fiyat filtresi: "… TL altı"
  tasarimKaporaOrani: 0.3,                  // Kendi Tasarımını Yap: siparişte alınan kapora (tahmini fiyatın %30'u)
};

// Sipariş usulü üretilen tasarım ürünlerinde şimdi ödenecek kapora (10 TL'ye yuvarlanır)
function kaporaHesapla(tahminiFiyat) {
  return Math.round(tahminiFiyat * SATIS_AYARLARI.tasarimKaporaOrani / 10) * 10;
}

// Ürünün en düşük fiyatı (birden fazla ayarı varsa en ucuzu)
function urunEnDusukFiyat(urun) {
  if (urun.sabitFiyat) return urun.sabitFiyat;
  return Math.min(...Object.keys(urun.secenekler).map(a => urunFiyati(urun, a)));
}

function ucretsizKargoMu(tutar) {
  return tutar >= SATIS_AYARLARI.ucretsizKargoSiniri;
}

function kargoUcreti(araToplam) {
  return ucretsizKargoMu(araToplam) ? 0 : SATIS_AYARLARI.kargoUcreti;
}

// Sepet toplamları (sepet ve ödeme sayfası). Sipariş usulü (Kendi Tasarımını Yap) ürünlerde
// fiyat tahminidir; şimdi sadece kapora ödenir, kalan tutar kesin fiyat belli olunca alınır.
function sepetToplamlari(sepet) {
  const araToplam = sepet.reduce((t, k) => t + k.fiyat * k.adet, 0);
  const kalanTutar = sepet.reduce((t, k) => t + (k.siparisUsulu ? (k.fiyat - k.kapora) * k.adet : 0), 0);
  const kargo = kargoUcreti(araToplam);
  return { araToplam, kalanTutar, kargo, tasarimVar: sepet.some(k => k.siparisUsulu), simdiOdenecek: araToplam + kargo - kalanTutar };
}
