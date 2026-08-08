
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
  creeper: '/sounds/creeper.ogg',
  chestOpen: '/sounds/chestOpen.ogg',
  chestClose: '/sounds/chestClose.ogg',
  anvil: '/sounds/anvil.ogg',
  explosion: '/sounds/explosion.ogg',
  fire: '/sounds/fire.ogg',
  glassBreak: '/sounds/glassBreak.ogg',
  doorOpen: '/sounds/doorOpen.ogg',
  doorClose: '/sounds/doorClose.ogg',
  click: '/sounds/click.ogg',
  fizz: '/sounds/fizz.ogg',
  levelUp: '/sounds/levelUp.ogg',
  orb: '/sounds/orb.ogg',
  bow: '/sounds/bow.ogg',
  hurt: '/sounds/hurt.ogg',
  eat: '/sounds/eat.ogg',
  splash: '/sounds/splash.ogg',
  water: '/sounds/water.ogg',
  lava: '/sounds/lava.ogg',
  portal: '/sounds/portal.ogg',
  fireWorks: '/sounds/fireWorks.ogg',
  crop: '/sounds/crop.ogg'
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

    // إذا كان رابط مباشر أو مسار محلي يبدأ بـ / أو ./ أو ../
    if (
      typeof sound === 'string' &&
      (sound.startsWith('http://') || sound.startsWith('https://') || sound.startsWith('/') || sound.startsWith('./') || sound.startsWith('../'))
    ) {
      url = sound;
    }

    // إذا كان موجودًا في أصوات MyInstants
    else if (soundURLs[sound]) {
      url = soundURLs[sound];
    }

    // إذا كان موجودًا في الأصوات المحلية المعرفة هنا
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

