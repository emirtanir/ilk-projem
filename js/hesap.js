/* Hesabım — giriş ve hesap bilgileri Supabase'de (js/supabase.js).
   Siparişler şimdilik örnek veri; adresler, favoriler ve tasarımlar şimdilik tarayıcıda. */

const kullanici = kullaniciGetir();
const GIRIS_SAYFASI = 'giris.html?donus=hesabim.html';
if (!kullanici) location.replace(GIRIS_SAYFASI);
// Oturum süresi dolduysa ya da başka yerden çıkış yapıldıysa giriş sayfasına gönder
oturumHazir.then(() => { if (!kullaniciGetir()) location.replace(GIRIS_SAYFASI); });

/* ---------- Örnek veriler ---------- */
const SIPARIS_DURUMLARI = ['Hazırlanıyor', 'Kargoda', 'Teslim edildi'];
const ORNEK_SIPARISLER = [
  { no: 'LDY-10482', tarih: '24 Ekim 2026', durum: 'Hazırlanıyor',
    kalemler: [{ ad: 'İsim Kolyesi', detay: '“Elif” · El yazısı · 14 ayar · 45 cm', tasarim: true }],
    not: 'Kapora ödendi. Kesin fiyat tartımdan sonra size bildirilecek.' },
  { no: 'LDY-10377', tarih: '18 Ekim 2026', durum: 'Kargoda', takipNo: '7300 1846 2291',
    kalemler: [{ urun: URUNLER[0] }, { urun: URUNLER[3] }] },
  { no: 'LDY-10215', tarih: '2 Eylül 2026', durum: 'Teslim edildi', takipNo: '7300 1702 8814',
    kalemler: [{ urun: URUNLER[6] }] },
];

/* ---------- Bölümler ---------- */
function siparislerHTML() {
  return `<h2>Siparişlerim</h2>
  <p class="hesap-aciklama ornek-not">Aşağıdakiler örnek siparişlerdir. Ödeme sistemi kurulunca gerçek siparişleriniz burada görünecek.</p>
  <div class="hesap-liste">
    ${ORNEK_SIPARISLER.map(s => {
      const adim = SIPARIS_DURUMLARI.indexOf(s.durum);
      const toplam = s.kalemler.reduce((t, k) => t + (k.urun ? urunEnDusukFiyat(k.urun) : 0), 0);
      return `<article class="hesap-kart siparis">
        <div class="siparis-bas">
          <div><strong>${s.no}</strong><span>${s.tarih}</span></div>
          <span class="durum durum-${adim}">${s.durum}</span>
        </div>
        <ol class="durum-cizgi">${SIPARIS_DURUMLARI.map((d, i) => `<li class="${i <= adim ? 'tamam' : ''}">${d}</li>`).join('')}</ol>
        <ul class="siparis-kalemler">
          ${s.kalemler.map(k => k.urun
            ? `<li>${gorselHTML(k.urun.kategori, k.urun.ton)}<div><a href="urun.html?id=${k.urun.id}">${k.urun.ad}</a><span>${paraYaz(urunEnDusukFiyat(k.urun))}</span></div></li>`
            : `<li>${gorselHTML('kolye', 'altin')}<div><strong>${k.ad}</strong><span>${k.detay}</span></div></li>`).join('')}
        </ul>
        ${s.not ? `<p class="siparis-not">${s.not}</p>` : ''}
        <div class="siparis-alt">
          ${toplam ? `<span>Toplam <strong>${paraYaz(toplam)}</strong></span>` : '<span>Sipariş usulü üretim</span>'}
          ${s.takipNo ? `<a class="dugme dugme-cizgi kucuk-dugme" href="#" data-takip="${s.takipNo}">Kargo takip</a>` : ''}
        </div>
      </article>`;
    }).join('')}
  </div>`;
}

// Birden fazla önizleme aynı sayfada: SVG içindeki kimlikleri benzersiz yap (14/22 ayar renkleri karışmasın)
function onizlemeSvg(t, i) {
  return svgKabi(t.secim.ayar, ONIZLEMELER[t.tur](t.secim)).replace(/(id="|url\(#)(altin|kesim|kazima)/g, `$1$2-${i}`);
}

function tasarimlarHTML() {
  const hepsi = tasarimlarGetir();
  if (!hepsi.length) {
    return `<h2>Tasarımlarım</h2>
    <div class="hesap-bos"><p>Henüz kayıtlı tasarımınız yok. Kendi Tasarımını Yap'ta "Tasarımımı kaydet"e basınca burada görünür.</p><a class="dugme" href="tasarla.html">Tasarlamaya başla</a></div>`;
  }
  return `<h2>Tasarımlarım</h2>
  <p class="hesap-aciklama">Kendi Tasarımını Yap’ta kaydettiğiniz tasarımlar. Fiyatlar güncel altın fiyatına göre tahminidir.</p>
  <div class="tasarim-izgara">
    ${hepsi.map((t, i) => {
      const { gram, fiyat } = tasarimHesapla(t.tur, t.secim);
      return `<article class="hesap-kart tasarim-kart">
        <div class="tasarim-kucuk">${onizlemeSvg(t, i)}</div>
        <h3>${TASARIM_ADLARI[t.tur]}</h3>
        <p class="detay-yazi">${kacir(tasarimDetayi(t.tur, t.secim, gram))}</p>
        <p class="tasarim-fiyati">≈ ${paraYaz(fiyat)} <small>· kapora ${paraYaz(kaporaHesapla(fiyat))}</small></p>
        <div class="tasarim-dugmeler">
          <button class="dugme kucuk-dugme" data-sepet="${i}">Sepete ekle</button>
          <button class="sil" data-tasarim-sil="${t.id}">Sil</button>
        </div>
      </article>`;
    }).join('')}
  </div>
  <a class="dugme dugme-cizgi" href="tasarla.html">Yeni tasarım yap</a>`;
}

function favorilerHTML() {
  const urunler = favorilerGetir().map(id => URUNLER.find(u => u.id === id)).filter(Boolean);
  return `<h2>Favorilerim</h2>
  ${urunler.length
    ? `<div class="urun-izgara favori-izgara">${urunler.map(urunKartiHTML).join('')}</div>`
    : `<div class="hesap-bos"><p>Henüz favori ürününüz yok. Beğendiğiniz ürünlerdeki kalbe dokunun, burada görünsün.</p><a class="dugme" href="urunler.html">Ürünlere göz at</a></div>`}`;
}

function adreslerHTML() {
  const adresler = adreslerGetir();
  return `<h2>Adreslerim</h2>
  <div class="adres-izgara">
    ${adresler.map((a, i) => `<article class="hesap-kart adres-kart">
      <strong>${kacir(a.baslik)}</strong>
      <p>${kacir(a.ad)}<br>${kacir(a.adres)}<br>${kacir(a.ilce)} / ${kacir(a.il)}<br>${kacir(a.telefon)}</p>
      <button class="sil" data-adres-sil="${i}">Sil</button>
    </article>`).join('')}
  </div>
  <button class="dugme dugme-cizgi" id="adres-ac">+ Yeni adres ekle</button>
  <form class="hesap-kart hesap-form adres-form" id="adres-form" hidden>
    <h3>Yeni adres</h3>
    <label class="alan">Adres başlığı <input class="metin-girdi" name="baslik" placeholder="Örn. Ev, İş" required></label>
    <label class="alan">Ad soyad <input class="metin-girdi" name="ad" autocomplete="name" value="${kacir(kullanici.ad)}" required></label>
    <label class="alan">Telefon <input class="metin-girdi" type="tel" name="telefon" autocomplete="tel" inputmode="tel" value="${kacir(kullanici.telefon)}" required></label>
    <div class="alan-cift">
      <label class="alan">İl <input class="metin-girdi" name="il" autocomplete="address-level1" required></label>
      <label class="alan">İlçe <input class="metin-girdi" name="ilce" autocomplete="address-level2" required></label>
    </div>
    <label class="alan">Açık adres <textarea class="metin-girdi" name="adres" rows="3" autocomplete="street-address" required></textarea></label>
    <button class="dugme dugme-genis" type="submit">Adresi kaydet</button>
  </form>`;
}

function bilgilerHTML() {
  return `<h2>Hesap Bilgilerim</h2>
  <form class="hesap-kart hesap-form" id="bilgi-form">
    <h3>Kişisel bilgiler</h3>
    <label class="alan">Ad soyad <input class="metin-girdi" name="ad" autocomplete="name" value="${kacir(kullanici.ad)}" required></label>
    <label class="alan">E-posta <input class="metin-girdi" type="email" name="eposta" autocomplete="email" value="${kacir(kullanici.eposta)}" required></label>
    <label class="alan">Telefon <input class="metin-girdi" type="tel" name="telefon" autocomplete="tel" value="${kacir(kullanici.telefon)}" required></label>
    <button class="dugme" type="submit">Kaydet</button>
  </form>

  <form class="hesap-kart hesap-form" id="sifre-form">
    <h3>Şifre değiştir</h3>
    <label class="alan">Mevcut şifre <input class="metin-girdi" type="password" name="eski" autocomplete="current-password" required></label>
    <label class="alan">Yeni şifre <input class="metin-girdi" type="password" name="yeni" autocomplete="new-password" minlength="6" required></label>
    <label class="alan">Yeni şifre (tekrar) <input class="metin-girdi" type="password" name="tekrar" autocomplete="new-password" minlength="6" required></label>
    <button class="dugme" type="submit">Şifreyi güncelle</button>
  </form>

  <form class="hesap-kart hesap-form" id="izin-form">
    <h3>İletişim izinleri</h3>
    <p class="hesap-aciklama">Kampanya, çekiliş ve yeniliklerden haberdar olmak isteğe bağlıdır; dilediğiniz zaman değiştirebilirsiniz. Sipariş ve kargo bilgilendirmeleri bu izinlerden bağımsız olarak gönderilir.</p>
    <label class="onay"><input type="checkbox" name="izinSms" ${kullanici.izinSms ? 'checked' : ''}><span>SMS ile kampanya, çekiliş ve yenilikler</span></label>
    <label class="onay"><input type="checkbox" name="izinEposta" ${kullanici.izinEposta ? 'checked' : ''}><span>E-posta ile kampanya, çekiliş ve yenilikler</span></label>
  </form>`;
}

const BOLUMLER = { siparisler: siparislerHTML, tasarimlar: tasarimlarHTML, favoriler: favorilerHTML, adresler: adreslerHTML, bilgiler: bilgilerHTML };
let aktif = 'siparisler';

function bolumAc() {
  const istenen = location.hash.slice(1);
  aktif = BOLUMLER[istenen] ? istenen : 'siparisler';
  const icerik = document.getElementById('hesap-icerik');
  icerik.innerHTML = BOLUMLER[aktif]();
  document.querySelectorAll('.hesap-menu a').forEach(a => {
    const secili = a.dataset.bolum === aktif;
    a.classList.toggle('secili', secili);
    if (secili) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  // İsim kolyesi önizlemelerinde zinciri yazıya bağla (SVG sayfada görünür olduktan sonra)
  icerik.querySelectorAll('.tasarim-kucuk').forEach(isimZinciriniBagla);
  // Telefonda seçili sekme görünür kalsın
  const secili = document.querySelector('.hesap-menu a.secili');
  if (secili && secili.scrollIntoView) secili.scrollIntoView({ block: 'nearest', inline: 'center' });
}

/* ---------- Olaylar ---------- */
if (kullanici) {
  selamYaz();
  window.addEventListener('hashchange', bolumAc);
  bolumAc();

  let mesaj = null;
  try { mesaj = sessionStorage.getItem('lidya-giris-mesaji'); sessionStorage.removeItem('lidya-giris-mesaji'); } catch (e) {}
  if (mesaj) bildirim(location.hash === '#tasarimlar' && tasarimlarGetir().length ? mesaj + ' Tasarımınız kaydedildi.' : mesaj);
}

function selamYaz() {
  const ilkAd = (kullanici.ad || '').split(' ')[0];
  document.getElementById('hesap-selam').textContent = ilkAd ? `Merhaba, ${ilkAd}` : 'Merhaba';
}

document.getElementById('cikis').addEventListener('click', async () => {
  await cikisYap();
  location.href = 'index.html';
});

const icerik = document.getElementById('hesap-icerik');

icerik.addEventListener('click', e => {
  const takip = e.target.closest('[data-takip]');
  if (takip) {
    e.preventDefault();
    bildirim(`Takip no: <strong>${takip.dataset.takip}</strong>. Gerçek sitede bu bağlantı kargo firmasının takip sayfasını açar.`);
  }

  const sepet = e.target.closest('[data-sepet]');
  if (sepet) {
    const t = tasarimlarGetir()[sepet.dataset.sepet];
    sepeteEkle(tasarimKalemi(t.tur, t.secim));
  }

  const tasarimSil = e.target.closest('[data-tasarim-sil]');
  if (tasarimSil) {
    hafizaKaydet('lidya-tasarimlar', tasarimlarGetir().filter(t => t.id !== tasarimSil.dataset.tasarimSil));
    bolumAc();
    bildirim('Tasarım silindi.');
  }

  const adresSil = e.target.closest('[data-adres-sil]');
  if (adresSil) {
    hafizaKaydet('lidya-adresler', adreslerGetir().filter((a, i) => i !== Number(adresSil.dataset.adresSil)));
    bolumAc();
    bildirim('Adres silindi.');
  }

  if (e.target.id === 'adres-ac') {
    const form = document.getElementById('adres-form');
    form.hidden = !form.hidden;
    if (!form.hidden) form.baslik.focus();
  }

  // Favorilerden çıkarılan ürün listeden de kalksın (kalp işlemi js/ortak.js içinde)
  if (e.target.closest('[data-favori]') && aktif === 'favoriler') setTimeout(bolumAc, 0);
});

icerik.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  if (f.id === 'adres-form') {
    const yeni = Object.fromEntries(['baslik', 'ad', 'telefon', 'il', 'ilce', 'adres'].map(k => [k, f[k].value.trim()]));
    hafizaKaydet('lidya-adresler', [...adreslerGetir(), yeni]);
    bolumAc();
    bildirim('Adresiniz kaydedildi.');
  }
  if (f.id === 'bilgi-form') bilgileriKaydet(f);
  if (f.id === 'sifre-form') {
    if (f.yeni.value !== f.tekrar.value) {
      f.tekrar.setCustomValidity('Yeni şifreler aynı değil.');
      f.tekrar.reportValidity();
      return;
    }
    sifreyiDegistir(f);
  }
});

// İşlem sürerken butonu kilitle
async function bekleyerek(form, is) {
  const dugme = form.querySelector('[type=submit]');
  const eski = dugme.textContent;
  dugme.disabled = true;
  dugme.textContent = 'Lütfen bekleyin…';
  try { await is(); } finally { dugme.disabled = false; dugme.textContent = eski; }
}

// Ad, telefon (ve değiştiyse e-posta) Supabase hesabına kaydedilir
function bilgileriKaydet(f) {
  if (!sb) return bildirim(hataMesaji({ message: 'network' }));
  const yeniEposta = f.eposta.value.trim();
  const epostaDegisti = yeniEposta !== kullanici.eposta;
  bekleyerek(f, async () => {
    const guncelleme = { data: { ad: f.ad.value.trim(), telefon: f.telefon.value.trim() } };
    if (epostaDegisti) guncelleme.email = yeniEposta;
    const { data, error } = await sb.auth.updateUser(guncelleme, { emailRedirectTo: SITE_ADRESI + 'hesabim.html#bilgiler' });
    if (error) return bildirim(hataMesaji(error));
    Object.assign(kullanici, kullaniciBilgisi(data.user));
    hafizaKaydet('lidya-hesap', kullanici);
    selamYaz();
    // E-posta değişikliği, yeni adrese gelen bağlantı onaylanınca geçerli olur
    if (epostaDegisti) {
      f.eposta.value = kullanici.eposta;
      bildirim(`Bilgileriniz kaydedildi. E-posta değişikliği için <strong>${kacir(yeniEposta)}</strong> adresine onay bağlantısı gönderdik.`);
    } else bildirim('Bilgileriniz güncellendi.');
  });
}

// Önce mevcut şifre doğrulanır, sonra yeni şifre kaydedilir
function sifreyiDegistir(f) {
  if (!sb) return bildirim(hataMesaji({ message: 'network' }));
  bekleyerek(f, async () => {
    const dogrula = await sb.auth.signInWithPassword({ email: kullanici.eposta, password: f.eski.value });
    if (dogrula.error) {
      f.eski.setCustomValidity('Mevcut şifre hatalı.');
      f.eski.reportValidity();
      return;
    }
    const { error } = await sb.auth.updateUser({ password: f.yeni.value });
    if (error) return bildirim(hataMesaji(error));
    f.reset();
    bildirim('Şifreniz güncellendi.');
  });
}

icerik.addEventListener('input', e => {
  if (e.target.name === 'tekrar' || e.target.name === 'eski') e.target.setCustomValidity('');
});

// İletişim izinleri Supabase hesabına, değişiklik tarihiyle birlikte kaydedilir (İYS için kayıt)
icerik.addEventListener('change', async e => {
  if (!e.target.closest('#izin-form')) return;
  const kutu = e.target;
  if (!sb) { kutu.checked = !kutu.checked; return bildirim(hataMesaji({ message: 'network' })); }
  kutu.disabled = true;
  const { error } = await sb.auth.updateUser({ data: { [kutu.name]: kutu.checked, izinTarihi: new Date().toISOString() } });
  kutu.disabled = false;
  if (error) { kutu.checked = !kutu.checked; return bildirim(hataMesaji(error)); }
  kullanici[kutu.name] = kutu.checked;
  hafizaKaydet('lidya-hesap', kullanici);
  bildirim('İletişim tercihiniz kaydedildi.');
});
