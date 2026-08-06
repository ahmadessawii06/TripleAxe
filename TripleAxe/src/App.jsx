import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { playSound } from './utils/audio';

function App() {
  const [akramScore, setAkramScore] = useState(0);
  const [ammoorScore, setAmmoorScore] = useState(0);

  const [currentMode, setCurrentMode] = useState('home');

  const addPoint = (player) => {
    playSound('point'); // صوت رونالدو SIUU
    if (player === 'akram') setAkramScore(akramScore + 1);
    if (player === 'ammoor') setAmmoorScore(ammoorScore + 1);
  };

  const removePoint = (player) => {
    playSound('minus'); // صوت ميسي Que miras bobo
    if (player === 'akram') setAkramScore(Math.max(0, akramScore - 1));
    if (player === 'ammoor') setAmmoorScore(Math.max(0, ammoorScore - 1));
  };

  const akramBg = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/diamond_block.png";
  const ammoorBg = "https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures/block/emerald_block.png";

  return (
    <div style={{ padding: '10px', maxWidth: '480px', margin: '0 auto' }}>
      
      {/* لوحة السكور العلوية الماينكرافتية */}
      <div className="minecraft-card" style={{ 
        display: 'flex', 
        justify: 'space-around', 
        alignItems: 'center',
        padding: '12px 10px', 
        marginBottom: '15px',
        backgroundColor: '#181818'
      }}>
        
        {/* قسم أكرم */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#55ffff', fontSize: '1rem', fontWeight: '900' }}>
            Akram
          </h3>
          <div className="score-box-container" style={{ backgroundImage: `url(${akramBg})` }}>
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

        {/* قسم عمور */}
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#ff55ff', fontSize: '1rem', fontWeight: '900' }}>
            Amor
          </h3>
          <div className="score-box-container" style={{ backgroundImage: `url(${ammoorBg})` }}>
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
        <HomeScreen onSelectMode={(modeId) => setCurrentMode(modeId)} />
      )}

      {currentMode === 'quiz' && (
        <QuizScreen 
          onBack={() => setCurrentMode('home')} 
          onAddPoint={addPoint}
        />
      )}

      {currentMode !== 'home' && currentMode !== 'quiz' && (
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