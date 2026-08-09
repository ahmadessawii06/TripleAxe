import { useState } from 'react';
import { soundQuizData } from '../data/SoundQuizData';
import { playSound } from '../utils/audio';

const soundLibrary = {
    creeper: '/sounds/creeper.ogg',
    chestOpen: '/sounds/chestOpen.ogg',
    chestClose: '/sounds/chestClose.ogg',
    anvil: '/sounds/anvil.ogg',
    explosion: '/sounds/explosion.ogg',
    fire: '/sounds/fire.ogg',
    glassBreak: '/sounds/glassBreak.ogg',
    doorOpen: '/sounds/doorOpen.ogg',
    doorClose: '/sounds/doorClose.ogg',
    click: '/sounds/click.ogg',
    fizz: '/sounds/fizz.ogg',
    levelUp: '/sounds/levelUp.ogg',
    orb: '/sounds/orb.ogg',
    bow: '/sounds/bow.ogg',
    hurt: '/sounds/hurt.ogg',
    eat: '/sounds/eat.ogg',
    splash: '/sounds/splash.ogg',
    water: '/sounds/water.ogg',
    lava: '/sounds/lava.ogg',
    portal: '/sounds/portal.ogg',
    fireWorks: '/sounds/fireWorks.ogg',
    crop: '/sounds/crop.ogg',
};

function shuffleArray(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

export function SoundQuizScreen({ onBack, onAddPoint, playerOneName, playerTwoName, playerOneBlock, playerTwoBlock }) {
    const [questions] = useState(() => shuffleArray(soundQuizData));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [pointGiven, setPointGiven] = useState(null);

    const currentQ = questions[currentIndex];

    const playCurrentSound = () => {
        if (!currentQ?.soundType) return;
        playSound(currentQ.soundType);
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
            return;
        }

        onAddPoint(player);
        playSound('score');
        setPointGiven(player);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % questions.length);
        setShowAnswer(false);
        setPointGiven(null);
    };

    const isButtonDisabled = (player) => pointGiven !== null && pointGiven !== player;

    return (
        <div className="minecraft-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h2 style={{ color: '#ff66b3', margin: 0, fontSize: '1.1rem' }}>🎵 تحدي الأصوات</h2>
                <button className="minecraft-btn" onClick={onBack} style={{ backgroundColor: '#ff5555', color: '#fff', padding: '4px 10px', fontSize: '0.8rem' }}>
                    🏠 القائمة
                </button>
            </div>

            <div style={{ color: '#aaa', fontSize: '0.8rem', marginBottom: '10px' }}>
                سؤال {currentIndex + 1} من {questions.length}
            </div>

            <div style={{ backgroundColor: '#111', border: '2px solid #444', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
                <div style={{ color: '#ffd166', fontSize: '0.9rem', marginBottom: '8px' }}>{currentQ.title}</div>
                <button className="minecraft-btn" onClick={playCurrentSound} style={{ backgroundColor: '#7c3aed', color: '#fff', padding: '10px 14px', width: '100%', marginBottom: '10px' }}>
                    🔊 تشغيل الصوت
                </button>
            </div>

            <button className="minecraft-btn" onClick={handleToggleAnswer} style={{ width: '100%', padding: '10px', backgroundColor: showAnswer ? '#333' : '#ffaa00', color: showAnswer ? '#aaa' : '#000', marginBottom: '14px', fontSize: '0.9rem' }}>
                {showAnswer ? '🙈 إخفاء الإجابة' : '👁️ إظهار الإجابة'}
            </button>

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

                    {(() => {
                        const imageToShow = pointGiven === 'player1'
                            ? playerOneBlock?.image
                            : pointGiven === 'player2'
                                ? playerTwoBlock?.image
                                : pointGiven === 'none'
                                    ? null
                                    : currentQ.imageUrl || null;

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
                                    alt={pointGiven === 'akram' ? playerOneName : pointGiven === 'ammoor' ? playerTwoName : currentQ.answer}
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

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
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

            {showAnswer && (
                <div style={{ textAlign: 'center' }}>
                    <button className="minecraft-btn" onClick={handleNext} style={{ backgroundColor: '#55ff55', color: '#000', padding: '8px 12px' }}>
                        السؤال التالي
                    </button>
                </div>
            )}


        </div>
    );
}
