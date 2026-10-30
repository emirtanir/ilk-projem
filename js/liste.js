/* Ürün listesi: koleksiyon, ürün türü, marka, fiyat ve ayar filtreleri */

const parametreler = new URLSearchParams(location.search);
const filtre = {
  koleksiyon: parametreler.get('koleksiyon') || '',
  kategori: parametreler.get('kategori') || '',
  marka: parametreler.get('marka') || '',
  ayar: parametreler.get('ayar') || '',
  fiyat: parametreler.get('fiyat') || '',
  kampanya: parametreler.get('kampanya') || '',
  sirala: parametreler.get('sirala') || '',   // boş = Önerilen
  ara: (parametreler.get('ara') || '').trim(),
};

// Ana koleksiyonlar + ayrı bir koleksiyon olarak Doğal Taş
const KOLEKSIYON_SECENEKLERI = [
  ...Object.entries(KOLEKSIYONLAR).map(([k, v]) => [k, v.ad]),
  ['dogal-tas', 'Doğal Taş'],
];

const GRUPLAR = [
  { anahtar: 'koleksiyon', baslik: 'Koleksiyon', secenekler: KOLEKSIYON_SECENEKLERI },
  { anahtar: 'kategori', baslik: 'Ürün türü', secenekler: Object.entries(KATEGORILER) },
  { anahtar: 'marka', baslik: 'Marka', secenekler: MARKALAR.map(m => [m, m]) },
  { anahtar: 'fiyat', baslik: 'Fiyat', secenekler: SATIS_AYARLARI.fiyatFiltreleri.map(s => [String(s), paraYaz(s) + ' altı']) },
  { anahtar: 'ayar', baslik: 'Ayar', secenekler: [['14', '14 ayar'], ['22', '22 ayar']] },
];

// Arama: ürün adı, marka, tür, taş ve koleksiyon adlarında geçiyor mu
function aramayaUyuyor(u) {
  const kucuk = t => t.toLocaleLowerCase('tr-TR');
  const metin = [u.ad, u.marka, KATEGORILER[u.kategori], u.tas || '', ...u.koleksiyonlar.map(k => KOLEKSIYONLAR[k].ad)].join(' ');
  return kucuk(metin).includes(kucuk(filtre.ara));
}

function uyuyorMu(u) {
  if (filtre.ara && !aramayaUyuyor(u)) return false;
  if (filtre.kampanya && !(kampanyadaMi(u) && !katalogMu(u))) return false;
  if (filtre.koleksiyon === 'dogal-tas' && !u.tas) return false;
  if (KOLEKSIYONLAR[filtre.koleksiyon] && !u.koleksiyonlar.includes(filtre.koleksiyon)) return false;
  if (filtre.kategori && u.kategori !== filtre.kategori) return false;
  if (filtre.marka && u.marka !== filtre.marka) return false;
  if (filtre.ayar && !(u.secenekler && u.secenekler[filtre.ayar])) return false;
  if (filtre.fiyat && urunEnDusukFiyat(u) >= Number(filtre.fiyat)) return false;
  return true;
}

function filtreleriCiz() {
  document.getElementById('filtreler').innerHTML = GRUPLAR.map(g => `
    <div class="filtre-grup">
      <h4>${g.baslik}</h4>
      <div class="cipler">
        <button class="cip ${filtre[g.anahtar] === '' ? 'secili' : ''}" data-grup="${g.anahtar}" data-deger="">Tümü</button>
        ${g.secenekler.map(([d, ad]) =>
          `<button class="cip ${filtre[g.anahtar] === d ? 'secili' : ''}" data-grup="${g.anahtar}" data-deger="${d}">${ad}</button>`
        ).join('')}
      </div>
    </div>`).join('');
  // Butonun altındaki kısa özet: kaç filtre seçili
  const secili = GRUPLAR.filter(g => filtre[g.anahtar]).length;
  document.getElementById('filtre-ozet').textContent = secili ? `${secili} seçim` : 'Tümü';
}

function urunleriCiz() {
  const sonuc = urunleriSirala(gorunurUrunler().filter(uyuyorMu), filtre.sirala);
  document.getElementById('urun-izgara').innerHTML = sonuc.length
    ? sonuc.map(urunKartiHTML).join('')
    : '<p class="bos-sonuc">Bu seçimlere uygun ürün bulunamadı.<br>Filtreleri değiştirmeyi deneyin.</p>';
  document.getElementById('sonuc-sayisi').textContent = sonuc.length + ' ürün';
  document.getElementById('sonuclari-goster').textContent = `${sonuc.length} ürünü göster`;

  let baslik = 'Tüm Ürünler';
  let ustBaslik = 'Koleksiyon';
  let aciklama = '';
  if (filtre.kampanya) {
    baslik = 'İnternete Özel Kampanyalar';
    ustBaslik = 'Kampanyalar';
    aciklama = 'Sadece sitemize özel fiyatlar. Markalı ürünler kampanyaya dahil değildir.';
  } else if (filtre.ara) baslik = `“${filtre.ara}” için sonuçlar`;
  else if (filtre.koleksiyon === 'dogal-tas') baslik = 'Doğal Taş Koleksiyonu';
  else if (KOLEKSIYONLAR[filtre.koleksiyon]) baslik = KOLEKSIYONLAR[filtre.koleksiyon].ad;
  else if (filtre.kategori) baslik = KATEGORILER[filtre.kategori];
  else if (filtre.marka) baslik = filtre.marka;
  else if (filtre.fiyat) baslik = paraYaz(Number(filtre.fiyat)) + ' altı';
  document.getElementById('liste-baslik').textContent = baslik;
  document.getElementById('liste-ust-baslik').textContent = ustBaslik;
  const aciklamaAlani = document.getElementById('liste-aciklama');
  aciklamaAlani.textContent = aciklama;
  aciklamaAlani.hidden = !aciklama;
}

// Seçilen filtreler ve sıralama adres çubuğunda tutulur: sayfa yenilenince ya da geri gelince kaybolmaz
function adresiGuncelle() {
  const p = new URLSearchParams();
  Object.entries(filtre).forEach(([k, v]) => v && p.set(k, v));
  try { history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '')); } catch (e) { /* bazı tarayıcılar dosyadan açılınca izin vermez */ }
}

function yenile() {
  filtreleriCiz();
  urunleriCiz();
  adresiGuncelle();
}

// Filtre paneli: çipler ve "Filtreleri temizle" (kampanya sayfası ve arama korunur)
document.getElementById('filtre-panel').addEventListener('click', e => {
  const cip = e.target.closest('.cip');
  if (cip) filtre[cip.dataset.grup] = cip.dataset.deger;
  else if (e.target.closest('[data-temizle]')) GRUPLAR.forEach(g => { filtre[g.anahtar] = ''; });
  else return;
  yenile();
});

// Sırala
const siralaKabi = document.getElementById('sirala-arac');
siralaKabi.outerHTML = siralaAraciHTML(filtre.sirala);
siralaAraciBagla(document.getElementById('liste-araclar'), sira => {
  filtre.sirala = sira;
  urunleriCiz();
  adresiGuncelle();
});
document.getElementById('filtre-ikon').outerHTML = IKON_FILTRE;

filtreleriCiz();
urunleriCiz();
