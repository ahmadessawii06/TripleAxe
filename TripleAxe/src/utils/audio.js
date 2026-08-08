
// ========================================
// روابط ملفات MP3 المباشرة من MyInstants
// ========================================

const soundURLs = {
  // صوت رونالدو SUI
  point:
    'https://www.myinstants.com/media/sounds/suiiiiiiiiiiii.mp3',

  // صوت ميسي "Que miras bobo"
  minus:
    'https://www.myinstants.com/media/sounds/999_Z871W0o.mp3',

  // صوت كشف الإجابة
  reveal:
    'https://www.myinstants.com/media/sounds/correct.mp3'
};


// ========================================
// الأصوات المحلية الموجودة داخل المشروع
// ========================================

const soundLibrary = {
  jump: '/sounds/crit.ogg',
  coin: '/sounds/coin.mp3',
  explosion: '/sounds/explosion.mp3',
  portal: '/sounds/portal.mp3',
  chest: '/sounds/chest.mp3',
  warning: '/sounds/warning.mp3'
};


// ========================================
// تشغيل أي صوت
// يدعم:
// 1. اسم صوت: playSound('point')
// 2. صوت محلي: playSound('jump')
// 3. رابط مباشر: playSound('https://....mp3')
// ========================================

export function playSound(sound) {
  try {
    if (!sound) return;

    let url;

    // إذا كان رابط مباشر
    if (
      typeof sound === 'string' &&
      (sound.startsWith('http://') || sound.startsWith('https://'))
    ) {
      url = sound;
    }

    // إذا كان موجودًا في أصوات MyInstants
    else if (soundURLs[sound]) {
      url = soundURLs[sound];
    }

    // إذا كان موجودًا في الأصوات المحلية
    else if (soundLibrary[sound]) {
      url = soundLibrary[sound];
    }

    // إذا لم نجد الصوت
    else {
      console.warn(`الصوت "${sound}" غير موجود.`);
      return;
    }

    const audio = new Audio(url);

audio.volume = 1.0;
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.log('تنبيه تشغيل الصوت:', error);
    });

  } catch (error) {
    console.log('Audio Error:', error);
  }
}

