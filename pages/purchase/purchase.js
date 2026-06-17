/* ============================================================
   Purchase Module — JS
   ============================================================ */

/* ── Sidebar ──────────────────────────────────────────────── */
function initSidebar(){
  const sidebar     = document.getElementById('sidebar');
  const mainWrapper = document.getElementById('main-wrapper');
  const toggle      = document.getElementById('sidebar-toggle');
  const overlay     = document.getElementById('sidebar-overlay');
  let collapsed = false;

  toggle?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('visible');
    } else {
      collapsed = !collapsed;
      sidebar.classList.toggle('collapsed', collapsed);
      mainWrapper.classList.toggle('expanded', collapsed);
    }
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('visible');
  });

  // Group dropdowns
 document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', e => {
    e.stopPropagation();
    const items = header.nextElementSibling;
    if (!items) return;
    items.classList.toggle('show');
    const chevron = header.querySelector('.fa-chevron-down');
    if (chevron) {
      chevron.style.transform = items.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
    }
  });
});}

initSidebar();
/* ── Topbar Dropdowns ─────────────────────────────────────── */
(function initTopbar() {
  const notifBtn  = document.getElementById('notif-btn');
  const notifDrop = document.getElementById('notif-dropdown');
  const userBtn   = document.getElementById('user-btn');
  const userDrop  = document.getElementById('user-dropdown');

  const closeAll = () => {
    notifDrop?.classList.remove('open');
    userDrop?.classList.remove('open');
  };

  notifBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const o = notifDrop.classList.toggle('open');
    if (o) userDrop?.classList.remove('open');
  });

  userBtn?.addEventListener('click', e => {
    e.stopPropagation();
    const o = userDrop.classList.toggle('open');
    if (o) notifDrop?.classList.remove('open');
  });

  document.addEventListener('click', closeAll);
})();

/* ── Toast ────────────────────────────────────────────────── */
function showToast(message, type = 'info', duration = 3000) {
  const icons = { success:'check-circle', error:'times-circle', warning:'exclamation-triangle', info:'info-circle' };
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

/* ── Overlay helpers ──────────────────────────────────────── */
function openOverlay(id) {
  document.getElementById(id)?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeOverlay(id) {
  document.getElementById(id)?.classList.remove('open');
  document.body.style.overflow = '';
}

// Close overlay on backdrop click
document.addEventListener('click', e => {
  if (e.target.classList.contains('overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ── Tab Navigation ───────────────────────────────────────── */
(function initTabs() {
  const tabBtns  = document.querySelectorAll('.tab-btn[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  // Function to update breadcrumb
  function updateBreadcrumb(tabLabel) {
    const bcCurrent = document.getElementById('bc-current');
    if (bcCurrent) {
      bcCurrent.textContent = tabLabel;
    }
  }

  // Function to activate a specific tab
  function activateTab(btn) {
    // Remove active class from all tabs
    tabBtns.forEach(b => b.classList.remove('active'));
    
    // Hide all panes
    tabPanes.forEach(p => {
      p.classList.add('hidden');
      p.style.display = 'none';  // Force hide
    });
    
    // Add active class to clicked tab
    btn.classList.add('active');
    
    // Show the corresponding pane
    const targetId = btn.dataset.tab;
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.remove('hidden');
      targetPane.style.display = 'block';  // Force show
    }
    
    // Update breadcrumb with the tab label
    const tabLabelSpan = btn.querySelector('.tab-label');
    if (tabLabelSpan) {
      updateBreadcrumb(tabLabelSpan.textContent);
    } else {
      updateBreadcrumb(btn.textContent.trim());
    }
  }

  // Add click event to each tab button
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(btn);
    });
  });
  
  // Set initial state - only show the active tab pane
  const activeTab = document.querySelector('.tab-btn.active');
  if (activeTab) {
    const tabLabelSpan = activeTab.querySelector('.tab-label');
    if (tabLabelSpan) {
      updateBreadcrumb(tabLabelSpan.textContent);
    } else {
      updateBreadcrumb(activeTab.textContent.trim());
    }
    
    // Hide all panes first, then show active one
    tabPanes.forEach(p => {
      p.classList.add('hidden');
      p.style.display = 'none';
    });
    
    const activePaneId = activeTab.dataset.tab;
    const activePane = document.getElementById(activePaneId);
    if (activePane) {
      activePane.classList.remove('hidden');
      activePane.style.display = 'block';
    }
  } else if (tabPanes.length > 0) {
    // If no active tab, show first pane
    tabPanes.forEach((p, idx) => {
      if (idx === 0) {
        p.classList.remove('hidden');
        p.style.display = 'block';
      } else {
        p.classList.add('hidden');
        p.style.display = 'none';
      }
    });
  }
})();

/* ══════════════════════════════════════════════════════════
   DATA STORE (mock)
══════════════════════════════════════════════════════════ */
const DB = {
  products: [
    { id:'P001', name:'Steel Pipes (25mm)', sku:'SP-25', unit:'Pcs' },
    { id:'P002', name:'Industrial Bearings', sku:'IB-01', unit:'Pcs' },
    { id:'P003', name:'Aluminium Sheets (4mm)', sku:'AS-04', unit:'Kg' },
    { id:'P004', name:'Hydraulic Hoses', sku:'HH-10', unit:'Mtr' },
    { id:'P005', name:'Packaging Cartons (L)', sku:'PC-L', unit:'Pcs' },
    { id:'P006', name:'Motor Coupling Set', sku:'MC-01', unit:'Set' },
    { id:'P007', name:'Safety Gloves (XL)', sku:'SG-XL', unit:'Pair' },
    { id:'P008', name:'Conveyor Belt Roll', sku:'CB-01', unit:'Mtr' },
  ],
  suppliers: [
    { id:'S001', name:'Ramesh Metal Traders', contact:'Mr. Ramesh', terms:'30 Days Net' },
    { id:'S002', name:'Global Steel Corp', contact:'Ms. Priya', terms:'45 Days Net' },
    { id:'S003', name:'Prime Bearings Ltd', contact:'Mr. Kumar', terms:'15 Days Net' },
    { id:'S004', name:'Horizon Packing Co.', contact:'Ms. Anita', terms:'Cash' },
  ],
  departments: ['Production','Maintenance','Logistics','Admin','Quality'],

  requisitions: [
    { id:'REQ-001', date:'2026-06-01', dept:'Production', by:'Anil Kumar', items:3, priority:'High', status:'Approved', approvedBy:'Director' },
    { id:'REQ-002', date:'2026-06-04', dept:'Maintenance', by:'Suresh Rao', items:2, priority:'Medium', status:'Submitted', approvedBy:'-' },
    { id:'REQ-003', date:'2026-06-07', dept:'Logistics', by:'Meena Joshi', items:5, priority:'Low', status:'Draft', approvedBy:'-' },
    { id:'REQ-004', date:'2026-06-08', dept:'Production', by:'Vijay Patil', items:4, priority:'High', status:'Rejected', approvedBy:'Manager' },
    { id:'REQ-005', date:'2026-06-10', dept:'Admin', by:'Ritu Sharma', items:1, priority:'Low', status:'Approved', approvedBy:'Director' },
  ],
  pos: [
    { id:'PO-2041', date:'2026-05-28', supplier:'Ramesh Metal Traders', amount:'₹84,200', delivery:'2026-06-03', status:'Completed' },
    { id:'PO-2042', date:'2026-06-01', supplier:'Global Steel Corp', amount:'₹1,26,500', delivery:'2026-06-10', status:'Sent To Supplier' },
    { id:'PO-2043', date:'2026-06-05', supplier:'Prime Bearings Ltd', amount:'₹42,800', delivery:'2026-06-14', status:'Approved' },
    { id:'PO-2044', date:'2026-06-08', supplier:'Horizon Packing Co.', amount:'₹18,000', delivery:'2026-06-12', status:'Draft' },
    { id:'PO-2045', date:'2026-06-10', supplier:'Ramesh Metal Traders', amount:'₹72,600', delivery:'2026-06-18', status:'Partially Received' },
  ],
  grns: [
    { id:'GRN-101', po:'PO-2041', supplier:'Ramesh Metal Traders', date:'2026-06-03', status:'Completed' },
    { id:'GRN-102', po:'PO-2042', supplier:'Global Steel Corp', date:'2026-06-10', status:'Verified' },
    { id:'GRN-103', po:'PO-2045', supplier:'Ramesh Metal Traders', date:'2026-06-11', status:'Pending' },
  ],
  returns: [
    { id:'RET-001', supplier:'Global Steel Corp', grn:'GRN-102', date:'2026-06-11', status:'Approved' },
    { id:'RET-002', supplier:'Prime Bearings Ltd', grn:'GRN-101', date:'2026-06-12', status:'Draft' },
  ],
};

/* ══════════════════════════════════════════════════════════
   RENDER HELPERS
══════════════════════════════════════════════════════════ */
function statusBadge(status) {
  const map = {
    'Draft':'badge-draft','Submitted':'badge-submitted','Approved':'badge-approved',
    'Rejected':'badge-rejected','Sent To Supplier':'badge-sent','Partially Received':'badge-partial',
    'Completed':'badge-completed','Cancelled':'badge-cancelled','Pending':'badge-pending',
    'Verified':'badge-verified','Closed':'badge-closed','Returned':'badge-returned',
  };
  return `<span class="badge ${map[status]||'badge-draft'}">${status}</span>`;
}
function priorityBadge(p) {
  const map = { High:'priority-high', Medium:'priority-medium', Low:'priority-low' };
  return `<span class="badge ${map[p]||''}">${p}</span>`;
}

/* ── Build product-row select options ─────────────────────── */
function productOptions(selected = '') {
  return DB.products.map(p =>
    `<option value="${p.id}" ${selected===p.id?'selected':''} data-unit="${p.unit}" data-sku="${p.sku}">${p.name}</option>`
  ).join('');
}

/* ── Auto-increment row id counter ───────────────────────── */
let rowCounter = 0;

function buildProductRow(data = {}) {
  const id = ++rowCounter;
  return `
  <tr id="row-${id}">
    <td>
      <select class="product-select" onchange="onProductChange(this, ${id})">
        <option value="">Select product…</option>
        ${productOptions(data.productId||'')}
      </select>
    </td>
    <td><input type="text" id="sku-${id}" class="form-control" readonly placeholder="SKU" value="${data.sku||''}"></td>
    <td><input type="number" id="qty-${id}" class="form-control" min="1" value="${data.qty||1}" onchange="recalcRow(${id})"></td>
    <td><input type="text" id="unit-${id}" class="form-control" readonly value="${data.unit||''}"></td>
    ${data.showPrice ? `
    <td><input type="number" id="price-${id}" class="form-control" value="${data.price||0}" onchange="recalcRow(${id})"></td>
    <td><input type="number" id="gst-${id}" class="form-control" value="${data.gst||18}" onchange="recalcRow(${id})"></td>
    <td><input type="text" id="amount-${id}" class="form-control" readonly value="0"></td>
    ` : ''}
    ${data.showReceived ? `
    <td><input type="number" id="received-${id}" class="form-control" min="0" value="${data.received||0}"></td>
    <td><input type="number" id="accepted-${id}" class="form-control" min="0" value="${data.accepted||0}"></td>
    <td><input type="number" id="rejected-${id}" class="form-control" min="0" value="${data.rejected||0}"></td>
    ` : ''}
    ${data.showReason ? `
    <td>
      <select class="form-control">
        <option>Damaged</option><option>Wrong Item</option><option>Expired</option><option>Quality Issue</option>
      </select>
    </td>
    ` : ''}
    <td><input type="text" id="rem-${id}" class="form-control" placeholder="Remarks" value="${data.remarks||''}"></td>
    <td><button type="button" class="del-row-btn" onclick="removeRow(${id})"><i class="fas fa-times"></i></button></td>
  </tr>`;
}

function onProductChange(sel, id) {
  const opt = sel.options[sel.selectedIndex];
  document.getElementById(`sku-${id}`).value  = opt?.dataset.sku  || '';
  document.getElementById(`unit-${id}`).value = opt?.dataset.unit || '';
  recalcRow(id);
}

function removeRow(id) {
  document.getElementById(`row-${id}`)?.remove();
  recalcSummary();
}

function recalcRow(id) {
  const qty   = parseFloat(document.getElementById(`qty-${id}`)?.value)   || 0;
  const price = parseFloat(document.getElementById(`price-${id}`)?.value) || 0;
  const gst   = parseFloat(document.getElementById(`gst-${id}`)?.value)   || 0;
  const amount = qty * price * (1 + gst/100);
  const amtEl = document.getElementById(`amount-${id}`);
  if (amtEl) amtEl.value = amount.toFixed(2);
  recalcSummary();
}

function recalcSummary() {
  let subtotal = 0, gstTotal = 0;
  document.querySelectorAll('[id^="amount-"]').forEach(el => {
    const qId = el.id.split('-')[1];
    const qty   = parseFloat(document.getElementById(`qty-${qId}`)?.value)   || 0;
    const price = parseFloat(document.getElementById(`price-${qId}`)?.value) || 0;
    const gst   = parseFloat(document.getElementById(`gst-${qId}`)?.value)   || 0;
    subtotal += qty * price;
    gstTotal += qty * price * gst / 100;
  });
  const grand = subtotal + gstTotal;
  const el = id => document.getElementById(id);
  if (el('sumSubtotal')) el('sumSubtotal').textContent = `₹${subtotal.toFixed(2)}`;
  if (el('sumGST'))      el('sumGST').textContent      = `₹${gstTotal.toFixed(2)}`;
  if (el('sumGrand'))    el('sumGrand').textContent     = `₹${grand.toFixed(2)}`;
}

/* ══════════════════════════════════════════════════════════
   1. PURCHASE REQUISITION
══════════════════════════════════════════════════════════ */
function renderRequisitionList(data) {
  const tbody = document.getElementById('req-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="font-medium">${r.id}</td>
      <td>${r.date}</td>
      <td>${r.dept}</td>
      <td>${r.by}</td>
      <td><span class="chip">${r.items} items</span></td>
      <td>${priorityBadge(r.priority)}</td>
      <td>${statusBadge(r.status)}</td>
      <td>${r.approvedBy}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-btn-view" title="View" onclick="openReqDetail('${r.id}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn action-btn-edit" title="Edit" onclick="openEditReq('${r.id}')"><i class="fas fa-pen"></i></button>
          <button class="action-btn action-btn-approve" title="Submit for Approval" onclick="submitForApproval('${r.id}')"><i class="fas fa-paper-plane"></i></button>
          <button class="action-btn action-btn-delete" title="Delete" onclick="deleteReq('${r.id}')"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function submitForApproval(id) {
  const r = DB.requisitions.find(x => x.id === id);
  if (r) { r.status = 'Submitted'; renderRequisitionList(DB.requisitions); showToast(`${id} submitted for approval`, 'success'); }
}
function deleteReq(id) {
  if (!confirm(`Delete ${id}?`)) return;
  const i = DB.requisitions.findIndex(x => x.id === id);
  if (i > -1) { DB.requisitions.splice(i, 1); renderRequisitionList(DB.requisitions); showToast(`${id} deleted`, 'error'); }
}

function openReqDetail(id) {
  const r = DB.requisitions.find(x => x.id === id);
  if (!r) return;
  document.getElementById('reqDetailId').textContent     = r.id;
  document.getElementById('reqDetailDate').textContent   = r.date;
  document.getElementById('reqDetailDept').textContent   = r.dept;
  document.getElementById('reqDetailBy').textContent     = r.by;
  document.getElementById('reqDetailStatus').innerHTML   = statusBadge(r.status);
  document.getElementById('reqDetailPriority').innerHTML = priorityBadge(r.priority);
  document.getElementById('reqDetailApproved').textContent = r.approvedBy;
  openOverlay('modal-req-detail');
}

function openEditReq(id) {
  const r = DB.requisitions.find(x => x.id === id);
  if (!r) return;
  document.getElementById('editReqId').textContent = `Edit: ${r.id}`;
  document.getElementById('editReqNo').value   = r.id;
  document.getElementById('editReqDept').value = r.dept;
  document.getElementById('editReqPriority').value = r.priority;
  openOverlay('modal-create-req');
}

/* Create Requisition */
document.getElementById('btn-create-req')?.addEventListener('click', () => {
  document.getElementById('editReqId').textContent = 'New Purchase Requisition';
  document.getElementById('create-req-form')?.reset();
  const tbody = document.getElementById('req-product-tbody');
  if (tbody) tbody.innerHTML = '';
  rowCounter = 0;
  addReqRow();
  openOverlay('modal-create-req');
});

function addReqRow() {
  const tbody = document.getElementById('req-product-tbody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', buildProductRow({ showPrice:false }));
}

document.getElementById('btn-add-req-row')?.addEventListener('click', addReqRow);

document.getElementById('btn-save-req')?.addEventListener('click', () => {
  const dept = document.getElementById('editReqDept')?.value;
  if (!dept) { showToast('Please select a department', 'warning'); return; }
  const newId = `REQ-00${DB.requisitions.length + 1}`;
  DB.requisitions.unshift({ id:newId, date:new Date().toISOString().slice(0,10), dept, by:'Admin', items:1, priority:'Medium', status:'Draft', approvedBy:'-' });
  renderRequisitionList(DB.requisitions);
  closeOverlay('modal-create-req');
  showToast(`${newId} saved as draft`, 'success');
});

document.getElementById('btn-submit-req')?.addEventListener('click', () => {
  showToast('Requisition submitted for approval', 'success');
  closeOverlay('modal-create-req');
});

/* Approval Screen */
function renderApprovalList() {
  const pending = DB.requisitions.filter(r => r.status === 'Submitted');
  const tbody = document.getElementById('approval-tbody');
  if (!tbody) return;
  tbody.innerHTML = pending.length ? pending.map(r => `
    <tr>
      <td class="font-medium">${r.id}</td>
      <td>${r.dept}</td>
      <td>${r.by}</td>
      <td>${r.date}</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-btn-view"   onclick="openReqDetail('${r.id}')"><i class="fas fa-eye"></i></button>
          <button class="btn btn-sm btn-success" onclick="approveReq('${r.id}')"><i class="fas fa-check"></i> Approve</button>
          <button class="btn btn-sm btn-danger"  onclick="rejectReq('${r.id}')"><i class="fas fa-times"></i> Reject</button>
        </div>
      </td>
    </tr>
  `).join('') : `<tr><td colspan="6"><div class="empty-state"><i class="fas fa-clipboard-check"></i><p>No pending approvals</p></div></td></tr>`;
}

function approveReq(id) {
  const r = DB.requisitions.find(x => x.id === id);
  if (r) { r.status = 'Approved'; r.approvedBy = 'Director'; renderApprovalList(); renderRequisitionList(DB.requisitions); showToast(`${id} approved`, 'success'); }
}
function rejectReq(id) {
  const r = DB.requisitions.find(x => x.id === id);
  if (r) { r.status = 'Rejected'; r.approvedBy = 'Director'; renderApprovalList(); renderRequisitionList(DB.requisitions); showToast(`${id} rejected`, 'error'); }
}

/* Req search/filter */
document.getElementById('req-search')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  const filtered = DB.requisitions.filter(r => r.id.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q) || r.by.toLowerCase().includes(q));
  renderRequisitionList(filtered);
});

document.getElementById('req-filter-status')?.addEventListener('change', function() {
  const s = this.value;
  const filtered = s ? DB.requisitions.filter(r => r.status === s) : DB.requisitions;
  renderRequisitionList(filtered);
});

/* ══════════════════════════════════════════════════════════
   2. PURCHASE ORDER
══════════════════════════════════════════════════════════ */
function renderPOList(data) {
  const tbody = document.getElementById('po-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(p => `
    <tr>
      <td class="font-medium">${p.id}</td>
      <td>${p.date}</td>
      <td>${p.supplier}</td>
      <td class="font-semibold">${p.amount}</td>
      <td>${p.delivery}</td>
      <td>${statusBadge(p.status)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-btn-view"  title="View" onclick="openPODetail('${p.id}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn action-btn-edit"  title="Edit" onclick="openEditPO('${p.id}')"><i class="fas fa-pen"></i></button>
          <button class="action-btn action-btn-print" title="Print"><i class="fas fa-print"></i></button>
          <button class="action-btn action-btn-delete" title="Cancel" onclick="cancelPO('${p.id}')"><i class="fas fa-ban"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function cancelPO(id) {
  const p = DB.pos.find(x => x.id === id);
  if (p) { p.status = 'Cancelled'; renderPOList(DB.pos); showToast(`${id} cancelled`, 'warning'); }
}

function openPODetail(id) {
  const p = DB.pos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('poDetailId').textContent     = p.id;
  document.getElementById('poDetailDate').textContent   = p.date;
  document.getElementById('poDetailSupplier').textContent = p.supplier;
  document.getElementById('poDetailAmount').textContent = p.amount;
  document.getElementById('poDetailDelivery').textContent = p.delivery;
  document.getElementById('poDetailStatus').innerHTML   = statusBadge(p.status);
  openOverlay('modal-po-detail');
}

function openEditPO(id) {
  const p = DB.pos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('createPOTitle').textContent = `Edit: ${p.id}`;
  openOverlay('modal-create-po');
}

document.getElementById('btn-create-po')?.addEventListener('click', () => {
  document.getElementById('createPOTitle').textContent = 'Create Purchase Order';
  document.getElementById('create-po-form')?.reset();
  const tbody = document.getElementById('po-product-tbody');
  if (tbody) tbody.innerHTML = '';
  rowCounter = 0;
  addPORow();
  recalcSummary();
  openOverlay('modal-create-po');
});

function addPORow() {
  const tbody = document.getElementById('po-product-tbody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', buildProductRow({ showPrice:true }));
}
document.getElementById('btn-add-po-row')?.addEventListener('click', addPORow);

document.getElementById('btn-generate-po')?.addEventListener('click', () => {
  const supplier = document.getElementById('poSupplier')?.value;
  if (!supplier) { showToast('Please select a supplier', 'warning'); return; }
  const newId = `PO-20${50 + DB.pos.length}`;
  DB.pos.unshift({ id:newId, date:new Date().toISOString().slice(0,10), supplier, amount:'₹0', delivery:'-', status:'Draft' });
  renderPOList(DB.pos);
  closeOverlay('modal-create-po');
  showToast(`${newId} generated successfully`, 'success');
});

document.getElementById('btn-save-po-draft')?.addEventListener('click', () => {
  showToast('PO saved as draft', 'info');
  closeOverlay('modal-create-po');
});

/* PO search/filter */
document.getElementById('po-search')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  renderPOList(DB.pos.filter(p => p.id.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q)));
});
document.getElementById('po-filter-status')?.addEventListener('change', function() {
  const s = this.value;
  renderPOList(s ? DB.pos.filter(p => p.status === s) : DB.pos);
});

/* ══════════════════════════════════════════════════════════
   3. GRN
══════════════════════════════════════════════════════════ */
function renderGRNList(data) {
  const tbody = document.getElementById('grn-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(g => `
    <tr>
      <td class="font-medium">${g.id}</td>
      <td>${g.po}</td>
      <td>${g.supplier}</td>
      <td>${g.date}</td>
      <td>${statusBadge(g.status)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-btn-view"  title="View" onclick="openGRNDetail('${g.id}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn action-btn-approve" title="Verify" onclick="verifyGRN('${g.id}')"><i class="fas fa-clipboard-check"></i></button>
          <button class="action-btn action-btn-print" title="Print"><i class="fas fa-print"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function verifyGRN(id) {
  const g = DB.grns.find(x => x.id === id);
  if (!g) return;
  document.getElementById('verifyGRNId').textContent = id;
  document.getElementById('verifyGRNPO').textContent = g.po;
  document.getElementById('verifyGRNSupplier').textContent = g.supplier;
  openOverlay('modal-verify-grn');
}

function openGRNDetail(id) {
  const g = DB.grns.find(x => x.id === id);
  if (!g) return;
  document.getElementById('grnDetailId').textContent       = g.id;
  document.getElementById('grnDetailPO').textContent       = g.po;
  document.getElementById('grnDetailSupplier').textContent = g.supplier;
  document.getElementById('grnDetailDate').textContent     = g.date;
  document.getElementById('grnDetailStatus').innerHTML     = statusBadge(g.status);
  openOverlay('modal-grn-detail');
}

document.getElementById('btn-receive-goods')?.addEventListener('click', () => {
  document.getElementById('create-grn-form')?.reset();
  const tbody = document.getElementById('grn-product-tbody');
  if (tbody) tbody.innerHTML = '';
  rowCounter = 0;
  addGRNRow();
  openOverlay('modal-receive-goods');
});

function addGRNRow() {
  const tbody = document.getElementById('grn-product-tbody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', buildProductRow({ showReceived:true }));
}
document.getElementById('btn-add-grn-row')?.addEventListener('click', addGRNRow);

document.getElementById('btn-save-grn')?.addEventListener('click', () => {
  const po = document.getElementById('grnPO')?.value;
  if (!po) { showToast('Please select a PO', 'warning'); return; }
  const newId = `GRN-10${DB.grns.length + 4}`;
  const supp = DB.pos.find(p => p.id === po)?.supplier || '-';
  DB.grns.unshift({ id:newId, po, supplier:supp, date:new Date().toISOString().slice(0,10), status:'Pending' });
  renderGRNList(DB.grns);
  closeOverlay('modal-receive-goods');
  showToast(`${newId} saved`, 'success');
});

document.getElementById('btn-approve-grn')?.addEventListener('click', () => {
  const id = document.getElementById('verifyGRNId')?.textContent;
  const g = DB.grns.find(x => x.id === id);
  if (g) { g.status = 'Completed'; renderGRNList(DB.grns); }
  closeOverlay('modal-verify-grn');
  showToast('GRN approved — stock updated', 'success');
});

document.getElementById('btn-reject-grn')?.addEventListener('click', () => {
  closeOverlay('modal-verify-grn');
  showToast('GRN rejected', 'error');
});

/* GRN search */
document.getElementById('grn-search')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  renderGRNList(DB.grns.filter(g => g.id.toLowerCase().includes(q) || g.po.toLowerCase().includes(q) || g.supplier.toLowerCase().includes(q)));
});

/* ══════════════════════════════════════════════════════════
   4. PURCHASE RETURN
══════════════════════════════════════════════════════════ */
function renderReturnList(data) {
  const tbody = document.getElementById('return-tbody');
  if (!tbody) return;
  tbody.innerHTML = data.map(r => `
    <tr>
      <td class="font-medium">${r.id}</td>
      <td>${r.supplier}</td>
      <td>${r.date}</td>
      <td>${statusBadge(r.status)}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn action-btn-view"  title="View" onclick="openReturnDetail('${r.id}')"><i class="fas fa-eye"></i></button>
          <button class="action-btn action-btn-print" title="Print"><i class="fas fa-print"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openReturnDetail(id) {
  const r = DB.returns.find(x => x.id === id);
  if (!r) return;
  document.getElementById('retDetailId').textContent = r.id;
  document.getElementById('retDetailSupplier').textContent = r.supplier;
  document.getElementById('retDetailGRN').textContent = r.grn;
  document.getElementById('retDetailDate').textContent = r.date;
  document.getElementById('retDetailStatus').innerHTML = statusBadge(r.status);
  openOverlay('modal-return-detail');
}

document.getElementById('btn-create-return')?.addEventListener('click', () => {
  document.getElementById('create-return-form')?.reset();
  const tbody = document.getElementById('return-product-tbody');
  if (tbody) tbody.innerHTML = '';
  rowCounter = 0;
  addReturnRow();
  openOverlay('modal-create-return');
});

function addReturnRow() {
  const tbody = document.getElementById('return-product-tbody');
  if (tbody) tbody.insertAdjacentHTML('beforeend', buildProductRow({ showReason:true }));
}
document.getElementById('btn-add-return-row')?.addEventListener('click', addReturnRow);

document.getElementById('btn-submit-return')?.addEventListener('click', () => {
  const sup = document.getElementById('returnSupplier')?.value;
  if (!sup) { showToast('Please select a supplier', 'warning'); return; }
  const newId = `RET-00${DB.returns.length + 3}`;
  DB.returns.unshift({ id:newId, supplier:sup, grn:'-', date:new Date().toISOString().slice(0,10), status:'Submitted' });
  renderReturnList(DB.returns);
  closeOverlay('modal-create-return');
  showToast(`${newId} submitted`, 'success');
});

document.getElementById('btn-save-return-draft')?.addEventListener('click', () => {
  closeOverlay('modal-create-return');
  showToast('Return saved as draft', 'info');
});

/* ── Init all tables ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderRequisitionList(DB.requisitions);
  renderApprovalList();
  renderPOList(DB.pos);
  renderGRNList(DB.grns);
  renderReturnList(DB.returns);
});