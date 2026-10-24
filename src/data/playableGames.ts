/**
 * PlayHub Built-in HTML5 Game Engines
 * 
 * NOTE FOR CLIENT / PRODUCTION:
 * In production, embedUrl can point to licensed third-party HTML5 game embeds
 * (e.g. GameDistribution, itch.io embeds, CrazyGames, or custom WebGL bundles).
 * When embedUrl uses the 'internal://' prefix or an offline fallback is needed,
 * these self-contained canvas games run directly with high performance,
 * touch & keyboard controls, Web Audio chimes, and score tracking.
 */

export function getInternalGameHtml(gameSlug: string, gameTitle: string): string {
  // Common stylish dark-mode CSS and Web Audio sound synthesizer
  const baseHtmlStart = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>${gameTitle}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #090d16;
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100vw;
      height: 100vh;
    }
    #game-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at center, #1e1b4b 0%, #090d16 100%);
    }
    canvas {
      display: block;
      background: transparent;
      max-width: 100%;
      max-height: 100%;
      touch-action: none;
    }
    .hud {
      position: absolute;
      top: 12px;
      left: 16px;
      right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      text-shadow: 0 2px 4px rgba(0,0,0,0.8);
      z-index: 10;
    }
    .hud span {
      background: rgba(15, 23, 42, 0.75);
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid rgba(139, 92, 246, 0.3);
      backdrop-filter: blur(4px);
    }
    .game-over-overlay {
      position: absolute;
      inset: 0;
      background: rgba(9, 13, 22, 0.88);
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(6px);
      z-index: 20;
    }
    .game-over-title {
      font-size: 28px;
      font-weight: 800;
      color: #ec4899;
      margin-bottom: 8px;
      text-shadow: 0 0 16px rgba(236, 72, 153, 0.6);
    }
    .final-score {
      font-size: 18px;
      color: #cbd5e1;
      margin-bottom: 20px;
    }
    .play-btn {
      background: linear-gradient(135deg, #8b5cf6, #d946ef);
      color: #fff;
      border: none;
      padding: 12px 32px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
      box-shadow: 0 4px 16px rgba(139, 92, 246, 0.4);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .play-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
    }
    .controls-hint {
      position: absolute;
      bottom: 12px;
      font-size: 11px;
      color: #94a3b8;
      text-align: center;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="game-container">
    <div class="hud">
      <span id="score-display">SCORE: 0</span>
      <span id="extra-display">LIVES: 3</span>
    </div>
    <canvas id="cvs"></canvas>
    <div class="controls-hint" id="hint">USE ARROW KEYS / TOUCH TO PLAY</div>
    <div class="game-over-overlay" id="game-over">
      <div class="game-over-title" id="over-status">GAME OVER</div>
      <div class="final-score" id="final-score">Your Score: 0</div>
      <button class="play-btn" id="restart-btn">PLAY AGAIN</button>
    </div>
  </div>
  <script>
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playBeep(freq, type='sine', dur=0.1) {
      try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      } catch(e) {}
    }
  `;

  // Specific game implementations:
  if (gameSlug.includes('racer') || gameSlug.includes('drift') || gameSlug.includes('highway')) {
    // Top-down Highway Neon Racer
    return baseHtmlStart + `
    const canvas = document.getElementById('cvs');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score-display');
    const extraEl = document.getElementById('extra-display');
    const overOverlay = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    let w = 480, h = 640;
    canvas.width = w;
    canvas.height = h;

    let player = { x: w/2 - 20, y: h - 110, width: 40, height: 70, speed: 6, vx: 0 };
    let obstacles = [];
    let particles = [];
    let roadOffset = 0;
    let score = 0;
    let speed = 7;
    let gameOver = false;
    let keys = {};

    window.addEventListener('keydown', e => { keys[e.key] = true; });
    window.addEventListener('keyup', e => { keys[e.key] = false; });
    
    // Touch steer
    window.addEventListener('pointerdown', e => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (w / rect.width);
      if (clickX < player.x) player.vx = -player.speed;
      else player.vx = player.speed;
    });
    window.addEventListener('pointerup', () => { player.vx = 0; });

    function spawnObstacle() {
      const lanes = [w * 0.25, w * 0.42, w * 0.58, w * 0.75];
      const laneX = lanes[Math.floor(Math.random() * lanes.length)] - 20;
      const colors = ['#f43f5e', '#06b6d4', '#eab308', '#a855f7'];
      obstacles.push({
        x: laneX,
        y: -90,
        width: 38,
        height: 68,
        speed: speed * (0.6 + Math.random() * 0.4),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let spawnTimer = 0;
    function resetGame() {
      player.x = w/2 - 20;
      player.vx = 0;
      obstacles = [];
      particles = [];
      score = 0;
      speed = 7;
      gameOver = false;
      overOverlay.style.display = 'none';
      scoreEl.textContent = 'SCORE: 0';
      extraEl.textContent = 'SPEED: ' + Math.round(speed * 15) + ' KM/H';
      requestAnimationFrame(loop);
    }
    restartBtn.addEventListener('click', resetGame);

    function loop() {
      if (gameOver) return;

      // Handle input
      if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.vx = -player.speed;
      else if (keys['ArrowRight'] || keys['d'] || keys['D']) player.vx = player.speed;
      else if (!player.vx) player.vx = 0;

      player.x += player.vx;
      if (player.x < w * 0.16) player.x = w * 0.16;
      if (player.x + player.width > w * 0.84) player.x = w * 0.84 - player.width;

      roadOffset = (roadOffset + speed) % 60;
      score += 1;
      speed = 7 + Math.floor(score / 400);

      spawnTimer++;
      if (spawnTimer > Math.max(30, 75 - Math.floor(score / 200))) {
        spawnObstacle();
        spawnTimer = 0;
      }

      // Draw background & neon road
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      // Road shoulder
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(w * 0.15, 0, w * 0.7, h);

      // Neon road borders
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(w * 0.15, 0); ctx.lineTo(w * 0.15, h);
      ctx.moveTo(w * 0.85, 0); ctx.lineTo(w * 0.85, h);
      ctx.stroke();

      // Dashed lane lines
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([30, 30]);
      ctx.lineDashOffset = -roadOffset;
      ctx.lineWidth = 2;
      [w * 0.38, w * 0.62].forEach(lx => {
        ctx.beginPath();
        ctx.moveTo(lx, 0); ctx.lineTo(lx, h);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Update & draw obstacles
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        // Draw car
        ctx.fillStyle = obs.color;
        ctx.shadowColor = obs.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.width, obs.height, 6);
        ctx.fill();

        // Windshield
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x + 6, obs.y + 14, obs.width - 12, 16);

        // Headlights
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(obs.x + 4, obs.y + obs.height - 4, 6, 4);
        ctx.fillRect(obs.x + obs.width - 10, obs.y + obs.height - 4, 6, 4);

        // Collision check
        if (
          player.x < obs.x + obs.width - 4 &&
          player.x + player.width > obs.x + 4 &&
          player.y < obs.y + obs.height - 4 &&
          player.y + player.height > obs.y + 4
        ) {
          playBeep(160, 'sawtooth', 0.3);
          gameOver = true;
          overOverlay.style.display = 'flex';
          finalScoreEl.textContent = 'Final Score: ' + score;
          return;
        }

        if (obs.y > h + 100) obstacles.splice(i, 1);
      }

      // Draw player car
      ctx.fillStyle = '#10b981';
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.roundRect(player.x, player.y, player.width, player.height, 8);
      ctx.fill();

      // Player roof / windshield
      ctx.fillStyle = '#022c22';
      ctx.fillRect(player.x + 6, player.y + 20, player.width - 12, 22);

      // Player headlights
      ctx.fillStyle = '#67e8f9';
      ctx.fillRect(player.x + 4, player.y, 6, 4);
      ctx.fillRect(player.x + player.width - 10, player.y, 6, 4);
      ctx.shadowBlur = 0;

      scoreEl.textContent = 'SCORE: ' + score;
      extraEl.textContent = 'SPEED: ' + Math.round(speed * 15) + ' KM/H';

      requestAnimationFrame(loop);
    }
    resetGame();
  </script>
</body>
</html>`;
  }

  if (gameSlug.includes('galaxy') || gameSlug.includes('runner') || gameSlug.includes('swarm') || gameSlug.includes('arcade')) {
    // Retro Space Shooter / Galaxy Defender
    return baseHtmlStart + `
    const canvas = document.getElementById('cvs');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score-display');
    const extraEl = document.getElementById('extra-display');
    const overOverlay = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    let w = 480, h = 600;
    canvas.width = w; canvas.height = h;

    let player = { x: w/2 - 18, y: h - 70, w: 36, h: 36, speed: 7 };
    let bullets = [];
    let enemies = [];
    let stars = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let keys = {};

    for (let i = 0; i < 60; i++) {
      stars.push({ x: Math.random() * w, y: Math.random() * h, s: Math.random() * 2 + 0.5, speed: Math.random() * 2 + 1 });
    }

    window.addEventListener('keydown', e => {
      keys[e.key] = true;
      if (e.key === ' ' || e.key === 'Spacebar') {
        shoot();
        e.preventDefault();
      }
    });
    window.addEventListener('keyup', e => { keys[e.key] = false; });

    // Touch controls
    canvas.addEventListener('pointerdown', e => {
      const rect = canvas.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * (w / rect.width);
      player.x = clickX - player.w/2;
      shoot();
    });
    canvas.addEventListener('pointermove', e => {
      if (e.buttons > 0) {
        const rect = canvas.getBoundingClientRect();
        player.x = (e.clientX - rect.left) * (w / rect.width) - player.w/2;
      }
    });

    function shoot() {
      if (gameOver) return;
      bullets.push({ x: player.x + player.w/2 - 2, y: player.y, w: 5, h: 12 });
      playBeep(480, 'triangle', 0.08);
    }

    let spawnTimer = 0;
    function resetGame() {
      player.x = w/2 - 18;
      bullets = [];
      enemies = [];
      score = 0;
      lives = 3;
      gameOver = false;
      overOverlay.style.display = 'none';
      requestAnimationFrame(loop);
    }
    restartBtn.addEventListener('click', resetGame);

    function loop() {
      if (gameOver) return;

      if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
      if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
      if (player.x < 10) player.x = 10;
      if (player.x > w - player.w - 10) player.x = w - player.w - 10;

      // Stars
      ctx.fillStyle = '#060913';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#94a3b8';
      stars.forEach(st => {
        st.y += st.speed;
        if (st.y > h) st.y = 0;
        ctx.fillRect(st.x, st.y, st.s, st.s);
      });

      // Bullets
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y -= 10;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        if (b.y < -20) bullets.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // Spawn enemies
      spawnTimer++;
      if (spawnTimer > 35) {
        enemies.push({
          x: Math.random() * (w - 50) + 10,
          y: -40,
          w: 32,
          h: 32,
          speed: Math.random() * 2 + 2,
          color: Math.random() > 0.5 ? '#ec4899' : '#a855f7'
        });
        spawnTimer = 0;
      }

      // Enemies
      for (let i = enemies.length - 1; i >= 0; i--) {
        const en = enemies[i];
        en.y += en.speed;

        ctx.fillStyle = en.color;
        ctx.shadowColor = en.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(en.x + en.w/2, en.y + en.h/2, en.w/2, 0, Math.PI * 2);
        ctx.fill();

        // Hit bullet
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (b.x < en.x + en.w && b.x + b.w > en.x && b.y < en.y + en.h && b.y + b.h > en.y) {
            bullets.splice(j, 1);
            enemies.splice(i, 1);
            score += 100;
            playBeep(640, 'sine', 0.1);
            break;
          }
        }

        // Hit player
        if (en && en.x < player.x + player.w && en.x + en.w > player.x && en.y < player.y + player.h && en.y + en.h > player.y) {
          enemies.splice(i, 1);
          lives--;
          playBeep(180, 'sawtooth', 0.2);
          if (lives <= 0) {
            gameOver = true;
            overOverlay.style.display = 'flex';
            finalScoreEl.textContent = 'Final Score: ' + score;
            return;
          }
        }

        if (en && en.y > h + 40) enemies.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // Draw player ship
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(player.x + player.w/2, player.y);
      ctx.lineTo(player.x + player.w, player.y + player.h);
      ctx.lineTo(player.x + player.w/2, player.y + player.h - 8);
      ctx.lineTo(player.x, player.y + player.h);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;

      scoreEl.textContent = 'SCORE: ' + score;
      extraEl.textContent = 'LIVES: ' + lives;

      requestAnimationFrame(loop);
    }
    resetGame();
  </script>
</body>
</html>`;
  }

  // Fallback: Cyber Ninja / Brick Buster / Gem Match puzzle
  return baseHtmlStart + `
    const canvas = document.getElementById('cvs');
    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('score-display');
    const extraEl = document.getElementById('extra-display');
    const overOverlay = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    let w = 480, h = 560;
    canvas.width = w; canvas.height = h;

    let paddle = { x: w/2 - 50, y: h - 30, w: 100, h: 12, speed: 8 };
    let ball = { x: w/2, y: h - 60, r: 8, dx: 4, dy: -4 };
    let bricks = [];
    let score = 0;
    let lives = 3;
    let gameOver = false;
    let keys = {};

    function initBricks() {
      bricks = [];
      const rows = 5, cols = 8;
      const bw = 50, bh = 20, pad = 8, offsetTop = 50, offsetLeft = 14;
      const colors = ['#f43f5e', '#ec4899', '#a855f7', '#6366f1', '#06b6d4'];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          bricks.push({
            x: offsetLeft + c * (bw + pad),
            y: offsetTop + r * (bh + pad),
            w: bw, h: bh,
            color: colors[r],
            alive: true
          });
        }
      }
    }

    window.addEventListener('keydown', e => { keys[e.key] = true; });
    window.addEventListener('keyup', e => { keys[e.key] = false; });
    canvas.addEventListener('pointermove', e => {
      const rect = canvas.getBoundingClientRect();
      paddle.x = (e.clientX - rect.left) * (w / rect.width) - paddle.w/2;
    });

    function resetGame() {
      paddle.x = w/2 - 50;
      ball = { x: w/2, y: h - 60, r: 8, dx: 4 * (Math.random() > 0.5 ? 1 : -1), dy: -5 };
      score = 0;
      lives = 3;
      gameOver = false;
      overOverlay.style.display = 'none';
      initBricks();
      requestAnimationFrame(loop);
    }
    restartBtn.addEventListener('click', resetGame);

    function loop() {
      if (gameOver) return;

      if (keys['ArrowLeft'] || keys['a']) paddle.x -= paddle.speed;
      if (keys['ArrowRight'] || keys['d']) paddle.x += paddle.speed;
      if (paddle.x < 0) paddle.x = 0;
      if (paddle.x + paddle.w > w) paddle.x = w - paddle.w;

      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall bounce
      if (ball.x + ball.r > w || ball.x - ball.r < 0) {
        ball.dx = -ball.dx;
        playBeep(320, 'sine', 0.05);
      }
      if (ball.y - ball.r < 0) {
        ball.dy = -ball.dy;
        playBeep(320, 'sine', 0.05);
      }

      // Paddle bounce
      if (ball.y + ball.r >= paddle.y && ball.x >= paddle.x && ball.x <= paddle.x + paddle.w && ball.dy > 0) {
        ball.dy = -Math.abs(ball.dy);
        const hitPoint = (ball.x - (paddle.x + paddle.w/2)) / (paddle.w/2);
        ball.dx = hitPoint * 6;
        playBeep(520, 'sine', 0.08);
      }

      // Brick hit
      let aliveCount = 0;
      for (let b of bricks) {
        if (!b.alive) continue;
        aliveCount++;
        if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
          b.alive = false;
          ball.dy = -ball.dy;
          score += 50;
          playBeep(680, 'triangle', 0.08);
          break;
        }
      }

      if (aliveCount === 0) {
        initBricks();
        ball.dy *= 1.1;
      }

      // Ball fell down
      if (ball.y > h + 20) {
        lives--;
        playBeep(180, 'sawtooth', 0.2);
        if (lives <= 0) {
          gameOver = true;
          overOverlay.style.display = 'flex';
          finalScoreEl.textContent = 'Final Score: ' + score;
          return;
        } else {
          ball = { x: w/2, y: h - 60, r: 8, dx: 4, dy: -5 };
        }
      }

      // Render
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Bricks
      for (let b of bricks) {
        if (!b.alive) continue;
        ctx.fillStyle = b.color;
        ctx.shadowColor = b.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.roundRect(b.x, b.y, b.w, b.h, 4);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
      ctx.fill();

      // Ball
      ctx.fillStyle = '#f8fafc';
      ctx.shadowColor = '#fff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      scoreEl.textContent = 'SCORE: ' + score;
      extraEl.textContent = 'LIVES: ' + lives;

      requestAnimationFrame(loop);
    }
    resetGame();
  </script>
</body>
</html>`;
}
