/* Hediye Rehberi: Kime? · Hangi gün için? · Bütçe — seçimlere göre ürünler anında filtrelenir.
   Etiketler js/urunler.js içindeki ürünlerde (kime, gun). Katalog ürünleri burada çıkmaz. */

const hParametre = new URLSearchParams(location.search);
const secim = {
  kime: hParametre.get('kime') || '',
  gun: hParametre.get('gun') || '',
  butce: hParametre.get('butce') || '',
};

const HEDIYE_GRUPLARI = [
  { anahtar: 'kime', baslik: 'Kime?', secenekler: Object.entries(KIME) },
  { anahtar: 'gun', baslik: 'Hangi gün için?', secenekler: Object.entries(GUNLER) },
  { anahtar: 'butce', baslik: 'Bütçe', secenekler: SATIS_AYARLARI.fiyatFiltreleri.map(s => [String(s), paraYaz(s) + ' altı']) },
];

function secimleriCiz() {
  document.getElementById('hediye-secimler').innerHTML = HEDIYE_GRUPLARI.map(g => `
    <div class="hediye-grup">
      <h2>${g.baslik}</h2>
      <div class="cipler">
        <button class="cip ${secim[g.anahtar] === '' ? 'secili' : ''}" data-grup="${g.anahtar}" data-deger="">Tümü</button>
        ${g.secenekler.map(([d, ad]) =>
          `<button class="cip ${secim[g.anahtar] === d ? 'secili' : ''}" data-grup="${g.anahtar}" data-deger="${d}" aria-pressed="${secim[g.anahtar] === d}">${ad}</button>`
        ).join('')}
      </div>
    </div>`).join('');
}

function hediyeyeUyuyor(u) {
  if (katalogMu(u)) return false;
  if (secim.kime && !(u.kime || []).includes(secim.kime)) return false;
  if (secim.gun && !(u.gun || []).includes(secim.gun)) return false;
  if (secim.butce && urunEnDusukFiyat(u) >= Number(secim.butce)) return false;
  return true;
}

function hediyeleriCiz() {
  const sonuc = URUNLER.filter(hediyeyeUyuyor);
  document.getElementById('hediye-izgara').innerHTML = sonuc.length
    ? sonuc.map(urunKartiHTML).join('')
    : '<p class="bos-sonuc">Bu seçimlere uygun hediye bulamadık.<br>Bir seçimi değiştirmeyi ya da Kendi Tasarımını Yap’ı deneyin.</p>';
  document.getElementById('hediye-sonuc').textContent = `${sonuc.length} hediye önerisi`;
  document.getElementById('hediye-temizle').hidden = !Object.values(secim).some(Boolean);
}

function adresiYaz() {
  const p = new URLSearchParams();
  Object.entries(secim).forEach(([k, v]) => v && p.set(k, v));
  try { history.replaceState(null, '', location.pathname + (p.toString() ? '?' + p : '')); } catch (e) { /* dosyadan açılınca izin olmayabilir */ }
}

document.getElementById('hediye-secimler').addEventListener('click', e => {
  const cip = e.target.closest('.cip');
  if (!cip) return;
  secim[cip.dataset.grup] = cip.dataset.deger;
  secimleriCiz();
  hediyeleriCiz();
  adresiYaz();
});

document.getElementById('hediye-temizle').addEventListener('click', () => {
  Object.keys(secim).forEach(k => (secim[k] = ''));
  secimleriCiz();
  hediyeleriCiz();
  adresiYaz();
});

secimleriCiz();
hediyeleriCiz();
