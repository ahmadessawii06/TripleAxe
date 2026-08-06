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
    <div style={{ padding: '5px 0 20px 0' }}>
      
      {/* هيدر أسطوري للتلفون */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 className="mc-font" style={{ 
          fontSize: '1.8rem', 
          color: '#55ff55', 
          margin: '0 0 8px 0', 
          textShadow: '3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000',
          letterSpacing: '1px'
        }}>
          Triple Axe
        </h1>

        <div style={{
          display: 'inline-block',
          backgroundColor: '#000',
          border: '2px solid #ffaa00',
          padding: '4px 12px',
          borderRadius: '20px',
          boxShadow: '0 4px 0 rgba(0,0,0,0.5)'
        }}>
          <p style={{ 
            color: '#ffaa00', 
            fontSize: '0.85rem', 
            margin: 0,
            fontWeight: '900'
          }}>
            🕊️ تم تصميم الموقع عن طريق الحمامة
          </p>
        </div>
      </div>

      {/* سؤال الصفحة الرئيسية */}
      <div className="minecraft-card" style={{
        padding: '12px 15px',
        marginBottom: '18px',
        textAlign: 'center',
        borderColor: '#55ff55',
        backgroundColor: '#1b2b1b'
      }}>
        <h2 style={{ 
          margin: 0, 
          color: '#ffffff', 
          fontSize: '1.25rem',
          fontWeight: '900',
          textShadow: '1px 1px 0px #000'
        }}>
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