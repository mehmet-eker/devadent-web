import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Phone, MapPin, Clock, ChevronLeft, ChevronRight, Star, Menu, X,
  Sparkles, Stethoscope, ShieldCheck, HeartHandshake, Baby,
  Users, Quote, ArrowUpRight, Instagram,
} from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import logoImg from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  component: Index,
});

const PHONE = "+90 533 190 91 46";
const PHONE_HREF = "tel:+905331909146";
const MAPS_HREF = "https://maps.app.goo.gl/SgPUps1TCoSmrXhY9";
const ADDRESS = "İsa Divanlı, Sarayaltı Cd. No:51/A, 46080 Dulkadiroğlu / Kahramanmaraş";
const DENTIST_NAME = "Dt. Ecem Dereli";
const INSTAGRAM_HANDLE = "@devadentdis";
const INSTAGRAM_HREF = "https://www.instagram.com/devadentdis/";
const INSTAGRAM_HANDLE_DOCTOR = "@dt.ecemdereli";
const INSTAGRAM_HREF_DOCTOR = "https://www.instagram.com/dt.ecemdereli/";

// gtag.js __root.tsx içinde global olarak yükleniyor; burada sadece tipini tanıtıyoruz.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Ads "Telefon Araması" dönüşümü.
// tel: linkleri sayfayı yeniden yüklemez (telefon uygulaması açılır), bu yüzden
// olayı doğrudan gönderip linkin varsayılan davranışına engel olmuyoruz.
function trackPhoneConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-16847363389/BiPMCJPmo7scEL26ueE-",
  });
}

const slides = [
  {
    image: hero1,
    eyebrow: "Kahramanmaraş · Dulkadiroğlu",
    title: ["Gülüşünüze", "deva"],
    subtitle: "Modern donanım, kadın hekim dokunuşu ve sakin bir klinik atmosferi. Diş bakımının korkulacak bir şey olmadığını size hatırlatmak için buradayız.",
  },
  {
    image: hero2,
    eyebrow: "Estetik Diş Hekimliği",
    title: ["Doğal görünen", "beyazlık"],
    subtitle: "Lamine, bonding ve profesyonel beyazlatma ile size en çok yakışan gülüşü abartısız bir şekilde tasarlıyoruz.",
  },
  {
    image: hero3,
    eyebrow: "Aileniz İçin Klinik",
    title: ["7'den 70'e", "güvenli bakım"],
    subtitle: "Çocuk diş hekimliğinden implanta, kanal tedavisinden cerrahiye kadar tek çatı altında. Her yaşa, her ihtiyaca özel bakım.",
  },
];

const services = [
  { icon: Sparkles, color: "var(--clay)", title: "Estetik Diş Hekimliği", body: "Lamine, bonding ve dijital gülüş tasarımı ile size yakışan doğal gülüş." },
  { icon: Stethoscope, color: "var(--primary)", title: "İmplant Tedavisi", body: "Eksik dişler için kalıcı ve konforlu çözümler. Planlamadan iyileşmeye kadar yanınızdayız." },
  { icon: ShieldCheck, color: "var(--primary)", title: "Kanal Tedavisi", body: "Mikroskobik hassasiyet ve ağrısız teknikle dişinizi kurtarmaya odaklı tedavi." },
  { icon: Baby, color: "var(--clay)", title: "Çocuk Diş Hekimliği", body: "Küçük misafirlerimiz için sevgi dolu, oyunlu ve sabırlı bir muayene deneyimi." },
  { icon: HeartHandshake, color: "var(--gold)", title: "Genel Diş Bakımı", body: "Düzenli kontrol, dolgu ve diş taşı temizliği ile gülüşünüzün yıllık bakımı." },
];

const stats = [
  { icon: Users, value: "5.000+", label: "Memnun hasta" },
  { icon: Star, value: "4.7", label: "Google puanı" },
];

const reviews = [
  { 
    name: "Emel E.", 
    text: "Dişçi fobim vardı. Ecem hanım sakin ve sabırla tedavi sürecimi açıkladı ve işlemler sırasında da eli o kadar hafifti ki hiç canım yanmadı. Klinik hijyenik ve ferahtı, fiyatları da diğer kliniklerle kıyasla daha uygundu. Ekibine ve hekim hanıma teşekkür ederim.", 
    rating: 5 
  },
  { 
    name: "Leyla Nur E.", 
    text: "Kanal tedavisi sürecimde göstermiş olduğunuz ilgi, özen ve profesyonellik için sizlere teşekkür ederim. Tedavi sürecim başından sonuna kadar son derece konforlu ve güven vericiydi. Alanında uzman ekibiniz sayesinde hiçbir endişe duymadan işlemi tamamladım.", 
    rating: 5 
  },
  { 
    name: "Eysan Nazlı B.", 
    text: "Yirmilik diş çekimi için gittim ağrıyla iki hafta dolaştım korkumdan. İğneyi bile o kadar hafif yaptılar ki kendi kendime bundan mı korktum dedim. Doktor beni o kadar çok sakinleştirdi ki çok memnun kaldım. Klinik tertemizdi.", 
    rating: 5 
  },
  { 
    name: "Zehra U.", 
    text: "2 gün önce estetik dolgu yaptırdım çok korkuyordum hekimimle konuşana kadar, onunla konuştuktan sonra tüm güler yüzü ve ilgisiyle korkularımı yendim ve ortaya çok güzel bir iş çıktı. Bundan sonra tercihimiz kesinlikle Deva Dent ailesi.", 
    rating: 5 
  },
  { 
    name: "Abdurrahman K.", 
    text: "Ailecek tercih ettiğimiz bir klinik hizmet ve dişlere gösterilen özen gerçekten üst düzey. Çok memnunuz hepimiz, elinize emeğinize sağlık.", 
    rating: 5 
  },
  { 
    name: "Yasemin K.", 
    text: "Çocuklarım ve ben Deva Dent'te dolgu yaptırdık. İlgi alakaları çok güzel, güler yüzlü personeli ve hijyen ön planda. Kesinlikle farklı bir yerde işlem yaptırmam.", 
    rating: 5 
  },
  { 
    name: "İlayda T.", 
    text: "Temiz ve ekibi nazik insanlardan oluşan bir klinik. Genel olarak çok memnun kaldım. İşçilikleri gayet iyi. Güvenerek gidebilirsiniz.", 
    rating: 5 
  },
  { 
    name: "Şule T.", 
    text: "Güler yüzlü personelleri ve işin uzmanı hekimleri ile güvenle gidebileceğiniz tertemiz bir klinik. Deva Dent ailesine teşekkür ederim.", 
    rating: 5 
  },
  { 
    name: "Büşra A.", 
    text: "Çok temiz bir yer. Çalışanlar ve hocalar çok güler yüzlü, bizimle çok güzel ilgilendiler. Çok memnun kaldım teşekkür ederim.", 
    rating: 5 
  },
  { 
    name: "Beyda A.", 
    text: "Temiz ve ferah bir diş kliniği. Randevu oluşturmada ve tedavide bir sorun yaşamadım, sorularımı itinayla cevaplayan ve ilgilenen hekimime teşekkür ederim.", 
    rating: 5 
  }
];

const schedule = [
  { day: "Pazartesi", hours: "09:00 – 19:00", jsDay: 1 },
  { day: "Salı", hours: "09:00 – 19:00", jsDay: 2 },
  { day: "Çarşamba", hours: "09:00 – 19:00", jsDay: 3 },
  { day: "Perşembe", hours: "09:00 – 19:00", jsDay: 4 },
  { day: "Cuma", hours: "09:00 – 19:00", jsDay: 5 },
  { day: "Cumartesi", hours: "10:00 – 17:00", jsDay: 6 },
  { day: "Pazar", hours: "Kapalı", jsDay: 0 },
];

const navLinks = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#neden-biz", label: "Neden Biz" },
  { href: "#yorumlar", label: "Yorumlar" },
  { href: "#ziyaret", label: "Ziyaret" },
];

/* ───────────────────────── Header ───────────────────────── */
function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoImg} alt="Deva Dent logosu" className="w-10 h-10 object-contain" />
          <span className="font-display text-xl text-foreground">Deva Dent</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={MAPS_HREF} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/15 text-sm hover:bg-foreground/5 transition">
            <MapPin className="w-4 h-4" /> Yol Tarifi
          </a>
          <a href={PHONE_HREF} onClick={trackPhoneConversion}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
            <Phone className="w-4 h-4" /> Ara
          </a>
        </div>

        <button className="md:hidden p-2 rounded-full bg-foreground/5" onClick={() => setOpen(!open)} aria-label="Menü">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-cream border-t border-border"
          >
            <div className="px-5 py-6 flex flex-col gap-4">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-foreground/80 text-lg">{l.label}</a>
              ))}
              <div className="flex gap-2 pt-3">
                <a href={PHONE_HREF} onClick={trackPhoneConversion} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-primary text-primary-foreground">
                  <Phone className="w-4 h-4" /> Ara
                </a>
                <a href={MAPS_HREF} target="_blank" rel="noreferrer"
                   className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full border border-foreground/15">
                  <MapPin className="w-4 h-4" /> Tarif
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ───────────────────────── Hero Carousel ───────────────────────── */
function HeroCarousel() {
  const [i, setI] = useState(0);
  const [timerKey, setTimerKey] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, [timerKey]);
  const go = (d: number) => {
    setI((p) => (p + d + slides.length) % slides.length);
    setTimerKey((k) => k + 1);
  };
  const s = slides[i];

  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={s.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-cream"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cream/15 backdrop-blur text-cream text-xs uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {s.eyebrow}
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-balance">
              <span className="block">{s.title[0]}</span>
              <span className="block italic text-gold">{s.title[1]}</span>
            </h1>
            <p className="mt-6 text-cream/85 text-lg md:text-xl max-w-xl text-balance">{s.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={PHONE_HREF} onClick={trackPhoneConversion} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cream text-ink font-medium hover:bg-gold transition">
                <Phone className="w-4 h-4" /> Randevu Al
              </a>
              <a href="#hizmetler" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-cream/40 text-cream hover:bg-cream/10 transition">
                Hizmetlerimiz <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_HREF}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-cream font-medium transition hover:scale-105 active:scale-95"
                style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
              >
                <Instagram className="w-4 h-4" /> Bizi Instagram'da Takip Edin
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="absolute z-20 right-5 md:right-8 bottom-20 md:bottom-28 flex items-center gap-2">
        <button onClick={() => go(-1)} className="w-11 h-11 rounded-full bg-cream/15 backdrop-blur text-cream hover:bg-cream hover:text-ink grid place-items-center transition" aria-label="Önceki">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => go(1)} className="w-11 h-11 rounded-full bg-cream/15 backdrop-blur text-cream hover:bg-cream hover:text-ink grid place-items-center transition" aria-label="Sonraki">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute z-20 left-5 md:left-8 bottom-8 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className="h-1 rounded-full overflow-hidden bg-cream/30"
            style={{ width: idx === i ? 56 : 24 }}
            aria-label={`Slayt ${idx + 1}`}
          >
            <motion.span
              key={`${idx}-${i}-${timerKey}`}
              className="block h-full bg-cream"
              initial={{ width: idx === i ? "0%" : "100%" }}
              animate={{ width: idx === i ? "100%" : "100%" }}
              transition={{ duration: idx === i ? 6.5 : 0, ease: "linear" }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Marquee ───────────────────────── */
function Marquee() {
  const items = [
    "★★★★★ \"Klinik tertemiz, ekip çok ilgili.\"",
    "5.000+ memnun hasta",
    "★★★★★ \"Çocuğum diş hekiminden artık korkmuyor.\"",
    "★★★★★ \"İmplantım ilk günkü gibi.\"",
    "Kadın hekim önderliğinde",
    "★★★★★ \"Lamine sonucum çok doğal.\"",
  ];
  return (
    <div className="bg-primary text-primary-foreground py-4 overflow-hidden marquee-pause">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="mx-8 text-sm font-medium tracking-wide opacity-90 flex items-center gap-8">
            {t}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Tilt card ───────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [10, -10]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-50, 50], [-10, 10]), { stiffness: 150, damping: 15 });
  const shineX = useTransform(x, [-50, 50], ["0%", "100%"]);
  const shineY = useTransform(y, [-50, 50], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left - r.width / 2);
    y.set(e.clientY - r.top - r.height / 2);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${shineX} ${shineY}, color-mix(in oklab, var(--cream) 30%, transparent), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}

/* ───────────────────────── Services ───────────────────────── */
function Services() {
  return (
    <section id="hizmetler" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <span className="text-clay text-sm uppercase tracking-[0.2em]">Hizmetlerimiz</span>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
              Tek bir kliniğin altında <span className="italic text-primary">tüm</span> diş bakımınız.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Önleyici muayeneden ileri estetik tedavilere kadar, her hizmet aynı titizlikte ve sıcak ortamda.
          </p>
        </div>

        {/* Üst sıra: geniş featured kart + 1 normal kart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-5 md:mb-6">
          {services.slice(0, 2).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
            >
              <TiltCard className="h-full min-h-[220px] rounded-3xl bg-card border border-border p-7 md:p-9 shadow-soft hover:shadow-lift transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl grid place-items-center mb-6"
                  style={{ backgroundColor: `color-mix(in oklab, ${s.color} 18%, var(--cream))`, color: s.color }}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className={`font-display ${i === 0 ? "text-3xl md:text-4xl" : "text-2xl"} text-foreground mb-3`}>
                  {s.title}
                </h3>
                <p className={`text-muted-foreground ${i === 0 ? "text-lg max-w-md" : ""}`}>{s.body}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        {/* Alt sıra: 3 eşit kart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {services.slice(2).map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: (i + 2) * 0.06 }}
            >
              <TiltCard className="h-full min-h-[220px] rounded-3xl bg-card border border-border p-7 md:p-9 shadow-soft hover:shadow-lift transition-shadow">
                <div
                  className="w-12 h-12 rounded-2xl grid place-items-center mb-6"
                  style={{ backgroundColor: `color-mix(in oklab, ${s.color} 18%, var(--cream))`, color: s.color }}
                >
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">{s.title}</h3>
                <p className="text-muted-foreground">{s.body}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Stats / Why ───────────────────────── */
function WhyUs() {
  return (
    <section id="neden-biz" className="py-24 md:py-32 px-5 md:px-8 bg-secondary">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <span className="text-clay text-sm uppercase tracking-[0.2em]">Neden Deva Dent</span>
        <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
          Sıcak bir ortam, <span className="italic text-primary">titiz</span> bir bakım.
        </h2>
        <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
          Kadın hekim önderliğinde, modern ekipmanlarla donatılmış kliniğimizde her hasta bir yakınımız gibi karşılanır.
        </p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-7 md:p-9 cursor-default"
          >
            <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 transition-colors duration-500 group-hover:text-primary-foreground">
              <div className="flex items-center justify-between mb-6">
                <s.icon className="w-7 h-7 text-clay group-hover:text-gold transition-colors" />
                <ArrowUpRight className="w-5 h-5 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
              <div className="font-display text-5xl md:text-6xl">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-wider opacity-80">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Reviews ───────────────────────── */
function Reviews() {
  const [idx, setIdx] = useState(0);

  const go = (d: number) => setIdx((p) => (p + d + reviews.length) % reviews.length);

  return (
    <section id="yorumlar" className="py-24 md:py-32 px-5 md:px-8 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div>
          <span className="text-gold text-sm uppercase tracking-[0.2em]">Hasta Yorumları</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
            Onlar anlatsın, <span className="italic text-gold">biz gösterelim.</span>
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-primary-foreground/80">4.7 / 5 · Google üzerinden onaylı yorumlar</span>
          </div>
          <div className="mt-10 flex gap-3">
            <button onClick={() => go(-1)} className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-ink grid place-items-center transition" aria-label="Önceki yorum">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => go(1)} className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-gold hover:text-ink grid place-items-center transition" aria-label="Sonraki yorum">
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="self-center ml-2 text-sm text-primary-foreground/70">
              {String(idx + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative h-[420px] md:h-[460px] [perspective:1500px]">
          {reviews.map((r, i) => {
            const offset = (i - idx + reviews.length) % reviews.length;
            const isActive = offset === 0;
            return (
              <motion.div
                key={r.name}
                drag={isActive ? "x" : false} // Sadece en öndeki kartı kaydırmaya izin ver
                dragConstraints={{ left: 0, right: 0 }} // Kaydırdıktan sonra yerine dönsün
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  const swipeThreshold = 50;
                  if (offset.x < -swipeThreshold) go(1); // Sola kaydırma -> Sonraki
                  else if (offset.x > swipeThreshold) go(-1); // Sağa kaydırma -> Önceki
                }}
                animate={{
                  rotateY: offset === 0 ? 0 : offset === 1 ? -8 : offset === reviews.length - 1 ? 8 : 0,
                  y: offset * 16,
                  x: offset * 12,
                  scale: 1 - offset * 0.05,
                  opacity: offset < 3 ? 1 - offset * 0.25 : 0,
                  zIndex: reviews.length - offset,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 rounded-3xl bg-cream text-ink p-8 md:p-10 shadow-lift flex flex-col ${isActive ? 'cursor-grab active:cursor-grabbing' : ''}`}
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                {/* Tırnak ikonu asla ezilmeyecek */}
                <Quote className="w-10 h-10 text-clay shrink-0" />
                
                {/* Metin için optimize edilmiş boyut ve satır aralığı */}
                <p className="mt-5 text-lg md:text-xl font-display leading-relaxed select-none">"{r.text}"</p>
                
                {/* İsim ve yıldız alanı asla ezilmeyecek */}
                <div className="mt-auto pt-6 flex items-center justify-between shrink-0">
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-sm text-muted-foreground">Doğrulanmış hasta</div>
                  </div>
                  <div className="flex shrink-0">
                    {Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="w-4 h-4 fill-clay text-clay" />)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Visit / Schedule ───────────────────────── */
function Visit() {
  const today = new Date().getDay();
  const [openIdx, setOpenIdx] = useState<number>(schedule.findIndex((d) => d.jsDay === today));

  return (
    <section id="ziyaret" className="py-24 md:py-32 px-5 md:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Address card */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <span className="text-clay text-sm uppercase tracking-[0.2em]">Bize Gelin</span>
          <h2 className="font-display text-4xl md:text-5xl text-balance">
            Sarayaltı Caddesi'nde, <span className="italic text-primary">kapımız açık.</span>
          </h2>

          <div className="rounded-3xl bg-card border border-border p-7 shadow-soft">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-2xl bg-clay/15 text-clay grid place-items-center shrink-0">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <div className="font-medium">Klinik Adresi</div>
                <p className="text-muted-foreground mt-1">{ADDRESS}</p>
              </div>
            </div>
            <div className="h-px bg-border my-6" />
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-2xl bg-primary/12 text-primary grid place-items-center shrink-0">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <div className="font-medium">Telefon</div>
                <a href={PHONE_HREF} onClick={trackPhoneConversion} className="text-muted-foreground mt-1 hover:text-primary transition block">{PHONE}</a>
              </div>
            </div>
            <div className="h-px bg-border my-6" />
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-2xl bg-[#e1306c]/12 text-[#e1306c] grid place-items-center shrink-0">
                <Instagram className="w-5 h-5" />
              </span>
              <div>
                <div className="font-medium">Instagram</div>
                <a href={INSTAGRAM_HREF} target="_blank" rel="noreferrer" className="text-muted-foreground mt-1 hover:text-primary transition block">{INSTAGRAM_HANDLE}</a>
                <a href={INSTAGRAM_HREF_DOCTOR} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition block">{INSTAGRAM_HANDLE_DOCTOR}</a>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <a href={PHONE_HREF} onClick={trackPhoneConversion} className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition">
              <Phone className="w-4 h-4" /> Hemen Ara
            </a>
            <a href={MAPS_HREF} target="_blank" rel="noreferrer"
               className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-clay text-clay-foreground hover:opacity-90 transition">
              <MapPin className="w-4 h-4" /> Yol Tarifi
            </a>
          </div>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-3">
          <div className="rounded-3xl bg-secondary p-6 md:p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="font-display text-2xl">Çalışma Saatleri</h3>
            </div>
            <div className="flex flex-col">
              {schedule.map((d, i) => {
                const isToday = d.jsDay === today;
                const isOpen = openIdx === i;
                return (
                  <button
                    key={d.day}
                    onClick={() => setOpenIdx(isOpen ? -1 : i)}
                    className={`group text-left border-b border-border last:border-0 py-4 md:py-5 px-2 md:px-3 transition-colors ${
                      isToday ? "bg-gold/25 -mx-2 md:-mx-3 px-4 md:px-5 rounded-2xl" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${d.hours === "Kapalı" ? "bg-foreground/30" : "bg-primary"}`} />
                        <span className="font-display text-xl md:text-2xl">{d.day}</span>
                        {isToday && <span className="ml-2 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1 rounded-full">Bugün</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground tabular-nums">{d.hours}</span>
                        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 text-sm text-muted-foreground max-w-md">
                            {d.hours === "Kapalı"
                              ? "Bugün kliniğimiz kapalıdır. Acil durumlar için telefonumuzdan bize ulaşabilirsiniz."
                              : "Randevu önceliklidir; aynı gün için boş alan olup olmadığını telefonla teyit edebilirsiniz."}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Gallery ───────────────────────── */
function Gallery() {
  const photos = [
    { src: gallery1, span: "md:col-span-2 md:row-span-2", alt: "Klinik bekleme alanı", caption: "Bekleme alanı" },
    { src: gallery3, span: "", alt: "Modern muayene odası", caption: "Muayene odası" },
    { src: gallery4, span: "", alt: "Memnun hasta gülüşü", caption: "Tedavi sonrası" },
    { src: gallery2, span: "md:col-span-2", alt: "Hassas çalışma anı", caption: "Detaya özen" },
  ];
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-clay text-sm uppercase tracking-[0.2em]">Kliniğimizden</span>
            <h2 className="mt-3 font-display text-4xl md:text-6xl text-balance">
              Hastalarımızın <span className="italic text-primary">paylaştığı</span> kareler.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://search.google.com/local/reviews?placeid=&q=Deva+Dent+Diş+Kliniği"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              Google'da tüm fotoğraflar <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href={INSTAGRAM_HREF}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-cream text-sm font-medium transition hover:scale-105 active:scale-95 shadow-soft"
              style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)" }}
            >
              <Instagram className="w-4 h-4" /> Daha fazlası için Instagram'ı ziyaret edin
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3 md:gap-4">
          {photos.map((p, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-3xl ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute left-4 bottom-4 right-4 text-cream text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                {p.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
function CTA() {
  return (
    <section className="px-5 md:px-8 pb-24 md:pb-32">
      <div className="max-w-7xl mx-auto rounded-[36px] p-10 md:p-20 text-center relative overflow-hidden"
           style={{ background: "linear-gradient(135deg, var(--primary), color-mix(in oklab, var(--primary) 60%, var(--clay)))" }}>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-clay/30 blur-3xl" />
        <div className="relative">
          <span className="text-gold text-sm uppercase tracking-[0.25em]">Randevu</span>
          <h2 className="mt-4 font-display text-4xl md:text-7xl text-cream text-balance leading-[1.05]">
            Gülüşünüz için <span className="italic">bir adım</span> daha.
          </h2>
          <p className="mt-6 text-cream/85 max-w-xl mx-auto text-lg">
            Telefonla arayın veya kliniğimize uğrayın, size en uygun saati birlikte bulalım.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <a href={PHONE_HREF} onClick={trackPhoneConversion} className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-cream text-ink font-medium hover:bg-gold transition">
              <Phone className="w-4 h-4" /> {PHONE}
            </a>
            <a href={MAPS_HREF} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-cream/40 text-cream hover:bg-cream/10 transition">
              <MapPin className="w-4 h-4" /> Kliniğe Gel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Footer ───────────────────────── */
function Footer() {
  return (
    <footer className="bg-ink text-cream px-5 md:px-8 py-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Deva Dent logosu" className="w-11 h-11 object-contain bg-cream rounded-full p-1" />
            <span className="font-display text-2xl">Deva Dent</span>
          </div>
          <p className="mt-5 text-cream/70 max-w-xs">
            Kahramanmaraş'ta kadın hekim önderliğinde, sıcak ve modern bir diş kliniği. Gülüşünüzü emanet edebileceğiniz güvenilir bir adres.
          </p>
        </div>

        <div>
          <div className="text-gold text-xs uppercase tracking-[0.25em] mb-4">İletişim</div>
          <ul className="space-y-3 text-cream/85">
            <li className="flex items-start gap-3"><MapPin className="w-4 h-4 mt-1 shrink-0 text-gold" /><span>{ADDRESS}</span></li>
            <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /><a href={PHONE_HREF} onClick={trackPhoneConversion} className="hover:text-gold transition">{PHONE}</a></li>
            <li className="flex items-center gap-3"><Clock className="w-4 h-4 text-gold" /><span>Pzt – Cum 09:00 – 19:00</span></li>
            <li className="flex items-center gap-3"><Instagram className="w-4 h-4 text-gold" /><a href={INSTAGRAM_HREF} target="_blank" rel="noreferrer" className="hover:text-gold transition">{INSTAGRAM_HANDLE}</a></li>
            <li className="flex items-center gap-3"><Instagram className="w-4 h-4 text-gold" /><a href={INSTAGRAM_HREF_DOCTOR} target="_blank" rel="noreferrer" className="hover:text-gold transition">{INSTAGRAM_HANDLE_DOCTOR}</a></li>
          </ul>
          <div className="mt-5 text-xs text-cream/60">{DENTIST_NAME} · Kurucu Hekim</div>
        </div>

        <div>
          <div className="text-gold text-xs uppercase tracking-[0.25em] mb-4">Bağlantılar</div>
          <ul className="space-y-3 text-cream/85">
            {navLinks.map((l) => (
              <li key={l.href}><a href={l.href} className="hover:text-gold transition">{l.label}</a></li>
            ))}
            <li><a href={MAPS_HREF} target="_blank" rel="noreferrer" className="hover:text-gold transition">Yol Tarifi</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/50">
        <span>© {new Date().getFullYear()} Deva Dent Diş Kliniği. Tüm hakları saklıdır.</span>
        <span>Kadın hekim önderliğinde · Kahramanmaraş</span>
      </div>
    </footer>
  );
}

function Index() {
  // unused import safeguard
  void useMemo;
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Header />
      <HeroCarousel />
      <Marquee />
      <Services />
      <WhyUs />
      <Reviews />
      <Gallery />
      <Visit />
      <CTA />
      <Footer />
    </main>
  );
}