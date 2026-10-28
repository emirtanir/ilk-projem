/* =========================================================
   SUPABASE BAĞLANTISI — hesaplar (giriş, üyelik, şifre).
   Proje adresi ve publishable anahtar AÇIK bilgidir, sitede durabilir.
   Secret (service_role) anahtarı ASLA buraya ya da repoya yazılmaz.
   ========================================================= */

const SUPABASE_AYAR = {
  adres: 'https://ivmmylsmpybaxyqqjbbx.supabase.co',
  anahtar: 'sb_publishable_OZdmacEsw73ZjyUmW0KARQ_4GDItffr',
  googleGirisAcik: false,   // Supabase'de Google girişi ayarlanınca true yapılacak
};

// Site adresi: e-posta doğrulama ve şifre yenileme bağlantıları buraya döner.
// Bilgisayardan (file://) açılınca bağlantılar yayındaki siteye gider.
const SITE_ADRESI = location.protocol.startsWith('http')
  ? location.href.replace(/[^/]*([?#].*)?$/, '')
  : 'https://emirtanir.github.io/ilk-projem/';

// Şifre yenileme bağlantısıyla mı gelindi? (Supabase adresteki bilgiyi okuyup sildiği için hemen bakılır)
const SIFRE_YENILEME_LINKI = /type=recovery/.test(location.hash + location.search);

// Kütüphane yüklenemezse (internet yok vb.) sb boş kalır; sayfalar bunu kontrol eder
const sb = window.supabase ? window.supabase.createClient(SUPABASE_AYAR.adres, SUPABASE_AYAR.anahtar) : null;

// Supabase hata mesajlarını Türkçeye çevir
function hataMesaji(hata) {
  const m = (hata && hata.message) || '';
  if (/invalid login credentials/i.test(m)) return 'E-posta ya da şifre hatalı.';
  if (/email not confirmed/i.test(m)) return 'E-posta adresinizi henüz doğrulamadınız. Gelen kutunuzdaki doğrulama bağlantısına tıklayın.';
  if (/already registered|already exists/i.test(m)) return 'Bu e-posta adresiyle zaten bir hesap var. Giriş yapmayı deneyin.';
  if (/password should be at least|weak password/i.test(m)) return 'Şifre çok kısa ya da zayıf. En az 6 karakter kullanın.';
  if (/rate limit|too many|security purposes/i.test(m)) return 'Çok fazla deneme yapıldı. Lütfen birkaç dakika sonra tekrar deneyin.';
  if (/same.*password|different from the old/i.test(m)) return 'Yeni şifre eskisiyle aynı olamaz.';
  if (/unable to validate email|invalid.*email/i.test(m)) return 'E-posta adresi geçersiz görünüyor.';
  if (/not authorized/i.test(m)) return 'Bu e-posta adresine şu an doğrulama e-postası gönderilemiyor. Lütfen daha sonra tekrar deneyin ya da WhatsApp’tan bize yazın.';
  if (/failed to fetch|network/i.test(m)) return 'Bağlantı kurulamadı. İnternet bağlantınızı kontrol edin.';
  return 'Bir sorun oluştu. Lütfen tekrar deneyin.';
}
