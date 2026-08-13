import { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/audio';

const ASSETS = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.19/assets/minecraft/textures';

// الموارد القابلة للسحب
const RESOURCES = {
  wood:    { id: 'wood',    label: 'خشب',     image: `${ASSETS}/block/oak_planks.png` },
  stick:   { id: 'stick',   label: 'عصا',     image: `${ASSETS}/item/stick.png` },
  stone:   { id: 'stone',   label: 'حجر',     image: `${ASSETS}/block/stone.png` },
  iron:    { id: 'iron',    label: 'حديد',    image: `${ASSETS}/item/iron_ingot.png` },
  gold:    { id: 'gold',    label: 'ذهب',     image: `${ASSETS}/item/gold_ingot.png` },
  diamond: { id: 'diamond', label: 'دايموند', image: `${ASSETS}/item/diamond.png` },
};

// الوصفات (النمط 3x3: صف-عمود). null = خانة فارغة
const RECIPES = [
  {
    id: 'diamond-sword',
    name: 'سيف دايموند',
    result: `${ASSETS}/item/diamond_sword.png`,
    pattern: [null, 'diamond', null, null, 'diamond', null, null, 'stick', null],
  },
  {
    id: 'iron-pickaxe',
    name: 'بيكاكس حديد',
    result: `${ASSETS}/item/iron_pickaxe.png`,
    pattern: ['iron', 'iron', 'iron', null, 'stick', null, null, 'stick', null],
  },
  {
    id: 'wooden-axe',
    name: 'فأس خشبي',
    result: `${ASSETS}/item/wooden_axe.png`,
    pattern: ['wood', 'wood', null, 'wood', 'stick', null, null, 'stick', null],
  },
  {
    id: 'chest',
    name: 'صندوق',
    result: `${ASSETS}/block/chest_front.png`,
    pattern: ['wood', 'wood', 'wood', 'wood', null, 'wood', 'wood', 'wood', 'wood'],
  },
  {
    id: 'stone-sword',
    name: 'سيف حجري',
    result: `${ASSETS}/item/stone_sword.png`,
    pattern: [null, 'stone', null, null, 'stone', null, null, 'stick', null],
  },
];

// انعكاس أفقي (يسمح بصنع الوصفة يمين أو يسار)
const mirror = (p) => [p[2], p[1], p[0], p[5], p[4], p[3], p[8], p[7], p[6]];
const matches = (grid, pattern) => grid.every((cell, i) => cell === pattern[i]);

export function CraftingScreen({ onBack, onAddPoint, playerOneName, playerTwoName, playerOneBlock, playerTwoBlock }) {
  const [grid, setGrid] = useState(Array(9).fill(null));
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [turn, setTurn] = useState('player1');
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverCell, setHoverCell] = useState(-1);
  const [wrong, setWrong] = useState(false);
  const [celebrating, setCelebrating] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const justDropped = useRef(false);

  const recipe = RECIPES[recipeIndex];
  const currentName = turn === 'player1' ? playerOneName : playerTwoName;
  const currentBlock = turn === 'player1' ? playerOneBlock : playerTwoBlock;
  const turnColor = turn === 'player1' ? '#55ffff' : '#ff55ff';

  // البحث عن الخانة تحت المؤشر أثناء السحب
  const getCellIndex = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const cell = el?.closest?.('[data-cell]');
    return cell ? Number(cell.getAttribute('data-cell')) : -1;
  };

  const startDrag = (e, resource) => {
    e.preventDefault();
    setSelected(null);
    setDragging({ resource });
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  // مستمعات السحب العامة (تعمل بالماوس واللمس)
  useEffect(() => {
    if (!dragging) return;

    const move = (e) => {
      e.preventDefault();
      setDragPos({ x: e.clientX, y: e.clientY });
      setHoverCell(getCellIndex(e));
    };

    const up = (e) => {
      const idx = getCellIndex(e);
      if (idx >= 0) {
        setGrid((g) => { const n = [...g]; n[idx] = dragging.resource; return n; });
        justDropped.current = true;
      } else {
        // ضغطة سريعة بدون سحب => اختيار المورد (نمط "اضغط ثم ضع")
        setSelected(dragging.resource);
      }
      setDragging(null);
      setHoverCell(-1);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [dragging]);

  const handleCellTap = (index) => {
    if (justDropped.current) { justDropped.current = false; return; }
    if (selected) {
      setGrid((g) => { const n = [...g]; n[index] = selected; return n; });
      setSelected(null);
    } else if (grid[index]) {
      setGrid((g) => { const n = [...g]; n[index] = null; return n; });
    }
  };

  const handleCheck = () => {
    if (matches(grid, recipe.pattern) || matches(grid, mirror(recipe.pattern))) {
      onAddPoint(turn); // يضيف نقطة + صوت "نقطة" تلقائياً
      setCelebrating({ recipe, player: turn });
    } else {
      playSound('minus');
      setWrong(true);
      setTimeout(() => setWrong(false), 600);
    }
  };

  // عند نجاح الصنع: احتفالية ثم الانتقال للوصفة التالية والدور الآخر
  useEffect(() => {
    if (!celebrating) return;
    const t = setTimeout(() => {
      setCelebrating(null);
      setGrid(Array(9).fill(null));
      setSelected(null);
      setRecipeIndex((i) => (i + 1) % RECIPES.length);
      setTurn((t) => (t === 'player1' ? 'player2' : 'player1'));
    }, 2000);
    return () => clearTimeout(t);
  }, [celebrating]);

  const handleClear = () => { setGrid(Array(9).fill(null)); setSelected(null); };
  const handleSkip = () => {
    setGrid(Array(9).fill(null));
    setSelected(null);
    setRecipeIndex((i) => (i + 1) % RECIPES.length);
    setTurn((t) => (t === 'player1' ? 'player2' : 'player1'));
  };

  const resourceList = Object.values(RESOURCES);

  return (
    <div className="minecraft-card" style={{ padding: '15px 12px', direction: 'rtl', userSelect: 'none' }}>
      <style>{`
        @keyframes craftPop { 0% { transform: scale(0); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-7px); } 40% { transform: translateX(7px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }
        @keyframes floatUp { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-140px); opacity: 0; } }
        @keyframes glowPulse { 0%,100% { box-shadow: 0 0 8px rgba(85,255,85,.4); } 50% { box-shadow: 0 0 28px rgba(85,255,85,.95); } }
      `}</style>

      {/* الهيدر */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <button className="minecraft-btn" onClick={onBack} style={{ backgroundColor: '#444', color: '#fff', padding: '4px 10px', fontSize: '0.75rem' }}>
          🏠 رجوع
        </button>
        <h2 style={{ margin: 0, color: '#55ff55', fontSize: '1.15rem', fontWeight: '900', textShadow: '0 2px 4px rgba(0,0,0,.5)' }}>
          🛠️ تحدي الكرافتينج
        </h2>
        <span style={{ color: '#888', fontSize: '0.75rem' }}>
          {recipeIndex + 1} / {RECIPES.length}
        </span>
      </div>

      {/* مؤشر الدور */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
        background: '#1a1a1a', border: `2px solid ${turnColor}`, borderRadius: '12px',
        padding: '8px 12px', marginBottom: '14px', boxShadow: `0 0 12px ${turnColor}33`
      }}>
        <img src={currentBlock.image} alt="" style={{ width: '30px', height: '30px', imageRendering: 'pixelated' }} />
        <span style={{ color: '#fff', fontWeight: 'bold' }}>دور:</span>
        <span style={{ color: turnColor, fontWeight: '900' }}>{currentName}</span>
      </div>

      {/* الوصفة المطلوبة */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '6px' }}>اصنع:</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src={recipe.result} alt={recipe.name} style={{ width: '48px', height: '48px', imageRendering: 'pixelated', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,.6))' }} />
          <span style={{ color: '#ffaa00', fontWeight: '900', fontSize: '1.1rem' }}>{recipe.name}</span>
        </div>
        <button
          onClick={() => setShowHint((h) => !h)}
          style={{ marginTop: '8px', background: '#222', color: '#55ffff', border: '1px solid #333', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' }}
        >
          {showHint ? '🙈 إخفاء التلميح' : '💡 تلميح'}
        </button>
        {showHint && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', width: '120px', margin: '10px auto 0' }}>
            {recipe.pattern.map((r, i) => (
              <div key={i} style={{ width: '36px', height: '36px', background: '#141414', border: '1px solid #333', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {r ? <img src={RESOURCES[r].image} alt="" style={{ width: '28px', height: '28px', imageRendering: 'pixelated', opacity: 0.85 }} /> : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* شبكة الصنع 3x3 */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
        maxWidth: '300px', margin: '0 auto 16px',
        background: '#141414', padding: '14px', borderRadius: '16px',
        border: '3px solid #5b3d1e',
        animation: wrong ? 'shake 0.5s' : 'none'
      }}>
        {grid.map((res, i) => (
          <div
            key={i}
            data-cell={i}
            onClick={() => handleCellTap(i)}
            style={{
              aspectRatio: '1 / 1',
              background: hoverCell === i && dragging ? '#2a2a2a' : '#1e1e1e',
              border: hoverCell === i && dragging ? '2px dashed #55ff55' : '2px solid #333',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.1s',
              boxShadow: 'inset 0 2px 5px rgba(0,0,0,.5)'
            }}
          >
            {res ? <img src={RESOURCES[res].image} alt="" style={{ width: '70%', height: '70%', objectFit: 'contain', imageRendering: 'pixelated' }} /> : null}
          </div>
        ))}
      </div>

      {/* الموارد القابلة للسحب */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
        {resourceList.map((res) => (
          <button
            key={res.id}
            type="button"
            onPointerDown={(e) => startDrag(e, res.id)}
            style={{
              width: '56px', height: '56px',
              background: '#181818',
              border: selected === res.id ? '2px solid #55ff55' : '2px solid #282828',
              borderRadius: '10px', cursor: 'grab',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              touchAction: 'none', boxShadow: selected === res.id ? '0 0 10px rgba(85,255,85,.4)' : 'none'
            }}
          >
            <img src={res.image} alt={res.label} style={{ width: '34px', height: '34px', imageRendering: 'pixelated', pointerEvents: 'none' }} />
          </button>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: '#777', fontSize: '0.7rem', marginTop: '-10px', marginBottom: '14px' }}>
        اسحب الموارد وأفلتها في الشبكة — أو اضغط مورد ثم اضغط خانة
      </div>

      {/* أزرار التحكم */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button className="minecraft-btn" onClick={handleCheck} style={{ backgroundColor: '#55ff55', color: '#000', padding: '10px 20px', fontWeight: '900', fontSize: '1rem' }}>
          🔍 تحقق
        </button>
        <button className="minecraft-btn" onClick={handleClear} style={{ backgroundColor: '#ffaa00', color: '#000', padding: '10px 16px', fontWeight: '900' }}>
          🗑️ مسح
        </button>
        <button className="minecraft-btn" onClick={handleSkip} style={{ backgroundColor: '#444', color: '#fff', padding: '10px 16px', fontWeight: '900' }}>
          ⏭️ تخطي
        </button>
      </div>

      {/* شبح العنصر المسحوب */}
      {dragging && (
        <div style={{ position: 'fixed', left: dragPos.x, top: dragPos.y, transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 3000 }}>
          <img src={RESOURCES[dragging.resource].image} alt="" style={{ width: '52px', height: '52px', imageRendering: 'pixelated', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.7))' }} />
        </div>
      )}

      {/* شاشة الاحتفال */}
      {celebrating && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.8)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000, direction: 'rtl', overflow: 'hidden'
        }}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{ position: 'absolute', left: `${8 + Math.random() * 84}%`, top: '50%', fontSize: '1.5rem', animation: `floatUp ${1 + Math.random()}s ease-out ${Math.random() * 0.6}s forwards` }}>
              {['🟩', '✨', '💎', '⭐', '🟦'][i % 5]}
            </span>
          ))}
          <div style={{ textAlign: 'center', background: '#141414', border: '3px solid #55ff55', borderRadius: '20px', padding: '28px 26px', animation: 'glowPulse 1.2s infinite' }}>
            <img src={celebrating.recipe.result} alt="" style={{ width: '90px', height: '90px', imageRendering: 'pixelated', animation: 'craftPop 0.5s ease-out' }} />
            <h2 style={{ margin: '14px 0 6px', color: '#55ff55', fontWeight: '900', fontSize: '1.4rem' }}>🎉 صنعت {celebrating.recipe.name}!</h2>
            <p style={{ margin: 0, color: turnColor, fontWeight: '900', fontSize: '1.1rem' }}>
              +1 نقطة لـ {celebrating.player === 'player1' ? playerOneName : playerTwoName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
