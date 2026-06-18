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
          <button class="action-icon-btn ${c.status === 'Active' ? 'text-red-400 hover:text-red-600' : 'text-emerald-400 hover:text-emerald-600'}" 
                  title="${c.status === 'Active' ? 'Block' : 'Activate'}" 
                  onclick="toggleStatus(${c.id}); event.stopPropagation();">
            <i class="fas fa-${c.status === 'Active' ? 'ban' : 'check-circle'}"></i>
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

// Inline icon button style
const styleTag = document.createElement('style');
styleTag.textContent = `.action-icon-btn { width:26px;height:26px;display:inline-flex;align-items:center;justify-content:center;border-radius:6px;font-size:11px;transition:background .12s,color .12s;border:none;background:none;cursor:pointer; } .action-icon-btn:hover{background:rgba(75,86,148,0.1);}`;
document.head.appendChild(styleTag);

/* =====================================================
   PAGINATION - FINAL WORKING
===================================================== */
let currentPage = 1;
const ROWS_PER_PAGE = 10;
let totalPages = 1;
let filteredData = [...CUSTOMERS];

function getPaginatedData(data) {
  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;
  return data.slice(start, end);
}

function renderPagination(data) {
  const total = data.length;
  totalPages = Math.ceil(total / ROWS_PER_PAGE);
  if (totalPages === 0) totalPages = 1;
  
  // Update page info
  const start = (currentPage - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(currentPage * ROWS_PER_PAGE, total);
  document.getElementById('page-info').textContent = total > 0 
    ? `Page ${currentPage} of ${totalPages} (${start}-${end} of ${total})`
    : 'No records found';
  
  const container = document.getElementById('pagination-container');
  if (!container) return;
  
  // Remove ALL children EXCEPT prev and next
  const children = container.children;
  const toRemove = [];
  for (let child of children) {
    if (child.id !== 'btn-prev' && child.id !== 'btn-next') {
      toRemove.push(child);
    }
  }
  toRemove.forEach(child => child.remove());
  
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  
  if (total === 0 || totalPages === 1) {
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }
  
  if (prevBtn) prevBtn.disabled = false;
  if (nextBtn) nextBtn.disabled = false;
  
  // Helper to insert before next button
  function insertBeforeNext(element) {
    if (nextBtn) {
      container.insertBefore(element, nextBtn);
    } else {
      container.appendChild(element);
    }
  }
  
  // Show pages with ellipsis
  const maxVisible = 5;
  let pages = [];
  
  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }
  
  pages.forEach(page => {
    if (page === '...') {
      const span = document.createElement('span');
      span.className = 'pagination-btn cursor-default text-[#7288AE]';
      span.textContent = '…';
      span.style.pointerEvents = 'none';
      insertBeforeNext(span);
    } else {
      const btn = document.createElement('button');
      btn.className = 'pagination-btn';
      btn.textContent = page;
      if (page === currentPage) btn.classList.add('active-page');
      btn.addEventListener('click', function() {
        goToPage(page);
      });
      insertBeforeNext(btn);
    }
  });
  
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function goToPage(page) {
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  const paginatedData = getPaginatedData(filteredData);
  renderTable(paginatedData);
  renderPagination(filteredData);
}

function changePage(delta) {
  goToPage(currentPage + delta);
}

// Event listeners
document.getElementById('btn-prev')?.addEventListener('click', function(e) {
  e.stopPropagation();
  changePage(-1);
});

document.getElementById('btn-next')?.addEventListener('click', function(e) {
  e.stopPropagation();
  changePage(1);
});

// Rows per page
document.getElementById('rows-per-page')?.addEventListener('change', function() {
  const newRows = parseInt(this.value);
  window.ROWS_PER_PAGE = newRows;
  currentPage = 1;
  const paginatedData = getPaginatedData(filteredData);
  renderTable(paginatedData);
  renderPagination(filteredData);
});

window.ROWS_PER_PAGE = 10;

/* =====================================================
   FILTER + SEARCH
===================================================== */
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

  currentPage = 1;
  const paginatedData = getPaginatedData(filteredData);
  renderTable(paginatedData);
  renderPagination(filteredData);
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

/* =====================================================
   EXPORT
===================================================== */
document.getElementById('btn-export').addEventListener('click', function() {
  exportCustomerData();
});

function exportCustomerData() {
  try {
    const data = filteredData.length > 0 ? filteredData : CUSTOMERS;
    const headers = ['Customer Code', 'Customer Name', 'Type', 'Contact Person', 'Mobile', 'Email', 'GST Number', 'City', 'Credit Limit', 'Status'];
    const rows = data.map(c => [
      c.code, `"${c.name}"`, `"${c.type}"`, `"${c.contact}"`, c.mobile, `"${c.email}"`, c.gst, `"${c.city}"`, c.creditLimit, c.status
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `customers_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast(`Exported ${data.length} customers successfully`, 'success');
  } catch (error) {
    console.error('Export failed:', error);
    showToast('Failed to export data', 'error');
  }
}

/* =====================================================
   STATUS TOGGLE
===================================================== */
function toggleStatus(id) {
  const customer = CUSTOMERS.find(c => c.id === id);
  if (!customer) return;
  if (customer.status === 'Active') {
    customer.status = 'Blocked';
    showToast(`${customer.name} has been blocked`, 'error');
  } else if (customer.status === 'Blocked' || customer.status === 'Inactive') {
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
let editingCustomerId = null;

const modal = document.getElementById('customer-modal');
const btnNext = document.getElementById('btn-step-next');
const btnBack = document.getElementById('btn-step-back');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-modal-cancel');
const modalClose = document.getElementById('modal-close');

function openAddModal() {
  editingCustomerId = null;
  document.getElementById('modal-title').textContent = 'Add New Customer';
  resetFormFields();
  modal.classList.remove('hidden');
  goToStep(1);
}

function openEditModal(id) {
  editingCustomerId = id;
  const c = CUSTOMERS.find(cu => cu.id === id);
  if (!c) return;
  
  document.getElementById('modal-title').textContent = 'Edit Customer';
  
  // Fill form fields with customer data
  document.getElementById('f-name').value = c.name || '';
  document.getElementById('f-type').value = c.type || '';
  document.getElementById('f-contact').value = c.contact || '';
  document.getElementById('f-mobile').value = c.mobile || '';
  document.getElementById('f-email').value = c.email || '';
  
  // Address fields (step 2)
  const addrInputs = document.querySelectorAll('#step-2 .form-input');
  if (addrInputs.length >= 3) {
    // You can store address in customer data if needed
  }
  
  // GST fields (step 3)
  document.getElementById('f-gst') ? document.getElementById('f-gst').value = c.gst || '' : null;
  
  modal.classList.remove('hidden');
  goToStep(1);
}

function resetFormFields() {
  document.querySelectorAll('#customer-modal .form-input').forEach(input => {
    if (!input.hasAttribute('disabled') && !input.hasAttribute('readonly')) {
      input.value = '';
    }
  });
  // Set default country
  document.querySelectorAll('#step-2 .form-input[value="India"]').forEach(el => {
    el.value = 'India';
  });
}

function closeModal() {
  modal.classList.add('hidden');
  currentStep = 1;
  editingCustomerId = null;
}

document.getElementById('btn-add-customer').addEventListener('click', openAddModal);
modalClose?.addEventListener('click', closeModal);
btnCancel?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function goToStep(step) {
  currentStep = step;
  
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const el = document.getElementById('step-' + i);
    if (el) el.classList.toggle('hidden', i !== step);
  }
  
  document.querySelectorAll('.step-pill').forEach(pill => {
    const s = parseInt(pill.dataset.step);
    pill.classList.remove('active', 'done');
    if (s === step) pill.classList.add('active');
    if (s < step) pill.classList.add('done');
  });
  
  btnBack.classList.toggle('hidden', step === 1);
  btnNext.classList.toggle('hidden', step === TOTAL_STEPS);
  btnSave.classList.toggle('hidden', step !== TOTAL_STEPS);
}

/* =====================================================
   FORM VALIDATION
===================================================== */
function validateStep(step) {
  if (step === 1) {
    const required = ['f-name', 'f-type', 'f-contact', 'f-mobile'];
    let valid = true;
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el || !el.value.trim()) {
        valid = false;
        if (el) {
          el.style.borderColor = '#ef4444';
          el.style.boxShadow = '0 0 0 2px rgba(239,68,68,0.2)';
          el.addEventListener('input', function handler() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
            this.removeEventListener('input', handler);
          }, { once: true });
        }
      }
    });
    if (!valid) {
      showToast('Please fill in all required fields', 'error');
      return false;
    }
    return true;
  }
  
  if (step === 2) {
    const addressInputs = document.querySelectorAll('#step-2 .form-input:not([readonly])');
    let allFilled = true;
    addressInputs.forEach(input => {
      if (input.value === 'India') return;
      if (!input.value.trim()) {
        allFilled = false;
        input.style.borderColor = '#ef4444';
        input.style.boxShadow = '0 0 0 2px rgba(239,68,68,0.2)';
      } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
      }
    });
    if (!allFilled) {
      showToast('Please fill in all address fields', 'error');
      return false;
    }
    return true;
  }
  
  return true;
}

// Next button handler with validation
btnNext?.addEventListener('click', function(e) {
  if (!validateStep(currentStep)) return;
  if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
});

btnBack?.addEventListener('click', function() {
  if (currentStep > 1) goToStep(currentStep - 1);
});

// Save button handler
btnSave?.addEventListener('click', function() {
  // Validate all required fields before saving
  if (!validateStep(1)) return;
  if (!validateStep(2)) return;
  
  const name = document.getElementById('f-name').value.trim();
  const type = document.getElementById('f-type').value;
  const contact = document.getElementById('f-contact').value.trim();
  const mobile = document.getElementById('f-mobile').value.trim();
  const email = document.getElementById('f-email').value.trim();
  
  if (!name || !type || !contact || !mobile) {
    showToast('Please fill in all required fields', 'error');
    return;
  }
  
  // Check if editing or creating
  if (editingCustomerId) {
    // Edit existing customer
    const existing = CUSTOMERS.find(c => c.id === editingCustomerId);
    if (existing) {
      existing.name = name;
      existing.type = type;
      existing.contact = contact;
      existing.mobile = mobile;
      existing.email = email || existing.email;
      existing.gst = document.getElementById('f-gst')?.value || existing.gst;
      // Update other fields if needed
      showToast(`${name} updated successfully`, 'success');
    }
  } else {
    // Create new customer
    const newCustomer = {
      id: CUSTOMERS.length + 1,
      code: `CUST-${String(CUSTOMERS.length + 1).padStart(4, '0')}`,
      name: name,
      type: type,
      contact: contact,
      mobile: mobile,
      email: email || '—',
      gst: document.getElementById('f-gst')?.value || '—',
      city: '—',
      creditLimit: 0,
      status: 'Active'
    };
    CUSTOMERS.push(newCustomer);
    showToast(`${name} created successfully`, 'success');
  }
  
  closeModal();
  applyFilters();
});

// Real-time validation clearing
document.querySelectorAll('#customer-modal .form-input').forEach(input => {
  input.addEventListener('focus', function() {
    this.style.borderColor = '';
    this.style.boxShadow = '';
  });
});

// Same as billing checkbox
document.getElementById('same-as-billing')?.addEventListener('change', function () {
  const fields = document.getElementById('shipping-fields');
  if (fields) {
    fields.style.opacity = this.checked ? '0.4' : '1';
    fields.style.pointerEvents = this.checked ? 'none' : '';
  }
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

  viewModal.dataset.currentCustomerId = id;
  switchViewTab('overview');
  viewModal.classList.remove('hidden');
}

function closeViewModal() {
  viewModal.classList.add('hidden');
}

viewModalClose?.addEventListener('click', closeViewModal);
viewModalCloseBtn?.addEventListener('click', closeViewModal);
viewModal?.addEventListener('click', e => { if (e.target === viewModal) closeViewModal(); });

document.getElementById('view-edit-btn')?.addEventListener('click', () => {
  const id = parseInt(viewModal.dataset.currentCustomerId);
  if (id) {
    closeViewModal();
    openEditModal(id);
  }
});

document.getElementById('view-block-btn')?.addEventListener('click', () => {
  const id = parseInt(viewModal.dataset.currentCustomerId);
  if (id) {
    toggleStatus(id);
    closeViewModal();
  }
});

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
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const iconMap = { success: 'fa-check-circle', error: 'fa-times-circle', default: 'fa-info-circle' };
  toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-info-circle'}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { 
    toast.style.opacity = '0'; 
    toast.style.transform = 'translateY(6px)'; 
    toast.style.transition = 'all .2s ease'; 
    setTimeout(() => toast.remove(), 200); 
  }, 3000);
}
/* =====================================================
   INIT
===================================================== */
const initialData = getPaginatedData(CUSTOMERS);
renderTable(initialData);
renderPagination(CUSTOMERS);
document.getElementById('record-count').textContent = `Showing ${CUSTOMERS.length} of ${CUSTOMERS.length}`;