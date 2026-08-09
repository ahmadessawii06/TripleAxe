
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
  crop: '/sounds/crop.ogg',

  // MP3 files available in public/sounds
  end_portal_activation: '/sounds/end_portal_activation.mp3',
  'ghast-fireball-minecraft-sound-sound-effect-for-editing': '/sounds/ghast-fireball-minecraft-sound-sound-effect-for-editing.mp3',
  llama_idle3: '/sounds/llama_idle3.mp3',
  meow_2Tmjbru: '/sounds/meow_2Tmjbru.mp3',
  'minecraft-armor-equip': '/sounds/minecraft-armor-equip.mp3',
  'minecraft-dog-bark': '/sounds/minecraft-dog-bark.mp3',
  'minecraft-horse-death': '/sounds/minecraft-horse-death.mp3',
  'minecraft-potion-drinking-sound-effect-1': '/sounds/minecraft-potion-drinking-sound-effect-1.mp3',
  'minecraft-scream2': '/sounds/minecraft-scream2.mp3',
  'minecraft-spider': '/sounds/minecraft-spider.mp3',
  'minecraft-tool-break': '/sounds/minecraft-tool-break.mp3',
  'minecraft-totem-sound': '/sounds/minecraft-totem-sound.mp3',
  'old-sound-of-zombie-in-minecraft': '/sounds/old-sound-of-zombie-in-minecraft.mp3',
  portal_EIeiKty: '/sounds/portal_EIeiKty.mp3',
  'skeleton-sounds-2': '/sounds/skeleton-sounds-2.mp3',
  teleport1_Cw1ot9l: '/sounds/teleport1_Cw1ot9l.mp3',
  tnt: '/sounds/tnt.mp3',
  'videoplayback-3_bnU0CN1': '/sounds/videoplayback-3_bnU0CN1.mp3',
  villager: '/sounds/villager.mp3',

  // Requested keys mapped to nearest available files (fallbacks)
  eating: '/sounds/eat.ogg',
  drinking: '/sounds/minecraft-potion-drinking-sound-effect-1.mp3',
  xp: '/sounds/levelUp.ogg',
  old_zombie: '/sounds/old-sound-of-zombie-in-minecraft.mp3',
  levelup: '/sounds/levelUp.ogg',
  enderman_teleport: '/sounds/teleport1_Cw1ot9l.mp3',
  drop_item: '/sounds/orb.ogg',
  totem: '/sounds/minecraft-totem-sound.mp3',
  steve_hurt: '/sounds/hurt.ogg',
  cave1: '/sounds/videoplayback-3_bnU0CN1.mp3',
  grass_walk: '/sounds/click.ogg',
  advancement: '/sounds/levelUp.ogg',
  cave: '/sounds/videoplayback-3_bnU0CN1.mp3',
  death: '/sounds/minecraft-horse-death.mp3',
  hit: '/sounds/hurt.ogg',
  creeper_fuse: '/sounds/creeper.ogg',
  chest: '/sounds/chestOpen.ogg',
  enderdragon_death: '/sounds/minecraft-horse-death.mp3',
  cave5: '/sounds/videoplayback-3_bnU0CN1.mp3',
  glass_break: '/sounds/glassBreak.ogg',
  pig: '/sounds/villager.mp3',
  end_portal: '/sounds/end_portal_activation.mp3',
  cave10: '/sounds/videoplayback-3_bnU0CN1.mp3',
  strange: '/sounds/videoplayback-3_bnU0CN1.mp3',
  cave17: '/sounds/videoplayback-3_bnU0CN1.mp3',
  uuh: '/sounds/videoplayback-3_bnU0CN1.mp3',
  pickaxe: '/sounds/minecraft-tool-break.mp3',
  creeper_explosion: '/sounds/tnt.mp3',
  minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  theme: '/sounds/videoplayback-3_bnU0CN1.mp3',
  starting_song: '/sounds/videoplayback-3_bnU0CN1.mp3',
  playing_minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  im_playing_minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  im_in_minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  oh_minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  who_like_minecraft: '/sounds/videoplayback-3_bnU0CN1.mp3',
  villager_short: '/sounds/villager.mp3'
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

