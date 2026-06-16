/* ============================
   SUPPLIER MASTER — supplier.js
   ============================ */

// ---- Mock Data ----
const SUPPLIERS = [
    { id: 1,  code: 'SUP-0001', name: 'Ramesh Steel Pvt Ltd',       type: 'Manufacturer',    contact: 'Ramesh Kumar',   mobile: '+91 98765 43210', email: 'ramesh@steelpvt.com',      gst: '29AABCS1429B1Z1', city: 'Mumbai',    state: 'Maharashtra',   status: 'Approved Vendor' },
    { id: 2,  code: 'SUP-0002', name: 'Suresh Distributors',         type: 'Distributor',     contact: 'Suresh Patel',   mobile: '+91 87654 32109', email: 'suresh@distributors.com',  gst: '24BBBCS0000B1Z5', city: 'Ahmedabad', state: 'Gujarat',       status: 'Active' },
    { id: 3,  code: 'SUP-0003', name: 'Mehta Industrial Supplies',   type: 'Wholesaler',      contact: 'Anand Mehta',    mobile: '+91 76543 21098', email: 'anand@mehtaind.com',       gst: '27CCCCS1111C1Z3', city: 'Pune',      state: 'Maharashtra',   status: 'Active' },
    { id: 4,  code: 'SUP-0004', name: 'Global Imports Co.',          type: 'Importer',        contact: 'Vikram Shah',    mobile: '+91 65432 10987', email: 'vikram@globalimports.in',  gst: '09DDDDS2222D1Z1', city: 'Delhi',     state: 'Delhi',         status: 'Active' },
    { id: 5,  code: 'SUP-0005', name: 'Kumar Packaging',             type: 'Manufacturer',    contact: 'Priya Kumar',    mobile: '+91 54321 09876', email: 'priya@kumarpack.com',      gst: '33EEEES3333E1Z5', city: 'Chennai',   state: 'Tamil Nadu',    status: 'Inactive' },
    { id: 6,  code: 'SUP-0006', name: 'Sharma Bearings Ltd',         type: 'Distributor',     contact: 'Rohit Sharma',   mobile: '+91 93456 78901', email: 'rohit@sharmabearings.com', gst: '06FFFFS4444F1Z2', city: 'Faridabad', state: 'Haryana',       status: 'Active' },
    { id: 7,  code: 'SUP-0007', name: 'Verma Industrial Tools',      type: 'Wholesaler',      contact: 'Deepak Verma',   mobile: '+91 82345 67890', email: 'deepak@vermatools.in',     gst: '08GGGGS5555G1Z4', city: 'Jaipur',    state: 'Rajasthan',     status: 'Active' },
    { id: 8,  code: 'SUP-0008', name: 'Singh Hydraulics',            type: 'Manufacturer',    contact: 'Gurpreet Singh', mobile: '+91 71234 56789', email: 'gurpreet@singhhydro.com',  gst: '03HHHHS6666H1Z6', city: 'Ludhiana',  state: 'Punjab',        status: 'Blocked' },
    { id: 9,  code: 'SUP-0009', name: 'Naik Service Solutions',      type: 'Service Provider', contact: 'Shilpa Naik',   mobile: '+91 60123 45678', email: 'shilpa@naikservice.com',   gst: '30IIIIS7777I1Z8', city: 'Goa',       state: 'Goa',           status: 'Active' },
    { id: 10, code: 'SUP-0010', name: 'Patel Conveyor Systems',      type: 'Manufacturer',    contact: 'Nilesh Patel',   mobile: '+91 99876 54321', email: 'nilesh@patelconveyor.com', gst: '24JJJJS8888J1Z0', city: 'Surat',     state: 'Gujarat',       status: 'Active' },
    { id: 11, code: 'SUP-0011', name: 'Agarwal Electricals',         type: 'Distributor',     contact: 'Ravi Agarwal',   mobile: '+91 88765 43210', email: 'ravi@agarwalele.com',      gst: '05KKKS9999K1Z2',  city: 'Kanpur',    state: 'Uttar Pradesh', status: 'Active' },
    { id: 12, code: 'SUP-0012', name: 'Tiwari Heavy Equipment',      type: 'Importer',        contact: 'Sanjay Tiwari',  mobile: '+91 77654 32109', email: 'sanjay@tiwariheavy.in',    gst: '20LLLLS0000L1Z4', city: 'Kolkata',   state: 'West Bengal',   status: 'Inactive' },
];

let filteredSuppliers = [...SUPPLIERS];
let currentPage = 1;
const rowsPerPage = 8;
let currentSupplierId = null;
let deleteTargetId = null;
let currentStep = 1;
const TOTAL_STEPS = 5;

// ============================================================
// MODAL SYSTEM
// ============================================================

function openModal(name) {
    document.getElementById('modal-' + name).classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal(name) {
    document.getElementById('modal-' + name).classList.remove('open');
    document.body.style.overflow = '';
}

// Close when clicking the dark backdrop (not the box itself)
function overlayClose(e, name) {
    if (e.target === document.getElementById('modal-' + name)) {
        closeModal(name);
    }
}

// ESC key closes any open modal
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        ['create', 'detail', 'delete'].forEach(name => {
            document.getElementById('modal-' + name).classList.remove('open');
        });
        document.body.style.overflow = '';
    }
});

// ============================================================
// TABLE
// ============================================================

function updateStatCards() {
    document.getElementById('stat-total').textContent    = SUPPLIERS.length;
    document.getElementById('stat-active').textContent   = SUPPLIERS.filter(s => s.status === 'Active' || s.status === 'Approved Vendor').length;
    document.getElementById('stat-approved').textContent = SUPPLIERS.filter(s => s.status === 'Approved Vendor').length;
    document.getElementById('stat-blocked').textContent  = SUPPLIERS.filter(s => s.status === 'Blocked').length;
}

function renderTable() {
    const tbody = document.getElementById('supplier-tbody');
    const empty = document.getElementById('empty-state');
    const start = (currentPage - 1) * rowsPerPage;
    const pageData = filteredSuppliers.slice(start, start + rowsPerPage);

    if (filteredSuppliers.length === 0) {
        tbody.innerHTML = '';
        empty.classList.remove('hidden');
        document.getElementById('pagination-info').textContent = 'No results';
        document.getElementById('page-numbers').innerHTML = '';
        document.getElementById('prev-btn').disabled = true;
        document.getElementById('next-btn').disabled = true;
        return;
    }

    empty.classList.add('hidden');
    tbody.innerHTML = pageData.map(s => `
        <tr>
            <td class="font-medium text-[#4B5694]">${s.code}</td>
            <td>
                <div class="flex items-center gap-2">
                    <div style="width:26px;height:26px;border-radius:6px;background:linear-gradient(135deg,#111844,#4B5694);color:#FAFAFA;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        ${getInitials(s.name)}
                    </div>
                    <span class="font-medium">${s.name}</span>
                </div>
            </td>
            <td class="text-[#7288AE]">${s.type}</td>
            <td>${s.contact}</td>
            <td>${s.mobile}</td>
            <td class="font-mono text-xs">${s.gst}</td>
            <td>${s.city}</td>
            <td><span class="status-badge ${getStatusClass(s.status)}">${s.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="action-btn text-[#4B5694]" title="View Details" onclick="viewSupplier(${s.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn text-[#111844]" title="Edit" onclick="editSupplier(${s.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn ${(s.status === 'Active' || s.status === 'Approved Vendor') ? 'text-emerald-600' : 'text-[#7288AE]'}"
                            title="${(s.status === 'Active' || s.status === 'Approved Vendor') ? 'Deactivate' : 'Activate'}"
                            onclick="quickToggle(${s.id})">
                        <i class="fas fa-${(s.status === 'Active' || s.status === 'Approved Vendor') ? 'toggle-on' : 'toggle-off'}"></i>
                    </button>
                    <button class="action-btn text-red-500" title="Delete" onclick="openDeleteModal(${s.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    const total = filteredSuppliers.length;
    const from  = start + 1;
    const to    = Math.min(start + rowsPerPage, total);
    document.getElementById('pagination-info').textContent = `Showing ${from}–${to} of ${total}`;
    renderPageNumbers();
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = to >= total;
}

function renderPageNumbers() {
    const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);
    const container  = document.getElementById('page-numbers');
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        if (totalPages <= 5 || i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        } else if (Math.abs(i - currentPage) === 2) {
            html += `<span class="text-[#7288AE] text-xs px-1">…</span>`;
        }
    }
    container.innerHTML = html;
}

function changePage(dir) {
    const totalPages = Math.ceil(filteredSuppliers.length / rowsPerPage);
    currentPage = Math.max(1, Math.min(currentPage + dir, totalPages));
    renderTable();
}

function goToPage(p) {
    currentPage = p;
    renderTable();
}

// ---- Filter ----
function filterTable() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const status = document.getElementById('filter-status').value;
    const type   = document.getElementById('filter-type').value;

    filteredSuppliers = SUPPLIERS.filter(s => {
        const matchSearch = !search || s.name.toLowerCase().includes(search)
            || s.code.toLowerCase().includes(search)
            || s.gst.toLowerCase().includes(search)
            || s.city.toLowerCase().includes(search);
        const matchStatus = !status || s.status === status;
        const matchType   = !type   || s.type   === type;
        return matchSearch && matchStatus && matchType;
    });
    currentPage = 1;
    renderTable();
}

// ============================================================
// VIEW SUPPLIER DETAIL (modal)
// ============================================================

function viewSupplier(id) {
    const s = SUPPLIERS.find(x => x.id === id);
    if (!s) return;
    currentSupplierId = id;

    // Header
    document.getElementById('detail-avatar').textContent = getInitials(s.name);
    document.getElementById('detail-name').textContent   = s.name;
    document.getElementById('detail-code').textContent   = `${s.code} · ${s.type}`;

    // Status badge + button
    const badge = document.getElementById('detail-status-badge');
    badge.textContent = s.status;
    badge.className   = `status-badge ${getStatusClass(s.status)}`;

    const statusBtn = document.getElementById('detail-status-btn');
    const isActive  = s.status === 'Active' || s.status === 'Approved Vendor';
    statusBtn.textContent = isActive ? 'Deactivate' : 'Activate';
    statusBtn.className   = isActive
        ? 'btn-outline text-xs py-1.5 px-3 text-red-500 border-red-300 hover:bg-red-50'
        : 'btn-primary text-xs py-1.5 px-3';

    // Meta strip
    document.getElementById('detail-contact').textContent = s.contact;
    document.getElementById('detail-mobile').textContent  = s.mobile;
    document.getElementById('detail-email').textContent   = s.email;
    document.getElementById('detail-gst').textContent     = s.gst;
    document.getElementById('detail-city').textContent    = `${s.city}, ${s.state}`;

    // Basic tab
    document.getElementById('db-code').textContent     = s.code;
    document.getElementById('db-name').textContent     = s.name;
    document.getElementById('db-type').textContent     = s.type;
    document.getElementById('db-status').textContent   = s.status;
    document.getElementById('db-contact').textContent  = s.contact;
    document.getElementById('db-mobile').textContent   = s.mobile;
    document.getElementById('db-alt').textContent      = '—';
    document.getElementById('db-email').textContent    = s.email;
    document.getElementById('db-address').textContent  = 'Plot 12, MIDC Industrial Area, Andheri East';
    document.getElementById('db-citystate').textContent = `${s.city}, ${s.state}`;
    document.getElementById('db-pin').textContent      = '400093';

    // Reset to basic tab
    switchTab('basic', document.querySelector('#modal-detail .detail-tab'));

    openModal('detail');
}

function openEditFromDetail() {
    closeModal('detail');
    editSupplier(currentSupplierId);
}

function toggleSupplierStatus() {
    const s = SUPPLIERS.find(x => x.id === currentSupplierId);
    if (!s) return;
    const wasActive = s.status === 'Active' || s.status === 'Approved Vendor';
    s.status = wasActive ? 'Inactive' : 'Active';
    showToast(wasActive ? `${s.name} deactivated` : `${s.name} activated`, wasActive ? 'warning' : 'success');
    updateStatCards();
    filterTable();
    viewSupplier(currentSupplierId); // refresh modal
}

function quickToggle(id) {
    const s = SUPPLIERS.find(x => x.id === id);
    if (!s) return;
    const wasActive = s.status === 'Active' || s.status === 'Approved Vendor';
    s.status = wasActive ? 'Inactive' : 'Active';
    showToast(wasActive ? `${s.name} deactivated` : `${s.name} activated`, wasActive ? 'warning' : 'success');
    updateStatCards();
    filterTable();
}

// ============================================================
// DELETE (modal)
// ============================================================

function openDeleteModal(id) {
    deleteTargetId = id;
    openModal('delete');
}

function confirmDelete() {
    const idx = SUPPLIERS.findIndex(x => x.id === deleteTargetId);
    if (idx !== -1) {
        const name = SUPPLIERS[idx].name;
        SUPPLIERS.splice(idx, 1);
        filteredSuppliers = [...SUPPLIERS];
        showToast(`${name} deleted`, 'error');
        updateStatCards();
        filterTable();
    }
    closeModal('delete');
}

// ============================================================
// CREATE / EDIT WIZARD (modal)
// ============================================================

function openModal_create() {
    resetForm();
    document.getElementById('create-modal-title').textContent = 'Create New Supplier';
    openModal('create');
}

// Hook the Add Supplier button
function _openCreate() {
    resetForm();
    document.getElementById('create-modal-title').textContent = 'Create New Supplier';
    openModal('create');
}

function editSupplier(id) {
    const s = SUPPLIERS.find(x => x.id === id);
    if (!s) return;
    currentSupplierId = id;
    resetForm();

    document.getElementById('create-modal-title').textContent = `Edit Supplier — ${s.name}`;
    document.getElementById('f-code').value    = s.code;
    document.getElementById('f-name').value    = s.name;
    document.getElementById('f-type').value    = s.type;
    document.getElementById('f-contact').value = s.contact;
    document.getElementById('f-mobile').value  = s.mobile;
    document.getElementById('f-email').value   = s.email;

    openModal('create');
}

function resetForm() {
    currentStep = 1;

    // Reset all step sections
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        document.getElementById('form-step-' + i).classList.add('hidden');
        const dot = document.getElementById('step-dot-' + i);
        dot.classList.remove('active', 'done');
        dot.querySelector('span').textContent = i;
    }

    // Show step 1
    document.getElementById('form-step-1').classList.remove('hidden');
    document.getElementById('step-dot-1').classList.add('active');

    // Reset form fields
    ['f-name','f-type','f-contact','f-mobile','f-alt','f-email',
     'f-addr1','f-addr2','f-city','f-state','f-pin',
     'f-gst','f-pan','f-cin',
     'f-credit-days','f-credit-limit','f-bank','f-account','f-ifsc'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.value = ''; el.style.borderColor = ''; }
    });
    document.getElementById('f-country').value = 'India';
    document.getElementById('f-code').value = `SUP-${String(SUPPLIERS.length + 1).padStart(4, '0')}`;

    updateStepFooter();
}

function updateStepFooter() {
    const backBtn = document.getElementById('btn-back-step');
    const nextBtn = document.getElementById('btn-next-step');
    const saveBtn = document.getElementById('btn-save-supplier');

    backBtn.classList.toggle('hidden', currentStep === 1);
    nextBtn.classList.toggle('hidden', currentStep === TOTAL_STEPS);
    saveBtn.classList.toggle('hidden', currentStep !== TOTAL_STEPS);
}

function nextStepModal() {
    if (!validateStep(currentStep)) return;
    markDone(currentStep);

    document.getElementById('form-step-' + currentStep).classList.add('hidden');
    currentStep++;
    document.getElementById('form-step-' + currentStep).classList.remove('hidden');
    document.getElementById('step-dot-' + currentStep).classList.add('active');
    updateStepFooter();
}

function prevStepModal() {
    document.getElementById('form-step-' + currentStep).classList.add('hidden');
    document.getElementById('step-dot-' + currentStep).classList.remove('active', 'done');
    document.getElementById('step-dot-' + currentStep).querySelector('span').textContent = currentStep;
    currentStep--;
    document.getElementById('form-step-' + currentStep).classList.remove('hidden');
    document.getElementById('step-dot-' + currentStep).classList.remove('done');
    document.getElementById('step-dot-' + currentStep).classList.add('active');
    document.getElementById('step-dot-' + currentStep).querySelector('span').textContent = currentStep;
    updateStepFooter();
}

function markDone(step) {
    const dot = document.getElementById('step-dot-' + step);
    dot.classList.remove('active');
    dot.classList.add('done');
    dot.querySelector('span').innerHTML = '<i class="fas fa-check" style="font-size:10px"></i>';
}

function validateStep(step) {
    const required = {
        1: ['f-name', 'f-type', 'f-contact', 'f-mobile', 'f-email'],
        2: ['f-addr1', 'f-city', 'f-state', 'f-pin'],
        3: ['f-gst', 'f-pan'],
        4: [], 5: []
    };
    let valid = true;
    (required[step] || []).forEach(id => {
        const el = document.getElementById(id);
        if (!el || !el.value.trim()) {
            if (el) {
                el.style.borderColor = '#ef4444';
                el.addEventListener('input', () => el.style.borderColor = '', { once: true });
            }
            valid = false;
        }
    });
    if (!valid) showToast('Please fill in all required fields', 'error');
    return valid;
}

function saveSupplier() {
    const isEdit = currentSupplierId && document.getElementById('create-modal-title').textContent.startsWith('Edit');

    if (isEdit) {
        const s = SUPPLIERS.find(x => x.id === currentSupplierId);
        if (s) {
            s.name    = document.getElementById('f-name').value    || s.name;
            s.type    = document.getElementById('f-type').value    || s.type;
            s.contact = document.getElementById('f-contact').value || s.contact;
            s.mobile  = document.getElementById('f-mobile').value  || s.mobile;
            s.email   = document.getElementById('f-email').value   || s.email;
            s.city    = document.getElementById('f-city').value    || s.city;
            s.state   = document.getElementById('f-state').value   || s.state;
            s.gst     = document.getElementById('f-gst').value     || s.gst;
            showToast(`${s.name} updated successfully!`, 'success');
        }
    } else {
        const newSupplier = {
            id:      SUPPLIERS.length + 1,
            code:    `SUP-${String(SUPPLIERS.length + 1).padStart(4, '0')}`,
            name:    document.getElementById('f-name').value    || 'New Supplier',
            type:    document.getElementById('f-type').value    || 'Manufacturer',
            contact: document.getElementById('f-contact').value || '—',
            mobile:  document.getElementById('f-mobile').value  || '—',
            email:   document.getElementById('f-email').value   || '—',
            gst:     document.getElementById('f-gst').value     || '—',
            city:    document.getElementById('f-city').value    || '—',
            state:   document.getElementById('f-state').value   || '—',
            status: 'Active'
        };
        SUPPLIERS.push(newSupplier);
        showToast(`${newSupplier.name} created successfully!`, 'success');
    }

    filteredSuppliers = [...SUPPLIERS];
    updateStatCards();
    filterTable();
    closeModal('create');
    currentSupplierId = null;
}

// ============================================================
// TABS (in detail modal)
// ============================================================

function switchTab(name, btn) {
    document.querySelectorAll('#modal-detail .tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('#modal-detail .detail-tab').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + name).classList.remove('hidden');
    if (btn) btn.classList.add('active');
}

// ============================================================
// TOAST
// ============================================================

function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', warning: 'fa-exclamation-triangle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'success' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : ''}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity .3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showExportToast() {
    showToast('Exporting supplier list…', 'info');
}

// ============================================================
// HELPERS
// ============================================================

function getInitials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

function getStatusClass(status) {
    const map = {
        'Active':          'status-active',
        'Inactive':        'status-inactive',
        'Blocked':         'status-blocked',
        'Approved Vendor': 'status-approved',
    };
    return map[status] || 'status-inactive';
}

// ============================================================
// SIDEBAR
// ============================================================

let isCollapsed = false;
const sidebar       = document.getElementById('sidebar');
const mainWrapper   = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay       = document.getElementById('sidebar-overlay');

sidebarToggle?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('sidebar-open');
        overlay?.classList.toggle('hidden');
    } else {
        isCollapsed = !isCollapsed;
        const chevron = sidebarToggle.querySelector('i');
        if (isCollapsed) {
            sidebar.classList.add('sidebar-collapsed');
            mainWrapper.style.marginLeft = '68px';
            chevron?.classList.replace('fa-chevron-left', 'fa-chevron-right');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
            mainWrapper.style.marginLeft = '';
            chevron?.classList.replace('fa-chevron-right', 'fa-chevron-left');
        }
    }
});

overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
});

// ---- Dropdown menus ----
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click',  e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });

document.addEventListener('click', e => {
    if (!userBtn?.contains(e.target)  && !userMenu?.contains(e.target))  userMenu?.classList.add('hidden');
    if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ---- Sidebar nav groups ----
document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function () {
        const items   = this.nextElementSibling;
        const chevron = this.querySelector('.fa-chevron-down');
        if (items) {
            items.classList.toggle('hidden');
            if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});

// ---- Wire up "Add Supplier" button in HTML ----
// HTML calls openModal('create') directly, which needs resetForm first
// Override so the button resets form properly
document.addEventListener('DOMContentLoaded', () => {
    // Patch: any call to openModal('create') from scratch should reset
});

// Patch openModal for create to always reset
const _origOpenModal = openModal;
window.openModal = function(name) {
    if (name === 'create') {
        resetForm();
    }
    _origOpenModal(name);
};

// ============================================================
// INIT
// ============================================================
updateStatCards();
renderTable();