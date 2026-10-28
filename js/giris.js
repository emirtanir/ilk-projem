/* Giriş / Üye ol (PROTOTİP: bilgiler kontrol edilmez, örnek kullanıcıyla giriş yapılmış sayılır) */

const sekmeler = document.querySelectorAll('[data-sekme]');
const formlar = { giris: document.getElementById('giris-form'), uye: document.getElementById('uye-form') };
const BASLIKLAR = {
  giris: ['Hoş geldiniz', 'Siparişlerinizi takip etmek, tasarımlarınızı ve favorilerinizi saklamak için giriş yapın.'],
  uye: ['Üye olun', 'Birkaç bilgiyle hesabınızı oluşturun; siparişleriniz, tasarımlarınız ve adresleriniz tek yerde.'],
};

function sekmeAc(ad) {
  sekmeler.forEach(s => {
    s.classList.toggle('secili', s.dataset.sekme === ad);
    s.setAttribute('aria-selected', s.dataset.sekme === ad);
  });
  Object.entries(formlar).forEach(([k, f]) => { f.hidden = k !== ad; });
  document.getElementById('giris-baslik').textContent = BASLIKLAR[ad][0];
  document.getElementById('giris-not').textContent = BASLIKLAR[ad][1];
}
sekmeler.forEach(s => s.addEventListener('click', () => sekmeAc(s.dataset.sekme)));
if (new URLSearchParams(location.search).get('sekme') === 'uye') sekmeAc('uye');

// Bekleyen tasarım varsa kullanıcıya neden giriş istendiğini söyle
if (hafizaGetir('lidya-bekleyen-tasarim', null)) {
  document.getElementById('giris-not').textContent = 'Tasarımınızı kaydetmek için giriş yapın ya da üye olun. Tasarımınız hesabınıza otomatik eklenecek.';
}

function tamamla(bilgiler, mesaj) {
  girisYap(bilgiler);
  try { sessionStorage.setItem('lidya-giris-mesaji', mesaj); } catch (e) {}
  location.href = donusAdresi('hesabim.html');
}

formlar.giris.addEventListener('submit', e => {
  e.preventDefault();
  tamamla({ eposta: formlar.giris.eposta.value.trim() }, 'Giriş yapıldı.');
});

formlar.uye.addEventListener('submit', e => {
  e.preventDefault();
  const f = formlar.uye;
  const izin = f.izin.checked;
  tamamla({ ad: f.ad.value.trim(), eposta: f.eposta.value.trim(), telefon: f.telefon.value.trim(), izinSms: izin, izinEposta: izin },
    'Üyeliğiniz oluşturuldu. Hoş geldiniz!');
});

document.getElementById('google').addEventListener('click', () => tamamla({}, 'Google hesabınızla giriş yapıldı.'));

document.getElementById('sifre-unuttum').addEventListener('click', () => {
  const panel = document.getElementById('sifre-panel');
  panel.hidden = !panel.hidden;
});
document.getElementById('sifre-gonder').addEventListener('click', () => {
  const eposta = formlar.giris.eposta;
  if (!eposta.value || !eposta.checkValidity()) { eposta.reportValidity(); return; }
  document.getElementById('sifre-panel').hidden = true;
  bildirim(`Şifre yenileme bağlantısı <strong>${eposta.value.replace(/[<>&"]/g, '')}</strong> adresine gönderildi.`);
});

// Üye olmadan devam et: sepette ürün varsa doğrudan ödemeye, yoksa ürünlere
document.getElementById('misafir').href = sepetGetir().length ? 'odeme.html?misafir=1' : 'urunler.html';
