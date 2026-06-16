/* ===================== INVOICE DATA ===================== */
const invoices = [
    { id: 'INV-1042', date: '14 Jun 2025', customer: 'Ramesh Traders',   so: 'SO-3187', amount: 54356, gst: 6156,  status: 'Generated' },
    { id: 'INV-1041', date: '13 Jun 2025', customer: 'Apex Corp',         so: 'SO-3180', amount: 72500, gst: 9826,  status: 'Paid' },
    { id: 'INV-1040', date: '12 Jun 2025', customer: 'Global Supplies',   so: 'SO-3175', amount: 31200, gst: 4242,  status: 'Sent' },
    { id: 'INV-1039', date: '10 Jun 2025', customer: 'Mehta Industries',  so: 'SO-3170', amount: 88900, gst: 12109, status: 'Partially Paid' },
    { id: 'INV-1038', date: '09 Jun 2025', customer: 'Sunrise Traders',   so: 'SO-3165', amount: 15400, gst: 2356,  status: 'Paid' },
    { id: 'INV-1037', date: '08 Jun 2025', customer: 'Patel & Co',        so: 'SO-3160', amount: 22800, gst: 3095,  status: 'Draft' },
    { id: 'INV-1036', date: '07 Jun 2025', customer: 'Apex Corp',         so: 'SO-3155', amount: 47600, gst: 6469,  status: 'Paid' },
    { id: 'INV-1035', date: '06 Jun 2025', customer: 'Ramesh Traders',    so: 'SO-3148', amount: 19300, gst: 2624,  status: 'Cancelled' },
    { id: 'INV-1034', date: '05 Jun 2025', customer: 'TechMart Pvt Ltd',  so: 'SO-3142', amount: 63000, gst: 8563,  status: 'Generated' },
    { id: 'INV-1033', date: '04 Jun 2025', customer: 'Delta Logistics',   so: 'SO-3137', amount: 11500, gst: 1564,  status: 'Sent' },
    { id: 'INV-1032', date: '03 Jun 2025', customer: 'Global Supplies',   so: 'SO-3131', amount: 29800, gst: 4051,  status: 'Paid' },
    { id: 'INV-1031', date: '02 Jun 2025', customer: 'Mehta Industries',  so: 'SO-3125', amount: 54200, gst: 7366,  status: 'Partially Paid' },
];

const customerData = {
    'SO-3187': { name: 'Ramesh Traders',  gst: '27AAACR0012A1Z5', billing: '42, MG Road, Pune — 411001',          shipping: '42, MG Road, Pune — 411001' },
    'SO-3190': { name: 'Apex Corp',       gst: '27AAABC0087B1ZA', billing: '15, Shivaji Nagar, Pune — 411005',     shipping: '15, Shivaji Nagar, Pune — 411005' },
    'SO-3194': { name: 'Global Supplies', gst: '19AAACG0034C1Z8', billing: '88, Park Street, Kolkata — 700016',    shipping: '88, Park Street, Kolkata — 700016' },
};

/* ===================== SIDEBAR ===================== */
const sidebar  = document.getElementById('sidebar');
const mainWrap = document.getElementById('main-wrapper');
const toggler  = document.getElementById('sidebar-toggle');
const overlay  = document.getElementById('sidebar-overlay');
let sidebarCollapsed = false;

toggler?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('sidebar-open');
        overlay?.classList.toggle('hidden');
    } else {
        sidebarCollapsed = !sidebarCollapsed;
        sidebar.classList.toggle('sidebar-collapsed', sidebarCollapsed);
        mainWrap.style.marginLeft = sidebarCollapsed ? '68px' : '';
        const icon = toggler.querySelector('i');
        icon.classList.toggle('fa-chevron-left',  !sidebarCollapsed);
        icon.classList.toggle('fa-chevron-right',  sidebarCollapsed);
    }
});

overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
});

document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', e => {
        e.stopPropagation();
        const items   = header.nextElementSibling;
        const chevron = header.querySelector('.fa-chevron-down');
        if (items) {
            items.classList.toggle('hidden');
            if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});

/* ===================== NOTIFICATIONS / USER MENU ===================== */
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');

notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
userBtn?.addEventListener('click',  e => { e.stopPropagation(); userMenu.classList.toggle('hidden');  notifMenu?.classList.add('hidden'); });
document.addEventListener('click', () => { notifMenu?.classList.add('hidden'); userMenu?.classList.add('hidden'); });

/* ===================== OVERLAY SYSTEM ===================== */
function openOverlay(id) {
    const backdrop = document.getElementById('overlay-backdrop');
    const overlay = document.getElementById(id);
    if (!overlay) return;
    
    closeAllOverlays();
    backdrop.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAllOverlays() {
    document.querySelectorAll('.overlay-modal').forEach(el => {
        el.classList.add('hidden');
    });
    document.getElementById('overlay-backdrop')?.classList.add('hidden');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllOverlays(); });

/* ===================== INVOICE TABLE ===================== */
function statusBadge(status) {
    const map = {
        'Draft':          'badge-draft',
        'Generated':      'badge-generated',
        'Sent':           'badge-sent',
        'Partially Paid': 'badge-partial',
        'Paid':           'badge-paid',
        'Cancelled':      'badge-cancelled',
    };
    return `<span class="badge ${map[status] || 'badge-draft'}">${status}</span>`;
}

function renderTable(data) {
    const tbody = document.getElementById('invoice-tbody');
    const empty = document.getElementById('empty-state');

    if (!data.length) {
        tbody.innerHTML = '';
        empty.classList.remove('hidden');
        document.getElementById('pagination-info').textContent = 'No results';
        return;
    }
    empty.classList.add('hidden');

    tbody.innerHTML = data.map(inv => `
        <tr class="hover:bg-[#FAFAFA] transition-colors duration-100">
            <td class="px-4 py-3 font-semibold text-[#111844] text-xs">${inv.id}</td>
            <td class="px-4 py-3 text-[#7288AE] text-xs">${inv.date}</td>
            <td class="px-4 py-3 text-[#111844] text-xs font-medium">${inv.customer}</td>
            <td class="px-4 py-3 text-[#7288AE] text-xs">${inv.so}</td>
            <td class="px-4 py-3 text-right text-[#111844] text-xs font-semibold">₹${inv.amount.toLocaleString('en-IN')}</td>
            <td class="px-4 py-3 text-right text-[#7288AE] text-xs">₹${inv.gst.toLocaleString('en-IN')}</td>
            <td class="px-4 py-3 text-center">${statusBadge(inv.status)}</td>
            <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-1">
<button class="invoice-action-btn" onclick="viewInvoice('${inv.id}')" title="View"><i class="fas fa-eye"></i></button>                    
<button onclick="openOverlay('overlay-print')" class="btn-secondary flex items-center gap-2"><i class="fas fa-print text-xs"></i> </button>
<button onclick="openOverlay('overlay-download')" class="btn-primary flex items-center gap-2"><i class="fas fa-download text-xs"></i> </button>
                    <button class="invoice-action-btn" onclick="openOverlay('overlay-email')" title="Email Invoice"><i class="fas fa-envelope"></i></button>
                </div>
            </td>
        </tr>
    `).join('');

    document.getElementById('pagination-info').textContent = `Showing 1–${data.length} of ${data.length} invoices`;
}

/* ===================== OPEN VIEW OVERLAY WITH DATA ===================== */
function openViewOverlay(invId) {
    const inv = invoices.find(i => i.id === invId);
    if (!inv) return;

    // Mini cards
    document.getElementById('vd-invno').textContent    = inv.id;
    document.getElementById('vd-customer').textContent = inv.customer;
    document.getElementById('vd-total').textContent    = '₹' + inv.amount.toLocaleString('en-IN');
    document.getElementById('vd-status').innerHTML     = statusBadge(inv.status);

    // Overview tab
    document.getElementById('v-invno').textContent  = inv.id;
    document.getElementById('v-date').textContent   = inv.date;
    document.getElementById('v-so').textContent     = inv.so;
    document.getElementById('v-status-badge').innerHTML = statusBadge(inv.status);
    document.getElementById('v-cust').textContent   = inv.customer;

    // Fill customer detail if available
    const cust = customerData[inv.so];
    if (cust) {
        document.getElementById('v-gst').textContent     = cust.gst;
        document.getElementById('v-billing').textContent = cust.billing;
    } else {
        document.getElementById('v-gst').textContent     = '—';
        document.getElementById('v-billing').textContent = '—';
    }

    // Update title subtitle
    document.getElementById('view-inv-title').innerHTML = `<i class="fas fa-file-invoice-dollar mr-2 text-[#4B5694]"></i>${inv.id}`;
    document.getElementById('view-inv-sub').textContent  = `${inv.customer} • ${inv.date}`;

    // Reset to first tab
    switchTab(document.querySelector('#overlay-view .tab-btn'), 'vtab-overview');

    openOverlay('overlay-view');
}

/* ===================== FILTERS ===================== */
function applyFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const status = document.getElementById('filter-status').value;

    const filtered = invoices.filter(inv => {
        const matchSearch = !search || inv.id.toLowerCase().includes(search) || inv.customer.toLowerCase().includes(search);
        const matchStatus = !status || inv.status === status;
        return matchSearch && matchStatus;
    });
    renderTable(filtered);
}

function clearFilters() {
    document.getElementById('search-input').value    = '';
    document.getElementById('filter-status').value   = '';
    const from = document.getElementById('filter-from');
    const to   = document.getElementById('filter-to');
    if (from) from.value = '';
    if (to)   to.value   = '';
    renderTable(invoices);
}

document.getElementById('search-input')?.addEventListener('input',  applyFilters);
document.getElementById('filter-status')?.addEventListener('change', applyFilters);

/* ===================== CREATE INVOICE — AUTO FILL ===================== */
// Called as autoFill() from the HTML select onchange
function autoFill() {
    const so   = document.getElementById('c-so').value;
    const data = customerData[so];
    if (data) {
        document.getElementById('c-cust-name').value = data.name;
        document.getElementById('c-cust-gst').value  = data.gst;
        document.getElementById('c-billing').value   = data.billing;
        document.getElementById('c-shipping').value  = data.shipping;
    } else {
        ['c-cust-name','c-cust-gst','c-billing','c-shipping'].forEach(id => {
            document.getElementById(id).value = '';
        });
    }
}

// Legacy alias kept in case anything else calls autoFillFromSO
function autoFillFromSO() { autoFill(); }

/* ===================== PRODUCT ROWS ===================== */
function addProductRow() {
    const tbody = document.getElementById('product-tbody');
    const row   = document.createElement('tr');
    row.classList.add('product-row');
    row.innerHTML = `
        <td class="px-2 py-1.5"><input type="text" class="form-input text-xs py-1" placeholder="Product name"></td>
        <td class="px-2 py-1.5"><input type="text" class="form-input text-xs py-1" placeholder="SKU"></td>
        <td class="px-2 py-1.5"><input type="number" class="form-input text-xs py-1 text-right" value="1" oninput="calcRows()"></td>
        <td class="px-2 py-1.5"><input type="number" class="form-input text-xs py-1 text-right" value="0" oninput="calcRows()"></td>
        <td class="px-2 py-1.5">
            <select class="form-input text-xs py-1" onchange="calcRows()">
                <option>5</option><option selected>12</option><option>18</option><option>28</option>
            </select>
        </td>
        <td class="px-2 py-1.5 text-right font-semibold row-amount">₹0</td>
        <td class="px-2 py-1.5 text-center"><button onclick="removeRow(this)" class="text-red-400 hover:text-red-600 transition-colors"><i class="fas fa-times"></i></button></td>
    `;
    tbody.appendChild(row);
    calcRows();
}

function removeRow(btn) {
    btn.closest('tr').remove();
    calcRows();
}

// Single canonical calculation function (called as calcRows() from HTML)
function calcRows() {
    let subtotal = 0;
    let totalGST = 0;

    document.querySelectorAll('#product-tbody .product-row').forEach(row => {
        const inputs  = row.querySelectorAll('input[type="number"]');
        const gstSel  = row.querySelector('select');
        const qty     = parseFloat(inputs[0]?.value) || 0;
        const price   = parseFloat(inputs[1]?.value) || 0;
        const gstPct  = parseFloat(gstSel?.value)    || 0;

        const base    = qty * price;
        const gstAmt  = base * (gstPct / 100);
        subtotal     += base;
        totalGST     += gstAmt;

        const amtCell = row.querySelector('.row-amount');
        if (amtCell) amtCell.textContent = '₹' + base.toLocaleString('en-IN');
    });

    const discount = parseFloat(document.getElementById('c-discount')?.value) || 0;
    const grand    = subtotal + totalGST - discount;
    const half     = totalGST / 2;

    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    set('c-subtotal',  '₹' + subtotal.toLocaleString('en-IN'));
    set('c-gst-total', '₹' + totalGST.toLocaleString('en-IN'));
    set('c-grand',     '₹' + grand.toLocaleString('en-IN'));
    set('cgst-val',    '₹' + half.toLocaleString('en-IN', { maximumFractionDigits: 0 }));
    set('sgst-val',    '₹' + half.toLocaleString('en-IN', { maximumFractionDigits: 0 }));
}

// Aliases for any old HTML references
function calcAllRows()  { calcRows(); }
function calcRow()      { calcRows(); }
function updateSummary(){ calcRows(); }

/* ===================== INVOICE ACTIONS ===================== */
function saveDraft() {
    showToast('success', '<i class="fas fa-save"></i>', 'Draft saved successfully');
}

function generateInvoice() {
    const so = document.getElementById('c-so')?.value;
    if (!so) {
        showToast('error', '<i class="fas fa-exclamation-circle"></i>', 'Select a Sales Order first');
        return;
    }
    showToast('success', '<i class="fas fa-check-circle"></i>', 'Invoice INV-1043 generated!');
    setTimeout(() => closeAllOverlays(), 1200);
}

function sendEmail() {
    showToast('success', '<i class="fas fa-paper-plane"></i>', 'Invoice emailed successfully');
    closeAllOverlays();
}

function doExport() {
    const fmt = document.querySelector('input[name="export-fmt"]:checked')?.value || 'csv';
    showToast('info', '<i class="fas fa-download"></i>', `Exporting as ${fmt.toUpperCase()}…`);
    closeAllOverlays();
}

function confirmCancel() {
    const reason = document.getElementById('cancel-reason')?.value.trim();
    if (!reason) {
        showToast('error', '<i class="fas fa-exclamation-circle"></i>', 'Please enter a cancellation reason');
        return;
    }
    showToast('success', '<i class="fas fa-ban"></i>', 'Invoice cancelled');
    closeAllOverlays();
}

function doDownload(type) {
    const label = type === 'gst' ? 'GST Copy' : 'Invoice PDF';
    showToast('info', '<i class="fas fa-file-pdf"></i>', `Downloading ${label}…`);
}

function printInvoice() {
    openOverlay('overlay-print');
}

/* ===================== EXPORT OPTION TOGGLE ===================== */
document.querySelectorAll('.export-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        document.querySelectorAll('.export-opt').forEach(o => o.classList.remove('active-opt'));
        opt.classList.add('active-opt');
    });
});

/* ===================== TABS ===================== */
function switchTab(btn, tabId) {
    // Scope to the nearest overlay body so multiple overlays don't conflict
    const container = btn.closest('.overlay-body') || document;
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    btn.classList.add('active');
    document.getElementById(tabId)?.classList.remove('hidden');
}

/* ===================== TOAST ===================== */
function showToast(type, icon, message) {
    const colors = { success: 'text-emerald-600', error: 'text-red-500', info: 'text-indigo-600' };
    const toast  = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span class="${colors[type] || 'text-[#4B5694]'}">${icon}</span><span>${message}</span>`;
    document.getElementById('toast-container').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/* ===================== INIT ===================== */
(function init() {
    renderTable(invoices);

    const today  = new Date().toISOString().split('T')[0];
    const invDate = document.getElementById('c-inv-date');
    if (invDate) invDate.value = today;

    // Run initial calc for the pre-filled rows in create overlay
    calcRows();
})();


/* ===================== OVERLAY FUNCTIONS ===================== */
function openOverlay(id) {
    const backdrop = document.getElementById('overlay-backdrop');
    const overlay = document.getElementById(id);
    if (!overlay) return;
    
    // Close any open overlays first
    closeAllOverlays();
    
    backdrop.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeAllOverlays() {
    document.querySelectorAll('.overlay-drawer, .overlay-modal').forEach(el => {
        el.classList.add('hidden');
    });
    document.getElementById('overlay-backdrop')?.classList.add('hidden');
    document.body.style.overflow = '';
}

/* ===================== CREATE INVOICE FUNCTIONS ===================== */
function autoFill() {
    const so = document.getElementById('c-so')?.value;
    // Map SO to customer data
    const map = {
        'SO-3187': { name: 'Ramesh Traders', gst: '27AAACR0012A1Z5', billing: '42, MG Road, Pune — 411001', shipping: '42, MG Road, Pune — 411001' },
        'SO-3190': { name: 'Apex Corp', gst: '27AAABC0087B1ZA', billing: '15, Shivaji Nagar, Pune — 411005', shipping: '15, Shivaji Nagar, Pune — 411005' },
        'SO-3194': { name: 'Global Supplies', gst: '19AAACG0034C1Z8', billing: '88, Park Street, Kolkata — 700016', shipping: '88, Park Street, Kolkata — 700016' },
    };
    const data = map[so];
    if (data) {
        document.getElementById('c-cust-name').value = data.name;
        document.getElementById('c-cust-gst').value = data.gst;
        document.getElementById('c-billing').value = data.billing;
        document.getElementById('c-shipping').value = data.shipping;
    } else {
        document.getElementById('c-cust-name').value = '';
        document.getElementById('c-cust-gst').value = '';
        document.getElementById('c-billing').value = '';
        document.getElementById('c-shipping').value = '';
    }
}

function addProductRow() {
    const tbody = document.getElementById('product-tbody');
    const row = document.createElement('tr');
    row.className = 'product-row';
    row.innerHTML = `
        <td class="px-2 py-1.5"><input type="text" class="form-input text-xs py-1" placeholder="Product name"></td>
        <td class="px-2 py-1.5"><input type="text" class="form-input text-xs py-1" placeholder="SKU"></td>
        <td class="px-2 py-1.5"><input type="number" class="form-input text-xs py-1 text-right" value="1" oninput="calcRows()"></td>
        <td class="px-2 py-1.5"><input type="number" class="form-input text-xs py-1 text-right" value="0" oninput="calcRows()"></td>
        <td class="px-2 py-1.5"><select class="form-input text-xs py-1" onchange="calcRows()"><option>5</option><option selected>12</option><option>18</option><option>28</option></select></td>
        <td class="px-2 py-1.5 text-right font-semibold row-amount">₹0</td>
        <td class="px-2 py-1.5 text-center"><button onclick="removeRow(this)" class="text-red-400 hover:text-red-600"><i class="fas fa-times"></i></button></td>
    `;
    tbody.appendChild(row);
    calcRows();
}

function removeRow(btn) {
    btn.closest('tr').remove();
    calcRows();
}

function calcRows() {
    let subtotal = 0;
    let totalGST = 0;

    document.querySelectorAll('#product-tbody .product-row').forEach(row => {
        const cells = row.querySelectorAll('td');
        const qty = parseFloat(cells[2].querySelector('input')?.value) || 0;
        const price = parseFloat(cells[3].querySelector('input')?.value) || 0;
        const gstPct = parseFloat(cells[4].querySelector('select')?.value) || 0;

        const base = qty * price;
        const gstAmt = base * (gstPct / 100);
        subtotal += base;
        totalGST += gstAmt;

        const amtCell = row.querySelector('.row-amount');
        if (amtCell) amtCell.textContent = '₹' + base.toLocaleString('en-IN');
    });

    const discount = parseFloat(document.getElementById('c-discount')?.value) || 0;
    const grand = subtotal + totalGST - discount;
    const half = totalGST / 2;

    document.getElementById('c-subtotal').textContent = '₹' + subtotal.toLocaleString('en-IN');
    document.getElementById('c-gst-total').textContent = '₹' + totalGST.toLocaleString('en-IN');
    document.getElementById('c-grand').textContent = '₹' + grand.toLocaleString('en-IN');
    document.getElementById('cgst-val').textContent = '₹' + half.toLocaleString('en-IN', { maximumFractionDigits: 0 });
    document.getElementById('sgst-val').textContent = '₹' + half.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function saveDraft() {
    showToast('success', '<i class="fas fa-save"></i>', 'Draft saved successfully');
    closeAllOverlays();
}

function generateInvoice() {
    const so = document.getElementById('c-so')?.value;
    if (!so) {
        showToast('error', '<i class="fas fa-exclamation-circle"></i>', 'Select a Sales Order first');
        return;
    }
    showToast('success', '<i class="fas fa-check-circle"></i>', 'Invoice INV-1043 generated!');
    closeAllOverlays();
    setTimeout(() => {
        // Update table if needed
        renderTable(invoices);
    }, 500);
}

/* ===================== VIEW INVOICE DETAILS ===================== */
function viewInvoice(invoiceId) {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) {
        showToast('error', '<i class="fas fa-exclamation-circle"></i>', 'Invoice not found');
        return;
    }

    document.getElementById('view-inv-title').innerHTML = `<i class="fas fa-file-invoice-dollar mr-2 text-[#4B5694]"></i>Invoice ${inv.id}`;
    document.getElementById('view-inv-sub').textContent = `View complete invoice information for ${inv.customer}`;
    
    document.getElementById('vd-invno').textContent = inv.id;
    document.getElementById('vd-status').innerHTML = statusBadge(inv.status);
    document.getElementById('vd-customer').textContent = inv.customer;
    document.getElementById('vd-total').textContent = '₹' + inv.amount.toLocaleString('en-IN');
    
    document.getElementById('v-invno').textContent = inv.id;
    document.getElementById('v-date').textContent = inv.date;
    document.getElementById('v-so').textContent = inv.so;
    document.getElementById('v-cust').textContent = inv.customer;
    document.getElementById('v-status-badge').innerHTML = statusBadge(inv.status);
    
    // Set customer data if available
    const custData = customerData[inv.so];
    if (custData) {
        document.getElementById('v-gst').textContent = custData.gst;
        document.getElementById('v-billing').textContent = custData.billing;
    }

    openOverlay('overlay-view');
}

/* ===================== EXPORT FUNCTIONS ===================== */
function doExport() {
    const format = document.querySelector('input[name="export-fmt"]:checked')?.value || 'csv';
    showToast('success', '<i class="fas fa-download"></i>', `Exporting ${format.toUpperCase()} file...`);
    setTimeout(closeAllOverlays, 1000);
}

/* ===================== EMAIL FUNCTIONS ===================== */
function sendEmail() {
    showToast('success', '<i class="fas fa-paper-plane"></i>', 'Email sent successfully!');
    setTimeout(closeAllOverlays, 1200);
}

/* ===================== CANCEL FUNCTIONS ===================== */
function confirmCancel() {
    const reason = document.getElementById('cancel-reason')?.value || 'No reason provided';
    showToast('success', '<i class="fas fa-ban"></i>', `Invoice cancelled: ${reason}`);
    setTimeout(closeAllOverlays, 1200);
}

/* ===================== DOWNLOAD FUNCTIONS ===================== */
function doDownload(type) {
    const msg = type === 'invoice' ? 'Invoice PDF' : 'GST Invoice Copy';
    showToast('success', '<i class="fas fa-download"></i>', `Downloading ${msg}...`);
    setTimeout(closeAllOverlays, 1000);
}

/* ===================== PRINT FUNCTIONS ===================== */
function printInvoice() {
    showToast('info', '<i class="fas fa-print"></i>', 'Preparing print layout…');
    setTimeout(() => {
        window.print();
        closeAllOverlays();
    }, 800);
}

/* ===================== VIEW SWITCHING (if needed) ===================== */
function showView(view) {
    document.getElementById('view-list').classList.add('hidden');
    document.getElementById('view-create').classList.add('hidden');
    document.getElementById('view-details').classList.add('hidden');
    document.getElementById(`view-${view}`).classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


 // Set today's date for create invoice
    document.addEventListener('DOMContentLoaded', function() {
        const today = new Date().toISOString().split('T')[0];
        const invDate = document.getElementById('c-inv-date');
        if (invDate) invDate.value = today;
        
        // Also set filter dates if they exist
        const filterFrom = document.getElementById('filter-from');
        const filterTo = document.getElementById('filter-to');
        if (filterFrom && filterTo) {
            const lastMonth = new Date();
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            filterFrom.value = lastMonth.toISOString().split('T')[0];
            filterTo.value = today;
        }
    });