import { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { playSound } from '../utils/audio';

// شارات مستويات الصعوبة والألوان الخاصة بها
const difficultyBadges = {
  easy: { label: '🟢 سهل', color: '#55ff55' },
  medium: { label: '🟡 متوسط', color: '#ffaa00' },
  hard: { label: '🔴 صعب', color: '#ff5555' },
  impossible: { label: '💀 مستحيل', color: '#aa00aa' }
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function QuizScreen({ 
  onBack, 
  onAddPoint, 
  playerOneName = 'أكرم', 
  playerTwoName = 'عمور', 
  playerOneBlock, 
  playerTwoBlock 
}) {
  const [shuffledQuestions] = useState(() => shuffleArray(questions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pointGiven, setPointGiven] = useState(null);

  const currentQ = shuffledQuestions[currentIndex];
  const diffInfo = difficultyBadges[currentQ?.difficulty] || { label: 'عام', color: '#aaa' };

  // إعادة تعيين الحالة عند تغيير السؤال
  useEffect(() => {
    setShowAnswer(false);
    setPointGiven(null);
  }, [currentIndex]);

  // دعم اختصارات الكيبورد والتنقل السريع
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleNext();
      if (e.key === 'ArrowRight') handlePrev();
      if (e.code === 'Space') {
        e.preventDefault();
        handleToggleAnswer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, showAnswer]);

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleAnswer = () => {
    if (!showAnswer) {
      playSound('reveal');
    }
    setShowAnswer(!showAnswer);
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

  // نسبة تقدم الأسئلة لشريط التقدم
  const progressPercent = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="minecraft-card" style={{ padding: '16px', position: 'relative' }}>
      
      {/* شريط تقدم الأسئلة التفاعلي */}
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#222',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '12px',
        border: '1px solid #444'
      }}>
        <div style={{
          width: `${progressPercent}%`,
          height: '100%',
          backgroundColor: '#55ff55',
          transition: 'width 0.3s ease-in-out',
          boxShadow: '0 0 8px #55ff55'
        }} />
      </div>

      {/* الهيدر وزر العودة */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 style={{ color: '#55ff55', margin: 0, fontSize: '1.1rem' }}>⛏️ تحدي ماينكرافت العشوائي</h2>
        <button 
          className="minecraft-btn"
          onClick={onBack}
          style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 10px', fontSize: '0.8rem' }}
        >
          🏠 القائمة
        </button>
      </div>

      {/* العداد ونوع السؤال العشوائي الحالي */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ color: '#aaa', fontSize: '0.8rem' }}>
          سؤال {currentIndex + 1} من {shuffledQuestions.length}
        </span>
        <span style={{ 
          backgroundColor: '#222', 
          border: `1px solid ${diffInfo.color}`,
          color: diffInfo.color,
          padding: '3px 8px', 
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold'
        }}>
          {diffInfo.label}
        </span>
      </div>

      {/* بطاقة السؤال */}
      {currentQ && (
        <div>
          <div style={{
            backgroundColor: '#111',
            border: '2px solid #444',
            borderRadius: '6px',
            padding: '16px',
            minHeight: '75px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '1.05rem',
            fontWeight: 'bold',
            lineHeight: '1.4',
            marginBottom: '14px',
            color: '#fff'
          }}>
            {currentQ.question}
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
              fontSize: '0.9rem' 
            }}
          >
            {showAnswer ? '🙈 إخفاء الإجابة' : '👁️ إظهار الإجابة'}
          </button>

          {/* عرض الإجابة والصورة المكبرة وأزرار النقاط الماينكرافتية */}
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
                {currentQ.answer}
              </div>

              {/* صورة الإجابة */}
              {currentQ.imageUrl && (
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
                    src={currentQ.imageUrl} 
                    alt={currentQ.answer} 
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
              )}

              {/* قسم توزيع النقاط الماينكرافتي */}
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
                
                {/* زوايا إطار GUI المعدنية */}
                <div style={{ position: 'absolute', top: -4, left: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
                <div style={{ position: 'absolute', top: -4, right: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
                <div style={{ position: 'absolute', bottom: -4, left: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />
                <div style={{ position: 'absolute', bottom: -4, right: -4, width: 8, height: 8, backgroundColor: '#8b8b8b', border: '1px solid #333' }} />

                {/* العنوان */}
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

                {/* شبكة أزرار اللاعبين الثلاثية */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>

                  {/* كبسة: اللاعب الأول (player1) */}
                  <button
                    className="minecraft-btn"
                    onClick={() => handleGivePoint('player1')}
                    disabled={isButtonDisabled('player1')}
                    style={{
                      padding: '12px 4px',
                      backgroundColor: '#29cece',
                      backgroundImage: `url(${playerOneBlock?.image || ''})`,
                      border: pointGiven === 'player1' ? '3px solid #ffffff' : '3px solid #0d5252',
                      boxShadow: pointGiven === 'player1' 
                        ? 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4), 0 0 30px rgba(0,255,255,0.3)' 
                        : 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4)',
                      opacity: isButtonDisabled('player1') ? 0.5 : 1,
                      cursor: isButtonDisabled('player1') ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 0px #002222' }}>+1</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#ffffff', textShadow: '2px 2px 0px #003344' }}>
                      {playerOneName}
                    </span>
                  </button>

                  {/* كبسة: ولا حد (none) */}
                  <button
                    className="minecraft-btn"
                    onClick={() => handleGivePoint('none')}
                    disabled={isButtonDisabled('none')}
                    style={{
                      padding: '12px 4px',
                      backgroundColor: '#110b15',
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
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#e6c280', textShadow: '2px 2px 0px #000' }}>0</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#d0c0b0', textShadow: '2px 2px 0px #000' }}>
                      ولا حد
                    </span>
                  </button>

                  {/* كبسة: اللاعب الثاني (player2) */}
                  <button
                    className="minecraft-btn"
                    onClick={() => handleGivePoint('player2')}
                    disabled={isButtonDisabled('player2')}
                    style={{
                      padding: '12px 4px',
                      backgroundColor: '#00aa55',
                      backgroundImage: `url(${playerTwoBlock?.image || ''})`,
                      border: pointGiven === 'player2' ? '3px solid #ffffff' : '3px solid #116633',
                      boxShadow: pointGiven === 'player2' 
                        ? 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4), 0 0 30px rgba(0,255,100,0.3)' 
                        : 'inset -3px -3px 0px rgba(0,0,0,0.5), inset 3px 3px 0px rgba(255,255,255,0.4)',
                      opacity: isButtonDisabled('player2') ? 0.5 : 1,
                      cursor: isButtonDisabled('player2') ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff', textShadow: '2px 2px 0px #003311' }}>+1</span>
                    <span style={{ fontSize: '0.95rem', fontWeight: '900', color: '#aaffcc', textShadow: '2px 2px 0px #003311' }}>
                      {playerTwoName}
                    </span>
                  </button>

                </div>

                {/* نص التنبيه عند اختيار الفائز */}
                {pointGiven && (
                  <div style={{ 
                    marginTop: '10px', 
                    fontSize: '0.8rem', 
                    color: pointGiven === 'none' ? '#ff6666' : '#55ff55',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 0px #000'
                  }}>
                    {pointGiven === 'none' ? '❌ لم يتم إضافة نقاط لأحد' : `✅ تمت إضافة +1 نقطة لـ ${pointGiven === 'player1' ? playerOneName : playerTwoName}`}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* أزرار التنقل بين الأسئلة (الاتجاهات مضبوطة لـ RTL) */}
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
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              ➡️ السابق
            </button>
            <button 
              className="minecraft-btn"
              onClick={handleNext}
              disabled={currentIndex === shuffledQuestions.length - 1}
              style={{ 
                flex: 1, 
                padding: '8px', 
                backgroundColor: currentIndex === shuffledQuestions.length - 1 ? '#333' : '#555', 
                color: '#fff',
                opacity: currentIndex === shuffledQuestions.length - 1 ? 0.5 : 1,
                cursor: currentIndex === shuffledQuestions.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              التالي ⬅️
            </button>
          </div>

        </div>
      )}

    </div>
  );
}