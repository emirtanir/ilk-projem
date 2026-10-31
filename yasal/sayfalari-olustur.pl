#!/usr/bin/perl
# Yasal metin taslaklarını (yasal/*.md) site sayfalarına çevirir.
#   Çalıştırma (proje klasöründen):  perl yasal/sayfalari-olustur.pl && sh surum.sh
# - [KÖŞELİ PARANTEZ] yer tutucular sarı vurgulu <mark class="eksik"> olur (eksikler görünsün diye).
# - {{ALAN}} alanları sipariş anında doldurulacak alanlardır: sayfada gri etiket, ödeme sayfasında
#   siparişin bilgileriyle doldurulur (js/yasal-metinler.js + js/odeme.js).
# Metni değiştirmek için .md dosyasını düzenleyip bu betiği yeniden çalıştırın.
use strict;
use warnings;
use utf8;
use open qw(:std :encoding(UTF-8));
use File::Basename qw(dirname);

my $yasal = dirname(__FILE__);
my $kok = "$yasal/..";

# md dosyası => [sayfa adı, sayfa başlığı (sekme)]
my @SAYFALAR = (
  ['01-on-bilgilendirme-formu.md',   'on-bilgilendirme-formu.html'],
  ['02-mesafeli-satis-sozlesmesi.md', 'mesafeli-satis-sozlesmesi.html'],
  ['03-iade-ve-cayma.md',             'iade-ve-cayma.html'],
  ['04-kvkk-aydinlatma-metni.md',     'kvkk.html'],
  ['05-cerez-politikasi.md',          'cerez-politikasi.html'],
  ['06-kargo-bilgileri.md',           'kargo-bilgileri.html'],
);

sub kacir {
  my $t = shift;
  $t =~ s/&/&amp;/g; $t =~ s/</&lt;/g; $t =~ s/>/&gt;/g;
  return $t;
}

# Satır içi biçim: kalın, italik, yer tutucular, otomatik alanlar
sub satir_ici {
  my $t = kacir(shift);
  $t =~ s#\{\{([A-ZÇĞİÖŞÜ_]+)\}\}#<span class="otomatik" data-alan="$1">{{$1}}</span>#g;
  $t =~ s#\[([^\]]+)\]#<mark class="eksik">[$1]</mark>#g;
  $t =~ s#\*\*(.+?)\*\*#<strong>$1</strong>#g;
  $t =~ s#(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])#<em>$1</em>#g;
  return $t;
}

sub hucreler {
  my $satir = shift;
  $satir =~ s/^\s*\|//; $satir =~ s/\|\s*$//;
  return map { my $h = $_; $h =~ s/^\s+|\s+$//g; $h } split /\|/, $satir;
}

# Markdown (kullandığımız kadarı) -> HTML. Başlığı (# ...) ayrı döndürür.
sub donustur {
  my @satirlar = split /\n/, shift;
  my ($baslik, @html, @paragraf, @liste) = ('');
  my $liste_turu = '';
  my $paragrafi_bitir = sub {
    return unless @paragraf;
    my $metin = join("\n", @paragraf);
    my @parca = map { satir_ici($_) } split /\n/, $metin;
    # Satır sonunda iki boşluk: satır kırma
    my $birlesik = '';
    for my $i (0 .. $#parca) {
      $birlesik .= $parca[$i];
      next if $i == $#parca;
      $birlesik .= ($paragraf[$i] =~ /  $/) ? "<br>\n" : ' ';
    }
    push @html, "<p>$birlesik</p>";
    @paragraf = ();
  };
  my $listeyi_bitir = sub {
    return unless @liste;
    push @html, "<$liste_turu>\n" . join("\n", map { "  <li>$_</li>" } @liste) . "\n</$liste_turu>";
    @liste = (); $liste_turu = '';
  };

  for (my $i = 0; $i < @satirlar; $i++) {
    my $s = $satirlar[$i];
    if ($s =~ /^\s*$/) { $paragrafi_bitir->(); $listeyi_bitir->(); next; }
    if ($s =~ /^# (.+)/) { $paragrafi_bitir->(); $listeyi_bitir->(); $baslik = $1; next; }
    if ($s =~ /^(#{2,3}) (.+)/) {
      $paragrafi_bitir->(); $listeyi_bitir->();
      my $n = length $1;
      push @html, "<h$n>" . satir_ici($2) . "</h$n>";
      next;
    }
    if ($s =~ /^> ?(.*)/) { $paragrafi_bitir->(); $listeyi_bitir->(); push @html, '<p class="yasal-giris">' . satir_ici($1) . '</p>'; next; }
    if ($s =~ /^\s*\|/) {
      $paragrafi_bitir->(); $listeyi_bitir->();
      my @tablo;
      while ($i < @satirlar && $satirlar[$i] =~ /^\s*\|/) { push @tablo, $satirlar[$i]; $i++; }
      $i--;
      my @bas = hucreler(shift @tablo);
      shift @tablo if @tablo && $tablo[0] =~ /^\s*\|[\s|:-]+\|\s*$/;   # ayraç satırı
      my $thead = (grep { length } @bas) ? '<thead><tr>' . join('', map { '<th>' . satir_ici($_) . '</th>' } @bas) . "</tr></thead>\n" : '';
      my $tbody = join("\n", map { '<tr>' . join('', map { '<td>' . satir_ici($_) . '</td>' } hucreler($_)) . '</tr>' } @tablo);
      push @html, "<div class=\"tablo-kap\"><table>\n$thead<tbody>\n$tbody\n</tbody></table></div>";
      next;
    }
    if ($s =~ /^- (.+)/) {
      $paragrafi_bitir->();
      $listeyi_bitir->() if $liste_turu && $liste_turu ne 'ul';
      $liste_turu = 'ul'; push @liste, satir_ici($1); next;
    }
    if ($s =~ /^\d+\. (.+)/) {
      $paragrafi_bitir->();
      $listeyi_bitir->() if $liste_turu && $liste_turu ne 'ol';
      $liste_turu = 'ol'; push @liste, satir_ici($1); next;
    }
    # Liste maddesinin devamı (alt satıra kayan metin)
    if (@liste && $s =~ /^\s+(.+)/) { $liste[-1] .= ' ' . satir_ici($1); next; }
    $listeyi_bitir->();
    push @paragraf, $s;
  }
  $paragrafi_bitir->(); $listeyi_bitir->();
  return ($baslik, join("\n", @html));
}

sub oku {
  my $yol = shift;
  open my $f, '<:encoding(UTF-8)', $yol or die "$yol okunamadı: $!";
  local $/; my $t = <$f>; close $f;
  $t =~ s/\r\n/\n/g;
  return $t;
}
sub yaz {
  my ($yol, $icerik) = @_;
  open my $f, '>:encoding(UTF-8)', $yol or die "$yol yazılamadı: $!";
  print $f $icerik; close $f;
}

my %odeme_icin;
for my $s (@SAYFALAR) {
  my ($md, $sayfa) = @$s;
  my ($baslik, $govde) = donustur(oku("$yasal/$md"));
  $odeme_icin{onBilgilendirme} = $govde if $md =~ /^01/;
  $odeme_icin{mesafeliSatis} = $govde if $md =~ /^02/;
  yaz("$kok/$sayfa", <<"HTML");
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>$baslik · Lidya Kuyumculuk</title>
  <link rel="icon" href="logo/lidya-logo-yuvarlak.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght\@0,400;0,500;0,600;1,400;1,500&family=Inter:wght\@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/stil.css">
</head>
<body>
  <div id="ust"></div>

  <!-- BU SAYFA OTOMATİK OLUŞTURULUR: yasal/$md dosyasını düzenleyip "perl yasal/sayfalari-olustur.pl" çalıştırın. -->
  <main class="kap metin-sayfa yasal-sayfa">
    <a class="geri-don" href="index.html"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>Geri dön</a>
    <div class="sayfa-basi">
      <span class="kucuk-baslik">Bilgilendirme</span>
      <h1>$baslik</h1>
    </div>
    <p class="taslak-uyari"><strong>Taslak metin.</strong> Yayından önce avukat kontrolünden geçecek. <mark class="eksik">Sarı</mark> alanlar henüz doldurulmamış bilgilerdir; <span class="otomatik">gri</span> alanlar sipariş anında otomatik doldurulur.</p>
    <article class="yasal-metin">
$govde
    </article>
  </main>

  <div id="alt"></div>

  <script src="https://cdn.jsdelivr.net/npm/\@supabase/supabase-js\@2.117.2/dist/umd/supabase.js"></script>
  <script src="js/supabase.js"></script>
  <script src="js/fiyat.js"></script>
  <script src="js/iletisim.js"></script>
  <script src="js/ortak.js"></script>
</body>
</html>
HTML
  print "Oluşturuldu: $sayfa ($baslik)\n";
}

# Ödeme sayfası için: ön bilgilendirme formu ve mesafeli satış sözleşmesi (HTML olarak)
my $js = "/* BU DOSYA OTOMATİK OLUŞTURULUR (perl yasal/sayfalari-olustur.pl). Elle düzenlemeyin.\n"
       . "   Ödeme sayfasındaki açılır kutularda gösterilir; {{ALAN}} etiketleri siparişin bilgileriyle doldurulur. */\n"
       . "const YASAL_METINLER = {\n";
for my $k (qw(onBilgilendirme mesafeliSatis)) {
  my $t = $odeme_icin{$k};
  $t =~ s/\\/\\\\/g; $t =~ s/`/\\`/g; $t =~ s/\$\{/\\\${/g;
  $js .= "  $k: `$t`,\n";
}
$js .= "};\n";
yaz("$kok/js/yasal-metinler.js", $js);
print "Oluşturuldu: js/yasal-metinler.js\n";
