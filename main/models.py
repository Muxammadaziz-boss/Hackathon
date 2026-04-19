from re import VERBOSE
from os import name
from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='banners/')
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
    number = models.IntegerField()
    text = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Number"
        verbose_name_plural = "Raqamlar" 

    def __str__(self):
        return self.text

class Number_sub(models.Model):
    number = models.IntegerField()
    text = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Number"
        verbose_name_plural = "Raqamlar" 

    def __str__(self):
        return self.text

class About_Us(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    image = models.ImageField(upload_to='about_us/')
    card_title = models.CharField(max_length=255, blank=True, null=True)
    card_description = models.CharField(max_length=255, blank=True, null=True)
    card_icon = models.CharField(max_length=255, blank=True, null=True)

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
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    class Card(models.Model):
        name = models.CharField(max_length=255)
        subtitle_2 = models.CharField(max_length=255)
        description = models.TextField()
        icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Ustozlar"

    def __str__(self):
        return self.title

class Kurslar(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    class Card(models.Model):
        name = models.CharField(max_length=255)
        subtitle_2 = models.CharField(max_length=255)
        description = models.TextField()
        icon = models.CharField(max_length=255)

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

class Tariflar_poor(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    number = models.IntegerField()
    description = models.TextField()
    icon = models.CharField(max_length=255)
    button_text = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Tariflar_poor"
        verbose_name_plural = "Tariflar_poor"

    def __str__(self):
        return self.name

class Tariflar_pro(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    number = models.IntegerField()
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
    image = models.ImageField(upload_to='fikrlar/')

    class Meta:
        verbose_name = "Fikrlar"
        verbose_name_plural = "Fikrlar"

    def __str__(self):
        return self.name

class Galereya(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    class Card(models.Model):
        title = models.CharField(max_length=255)
        subtitle = models.CharField(max_length=255)
        image = models.ImageField(upload_to='galereya/')

    class Meta:
        verbose_name = "Galereya"
        verbose_name_plural = "Galereya"

    def __str__(self):
        return self.title   

class FAQ(models.Model):
    name = models.CharField(max_length=255)
    text = models.CharField(max_length=255)
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
    image = models.ImageField(upload_to='yangiliklar/')

    class Meta:
        verbose_name = "Yangiliklar"
        verbose_name_plural = "Yangiliklar"

    def __str__(self):
        return self.name   

class Contact(models.Model):
    name = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    icon = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Contact"
        verbose_name_plural = "Aloqa"

    def __str__(self):
        return self.name   