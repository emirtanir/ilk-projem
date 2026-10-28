/* Kendi Tasarımını Yap: adım adım seçim, anında önizleme ve fiyat.
   Gram/işçilik değerleri ve formül js/fiyat.js içinde. */

const durum = {
  tur: 'isim',
  isim: { isim: 'Çağla', ayar: '14', zincir: '45' },
  harf: { harf: 'E', ayar: '14' },
  lazer: { foto: null, dosyaAdi: '', sekil: 'kalp', ayar: '14' },
};

const HARFLER = 'A B C Ç D E F G H I İ J K L M N O Ö P R S Ş T U Ü V Y Z'.split(' ');

/* ---------- Adımlar ---------- */
function secenekDugmeleri(alan, liste, secili, icerik) {
  return Object.entries(liste).map(([d, v]) =>
    `<button class="secenek ${d === secili ? 'secili' : ''}" data-alan="${alan}" data-deger="${d}">${icerik ? icerik(d, v) : v}</button>`
  ).join('');
}
function adim(no, baslik, icerik) {
  return `<div class="adim"><div class="adim-baslik"><span class="adim-no">${no}</span><h3>${baslik}</h3></div>${icerik}</div>`;
}
function ayarAdimi(no, s) {
  return adim(no, 'Ayar seçin', `<div class="secenekler" style="grid-template-columns:repeat(2,1fr)">
    ${secenekDugmeleri('ayar', { 14: '14 ayar', 22: '22 ayar' }, s.ayar, (d, v) => `<big>${d}</big>ayar`)}</div>`);
}

function adimlariCiz() {
  const s = durum[durum.tur];
  let html = '';
  if (durum.tur === 'isim') {
    html =
      adim(1, 'İsim girin', `<input class="metin-girdi" id="isim-girdi" value="${s.isim}" maxlength="10" placeholder="Örn. Çağla" autocomplete="off">
        <p class="girdi-not">En fazla 10 harf. Türkçe karakterler kullanılabilir.</p>`) +
      ayarAdimi(2, s) +
      adim(3, 'Zincir uzunluğu', `<div class="secenekler">
        ${secenekDugmeleri('zincir', { 40: '40 cm', 45: '45 cm', 50: '50 cm' }, s.zincir, (d) => `<big>${d}</big>cm`)}</div>`);
  } else if (durum.tur === 'harf') {
    html =
      adim(1, 'Harf seçin', `<div class="harf-izgara">
        ${HARFLER.map(h => `<button class="secenek ${h === s.harf ? 'secili' : ''}" data-alan="harf" data-deger="${h}">${h}</button>`).join('')}</div>`) +
      ayarAdimi(2, s) +
      '<p class="girdi-not">45 cm zincir dahildir.</p>';
  } else {
    html =
      adim(1, 'Fotoğraf yükleyin', `<label class="yukle-alan">
          <input type="file" accept="image/*" id="foto-girdi">
          <strong>${s.foto ? 'Fotoğraf yüklendi ✓' : 'Fotoğraf seçin'}</strong>
          <span class="girdi-not">${s.foto ? s.dosyaAdi + ' · değiştirmek için dokunun' : 'Telefonunuzdan ya da bilgisayarınızdan'}</span>
        </label>
        <div class="onay-notu wa-onay">${IKON_WA}<span>Fotoğrafınızın önizlemesini üretimden önce WhatsApp'tan onayınıza sunacağız.</span></div>`) +
      adim(2, 'Plaka şekli seçin', `<div class="secenekler">${secenekDugmeleri('sekil', SEKILLER, s.sekil)}</div>`) +
      ayarAdimi(3, s) +
      '<p class="girdi-not">45 cm zincir dahildir.</p>';
  }
  document.getElementById('adimlar').innerHTML = html;
}

/* ---------- Geçişler ---------- */
const hareketAz = matchMedia('(prefers-reduced-motion: reduce)').matches;
let gosterilenFiyat = null;
let fiyatKaresi = null;

// Animasyon sınıfını yeniden başlat
function gecisOynat(el, sinif) {
  el.classList.remove(sinif);
  void el.offsetWidth;
  el.classList.add(sinif);
}

// Tahmini fiyatı eski değerden yenisine yumuşakça say (0,4 sn); alt çubuk ve fiyat kutusu birlikte
function fiyatGoster(yeni) {
  const alanlar = document.querySelectorAll('.tahmini-fiyat');
  const yaz = deger => alanlar.forEach(a => { a.textContent = '≈ ' + paraYaz(deger); });
  cancelAnimationFrame(fiyatKaresi);
  if (hareketAz || gosterilenFiyat === null || gosterilenFiyat === yeni) {
    yaz(yeni);
    gosterilenFiyat = yeni;
    return;
  }
  const eski = gosterilenFiyat;
  const baslangic = performance.now();
  alanlar.forEach(a => gecisOynat(a, 'fiyat-gecis'));
  const kare = simdi => {
    const t = Math.min(1, (simdi - baslangic) / 400);
    const deger = Math.round((eski + (yeni - eski) * (1 - Math.pow(1 - t, 3))) / 10) * 10;
    yaz(deger);
    gosterilenFiyat = t < 1 ? deger : yeni;
    if (t < 1) fiyatKaresi = requestAnimationFrame(kare);
  };
  fiyatKaresi = requestAnimationFrame(kare);
}

/* ---------- Güncelleme ---------- */
// gecis: önizlemede yumuşak geçiş oynatılsın mı (yazı yazarken kapalı)
function guncelle(gecis = true) {
  const s = durum[durum.tur];
  const onizleme = ONIZLEMELER[durum.tur](s);
  const onizlemeAlani = document.getElementById('onizleme-svg');
  onizlemeAlani.innerHTML = svgKabi(s.ayar, onizleme);
  if (durum.tur === 'isim') isimZinciriniBagla(onizlemeAlani);
  // İsim kolyesinde yazılacak ismi önizlemenin altında büyük ve net tekrar göster
  document.getElementById('yazilacak-isim').hidden = durum.tur !== 'isim';
  if (durum.tur === 'isim') document.getElementById('yazilacak-isim-deger').textContent = s.isim.trim() || '—';
  if (gecis) gecisOynat(onizlemeAlani, 'onizleme-gecis');

  const { gram, fiyat } = tasarimHesapla(durum.tur, s);
  const gramYazi = gramYaz(gram);
  document.getElementById('onizleme-bilgi').textContent =
    `${s.ayar} ayar · ≈ ${gramYazi}${durum.tur === 'isim' ? ' · ' + s.zincir + ' cm' : ''}`;
  const kapora = kaporaHesapla(fiyat);
  document.getElementById('cubuk-bilgi').textContent = `Tahmini · kapora ${paraYaz(kapora)}`;
  document.getElementById('kapora-deger').textContent = paraYaz(kapora);
  fiyatGoster(fiyat);

  const eksik = (durum.tur === 'isim' && !s.isim.trim()) || (durum.tur === 'lazer' && !s.foto);
  const dugme = document.getElementById('sepete-ekle');
  dugme.disabled = eksik;
  document.getElementById('tasarim-kaydet').disabled = eksik;
  dugme.textContent = eksik ? (durum.tur === 'lazer' ? 'Önce fotoğraf yükleyin' : 'Önce isim girin') : 'Sepete Ekle';
}

/* ---------- Olaylar ---------- */
document.getElementById('sekmeler').addEventListener('click', e => {
  const sekme = e.target.closest('.sekme');
  if (!sekme) return;
  durum.tur = sekme.dataset.tur;
  ozelOnay.checked = false;
  document.querySelectorAll('.sekme').forEach(b => b.classList.toggle('secili', b === sekme));
  adimlariCiz();
  guncelle();
});

document.getElementById('adimlar').addEventListener('click', e => {
  const dugme = e.target.closest('.secenek');
  if (!dugme) return;
  durum[durum.tur][dugme.dataset.alan] = dugme.dataset.deger;
  document.querySelectorAll(`[data-alan="${dugme.dataset.alan}"]`).forEach(b => b.classList.toggle('secili', b === dugme));
  guncelle();
});

document.getElementById('adimlar').addEventListener('input', e => {
  if (e.target.id !== 'isim-girdi') return;
  const temiz = e.target.value.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ ]/g, '').slice(0, 10);
  if (temiz !== e.target.value) e.target.value = temiz;
  durum.isim.isim = temiz;
  guncelle(false);
});

document.getElementById('adimlar').addEventListener('change', e => {
  if (e.target.id !== 'foto-girdi' || !e.target.files[0]) return;
  const dosya = e.target.files[0];
  if (!dosya.type.startsWith('image/')) return bildirim('Lütfen bir fotoğraf dosyası seçin.');
  const okuyucu = new FileReader();
  okuyucu.onload = () => {
    durum.lazer.foto = okuyucu.result;
    durum.lazer.dosyaAdi = dosya.name;
    adimlariCiz();
    guncelle();
  };
  okuyucu.readAsDataURL(dosya);
});

// Kişiye özel ürün: onay kutusu işaretlenmeden sepete eklenmez
const ozelOnay = document.getElementById('ozel-onay-kutu');
ozelOnay.addEventListener('change', () => {
  document.getElementById('onay-uyari').hidden = true;
  document.getElementById('ozel-onay').classList.remove('hatali');
});

document.getElementById('sepete-ekle').addEventListener('click', () => {
  if (!ozelOnay.checked) {
    document.getElementById('onay-uyari').hidden = false;
    document.getElementById('ozel-onay').classList.add('hatali');
    document.getElementById('ozel-onay').scrollIntoView({ block: 'end', behavior: hareketAz ? 'auto' : 'smooth' });
    ozelOnay.focus({ preventScroll: true });
    return;
  }
  sepeteEkle(tasarimKalemi(durum.tur, durum[durum.tur]));
});

// Tasarımı Hesabım > Tasarımlarım'a kaydet. Giriş yoksa tasarım bekletilir, girişten sonra kaydedilir.
document.getElementById('tasarim-kaydet').addEventListener('click', () => {
  const tasarim = { tur: durum.tur, secim: { ...durum[durum.tur] } };
  if (!kullaniciGetir()) {
    hafizaKaydet('lidya-bekleyen-tasarim', tasarim);
    location.href = 'giris.html?donus=hesabim.html%23tasarimlar';
    return;
  }
  tasarimKaydet(tasarim);
  bildirim('Tasarımınız kaydedildi. <a href="hesabim.html#tasarimlar">Tasarımlarım →</a>');
});

document.getElementById('kapora-oran').textContent = `(%${Math.round(SATIS_AYARLARI.tasarimKaporaOrani * 100)})`;
adimlariCiz();
guncelle();
