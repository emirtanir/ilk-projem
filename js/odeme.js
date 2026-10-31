/* Ödeme ve sipariş tamamlandı (PROTOTİP: ödeme alınmaz, sipariş kaydedilmez) */

const sepet = sepetGetir();
const kullanici = kullaniciGetir();
const alan = document.getElementById('odeme');
if (!sepet.length) location.replace('sepet.html');

function adresAlanlariHTML() {
  return `<div class="alan-cift">
      <label class="alan">İl <input class="metin-girdi" name="il" autocomplete="address-level1" required></label>
      <label class="alan">İlçe <input class="metin-girdi" name="ilce" autocomplete="address-level2" required></label>
    </div>
    <label class="alan">Açık adres <textarea class="metin-girdi" name="adres" rows="3" autocomplete="street-address" required></textarea></label>`;
}

function odemeCiz() {
  const { araToplam, tasarimVar, kalanTutar, kargo, simdiOdenecek } = sepetToplamlari(sepet);
  const adresler = kullanici ? adreslerGetir() : [];
  const k = kullanici || {};

  alan.innerHTML = `<form class="sepet-duzen" id="odeme-form">
    <div class="odeme-adimlar">
      ${kullanici ? '' : `<p class="misafir-bilgi">Üye olmadan devam ediyorsunuz. <a href="giris.html?donus=odeme.html">Giriş yap</a></p>`}

      <section class="hesap-kart hesap-form">
        <h3>İletişim bilgileri</h3>
        <label class="alan">Ad soyad <input class="metin-girdi" name="ad" autocomplete="name" value="${kacir(k.ad || '')}" required></label>
        <label class="alan">E-posta <input class="metin-girdi" type="email" name="eposta" autocomplete="email" inputmode="email" value="${kacir(k.eposta || '')}" required>
          <span class="girdi-not">Sipariş ve kargo bilgileri bu adrese gönderilir.</span></label>
        <label class="alan">Telefon <input class="metin-girdi" type="tel" name="telefon" autocomplete="tel" inputmode="tel" value="${kacir(k.telefon || '')}" placeholder="05xx xxx xx xx" required></label>
      </section>

      <section class="hesap-kart hesap-form">
        <h3>Teslimat adresi</h3>
        ${adresler.length ? `<div class="adres-sec">
            ${adresler.map((a, i) => `<label class="adres-secenek">
              <input type="radio" name="kayitliAdres" value="${i}" ${i === 0 ? 'checked' : ''}>
              <span><strong>${kacir(a.baslik)}</strong>${kacir(a.adres)}, ${kacir(a.ilce)} / ${kacir(a.il)}</span>
            </label>`).join('')}
            <label class="adres-secenek"><input type="radio" name="kayitliAdres" value="yeni"><span><strong>Yeni adres</strong>Başka bir adrese gönder</span></label>
          </div>
          <div id="yeni-adres" hidden>${adresAlanlariHTML()}</div>`
        : adresAlanlariHTML()}
      </section>

      <!-- Hediye olarak gönderim: alıcının bilgileri ayrı girilir -->
      <section class="hesap-kart hesap-form">
        <label class="onay hediye-adres-kutu">
          <input type="checkbox" id="hediye-gonder">
          <span><strong>Farklı bir adrese hediye olarak gönder</strong></span>
        </label>
        <div class="hediye-alici" id="hediye-alici" hidden>
          <p class="girdi-not">Sipariş bilgileri ve fatura size gönderilir; pakette fiyat bilgisi yer almaz.</p>
          <label class="alan">Alıcının adı soyadı <input class="metin-girdi" name="aliciAd" autocomplete="off" disabled required></label>
          <label class="alan">Alıcının telefonu <input class="metin-girdi" type="tel" name="aliciTelefon" inputmode="tel" autocomplete="off" placeholder="05xx xxx xx xx" disabled required></label>
          <div class="alan-cift">
            <label class="alan">İl <input class="metin-girdi" name="aliciIl" autocomplete="off" disabled required></label>
            <label class="alan">İlçe <input class="metin-girdi" name="aliciIlce" autocomplete="off" disabled required></label>
          </div>
          <label class="alan">Alıcının açık adresi <textarea class="metin-girdi" name="aliciAdres" rows="3" autocomplete="off" disabled required></textarea></label>
        </div>
      </section>

      <section class="hesap-kart">
        <h3>Ödeme</h3>
        <div class="prototip-uyari">Kart bilgileri ödeme şirketinin güvenli sayfasında alınır. Bu prototipte ödeme adımı bulunmuyor.</div>
        <!-- Siparişten önce ön bilgilendirme formu ve mesafeli satış sözleşmesi (siparişin bilgileriyle doldurulur) -->
        <div class="sozlesmeler">
          <details class="sozlesme-kutu">
            <summary>Ön Bilgilendirme Formu</summary>
            <div class="yasal-metin sozlesme-metin" data-sozlesme="onBilgilendirme"></div>
          </details>
          <details class="sozlesme-kutu">
            <summary>Mesafeli Satış Sözleşmesi</summary>
            <div class="yasal-metin sozlesme-metin" data-sozlesme="mesafeliSatis"></div>
          </details>
        </div>
        <label class="onay">
          <input type="checkbox" name="sozlesmeOnay" required>
          <span>Ön bilgilendirme formunu ve mesafeli satış sözleşmesini okudum, onaylıyorum</span>
        </label>
      </section>
    </div>

    <aside class="ozet">
      <h3>Sipariş Özeti</h3>
      <ul class="odeme-kalemler">
        ${sepet.map(s => `<li><span>${s.adet > 1 ? s.adet + ' × ' : ''}${s.ad}<small>${s.detay}</small>${s.hediye && s.hediye.paket
          ? `<small class="ozet-hediye">Hediye paketi · Ücretsiz${s.hediye.not ? ` · Not: “${kacir(s.hediye.not)}”` : ''}</small>` : ''}</span><span>${s.siparisUsulu ? '≈ ' : ''}${paraYaz(s.fiyat * s.adet)}</span></li>`).join('')}
      </ul>
      <div class="ozet-satir"><span>Ara toplam${tasarimVar ? ' (tahmini)' : ''}</span><span>${paraYaz(araToplam)}</span></div>
      <div class="ozet-satir"><span>Kargo</span><span>${kargo ? paraYaz(kargo) : '<strong class="ucretsiz">Ücretsiz</strong>'}</span></div>
      <div class="ozet-satir toplam"><span>${tasarimVar ? 'Şimdi ödenecek' : 'Toplam'}</span><span>${paraYaz(simdiOdenecek)}</span></div>
      ${tasarimVar ? `<div class="ozet-satir kalan"><span>Kalan (kesin fiyat tartımdan sonra)</span><span>≈ ${paraYaz(kalanTutar)}</span></div>` : ''}
      <button class="dugme dugme-genis" type="submit">Siparişi Onayla ve Öde</button>
      <a class="metin-link" href="sepet.html">← Sepete dön</a>
    </aside>
  </form>`;
}

/* ---------- Ön bilgilendirme formu ve mesafeli satış sözleşmesi ----------
   Metinler js/yasal-metinler.js'ten gelir (yasal/*.md'den üretilir). {{ALAN}} etiketleri siparişin
   bilgileriyle doldurulur; henüz girilmemiş bilgiler gri etiket olarak kalır. */
function siparisAlanlari() {
  const f = document.getElementById('odeme-form');
  const deger = ad => (f[ad] && !f[ad].disabled ? f[ad].value.trim() : '');
  const adresYaz = (adres, ilce, il) => [adres, [ilce, il].filter(Boolean).join(' / ')].filter(Boolean).join(', ');
  // Teslimat adresi: kayıtlı adres seçiliyse o, değilse yazılan adres
  const secili = f.querySelector('[name=kayitliAdres]:checked');
  const kayitli = secili && secili.value !== 'yeni' ? adreslerGetir()[secili.value] : null;
  const aliciAdresi = kayitli ? adresYaz(kayitli.adres, kayitli.ilce, kayitli.il) : adresYaz(deger('adres'), deger('ilce'), deger('il'));
  const hediye = f.querySelector('#hediye-gonder').checked;
  const teslimAdresi = hediye ? adresYaz(deger('aliciAdres'), deger('aliciIlce'), deger('aliciIl')) : aliciAdresi;
  const teslimAlan = hediye ? deger('aliciAd') : deger('ad');
  const { araToplam, kargo, tasarimVar, simdiOdenecek } = sepetToplamlari(sepet);
  const hediyePaketi = sepet.some(s => s.hediye && s.hediye.paket);
  const urunTablosu = `<table class="sozlesme-urunler"><thead><tr><th>Ürün</th><th>Kod</th><th>Ayrıntı</th><th>Adet</th><th>Tutar (KDV dahil)</th></tr></thead><tbody>
    ${sepet.map(s => `<tr><td>${kacir(s.ad)}</td><td>${kacir(s.kod || '—')}</td><td>${kacir(s.detay)}${s.hediye && s.hediye.paket ? ' · Hediye paketi' : ''}</td><td>${s.adet}</td><td>${s.siparisUsulu ? '≈ ' : ''}${paraYaz(s.fiyat * s.adet)}</td></tr>`).join('')}
  </tbody></table>`;
  return {
    'ÜRÜN_TABLOSU': urunTablosu,
    ARA_TOPLAM: paraYaz(araToplam),
    KARGO_UCRETI: kargo ? paraYaz(kargo) : 'Ücretsiz',
    TOPLAM_TUTAR: paraYaz(araToplam + kargo) + (tasarimVar ? ` (kişiye özel ürünlerde tahmini; şimdi ödenecek: ${paraYaz(simdiOdenecek)})` : ''),
    HEDIYE_PAKETI: hediyePaketi ? 'Var' : 'Yok',
    ODEME_YONTEMI: 'kredi kartı / banka kartı',
    SIPARIS_TARIHI: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    ALICI_AD_SOYAD: deger('ad'), ALICI_ADI: teslimAlan, ALICI_EPOSTA: deger('eposta'), ALICI_TELEFON: deger('telefon'),
    ALICI_ADRES: aliciAdresi, TESLIM_ALAN: teslimAlan, TESLIMAT_ADRESI: teslimAdresi,
  };
}
function sozlesmeleriDoldur() {
  if (typeof YASAL_METINLER === 'undefined') return;
  const alanlar = siparisAlanlari();
  document.querySelectorAll('[data-sozlesme]').forEach(kap => {
    if (!kap.dataset.hazir) { kap.innerHTML = YASAL_METINLER[kap.dataset.sozlesme]; kap.dataset.hazir = '1'; }
    kap.querySelectorAll('.otomatik[data-alan]').forEach(etiket => {
      const d = alanlar[etiket.dataset.alan];
      etiket.classList.toggle('dolu', !!d);
      if (d) etiket.innerHTML = etiket.dataset.alan === 'ÜRÜN_TABLOSU' ? d : kacir(d);
      else etiket.textContent = `{{${etiket.dataset.alan}}}`;
    });
  });
}

function tamamlandiCiz(bilgi) {
  const no = 'LDY-' + String(Date.now()).slice(-5);
  const tasarimVar = sepet.some(s => s.siparisUsulu);
  document.getElementById('odeme-bas').hidden = true;
  alan.innerHTML = `<div class="tamamlandi">
    <div class="tamam-isaret" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.5l4 4 8-9"/></svg></div>
    <h1>Siparişiniz alındı</h1>
    <p>Sipariş numaranız <strong>${no}</strong>. Sipariş özetini <strong>${kacir(bilgi.eposta)}</strong> adresine gönderdik.</p>
    ${bilgi.hediyeAlici ? `<p class="tamam-not">Hediyeniz <strong>${kacir(bilgi.hediyeAlici)}</strong> için belirttiğiniz adrese gönderilecek. Pakette fiyat bilgisi yer almaz.</p>` : ''}
    <p class="tamam-not">En geç 3 iş günü içinde kargoda (özel gün ve pazar hariç).${tasarimVar ? ' Kendi tasarımınızın kesin fiyatını üretimden sonra size bildireceğiz.' : ''}</p>

    ${kullanici ? `<div class="tamam-dugmeler">
        <a class="dugme" href="hesabim.html#siparisler">Siparişlerime git</a>
        <a class="dugme dugme-cizgi" href="urunler.html">Alışverişe devam et</a>
      </div>`
    : `<form class="hesap-kart hesap-form hesap-oneri" id="oneri-form">
        <h3>Bilgilerinizi kaydedip hesap oluşturun</h3>
        <p>Siparişinizi takip edin, bir dahaki alışverişte bilgileriniz hazır olsun. Sadece bir şifre belirlemeniz yeterli.</p>
        <p class="oneri-eposta">${kacir(bilgi.ad)} · ${kacir(bilgi.eposta)}</p>
        <label class="alan">Şifre <input class="metin-girdi" type="password" name="sifre" autocomplete="new-password" minlength="6" required>
          <span class="girdi-not">En az 6 karakter.</span></label>
        <label class="onay"><input type="checkbox" required>
          <span><a href="kvkk.html" target="_blank" rel="noopener">KVKK Aydınlatma Metni</a>’ni okudum. <em>(zorunlu)</em></span></label>
        <label class="onay"><input type="checkbox" name="izin">
          <span>Kampanya, çekiliş ve yeniliklerden SMS/e-posta ile haberdar olmak istiyorum.</span></label>
        <p class="form-mesaj" data-mesaj hidden></p>
        <button class="dugme dugme-genis" type="submit">Hesap oluştur</button>
      </form>
      <a class="metin-link" href="urunler.html">Hayır teşekkürler, alışverişe devam et</a>`}
  </div>`;

  const oneri = document.getElementById('oneri-form');
  // Misafir siparişinden sonra hesap: Supabase'de üyelik (e-posta doğrulaması gerekebilir)
  if (oneri) oneri.addEventListener('submit', async e => {
    e.preventDefault();
    const mesaj = oneri.querySelector('[data-mesaj]');
    const goster = (metin, tur = 'hata') => { mesaj.textContent = metin; mesaj.className = 'form-mesaj ' + tur; mesaj.hidden = false; };
    if (!sb) return goster(hataMesaji({ message: 'network' }));
    const dugme = oneri.querySelector('[type=submit]');
    dugme.disabled = true;
    const simdi = new Date().toISOString();
    const izin = oneri.izin.checked;
    const { data, error } = await sb.auth.signUp({
      email: bilgi.eposta, password: oneri.sifre.value,
      options: {
        data: { ad: bilgi.ad, telefon: bilgi.telefon, kvkkOnayTarihi: simdi, izinSms: izin, izinEposta: izin, izinTarihi: izin ? simdi : null },
        emailRedirectTo: SITE_ADRESI + 'giris.html?dogrulandi=1&donus=' + encodeURIComponent('hesabim.html#siparisler'),
      },
    });
    dugme.disabled = false;
    if (error) return goster(hataMesaji(error));
    if (data.session) {
      girisYap(kullaniciBilgisi(data.user));
      try { sessionStorage.setItem('lidya-giris-mesaji', 'Hesabınız oluşturuldu. Siparişinizi buradan takip edebilirsiniz.'); } catch (err) {}
      location.href = 'hesabim.html#siparisler';
      return;
    }
    oneri.querySelectorAll('input, button').forEach(g => { g.disabled = true; });
    goster(`Son bir adım: ${bilgi.eposta} adresine doğrulama bağlantısı gönderdik. Bağlantıya tıklayınca hesabınız açılır.`, 'bilgi');
  });
  window.scrollTo(0, 0);
}

if (sepet.length) {
  odemeCiz();

  alan.addEventListener('change', e => {
    // Hediye olarak gönder: alıcı alanları açılır ve zorunlu olur
    if (e.target.id === 'hediye-gonder') {
      const alici = document.getElementById('hediye-alici');
      alici.hidden = !e.target.checked;
      alici.querySelectorAll('input, textarea').forEach(g => { g.disabled = alici.hidden; });
      return;
    }
    if (e.target.name !== 'kayitliAdres') return;
    const yeni = document.getElementById('yeni-adres');
    yeni.hidden = e.target.value !== 'yeni';
    yeni.querySelectorAll('input, textarea').forEach(g => { g.disabled = yeni.hidden; });
  });
  // Kayıtlı adres seçiliyken gizli yeni adres alanları formu engellemesin
  alan.querySelectorAll('#yeni-adres input, #yeni-adres textarea').forEach(g => { g.disabled = true; });

  // Sözleşme metinleri: formdaki bilgiler değiştikçe yeniden doldurulur
  sozlesmeleriDoldur();
  alan.addEventListener('input', sozlesmeleriDoldur);
  alan.addEventListener('change', sozlesmeleriDoldur);

  alan.addEventListener('submit', e => {
    if (e.target.id !== 'odeme-form') return;
    e.preventDefault();
    // Onay kutusu işaretlenmeden sipariş verilemez (tarayıcı da "required" ile engeller)
    if (!e.target.sozlesmeOnay.checked) { e.target.sozlesmeOnay.reportValidity(); return; }
    const f = e.target;
    const bilgi = { ad: f.ad.value.trim(), eposta: f.eposta.value.trim(), telefon: f.telefon.value.trim(),
      hediyeAlici: f.querySelector('#hediye-gonder').checked ? f.aliciAd.value.trim() : '' };
    sepetKaydet([]);
    tamamlandiCiz(bilgi);
  });
}
