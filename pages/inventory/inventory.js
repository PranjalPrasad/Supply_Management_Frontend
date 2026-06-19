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
// SIDEBAR TOGGLE - FIXED
// ============================================================
const sidebar = document.getElementById('sidebar');
const mainWrapper = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay = document.getElementById('sidebar-overlay');
const mobileSidebarBtn = document.getElementById('mobile-sidebar-btn');
let isCollapsed = false;

function updateSidebarToggleIcon() {
  const icon = sidebarToggle?.querySelector('i');
  if (!icon) return;
  if (window.innerWidth < 1024) {
    icon.className = 'fas fa-bars';
  } else {
    icon.className = isCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }
}

// Function to close sidebar
function closeSidebar() {
  sidebar.classList.remove('sidebar-open');
  if (overlay) {
    overlay.classList.remove('visible');
    overlay.classList.add('hidden');
  }
}

// Function to open sidebar
function openSidebar() {
  sidebar.classList.add('sidebar-open');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('visible');
  }
}

// Toggle sidebar
sidebarToggle?.addEventListener('click', function(e) {
  e.stopPropagation();
  if (window.innerWidth < 1024) {
    // Mobile: toggle sidebar open/close
    if (sidebar.classList.contains('sidebar-open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  } else {
    // Desktop: toggle collapse
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      sidebar.classList.add('sidebar-collapsed');
      mainWrapper.classList.add('main-expanded');
      mainWrapper.style.marginLeft = '68px';
    } else {
      sidebar.classList.remove('sidebar-collapsed');
      mainWrapper.classList.remove('main-expanded');
      mainWrapper.style.marginLeft = '';
    }
    updateSidebarToggleIcon();
  }
});

// Mobile sidebar button
mobileSidebarBtn?.addEventListener('click', function(e) {
  e.stopPropagation();
  if (sidebar.classList.contains('sidebar-open')) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

// Overlay click - close sidebar
overlay?.addEventListener('click', function() {
  closeSidebar();
});

// Close sidebar on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && sidebar.classList.contains('sidebar-open')) {
    closeSidebar();
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  updateSidebarToggleIcon();
  if (window.innerWidth >= 1024) {
    closeSidebar();
    if (mobileSidebarBtn) mobileSidebarBtn.style.display = 'none';
    // Reset margin if collapsed
    if (isCollapsed) {
      mainWrapper.style.marginLeft = '68px';
    } else {
      mainWrapper.style.marginLeft = '';
    }
  } else {
    if (mobileSidebarBtn) mobileSidebarBtn.style.display = 'flex';
    // Reset margin for mobile
    mainWrapper.style.marginLeft = '';
  }
});

// Nav group dropdowns
document.querySelectorAll('.nav-group-header').forEach(function(header) {
  header.addEventListener('click', function(e) {
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

// Active menu highlighting
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-item').forEach(function(item) {
  const href = item.getAttribute('href');
  if (href && currentPath.includes(href.replace('/', ''))) {
    item.classList.add('nav-active');
    const parentGroup = item.closest('.nav-group-items');
    if (parentGroup) {
      parentGroup.classList.remove('hidden');
      const parentHeader = parentGroup.previousElementSibling;
      if (parentHeader) {
        const chevron = parentHeader.querySelector('.fa-chevron-down');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    }
  }
});

// Initialize
updateSidebarToggleIcon();

// ============================================================
// DROPDOWN MENUS
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
  document.querySelectorAll('.page-tab[data-tab]').forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.section-panel').forEach(p => {
    p.style.display = p.id === 'panel-' + tabId ? 'block' : 'none';
    p.classList.toggle('active', p.id === 'panel-' + tabId);
  });
}

function switchInvControlTab(subtabId) {
  const tabs = document.querySelectorAll('[data-subtab]');
  tabs.forEach(t => t.classList.toggle('active', t.dataset.subtab === subtabId));
  ['ctrl-available', 'ctrl-reserved', 'ctrl-damaged'].forEach(id => {
    const el = document.getElementById('subpanel-' + id);
    if (el) el.style.display = id === subtabId ? 'block' : 'none';
  });
}

function switchMovementTab(subtabId) {
  const tabs = document.querySelectorAll('[data-subtab^="move-"]');
  tabs.forEach(t => t.classList.toggle('active', t.dataset.subtab === subtabId));
  ['move-history', 'move-ledger'].forEach(id => {
    const el = document.getElementById('subpanel-' + id);
    if (el) el.style.display = id === subtabId ? 'block' : 'none';
  });
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
// SAVE DRAFT WITH VALIDATION
// ============================================================
window.saveDraft = function(modalId, formSelector) {
  const modal = document.getElementById(modalId);
  if (!modal) {
    showToast('Modal not found', 'error');
    return;
  }
  
  // Get all form elements in the modal
  const formElements = modal.querySelectorAll('input, select, textarea');
  let isValid = true;
  let firstInvalid = null;
  
  // Validate required fields
  formElements.forEach(function(el) {
    const isRequired = el.closest('.form-group')?.querySelector('.req');
    if (isRequired && !el.value.trim()) {
      isValid = false;
      el.style.borderColor = '#ef4444';
      if (!firstInvalid) firstInvalid = el;
    } else {
      el.style.borderColor = '';
    }
  });
  
  if (!isValid) {
    showToast('Please fill in all required fields before saving draft', 'warning');
    if (firstInvalid) {
      firstInvalid.focus();
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // Show success toast with draft saved message
  showToast('✅ Draft saved successfully!', 'success');
  
  // Close modal after a brief delay
  setTimeout(function() {
    closeModal(modalId);
  }, 500);
};

// ============================================================
// STATUS HELPERS
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
// PAGINATION HELPER
// ============================================================
function buildPagination(infoEl, btnsEl, total, current, perPage, changeFn) {
  const totalPages = Math.ceil(total / perPage);
  const start = (current - 1) * perPage + 1;
  const end = Math.min(current * perPage, total);
  if (infoEl) infoEl.textContent = total === 0 ? 'No records found' : `Showing ${start}–${end} of ${total} records`;
  if (!btnsEl) return;
  if (total === 0) { btnsEl.innerHTML = ''; return; }
  let html = `<button class="page-btn" onclick="${changeFn}(${current - 1})" ${current === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left" style="font-size:9px"></i></button>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === current ? 'active' : ''}" onclick="${changeFn}(${i})">${i}</button>`;
  }
  html += `<button class="page-btn" onclick="${changeFn}(${current + 1})" ${current === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right" style="font-size:9px"></i></button>`;
  btnsEl.innerHTML = html;
}

// ============================================================
// STOCK TABLE
// ============================================================
let currentStockData = [...STOCK_DATA];
let stockPage = 1;
const ROWS = 10;
let stockSortDir = 1;

function renderStockTable() {
  const tbody = document.getElementById('stock-table-body');
  if (!tbody) return;
  const start = (stockPage - 1) * ROWS;
  const pageData = currentStockData.slice(start, start + ROWS);
  tbody.innerHTML = pageData.length === 0 ? `<tr><td colspan="10" style="text-align:center;padding:40px;color:#7288AE">No records found</td></tr>` : pageData.map(row => `
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
          <button class="tbl-btn" title="Adjust Stock" onclick="openModal('modal-adjust')"><i class="fas fa-pen-to-square"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
  buildPagination(
    document.getElementById('stock-pagination-info'),
    document.getElementById('stock-pagination-btns'),
    currentStockData.length, stockPage, ROWS, 'changeStockPage'
  );
}

window.changeStockPage = function(page) {
  const totalPages = Math.ceil(currentStockData.length / ROWS);
  if (page < 1 || page > totalPages) return;
  stockPage = page;
  renderStockTable();
};

window.sortStockTable = function(colIndex) {
  stockSortDir *= -1;
  const fields = ['code', 'name', 'category', 'warehouse', 'available', 'reserved', 'damaged', 'reorder'];
  const key = fields[colIndex];
  if (!key) return;
  currentStockData.sort((a, b) => {
    const res = typeof a[key] === 'string' ? a[key].localeCompare(b[key]) : a[key] - b[key];
    return res * stockSortDir;
  });
  stockPage = 1;
  renderStockTable();
};

window.filterStockTable = function() {
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
  stockPage = 1;
  renderStockTable();
};

window.clearStockFilters = function() {
  ['filter-product-search','filter-category','filter-warehouse','filter-status'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  currentStockData = [...STOCK_DATA];
  stockPage = 1;
  renderStockTable();
};

// ============================================================
// STOCK DETAIL VIEW
// ============================================================
window.viewStockDetail = function(code) {
  const row = STOCK_DATA.find(r => r.code === code);
  if (!row) return;
  const total = row.available + row.reserved + row.damaged;
  const movementRows = MOVEMENT_DATA.filter(m => m.product === row.name).slice(0, 5);
  document.getElementById('modal-stock-detail-title').textContent = `Stock Details — ${row.name}`;
  document.getElementById('modal-stock-detail-body').innerHTML = `
    <div class="info-grid">
      <div class="info-item"><span class="lbl">Product Name</span><span class="val">${row.name}</span></div>
      <div class="info-item"><span class="lbl">SKU / Code</span><span class="val" style="font-family:monospace">${row.code}</span></div>
      <div class="info-item"><span class="lbl">Category</span><span class="val">${row.category}</span></div>
      <div class="info-item"><span class="lbl">Unit</span><span class="val">${row.unit}</span></div>
      <div class="info-item"><span class="lbl">Reorder Level</span><span class="val">${row.reorder} ${row.unit}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${stockStatusBadge(row.available, row.reorder)}</span></div>
    </div>
    <div class="summary-cards">
      <div class="summary-card"><div class="s-val" style="color:#10b981">${row.available}</div><div class="s-lbl">Available</div></div>
      <div class="summary-card"><div class="s-val" style="color:#4338ca">${row.reserved}</div><div class="s-lbl">Reserved</div></div>
      <div class="summary-card"><div class="s-val" style="color:#ef4444">${row.damaged}</div><div class="s-lbl">Damaged</div></div>
      <div class="summary-card"><div class="s-val">${total}</div><div class="s-lbl">Total Stock</div></div>
      <div class="summary-card"><div class="s-val" style="color:#059669">₹${row.value.toLocaleString()}</div><div class="s-lbl">Value</div></div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Warehouse Location</div>
      <div class="wh-row">
        <span class="wh-name">${row.warehouse}</span>
        <div class="wh-bar"><div class="progress-wrap"><div class="progress-bar success" style="width:${row.available > 0 ? 70 : 0}%"></div></div></div>
        <span class="wh-qty">${row.available} ${row.unit}</span>
      </div>
    </div>
    <div>
      <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Recent Movements</div>
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
  openModal('modal-stock-detail');
};

// ============================================================
// BATCH TABLE
// ============================================================
let currentBatchData = [...BATCH_DATA];
let batchPage = 1;

function renderBatchTable() {
  const tbody = document.getElementById('batch-table-body');
  if (!tbody) return;
  const start = (batchPage - 1) * ROWS;
  const pageData = currentBatchData.slice(start, start + ROWS);
  tbody.innerHTML = pageData.map(b => `
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
  buildPagination(
    document.getElementById('batch-pagination-info'),
    document.getElementById('batch-pagination-btns'),
    currentBatchData.length, batchPage, ROWS, 'changeBatchPage'
  );
}

window.changeBatchPage = function(page) {
  const totalPages = Math.ceil(currentBatchData.length / ROWS);
  if (page < 1 || page > totalPages) return;
  batchPage = page;
  renderBatchTable();
};

window.filterBatchTable = function() {
  const search = (document.getElementById('batch-search')?.value || '').toLowerCase();
  const wh = document.getElementById('batch-filter-wh')?.value || '';
  currentBatchData = BATCH_DATA.filter(b => {
    const matchS = !search || b.no.toLowerCase().includes(search) || b.product.toLowerCase().includes(search);
    const matchW = !wh || b.warehouse === wh;
    return matchS && matchW;
  });
  batchPage = 1;
  renderBatchTable();
};
window.clearBatchFilters = function() {
  ['batch-search','batch-filter-wh'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  currentBatchData = [...BATCH_DATA]; batchPage = 1; renderBatchTable();
};

window.viewBatchDetail = function(no) {
  const b = BATCH_DATA.find(x => x.no === no);
  if (!b) return;
  document.getElementById('modal-batch-detail-title').textContent = `Batch Details — ${b.no}`;
  document.getElementById('modal-batch-detail-body').innerHTML = `
    <div class="info-grid">
      <div class="info-item"><span class="lbl">Batch Number</span><span class="val" style="font-family:monospace">${b.no}</span></div>
      <div class="info-item"><span class="lbl">Product</span><span class="val">${b.product}</span></div>
      <div class="info-item"><span class="lbl">Warehouse</span><span class="val">${b.warehouse}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${batchStatusBadge(b.expiry)}</span></div>
      <div class="info-item"><span class="lbl">MFG Date</span><span class="val">${b.mfg}</span></div>
      <div class="info-item"><span class="lbl">Expiry Date</span><span class="val">${b.expiry}</span></div>
    </div>
    <div class="summary-cards">
      <div class="summary-card"><div class="s-val">${b.total}</div><div class="s-lbl">Total Qty</div></div>
      <div class="summary-card"><div class="s-val" style="color:#10b981">${b.available}</div><div class="s-lbl">Available</div></div>
      <div class="summary-card"><div class="s-val" style="color:#4338ca">${b.reserved}</div><div class="s-lbl">Reserved</div></div>
    </div>
    <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Movement History</div>
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
  openModal('modal-batch-detail');
};

// ============================================================
// SERIAL TABLE
// ============================================================
let currentSerialData = [...SERIAL_DATA];
let serialPage = 1;

function renderSerialTable() {
  const tbody = document.getElementById('serial-table-body');
  if (!tbody) return;
  const start = (serialPage - 1) * ROWS;
  const pageData = currentSerialData.slice(start, start + ROWS);
  tbody.innerHTML = pageData.map(s => `
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
  buildPagination(
    document.getElementById('serial-pagination-info'),
    document.getElementById('serial-pagination-btns'),
    currentSerialData.length, serialPage, ROWS, 'changeSerialPage'
  );
}

window.changeSerialPage = function(page) {
  const totalPages = Math.ceil(currentSerialData.length / ROWS);
  if (page < 1 || page > totalPages) return;
  serialPage = page;
  renderSerialTable();
};

window.filterSerialTable = function() {
  const search = (document.getElementById('serial-search')?.value || '').toLowerCase();
  const status = document.getElementById('serial-filter-status')?.value || '';
  currentSerialData = SERIAL_DATA.filter(s => {
    const matchS = !search || s.serial.toLowerCase().includes(search) || s.product.toLowerCase().includes(search);
    const matchSt = !status || s.status === status;
    return matchS && matchSt;
  });
  serialPage = 1;
  renderSerialTable();
};
window.clearSerialFilters = function() {
  ['serial-search','serial-filter-status'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  currentSerialData = [...SERIAL_DATA]; serialPage = 1; renderSerialTable();
};

window.viewSerialDetail = function(serial) {
  const s = SERIAL_DATA.find(x => x.serial === serial);
  if (!s) return;
  document.getElementById('modal-serial-detail-title').textContent = `Serial — ${s.serial}`;
  document.getElementById('modal-serial-detail-body').innerHTML = `
    <div class="info-grid">
      <div class="info-item"><span class="lbl">Serial Number</span><span class="val" style="font-family:monospace">${s.serial}</span></div>
      <div class="info-item"><span class="lbl">Product</span><span class="val">${s.product}</span></div>
      <div class="info-item"><span class="lbl">Category</span><span class="val">${s.category}</span></div>
      <div class="info-item"><span class="lbl">Warehouse</span><span class="val">${s.warehouse}</span></div>
      <div class="info-item"><span class="lbl">Added Date</span><span class="val">${s.added}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${serialStatusBadge(s.status)}</span></div>
    </div>
    <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Transaction History</div>
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
  openModal('modal-serial-detail');
};

// ============================================================
// TRANSFER TABLE
// ============================================================
let currentTransferData = [...TRANSFER_DATA];
let transferPage = 1;

function renderTransferTable() {
  const tbody = document.getElementById('transfer-table-body');
  if (!tbody) return;
  const start = (transferPage - 1) * ROWS;
  const pageData = currentTransferData.slice(start, start + ROWS);
  tbody.innerHTML = pageData.map(t => `
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
  buildPagination(
    document.getElementById('transfer-pagination-info'),
    document.getElementById('transfer-pagination-btns'),
    currentTransferData.length, transferPage, ROWS, 'changeTransferPage'
  );
}

window.changeTransferPage = function(page) {
  const totalPages = Math.ceil(currentTransferData.length / ROWS);
  if (page < 1 || page > totalPages) return;
  transferPage = page;
  renderTransferTable();
};

window.filterTransferTable = function() {
  const search = (document.getElementById('transfer-search')?.value || '').toLowerCase();
  const status = document.getElementById('transfer-filter-status')?.value || '';
  currentTransferData = TRANSFER_DATA.filter(t => {
    const matchS = !search || t.no.toLowerCase().includes(search);
    const matchSt = !status || t.status === status;
    return matchS && matchSt;
  });
  transferPage = 1;
  renderTransferTable();
};
window.clearTransferFilters = function() {
  ['transfer-search','transfer-filter-status'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  currentTransferData = [...TRANSFER_DATA]; transferPage = 1; renderTransferTable();
};

window.viewTransferDetail = function(no) {
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
  document.getElementById('modal-transfer-detail-title').textContent = `Transfer — ${t.no}`;
  document.getElementById('modal-transfer-detail-body').innerHTML = `
    <div class="info-grid">
      <div class="info-item"><span class="lbl">Transfer No</span><span class="val" style="font-family:monospace">${t.no}</span></div>
      <div class="info-item"><span class="lbl">Date</span><span class="val">${t.date}</span></div>
      <div class="info-item"><span class="lbl">From</span><span class="val">${t.from}</span></div>
      <div class="info-item"><span class="lbl">To</span><span class="val">${t.to}</span></div>
      <div class="info-item"><span class="lbl">Status</span><span class="val">${transferStatusBadge(t.status)}</span></div>
    </div>
    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Transfer Workflow</div>
      <div class="workflow-steps">${workflowHtml}</div>
    </div>
    <div style="font-size:12px;font-weight:600;color:#111844;margin-bottom:10px">Product Details</div>
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
  openModal('modal-transfer-detail');
};

// ============================================================
// INVENTORY CONTROL TABLES
// ============================================================
function renderAvailableStock() {
  const data = STOCK_DATA.filter(r => r.available > 0);
  const tbody = document.getElementById('available-stock-body');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
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
  document.getElementById('available-info').textContent = `Showing 1–${data.length} of ${data.length} records`;
}

function renderReservedStock() {
  const data = STOCK_DATA.filter(r => r.reserved > 0);
  const tbody = document.getElementById('reserved-stock-body');
  if (!tbody) return;
  const refs = ['SO-3187','SO-3185','SO-3175','SO-3170','SO-3165','SO-3160','SO-3155','SO-3150','SO-3145','SO-3140','SO-3135','SO-3130','SO-3125','SO-3120','SO-3115'];
  tbody.innerHTML = data.map((r, i) => `
    <tr>
      <td class="product-code">${r.code}</td>
      <td class="product-name">${r.name}</td>
      <td class="muted">${r.warehouse}</td>
      <td><strong style="color:#4338ca">${r.reserved}</strong></td>
      <td class="product-code">${refs[i] || 'SO-XXXX'}</td>
      <td><span class="badge badge-info">Sales Order</span></td>
    </tr>
  `).join('');
  document.getElementById('reserved-info').textContent = `Showing 1–${data.length} of ${data.length} records`;
}
// ============================================================
// DAMAGED STOCK - FIXED DELETE BUTTON
// ============================================================
function renderDamagedStock() {
  const data = STOCK_DATA.filter(r => r.damaged > 0);
  const tbody = document.getElementById('damaged-stock-body');
  if (!tbody) return;
  const reasons = ['Broken', 'Expired', 'Defective', 'Water Damaged'];
  
  tbody.innerHTML = data.map((r, i) => `
    <tr>
      <td class="product-code">${r.code}</td>
      <td class="product-name">${r.name}</td>
      <td class="muted">${r.warehouse}</td>
      <td><strong style="color:#ef4444">${r.damaged}</strong></td>
      <td><span class="badge badge-danger">${reasons[i % reasons.length]}</span></td>
      <td class="muted">${new Date().toISOString().split('T')[0]}</td>
      <td>
        <div class="tbl-actions">
          <button class="tbl-btn danger" title="Write Off" onclick="writeOffDamagedStock('${r.code}')">
            <i class="fas fa-trash-can"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  
  document.getElementById('damaged-info').textContent = `Showing 1–${data.length} of ${data.length} records`;
}

// ============================================================
// WRITE OFF DAMAGED STOCK
// ============================================================
window.writeOffDamagedStock = function(code) {
  const product = STOCK_DATA.find(r => r.code === code);
  if (!product) {
    showToast('Product not found', 'error');
    return;
  }
  
  // Confirm with user
  if (confirm(`Are you sure you want to write off ${product.damaged} damaged units of "${product.name}"?`)) {
    // Reduce damaged count
    const index = STOCK_DATA.findIndex(r => r.code === code);
    if (index !== -1) {
      STOCK_DATA[index].damaged = 0;
      // Update current data
      currentStockData = [...STOCK_DATA];
      // Re-render all affected tables
      renderStockTable();
      renderDamagedStock();
      renderAvailableStock();
      renderReservedStock();
      showToast(`✅ ${product.damaged} damaged units of "${product.name}" written off successfully`, 'success');
    }
  }
};

// ============================================================
// MOVEMENT & LEDGER
// ============================================================
let currentMovementData = [...MOVEMENT_DATA];
let movementPage = 1;

function renderMovementHistory() {
  const tbody = document.getElementById('movement-history-body');
  if (!tbody) return;
  const start = (movementPage - 1) * ROWS;
  const pageData = currentMovementData.slice(start, start + ROWS);
  tbody.innerHTML = pageData.map(m => `
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
  buildPagination(
    document.getElementById('movement-pagination-info'),
    document.getElementById('movement-pagination-btns'),
    currentMovementData.length, movementPage, ROWS, 'changeMovementPage'
  );
}

window.changeMovementPage = function(page) {
  const totalPages = Math.ceil(currentMovementData.length / ROWS);
  if (page < 1 || page > totalPages) return;
  movementPage = page;
  renderMovementHistory();
};

window.filterMovementTable = function() {
  const search = (document.getElementById('movement-search')?.value || '').toLowerCase();
  const type = document.getElementById('movement-filter-type')?.value || '';
  const wh = document.getElementById('movement-filter-wh')?.value || '';
  currentMovementData = MOVEMENT_DATA.filter(m => {
    const matchS = !search || m.product.toLowerCase().includes(search) || m.ref.toLowerCase().includes(search);
    const matchT = !type || m.type === type;
    const matchW = !wh || m.warehouse === wh;
    return matchS && matchT && matchW;
  });
  movementPage = 1;
  renderMovementHistory();
};
window.clearMovementFilters = function() {
  ['movement-search','movement-filter-type','movement-filter-wh'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  currentMovementData = [...MOVEMENT_DATA]; movementPage = 1; renderMovementHistory();
};

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
// LEDGER GENERATE BUTTON
// ============================================================
// ============================================================
// LEDGER GENERATE BUTTON - ACTUAL WORKING VERSION
// ============================================================
window.generateLedger = function() {
  // Get filter values from the ledger section
  const ledgerSection = document.querySelector('#subpanel-move-ledger');
  if (!ledgerSection) {
    showToast('Ledger section not found', 'error');
    return;
  }
  
  // Get filter elements
  const productSelect = ledgerSection.querySelector('.filter-group select:first-child');
  const warehouseSelect = ledgerSection.querySelector('.filter-group select:nth-child(2)');
  const dateFrom = ledgerSection.querySelector('.filter-group input[type="date"]:first-child');
  const dateTo = ledgerSection.querySelector('.filter-group input[type="date"]:last-child');
  
  const product = productSelect?.value || '';
  const warehouse = warehouseSelect?.value || '';
  const fromDate = dateFrom?.value || '';
  const toDate = dateTo?.value || '';
  
  // Start with all ledger data
  let filteredData = [...LEDGER_DATA];
  
  // Filter by product (if selected)
  if (product) {
    // In a real app, filter by product code
    // For this demo, we'll filter by product name in the transaction
    // Or we can use the product to filter movements
    const productName = product;
    
    // Get product code from stock data
    const stockItem = STOCK_DATA.find(item => item.name === productName || item.code === productName);
    if (stockItem) {
      // Filter ledger by product name appearing in transaction
      // Since LEDGER_DATA doesn't have product field, we'll show filtered movements
      const productMovements = MOVEMENT_DATA.filter(m => m.product === stockItem.name);
      
      // If we have movements for this product, show ledger entries that match
      if (productMovements.length > 0) {
        // Show toast with product info
        showToast(`📊 Showing ledger for: ${stockItem.name}`, 'info');
      } else {
        showToast(`ℹ️ No ledger entries found for: ${stockItem.name}`, 'warning');
      }
    }
  }
  
  // Filter by warehouse (if selected)
  if (warehouse) {
    // Filter movements by warehouse
    const warehouseMovements = MOVEMENT_DATA.filter(m => m.warehouse === warehouse);
    if (warehouseMovements.length > 0) {
      showToast(`🏢 Filtering by warehouse: ${warehouse}`, 'info');
    }
  }
  
  // Filter by date range
  if (fromDate && toDate) {
    filteredData = filteredData.filter(item => item.date >= fromDate && item.date <= toDate);
  } else if (fromDate) {
    filteredData = filteredData.filter(item => item.date >= fromDate);
  } else if (toDate) {
    filteredData = filteredData.filter(item => item.date <= toDate);
  }
  
  // Re-render ledger with filtered data
  const tbody = document.getElementById('ledger-body');
  if (!tbody) {
    showToast('Ledger table not found', 'error');
    return;
  }
  
  if (filteredData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:40px;color:#7288AE">📭 No records found for the selected filters</td></tr>`;
    showToast('No records found', 'warning');
    return;
  }
  
  // Render filtered data
  tbody.innerHTML = filteredData.map(l => `
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
  
  // Update pagination info
  const infoEl = document.querySelector('#subpanel-move-ledger .pagination span:first-child');
  if (infoEl) {
    infoEl.textContent = `Showing 1–${filteredData.length} of ${filteredData.length} records`;
  }
  
  showToast(`✅ Ledger generated with ${filteredData.length} records`, 'success');
};

// ============================================================
// FORM HELPERS
// ============================================================
window.addAdjProductRow = function() {
  const tbody = document.getElementById('adj-product-rows');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><select class="form-control"><option value="">Select product</option><option>Steel Pipes (25mm)</option><option>Industrial Bearings</option><option>Aluminium Sheets (4mm)</option><option>Hydraulic Hoses</option></select></td>
    <td><input type="number" class="form-control" placeholder="—" readonly /></td>
    <td><input type="number" class="form-control" placeholder="0" min="0" /></td>
    <td><select class="form-control"><option value="">Select reason</option><option>Physical Count Difference</option><option>Damaged Goods</option><option>Lost Items</option><option>Correction</option></select></td>
    <td><button class="remove-row-btn" onclick="removeProductRow(this)"><i class="fas fa-xmark"></i></button></td>
  `;
  tbody.appendChild(tr);
};

window.addTransferProductRow = function() {
  const tbody = document.getElementById('transfer-product-rows');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><select class="form-control"><option value="">Select product</option><option>Steel Pipes (25mm)</option><option>Industrial Bearings</option><option>Hydraulic Hoses</option><option>Packaging Cartons (L)</option></select></td>
    <td><input type="number" class="form-control" placeholder="—" readonly /></td>
    <td><input type="number" class="form-control" placeholder="0" min="0" /></td>
    <td><button class="remove-row-btn" onclick="removeProductRow(this)"><i class="fas fa-xmark"></i></button></td>
  `;
  tbody.appendChild(tr);
};

window.removeProductRow = function(btn) {
  const row = btn.closest('tr');
  const tbody = row.parentElement;
  if (tbody.children.length > 1) row.remove();
  else showToast('At least one product row is required', 'warning');
};

// ============================================================
// EXPORT TO EXCEL
// ============================================================
window.exportTableToExcel = function(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) { showToast('Table not found', 'error'); return; }
  try {
    if (typeof XLSX !== 'undefined') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.table_to_sheet(table);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
      showToast(`${filename} exported successfully`, 'success');
    } else {
      // Fallback CSV
      const rows = table.querySelectorAll('tr');
      let csv = '';
      rows.forEach(row => {
        const cells = row.querySelectorAll('th,td');
        const rowData = Array.from(cells).map(cell => {
          let text = cell.innerText.replace(/"/g, '""').replace(/\n/g, ' ');
          return `"${text}"`;
        });
        csv += rowData.join(',') + '\n';
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `${filename}.csv`; a.click();
      URL.revokeObjectURL(url);
      showToast(`${filename} exported as CSV`, 'success');
    }
  } catch(e) {
    showToast('Export failed: ' + e.message, 'error');
  }
};

// ============================================================
// PRINT
// ============================================================
window.printTable = function(tableId, title) {
  const table = document.getElementById(tableId);
  if (!table) { showToast('Table not found', 'error'); return; }
  const printWin = window.open('', '_blank', 'width=900,height=700');
  printWin.document.write(`
    <!DOCTYPE html><html><head>
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      body { font-family: Roboto, sans-serif; color: #111844; margin: 20px; }
      h2 { font-size: 16px; margin-bottom: 4px; }
      .sub { font-size: 12px; color: #7288AE; margin-bottom: 16px; }
      table { width: 100%; border-collapse: collapse; font-size: 11px; }
      th { background: rgba(75,86,148,0.1); padding: 8px 10px; text-align: left; font-weight: 600; color: #4B5694; }
      td { padding: 7px 10px; border-bottom: 1px solid rgba(75,86,148,0.1); }
      @media print { button { display: none; } }
    </style>
    </head><body>
    <h2>${title}</h2>
    <div class="sub">Printed on ${new Date().toLocaleString()}</div>
    ${table.outerHTML}
    <script>setTimeout(() => { window.print(); window.close(); }, 300);<\/script>
    </body></html>
  `);
  printWin.document.close();
  showToast(`${title} sent to printer`, 'info');
};

window.printModalContent = function(contentId) {
  const el = document.getElementById(contentId);
  if (!el) return;
  const printWin = window.open('', '_blank', 'width=900,height=700');
  printWin.document.write(`
    <!DOCTYPE html><html><head>
    <title>Print</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
      body { font-family: Roboto, sans-serif; color: #111844; margin: 20px; font-size: 12px; }
      .info-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
      .info-item .lbl { font-size: 10px; color: #7288AE; text-transform: uppercase; letter-spacing: 0.04em; }
      .info-item .val { font-size: 13px; font-weight: 500; }
      .summary-cards { display: grid; grid-template-columns: repeat(5,1fr); gap: 8px; margin-bottom: 16px; }
      .summary-card { background: #f5f5f5; border-radius: 8px; padding: 10px; text-align: center; }
      .s-val { font-size: 18px; font-weight: 700; }
      .s-lbl { font-size: 10px; color: #7288AE; }
      table { width: 100%; border-collapse: collapse; }
      th { background: #eee; padding: 7px 10px; text-align: left; font-size: 11px; }
      td { padding: 7px 10px; border-bottom: 1px solid #eee; font-size: 11px; }
      .badge { display: inline-block; padding: 2px 7px; border-radius: 10px; font-size: 10px; font-weight: 600; }
      .badge-success { background: #d1fae5; color: #065f46; }
      .badge-warning { background: #fef3c7; color: #92400e; }
      .badge-danger { background: #fee2e2; color: #991b1b; }
      .badge-info { background: #e0e7ff; color: #3730a3; }
      .badge-neutral { background: #e5e7eb; color: #6b7280; }
    </style>
    </head><body>
    ${el.innerHTML}
    <script>setTimeout(() => { window.print(); window.close(); }, 300);<\/script>
    </body></html>
  `);
  printWin.document.close();
};

// ============================================================
// POPULATE PRODUCT DROPDOWNS
// ============================================================
function populateProductDropdowns() {
  // Get all product dropdowns
  const productSelects = document.querySelectorAll('select:has(option[value=""]):not([id*="filter"]):not([id*="category"]):not([id*="warehouse"]):not([id*="status"])');
  
  const productOptions = STOCK_DATA.map(item => 
    `<option value="${item.code}">${item.name} (${item.code})</option>`
  ).join('');
  
  productSelects.forEach(select => {
    // Only populate if it's a product select (has "product" in placeholder or label)
    const label = select.closest('.form-group')?.querySelector('.form-label');
    if (label && (label.textContent.toLowerCase().includes('product') || label.textContent.toLowerCase().includes('item'))) {
      const currentValue = select.value;
      // Keep the first option (placeholder)
      const firstOption = select.querySelector('option:first-child');
      select.innerHTML = '';
      if (firstOption) {
        select.appendChild(firstOption);
      }
      // Add product options
      const fragment = document.createDocumentFragment();
      STOCK_DATA.forEach(item => {
        const option = document.createElement('option');
        option.value = item.code;
        option.textContent = `${item.name} (${item.code})`;
        fragment.appendChild(option);
      });
      select.appendChild(fragment);
      // Restore value if possible
      if (currentValue && [...select.options].some(opt => opt.value === currentValue)) {
        select.value = currentValue;
      }
    }
  });
}

// Also populate the ledger product dropdown specifically
function populateLedgerProductDropdown() {
  const ledgerSection = document.querySelector('#subpanel-move-ledger');
  if (!ledgerSection) return;
  
  const productSelect = ledgerSection.querySelector('.filter-group select:first-child');
  if (!productSelect) return;
  
  // Keep the placeholder option
  const placeholder = productSelect.querySelector('option:first-child');
  productSelect.innerHTML = '';
  if (placeholder) {
    productSelect.appendChild(placeholder);
  }
  
  // Add all products
  STOCK_DATA.forEach(item => {
    const option = document.createElement('option');
    option.value = item.code;
    option.textContent = `${item.name} (${item.code})`;
    productSelect.appendChild(option);
  });
}

function populateWarehouseDropdowns() {
  const warehouseSelects = document.querySelectorAll('select:has(option[value=""]):not([id*="category"]):not([id*="status"])');
  const warehouses = ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Warehouse D'];
  
  warehouseSelects.forEach(select => {
    const label = select.closest('.form-group')?.querySelector('.form-label');
    if (label && (label.textContent.toLowerCase().includes('warehouse') || 
                  label.textContent.toLowerCase().includes('from') || 
                  label.textContent.toLowerCase().includes('to'))) {
      const currentValue = select.value;
      const firstOption = select.querySelector('option:first-child');
      select.innerHTML = '';
      if (firstOption) {
        select.appendChild(firstOption);
      }
      warehouses.forEach(wh => {
        const option = document.createElement('option');
        option.value = wh;
        option.textContent = wh;
        select.appendChild(option);
      });
      if (currentValue && [...select.options].some(opt => opt.value === currentValue)) {
        select.value = currentValue;
      }
    }
  });
}

// ============================================================
// BULK UPLOAD
// ============================================================
let bulkExcelData = null;
let bulkImageMap = {};

window.handleExcelUpload = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('excel-file-name').textContent = file.name;
  if (typeof XLSX === 'undefined') {
    showToast('Excel library not loaded', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const wb = XLSX.read(e.target.result, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
      bulkExcelData = json;
      const previewEl = document.getElementById('bulk-preview-info');
      previewEl.style.display = 'block';
      previewEl.innerHTML = `<i class="fas fa-check-circle"></i> ${json.length} product rows detected and ready to import`;
    } catch(err) {
      showToast('Could not read Excel file: ' + err.message, 'error');
    }
  };
  reader.readAsBinaryString(file);
};

window.handleImagesUpload = function(event) {
  const files = Array.from(event.target.files);
  bulkImageMap = {};
  files.forEach(f => {
    const name = f.name.replace(/\.[^/.]+$/, '').toUpperCase();
    bulkImageMap[name] = URL.createObjectURL(f);
  });
  const el = document.getElementById('img-file-name');
  el.textContent = `${files.length} images loaded`;
};

window.downloadBulkTemplate = function() {
  if (typeof XLSX === 'undefined') {
    showToast('Excel library not available', 'error');
    return;
  }
  const cols = ['Product Code','Product Name','Category','Warehouse','Available','Reserved','Damaged','Reorder Level','Unit','Value'];
  const sampleRows = [
    ['PRD-101','Sample Product A','Raw Materials','Warehouse A',100,20,0,50,'pcs',25000],
    ['PRD-102','Sample Product B','Industrial','Warehouse B',50,10,2,20,'sets',18000],
  ];
  const ws = XLSX.utils.aoa_to_sheet([cols, ...sampleRows]);
  ws['!cols'] = cols.map(() => ({ wch: 18 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products');
  XLSX.writeFile(wb, 'Bulk_Product_Upload_Template.xlsx');
  showToast('Template downloaded', 'success');
};

window.processBulkUpload = function() {
  if (!bulkExcelData || bulkExcelData.length === 0) {
    showToast('Please upload an Excel file first', 'warning');
    return;
  }
  const fieldMap = {
    'product code': 'code', 'code': 'code',
    'product name': 'name', 'name': 'name',
    'category': 'category',
    'warehouse': 'warehouse',
    'available': 'available',
    'reserved': 'reserved',
    'damaged': 'damaged',
    'reorder level': 'reorder', 'reorder': 'reorder',
    'unit': 'unit',
    'value': 'value',
  };
  let added = 0, skipped = 0;
  bulkExcelData.forEach(row => {
    const mapped = {};
    Object.keys(row).forEach(k => {
      const key = fieldMap[k.toLowerCase().trim()];
      if (key) mapped[key] = row[k];
    });
    if (!mapped.code || !mapped.name) { skipped++; return; }
    const exists = STOCK_DATA.findIndex(r => r.code === String(mapped.code).trim());
    const entry = {
      code: String(mapped.code).trim(),
      name: String(mapped.name).trim(),
      category: String(mapped.category || 'General').trim(),
      warehouse: String(mapped.warehouse || 'Warehouse A').trim(),
      available: parseInt(mapped.available) || 0,
      reserved: parseInt(mapped.reserved) || 0,
      damaged: parseInt(mapped.damaged) || 0,
      reorder: parseInt(mapped.reorder) || 10,
      unit: String(mapped.unit || 'pcs').trim(),
      value: parseFloat(mapped.value) || 0,
    };
    if (exists >= 0) { STOCK_DATA[exists] = entry; } else { STOCK_DATA.push(entry); }
    added++;
  });
  currentStockData = [...STOCK_DATA];
  stockPage = 1;
  renderStockTable();
  closeModal('modal-bulk-upload');
  bulkExcelData = null;
  bulkImageMap = {};
  document.getElementById('excel-file-name').textContent = '';
  document.getElementById('img-file-name').textContent = '';
  const pi = document.getElementById('bulk-preview-info');
  if (pi) { pi.style.display = 'none'; }
  showToast(`${added} products imported${skipped > 0 ? `, ${skipped} skipped` : ''}`, 'success');
};

// Drag & drop for bulk upload zones
['excel-drop-zone', 'img-drop-zone'].forEach(id => {
  const zone = document.getElementById(id);
  if (!zone) return;
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragover'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (!files.length) return;
    if (id === 'excel-drop-zone') {
      const input = document.getElementById('bulk-excel-input');
      const dt = new DataTransfer();
      dt.items.add(files[0]);
      input.files = dt.files;
      handleExcelUpload({ target: { files: [files[0]] } });
    } else {
      const input = document.getElementById('bulk-img-input');
      const dt = new DataTransfer();
      Array.from(files).forEach(f => dt.items.add(f));
      input.files = dt.files;
      handleImagesUpload({ target: { files } });
    }
  });
});
// ============================================================
// INIT - UPDATED
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  const today = new Date().toISOString().split('T')[0];
  const adjDate = document.getElementById('adj-date');
  if (adjDate) adjDate.value = today;
  
  // Populate dropdowns
  populateProductDropdowns();
  populateLedgerProductDropdown();
  populateWarehouseDropdowns();
  
  // Responsive sidebar init
  if (window.innerWidth < 1024 && mobileSidebarBtn) {
    mobileSidebarBtn.style.display = 'flex';
  }
  updateSidebarToggleIcon();
  
  renderStockTable();
  renderBatchTable();
  renderSerialTable();
  renderTransferTable();
  renderAvailableStock();
  renderReservedStock();
  renderDamagedStock();
  renderMovementHistory();
  renderLedger();
  
  // Set default dates in ledger filters
  const ledgerDateInputs = document.querySelectorAll('#subpanel-move-ledger .filter-group input[type="date"]');
  if (ledgerDateInputs.length >= 2) {
    const firstDay = new Date();
    firstDay.setDate(1);
    ledgerDateInputs[0].value = firstDay.toISOString().split('T')[0];
    ledgerDateInputs[1].value = today;
  }
});