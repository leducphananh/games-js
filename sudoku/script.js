// Sudoku game (generator + solver) with notes, hints, timer.
// No external libraries.

const $ = (sel) => document.querySelector(sel);

const boardEl = $('#board');
const msgEl = $('#message');
const timerEl = $('#timer');
const difficultyEl = $('#difficulty');
const difficultyLabelEl = $('#difficultyLabel');

const newGameBtn = $('#newGameBtn');
const resetBtn = $('#resetBtn');
const checkBtn = $('#checkBtn');
const hintBtn = $('#hintBtn');
const solveBtn = $('#solveBtn');
const notesToggleBtn = $('#notesToggle');
const eraseBtn = $('#eraseBtn');
const digitsEl = $('#digits');

// ---------- State ----------
const state = {
  puzzle: null, // 9x9, 0 for empty
  solution: null, // 9x9 full
  startPuzzle: null,
  given: null, // boolean 9x9
  selected: { r: null, c: null },
  notesMode: false,
  notes: make9x9(() => new Set()), // per cell set of 1..9
  startedAt: null,
  timerId: null,
  locked: false,
};

// ---------- Utilities ----------
function make9x9(factory) {
  const g = new Array(9);
  for (let r = 0; r < 9; r++) {
    g[r] = new Array(9);
    for (let c = 0; c < 9; c++) {
      g[r][c] = factory(r, c);
    }
  }
  return g;
}
function cloneGrid(grid) {
  return grid.map((row) => row.slice());
}
function inRange9(n) {
  return n >= 0 && n < 9;
}

function formatTime(ms) {
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

function setMessage(text, kind = '') {
  msgEl.textContent = text || '';
  msgEl.style.color =
    kind === 'good'
      ? 'rgba(61,220,151,.95)'
      : kind === 'bad'
        ? 'rgba(255,92,122,.95)'
        : 'rgba(169,179,217,.95)';
}

function difficultyToClues(diff) {
  // Typical ranges: easy 36-45, medium 32-35, hard 26-31.
  if (diff === 'easy') return randInt(38, 45);
  if (diff === 'hard') return randInt(26, 31);
  return randInt(32, 36); // medium
}

function randInt(min, maxInclusive) {
  return min + Math.floor(Math.random() * (maxInclusive - min + 1));
}
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ---------- Sudoku rules ----------
function isValid(grid, r, c, val) {
  // row/col
  for (let k = 0; k < 9; k++) {
    if (k !== c && grid[r][k] === val) return false;
    if (k !== r && grid[k][c] === val) return false;
  }
  // box
  const br = Math.floor(r / 3) * 3;
  const bc = Math.floor(c / 3) * 3;
  for (let rr = br; rr < br + 3; rr++) {
    for (let cc = bc; cc < bc + 3; cc++) {
      if ((rr !== r || cc !== c) && grid[rr][cc] === val) return false;
    }
  }
  return true;
}

function findEmpty(grid) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) return { r, c };
    }
  }
  return null;
}

function candidates(grid, r, c) {
  if (grid[r][c] !== 0) return [];
  const possible = [];
  for (let v = 1; v <= 9; v++) {
    if (isValid(grid, r, c, v)) possible.push(v);
  }
  return possible;
}

// Backtracking solver; optionally randomizes candidate order for generation.
function solve(
  grid,
  { randomize = false, countSolutions = false, maxSolutions = 2 } = {},
) {
  const g = cloneGrid(grid);
  let solutions = 0;
  let solvedGrid = null;

  function helper() {
    const pos = findEmpty(g);
    if (!pos) {
      solutions++;
      if (!solvedGrid) solvedGrid = cloneGrid(g);
      return solutions >= maxSolutions; // stop early
    }
    const { r, c } = pos;
    let cand = candidates(g, r, c);
    if (cand.length === 0) return false;
    if (randomize) cand = shuffle(cand);

    // Heuristic: try smaller domain first could help, but we keep simple here.
    for (const v of cand) {
      g[r][c] = v;
      if (helper()) return true;
      g[r][c] = 0;
    }
    return false;
  }

  helper();

  if (countSolutions) {
    return { solutions, grid: solvedGrid };
  }
  return solvedGrid;
}

// Generate a full valid solution grid
function generateSolution() {
  const empty = make9x9(() => 0);
  const solved = solve(empty, { randomize: true });
  return solved;
}

// Create a puzzle by removing numbers while keeping unique solution.
function generatePuzzleFromSolution(solution, cluesTarget) {
  const puzzle = cloneGrid(solution);

  // Create list of all cell positions to attempt removal.
  const cells = [];
  for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) cells.push({ r, c });
  shuffle(cells);

  let filled = 81;

  for (const { r, c } of cells) {
    if (filled <= cluesTarget) break;

    const backup = puzzle[r][c];
    puzzle[r][c] = 0;

    // Ensure still uniquely solvable
    const { solutions } = solve(puzzle, {
      countSolutions: true,
      maxSolutions: 2,
    });
    if (solutions !== 1) {
      puzzle[r][c] = backup; // revert
    } else {
      filled--;
    }
  }
  return puzzle;
}

function buildGivenMask(puzzle) {
  return make9x9((r, c) => puzzle[r][c] !== 0);
}

// ---------- Rendering ----------
function cellId(r, c) {
  return `cell-${r}-${c}`;
}

function renderDigits() {
  digitsEl.innerHTML = '';
  for (let v = 1; v <= 9; v++) {
    const b = document.createElement('button');
    b.className = 'digit';
    b.textContent = String(v);
    b.addEventListener('click', () => inputDigit(v));
    digitsEl.appendChild(b);
  }
  // add a 0/erase button for convenience on mobile
  const e = document.createElement('button');
  e.className = 'digit';
  e.textContent = '⌫';
  e.title = 'Erase';
  e.addEventListener('click', eraseSelected);
  digitsEl.appendChild(e);
}

function renderBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = cellId(r, c);
      cell.setAttribute('role', 'gridcell');
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      cell.tabIndex = -1;

      const v = state.puzzle[r][c];
      if (state.given[r][c]) cell.classList.add('given');

      const value = document.createElement('div');
      value.className = 'value';
      value.textContent = v === 0 ? '' : String(v);
      cell.appendChild(value);

      const notes = document.createElement('div');
      notes.className = 'notes';
      for (let i = 1; i <= 9; i++) {
        const n = document.createElement('div');
        n.className = 'note';
        n.textContent = state.notes[r][c].has(i) && v === 0 ? String(i) : '';
        notes.appendChild(n);
      }
      cell.appendChild(notes);

      cell.addEventListener('click', () => selectCell(r, c));
      boardEl.appendChild(cell);
    }
  }
  updateHighlights();
}

function updateCell(r, c) {
  const cell = document.getElementById(cellId(r, c));
  if (!cell) return;
  const v = state.puzzle[r][c];
  cell.querySelector('.value').textContent = v === 0 ? '' : String(v);

  // notes
  const notesEl = cell.querySelector('.notes');
  const children = [...notesEl.children];
  for (let i = 1; i <= 9; i++) {
    children[i - 1].textContent =
      v === 0 && state.notes[r][c].has(i) ? String(i) : '';
  }

  // error styling based on current validity
  cell.classList.remove('error');
  if (v !== 0 && !isValid(state.puzzle, r, c, v)) {
    cell.classList.add('error');
  }
}

function updateAllCells() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      updateCell(r, c);
    }
  }
  updateHighlights();
}

function clearHighlights() {
  for (const el of boardEl.querySelectorAll('.cell')) {
    el.classList.remove('selected', 'peer', 'sameNumber', 'correctFlash');
  }
}

function updateHighlights() {
  clearHighlights();
  const { r, c } = state.selected;
  if (r == null || c == null) return;

  const selectedVal = state.puzzle[r][c];
  for (let rr = 0; rr < 9; rr++) {
    for (let cc = 0; cc < 9; cc++) {
      const el = document.getElementById(cellId(rr, cc));
      if (!el) continue;

      // peers: same row/col/box
      const sameRow = rr === r;
      const sameCol = cc === c;
      const sameBox =
        Math.floor(rr / 3) === Math.floor(r / 3) &&
        Math.floor(cc / 3) === Math.floor(c / 3);
      if (sameRow || sameCol || sameBox) el.classList.add('peer');

      if (selectedVal !== 0 && state.puzzle[rr][cc] === selectedVal)
        el.classList.add('sameNumber');
    }
  }
  const selEl = document.getElementById(cellId(r, c));
  selEl?.classList.add('selected');
}

// ---------- Interaction ----------
function selectCell(r, c) {
  if (state.locked) return;
  state.selected = { r, c };
  updateHighlights();
}

function moveSelection(dr, dc) {
  let { r, c } = state.selected;
  if (r == null || c == null) {
    state.selected = { r: 0, c: 0 };
    updateHighlights();
    return;
  }
  const nr = Math.max(0, Math.min(8, r + dr));
  const nc = Math.max(0, Math.min(8, c + dc));
  state.selected = { r: nr, c: nc };
  updateHighlights();
}

function inputDigit(v) {
  if (state.locked) return;
  const { r, c } = state.selected;
  if (r == null || c == null) return;
  if (state.given[r][c]) return;

  if (state.notesMode) {
    // toggle note
    if (state.puzzle[r][c] !== 0) return; // no notes if value placed
    if (state.notes[r][c].has(v)) state.notes[r][c].delete(v);
    else state.notes[r][c].add(v);
    updateCell(r, c);
    return;
  }

  // normal entry
  state.puzzle[r][c] = v;
  state.notes[r][c].clear();
  updateCell(r, c);

  // If correct and completes board, celebrate
  if (state.puzzle[r][c] === state.solution[r][c]) {
    flashCorrect(r, c);
  }

  if (isCompleteAndCorrect()) {
    setMessage(`Solved! Time: ${timerEl.textContent}`, 'good');
    stopTimer();
    state.locked = true;
    lockBoard();
  }
}

function flashCorrect(r, c) {
  const el = document.getElementById(cellId(r, c));
  if (!el) return;
  el.classList.add('correctFlash');
  setTimeout(() => el.classList.remove('correctFlash'), 250);
}

function eraseSelected() {
  if (state.locked) return;
  const { r, c } = state.selected;
  if (r == null || c == null) return;
  if (state.given[r][c]) return;
  state.puzzle[r][c] = 0;
  updateCell(r, c);
}

function toggleNotes() {
  state.notesMode = !state.notesMode;
  notesToggleBtn.textContent = `Notes: ${state.notesMode ? 'On' : 'Off'}`;
  notesToggleBtn.setAttribute(
    'aria-pressed',
    state.notesMode ? 'true' : 'false',
  );
  setMessage(state.notesMode ? 'Notes mode enabled.' : 'Notes mode disabled.');
}

function lockBoard() {
  for (const el of boardEl.querySelectorAll('.cell')) {
    el.classList.add('locked');
  }
}
function unlockBoard() {
  for (const el of boardEl.querySelectorAll('.cell')) {
    el.classList.remove('locked');
  }
}

// ---------- Game logic ----------
function isCompleteAndCorrect() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (state.puzzle[r][c] === 0) return false;
      if (state.puzzle[r][c] !== state.solution[r][c]) return false;
    }
  }
  return true;
}

function checkConflicts() {
  let conflicts = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const v = state.puzzle[r][c];
      const el = document.getElementById(cellId(r, c));
      el?.classList.remove('error');
      if (v !== 0 && !isValid(state.puzzle, r, c, v)) {
        el?.classList.add('error');
        conflicts++;
      }
    }
  }
  if (conflicts === 0) {
    setMessage('No conflicts found.', 'good');
  } else {
    setMessage(`Found ${conflicts} conflicting cell(s).`, 'bad');
  }
}

function hint() {
  if (state.locked) return;
  // Fill one empty cell with the correct solution.
  const empties = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (state.puzzle[r][c] === 0 && !state.given[r][c])
        empties.push({ r, c });
    }
  }
  if (empties.length === 0) {
    setMessage('No empty cells to hint.');
    return;
  }
  const pick = empties[Math.floor(Math.random() * empties.length)];
  state.puzzle[pick.r][pick.c] = state.solution[pick.r][pick.c];
  state.notes[pick.r][pick.c].clear();
  updateCell(pick.r, pick.c);
  flashCorrect(pick.r, pick.c);

  if (isCompleteAndCorrect()) {
    setMessage(`Solved! Time: ${timerEl.textContent}`, 'good');
    stopTimer();
    state.locked = true;
    lockBoard();
  } else {
    setMessage('Hint filled one cell.', 'good');
  }
}

function revealSolution() {
  state.puzzle = cloneGrid(state.solution);
  state.notes = make9x9(() => new Set());
  updateAllCells();
  stopTimer();
  state.locked = true;
  lockBoard();
  setMessage('Solution revealed.', 'bad');
}

function resetToStart() {
  state.puzzle = cloneGrid(state.startPuzzle);
  state.notes = make9x9(() => new Set());
  state.locked = false;
  unlockBoard();
  updateAllCells();
  restartTimer();
  setMessage('Reset to the starting puzzle.');
}

// ---------- Timer ----------
function startTimer() {
  state.startedAt = Date.now();
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    timerEl.textContent = formatTime(Date.now() - state.startedAt);
  }, 250);
}
function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}
function restartTimer() {
  stopTimer();
  timerEl.textContent = '00:00';
  startTimer();
}

// ---------- New game ----------
function newGame() {
  setMessage('Generating puzzle…');
  state.locked = true;
  lockBoard();

  // allow UI to update message
  setTimeout(() => {
    const diff = difficultyEl.value;
    difficultyLabelEl.textContent = `Difficulty: ${diff.charAt(0).toUpperCase() + diff.slice(1)}`;

    const clues = difficultyToClues(diff);
    const sol = generateSolution();
    const puz = generatePuzzleFromSolution(sol, clues);

    state.solution = sol;
    state.puzzle = cloneGrid(puz);
    state.startPuzzle = cloneGrid(puz);
    state.given = buildGivenMask(puz);
    state.notes = make9x9(() => new Set());
    state.selected = { r: 0, c: 0 };
    state.locked = false;

    unlockBoard();
    renderBoard();
    restartTimer();
    setMessage('Good luck!');
  }, 30);
}

// ---------- Events ----------
function onKeyDown(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    moveSelection(-1, 0);
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    moveSelection(1, 0);
    return;
  }
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    moveSelection(0, -1);
    return;
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    moveSelection(0, 1);
    return;
  }

  if (e.key === 'Escape') {
    state.selected = { r: null, c: null };
    updateHighlights();
    return;
  }

  if (e.key === 'n' || e.key === 'N') {
    toggleNotes();
    return;
  }

  if (e.key === 'Backspace' || e.key === 'Delete') {
    e.preventDefault();
    eraseSelected();
    return;
  }

  // digits
  if (/^[1-9]$/.test(e.key)) {
    inputDigit(Number(e.key));
    return;
  }
  if (e.key === '0') {
    eraseSelected();
  }
}

newGameBtn.addEventListener('click', newGame);
resetBtn.addEventListener('click', resetToStart);
checkBtn.addEventListener('click', checkConflicts);
hintBtn.addEventListener('click', hint);
solveBtn.addEventListener('click', revealSolution);
notesToggleBtn.addEventListener('click', toggleNotes);
eraseBtn.addEventListener('click', eraseSelected);
window.addEventListener('keydown', onKeyDown);

// init
renderDigits();
newGame();
