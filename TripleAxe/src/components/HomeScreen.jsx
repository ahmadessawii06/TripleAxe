import { playSound } from '../utils/audio';

export function HomeScreen({ onSelectMode }) {
  const gameModes = [
    {
      id: 'quiz',
      title: 'أسئلة التحدي ⚔️',
      desc: 'سهل - متوسط - صعب - مستحيل',
      badge: '4 مستويات',
      color: '#4CAF50'
    },
    {
      id: 'who-am-i',
      title: 'من أنا؟ 🧩',
      desc: 'حزازير الوحوش والأغراض',
      badge: 'حزازير',
      color: '#9C27B0'
    },
    {
      id: 'true-false',
      title: 'صح أم خطأ ⏱️',
      desc: 'تحدي الإجابة السريعة',
      badge: 'سرعة',
      color: '#FF9800'
    },
    {
      id: 'crafting',
      title: 'الكرافتينج 🛠️',
      desc: 'طاولة الصنع 3x3',
      badge: 'تفاعلي',
      color: '#795548'
    },
    {
      id: 'sound-quiz',
      title: 'تحدي الأصوات 🎵',
      desc: 'احزر صوت اللعبة',
      badge: 'سماعي',
      color: '#E91E63'
    },
    {
      id: 'memory-game',
      title: 'الذاكرة 🃏',
      desc: 'مطابقة البلوكات',
      badge: 'تركيز',
      color: '#2196F3'
    },
    {
      id: 'zoom-quiz',
      title: 'خمن الصورة 🔍',
      desc: 'الزوم المستحيل',
      badge: 'ملاحظة',
      color: '#00BCD4'
    },
    {
      id: 'auction-quiz',
      title: 'أقرب رقم 🔢',
      desc: 'تخمين الأرقام والقلوب',
      badge: 'تخمين',
      color: '#607D8B'
    }
  ];

  const handleModeClick = (modeId) => {
    playSound('point');
    onSelectMode(modeId);
  };

  return (
    <div className="home-shell">
      <div className="home-hero-panel">
        <h1 className="mc-font home-title">Triple Axe</h1>

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

      {/* شبكة الكروت للتلفون */}
      <div className="game-grid">
        {gameModes.map((mode) => (
          <div
            key={mode.id}
            className="minecraft-card minecraft-btn mobile-game-card"
            onClick={() => handleModeClick(mode.id)}
            style={{ 
              backgroundColor: '#262626',
              borderTop: `4px solid ${mode.color}`
            }}
          >
            {/* شارة صغيرة للمستوى */}
            <span style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              backgroundColor: '#111',
              color: mode.color,
              fontSize: '0.65rem',
              padding: '2px 5px',
              borderRadius: '3px',
              fontWeight: 'bold'
            }}>
              {mode.badge}
            </span>

            <h3 style={{ 
              margin: '12px 0 5px 0', 
              fontSize: '1.05rem', 
              color: '#fff',
              fontWeight: '900',
              lineHeight: '1.3'
            }}>
              {mode.title}
            </h3>

            <p style={{ 
              margin: 0, 
              fontSize: '0.75rem', 
              color: '#bbb',
              fontWeight: 'bold'
            }}>
              {mode.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}