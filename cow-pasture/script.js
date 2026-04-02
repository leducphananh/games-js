const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const stats = document.getElementById('stats');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
const uploadInput = document.getElementById('upload-input');
const uploadBtn = document.getElementById('upload-btn');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const DEFAULT_COW_IMAGE_URL =
  'https://png.pngtree.com/png-clipart/20220802/ourmid/pngtree-cartoon-cow-png-image_6095580.png';
let currentImage = new Image();
currentImage.src = DEFAULT_COW_IMAGE_URL;

let cows = [];
let lastTime = performance.now();
let frameCount = 0;
let fps = 0;
const TARGET_FPS = 30;
const MIN_FPS = 25;
let cowIncreaseCounter = 0;

uploadInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentImage.src = event.target.result;
      uploadBtn.textContent = 'Đã Tải Ảnh';
    };
    reader.readAsDataURL(file);
  }
});

currentImage.onload = () => {
  document.querySelectorAll('.cow-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const initialCows = parseInt(btn.dataset.cows);
      startScreen.style.display = 'none';
      gameContainer.style.display = 'block';
      startSimulation(initialCows);
    });
  });
};
currentImage.onerror = () => {
  alert('Không thể tải ảnh mặc định. Vui lòng kiểm tra kết nối.');
};

class Cow {
  constructor() {
    this.x = Math.random() * (WIDTH - 64);
    this.y = Math.random() * (HEIGHT - 64);
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
    this.size = 64;
    this.changeDirectionTimer = 0;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > WIDTH - this.size) {
      this.speedX *= -1;
      this.randomizeSpeed();
    }
    if (this.y < 0 || this.y > HEIGHT - this.size) {
      this.speedY *= -1;
      this.randomizeSpeed();
    }

    this.changeDirectionTimer++;
    if (this.changeDirectionTimer > 60) {
      this.randomizeSpeed();
      this.changeDirectionTimer = 0;
    }
  }

  randomizeSpeed() {
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = (Math.random() - 0.5) * 4;
  }

  draw() {
    ctx.drawImage(currentImage, this.x, this.y, this.size, this.size);
  }
}

function addCow() {
  cows.push(new Cow());
}

function removeCow() {
  if (cows.length > 0) cows.pop();
}

function calculateFPS(currentTime) {
  frameCount++;
  const deltaTime = currentTime - lastTime;
  if (deltaTime >= 1000) {
    fps = Math.round((frameCount * 1000) / deltaTime);
    frameCount = 0;
    lastTime = currentTime;

    if (fps > TARGET_FPS) {
      cowIncreaseCounter++;
      if (cowIncreaseCounter >= 5) {
        for (let i = 0; i < 5; i++) addCow();
        cowIncreaseCounter = 0;
      } else {
        addCow();
      }
    } else if (fps < MIN_FPS && cows.length > 1) {
      removeCow();
      cowIncreaseCounter = 0;
    }
  }
}

function update(time) {
  calculateFPS(time);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  cows.forEach((cow) => {
    cow.move();
    cow.draw();
  });

  stats.textContent = `Số lượng: ${cows.length} | FPS: ${fps}`;
  requestAnimationFrame(update);
}

function startSimulation(initialCows) {
  cows = [];
  for (let i = 0; i < initialCows; i++) {
    addCow();
  }
  requestAnimationFrame(update);
}
