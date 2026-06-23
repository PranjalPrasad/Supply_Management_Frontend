/* ============================================
   RETURNS MANAGEMENT — JS
   ============================================ */

'use strict';

// ---- Sample Data ----
let returns = [
  { id: 'RTN-2001', product: 'Steel Pipes (25mm)', qty: 12, party: 'Ramesh Traders', reason: 'Damaged Product', date: '2025-06-02', type: 'Customer Return', status: 'Approved', resolution: 'Replacement', remarks: 'Pipes bent during transit, unfit for use.' },
  { id: 'RTN-2002', product: 'Aluminium Sheets (4mm)', qty: 5,  party: 'Kumar Enterprises', reason: 'Wrong Product', date: '2025-06-04', type: 'Customer Return', status: 'Pending', resolution: '', remarks: 'Received 4mm instead of 2mm variant.' },
  { id: 'RTN-2003', product: 'Industrial Bearings', qty: 20, party: 'Apex Suppliers', reason: 'Quality Issue', date: '2025-06-05', type: 'Supplier Return', status: 'Under Review', resolution: '', remarks: 'High noise levels, failed quality check.' },
  { id: 'RTN-2004', product: 'Safety Gloves (XL)', qty: 50, party: 'Singh & Sons', reason: 'Expired Product', date: '2025-06-07', type: 'Customer Return', status: 'Rejected', resolution: 'Rejected', remarks: 'Expiry date exceeded — not covered under policy.' },
  { id: 'RTN-2005', product: 'Hydraulic Hoses', qty: 8,  party: 'Mehta Distributors', reason: 'Wrong Product', date: '2025-06-08', type: 'Customer Return', status: 'Pending', resolution: '', remarks: 'Diameter mismatch with PO specifications.' },
  { id: 'RTN-2006', product: 'Motor Coupling Set', qty: 3,  party: 'NovaTech Pvt Ltd', reason: 'Damaged Product', date: '2025-06-10', type: 'Supplier Return', status: 'Approved', resolution: 'Refund', remarks: 'Coupling cracked on delivery, refund processed.' },
  { id: 'RTN-2007', product: 'Packaging Cartons (L)', qty: 100, party: 'Gupta Packers', reason: 'Quality Issue', date: '2025-06-12', type: 'Supplier Return', status: 'Under Review', resolution: '', remarks: 'Cartons too thin, not meeting weight spec.' },
  { id: 'RTN-2008', product: 'Conveyor Belt Roll', qty: 2,  party: 'Ramesh Traders', reason: 'Damaged Product', date: '2025-06-14', type: 'Customer Return', status: 'Pending', resolution: '', remarks: 'Surface scratches and tears on delivery.' },
];

// ---- Config Maps ----
const statusConfig = {
  'Pending':      { badge: 'badge-pending',  icon: 'fa-hourglass-half',    label: 'Pending' },
  'Under Review': { badge: 'badge-review',   icon: 'fa-magnifying-glass',  label: 'Under Review' },
  'Approved':     { badge: 'badge-approved', icon: 'fa-circle-check',      label: 'Approved' },
  'Rejected':     { badge: 'badge-rejected', icon: 'fa-circle-xmark',      label: 'Rejected' },
};

const resolutionConfig = {
  'Replacement': { badge: 'badge-replaced', icon: 'fa-arrows-rotate',   label: 'Replacement' },
  'Refund':      { badge: 'badge-refunded', icon: 'fa-rupee-sign',       label: 'Refund' },
  'Rejected':    { badge: 'badge-rejected', icon: 'fa-xmark',            label: 'Rejected' },
};

const reasonConfig = {
  'Damaged Product': { cls: 'reason-damaged', icon: 'fa-triangle-exclamation' },
  'Wrong Product':   { cls: 'reason-wrong',   icon: 'fa-arrow-right-arrow-left' },
  'Quality Issue':   { cls: 'reason-quality', icon: 'fa-star-half-stroke' },
  'Expired Product': { cls: 'reason-expired', icon: 'fa-calendar-xmark' },
};

// ---- State ----
let activeTab = 'all';
let activeReturnId = null;

// ---- KPI ----
function updateKPIs() {
  document.getElementById('kpiTotal').textContent    = returns.length;
  document.getElementById('kpiPending').textContent  = returns.filter(r => r.status === 'Pending' || r.status === 'Under Review').length;
  document.getElementById('kpiApproved').textContent = returns.filter(r => r.status === 'Approved').length;
  document.getElementById('kpiRejected').textContent = returns.filter(r => r.status === 'Rejected').length;
}

// ---- Filter & Render ----
function getFiltered() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const reason = document.getElementById('reasonFilter').value;
  const date   = document.getElementById('dateFilter').value;

  return returns.filter(r => {
    const matchTab    = activeTab === 'all' || r.status === activeTab;
    const matchSearch = !search || r.id.toLowerCase().includes(search) || r.product.toLowerCase().includes(search) || r.party.toLowerCase().includes(search);
    const matchReason = !reason || r.reason === reason;
    const matchDate   = !date   || r.date === date;
    return matchTab && matchSearch && matchReason && matchDate;
  });
}

function renderTable() {
  const data  = getFiltered();
  const tbody = document.getElementById('returnsTableBody');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('recordCount');

  tbody.innerHTML = '';

  if (!data.length) {
    empty.classList.remove('hidden');
    empty.style.display = 'flex';
    count.textContent = 'No records found';
    return;
  }
  empty.classList.add('hidden');
  empty.style.display = '';
  count.textContent = `Showing ${data.length} record${data.length !== 1 ? 's' : ''}`;

  data.forEach(r => {
    const sCfg  = statusConfig[r.status] || statusConfig['Pending'];
    const rCfg  = reasonConfig[r.reason] || { cls: 'reason-quality', icon: 'fa-circle-info' };
    const resCfg = r.resolution ? (resolutionConfig[r.resolution] || null) : null;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3 font-semibold text-[#111844]">${r.id}</td>
      <td class="px-4 py-3 text-[#111844]">
        <div class="font-medium">${r.product}</div>
        <div class="text-[10px] text-[#7288AE] mt-0.5">${r.type}</div>
      </td>
      <td class="px-4 py-3 text-[#4B5694]">${r.party}</td>
      <td class="px-4 py-3 text-[#4B5694] font-medium">${r.qty}</td>
      <td class="px-4 py-3">
        <span class="reason-tag ${rCfg.cls}"><i class="fas ${rCfg.icon}"></i>${r.reason}</span>
      </td>
      <td class="px-4 py-3 text-[#7288AE]">${formatDate(r.date)}</td>
      <td class="px-4 py-3">
        <div class="flex flex-col gap-1">
          <span class="badge ${sCfg.badge}"><i class="fas ${sCfg.icon}"></i>${sCfg.label}</span>
          ${resCfg ? `<span class="badge ${resCfg.badge}" style="font-size:9.5px;padding:2px 6px"><i class="fas ${resCfg.icon}"></i>${resCfg.label}</span>` : ''}
        </div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center justify-center gap-1">
          <button class="action-btn action-btn-view" title="View Details" data-id="${r.id}" data-action="view">
            <i class="fas fa-eye pointer-events-none"></i>
          </button>
          ${r.status === 'Pending' || r.status === 'Under Review' ? `
          <button class="action-btn action-btn-approve" title="Approve" data-id="${r.id}" data-action="quick-approve">
            <i class="fas fa-check pointer-events-none"></i>
          </button>
          <button class="action-btn action-btn-reject" title="Reject" data-id="${r.id}" data-action="quick-reject">
            <i class="fas fa-xmark pointer-events-none"></i>
          </button>` : ''}
          <button class="action-btn action-btn-delete" title="Delete" data-id="${r.id}" data-action="delete">
            <i class="fas fa-trash-alt pointer-events-none"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function refresh() {
  updateKPIs();
  renderTable();
}

// ---- Detail Modal ----
function openDetail(id) {
  const r = returns.find(x => x.id === id);
  if (!r) return;
  activeReturnId = id;

  const sCfg  = statusConfig[r.status] || statusConfig['Pending'];
  const rCfg  = reasonConfig[r.reason] || { cls: 'reason-quality', icon: 'fa-circle-info' };
  const resCfg = r.resolution ? resolutionConfig[r.resolution] : null;

  document.getElementById('modalReturnNo').textContent = r.id;
  document.getElementById('dReturnNo').textContent = r.id;
  document.getElementById('dDate').textContent     = formatDate(r.date);
  document.getElementById('dProduct').textContent  = r.product;
  document.getElementById('dQty').textContent      = r.qty;
  document.getElementById('dParty').textContent    = r.party;
  document.getElementById('dRemarks').textContent  = r.remarks || '—';

  document.getElementById('dReason').innerHTML =
    `<span class="reason-tag ${rCfg.cls}"><i class="fas ${rCfg.icon}"></i>${r.reason}</span>`;
  document.getElementById('dStatus').innerHTML =
    `<span class="badge ${sCfg.badge}"><i class="fas ${sCfg.icon}"></i>${sCfg.label}</span>`;
  document.getElementById('dResolution').innerHTML = resCfg
    ? `<span class="badge ${resCfg.badge}"><i class="fas ${resCfg.icon}"></i>${resCfg.label}</span>`
    : '<span class="text-[#7288AE] text-xs">Not yet resolved</span>';

  buildTimeline(r.status, r.resolution);

  // Show/hide quick actions
  const qa = document.getElementById('quickActions');
  qa.style.display = (r.status === 'Pending' || r.status === 'Under Review') ? '' : 'none';

  document.getElementById('detailModal').classList.remove('hidden');
}

function buildTimeline(status, resolution) {
  const steps = [
    { key: 'submitted',  label: 'Return Submitted',   sub: 'Request raised by customer/supplier', icon: 'fa-rotate-left', dot: 'timeline-dot-done' },
    { key: 'review',     label: 'Under Review',        sub: 'Reviewing return reason and proof',    icon: 'fa-magnifying-glass', dot: status === 'Pending' ? 'timeline-dot-pending' : (status === 'Under Review' ? 'timeline-dot-active' : 'timeline-dot-done') },
    { key: 'decision',   label: status === 'Rejected' ? 'Rejected' : 'Approved', sub: status === 'Rejected' ? 'Return request rejected' : 'Return accepted', icon: status === 'Rejected' ? 'fa-circle-xmark' : 'fa-circle-check', dot: (status === 'Approved' || status === 'Rejected') ? (status === 'Rejected' ? 'timeline-dot-danger' : 'timeline-dot-done') : 'timeline-dot-pending' },
  ];

  if (resolution === 'Replacement' || resolution === 'Refund') {
    steps.push({
      key: 'resolved', label: resolution === 'Replacement' ? 'Replacement Dispatched' : 'Refund Processed',
      sub: resolution === 'Replacement' ? 'New product shipped to customer' : 'Refund credited to account',
      icon: resolution === 'Replacement' ? 'fa-arrows-rotate' : 'fa-rupee-sign',
      dot: 'timeline-dot-done'
    });
  }

  const container = document.getElementById('modalTimeline');
  container.innerHTML = steps.map(s => `
    <div class="timeline-item">
      <div class="timeline-dot ${s.dot}"><i class="fas ${s.icon}"></i></div>
      <div>
        <div class="timeline-title">${s.label}</div>
        <div class="timeline-sub">${s.sub}</div>
      </div>
    </div>
  `).join('');
}

function closeDetail() {
  document.getElementById('detailModal').classList.add('hidden');
  activeReturnId = null;
}

// ---- Quick Actions from Modal ----
function updateStatus(id, status, resolution = '') {
  const idx = returns.findIndex(r => r.id === id);
  if (idx === -1) return;
  returns[idx].status = status;
  if (resolution) returns[idx].resolution = resolution;
  closeDetail();
  refresh();
}

document.getElementById('btnApproveReplace').addEventListener('click', () => {
  if (activeReturnId) { updateStatus(activeReturnId, 'Approved', 'Replacement'); showToast(`${activeReturnId} — Replacement approved!`, 'success'); }
});
document.getElementById('btnApproveRefund').addEventListener('click', () => {
  if (activeReturnId) { updateStatus(activeReturnId, 'Approved', 'Refund'); showToast(`${activeReturnId} — Refund approved!`, 'success'); }
});
document.getElementById('btnUnderReview').addEventListener('click', () => {
  if (activeReturnId) { updateStatus(activeReturnId, 'Under Review'); showToast(`${activeReturnId} moved to Under Review.`, 'info'); }
});
document.getElementById('btnReject').addEventListener('click', () => {
  if (activeReturnId) { updateStatus(activeReturnId, 'Rejected', 'Rejected'); showToast(`${activeReturnId} — Return rejected.`, 'warn'); }
});

// ---- Add Return Modal ----
function openAdd() {
  document.getElementById('addModal').classList.remove('hidden');
  document.getElementById('fDate').value = new Date().toISOString().split('T')[0];
}
function closeAdd() {
  document.getElementById('addModal').classList.add('hidden');
  ['fProduct','fQty','fParty','fDate','fRemarks'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('fReason').value = '';
  document.getElementById('fType').value = 'Customer Return';
}

function saveReturn() {
  const product = document.getElementById('fProduct').value.trim();
  const qty     = parseInt(document.getElementById('fQty').value);
  const party   = document.getElementById('fParty').value.trim();
  const date    = document.getElementById('fDate').value;
  const reason  = document.getElementById('fReason').value;
  const type    = document.getElementById('fType').value;
  const remarks = document.getElementById('fRemarks').value.trim();

  if (!product || !qty || !party || !date || !reason) {
    showToast('Please fill in all required fields.', 'error'); return;
  }

  const newId = 'RTN-' + (2009 + returns.length);
  returns.unshift({ id: newId, product, qty, party, reason, date, type, status: 'Pending', resolution: '', remarks });
  closeAdd();
  refresh();
  showToast(`Return ${newId} submitted successfully!`, 'success');
}

function deleteReturn(id) {
  if (!confirm(`Delete return ${id}? This cannot be undone.`)) return;
  returns = returns.filter(r => r.id !== id);
  refresh();
  showToast(`Return ${id} deleted.`, 'info');
}

// ---- Table Delegation ----
document.getElementById('returnsTableBody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id     = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === 'view')         openDetail(id);
  if (action === 'delete')       deleteReturn(id);
  if (action === 'quick-approve') {
    const idx = returns.findIndex(r => r.id === id);
    returns[idx].status = 'Approved'; returns[idx].resolution = 'Replacement';
    refresh(); showToast(`${id} approved for replacement.`, 'success');
  }
  if (action === 'quick-reject') {
    const idx = returns.findIndex(r => r.id === id);
    returns[idx].status = 'Rejected'; returns[idx].resolution = 'Rejected';
    refresh(); showToast(`${id} rejected.`, 'warn');
  }
});

// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('tab-active');
      b.classList.add('text-[#7288AE]');
    });
    this.classList.add('tab-active');
    this.classList.remove('text-[#7288AE]');
    activeTab = this.dataset.tab;
    renderTable();
  });
});

// ---- Filters ----
document.getElementById('searchInput').addEventListener('input', renderTable);
document.getElementById('reasonFilter').addEventListener('change', renderTable);
document.getElementById('dateFilter').addEventListener('change', renderTable);
document.getElementById('clearFiltersBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('reasonFilter').value = '';
  document.getElementById('dateFilter').value = '';
  renderTable();
});

document.getElementById('addReturnBtn').addEventListener('click', openAdd);
document.getElementById('closeAddBtn').addEventListener('click', closeAdd);
document.getElementById('cancelAddBtn').addEventListener('click', closeAdd);
document.getElementById('saveReturnBtn').addEventListener('click', saveReturn);
document.getElementById('closeDetailBtn').addEventListener('click', closeDetail);

document.getElementById('detailModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeDetail(); });
document.getElementById('addModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeAdd(); });

// ---- Sidebar ----
let isCollapsed = false;
const sidebar       = document.getElementById('sidebar');
const mainWrapper   = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay       = document.getElementById('sidebar-overlay');

function updateChevron() {
  const icon = sidebarToggle?.querySelector('i');
  if (!icon) return;
  icon.className = (window.innerWidth >= 1024 && isCollapsed) ? 'fas fa-chevron-right text-sm' : 'fas fa-chevron-left text-sm';
}

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay?.classList.toggle('hidden');
  } else {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
    mainWrapper.style.marginLeft = isCollapsed ? '68px' : '';
  }
  updateChevron();
});

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
  sidebar.classList.add('sidebar-open');
  overlay?.classList.remove('hidden');
});

overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
  updateChevron();
});

window.addEventListener('resize', () => {
  updateChevron();
  if (window.innerWidth >= 1024) { sidebar?.classList.remove('sidebar-open'); overlay?.classList.add('hidden'); }
});

// ---- Sidebar Dropdowns ----
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function (e) {
    e.stopPropagation();
    const items   = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (items) { items.classList.toggle('hidden'); if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)'; }
  });
});

// ---- Header Dropdowns ----
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', e => {
  if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target))  userMenu?.classList.add('hidden');
  if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ---- Toast ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info', warn: 'fa-triangle-exclamation' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type === 'warn' ? 'warn' : type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ---- Helpers ----
function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- Init ----
updateChevron();
refresh();