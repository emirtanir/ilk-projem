/* Giriş / Üye ol / Şifre yenileme — Supabase Auth (js/supabase.js) */

const sekmeler = document.querySelectorAll('[data-sekme]');
const formlar = {
  giris: document.getElementById('giris-form'),
  uye: document.getElementById('uye-form'),
  yeniSifre: document.getElementById('yeni-sifre-form'),
};
const BASLIKLAR = {
  giris: ['Hoş geldiniz', 'Siparişlerinizi takip etmek, tasarımlarınızı ve favorilerinizi saklamak için giriş yapın.'],
  uye: ['Üye olun', 'Birkaç bilgiyle hesabınızı oluşturun; siparişleriniz, tasarımlarınız ve adresleriniz tek yerde.'],
};
const parametre = new URLSearchParams(location.search);

function basligiYaz(baslik, not) {
  document.getElementById('giris-baslik').textContent = baslik;
  document.getElementById('giris-not').textContent = not;
}

// Sadece istenen paneli göster (giriş, üye ol, doğrulama bekleniyor, yeni şifre)
function panelAc(ad) {
  const sekmeli = ad === 'giris' || ad === 'uye';
  document.querySelector('.form-sekmeler').hidden = !sekmeli;
  document.getElementById('giris-alt').hidden = !sekmeli;
  formlar.giris.hidden = ad !== 'giris';
  formlar.uye.hidden = ad !== 'uye';
  formlar.yeniSifre.hidden = ad !== 'yeniSifre';
  document.getElementById('dogrulama-panel').hidden = ad !== 'dogrulama';
  if (sekmeli) {
    sekmeler.forEach(s => {
      s.classList.toggle('secili', s.dataset.sekme === ad);
      s.setAttribute('aria-selected', s.dataset.sekme === ad);
    });
    basligiYaz(...BASLIKLAR[ad]);
  }
}
sekmeler.forEach(s => s.addEventListener('click', () => panelAc(s.dataset.sekme)));
if (parametre.get('sekme') === 'uye') panelAc('uye');

// Bekleyen tasarım varsa kullanıcıya neden giriş istendiğini söyle
if (hafizaGetir('lidya-bekleyen-tasarim', null)) {
  document.getElementById('giris-not').textContent = 'Tasarımınızı kaydetmek için giriş yapın ya da üye olun. Tasarımınız hesabınıza otomatik eklenecek.';
}

/* ---------- Yardımcılar ---------- */
function mesajYaz(form, metin, tur = 'hata') {
  const el = form.querySelector('[data-mesaj]');
  el.textContent = metin || '';
  el.className = 'form-mesaj ' + tur;
  el.hidden = !metin;
}
// İşlem sürerken butonu kilitle ("Lütfen bekleyin…")
async function bekleyerek(form, is) {
  const dugme = form.querySelector('[type=submit]');
  const eski = dugme.textContent;
  dugme.disabled = true;
  dugme.textContent = 'Lütfen bekleyin…';
  try { await is(); } finally { dugme.disabled = false; dugme.textContent = eski; }
}
function baglantiYoksa(form) {
  if (sb) return false;
  mesajYaz(form, 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip sayfayı yenileyin.');
  return true;
}
function tamamla(user, mesaj) {
  girisYap(kullaniciBilgisi(user));
  try { sessionStorage.setItem('lidya-giris-mesaji', mesaj); } catch (e) {}
  location.href = donusAdresi('hesabim.html');
}

/* ---------- Giriş ---------- */
formlar.giris.addEventListener('submit', e => {
  e.preventDefault();
  const f = formlar.giris;
  if (baglantiYoksa(f)) return;
  mesajYaz(f, '');
  bekleyerek(f, async () => {
    const { data, error } = await sb.auth.signInWithPassword({ email: f.eposta.value.trim(), password: f.sifre.value });
    if (error) return mesajYaz(f, hataMesaji(error));
    tamamla(data.user, 'Giriş yapıldı.');
  });
});

/* ---------- Üye ol ---------- */
formlar.uye.addEventListener('submit', e => {
  e.preventDefault();
  const f = formlar.uye;
  if (baglantiYoksa(f)) return;
  mesajYaz(f, '');
  const simdi = new Date().toISOString();
  const izin = f.izin.checked;
  bekleyerek(f, async () => {
    const { data, error } = await sb.auth.signUp({
      email: f.eposta.value.trim(),
      password: f.sifre.value,
      options: {
        // Onayların ne zaman verildiği de saklanır (KVKK / İYS için kayıt)
        data: { ad: f.ad.value.trim(), telefon: f.telefon.value.trim(), kvkkOnayTarihi: simdi,
          izinSms: izin, izinEposta: izin, izinTarihi: izin ? simdi : null },
        emailRedirectTo: SITE_ADRESI + 'giris.html?dogrulandi=1&donus=' + encodeURIComponent(donusAdresi('hesabim.html')),
      },
    });
    if (error) return mesajYaz(f, hataMesaji(error));
    // E-posta doğrulaması kapalıysa oturum hemen açılır; açıksa doğrulama beklenir
    if (data.session) return tamamla(data.user, 'Üyeliğiniz oluşturuldu. Hoş geldiniz!');
    document.getElementById('dogrulama-eposta').textContent = f.eposta.value.trim();
    basligiYaz('Neredeyse tamam', 'Hesabınızı açmak için son bir adım kaldı.');
    panelAc('dogrulama');
  });
});

/* ---------- Şifremi unuttum ---------- */
document.getElementById('sifre-unuttum').addEventListener('click', () => {
  const panel = document.getElementById('sifre-panel');
  panel.hidden = !panel.hidden;
});
document.getElementById('sifre-gonder').addEventListener('click', async e => {
  const f = formlar.giris;
  const eposta = f.eposta;
  if (!eposta.value || !eposta.checkValidity()) { eposta.reportValidity(); return; }
  if (baglantiYoksa(f)) return;
  e.target.disabled = true;
  const { error } = await sb.auth.resetPasswordForEmail(eposta.value.trim(), { redirectTo: SITE_ADRESI + 'giris.html' });
  e.target.disabled = false;
  if (error) return mesajYaz(f, hataMesaji(error));
  document.getElementById('sifre-panel').hidden = true;
  mesajYaz(f, `Şifre yenileme bağlantısı ${eposta.value.trim()} adresine gönderildi. Gelen kutunuzu kontrol edin.`, 'bilgi');
});

/* ---------- Şifre yenileme bağlantısıyla gelindiyse: yeni şifre ---------- */
function yeniSifreAc() {
  basligiYaz('Şifre yenileme', 'Hesabınız için yeni bir şifre belirleyin.');
  panelAc('yeniSifre');
}
if (SIFRE_YENILEME_LINKI) yeniSifreAc();
if (sb) sb.auth.onAuthStateChange(olay => { if (olay === 'PASSWORD_RECOVERY') yeniSifreAc(); });

formlar.yeniSifre.addEventListener('submit', e => {
  e.preventDefault();
  const f = formlar.yeniSifre;
  if (f.yeni.value !== f.tekrar.value) return mesajYaz(f, 'Yeni şifreler aynı değil.');
  if (baglantiYoksa(f)) return;
  bekleyerek(f, async () => {
    const { data, error } = await sb.auth.updateUser({ password: f.yeni.value });
    if (error) return mesajYaz(f, hataMesaji(error));
    tamamla(data.user, 'Şifreniz güncellendi.');
  });
});

/* ---------- E-posta doğrulama bağlantısıyla gelindiyse ---------- */
oturumHazir.then(() => {
  const kullanici = kullaniciGetir();
  if (kullanici && parametre.get('dogrulandi') && !SIFRE_YENILEME_LINKI) {
    try { sessionStorage.setItem('lidya-giris-mesaji', 'E-postanız doğrulandı, hesabınız açıldı. Hoş geldiniz!'); } catch (e) {}
    location.replace(donusAdresi('hesabim.html'));
  }
});

/* ---------- Google ---------- */
document.getElementById('google').addEventListener('click', async () => {
  if (!sb || !SUPABASE_AYAR.googleGirisAcik) {
    bildirim('Google ile giriş yakında açılacak. Şimdilik e-posta ile giriş yapabilir ya da üye olabilirsiniz.');
    return;
  }
  await sb.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: SITE_ADRESI + donusAdresi('hesabim.html') } });
});

// Üye olmadan devam et: sepette ürün varsa doğrudan ödemeye, yoksa ürünlere
document.getElementById('misafir').href = sepetGetir().length ? 'odeme.html?misafir=1' : 'urunler.html';
