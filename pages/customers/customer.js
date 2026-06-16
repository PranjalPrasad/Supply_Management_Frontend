'use strict';

/* =====================================================
   MOCK DATA
===================================================== */
const CUSTOMERS = [
  { id: 1, code: 'CUST-0001', name: 'Ramesh Traders', type: 'Wholesale Customer', contact: 'Ramesh Kumar', mobile: '9876543210', email: 'ramesh@traders.com', gst: '27AABRT0001R1ZX', city: 'Pune', creditLimit: 500000, status: 'Active' },
  { id: 2, code: 'CUST-0002', name: 'Metro Distributors', type: 'Distributor', contact: 'Amit Shah', mobile: '9812345678', email: 'amit@metro.com', gst: '27AABMD0002R1ZX', city: 'Mumbai', creditLimit: 1000000, status: 'Active' },
  { id: 3, code: 'CUST-0003', name: 'Suresh Agencies', type: 'Dealer', contact: 'Suresh Patil', mobile: '9823456789', email: 'suresh@agencies.com', gst: '27AABSA0003R1ZX', city: 'Pune', creditLimit: 200000, status: 'Blocked' },
  { id: 4, code: 'CUST-0004', name: 'Bharat Enterprises', type: 'Corporate Customer', contact: 'Bharat Mehta', mobile: '9834567890', email: 'bharat@enterprises.com', gst: '07AABME0004R1ZX', city: 'Delhi', creditLimit: 2000000, status: 'Active' },
  { id: 5, code: 'CUST-0005', name: 'Krishna Retail', type: 'Retail Customer', contact: 'Krishna Das', mobile: '9845678901', email: 'krishna@retail.com', gst: '29AABKR0005R1ZX', city: 'Bangalore', creditLimit: 50000, status: 'Active' },
  { id: 6, code: 'CUST-0006', name: 'Patel & Sons', type: 'Wholesale Customer', contact: 'Rajesh Patel', mobile: '9856789012', email: 'rajesh@patelcons.com', gst: '24AABPS0006R1ZX', city: 'Ahmedabad', creditLimit: 750000, status: 'Active' },
  { id: 7, code: 'CUST-0007', name: 'Southern Traders', type: 'Dealer', contact: 'Venkat Rao', mobile: '9867890123', email: 'venkat@southern.com', gst: '36AABST0007R1ZX', city: 'Hyderabad', creditLimit: 300000, status: 'Inactive' },
  { id: 8, code: 'CUST-0008', name: 'Northern Supplies Co.', type: 'Distributor', contact: 'Gurmeet Singh', mobile: '9878901234', email: 'gurmeet@northern.com', gst: '03AABNS0008R1ZX', city: 'Chandigarh', creditLimit: 600000, status: 'Active' },
  { id: 9, code: 'CUST-0009', name: 'City Mart', type: 'Retail Customer', contact: 'Pooja Joshi', mobile: '9889012345', email: 'pooja@citymart.com', gst: '27AABCM0009R1ZX', city: 'Pune', creditLimit: 80000, status: 'Active' },
  { id: 10, code: 'CUST-0010', name: 'Deccan Hardware', type: 'Dealer', contact: 'Anand Kulkarni', mobile: '9890123456', email: 'anand@deccan.com', gst: '27AABDH0010R1ZX', city: 'Pune', creditLimit: 400000, status: 'Active' },
];

/* =====================================================
   SIDEBAR
===================================================== */
let isCollapsed = false;
const sidebar = document.getElementById('sidebar');
const mainWrapper = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const overlay = document.getElementById('sidebar-overlay');

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay?.classList.toggle('hidden');
  } else {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
    mainWrapper.style.marginLeft = isCollapsed ? '68px' : '';
    const icon = sidebarToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-chevron-left', !isCollapsed);
      icon.classList.toggle('fa-chevron-right', isCollapsed);
    }
  }
});

mobileToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
  overlay?.classList.toggle('hidden');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
});

// Nav group dropdowns
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function (e) {
    e.stopPropagation();
    const items = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (items) {
      items.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});

/* =====================================================
   TOPBAR MENUS
===================================================== */
const notifBtn = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');
const userBtn = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');

notifBtn?.addEventListener('click', e => {
  e.stopPropagation();
  notifMenu.classList.toggle('hidden');
  userMenu?.classList.add('hidden');
});
userBtn?.addEventListener('click', e => {
  e.stopPropagation();
  userMenu.classList.toggle('hidden');
  notifMenu?.classList.add('hidden');
});
document.addEventListener('click', () => {
  notifMenu?.classList.add('hidden');
  userMenu?.classList.add('hidden');
});

/* =====================================================
   TABLE RENDERING
===================================================== */
function formatCurrency(val) {
  if (val >= 100000) return '₹' + (val / 100000).toFixed(0) + 'L';
  if (val >= 1000) return '₹' + (val / 1000).toFixed(0) + 'K';
  return '₹' + val;
}

function statusBadge(status) {
  const map = { Active: 'status-active', Inactive: 'status-inactive', Blocked: 'status-blocked' };
  return `<span class="status-badge ${map[status] || ''}">${status}</span>`;
}

function initials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function renderTable(data) {
  const tbody = document.getElementById('customer-table-body');
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="10" class="td-cell text-center text-[#7288AE] py-8">No customers found</td></tr>`;
    return;
  }
  tbody.innerHTML = data.map(c => `
    <tr class="cursor-pointer" data-id="${c.id}">
      <td class="td-cell font-mono text-[11px] text-[#4B5694]">${c.code}</td>
      <td class="td-cell">
        <div class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-[#111844]/10 text-[#111844] flex items-center justify-center text-[10px] font-bold flex-shrink-0">${initials(c.name)}</div>
          <span class="font-medium text-[#111844] text-xs">${c.name}</span>
        </div>
      </td>
      <td class="td-cell text-[#7288AE] text-[11px]">${c.type}</td>
      <td class="td-cell text-[11px]">${c.contact}</td>
      <td class="td-cell text-[11px]">${c.mobile}</td>
      <td class="td-cell font-mono text-[10px] text-[#7288AE]">${c.gst}</td>
      <td class="td-cell text-[11px]">${c.city}</td>
      <td class="td-cell font-semibold text-[#111844] text-[11px]">${formatCurrency(c.creditLimit)}</td>
      <td class="td-cell">${statusBadge(c.status)}</td>
      <td class="td-cell text-center relative">
        <div class="flex items-center justify-center gap-1">
          <button class="action-icon-btn text-[#4B5694] hover:text-[#111844]" title="View" onclick="openViewDrawer(${c.id}); event.stopPropagation();">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-icon-btn text-[#4B5694] hover:text-[#111844]" title="Edit" onclick="openEditModal(${c.id}); event.stopPropagation();">
            <i class="fas fa-pen"></i>
          </button>
          <button class="action-icon-btn text-red-400 hover:text-red-600" title="Block / Deactivate" onclick="toggleStatus(${c.id}); event.stopPropagation();">
            <i class="fas fa-ban"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');

  // Row click → view drawer
  tbody.querySelectorAll('tr[data-id]').forEach(row => {
    row.addEventListener('click', () => openViewDrawer(parseInt(row.dataset.id)));
  });
}

// Inline icon button style (not in CSS file to keep it scoped)
const styleTag = document.createElement('style');
styleTag.textContent = `.action-icon-btn { width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;font-size:11px;transition:background .12s,color .12s;border:none;background:none;cursor:pointer; } .action-icon-btn:hover{background:rgba(75,86,148,0.1);}`;
document.head.appendChild(styleTag);

/* =====================================================
   FILTER + SEARCH
===================================================== */
let filteredData = [...CUSTOMERS];

function applyFilters() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const type = document.getElementById('filter-type').value;
  const city = document.getElementById('filter-city').value;
  const status = document.getElementById('filter-status').value;

  filteredData = CUSTOMERS.filter(c => {
    const matchSearch = !search || c.name.toLowerCase().includes(search) || c.code.toLowerCase().includes(search) || c.mobile.includes(search) || c.gst.toLowerCase().includes(search);
    const matchType = !type || c.type === type;
    const matchCity = !city || c.city === city;
    const matchStatus = !status || c.status === status;
    return matchSearch && matchType && matchCity && matchStatus;
  });

  renderTable(filteredData);
  document.getElementById('record-count').textContent = `Showing ${filteredData.length} of ${CUSTOMERS.length}`;
}

document.getElementById('search-input').addEventListener('input', applyFilters);
document.getElementById('filter-type').addEventListener('change', applyFilters);
document.getElementById('filter-city').addEventListener('change', applyFilters);
document.getElementById('filter-status').addEventListener('change', applyFilters);
document.getElementById('btn-clear-filter').addEventListener('click', () => {
  document.getElementById('search-input').value = '';
  document.getElementById('filter-type').value = '';
  document.getElementById('filter-city').value = '';
  document.getElementById('filter-status').value = '';
  applyFilters();
});

document.getElementById('btn-export').addEventListener('click', () => {
  showToast('Customer list exported successfully', 'success');
});

/* =====================================================
   STATUS TOGGLE
===================================================== */
function toggleStatus(id) {
  const customer = CUSTOMERS.find(c => c.id === id);
  if (!customer) return;
  if (customer.status === 'Active') {
    customer.status = 'Blocked';
    showToast(`${customer.name} has been blocked`, 'error');
  } else if (customer.status === 'Blocked') {
    customer.status = 'Active';
    showToast(`${customer.name} is now active`, 'success');
  }
  applyFilters();
}

/* =====================================================
   ADD / EDIT MODAL
===================================================== */
let currentStep = 1;
const TOTAL_STEPS = 5;

const modal = document.getElementById('customer-modal');
const btnNext = document.getElementById('btn-step-next');
const btnBack = document.getElementById('btn-step-back');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-modal-cancel');
const modalClose = document.getElementById('modal-close');

function openAddModal() {
  document.getElementById('modal-title').textContent = 'Add New Customer';
  modal.classList.remove('hidden');
  goToStep(1);
}

function openEditModal(id) {
  document.getElementById('modal-title').textContent = 'Edit Customer';
  if (id) {
    const c = CUSTOMERS.find(cu => cu.id === id);
    if (c) {
      document.getElementById('f-name').value = c.name;
      document.getElementById('f-type').value = c.type;
      document.getElementById('f-contact').value = c.contact;
      document.getElementById('f-mobile').value = c.mobile;
      document.getElementById('f-email').value = c.email;
    }
  }
  modal.classList.remove('hidden');
  goToStep(1);
}

function closeModal() {
  modal.classList.add('hidden');
  currentStep = 1;
}

document.getElementById('btn-add-customer').addEventListener('click', openAddModal);
modalClose?.addEventListener('click', closeModal);
btnCancel?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function goToStep(step) {
  currentStep = step;

  // Hide/show content
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const el = document.getElementById('step-' + i);
    if (el) el.classList.toggle('hidden', i !== step);
  }

  // Update pills
  document.querySelectorAll('.step-pill').forEach(pill => {
    const s = parseInt(pill.dataset.step);
    pill.classList.remove('active', 'done');
    if (s === step) pill.classList.add('active');
    if (s < step) pill.classList.add('done');
  });

  // Button visibility
  btnBack.classList.toggle('hidden', step === 1);
  btnNext.classList.toggle('hidden', step === TOTAL_STEPS);
  btnSave.classList.toggle('hidden', step !== TOTAL_STEPS);
}

btnNext?.addEventListener('click', () => {
  if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
});
btnBack?.addEventListener('click', () => {
  if (currentStep > 1) goToStep(currentStep - 1);
});
btnSave?.addEventListener('click', () => {
  const name = document.getElementById('f-name').value.trim();
  if (!name) { showToast('Customer name is required', 'error'); return; }
  closeModal();
  showToast('Customer saved successfully', 'success');
  // In a real app, POST to API here
});

// Same as billing checkbox
document.getElementById('same-as-billing')?.addEventListener('change', function () {
  const fields = document.getElementById('shipping-fields');
  fields.style.opacity = this.checked ? '0.4' : '1';
  fields.style.pointerEvents = this.checked ? 'none' : '';
});

/* =====================================================
   VIEW OVERLAY MODAL
===================================================== */
const viewModal = document.getElementById('view-modal');
const viewModalClose = document.getElementById('view-modal-close');
const viewModalCloseBtn = document.getElementById('view-modal-close-btn');

function openViewDrawer(id) {
  const c = CUSTOMERS.find(cu => cu.id === id);
  if (!c) return;

  document.getElementById('view-avatar').textContent = initials(c.name);
  document.getElementById('view-name').textContent = c.name;
  document.getElementById('view-code').textContent = c.code;
  document.getElementById('view-status').textContent = c.status;
  document.getElementById('view-status').className = 'status-badge ' + ({ Active: 'status-active', Inactive: 'status-inactive', Blocked: 'status-blocked' }[c.status] || '');

  document.getElementById('view-type').textContent = c.type;
  document.getElementById('view-contact').textContent = c.contact;
  document.getElementById('view-mobile').textContent = c.mobile;
  document.getElementById('view-email').textContent = c.email;
  document.getElementById('view-gst').textContent = c.gst;
  document.getElementById('view-credit').textContent = formatCurrency(c.creditLimit);

  // Store current customer ID for edit/block actions
  viewModal.dataset.currentCustomerId = id;

  // Reset tabs
  switchViewTab('overview');
  viewModal.classList.remove('hidden');
}

function closeViewModal() {
  viewModal.classList.add('hidden');
}

viewModalClose?.addEventListener('click', closeViewModal);
viewModalCloseBtn?.addEventListener('click', closeViewModal);
viewModal?.addEventListener('click', e => { if (e.target === viewModal) closeViewModal(); });

// View modal edit button
document.getElementById('view-edit-btn')?.addEventListener('click', () => {
  const id = parseInt(viewModal.dataset.currentCustomerId);
  if (id) {
    closeViewModal();
    openEditModal(id);
  }
});

// View modal block button
document.getElementById('view-block-btn')?.addEventListener('click', () => {
  const id = parseInt(viewModal.dataset.currentCustomerId);
  if (id) {
    toggleStatus(id);
    closeViewModal();
  }
});

// View modal tabs
function switchViewTab(tabName) {
  document.querySelectorAll('.view-tab').forEach(btn => {
    btn.classList.toggle('active-tab', btn.dataset.viewTab === tabName);
  });
  document.querySelectorAll('.view-tab-content').forEach(el => {
    el.classList.toggle('hidden', el.id !== 'view-tab-' + tabName);
  });
}

document.querySelectorAll('.view-tab').forEach(btn => {
  btn.addEventListener('click', () => switchViewTab(btn.dataset.viewTab));
});

/* =====================================================
   TOAST
===================================================== */
function showToast(message, type = 'default') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', default: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateY(6px)'; toast.style.transition = 'all .2s ease'; setTimeout(() => toast.remove(), 200); }, 3000);
}

/* =====================================================
   INIT
===================================================== */
renderTable(CUSTOMERS);
document.getElementById('record-count').textContent = `Showing ${CUSTOMERS.length} of ${CUSTOMERS.length}`;