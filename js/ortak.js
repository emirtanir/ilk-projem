/* =========================================================
   ORTAK: menü, alt kısım, WhatsApp butonu, sepet, yer tutucu görseller
   ========================================================= */

// İletişim bilgileri (telefon, WhatsApp, saatler, konum) js/iletisim.js dosyasında.

// Üst şerit. Yoğun dönemlerde (bayram, Anneler Günü…) buraya o döneme ait duyuru yazılabilir.
const DUYURU = `${paraYaz(SATIS_AYARLARI.ucretsizKargoSiniri)} ve üzeri siparişlerde kargo ücretsiz · En geç 3 iş günü içinde kargoda`;

/* ---------- Yer tutucu ürün görselleri (çizgi ikonlar) ---------- */
const IKONLAR = {
  kolye: '<path d="M22 20 C28 55 72 55 78 20"/><path d="M50 46v6"/><path d="M50 52c-6 7-7 12-7 15a7 7 0 0 0 14 0c0-3-1-8-7-15z"/>',
  kupe: '<circle cx="36" cy="30" r="3"/><circle cx="64" cy="30" r="3"/><path d="M36 33v7M64 33v7"/><path d="M36 40c-6 8-6 16 0 18 6-2 6-10 0-18zM64 40c-6 8-6 16 0 18 6-2 6-10 0-18z"/>',
  yuzuk: '<circle cx="50" cy="62" r="20"/><circle cx="50" cy="62" r="16"/><path d="M50 42l-7-8 3-6h8l3 6z"/>',
  bileklik: '<ellipse cx="50" cy="50" rx="31" ry="14"/><ellipse cx="50" cy="50" rx="27" ry="10"/><path d="M50 64v5"/><circle cx="50" cy="72" r="3"/>',
  kolyeucu: '<circle cx="50" cy="24" r="5"/><path d="M50 29v6"/><path d="M50 35c-12 0-18 9-18 19 0 12 18 26 18 26s18-14 18-26c0-10-6-19-18-19z"/>',
  hediye: '<rect x="29" y="44" width="42" height="32" rx="2"/><path d="M25 36h50v8H25zM50 36v40"/><path d="M50 36c-3-7-13-10-13-4s9 4 13 4c4 0 13 0 13-4s-10-3-13 4z"/>',
};

function gorselHTML(kategori, ton, etiket) {
  return `<div class="gorsel ton-${ton}">
    <svg viewBox="0 0 100 100" aria-hidden="true">${IKONLAR[kategori] || IKONLAR.kolye}</svg>
    ${etiket ? `<span class="gorsel-not">${etiket}</span>` : ''}
  </div>`;
}

/* ---------- Ürün kartı (liste ve öneriler) ---------- */
function urunKartiHTML(u) {
  const ayarlar = u.secenekler ? Object.keys(u.secenekler) : [];
  const enDusuk = urunEnDusukFiyat(u);
  const ayarYazi = ayarlar.length ? ayarlar.map(a => a + ' ayar').join(' · ') : 'Doğal taş';
  return `<div class="urun-karti">
    ${kalpDugmesiHTML(u.id)}
    <a class="urun-karti-link" href="urun.html?id=${u.id}">
    <div class="urun-karti-gorsel">
      ${gorselHTML(u.kategori, u.ton)}
      ${u.etiket ? `<span class="rozet">${u.etiket}</span>` : ''}
    </div>
    <div class="urun-karti-bilgi">
      <span class="kucuk-baslik">${u.marka}</span>
      <h3>${u.ad}</h3>
      <span class="ayar-yazi">${ayarYazi}</span>
      <span class="fiyat">${ayarlar.length > 1 ? 'başlayan ' : ''}${paraYaz(enDusuk)}</span>
      ${ucretsizKargoMu(enDusuk) ? '<span class="kargo-etiket">Ücretsiz kargo</span>' : ''}
    </div>
    </a>
  </div>`;
}

/* ---------- Sepet (tarayıcı hafızasında) ---------- */
let gecici = [];
function sepetGetir() {
  try { return JSON.parse(localStorage.getItem('lidya-sepet')) || []; } catch (e) { return gecici; }
}
function sepetKaydet(sepet) {
  gecici = sepet;
  try { localStorage.setItem('lidya-sepet', JSON.stringify(sepet)); } catch (e) { /* hafıza kapalı */ }
  sepetSayaciGuncelle();
}
// kalem: { anahtar, ad, detay, fiyat, kategori, ton }
function sepeteEkle(kalem) {
  const sepet = sepetGetir();
  const var_ = sepet.find(k => k.anahtar === kalem.anahtar);
  if (var_) var_.adet += 1; else sepet.push({ ...kalem, adet: 1 });
  sepetKaydet(sepet);
  bildirim(`<strong>${kalem.ad}</strong> sepete eklendi. <a href="sepet.html">Sepete git →</a>`);
}
function sepetSayaciGuncelle() {
  const adet = sepetGetir().reduce((t, k) => t + k.adet, 0);
  document.querySelectorAll('.sepet-sayac').forEach(el => {
    el.textContent = adet;
    el.hidden = adet === 0;
  });
}

/* =========================================================
   HESAP — giriş, üyelik ve şifre Supabase Auth ile (js/supabase.js).
   Favoriler, kayıtlı tasarımlar ve adresler şimdilik bu tarayıcının
   hafızasında; sonraki adımda Supabase veritabanına taşınacak.
   ========================================================= */
const hafizaYedek = {};
function hafizaGetir(anahtar, varsayilan) {
  try {
    const deger = localStorage.getItem(anahtar);
    return deger === null ? varsayilan : JSON.parse(deger);
  } catch (e) { return anahtar in hafizaYedek ? hafizaYedek[anahtar] : varsayilan; }
}
function hafizaKaydet(anahtar, deger) {
  hafizaYedek[anahtar] = deger;
  try {
    if (deger === null) localStorage.removeItem(anahtar);
    else localStorage.setItem(anahtar, JSON.stringify(deger));
  } catch (e) { /* hafıza kapalı ya da dolu */ }
}

// Giriş durumu Supabase oturumundan gelir; sayfalar hızlı açılsın diye
// kullanıcının özet bilgisi ('lidya-hesap') tarayıcıda da tutulur ve oturumla eşitlenir.
function kullaniciGetir() { return hafizaGetir('lidya-hesap', null); }

// Supabase kullanıcısından sitede kullandığımız bilgiler (ad, telefon, izinler: kayıt sırasında girilen ek bilgiler)
function kullaniciBilgisi(user) {
  const d = user.user_metadata || {};
  return {
    id: user.id, eposta: user.email,
    ad: d.ad || d.full_name || d.name || '', telefon: d.telefon || '',
    izinSms: !!d.izinSms, izinEposta: !!d.izinEposta,
  };
}

function girisYap(bilgiler) {
  hafizaKaydet('lidya-hesap', bilgiler);
  // Giriş yapmadan "Tasarımımı kaydet"e basıldıysa o tasarımı şimdi kaydet
  const bekleyen = hafizaGetir('lidya-bekleyen-tasarim', null);
  if (bekleyen) {
    tasarimKaydet(bekleyen);
    hafizaKaydet('lidya-bekleyen-tasarim', null);
  }
}
async function cikisYap() {
  hafizaKaydet('lidya-hesap', null);
  if (sb) await sb.auth.signOut();
}

// Sayfa açılınca oturumu Supabase ile eşitle (süresi dolduysa, başka sekmede çıkış yapıldıysa…)
const oturumHazir = (async () => {
  if (!sb) return;
  const { data } = await sb.auth.getSession();
  const user = data.session && data.session.user;
  if (user) girisYap(kullaniciBilgisi(user));
  else hafizaKaydet('lidya-hesap', null);
  hesapDugmesiGuncelle();
})();
if (sb) sb.auth.onAuthStateChange((olay, oturum) => {
  if (olay === 'SIGNED_OUT') hafizaKaydet('lidya-hesap', null);
  else if (oturum && oturum.user && olay !== 'INITIAL_SESSION') girisYap(kullaniciBilgisi(oturum.user));
  hesapDugmesiGuncelle();
});

// Üst menüdeki hesap ikonu: giriş durumuna göre Hesabım ya da Giriş sayfasına gider
function hesapDugmesiGuncelle() {
  const dugme = document.querySelector('.hesap-dugme');
  if (!dugme) return;
  const girisli = !!kullaniciGetir();
  dugme.classList.toggle('girisli', girisli);
  dugme.href = girisli ? 'hesabim.html' : 'giris.html';
  dugme.setAttribute('aria-label', girisli ? 'Hesabım' : 'Giriş yap / Üye ol');
}

// Kayıtlı adresler (Hesabım > Adreslerim ve ödeme sayfası). Veritabanına taşınana kadar tarayıcıda.
function adreslerGetir() { return hafizaGetir('lidya-adresler', []); }

// Kullanıcının yazdığı metni sayfaya güvenle koy
const kacir = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Giriş sonrası dönülecek sayfa: sadece bu sitenin sayfaları kabul edilir
function donusAdresi(varsayilan) {
  const donus = new URLSearchParams(location.search).get('donus') || '';
  return /^[a-z]+\.html(#[a-z]+)?$/.test(donus) ? donus : varsayilan;
}

/* ---------- Favoriler ---------- */
function favorilerGetir() { return hafizaGetir('lidya-favoriler', []); }
function favoriMi(id) { return favorilerGetir().includes(id); }
function favoriDegistir(id) {
  const liste = favorilerGetir();
  const eklendi = !liste.includes(id);
  hafizaKaydet('lidya-favoriler', eklendi ? [...liste, id] : liste.filter(f => f !== id));
  favoriSayaciGuncelle();
  return eklendi;
}
function favoriSayaciGuncelle() {
  const adet = favorilerGetir().length;
  document.querySelectorAll('.favori-sayac').forEach(el => {
    el.textContent = adet;
    el.hidden = adet === 0;
  });
}
const IKON_KALP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/></svg>';
function kalpDugmesiHTML(id) {
  const secili = favoriMi(id);
  return `<button class="kalp-dugme${secili ? ' secili' : ''}" data-favori="${id}" aria-pressed="${secili}" aria-label="Favorilere ekle">${IKON_KALP}</button>`;
}

/* ---------- Kayıtlı tasarımlar (Kendi Tasarımını Yap) ---------- */
function tasarimlarGetir() { return hafizaGetir('lidya-tasarimlar', []); }
function tasarimKaydet(tasarim) {
  hafizaKaydet('lidya-tasarimlar', [{ ...tasarim, id: 'ts-' + Date.now() }, ...tasarimlarGetir()]);
}

function bildirim(html) {
  let el = document.querySelector('.bildirim');
  if (!el) {
    el = document.createElement('div');
    el.className = 'bildirim';
    document.body.appendChild(el);
  }
  el.innerHTML = html;
  el.classList.add('gorunur');
  clearTimeout(el.zaman);
  el.zaman = setTimeout(() => el.classList.remove('gorunur'), 3500);
}

/* ---------- Üst kısım ---------- */
const IKON_ETIKET = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1 1 0 0 1 0 1.4l-7.7 7.7a1 1 0 0 1-1.4 0z"/><circle cx="8" cy="8" r="1.5"/></svg>';
function ustKisimHTML() {
  const linkler = [
    ['urunler.html?fiyat=' + SATIS_AYARLARI.uygunHediyeSinirlari[1], 'İnternete Özel Kampanyalar'],
    ['urunler.html?kategori=kolye', 'Kolye'],
    ['urunler.html?kategori=kolyeucu', 'Kolye Ucu'],
    ['urunler.html?kategori=kupe', 'Küpe'],
    ['urunler.html?kategori=yuzuk', 'Yüzük'],
    ['urunler.html?kategori=bileklik', 'Bileklik'],
    ['urunler.html?koleksiyon=dogal-tas', 'Doğal Taş'],
    ['tasarla.html', 'Kendi Tasarımını Yap'],
    ['hakkimizda.html', 'Hakkımızda'],
  ];
  let duyuruKapali = false;
  try { duyuruKapali = sessionStorage.getItem('duyuru-kapali') === '1'; } catch (e) {}

  return `
  ${duyuruKapali ? '' : `<div class="duyuru"><span>${DUYURU}</span><button class="duyuru-kapat" aria-label="Duyuruyu kapat">×</button></div>`}
  <header class="ust">
    <div class="ust-ic">
      <button class="menu-dugme" aria-label="Menüyü aç" aria-expanded="false"><span></span><span></span><span></span></button>
      <a class="logo" href="index.html"><img src="logo/lidya-yazi-koyu.svg" alt="Lidya Kuyumculuk"></a>
      <nav class="menu">
        ${linkler.map(([h, a]) => {
          if (a === 'İnternete Özel Kampanyalar') return `<a href="${h}" class="menu-uygun">${IKON_ETIKET}${a}</a>`;
          return `<a href="${h}"${a === 'Kendi Tasarımını Yap' ? ' class="menu-vurgu"' : ''}>${a}</a>`;
        }).join('')}
      </nav>
      <div class="ust-ikonlar">
        <button class="ikon-dugme arama-dugme" aria-label="Ara" aria-expanded="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/></svg>
        </button>
        <a class="ikon-dugme favori-dugme" href="favoriler.html" aria-label="Favorilerim">
          ${IKON_KALP}
          <span class="favori-sayac" hidden>0</span>
        </a>
        <a class="ikon-dugme sepet-dugme" href="sepet.html" aria-label="Sepet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/></svg>
          <span class="sepet-sayac" hidden>0</span>
        </a>
        <a class="ikon-dugme hesap-dugme${kullaniciGetir() ? ' girisli' : ''}" href="${kullaniciGetir() ? 'hesabim.html' : 'giris.html'}" aria-label="${kullaniciGetir() ? 'Hesabım' : 'Giriş yap / Üye ol'}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.8 20c.8-3.6 3.7-5.6 7.2-5.6s6.4 2 7.2 5.6"/></svg>
        </a>
      </div>
    </div>
    <form class="arama-panel" action="urunler.html" role="search" hidden>
      <input type="search" name="ara" placeholder="Ürün, taş ya da marka arayın…" aria-label="Ara" autocomplete="off">
      <button class="dugme" type="submit">Ara</button>
    </form>
  </header>`;
}

/* ---------- İletişim ikonları ---------- */
const IKON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M8.8 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.7 1.2 1.6 2 2.8 2.6.2.1.4.1.5-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .4-.1 1.1-.6 1.5-.6.5-1.4.7-2.2.5-2.6-.7-4.9-3-5.7-5.6-.2-.8 0-1.6.4-2.1z"/></svg>';
const IKON_TEL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.3a10 10 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z"/></svg>';
const IKON_SAAT_K = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>';
const IKON_INSTAGRAM = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9"/></svg>';
const IKON_KONUM = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>';

/* ---------- Instagram: takipçi sayısı ve çekilişler öne çıksın (güven) ---------- */
const IKON_KISILER = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8.5" r="3.3"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5"/><path d="M15.5 5.6a3.2 3.2 0 0 1 0 6M17.5 14.3c1.8.6 3 2.2 3.4 4.7"/></svg>';
const IKON_HEDIYE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M3 7h18v3H3zM12 7v13"/><path d="M12 7c-1-2.5-4.5-3.5-4.5-1.3S10.5 7 12 7c1.5 0 4.5 0 4.5-1.3S13 4.5 12 7z"/></svg>';
function instagramVurgulariHTML() {
  return `<a class="insta-vurgu" href="${ILETISIM.instagram}" target="_blank" rel="noopener">${IKON_KISILER}<span><strong>${ILETISIM.instagramTakipci}</strong> takipçi</span></a>
    <a class="insta-vurgu cekilis" href="${ILETISIM.instagram}" target="_blank" rel="noopener">${IKON_HEDIYE}<span><strong>Çekilişler</strong> Instagram’da</span></a>`;
}

/* ---------- İletişim bölümü (ana sayfa ve Hakkımızda) ---------- */
function iletisimBolumuHTML() {
  return `
  <div class="iletisim-duzen">
    <div class="iletisim-bilgi">
      <div class="iletisim-satir">${IKON_TEL}<div><span>Telefon</span><a href="${ILETISIM.telefonLink}">${ILETISIM.telefonYazi}</a></div></div>
      <div class="iletisim-satir">${IKON_WA}<div><span>WhatsApp</span><a href="${ILETISIM.whatsappLink}" target="_blank" rel="noopener">${ILETISIM.telefonYazi}</a></div></div>
      <div class="iletisim-satir">${IKON_INSTAGRAM}<div><span>Instagram</span><a href="${ILETISIM.instagram}" target="_blank" rel="noopener">@${ILETISIM.instagramKullanici}</a><small class="insta-not">${ILETISIM.instagramTakipci} takipçi · çekilişler Instagram’da</small></div></div>
      <div class="iletisim-satir">${IKON_SAAT_K}<div><span>Çalışma saatleri</span>
        ${ILETISIM.saatler.map(([gun, saat]) => `<p class="saat-satir"><span>${gun}</span><strong>${saat}</strong></p>`).join('')}</div></div>
      <div class="iletisim-satir">${IKON_KONUM}<div><span>Adres</span><p>${ILETISIM.adres}</p></div></div>
      <div class="iletisim-dugmeler">
        <a class="dugme" href="${ILETISIM.telefonLink}">Hemen Ara</a>
        <a class="dugme dugme-cizgi" href="${ILETISIM.whatsappLink}" target="_blank" rel="noopener">WhatsApp’tan Yaz</a>
      </div>
    </div>
    <div class="harita-alani">
      <iframe class="harita" src="${haritaAdresi()}" title="Lidya Kuyumculuk konumu" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
      <a class="dugme dugme-cizgi" href="${ILETISIM.konum.yolTarifi}" target="_blank" rel="noopener">${IKON_KONUM} Yol tarifi al</a>
    </div>
  </div>`;
}

/* ---------- Alt kısım ---------- */
function altKisimHTML() {
  return `
  <footer class="alt">
    <div class="kap alt-ic">
      <div class="alt-marka">
        <img src="logo/lidya-logo-yuvarlak.svg" alt="" width="64" height="64">
        <p>1989’dan beri Manavgat’ta aile geleneği.<br>Atasay yetkili satış noktası.</p>
      </div>
      <div>
        <h4>İletişim</h4>
        <ul>
          <li>Telefon: <a href="${ILETISIM.telefonLink}">${ILETISIM.telefonYazi}</a></li>
          <li>WhatsApp: <a href="${ILETISIM.whatsappLink}" target="_blank" rel="noopener">${ILETISIM.telefonYazi}</a></li>
          <li>E-posta: ${ILETISIM.eposta}</li>
          <li><a class="alt-instagram" href="${ILETISIM.instagram}" target="_blank" rel="noopener">${IKON_INSTAGRAM} @${ILETISIM.instagramKullanici}</a></li>
          <li class="insta-not">${ILETISIM.instagramTakipci} takipçi · çekilişler Instagram’da</li>
        </ul>
      </div>
      <div>
        <h4>Mağaza</h4>
        <ul>
          <li>${ILETISIM.adres}</li>
          ${ILETISIM.saatler.map(([gun, saat]) => `<li>${gun}: ${saat}</li>`).join('')}
          <li><a class="alt-link" href="${ILETISIM.konum.yolTarifi}" target="_blank" rel="noopener">Yol tarifi al →</a></li>
        </ul>
      </div>
      <div>
        <h4>Alışveriş</h4>
        <ul>
          <li><a href="urunler.html">Tüm ürünler</a></li>
          <li><a href="tasarla.html">Kendi Tasarımını Yap</a></li>
          <li><a href="hakkimizda.html">Hakkımızda</a></li>
          <li><a href="sepet.html">Sepetim</a></li>
          <li><a href="hesabim.html">Hesabım</a></li>
        </ul>
      </div>
      <div>
        <h4>Bilgilendirme</h4>
        <ul class="yasal">
          <li>Mesafeli satış sözleşmesi</li>
          <li>Ön bilgilendirme formu</li>
          <li>İade ve cayma</li>
          <li><a href="kvkk.html">KVKK aydınlatma metni</a></li>
          <li>Çerez politikası</li>
          <li>Kargo bilgileri</li>
        </ul>
      </div>
    </div>
    <p class="alt-not">© Lidya Kuyumculuk · Bu sayfa bir tasarım prototipidir, gerçek satış yapılmaz.</p>
  </footer>
  <a class="wa-yuzen" href="${ILETISIM.whatsappLink}" target="_blank" rel="noopener" aria-label="WhatsApp’tan yazın">${IKON_WA}</a>`;
}

/* ---------- Kaydırınca bölümlerin belirmesi ---------- */
function bolumleriBelirt() {
  const ogeler = document.querySelectorAll('main section, .sayfa-basi, .liste-duzen, .tasarla-duzen');
  if (!('IntersectionObserver' in window)) return;
  const gozcu = new IntersectionObserver(girdiler => {
    girdiler.forEach(g => {
      if (!g.isIntersecting) return;
      g.target.classList.add('gorundu');
      gozcu.unobserve(g.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  ogeler.forEach(el => {
    el.classList.add('belir');
    gozcu.observe(el);
  });
}

/* ---------- Sayfa açılışı ---------- */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('ust').innerHTML = ustKisimHTML();
  document.getElementById('alt').innerHTML = altKisimHTML();

  const menuDugme = document.querySelector('.menu-dugme');
  const menu = document.querySelector('.menu');
  menuDugme.addEventListener('click', () => {
    const acik = menu.classList.toggle('acik');
    menuDugme.setAttribute('aria-expanded', acik);
  });

  // Arama paneli
  const aramaDugme = document.querySelector('.arama-dugme');
  const aramaPanel = document.querySelector('.arama-panel');
  aramaDugme.addEventListener('click', () => {
    aramaPanel.hidden = !aramaPanel.hidden;
    aramaDugme.setAttribute('aria-expanded', !aramaPanel.hidden);
    if (!aramaPanel.hidden) aramaPanel.querySelector('input').focus();
  });

  const kapat = document.querySelector('.duyuru-kapat');
  if (kapat) kapat.addEventListener('click', () => {
    kapat.parentElement.remove();
    try { sessionStorage.setItem('duyuru-kapali', '1'); } catch (e) {}
  });

  // Bulunulan sayfanın menü bağlantısını işaretle
  const burasi = location.pathname.split('/').pop() + location.search;
  menu.querySelectorAll('a').forEach(a => {
    if (a.getAttribute('href') === burasi) a.classList.add('aktif');
  });

  bolumleriBelirt();
  sepetSayaciGuncelle();
  favoriSayaciGuncelle();
});

// Kalp ikonu (ürün kartı ve ürün detayı): tıklanınca dolar, Favorilerim'de görünür
document.addEventListener('click', e => {
  const kalp = e.target.closest('[data-favori]');
  if (!kalp) return;
  e.preventDefault();
  const eklendi = favoriDegistir(kalp.dataset.favori);
  document.querySelectorAll(`[data-favori="${kalp.dataset.favori}"]`).forEach(k => {
    k.classList.toggle('secili', eklendi);
    k.setAttribute('aria-pressed', eklendi);
  });
  bildirim(eklendi ? 'Favorilerinize eklendi. <a href="favoriler.html">Favorilerim →</a>' : 'Favorilerinizden çıkarıldı.');
});
