# Hackathon IT School - Veb Loyihasi

Hackathon IT School uchun yaratilgan zamonaviy va interaktiv veb-sayt. Django framework'i bilan qurilgan, Telegram integratsiyasi va admin panel bilan.

## Xususiyatlari

- **Zamonaviy Dizayn**: Tailwind CSS bilan yaratilgan responsive dizayn
- **Telegram Integratsiyasi**: Ariza qoldirish va Telegram validatsiyasi
- **Admin Panel**: Django Unfold bilan zamonaviy admin interfeysi
- **Dark Mode**: Qorong'i rejim qo'llabi
- **Interaktiv Elementlar**: Animatsiyalar, carousel'lar va boshqa UI effektlari

## Texnologiyalar

- **Backend**: Django 5.2
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **Database**: SQLite (development), PostgreSQL (production tavsiya etiladi)
- **Admin Panel**: Django Unfold
- **Integrations**: Telegram Bot API

## O'rnatish

### 1. Loyihani klonlash

```bash
git clone <repository-url>
cd Hackathon-main
```

### 2. Virtual muhitni yaratish

```bash
python -m venv .venv
# Windows uchun:
.venv\Scripts\activate
# Linux/Mac uchun:
source .venv/bin/activate
```

### 3. Kutubxonalarni o'rnatish

```bash
pip install -r requirements.txt
```

### 4. Muhit o'zgaruvchilarini sozlash

`.env.example` faylini `.env` ga nusxa qiling va qiymatlarni to'ldiring:

```bash
cp .env.example .env
```

`.env` faylini o'z ma'lumotlaringiz bilan to'ldiring:
- `TELEGRAM_BOT_TOKEN` - Telegram Bot API tokeni
- `TELEGRAM_ADMIN_CHAT_ID` - Admin chat ID
- `SECRET_KEY` - Django secret key

### 5. Ma'lumotlar bazasini migratsiya qilish

```bash
python manage.py migrate
```

### 6. Superuser yaratish

```bash
python manage.py createsuperuser
```

### 7. Serverni ishga tushirish

```bash
python manage.py runserver
```

Sayt `http://localhost:8000` da ochiladi.
Admin panel: `http://localhost:8000/admin`

## Loyiha Tuzilishi

```
Hackathon-main/
├── config/              # Django sozlamalari
│   ├── settings.py      # Asosiy sozlamalar
│   ├── urls.py          # URL marshrutlari
│   └── wsgi.py
├── main/                # Asosiy Django app
│   ├── models.py        # Ma'lumotlar bazasi modellari
│   ├── views.py         # Ko'rinishlar va API endpointlari
│   ├── admin.py         # Admin panel sozlamalari
│   └── urls.py          # App URL'lari
├── Templates/           # HTML shablonlari
│   └── index.html       # Asosiy sahifa
├── static/              # Statik fayllar
│   ├── css/             # CSS fayllar
│   ├── js/              # JavaScript fayllar
│   └── images/          # Rasmlar
├── media/               # Yuklangan media fayllar
├── .env.example         # Muhit o'zgaruvchilari namunasi
├── requirements.txt     # Python kutubxonalari
└── manage.py            # Django boshqarish skripti
```

## Xavfsizlik

Xavfsizlik bo'yicha muhim ma'lumotlar uchun `SECURITY.md` faylini o'qing.

**Muhim:**
- `.env` faylini hech qachon Git'ga push qilmang
- Production'da `DEBUG = False` o'rnatilishi kerak
- Telegram Bot tokenini xavfsizroq boshqaring

## Funktsional Imkoniyatlar

### Asosiy Sahifa
- **Banner**: Dinamik bannerlar matni va rasmlari
- **Statistikalar**: Raqamli ko'rsatkichlar animatsiyasi
- **Biz Haqimizda**: Maktab ma'lumotlari va afzalliklar
- **Kurslar**: IELTS, SAT va ingliz tili kurslari
- **Ustozlar**: Jamoa a'zolari va ularning malakalari
- **Tariflar**: 2 xil ta'lim paketi (oddiy va pro)
- **Galereya**: Maktab hayotidan rasmlar
- **FAQ**: Tez-tez so'raladigan savollar
- **Yangiliklar**: Oxirgi yangiliklar va e'lonlar

### Kontakt Formasi
- **Telegram Validatsiyasi**: Telegram username yoki telefon raqam tekshiruvi
- **Ariza Yuborish**: Kurs uchun ariza qoldirish
- **Telegram Bot**: Arizalarni Telegramga yuborish

### Admin Panel
- **Bannerlar Boshqaruvi**: Bannerlarni qo'shish, tahrirlash, o'chirish
- **Kurslar Boshqaruvi**: Kurslar va ularning narxlari
- **Jamoa Boshqaruvi**: Ustozlar ma'lumotlari
- **Tariflar Boshqaruvi**: Ta'lim paketlari va narxlari
- **Yangiliklar**: Yangiliklar va e'lonlarni boshqarish
- **Sozrovlar**: Foydalanuvchi so'rovlarini ko'rish

## API Endpointlari

### Telegram Validatsiyasi
```
POST /api/check_telegram/
Content-Type: application/x-www-form-urlencoded

Body: telegram=@username yoki +998901234567
Response: {"valid": true, "type": "username", "message": "Username mavjud!"}
```

### Ariza Yuborish
```
POST /api/send_contact/
Content-Type: application/x-www-form-urlencoded

Body: 
- name: Ism Familiya
- phone: +998901234567
- telegram: @username
- selected_plan: Kurs nomi - narxi
- grade: Sinf
- message: Qo'shimcha xabar

Response: {"success": true, "message": "Ariza muvaffaqiyatli yuborildi!"}
```

## Muhim Sozlamalar

### Django Settings
- `DEBUG=True` (development)
- `ALLOWED_HOSTS=[]` (production uchun to'ldiring)
- `SECRET_KEY` - xavfsiz kalit
- `DATABASE` - SQLite (development)

### Environment Variables
```env
TELEGRAM_BOT_TOKEN=Telegram bot to'keningiz
TELEGRAM_ADMIN_CHAT_ID=Admin id yingiz
```

## Xatoliklarni Tuzatish

### Umumiy Xatoliklar
1. **Django import xatosi**: Virtual muhitni aktivatsiya qiling
2. **Migratsiya xatosi**: `python manage.py makemigrations` va `python manage.py migrate`
3. **Static fayllar yo'q**: `python manage.py collectstatic`
4. **Admin panel ishlamaydi**: Superuser yarating

### Development Xatoliklari
1. **Preloader ishlamaydi**: JavaScript faylini tekshiring
2. **Dark mode ishlamaydi**: CSS uslublarini tekshiring
3. **Telegram bot ishlamaydi**: Token va Chat ID ni tekshiring

## Deploy Qilish

### Heroku
```bash
# Heroku CLI o'rnatish
heroku create
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=<yangi-secret-key>
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```

### VPS/Server
```bash
# Gunicorn o'rnatish
pip install gunicorn
# Serverni ishga tushirish
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## Aloqa

Savollar yoki takliflar uchun:
- Email: anosvoldigort47@gmail.com
- Telegram: @Dr4x1l
- Telefon: +998 91 791 48 81
- GitHub: @Muxammadaziz-boss

## Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi.

---

**Oxirgi yangilash:** 2026-04-22
**Versiya:** 1.0.0
