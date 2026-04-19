from django.shortcuts import render
from django.http import JsonResponse
import re
import urllib.request
import urllib.error
import urllib.parse
import json
import datetime
import os
from dotenv import load_dotenv
from .models import *

# Load environment variables
load_dotenv()

def index(request):
    # Banner ma'lumotlari
    banners = Banner.objects.all()
    
    # Raqamlar
    numbers_main = Number_main.objects.all()
    numbers_sub = Number_sub.objects.all()
    
    # About Us
    about_us = About_Us.objects.first()
    
    # Afzalliklar
    powers = Power.objects.all()
    
    # Team
    teams = Team.objects.all()
    
    # Kurslar
    kurslar = Kurslar.objects.all()
    
    # Faoliyatlar
    faoliyatlar = Faoliyatlar.objects.all()
    
    # Qabul
    qabul = Qabul.objects.all()
    
    # Tariflar
    tariflar_poor = Tariflar_poor.objects.all()
    tariflar_pro = Tariflar_pro.objects.all()
    
    # Fikrlar
    fikrlar = Fikrlar.objects.all()
    
    # Galereya
    galereya = Galereya.objects.all()
    
    # FAQ
    faq = FAQ.objects.all()
    
    # Yangiliklar
    yangiliklar = Yangiliklar.objects.all()
    
    # Contact
    contact = Contact.objects.first()
    
    context = {
        'banners': banners,
        'numbers_main': numbers_main,
        'numbers_sub': numbers_sub,
        'about_us': about_us,
        'powers': powers,
        'teams': teams,
        'kurslar': kurslar,
        'faoliyatlar': faoliyatlar,
        'qabul': qabul,
        'tariflar_poor': tariflar_poor,
        'tariflar_pro': tariflar_pro,
        'fikrlar': fikrlar,
        'galereya': galereya,
        'faq': faq,
        'yangiliklar': yangiliklar,
        'contact': contact,
    }
    
    return render(request, 'index.html', context)

def check_telegram(request):
    if request.method != 'POST':
        return JsonResponse({'valid': False, 'message': "Faqat POST so'rovi qabul qilinadi."}, status=405)
    
    telegram = request.POST.get('telegram', '').strip()
    if not telegram:
        return JsonResponse({'valid': False, 'message': "Telegram maydoni bo'sh."})
    
    # Phone number check
    if re.match(r'^\+?\d[\d\s\-]{8,}$', telegram):
        clean_phone = re.sub(r'[\s\-]', '', telegram)
        if 10 <= len(clean_phone) <= 15:
            return JsonResponse({'valid': True, 'type': 'phone', 'message': "✅ Telefon raqam formati to'g'ri."})
        else:
            return JsonResponse({'valid': False, 'type': 'phone', 'message': "❌ Telefon raqam formati noto'g'ri."})
            
    # Username check
    username = telegram
    if username.startswith('@'):
        username = username[1:]
        
    if not re.match(r'^[a-zA-Z][a-zA-Z0-9_]{4,31}$', username):
        return JsonResponse({
            'valid': False, 
            'type': 'username', 
            'message': "❌ Telegram username formati noto'g'ri. Kamida 5 (faqat harf/raqam) belgidan iborat bo'lishi kerak."
        })
        
    try:
        req = urllib.request.Request(
            f"https://t.me/{urllib.parse.quote(username)}",
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        response = urllib.request.urlopen(req, timeout=8)
        content = response.read().decode('utf-8')
        
        has_profile = 'tgme_page_title' in content or 'tgme_page_extra' in content
        no_account = not has_profile
        
        if no_account:
            return JsonResponse({'valid': False, 'type': 'username', 'message': f"❌ @{username} — bunday Telegram akkaunt topilmadi."})
            
        return JsonResponse({'valid': True, 'type': 'username', 'message': f"✅ @{username} — Telegram akkaunt mavjud!"})
        
    except Exception as e:
        return JsonResponse({'valid': False, 'type': 'username', 'message': "⚠️ Telegram bilan bog'lanib bo'lmadi."})

def send_application(request):
    if request.method != 'POST':
        return JsonResponse({'success': False, 'message': "Faqat POST so'rovi qabul qilinadi."}, status=405)
        
    bot_token = os.getenv('TELEGRAM_BOT_TOKEN')
    admin_chat_id = os.getenv('TELEGRAM_ADMIN_CHAT_ID')
    
    name = request.POST.get('name', '').strip()
    phone = request.POST.get('phone', '').strip()
    selected_plan = request.POST.get('selected_plan', '').strip()
    grade = request.POST.get('grade', '').strip()
    telegram = request.POST.get('telegram', '').strip()
    message = request.POST.get('message', '').strip()
    
    if not name or not phone:
        return JsonResponse({'success': False, 'message': "Iltimos, ism va telefon maydonlarini to'ldiring."})
        
    text = "📥 *Yangi ariza*\n━━━━━━━━━━━━━━━━\n\n"
    text += f"👤 *Ism:* {name}\n"
    text += f"📞 *Telefon:* {phone}\n"
    
    if telegram:
        if not re.match(r'^[\+\d\s\-]+$', telegram) and not telegram.startswith('@'):
            telegram = '@' + telegram
        text += f"✈️ *Telegram:* {telegram}\n"
        
    text += f"📦 *Tarif:* {selected_plan if selected_plan else 'Tanlanmagan'}\n"
    text += f"🎓 *Sinf:* {grade if grade else 'Kiritilmagan'}\n"
    
    if message:
        text += f"💬 *Xabar:* {message}\n"
        
    text += "━━━━━━━━━━━━━━━━\n\n"
    text += f"🕐 *Vaqt:* {datetime.datetime.now().strftime('%d.%m.%Y %H:%M')}"
    
    try:
        data = urllib.parse.urlencode({'chat_id': admin_chat_id, 'text': text, 'parse_mode': 'Markdown'}).encode('utf-8')
        req = urllib.request.Request(f"https://api.telegram.org/bot{bot_token}/sendMessage", data=data)
        response = urllib.request.urlopen(req, timeout=10)
        
        result = json.loads(response.read().decode('utf-8'))
        if result.get('ok'):
            return JsonResponse({'success': True, 'message': "🎉 Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz."})
    except Exception as e:
        pass
        
    return JsonResponse({'success': False, 'message': "⚠️ Xatolik yuz berdi. Iltimos, qayta urinib ko'ring."})
