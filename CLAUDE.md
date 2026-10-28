# Lidya Kuyumculuk – Online Satış Sitesi

Bu dosya projenin özetidir. Claude Code bu klasörde her açıldığında bunu okur. Kararlar değiştikçe güncellenmeli.

> **Durum:** Planlama aşaması. Altyapı kararı (bkz. "Açık Kararlar") verilmeden kod yazmaya başlama. Önce bu belgedeki açık soruları sahibine sor.

> **GitHub kuralı:** Her istenen değişiklik bittikten sonra, kullanıcıya özet vermeden önce değişiklikleri Türkçe ve açıklayıcı bir commit mesajıyla commit'le ve GitHub'a push et. Şifre, API anahtarı, .env gibi gizli bilgileri asla commit'leme; bunlar .gitignore'da olsun. Push başarısız olursa kullanıcıya söyle.
>
> Repo: https://github.com/emirtanir/ilk-projem (dal: `main`). Terminalden giriş GitHub CLI ile (`~/.local/bin/gh`, `gh auth login` + `gh auth setup-git`).

---

## 1. İşletme

- **Ad:** Lidya Kuyumculuk – Manavgat merkez, Antalya
- **Geçmiş:** 1989’dan beri faaliyet gösteren aile işletmesi
- **Sosyal medya:** Instagram @lidyakuyum (https://www.instagram.com/lidyakuyum/), yaklaşık 35 bin takipçi
- **Kurucu:** Metin Tanır, 1989
- **Kuşak:** Üçüncü kuşak
- **Marka ilişkisi:** 10 yılı aşkın süredir Atasay yetkili satış noktası (Atasay şubesi değil). Favori, Koçak ve diğer markaları da satıyor.
- **Dernek:** Antalya Kuyumcular Derneği (AJA) üyesi; satılan tüm ürünler garantili
- **Atölye:** Sitede atölyeden bahsedilmeyecek
- **Mağaza envanteri:** Elmas, 14 ayar ve 22 ayar altın. Altın ve elması toptan alıyor (uygun fiyat vurgusu)
- **Hizmetler:** İngilizce / Almanca / Rusça konuşan satış ekibi. Özel randevu ve ücretsiz temizlik/parlatma sitede **yer almayacak**.
- **Şubeler:** Manavgat ana mağaza + Hotel Alba Resort, Hotel Alba Royal, Hotel Alba Queen. Otellerden mağazaya transfer hizmeti
- **Sitede kullanılmayacaklar:** Atölyeden bahsetmek, özel randevu, ücretsiz temizlik/parlatma, "aynı sokak" / dükkânın yer değiştirmesi ifadeleri, "Lidya" isminin kökeni
- **Hedef:** Mağaza satışlarına ek olarak online satış. Önce web sitesi, ileride mobil uygulama.

**İletişim ve konum**
- **Telefon:** 0532 365 00 40
- **WhatsApp:** aynı numara – https://wa.me/905323650040
- **Çalışma saatleri:** Pazartesi – Cumartesi 08.30 – 21.00, Pazar kapalı
- **Konum (Google Maps):** https://maps.app.goo.gl/f1KgRL3tKb4TAHyH9
- **Koordinatlar:** 36.7870367, 31.4430691
- **Açık adres:** Yukarı Hisar, Antalya Cd. No:50, 07600 Manavgat/Antalya
- Prototipte bu bilgiler `js/iletisim.js` dosyasında tek yerde tutuluyor.

## 2. Ürünler

**Satılacaklar**
- 14 ve 22 ayar altın takı, **minimal takı** ağırlıklı
- Doğal taş (firuze, ametist vb.):
  - Altın + doğal taş takılar
  - Sadece doğal taş ürünler (bileklik, kolye vb.), sabit fiyatlı
- Markalar: Atasay, Favori, Koçak ve diğerleri (satış sırası: Atasay > Favori > Koçak)

**Satılmayacaklar**
- Gümüş
- Çeyrek, gram, Cumhuriyet altını, bilezik gibi yatırım altınları

**Ürün sayısı:** Çok sayıda ürünle açılacak. Fotoğrafların çoğu hazır.

## 3. Site yapısı (iskelet)

- Ana sayfa
- **Markalar:** Atasay, Favori, Koçak…
- **Ana koleksiyonlar (menüde ve ana sayfada en önde):** Minimal, Hediyelik, Günlük Kullanım. Bir ürün birden fazla koleksiyonda olabilir.
- **Ürün türleri (ürün listesinde filtre):** Kolye, Kolye Ucu, Küpe, Yüzük, Bileklik
- **Ayar filtresi:** 14 ayar / 22 ayar (aynı modelin iki ayarı varsa ürün sayfasında seçilir)
- **Doğal Taş koleksiyonu** (taşların kısa hikâyesi ve anlamıyla)
- **Kendi Tasarımını Yap**
- **Hakkımızda:** Aile hikâyesi, dükkan fotoğrafları (dukkan-dis.jpg, dukkan-ic.jpg, vitrin.jpg), şubeler, adres, Atasay yetkili satıcı bilgisi
- İletişim + WhatsApp hattı
- Yasal sayfalar: Mesafeli satış sözleşmesi, ön bilgilendirme formu, iade/cayma, KVKK aydınlatma metni, çerez politikası, kargo bilgileri
- **Hesap:** Giriş / Üye Ol, Hesabım (Siparişlerim, Tasarımlarım, Favorilerim, Adreslerim, Hesap Bilgilerim). Ayrıntı: bölüm 6a.

## 4. Fiyatlandırma

- Altın ürünlerde fiyat **gram, ayar ve işçilik** üzerinden hesaplanır.
- **Formülü aile belirleyecek** (henüz gelmedi).
- Fiyat güncellemesi **otomatik değil, manuel:** Yönetici panelde güncel altın fiyatını girer, tüm altın ürünlerin fiyatı formülle birden yeniden hesaplanır.
- Bu yüzden her altın ürün için şu alanlar tutulmalı: gram, ayar, işçilik (formüle göre).
- Doğal taş ürünleri ve markalı ürünlerin bir kısmı sabit fiyatlı olabilir.
- **Fiyat-performans hissi:** Belirli bir tutarın üzerinde ücretsiz kargo (üst şeritte, ürün kartında, ürün sayfasında ve sepette "ücretsiz kargoya X TL kaldı" olarak gösterilir). Ana sayfada "Uygun Hediyeler" bölümü ve ürün listesinde "… TL altı" fiyat filtresi var. "Avantaj" işaretleri firuze tonda.

## 5. Kendi Tasarımını Yap

Arayüz **çok basit** olmalı: serbest çizim yok, adım adım seçim. Her seçimde önizleme ve **tahmini** fiyat anında güncellenir.

- **Sipariş usulü üretim, tahmini fiyat + kapora:** Ürünler sipariş üzerine üretildiği için sitede tahmini fiyat (≈) gösterilir. Siparişte tahmini fiyatın bir kısmı kapora olarak alınır; kesin fiyat üretimden sonra tartıma göre bildirilir, kalan tutar kargodan önce ödenir. Sepette "Şimdi ödenecek" ve "Kalan" ayrı gösterilir. Kapora oranı `js/fiyat.js` → `SATIS_AYARLARI.tasarimKaporaOrani` (prototipte örnek %30).

İlk sürümde üç ürün (dükkanda en çok yapılanlar):
1. **İsim kolyesi:** isim gir → ayar seç → zincir uzunluğu seç. Yazı stili seçimi yok: her zaman el yazısı ("Modern" ve "Klasik" stil yok)
2. **Harf kolye:** harf seç → ayar seç (model seçimi yok; Ğ harfi yok)
3. **Lazerle resim:** fotoğraf yükle → plaka şekli seç → ayar seç. Fotoğraf dükkan tarafından kontrol edilip müşteriye onay verilir.

- Süre: **1-3 iş günü içinde kargoda** (özel gün ve pazar hariç). Sitede "en geç 3 iş günü" yazılacak; yoğun dönemlerde (bayram, Sevgililer Günü, Anneler Günü, yılbaşı) üstte duyuru şeridi.

## 6. Sipariş yönetimi

- Siparişlere bakacak kişiler: Emir, dükkan çalışanları, dükkan müdürü
- Ayrı kullanıcı hesapları ve yetkiler olan bir yönetim paneli
- Yeni siparişte e-posta / telefon bildirimi
- Panel **telefondan rahat kullanılmalı** (Emir dönem içinde İstanbul'da)

## 6a. Müşteri hesabı

- **Prototipte sadece arayüz:** Gerçek kayıt, şifre saklama veya sunucu yok; butonlar örnek kullanıcıyla giriş yapılmış gibi davranır (bilgiler tarayıcı hafızasında). Gerçek hesap sistemi altyapı ile kurulacak.
- **Üye olmadan alışveriş her zaman mümkün.** Sepette "Üye olmadan devam et" her zaman görünür ve en önde; yanında "Giriş Yap" ve "Üye Ol". Sipariş tamamlandı ekranında üye olmayana "Bilgilerinizi kaydedip hesap oluşturun" önerisi çıkar.
- **Ticari ileti onayı ayrı ve isteğe bağlı:** Üye olurken KVKK aydınlatma metni onayı zorunlu; "Kampanya, çekiliş ve yeniliklerden SMS/e-posta ile haberdar olmak istiyorum" kutusu ayrı, isteğe bağlı ve varsayılan olarak işaretsiz. Hesap Bilgilerim'den SMS ve e-posta izni ayrı ayrı değiştirilebilir.
- Favoriler: ürün kartı ve ürün detayında kalp ikonu. Kendi Tasarımını Yap'ta "Tasarımımı kaydet" (giriş yoksa giriş sayfasına yönlendirir, girişten sonra tasarım otomatik kaydedilir).
- Prototip dosyaları: `giris.html`, `hesabim.html`, `odeme.html`, `kvkk.html` (yer tutucu); kodlar `js/giris.js`, `js/hesap.js`, `js/odeme.js`; ortak hesap yardımcıları `js/ortak.js` içinde.

## 7. Kargo

- **Yurt içi:** DHL eCommerce Türkiye (eski MNG Kargo) ile kurumsal, **sigortalı** kıymetli gönderi anlaşması yapılacak
- Paket üzerinde "altın" ibaresi yok, paketleme kamera kaydıyla, güvenlik bantlı poşet
- İçerik asla gizlenmeyecek (sigorta geçersiz olur)
- Doğal taş ürünleri normal kargoyla gidebilir
- **Yurt dışı:** Şimdilik yok (DHL Express'in mücevher kabul koşulları ayrıca sorulmalı)

## 8. Tasarım

- **Hava:** zarif, feminen, ferah, butik kuyumcu. Büyük markaların sitelerinden daha sıcak ve kişisel.
- **Ulaşılabilir görünmeli:** Site "pahalı, bana göre değil" hissi vermemeli. Koyu/siyah alanlar yok (duyuru şeridi, butonlar, bildirimler açık pembe/beyaz); arka planlar açık krem, vurgular pudra pembe, küçük etiketler sıcak gül kurusu (#B4705D). Fiyatlar görünür.
- **Renkler:**
  - Pudra pembe `#EEBBAD` (logo rengi): butonlar, vurgular
  - Beyaz / sıcak krem: arka planlar
  - Koyu antrasit-kahve `#3A2E2A`: yazılar (saf siyah yok)
  - Altın tonu: sadece küçük detaylarda
- **Fontlar:** Başlıklarda zarif serif (Cormorant Garamond, Playfair Display veya Libre Caslon), metinlerde sade sans-serif
- **Ürün fotoğrafları:** aynı arka plan ve ışık; Instagram'daki "üzerinde" fotoğraflar ikinci görsel olarak
- **Logo dosyaları:** `logo/` klasöründe (yuvarlak logo + pembe/beyaz/koyu yazı, SVG ve PNG)
- **Telefon öncelikli** tasarım
- **Ana sayfa düzeni:** Büyük yuvarlak logo yok. Üst menüde en başta "İnternete Özel Kampanyalar" (gül kurusu #B4705D dolgulu, beyaz yazılı, etiket ikonlu, diğerlerinden farklı görünür; "… TL altı" ürünleri ucuzdan pahalıya listeler), sonra ürün türleri (Kolye, Kolye Ucu, Küpe, Yüzük, Bileklik, Doğal Taş, Kendi Tasarımını Yap, Hakkımızda) + arama, favoriler (kalp, `favoriler.html`), sepet ve hesap ikonları (bu sırayla). İlk ekranda başlığın yanında (telefonda altında) Minimal / Hediyelik / Günlük Kullanım koleksiyon kartları; bilgisayarda kaydırmadan tek ekranda görünür. Altında "Öne Çıkan Ürünler", "Uygun Hediyeler" ve iletişim bölümünün hemen üstünde Instagram bölümü (6 karelik fotoğraf ızgarası, instagram-1…6.jpg). Instagram kullanıcı adı: @lidyakuyum (https://www.instagram.com/lidyakuyum/), `js/iletisim.js` içinde. Instagram yönlendirmelerinde güven için takipçi sayısı (`instagramTakipci`, şimdilik "35 bin") ve "Çekilişler Instagram’da" vurgulanır (ana sayfa, iletişim bölümü, alt kısım).

## 9. Alan adı

- `lidyakuyum.com` ve `lidyakuyum.com.tr` (işletme adına kayıtlı, otomatik yenileme açık)
- `info@lidyakuyum.com` gibi bir e-posta

## 10. Kısıtlar

- **Masraf olabildiğince düşük.** Zorunlu olmayan aylık ücretlerden kaçın.
- Ödeme şirketi komisyonu kaçınılmaz, satış başına ödenir.
- Bakımı Emir yapacak, yani güncellemesi ve yönetimi kolay olmalı.

---

## Açık Kararlar

- [ ] **Altyapı:** Şu anki eğilim **WooCommerce (WordPress) + özel eklentiler** (fiyat formülü, tasarlayıcı). Alternatifler: hazır altyapı (ikas, Shopify) ya da sıfırdan özel yapım.
- [ ] Hosting (altyapıya göre)
- [ ] **Ücretsiz kargo sınırı, kargo ücreti ve "Uygun Hediyeler" fiyat aralıkları:** prototipte örnek değerler (2.000 TL / 150 TL / 1.000-5.000-7.500 TL). Gerçek fiyatlar girilirken, siteyi yayına almadan önce birlikte güncellenecek (`js/fiyat.js` → `SATIS_AYARLARI`).
- [ ] **Kendi Tasarımını Yap kapora oranı** ve kalan tutarın ne zaman / nasıl alınacağı (prototipte örnek: %30, kalan kargodan önce). Ödeme altyapısı seçilirken netleşmeli.

## Aileden Beklenen Cevaplar

1. Ürün bilgileri (ad, gram, ayar, işçilik) şu an nerede? Excel, kuyumcu programı, hiçbir yer?
2. Fiyat formülü tam olarak ne? İşçilik ürüne göre mi, kategoriye göre mi?
3. Kişiye özel ürünlerin fiyatı nasıl belirleniyor? (harf sayısı, gram…)
4. Sanal POS anlaşması var mı? iyzico / PayTR gibi bir şirketle çalışıldı mı?
5. Ticari unvan ve vergi bilgileri
6. Bayilik sözleşmelerinde online satış, logo ve fotoğraf kullanımı şartları
7. Dükkandaki iade/değişim kuralları
8. DHL eCommerce görüşmesini kim yapacak?
9. Aylık bütçe sınırı ve hedef açılış tarihi
10. Logonun orijinal dosyası var mı?

## İleride

- Mobil uygulama
- Marka tescili: "Lidya / Lidya Kuyumculuk" + logo, TÜRKPATENT, 14. ve 35. sınıflar (önce benzer marka araştırması)
- Tasarlayıcıya yeni ürün türleri (yüzük, bileklik, harf küpe)
- TikTok
