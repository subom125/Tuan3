$(function () {
  "use strict";
  const c = document.getElementById("game"),
    ctx = c.getContext("2d"),
    W = c.width,
    H = c.height;
  const birdImg = new Image(),
    pipeImg = new Image();
  birdImg.src = "assets/bird.svg";
  pipeImg.src = "assets/pipe.svg";
  let timer = null,
    active = false,
    paused = false,
    score = 0,
    level = 1,
    birdY = 250,
    vy = 0,
    pipes = [],
    tickCount = 0,
    passed = new Set();
  const bird = { x: 84, w: 43, h: 34 };
  const intervals = { 1: 40, 2: 30, 3: 25, 4: 20 };
  const GROUND = H - 44;
  function levelFor(s) {
    return s >= 40 ? 4 : s >= 20 ? 3 : s >= 5 ? 2 : 1;
  }
  function gap() {
    return $("#easy").prop("checked") ? 205 : 175;
  }
  function newPipe(x) {
    let g = gap(),
      top = 80 + Math.random() * (GROUND - g - 160);
    return { x, top, gap: g, id: tickCount++ };
  }
  function reset() {
    clearInterval(timer);
    timer = null;
    active = false;
    paused = false;
    score = 0;
    level = 1;
    birdY = 250;
    vy = 0;
    pipes = [newPipe(390), newPipe(635)];
    passed.clear();
    paint();
  }
  function start() {
    reset();
    active = true;
    $("#game-overlay").hide();
    run();
  }
  function run() {
    clearInterval(timer);
    timer = setInterval(step, intervals[level]);
  }
  function end(won) {
    active = false;
    clearInterval(timer);
    timer = null;
    $("#overlay-title").text(won ? "🏆 CHIẾN THẮNG!" : "💥 GAME OVER");
    $("#overlay-text").text(
      won
        ? "Bạn đã đạt 50 điểm, hoàn thành Level 4!"
        : "Bạn đạt " + score + " điểm. Nhấn chơi lại để thử tiếp.",
    );
    $("#start").text("Chơi lại").show();
    $("#game-overlay").css("display", "flex");
  }
  function flap() {
    if (active && !paused) vy = -5.7;
  }
  function step() {
    if (!active || paused) return;
    const dt = intervals[level] / 16.667;
    vy += 0.24 * dt;
    vy = Math.min(vy, 6.5);
    birdY += vy * dt;
    const speed =
      (level === 1 ? 2.2 : level === 2 ? 2.35 : level === 3 ? 2.5 : 2.65) * dt;
    for (const p of pipes) {
      p.x -= speed;
      if (!passed.has(p.id) && p.x + 64 < bird.x) {
        passed.add(p.id);
        score++;
        if (score >= 50) {
          paint();
          return end(true);
        }
        const next = levelFor(score);
        if (next !== level) {
          level = next;
          run();
        }
      }
      const pad = 8;
      const hitX = bird.x + bird.w - pad > p.x && bird.x + pad < p.x + 64;
      const hitY = birdY + pad < p.top || birdY + bird.h - pad > p.top + p.gap;
      if (hitX && hitY) {
        paint();
        return end(false);
      }
    }
    pipes = pipes.filter((p) => p.x > -70);
    if (pipes[pipes.length - 1].x < 155) pipes.push(newPipe(W + 40));
    if (birdY < 0 || birdY + bird.h > GROUND) {
      paint();
      return end(false);
    }
    paint();
  }
  function rect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
  }
  function paint() {
    ctx.clearRect(0, 0, W, H);
    let grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#8ad7ff");
    grad.addColorStop(1, "#d1fbff");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#fff9";
    for (const [x, y] of [
      [48, 90],
      [250, 155],
      [335, 70],
    ]) {
      ctx.beginPath();
      ctx.ellipse(x, y, 42, 13, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const p of pipes) {
      ctx.save();
      ctx.translate(p.x, p.top);
      ctx.scale(1, -1);
      if (pipeImg.complete && pipeImg.naturalWidth)
        ctx.drawImage(pipeImg, 0, 0, 64, p.top);
      else rect(0, -p.top, 64, p.top, "#35b483");
      ctx.restore();
      if (pipeImg.complete && pipeImg.naturalWidth)
        ctx.drawImage(
          pipeImg,
          p.x,
          p.top + p.gap,
          64,
          GROUND - (p.top + p.gap),
        );
      else rect(p.x, p.top + p.gap, 64, GROUND - (p.top + p.gap), "#35b483");
    }
    ctx.save();
    ctx.translate(bird.x + bird.w / 2, birdY + bird.h / 2);
    ctx.rotate(Math.max(-0.35, Math.min(0.65, vy * 0.05)));
    if (birdImg.complete && birdImg.naturalWidth)
      ctx.drawImage(birdImg, -bird.w / 2, -bird.h / 2, bird.w, bird.h);
    else {
      ctx.fillStyle = "#fbc94e";
      ctx.beginPath();
      ctx.arc(0, 0, 19, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    rect(0, GROUND, W, H - GROUND, "#6ccca0");
    rect(0, GROUND, W, 8, "#2b9b73");
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "left";
    ctx.fillStyle = "#113a61";
    ctx.fillText("Level: " + level, 14, 33);
    ctx.textAlign = "right";
    ctx.fillText("Điểm: " + score, W - 14, 33);
    ctx.font = "13px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Interval: " + intervals[level] + " ms", 14, 53);
  }
  $("#start").on("click", start);
  $("#restart").on("click", start);
  $("#pause").on("click", function () {
    if (!active) return;
    paused = !paused;
    $("#overlay-title").text("Tạm dừng");
    $("#overlay-text").text("Nhấn nút Tạm dừng / Tiếp tục để quay lại");
    $("#start").hide();
    $("#game-overlay").css("display", paused ? "flex" : "none");
  });
  $(document).on("keydown", function (e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      flap();
    }
  });
  birdImg.onload = paint;
  pipeImg.onload = paint;
  reset();
});
