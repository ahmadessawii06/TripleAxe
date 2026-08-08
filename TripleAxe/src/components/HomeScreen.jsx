
import { playSound } from '../utils/audio';

export function HomeScreen({ onSelectMode, onOpenSettings }) {
  const gameModes = [
    {
      id: 'quiz',
      title: 'أسئلة التحدي ⚔️',
      desc: 'سهل - متوسط - صعب - مستحيل',
      badge: '4 مستويات - 100 سؤال',
      color: '#4CAF50',
      backgroundImage: 'url(/images/HomeImages/1.png)',
      sound: 'https://www.myinstants.com/media/sounds/levelup.mp3'
    },
    {
      id: 'who-am-i',
      title: 'من أنا؟ 🧩',
      desc: 'حزازير الوحوش والأغراض',
      badge: 'حزازير',
      color: '#9C27B0',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-villager.mp3'
    },
    {
      id: 'true-false',
      title: 'صح أم خطأ ⏱️',
      desc: 'تحدي الإجابة السريعة',
      badge: 'سرعة',
      color: '#FF9800',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-click.mp3'
    },
    {
      id: 'crafting',
      title: 'الكرافتينج 🛠️',
      desc: 'طاولة الصنع 3x3',
      badge: 'تفاعلي',
      color: '#FFFFFF',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-ding.mp3'
    },
    {
      id: 'sound-quiz',
      title: 'تحدي الأصوات 🎵',
      desc: 'احزر صوت اللعبة',
      badge: 'سماعي',
      color: '#E91E63',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-level-up.mp3'
    },
    {
      id: 'memory-game',
      title: 'الذاكرة 🃏',
      desc: 'مطابقة البلوكات',
      badge: 'تركيز',
      color: '#3F51B5',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-chest-open.mp3'
    },
    {
      id: 'zoom-quiz',
      title: 'خمن الصورة 🔍',
      desc: 'الزوم المستحيل',
      badge: 'ملاحظة',
      color: '#00BCD4',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-orb.mp3'
    },
    {
      id: 'auction-quiz',
      title: 'أقرب رقم 🔢',
      desc: 'تخمين الأرقام والقلوب',
      badge: 'تخمين',
      color: '#FF5722',
      // sound: 'https://www.myinstants.com/media/sounds/minecraft-anvil-landing.mp3'
    }
  ];

  const handleModeClick = (mode) => {
    // تشغيل صوت اللعبة
    playSound(mode.sound);

    // الانتقال إلى اللعبة
    onSelectMode(mode.id);
  };

  return (
    <div className="home-shell">

      <div
        className="home-hero-panel"
        style={{ position: 'relative' }}
      >
        <button
          type="button"
          onClick={onOpenSettings}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#111',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#e0e0e0',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 12px rgba(0,0,0,0.25)'
          }}
        >
          ⚙️ إعدادات
        </button>

        <h1 className="mc-font home-title">
          Triple Axe
        </h1>

        <div className="home-badge">
          <p className="home-badge-text">
            🕊️ تم تصميم الموقع عن طريق الحمامة
          </p>
        </div>
      </div>

      <div className="minecraft-card home-question-card">
        <h2 className="home-question-title">
          شوو بدنا نلعب اليوم؟ 🤔
        </h2>
      </div>

      {/* شبكة الألعاب */}
      <div className="game-grid">
        {gameModes.map((mode) => (
          <div
            key={mode.id}
            className="minecraft-card minecraft-btn mobile-game-card"
            onClick={() => handleModeClick(mode)}
            style={{
              position: 'relative',
              backgroundImage: mode.backgroundImage || 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: `4px solid ${mode.color}`,
              cursor: 'pointer'
            }}
          >

            {/* شارة اللعبة */}
            <span
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                backgroundColor: '#111',
                color: mode.color,
                fontSize: '0.65rem',
                padding: '2px 5px',
                borderRadius: '3px',
                fontWeight: 'bold'
              }}
            >
              {mode.badge}
            </span>

            <h3
              style={{
                margin: '12px 0 5px 0',
                fontSize: '1.05rem',
                color: '#fff',
                fontWeight: '900',
                lineHeight: '1.3'
              }}
            >
              {mode.title}
            </h3>

            <p
              style={{
                margin: 0,
                fontSize: '0.75rem',
                color: '#fff',
                backgroundColor: 'rgba(0, 20, 0, 0.4)',
                borderBottom: '1px solid green',
                fontWeight: 'bold'
              }}
            >
              {mode.desc}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}



