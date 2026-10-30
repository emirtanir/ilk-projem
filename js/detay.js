/* Ürün detay sayfası */

const urunId = new URLSearchParams(location.search).get('id');
const urun = URUNLER.find(u => u.id === urunId) || URUNLER[0];
const ayarlar = urun.secenekler ? Object.keys(urun.secenekler) : [];
// Varsayılan: online satılabilen ilk ayar (hepsi sınırın üstündeyse ilk ayar, katalog görünümüyle)
let seciliAyar = ayarlar.find(a => ayarSatilabilirMi(urun, a)) || ayarlar[0];

const IKON_KARGO = '<svg viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>';
const IKON_SAAT = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
const IKON_KALKAN = '<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';

function detayCiz() {
  const tas = urun.tas ? TASLAR.find(t => t.ad === urun.tas) : null;
  document.title = urun.ad + ' · Lidya Kuyumculuk';
  document.getElementById('yol').innerHTML =
    `<a href="index.html">Ana sayfa</a> / <a href="urunler.html?kategori=${urun.kategori}">${KATEGORILER[urun.kategori]}</a> / ${urun.ad}`;

  document.getElementById('detay').innerHTML = `
  <div class="detay">
    <div class="galeri">
      <div class="galeri-ana" id="galeri-ana">${gorselHTML(urun.kategori, urun.ton, 'Ürün fotoğrafı')}</div>
      <div class="galeri-kucuk">
        <button class="secili" data-gorsel="0" aria-label="Ürün fotoğrafı">${gorselHTML(urun.kategori, urun.ton)}</button>
        <button data-gorsel="1" aria-label="Üzerinde görünüm">${gorselHTML(urun.kategori, 'pembe')}</button>
      </div>
    </div>

    <div class="detay-bilgi">
      <span class="kucuk-baslik">${urun.marka}${urun.tas ? ' · ' + urun.tas : ''}</span>
      <div class="detay-baslik"><h1>${urun.ad}</h1>${kalpDugmesiHTML(urun.id)}</div>
      <div class="detay-fiyat" id="fiyat"></div>
      <p class="kampanya-not" id="kampanya-not" hidden></p>
      <p class="katalog-bilgi" id="katalog-bilgi" hidden>Mağazamızda inceleyebilirsiniz</p>
      <div class="fiyat-not" id="fiyat-not">${urun.sabitFiyat ? 'Sabit fiyatlı ürün' : 'Fiyat, güncel altın fiyatına göre hesaplanır.'}</div>

      <div class="ozellikler">
        <div><span>Gram</span><strong id="gram">${urun.sabitFiyat ? '—' : ''}</strong></div>
        <div><span>Ayar</span><strong id="ayar">${urun.sabitFiyat ? 'Altın yok' : ''}</strong></div>
        <div><span>Kategori</span><strong>${KATEGORILER[urun.kategori]}</strong></div>
      </div>

      ${ayarlar.length ? `
        <p class="secim-baslik">Ayar seçin</p>
        <div class="ayar-secim" id="ayar-secim">
          ${ayarlar.map(a => `<button class="cip" data-ayar="${a}">${a} ayar</button>`).join('')}
        </div>` : ''}

      <p>${urun.aciklama}</p>
      ${tas ? `<p class="fiyat-not"><strong>${tas.ad}:</strong> ${tas.anlam}</p>` : ''}

      <div id="hediye-alani">${hediyeSecenekHTML('urun')}</div>

      <div class="mobil-cubuk">
        <div class="cubuk-fiyat" id="cubuk-fiyat"></div>
        <button class="dugme" id="sepete-ekle">Sepete Ekle</button>
        <a class="dugme dugme-wa-bilgi" id="wa-bilgi" target="_blank" rel="noopener" hidden>${IKON_WA} WhatsApp’tan Bilgi Al</a>
      </div>

      <div class="bilgi-kutusu">
        <div>${IKON_SAAT}<p><strong>En geç 3 iş günü içinde kargoda</strong><span>Özel gün ve pazar günleri hariç.</span></p></div>
        <div>${IKON_KARGO}<p><strong>${ucretsizKargoMu(urunEnDusukFiyat(urun)) ? 'Ücretsiz kargo' : paraYaz(SATIS_AYARLARI.ucretsizKargoSiniri) + ' ve üzeri siparişlerde kargo ücretsiz'}</strong><span>${urun.sabitFiyat ? 'Özenle paketlenip gönderilir.' : 'Sigortalı kıymetli gönderi; kamera kaydıyla paketlenir, güvenlik bantlı poşetle gönderilir.'}</span></p></div>
        <div>${IKON_KALKAN}<p><strong>Lidya güvencesi</strong><span>1989’dan beri Manavgat’ta aile işletmesi, Atasay yetkili satış noktası.</span></p></div>
      </div>
    </div>
  </div>`;
}

function secimiGuncelle() {
  const fiyat = urunFiyati(urun, seciliAyar);
  // Formülle hesaplanan fiyat online satış sınırının üstündeyse katalog görünümü
  const katalog = !ayarSatilabilirMi(urun, seciliAyar);
  const kampanya = kampanyadaMi(urun) && !katalog;
  const fiyatAlani = document.getElementById('fiyat');
  fiyatAlani.innerHTML = katalog ? 'Fiyat için bize ulaşın'
    : (kampanya ? `<s class="eski-fiyat">${paraYaz(urunNormalFiyati(urun, seciliAyar))}</s> ` : '') + paraYaz(fiyat);
  fiyatAlani.classList.toggle('katalog-fiyat', katalog);
  document.getElementById('katalog-bilgi').hidden = !katalog;
  document.getElementById('fiyat-not').hidden = katalog;
  const kampanyaNot = document.getElementById('kampanya-not');
  kampanyaNot.hidden = !kampanya;
  if (kampanya) kampanyaNot.textContent = 'İnternete özel kampanya' + (urun.kampanya.bitis ? ` · ${urun.kampanya.bitis} tarihine kadar` : '');
  document.getElementById('hediye-alani').hidden = katalog;
  document.getElementById('sepete-ekle').hidden = katalog;
  const wa = document.getElementById('wa-bilgi');
  wa.hidden = !katalog;
  wa.href = whatsappBilgiLinki(urun, seciliAyar);
  // Katalog ürününde alt çubukta sadece WhatsApp butonu (tam genişlik)
  document.getElementById('cubuk-fiyat').hidden = katalog;
  wa.closest('.mobil-cubuk').classList.toggle('katalog-cubuk', katalog);
  document.getElementById('cubuk-fiyat').innerHTML =
    (katalog ? 'Fiyat için bize ulaşın' : paraYaz(fiyat)) + (seciliAyar ? `<small>${seciliAyar} ayar · ${gramYaz(urun.secenekler[seciliAyar].gram)}</small>` : '');
  if (seciliAyar) {
    document.getElementById('gram').textContent = gramYaz(urun.secenekler[seciliAyar].gram);
    document.getElementById('ayar').textContent = seciliAyar + ' ayar';
    document.querySelectorAll('#ayar-secim .cip').forEach(c => c.classList.toggle('secili', c.dataset.ayar === seciliAyar));
  }
}

detayCiz();
goruntulenmeArtir(urun.id); // "En popüler" sıralaması için (gerçek sitede sunucudaki sayaç)
secimiGuncelle();

document.getElementById('detay').addEventListener('click', e => {
  const ayarDugme = e.target.closest('[data-ayar]');
  if (ayarDugme) { seciliAyar = ayarDugme.dataset.ayar; secimiGuncelle(); }

  const kucuk = e.target.closest('[data-gorsel]');
  if (kucuk) {
    const uzerinde = kucuk.dataset.gorsel === '1';
    document.getElementById('galeri-ana').innerHTML = uzerinde
      ? gorselHTML(urun.kategori, 'pembe', 'Üzerinde görünüm')
      : gorselHTML(urun.kategori, urun.ton, 'Ürün fotoğrafı');
    document.querySelectorAll('.galeri-kucuk button').forEach(b => b.classList.toggle('secili', b === kucuk));
  }

  if (e.target.closest('#sepete-ekle') && ayarSatilabilirMi(urun, seciliAyar)) {
    sepeteEkle({
      anahtar: urun.id + '-' + (seciliAyar || 'sabit'),
      ad: urun.ad,
      kod: urun.kod,
      detay: seciliAyar ? `${seciliAyar} ayar · ${gramYaz(urun.secenekler[seciliAyar].gram)}` : (urun.tas || 'Doğal taş'),
      fiyat: urunFiyati(urun, seciliAyar),
      kategori: urun.kategori,
      ton: urun.ton,
      hediye: hediyeDurumu(document.querySelector('#hediye-alani .hediye-secenek')),
    });
  }
});

// Aynı kategoriden öneriler
const benzerler = gorunurUrunler().filter(u => u.kategori === urun.kategori && u.id !== urun.id).slice(0, 4);
if (benzerler.length) {
  document.getElementById('benzer-izgara').innerHTML = benzerler.map(urunKartiHTML).join('');
  document.getElementById('benzerler').hidden = false;
}
