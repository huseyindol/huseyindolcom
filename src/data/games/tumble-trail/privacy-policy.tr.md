# Offroad Trail 4x4 — Gizlilik Politikası

_Yürürlük tarihi: 1 Kasım 2026_

## Kısaca

- Offroad Trail 4x4 sizden hesap, üyelik, e-posta adresi, telefon numarası, gerçek ad-soyad, fotoğraf, kamera ya da mikrofon izni **istemez**.
- Jeton kasanız, garaj geliştirmeleriniz, kişisel kategori rekorlarınız ve ayarlarınız **cihazınızda yerel olarak** (iOS UserDefaults / tarayıcı localStorage) saklanır.
- **Küresel Skor Tablosu ve İsteğe Bağlı Apple Game Center Yedeği:** Sürüm 1.1.0 itibarıyla oyun, her cihaz veya tarayıcı için üyeliksiz rastgele bir anonim kimlik (**Firebase Anonymous Auth**) oluşturur ve seçip kalıcı olarak sabitlediğiniz takma adla en yüksek mesafe rekorunuzu (en fazla 16 karakterlik takma ad, mesafe, jeton, araç rengi ve zorluk kategorisi) Avrupa bölgesinde barındırılan **Google Cloud Firestore** (`eur3`) üzerindeki küresel puan tablosuna kaydeder. iPhone ve iPad'de dilerseniz **Apple Game Center** hesabınızı bağlayarak kilitli küresel sürücü adınızı ve rekorlarınızı cihazlarınız arasında yedekleyip geri yükleyebilirsiniz (e-posta, gerçek ad veya arkadaş listesi toplanmaz; Web sürümü yalnızca anonim kimlik kullanır).
- **Anonim oynanış analitiği:** Oyun dengesini ve kararlılığını iyileştirmek için iOS ve Web sürümlerinde **Google Analytics for Firebase** aracılığıyla anonim oyun içi olaylar (ekran geçişleri, koşu başlangıcı/bitiş nedeni, garaj yükseltmeleri, sezon teması tercihi) ölçülür.
- **Reklamlar (yalnız iOS uygulaması):** **Google AdMob** üzerinden geçiş reklamı ve isteğe bağlı ödüllü reklam ("Reklam izle → 2× jeton") gösterilir. Avrupa Ekonomik Alanı (AEA) ve Birleşik Krallık'ta Google'ın Kullanıcı Mesajlaşma Platformu (**UMP**) onay formu sunulur; iOS'ta reklam yüklenmeden önce Apple'ın **Uygulama Takibi Şeffaflığı (ATT)** izni sorulur. İzin verilmezse reklam istekleri kişiselleştirilmemiş (`npa=1`) olarak yapılır. Web sürümünde reklam yoktur.
- Uygulamada uygulama içi satın alma yoktur.

## 1. Biz kimiz

Offroad Trail 4x4, bağımsız geliştirici **Hüseyin DOL** tarafından geliştirilen 2.5D bir dağ ve arazi sürüş oyunudur. Bu politika iPhone/iPad uygulaması ve web sürümü (`huseyindol.com/games/tumble-trail`) için geçerlidir. İletişim: [huseyindol@gmail.com](mailto:huseyindol@gmail.com).

## 2. Oyunun kendisi hangi bilgileri işler

**Cihazınızda yerel olarak saklanan bilgiler.** Aşağıdaki ilerleme ve tercih verileri yalnızca cihazınızda (iOS UserDefaults veya tarayıcı localStorage) tutulur:

- Seçip cihazınıza sabitlediğiniz sürücü takma adı (2–16 karakter; henüz küresel ad belirlenmediyse yerel profil), araç rengi ve zorluk modu (Hobby, Kolay, Oto)
- Jeton kasanız, garaj geliştirme seviyeleri (Motor, Lastikler, Süspansiyon, Yakıt Deposu) ve her zorluk kategorisindeki (Hobby, Kolay, Oto) yerel en iyi mesafe ile koşu geçmişi
- Ayarlar: ses, titreşim, dil tercihi (Sistem / Türkçe / English) ve sezon teması tercihi (Otomatik / Açık / Kapalı)
- Reklam sıklığı sayaçları (yalnız iOS): bitirilen toplam koşu sayısı ve son geçiş reklamından bu yana yapılan koşu sayısı

**Küresel Skor Tablosu (Firebase Anonymous Auth, iOS Apple Game Center ve Cloud Firestore).** Oyundaki Puan Tablosu ekranında Hobby, Kolay ve Oto kategorilerinin her biri için tüm oyuncuların en yüksek mesafeleri küresel olarak sıralanır:

- Oyun, herhangi bir üyelik veya parola istemeden cihazınıza rastgele bir anonim kullanıcı kimliği (**Firebase Anonymous Auth UID**) atar. Bu kimlik yalnızca küresel tabloda benzersiz takma adınızı sabitlemek ve kategori başına tek rekor satırınızı güncelleyebilmek için kullanılır.
- **İsteğe bağlı Apple Game Center bağlantısı (yalnız iOS):** iPhone veya iPad'de Game Center oturumunuz açıksa (veya küresel ad penceresindeki **Game Center ile Bağlan** ya da **ⓘ → Game Center** düğmesini seçerseniz), Apple'ın `GameKit` doğrulaması yalnızca anonim Firebase kimliğinizi Game Center oyuncu kimliğinize (`gc.apple.com`) bağlamak ve henüz ad seçmediyseniz Game Center takma adınızı önermek için kullanılır. Böylece uygulamayı silip yüklediğinizde ya da yeni bir iPhone/iPad'e geçtiğinizde kilitli küresel sürücü adınız ve kişisel kategori rekorlarınız otomatik geri yüklenir. Game Center bağlantısı tamamen isteğe bağlıdır; arkadaş listenize, e-posta adresinize veya Apple Hesabı kişisel bilgilerinize erişilmez ve reklam takibi amacıyla kullanılmaz.
- Açılışta sunulan küresel sürücü adı penceresinden (veya ana menüdeki sürücü plakasından / puan tablosundan) benzersiz bir takma ad (2–16 karakter, uygunsuz ifade içermeyen; lütfen gerçek adınızı veya kişisel bilginizi yazmayın) seçip onayladığınızda bu takma ad bulutta (`/players/{uid}` ve `/usernames/{key}`) başka oyuncularla çakışmayacak biçimde cihazınıza **tek seferlik ve kalıcı olarak** sabitlenir. İnternet bağlantınız yoksa **Çevrimdışı Oyna** seçeneğiyle isim sabitlemeden yerel olarak oynayabilirsiniz; bu durumda küresel sıralamaya hiçbir skor gönderilmez.
- Takma adınızı sabitledikten sonra kişisel mesafe rekorunuzu kırdığınızda (veya sabitleme sırasında seçtiğiniz en fazla 2 geçmiş yerel kategori rekorunuz taşındığında) **Google Cloud Firestore** (`eur3` — Avrupa bölgesi) veritabanına yalnızca şu 6 alan gönderilir: sabitlediğiniz takma ad, mesafe (metre), o koşuda kazanılan jeton sayısı, araç rengi, zorluk modu (`hobby`, `easy` veya `auto`) ve sunucu güncelleme zamanı.
- Küresel skor tablosu tüm oyuncular tarafından oyun içinde görüntülenebilir (İlk 50 liste ve kendi dünya sıranız). Sınırsız jetonlu test/VIP takma adları adil rekabet için küresel tabloya yüklenmez. Oyunda sohbet, özel mesajlaşma veya arkadaş listesi yoktur.

## 3. Reklamlar, onay ve izleme (Google AdMob, UMP ve ATT — yalnız iOS)

Offroad Trail 4x4 ücretsizdir; iOS uygulamasının geliştirilmesi **Google AdMob** (Google Mobile Ads SDK) aracılığıyla sunulan reklamlarla desteklenir. Web sürümünde reklam gösterilmez.

**Onay ve izleme tercihleri (UMP ve ATT).**

- **Avrupa kullanıcı onayı (Google UMP):** Avrupa Ekonomik Alanı (AEA), Birleşik Krallık ve İsviçre'deki kullanıcılara, reklam isteği yapılmadan önce Google'ın IAB TCF uyumlu onay formu gösterilir. Seçiminizi istediğiniz zaman ana menünün sağ üstündeki **ⓘ (Bilgi ve ayarlar) → Reklam gizlilik seçenekleri** düğmesinden görüntüleyebilir veya değiştirebilirsiniz (bu satır yalnızca onay formunun geçerli olduğu bölgelerde görünür).
- **Apple Uygulama Takibi Şeffaflığı (ATT):** iOS'ta ilk reklam isteğinden önce sistem izin penceresiyle izleme izni sorulur. İzin verirseniz Google, ilgi alanına dayalı reklam sunmak ve reklam performansını ölçmek için cihazın reklam kimliğini (IDFA) kullanabilir. İzin **vermezseniz** (ya da cihazınızda izleme kısıtlıysa) iOS reklam kimliğini sıfırlar ve uygulama tüm reklam isteklerini **kişiselleştirilmemiş reklam** (`nonPersonalizedAds / npa=1`) olarak gönderir; oyun hiçbir özelliği kısıtlanmadan çalışmaya devam eder. ATT iznini iPhone/iPad **Ayarlar → Gizlilik ve Güvenlik → Takip** bölümünden istediğiniz zaman kapatabilirsiniz.
- **İçerik sınırı:** Reklam istekleri `PG` (ebeveyn rehberliği önerilir) azami içerik derecesiyle yapılır.

**Google'ın reklam kapsamında işleyebileceği bilgiler.** Google'ın App Store veri beyanı kılavuzuna ve Google Mobile Ads SDK gizlilik manifestine göre SDK; reklam sunmak, reklamları ölçmek, dolandırıcılığı önlemek ve hizmetini iyileştirmek için cihazdan şu veri türlerini işleyebilir:

- **Yaklaşık konum (Coarse Location):** IP adresinden tahmin edilen genel coğrafi bölge (uygulama GPS/kesin konum izni istemez)
- **Cihaz tanımlayıcıları (Device ID):** ATT izni verildiyse reklam kimliği (IDFA) ve uygulamaya/geliştiriciye özgü tanımlayıcılar
- **Ürün etkileşimi (Product Interaction):** uygulamanın açılması ve reklamlarla etkileşim (görüntüleme, kapatma, tıklama, ödüllü video tamamlama)
- **Reklam verisi (Advertising Data):** uygulamada gösterilen reklamlar hakkında bilgiler
- **Tanılama verisi (Diagnostics):** SDK'ya ait çökme kayıtları ve performans ölçümleri

Google'ın bu verileri nasıl işlediği kendi politikalarına tabidir: [Google Gizlilik Politikası](https://policies.google.com/privacy) · [Google, hizmetlerini kullanan site ve uygulamalardan gelen bilgileri nasıl kullanır](https://policies.google.com/technologies/partner-sites).

**Reklamların zamanlaması.**

- **Geçiş reklamları:** Sürüş sırasında, açılışta, garajda, puan tablosunda ya da duraklatıp oyuna devam ederken asla çıkmaz. Yalnızca bir koşu bittikten sonra (Kolay/Oto'da oyun sonu ekranından çıkarken; Hobby modunda duraklat menüsünden çıkarken/baştan başlarken) gösterilebilir. İlk **3 koşu** tamamen reklamsızdır; sonrasında en fazla **2 koşuda 1** ve bir oturumda en fazla **6** geçiş reklamı gösterilir.
- **Ödüllü reklam ("Reklam izle → 2× jeton"):** Yalnızca Kolay/Oto oyun sonu ekranında, tamamen sizin seçiminize bağlı olarak sunulur. İzlerseniz o koşuda topladığınız jeton ve mesafe bonusu ikiye katlanır ve o koşunun çıkışında ayrıca geçiş reklamı gösterilmez.
- İnternet bağlantısı yoksa reklam gösterilmez ve oyun çevrimdışı olarak kesintisiz oynanır.

## 4. Uygulama içi satın alma

Uygulamada uygulama içi satın alma veya abonelik yoktur. Uygulama hiçbir ödeme bilgisi istemez ve işlemez.

## 5. Analiz ve çökme raporları (Google Analytics for Firebase ve Apple)

Oyun dengesini (örneğin hangi mesafelerde yakıtın bittiğini veya aracın devrildiğini, hangi garaj geliştirmelerinin tercih edildiğini) anlamak ve teknik sorunları tespit etmek amacıyla iOS ve Web sürümlerinde **Google Analytics for Firebase** kullanılır:

- Gönderilen olaylar yalnızca anonim oyun içi etkileşimlerden oluşur: açılan ekran (`menu`, `game`, `garage`, `leaderboard`, `info_sheet`), koşu başlangıcı ve bitiş nedeni (`flipped`, `out_of_fuel`, `quit_pause`), ulaşılan mesafe ve jeton, garaj geliştirme seviyeleri, ödüllü 2× jeton kullanımı ve sezon teması tercihi.
- Firebase Analytics uygulama örneği kimliği, cihaz modeli, işletim sistemi sürümü ve IP adresinden türetilen yaklaşık ülke/bölge bilgisini işleyebilir; oyuncunun gerçek kimliğini (ad, e-posta, telefon) toplamaz ve üçüncü taraf uygulamalar genelinde reklam takibi (tracking) amacıyla kullanılmaz. Ayrıntılar: [Firebase Gizlilik ve Güvenlik](https://firebase.google.com/support/privacy).
- Ayrıca iOS cihazınızda "Uygulama geliştiricileriyle paylaş" ayarı açıksa Apple, kişisel bilgi içermeyen anonim çökme ve performans raporlarını bize iletebilir; bunu cihazınızın **Ayarlar → Gizlilik ve Güvenlik → Analiz ve İyileştirmeler** bölümünden yönetebilirsiniz.

## 6. Veri saklama ve silme

- **Yerel oyun kayıtları:** Uygulamayı cihazınızdan sildiğinizde (veya web sürümünde tarayıcı site verilerini temizlediğinizde) cihazdaki tüm yerel kayıtlar (jetonlar, garaj seviyeleri, yerel rekorlar ve ayarlar) silinir.
- **Küresel skor tablosu ve takma ad kaydı:** Küresel tablodaki takma adınız tekillik ve adil rekabet için cihazınızın anonim kimliğine kalıcı olarak sabitlenir. Cihazınıza ait anonim takma ad rezervasyonunun ve küresel skor satırlarının tamamen silinmesini isterseniz tablodaki takma adınızı, zorluk sekmesini ve mesafe/jeton değerini belirterek [huseyindol@gmail.com](mailto:huseyindol@gmail.com) adresine e-posta gönderebilirsiniz; ilgili kayıtları makul süre içinde sileriz.
- **Google AdMob ve Firebase verileri:** Google'ın reklam ve analiz hizmetleri kapsamında işlediği veriler Google ve Firebase'in veri saklama sürelerine tabidir. Reklam kişiselleştirme ve onay tercihlerinizi oyun içindeki **ⓘ → Reklam gizlilik seçenekleri** (geçerli bölgelerde) veya iOS **Ayarlar → Gizlilik ve Güvenlik → Takip / Apple Reklamları** bölümünden değiştirebilirsiniz.

## 7. Çocukların gizliliği

Offroad Trail 4x4 genel kitleye (4+) yönelik bir oyundur; özel olarak çocuklara yönelik ("Made for Kids") bir uygulama değildir ve oyundaki "Hobby" modu yalnızca aracın devrilmediği rahat bir sürüş modudur. Her yaştan oyuncudan bilerek gerçek kimlik veya iletişim verisi toplamayız; küresel skor tablosunda gerçek ad yerine takma ad kullanılmasını öneririz. Küresel skor tablosuna veya e-posta yoluyla kişisel bilgi girildiğini fark ederseniz lütfen bizimle iletişime geçin; ilgili kaydı derhal kaldırırız.

## 8. Haklarınız

Bulunduğunuz ülkenin mevzuatına göre (ör. KVKK, GDPR) verilerinize erişme, düzeltme, silme, işlemeyi kısıtlama, itiraz etme ve onayı geri çekme haklarınız olabilir. Küresel skor tablosundaki anonim kaydınızın kaldırılması dahil her türlü soru ve talebinizi aşağıdaki iletişim adresine iletebilirsiniz. Bulunduğunuz ülkedeki veri koruma otoritesine şikâyette bulunma hakkınız saklıdır.

## 9. Değişiklikler

Bu politikayı uygulama ya da mevzuat değiştikçe güncelleyebiliriz. Güncel metin her zaman bu sayfada yürürlük tarihiyle birlikte yayımlanır. Önemli değişiklikleri uygulama güncelleme notlarında da belirtiriz.

## 10. İletişim

Hüseyin DOL (bağımsız geliştirici) · E-posta: [huseyindol@gmail.com](mailto:huseyindol@gmail.com) · Web: [huseyindol.com](https://huseyindol.com) · Destek sayfası: [https://huseyindol.com/games/tumble-trail/destek](https://huseyindol.com/games/tumble-trail/destek)

---
