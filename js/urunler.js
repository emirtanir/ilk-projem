/* =========================================================
   ÖRNEK ÜRÜN VERİLERİ — tüm ürünler bu dosyada.

   Alanlar:
     id          Benzersiz kısa ad (adres çubuğunda görünür)
     ad          Ürün adı
     kategori    'kolye' | 'kolyeucu' | 'kupe' | 'yuzuk' | 'bileklik'
     marka       'Atasay' | 'Favori' | 'Koçak' | 'Lidya'
     koleksiyonlar  Ana koleksiyonlardan en az biri: 'minimal' | 'hediyelik' | 'gunluk'
     secenekler  Altın ürünlerde ayar başına gram ve işçilik: { 14: { gram, iscilik }, 22: {...} }
     sabitFiyat  Altın olmayan / sabit fiyatlı ürünlerde TL (secenekler yerine)
     tas         Varsa doğal taşın adı (Doğal Taş koleksiyonunda görünür)
     ton         Yer tutucu görselin rengi: 'altin' | 'pembe' | 'krem' | 'firuze' | 'ametist'
     etiket      İsteğe bağlı küçük rozet ('Yeni', 'Çok Satan')
     aciklama    Kısa açıklama
   ========================================================= */

const URUNLER = [
  {
    id: 'minimal-nokta-kolye', ad: 'Minimal Nokta Kolye', kategori: 'kolye', marka: 'Atasay',
    koleksiyonlar: ['minimal', 'gunluk'],
    secenekler: { 14: { gram: 1.6, iscilik: 1200 }, 22: { gram: 1.9, iscilik: 1300 } },
    ton: 'altin', etiket: 'Çok Satan',
    aciklama: 'İnce zincir üzerinde tek bir parlak nokta. Her gün takılabilecek, sade ve zamansız bir parça.',
  },
  {
    id: 'sonsuzluk-kolye', ad: 'Sonsuzluk Kolye', kategori: 'kolye', marka: 'Atasay',
    koleksiyonlar: ['minimal', 'hediyelik'],
    secenekler: { 14: { gram: 2.1, iscilik: 1400 } },
    ton: 'pembe',
    aciklama: 'Sonsuzluk sembolü, ince işçilikle. Sevdiklerinize anlamlı bir hediye.',
  },
  {
    id: 'damla-tasli-kolye', ad: 'Damla Taşlı Kolye', kategori: 'kolye', marka: 'Favori',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 1.8, iscilik: 1500 } },
    ton: 'krem', etiket: 'Yeni',
    aciklama: 'Damla formunda zirkon taşlı ucuyla ışığı zarifçe yakalar.',
  },
  {
    id: 'firuze-goz-kolye', ad: 'Firuze Taşlı Altın Kolye', kategori: 'kolye', marka: 'Lidya',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 1.5, iscilik: 1600 } }, tas: 'Firuze',
    ton: 'firuze',
    aciklama: 'Altın çerçeve içinde doğal firuze taşı. Huzur ve korunmanın taşı.',
  },
  {
    id: 'ametist-tas-kolye', ad: 'Ametist Taş Kolye', kategori: 'kolye', marka: 'Lidya',
    koleksiyonlar: ['gunluk'],
    sabitFiyat: 650, tas: 'Ametist',
    ton: 'ametist',
    aciklama: 'Ham ametist ucu ve ip zincir. Altın içermez, sabit fiyatlıdır.',
  },
  {
    id: 'minik-halka-kupe', ad: 'Minik Halka Küpe', kategori: 'kupe', marka: 'Atasay',
    koleksiyonlar: ['minimal', 'gunluk'],
    secenekler: { 14: { gram: 1.2, iscilik: 900 }, 22: { gram: 1.4, iscilik: 1000 } },
    ton: 'altin', etiket: 'Çok Satan',
    aciklama: 'Kulağa tam oturan, gün boyu rahat minik halkalar.',
  },
  {
    id: 'inci-damla-kupe', ad: 'İnci Damla Küpe', kategori: 'kupe', marka: 'Koçak',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 1.6, iscilik: 1300 } },
    ton: 'krem',
    aciklama: 'Küçük altın halkadan sarkan inci damlası. Davetlere ve günlük kullanıma uygun.',
  },
  {
    id: 'yildiz-kupe', ad: 'Yıldız Küpe', kategori: 'kupe', marka: 'Favori',
    koleksiyonlar: ['minimal', 'hediyelik'],
    secenekler: { 14: { gram: 1.0, iscilik: 850 } },
    ton: 'pembe', etiket: 'Yeni',
    aciklama: 'Minik yıldız formunda vidalı küpe. Çocuklar ve yetişkinler için.',
  },
  {
    id: 'tektas-yuzuk', ad: 'Tektaş Yüzük', kategori: 'yuzuk', marka: 'Atasay',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 1.9, iscilik: 1800 }, 22: { gram: 2.3, iscilik: 1900 } },
    ton: 'altin',
    aciklama: 'Klasik tektaş formu, ince bir gövde ile modern bir yoruma kavuştu.',
  },
  {
    id: 'zincir-desen-yuzuk', ad: 'Zincir Desen Yüzük', kategori: 'yuzuk', marka: 'Koçak',
    koleksiyonlar: ['gunluk'],
    secenekler: { 22: { gram: 2.6, iscilik: 1200 } },
    ton: 'krem',
    aciklama: 'Zincir halkası deseninde, tek başına ya da kombinle takılabilen yüzük.',
  },
  {
    id: 'ametist-yuzuk', ad: 'Ametist Taşlı Yüzük', kategori: 'yuzuk', marka: 'Lidya',
    koleksiyonlar: ['minimal'],
    secenekler: { 14: { gram: 2.2, iscilik: 1700 } }, tas: 'Ametist',
    ton: 'ametist',
    aciklama: 'Oval kesim doğal ametist, ince altın tırnaklarla.',
  },
  {
    id: 'zincir-bileklik', ad: 'İnce Zincir Bileklik', kategori: 'bileklik', marka: 'Favori',
    koleksiyonlar: ['minimal', 'gunluk'],
    secenekler: { 14: { gram: 2.4, iscilik: 1100 }, 22: { gram: 2.9, iscilik: 1200 } },
    ton: 'altin',
    aciklama: 'Ayarlanabilir uzunlukta, ince ve parlak zincir bileklik.',
  },
  {
    id: 'kalp-bileklik', ad: 'Kalp Bileklik', kategori: 'bileklik', marka: 'Atasay',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 1.7, iscilik: 1300 } },
    ton: 'pembe',
    aciklama: 'Ortasında minik bir kalp. Sevgililer Günü ve Anneler Günü klasiği.',
  },
  {
    id: 'firuze-tas-bileklik', ad: 'Firuze Taş Bileklik', kategori: 'bileklik', marka: 'Lidya',
    koleksiyonlar: ['gunluk'],
    sabitFiyat: 450, tas: 'Firuze',
    ton: 'firuze', etiket: 'Yeni',
    aciklama: 'Doğal firuze boncuklarla elde dizilmiş esnek bileklik. Altın içermez.',
  },
  {
    id: 'ay-tasi-bileklik', ad: 'Ay Taşı Bileklik', kategori: 'bileklik', marka: 'Lidya',
    koleksiyonlar: ['gunluk', 'hediyelik'],
    sabitFiyat: 520, tas: 'Ay Taşı',
    ton: 'krem',
    aciklama: 'Işıkla renk değiştiren ay taşı boncukları. Altın içermez.',
  },
  /* ---------- Kolye ucu ---------- */
  {
    id: 'kalp-kolye-ucu', ad: 'Kalp Kolye Ucu', kategori: 'kolyeucu', marka: 'Atasay',
    koleksiyonlar: ['minimal', 'hediyelik'],
    secenekler: { 14: { gram: 0.8, iscilik: 700 }, 22: { gram: 1.0, iscilik: 800 } },
    ton: 'pembe', etiket: 'Yeni',
    aciklama: 'Küçük, sade bir kalp. Dilediğiniz zincire takabileceğiniz bir kolye ucu.',
  },
  {
    id: 'yildiz-kolye-ucu', ad: 'Yıldız Kolye Ucu', kategori: 'kolyeucu', marka: 'Favori',
    koleksiyonlar: ['minimal', 'gunluk'],
    secenekler: { 14: { gram: 0.7, iscilik: 650 } },
    ton: 'altin',
    aciklama: 'İnce hatlı yıldız formu. Tek başına ya da başka uçlarla birlikte takılabilir.',
  },
  {
    id: 'firuze-kolye-ucu', ad: 'Firuze Taşlı Kolye Ucu', kategori: 'kolyeucu', marka: 'Lidya',
    koleksiyonlar: ['hediyelik'],
    secenekler: { 14: { gram: 0.9, iscilik: 900 } },
    tas: 'Firuze', ton: 'firuze',
    aciklama: 'Altın çerçeve içinde doğal firuze taşı. Zincir dahil değildir.',
  },
];

// Sitenin ana koleksiyonları (ana sayfanın ilk ekranında).
// gorsel: foto/ klasörüne bu adla fotoğraf koyunca kartta otomatik görünür; yoksa ikon/ton ile yer tutucu çizilir.
const KOLEKSIYONLAR = {
  minimal: { ad: 'Minimal', aciklama: 'Sade ve zarif, her kombine uyan', gorsel: 'koleksiyon-minimal.jpg', ikon: 'kolye', ton: 'krem' },
  hediyelik: { ad: 'Hediyelik', aciklama: 'Sevdiklerinize unutulmayacak bir hediye', gorsel: 'koleksiyon-hediyelik.jpg', ikon: 'hediye', ton: 'pembe' },
  gunluk: { ad: 'Günlük Kullanım', aciklama: 'Gün boyu rahatça takabileceğiniz', gorsel: 'koleksiyon-gunluk.jpg', ikon: 'kupe', ton: 'altin' },
};

// Ürün türleri (ürün listesinde filtre olarak)
const KATEGORILER = { kolye: 'Kolye', kolyeucu: 'Kolye Ucu', kupe: 'Küpe', yuzuk: 'Yüzük', bileklik: 'Bileklik' };
const MARKALAR = ['Atasay', 'Favori', 'Koçak', 'Lidya'];

// Ana sayfadaki "Öne Çıkan Ürünler" (ürün id'leri, sırasıyla)
const ONE_CIKANLAR = ['minimal-nokta-kolye', 'damla-tasli-kolye', 'minik-halka-kupe', 'kalp-bileklik'];

// Doğal Taş koleksiyonundaki taşların kısa hikâyeleri
const TASLAR = [
  { ad: 'Firuze', ton: 'firuze', anlam: 'Anadolu’da yüzyıllardır nazara ve kötü enerjiye karşı koruma taşı olarak bilinir. Huzur ve dinginlik getirdiğine inanılır.' },
  { ad: 'Ametist', ton: 'ametist', anlam: 'Mor rengiyle sakinliğin ve berrak zihnin taşı. Antik çağlardan beri denge için taşınır.' },
  { ad: 'Ay Taşı', ton: 'krem', anlam: 'Işıkla dalgalanan yansımalarıyla sezgiyi ve yeni başlangıçları simgeler.' },
];
