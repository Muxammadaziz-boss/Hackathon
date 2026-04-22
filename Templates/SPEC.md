# Rakhimov School - Web Sayti Spetsifikatsiyasi

## 1. Loyiha Umumiy Ma'lumotlari

- **Loyiha nomi**: Rakhimov School - Premium Ta'lim Markazi
- **Sayt turi**: Ta'lim muassasasi veb-sayti
- **Til**: O'zbek
- **Moslashuvchan dizayn**: Ha (mobil, planshet, desktop)

---

## 2. Dizayn Spetsifikatsiyasi

### 2.1 Ranglar

| Rang nomi | Hex kod | Ishlatilishi |
|----------|---------|--------------|
| Asosiy ko'k | #1E3A8A | Header, CTA tugmalar |
| Yumshoq ko'k | #3B82F6 | Hover effektlar |
| Oq | #FFFFFF | Fon, cardlar |
| Och kul | #F8FAFC | Alternativ fon |
| To'q matn | #1E293B | Asosiy matn |
| Kulrang | #64748B | Ikkilamchi matn |
| Yashil muvaffaqiyat | #10B981 | Statistika, muvaffaqiyatlar |
| Saryongari | #F59E0B | Aktsent rang |

### 2.2 Tipografiya

- **Asosiy shrift**: 'Inter', sans-serif (Google Fonts)
- **Sarlavhalar**: Inter, 700 (bold)
- **Matn**: Inter, 400 (regular)
- **H1**: 48px / 56px (desktop), 32px (mobile)
- **H2**: 36px / 44px (desktop), 28px (mobile)
- **H3**: 24px / 32px
- **Body**: 16px / 24px
- **Kichik matn**: 14px / 20px

### 2.3 Xarak

- **Border radius**: 12px (katta), 8px (o'rtacha), 4px (kichik)
- **Shadow (karta)**: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- **Shadow (hover)**: 0 20px 25px -5px rgba(0, 0, 0, 0.1)
- **Transition**: 0.3s ease

---

## 3. Sahifa Tuzeichigi

### 3.1 Header (Nav bar)

- Logo (chap tomon)
- Navigatsiya markaz: Bosh sahifa, Mak haqida, Kurslar, Yangiliklar, Bog'lanish
- "Ro'yxatdan o'tish" tugmasi (o'ng tomon)
- sticky: yes
- fon: oq (scrollda shaffow qo'shish)

### 3.2 Hero Section

- **Sarlavha**: "Farzandingiz kelajagi biz bilan"
- **Subtitle**: "Sifatli ta'lim va zamonaviy pedagogika - bizning kafolatimiz"
- **CTA tugmalar**: 
  - Asosiy: "Ro'yxatdan o'tish" (ko'k)
  - Ikkilamchi: "Batafsil ma'lumot" (outline)
- **Fon**: Gradient (oq -> och ko'k)

### 3.3 Statistics Section

- 4 ta statistik card:
  1. "98%" - IELTS o'rtacha ball
  2. "1450" - SAT o'rtacha ball
  3. "500+" - Bitiruvchilar soni
  4. "15+" - Yillik tajriba

### 3.4 About School Section

-Chap tomon: Rasm (maktab hayoti)
-O'ng tomon:
  - Sarlavha: "Nima uchun Rakhimov School?"
  - Matn: Ta'lim falsafasi va yondashuvi
  - Element: 3 ta kichik card (skroll trigger)

### 3.5 Advantages Section

- 6 ta afzallik card (2 qator):
  1. Zamonaviy o'quv dasturi
  2. Professional o'qituvchilar
  3. Individual yondashuv
  4. Texnologiyalar
  5. Xavfsiz muhit
  6. Ota-onalar bilan aloqa

### 3.6 Courses Section

- 3 ta asosiy kurs:
  1. IELTS tayyorlash (6.0-7.5+ band)
  2. SAT tayyorlash (1300-1600 ball)
  3. Umumiy ingliz tili
- Har bir cardda: sarlavha, tavsif, muddat, narx

### 3.7 Extracurricular Section

- 4 ta faoliyat:
  1. Sport musobaqalari
  2. Ilmiy loyihalar
  3. Madaniy tadbirlar
  4. sayohatlar

### 3.8 Admission Process (3 qadam)

1. "Ariza qoldirish" - Online yoki ofline
2. "Sinov tekshiruvi" - Bepul diagnostika
3. "Ro'yxatga olish" - Shartnoma imzolash

### 3.9 Pricing Section

- 3 ta tarif:
  1. Basic - eng kichik
  2. Standard - o'rtacha (eng ommabop)
  3. Premium - to'liq

### 3.10 Testimonials

- 3 ta fikr (slider/carousel):
  1. Oyquroning fikri
  2. Bitiruvchi fikri
  3. O'quvchi fikri
- Rasm, ism, rol

### 3.11 FAQ Section

- 5 ta savol-javob (accordion):
  1. Yoshi bormi?
  2. Darslar qachon bo'ladi?
  3. O'qituvchilar kim?
  4. Ro'yxatdan o'tish narxi?
  5. Qanday natijalar kutyapsiz?

### 3.12 Contact Section

- Forma: Ism, Telefon, Xabar
- Kontakt ma'lumotlari: manzil, telefon, email
- Xarita (placeholder)

### 3.13 Footer

- Logo
- Tezkor havolalar
- Ijtimoiy tarmoqlar
- Copyright

---

## 4. Funksionallik

### 4.1 Animatsiyalar

- **Statistikalar**: Scrollda sanash animatsiyasi (0 dan hisoblagacha)
- **Hover effektlari**: cards ko'tariladi, rang o'zgaradi
- **Smooth scroll**: anchor havolalarda
- **Fade in**: elementlar scrollda paydo bo'ladi

### 4.2 Interactive elementlar

- **FAQ Accordion**: ochish/yopish
- **Mobile menu**: hamburger menu
- **Contact forma**: validatsiya

### 4.3 Responsive Breakpoints

- **Desktop**: >= 1024px
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px

---

## 5. Texnologiyalar

- HTML5
- CSS3 (Custom + Tailwind)
- JavaScript (Vanilla)
- Tailwind CSS via CDN

---

## 6. Uzbek tilidagi Kontent

Barcha matnlar o'zbek tilida bo'ladi:
- Header navigatsiya
- Hero sarlavha va matnlar
- Barcha section sarlavhalari
- Button matnlari
- FAQ savollar va javoblar
- Footer matni