import { useState } from 'react';
import { whoAmIData } from '../data/whoAmIData';
import { playSound } from '../utils/audio';

export function WhoAmIScreen({ onBack, onAddPoint }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedHints, setRevealedHints] = useState(1); // يبدأ بتلميح واحد
  const [showAnswer, setShowAnswer] = useState(false);
  const [pointGiven, setPointGiven] = useState(null);

  const currentCard = whoAmIData[currentIndex];

  const handleNext = () => {
    if (currentIndex < whoAmIData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRevealedHints(1);
      setShowAnswer(false);
      setPointGiven(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setRevealedHints(1);
      setShowAnswer(false);
      setPointGiven(null);
    }
  };

  const handleMoreHint = () => {
    if (revealedHints < currentCard.hints.length) {
      setRevealedHints(revealedHints + 1);
      playSound('reveal');
    }
  };

  const handleToggleAnswer = () => {
    if (!showAnswer) playSound('reveal');
    setShowAnswer(!showAnswer);
  };

  const handleGivePoint = (player) => {
    if (player === 'none') {
      playSound('minus');
      setPointGiven('none');
    } else {
      onAddPoint(player);
      setPointGiven(player);
    }
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
        بطاقة {currentIndex + 1} من {whoAmIData.length}
      </div>

      {/* كارت التلميحات */}
      <div style={{
        backgroundColor: '#111',
        border: '3px solid #ffaa00',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '14px'
      }}>
        <h3 style={{ color: '#55ff55', marginTop: 0, marginBottom: '12px', fontSize: '1rem' }}>
          💡 التلميحات المتاحة:
        </h3>

        <ul style={{ paddingRight: '20px', margin: 0, color: '#fff', lineHeight: '1.6' }}>
          {currentCard.hints.slice(0, revealedHints).map((hint, idx) => (
            <li key={idx} style={{ marginBottom: '8px', fontSize: '0.95rem' }}>
              {hint}
            </li>
          ))}
        </ul>

        {/* زر كشف تلميح إضافي */}
        {revealedHints < currentCard.hints.length && !showAnswer && (
          <button
            className="minecraft-btn"
            onClick={handleMoreHint}
            style={{
              marginTop: '10px',
              backgroundColor: '#5555ff',
              color: '#fff',
              fontSize: '0.8rem',
              padding: '6px 12px',
              width: '100%'
            }}
          >
            🔍 كشف تلميح إضافي ({revealedHints}/{currentCard.hints.length})
          </button>
        )}
      </div>

      {/* زر إظهار الشخصية */}
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
          fontWeight: 'bold'
        }}
      >
        {showAnswer ? '🙈 إخفاء الهوية' : '🎭 كشف الهوية (مين أنا؟)'}
      </button>

      {/* قسم الإجابة والصورة */}
      {showAnswer && (
        <div style={{
          backgroundColor: '#181818',
          border: '2px dashed #ffaa00',
          padding: '14px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '14px'
        }}>
          <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '4px' }}>أنا أكون:</div>
          <div style={{ color: '#ffaa00', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px' }}>
            {currentCard.answer}
          </div>

          {currentCard.imageUrl && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              backgroundColor: '#0a0a0a', 
              padding: '10px', 
              borderRadius: '6px',
              border: '1px solid #333',
              marginBottom: '12px'
            }}>
              <img 
                src={currentCard.imageUrl} 
                alt={currentCard.answer} 
                style={{ maxHeight: '180px', objectFit: 'contain', imageRendering: 'pixelated' }} 
              />
            </div>
          )}

          {/* قسم النقاط الـ 3D الماينكرافتي */}
          <div style={{
            backgroundColor: '#121212',
            border: '3px solid #4a4a4a',
            borderRadius: '4px',
            padding: '12px',
            marginTop: '10px'
          }}>
            <span style={{ fontSize: '0.85rem', color: '#ffcc00', display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
              🎯 مين حزر الشخصية صح؟
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('none')}
                style={{
                  padding: '8px 2px',
                  backgroundColor: '#110b15',
                  border: pointGiven === 'none' ? '2px solid #ff3333' : '2px solid #3d2b4d',
                  color: '#d0c0b0',
                  fontSize: '0.8rem'
                }}
              >
                💣 ولا حد
              </button>

              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('ammoor')}
                style={{
                  padding: '8px 2px',
                  backgroundColor: '#00aa55',
                  border: pointGiven === 'ammoor' ? '2px solid #fff' : '2px solid #116633',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}
              >
                ❇️ +1 عمور
              </button>

              <button
                className="minecraft-btn"
                onClick={() => handleGivePoint('akram')}
                style={{
                  padding: '8px 2px',
                  backgroundColor: '#29cece',
                  border: pointGiven === 'akram' ? '2px solid #fff' : '2px solid #0d5252',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}
              >
                💎 +1 أكرم
              </button>
            </div>
          </div>
        </div>
      )}

      {/* التنقل بين البطاقات */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        <button 
          className="minecraft-btn"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{ flex: 1, padding: '8px', backgroundColor: currentIndex === 0 ? '#333' : '#555', color: '#fff' }}
        >
          ⬅️ السابق
        </button>
        <button 
          className="minecraft-btn"
          onClick={handleNext}
          disabled={currentIndex === whoAmIData.length - 1}
          style={{ flex: 1, padding: '8px', backgroundColor: currentIndex === whoAmIData.length - 1 ? '#333' : '#555', color: '#fff' }}
        >
          التالي ➡️
        </button>
      </div>

    </div>
  );
}