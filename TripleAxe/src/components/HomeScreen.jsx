
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
      sound: 'https://www.myinstants.com/media/sounds/challenge_complete_uHsY1YS.mp3'
    },
    {
      id: 'who-am-i',
      title: 'من أنا؟ 🧩',
      desc: 'حزازير الوحوش والأغراض',
      badge: 'حزازير',
      color: '#9C27B0',
      backgroundImage: 'url(/images/HomeImages/2.png)',
      sound: 'https://www.myinstants.com/media/sounds/challenge_complete_uHsY1YS.mp3'
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
      color: '#FFFFFF',
      backgroundImage: 'url(/images/HomeImages/4.png)',
      sound: '/sounds/crafting.ogg'
    },
    {
      id: 'sound-quiz',
      title: 'تحدي الأصوات 🎵',
      desc: 'احزر صوت اللعبة',
      badge: 'سماعي',
      color: '#E91E63',
      backgroundImage: 'url(/images/HomeImages/3.png)',
      sound: 'https://www.myinstants.com/media/sounds/challenge_complete_uHsY1YS.mp3'
    },
    {
      id: 'memory-game',
      title: 'الذاكرة 🃏',
      desc: 'مطابقة البلوكات',
      badge: 'تركيز',
      color: '#3F51B5'
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
      color: '#FF5722'
    }
  ];

  const handleModeClick = (mode) => {
    if (mode.sound) {
      playSound(mode.sound);
    }

    onSelectMode(mode.id);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '150%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/vids/main.mp4" type="video/mp4" />
      </video>
      {/* =========================
          الهيدر
      ========================== */}
      <div
        className="home-hero-panel"
        style={{
          position: 'relative'
        }}
      >
        {/* زر الإعدادات */}
        <button
          type="button"
          onClick={onOpenSettings}
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',

            background:
              'linear-gradient(135deg, #151515, #080808)',

            border: '1px solid rgba(255,255,255,0.15)',

            color: '#e0e0e0',

            padding: '8px 12px',

            borderRadius: '10px',

            fontSize: '0.85rem',

            fontWeight: '700',

            cursor: 'pointer',

            boxShadow:
              '0 4px 15px rgba(0,0,0,0.4)',

            transition:
              'all 0.2s ease',

            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              'translateY(-2px)';

            e.currentTarget.style.boxShadow =
              '0 6px 20px rgba(0,0,0,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              'translateY(0)';

            e.currentTarget.style.boxShadow =
              '0 4px 15px rgba(0,0,0,0.4)';
          }}
        >
          ⚙️ إعدادات
        </button>

        {/* العنوان */}
        <h1 className="mc-font home-title">
          Triple Axe
        </h1>

        {/* Badge */}
        <div className="home-badge">
          <p className="home-badge-text">
            🕊️ تم تصميم الموقع عن طريق الحمامة
          </p>
        </div>
      </div>



      {/* =========================
          عنوان الألعاب
      ========================== */}
      <div
        className="minecraft-card home-question-card"
        style={{
          marginBottom: '15px'
        }}
      >
        <h2 className="home-question-title">
          شوو بدنا نلعب اليوم؟ 🤔
        </h2>
      </div>


      {/* =========================
          شبكة الألعاب
      ========================== */}
      <div
        className="game-grid"
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fit, minmax(180px, 1fr))',

          gap: '18px',

          padding: '10px'
        }}
      >


        {/* <button className="minecraft-btn" onClick={() => onSelectMode('crafting')} style={{ backgroundColor: '#55ff55', color: '#000' }}>
  🛠️ تحدي الكرافتينج
</button> */}
        {gameModes.map((mode) => (

          <div
            key={mode.id}
            className="minecraft-card minecraft-btn mobile-game-card"

            onClick={() =>
              handleModeClick(mode)
            }

            style={{
              position: 'relative',

              height: '210px',

              minHeight: '210px',

              overflow: 'hidden',

              cursor: 'pointer',

              border:
                `3px solid ${mode.color}`,

              borderRadius: '12px',

              backgroundImage:
                mode.backgroundImage || 'none',

              backgroundSize: 'cover',

              backgroundPosition: 'center',

              backgroundRepeat: 'no-repeat',

              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.08) inset,
                0 8px 25px rgba(0,0,0,0.55),
                0 0 18px ${mode.color}55
              `,

              transition:
                'transform 0.25s ease, box-shadow 0.25s ease, background-size 0.4s ease',

              isolation: 'isolate'
            }}

            onMouseEnter={(e) => {

              e.currentTarget.style.transform =
                'translateY(-7px) scale(1.025)';

              e.currentTarget.style.boxShadow = `
                0 0 0 1px rgba(255,255,255,0.15) inset,
                0 14px 35px rgba(0,0,0,0.75),
                0 0 35px ${mode.color}99,
                0 0 70px ${mode.color}44
              `;

              e.currentTarget.style.backgroundSize =
                '110%';
            }}

            onMouseLeave={(e) => {

              e.currentTarget.style.transform =
                'translateY(0) scale(1)';

              e.currentTarget.style.boxShadow = `
                0 0 0 1px rgba(255,255,255,0.08) inset,
                0 8px 25px rgba(0,0,0,0.55),
                0 0 18px ${mode.color}55
              `;

              e.currentTarget.style.backgroundSize =
                'cover';
            }}
          >

            {/* =========================
                التظليل السينمائي
            ========================== */}
            <div
              style={{
                position: 'absolute',

                inset: 0,

                background: `
                  linear-gradient(
                    to bottom,
                    rgba(0,0,0,0.03) 0%,
                    rgba(0,0,0,0.10) 22%,
                    rgba(0,0,0,0.25) 42%,
                    rgba(0,0,0,0.65) 68%,
                    rgba(0,0,0,0.96) 100%
                  )
                `,

                zIndex: 0,

                pointerEvents: 'none'
              }}
            />


            {/* =========================
                لمعان علوي
            ========================== */}
            <div
              style={{
                position: 'absolute',

                top: 0,

                left: 0,

                right: 0,

                height: '50%',

                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)',

                opacity: 0.35,

                zIndex: 1,

                pointerEvents: 'none'
              }}
            />


            {/* =========================
                الخط المضيء
            ========================== */}
            <div
              style={{
                position: 'absolute',

                top: 0,

                left: 0,

                right: 0,

                height: '3px',

                background:
                  mode.color,

                boxShadow: `
                  0 0 8px ${mode.color},
                  0 0 20px ${mode.color}
                `,

                zIndex: 5,

                pointerEvents: 'none'
              }}
            />


            {/* =========================
                المحتوى السفلي
            ========================== */}
            <div
              style={{
                position: 'absolute',

                left: '10px',

                right: '10px',

                bottom: '10px',

                zIndex: 3,

                display: 'flex',

                flexDirection: 'column',

                alignItems: 'center',

                textAlign: 'center'
              }}
            >

              {/* Badge */}
              <span
                style={{
                  display: 'inline-flex',

                  alignItems: 'center',

                  justifyContent: 'center',

                  width: 'fit-content',

                  padding: '4px 9px',

                  marginBottom: '6px',

                  background:
                    'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,20,20,0.75))',

                  color:
                    mode.color,

                  border:
                    `1px solid ${mode.color}99`,

                  borderRadius: '5px',

                  fontSize: '0.62rem',

                  fontWeight: '900',

                  letterSpacing: '0.3px',

                  boxShadow: `
                    0 0 8px ${mode.color}44,
                    inset 0 0 8px rgba(255,255,255,0.04)
                  `,

                  textShadow:
                    `0 0 8px ${mode.color}`
                }}
              >
                {mode.badge}
              </span>


              {/* =========================
                  اسم اللعبة
              ========================== */}
              <h3
                style={{
                  margin:
                    '0 0 5px 0',

                  color:
                    '#fff',

                  fontSize:
                    '1.15rem',

                  fontWeight:
                    '950',

                  lineHeight:
                    '1.2',

                  textShadow: `
                    2px 2px 0 #000,
                    0 0 8px rgba(0,0,0,0.9),
                    0 0 15px ${mode.color}66
                  `
                }}
              >
                {mode.title}
              </h3>


              {/* =========================
                  وصف اللعبة
              ========================== */}
              <div
                style={{
                  display:
                    'inline-flex',

                  alignItems:
                    'center',

                  justifyContent:
                    'center',

                  padding:
                    '4px 10px',

                  maxWidth:
                    '95%',

                  background:
                    'rgba(0,0,0,0.72)',

                  borderTop:
                    `1px solid ${mode.color}66`,

                  borderBottom:
                    `2px solid ${mode.color}`,

                  borderRadius:
                    '4px',

                  color:
                    '#eee',

                  fontSize:
                    '0.72rem',

                  fontWeight:
                    '700',

                  lineHeight:
                    '1.3',

                  textShadow:
                    '1px 1px 3px #000',

                  boxShadow:
                    '0 3px 12px rgba(0,0,0,0.4)'
                }}
              >
                {mode.desc}
              </div>

            </div>


            {/* =========================
                تأثير الزاوية
            ========================== */}
            <div
              style={{
                position:
                  'absolute',

                bottom: 0,

                right: 0,

                width:
                  '60px',

                height:
                  '60px',

                background: `
                  linear-gradient(
                    135deg,
                    transparent 50%,
                    ${mode.color}22 50%
                  )
                `,

                zIndex:
                  2,

                pointerEvents:
                  'none'
              }}
            />

          </div>
        ))}

      </div>

    </div>
  );
}

