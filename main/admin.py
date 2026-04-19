from django.contrib import admin
from unfold.admin import ModelAdmin
from . import models

@admin.register(models.About_Us)
class AboutUsAdmin(ModelAdmin):
    list_display = ['title', 'subtitle']
    search_fields = ['title', 'subtitle']

@admin.register(models.Banner)
class BannerAdmin(ModelAdmin):
    list_display = ['title', 'subtitle', 'button_text']
    search_fields = ['title', 'subtitle']

@admin.register(models.Contact)
class ContactAdmin(ModelAdmin):
    list_display = ['name', 'title', 'subtitle']
    search_fields = ['name', 'title']

@admin.register(models.Faoliyatlar)
class FaoliyatlarAdmin(ModelAdmin):
    list_display = ['name', 'title', 'subtitle']
    search_fields = ['name', 'title']

@admin.register(models.FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ['name', 'text']
    search_fields = ['name', 'text']

@admin.register(models.Fikrlar)
class FikrlarAdmin(ModelAdmin):
    list_display = ['name', 'user_name', 'title']
    search_fields = ['name', 'user_name', 'title']

@admin.register(models.Galereya)
class GalereyaAdmin(ModelAdmin):
    list_display = ['title', 'subtitle']
    search_fields = ['title', 'subtitle']

@admin.register(models.Kurslar)
class KurslarAdmin(ModelAdmin):
    list_display = ['title', 'subtitle', 'price', 'duration']
    search_fields = ['title', 'subtitle']

@admin.register(models.Number_main)
class NumberMainAdmin(ModelAdmin):
    list_display = ['number', 'text']
    search_fields = ['text']

@admin.register(models.Number_sub)
class NumberSubAdmin(ModelAdmin):
    list_display = ['number', 'text']
    search_fields = ['text']

@admin.register(models.Power)
class PowerAdmin(ModelAdmin):
    list_display = ['main_title', 'title', 'icon']
    search_fields = ['main_title', 'title']

@admin.register(models.Qabul)
class QabulAdmin(ModelAdmin):
    list_display = ['name', 'title', 'subtitle']
    search_fields = ['name', 'title']

@admin.register(models.Tariflar_poor)
class TariflarPoorAdmin(ModelAdmin):
    list_display = ['name', 'title', 'number']
    search_fields = ['name', 'title']

@admin.register(models.Tariflar_pro)
class TariflarProAdmin(ModelAdmin):
    list_display = ['name', 'title', 'number']
    search_fields = ['name', 'title']

@admin.register(models.Team)
class TeamAdmin(ModelAdmin):
    list_display = ['name', 'position', 'title']
    search_fields = ['name', 'position', 'title']

@admin.register(models.Yangiliklar)
class YangiliklarAdmin(ModelAdmin):
    list_display = ['name', 'mini_title', 'title']
    search_fields = ['name', 'title']
