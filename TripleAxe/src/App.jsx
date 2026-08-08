import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { WhoAmIScreen } from './components/WhoAmIScreen';
import { SoundQuizScreen } from './components/SoundQuizScreen';
import { playSound } from './utils/audio';

const blockOptions = [
  {
    id: 'diamond',
    label: 'Diamond',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/diamond_block.png'
  },
  {
    id: 'emerald',
    label: 'Emerald',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/emerald_block.png'
  },
  {
    id: 'gold',
    label: 'Gold',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/gold_block.png'
  },
  {
    id: 'redstone',
    label: 'Redstone',
    image: 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/redstone_block.png'
  },
  {
    id: 'netherite',
    label: 'Netherite',
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
    if (player === 'akram') setAkramScore(akramScore + 1);
    if (player === 'ammoor') setAmmoorScore(ammoorScore + 1);
  };

  const removePoint = (player) => {
    playSound('minus');
    if (player === 'akram') setAkramScore(Math.max(0, akramScore - 1));
    if (player === 'ammoor') setAmmoorScore(Math.max(0, ammoorScore - 1));
  };

  const displayPlayer1Name = player1Name.trim() || 'اللاعب الأول';
  const displayPlayer2Name = player2Name.trim() || 'اللاعب الثاني';

  return (
    <div style={{ padding: '10px', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      {showSetupModal && (
        <div style={{
          position: 'fixed',
          fontFamily: 'tahoma, sans-serif',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.33)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          zIndex: 2000,
          backdropFilter: 'blur(6px)'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '420px',
            backgroundColor: '#171717',
            border: '2px solid rgba(255,255,255,0.08)',
            borderRadius: '14px',
            padding: '18px 16px',
            boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => setShowSetupModal(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'red',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#eee',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: '1'
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <h2 style={{
                margin: '0 0 4px 0',
                color: '#aad8ff',
                fontSize: '1.4rem',
                fontWeight: '800'
              }}>
                إعدادات اللعبة
              </h2>
              <p style={{
                margin: 0,
                color: '#c8d8eb',
                fontSize: '0.95rem'
              }}>
                عدّل الأسماء والبلوكات قبل اللعب.
              </p>
            </div>

            <div style={{
              height: '4px',
              background: 'linear-gradient(90deg, #ffaa00, #ffdd55, #ffaa00)',
              borderRadius: '2px',
              marginBottom: '16px'
            }} />

            <div style={{ textAlign: 'center', marginBottom: '18px', border: " 1px solid rgba(255,255,255,0.12)", padding: "10px", borderRadius: "8px", backgroundColor: "#1a1a1a" }}>
              <h2 style={{
                textAlign: 'center',
                direction: 'ltr',
                margin: '0 0 4px 0',
                color: '#55ff55',
                fontSize: '1.7rem',
                fontWeight: 'bold',
                fontFamily: 'MonoCraft',
                letterSpacing: '1px',
                marginBottom: '20px'
              }}>
                ⚔️ TripleAxe ⚔️
              </h2>
              <p style={{
                margin: 0,
                color: '#b0b0b0',
                fontSize: '0.95rem',
                background: 'rgba(0,0,0,0.3)',
                display: 'inline-block',
                padding: '2px 14px',
                border: '1px solid #555'
              }}>
                🕊️ طورها الحمامة 🕊️
              </p>
            </div>

            <label style={{
              display: 'block',
              marginBottom: '12px',
              color: '#e0e0e0',
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }}>
              <span style={{ color: '#55ffff' }}>🟦</span> اسم اللاعب الأول
              <input
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                style={{
                  width: '50%',
                  marginTop: '6px',
                  marginRight: '14px',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: '#111',
                  color: '#fff',
                  fontSize: '0.98rem',
                  outline: 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#55ffff';
                  e.target.style.boxShadow = '0 0 10px rgba(85,255,255,0.14)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </label>

            {/* Player 2 Name */}
            <label style={{
              display: 'block',
              marginBottom: '14px',
              color: '#e0e0e0',
              fontWeight: 'bold',
              fontSize: '0.95rem'
            }}>
              <span style={{ color: '#ff55ff' }}>🟪</span> اسم اللاعب الثاني
              <input
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                style={{
                  width: '50%',
                  marginTop: '5px',
                  marginRight: '14px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '2px solid #5a4a32',
                  background: '#1a1a1a',
                  color: '#fff',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#ff55ff'}
                onBlur={(e) => e.target.style.borderColor = '#5a4a32'}
              />
            </label>

            <div style={{
              margin: '6px 0 12px',
              color: '#ddd',
              fontWeight: 'bold',
              fontSize: '1rem',
              borderBottom: '1px solid #444',
              paddingBottom: '6px'
            }}>
              🧱 اختر بلوك لكل لاعب
            </div>

            {/* Block selection for player 1 */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{
                color: '#55ffff',
                fontSize: '0.9rem',
                marginBottom: '6px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>🟦</span> {displayPlayer1Name}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '6px'
              }}>
                {blockOptions.map((block) => (
                  <button
                    key={`p1-${block.id}`}
                    onClick={() => setPlayer1Block(block)}
                    type="button"
                    style={{
                      fontFamily: 'MonoCraft, monospace',
                      background: 'transparent',
                      border: player1Block.id === block.id ? '3px solid #ffdd55' : '2px solid #555',
                      borderRadius: '8px',
                      padding: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      boxShadow: player1Block.id === block.id ? '0 0 12px rgba(255,221,85,0.5)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={block.image}
                      alt={block.label}
                      style={{
                        width: '100%',
                        height: '32px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      fontSize: '0.6rem',
                      marginTop: '3px',
                      color: '#ccc',
                      fontWeight: 'bold',
                      textShadow: '0 1px 2px #000'
                    }}>
                      {block.label}
                    </div>
                    {player1Block.id === block.id && (
                      <div style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        background: '#ffdd55',
                        color: '#1a1a1a',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '12px',
                        lineHeight: '18px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        boxShadow: '0 0 8px rgba(255,221,85,0.8)'
                      }}>
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Block selection for player 2 */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{
                color: '#ff55ff',
                fontSize: '0.9rem',
                marginBottom: '6px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span>🟪</span> {displayPlayer2Name}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '6px'
              }}>
                {blockOptions.map((block) => (
                  <button
                    key={`p2-${block.id}`}
                    onClick={() => setPlayer2Block(block)}
                    type="button"
                    style={{
                      fontFamily: 'MonoCraft, monospace',
                      background: 'transparent',
                      border: player2Block.id === block.id ? '3px solid #ffdd55' : '2px solid #555',
                      borderRadius: '8px',
                      padding: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      boxShadow: player2Block.id === block.id ? '0 0 12px rgba(255,221,85,0.5)' : 'none',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={block.image}
                      alt={block.label}
                      style={{
                        width: '100%',
                        height: '32px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        display: 'block'
                      }}
                    />
                    <div style={{
                      fontSize: '0.6rem',
                      marginTop: '3px',
                      color: '#ccc',
                      fontWeight: 'bold',
                      textShadow: '0 1px 2px #000'
                    }}>
                      {block.label}
                    </div>
                    {player2Block.id === block.id && (
                      <div style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        background: '#ffdd55',
                        color: '#1a1a1a',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        fontSize: '12px',
                        lineHeight: '18px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        boxShadow: '0 0 8px rgba(255,221,85,0.8)'
                      }}>
                        ✓
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch button */}
            <button
              onClick={() => setShowSetupModal(false)}
              type="button"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 0',
                background: 'linear-gradient(180deg, #7ccf5e 0%, #4caf50 100%)',
                border: '3px solid #2d6a2d',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                textShadow: '0 2px 0 #1f4a1f',
                boxShadow: '0 6px 0 #1f4a1f, 0 8px 16px rgba(0,0,0,0.4)',
                cursor: 'pointer',
                transition: 'all 0.08s ease',
                fontFamily: 'inherit',
                letterSpacing: '1px'
              }}
              onMouseDown={(e) => {
                e.target.style.transform = 'translateY(4px)';
                e.target.style.boxShadow = '0 2px 0 #1f4a1f, 0 4px 10px rgba(0,0,0,0.4)';
              }}
              onMouseUp={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 0 #1f4a1f, 0 8px 16px rgba(0,0,0,0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 6px 0 #1f4a1f, 0 8px 16px rgba(0,0,0,0.4)';
              }}
            >
              قول يارب وبلش ...
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