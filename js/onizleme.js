/* =========================================================
   TASARIM ÖNİZLEMESİ (SVG) — Kendi Tasarımını Yap sayfası ve
   ana sayfadaki tanıtım kutusu aynı çizimi kullanır.
   ========================================================= */

// İsim kolyesi el yazısıyla yapılır (Modern ve Klasik stil yok)
const ISIM_FONT = "Great Vibes, cursive";
const ALTIN_RENK = { 14: ['#E9D29C', '#C9A55E'], 22: ['#F0CF7A', '#C08A22'] };

function svgKabi(ayar, icerik) {
  const [acik, koyu] = ALTIN_RENK[ayar];
  return `<svg viewBox="0 0 320 200" role="img" aria-label="Tasarım önizlemesi">
    <defs>
      <linearGradient id="altin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${acik}"/><stop offset=".55" stop-color="${koyu}"/><stop offset="1" stop-color="${acik}"/></linearGradient>
      <filter id="kazima"><feColorMatrix type="matrix" values=".39 .77 .19 0 0  .35 .69 .17 0 0  .27 .53 .13 0 0  0 0 0 1 0"/></filter>
    </defs>
    <rect width="320" height="200" fill="#FDFAF6"/>
    ${icerik}
  </svg>`;
}
const zincir = d => `<path d="${d}" fill="none" stroke="url(#altin)" stroke-width="1.6" stroke-dasharray="3 1.6" stroke-linecap="round"/>`;
const halka = (x, y) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="none" stroke="url(#altin)" stroke-width="1.5"/>`;
const vZincir = (y) => zincir(`M96 0 L160 ${y - 8}`) + zincir(`M224 0 L160 ${y - 8}`) +
  `<circle cx="160" cy="${y - 4}" r="4" fill="none" stroke="url(#altin)" stroke-width="1.6"/>`;

/* ---------- İsim kolyesi ---------- */
const ISIM_BOYUT = 72;                                        // en büyük yazı boyutu
const ISIM_EN_GENIS = 236;                                     // isim bu genişliğe sığdırılır

// İsim yazısı + zincir için boş grup. Zincir, yazı ölçüldükten sonra isimZinciriniBagla ile çizilir.
function isimOnizleme(s) {
  const yazi = (s.isim.trim() || 'İsim');
  return `<g class="isim-zincir"></g>
    <text class="isim-yazi" data-boyut="${ISIM_BOYUT}" x="160" y="132" text-anchor="middle"
      font-family="${ISIM_FONT}" font-size="${ISIM_BOYUT}" fill="url(#altin)">${yazi}</text>`;
}

// Zincirin bağlanacağı yükseklik (yazı boyutuna oranla, taban çizgisinden yukarı)
function baglantiYuksekligi(harf) {
  const uzun = harf !== harf.toLocaleLowerCase('tr-TR') || 'bdfhklt'.includes(harf);
  return uzun ? 0.48 : 0.2;
}

// Yazıyı ölç, sığdır ve zincirin iki ucunu ilk ve son harfe halkayla bağla
function isimZinciriniBagla(kap) {
  const yazi = kap.querySelector('.isim-yazi');
  const grup = kap.querySelector('.isim-zincir');
  if (!yazi || !grup || !yazi.getNumberOfChars()) return;

  yazi.setAttribute('font-size', yazi.dataset.boyut);
  const uzunluk = yazi.getComputedTextLength();
  if (uzunluk > ISIM_EN_GENIS) yazi.setAttribute('font-size', (yazi.dataset.boyut * ISIM_EN_GENIS / uzunluk).toFixed(1));

  const boyut = parseFloat(yazi.getAttribute('font-size'));
  const metin = yazi.textContent;
  const n = metin.length;
  const taban = yazi.getStartPositionOfChar(0).y;
  const ilk = yazi.getExtentOfChar(0);
  const son = yazi.getExtentOfChar(n - 1);
  const pay = boyut * 0.05;

  const sol = { x: ilk.x + pay, y: taban - boyut * baglantiYuksekligi(metin[0]) };
  const sag = { x: son.x + son.width - pay, y: taban - boyut * baglantiYuksekligi(metin[n - 1]) };

  const solUst = Math.max(8, sol.x - 50);
  const sagUst = Math.min(312, sag.x + 50);
  const cizim =
    zincir(`M${(sol.x - 2.6).toFixed(1)} ${sol.y.toFixed(1)} C${(sol.x - 16).toFixed(1)} ${(sol.y - 34).toFixed(1)} ${(solUst + 6).toFixed(1)} ${(sol.y * 0.4).toFixed(1)} ${solUst.toFixed(1)} 0`) +
    zincir(`M${(sag.x + 2.6).toFixed(1)} ${sag.y.toFixed(1)} C${(sag.x + 16).toFixed(1)} ${(sag.y - 34).toFixed(1)} ${(sagUst - 6).toFixed(1)} ${(sag.y * 0.4).toFixed(1)} ${sagUst.toFixed(1)} 0`) +
    halka(sol.x, sol.y) + halka(sag.x, sag.y);
  // Aynı sayfada birden fazla önizleme varsa zincir, yazıyla aynı altın rengini kullansın
  grup.innerHTML = cizim.replaceAll('url(#altin)', yazi.getAttribute('fill'));

  // Yazı tipi henüz yüklenmediyse yüklenince yeniden ölç
  if (document.fonts && document.fonts.status !== 'loaded') {
    document.fonts.ready.then(() => isimZinciriniBagla(kap));
  }
}

/* ---------- Harf kolye ve lazerle resim ---------- */
function harfOnizleme(s) {
  return vZincir(68) +
    `<text x="160" y="150" text-anchor="middle" font-family="Cormorant Garamond, serif" font-weight="600" font-size="84" fill="url(#altin)">${s.harf}</text>`;
}

function lazerOnizleme(s) {
  const sekiller = {
    daire: { el: '<circle cx="160" cy="120" r="70"/>', kutu: [90, 50, 140, 140] },
    kalp: { el: '<path transform="translate(85 29) scale(.75)" d="M100 180C20 120 10 60 50 40c25-12 45 0 50 20 5-20 25-32 50-20 40 20 30 80-50 140z"/>', kutu: [92, 50, 136, 115] },
    plaka: { el: '<rect x="110" y="50" width="100" height="134" rx="12"/>', kutu: [110, 50, 100, 134] },
  };
  const { el, kutu } = sekiller[s.sekil];
  const [x, y, g, y2] = kutu;
  const ic = s.foto
    ? `<image href="${s.foto}" x="${x}" y="${y}" width="${g}" height="${y2}" preserveAspectRatio="xMidYMid slice" filter="url(#kazima)" clip-path="url(#kesim)"/>`
    : `<g clip-path="url(#kesim)"><rect x="${x}" y="${y}" width="${g}" height="${y2}" fill="#F3E7D3"/></g>
       <text x="160" y="${y + y2 / 2 + 4}" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#A08B79">Fotoğrafınız</text>`;
  return `<clipPath id="kesim">${el}</clipPath>` + vZincir(50) + ic +
    el.replace(/^<(\w+)/, '<$1 fill="none" stroke="url(#altin)" stroke-width="4"');
}

// Türüne göre önizleme çizimi (tasarım sayfası ve Hesabım > Tasarımlarım)
const ONIZLEMELER = { isim: isimOnizleme, harf: harfOnizleme, lazer: lazerOnizleme };

/* ---------- Sepet kalemi (tasarım sayfası ve Tasarımlarım) ---------- */
const SEKILLER = { daire: 'Daire', kalp: 'Kalp', plaka: 'Dikdörtgen' };
const TASARIM_ADLARI = { isim: 'İsim Kolyesi', harf: 'Harf Kolye', lazer: 'Lazerle Resim Kolye' };

function tasarimDetayi(tur, s, gram) {
  const g = gramYaz(gram);
  return {
    isim: `“${s.isim}” · El yazısı · ${s.ayar} ayar · ${s.zincir} cm · ≈ ${g}`,
    harf: `“${s.harf}” · ${s.ayar} ayar · ≈ ${g}`,
    lazer: `${SEKILLER[s.sekil]} plaka · ${s.ayar} ayar · ≈ ${g} · Fotoğraf dükkân onayı bekliyor`,
  }[tur];
}

// Fiyat her seferinde güncel değerlerle yeniden hesaplanır (tahmini fiyat + kapora)
function tasarimKalemi(tur, s) {
  const { gram, fiyat } = tasarimHesapla(tur, s);
  return {
    ad: TASARIM_ADLARI[tur], detay: tasarimDetayi(tur, s, gram), anahtar: 'tasarim-' + Date.now(),
    fiyat, kapora: kaporaHesapla(fiyat), siparisUsulu: true, kategori: 'kolye', ton: 'altin',
  };
}
