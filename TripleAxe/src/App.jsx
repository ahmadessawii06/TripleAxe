import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { WhoAmIScreen } from './components/WhoAmIScreen';
import { SoundQuizScreen } from './components/SoundQuizScreen';
import { playSound } from './utils/audio';

const blockOptions = [
  {
    id: 'diamond',
    label: 'دايموند',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/diamond_block.png'
  },
  {
    id: 'emerald',
    label: 'ايميرالد',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/emerald_block.png'
  },
  {
    id: 'gold',
    label: 'جولد',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/gold_block.png'
  },
  {
    id: 'redstone',
    label: 'ريدستون',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/redstone_block.png'
  },
  {
    id: 'netherite',
    label: 'نذرايت',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/netherite_block.png'
  }
];

function App() {
  const [akramScore, setAkramScore] = useState(0);
  const [ammoorScore, setAmmoorScore] = useState(0);

  const [currentMode, setCurrentMode] = useState('home');
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [player1Name, setPlayer1Name] = useState('اللاعب الأول');
  const [player2Name, setPlayer2Name] = useState('اللاعب الثاني');
  const [player1Block, setPlayer1Block] = useState(blockOptions[0]);
  const [player2Block, setPlayer2Block] = useState(blockOptions[1]);

  const addPoint = (player) => {
    playSound('point');
    if (player === 'akram' || player === 'player1') {
      setAkramScore((prev) => prev + 1);
    }
    if (player === 'ammoor' || player === 'player2') {
      setAmmoorScore((prev) => prev + 1);
    }
  };

  const removePoint = (player) => {
    playSound('minus');
    if (player === 'akram' || player === 'player1') {
      setAkramScore((prev) => Math.max(0, prev - 1));
    }
    if (player === 'ammoor' || player === 'player2') {
      setAmmoorScore((prev) => Math.max(0, prev - 1));
    }
  };

  const displayPlayer1Name = player1Name.trim() || 'اللاعب الأول';
  const displayPlayer2Name = player2Name.trim() || 'اللاعب الثاني';

  return (
    <div style={{ padding: '10px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      {showSetupModal && (
  <div style={{
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    zIndex: 2000,
    direction: 'rtl'
  }}>
    <div style={{
      width: '100%',
      maxWidth: '440px',
      maxHeight: '88vh',
      backgroundColor: '#141414',
      border: '2px solid #333',
      borderRadius: '20px',
      padding: '20px 16px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 15px rgba(85, 255, 85, 0.1)',
      position: 'relative',
      overflowY: 'auto',
      boxSizing: 'border-box'
    }}>
      {/* زر الإغلاق العلوي */}
      <button
        type="button"
        onClick={() => setShowSetupModal(false)}
        style={{
          position: 'absolute',
          top: '14px',
          left: '14px',
          background: '#222',
          border: '1px solid #444',
          color: '#ff5555',
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '1.1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          transition: 'all 0.2s'
        }}
      >
        ✕
      </button>

      {/* الهيدر الرئيسي */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h2 style={{
          margin: '0 0 4px 0',
          color: '#55ffff',
          fontSize: '1.3rem',
          fontWeight: '900',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          إعدادات اللعبة 
        </h2>
        <p style={{
          margin: 0,
          color: '#aaa',
          fontSize: '0.85rem'
        }}>
          قم بضبط إعدادات اللعبة قبل البدء
        </p>
      </div>

      {/* شريط شعار اللعبة الهيدر الماينكرافتي */}
      <div style={{
        textAlign: 'center',
        marginBottom: '18px',
        border: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 10px",
        borderRadius: "12px",
        backgroundColor: "#1a1a1a",
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{
          direction: 'ltr',
          margin: '0 0 6px 0',
          color: '#55ff55',
          fontSize: '1.4rem',
          fontWeight: 'bold',
          fontFamily: 'MonoCraft, monospace',
          letterSpacing: '1px',
          textShadow: '0 2px 8px rgba(85,255,85,0.3)'
        }}>
          ⚔️ TripleAxe ⚔️
        </h3>
        <span style={{
          color: '#ddd',
          fontSize: '0.8rem',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid #333',
          display: 'inline-block'
        }}>
          🕊️ طورها الحمامة 🕊️
        </span>
      </div>

      {/* إدخال اسم اللاعب الأول */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '6px',
          color: '#55ffff',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          🟦 اسم اللاعب الأول
        </label>
        <input
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          placeholder="أدخل اسم اللاعب..."
          style={{
            width: '100%',
            height: '46px',
            padding: '0 12px',
            borderRadius: '10px',
            border: '2px solid #333',
            background: '#0d0d0d',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#55ffff'}
          onBlur={(e) => e.target.style.borderColor = '#333'}
        />
      </div>

      {/* اختيار بلوك اللاعب الأول */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: 'bold' }}>
          اختر بلوك {displayPlayer1Name}:
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px'
        }}>
          {blockOptions.map((block) => {
            const isSelected = player1Block.id === block.id;
            return (
              <button
                key={`p1-${block.id}`}
                onClick={() => setPlayer1Block(block)}
                type="button"
                style={{
                  background: '#181818',
                  border: isSelected ? '2px solid #55ffff' : '2px solid #282828',
                  borderRadius: '10px',
                  padding: '6px 4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 0 10px rgba(85,255,255,0.3)' : 'none',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img
                  src={block.image}
                  alt={block.label}
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                    imageRendering: 'pixelated'
                  }}
                />
                <span style={{
                  fontSize: '0.65rem',
                  marginTop: '4px',
                  color: isSelected ? '#55ffff' : '#aaa',
                  fontWeight: 'bold'
                }}>
                  {block.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #222', margin: '16px 0' }} />

      {/* إدخال اسم اللاعب الثاني */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '6px',
          color: '#ff55ff',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          🟪 اسم اللاعب الثاني
        </label>
        <input
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          placeholder="أدخل اسم اللاعب..."
          style={{
            width: '100%',
            height: '46px',
            padding: '0 12px',
            borderRadius: '10px',
            border: '2px solid #333',
            background: '#0d0d0d',
            color: '#fff',
            fontSize: '1rem',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = '#ff55ff'}
          onBlur={(e) => e.target.style.borderColor = '#333'}
        />
      </div>

      {/* اختيار بلوك اللاعب الثاني */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: 'bold' }}>
          اختر بلوك {displayPlayer2Name}:
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '8px'
        }}>
          {blockOptions.map((block) => {
            const isSelected = player2Block.id === block.id;
            return (
              <button
                key={`p2-${block.id}`}
                onClick={() => setPlayer2Block(block)}
                type="button"
                style={{
                  background: '#181818',
                  border: isSelected ? '2px solid #ff55ff' : '2px solid #282828',
                  borderRadius: '10px',
                  padding: '6px 4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 0 10px rgba(255,85,255,0.3)' : 'none',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img
                  src={block.image}
                  alt={block.label}
                  style={{
                    width: '32px',
                    height: '32px',
                    objectFit: 'contain',
                    imageRendering: 'pixelated'
                  }}
                />
                <span style={{
                  fontSize: '0.65rem',
                  marginTop: '4px',
                  color: isSelected ? '#ff55ff' : '#aaa',
                  fontWeight: 'bold'
                }}>
                  {block.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* زر الانطلاق */}
      <button
        onClick={() => setShowSetupModal(false)}
        type="button"
        style={{
          width: '100%',
          height: '52px',
          background: 'linear-gradient(180deg, #55ff55 0%, #2b8a2b 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#000',
          fontSize: '1.2rem',
          fontWeight: '900',
          cursor: 'pointer',
          boxShadow: '0 6px 0 #195219, 0 10px 20px rgba(0,0,0,0.5)',
          transition: 'all 0.1s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = 'translateY(4px)';
          e.currentTarget.style.boxShadow = '0 2px 0 #195219, 0 4px 10px rgba(0,0,0,0.5)';
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 0 #195219, 0 10px 20px rgba(0,0,0,0.5)';
        }}
      >
        قول يارب وبلش ... 🚀
      </button>
    </div>
  </div>
)}

      {/* لوحة السكور العلوية الماينكرافتية */}
      <div className="minecraft-card" style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '12px 10px',
        marginBottom: '15px',
        backgroundColor: '#181818'
      }}>
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#55ffff', fontSize: '1rem', fontWeight: '900' }}>
            {displayPlayer1Name}
          </h3>
          <div className="score-box-container" style={{ backgroundImage: `url(${player1Block.image})` }}>
            <div className="score-overlay">
              <span className="score-number">{akramScore}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '6px' }}>
            <button className="minecraft-btn" onClick={() => addPoint('akram')} style={{ backgroundColor: '#55ff55', color: '#000', padding: '4px 12px', fontSize: '0.85rem' }}>+1</button>
            <button className="minecraft-btn" onClick={() => removePoint('akram')} style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 12px', fontSize: '0.85rem' }}>-1</button>
          </div>
        </div>

        <div style={{ borderLeft: '2px solid #333', height: '110px', margin: '0 5px' }}></div>

        <div style={{ textAlign: 'center', flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#ff55ff', fontSize: '1rem', fontWeight: '900' }}>
            {displayPlayer2Name}
          </h3>
          <div className="score-box-container" style={{ backgroundImage: `url(${player2Block.image})` }}>
            <div className="score-overlay">
              <span className="score-number">{ammoorScore}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginTop: '6px' }}>
            <button className="minecraft-btn" onClick={() => addPoint('ammoor')} style={{ backgroundColor: '#55ff55', color: '#000', padding: '4px 12px', fontSize: '0.85rem' }}>+1</button>
            <button className="minecraft-btn" onClick={() => removePoint('ammoor')} style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 12px', fontSize: '0.85rem' }}>-1</button>
          </div>
        </div>
      </div>

      {/* الانتقال بين الشاشات */}
      {currentMode === 'home' && (
        <HomeScreen
          onSelectMode={(modeId) => setCurrentMode(modeId)}
          onOpenSettings={() => setShowSetupModal(true)}
        />
      )}

      {currentMode === 'quiz' && (
        <QuizScreen
          onBack={() => setCurrentMode('home')}
          onAddPoint={addPoint}
          playerOneName={displayPlayer1Name}
          playerTwoName={displayPlayer2Name}
          playerOneBlock={player1Block}
          playerTwoBlock={player2Block}
        />
      )}

      {/* 🧩 شاشة لعبة: من أنا؟ */}
      {currentMode === 'who-am-i' && (
        <WhoAmIScreen
          onBack={() => setCurrentMode('home')}
          onAddPoint={addPoint}
          playerOneName={displayPlayer1Name}
          playerTwoName={displayPlayer2Name}
          playerOneBlock={player1Block}
          playerTwoBlock={player2Block}
        />
      )}

      {/* 🎵 شاشة لعبة: تحدي الأصوات */}
      {currentMode === 'sound-quiz' && (
        <SoundQuizScreen
          onBack={() => setCurrentMode('home')}
          onAddPoint={addPoint}
          playerOneName={displayPlayer1Name}
          playerTwoName={displayPlayer2Name}
          playerOneBlock={player1Block}
          playerTwoBlock={player2Block}
        />
      )}

      {/* الأطوار المتبقية قيد الإعداد */}
      {currentMode !== 'home' && currentMode !== 'quiz' && currentMode !== 'who-am-i' && currentMode !== 'sound-quiz' && (
        <div className="minecraft-card" style={{ padding: '25px 15px', textAlign: 'center' }}>
          <button
            className="minecraft-btn"
            onClick={() => setCurrentMode('home')}
            style={{ float: 'right', backgroundColor: '#444', color: '#fff', padding: '4px 10px', fontSize: '0.75rem' }}
          >
            🏠 القائمة
          </button>
          <div style={{ clear: 'both', paddingTop: '10px' }}></div>
          <h2 style={{ color: '#ffaa00' }}>🚧 طور قيد الإعداد</h2>
          <p style={{ color: '#aaa', fontSize: '0.9rem' }}>جاهزين نبرمجه بالتحديث القادم!</p>
        </div>
      )}
    </div>
  );
}

export default App;