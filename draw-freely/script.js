document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("drawingCanvas");
  const ctx = canvas.getContext("2d");
  const colorPicker = document.getElementById("colorPicker");
  const lineWidth = document.getElementById("lineWidth");
  const widthValue = document.getElementById("widthValue");
  const thicknessPreview = document.getElementById("thicknessPreview");

  // Thiết lập kích thước canvas phù hợp với màn hình
  function resizeCanvas() {
    const container = document.querySelector(".canvas-container");
    const containerWidth = container.clientWidth;

    // Giới hạn chiều rộng tối đa
    const maxWidth = Math.min(containerWidth - 10, 800);

    // Tính chiều cao tương ứng để giữ tỷ lệ
    const aspectRatio = 800 / 500;
    const height = maxWidth / aspectRatio;

    // Thiết lập kích thước hiển thị của canvas
    canvas.style.width = maxWidth + "px";
    canvas.style.height = height + "px";
  }

  // Gọi hàm điều chỉnh kích thước ngay khi tải trang
  resizeCanvas();

  // Theo dõi thay đổi kích thước màn hình
  window.addEventListener("resize", resizeCanvas);

  // Các nút công cụ
  const toolButtons = document.querySelectorAll(".tool-btn");
  const pencilBtn = document.getElementById("pencilBtn");
  const lineBtn = document.getElementById("lineBtn");
  const rectBtn = document.getElementById("rectBtn");
  const circleBtn = document.getElementById("circleBtn");
  const triangleBtn = document.getElementById("triangleBtn");
  const starBtn = document.getElementById("starBtn");
  const eraserBtn = document.getElementById("eraserBtn");
  const fillBtn = document.getElementById("fillBtn");

  // Các nút chức năng
  const undoBtn = document.getElementById("undoBtn");
  const redoBtn = document.getElementById("redoBtn");
  const clearBtn = document.getElementById("clearBtn");
  const saveBtn = document.getElementById("saveBtn");

  // Bảng màu
  const colorOptions = document.querySelectorAll(".color-option");

  // Biến trạng thái
  let isDrawing = false;
  let startX, startY;
  let currentTool = "pencil";
  let drawingHistory = [];
  let historyIndex = -1;
  let isFilling = false;
  let snapshot;

  // Khởi tạo canvas với nền trắng
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  saveState();

  // Cập nhật hiển thị độ dày nét vẽ
  lineWidth.addEventListener("input", function () {
    widthValue.textContent = this.value;
    thicknessPreview.style.width = this.value + "px";
    thicknessPreview.style.height = this.value + "px";
    thicknessPreview.style.backgroundColor = colorPicker.value;

    // Cập nhật con trỏ nếu đang dùng tẩy
    if (currentTool === "eraser") {
      updateCursor();
    }
  });

  // Xóa canvas
  clearBtn.addEventListener("click", function () {
    if (confirm("Bạn có chắc muốn xóa toàn bộ hình vẽ không?")) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      saveState();
    }
  });

  // Lưu hình vẽ
  saveBtn.addEventListener("click", function () {
    const link = document.createElement("a");
    link.download =
      "be-ve-tranh-" + new Date().toISOString().slice(0, 10) + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Hoàn tác
  undoBtn.addEventListener("click", undo);

  // Làm lại
  redoBtn.addEventListener("click", redo);

  // Hàm thay đổi con trỏ chuột dựa trên công cụ đang chọn
  function updateCursor() {
    // Đặt lại con trỏ mặc định
    canvas.style.cursor = "default";

    switch (currentTool) {
      case "pencil":
        canvas.style.cursor =
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z"/></svg>\') 0 24, auto';
        break;
      case "line":
        canvas.style.cursor = "crosshair";
        break;
      case "rect":
      case "circle":
      case "triangle":
      case "star":
        canvas.style.cursor = "crosshair";
        break;
      case "eraser":
        // Tạo con trỏ tẩy có kích thước dựa vào độ rộng đường
        const eraserSize = Math.max(10, lineWidth.value);
        canvas.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${eraserSize}" height="${eraserSize}" viewBox="0 0 ${eraserSize} ${eraserSize}"><circle cx="${
          eraserSize / 2
        }" cy="${eraserSize / 2}" r="${
          eraserSize / 2 - 1
        }" stroke="black" stroke-width="1" fill="white" /></svg>') ${
          eraserSize / 2
        } ${eraserSize / 2}, auto`;
        break;
      case "fill":
        canvas.style.cursor =
          'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M21.143 9.667c-.733-1.392-1.914-3.05-3.617-4.753-2.977-2.978-5.478-3.914-6.785-3.914-.414 0-.708.094-.86.246l-1.361 1.36c-1.899-.236-3.42.106-4.294.983-.876.875-1.164 2.159-.792 3.523.492 1.806 2.305 4.049 5.905 5.375.038.323.157.638.405.885.588.588 1.535.586 2.121 0s.588-1.533.002-2.119c-.588-.587-1.537-.588-2.123-.001l-.17.256c-2.031-.765-3.395-1.828-4.232-2.9l3.879-3.875c.496 2.73 6.432 8.676 9.178 9.178l-7.115 7.107c-.234.153-2.798-.316-6.156-3.675-3.393-3.393-3.175-5.271-3.027-5.498l1.859-1.856c-.439-.359-.925-1.103-1.141-1.689l-2.134 2.131c-.445.446-.685 1.064-.685 1.82 0 1.634 1.121 3.915 3.713 6.506 2.764 2.764 5.58 4.243 7.432 4.243.648 0 1.18-.195 1.547-.562l8.086-8.078c.91.108-.869-3.325-4.835-7.133" fill="black" /></svg>\') 0 24, auto';
        break;
      default:
        canvas.style.cursor = "default";
    }
  }

  // Chọn công cụ
  toolButtons.forEach((button) => {
    button.addEventListener("click", function () {
      toolButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentTool = this.id.replace("Btn", "");
      isFilling = currentTool === "fill";

      // Cập nhật con trỏ
      updateCursor();
    });
  });

  // Chọn màu từ bảng màu
  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      colorOptions.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      const color = this.getAttribute("data-color");
      colorPicker.value = color;
      thicknessPreview.style.backgroundColor = color;
    });
  });

  // Cập nhật màu khi nhập trực tiếp
  colorPicker.addEventListener("input", function () {
    thicknessPreview.style.backgroundColor = this.value;
    // Bỏ chọn các màu trong bảng màu
    colorOptions.forEach((opt) => opt.classList.remove("selected"));
  });

  // Khởi tạo con trỏ
  updateCursor();

  // Xử lý sự kiện vẽ cho cả mouse và touch
  function handlePointerStart(e) {
    e.preventDefault();

    // Lấy tọa độ dựa vào loại sự kiện
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    isDrawing = true;
    [startX, startY] = getCanvasCoordinates(clientX, clientY);

    if (currentTool === "fill") {
      floodFill(startX, startY, hexToRgb(colorPicker.value));
      saveState();
      isDrawing = false;
      return;
    }

    // Tạo snapshot khi bắt đầu vẽ hình
    if (currentTool !== "pencil" && currentTool !== "eraser") {
      ctx.beginPath();
      snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  function handlePointerMove(e) {
    if (!isDrawing) return;
    e.preventDefault();

    // Lấy tọa độ dựa vào loại sự kiện
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const [x, y] = getCanvasCoordinates(clientX, clientY);

    if (currentTool === "pencil" || currentTool === "eraser") {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = currentTool === "eraser" ? "white" : colorPicker.value;
      ctx.lineWidth = lineWidth.value;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      [startX, startY] = [x, y];
    } else {
      // Vẽ hình tạm thời
      ctx.putImageData(snapshot, 0, 0);
      drawShape(startX, startY, x, y);
    }
  }

  function handlePointerEnd() {
    if (!isDrawing) return;
    isDrawing = false;

    if (currentTool !== "pencil" && currentTool !== "eraser") {
      saveState();
    } else {
      saveState();
    }
  }

  // Chuyển đổi từ tọa độ client sang tọa độ canvas thực tế
  function getCanvasCoordinates(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return [(clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY];
  }

  // Xử lý sự kiện cho chuột
  canvas.addEventListener("mousedown", handlePointerStart);
  canvas.addEventListener("mousemove", handlePointerMove);
  canvas.addEventListener("mouseup", handlePointerEnd);
  canvas.addEventListener("mouseout", handlePointerEnd);

  // Xử lý sự kiện cho màn hình cảm ứng
  canvas.addEventListener("touchstart", handlePointerStart);
  canvas.addEventListener("touchmove", handlePointerMove);
  canvas.addEventListener("touchend", handlePointerEnd);
  canvas.addEventListener("touchcancel", handlePointerEnd);

  function drawShape(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.strokeStyle = colorPicker.value;
    ctx.fillStyle = isFilling ? colorPicker.value : "transparent";
    ctx.lineWidth = lineWidth.value;

    switch (currentTool) {
      case "line":
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        break;

      case "rect":
        const rectWidth = x2 - x1;
        const rectHeight = y2 - y1;
        ctx.rect(x1, y1, rectWidth, rectHeight);
        if (isFilling) ctx.fill();
        ctx.stroke();
        break;

      case "circle":
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        ctx.arc(x1, y1, radius, 0, Math.PI * 2);
        if (isFilling) ctx.fill();
        ctx.stroke();
        break;

      case "triangle":
        ctx.moveTo(x1, y2);
        ctx.lineTo((x1 + x2) / 2, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        if (isFilling) ctx.fill();
        ctx.stroke();
        break;

      case "star":
        const centerX = (x1 + x2) / 2;
        const centerY = (y1 + y2) / 2;
        const outerRadius =
          Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
        drawStar(ctx, centerX, centerY, 5, outerRadius, outerRadius / 2);
        if (isFilling) ctx.fill();
        ctx.stroke();
        break;
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  function floodFill(startX, startY, fillColor) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(startX, startY, data);

    // Nếu màu đích giống màu fill thì không làm gì
    if (colorsMatch(targetColor, fillColor)) return;

    const pixelsToCheck = [{ x: Math.round(startX), y: Math.round(startY) }];
    const width = canvas.width;
    const height = canvas.height;

    // Tăng hiệu suất bằng cách sử dụng stack thay vì đệ quy
    while (pixelsToCheck.length > 0) {
      const pixel = pixelsToCheck.pop();
      const x = pixel.x;
      const y = pixel.y;

      if (x < 0 || x >= width || y < 0 || y >= height) continue;

      const currentColor = getPixelColor(x, y, data);

      // Chỉ tô cho các pixel có cùng màu với điểm bắt đầu
      if (!colorsMatch(currentColor, targetColor)) continue;

      setPixelColor(x, y, fillColor, data);

      // Thêm các pixel lân cận vào danh sách kiểm tra
      pixelsToCheck.push({ x: x + 1, y: y });
      pixelsToCheck.push({ x: x - 1, y: y });
      pixelsToCheck.push({ x: x, y: y + 1 });
      pixelsToCheck.push({ x: x, y: y - 1 });
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function getPixelColor(x, y, data) {
    const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
    return {
      r: data[pixelIndex],
      g: data[pixelIndex + 1],
      b: data[pixelIndex + 2],
      a: data[pixelIndex + 3],
    };
  }

  function setPixelColor(x, y, color, data) {
    const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
    data[pixelIndex] = color.r;
    data[pixelIndex + 1] = color.g;
    data[pixelIndex + 2] = color.b;
    data[pixelIndex + 3] = color.a || 255;
  }

  function colorsMatch(color1, color2) {
    // Thêm ngưỡng dung sai để tô màu tốt hơn khi có các màu tương tự
    const tolerance = 5;
    return (
      Math.abs(color1.r - color2.r) <= tolerance &&
      Math.abs(color1.g - color2.g) <= tolerance &&
      Math.abs(color1.b - color2.b) <= tolerance &&
      (color1.a === undefined ||
        color2.a === undefined ||
        Math.abs(color1.a - color2.a) <= tolerance)
    );
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  }

  function saveState() {
    // Xóa các trạng thái sau historyIndex nếu có
    if (historyIndex < drawingHistory.length - 1) {
      drawingHistory = drawingHistory.slice(0, historyIndex + 1);
    }

    // Lưu trạng thái hiện tại
    drawingHistory.push(canvas.toDataURL());
    historyIndex++;

    // Giới hạn lịch sử để tránh dùng quá nhiều bộ nhớ
    if (drawingHistory.length > 20) {
      drawingHistory.shift();
      historyIndex--;
    }

    updateUndoRedoButtons();
  }

  function undo() {
    if (historyIndex <= 0) return;
    historyIndex--;
    redrawCanvas();
    updateUndoRedoButtons();
  }

  function redo() {
    if (historyIndex >= drawingHistory.length - 1) return;
    historyIndex++;
    redrawCanvas();
    updateUndoRedoButtons();
  }

  function redrawCanvas() {
    const img = new Image();
    img.onload = function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = drawingHistory[historyIndex];
  }

  function updateUndoRedoButtons() {
    undoBtn.disabled = historyIndex <= 0;
    redoBtn.disabled = historyIndex >= drawingHistory.length - 1;
  }
});
