/* Sepet sayfası (sadece görünüm, ödeme yok) */

function sepetCiz() {
  const sepet = sepetGetir();
  const alan = document.getElementById('sepet');

  if (!sepet.length) {
    alan.innerHTML = `<div class="bos-sepet">
      <p>Sepetiniz şu an boş.</p>
      <a class="dugme" href="urunler.html">Alışverişe Başla</a>
    </div>`;
    return;
  }

  const { araToplam, tasarimVar, kalanTutar, kargo, simdiOdenecek } = sepetToplamlari(sepet);
  const kalan = SATIS_AYARLARI.ucretsizKargoSiniri - araToplam;
  const ilerleme = Math.min(100, Math.round(araToplam / SATIS_AYARLARI.ucretsizKargoSiniri * 100));
  alan.innerHTML = `<div class="sepet-duzen">
    <div>
      ${sepet.map((k, i) => `
        <div class="sepet-kalem">
          ${gorselHTML(k.kategori, k.ton)}
          <div>
            <h3>${k.ad}</h3>
            <p class="detay-yazi">${k.detay}</p>
            <div class="kalem-alt">
              <div class="adet">
                <button data-islem="azalt" data-i="${i}" aria-label="Azalt">−</button>
                <span>${k.adet}</span>
                <button data-islem="artir" data-i="${i}" aria-label="Artır">+</button>
              </div>
              <strong>${k.siparisUsulu ? '≈ ' : ''}${paraYaz(k.fiyat * k.adet)}</strong>
            </div>
            ${k.siparisUsulu ? `<p class="kalem-kapora">Tahmini fiyat · şimdi ödenecek kapora <strong>${paraYaz(k.kapora * k.adet)}</strong></p>` : ''}
            <button class="sil" data-islem="sil" data-i="${i}">Kaldır</button>
          </div>
        </div>`).join('')}
    </div>

    <aside class="ozet">
      <h3>Sipariş Özeti</h3>
      <div class="ozet-satir"><span>Ara toplam${tasarimVar ? ' (tahmini)' : ''}</span><span>${paraYaz(araToplam)}</span></div>
      <div class="ozet-satir"><span>Kargo</span><span>${kargo ? paraYaz(kargo) : '<strong class="ucretsiz">Ücretsiz</strong>'}</span></div>
      <div class="ozet-satir toplam"><span>${tasarimVar ? 'Şimdi ödenecek' : 'Toplam'}</span><span>${paraYaz(simdiOdenecek)}</span></div>
      ${tasarimVar ? `<div class="ozet-satir kalan"><span>Kalan (kesin fiyat tartımdan sonra)</span><span>≈ ${paraYaz(kalanTutar)}</span></div>
      <p class="fiyat-not">Kendi tasarımınız siparişiniz üzerine üretilir. Şimdi kapora alınır; kesin fiyat üretimden sonra tartıma göre bildirilir, kalan tutar kargodan önce ödenir.</p>` : ''}
      <div class="kargo-ilerleme">
        <p>${kalan > 0 ? `Ücretsiz kargoya <strong>${paraYaz(kalan)}</strong> kaldı` : 'Kargonuz ücretsiz ✓'}</p>
        <div class="cubuk"><span style="width:${ilerleme}%"></span></div>
      </div>
      <p class="fiyat-not">En geç 3 iş günü içinde kargoda (özel gün ve pazar hariç).</p>
      ${devamSecenekleriHTML()}
    </aside>
  </div>`;
}

// Ödemeye geçiş: girişliyse doğrudan; değilse Giriş Yap / Üye Ol / Üye olmadan devam et (her zaman görünür)
function devamSecenekleriHTML() {
  const kullanici = kullaniciGetir();
  if (kullanici) {
    return `<a class="dugme dugme-genis" href="odeme.html">Ödemeye Geç</a>
      <p class="devam-not">${kullanici.ad} olarak giriş yaptınız.</p>`;
  }
  return `<div class="devam-secenek">
      <a class="dugme dugme-genis" href="odeme.html?misafir=1">Üye olmadan devam et</a>
      <p class="devam-not">Hesabınız var mı? Giriş yaparak bilgilerinizi otomatik doldurun.</p>
      <div class="devam-ikili">
        <a class="dugme dugme-cizgi" href="giris.html?donus=odeme.html">Giriş Yap</a>
        <a class="dugme dugme-cizgi" href="giris.html?sekme=uye&donus=odeme.html">Üye Ol</a>
      </div>
    </div>`;
}

document.getElementById('sepet').addEventListener('click', e => {
  const dugme = e.target.closest('[data-islem]');
  if (!dugme) return;
  const sepet = sepetGetir();
  const kalem = sepet[dugme.dataset.i];
  if (dugme.dataset.islem === 'artir') kalem.adet += 1;
  if (dugme.dataset.islem === 'azalt') kalem.adet = Math.max(1, kalem.adet - 1);
  if (dugme.dataset.islem === 'sil') sepet.splice(dugme.dataset.i, 1);
  sepetKaydet(sepet);
  sepetCiz();
});

sepetCiz();
