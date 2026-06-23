/* =============================================
   Vendor Portal — purchase-orders.js
   ============================================= */

'use strict';

/* ============================================================
   MOCK DATA
   ============================================================ */
const ALL_POS = [
  {
    poNumber: 'PO-2048', poDate: '2026-06-20', deliveryDate: '2026-06-28',
    status: 'New', orderValue: 84000,
    items: [
      { name: 'Steel Pipes (25mm)', unit: 'Pcs', qty: 200, unitPrice: 420 },
    ],
    warehouse: 'Warehouse A', remarks: 'Urgent delivery required.',
  },
  {
    poNumber: 'PO-2047', poDate: '2026-06-18', deliveryDate: '2026-06-26',
    status: 'New', orderValue: 56000,
    items: [
      { name: 'Industrial Bearings', unit: 'Pcs', qty: 80, unitPrice: 700 },
    ],
    warehouse: 'Warehouse B', remarks: '',
  },
  {
    poNumber: 'PO-2046', poDate: '2026-06-15', deliveryDate: '2026-06-24',
    status: 'Accepted', orderValue: 1,
    items: [
      { name: 'Hydraulic Hoses', unit: 'Mtrs', qty: 150, unitPrice: 320 },
      { name: 'Fittings Set',    unit: 'Set',  qty: 20,  unitPrice: 850 },
    ],
    warehouse: 'Warehouse A', remarks: 'Handle with care.',
  },
  {
    poNumber: 'PO-2045', poDate: '2026-06-12', deliveryDate: '2026-06-22',
    status: 'In Progress', orderValue: 210000,
    items: [
      { name: 'Aluminium Sheets (4mm)', unit: 'Sheets', qty: 300, unitPrice: 700 },
    ],
    warehouse: 'Warehouse C', remarks: '',
  },
  {
    poNumber: 'PO-2044', poDate: '2026-06-10', deliveryDate: '2026-06-20',
    status: 'In Progress', orderValue: 96000,
    items: [
      { name: 'Conveyor Belt Roll', unit: 'Mtrs', qty: 60, unitPrice: 1600 },
    ],
    warehouse: 'Warehouse B', remarks: '',
  },
  {
    poNumber: 'PO-2043', poDate: '2026-06-08', deliveryDate: '2026-06-18',
    status: 'Delivered', orderValue: 63000,
    items: [
      { name: 'Safety Gloves (XL)', unit: 'Pairs', qty: 300, unitPrice: 210 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2042', poDate: '2026-06-05', deliveryDate: '2026-06-15',
    status: 'Delivered', orderValue: 145600,
    items: [
      { name: 'Motor Coupling Set', unit: 'Set',  qty: 28, unitPrice: 5200 },
    ],
    warehouse: 'Warehouse B', remarks: 'Quality check done.',
  },
  {
    poNumber: 'PO-2041', poDate: '2026-06-01', deliveryDate: '2026-06-12',
    status: 'Closed', orderValue: 176400,
    items: [
      { name: 'Packaging Cartons (L)', unit: 'Pcs', qty: 840, unitPrice: 210 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2040', poDate: '2026-05-28', deliveryDate: '2026-06-08',
    status: 'Closed', orderValue: 89000,
    items: [
      { name: 'Steel Plates (6mm)', unit: 'Sheets', qty: 100, unitPrice: 890 },
    ],
    warehouse: 'Warehouse C', remarks: '',
  },
  {
    poNumber: 'PO-2039', poDate: '2026-05-25', deliveryDate: '2026-06-04',
    status: 'Closed', orderValue: 124000,
    items: [
      { name: 'Aluminium Sheets (3mm)', unit: 'Sheets', qty: 200, unitPrice: 620 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2038', poDate: '2026-05-22', deliveryDate: '2026-06-01',
    status: 'Rejected', orderValue: 45000,
    items: [
      { name: 'GI Pipes (32mm)', unit: 'Pcs', qty: 90, unitPrice: 500 },
    ],
    warehouse: 'Warehouse B', remarks: 'Price mismatch — rejected by vendor.',
  },
  {
    poNumber: 'PO-2037', poDate: '2026-05-20', deliveryDate: '2026-05-30',
    status: 'Closed', orderValue: 98000,
    items: [
      { name: 'Industrial Fasteners', unit: 'Box', qty: 200, unitPrice: 490 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2036', poDate: '2026-05-18', deliveryDate: '2026-05-28',
    status: 'Delivered', orderValue: 136000,
    items: [
      { name: 'Heavy Duty Bolts', unit: 'Kg',  qty: 400, unitPrice: 340 },
    ],
    warehouse: 'Warehouse C', remarks: '',
  },
  {
    poNumber: 'PO-2035', poDate: '2026-05-15', deliveryDate: '2026-05-25',
    status: 'Closed', orderValue: 220000,
    items: [
      { name: 'Copper Wire (6mm)', unit: 'Coil', qty: 50, unitPrice: 4400 },
    ],
    warehouse: 'Warehouse B', remarks: 'Bulk order.',
  },
  {
    poNumber: 'PO-2034', poDate: '2026-05-12', deliveryDate: '2026-05-22',
    status: 'New', orderValue: 72000,
    items: [
      { name: 'Safety Helmets', unit: 'Pcs', qty: 120, unitPrice: 600 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2033', poDate: '2026-05-10', deliveryDate: '2026-05-20',
    status: 'Accepted', orderValue: 59000,
    items: [
      { name: 'Rubber Gaskets', unit: 'Pcs', qty: 500, unitPrice: 118 },
    ],
    warehouse: 'Warehouse B', remarks: '',
  },
  {
    poNumber: 'PO-2032', poDate: '2026-05-08', deliveryDate: '2026-05-18',
    status: 'In Progress', orderValue: 184000,
    items: [
      { name: 'Steel Channels (100mm)', unit: 'Mtrs', qty: 200, unitPrice: 920 },
    ],
    warehouse: 'Warehouse C', remarks: '',
  },
  {
    poNumber: 'PO-2031', poDate: '2026-05-05', deliveryDate: '2026-05-15',
    status: 'Delivered', orderValue: 92000,
    items: [
      { name: 'Welding Rods', unit: 'Box', qty: 80, unitPrice: 1150 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
  {
    poNumber: 'PO-2030', poDate: '2026-05-02', deliveryDate: '2026-05-12',
    status: 'Closed', orderValue: 67000,
    items: [
      { name: 'Chain Blocks (2T)', unit: 'Pcs', qty: 10, unitPrice: 6700 },
    ],
    warehouse: 'Warehouse B', remarks: '',
  },
  {
    poNumber: 'PO-2029', poDate: '2026-04-28', deliveryDate: '2026-05-08',
    status: 'Closed', orderValue: 145000,
    items: [
      { name: 'Electric Motors (5HP)', unit: 'Pcs', qty: 10, unitPrice: 14500 },
    ],
    warehouse: 'Warehouse A', remarks: '',
  },
];

// Compute orderValue from items for rows that have it as 1 (placeholder)
ALL_POS.forEach(po => {
  const computed = po.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  if (po.orderValue === 1) po.orderValue = computed;
});

/* ============================================================
   STATE
   ============================================================ */
const PAGE_SIZE = 10;
let state = {
  data:       [...ALL_POS],
  filtered:   [...ALL_POS],
  page:       1,
  sortCol:    'poDate',
  sortDir:    'desc',    // 'asc' | 'desc'
  search:     '',
  status:     '',
  fromDate:   '',
  toDate:     '',
  pendingAction: null,   // { poNumber, action }
};

/* ============================================================
   SIDEBAR
   ============================================================ */
(function initSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const wrapper   = document.getElementById('main-wrapper');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay   = document.getElementById('sidebar-overlay');
  let collapsed   = false;

  toggleBtn?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle('sidebar-open');
      overlay.classList.toggle('active');
    } else {
      collapsed = !collapsed;
      sidebar.classList.toggle('sidebar-collapsed', collapsed);
      wrapper.classList.toggle('main-expanded', collapsed);
    }
  });
  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('active');
  });
})();

/* ============================================================
   DROPDOWNS
   ============================================================ */
(function initDropdowns() {
  function wire(btnId, menuId, others) {
    const btn  = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = menu.classList.contains('open');
      others.forEach(id => document.getElementById(id)?.classList.remove('open'));
      menu.classList.toggle('open', !open);
    });
  }
  wire('notif-btn',    'notif-menu',  ['user-menu']);
  wire('user-menu-btn','user-menu',   ['notif-menu']);
  document.addEventListener('click', () => {
    document.getElementById('notif-menu')?.classList.remove('open');
    document.getElementById('user-menu')?.classList.remove('open');
  });
})();

/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const colors = { success: '#059669', error: '#dc2626', info: '#111844', warning: '#b45309' };
  const icons  = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warning: 'fa-triangle-exclamation' };
  const el = document.createElement('div');
  el.className = 'toast';
  el.style.background = colors[type] || colors.info;
  el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${message}`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .2s, transform .2s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
    setTimeout(() => el.remove(), 200);
  }, 3000);
}
window.showToast = showToast;

/* ============================================================
   HELPERS
   ============================================================ */
function fmtDate(d) {
  if (!d) return '—';
  const [y, m, dd] = d.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${dd} ${months[+m - 1]} ${y}`;
}

function fmtCurrency(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`;
  return `₹${n.toLocaleString('en-IN')}`;
}

function fmtCurrencyFull(n) {
  return `₹${n.toLocaleString('en-IN')}`;
}

const STATUS_BADGE = {
  'New':         '<span class="badge badge-new"><i class="fas fa-circle-dot"></i> New</span>',
  'Accepted':    '<span class="badge badge-accepted"><i class="fas fa-circle-check"></i> Accepted</span>',
  'In Progress': '<span class="badge badge-inprogress"><i class="fas fa-spinner"></i> In Progress</span>',
  'Delivered':   '<span class="badge badge-delivered"><i class="fas fa-truck"></i> Delivered</span>',
  'Closed':      '<span class="badge badge-closed"><i class="fas fa-lock"></i> Closed</span>',
  'Rejected':    '<span class="badge badge-rejected"><i class="fas fa-times-circle"></i> Rejected</span>',
};

/* ============================================================
   FILTER + SORT + PAGINATE
   ============================================================ */
function applyFilters() {
  let data = [...state.data];

  // Search
  if (state.search) {
    const q = state.search.toLowerCase();
    data = data.filter(po =>
      po.poNumber.toLowerCase().includes(q) ||
      po.items.some(i => i.name.toLowerCase().includes(q)) ||
      po.warehouse.toLowerCase().includes(q)
    );
  }

  // Status
  if (state.status) data = data.filter(po => po.status === state.status);

  // Date range
  if (state.fromDate) data = data.filter(po => po.poDate >= state.fromDate);
  if (state.toDate)   data = data.filter(po => po.poDate <= state.toDate);

  // Sort
  data.sort((a, b) => {
    let va = a[state.sortCol], vb = b[state.sortCol];
    if (state.sortCol === 'orderValue') { va = +va; vb = +vb; }
    if (va < vb) return state.sortDir === 'asc' ? -1 : 1;
    if (va > vb) return state.sortDir === 'asc' ?  1 : -1;
    return 0;
  });

  state.filtered = data;
  state.page     = 1;
  renderTable();
}

function renderTable() {
  const tbody    = document.getElementById('po-tbody');
  const empty    = document.getElementById('empty-state');
  const subtitle = document.getElementById('table-subtitle');
  const countEl  = document.getElementById('record-count');

  const total = state.filtered.length;
  const start = (state.page - 1) * PAGE_SIZE;
  const end   = Math.min(start + PAGE_SIZE, total);
  const page  = state.filtered.slice(start, end);

  countEl.textContent  = `${total} record${total !== 1 ? 's' : ''}`;
  subtitle.textContent = state.search || state.status || state.fromDate || state.toDate
    ? `Filtered results — ${total} found`
    : 'Showing all records';

  if (total === 0) {
    tbody.innerHTML = '';
    empty.style.display = 'flex';
  } else {
    empty.style.display = 'none';
    tbody.innerHTML = page.map(po => `
      <tr>
        <td><span class="td-po-number" onclick="openDetail('${po.poNumber}')">${po.poNumber}</span></td>
        <td>${fmtDate(po.poDate)}</td>
        <td>${fmtDate(po.deliveryDate)}</td>
        <td style="color:#7288AE;">${po.items.length} item${po.items.length > 1 ? 's' : ''}</td>
        <td class="td-value">${fmtCurrencyFull(po.orderValue)}</td>
        <td>${STATUS_BADGE[po.status] || po.status}</td>
        <td>
          <div class="action-cell">
            <button class="btn btn-outline btn-sm" onclick="openDetail('${po.poNumber}')" title="View Details">
              <i class="fas fa-eye"></i> View
            </button>
            <button class="btn btn-outline btn-sm" onclick="downloadPO('${po.poNumber}')" title="Download PO">
              <i class="fas fa-download"></i>
            </button>
            ${po.status === 'New' ? `
              <button class="btn btn-success btn-sm" onclick="triggerAction('${po.poNumber}','accept')" title="Accept">
                <i class="fas fa-check"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="triggerAction('${po.poNumber}','reject')" title="Reject">
                <i class="fas fa-times"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `).join('');
  }

  renderPagination(total, start, end);
  updateSortHeaders();
}

function renderPagination(total, start, end) {
  const infoEl  = document.getElementById('pagination-info');
  const btnsEl  = document.getElementById('pagination-btns');
  const pages   = Math.ceil(total / PAGE_SIZE);

  infoEl.textContent = total === 0
    ? 'No records'
    : `Showing ${start + 1}–${end} of ${total}`;

  if (pages <= 1) { btnsEl.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="goPage(${state.page - 1})" ${state.page === 1 ? 'disabled' : ''}>
    <i class="fas fa-chevron-left" style="font-size:10px;"></i>
  </button>`;

  for (let i = 1; i <= pages; i++) {
    if (pages > 7 && i > 2 && i < pages - 1 && Math.abs(i - state.page) > 1) {
      if (i === 3 || i === pages - 2) html += `<span style="padding:0 4px;color:#7288AE;font-size:12px;">…</span>`;
      continue;
    }
    html += `<button class="page-btn ${i === state.page ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  }

  html += `<button class="page-btn" onclick="goPage(${state.page + 1})" ${state.page === pages ? 'disabled' : ''}>
    <i class="fas fa-chevron-right" style="font-size:10px;"></i>
  </button>`;

  btnsEl.innerHTML = html;
}

function updateSortHeaders() {
  document.querySelectorAll('#po-table thead th[data-col]').forEach(th => {
    th.classList.remove('sorted');
    const icon = th.querySelector('.sort-icon');
    if (!icon) return;
    if (th.dataset.col === state.sortCol) {
      th.classList.add('sorted');
      icon.className = `fas fa-sort-${state.sortDir === 'asc' ? 'up' : 'down'} sort-icon`;
    } else {
      icon.className = 'fas fa-sort sort-icon';
    }
  });
}

function goPage(p) {
  const pages = Math.ceil(state.filtered.length / PAGE_SIZE);
  if (p < 1 || p > pages) return;
  state.page = p;
  renderTable();
}
window.goPage = goPage;

/* ============================================================
   SORT HEADERS
   ============================================================ */
document.querySelectorAll('#po-table thead th[data-col]').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (state.sortCol === col) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortCol = col;
      state.sortDir = 'asc';
    }
    applyFilters();
  });
});

/* ============================================================
   FILTER INPUTS
   ============================================================ */
document.getElementById('search-input').addEventListener('input', (e) => {
  state.search = e.target.value.trim();
  applyFilters();
});
document.getElementById('filter-status').addEventListener('change', (e) => {
  state.status = e.target.value;
  applyFilters();
});
document.getElementById('filter-from').addEventListener('change', (e) => {
  state.fromDate = e.target.value;
  applyFilters();
});
document.getElementById('filter-to').addEventListener('change', (e) => {
  state.toDate = e.target.value;
  applyFilters();
});

function resetFilters() {
  state.search = ''; state.status = ''; state.fromDate = ''; state.toDate = '';
  document.getElementById('search-input').value  = '';
  document.getElementById('filter-status').value = '';
  document.getElementById('filter-from').value   = '';
  document.getElementById('filter-to').value     = '';
  applyFilters();
}
window.resetFilters = resetFilters;

/* ============================================================
   PO DETAIL MODAL
   ============================================================ */
function openDetail(poNumber) {
  const po = state.data.find(p => p.poNumber === poNumber);
  if (!po) return;

  document.getElementById('modal-po-title').textContent = `Purchase Order — ${po.poNumber}`;

  // Info grid
  const infoFields = [
    { lbl: 'PO Number',     val: po.poNumber },
    { lbl: 'PO Date',       val: fmtDate(po.poDate) },
    { lbl: 'Delivery Date', val: fmtDate(po.deliveryDate) },
    { lbl: 'Warehouse',     val: po.warehouse },
    { lbl: 'Status',        val: STATUS_BADGE[po.status] || po.status },
    { lbl: 'Remarks',       val: po.remarks || '—' },
  ];
  document.getElementById('modal-po-info').innerHTML = infoFields.map(f => `
    <div class="info-cell">
      <span class="lbl">${f.lbl}</span>
      <span class="val">${f.val}</span>
    </div>
  `).join('');

  // Items table
  document.getElementById('modal-items-tbody').innerHTML = po.items.map((item, i) => {
    const amt = item.qty * item.unitPrice;
    return `
      <tr>
        <td>${i + 1}</td>
        <td style="font-weight:500;">${item.name}</td>
        <td>${item.unit}</td>
        <td>${item.qty.toLocaleString('en-IN')}</td>
        <td>${fmtCurrencyFull(item.unitPrice)}</td>
        <td style="font-weight:600;">${fmtCurrencyFull(amt)}</td>
      </tr>
    `;
  }).join('');

  // Totals
  const subtotal = po.items.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const gst      = Math.round(subtotal * 0.18);
  const total    = subtotal + gst;
  document.getElementById('modal-totals').innerHTML = `
    <div style="display:flex;gap:40px;font-size:12px;">
      <span style="color:#7288AE;">Subtotal</span>
      <span style="font-weight:600;">${fmtCurrencyFull(subtotal)}</span>
    </div>
    <div style="display:flex;gap:40px;font-size:12px;">
      <span style="color:#7288AE;">GST (18%)</span>
      <span style="font-weight:600;">${fmtCurrencyFull(gst)}</span>
    </div>
    <div style="display:flex;gap:40px;font-size:13px;border-top:1px solid rgba(75,86,148,.15);padding-top:8px;">
      <span style="color:#111844;font-weight:600;">Total Amount</span>
      <span style="font-weight:700;color:#111844;">${fmtCurrencyFull(total)}</span>
    </div>
  `;

  // Footer actions
  let footerHtml = `
    <button class="btn btn-outline" onclick="downloadPO('${po.poNumber}')">
      <i class="fas fa-download"></i> Download PO
    </button>
  `;
  if (po.status === 'New') {
    footerHtml += `
      <button class="btn btn-danger" onclick="closeModal('po-detail-modal');triggerAction('${po.poNumber}','reject')">
        <i class="fas fa-times"></i> Reject PO
      </button>
      <button class="btn btn-primary" onclick="closeModal('po-detail-modal');triggerAction('${po.poNumber}','accept')">
        <i class="fas fa-check"></i> Accept PO
      </button>
    `;
  }
  document.getElementById('modal-footer-actions').innerHTML = footerHtml;

  openModal('po-detail-modal');
}
window.openDetail = openDetail;

/* ============================================================
   ACCEPT / REJECT CONFIRM
   ============================================================ */
function triggerAction(poNumber, action) {
  state.pendingAction = { poNumber, action };

  if (action === 'accept') {
    document.getElementById('confirm-icon').textContent  = '✅';
    document.getElementById('confirm-title').textContent = `Accept PO ${poNumber}?`;
    document.getElementById('confirm-desc').textContent  = 'Accepting will notify the company and schedule your delivery.';
    document.getElementById('confirm-action-btn').style.background = '#059669';
    document.getElementById('confirm-action-btn').textContent = 'Accept PO';
  } else {
    document.getElementById('confirm-icon').textContent  = '❌';
    document.getElementById('confirm-title').textContent = `Reject PO ${poNumber}?`;
    document.getElementById('confirm-desc').textContent  = 'The company will be notified. This action cannot be undone.';
    document.getElementById('confirm-action-btn').style.background = '#dc2626';
    document.getElementById('confirm-action-btn').textContent = 'Reject PO';
  }

  openModal('confirm-modal');
}
window.triggerAction = triggerAction;

document.getElementById('confirm-action-btn').addEventListener('click', () => {
  const { poNumber, action } = state.pendingAction || {};
  if (!poNumber) return;

  const po = state.data.find(p => p.poNumber === poNumber);
  if (po) po.status = action === 'accept' ? 'Accepted' : 'Rejected';

  closeModal('confirm-modal');
  applyFilters();
  showToast(
    action === 'accept'
      ? `PO ${poNumber} accepted successfully!`
      : `PO ${poNumber} rejected.`,
    action === 'accept' ? 'success' : 'error'
  );
});

/* ============================================================
   DOWNLOAD PO (mock)
   ============================================================ */
function downloadPO(poNumber) {
  showToast(`Downloading ${poNumber}…`, 'info');
}
window.downloadPO = downloadPO;

/* ============================================================
   EXPORT CSV
   ============================================================ */
function exportCSV() {
  const rows = [['PO Number','PO Date','Delivery Date','Items','Order Value','Status']];
  state.filtered.forEach(po => {
    rows.push([
      po.poNumber,
      po.poDate,
      po.deliveryDate,
      po.items.map(i => i.name).join('; '),
      po.orderValue,
      po.status,
    ]);
  });
  const csv  = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = 'purchase-orders.csv';
  a.click();
  URL.revokeObjectURL(url);
  showToast('CSV exported!', 'success');
}
window.exportCSV = exportCSV;

/* ============================================================
   MODAL HELPERS
   ============================================================ */
function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
window.openModal  = openModal;
window.closeModal = closeModal;

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

/* ============================================================
   INITIAL RENDER
   ============================================================ */
applyFilters();