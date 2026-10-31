/* BU DOSYA OTOMATİK OLUŞTURULUR (perl yasal/sayfalari-olustur.pl). Elle düzenlemeyin.
   Ödeme sayfasındaki açılır kutularda gösterilir; {{ALAN}} etiketleri siparişin bilgileriyle doldurulur. */
const YASAL_METINLER = {
  onBilgilendirme: `<p class="yasal-giris">Bu form, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca, siparişinizi onaylamadan önce bilgilendirilmeniz amacıyla hazırlanmıştır. Siparişi onaylamanız, bu formu okuduğunuz ve bilgi sahibi olduğunuz anlamına gelir.</p>
<h2>1. Satıcı bilgileri</h2>
<div class="tablo-kap"><table>
<tbody>
<tr><td>Unvan</td><td><mark class="eksik">[TİCARİ UNVAN]</mark></td></tr>
<tr><td>Marka</td><td>Lidya Kuyum</td></tr>
<tr><td>MERSİS No</td><td><mark class="eksik">[MERSİS NO]</mark></td></tr>
<tr><td>Vergi Dairesi / No</td><td><mark class="eksik">[VERGİ DAİRESİ]</mark> / <mark class="eksik">[VERGİ NO]</mark></td></tr>
<tr><td>Adres</td><td><mark class="eksik">[AÇIK ADRES]</mark>, Manavgat / Antalya</td></tr>
<tr><td>Telefon</td><td>0532 365 00 40</td></tr>
<tr><td>E-posta</td><td>info@lidyakuyum.com</td></tr>
<tr><td>KEP Adresi</td><td><mark class="eksik">[KEP ADRESİ, varsa]</mark></td></tr>
</tbody></table></div>
<h2>2. Sipariş edilen ürün(ler)</h2>
<p><span class="otomatik" data-alan="ÜRÜN_TABLOSU">{{ÜRÜN_TABLOSU}}</span> <em>(Ürün adı, ürün kodu, ayar, yaklaşık gram, adet, birim fiyat, KDV dahil toplam fiyat)</em></p>
<ul>
  <li>Ara toplam: <span class="otomatik" data-alan="ARA_TOPLAM">{{ARA_TOPLAM}}</span></li>
  <li>Kargo ücreti: <span class="otomatik" data-alan="KARGO_UCRETI">{{KARGO_UCRETI}}</span></li>
  <li>Hediye paketi: Ücretsiz</li>
  <li><strong>Vergiler dahil toplam tutar: <span class="otomatik" data-alan="TOPLAM_TUTAR">{{TOPLAM_TUTAR}}</span></strong></li>
</ul>
<p>Altın ürünlerin fiyatı, siparişin verildiği andaki fiyattır. Siparişiniz onaylandıktan sonra altın fiyatlarında oluşan değişiklikler, ödediğiniz tutarı etkilemez.</p>
<h2>3. Ödeme</h2>
<p>Ödeme, <span class="otomatik" data-alan="ODEME_YONTEMI">{{ODEME_YONTEMI}}</span> ile yapılır. Kart bilgileriniz Lidya Kuyum'a iletilmez; ödeme işlemi lisanslı ödeme kuruluşu <mark class="eksik">[ÖDEME KURULUŞU ADI]</mark> altyapısı üzerinden gerçekleştirilir. Taksitli ödemelerde vade farkı ve taksit koşulları ödeme sayfasında gösterilir.</p>
<p><strong>Siparişi onaylamanızla birlikte ödeme yükümlülüğü altına girersiniz.</strong></p>
<h2>4. Teslimat</h2>
<ul>
  <li>Teslimat adresi: <span class="otomatik" data-alan="TESLIMAT_ADRESI">{{TESLIMAT_ADRESI}}</span></li>
  <li>Alıcı: <span class="otomatik" data-alan="ALICI_ADI">{{ALICI_ADI}}</span></li>
  <li>Hazır ürünler, siparişin onaylanmasından itibaren en geç <mark class="eksik">[X]</mark> iş günü içinde; kişiye özel ürünler en geç 3 iş günü içinde kargoya verilir (pazar günleri ve resmî tatiller hariç).</li>
  <li>Her hâlükârda teslimat, yasal süre olan 30 günü aşmaz.</li>
  <li>Ürünler sigortalı olarak <mark class="eksik">[KARGO FİRMASI]</mark> ile gönderilir.</li>
  <li>Hediye paketli siparişlerde pakete fiyat bilgisi içeren belge konmaz; faturanız size e-posta ile gönderilir.</li>
</ul>
<h2>5. Cayma hakkı</h2>
<ul>
  <li>Hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin, ürünü teslim aldığınız günden itibaren <strong>14 gün</strong> içinde cayma hakkınızı kullanabilirsiniz. Ürün teslim edilmeden önce de cayma hakkınızı kullanabilirsiniz.</li>
  <li>Cayma bildiriminizi süre dolmadan, info@lidyakuyum.com adresine e-posta ile, <mark class="eksik">[AÇIK ADRES]</mark> adresine yazılı olarak veya hesabınızdaki "Siparişlerim" bölümünden iletebilirsiniz.</li>
  <li>Cayma bildiriminizden itibaren 10 gün içinde ürünü, faturası ve kutusuyla birlikte geri göndermeniz gerekir.</li>
  <li><strong>İade için anlaşmalı kargo firmamız <mark class="eksik">[KARGO FİRMASI]</mark>'dır.</strong> Bu firma ile yapılan iade gönderilerinde sizden ücret alınmaz. Size verilecek iade koduyla ürünü sigortalı olarak gönderebilirsiniz. Bulunduğunuz yerde anlaşmalı kargo firmasının şubesi yoksa ürün, ek bir masraf talep edilmeksizin sizden teslim alınır.</li>
  <li>Cayma bildiriminizin bize ulaştığı tarihten itibaren <strong>14 gün</strong> içinde, teslimat masrafları dahil ödediğiniz toplam tutar, ödemede kullandığınız yöntemle iade edilir.</li>
  <li>Ürünün niteliğini ve özelliklerini belirlemek için gereken ölçünün ötesinde kullanılması, hasar görmesi veya eksik parça/eksik gram ile iade edilmesi hâlinde oluşan değer kaybından tüketici sorumludur.</li>
</ul>
<h3>Cayma hakkının kullanılamayacağı durumlar</h3>
<p>Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, <strong>tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde cayma hakkı bulunmamaktadır.</strong> Sitemizdeki "Kendi Tasarımını Yap" bölümünden sipariş edilen isim kolyesi, lazerle resim ve sipariş üzerine hazırlanan diğer kişiye özel ürünler bu kapsamdadır. Bu ürünler için sipariş öncesinde ayrıca onayınız alınır.</p>
<p><mark class="eksik">[AVUKATA SORULACAK: Hijyen ambalajlı ürünler (ör. küpe) için ayrı bir istisna uygulanıp uygulanmayacağı.]</mark></p>
<h2>6. Ayıplı ürün</h2>
<p>Cayma hakkından bağımsız olarak, ayıplı ürünlerde 6502 sayılı Kanun'dan doğan seçimlik haklarınız (bedel iadesi, indirim, ücretsiz onarım veya ayıpsız misliyle değişim) saklıdır. Kişiye özel ürünler de bu kapsamdadır.</p>
<h2>7. Şikâyet ve başvuru</h2>
<p>Talep ve şikâyetlerinizi yukarıdaki iletişim bilgilerinden bize iletebilirsiniz. Ayrıca, her yıl Ticaret Bakanlığı tarafından belirlenen parasal sınırlar dahilinde yerleşim yerinizdeki veya işlemi yaptığınız yerdeki <strong>Tüketici Hakem Heyeti</strong>'ne, bu sınırları aşan uyuşmazlıklarda ise kanunda öngörülen zorunlu arabuluculuk yoluna başvurduktan sonra <strong>Tüketici Mahkemesi</strong>'ne başvurabilirsiniz.</p>
<h2>8. Sözleşmenin saklanması</h2>
<p>Mesafeli satış sözleşmesi ve bu form, siparişinizin ardından e-posta adresinize gönderilir ve hesabınızın "Siparişlerim" bölümünde saklanır.</p>`,
  mesafeliSatis: `<h2>Madde 1 – Taraflar</h2>
<p><strong>SATICI</strong></p>
<ul>
  <li>Unvan: <mark class="eksik">[TİCARİ UNVAN]</mark> ("Lidya Kuyum")</li>
  <li>MERSİS No: <mark class="eksik">[MERSİS NO]</mark></li>
  <li>Vergi Dairesi / No: <mark class="eksik">[VERGİ DAİRESİ]</mark> / <mark class="eksik">[VERGİ NO]</mark></li>
  <li>Adres: <mark class="eksik">[AÇIK ADRES]</mark>, Manavgat / Antalya</li>
  <li>Telefon: 0532 365 00 40</li>
  <li>E-posta: info@lidyakuyum.com</li>
</ul>
<p><strong>ALICI</strong></p>
<ul>
  <li>Ad Soyad: <span class="otomatik" data-alan="ALICI_AD_SOYAD">{{ALICI_AD_SOYAD}}</span></li>
  <li>Adres: <span class="otomatik" data-alan="ALICI_ADRES">{{ALICI_ADRES}}</span></li>
  <li>Telefon: <span class="otomatik" data-alan="ALICI_TELEFON">{{ALICI_TELEFON}}</span></li>
  <li>E-posta: <span class="otomatik" data-alan="ALICI_EPOSTA">{{ALICI_EPOSTA}}</span></li>
</ul>
<p><strong>TESLİMAT</strong> (farklıysa)</p>
<ul>
  <li>Teslim alacak kişi: <span class="otomatik" data-alan="TESLIM_ALAN">{{TESLIM_ALAN}}</span></li>
  <li>Teslimat adresi: <span class="otomatik" data-alan="TESLIMAT_ADRESI">{{TESLIMAT_ADRESI}}</span></li>
</ul>
<h2>Madde 2 – Konu</h2>
<p>Bu sözleşmenin konusu, Alıcı'nın lidyakuyum.com internet sitesi üzerinden elektronik ortamda sipariş verdiği, aşağıda nitelikleri ve satış fiyatı belirtilen ürün(ler)in satışı ve teslimine ilişkin olarak, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca tarafların hak ve yükümlülüklerinin belirlenmesidir.</p>
<h2>Madde 3 – Sözleşme konusu ürün(ler)</h2>
<p><span class="otomatik" data-alan="ÜRÜN_TABLOSU">{{ÜRÜN_TABLOSU}}</span> <em>(Ürün adı, ürün kodu, ayar, yaklaşık gram, adet, KDV dahil birim ve toplam fiyat; kişiye özel ürünlerde seçilen isim/harf/görsel bilgisi)</em></p>
<ul>
  <li>Kargo ücreti: <span class="otomatik" data-alan="KARGO_UCRETI">{{KARGO_UCRETI}}</span></li>
  <li>Hediye paketi: <span class="otomatik" data-alan="HEDIYE_PAKETI">{{HEDIYE_PAKETI}}</span> (ücretsiz)</li>
  <li><strong>Vergiler dahil toplam tutar: <span class="otomatik" data-alan="TOPLAM_TUTAR">{{TOPLAM_TUTAR}}</span></strong></li>
  <li>Ödeme yöntemi: <span class="otomatik" data-alan="ODEME_YONTEMI">{{ODEME_YONTEMI}}</span></li>
  <li>Sipariş tarihi: <span class="otomatik" data-alan="SIPARIS_TARIHI">{{SIPARIS_TARIHI}}</span></li>
</ul>
<h2>Madde 4 – Genel hükümler</h2>
<p>4.1. Alıcı, sözleşme konusu ürünün temel nitelikleri, satış fiyatı, ödeme şekli, teslimat koşulları ve cayma hakkına ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini kabul eder.</p>
<p>4.2. Ürün görselleri ürünü tanıtmak amacıyla kullanılır. Altın ürünlerde belirtilen gram bilgisi yaklaşık değerdir; ürünün ayarı ve niteliği belirtildiği gibidir.</p>
<p>4.3. Altın ürünlerin satış fiyatı, siparişin verildiği andaki fiyattır. Siparişin onaylanmasından sonra oluşan altın fiyatı değişiklikleri sözleşme bedelini etkilemez.</p>
<p>4.4. Ödemenin herhangi bir nedenle gerçekleşmemesi veya banka tarafından iptal edilmesi hâlinde Satıcı'nın ürünü teslim yükümlülüğü doğmaz.</p>
<h2>Madde 5 – Teslimat</h2>
<p>5.1. Ürün, Alıcı'nın belirttiği teslimat adresine, sigortalı olarak <mark class="eksik">[KARGO FİRMASI]</mark> aracılığıyla gönderilir.</p>
<p>5.2. Hazır ürünler siparişin onaylanmasından itibaren en geç <mark class="eksik">[X]</mark> iş günü, kişiye özel ürünler en geç 3 iş günü içinde kargoya verilir. Teslimat, her hâlükârda 30 günlük yasal süreyi aşmaz. Bu süre içinde teslimatın mümkün olmaması hâlinde Alıcı bilgilendirilir ve talep etmesi hâlinde ödediği tutar iade edilir.</p>
<p>5.3. Alıcı'nın, teslimat sırasında paketin hasarlı veya açılmış olduğunu fark etmesi hâlinde paketi teslim almaması ve kargo görevlisine tutanak tutturması önerilir.</p>
<p>5.4. Hediye paketli siparişlerde pakete fiyat bilgisi içeren belge konmaz; fatura Alıcı'nın e-posta adresine gönderilir.</p>
<h2>Madde 6 – Cayma hakkı</h2>
<p>6.1. Alıcı, hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin, ürünü teslim aldığı günden itibaren 14 gün içinde sözleşmeden cayma hakkına sahiptir. Alıcı, ürün teslim edilmeden önce de cayma hakkını kullanabilir.</p>
<p>6.2. Cayma bildirimi, süre dolmadan info@lidyakuyum.com adresine e-posta ile, Satıcı'nın adresine yazılı olarak veya site üzerindeki hesap bölümünden yapılabilir.</p>
<p>6.3. Alıcı, cayma bildiriminden itibaren 10 gün içinde ürünü, faturası ve kutusuyla birlikte Satıcı'ya geri gönderir. İade, Satıcı'nın anlaşmalı kargo firması <mark class="eksik">[KARGO FİRMASI]</mark> ile ve Satıcı tarafından verilen iade koduyla yapılır; bu durumda iade masrafı Alıcı'dan talep edilmez. Alıcı'nın bulunduğu yerde anlaşmalı kargo firmasının şubesi bulunmaması hâlinde ürün, ek masraf talep edilmeksizin Alıcı'dan teslim alınır.</p>
<p>6.4. Satıcı, cayma bildiriminin kendisine ulaştığı tarihten itibaren 14 gün içinde, teslimat masrafları dahil tahsil edilen tüm ödemeleri, Alıcı'nın satın alırken kullandığı ödeme aracına uygun şekilde iade eder.</p>
<p>6.5. Alıcı, cayma süresi içinde ürünü, niteliğini ve özelliklerini belirlemek için gereken ölçüde incelediği takdirde oluşan değişikliklerden sorumlu değildir. Bu ölçünün ötesinde kullanım, hasar, kırılma, eksik parça veya eksik gram nedeniyle oluşan değer kaybından Alıcı sorumludur. Ürünler, gönderim öncesinde ve iade alındığında tartı ve görüntü kaydıyla kontrol edilir.</p>
<h2>Madde 7 – Cayma hakkının kullanılamayacağı durumlar</h2>
<p>7.1. Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, Alıcı'nın istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünlerde cayma hakkı bulunmamaktadır. "Kendi Tasarımını Yap" bölümünden sipariş edilen isim kolyesi, lazerle resim ve sipariş üzerine hazırlanan diğer kişiye özel ürünler bu kapsamdadır.</p>
<p>7.2. Bu madde, Alıcı'nın ayıplı ürüne ilişkin kanuni haklarını sınırlamaz.</p>
<h2>Madde 8 – Ayıplı ürün</h2>
<p>Alıcı, ayıplı ürün hâlinde 6502 sayılı Kanun'un 11. maddesinde sayılan seçimlik haklarını kullanabilir.</p>
<h2>Madde 9 – Kişisel veriler</h2>
<p>Alıcı'nın kişisel verileri, sitede yer alan KVKK Aydınlatma Metni kapsamında işlenir.</p>
<h2>Madde 10 – Uyuşmazlıkların çözümü</h2>
<p>Bu sözleşmeden doğan uyuşmazlıklarda, Ticaret Bakanlığı tarafından her yıl belirlenen parasal sınırlar dahilinde Alıcı'nın yerleşim yerindeki veya işlemi yaptığı yerdeki Tüketici Hakem Heyetleri; bu sınırları aşan uyuşmazlıklarda, kanunda öngörülen zorunlu arabuluculuk yoluna başvurulduktan sonra Tüketici Mahkemeleri yetkilidir.</p>
<h2>Madde 11 – Yürürlük</h2>
<p>Alıcı, siparişi onayladığı anda bu sözleşmenin tüm koşullarını kabul etmiş sayılır. Sözleşme, siparişin onaylanmasıyla kurulur ve bir örneği Alıcı'nın e-posta adresine gönderilir.</p>
<p><strong>SATICI:</strong> <mark class="eksik">[TİCARİ UNVAN]</mark>  <br>
<strong>ALICI:</strong> <span class="otomatik" data-alan="ALICI_AD_SOYAD">{{ALICI_AD_SOYAD}}</span>  <br>
<strong>Tarih:</strong> <span class="otomatik" data-alan="SIPARIS_TARIHI">{{SIPARIS_TARIHI}}</span></p>`,
};
