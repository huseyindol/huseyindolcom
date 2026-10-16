# Tumble Trail 4x4 — Gizlilik Politikası

_Yürürlük tarihi: 16 Ekim 2026_

## Kısaca

- Tumble Trail 4x4 tarafımızca işletilen bir sunucuya kişisel veri **toplamaz ve göndermez**. Hesap, üyelik, e-posta, telefon numarası, fotoğraf, kamera ya da mikrofon izni istemez.
- Oyuncu adı, jetonlar, garaj geliştirmeleri, kişisel rekorlar, yerel puan tablosu ve ayarlar yalnızca **cihazınızda yerel olarak** (iOS UserDefaults / tarayıcı localStorage) saklanır.
- iOS uygulaması, **Google AdMob** üzerinden geçiş reklamı ve isteğe bağlı ödüllü reklam ("Reklam izle → 2× jeton") gösterir. Avrupa Ekonomik Alanı (AEA) ve Birleşik Krallık'ta Google'ın Kullanıcı Mesajlaşma Platformu (**UMP**) onay formu sunulur; iOS'ta reklam yüklenmeden önce Apple'ın **Uygulama Takibi Şeffaflığı (ATT)** izni sorulur. İzin verilmezse reklam istekleri kişiselleştirilmemiş (`npa=1`) olarak yapılır.
- Uygulamada uygulama içi satın alma yoktur.
- Üçüncü taraf analiz (analytics) aracı yoktur.
- **Web sürümü (huseyindol.com/games/tumble-trail):** reklam, satın alma ve analiz aracı yoktur. Oyun verisi yalnızca tarayıcınızın yerel depolamasında tutulur.

## 1. Biz kimiz

Tumble Trail 4x4, bağımsız geliştirici **Hüseyin DOL** tarafından geliştirilen 2.5D bir dağ ve arazi sürüş oyunudur. Bu politika iPhone/iPad uygulaması ve web sürümü için geçerlidir. İletişim: [huseyindol@gmail.com](mailto:huseyindol@gmail.com).

## 2. Oyunun kendisi hangi bilgileri işler

Oyun, oynanabilmesi için yalnızca aşağıdaki bilgileri **cihazınızda yerel olarak** saklar. Bu bilgiler cihazdan çıkmaz, bize iletilmez ve kimseyle paylaşılmaz:

- Seçtiğiniz oyuncu takma adı (en fazla 16 karakter; boş bırakılırsa "Oyuncu" / "Player"), araç rengi ve zorluk modu (Hobby, Kolay, Oto)
- Her oyuncu adına ait jeton kasası, garaj geliştirme seviyeleri (Motor, Lastikler, Süspansiyon, Yakıt Deposu) ve en iyi mesafe rekorları
- Cihazdaki yerel puan tablosu (Kolay/Oto ve Hobby sekmelerinde en iyi 20 koşu: takma ad, mesafe, jeton, renk, zorluk, tarih)
- Ayarlar: ses, titreşim ve dil tercihi (Sistem / Türkçe / English)
- Reklam sıklığı sayaçları: bitirilen toplam koşu sayısı ve son geçiş reklamından bu yana yapılan koşu sayısı

Oyunda çevrimiçi hesap, bulut kaydı, sohbet, arkadaş listesi, kullanıcı içeriği paylaşımı ya da küresel sunucu tabanlı puan tablosu yoktur.

## 3. Reklamlar, onay ve izleme (Google AdMob, UMP ve ATT)

Tumble Trail 4x4 ücretsizdir; iOS uygulamasının geliştirilmesi **Google AdMob** (Google Mobile Ads SDK) aracılığıyla sunulan reklamlarla desteklenir.

**Onay ve izleme tercihleri (UMP ve ATT).**

- **Avrupa kullanıcı onayı (Google UMP):** Avrupa Ekonomik Alanı (AEA), Birleşik Krallık ve İsviçre'deki kullanıcılara, reklam isteği yapılmadan önce Google'ın IAB TCF uyumlu onay formu gösterilir. Seçiminizi istediğiniz zaman ana menünün sağ üstündeki **ⓘ (Bilgi ve ayarlar) → Reklam gizlilik seçenekleri** düğmesinden görüntüleyebilir veya değiştirebilirsiniz (bu satır yalnızca onay formunun geçerli olduğu bölgelerde görünür).
- **Apple Uygulama Takibi Şeffaflığı (ATT):** iOS'ta ilk reklam isteğinden önce sistem izin penceresiyle izleme izni sorulur. İzin verirseniz Google, ilgi alanına dayalı reklam sunmak ve reklam performansını ölçmek için cihazın reklam kimliğini (IDFA) kullanabilir. İzin **vermezseniz** (ya da cihazınızda izleme kısıtlıysa) iOS reklam kimliğini sıfırlar ve uygulama tüm reklam isteklerini **kişiselleştirilmemiş reklam** (`nonPersonalizedAds / npa=1`) olarak gönderir; oyun hiçbir özelliği kısıtlanmadan çalışmaya devam eder. ATT iznini iPhone/iPad **Ayarlar → Gizlilik ve Güvenlik → Takip** bölümünden istediğiniz zaman kapatabilirsiniz.
- **İçerik sınırı:** Reklam istekleri `PG` (ebeveyn rehberliği önerilir) azami içerik derecesiyle yapılır.

**Google'ın işleyebileceği bilgiler.** Google'ın App Store veri beyanı kılavuzuna ve Google Mobile Ads SDK gizlilik manifestine göre SDK; reklam sunmak, reklamları ölçmek, dolandırıcılığı önlemek ve hizmetini iyileştirmek için cihazdan şu veri türlerini işleyebilir:

- **Yaklaşık konum (Coarse Location):** IP adresinden tahmin edilen genel coğrafi bölge (uygulama GPS/kesin konum izni istemez)
- **Cihaz tanımlayıcıları (Device ID):** ATT izni verildiyse reklam kimliği (IDFA) ve uygulamaya/geliştiriciye özgü tanımlayıcılar
- **Ürün etkileşimi (Product Interaction):** uygulamanın açılması ve reklamlarla etkileşim (görüntüleme, kapatma, tıklama, ödüllü video tamamlama)
- **Reklam verisi (Advertising Data):** uygulamada gösterilen reklamlar hakkında bilgiler
- **Tanılama verisi (Diagnostics):** SDK'ya ait çökme kayıtları ve performans ölçümleri

Google'ın bu verileri nasıl işlediği kendi politikalarına tabidir: [Google Gizlilik Politikası](https://policies.google.com/privacy) · [Google, hizmetlerini kullanan site ve uygulamalardan gelen bilgileri nasıl kullanır](https://policies.google.com/technologies/partner-sites).

**Reklamların zamanlaması.**

- **Geçiş reklamları:** Sürüş sırasında, açılışta, garajda, puan tablosunda ya da duraklatıp oyuna devam ederken asla çıkmaz. Yalnızca bir koşu bittikten sonra (Kolay/Oto'da oyun sonu ekranından çıkarken; Hobby modunda duraklat menüsünden çıkarken/baştan başlarken) gösterilebilir. İlk **3 koşu** tamamen reklamsızdır; sonrasında en fazla **2 koşuda 1** ve bir oturumda en fazla **6** geçiş reklamı gösterilir.
- **Ödüllü reklam ("Reklam izle → 2× jeton"):** Yalnızca Kolay/Oto oyun sonu ekranında, tamamen sizin seçiminize bağlı olarak sunulur. İzlerseniz o koşuda topladığınız jeton ve mesafe bonusu ikiye katlanır ve o koşunun çıkışında ayrıca geçiş reklamı gösterilmez.
- İnternet bağlantısı yoksa reklam gösterilmez; oyun çevrimdışı olarak kesintisiz oynanır.

## 4. Uygulama içi satın alma

Uygulamada uygulama içi satın alma veya abonelik yoktur. Uygulama hiçbir ödeme bilgisi istemez ve işlemez.

## 5. Analiz ve çökme raporları

Uygulamada üçüncü taraf analiz (analytics) aracı yoktur (Google Mobile Ads SDK'sının yukarıda açıklanan kendi tanılama verisi dışında). Cihazınızda "Uygulama geliştiricileriyle paylaş" ayarı açıksa Apple, kişisel bilgi içermeyen anonim çökme ve performans raporlarını bize iletebilir; bunu cihazınızın **Ayarlar → Gizlilik ve Güvenlik → Analiz ve İyileştirmeler** bölümünden yönetebilirsiniz.

## 6. Veri saklama ve silme

Oyunun kendi kaydettiği tüm veriler yalnızca cihazınızdadır:

- Uygulamayı cihazınızdan sildiğinizde oyunun cihazdaki tüm yerel kayıtları (isimler, jetonlar, garaj seviyeleri, rekorlar ve ayarlar) silinir.
- Web sürümünde tarayıcı site verilerini temizleyerek yerel kayıtları silebilirsiniz.

Google'ın reklam hizmeti kapsamında işlediği veriler Google'ın gizlilik politikasındaki süre ve kurallara tabidir. Reklam kişiselleştirme ve onay tercihlerinizi oyun içindeki **ⓘ → Reklam gizlilik seçenekleri** (geçerli bölgelerde) veya iOS **Ayarlar → Gizlilik ve Güvenlik → Takip / Apple Reklamları** bölümünden değiştirebilirsiniz.

## 7. Çocukların gizliliği

Tumble Trail 4x4 genel kitleye (4+) yönelik bir oyundur; özel olarak çocuklara yönelik ("Made for Kids") bir uygulama değildir ve oyundaki "Hobby" modu yalnızca aracın devrilmediği rahat bir sürüş modudur. Her yaştan oyuncudan bilerek kişisel veri toplamayız. Bir çocuğun bize e-posta yoluyla kişisel bilgi gönderdiğini fark ederseniz lütfen bizimle iletişime geçin; ilgili iletiyi derhal sileriz.

## 8. Haklarınız

Bulunduğunuz ülkenin mevzuatına göre (ör. KVKK, GDPR) kişisel verilerinize erişme, düzeltme, silme, işlemeyi kısıtlama, itiraz etme ve onayı geri çekme haklarınız olabilir. Biz sunucularımızda size ait kişisel veri tutmadığımız için elimizde size ait bir kayıt bulunmaz; yine de sorularınızı ve taleplerinizi aşağıdaki adrese iletebilirsiniz. Bulunduğunuz ülkedeki veri koruma otoritesine şikâyette bulunma hakkınız saklıdır.

## 9. Değişiklikler

Bu politikayı uygulama ya da mevzuat değiştikçe güncelleyebiliriz. Güncel metin her zaman bu sayfada yürürlük tarihiyle birlikte yayımlanır. Önemli değişiklikleri uygulama güncelleme notlarında da belirtiriz.

## 10. İletişim

Hüseyin DOL (bağımsız geliştirici) · E-posta: [huseyindol@gmail.com](mailto:huseyindol@gmail.com) · Web: [huseyindol.com](https://huseyindol.com) · Destek sayfası: [https://huseyindol.com/games/tumble-trail/destek](https://huseyindol.com/games/tumble-trail/destek)

---
