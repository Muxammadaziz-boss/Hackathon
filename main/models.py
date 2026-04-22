from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='banners/', blank=True, null=True)
    button_text = models.CharField(max_length=255, blank=True, null=True)
    button_text2 = models.CharField(max_length=255, blank=True, null=True)
    alone_text = models.CharField(max_length=255, blank=True, null=True)
    alone_subtitle = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Bannerlar"

    def __str__(self):
        return self.title

class Number_main(models.Model):
    number = models.CharField(max_length=255)
    text = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Number"
        verbose_name_plural = "Raqamlar" 

    def __str__(self):
        return self.text

class Number_sub(models.Model):
    number = models.TextField()
    text = models.TextField()

    class Meta:
        verbose_name = "Number_main"
        verbose_name_plural = "Raqamlar_main" 

    def __str__(self):
        return f"{self.text} {self.number}"

class About_Us(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='about_us/', blank=True, null=True)
    card_title = models.CharField(max_length=255, blank=True, null=True, verbose_name="1-karta sarlavhasi")
    card_description = models.CharField(max_length=255, blank=True, null=True, verbose_name="1-karta ma'lumoti")
    card_icon = models.CharField(max_length=255, blank=True, null=True, default="fa-user-graduate")
    card2_title = models.CharField(max_length=255, blank=True, null=True, verbose_name="2-karta sarlavhasi")
    card2_description = models.CharField(max_length=255, blank=True, null=True, verbose_name="2-karta ma'lumoti")
    card2_icon = models.CharField(max_length=255, blank=True, null=True, default="fa-chalkboard-teacher")
    card3_title = models.CharField(max_length=255, blank=True, null=True, verbose_name="3-karta sarlavhasi")
    card3_description = models.CharField(max_length=255, blank=True, null=True, verbose_name="3-karta ma'lumoti")
    card3_icon = models.CharField(max_length=255, blank=True, null=True, default="fa-lightbulb")

    class Meta:
        verbose_name = "About Us"
        verbose_name_plural = "Biz haqimizda"

    def __str__(self):
        return self.title

class Power(models.Model):
    main_title = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Power"
        verbose_name_plural = "Afzalliklarimiz"

    def __str__(self):
        return self.main_title   

class Team(models.Model):
    name = models.CharField(max_length=255, default='Team Member')
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='team/', blank=True, null=True)
    position = models.CharField(max_length=255, blank=True, null=True)
    telegram_link = models.URLField(max_length=500, blank=True, null=True, help_text="Telegram profil linki")
    instagram_link = models.URLField(max_length=500, blank=True, null=True, help_text="Instagram profil linki")

    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Ustozlar"

    def __str__(self):
        return self.name

class Kurslar(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='kurslar/', blank=True, null=True)
    price = models.CharField(max_length=255, blank=True, null=True, help_text="Masalan: 200$ / oy yoki 500,000 UZS")
    duration = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Kurslar"
        verbose_name_plural = "Kurslar"

    def __str__(self):
        return self.title

class Faoliyatlar(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Faoliyatlar"
        verbose_name_plural = "Faoliyatlar"

    def __str__(self):
        return self.title

class Qabul(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Qabul"
        verbose_name_plural = "Qabul"

    def __str__(self):
        return self.name

class Tariflar_oddiy(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    price = models.CharField(max_length=255, help_text="Masalan: 206$ yoki 2.5mln", default="206$")
    description = models.TextField()
    icon = models.CharField(max_length=255)
    button_text = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Tariflar_oddiy"
        verbose_name_plural = "Tariflar_oddiy"

    def __str__(self):
        return self.name

class Tariflar_pro(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    price = models.CharField(max_length=255, help_text="Masalan: 288$ yoki 3mln", default="288$")
    description = models.TextField()
    icon = models.CharField(max_length=255)
    button_text = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Tariflar_pro"
        verbose_name_plural = "Tariflar_pro"

    def __str__(self):
        return self.name

class Fikrlar(models.Model):
    name = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    mini_title = models.CharField(max_length=255)
    natija = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    user_name = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    image = models.ImageField(upload_to='fikrlar/', blank=True, null=True)

    class Meta:
        verbose_name = "Fikrlar"
        verbose_name_plural = "Fikrlar"

    def __str__(self):
        return self.name

class Galereya(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to='galereya/', blank=True, null=True)

    class Meta:
        verbose_name = "Galereya"
        verbose_name_plural = "Galereya"

    def __str__(self):
        return self.title   

class FAQ(models.Model):
    name = models.CharField(max_length=255)
    text = models.TextField(help_text="Javob matnini bu yerga kiriting")
    subtitle = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"

    def __str__(self):
        return self.name   

class Yangiliklar(models.Model):
    name = models.CharField(max_length=255)
    mini_title = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='yangiliklar/', blank=True, null=True)

    class Meta:
        verbose_name = "Yangiliklar"
        verbose_name_plural = "Yangiliklar"

    def __str__(self):
        return self.name   

class Contact(models.Model):
    title = models.CharField(max_length=255, default="Savolingizga tez javob beramiz")
    subtitle = models.CharField(max_length=255, blank=True, null=True, default="Bog'lanish")
    description = models.TextField(default="Forma orqali murojaat qoldiring. Administrator siz bilan bog'lanib, kurs, jadval va qabul jarayoni bo'yicha batafsil ma'lumot beradi.")
    address = models.CharField(max_length=255, default="Farg'ona shahri, Shodiyona MFY")
    phone = models.CharField(max_length=255, default="+998 91 791 48 81")
    email = models.CharField(max_length=255, default="anosvoldigort47@gmail.com")

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Aloqa"

    def __str__(self):
        return self.title
