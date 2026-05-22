/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
let MEMBERS = [],
  CONFIG = {};

async function loadData() {
  try {
    const r = await fetch('family-data.json');
    const d = await r.json();
    CONFIG = d.config || {};
    MEMBERS = d.members || [];
  } catch (e) {
    CONFIG = {
      title: 'Gia Phả Họ Nguyễn',
      subtitle: 'Lưu truyền từ đời đầu tiên',
    };
    MEMBERS = [];
  }
  applyConfig();
  init();
}

function applyConfig() {
  if (CONFIG.title) {
    const p = CONFIG.title.split(' ');
    document.getElementById('site-title').innerHTML =
      `${p.slice(0, -2).join(' ')} <span id="family-name">${p.slice(-2).join(' ')}</span>`;
  }
  if (CONFIG.subtitle)
    document.getElementById('site-subtitle').textContent = CONFIG.subtitle;
}

/* ══════════════════════════════════════════
   HELPERS
══════════════════════════════════════════ */
const byId = (id) => MEMBERS.find((m) => m.id === id);
const kids = (pid) => MEMBERS.filter((m) => m.parentId === pid);
const spouse = (m) => (m.spouseId ? byId(m.spouseId) : null);
const gicon = (m) => (m.gender === 'female' ? '👩' : '👨');
const dead = (m) => !!m.deathYear;
const lifespan = (m) => `${m.birthYear || '?'} – ${m.deathYear || 'nay'}`;
const ageStr = (m) =>
  m.birthYear
    ? `(${(m.deathYear || new Date().getFullYear()) - m.birthYear} tuổi)`
    : '';

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
function init() {
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      const v = tab.dataset.view;
      document
        .querySelectorAll('.nav-tab')
        .forEach((t) => t.classList.remove('active'));
      document
        .querySelectorAll('.view-panel')
        .forEach((p) => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('view-' + v).classList.add('active');
      if (v === 'tree') ensureTree();
      if (v === 'mindmap') ensureMindmap();
    });
  });
  buildList();
  setupModal();
  setupScrollTop();
  setupTheme();
}

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
function setupTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('t-icon');
  const lbl = document.getElementById('t-lbl');

  const saved = localStorage.getItem('gp-theme') || 'light';
  html.setAttribute('data-theme', saved);
  refreshThemeUI(saved);

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('gp-theme', next);
    refreshThemeUI(next);
    // Re-draw tree with new colours
    if (document.getElementById('view-tree').classList.contains('active')) {
      document.getElementById('tree-svg').innerHTML = '';
      drawTree();
    }
  });

  function refreshThemeUI(t) {
    icon.textContent = t === 'dark' ? '☀️' : '🌙';
    lbl.textContent = t === 'dark' ? 'Sáng' : 'Tối';
  }
}

/* ══════════════════════════════════════════
   LIST VIEW
══════════════════════════════════════════ */
function buildList() {
  const gf = document.getElementById('filter-gen');
  [...new Set(MEMBERS.map((m) => m.generation))]
    .sort((a, b) => a - b)
    .forEach((g) => {
      const o = document.createElement('option');
      o.value = g;
      o.textContent = `Đời thứ ${g}`;
      gf.appendChild(o);
    });
  renderList();
  ['search-input', 'filter-gen', 'filter-gender'].forEach((id) =>
    document
      .getElementById(id)
      .addEventListener(id === 'search-input' ? 'input' : 'change', renderList),
  );
}

function renderList() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const gF = document.getElementById('filter-gen').value;
  const gn = document.getElementById('filter-gender').value;
  const f = MEMBERS.filter(
    (m) =>
      (!q ||
        [m.name, m.role, m.hometown, m.description]
          .join(' ')
          .toLowerCase()
          .includes(q)) &&
      (!gF || String(m.generation) === gF) &&
      (!gn || m.gender === gn),
  );
  document.getElementById('stat-badge').textContent = `${f.length} thành viên`;
  const c = document.getElementById('list-container');
  c.innerHTML = '';
  if (!f.length) {
    c.innerHTML =
      '<p style="text-align:center;padding:2rem;color:var(--gold-dark);font-style:italic">Không tìm thấy thành viên phù hợp.</p>';
    return;
  }
  const grp = {};
  f.forEach((m) => (grp[m.generation] = grp[m.generation] || []).push(m));
  Object.keys(grp)
    .sort((a, b) => a - b)
    .forEach((g) => {
      const b = document.createElement('div');
      b.className = 'gen-block';
      b.innerHTML = `<div class="gen-title"><div class="gen-badge">Đời thứ ${g}</div><div class="gen-line"></div><span style="font-size:.73rem;color:var(--gold-dark);font-style:italic">${grp[g].length} người</span></div><div class="mem-grid" id="mg-${g}"></div>`;
      c.appendChild(b);
      const grid = b.querySelector(`#mg-${g}`);
      grp[g].forEach((m) => grid.appendChild(makeCard(m)));
    });
}

function makeCard(m) {
  const el = document.createElement('div');
  el.className = `mem-card ${m.gender}${dead(m) ? ' deceased' : ''}`;
  const sp = spouse(m),
    ch = kids(m.id);
  el.innerHTML = `
  <div class="c-header">
    <div class="c-avatar ${m.gender}">${gicon(m)}</div>
    <div><div class="c-name">${m.name}</div><div class="c-role">${m.role || ''}</div></div>
  </div>
  <div class="c-years">
    <span class="ytag">🎂 ${m.birthYear || '?'}</span>
    ${m.deathYear ? `<span class="ytag" style="opacity:.68">✦ ${m.deathYear}</span>` : ''}
    ${sp ? `<span class="ytag">💑 ${sp.name}</span>` : ''}
    ${ch.length ? `<span class="ytag">👶 ${ch.length} con</span>` : ''}
  </div>
  ${m.description ? `<div class="c-desc">${m.description}</div>` : ''}
  <div class="c-footer"><span class="c-town">📍 ${m.hometown || '—'}</span><div class="gdot ${m.gender}"></div></div>`;
  el.addEventListener('click', () => openModal(m));
  return el;
}

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
function setupModal() {
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-ov').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
function openModal(m) {
  const sp = spouse(m),
    ch = kids(m.id),
    par = m.parentId ? byId(m.parentId) : null;
  const rows = [
    ['Vai trò', m.role],
    ['Giới tính', m.gender === 'male' ? '👨 Nam' : '👩 Nữ'],
    ['Năm sinh', m.birthYear || '—'],
    ['Năm mất', m.deathYear || 'Còn sống'],
    ['Tuổi thọ', ageStr(m) || '—'],
    ['Thế hệ', `Đời thứ ${m.generation}`],
    ['Quê quán', m.hometown || '—'],
    ['Phối ngẫu', sp ? sp.name : '—'],
    ['Thân phụ/mẫu', par ? par.name : '—'],
    ['Con cái', ch.length ? ch.map((c) => c.name).join(', ') : '—'],
    ['Ghi chú', m.description || '—'],
  ];
  document.getElementById('modal-body').innerHTML = `
  <div class="modal-hdr">
    <div class="m-av ${m.gender}">${gicon(m)}</div>
    <div><div class="m-name">${m.name}</div><div class="m-role">${m.role || ''} · ${lifespan(m)}</div></div>
  </div>
  ${rows
    .filter((r) => r[1])
    .map(
      (r) =>
        `<div class="m-row"><span class="m-lbl">${r[0]}</span><span class="m-val">${r[1]}</span></div>`,
    )
    .join('')}`;
  document.getElementById('modal-ov').classList.add('open');
}
function closeModal() {
  document.getElementById('modal-ov').classList.remove('open');
}

/* ══════════════════════════════════════════
   TREE VIEW — interactive SVG collapse/expand
══════════════════════════════════════════ */
let treeInited = false;
const treeCol = new Set(); // collapsed node IDs in tree

function ensureTree() {
  if (!treeInited) {
    treeInited = true;

    document.getElementById('tree-expand').addEventListener('click', () => {
      treeCol.clear();
      drawTree();
    });
    document.getElementById('tree-collapse').addEventListener('click', () => {
      MEMBERS.forEach((m) => {
        if (kids(m.id).length) treeCol.add(m.id);
      });
      // keep roots open
      MEMBERS.filter((m) => !m.parentId && m.gender === 'male').forEach((r) =>
        treeCol.delete(r.id),
      );
      drawTree();
    });

    // Pan
    const wrap = document.getElementById('tree-wrap');
    let drag = false,
      sx,
      sy,
      sl,
      st;
    wrap.addEventListener('mousedown', (e) => {
      // only start drag if NOT clicking toggle/node
      if (e.target.closest('.tree-toggle') || e.target.closest('.tng')) return;
      drag = true;
      sx = e.pageX - wrap.offsetLeft;
      sy = e.pageY - wrap.offsetTop;
      sl = wrap.scrollLeft;
      st = wrap.scrollTop;
      wrap.style.cursor = 'grabbing';
    });
    wrap.addEventListener('mouseleave', () => {
      drag = false;
      wrap.style.cursor = 'grab';
    });
    wrap.addEventListener('mouseup', () => {
      drag = false;
      wrap.style.cursor = 'grab';
    });
    wrap.addEventListener('mousemove', (e) => {
      if (!drag) return;
      e.preventDefault();
      wrap.scrollLeft = sl - (e.pageX - wrap.offsetLeft - sx);
      wrap.scrollTop = st - (e.pageY - wrap.offsetTop - sy);
    });
  }
  drawTree();
}

function drawTree() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const NW = 124,
    NH = 72,
    HG = 22,
    VG = 82,
    CG = 14;
  const GOLD = isDark ? '#D4A843' : '#C9A84C';
  const MF = isDark ? '#162030' : '#E8F2FB';
  const FF = isDark ? '#281420' : '#FBE8F0';
  const MS = isDark ? '#5090C0' : '#5AAAD8';
  const FS = isDark ? '#B85878' : '#D06088';
  const TF = isDark ? '#EEE4D4' : '#1A0F0A';
  const DF = isDark ? '#A07820' : '#8B6914';

  // Nút đóng/mở được sửa để không bị màu đen
  const TBGOPEN = isDark ? '#C9A84C' : '#C9A84C';
  const TCOPEN = isDark ? '#1A0F0A' : '#FFFFFF';
  const TBGCOL = isDark ? '#201808' : '#FFFAF0';
  const TBDCOL = isDark ? '#A07820' : '#C9A84C';
  const TCCOL = isDark ? '#D4A843' : '#8B6914';
  const BGFILL = isDark ? '#1A140E' : '#FFFFFF';

  const roots = MEMBERS.filter(
    (m) => !m.parentId && m.generation === 1 && m.gender === 'male',
  );

  // Sửa lỗi xê dịch: Luôn lấy toàn bộ con để tính toán bố cục cố định
  function mkNode(m) {
    const sp = spouse(m);
    const ch = kids(m.id);
    return {
      m,
      sp,
      ch: ch.map((c) => mkNode(c)),
      allKids: kids(m.id),
      x: 0,
      y: 0,
      w: 0,
    };
  }

  function measure(n) {
    const cw = n.sp ? NW * 2 + CG : NW;
    if (!n.ch.length) {
      n.w = cw;
      return;
    }
    n.ch.forEach((c) => measure(c));
    const tot = n.ch.reduce((s, c) => s + c.w, 0) + HG * (n.ch.length - 1);
    n.w = Math.max(cw, tot);
  }

  function pos(n, x, y) {
    n.y = y;
    const cw = n.sp ? NW * 2 + CG : NW;
    n.x = x + (n.w - cw) / 2;
    if (!n.ch.length) return;
    const tot = n.ch.reduce((s, c) => s + c.w, 0) + HG * (n.ch.length - 1);
    let cx = x + (n.w - tot) / 2;
    n.ch.forEach((c) => {
      pos(c, cx, y + NH + VG);
      cx += c.w + HG;
    });
  }

  // Lọc các node không bị ẩn để vẽ
  function collect(n, a) {
    a.push(n);
    if (!treeCol.has(n.m.id)) {
      n.ch.forEach((c) => collect(c, a));
    }
  }

  const trees = roots.map((r) => mkNode(r));
  trees.forEach((t) => measure(t));
  let tw = 0;
  trees.forEach((t) => {
    pos(t, tw, 42);
    tw += t.w + HG * 4;
  });
  const all = [];
  trees.forEach((t) => collect(t, all));

  // Giữ kích thước SVG cố định để giao diện không bị giật
  let maxFullY = 0;
  function findMaxY(n) {
    if (n.y > maxFullY) maxFullY = n.y;
    n.ch.forEach(findMaxY);
  }
  trees.forEach(findMaxY);

  const maxY = maxFullY + NH + 55;
  const svgW = Math.max(tw + 50, 600);

  const svg = document.getElementById('tree-svg');
  svg.setAttribute('width', svgW);
  svg.setAttribute('height', maxY);
  svg.setAttribute('viewBox', `0 0 ${svgW} ${maxY}`);

  let h = `<rect width="${svgW}" height="${maxY}" fill="${BGFILL}"/>`;

  // Vẽ đường kết nối
  function conns(n) {
    const pcx = n.x + NW / 2 + (n.sp ? (NW + CG) / 2 : 0);
    const pby = n.y + NH;
    const my = n.y + NH + VG / 2;

    // Ngưng vẽ đường kết nối xuống dưới nếu node cha đang bị thu gọn
    if (n.ch.length && !treeCol.has(n.m.id)) {
      h += `<line x1="${pcx}" y1="${pby}" x2="${pcx}" y2="${my}" stroke="${GOLD}" stroke-width="1.5" stroke-opacity=".65"/>`;
      if (n.ch.length > 1) {
        const f0 = n.ch[0],
          fl = n.ch[n.ch.length - 1];
        const fcx = f0.x + NW / 2 + (f0.sp ? (NW + CG) / 2 : 0);
        const lcx = fl.x + NW / 2 + (fl.sp ? (NW + CG) / 2 : 0);
        h += `<line x1="${fcx}" y1="${my}" x2="${lcx}" y2="${my}" stroke="${GOLD}" stroke-width="1.5" stroke-opacity=".45"/>`;
      }
      n.ch.forEach((c) => {
        const ccx = c.x + NW / 2 + (c.sp ? (NW + CG) / 2 : 0);
        h += `<line x1="${ccx}" y1="${my}" x2="${ccx}" y2="${c.y}" stroke="${GOLD}" stroke-width="1.5" stroke-opacity=".65"/>`;
        conns(c);
      });
    }
    if (n.sp) {
      const cy = n.y + NH / 2;
      h += `<line x1="${n.x + NW}" y1="${cy}" x2="${n.x + NW + CG}" y2="${cy}" stroke="${GOLD}" stroke-width="1.5" stroke-dasharray="4,3" stroke-opacity=".5"/>`;
    }
  }
  trees.forEach((t) => conns(t));

  function splitName(name) {
    const w = name.split(' ');
    if (name.length <= 14) return [name];
    const m = Math.ceil(w.length / 2);
    return [w.slice(0, m).join(' '), w.slice(m).join(' ')];
  }

  function drawMem(m, x, y) {
    const male = m.gender === 'male',
      dk = dead(m);
    const fill = male ? MF : FF,
      str = male ? MS : FS,
      op = dk ? 0.6 : 1;
    const icon = male ? '♂' : '♀',
      ln = splitName(m.name);
    h += `
<g class="tng" data-id="${m.id}" style="cursor:pointer;opacity:${op}">
  <rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="6" fill="${fill}" stroke="${str}" stroke-width="1.5"/>
  <text x="${x + NW / 2}" y="${y + 13}" text-anchor="middle" font-size="13" fill="${str}" font-family="serif">${icon}</text>
  ${ln.map((l, i) => `<text x="${x + NW / 2}" y="${y + 26 + i * 13}" text-anchor="middle" font-family="'Playfair Display',serif" font-size="10" fill="${TF}" font-weight="700">${l}</text>`).join('')}
  <text x="${x + NW / 2}" y="${y + NH - 7}" text-anchor="middle" font-size="9" fill="${DF}" font-family="'Crimson Pro',serif">${lifespan(m)}</text>
</g>`;
  }

  // Draw toggle circles
  function drawTog(n) {
    const pcx = n.x + NW / 2 + (n.sp ? (NW + CG) / 2 : 0);
    const pby = n.y + NH;
    if (!n.allKids.length) return;
    const isCol = treeCol.has(n.m.id);
    const lbl = isCol ? `+${n.allKids.length}` : '−';
    const tbg = isCol ? TBGCOL : TBGOPEN;
    const tbd = isCol ? TBDCOL : TBGOPEN;
    const tc = isCol ? TCCOL : TCOPEN;
    const fs = isCol ? 7.5 : 12;
    h += `
<g class="tree-toggle" data-id="${n.m.id}" style="cursor:pointer">
  <circle cx="${pcx}" cy="${pby + 13}" r="12" fill="${tbg}" stroke="${tbd}" stroke-width="1.5"/>
  <text x="${pcx}" y="${pby + 17}" text-anchor="middle" font-size="${fs}" fill="${tc}" font-family="sans-serif" font-weight="800">${lbl}</text>
</g>`;
    if (!isCol) n.ch.forEach((c) => drawTog(c));
  }

  // Render all member nodes
  all.forEach((n) => {
    drawMem(n.m, n.x, n.y);
    if (n.sp) drawMem(n.sp, n.x + NW + CG, n.y);
  });
  // Render toggles on top
  trees.forEach((t) => drawTog(t));

  svg.innerHTML = h;

  // Events — node click
  svg.querySelectorAll('.tng').forEach((g) => {
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      const m = byId(g.dataset.id);
      if (m) openModal(m);
    });
  });

  // Events — toggle click
  svg.querySelectorAll('.tree-toggle').forEach((g) => {
    g.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = g.dataset.id;
      if (treeCol.has(id)) treeCol.delete(id);
      else treeCol.add(id);
      drawTree();
    });
  });
}

/* ══════════════════════════════════════════
   MINDMAP = OUTLINE TREE
══════════════════════════════════════════ */
let mmInited = false;
const mmCol = new Set(); // collapsed IDs in mindmap

function ensureMindmap() {
  if (mmInited) return;
  mmInited = true;

  const sel = document.getElementById('mm-root');
  MEMBERS.filter((m) => !m.parentId && m.gender === 'male').forEach((m) => {
    const o = document.createElement('option');
    o.value = m.id;
    o.textContent = `${m.name} (${m.birthYear || '?'})`;
    sel.appendChild(o);
  });
  if (sel.options.length > 1) sel.selectedIndex = 1;
  sel.addEventListener('change', buildOT);

  document.getElementById('mm-expand').addEventListener('click', () => {
    mmCol.clear();
    buildOT();
  });
  document.getElementById('mm-collapse').addEventListener('click', () => {
    MEMBERS.forEach((m) => {
      if (kids(m.id).length) mmCol.add(m.id);
    });
    buildOT();
  });

  buildOT();
}

function buildOT() {
  const rootId = document.getElementById('mm-root').value;
  const cont = document.getElementById('ot-root');
  cont.innerHTML = '';
  if (!rootId) return;
  const root = byId(rootId);
  if (!root) return;
  cont.appendChild(otNode(root, 0, [], true));
}

function otNode(m, depth, aHasMore, isRoot) {
  const el = document.createElement('div');
  el.className = 'ot-node';

  const ch = kids(m.id);
  const hasK = ch.length > 0;
  const isCol = mmCol.has(m.id);
  const sp = spouse(m);

  /* — ROW — */
  const row = document.createElement('div');
  row.className = 'ot-row';

  /* indent */
  if (depth > 0) {
    const ind = document.createElement('div');
    ind.className = 'ot-indent';
    for (let i = 0; i < depth - 1; i++) {
      const s = document.createElement('div');
      s.className = 'ot-seg' + (aHasMore[i] ? ' vline' : '');
      ind.appendChild(s);
    }
    const bend = document.createElement('div');
    bend.className = 'ot-bend';
    ind.appendChild(bend);
    row.appendChild(ind);
  }

  /* toggle */
  const tog = document.createElement('div');
  if (!hasK) {
    tog.className = 'ot-tog leaf';
    tog.textContent = '·';
  } else if (isCol) {
    tog.className = 'ot-tog collapsed';
    tog.textContent = '+';
  } else {
    tog.className = 'ot-tog';
    tog.textContent = '−';
  }
  if (hasK) {
    tog.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mmCol.has(m.id)) mmCol.delete(m.id);
      else mmCol.add(m.id);
      buildOT();
    });
  }
  row.appendChild(tog);

  /* card */
  const card = document.createElement('div');
  card.className = `ot-card ${m.gender}${dead(m) ? ' deceased' : ''}`;

  const av = document.createElement('div');
  av.className = `ot-av ${m.gender}`;
  av.textContent = gicon(m);
  card.appendChild(av);

  const body = document.createElement('div');
  body.className = 'ot-body';
  body.innerHTML = `<div class="ot-name">${m.name}</div><div class="ot-meta"><span>📅</span><span>${lifespan(m)}</span></div>`;
  card.appendChild(body);

  if (sp) {
    const chip = document.createElement('div');
    chip.className = 'ot-spouse';
    chip.innerHTML = `<div class="ot-sav">${gicon(sp)}</div><span>${sp.name.split(' ').slice(-1)[0]}</span>`;
    chip.title = `${sp.name} · ${lifespan(sp)}`;
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      openModal(sp);
    });
    card.appendChild(chip);
  }

  if (isRoot || depth % 2 === 0) {
    const g2 = document.createElement('div');
    g2.className = 'ot-gen';
    g2.textContent = `Đời ${m.generation}`;
    card.appendChild(g2);
  }

  if (hasK && isCol) {
    const bbl = document.createElement('div');
    bbl.className = 'ot-cnt';
    bbl.textContent = ch.length;
    card.appendChild(bbl);
  }

  card.addEventListener('click', () => openModal(m));
  row.appendChild(card);
  el.appendChild(row);

  /* children */
  if (hasK) {
    const wrap = document.createElement('div');
    wrap.className = 'ot-kids' + (isCol ? ' closed' : '');
    ch.forEach((c, i) =>
      wrap.appendChild(
        otNode(c, depth + 1, [...aHasMore, i < ch.length - 1], false),
      ),
    );
    el.appendChild(wrap);
  }
  return el;
}

/* ══════════════════════════════════════════
   SCROLL TOP
══════════════════════════════════════════ */
function setupScrollTop() {
  const b = document.getElementById('scroll-top');
  window.addEventListener('scroll', () =>
    b.classList.toggle('show', window.scrollY > 300),
  );
  b.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }),
  );
}

loadData();
