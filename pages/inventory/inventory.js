/* =====================================================
   INVENTORY MANAGEMENT — inventory.js
   ===================================================== */

'use strict';

// ============================================================
// MOCK DATA
// ============================================================

const STOCK_DATA = [
  { code:'PRD-001', name:'Steel Pipes (25mm)',       category:'Raw Materials',    warehouse:'Warehouse A', available:5,   reserved:20,  damaged:2,  reorder:50,  unit:'pcs',   value:12500 },
  { code:'PRD-002', name:'Industrial Bearings',      category:'Industrial',       warehouse:'Warehouse B', available:3,   reserved:10,  damaged:0,  reorder:30,  unit:'pcs',   value:8400  },
  { code:'PRD-003', name:'Aluminium Sheets (4mm)',   category:'Raw Materials',    warehouse:'Warehouse A', available:0,   reserved:0,   damaged:0,  reorder:100, unit:'sheets', value:0     },
  { code:'PRD-004', name:'Packaging Cartons (L)',    category:'Packaging',        warehouse:'Warehouse C', available:8,   reserved:5,   damaged:0,  reorder:40,  unit:'pcs',   value:3200  },
  { code:'PRD-005', name:'Hydraulic Hoses',          category:'Industrial',       warehouse:'Warehouse A', available:6,   reserved:12,  damaged:1,  reorder:20,  unit:'mtrs',  value:9600  },
  { code:'PRD-006', name:'Safety Gloves (XL)',       category:'Safety Equipment', warehouse:'Warehouse B', available:0,   reserved:0,   damaged:5,  reorder:60,  unit:'pairs', value:0     },
  { code:'PRD-007', name:'Motor Coupling Set',       category:'Industrial',       warehouse:'Warehouse D', available:0,   reserved:0,   damaged:0,  reorder:15,  unit:'sets',  value:0     },
  { code:'PRD-008', name:'Conveyor Belt Roll',       category:'Industrial',       warehouse:'Warehouse A', available:0,   reserved:0,   damaged:3,  reorder:10,  unit:'rolls', value:0     },
  { code:'PRD-009', name:'MS Flat Bar (40mm)',       category:'Raw Materials',    warehouse:'Warehouse C', available:320, reserved:80,  damaged:0,  reorder:100, unit:'pcs',   value:64000 },
  { code:'PRD-010', name:'PVC Pipes (1-inch)',       category:'Raw Materials',    warehouse:'Warehouse B', available:245, reserved:60,  damaged:0,  reorder:80,  unit:'pcs',   value:24500 },
  { code:'PRD-011', name:'Hex Bolts M10',            category:'Industrial',       warehouse:'Warehouse A', available:1800,reserved:200, damaged:0,  reorder:500, unit:'pcs',   value:18000 },
  { code:'PRD-012', name:'Copper Wire (1.5mm)',      category:'Electronics',      warehouse:'Warehouse D', available:92,  reserved:30,  damaged:2,  reorder:50,  unit:'mtrs',  value:27600 },
  { code:'PRD-013', name:'Air Filter Element',       category:'Industrial',       warehouse:'Warehouse B', available:34,  reserved:10,  damaged:0,  reorder:20,  unit:'pcs',   value:13600 },
  { code:'PRD-014', name:'Nylon Rope (12mm)',        category:'Raw Materials',    warehouse:'Warehouse C', available:180, reserved:40,  damaged:0,  reorder:60,  unit:'mtrs',  value:14400 },
  { code:'PRD-015', name:'Lubricant Oil (5L)',       category:'Industrial',       warehouse:'Warehouse A', available:55,  reserved:15,  damaged:0,  reorder:30,  unit:'cans',  value:22000 },
  { code:'PRD-016', name:'Safety Helmets',           category:'Safety Equipment', warehouse:'Warehouse B', available:122, reserved:25,  damaged:3,  reorder:50,  unit:'pcs',   value:36600 },
  { code:'PRD-017', name:'Drill Bits Set (10pc)',    category:'Industrial',       warehouse:'Warehouse D', available:67,  reserved:10,  damaged:0,  reorder:20,  unit:'sets',  value:33500 },
  { code:'PRD-018', name:'Rubber Gaskets (50mm)',    category:'Industrial',       warehouse:'Warehouse C', available:210, reserved:50,  damaged:0,  reorder:80,  unit:'pcs',   value:10500 },
  { code:'PRD-019', name:'LED Strip Lights (5m)',    category:'Electronics',      warehouse:'Warehouse A', available:41,  reserved:8,   damaged:1,  reorder:15,  unit:'rolls', value:20500 },
  { code:'PRD-020', name:'Stainless Steel Bolts M8', category:'Raw Materials',   warehouse:'Warehouse B', available:560, reserved:100, damaged:0,  reorder:200, unit:'pcs',   value:11200 },
];

const BATCH_DATA = [
  { no:'BAT-2024-001', product:'Steel Pipes (25mm)',    warehouse:'Warehouse A', mfg:'2024-01-10', expiry:'2026-01-10', total:500,  available:480, reserved:20  },
  { no:'BAT-2024-002', product:'Industrial Bearings',   warehouse:'Warehouse B', mfg:'2024-02-15', expiry:'2025-06-15', total:200,  available:190, reserved:10  },
  { no:'BAT-2024-003', product:'Hydraulic Hoses',       warehouse:'Warehouse A', mfg:'2024-03-05', expiry:'2025-09-05', total:150,  available:138, reserved:12  },
  { no:'BAT-2024-004', product:'PVC Pipes (1-inch)',    warehouse:'Warehouse B', mfg:'2024-04-20', expiry:'2027-04-20', total:600,  available:545, reserved:55  },
  { no:'BAT-2024-005', product:'Lubricant Oil (5L)',    warehouse:'Warehouse A', mfg:'2024-05-01', expiry:'2025-05-01', total:100,  available:85,  reserved:15  },
  { no:'BAT-2024-006', product:'Rubber Gaskets (50mm)', warehouse:'Warehouse C', mfg:'2024-06-12', expiry:'2027-12-12', total:400,  available:360, reserved:40  },
  { no:'BAT-2024-007', product:'Safety Helmets',        warehouse:'Warehouse B', mfg:'2024-07-25', expiry:'2029-07-25', total:200,  available:172, reserved:28  },
  { no:'BAT-2024-008', product:'LED Strip Lights (5m)', warehouse:'Warehouse A', mfg:'2024-08-18', expiry:'2026-08-18', total:80,   available:70,  reserved:10  },
];

const SERIAL_DATA = [
  { serial:'SN-MC-001',  product:'Motor Coupling Set',  category:'Industrial',   warehouse:'Warehouse D', added:'2024-01-15', status:'Available' },
  { serial:'SN-MC-002',  product:'Motor Coupling Set',  category:'Industrial',   warehouse:'Warehouse D', added:'2024-01-15', status:'Reserved'  },
  { serial:'SN-IP-001',  product:'Industrial Pump',     category:'Industrial',   warehouse:'Warehouse A', added:'2024-02-10', status:'Sold'      },
  { serial:'SN-IP-002',  product:'Industrial Pump',     category:'Industrial',   warehouse:'Warehouse A', added:'2024-02-10', status:'Available' },
  { serial:'SN-CP-001',  product:'Control Panel Unit',  category:'Electronics',  warehouse:'Warehouse D', added:'2024-03-05', status:'Available' },
  { serial:'SN-CP-002',  product:'Control Panel Unit',  category:'Electronics',  warehouse:'Warehouse D', added:'2024-03-05', status:'Sold'      },
  { serial:'SN-CB-001',  product:'Conveyor Belt Roll',  category:'Industrial',   warehouse:'Warehouse A', added:'2024-04-12', status:'Damaged'   },
  { serial:'SN-LS-001',  product:'LED Strip Lights (5m)',category:'Electronics', warehouse:'Warehouse A', added:'2024-05-20', status:'Available' },
  { serial:'SN-IB-001',  product:'Industrial Bearings', category:'Industrial',   warehouse:'Warehouse B', added:'2024-06-01', status:'Returned'  },
  { serial:'SN-IB-002',  product:'Industrial Bearings', category:'Industrial',   warehouse:'Warehouse B', added:'2024-06-01', status:'Available' },
];

const TRANSFER_DATA = [
  { no:'TRF-2024-001', date:'2024-08-01', from:'Warehouse A', to:'Warehouse B', items:3, qty:150, status:'Transferred' },
  { no:'TRF-2024-002', date:'2024-08-10', from:'Warehouse C', to:'Warehouse A', items:2, qty:80,  status:'Approved'    },
  { no:'TRF-2024-003', date:'2024-08-15', from:'Warehouse B', to:'Warehouse D', items:4, qty:200, status:'Submitted'   },
  { no:'TRF-2024-004', date:'2024-08-18', from:'Warehouse D', to:'Warehouse C', items:1, qty:50,  status:'Draft'       },
  { no:'TRF-2024-005', date:'2024-08-20', from:'Warehouse A', to:'Warehouse C', items:5, qty:320, status:'Submitted'   },
];

const MOVEMENT_DATA = [
  { date:'2024-08-20', product:'Steel Pipes (25mm)',     warehouse:'Warehouse A', type:'Purchase GRN',    qty:'+100', ref:'PO-2041'   },
  { date:'2024-08-20', product:'Industrial Bearings',    warehouse:'Warehouse B', type:'Sales Dispatch',  qty:'-20',  ref:'SO-3187'   },
  { date:'2024-08-19', product:'Aluminium Sheets (4mm)', warehouse:'Warehouse A', type:'Stock Adjustment', qty:'-30', ref:'ADJ-0042'  },
  { date:'2024-08-19', product:'Packaging Cartons (L)',  warehouse:'Warehouse C', type:'Purchase GRN',    qty:'+50',  ref:'PO-2040'   },
  { date:'2024-08-18', product:'Hydraulic Hoses',        warehouse:'Warehouse A', type:'Sales Dispatch',  qty:'-12',  ref:'SO-3185'   },
  { date:'2024-08-18', product:'MS Flat Bar (40mm)',     warehouse:'Warehouse C', type:'Stock Transfer',  qty:'+80',  ref:'TRF-001'   },
  { date:'2024-08-17', product:'Safety Gloves (XL)',     warehouse:'Warehouse B', type:'Return',          qty:'+5',   ref:'RET-0021'  },
  { date:'2024-08-17', product:'Motor Coupling Set',     warehouse:'Warehouse D', type:'Sales Dispatch',  qty:'-3',   ref:'SO-3180'   },
  { date:'2024-08-16', product:'PVC Pipes (1-inch)',     warehouse:'Warehouse B', type:'Purchase GRN',    qty:'+200', ref:'PO-2038'   },
  { date:'2024-08-16', product:'Hex Bolts M10',          warehouse:'Warehouse A', type:'Stock Adjustment', qty:'-50', ref:'ADJ-0041'  },
  { date:'2024-08-15', product:'Copper Wire (1.5mm)',    warehouse:'Warehouse D', type:'Purchase GRN',    qty:'+100', ref:'PO-2037'   },
  { date:'2024-08-15', product:'Air Filter Element',     warehouse:'Warehouse B', type:'Sales Dispatch',  qty:'-8',   ref:'SO-3175'   },
  { date:'2024-08-14', product:'Lubricant Oil (5L)',     warehouse:'Warehouse A', type:'Sales Dispatch',  qty:'-10',  ref:'SO-3170'   },
  { date:'2024-08-14', product:'Safety Helmets',         warehouse:'Warehouse B', type:'Purchase GRN',    qty:'+50',  ref:'PO-2035'   },
  { date:'2024-08-13', product:'Drill Bits Set (10pc)',  warehouse:'Warehouse D', type:'Return',          qty:'+2',   ref:'RET-0020'  },
  { date:'2024-08-13', product:'Rubber Gaskets (50mm)',  warehouse:'Warehouse C', type:'Stock Adjustment', qty:'+20', ref:'ADJ-0040'  },
  { date:'2024-08-12', product:'LED Strip Lights (5m)',  warehouse:'Warehouse A', type:'Stock Transfer',  qty:'-15',  ref:'TRF-002'   },
  { date:'2024-08-12', product:'Stainless Steel Bolts',  warehouse:'Warehouse B', type:'Sales Dispatch',  qty:'-80',  ref:'SO-3165'   },
];

const LEDGER_DATA = [
  { date:'2024-08-01', txn:'Opening Balance',    opening:120, inward:0,   outward:0,  closing:120, ref:'—'       },
  { date:'2024-08-05', txn:'Purchase GRN',       opening:120, inward:100, outward:0,  closing:220, ref:'PO-2035' },
  { date:'2024-08-08', txn:'Sales Dispatch',     opening:220, inward:0,   outward:30, closing:190, ref:'SO-3170' },
  { date:'2024-08-12', txn:'Stock Transfer In',  opening:190, inward:50,  outward:0,  closing:240, ref:'TRF-001' },
  { date:'2024-08-15', txn:'Sales Dispatch',     opening:240, inward:0,   outward:45, closing:195, ref:'SO-3180' },
  { date:'2024-08-18', txn:'Stock Adjustment',   opening:195, inward:0,   outward:10, closing:185, ref:'ADJ-041' },
  { date:'2024-08-20', txn:'Purchase GRN',       opening:185, inward:100, outward:0,  closing:285, ref:'PO-2041' },
];

// ============================================================
// SIDEBAR TOGGLE
// ============================================================

const sidebar = document.getElementById('sidebar');
const mainWrapper = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay = document.getElementById('sidebar-overlay');
let isCollapsed = false;

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay.classList.toggle('visible');
  } else {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
    mainWrapper.classList.toggle('main-expanded', isCollapsed);
  }
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-open');
  overlay.classList.remove('visible');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    sidebar.classList.remove('sidebar-open');
    overlay.classList.remove('visible');
  }
});

// Nav group dropdowns
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function (e) {
    e.stopPropagation();
    const groupItems = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (!groupItems) return;
    groupItems.classList.toggle('hidden');
    if (chevron) {
      chevron.style.transform = groupItems.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});

// ============================================================
// DROPDOWN MENUS (topbar)
// ============================================================

const userBtn = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');
const notifBtn = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('open'); notifMenu.classList.remove('open'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('open'); userMenu.classList.remove('open'); });
document.addEventListener('click', () => { userMenu?.classList.remove('open'); notifMenu?.classList.remove('open'); });

// ============================================================
// TAB SWITCHING
// ============================================================

function switchTab(tabId) {
  document.querySelectorAll('.page-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.section-panel').forEach(p => {
    p.style.display = p.id === 'panel-' + tabId ? 'block' : 'none';
    p.classList.toggle('active', p.id === 'panel-' + tabId);
  });
}

function switchSubTab(groupId, subtabId) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.sub-tab').forEach(t => t.classList.toggle('active', t.dataset.subtab === subtabId));
  // show/hide subpanels within same parent
  const panel = group.closest('.section-panel');
  if (panel) {
    panel.querySelectorAll('.subpanel').forEach(sp => {
      sp.style.display = sp.id === 'subpanel-' + subtabId ? 'block' : 'none';
    });
  }
}

// ============================================================
// MODALS
// ============================================================

function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});

// ============================================================
// TOAST
// ============================================================

function showToast(message, type = 'info') {
  const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', warning: 'fas fa-exclamation-triangle', info: 'fas fa-circle-info' };
  const colors = { success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#4B5694' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="${icons[type]}" style="color:${colors[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'slideOut 0.2s ease-in forwards'; setTimeout(() => toast.remove(), 200); }, 3000);
}

// ============================================================
// STATUS BADGE HELPER
// ============================================================

function stockStatusBadge(available, reorder) {
  if (available === 0) return '<span class="badge badge-danger"><span class="badge-dot"></span>Out of Stock</span>';
  if (available <= reorder * 0.2) return '<span class="badge badge-warning"><span class="badge-dot"></span>Low Stock</span>';
  return '<span class="badge badge-success"><span class="badge-dot"></span>In Stock</span>';
}

function getStockStatus(available, reorder) {
  if (available === 0) return 'Out of Stock';
  if (available <= reorder * 0.2) return 'Low Stock';
  return 'In Stock';
}

function transferStatusBadge(status) {
  const map = { Draft: 'badge-neutral', Submitted: 'badge-info', Approved: 'badge-warning', Transferred: 'badge-success' };
  return `<span class="badge ${map[status] || 'badge-neutral'}">${status}</span>`;
}

function serialStatusBadge(status) {
  const map = { Available: 'badge-success', Reserved: 'badge-info', Sold: 'badge-neutral', Returned: 'badge-warning', Damaged: 'badge-danger' };
  return `<span class="badge ${map[status] || 'badge-neutral'}">${status}</span>`;
}

function batchStatusBadge(expiry) {
  const today = new Date();
  const exp = new Date(expiry);
  const daysLeft = Math.round((exp - today) / (1000 * 60 * 60 * 24));
  if (daysLeft < 0) return '<span class="badge badge-danger">Expired</span>';
  if (daysLeft < 90) return '<span class="badge badge-warning">Expiring Soon</span>';
  return '<span class="badge badge-success">Active</span>';
}

// ============================================================
// RENDER STOCK TABLE
// ============================================================

let currentStockData = [...STOCK_DATA];
let currentPage = 1;
const ROWS_PER_PAGE = 10;

function renderStockTable() {
  const tbody = document.getElementById('stock-table-body');
  if (!tbody) return;
  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const pageData = currentStockData.slice(start, start + ROWS_PER_PAGE);

  tbody.innerHTML = pageData.map(row => `
    <tr>
      <td class="product-code">${row.code}</td>
      <td class="product-name">${row.name}</td>
      <td class="muted">${row.category}</td>
      <td class="muted">${row.warehouse}</td>
      <td><strong>${row.available}</strong> <span style="font-size:10px;color:#7288AE">${row.unit}</span></td>
      <td class="muted">${row.reserved}</td>
      <td class="muted">${row.damaged}</td>
      <td class="muted">${row.reorder}</td>
      <td>${stockStatusBadge(row.available, row.reorder)}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" title="View Details" onclick="viewStockDetail('${row.code}')"><i class="fas fa-eye"></i></button>
          <button class="tbl-btn" title="Adjust Stock" onclick="switchSubTab('sub-stock','stock-adjust');showToast('Adjustment form ready','info')"><i class="fas fa-pen-to-square"></i></button>
          <button class="tbl-btn" title="View Movements" onclick="switchTab('stock-movement');showToast('Filtered by ${row.name}','info')"><i class="fas fa-clock-rotate-left"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  renderPagination();
}

function renderPagination() {
  const total = currentStockData.length;
  const totalPages = Math.ceil(total / ROWS_PER_PAGE);
  const start = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(currentPage * ROWS_PER_PAGE, total);
  const info = document.getElementById('stock-pagination-info');
  const btns = document.getElementById('stock-pagination-btns');
  if (info) info.textContent = `Showing ${start}–${end} of ${total} records`;
  if (!btns) return;
  let html = `<button class="page-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left" style="font-size:9px"></i></button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right" style="font-size:9px"></i></button>`;
  btns.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(currentStockData.length / ROWS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderStockTable();
}

function filterStockTable() {
  const search = (document.getElementById('filter-product-search')?.value || '').toLowerCase();
  const category = document.getElementById('filter-category')?.value || '';
  const warehouse = document.getElementById('filter-warehouse')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';

  currentStockData = STOCK_DATA.filter(row => {
    const matchSearch = !search || row.name.toLowerCase().includes(search) || row.code.toLowerCase().includes(search);
    const matchCat = !category || row.category === category;
    const matchWH = !warehouse || row.warehouse === warehouse;
    const matchStatus = !status || getStockStatus(row.available, row.reorder) === status;
    return matchSearch && matchCat && matchWH && matchStatus;
  });
  currentPage = 1;
  renderStockTable();
}

function filterByStatus(status) {
  const el = document.getElementById('filter-status');
  if (el) el.value = status;
  filterStockTable();
}

function clearStockFilters() {
  ['filter-product-search', 'filter-category', 'filter-warehouse', 'filter-status', 'filter-date'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  currentStockData = [...STOCK_DATA];
  currentPage = 1;
  renderStockTable();
}

// ============================================================
// STOCK DETAIL VIEW
// ============================================================

function viewStockDetail(code) {
  const row = STOCK_DATA.find(r => r.code === code);
  if (!row) return;

  const total = row.available + row.reserved + row.damaged;
  const movementRows = MOVEMENT_DATA.filter(m => m.product === row.name).slice(0, 5);

  const html = `
    <div class="info-grid mb-4">
      <div class="info-item"><span class="lbl">Product Name</span><span class="val">${row.name}</span></div>
      <div class="info-item"><span class="lbl">SKU / Code</span><span class="val" style="font-family:monospace">${row.code}</span></div>
      <div class="info-item"><span class="lbl">Category</span><span class="val">${row.category}</span></div>
      <div class="info-item"><span class="lbl">Unit</span><span class="val">${row.unit}</span></div>
      <div class="info-item"><span class="lbl">Reorder Level</span><span class="val">${row.reorder} ${row.unit}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${stockStatusBadge(row.available, row.reorder)}</span></div>
    </div>

    <div class="summary-cards mb-4">
      <div class="summary-card">
        <div class="s-val" style="color:#10b981">${row.available}</div>
        <div class="s-lbl">Available</div>
      </div>
      <div class="summary-card">
        <div class="s-val" style="color:#4338ca">${row.reserved}</div>
        <div class="s-lbl">Reserved</div>
      </div>
      <div class="summary-card">
        <div class="s-val" style="color:#ef4444">${row.damaged}</div>
        <div class="s-lbl">Damaged</div>
      </div>
      <div class="summary-card">
        <div class="s-val">${total}</div>
        <div class="s-lbl">Total Stock</div>
      </div>
      <div class="summary-card">
        <div class="s-val" style="color:#059669">₹${row.value.toLocaleString()}</div>
        <div class="s-lbl">Inventory Value</div>
      </div>
    </div>

    <div class="mb-4">
      <div class="card-title" style="font-size:12px;margin-bottom:10px">Warehouse-wise Stock</div>
      <div class="wh-row">
        <span class="wh-name">${row.warehouse}</span>
        <div class="wh-bar"><div class="progress-wrap"><div class="progress-bar success" style="width:${Math.min(100, (row.available / Math.max(row.available,1)) * 100)}%"></div></div></div>
        <span class="wh-qty">${row.available} ${row.unit}</span>
      </div>
    </div>

    <div>
      <div class="card-title" style="font-size:12px;margin-bottom:10px">Recent Movements</div>
      ${movementRows.length === 0 ? '<p style="font-size:12px;color:#7288AE">No recent movements.</p>' : `
      <div class="table-wrap">
        <table class="data-table">
          <thead><tr><th>Date</th><th>Type</th><th>Qty</th><th>Reference</th></tr></thead>
          <tbody>
            ${movementRows.map(m => `
              <tr>
                <td class="muted">${m.date}</td>
                <td>${m.type}</td>
                <td style="color:${m.qty.startsWith('+') ? '#10b981' : '#ef4444'};font-weight:600">${m.qty}</td>
                <td class="product-code">${m.ref}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>`}
    </div>
  `;

  document.getElementById('modal-stock-detail-title').textContent = `Stock Details — ${row.name}`;
  document.getElementById('modal-stock-detail-body').innerHTML = html;
  openModal('modal-stock-detail');
}

// ============================================================
// RENDER BATCH TABLE
// ============================================================

function renderBatchTable() {
  const tbody = document.getElementById('batch-table-body');
  if (!tbody) return;
  tbody.innerHTML = BATCH_DATA.map(b => `
    <tr>
      <td class="product-code">${b.no}</td>
      <td class="product-name">${b.product}</td>
      <td class="muted">${b.warehouse}</td>
      <td class="muted">${b.mfg}</td>
      <td class="muted">${b.expiry}</td>
      <td><strong>${b.total}</strong></td>
      <td class="muted">${b.available}</td>
      <td class="muted">${b.reserved}</td>
      <td>${batchStatusBadge(b.expiry)}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" title="View Batch" onclick="viewBatchDetail('${b.no}')"><i class="fas fa-eye"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function viewBatchDetail(no) {
  const b = BATCH_DATA.find(x => x.no === no);
  if (!b) return;
  const html = `
    <div class="info-grid mb-4">
      <div class="info-item"><span class="lbl">Batch Number</span><span class="val" style="font-family:monospace">${b.no}</span></div>
      <div class="info-item"><span class="lbl">Product</span><span class="val">${b.product}</span></div>
      <div class="info-item"><span class="lbl">Warehouse</span><span class="val">${b.warehouse}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${batchStatusBadge(b.expiry)}</span></div>
      <div class="info-item"><span class="lbl">MFG Date</span><span class="val">${b.mfg}</span></div>
      <div class="info-item"><span class="lbl">Expiry Date</span><span class="val">${b.expiry}</span></div>
    </div>
    <div class="summary-cards mb-4">
      <div class="summary-card"><div class="s-val">${b.total}</div><div class="s-lbl">Total Qty</div></div>
      <div class="summary-card"><div class="s-val" style="color:#10b981">${b.available}</div><div class="s-lbl">Available</div></div>
      <div class="summary-card"><div class="s-val" style="color:#4338ca">${b.reserved}</div><div class="s-lbl">Reserved</div></div>
    </div>
    <div class="card-title" style="font-size:12px;margin-bottom:10px">Movement History</div>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Date</th><th>Transaction</th><th>Qty</th></tr></thead>
        <tbody>
          <tr><td class="muted">${b.mfg}</td><td>Batch Created (Purchase GRN)</td><td class="ledger-positive">+${b.total}</td></tr>
          <tr><td class="muted">2024-06-15</td><td>Sales Dispatch</td><td class="ledger-negative">-${b.reserved}</td></tr>
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('modal-batch-detail-title').textContent = `Batch Details — ${b.no}`;
  document.getElementById('modal-batch-detail-body').innerHTML = html;
  openModal('modal-batch-detail');
}

// ============================================================
// RENDER SERIAL TABLE
// ============================================================

function renderSerialTable() {
  const tbody = document.getElementById('serial-table-body');
  if (!tbody) return;
  tbody.innerHTML = SERIAL_DATA.map(s => `
    <tr>
      <td class="product-code">${s.serial}</td>
      <td class="product-name">${s.product}</td>
      <td class="muted">${s.category}</td>
      <td class="muted">${s.warehouse}</td>
      <td class="muted">${s.added}</td>
      <td>${serialStatusBadge(s.status)}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" title="View Details" onclick="viewSerialDetail('${s.serial}')"><i class="fas fa-eye"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function viewSerialDetail(serial) {
  const s = SERIAL_DATA.find(x => x.serial === serial);
  if (!s) return;
  const html = `
    <div class="info-grid mb-4">
      <div class="info-item"><span class="lbl">Serial Number</span><span class="val" style="font-family:monospace">${s.serial}</span></div>
      <div class="info-item"><span class="lbl">Product</span><span class="val">${s.product}</span></div>
      <div class="info-item"><span class="lbl">Category</span><span class="val">${s.category}</span></div>
      <div class="info-item"><span class="lbl">Warehouse</span><span class="val">${s.warehouse}</span></div>
      <div class="info-item"><span class="lbl">Added Date</span><span class="val">${s.added}</span></div>
      <div class="info-item"><span class="lbl">Current Status</span><span class="val">${serialStatusBadge(s.status)}</span></div>
    </div>
    <div class="card-title" style="font-size:12px;margin-bottom:10px">Transaction History</div>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Date</th><th>Transaction</th></tr></thead>
        <tbody>
          <tr><td class="muted">${s.added}</td><td>Added via Purchase GRN</td></tr>
          ${s.status === 'Sold' ? `<tr><td class="muted">2024-07-20</td><td>Sold — Sales Order SO-3150</td></tr>` : ''}
          ${s.status === 'Reserved' ? `<tr><td class="muted">2024-08-01</td><td>Reserved for SO-3187</td></tr>` : ''}
          ${s.status === 'Returned' ? `<tr><td class="muted">2024-08-05</td><td>Returned by customer — RET-0021</td></tr>` : ''}
          ${s.status === 'Damaged' ? `<tr><td class="muted">2024-08-10</td><td>Marked Damaged — ADJ-0042</td></tr>` : ''}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('modal-serial-detail-title').textContent = `Serial — ${s.serial}`;
  document.getElementById('modal-serial-detail-body').innerHTML = html;
  openModal('modal-serial-detail');
}

// ============================================================
// RENDER TRANSFER TABLE
// ============================================================

function renderTransferTable() {
  const tbody = document.getElementById('transfer-table-body');
  if (!tbody) return;
  tbody.innerHTML = TRANSFER_DATA.map(t => `
    <tr>
      <td class="product-code">${t.no}</td>
      <td class="muted">${t.date}</td>
      <td>${t.from}</td>
      <td>${t.to}</td>
      <td class="muted">${t.items}</td>
      <td><strong>${t.qty}</strong></td>
      <td>${transferStatusBadge(t.status)}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn" title="View" onclick="viewTransferDetail('${t.no}')"><i class="fas fa-eye"></i></button>
          ${t.status === 'Submitted' ? `<button class="tbl-btn" title="Approve" onclick="showToast('Transfer ${t.no} approved','success')"><i class="fas fa-check"></i></button>` : ''}
        </div>
      </td>
    </tr>
  `).join('');
}

function viewTransferDetail(no) {
  const t = TRANSFER_DATA.find(x => x.no === no);
  if (!t) return;
  const steps = ['Draft', 'Submitted', 'Approved', 'Transferred'];
  const currentStep = steps.indexOf(t.status);
  const workflowHtml = steps.map((s, i) => `
    <div class="w-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}">
      <div class="w-step-circle">${i < currentStep ? '<i class="fas fa-check" style="font-size:8px"></i>' : (i + 1)}</div>
      <span class="w-label">${s}</span>
    </div>
    ${i < steps.length - 1 ? `<div class="w-connector ${i < currentStep ? 'done' : ''}"></div>` : ''}
  `).join('');

  const html = `
    <div class="info-grid mb-4">
      <div class="info-item"><span class="lbl">Transfer No</span><span class="val" style="font-family:monospace">${t.no}</span></div>
      <div class="info-item"><span class="lbl">Date</span><span class="val">${t.date}</span></div>
      <div class="info-item"><span class="lbl">From</span><span class="val">${t.from}</span></div>
      <div class="info-item"><span class="lbl">To</span><span class="val">${t.to}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${transferStatusBadge(t.status)}</span></div>
    </div>
    <div class="mb-4">
      <div class="card-title" style="font-size:12px;margin-bottom:10px">Transfer Workflow</div>
      <div class="workflow-steps">${workflowHtml}</div>
    </div>
    <div class="card-title" style="font-size:12px;margin-bottom:10px">Product Details</div>
    <div class="table-wrap">
      <table class="data-table">
        <thead><tr><th>Product</th><th>Quantity</th></tr></thead>
        <tbody>
          <tr><td>Steel Pipes (25mm)</td><td><strong>${Math.round(t.qty / 2)}</strong> pcs</td></tr>
          <tr><td>Industrial Bearings</td><td><strong>${t.qty - Math.round(t.qty / 2)}</strong> pcs</td></tr>
        </tbody>
      </table>
    </div>
  `;
  document.getElementById('modal-transfer-detail-title').textContent = `Transfer — ${t.no}`;
  document.getElementById('modal-transfer-detail-body').innerHTML = html;
  openModal('modal-transfer-detail');
}

// ============================================================
// RENDER INVENTORY CONTROL
// ============================================================

function renderAvailableStock() {
  const tbody = document.getElementById('available-stock-body');
  if (!tbody) return;
  tbody.innerHTML = STOCK_DATA.filter(r => r.available > 0).map(r => `
    <tr>
      <td class="product-code">${r.code}</td>
      <td class="product-name">${r.name}</td>
      <td class="muted">${r.category}</td>
      <td class="muted">${r.warehouse}</td>
      <td><strong style="color:#10b981">${r.available}</strong></td>
      <td class="muted">${Math.max(0, r.available - 10)}</td>
      <td class="muted">${r.unit}</td>
    </tr>
  `).join('');
}

function renderReservedStock() {
  const tbody = document.getElementById('reserved-stock-body');
  if (!tbody) return;
  tbody.innerHTML = STOCK_DATA.filter(r => r.reserved > 0).map(r => `
    <tr>
      <td class="product-code">${r.code}</td>
      <td class="product-name">${r.name}</td>
      <td class="muted">${r.warehouse}</td>
      <td><strong style="color:#4338ca">${r.reserved}</strong></td>
      <td class="product-code">SO-${3100 + Math.floor(Math.random() * 100)}</td>
      <td><span class="badge badge-info">Sales Order</span></td>
    </tr>
  `).join('');
}

function renderDamagedStock() {
  const tbody = document.getElementById('damaged-stock-body');
  if (!tbody) return;
  const reasons = ['Broken', 'Expired', 'Defective', 'Water Damaged'];
  tbody.innerHTML = STOCK_DATA.filter(r => r.damaged > 0).map((r, i) => `
    <tr>
      <td class="product-code">${r.code}</td>
      <td class="product-name">${r.name}</td>
      <td class="muted">${r.warehouse}</td>
      <td><strong style="color:#ef4444">${r.damaged}</strong></td>
      <td><span class="badge badge-danger">${reasons[i % reasons.length]}</span></td>
      <td class="muted">2024-08-${10 + i}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn danger" title="Write Off" onclick="showToast('Marked for scrap','warning')"><i class="fas fa-trash-can"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

// ============================================================
// RENDER MOVEMENT HISTORY
// ============================================================

function renderMovementHistory() {
  const tbody = document.getElementById('movement-history-body');
  if (!tbody) return;
  tbody.innerHTML = MOVEMENT_DATA.map(m => `
    <tr>
      <td class="muted">${m.date}</td>
      <td class="product-name">${m.product}</td>
      <td class="muted">${m.warehouse}</td>
      <td>
        <span class="badge ${m.type === 'Purchase GRN' ? 'badge-success' : m.type === 'Sales Dispatch' ? 'badge-info' : m.type === 'Return' ? 'badge-warning' : 'badge-neutral'}">
          ${m.type}
        </span>
      </td>
      <td style="color:${m.qty.startsWith('+') ? '#10b981' : '#ef4444'};font-weight:600">${m.qty}</td>
      <td class="product-code">${m.ref}</td>
    </tr>
  `).join('');
}

function renderLedger() {
  const tbody = document.getElementById('ledger-body');
  if (!tbody) return;
  tbody.innerHTML = LEDGER_DATA.map(l => `
    <tr>
      <td class="muted">${l.date}</td>
      <td>${l.txn}</td>
      <td class="muted">${l.opening}</td>
      <td class="${l.inward > 0 ? 'ledger-positive' : 'muted'}">${l.inward > 0 ? '+' + l.inward : '—'}</td>
      <td class="${l.outward > 0 ? 'ledger-negative' : 'muted'}">${l.outward > 0 ? '-' + l.outward : '—'}</td>
      <td><strong>${l.closing}</strong></td>
      <td class="product-code">${l.ref}</td>
    </tr>
  `).join('');
}

// ============================================================
// SORT TABLE
// ============================================================

function sortTable(tableId, colIndex) {
  // Simple toggle sort for stock table
  currentStockData.sort((a, b) => {
    const fields = ['code', 'name', 'category', 'warehouse', 'available', 'reserved', 'damaged', 'reorder'];
    const key = fields[colIndex];
    if (!key) return 0;
    return typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key];
  });
  renderStockTable();
}

// ============================================================
// DYNAMIC PRODUCT ROWS
// ============================================================

const PRODUCT_OPTIONS = STOCK_DATA.map(r => `<option value="${r.code}">${r.name}</option>`).join('');

function addAdjProductRow() {
  const tbody = document.getElementById('adj-product-rows');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><select class="form-control"><option value="">Select product</option>${PRODUCT_OPTIONS}</select></td>
    <td><input type="number" class="form-control" placeholder="—" readonly /></td>
    <td><input type="number" class="form-control" placeholder="0" min="0" /></td>
    <td><select class="form-control"><option value="">Select reason</option><option>Physical Count Difference</option><option>Damaged Goods</option><option>Lost Items</option><option>Correction</option></select></td>
    <td><button class="remove-row-btn" onclick="removeProductRow(this)"><i class="fas fa-xmark"></i></button></td>
  `;
  tbody.appendChild(tr);
}

function addTransferProductRow() {
  const tbody = document.getElementById('transfer-product-rows');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><select class="form-control"><option value="">Select product</option>${PRODUCT_OPTIONS}</select></td>
    <td><input type="number" class="form-control" placeholder="—" readonly /></td>
    <td><input type="number" class="form-control" placeholder="0" min="0" /></td>
    <td><button class="remove-row-btn" onclick="removeProductRow(this)"><i class="fas fa-xmark"></i></button></td>
  `;
  tbody.appendChild(tr);
}

function removeProductRow(btn) {
  const row = btn.closest('tr');
  const tbody = row.parentElement;
  if (tbody.children.length > 1) row.remove();
  else showToast('At least one product row is required', 'warning');
}

// ============================================================
// INIT DATE FIELDS
// ============================================================

function initDateFields() {
  const today = new Date().toISOString().split('T')[0];
  const adjDate = document.getElementById('adj-date');
  if (adjDate) adjDate.value = today;
}

// ============================================================
// CHARTS
// ============================================================

function initCharts() {
  const navy = '#111844';
  const slate = '#4B5694';
  const lavender = '#7288AE';
  const cream = '#FAFAFA';
  const gridColor = 'rgba(75, 86, 148, 0.12)';
  const fontColor = '#7288AE';

  Chart.defaults.font.family = "'Roboto', sans-serif";
  Chart.defaults.font.size = 11;

  // Movement Trend
  const ctxMove = document.getElementById('chartMovement');
  if (ctxMove) {
    new Chart(ctxMove, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          { label: 'Inward', data: [120, 95, 130, 110, 142, 80, 60], backgroundColor: '#10b981', borderRadius: 5, maxBarThickness: 22 },
          { label: 'Outward', data: [90, 100, 85, 105, 97, 70, 55], backgroundColor: '#f59e0b', borderRadius: 5, maxBarThickness: 22 }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } } },
        scales: {
          x: { grid: { display: false }, ticks: { color: fontColor } },
          y: { grid: { color: gridColor }, ticks: { color: fontColor } }
        }
      }
    });
  }

  // Inventory Value Trend
  const ctxVal = document.getElementById('chartValue');
  if (ctxVal) {
    new Chart(ctxVal, {
      type: 'line',
      data: {
        labels: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Value (₹ Lakhs)',
          data: [14.2, 15.8, 16.5, 17.0, 17.8, 18.4],
          borderColor: navy,
          backgroundColor: 'rgba(17,24,68,0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: navy,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { color: fontColor } },
          y: { grid: { color: gridColor }, ticks: { color: fontColor } }
        }
      }
    });
  }

  // Top Moving Products
  const ctxTop = document.getElementById('chartTopProducts');
  if (ctxTop) {
    new Chart(ctxTop, {
      type: 'bar',
      data: {
        labels: ['Steel Pipes', 'Hex Bolts M10', 'SS Bolts M8', 'PVC Pipes', 'MS Flat Bar'],
        datasets: [{
          label: 'Units Moved',
          data: [320, 280, 240, 200, 180],
          backgroundColor: [navy, slate, lavender, '#a78bfa', '#f0c987'],
          borderRadius: 6,
          maxBarThickness: 32
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: gridColor }, ticks: { color: fontColor } },
          y: { grid: { display: false }, ticks: { color: fontColor } }
        }
      }
    });
  }

  // Warehouse Distribution
  const ctxWH = document.getElementById('chartWarehouse');
  if (ctxWH) {
    new Chart(ctxWH, {
      type: 'doughnut',
      data: {
        labels: ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'],
        datasets: [{
          data: [3800, 3200, 2900, 2580],
          backgroundColor: [navy, slate, lavender, '#a78bfa'],
          borderColor: cream,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        cutout: '62%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' }
          }
        }
      }
    });
  }
}

// ============================================================
// INITIALISE
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  initDateFields();
  renderStockTable();
  renderBatchTable();
  renderSerialTable();
  renderTransferTable();
  renderAvailableStock();
  renderReservedStock();
  renderDamagedStock();
  renderMovementHistory();
  renderLedger();
  initCharts();
});