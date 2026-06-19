/* ============================================================
   warehouses.js  —  Warehouse Operations Module
   Covers: Putaway · Rack & Bin · Picking · Packing · Cycle Count
   ============================================================ */

'use strict';

/* ============================================================
   MOCK DATA
   ============================================================ */
const WAREHOUSES = ['WH-01 Delhi', 'WH-02 Mumbai', 'WH-03 Bengaluru'];
const ZONES      = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const PICKERS    = ['Ravi Kumar', 'Sneha Nair', 'Arjun Mehta', 'Priya Singh', 'Dev Sharma'];
const PACKERS    = ['Kavita Rao', 'Nikhil Das', 'Sunita Verma', 'Mohan Lal'];
const COUNTERS   = ['Amit Joshi', 'Rekha Pillai', 'Vijay Tiwari'];

const DATA = {

  putaway: [
    { id:'PUT-001', po:'PO-2041', product:'Steel Brackets', sku:'SKU-1021', qty:50,  warehouse:'WH-01 Delhi',     rack:'R-A3', status:'Pending' },
    { id:'PUT-002', po:'PO-2042', product:'Copper Wires',   sku:'SKU-0834', qty:200, warehouse:'WH-02 Mumbai',    rack:'R-B1', status:'In Progress' },
    { id:'PUT-003', po:'PO-2043', product:'PVC Pipes',      sku:'SKU-0456', qty:80,  warehouse:'WH-01 Delhi',     rack:'R-A1', status:'Completed' },
    { id:'PUT-004', po:'PO-2044', product:'LED Panels',     sku:'SKU-2011', qty:30,  warehouse:'WH-03 Bengaluru', rack:'R-C2', status:'Pending' },
    { id:'PUT-005', po:'PO-2045', product:'Rubber Gaskets', sku:'SKU-0093', qty:500, warehouse:'WH-02 Mumbai',    rack:'R-B4', status:'In Progress' },
    { id:'PUT-006', po:'PO-2046', product:'Aluminium Rods', sku:'SKU-1567', qty:120, warehouse:'WH-01 Delhi',     rack:'R-A2', status:'Completed' },
    { id:'PUT-007', po:'PO-2047', product:'Circuit Boards', sku:'SKU-3001', qty:15,  warehouse:'WH-03 Bengaluru', rack:'R-C1', status:'Pending' },
    { id:'PUT-008', po:'PO-2048', product:'Bolt Sets',      sku:'SKU-0202', qty:1000,warehouse:'WH-01 Delhi',     rack:'R-A4', status:'Completed' },
    { id:'PUT-009', po:'PO-2049', product:'Hydraulic Seals',sku:'SKU-0781', qty:60,  warehouse:'WH-02 Mumbai',    rack:'R-B2', status:'Pending' },
    { id:'PUT-010', po:'PO-2050', product:'Paint Drums',    sku:'SKU-0999', qty:25,  warehouse:'WH-03 Bengaluru', rack:'R-C3', status:'In Progress' },
    { id:'PUT-011', po:'PO-2051', product:'Nut Sets',       sku:'SKU-0303', qty:800, warehouse:'WH-01 Delhi',     rack:'R-A5', status:'Completed' },
    { id:'PUT-012', po:'PO-2052', product:'Transformer Oil',sku:'SKU-1888', qty:40,  warehouse:'WH-02 Mumbai',    rack:'R-B3', status:'Pending' },
  ],

  allocation: [
    { id:'ALLOC-001', product:'Steel Brackets', sku:'SKU-1021', category:'Hardware',    rack:'R-A3', bin:'B-A3-01', qty:50 },
    { id:'ALLOC-002', product:'Copper Wires',   sku:'SKU-0834', category:'Electrical',  rack:'R-B1', bin:'B-B1-02', qty:200 },
    { id:'ALLOC-003', product:'PVC Pipes',      sku:'SKU-0456', category:'Plumbing',    rack:'R-A1', bin:'B-A1-03', qty:80 },
    { id:'ALLOC-004', product:'LED Panels',     sku:'SKU-2011', category:'Electrical',  rack:'R-C2', bin:'B-C2-01', qty:30 },
    { id:'ALLOC-005', product:'Rubber Gaskets', sku:'SKU-0093', category:'Sealing',     rack:'R-B4', bin:'B-B4-02', qty:500 },
    { id:'ALLOC-006', product:'Aluminium Rods', sku:'SKU-1567', category:'Metal',       rack:'R-A2', bin:'B-A2-01', qty:120 },
    { id:'ALLOC-007', product:'Circuit Boards', sku:'SKU-3001', category:'Electronics', rack:'R-C1', bin:'B-C1-01', qty:15 },
    { id:'ALLOC-008', product:'Bolt Sets',      sku:'SKU-0202', category:'Hardware',    rack:'R-A4', bin:'B-A4-03', qty:1000 },
  ],

  racks: [
    { id:'RACK-01', rackId:'R-A1', name:'Rack Alpha 1', warehouse:'WH-01 Delhi',     zone:'Zone A', totalBins:8,  occupied:6, capacity:2000, status:'Active' },
    { id:'RACK-02', rackId:'R-A2', name:'Rack Alpha 2', warehouse:'WH-01 Delhi',     zone:'Zone A', totalBins:8,  occupied:8, capacity:2000, status:'Full' },
    { id:'RACK-03', rackId:'R-A3', name:'Rack Alpha 3', warehouse:'WH-01 Delhi',     zone:'Zone A', totalBins:8,  occupied:4, capacity:1500, status:'Active' },
    { id:'RACK-04', rackId:'R-B1', name:'Rack Beta 1',  warehouse:'WH-02 Mumbai',    zone:'Zone B', totalBins:10, occupied:5, capacity:2500, status:'Active' },
    { id:'RACK-05', rackId:'R-B2', name:'Rack Beta 2',  warehouse:'WH-02 Mumbai',    zone:'Zone B', totalBins:10, occupied:0, capacity:2500, status:'Inactive' },
    { id:'RACK-06', rackId:'R-B3', name:'Rack Beta 3',  warehouse:'WH-02 Mumbai',    zone:'Zone B', totalBins:10, occupied:9, capacity:2500, status:'Active' },
    { id:'RACK-07', rackId:'R-C1', name:'Rack Gamma 1', warehouse:'WH-03 Bengaluru', zone:'Zone C', totalBins:6,  occupied:3, capacity:1200, status:'Active' },
    { id:'RACK-08', rackId:'R-C2', name:'Rack Gamma 2', warehouse:'WH-03 Bengaluru', zone:'Zone C', totalBins:6,  occupied:6, capacity:1200, status:'Full' },
    { id:'RACK-09', rackId:'R-A4', name:'Rack Alpha 4', warehouse:'WH-01 Delhi',     zone:'Zone A', totalBins:8,  occupied:2, capacity:1800, status:'Active' },
    { id:'RACK-10', rackId:'R-D1', name:'Rack Delta 1', warehouse:'WH-01 Delhi',     zone:'Zone D', totalBins:12, occupied:0, capacity:3000, status:'Inactive' },
  ],

  bins: [
    { id:'BIN-01', binId:'B-A1-01', name:'Bin A1-01', rack:'R-A1', level:'L1', product:'Steel Brackets', qty:50,  maxCap:200, status:'Partial' },
    { id:'BIN-02', binId:'B-A1-02', name:'Bin A1-02', rack:'R-A1', level:'L2', product:'Bolt Sets',      qty:200, maxCap:200, status:'Full' },
    { id:'BIN-03', binId:'B-A2-01', name:'Bin A2-01', rack:'R-A2', level:'L1', product:'Nut Sets',       qty:150, maxCap:300, status:'Partial' },
    { id:'BIN-04', binId:'B-B1-01', name:'Bin B1-01', rack:'R-B1', level:'L1', product:'Copper Wires',   qty:0,   maxCap:150, status:'Empty' },
    { id:'BIN-05', binId:'B-B1-02', name:'Bin B1-02', rack:'R-B1', level:'L2', product:'LED Panels',     qty:30,  maxCap:50,  status:'Partial' },
    { id:'BIN-06', binId:'B-C1-01', name:'Bin C1-01', rack:'R-C1', level:'L1', product:'Circuit Boards', qty:15,  maxCap:20,  status:'Partial' },
    { id:'BIN-07', binId:'B-C2-01', name:'Bin C2-01', rack:'R-C2', level:'L1', product:'PVC Pipes',      qty:80,  maxCap:80,  status:'Full' },
    { id:'BIN-08', binId:'B-B4-01', name:'Bin B4-01', rack:'R-B3', level:'L3', product:'Rubber Gaskets', qty:500, maxCap:600, status:'Partial' },
    { id:'BIN-09', binId:'B-A4-01', name:'Bin A4-01', rack:'R-A4', level:'L1', product:'—',              qty:0,   maxCap:400, status:'Empty' },
    { id:'BIN-10', binId:'B-A3-01', name:'Bin A3-01', rack:'R-A3', level:'L2', product:'Aluminium Rods', qty:120, maxCap:500, status:'Partial' },
  ],

  picklists: [
    { id:'PL-0081', soId:'SO-5021', items:4,  picker:'Ravi Kumar',   priority:'High',   due:'09:00 AM', status:'Open' },
    { id:'PL-0082', soId:'SO-5022', items:7,  picker:'Sneha Nair',   priority:'Medium', due:'10:30 AM', status:'In Progress' },
    { id:'PL-0083', soId:'SO-5023', items:2,  picker:'Arjun Mehta',  priority:'Low',    due:'12:00 PM', status:'Completed' },
    { id:'PL-0084', soId:'SO-5024', items:9,  picker:'Priya Singh',  priority:'High',   due:'09:45 AM', status:'Open' },
    { id:'PL-0085', soId:'SO-5025', items:3,  picker:'Dev Sharma',   priority:'Medium', due:'11:00 AM', status:'In Progress' },
    { id:'PL-0086', soId:'SO-5026', items:6,  picker:'Ravi Kumar',   priority:'Low',    due:'01:00 PM', status:'Open' },
    { id:'PL-0087', soId:'SO-5027', items:1,  picker:'Sneha Nair',   priority:'High',   due:'08:30 AM', status:'Completed' },
    { id:'PL-0088', soId:'SO-5028', items:5,  picker:'Arjun Mehta',  priority:'Medium', due:'02:00 PM', status:'Open' },
    { id:'PL-0089', soId:'SO-5029', items:8,  picker:'Ravi Kumar',   priority:'High',   due:'10:00 AM', status:'In Progress' },
    { id:'PL-0090', soId:'SO-5030', items:2,  picker:'Dev Sharma',   priority:'Low',    due:'03:00 PM', status:'Cancelled' },
  ],

  pickConfirm: [
    { id:'PC-001', plId:'PL-0082', product:'Copper Wires',   bin:'B-B1-02', reqQty:10, pickedQty:10, picker:'Sneha Nair',  confirmedAt:'09:45 AM', status:'Completed' },
    { id:'PC-002', plId:'PL-0083', product:'LED Panels',     bin:'B-C2-01', reqQty:5,  pickedQty:5,  picker:'Arjun Mehta', confirmedAt:'11:20 AM', status:'Completed' },
    { id:'PC-003', plId:'PL-0085', product:'Bolt Sets',      bin:'B-A1-02', reqQty:100,pickedQty:95, picker:'Dev Sharma',  confirmedAt:'10:55 AM', status:'Completed' },
    { id:'PC-004', plId:'PL-0089', product:'Rubber Gaskets', bin:'B-B4-01', reqQty:50, pickedQty:0,  picker:'Ravi Kumar',  confirmedAt:'—',        status:'In Progress' },
    { id:'PC-005', plId:'PL-0087', product:'Circuit Boards', bin:'B-C1-01', reqQty:3,  pickedQty:3,  picker:'Sneha Nair',  confirmedAt:'08:50 AM', status:'Completed' },
  ],

  packing: [
    { id:'PACK-001', soId:'SO-5021', customer:'Vertex Industries',  items:4, weight:12.5, packer:'Kavita Rao',  status:'Ready' },
    { id:'PACK-002', soId:'SO-5022', customer:'Omega Traders',      items:7, weight:8.2,  packer:'Nikhil Das',  status:'Packing' },
    { id:'PACK-003', soId:'SO-5023', customer:'BlueStar Corp',      items:2, weight:3.0,  packer:'Kavita Rao',  status:'Packed' },
    { id:'PACK-004', soId:'SO-5024', customer:'NexGen Supplies',    items:9, weight:22.0, packer:'Sunita Verma',status:'Dispatched' },
    { id:'PACK-005', soId:'SO-5025', customer:'Rapid Logistics',    items:3, weight:5.5,  packer:'Mohan Lal',   status:'Packed' },
    { id:'PACK-006', soId:'SO-5026', customer:'Prime Components',   items:6, weight:14.0, packer:'Nikhil Das',  status:'Ready' },
    { id:'PACK-007', soId:'SO-5027', customer:'Falcon Exports',     items:1, weight:2.1,  packer:'Kavita Rao',  status:'Packing' },
    { id:'PACK-008', soId:'SO-5028', customer:'Alpha Manufacturers',items:5, weight:9.8,  packer:'Sunita Verma',status:'Ready' },
    { id:'PACK-009', soId:'SO-5029', customer:'Sigma Solutions',    items:8, weight:18.3, packer:'Mohan Lal',   status:'Dispatched' },
  ],

  labels: [
    { id:'LBL-001', packId:'PACK-001', soId:'SO-5021', customer:'Vertex Industries',  labelType:'Shipping',  barcode:'BC-1021-A', printed:false },
    { id:'LBL-002', packId:'PACK-002', soId:'SO-5022', customer:'Omega Traders',      labelType:'Shipping',  barcode:'BC-1022-B', printed:true  },
    { id:'LBL-003', packId:'PACK-003', soId:'SO-5023', customer:'BlueStar Corp',      labelType:'Return',    barcode:'BC-1023-C', printed:true  },
    { id:'LBL-004', packId:'PACK-004', soId:'SO-5024', customer:'NexGen Supplies',    labelType:'Shipping',  barcode:'BC-1024-D', printed:true  },
    { id:'LBL-005', packId:'PACK-005', soId:'SO-5025', customer:'Rapid Logistics',    labelType:'Fragile',   barcode:'BC-1025-E', printed:false },
    { id:'LBL-006', packId:'PACK-006', soId:'SO-5026', customer:'Prime Components',   labelType:'Shipping',  barcode:'BC-1026-F', printed:false },
    { id:'LBL-007', packId:'PACK-007', soId:'SO-5027', customer:'Falcon Exports',     labelType:'Hazmat',    barcode:'BC-1027-G', printed:true  },
    { id:'LBL-008', packId:'PACK-008', soId:'SO-5028', customer:'Alpha Manufacturers',labelType:'Shipping',  barcode:'BC-1028-H', printed:false },
  ],

  verify: [
    { id:'CNT-001', product:'Steel Brackets', bin:'B-A1-01', systemQty:50,  physicalQty:50,  variance:0,   counter:'Amit Joshi',   status:'Verified' },
    { id:'CNT-002', product:'Copper Wires',   bin:'B-B1-02', systemQty:200, physicalQty:188, variance:-12, counter:'Rekha Pillai', status:'Discrepancy' },
    { id:'CNT-003', product:'LED Panels',     bin:'B-C2-01', systemQty:30,  physicalQty:30,  variance:0,   counter:'Vijay Tiwari', status:'Verified' },
    { id:'CNT-004', product:'Circuit Boards', bin:'B-C1-01', systemQty:15,  physicalQty:0,   variance:0,   counter:'—',            status:'Pending' },
    { id:'CNT-005', product:'Bolt Sets',      bin:'B-A1-02', systemQty:200, physicalQty:205, variance:5,   counter:'Amit Joshi',   status:'Discrepancy' },
    { id:'CNT-006', product:'PVC Pipes',      bin:'B-C2-01', systemQty:80,  physicalQty:80,  variance:0,   counter:'Rekha Pillai', status:'Counted' },
    { id:'CNT-007', product:'Rubber Gaskets', bin:'B-B4-01', systemQty:500, physicalQty:0,   variance:0,   counter:'—',            status:'Pending' },
    { id:'CNT-008', product:'Aluminium Rods', bin:'B-A3-01', systemQty:120, physicalQty:118, variance:-2,  counter:'Vijay Tiwari', status:'Verified' },
  ],

  audits: [
    { id:'AUD-001', warehouse:'WH-01 Delhi',     zone:'Zone A', totalItems:48, discrepancies:2, auditor:'Amit Joshi',   date:'2025-06-10', status:'Completed' },
    { id:'AUD-002', warehouse:'WH-02 Mumbai',    zone:'Zone B', totalItems:32, discrepancies:1, auditor:'Rekha Pillai', date:'2025-06-09', status:'Completed' },
    { id:'AUD-003', warehouse:'WH-03 Bengaluru', zone:'Zone C', totalItems:20, discrepancies:0, auditor:'Vijay Tiwari', date:'2025-06-08', status:'Completed' },
    { id:'AUD-004', warehouse:'WH-01 Delhi',     zone:'Zone D', totalItems:15, discrepancies:0, auditor:'Amit Joshi',   date:'2025-06-11', status:'In Progress' },
    { id:'AUD-005', warehouse:'WH-02 Mumbai',    zone:'Zone A', totalItems:40, discrepancies:3, auditor:'Rekha Pillai', date:'2025-06-07', status:'Completed' },
  ],
};

/* ============================================================
   PAGINATION STATE
   ============================================================ */
const PAGE_SIZE = 6;
const pageState = {
  putaway:  1, rack: 1, bin: 1, picklist: 1, packing: 1, verify: 1,
};

/* ============================================================
   UTILITY HELPERS
   ============================================================ */
function statusChip(status) {
  const map = {
    'Pending':     'chip-pending',
    'In Progress': 'chip-progress',
    'Completed':   'chip-completed',
    'Cancelled':   'chip-cancelled',
    'Open':        'chip-open',
    'Ready':       'chip-ready',
    'Packing':     'chip-packing',
    'Packed':      'chip-packed',
    'Dispatched':  'chip-dispatched',
    'Active':      'chip-active',
    'Inactive':    'chip-inactive',
    'Full':        'chip-full',
    'Empty':       'chip-empty',
    'Partial':     'chip-partial',
    'Counted':     'chip-counted',
    'Verified':    'chip-verified',
    'Discrepancy': 'chip-discrepancy',
  };
  return `<span class="status-chip ${map[status] || 'chip-pending'}">${status}</span>`;
}

function priorityChip(p) {
  const map = { High:'priority-high', Medium:'priority-medium', Low:'priority-low' };
  return `<span class="priority-chip ${map[p] || ''}">${p}</span>`;
}

function actionBtns(id, extraClass = '') {
  return `
    <div class="flex gap-1">
      <button class="btn-icon bg-[#111844]/8 text-[#4B5694] hover:bg-[#111844]/15 edit-btn ${extraClass}" data-id="${id}" title="Edit">
        <i class="fas fa-pen text-[10px]"></i>
      </button>
      <button class="btn-icon bg-red-50 text-red-500 hover:bg-red-100 delete-btn" data-id="${id}" title="Delete">
        <i class="fas fa-trash text-[10px]"></i>
      </button>
    </div>`;
}

function paginate(arr, page) {
  const start = (page - 1) * PAGE_SIZE;
  return arr.slice(start, start + PAGE_SIZE);
}

function renderPagination(containerId, total, currentPage, onPageChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = Math.min((currentPage - 1) * PAGE_SIZE + 1, total);
  const end   = Math.min(currentPage * PAGE_SIZE, total);

  let btns = '';
  for (let i = 1; i <= totalPages; i++) {
    btns += `<button class="page-btn ${i === currentPage ? 'active-page' : ''}" data-page="${i}">${i}</button>`;
  }

  container.innerHTML = `
    <span>Showing ${start}–${end} of ${total}</span>
    <div class="flex items-center gap-1">
      <button class="page-btn" data-page="${Math.max(1, currentPage - 1)}"><i class="fas fa-chevron-left text-[9px]"></i></button>
      ${btns}
      <button class="page-btn" data-page="${Math.min(totalPages, currentPage + 1)}"><i class="fas fa-chevron-right text-[9px]"></i></button>
    </div>`;

  container.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => onPageChange(+btn.dataset.page));
  });
}

function showToast(msg, type = 'success') {
  const colors = { success:'bg-emerald-600', error:'bg-red-600', info:'bg-[#111844]' };
  const icons  = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-circle-info' };
  const toast  = document.createElement('div');
  toast.className = `toast-animate flex items-center gap-2 px-4 py-2.5 rounded-xl ${colors[type]} text-white text-xs font-medium shadow-lg`;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i>${msg}`;
  document.getElementById('toast-container').appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* ============================================================
   MODULE & SUB-TAB SWITCHING
   ============================================================ */
document.getElementById('module-tabs').addEventListener('click', e => {
  const btn = e.target.closest('.module-tab');
  if (!btn) return;
  document.querySelectorAll('.module-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const mod = btn.dataset.module;
  document.querySelectorAll('.module-content').forEach(el => el.classList.add('hidden'));
  document.getElementById(`module-${mod}`).classList.remove('hidden');
});

document.querySelectorAll('.sub-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.dataset.group;
    document.querySelectorAll(`.sub-tab[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.subtab;
    // hide all sub-panes in this group
    document.querySelectorAll(`[data-group="${group}"]`).forEach(b => {
      const panelId = `subtab-${b.dataset.subtab}`;
      const panel = document.getElementById(panelId);
      if (panel) panel.classList.add('hidden');
    });
    document.getElementById(`subtab-${target}`).classList.remove('hidden');
  });
});

/* ============================================================
   SIDEBAR TOGGLE
   ============================================================ */
const sidebar       = document.getElementById('sidebar');
const mainWrapper   = document.getElementById('main-wrapper');
const overlay       = document.getElementById('sidebar-overlay');
const sidebarToggle = document.getElementById('sidebar-toggle');

sidebarToggle.addEventListener('click', () => {
  if (window.innerWidth >= 1024) {
    sidebar.classList.toggle('sidebar-collapsed');
    mainWrapper.classList.toggle('main-expanded');
  } else {
    sidebar.classList.toggle('sidebar-open');
    overlay.classList.toggle('hidden');
  }
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
});

/* ============================================================
   NOTIFICATION & USER MENUS
   ============================================================ */
document.getElementById('notif-btn').addEventListener('click', e => {
  e.stopPropagation();
  const m = document.getElementById('notif-menu');
  m.classList.toggle('hidden');
  document.getElementById('user-menu').classList.add('hidden');
});
document.getElementById('user-menu-btn').addEventListener('click', e => {
  e.stopPropagation();
  const m = document.getElementById('user-menu');
  m.classList.toggle('hidden');
  document.getElementById('notif-menu').classList.add('hidden');
});
document.addEventListener('click', () => {
  document.getElementById('notif-menu').classList.add('hidden');
  document.getElementById('user-menu').classList.add('hidden');
});

/* ============================================================
   OVERLAY MODAL (replaces drawer)
   ============================================================ */
let modalSaveCallback = null;

function openModal(title, bodyHTML, onSave) {
  modalSaveCallback = onSave;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  const modal = document.getElementById('overlay-modal');
  modal.classList.remove('hidden');
  
  // Hide save button if no callback (for view-only modals)
  const saveBtn = document.getElementById('modal-save-btn');
  if (onSave) {
    saveBtn.classList.remove('hidden');
  } else {
    saveBtn.classList.add('hidden');
  }
}

function closeModal() {
  const modal = document.getElementById('overlay-modal');
  modal.classList.add('hidden');
  modalSaveCallback = null;
}

// Modal event listeners
document.getElementById('modal-close-btn').addEventListener('click', closeModal);
document.getElementById('modal-cancel-btn').addEventListener('click', closeModal);
document.getElementById('modal-backdrop').addEventListener('click', closeModal);
document.getElementById('modal-save-btn').addEventListener('click', () => {
  if (modalSaveCallback) modalSaveCallback();
});

/* ============================================================
   DELETE MODAL
   ============================================================ */
const modalRoot     = document.getElementById('modal-root');
const modalItemName = document.getElementById('modal-item-name');
const modalClose    = document.getElementById('modal-close');
const modalCancel   = document.getElementById('modal-cancel');
const modalConfirm  = document.getElementById('modal-confirm');

let deleteCallback = null;

function openDeleteModal(name, onConfirm) {
  modalItemName.textContent = name;
  deleteCallback = onConfirm;
  modalRoot.classList.remove('hidden');
}
function closeDeleteModal() { modalRoot.classList.add('hidden'); }

modalClose.addEventListener('click', closeDeleteModal);
modalCancel.addEventListener('click', closeDeleteModal);
modalConfirm.addEventListener('click', () => {
  if (deleteCallback) deleteCallback();
  closeDeleteModal();
});

/* ============================================================
   FIELD BUILDER HELPER
   ============================================================ */
function field(label, inputHTML) {
  return `<div><label class="field-label">${label}</label>${inputHTML}</div>`;
}
function inp(name, value = '', placeholder = '') {
  return `<input name="${name}" value="${value}" placeholder="${placeholder}" class="field-input" />`;
}
function sel(name, options, selected = '') {
  const opts = options.map(o => `<option ${o === selected ? 'selected' : ''}>${o}</option>`).join('');
  return `<select name="${name}" class="field-input">${opts}</select>`;
}

/* ============================================================
   ██████  PUTAWAY MODULE
   ============================================================ */

// ---- Putaway List ----
function getPutawayData() {
  const q  = (document.getElementById('putaway-search')?.value || '').toLowerCase();
  const st = document.getElementById('putaway-status-filter')?.value || '';
  return DATA.putaway.filter(r =>
    (!q  || r.po.toLowerCase().includes(q) || r.product.toLowerCase().includes(q) || r.sku.toLowerCase().includes(q)) &&
    (!st || r.status === st)
  );
}

function renderPutawayTable() {
  const filtered = getPutawayData();
  const rows     = paginate(filtered, pageState.putaway);
  const tbody    = document.getElementById('putaway-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.putaway - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.po}</td>
      <td>${r.product}</td>
      <td class="text-[#7288AE]">${r.sku}</td>
      <td>${r.qty}</td>
      <td>${r.warehouse}</td>
      <td class="font-medium">${r.rack}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'putaway-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="9" class="text-center py-8 text-[#7288AE]">No records found</td></tr>`;

  renderPagination('putaway-pagination', filtered.length, pageState.putaway, p => {
    pageState.putaway = p; renderPutawayTable();
  });

  // bind action buttons
  tbody.querySelectorAll('.putaway-edit').forEach(btn => {
    btn.addEventListener('click', () => openPutawayModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.putaway.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.po, () => {
        DATA.putaway.splice(DATA.putaway.indexOf(rec), 1);
        renderPutawayTable();
        showToast('Putaway record deleted');
      });
    });
  });
}

function openPutawayModal(id) {
  const rec = DATA.putaway.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('PO Reference', inp('po', rec.po, 'e.g. PO-2050'))}
    ${field('Product',      inp('product', rec.product, 'Product name'))}
    ${field('SKU',          inp('sku', rec.sku, 'SKU code'))}
    ${field('Quantity',     inp('qty', rec.qty, 'Units'))}
    ${field('Warehouse',    sel('warehouse', WAREHOUSES, rec.warehouse))}
    ${field('Assigned Rack',inp('rack', rec.rack, 'e.g. R-A1'))}
    ${field('Status',       sel('status', ['Pending','In Progress','Completed'], rec.status))}`;

  openModal(isNew ? 'New Putaway' : `Edit Putaway — ${rec.po}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.po || !vals.product) { showToast('PO Reference and Product are required', 'error'); return; }
    if (isNew) {
      DATA.putaway.unshift({ id: `PUT-${String(DATA.putaway.length + 1).padStart(3,'0')}`, ...vals, qty: +vals.qty });
    } else {
      Object.assign(rec, vals, { qty: +vals.qty });
    }
    renderPutawayTable();
    closeModal();
    showToast(isNew ? 'Putaway created successfully' : 'Putaway updated successfully');
  });
}

document.getElementById('btn-new-putaway').addEventListener('click', () => openPutawayModal(null));
document.getElementById('putaway-search').addEventListener('input', () => { pageState.putaway = 1; renderPutawayTable(); });
document.getElementById('putaway-status-filter').addEventListener('change', () => { pageState.putaway = 1; renderPutawayTable(); });

// ---- Product Allocation ----
function getAllocData() {
  const q = (document.getElementById('alloc-search')?.value || '').toLowerCase();
  return DATA.allocation.filter(r =>
    !q || r.product.toLowerCase().includes(q) || r.sku.toLowerCase().includes(q)
  );
}

function renderAllocTable() {
  const rows  = getAllocData();
  const tbody = document.getElementById('allocation-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td class="font-medium">${r.product}</td>
      <td class="text-[#7288AE]">${r.sku}</td>
      <td>${r.category}</td>
      <td>${r.rack}</td>
      <td>${r.bin}</td>
      <td>${r.qty}</td>
      <td>${actionBtns(r.id, 'alloc-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="8" class="text-center py-8 text-[#7288AE]">No records found</td></tr>`;

  tbody.querySelectorAll('.alloc-edit').forEach(btn => {
    btn.addEventListener('click', () => openAllocModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.allocation.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.product, () => {
        DATA.allocation.splice(DATA.allocation.indexOf(rec), 1);
        renderAllocTable();
        showToast('Allocation removed');
      });
    });
  });
}

function openAllocModal(id) {
  const rec = DATA.allocation.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('Product',       inp('product', rec.product, 'Product name'))}
    ${field('SKU',           inp('sku', rec.sku, 'SKU code'))}
    ${field('Category',      inp('category', rec.category, 'Category'))}
    ${field('Allocated Rack',inp('rack', rec.rack, 'e.g. R-A1'))}
    ${field('Allocated Bin', inp('bin', rec.bin, 'e.g. B-A1-01'))}
    ${field('Qty Allocated', inp('qty', rec.qty, 'Quantity'))}`;

  openModal(isNew ? 'Allocate Product' : `Edit Allocation — ${rec.product}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.product || !vals.rack) { showToast('Product and Rack are required', 'error'); return; }
    if (isNew) {
      DATA.allocation.unshift({ id: `ALLOC-${String(DATA.allocation.length + 1).padStart(3,'0')}`, ...vals, qty: +vals.qty });
    } else {
      Object.assign(rec, vals, { qty: +vals.qty });
    }
    renderAllocTable();
    closeModal();
    showToast(isNew ? 'Product allocated successfully' : 'Allocation updated');
  });
}

document.getElementById('btn-allocate').addEventListener('click', () => openAllocModal(null));
document.getElementById('alloc-search').addEventListener('input', renderAllocTable);

/* ============================================================
   ██████  RACK & BIN MODULE
   ============================================================ */

// ---- Rack List ----
function getRackData() {
  const q = (document.getElementById('rack-search')?.value || '').toLowerCase();
  return DATA.racks.filter(r => !q || r.rackId.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.warehouse.toLowerCase().includes(q));
}

function renderRackTable() {
  const filtered = getRackData();
  const rows     = paginate(filtered, pageState.rack);
  const tbody    = document.getElementById('rack-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.rack - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.rackId}</td>
      <td>${r.name}</td>
      <td>${r.warehouse}</td>
      <td>${r.zone}</td>
      <td>${r.totalBins}</td>
      <td>${r.occupied}</td>
      <td>${r.capacity.toLocaleString()}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'rack-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="10" class="text-center py-8 text-[#7288AE]">No racks found</td></tr>`;

  renderPagination('rack-pagination', filtered.length, pageState.rack, p => {
    pageState.rack = p; renderRackTable();
  });

  tbody.querySelectorAll('.rack-edit').forEach(btn => {
    btn.addEventListener('click', () => openRackModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.racks.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.name, () => {
        DATA.racks.splice(DATA.racks.indexOf(rec), 1);
        renderRackTable(); populateBinRackFilter();
        showToast('Rack deleted');
      });
    });
  });
}

function openRackModal(id) {
  const rec = DATA.racks.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('Rack ID',    inp('rackId', rec.rackId, 'e.g. R-A5'))}
    ${field('Rack Name',  inp('name', rec.name, 'Descriptive name'))}
    ${field('Warehouse',  sel('warehouse', WAREHOUSES, rec.warehouse))}
    ${field('Zone',       sel('zone', ZONES, rec.zone))}
    ${field('Total Bins', inp('totalBins', rec.totalBins, 'Number of bins'))}
    ${field('Capacity (kg)', inp('capacity', rec.capacity, 'Max weight'))}
    ${field('Status',     sel('status', ['Active','Inactive','Full'], rec.status))}`;

  openModal(isNew ? 'Add Rack' : `Edit Rack — ${rec.rackId}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.rackId || !vals.name) { showToast('Rack ID and Name are required', 'error'); return; }
    if (isNew) {
      DATA.racks.unshift({ id: `RACK-${String(DATA.racks.length + 1).padStart(2,'0')}`, occupied: 0, ...vals, totalBins: +vals.totalBins, capacity: +vals.capacity });
    } else {
      Object.assign(rec, vals, { totalBins: +vals.totalBins, capacity: +vals.capacity });
    }
    renderRackTable(); populateBinRackFilter();
    closeModal();
    showToast(isNew ? 'Rack added' : 'Rack updated');
  });
}

document.getElementById('btn-add-rack').addEventListener('click', () => openRackModal(null));
document.getElementById('rack-search').addEventListener('input', () => { pageState.rack = 1; renderRackTable(); });

// ---- Bin List ----
function populateBinRackFilter() {
  const sel2 = document.getElementById('bin-rack-filter');
  const cur  = sel2.value;
  sel2.innerHTML = '<option value="">All Racks</option>' + DATA.racks.map(r => `<option ${r.rackId === cur ? 'selected' : ''}>${r.rackId}</option>`).join('');
}

function getBinData() {
  const q  = (document.getElementById('bin-search')?.value || '').toLowerCase();
  const rf = document.getElementById('bin-rack-filter')?.value || '';
  return DATA.bins.filter(r =>
    (!q  || r.binId.toLowerCase().includes(q) || r.name.toLowerCase().includes(q) || r.product.toLowerCase().includes(q)) &&
    (!rf || r.rack === rf)
  );
}

function renderBinTable() {
  const filtered = getBinData();
  const rows     = paginate(filtered, pageState.bin);
  const tbody    = document.getElementById('bin-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.bin - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.binId}</td>
      <td>${r.name}</td>
      <td>${r.rack}</td>
      <td>${r.level}</td>
      <td>${r.product}</td>
      <td>${r.qty}</td>
      <td>${r.maxCap}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'bin-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="10" class="text-center py-8 text-[#7288AE]">No bins found</td></tr>`;

  renderPagination('bin-pagination', filtered.length, pageState.bin, p => {
    pageState.bin = p; renderBinTable();
  });

  tbody.querySelectorAll('.bin-edit').forEach(btn => {
    btn.addEventListener('click', () => openBinModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.bins.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.name, () => {
        DATA.bins.splice(DATA.bins.indexOf(rec), 1);
        renderBinTable();
        showToast('Bin deleted');
      });
    });
  });
}

function openBinModal(id) {
  const rec = DATA.bins.find(r => r.id === id) || {};
  const isNew = !id;
  const rackOpts = DATA.racks.map(r => r.rackId);
  const html = `
    ${field('Bin ID',       inp('binId', rec.binId, 'e.g. B-A1-05'))}
    ${field('Bin Name',     inp('name', rec.name, 'Bin label'))}
    ${field('Rack',         sel('rack', rackOpts, rec.rack))}
    ${field('Level',        sel('level', ['L1','L2','L3','L4'], rec.level))}
    ${field('Product',      inp('product', rec.product, 'Product stored'))}
    ${field('Qty Stored',   inp('qty', rec.qty, '0'))}
    ${field('Max Capacity', inp('maxCap', rec.maxCap, 'Units'))}
    ${field('Status',       sel('status', ['Empty','Partial','Full'], rec.status))}`;

  openModal(isNew ? 'Add Bin' : `Edit Bin — ${rec.binId}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.binId) { showToast('Bin ID is required', 'error'); return; }
    if (isNew) {
      DATA.bins.unshift({ id: `BIN-${String(DATA.bins.length + 1).padStart(2,'0')}`, ...vals, qty: +vals.qty, maxCap: +vals.maxCap });
    } else {
      Object.assign(rec, vals, { qty: +vals.qty, maxCap: +vals.maxCap });
    }
    renderBinTable();
    closeModal();
    showToast(isNew ? 'Bin added' : 'Bin updated');
  });
}

document.getElementById('btn-add-bin').addEventListener('click', () => openBinModal(null));
document.getElementById('bin-search').addEventListener('input', () => { pageState.bin = 1; renderBinTable(); });
document.getElementById('bin-rack-filter').addEventListener('change', () => { pageState.bin = 1; renderBinTable(); });

/* ============================================================
   ██████  PICKING MODULE
   ============================================================ */

// ---- Pick List ----
function getPicklistData() {
  const q  = (document.getElementById('picklist-search')?.value || '').toLowerCase();
  const st = document.getElementById('picklist-status-filter')?.value || '';
  return DATA.picklists.filter(r =>
    (!q  || r.id.toLowerCase().includes(q) || r.soId.toLowerCase().includes(q) || r.picker.toLowerCase().includes(q)) &&
    (!st || r.status === st)
  );
}

function renderPicklistTable() {
  const filtered = getPicklistData();
  const rows     = paginate(filtered, pageState.picklist);
  const tbody    = document.getElementById('picklist-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.picklist - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.id}</td>
      <td>${r.soId}</td>
      <td>${r.items}</td>
      <td>${r.picker}</td>
      <td>${priorityChip(r.priority)}</td>
      <td>${r.due}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'pl-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="9" class="text-center py-8 text-[#7288AE]">No pick lists found</td></tr>`;

  renderPagination('picklist-pagination', filtered.length, pageState.picklist, p => {
    pageState.picklist = p; renderPicklistTable();
  });

  tbody.querySelectorAll('.pl-edit').forEach(btn => {
    btn.addEventListener('click', () => openPicklistModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.picklists.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.id, () => {
        DATA.picklists.splice(DATA.picklists.indexOf(rec), 1);
        renderPicklistTable();
        showToast('Pick list deleted');
      });
    });
  });
}

function openPicklistModal(id) {
  const rec = DATA.picklists.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('Sales Order', inp('soId', rec.soId, 'e.g. SO-5040'))}
    ${field('Items Count', inp('items', rec.items, 'Number of items'))}
    ${field('Picker',      sel('picker', PICKERS, rec.picker))}
    ${field('Priority',    sel('priority', ['High','Medium','Low'], rec.priority))}
    ${field('Due Time',    inp('due', rec.due, 'e.g. 10:30 AM'))}
    ${field('Status',      sel('status', ['Open','In Progress','Completed','Cancelled'], rec.status))}`;

  openModal(isNew ? 'Create Pick List' : `Edit Pick List — ${rec.id}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.soId) { showToast('Sales Order is required', 'error'); return; }
    if (isNew) {
      const newId = `PL-${String(DATA.picklists.length + 81).padStart(4,'0')}`;
      DATA.picklists.unshift({ id: newId, ...vals, items: +vals.items });
    } else {
      Object.assign(rec, vals, { items: +vals.items });
    }
    renderPicklistTable();
    closeModal();
    showToast(isNew ? 'Pick list created' : 'Pick list updated');
  });
}

document.getElementById('btn-create-picklist').addEventListener('click', () => openPicklistModal(null));
document.getElementById('picklist-search').addEventListener('input', () => { pageState.picklist = 1; renderPicklistTable(); });
document.getElementById('picklist-status-filter').addEventListener('change', () => { pageState.picklist = 1; renderPicklistTable(); });

// ---- Pick Confirmation ----
function renderPickConfirmTable(filter = '') {
  const rows  = DATA.pickConfirm.filter(r =>
    !filter || r.plId.toLowerCase().includes(filter) || r.product.toLowerCase().includes(filter)
  );
  const tbody = document.getElementById('confirm-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td class="font-medium">${r.plId}</td>
      <td>${r.product}</td>
      <td>${r.bin}</td>
      <td>${r.reqQty}</td>
      <td class="font-semibold ${r.pickedQty < r.reqQty ? 'text-red-600' : 'text-emerald-700'}">${r.pickedQty}</td>
      <td>${r.picker}</td>
      <td>${r.confirmedAt}</td>
      <td>${statusChip(r.status)}</td>
    </tr>`).join('') : `<tr><td colspan="9" class="text-center py-8 text-[#7288AE]">No confirmation records</td></tr>`;
}

document.getElementById('confirm-search').addEventListener('input', e => renderPickConfirmTable(e.target.value.toLowerCase()));
// ============================================================
// PICK CONFIRMATION - FIXED
// ============================================================
document.getElementById('btn-confirm-pick').addEventListener('click', function() {
  const input = document.getElementById('confirm-search');
  const val = input.value.trim();
  
  if (!val) { 
    showToast('Please enter or scan a Pick List ID', 'error'); 
    return; 
  }
  
  // Search in pick confirm data
  let found = DATA.pickConfirm.find(r => r.plId.toLowerCase() === val.toLowerCase());
  
  // If not found in confirm data, check if it exists in picklists
  if (!found) {
    const picklist = DATA.picklists.find(r => r.id.toLowerCase() === val.toLowerCase());
    if (picklist) {
      // Create a new confirmation record
      const newConfirm = {
        id: `PC-${String(DATA.pickConfirm.length + 1).padStart(3,'0')}`,
        plId: picklist.id,
        product: picklist.items > 0 ? 'Multiple Items' : 'No Items',
        bin: '—',
        reqQty: picklist.items,
        pickedQty: picklist.items,
        picker: picklist.picker,
        confirmedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        status: 'Completed'
      };
      DATA.pickConfirm.unshift(newConfirm);
      
      // Update picklist status
      picklist.status = 'Completed';
      
      renderPicklistTable();
      renderPickConfirmTable(document.getElementById('confirm-search').value.toLowerCase());
      showToast(`✅ Pick List ${picklist.id} confirmed successfully!`, 'success');
      return;
    }
    
    showToast('❌ Pick List not found. Please check the ID.', 'error');
    return;
  }
  
  // Update existing confirmation
  if (found.status !== 'Completed') {
    found.status = 'Completed';
    found.pickedQty = found.reqQty;
    found.confirmedAt = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    // Also update the corresponding picklist
    const picklist = DATA.picklists.find(r => r.id === found.plId);
    if (picklist) {
      picklist.status = 'Completed';
      renderPicklistTable();
    }
    
    renderPickConfirmTable(document.getElementById('confirm-search').value.toLowerCase());
    showToast(`✅ Pick List ${found.plId} confirmed successfully!`, 'success');
  } else {
    showToast(`ℹ️ Pick List ${found.plId} is already confirmed`, 'info');
  }
  
  // Clear input after confirmation
  input.value = '';
});

/* ============================================================
   ██████  PACKING MODULE
   ============================================================ */

// ---- Packing List ----
function getPackingData() {
  const q  = (document.getElementById('packing-search')?.value || '').toLowerCase();
  const st = document.getElementById('packing-status-filter')?.value || '';
  return DATA.packing.filter(r =>
    (!q  || r.id.toLowerCase().includes(q) || r.soId.toLowerCase().includes(q) || r.customer.toLowerCase().includes(q)) &&
    (!st || r.status === st)
  );
}

function renderPackingTable() {
  const filtered = getPackingData();
  const rows     = paginate(filtered, pageState.packing);
  const tbody    = document.getElementById('packing-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.packing - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.id}</td>
      <td>${r.soId}</td>
      <td>${r.customer}</td>
      <td>${r.items}</td>
      <td>${r.weight}</td>
      <td>${r.packer}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'pack-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="9" class="text-center py-8 text-[#7288AE]">No packing records found</td></tr>`;

  renderPagination('packing-pagination', filtered.length, pageState.packing, p => {
    pageState.packing = p; renderPackingTable();
  });

  tbody.querySelectorAll('.pack-edit').forEach(btn => {
    btn.addEventListener('click', () => openPackModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.packing.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.id, () => {
        DATA.packing.splice(DATA.packing.indexOf(rec), 1);
        renderPackingTable();
        showToast('Packing slip deleted');
      });
    });
  });
}

function openPackModal(id) {
  const rec = DATA.packing.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('Sales Order', inp('soId', rec.soId, 'e.g. SO-5040'))}
    ${field('Customer',    inp('customer', rec.customer, 'Customer name'))}
    ${field('Items',       inp('items', rec.items, 'Item count'))}
    ${field('Weight (kg)', inp('weight', rec.weight, 'Total weight'))}
    ${field('Packer',      sel('packer', PACKERS, rec.packer))}
    ${field('Status',      sel('status', ['Ready','Packing','Packed','Dispatched'], rec.status))}`;

  openModal(isNew ? 'New Packing Slip' : `Edit Pack — ${rec.id}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.soId || !vals.customer) { showToast('Sales Order and Customer required', 'error'); return; }
    if (isNew) {
      const newId = `PACK-${String(DATA.packing.length + 1).padStart(3,'0')}`;
      DATA.packing.unshift({ id: newId, ...vals, items: +vals.items, weight: +vals.weight });
    } else {
      Object.assign(rec, vals, { items: +vals.items, weight: +vals.weight });
    }
    renderPackingTable();
    closeModal();
    showToast(isNew ? 'Packing slip created' : 'Packing slip updated');
  });
}

document.getElementById('btn-new-pack').addEventListener('click', () => openPackModal(null));
document.getElementById('packing-search').addEventListener('input', () => { pageState.packing = 1; renderPackingTable(); });
document.getElementById('packing-status-filter').addEventListener('change', () => { pageState.packing = 1; renderPackingTable(); });

// ---- Label Printing ----
function renderLabelTable(filter = '') {
  const rows  = DATA.labels.filter(r =>
    !filter || r.packId.toLowerCase().includes(filter) || r.soId.toLowerCase().includes(filter) || r.customer.toLowerCase().includes(filter)
  );
  const tbody = document.getElementById('label-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td><input type="checkbox" class="label-chk w-3.5 h-3.5" data-id="${r.id}" ${r.printed ? 'checked' : ''} /></td>
      <td class="font-medium">${r.packId}</td>
      <td>${r.soId}</td>
      <td>${r.customer}</td>
      <td><span class="text-[#4B5694] font-medium">${r.labelType}</span></td>
      <td class="font-mono text-[10px]">${r.barcode}</td>
      <td>${r.printed
        ? '<span class="status-chip chip-printed">Printed</span>'
        : '<span class="status-chip chip-not-printed">Not Printed</span>'}</td>
      <td>
        <button class="btn-primary text-[10px] px-2.5 py-1 print-single" data-id="${r.id}">
          <i class="fas fa-print"></i> Print
        </button>
      </td>
    </tr>`).join('') : `<tr><td colspan="8" class="text-center py-8 text-[#7288AE]">No labels found</td></tr>`;

  // NEW CODE - ADD THIS:
// Use event delegation for dynamic elements
document.getElementById('label-tbody').addEventListener('click', function(e) {
  const printBtn = e.target.closest('.print-single');
  if (!printBtn) return;
  
  const id = printBtn.dataset.id;
  const rec = DATA.labels.find(r => r.id === id);
  if (!rec) return;
  
  rec.printed = true;
  
  // Update checkbox
  const row = printBtn.closest('tr');
  const chk = row?.querySelector('.label-chk');
  if (chk) chk.checked = true;
  
  // Re-render label table with current filter
  const searchVal = document.getElementById('label-search').value.toLowerCase();
  renderLabelTable(searchVal);
  
  // Show success with details
  showToast(`✅ Label for ${rec.packId} printed successfully!`, 'success');
});
}

document.getElementById('label-search').addEventListener('input', e => renderLabelTable(e.target.value.toLowerCase()));
document.getElementById('btn-print-selected').addEventListener('click', () => {
  const checked = document.querySelectorAll('.label-chk:checked');
  if (!checked.length) { showToast('Select labels to print', 'error'); return; }
  checked.forEach(chk => {
    const rec = DATA.labels.find(r => r.id === chk.dataset.id);
    if (rec) rec.printed = true;
  });
  renderLabelTable(document.getElementById('label-search').value.toLowerCase());
  showToast(`${checked.length} label(s) printed`);
});
document.getElementById('select-all-labels').addEventListener('change', function() {
  document.querySelectorAll('.label-chk').forEach(chk => { chk.checked = this.checked; });
});




document.getElementById('select-all-labels').addEventListener('change', function() {
  const isChecked = this.checked;
  document.querySelectorAll('.label-chk').forEach(chk => {
    chk.checked = isChecked;
  });
});

// Add keyboard shortcut for print selected (Ctrl+P)
document.addEventListener('keydown', function(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
    // Check if we're on the label printing tab
    const labelTab = document.getElementById('subtab-label-printing');
    if (labelTab && !labelTab.classList.contains('hidden')) {
      e.preventDefault();
      document.getElementById('btn-print-selected').click();
    }
  }
});

// ============================================================
// PRINT ALL LABELS - NEW FUNCTION
// ============================================================
function printAllLabels() {
  const unprinted = DATA.labels.filter(r => !r.printed);
  
  if (unprinted.length === 0) {
    showToast('ℹ️ All labels are already printed', 'info');
    return;
  }
  
  unprinted.forEach(rec => {
    rec.printed = true;
  });
  
  // Re-render label table
  const searchVal = document.getElementById('label-search').value.toLowerCase();
  renderLabelTable(searchVal);
  
  // Uncheck select all
  document.getElementById('select-all-labels').checked = false;
  
  showToast(`✅ ${unprinted.length} label(s) printed successfully!`, 'success');
}

/* ============================================================
   ██████  CYCLE COUNT MODULE
   ============================================================ */

// ---- Physical Verification ----
function getVerifyData() {
  const q  = (document.getElementById('verify-search')?.value || '').toLowerCase();
  const st = document.getElementById('verify-status-filter')?.value || '';
  return DATA.verify.filter(r =>
    (!q  || r.product.toLowerCase().includes(q) || r.bin.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
    (!st || r.status === st)
  );
}

function renderVerifyTable() {
  const filtered = getVerifyData();
  const rows     = paginate(filtered, pageState.verify);
  const tbody    = document.getElementById('verify-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${(pageState.verify - 1) * PAGE_SIZE + i + 1}</td>
      <td class="font-medium">${r.id}</td>
      <td>${r.product}</td>
      <td>${r.bin}</td>
      <td>${r.systemQty}</td>
      <td>${r.physicalQty || '—'}</td>
      <td class="font-semibold ${r.variance < 0 ? 'text-red-600' : r.variance > 0 ? 'text-amber-600' : 'text-emerald-700'}">
        ${r.variance !== 0 ? (r.variance > 0 ? '+' : '') + r.variance : r.status === 'Pending' ? '—' : '0'}
      </td>
      <td>${r.counter}</td>
      <td>${statusChip(r.status)}</td>
      <td>${actionBtns(r.id, 'verify-edit')}</td>
    </tr>`).join('') : `<tr><td colspan="10" class="text-center py-8 text-[#7288AE]">No count records found</td></tr>`;

  renderPagination('verify-pagination', filtered.length, pageState.verify, p => {
    pageState.verify = p; renderVerifyTable();
  });

  tbody.querySelectorAll('.verify-edit').forEach(btn => {
    btn.addEventListener('click', () => openVerifyModal(btn.dataset.id));
  });
  tbody.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.verify.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openDeleteModal(rec.id, () => {
        DATA.verify.splice(DATA.verify.indexOf(rec), 1);
        renderVerifyTable();
        showToast('Count record deleted');
      });
    });
  });
}

function openVerifyModal(id) {
  const rec = DATA.verify.find(r => r.id === id) || {};
  const isNew = !id;
  const html = `
    ${field('Product',      inp('product', rec.product, 'Product name'))}
    ${field('Bin',          inp('bin', rec.bin, 'Bin ID'))}
    ${field('System Qty',   inp('systemQty', rec.systemQty, '0'))}
    ${field('Physical Qty', inp('physicalQty', rec.physicalQty, '0'))}
    ${field('Counter',      sel('counter', COUNTERS, rec.counter))}
    ${field('Status',       sel('status', ['Pending','Counted','Verified','Discrepancy'], rec.status))}`;

  openModal(isNew ? 'Start Count' : `Edit Count — ${rec.id}`, html, () => {
    const vals = Object.fromEntries([...document.querySelectorAll('#modal-body [name]')].map(el => [el.name, el.value]));
    if (!vals.product || !vals.bin) { showToast('Product and Bin are required', 'error'); return; }
    const sQty = +vals.systemQty;
    const pQty = +vals.physicalQty;
    const variance = pQty - sQty;
    if (isNew) {
      DATA.verify.unshift({ id: `CNT-${String(DATA.verify.length + 1).padStart(3,'0')}`, ...vals, systemQty: sQty, physicalQty: pQty, variance });
    } else {
      Object.assign(rec, vals, { systemQty: sQty, physicalQty: pQty, variance });
    }
    renderVerifyTable();
    closeModal();
    showToast(isNew ? 'Count record created' : 'Count record updated');
  });
}

document.getElementById('btn-new-count').addEventListener('click', () => openVerifyModal(null));
document.getElementById('verify-search').addEventListener('input', () => { pageState.verify = 1; renderVerifyTable(); });
document.getElementById('verify-status-filter').addEventListener('change', () => { pageState.verify = 1; renderVerifyTable(); });

// ---- Audit Screen ----
function renderAuditTable(filter = '') {
  const rows  = DATA.audits.filter(r =>
    !filter || r.id.toLowerCase().includes(filter) || r.warehouse.toLowerCase().includes(filter) || r.auditor.toLowerCase().includes(filter)
  );
  const tbody = document.getElementById('audit-tbody');
  tbody.innerHTML = rows.length ? rows.map((r, i) => `
    <tr>
      <td>${i + 1}</td>
      <td class="font-medium">${r.id}</td>
      <td>${r.warehouse}</td>
      <td>${r.zone}</td>
      <td>${r.totalItems}</td>
      <td class="font-semibold ${r.discrepancies > 0 ? 'text-red-600' : 'text-emerald-700'}">${r.discrepancies}</td>
      <td>${r.auditor}</td>
      <td>${r.date}</td>
      <td>${statusChip(r.status)}</td>
      <td>
        <button class="btn-icon bg-[#111844]/8 text-[#4B5694] hover:bg-[#111844]/15 view-audit" data-id="${r.id}" title="View">
          <i class="fas fa-eye text-[10px]"></i>
        </button>
      </td>
    </tr>`).join('') : `<tr><td colspan="10" class="text-center py-8 text-[#7288AE]">No audit records found</td></tr>`;

  tbody.querySelectorAll('.view-audit').forEach(btn => {
    btn.addEventListener('click', () => {
      const rec = DATA.audits.find(r => r.id === btn.dataset.id);
      if (!rec) return;
      openModal(`Audit Details — ${rec.id}`, `
        <div class="space-y-3 text-xs">
          ${[['Audit ID',rec.id],['Warehouse',rec.warehouse],['Zone',rec.zone],['Total Items',rec.totalItems],
             ['Discrepancies',rec.discrepancies],['Auditor',rec.auditor],['Date',rec.date],['Status',statusChip(rec.status)]]
            .map(([k,v]) => `<div class="flex justify-between border-b border-[#4B5694]/10 pb-2"><span class="text-[#7288AE] font-medium">${k}</span><span class="font-semibold">${v}</span></div>`)
            .join('')}
        </div>`, null);
    });
  });
}

document.getElementById('audit-search').addEventListener('input', e => renderAuditTable(e.target.value.toLowerCase()));
// ============================================================
// AUDIT EXPORT - FIXED
// ============================================================
document.getElementById('btn-export-audit').addEventListener('click', function() {
  try {
    // Get current filter value
    const filter = document.getElementById('audit-search').value.toLowerCase();
    
    // Filter data
    let exportData = DATA.audits;
    if (filter) {
      exportData = exportData.filter(r => 
        r.id.toLowerCase().includes(filter) || 
        r.warehouse.toLowerCase().includes(filter) || 
        r.auditor.toLowerCase().includes(filter)
      );
    }
    
    if (exportData.length === 0) {
      showToast('⚠️ No audit records to export', 'error');
      return;
    }
    
    // Create CSV content
    const headers = ['Audit ID', 'Warehouse', 'Zone', 'Total Items', 'Discrepancies', 'Auditor', 'Date', 'Status'];
    const rows = exportData.map(r => [
      r.id,
      r.warehouse,
      r.zone,
      r.totalItems,
      r.discrepancies,
      r.auditor,
      r.date,
      r.status
    ]);
    
    // Build CSV
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Audit_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast(`✅ Audit report exported with ${exportData.length} records`, 'success');
  } catch (error) {
    showToast('❌ Export failed: ' + error.message, 'error');
  }
});

/* ============================================================
   ROW CLICK — DETAIL VIEW (non-action column click)
   ============================================================ */
function bindRowDetailView(tbodyId, dataKey, labelFn) {
  document.getElementById(tbodyId)?.addEventListener('click', e => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    const row = e.target.closest('tr');
    if (!row) return;
    const cells = row.querySelectorAll('td');
    if (!cells.length) return;
    // find record by displayed text in first data cell
  });
}

        // Sidebar Dropdown Toggle
        document.querySelectorAll('.nav-group-header').forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                const groupItems = this.nextElementSibling;
                const chevron = this.querySelector('.fa-chevron-down');
                
                if (groupItems) {
                    groupItems.classList.toggle('hidden');
                    if (chevron) {
                        chevron.style.transform = groupItems.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                }
            });
        });

        // Active menu highlighting based on current page
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-item').forEach(item => {
            const href = item.getAttribute('href');
            if (href && currentPath.includes(href.replace('/', ''))) {
                item.classList.add('nav-active');
                item.classList.remove('text-[#111844]/70');
                
                const parentGroup = item.closest('.nav-group-items');
                if (parentGroup) {
                    parentGroup.classList.remove('hidden');
                    const parentHeader = parentGroup.previousElementSibling;
                    if (parentHeader) {
                        parentHeader.classList.add('nav-active');
                        const chevron = parentHeader.querySelector('.fa-chevron-down');
                        if (chevron) chevron.style.transform = 'rotate(180deg)';
                    }
                }
            }
        });

        
/* ============================================================
   INIT — render all tables on page load
   ============================================================ */
function init() {
  renderPutawayTable();
  renderAllocTable();
  populateBinRackFilter();
  renderRackTable();
  renderBinTable();
  renderPicklistTable();
  renderPickConfirmTable();
  renderPackingTable();
  renderLabelTable();
  renderVerifyTable();
  renderAuditTable();
}

document.addEventListener('DOMContentLoaded', init);