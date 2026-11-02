Resume Studio, CV hazırlamana, iş ilanları bulmana ve başvurularını takip etmene yardımcı olur.

<p align="center">
  <img src="app/icon.png" width="112" alt="Resume Studio uygulama simgesi" />
</p>

<h1 align="center">Resume Studio</h1>

<p align="center"><strong>Deneyimini anlat. Yeni başvuruna hazırlan.</strong></p>
<p align="center">Yapay zekâ destekli uyarlama, iş arama ve başvuru takibini birleştiren CV editörü ve kariyer çalışma alanı.</p>

<p align="center">
  <a href="README.md">English</a> · <strong>Türkçe</strong><br />
  <a href="#yerel-olarak-çalıştır"><strong>Yerel olarak çalıştır</strong></a> ·
  <a href="#çalışma-alanında-neler-var">Özellikleri keşfet</a> ·
  <a href="https://github.com/ArdaHFO/resume-studio/issues">Hata bildir</a>
</p>

---

CV oluştur, farklı roller için sürümlerini karşılaştır, iş ilanlarını incele ve başvurularını tek çalışma alanında tut. **Resume Studio**, **CSpark Content Studio** içerik projesinden ayrı olan CV ve kariyer projesidir. Arayüzde form tabanlı düzenleme, üç CV şablonu, yapay zekâ önerileri, tarayıcıdan yazdırma ve paylaşım bağlantıları bulunur.

**Bu, geliştirme aşamasındaki bir web uygulamasıdır.** Bazı entegrasyonlar harici hesaplar gerektirir. Editörün ve sürüm geçmişinin bazı bölümleri tarayıcıdaki yerel depolamayı kullanır. Aşağıdaki özellikler kaynak kodda bulunan uygulamayı anlatır ve dağıtımdaki her akışın doğrulandığı anlamına gelmez.

## Başlangıç

| Gereksinim | Repo kurulumu |
| --- | --- |
| Çalışma ortamı | Node.js 20.9.0 veya üzeri |
| Paket yöneticisi | npm ve repodaki kilit dosyası |
| Hesaplar ve veriler | Auth ve sağlanan SQL şemasıyla Supabase projesi |
| Ana yapay zekâ hizmeti | Yapılandırılmış Llama 3.3 modeli için Groq API anahtarı |
| İsteğe bağlı hizmetler | Apify iş kaynakları, Stripe ödeme ve Resend hatırlatmaları |

1. Yerel kurulumu tamamla ve uygulama üzerinden hesap oluştur.
2. CV oluştur veya desteklenen bir belgeyi içe aktar. Kişisel bilgiler, deneyim, eğitim ve becerileri düzenle.
3. Şablon seç, yapılandırılmışsa yapay zekâ önerilerini incele, yazdırma veya paylaşım akışını kullan.
4. Rolleri ara ve kariyer panelinde başvuru ilerlemesini kaydet.

## Çalışma alanında neler var?

- **Yapılandırılmış CV düzenleme.** Ayrı formlar kişisel bilgiler, deneyim, eğitim, beceriler ve özel bölümleri kapsar.
- **Üç sunum biçimi.** Modern, Azurill ve Academic şablonları farklı düzenler sunar. Academic akışı LaTeX üretme ve düzenleme yardımcıları içerir.
- **Yapay zekâ destekli yazım.** Groq kullanan rotalar CV uyarlama, ön yazı, bölüm iyileştirme, değerlendirme ve anahtar kelime çıkarma sağlar.
- **Belge içe aktarma.** Yükleme rotaları PDF ve Word içeriğini çıkarır, ardından yapılandırılmış CV'yi yapay zekâ ile doldurur.
- **İş keşfi.** LinkedIn, Workday ve CareerOne bağdaştırıcıları, ilgili token'lar tanımlandığında Apify aktörlerini kullanır.
- **Başvuru ve sürüm geçmişi.** Panel görünümleri başvuruları, işe özel iyileştirmeleri ve CV anlık görüntülerini takip eder.
- **Yazdırma ve paylaşım.** Yazdırılabilir HTML hazırla, paylaşım bağlantıları oluştur ve QR işlevine eriş.

Yapay zekâ önerileri başvuranın gerçek deneyimini korumalıdır. Üretilen uyum puanı veya yeni paragraf, doğrulanmış işe alım sonucu değil, bir öneridir.

## Repodaki önizleme

Bu mevcut görsel repoda saklanır ve CV panelini gösterir. Yeni alınmış bir ekran görüntüsü veya güncel dağıtımın doğrulaması değildir. Uygulama kaynağında ve eski görsellerde önceki CSPARK etiketi hâlâ bulunabilir.

<p align="center">
  <img src="public/dashboard.png" width="900" alt="CV sayısı, varsayılan CV ve düzenlenebilir CV kartları içeren panel" />
</p>

## Yerel olarak çalıştır

Kilit dosyasında **Next.js 16.1.6** ve **React 19.2.3** bulunur. Proje ayrıca TypeScript, Tailwind CSS 4, Supabase ve Zustand kullanır.

```bash
git clone https://github.com/ArdaHFO/resume-studio.git
cd resume-studio
npm ci
```

Repo kökünde `.env.local` oluştur:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_key
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
GROQ_API_KEY=your_groq_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Service-role ve sağlayıcı anahtarlarını sunucuda ve sürüm kontrolünün dışında tut.

Yeni bir Supabase projesinde [supabase/migrations](supabase/migrations/) altındaki SQL dosyalarını inceleyerek dosya adı sırasıyla uygula. İki ayrı `009_` dosyası vardır ve örtüşen `ADD COLUMN IF NOT EXISTS` ifadeleri kullanır. Repoda Supabase CLI proje yapılandırması bulunmadığından tek komutlu migration akışı varsayma. Auth yönlendirme adreslerine `http://localhost:3000/auth/callback` ekle. Google ile giriş kullanacaksan OAuth ayarlarını da yapılandır.

Yalnızca kullanmak istediğin entegrasyonları ekle:

| Değişkenler | Amaç |
| --- | --- |
| `APIFY_API_TOKEN` | LinkedIn iş aktörü |
| `APIFY_WORKDAY_TOKEN` | Workday iş aktörü |
| `APIFY_CAREERONE_TOKEN` | CareerOne iş aktörü |
| `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Ödeme entegrasyonu |
| `RESEND_API_KEY` | Zamanlanmış hatırlatma e-postaları |

```bash
npm run dev
```

[localhost:3000](http://localhost:3000) adresini aç. Yapılandırılmış geliştirme ortamında uygulamayı kontrol edip derlemek için:

```bash
npm run lint
npm run build
npm start
```

Bu komutlar geliştirme içindir. Belge güncellemesi sırasında çalıştırılmadılar.

## Yapay zekâ ve veri akışı

Güncel [ana yapay zekâ rotası](app/api/ai/route.ts) ile özel uyarlama, ön yazı ve bölüm iyileştirme rotaları, `llama-3.3-70b-versatile` modeliyle [Groq yardımcılarını](lib/ai/groq.ts) çağırır.

Repoda [OpenAI yardımcıları](lib/ai/openai.ts), [Gemini yardımcıları](lib/ai/gemini.ts) ve [önceki Gemini notları](GEMINI_INTEGRATION.md) da korunur. Dosyaların bulunması, ana rotada aktif sağlayıcı oldukları anlamına gelmez.

Supabase hesap ve veritabanı işlemlerini yönetir. Güncel editör CV içeriğini `localStorage` içine kaydeder. [Sürüm geçmişi](lib/version-history.ts) de anlık görüntüleri o tarayıcıda tutar. Bu yerel kayıtların cihazlar arasında eşitlendiğini varsayma.

## Doğrulama ve mevcut sınırlar

Bu belgeler kaynak kod, paket bilgileri ve mevcut önizleme görseliyle karşılaştırıldı. Derleme, oturum açılmış tarayıcı akışı, veritabanı migration'ı veya ücretli hizmet isteği çalıştırılmadı.

- Entegrasyonlar kullanılamadığında iş arama örnek ilanlar döndürebilir. Yanıttaki `source` alanını incele.
- İşe özel uyarlama `fallback: true` döndürebilir. Yapay zekâ ayrıştırması kullanılamadığında CV içe aktarma boş bir yapılandırılmış şablon verebilir.
- PDF rotası HTML döndürür. Editör tarayıcının yazdırma penceresini açar ve kullanıcı buradan PDF kaydedebilir. Sunucuda PDF oluşturma hizmeti değildir.
- LaTeX akışı projeye özel ayrıştırma ve gösterim yardımcıları kullanır. Genel amaçlı TeX derleme ortamı değildir.
- Ücretli ödeme geçici olarak kapalıdır. Repoda sunucu tarafında doğrulanmış ve aynı ödemenin tekrar işlenmesini engelleyen bir hak tanımlama akışı yoktur. Dönüş adresindeki parametreler plan açamaz veya kredi ekleyemez. Ödeme yeniden açılmadan önce mevcut tahsilatlar elle kontrol edilmelidir.
- Site verileri temizlendiğinde tarayıcıdaki CV içeriği ve sürüm geçmişi kaybolabilir.
- İncelenen dosya ağacında otomatik test komutu veya CI iş akışı bulunmaz. Ödeme, paylaşım, içe aktarma ve hatırlatmalar hedef dağıtımda entegrasyon doğrulaması gerektirir.

## Proje yapısı

```text
app/                  Sayfalar, CV editörü, paylaşım görünümleri ve API rotaları
features/editor/      Formlar, CV şablonları ve LaTeX yardımcıları
components/           Ortak arayüz bileşenleri
lib/                  AI, Auth, Supabase, veritabanı ve yerel geçmiş yardımcıları
supabase/migrations/  SQL şeması ve özellik migration'ları
public/               Mevcut marka ve arayüz görselleri
types/                Ortak TypeScript veri türleri
```

## Belgeler ve katkı

- [Veritabanı migration'ları](supabase/migrations/)
- [Ana yapay zekâ API'si](app/api/ai/route.ts) · [İş arama bağdaştırıcıları](app/api/jobs/search/route.ts)
- [CV içe aktarma](app/api/cv/upload/route.ts) · [Yazdırmaya hazırlama](app/api/pdf/route.ts)
- [Önceki Gemini entegrasyon notları](GEMINI_INTEGRATION.md)
- [Hata bildirimleri ve özellik talepleri](https://github.com/ArdaHFO/resume-studio/issues)

Hata bildiriminde ilgili rotayı, şablonu, sağlayıcı yapılandırmasını ve yeniden üretme adımlarını belirt. Kişisel başvuru verileri yerine sentetik CV örnekleri kullan. Pull request'lerde yerel arayüz kontrollerini veritabanı ve hizmet entegrasyonu kontrollerinden ayır.

## Lisans ve kaynaklar

Bu repoda bağımsız bir lisans dosyası bulunmaz. Bu belgeler lisans koşulu eklemez veya değiştirmez. Mevcut görseller, paket bildirimleri ve üçüncü taraf hakları korunur.
