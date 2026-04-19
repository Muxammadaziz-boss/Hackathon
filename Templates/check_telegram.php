<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['valid' => false, 'message' => "Faqat POST so'rovi qabul qilinadi."]);
    exit;
}

$telegram = trim($_POST['telegram'] ?? '');

if ($telegram === '') {
    echo json_encode(['valid' => false, 'message' => "Telegram maydoni bo'sh."]);
    exit;
}

// Agar telefon raqam formatida bo'lsa — faqat format tekshirish
if (preg_match('/^\+?\d[\d\s\-]{8,}$/', $telegram)) {
    $cleanPhone = preg_replace('/[\s\-]/', '', $telegram);
    if (strlen($cleanPhone) >= 10 && strlen($cleanPhone) <= 15) {
        echo json_encode([
            'valid' => true,
            'type' => 'phone',
            'message' => "✅ Telefon raqam formati to'g'ri."
        ]);
    } else {
        echo json_encode([
            'valid' => false,
            'type' => 'phone',
            'message' => "❌ Telefon raqam formati noto'g'ri."
        ]);
    }
    exit;
}

// Agar @username formatida bo'lsa
$username = $telegram;
if (str_starts_with($username, '@')) {
    $username = substr($username, 1);
}

// Username format tekshirish: 5-32 belgi, faqat harf, raqam va _
if (!preg_match('/^[a-zA-Z][a-zA-Z0-9_]{4,31}$/', $username)) {
    echo json_encode([
        'valid' => false,
        'type' => 'username',
        'message' => "❌ Telegram username formati noto'g'ri. Kamida 5 belgi, faqat harf, raqam va _ bo'lishi kerak."
    ]);
    exit;
}

// t.me orqali tekshirish
$url = "https://t.me/" . urlencode($username);
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 8);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

$response = curl_exec($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false || $httpCode >= 400) {
    echo json_encode([
        'valid' => false,
        'type' => 'username',
        'message' => "⚠️ Telegram'ga ulanib bo'lmadi. Iltimos, username'ni tekshiring."
    ]);
    exit;
}

// Sahifa kontentidan foydalanuvchi mavjudligini aniqlash
// Agar "tg://resolve" yoki profil rasmi mavjud bo'lsa — akkaunt bor
$hasProfile = (
    str_contains($response, 'tg://resolve') ||
    str_contains($response, 'tg-emoji') ||
    (str_contains($response, 'tgme_page_photo') && !str_contains($response, 'tgme_page_context_link'))
);

// Agar "If you have <strong>Telegram</strong>" matni bor lekin profil yo'q — akkaunt yo'q
$noAccount = str_contains($response, 'If you have') && !$hasProfile;

if ($noAccount) {
    echo json_encode([
        'valid' => false,
        'type' => 'username',
        'message' => "❌ @{$username} — bunday Telegram akkaunt topilmadi."
    ]);
    exit;
}

echo json_encode([
    'valid' => true,
    'type' => 'username',
    'message' => "✅ @{$username} — Telegram akkaunt mavjud!"
]);
