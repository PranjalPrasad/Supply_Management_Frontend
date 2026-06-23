/* =============================================
   Delivery Schedule — delivery-schedule.js
   ============================================= */

// ──────────────────────────────────────────────
// Sample Data
// ──────────────────────────────────────────────
let deliveries = [
    {
        id: 'DS-2041',
        po: 'PO-1082',
        supplier: 'Mehta Steel Pvt Ltd',
        date: '2025-06-24',
        warehouse: 'Warehouse A',
        product: 'Steel Pipes (25mm)',
        qty: 120,
        status: 'Pending',
        remarks: 'Priority delivery'
    },
    {
        id: 'DS-2040',
        po: 'PO-1081',
        supplier: 'Agarwal Traders',
        date: '2025-06-23',
        warehouse: 'Warehouse B',
        product: 'Hydraulic Hoses',
        qty: 60,
        status: 'In Transit',
        remarks: ''
    },
    {
        id: 'DS-2039',
        po: 'PO-1080',
        supplier: 'Rajan Suppliers',
        date: '2025-06-22',
        warehouse: 'Warehouse C',
        product: 'Industrial Bearings',
        qty: 200,
        status: 'Delivered',
        remarks: 'All units verified'
    },
    {
        id: 'DS-2038',
        po: 'PO-1078',
        supplier: 'Kumar & Sons',
        date: '2025-06-20',
        warehouse: 'Warehouse C',
        product: 'Aluminium Sheets (4mm)',
        qty: 80,
        status: 'Overdue',
        remarks: 'Supplier delay reported'
    },
    {
        id: 'DS-2037',
        po: 'PO-1077',
        supplier: 'Mehta Steel Pvt Ltd',
        date: '2025-06-19',
        warehouse: 'Warehouse A',
        product: 'Packaging Cartons (L)',
        qty: 350,
        status: 'Delivered',
        remarks: ''
    },
    {
        id: 'DS-2036',
        po: 'PO-1075',
        supplier: 'Agarwal Traders',
        date: '2025-06-18',
        warehouse: 'Warehouse B',
        product: 'Motor Coupling Set',
        qty: 45,
        status: 'Delivered',
        remarks: ''
    },
    {
        id: 'DS-2035',
        po: 'PO-1073',
        supplier: 'Sharma Enterprises',
        date: '2025-06-17',
        warehouse: 'Warehouse A',
        product: 'Safety Gloves (XL)',
        qty: 500,
        status: 'Delivered',
        remarks: 'Bulk order'
    },
    {
        id: 'DS-2034',
        po: 'PO-1070',
        supplier: 'Rajan Suppliers',
        date: '2025-06-28',
        warehouse: 'Warehouse B',
        product: 'Conveyor Belt Roll',
        qty: 12,
        status: 'Pending',
        remarks: ''
    }
];

let nextDsNum = 2042;
let activeRowId = null; // for status modal

// ──────────────────────────────────────────────
// Status Config
// ──────────────────────────────────────────────
const statusConfig = {
    'Pending':    { cls: 'badge-pending',   icon: 'fa-clock' },
    'In Transit': { cls: 'badge-transit',   icon: 'fa-truck' },
    'Delivered':  { cls: 'badge-delivered', icon: 'fa-circle-check' },
    'Overdue':    { cls: 'badge-overdue',   icon: 'fa-triangle-exclamation' }
};

function statusBadge(status) {
    const cfg = statusConfig[status] || { cls: 'badge-pending', icon: 'fa-circle' };
    return `<span class="badge ${cfg.cls}"><i class="fas ${cfg.icon}"></i> ${status}</span>`;
}

// ──────────────────────────────────────────────
// Render Table
// ──────────────────────────────────────────────
function renderTable(data) {
    const tbody = document.getElementById('deliveryBody');
    const empty = document.getElementById('emptyState');
    const count = document.getElementById('tableCount');

    tbody.innerHTML = '';

    if (data.length === 0) {
        empty.classList.remove('hidden');
        count.textContent = 'No results found';
        return;
    }

    empty.classList.add('hidden');
    count.textContent = `Showing ${data.length} deliver${data.length === 1 ? 'y' : 'ies'}`;

    data.forEach(d => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="font-semibold text-[#111844]">${d.id}</td>
            <td>${d.po}</td>
            <td>${d.supplier}</td>
            <td>${formatDate(d.date)}</td>
            <td>${d.warehouse}</td>
            <td>${d.product}</td>
            <td>${d.qty} units</td>
            <td>${statusBadge(d.status)}</td>
            <td>
                <div class="flex items-center gap-1.5">
                    <button class="btn-icon btn-view" title="View Details" onclick="viewDelivery('${d.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon btn-edit" title="Update Status" onclick="openStatusModal('${d.id}')">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// ──────────────────────────────────────────────
// Filter Logic
// ──────────────────────────────────────────────
function applyFilters() {
    const search    = document.getElementById('searchInput').value.toLowerCase().trim();
    const status    = document.getElementById('statusFilter').value;
    const warehouse = document.getElementById('warehouseFilter').value;
    const date      = document.getElementById('dateFilter').value;

    const filtered = deliveries.filter(d => {
        const matchSearch = !search ||
            d.id.toLowerCase().includes(search) ||
            d.po.toLowerCase().includes(search) ||
            d.supplier.toLowerCase().includes(search) ||
            d.product.toLowerCase().includes(search) ||
            d.warehouse.toLowerCase().includes(search);

        const matchStatus    = !status    || d.status === status;
        const matchWarehouse = !warehouse || d.warehouse === warehouse;
        const matchDate      = !date      || d.date === date;

        return matchSearch && matchStatus && matchWarehouse && matchDate;
    });

    renderTable(filtered);
}

// ──────────────────────────────────────────────
// View Delivery Details
// ──────────────────────────────────────────────
function viewDelivery(id) {
    const d = deliveries.find(x => x.id === id);
    if (!d) return;

    document.getElementById('viewDsNo').textContent = d.id;

    const fields = [
        ['DS Number',       d.id],
        ['PO Number',       d.po],
        ['Supplier',        d.supplier],
        ['Delivery Date',   formatDate(d.date)],
        ['Warehouse',       d.warehouse],
        ['Product',         d.product],
        ['Quantity',        d.qty + ' units'],
        ['Status',          null, statusBadge(d.status)],
        ['Remarks',         d.remarks || '—']
    ];

    document.getElementById('viewModalBody').innerHTML = fields.map(([k, v, html]) => `
        <div class="detail-row">
            <span class="detail-key">${k}</span>
            <span class="detail-val">${html || escHtml(v)}</span>
        </div>
    `).join('');

    openModal('viewModal');
}

// ──────────────────────────────────────────────
// Status Modal
// ──────────────────────────────────────────────
function openStatusModal(id) {
    const d = deliveries.find(x => x.id === id);
    if (!d) return;

    activeRowId = id;
    document.getElementById('modalDsNo').textContent = `${d.id} — ${d.po}`;
    document.getElementById('newStatus').value = d.status;
    document.getElementById('statusRemarks').value = d.remarks || '';
    openModal('statusModal');
}

function saveStatus() {
    if (!activeRowId) return;
    const d = deliveries.find(x => x.id === activeRowId);
    if (!d) return;

    d.status  = document.getElementById('newStatus').value;
    d.remarks = document.getElementById('statusRemarks').value.trim();

    applyFilters();
    closeModal('statusModal');
    showToast(`Status updated to "${d.status}" for ${d.id}`, 'success');
}

// ──────────────────────────────────────────────
// Add Delivery Modal
// ──────────────────────────────────────────────
document.getElementById('addDeliveryBtn').addEventListener('click', () => {
    // Clear form
    ['fPo', 'fSupplier', 'fProduct', 'fRemarks'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('fWarehouse').value = '';
    document.getElementById('fDate').value = '';
    document.getElementById('fQty').value = '';
    document.getElementById('deliveryModalTitle').textContent = 'Add Delivery';
    document.getElementById('saveDeliveryBtn').textContent = 'Add Delivery';
    openModal('deliveryModal');
});

function saveDelivery() {
    const po        = document.getElementById('fPo').value.trim();
    const supplier  = document.getElementById('fSupplier').value.trim();
    const date      = document.getElementById('fDate').value;
    const warehouse = document.getElementById('fWarehouse').value;
    const product   = document.getElementById('fProduct').value.trim();
    const qty       = parseInt(document.getElementById('fQty').value, 10);
    const remarks   = document.getElementById('fRemarks').value.trim();

    if (!po || !supplier || !date || !warehouse || !product || !qty || qty < 1) {
        showToast('Please fill in all required fields.', 'error');
        return;
    }

    const newDelivery = {
        id: `DS-${nextDsNum++}`,
        po, supplier, date, warehouse, product, qty, remarks,
        status: 'Pending'
    };

    deliveries.unshift(newDelivery);
    applyFilters();
    closeModal('deliveryModal');
    showToast(`Delivery ${newDelivery.id} added successfully!`, 'success');
}

// ──────────────────────────────────────────────
// Export CSV
// ──────────────────────────────────────────────
function exportCSV() {
    const headers = ['DS No.', 'PO Number', 'Supplier', 'Delivery Date', 'Warehouse', 'Product', 'Quantity', 'Status', 'Remarks'];
    const rows = deliveries.map(d => [
        d.id, d.po, d.supplier, d.date, d.warehouse, d.product, d.qty, d.status, d.remarks || ''
    ]);

    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'delivery-schedule.csv';
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported successfully!', 'info');
}

// ──────────────────────────────────────────────
// Modal Helpers
// ──────────────────────────────────────────────
function openModal(id)  { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// Close on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
        if (e.target === this) closeModal(this.id);
    });
});

// ──────────────────────────────────────────────
// Toast
// ──────────────────────────────────────────────
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

// ──────────────────────────────────────────────
// Utilities
// ──────────────────────────────────────────────
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function escHtml(str) {
    if (str == null) return '';
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ──────────────────────────────────────────────
// Sidebar Logic
// ──────────────────────────────────────────────
let isCollapsed = false;
const sidebar      = document.getElementById('sidebar');
const mainWrapper  = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay      = document.getElementById('sidebar-overlay');

sidebarToggle?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('sidebar-open');
        overlay?.classList.toggle('hidden');
    } else {
        isCollapsed = !isCollapsed;
        const chevron = sidebarToggle.querySelector('i');
        if (isCollapsed) {
            sidebar.classList.add('sidebar-collapsed');
            mainWrapper.classList.add('main-expanded');
            mainWrapper.style.marginLeft = '68px';
            chevron?.classList.replace('fa-chevron-left', 'fa-chevron-right');
        } else {
            sidebar.classList.remove('sidebar-collapsed');
            mainWrapper.classList.remove('main-expanded');
            mainWrapper.style.marginLeft = '';
            chevron?.classList.replace('fa-chevron-right', 'fa-chevron-left');
        }
    }
});

overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
});

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-open');
    overlay?.classList.toggle('hidden');
});

// ──────────────────────────────────────────────
// Sidebar Dropdown Toggles
// ──────────────────────────────────────────────
document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function (e) {
        e.stopPropagation();
        const items   = this.nextElementSibling;
        const chevron = this.querySelector('.fa-chevron-down');
        if (items) {
            items.classList.toggle('hidden');
            if (chevron) {
                chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        }
    });
});

// ──────────────────────────────────────────────
// Header Dropdowns
// ──────────────────────────────────────────────
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => {
    e.stopPropagation();
    userMenu.classList.toggle('hidden');
    notifMenu?.classList.add('hidden');
});

notifBtn?.addEventListener('click', e => {
    e.stopPropagation();
    notifMenu.classList.toggle('hidden');
    userMenu?.classList.add('hidden');
});

document.addEventListener('click', e => {
    if (!userBtn?.contains(e.target)  && !userMenu?.contains(e.target))  userMenu?.classList.add('hidden');
    if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ──────────────────────────────────────────────
// Filter Event Listeners
// ──────────────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('statusFilter').addEventListener('change', applyFilters);
document.getElementById('warehouseFilter').addEventListener('change', applyFilters);
document.getElementById('dateFilter').addEventListener('change', applyFilters);

// ──────────────────────────────────────────────
// Initial Render
// ──────────────────────────────────────────────
renderTable(deliveries);