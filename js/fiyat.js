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

// Ürünün kampanyasız (normal) fiyatı: urunler.js'teki bir ürün + seçilen ayar
function urunNormalFiyati(urun, ayar) {
  if (urun.sabitFiyat) return urun.sabitFiyat; // doğal taş vb. sabit fiyatlı ürünler
  const secenek = urun.secenekler[ayar];
  return altinFiyatHesapla(secenek.gram, ayar, secenek.iscilik);
}

// Satış fiyatı: kampanyadaysa kampanyalı fiyat, değilse normal fiyat
function urunFiyati(urun, ayar) {
  const normal = urunNormalFiyati(urun, ayar);
  return kampanyadaMi(urun) ? Math.round(normal * urun.kampanya.oran / 10) * 10 : normal;
}

// İnternete Özel Kampanyalar: markalı ürünler (Atasay, Favori, Koçak) kampanyaya girmez.
// Gerçek sitede eski fiyat, son 30 günün en düşük fiyatı olmalı (Ticari Reklam Yönetmeliği).
const KAMPANYA_DISI_MARKALAR = ['Atasay', 'Favori', 'Koçak'];
function kampanyadaMi(urun) {
  return !!urun.kampanya && !KAMPANYA_DISI_MARKALAR.includes(urun.marka);
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
  fiyatFiltreleri: [5000, 10000, 15000, 30000], // ürün listesi ve Hediye Rehberi: "… TL altı"

  // ONLINE SATIŞ SINIRI: formülle hesaplanan fiyat bu tutar ve üzerindeyse ürün online satılmaz,
  // katalogda gösterilir ("Fiyat için bize ulaşın" + "WhatsApp'tan Bilgi Al"). Altın fiyatı değişince
  // ürün kendiliğinden satılabilir ya da katalog durumuna geçer.
  onlineSatisSiniri: 30000,
  zarifSecimSiniri: 15000,                 // ana sayfadaki "15.000 TL altı zarif seçimler" şeridi
  katalogUrunleriniGizle: false,           // true: katalog ürünleri sitede hiç görünmez (varsayılan: göster)
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

/* ---------- Online satış sınırı / katalog ---------- */
// Seçilen ayarda ürün online satılabilir mi? (fiyat formülle hesaplandıktan sonra sınırla karşılaştırılır)
function ayarSatilabilirMi(urun, ayar) {
  return urunFiyati(urun, ayar) < SATIS_AYARLARI.onlineSatisSiniri;
}
// En uygun seçeneği bile sınırın üstündeyse ürün katalog ürünüdür
function katalogMu(urun) {
  return urunEnDusukFiyat(urun) >= SATIS_AYARLARI.onlineSatisSiniri;
}
// Sitede listelenecek ürünler (katalog gizleme ayarı açıksa katalog ürünleri çıkar)
function gorunurUrunler() {
  return SATIS_AYARLARI.katalogUrunleriniGizle ? URUNLER.filter(u => !katalogMu(u)) : URUNLER;
}

// Kampanyalı üründe üstü çizili gösterilecek eski fiyat (en uygun seçeneğin normal fiyatı)
function urunEnDusukNormalFiyat(urun) {
  if (urun.sabitFiyat) return urun.sabitFiyat;
  return Math.min(...Object.keys(urun.secenekler).map(a => urunNormalFiyati(urun, a)));
}
