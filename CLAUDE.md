# Lidya Kuyum – Online Satış Sitesi

Bu dosya projenin tek doğru kaynağıdır. Claude Code bu klasörde her açıldığında bunu okur. Bir karar değiştiğinde bu dosya da güncellenmeli; kodla bu dosya çelişirse bu dosya geçerlidir.

> **Durum:** Tasarım prototipi aşaması. Site HTML, CSS ve JavaScript ile çalışıyor. **Altyapı: Supabase** (bkz. "Teknik notlar"). Giriş, üyelik ve şifre yenileme Supabase Auth ile gerçekten çalışıyor; ödeme, sipariş ve ürün veritabanı henüz yok (örnek verilerle demo).

---

## 1. İşletme

- **Ad:** Lidya Kuyum (Lidya Kuyumculuk), Manavgat / Antalya
- **Kuruluş:** 1989, Metin Tanır tarafından kuruldu. Aile mesleği, bugün üçüncü kuşak.
- **Şubeler:** Manavgat merkez mağaza + Hotel Alba Resort, Hotel Alba Royal, Hotel Alba Queen. Otellerden mağazaya transfer hizmeti var.
- **Markalar:** 10 yılı aşkın süredir Atasay yetkili satış noktası (Atasay şubesi değil). Ayrıca Favori, Koçak ve diğer markalar. Sıra: Atasay, Favori, Koçak.
- **Diğer:** Antalya Kuyumcular Derneği (AJA) üyesi. Tüm ürünler garantili. İngilizce, Almanca, Rusça konuşan satış ekibi.
- **Sosyal medya:** Instagram'da yaklaşık 35 bin takipçi. Kullanıcı adı: **@lidyakuyum** (https://www.instagram.com/lidyakuyum/)

### Sitede KULLANILMAYACAK ifadeler
- Atölye / kendi atölyemiz (hiçbir yerde bahsedilmeyecek)
- "Aynı sokak", dükkanın yer değiştirmesi
- Özel randevu
- Ücretsiz temizlik / parlatma
- "Lidya" isminin kökeni
- "Bölgenin en büyük", "en ucuz" gibi belgelenemeyen üstünlük iddiaları
- "40 yıl", "40 yıllık" (yerine "1989'dan beri" / "1989'dan bugüne")

## 2. İletişim bilgileri

Tek bir dosyada (`js/iletisim.js`) tutulur.

- **Telefon / WhatsApp:** 0532 365 00 40 (`https://wa.me/905323650040`)
- **Çalışma saatleri:** Pazartesi–Cumartesi 08.30–21.00, Pazar kapalı
- **Konum:** https://maps.app.goo.gl/f1KgRL3tKb4TAHyH9 (36.7870367, 31.4430691)
- **Alan adı:** lidyakuyum.com ve lidyakuyum.com.tr
- **E-posta:** info@lidyakuyum.com (kurulacak)

## 3. Ürünler ve satış kuralları

**Satılacaklar**
- 14 ve 22 ayar altın takı: minimal, hediyelik, günlük kullanıma uygun
- Doğal taş: firuze, ametist vb. Hem altın + taş takılar hem de sadece doğal taş ürünler.
- Kişiye özel ürünler (Kendi Tasarımını Yap)

**Satılmayacaklar**
- Gümüş
- Çeyrek, gram, Cumhuriyet altını, bilezik gibi yatırım altınları

**Fiyat sınırları** (tek bir ayar dosyasında sabit olarak tutulur)
- **30.000 TL altı:** online satılır. Ağırlık **15.000 TL altı** ürünlerde.
- **30.000 TL ve üstü:** online satılmaz, **katalogda** gösterilir. "Sepete Ekle" yerine "WhatsApp'tan Bilgi Al" butonu, fiyat yerine "Fiyat için bize ulaşın", yanında "Mağazamızda inceleyebilirsiniz". Katalog ürünlerini tamamen gizleme ayarı yedekte durur (varsayılan: katalogda göster).
- Sınır kontrolü fiyat formülüyle hesaplanan fiyat üzerinden otomatik yapılır; altın fiyatı değişince ürün kendiliğinden satılabilir/katalog durumuna geçer.

## 4. Fiyatlandırma

- Altın ürünlerin fiyatı **gram, ayar ve işçilik** üzerinden hesaplanır. **Gerçek formülü aile belirleyecek**; şimdilik yer tutucu formül var: `gram × altın fiyatı × ayar oranı + işçilik`. Formül tek bir dosyada (`js/fiyat.js`) durur.
- Güncelleme **manuel:** yönetici güncel altın fiyatını girer, tüm altın ürünler yeniden hesaplanır.
- Online satış maliyeti (ödeme komisyonu + sigortalı kargo) satış başına yaklaşık %3-5; formüle eklenmeli.
- Doğal taş ürünleri sabit fiyatlı olabilir.

## 5. Site yapısı

**Üst menü:** Sol üstte küçük yatay "LİDYA" yazı logosu. Menü: Kolye, Küpe, Yüzük, Bileklik, Doğal Taş, Hediye Rehberi, Kampanyalar, Kendi Tasarımını Yap, Hakkımızda. Sağda arama, kullanıcı, sepet. Telefonda hamburger menü. Kaydırınca menü sabit kalır ve incelir.

**Ana sayfa (sırasıyla)**
1. İlk ekran: başlık + slogan, yanında Minimal / Hediyelik / Günlük Kullanım koleksiyon kartları. Bilgisayarda kaydırmadan tek ekranda görünür. **Büyük yuvarlak logo kullanılmaz.**
2. "15.000 TL altı zarif seçimler" şeridi
3. Öne Çıkan Ürünler
4. İnternete Özel Kampanyalar
5. Hediye Rehberi tanıtımı
6. Doğal Taş
7. Kendi Tasarımını Yap tanıtımı
8. Markalar (Atasay, Favori, Koçak; markalar sadece yazıyla, logo/görsel yok)
9. "1989'dan Bugüne" kısa hikâye
10. Instagram bölümü
11. İletişim + harita

**Ana koleksiyonlar:** Minimal, Hediyelik, Günlük Kullanım. Kolye/küpe/yüzük/bileklik ürün türü olarak filtrede kullanılır.

**Ürün listesi filtreleri:** tür, koleksiyon, marka, ayar (14/22), fiyat (5.000 / 10.000 / 15.000 / 30.000 TL altı). Varsayılan sıralama: "Önerilen".

**Sıralama (bütün ürün listelerinde: kategori, koleksiyon, kampanyalar, Hediye Rehberi):** Önerilen (varsayılan), En popüler, Fiyat: Düşükten yükseğe, Fiyat: Yüksekten düşüğe, En yeniler.
- **"En popüler"** gerçek sitede ürün görüntülenme sayısına göre olacak (en çok açılan ürün en üstte); altyapıda görüntülenme sayacı (eklenti veya analitik verisi) kurulacak.
- Fiyat sıralamaları formülle hesaplanan güncel fiyata göre; katalog ürünleri (fiyatı görünmediği için) fiyat sıralamalarında en sonda.
- Seçilen sıralama filtrelerle birlikte çalışır ve adres çubuğunda tutulur.
- Bilgisayarda "Filtrele" ve "Sırala" listenin üstünde yan yana; telefonda iki eşit buton, basınca alttan panel açılır.

**Diğer sayfalar:** ürün detay, sepet, ödeme akışı, giriş/kayıt, hesabım, hediye rehberi, kampanyalar, kendi tasarımını yap, hakkımızda, yasal sayfalar.

## 6. Dil ve ambiyans

- **Hava:** şık, günlük, zarif, rahat. Müşteriyi asla sıkıştırmayan, gerginlikten uzak.
- **Kullanılmayacak:** "Son 2 ürün!", "Acele et!", geri sayım sayacı, satış baskısı yaratan her şey. İndirim yüzdesi gösterilmez.
- **Ana slogan:** "Her güne bir parça zarafet."
- **Hikâye başlığı:** "Zarafet, nesilden nesile."
- **Hediye sloganı:** "Küçük bir parça, büyük bir anlam."
- "1989'dan beri" kısa etiketlerde, "1989'dan Bugüne" başlıklarda.
- **İlk ekran düzeni:** Başlık ana slogan "Her güne bir parça zarafet." (büyük serif). Hemen altında "Zarafet, nesilden nesile." daha küçük, italik, gül kurusu renkte ikinci satır olarak durur; üstte küçük "1989'dan beri Manavgat'ta" etiketi.

## 7. Tasarım

- **Renkler:**
  - Pudra pembe `#EEBBAD` (logo rengi): vurgular, ana butonlar; her yerde değil
  - Sıcak açık zemin (soğuk beyaz da parlak krem de değil)
  - Koyu kahve-antrasit `#3A2E2A`: yazılar (saf siyah yok)
  - Altın rengi neredeyse hiç kullanılmaz; site pahalı/lüks görünmemeli, ulaşılabilir ama kaliteli görünmeli
  - **Marka renkleri istisnası:** WhatsApp öğeleri WhatsApp yeşili (`#25D366`; sabit buton, "WhatsApp’tan Yaz", "WhatsApp’tan Bilgi Al"), Instagram öğeleri Instagram renk geçişi (turuncu → pembe → mor → mavi; Instagram butonu, takipçi/çekiliş etiketleri, fotoğraf üzerine gelme örtüsü). Değişkenler `css/stil.css` → `--whatsapp`, `--instagram`.
  - **İkinci renk henüz seçilmedi.** Öneriler: adaçayı `#8A9A82` (önerilen), kiremit `#C2775C`, mürdüm `#6E3B4E`
- **Fontlar:** başlıklarda zarif serif, metinlerde sade sans-serif. İsim kolyesi önizlemesinde el yazısı fontlar.
- **Animasyonlar:** kısa ve sakin (0.3–0.6 sn): kaydırınca hafif belirme, kartlarda hafif yükselme, butonlarda yumuşak geçiş. "Hareketi azalt" ayarı açıksa kapanır.
- **Telefon öncelikli** tasarım.
- **Logo dosyaları:** `logo/` (yuvarlak logo, yazı logosu pembe/beyaz/koyu; SVG ve PNG)
- **Görseller:** `foto/`. Şu anki görseller temsili çizim/örnek; gerçek sitede ürün sayfalarında **sadece kendi ürün fotoğraflarımız** kullanılır. Marka görselleri sadece markanın yazılı izniyle. İnternetten bulunan fotoğraf ürün sayfasına konmaz.

## 8. Kendi Tasarımını Yap

Basit, adım adım seçim; serbest çizim yok. Her seçimde önizleme ve **tahmini** fiyat anında güncellenir.

1. **İsim kolyesi:** isim → ayar → zincir uzunluğu. **Yazı stili seçimi yok:** her zaman el yazısı ("Modern" ve "Klasik" stil yok, üretilemiyor). Varsayılan örnek isim **"Çağla"**. Zincir uçları ismin ilk ve son harfine bağlı görünür. Önizlemenin altında "Yazılacak isim: …" büyük ve net gösterilir.
2. **Harf kolye:** harf → ayar. **Model seçimi yok; Ğ harfi yok.**
3. **Lazerle resim:** fotoğraf yükle → plaka şekli → ayar. Üretimden önce WhatsApp'tan müşteriye önizleme onayı alınır.

- **Sipariş usulü üretim, tahmini fiyat + kapora:** Sitede tahmini fiyat (≈) gösterilir. Siparişte tahmini fiyatın bir kısmı kapora olarak alınır (prototipte örnek %30); kesin fiyat üretimden sonra tartıma göre bildirilir, kalan tutar kargodan önce ödenir. Sepette "Şimdi ödenecek" ve "Kalan" ayrı gösterilir.
- Teslim: **en geç 3 iş günü içinde kargoda** (pazar ve özel günler hariç). Yoğun dönemlerde üstte duyuru şeridi.
- Sepete eklemeden önce bilgi: "Bu ürün size özel üretildiği için iade ve değişim kapsamında değildir."
- Zorunlu onay kutusu: "Yazımı ve seçimlerimi kontrol ettim, kişiye özel ürünlerde cayma hakkı olmadığını biliyorum."
- Sepette etiket: "Kişiye özel · İade edilemez"
- "Tasarımımı kaydet" butonu (giriş gerekir)

## 9. Hediyelik

- **Hediye Rehberi** sayfası: Kime (Sevgiliye, Anneye, Arkadaşa, Kendine), Hangi gün (Doğum günü, Yıldönümü, Sevgililer Günü, Anneler Günü, Mezuniyet, Yeni doğan), Bütçe (5.000 / 10.000 / 15.000 / 30.000 altı). Seçime göre anlık filtre. Katalog ürünleri burada çıkmaz.
- **Hediye paketi ücretsiz.** Hediye notu alanı (en fazla 200 karakter), not karta yazılıp pakete konur.
- Hediye paketinde fiyat yazılı belge olmaz; fatura sipariş verene e-postayla gider.
- Ödemede "Farklı bir adrese hediye olarak gönder" seçeneği.

## 10. Kampanyalar

- Bölüm adı: **"İnternete Özel Kampanyalar"**
- Markalı ürünler (Atasay, Favori, Koçak) kampanyaya girmez.
- Üstü çizili eski fiyat + yeni fiyat; yüzde gösterilmez. Varsa "Kampanya [tarih] tarihine kadar".
- Gerçek sitede indirimden önceki fiyat **son 30 günün en düşük fiyatı** olmalı (Ticari Reklam Yönetmeliği); fiyat geçmişi tutulacak.

## 11. Hesap

- **Giriş, üyelik (e-posta doğrulamalı), şifre yenileme ve çıkış Supabase Auth ile çalışıyor.** Ad, telefon, iletişim izinleri ve onay tarihleri Supabase hesabında tutuluyor. Siparişler hâlâ örnek; adresler, favoriler ve kayıtlı tasarımlar şimdilik tarayıcıda (sonraki adım: Supabase veritabanı). Google ile giriş henüz kapalı.
- **Üye olmadan alışveriş her zaman mümkün.** Sipariş sonrası hesap oluşturma önerisi.
- Hesabım: Siparişlerim, Tasarımlarım, Favorilerim, Adreslerim, Hesap Bilgilerim.
- Kayıtta KVKK aydınlatma metni onayı (zorunlu) ve ticari ileti izni (ayrı, isteğe bağlı, **varsayılan işaretsiz**).

## 12. Kargo, iade, ödeme

- **Kargo:** DHL eCommerce Türkiye (eski MNG) ile kurumsal **sigortalı** gönderi (anlaşma yapılacak). Paket üzerinde "altın" yazmaz; paketleme kamera kaydıyla; içerik asla gizlenmez. Yurt dışı şimdilik yok.
- **İade (taslak, avukata okutulacak):**
  - Hazır ürünlerde 14 gün cayma hakkı; ürün kullanılmamış, etiketi/mührü bozulmamış olmalı.
  - Kişiye özel ürünlerde cayma hakkı yok (ayıplı mal hakları saklı).
  - İade kargosu müşteriden alınamaz (1 Ocak 2026 düzenlemesi); iade için DHL eCommerce kodu verilir.
  - Gönderim öncesi ve iade gelişinde hassas tartı, damga fotoğrafı ve video kaydı. Hasar/eksik gram halinde değer kaybı düşülür.
- **Ödeme:** iyzico veya PayTR (karar verilmedi). Kart bilgisi siteye gelmez.

### Yasal metinler
- **Yasal metinler TASLAKTIR; yayından önce avukat kontrolü gerekiyor.** Kaynak dosyalar `yasal/` klasöründe (`00-OKU-BENI.md`: doldurulacak bilgiler, avukata sorulacaklar, bilerek yazılmayanlar).
- Sayfalar: Ön bilgilendirme formu, Mesafeli satış sözleşmesi, İade ve cayma, KVKK aydınlatma metni, Çerez politikası, Kargo bilgileri (alt kısımdaki "Bilgilendirme" bağlantıları). Her sayfanın üstünde "Taslak metin" notu var; [KÖŞELİ PARANTEZ] yer tutucular sarı vurgulu.
- **Ödeme sayfası:** Siparişten önce ön bilgilendirme formu ve mesafeli satış sözleşmesi açılır kutularda, siparişin bilgileriyle doldurulmuş olarak gösterilir. "Ön bilgilendirme formunu ve mesafeli satış sözleşmesini okudum, onaylıyorum" kutusu işaretlenmeden sipariş verilemez. Sipariş butonu: **"Siparişi Onayla ve Öde"**.
- **Çerezler:** İlk girişte çerez penceresi; "Kabul et", "Reddet" ve "Tercihler" eşit görünürlükte. Alt kısımda "Çerez Tercihleri" bağlantısı. Zorunlu olmayan çerezler onaydan önce çalışmaz (işlevsel izin yoksa favoriler sadece oturum boyunca tutulur; analitik/pazarlama araçları eklenince yalnızca izin varsa yüklenmeli).
- Yayından önce yapılacak: mesafeli satış sözleşmesinin siparişten sonra e-postayla gönderilmesi ve hesapta (Siparişlerim) saklanması.

## 13. Teknik ve çalışma kuralları

- **Altyapı:** **Supabase** (giriş/üyelik, veritabanı, dosya depolama, sunucu işleri) + statik site (GitHub Pages) + iyzico/PayTR. Sebep: aylık ücret olmasın. Ayrıntılar: "Teknik notlar".
- Prototip: HTML/CSS/JS, dosyalar düzenli, veriler (ürünler, iletişim, fiyat) ayrı dosyalarda.
- **GitHub kuralı:** Her istenen değişiklik bittikten sonra, özet vermeden önce değişiklikleri Türkçe ve açıklayıcı bir commit mesajıyla commit'le ve GitHub'a push et. Repo **herkese açık** (GitHub Pages için). Şifre, API anahtarı, .env gibi gizli bilgiler asla commit'lenmez; .gitignore'da olur. Push başarısız olursa kullanıcıya söyle.
- **Commit'ten önce `sh surum.sh` çalıştır:** Sayfalardaki CSS/JS bağlantılarına yeni sürüm numarası ekler; yoksa ziyaretçinin tarayıcısı eski dosyaları önbellekten getirip yeni sayfayla karıştırabilir (ürünler görünmez, butonlar çalışmaz).
- **Push'tan sonra siteyi aç:** Pages yayını bitene kadar bekle, sonra siteyi kullanıcının tarayıcısında aç (komutlar "Teknik notlar"da). Kullanıcı ayrıca istemedikçe her push'tan sonra yapılır.
- Her değişiklikten sonra bu dosyayı da güncel tut.

---

## Açık sorular (aileden cevap bekleniyor)

1. Sitede hangi ayarlar satılacak: 14, 18, 22? Elmas online'a girecek mi?
2. Gerçek fiyat formülü; işçilik ürüne mi kategoriye mi göre; online maliyet formüle nasıl eklenecek
3. Taksit olacak mı, komisyonu kim öder
4. Kişiye özel ürünlerin fiyat hesabı; harf kolyeler stokta mı, sipariş üzerine mi
5. Ödeme şirketi (iyzico / PayTR), sanal POS durumu
6. Ürün bilgileri nerede (Excel, kuyumcu programı)
7. "2 yıl şans hakkı" tam olarak ne
8. Dükkandaki iade/değişim kuralları
9. Ticari unvan, vergi no, MERSİS
10. Bayilik sözleşmelerinde online satış, görsel ve fiyat şartları; Atasay'dan görsel izni
11. Instagram çekilişlerinde Milli Piyango izni
12. e-Arşiv fatura programı (mali müşavir)
13. DHL eCommerce görüşmesini kim yapacak; siparişleri günlük kim takip edecek
14. Sitenin ikinci rengi

## Yayın öncesi kontrol listesi

- [ ] Hosting + SSL
- [ ] Altyapı kurulumu (ürünler, hesap, sepet, sipariş paneli, çok kullanıcılı yetki, telefon bildirimi)
- [ ] Ödeme şirketi başvurusu ve entegrasyonu (3D Secure, taksit)
- [ ] e-Arşiv fatura entegrasyonu
- [ ] DHL eCommerce sigortalı gönderi anlaşması + entegrasyon
- [ ] Sipariş/kargo e-postaları, info@lidyakuyum.com
- [ ] Yasal metinler: mesafeli satış sözleşmesi, ön bilgilendirme formu, iade ve cayma, KVKK aydınlatma, açık rıza, çerez politikası, kargo bilgileri — **taslaklar sitede (`yasal/`), avukat kontrolü ve sarı yer tutucuların doldurulması gerekiyor**
- [x] Çerez onay penceresi (prototipte var; gerçek analitik/pazarlama araçları izin kontrolüyle bağlanacak)
- [ ] Mesafeli satış sözleşmesinin siparişten sonra e-postayla gönderilmesi ve hesapta saklanması
- [ ] ETBİS kaydı, İYS kaydı, VERBİS durumu
- [ ] Yedekleme, güvenlik eklentisi, yönetici paneline iki adımlı doğrulama, reCAPTCHA
- [ ] Gerçek ürün fotoğrafları
- [ ] Google Analytics, Meta Pixel, Search Console, Google İşletme Profili

## İleride

- Mobil uygulama
- Sitenin İngilizce, Almanca, Rusça versiyonu (otel müşterileri için)
- Hediyelik alt koleksiyonları (Sevgiliye, Anneye vb.) genişletme
- Tasarlayıcıya yeni ürünler (yüzük, bileklik, harf küpe)
- Marka tescili: "Lidya / Lidya Kuyum" + logo, TÜRKPATENT, 14. ve 35. sınıflar (önce benzer marka araştırması)
- TikTok

---

## Teknik notlar

Eski özetten korunan teknik bilgiler. Yukarıdaki kararlarla çelişirse yukarısı geçerlidir.

### GitHub ve yayın
- **Repo:** https://github.com/emirtanir/ilk-projem (dal: `main`, herkese açık).
- **Terminalden giriş:** GitHub CLI `~/.local/bin/gh` (v2.102.0, Homebrew yok). `gh auth login` + `gh auth setup-git` yapıldı.
- **Site (GitHub Pages):** https://emirtanir.github.io/ilk-projem/ — `main` dalına her push'ta otomatik yayınlanır. Kökte `.nojekyll` var (dosyalar işlenmeden yayınlanır).
- **Push sonrası:** `gh api repos/emirtanir/ilk-projem/pages/builds/latest` → `status: built` ve commit eşleşene kadar bekle, sonra `open "https://emirtanir.github.io/ilk-projem/?v=<kısa commit>"` (sondaki `?v=` eski sürümün önbellekten gelmesini önler).
- **Önbellek kırıcı (`surum.sh`):** GitHub Pages dosyaları ~10 dakika önbellekte tutar. `sh surum.sh` bütün `*.html` dosyalarında `css/…` ve `js/…` bağlantılarını `?v=YYYYAAGG-SSDDss` ile günceller ("kopyası" adlı dosyaları atlar). Yeni sayfa eklenirse kendi CSS/JS bağlantıları da otomatik kapsanır.
- `.gitignore`: `.DS_Store`, `.env`, `.env.*`, `*.pem`, `*.key`, `secrets/`, `gizli/`, `.vscode/`, `.idea/`, `node_modules/`.

### Supabase
- **Proje:** `https://ivmmylsmpybaxyqqjbbx.supabase.co`, bölge Frankfurt, bedava katman. Bağlantı `js/supabase.js` içinde (proje adresi + publishable anahtar; bunlar açık bilgidir).
- **Anahtar kuralı:** Secret / `service_role` anahtarı ve ödeme şirketi gizli anahtarları **asla** repoya ve site koduna girmez; sadece Supabase Edge Function gizli ayarlarında durur.
- **Planlanan kullanım:** Auth (e-posta + şifre, ileride Google), Postgres (ürünler, profiller, adresler, favoriler, tasarımlar, siparişler, ayarlar; her tabloda Row Level Security: müşteri sadece kendi verisini, yöneticiler siparişleri görür), Storage (ürün fotoğrafları, lazer için müşteri fotoğrafları gizli klasörde), Edge Functions (ödeme bildirimi, yeni sipariş bildirimi). Yönetim paneli hazır değil, telefondan rahat kullanılan basit bir sayfa yazılacak.
- **Panel ayarı (Authentication → URL Configuration):** Site URL `https://emirtanir.github.io/ilk-projem/`, Redirect URLs `https://emirtanir.github.io/ilk-projem/**`. Doğrulama ve şifre yenileme bağlantıları buraya döner.
- **E-posta:** Supabase'in hazır e-posta servisi sadece proje ekibinin adreslerine ve saatte birkaç e-posta gönderir. Müşterilere açılmadan önce bedava katmanlı bir SMTP servisi (önerilen Resend, alternatif Brevo) bağlanacak; gönderen "Lidya Kuyumculuk <info@lidyakuyum.com>", alan adına DNS kayıtları (SPF/DKIM) eklenecek, e-posta şablonları Türkçeleştirilecek.
- **Kütüphane:** supabase-js 2.117.2, jsDelivr'den sabit sürümle (`dist/umd/supabase.js`) bütün sayfalarda `js/ortak.js`'ten önce yükleniyor.
- **Oturum:** Kullanıcının özet bilgisi tarayıcıda `lidya-hesap` anahtarında tutulur ve her sayfada Supabase oturumuyla eşitlenir (`oturumHazir`). Ad, telefon, `izinSms`, `izinEposta`, `kvkkOnayTarihi`, `izinTarihi` Supabase `user_metadata` içinde. Google girişi `SUPABASE_AYAR.googleGirisAcik` ile açılır.
- **KVKK:** Sunucu yurt dışında (Frankfurt) olduğu için yurt dışına aktarım yükümlülükleri (standart sözleşme + KVKK Kurumu'na bildirim) avukat/muhasebeciyle teyit edilecek. Bedava katmanda otomatik yedek yok; yedekleme yöntemi belirlenecek.

### Dosya yapısı
- **Sayfalar:** `index.html`, `hediye.html`, `urunler.html` (liste; `?kategori=`, `?koleksiyon=`, `?marka=`, `?fiyat=`, `?ara=`), `urun.html?id=`, `tasarla.html`, `hakkimizda.html`, `sepet.html`, `odeme.html`, `giris.html` (`?sekme=uye`, `?donus=`), `hesabim.html` (`#siparisler`, `#tasarimlar`, `#favoriler`, `#adresler`, `#bilgiler`), `favoriler.html`, `kvkk.html` (yer tutucu).
- **Stil:** `css/stil.css` (tüm stiller; renk/font değişkenleri en üstte `:root`).
- **Kod:**
  - `js/iletisim.js` → `ILETISIM`: telefon, WhatsApp, e-posta, `adres` ("Yukarı Hisar, Antalya Cd. No:50, 07600 Manavgat/Antalya"), `instagramKullanici` ('lidyakuyum'), `instagramTakipci` ('35 bin'), çalışma saatleri, konum.
  - `js/fiyat.js` → fiyat formülü (`altinFiyatHesapla`), ayar oranları, `TASARIM_DEGERLERI` (tasarım ürünlerinin gram/işçilik örnekleri), `SATIS_AYARLARI` (örnek değerler: kargo, fiyat sınırları, `tasarimKaporaOrani`), `kaporaHesapla`, `sepetToplamlari`.
  - `js/urunler.js` → `URUNLER` (örnek ürünler; alanlar: id, ad, kategori, marka, koleksiyonlar, secenekler{ayar: gram, iscilik} veya sabitFiyat, tas, ton, etiket, aciklama), `KOLEKSIYONLAR`, `KATEGORILER`, `MARKALAR`, `ONE_CIKANLAR`, `TASLAR`.
  - `js/ortak.js` → üst menü, alt kısım, iletişim bölümü, ürün kartı, sepet, favoriler, kayıtlı tasarımlar, hesap/oturum yardımcıları, bildirim.
  - `js/supabase.js` → Supabase bağlantısı ve Türkçe hata mesajları.
  - `js/liste.js`, `js/detay.js`, `js/sepet.js`, `js/odeme.js`, `js/giris.js`, `js/hesap.js`, `js/tasarla.js`, `js/onizleme.js` (tasarım önizleme SVG'leri, `tasarimKalemi`).
- **Satış ayarları (`js/fiyat.js` → `SATIS_AYARLARI`):** `onlineSatisSiniri` (30000), `zarifSecimSiniri` (15000), `fiyatFiltreleri` ([5000, 10000, 15000, 30000]), `katalogUrunleriniGizle` (false), `ucretsizKargoSiniri` / `kargoUcreti` (örnek), `tasarimKaporaOrani` (örnek). Fonksiyonlar: `urunNormalFiyati`, `urunFiyati` (kampanya dahil), `kampanyadaMi` (markalılar hariç), `ayarSatilabilirMi`, `katalogMu`, `gorunurUrunler`.
- **Ürün alanları (ek):** `kod` (LDY-1001…), `kime`, `gun` (Hediye Rehberi), `kampanya: { oran, bitis }`. Seçenek listeleri `KIME`, `GUNLER` (`js/urunler.js`). Örnek veride 3 katalog ürünü var (LDY-1019…1021). "Kolye Ucu" kategorisi menüde yok, ürün türü filtresinde duruyor.
- **Sayfa adresleri (ek):** `hediye.html` (`?kime=`, `?gun=`, `?butce=`; `js/hediye.js`), `urunler.html?kampanya=1` (İnternete Özel Kampanyalar), `urunler.html?sirala=populer|artan|azalan|yeni` (boş = Önerilen).
- **Hediye paketi:** `hediyeSecenekHTML` / `hediyeDurumu` (`js/ortak.js`); sepet kaleminde `hediye: { paket, not }`. Ödemede "Farklı bir adrese hediye olarak gönder" alıcı alanları (`js/odeme.js`).
- **Katalog ürünü:** ürün sayfasında "Fiyat için bize ulaşın", "Mağazamızda inceleyebilirsiniz" ve `whatsappBilgiLinki` (mesaj ürün adı, ayar ve koduyla dolar).
- **Sıralama ve popülerlik (`js/ortak.js`):** `SIRALAMALAR`, `urunleriSirala(liste, sira)`, `siralaAraciHTML` / `siralaAraciBagla` (Sırala butonu + paneli), `panelAcKapat` (telefonda alttan açılan, bilgisayarda açılır kutu panel). `goruntulenmeArtir(urunId)` ürün sayfası açılınca çağrılır; prototipte sadece tarayıcıda (`lidya-goruntulenme`) artırır, gerçek sitede içi sunucuya (Supabase) istek atacak şekilde değiştirilecek. `goruntulenmeSayisi(urun)` = ürün verisindeki `goruntulenme` + tarayıcıdaki artış. Ürün verisinde `goruntulenme` (başlangıç sayısı) ve `eklenmeTarihi` ('YYYY-AA-GG') alanları var. Adres parametresi: `?sirala=populer|artan|azalan|yeni` (boş = Önerilen).
- **Yasal sayfalar:** `yasal/*.md` → `perl yasal/sayfalari-olustur.pl` → kökte `on-bilgilendirme-formu.html`, `mesafeli-satis-sozlesmesi.html`, `iade-ve-cayma.html`, `kvkk.html`, `cerez-politikasi.html`, `kargo-bilgileri.html` ve ödeme sayfası için `js/yasal-metinler.js` (`YASAL_METINLER`). Bu dosyalar elle düzenlenmez; metin değişince `.md` düzenlenir, betik ve ardından `sh surum.sh` çalıştırılır. `[…]` → `<mark class="eksik">`, `{{ALAN}}` → `<span class="otomatik" data-alan>`; ödemede `sozlesmeleriDoldur()` (`js/odeme.js`) alanları doldurur.
- **Çerez tercihi (`js/ortak.js`):** `lidya-cerez` (zorunlu kayıt) = { zorunlu, islevsel, analitik, pazarlama, tarih }. `cerezIzni(tur)`, `cerezTercihiKaydet`, `cerezPenceresiAc`. `ISLEVSEL_KAYITLAR` (`lidya-favoriler`, `lidya-goruntulenme`) izin yoksa `sessionStorage`'da tutulur.
- **Üst menü:** `#ust` `display: contents` (menü sayfa boyunca sabit kalsın diye); kaydırınca `.ust.ince` ile incelir.
- **Tarayıcı hafızası anahtarları:** `lidya-sepet`, `lidya-hesap`, `lidya-favoriler`, `lidya-tasarimlar`, `lidya-adresler`, `lidya-bekleyen-tasarim`, `lidya-goruntulenme`, `lidya-cerez`.
- **Görsel adları (`foto/` klasörüne konunca kendiliğinden görünür):** `koleksiyon-minimal.jpg`, `koleksiyon-hediyelik.jpg`, `koleksiyon-gunluk.jpg`, `instagram-1.jpg` … `instagram-6.jpg`; Hakkımızda: `dukkan-dis.jpg`, `dukkan-ic.jpg`, `vitrin.jpg` (yer tutucu `<figure>` elle `<img>` ile değiştirilir).
- **Logo:** Üst menüde yazı logosunun altında HTML yazı olarak "— SINCE 1989 —" (`.logo-alt`, `lang="en"`, düz hizalı rakamlar).
- **Prototipin çalışma şekli:** `index.html` çift tıkla açılabilir; sunucu gerekmez. Animasyonlar `prefers-reduced-motion` açıksa kapanır.
