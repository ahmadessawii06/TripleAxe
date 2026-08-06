// روابط ملفات الـ MP3 المباشرة من MyInstants
const soundURLs = {
  // صوت رونالدو SUI المباشر
  point: 'https://www.myinstants.com/media/sounds/suiiiiiiiiiiii.mp3',
  
  // صوت ميسي "Que miras bobo" المباشر
  minus: 'https://www.myinstants.com/media/sounds/999_Z871W0o.mp3',
  
  // صوت كشف الإجابة
  reveal: 'https://www.myinstants.com/media/sounds/correct.mp3'
};

export const playSound = (type) => {
  try {
    const url = soundURLs[type];
    if (url) {
      const audio = new Audio(url);
      audio.volume = 0.85; // مستوى الصوت
      audio.play().catch((err) => {
        console.log("تنبيه تشغيل الصوت:", err);
      });
    }
  } catch (e) {
    console.log("Audio Error:", e);
  }
};