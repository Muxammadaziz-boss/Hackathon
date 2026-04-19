<?php
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => "Faqat POST so'rovi qabul qilinadi."
    ]);
    exit;
}

$botToken = '7768144078:AAEsWuKvlQr1fcA2umEcWy-oQTxOlxftyT0';
$adminChatId = '6990611858';

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$selectedPlan = trim($_POST['selected_plan'] ?? '');
$grade = trim($_POST['grade'] ?? '');
$telegram = trim($_POST['telegram'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $phone === '') {
    echo json_encode([
        'success' => false,
        'message' => "Iltimos, ism va telefon maydonlarini to'ldiring."
    ]);
    exit;
}

$clientIp = getClientIp();
$cooldownSeconds = 60;
$rateLimitPath = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'hackathon_it_school_' . sha1($clientIp) . '.lock';
$now = time();

if (file_exists($rateLimitPath)) {
    $lastSentAt = (int) trim((string) file_get_contents($rateLimitPath));
    $secondsLeft = $cooldownSeconds - ($now - $lastSentAt);

    if ($lastSentAt > 0 && $secondsLeft > 0) {
        echo json_encode([
            'success' => false,
            'message' => "Iltimos, qayta yuborish uchun {$secondsLeft} soniya kuting."
        ]);
        exit;
    }
}

$text = "📥 *Yangi ariza*\n";
$text .= "━━━━━━━━━━━━━━━━\n\n";
$text .= "👤 *Ism:* " . $name . "\n";
$text .= "📞 *Telefon:* " . $phone . "\n";

if ($telegram !== '') {
    // Agar u raqam/telefon formati bo'lmasa va @ bilan boshlanmasa, @ qo'shish
    if (!preg_match('/^[\+\d\s\-]+$/', $telegram) && !str_starts_with($telegram, '@')) {
        $telegram = '@' . $telegram;
    }
    $text .= "✈️ *Telegram:* " . $telegram . "\n";
}

$text .= "📦 *Tarif:* " . ($selectedPlan !== '' ? $selectedPlan : 'Tanlanmagan') . "\n";
$text .= "🎓 *Sinf:* " . ($grade !== '' ? $grade : 'Kiritilmagan') . "\n";

if ($message !== '') {
    $text .= "💬 *Xabar:* " . $message . "\n";
}

$text .= "━━━━━━━━━━━━━━━━\n\n";
$text .= "🕐 *Vaqt:* " . date('d.m.Y H:i');

$payload = http_build_query([
    'chat_id' => $adminChatId,
    'text' => $text,
    'parse_mode' => 'Markdown'
]);

$ch = curl_init("https://api.telegram.org/bot{$botToken}/sendMessage");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);

$response = curl_exec($ch);
$curlError = curl_error($ch);
$httpCode = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($response === false) {
    echo json_encode([
        'success' => false,
        'message' => 'Server Telegram bilan bog\'lana olmadi: ' . $curlError
    ]);
    exit;
}

$result = json_decode($response, true);

if ($httpCode >= 200 && $httpCode < 300 && !empty($result['ok'])) {
    file_put_contents($rateLimitPath, (string) $now, LOCK_EX);

    echo json_encode([
        'success' => true,
        'message' => "🎉 Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz."
    ]);
    exit;
}

echo json_encode([
    'success' => false,
    'message' => '⚠️ Xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.'
]);

function getClientIp(): string
{
    $forwardedFor = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';

    if ($forwardedFor !== '') {
        $ipList = explode(',', $forwardedFor);
        foreach ($ipList as $ip) {
            $candidate = trim($ip);
            if (filter_var($candidate, FILTER_VALIDATE_IP)) {
                return $candidate;
            }
        }
    }

    $remoteAddr = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return filter_var($remoteAddr, FILTER_VALIDATE_IP) ? $remoteAddr : 'unknown';
}
