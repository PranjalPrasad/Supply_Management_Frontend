/* returns.js — Returns Management Module */

/* ────────────────────────────────────────
   SIDEBAR
──────────────────────────────────────── */
const sidebar      = document.getElementById('sidebar');
const mainWrapper  = document.getElementById('main-wrapper');
const sidebarToggle= document.getElementById('sidebar-toggle');
const overlay      = document.getElementById('sidebar-overlay');
let isCollapsed = false;

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay?.classList.toggle('hidden');
  } else {
    isCollapsed = !isCollapsed;
    if (isCollapsed) {
      sidebar.classList.add('sidebar-collapsed');
      mainWrapper.style.marginLeft = '68px';
      sidebarToggle.querySelector('i').className = 'fas fa-chevron-right text-sm';
    } else {
      sidebar.classList.remove('sidebar-collapsed');
      mainWrapper.style.marginLeft = '';
      sidebarToggle.querySelector('i').className = 'fas fa-chevron-left text-sm';
    }
  }
});

overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024 && sidebar.classList.contains('sidebar-open')) {
    sidebar.classList.remove('sidebar-open');
    overlay?.classList.add('hidden');
  }
});

/* Sidebar dropdown groups */
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function(e) {
    e.stopPropagation();
    const items   = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (items) {
      items.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});

/* ────────────────────────────────────────
   TOPBAR MENUS
──────────────────────────────────────── */
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', e => {
  if (!userBtn?.contains(e.target)  && !userMenu?.contains(e.target))  userMenu?.classList.add('hidden');
  if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

/* ────────────────────────────────────────
   TAB SYSTEM
──────────────────────────────────────── */
const tabs   = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('tab-active'));
    panels.forEach(p => p.classList.remove('active'));
    btn.classList.add('tab-active');
    const target = document.getElementById('panel-' + btn.dataset.tab);
    if (target) target.classList.add('active');
  });
});

/* ────────────────────────────────────────
   TOAST
──────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const tc = document.getElementById('toast-container');
  const colors = {
    success: 'bg-emerald-600',
    error:   'bg-red-500',
    info:    'bg-[#111844]',
    warning: 'bg-amber-500'
  };
  const icons = {
    success: 'fa-check-circle',
    error:   'fa-times-circle',
    info:    'fa-info-circle',
    warning: 'fa-exclamation-triangle'
  };
  const t = document.createElement('div');
  t.className = `toast-animate flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[type]} max-w-xs`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i><span>${msg}</span>`;
  tc.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(-8px)'; t.style.transition = 'all .3s ease'; setTimeout(() => t.remove(), 300); }, 3000);
}

/* ────────────────────────────────────────
   MODAL HELPERS
──────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
}
// close on overlay click
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) closeModal(m.id); });
});

/* ────────────────────────────────────────
   DATA
──────────────────────────────────────── */
const customerReturns = [
  { id:'CRN-1001', date:'2025-06-10', customer:'Ramesh Traders', product:'Steel Pipes (25mm)', qty:12, reason:'Defective batch', status:'inspecting', amount:'₹18,400' },
  { id:'CRN-1002', date:'2025-06-09', customer:'Sharma & Sons',  product:'Industrial Bearings', qty:5,  reason:'Wrong specification', status:'approved',   amount:'₹7,250'  },
  { id:'CRN-1003', date:'2025-06-08', customer:'Metro Supplies',  product:'Packaging Cartons (L)', qty:30, reason:'Damaged in transit', status:'completed', amount:'₹3,600' },
  { id:'CRN-1004', date:'2025-06-07', customer:'Patel Pvt Ltd',   product:'Hydraulic Hoses',  qty:8,  reason:'Quality issue',       status:'pending',    amount:'₹11,200' },
  { id:'CRN-1005', date:'2025-06-06', customer:'GK Enterprises',  product:'Safety Gloves (XL)', qty:50, reason:'Wrong size supplied', status:'rejected',   amount:'₹4,500'  },
  { id:'CRN-1006', date:'2025-06-05', customer:'Sunrise Mfg',     product:'Motor Coupling Set', qty:3,  reason:'Part missing',        status:'approved',   amount:'₹9,300'  },
];

const supplierReturns = [
  { id:'SRN-2001', date:'2025-06-11', supplier:'Tata Steel Ltd',     product:'Aluminium Sheets (4mm)', qty:20, reason:'Sub-standard quality', status:'pending',   amount:'₹32,000' },
  { id:'SRN-2002', date:'2025-06-09', supplier:'Bharat Bearings',     product:'Industrial Bearings',   qty:10, reason:'Dimensional inaccuracy',status:'approved',  amount:'₹14,500' },
  { id:'SRN-2003', date:'2025-06-07', supplier:'National Packaging',  product:'Conveyor Belt Roll',    qty:2,  reason:'Tear on delivery',       status:'completed', amount:'₹28,000' },
  { id:'SRN-2004', date:'2025-06-05', supplier:'Apex Hydraulics',     product:'Hydraulic Hoses',       qty:15, reason:'Burst pressure failure', status:'inspecting',amount:'₹21,750' },
];

const damageRecords = [
  { id:'DMG-3001', date:'2025-06-10', product:'Steel Pipes (25mm)',    location:'Warehouse A', cause:'Forklift collision',   severity:'high',   qty:8,  status:'scrapped', cost:'₹12,400' },
  { id:'DMG-3002', date:'2025-06-09', product:'Packaging Cartons (L)', location:'Warehouse B', cause:'Water damage',         severity:'medium', qty:25, status:'scrapped', cost:'₹3,000'  },
  { id:'DMG-3003', date:'2025-06-08', product:'Safety Gloves (XL)',    location:'Warehouse C', cause:'Storage mishandling',  severity:'low',    qty:15, status:'damaged',  cost:'₹1,350'  },
  { id:'DMG-3004', date:'2025-06-07', product:'Conveyor Belt Roll',    location:'Warehouse A', cause:'Improper stacking',    severity:'high',   qty:1,  status:'scrapped', cost:'₹14,000' },
  { id:'DMG-3005', date:'2025-06-06', product:'Industrial Bearings',   location:'Warehouse D', cause:'Corrosion',            severity:'medium', qty:6,  status:'damaged',  cost:'₹8,700'  },
];

const creditNotes = [
  { id:'CN-4001', date:'2025-06-11', party:'Ramesh Traders',  ref:'CRN-1001', amount:'₹18,400', type:'Customer', status:'credited' },
  { id:'CN-4002', date:'2025-06-09', party:'Sharma & Sons',   ref:'CRN-1002', amount:'₹7,250',  type:'Customer', status:'credited' },
  { id:'CN-4003', date:'2025-06-09', party:'Bharat Bearings', ref:'SRN-2002', amount:'₹14,500', type:'Supplier', status:'credited' },
  { id:'CN-4004', date:'2025-06-07', party:'Metro Supplies',  ref:'CRN-1003', amount:'₹3,600',  type:'Customer', status:'pending'  },
  { id:'CN-4005', date:'2025-06-05', party:'Apex Hydraulics', ref:'SRN-2004', amount:'₹21,750', type:'Supplier', status:'pending'  },
];

const replacements = [
  { id:'RPL-5001', date:'2025-06-10', ref:'CRN-1002', customer:'Sharma & Sons', product:'Industrial Bearings', qty:5,  dispatch:'2025-06-13', status:'replaced' },
  { id:'RPL-5002', date:'2025-06-09', ref:'CRN-1006', customer:'Sunrise Mfg',   product:'Motor Coupling Set', qty:3,  dispatch:'2025-06-12', status:'replaced' },
  { id:'RPL-5003', date:'2025-06-08', ref:'CRN-1004', customer:'Patel Pvt Ltd', product:'Hydraulic Hoses',    qty:8,  dispatch:'—',          status:'pending'  },
];

/* ────────────────────────────────────────
   RENDER HELPERS
──────────────────────────────────────── */
function badgeHtml(status) {
  const map = {
    pending:    'badge-pending',
    approved:   'badge-approved',
    rejected:   'badge-rejected',
    inspecting: 'badge-inspecting',
    completed:  'badge-completed',
    scrapped:   'badge-scrapped',
    replaced:   'badge-replaced',
    credited:   'badge-credited',
    damaged:    'badge-damaged',
  };
  const icons = {
    pending:    'fa-clock',
    approved:   'fa-check',
    rejected:   'fa-times',
    inspecting: 'fa-search',
    completed:  'fa-check-circle',
    scrapped:   'fa-trash',
    replaced:   'fa-exchange-alt',
    credited:   'fa-receipt',
    damaged:    'fa-exclamation-triangle',
  };
  const cls = map[status] || 'badge-pending';
  const ico = icons[status] || 'fa-circle';
  return `<span class="badge ${cls}"><i class="fas ${ico}"></i> ${status.charAt(0).toUpperCase()+status.slice(1)}</span>`;
}

function sevHtml(sev) {
  const cfg = { low: { pct:30, cls:'bg-emerald-400' }, medium: { pct:60, cls:'bg-amber-400' }, high: { pct:95, cls:'bg-red-500' } };
  const c = cfg[sev] || cfg.medium;
  return `<div class="sev-bar"><div class="sev-fill ${c.cls}" style="width:${c.pct}%"></div></div>
          <span style="font-size:9.5px;color:#7288AE;text-transform:capitalize">${sev}</span>`;
}

/* ────────────────────────────────────────
   TABLE RENDERERS
──────────────────────────────────────── */
function renderCustomerReturns(data) {
  const tbody = document.getElementById('cr-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr onclick="openDetailModal('${r.id}')">
      <td class="font-semibold text-[#4B5694]">${r.id}</td>
      <td>${r.date}</td>
      <td>${r.customer}</td>
      <td>${r.product}</td>
      <td class="text-center">${r.qty}</td>
      <td>${r.reason}</td>
      <td>${badgeHtml(r.status)}</td>
      <td class="font-semibold">${r.amount}</td>
      <td>
        <div class="flex gap-1">
          <button class="btn-icon" title="View" onclick="event.stopPropagation();openDetailModal('${r.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn-icon" title="Approve" onclick="event.stopPropagation();approveReturn('${r.id}')"><i class="fas fa-check"></i></button>
          <button class="btn-icon danger" title="Reject" onclick="event.stopPropagation();rejectReturn('${r.id}')"><i class="fas fa-times"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function renderSupplierReturns(data) {
  const tbody = document.getElementById('sr-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr onclick="openDetailModal('${r.id}')">
      <td class="font-semibold text-[#4B5694]">${r.id}</td>
      <td>${r.date}</td>
      <td>${r.supplier}</td>
      <td>${r.product}</td>
      <td class="text-center">${r.qty}</td>
      <td>${r.reason}</td>
      <td>${badgeHtml(r.status)}</td>
      <td class="font-semibold">${r.amount}</td>
      <td>
        <div class="flex gap-1">
          <button class="btn-icon" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn-icon" title="Approve" onclick="event.stopPropagation();showToast('Supplier return approved','success')"><i class="fas fa-check"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function renderDamage(data) {
  const tbody = document.getElementById('dmg-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="font-semibold text-[#4B5694]">${r.id}</td>
      <td>${r.date}</td>
      <td>${r.product}</td>
      <td>${r.location}</td>
      <td>${r.cause}</td>
      <td>${sevHtml(r.severity)}</td>
      <td class="text-center">${r.qty}</td>
      <td>${badgeHtml(r.status)}</td>
      <td class="font-semibold text-red-600">${r.cost}</td>
      <td>
        <div class="flex gap-1">
          <button class="btn-icon" title="View"><i class="fas fa-eye"></i></button>
          <button class="btn-icon danger" title="Mark Scrap" onclick="event.stopPropagation();showToast('Marked as scrap','info')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>`).join('');
}

function renderCreditNotes(data) {
  const container = document.getElementById('cn-list');
  if (!container) return;
  container.innerHTML = data.map(cn => `
    <div class="cn-card">
      <div class="flex items-center gap-10">
        <div>
          <div class="font-semibold text-[#111844] text-sm">${cn.id}</div>
          <div class="text-[10px] text-[#7288AE] mt-0.5">${cn.date} · Ref: ${cn.ref}</div>
        </div>
        <div>
          <div class="text-xs text-[#7288AE]">${cn.party}</div>
          <span class="badge ${cn.type==='Customer'?'badge-inspecting':'badge-pending'}" style="font-size:9px;padding:1px 6px">${cn.type}</span>
        </div>
      </div>
      <div class="text-right">
        <div class="font-bold text-[#111844] text-base">${cn.amount}</div>
        <div class="mt-1">${badgeHtml(cn.status)}</div>
      </div>
    </div>`).join('');
}

function renderReplacements(data) {
  const tbody = document.getElementById('rpl-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="font-semibold text-[#4B5694]">${r.id}</td>
      <td>${r.date}</td>
      <td class="text-[#4B5694]">${r.ref}</td>
      <td>${r.customer}</td>
      <td>${r.product}</td>
      <td class="text-center">${r.qty}</td>
      <td>${r.dispatch}</td>
      <td>${badgeHtml(r.status)}</td>
      <td>
        <button class="btn-icon" title="Track"><i class="fas fa-location-dot"></i></button>
      </td>
    </tr>`).join('');
}

/* ────────────────────────────────────────
   SEARCH / FILTER
──────────────────────────────────────── */
function setupSearch(inputId, statusId, data, renderFn, fields) {
  const inp = document.getElementById(inputId);
  const sel = document.getElementById(statusId);
  function filter() {
    const q   = (inp?.value || '').toLowerCase();
    const st  = sel?.value || '';
    const out = data.filter(r => {
      const matchQ  = fields.some(f => (r[f]||'').toLowerCase().includes(q));
      const matchSt = !st || r.status === st;
      return matchQ && matchSt;
    });
    renderFn(out);
  }
  inp?.addEventListener('input', filter);
  sel?.addEventListener('change', filter);
}

/* ────────────────────────────────────────
   DETAIL MODAL
──────────────────────────────────────── */
function openDetailModal(id) {
  const r = customerReturns.find(x => x.id === id) || supplierReturns.find(x => x.id === id);
  if (!r) return;
  const body = document.getElementById('detail-body');
  const steps = ['Request','Approved','Inspection','Settlement'];
  const stIdx = { pending:0, approved:1, inspecting:2, completed:3, credited:3, rejected:1 };
  const cur = stIdx[r.status] ?? 0;
  const stepHtml = steps.map((s,i) => `
    <div class="step-bar-item ${i < cur ? 'done' : i===cur ? 'active' : ''}">
      <div class="step-circle">${i < cur ? '<i class="fas fa-check" style="font-size:9px"></i>' : i+1}</div>
      <div class="step-label">${s}</div>
    </div>`).join('');

  body.innerHTML = `
    <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-xs mb-4">
      <div><span class="text-[#7288AE]">Return ID</span><div class="font-semibold mt-0.5">${r.id}</div></div>
      <div><span class="text-[#7288AE]">Date</span><div class="font-semibold mt-0.5">${r.date}</div></div>
      <div><span class="text-[#7288AE]">${r.supplier?'Supplier':'Customer'}</span><div class="font-semibold mt-0.5">${r.customer||r.supplier}</div></div>
      <div><span class="text-[#7288AE]">Product</span><div class="font-semibold mt-0.5">${r.product}</div></div>
      <div><span class="text-[#7288AE]">Qty</span><div class="font-semibold mt-0.5">${r.qty} units</div></div>
      <div><span class="text-[#7288AE]">Amount</span><div class="font-bold text-[#111844] mt-0.5">${r.amount}</div></div>
      <div class="col-span-2"><span class="text-[#7288AE]">Reason</span><div class="font-semibold mt-0.5">${r.reason}</div></div>
      <div class="col-span-2"><span class="text-[#7288AE]">Status</span><div class="mt-0.5">${badgeHtml(r.status)}</div></div>
    </div>
    <div class="section-title mb-3"><i class="fas fa-route mr-1.5 text-[#4B5694]"></i>Return Progress</div>
    <div class="step-bar mb-4">${stepHtml}</div>
    <div class="flex gap-2 justify-end mt-4 pt-4 border-t border-[#4B5694]/10">
      <button class="btn-secondary" onclick="showToast('Credit note raised','success')"><i class="fas fa-receipt"></i> Raise Credit Note</button>
      <button class="btn-primary" onclick="showToast('Replacement initiated','info')"><i class="fas fa-exchange-alt"></i> Initiate Replacement</button>
    </div>`;
  openModal('modal-detail');
}

/* ────────────────────────────────────────
   ACTION HANDLERS
──────────────────────────────────────── */
function approveReturn(id) { showToast(`Return ${id} approved`, 'success'); }
function rejectReturn(id)  { showToast(`Return ${id} rejected`, 'error');   }

/* New Return Request form */
document.getElementById('form-new-return')?.addEventListener('submit', e => {
  e.preventDefault();
  closeModal('modal-new-return');
  showToast('Return request raised successfully', 'success');
});

/* New Damage Record form */
document.getElementById('form-new-damage')?.addEventListener('submit', e => {
  e.preventDefault();
  closeModal('modal-new-damage');
  showToast('Damage record saved', 'info');
});

/* ────────────────────────────────────────
   INIT
──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderCustomerReturns(customerReturns);
  renderSupplierReturns(supplierReturns);
  renderDamage(damageRecords);
  renderCreditNotes(creditNotes);
  renderReplacements(replacements);

  setupSearch('cr-search', 'cr-status', customerReturns, renderCustomerReturns, ['id','customer','product','reason']);
  setupSearch('sr-search', 'sr-status', supplierReturns, renderSupplierReturns, ['id','supplier','product','reason']);
  setupSearch('dmg-search','dmg-status', damageRecords, renderDamage, ['id','product','location','cause']);
});