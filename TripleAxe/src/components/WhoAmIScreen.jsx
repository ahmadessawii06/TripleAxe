import { useState } from 'react';
import { whoAmIData } from '../data/whoAmIData';
import { playSound } from '../utils/audio';

// دالة الخلط
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function WhoAmIScreen({
  onBack,
  onAddPoint,
  playerOneName,
  playerTwoName,
  playerOneBlock,
  playerTwoBlock,
}) {
  const [cards] = useState(() => shuffleArray(whoAmIData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pointGiven, setPointGiven] = useState(null);

  // التحقق من وجود بطاقات
  if (!cards || cards.length === 0) {
    return (
      <div className="minecraft-card" style={{ padding: '16px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff5555' }}>⚠️ لا توجد بطاقات!</h2>
        <p style={{ color: '#aaa' }}>تأكد من وجود بيانات في whoAmIData.js</p>
        <button className="minecraft-btn" onClick={onBack}>🔙 العودة</button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  if (!currentCard) {
    return (
      <div className="minecraft-card" style={{ padding: '16px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff5555' }}>⚠️ خطأ في البطاقة</h2>
        <button className="minecraft-btn" onClick={onBack}>🔙 العودة</button>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setRevealedHints(1);
      setShowAnswer(false);
      setPointGiven(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setRevealedHints(1);
      setShowAnswer(false);
      setPointGiven(null);
    }
  };

  const handleMoreHint = () => {
    if (revealedHints < currentCard.hints.length) {
      setRevealedHints((prev) => prev + 1);
      playSound('reveal');
    }
  };

  const handleToggleAnswer = () => {
    if (!showAnswer) playSound('reveal');
    setShowAnswer((prev) => !prev);
  };

  const handleGivePoint = (player) => {
    if (pointGiven !== null) {
      playSound('error');
      return;
    }
    if (player === 'none') {
      playSound('minus');
      setPointGiven('none');
    } else {
      onAddPoint(player);
      playSound('score');
      setPointGiven(player);
    }
  };

  const isButtonDisabled = (player) => {
    return pointGiven !== null && pointGiven !== player;
  };

  return (
    <div className="minecraft-card" style={{ padding: '16px' }}>
      {/* الهيدر */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ color: '#ffaa00', margin: 0, fontSize: '1.2rem' }}>🕵️ لعبة: مين أنا؟</h2>
        <button
          className="minecraft-btn"
          onClick={onBack}
          style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 10px', fontSize: '0.8rem' }}
        >
          🏠 القائمة
        </button>
      </div>

      {/* العداد */}
      <div style={{ marginBottom: '10px', color: '#aaa', fontSize: '0.85rem' }}>
        بطاقة {currentIndex + 1} من {cards.length}
      </div>

      {/* كارت التلميحات */}
      <div style={{ backgroundColor: '#111', border: '3px solid #ffaa00', borderRadius: '8px', padding: '16px', marginBottom: '14px' }}>
        <h3 style={{ color: '#55ff55', marginTop: 0, marginBottom: '12px', fontSize: '1rem' }}>💡 التلميحات المتاحة:</h3>
        <ul style={{ paddingRight: '20px', margin: 0, color: '#fff', lineHeight: '1.6' }}>
          {currentCard.hints.slice(0, revealedHints).map((hint, idx) => (
            <li key={`hint-${currentIndex}-${idx}`} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
              {hint}
            </li>
          ))}
        </ul>
        {revealedHints < currentCard.hints.length && !showAnswer && (
          <button
            className="minecraft-btn"
            onClick={handleMoreHint}
            style={{ marginTop: '10px', backgroundColor: '#5555ff', color: '#fff', fontSize: '0.8rem', padding: '6px 12px', width: '100%' }}
          >
            🔍 كشف تلميح إضافي ({revealedHints}/{currentCard.hints.length})
          </button>
        )}
      </div>

      {/* زر إظهار / إخفاء الإجابة */}
      <button
        className="minecraft-btn"
        onClick={handleToggleAnswer}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: showAnswer ? '#333' : '#ffaa00',
          color: showAnswer ? '#aaa' : '#000',
          marginBottom: '14px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
        }}
      >
        {showAnswer ? '🙈 إخفاء الإجابة' : '👁️ إظهار الإجابة'}
      </button>

      {/* ===== قسم الإجابة (المعدل) ===== */}
      {showAnswer && (
        <div style={{
          backgroundColor: '#181818',
          border: '2px dashed #55ff55',
          padding: '14px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '14px'
        }}>
          <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '4px' }}>الإجابة الصحيحة:</div>
          <div style={{ color: '#55ff55', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>
            {currentCard.answer}
          </div>

          {/* صورة الإجابة - تعتمد على من أخذ النقطة */}
          {(() => {
            let imageToShow = null;
            if (pointGiven === 'akram') {
              imageToShow = playerOneBlock?.image;
            } else if (pointGiven === 'ammoor') {
              imageToShow = playerTwoBlock?.image;
            } else if (pointGiven === 'none') {
              imageToShow = null; // ولا حد → لا صورة
            } else {
              // لم يتم إعطاء نقطة بعد → الصورة الأصلية للسؤال
              imageToShow = currentCard.imageUrl || null;
            }

            if (!imageToShow) return null;

            return (
              <div style={{
                margin: '10px 0 14px 0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0a0a0a',
                borderRadius: '6px',
                border: '2px solid #333',
                padding: '12px',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
              }}>
                <img
                  src={imageToShow}
                  alt={pointGiven === 'akram' ? playerOneName : pointGiven === 'ammoor' ? playerTwoName : currentCard.answer}
                  style={{
                    width: 'auto',
                    maxWidth: '100%',
                    maxHeight: '230px',
                    borderRadius: '4px',
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.6))'
                  }}
                />
              </div>
            );
          })()}

          {/* 🎮 قسم توزيع النقاط الماينكرافتي (نفسه كما هو) */}
          <div style={{
            backgroundColor: '#121212',
            border: '4px solid #4a4a4a',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 0 2px #222, 0 6px 12px rgba(0,0,0,0.8)',
            padding: '16px 12px 14px 12px',
            marginTop: '16px',
            position: 'relative',
            backgroundImage: 'radial-gradient(circle, rgba(30,30,30,0.9) 0%, rgba(10,10,10,0.95) 100%)'
          }}>
            {/* زوايا الإطار */}
            <div style={{ position: 'absolute', top: -4, left: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
            <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
            <div style={{ position: 'absolute', bottom: -4, left: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
            <div style={{ position: 'absolute', bottom: -4, right: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.25rem',
                fontWeight: '900',
                color: '#ffcc00',
                textShadow: '2px 2px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 0px 3px 0px #884400',
                letterSpacing: '0.5px'
              }}>
                مين صاحب الإجابة الصحيحة؟
              </h3>
              <span style={{ fontSize: '1.3rem', filter: 'drop-shadow(2px 2px 0px #000)' }}>🏹🎯</span>
            </div>

            {/* شبكة البلوكات الثلاثية */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {/* أكرم */}
              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('akram')}
                disabled={isButtonDisabled('akram')}
                style={{
                  padding: '12px 4px',
                  backgroundColor: '#29cece',
                  backgroundImage: `url(${playerOneBlock?.image || ''})`,
                  border: pointGiven === 'akram' ? '3px solid #ffffff' : '3px solid #0d5252',
                  boxShadow: pointGiven === 'akram'
                    ? 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4), 0 0 30px rgba(0,255,255,0.3)'
                    : 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4)',
                  opacity: isButtonDisabled('akram') ? 0.5 : 1,
                  cursor: isButtonDisabled('akram') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 0px #002222' }}>1+</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#ffffff', textShadow: '2px 2px 0px #003344, -1px -1px 0px #003344' }}>
                  {playerOneName}
                </span>
              </button>

              {/* ولا حد */}
              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('none')}
                disabled={isButtonDisabled('none')}
                style={{
                  padding: '12px 4px',
                  backgroundColor: '#110b15',
                  backgroundImage: `
                    linear-gradient(135deg, rgba(80, 20, 90, 0.3) 25%, transparent 25%),
                    linear-gradient(225deg, rgba(80, 20, 90, 0.3) 25%, transparent 25%),
                    linear-gradient(45deg, rgba(20, 10, 30, 0.9) 50%, rgba(5, 5, 10, 0.95) 50%)
                  `,
                  backgroundSize: '12px 12px',
                  border: pointGiven === 'none' ? '3px solid #ff3333' : '3px solid #3d2b4d',
                  boxShadow: pointGiven === 'none'
                    ? 'inset -3px -3px 0px rgba(0,0,0,0.8), inset 3px 3px 0px rgba(255,255,255,0.1), 0 0 20px rgba(255,50,50,0.3)'
                    : 'inset -3px -3px 0px rgba(0,0,0,0.8), inset 3px 3px 0px rgba(255,255,255,0.1)',
                  opacity: isButtonDisabled('none') ? 0.5 : 1,
                  cursor: isButtonDisabled('none') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e6c280', textShadow: '2px 2px 0px #000' }}>0</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#d0c0b0', textShadow: '2px 2px 0px #000' }}>
                  ولا حد
                </span>
              </button>

              {/* عمور */}
              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('ammoor')}
                disabled={isButtonDisabled('ammoor')}
                style={{
                  padding: '12px 4px',
                  backgroundColor: '#00aa55',
                  backgroundImage: `url(${playerTwoBlock?.image || ''})`,
                  border: pointGiven === 'ammoor' ? '3px solid #ffffff' : '3px solid #116633',
                  boxShadow: pointGiven === 'ammoor'
                    ? 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4), 0 0 30px rgba(0,255,100,0.3)'
                    : 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4)',
                  opacity: isButtonDisabled('ammoor') ? 0.5 : 1,
                  cursor: isButtonDisabled('ammoor') ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 0px #003311' }}>1+</span>
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#aaffcc', textShadow: '2px 2px 0px #003311, -1px -1px 0px #003311' }}>
                  {playerTwoName}
                </span>
              </button>
            </div>

            {/* نص النتيجة */}
            {pointGiven && (
              <div style={{
                marginTop: '10px',
                fontSize: '0.8rem',
                color: pointGiven === 'none' ? '#ff6666' : '#55ff55',
                textAlign: 'center',
                fontWeight: 'bold',
                textShadow: '1px 1px 0px #000'
              }}>
                {pointGiven === 'none' ? '❌ لم يتم إضافة نقاط لأحد' : `✅ تمت إضافة +1 نقطة لـ ${pointGiven === 'akram' ? playerOneName : playerTwoName}`}
              </div>
            )}
          </div>
        </div>
      )}

      {/* أزرار التنقل */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '10px' }}>
        <button
          className="minecraft-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: currentIndex === 0 ? '#333' : '#555',
            color: '#fff',
            opacity: currentIndex === 0 ? 0.5 : 1,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          ⬅️ السابق
        </button>
        <button
          className="minecraft-btn"
          onClick={handleNext}
          disabled={currentIndex === cards.length - 1}
          style={{
            flex: 1,
            padding: '8px',
            backgroundColor: currentIndex === cards.length - 1 ? '#333' : '#555',
            color: '#fff',
            opacity: currentIndex === cards.length - 1 ? 0.5 : 1,
            cursor: currentIndex === cards.length - 1 ? 'not-allowed' : 'pointer',
          }}
        >
          التالي ➡️
        </button>
      </div>
    </div>
  );
}