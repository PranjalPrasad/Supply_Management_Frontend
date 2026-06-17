// =====================================================
// Accounts Payable — pay.js
// Complete JavaScript for Accounts Payable Module
// =====================================================

// =====================================================
// DATA STORE
// =====================================================

const AP_DATA = {
    outstanding: [
        { code: 'SUP-001', name: 'Bansal Traders', total: 265000, overdue: 0, lastInvoice: '2026-06-10', lastPayment: '2026-05-28', status: 'Current' },
        { code: 'SUP-002', name: 'Hindal Metals', total: 155000, overdue: 64000, lastInvoice: '2026-05-20', lastPayment: '2026-04-15', status: 'Overdue' },
        { code: 'SUP-003', name: 'Sundaram Castings', total: 98000, overdue: 98000, lastInvoice: '2026-04-25', lastPayment: '2026-03-10', status: 'Overdue' },
        { code: 'SUP-004', name: 'Rajesh Electricals', total: 72000, overdue: 0, lastInvoice: '2026-06-12', lastPayment: '2026-06-01', status: 'Due Soon' },
        { code: 'SUP-005', name: 'Gupta Steel Mills', total: 188000, overdue: 0, lastInvoice: '2026-06-08', lastPayment: '2026-05-20', status: 'Current' },
    ],
    invoices: [
        { number: 'VINV-2231', supplier: 'Bansal Traders', po: 'PO-2041', amount: 98000, paid: 34000, balance: 64000, dueDate: '2026-06-19', status: 'Overdue' },
        { number: 'VINV-2235', supplier: 'Hindal Metals', po: 'PO-2050', amount: 155000, paid: 0, balance: 155000, dueDate: '2026-06-30', status: 'Pending' },
        { number: 'VINV-2244', supplier: 'Bansal Traders', po: 'PO-2062', amount: 46000, paid: 0, balance: 46000, dueDate: '2026-07-05', status: 'Pending' },
        { number: 'VINV-2250', supplier: 'Sundaram Castings', po: 'PO-2071', amount: 98000, paid: 0, balance: 98000, dueDate: '2026-05-25', status: 'Overdue' },
        { number: 'VINV-2260', supplier: 'Rajesh Electricals', po: 'PO-2085', amount: 72000, paid: 25000, balance: 47000, dueDate: '2026-07-10', status: 'Partially Paid' },
        { number: 'VINV-2265', supplier: 'Gupta Steel Mills', po: 'PO-2090', amount: 188000, paid: 60000, balance: 128000, dueDate: '2026-07-15', status: 'Partially Paid' },
    ],
    payments: [
        { date: '2026-06-15', supplier: 'Bansal Traders', mode: 'NEFT', ref: 'NEFT-0042', amount: 140000 },
        { date: '2026-06-10', supplier: 'Hindal Metals', mode: 'Bank Transfer', ref: 'BT-0081', amount: 50000 },
        { date: '2026-06-05', supplier: 'Rajesh Electricals', mode: 'UPI', ref: 'UPI-3312', amount: 25000 },
    ],
    vouchers: [
        { number: 'PV-1042', supplier: 'Bansal Traders', date: '2026-06-15', amount: 140000 },
        { number: 'PV-1040', supplier: 'Hindal Metals', date: '2026-06-10', amount: 50000 },
        { number: 'PV-1038', supplier: 'Rajesh Electricals', date: '2026-06-05', amount: 25000 },
    ],
    debitNotes: [
        { number: 'DN-2026-01', supplier: 'Sundaram Castings', amount: 12000, date: '2026-06-01' },
        { number: 'DN-2026-02', supplier: 'Bansal Traders', amount: 5000, date: '2026-06-14' },
        { number: 'DN-2026-03', supplier: 'Hindal Metals', amount: 8000, date: '2026-06-18' },
    ],
    aging: [
        { supplier: 'Bansal Traders', current: 46000, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 46000 },
        { supplier: 'Hindal Metals', current: 155000, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 155000 },
        { supplier: 'Sundaram Castings', current: 0, days30: 0, days60: 0, days90: 0, days90plus: 98000, total: 98000 },
        { supplier: 'Rajesh Electricals', current: 47000, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 47000 },
        { supplier: 'Gupta Steel Mills', current: 128000, days30: 0, days60: 0, days90: 0, days90plus: 0, total: 128000 },
    ],
    ledger: {
        'Bansal Traders': [
            { date: '2026-06-01', transaction: 'Opening Balance', debit: 0, credit: 95000, balance: 95000 },
            { date: '2026-06-05', transaction: 'Invoice VINV-2231', debit: 98000, credit: 0, balance: 193000 },
            { date: '2026-06-10', transaction: 'Payment - NEFT', debit: 0, credit: 34000, balance: 159000 },
            { date: '2026-06-14', transaction: 'Debit Note DN-2026-02', debit: 5000, credit: 0, balance: 154000 },
            { date: '2026-06-15', transaction: 'Payment - NEFT', debit: 0, credit: 140000, balance: 14000 },
        ],
        'Hindal Metals': [
            { date: '2026-06-01', transaction: 'Opening Balance', debit: 0, credit: 0, balance: 0 },
            { date: '2026-06-10', transaction: 'Payment - BT', debit: 0, credit: 50000, balance: -50000 },
            { date: '2026-06-18', transaction: 'Debit Note DN-2026-03', debit: 8000, credit: 0, balance: -42000 },
            { date: '2026-06-20', transaction: 'Invoice VINV-2235', debit: 155000, credit: 0, balance: 113000 },
        ],
        'Sundaram Castings': [
            { date: '2026-06-01', transaction: 'Opening Balance', debit: 0, credit: 0, balance: 0 },
            { date: '2026-06-01', transaction: 'Debit Note DN-2026-01', debit: 12000, credit: 0, balance: 12000 },
            { date: '2026-06-20', transaction: 'Invoice VINV-2250', debit: 98000, credit: 0, balance: 110000 },
        ],
    }
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

function getStatusBadge(status) {
    const map = {
        'Current': 'badge-current',
        'Due Soon': 'badge-duesoon',
        'Overdue': 'badge-overdue',
        'On Hold': 'badge-onhold',
        'Pending': 'badge-pending',
        'Partially Paid': 'badge-partial',
        'Paid': 'badge-paid'
    };
    return map[status] || 'badge-current';
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const colors = {
        success: 'bg-emerald-50 border-emerald-500 text-emerald-800',
        error: 'bg-red-50 border-red-500 text-red-800',
        warning: 'bg-amber-50 border-amber-500 text-amber-800',
        info: 'bg-blue-50 border-blue-500 text-blue-800'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast-animate px-4 py-3 rounded-lg border-l-4 shadow-lg ${colors[type] || colors.info} max-w-sm`;
    toast.innerHTML = `
        <div class="flex items-center gap-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-triangle-exclamation' : 'fa-info-circle'}"></i>
            <span class="text-sm font-medium">${message}</span>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =====================================================
// SIDEBAR / NAVIGATION
// =====================================================

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const overlay = document.getElementById('sidebar-overlay');
    let isCollapsed = false;

    function updateChevron() {
        const chevronIcon = sidebarToggle?.querySelector('i');
        if (!chevronIcon) return;
        if (isCollapsed && window.innerWidth >= 1024) {
            chevronIcon.className = 'fas fa-chevron-right text-sm';
        } else {
            chevronIcon.className = 'fas fa-chevron-left text-sm';
        }
    }

    sidebarToggle?.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            sidebar.classList.toggle('sidebar-open');
            overlay?.classList.toggle('hidden');
        } else {
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
            updateChevron();
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
        if (window.innerWidth < 1024) {
            sidebar.classList.remove('sidebar-collapsed');
            mainWrapper.classList.remove('main-expanded');
            mainWrapper.style.marginLeft = '';
            isCollapsed = false;
        }
        updateChevron();
    });

    // Nav dropdowns
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

    updateChevron();
}

// =====================================================
// TOPBAR / USER MENU / NOTIFICATIONS
// =====================================================

function initTopbar() {
    const userBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    const notifBtn = document.getElementById('notif-btn');
    const notifMenu = document.getElementById('notif-menu');

    userBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('hidden');
        notifMenu?.classList.add('hidden');
    });

    notifBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('hidden');
        userMenu?.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target))
            userMenu?.classList.add('hidden');
        if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target))
            notifMenu?.classList.add('hidden');
    });

    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Logging out...', 'info');
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 500);
    });
}

// =====================================================
// TAB SYSTEM
// =====================================================

function initTabs() {
    const tabs = document.querySelectorAll('.ap-tab');
    const panels = {
        dashboard: document.getElementById('panel-dashboard'),
        outstanding: document.getElementById('panel-outstanding'),
        invoices: document.getElementById('panel-invoices'),
        processing: document.getElementById('panel-processing'),
        vouchers: document.getElementById('panel-vouchers'),
        debitnotes: document.getElementById('panel-debitnotes'),
        aging: document.getElementById('panel-aging'),
        ledger: document.getElementById('panel-ledger')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            Object.values(panels).forEach(p => p.classList.remove('active'));
            const target = this.dataset.tab;
            if (panels[target]) panels[target].classList.add('active');
        });
    });
}

// =====================================================
// CHARTS
// =====================================================

function initCharts() {
    const navy = '#111844';
    const slate = '#4B5694';
    const lavender = '#7288AE';
    const gridColor = 'rgba(75, 86, 148, 0.12)';
    const fontColor = '#7288AE';

    Chart.defaults.font.family = "'Roboto', sans-serif";
    Chart.defaults.font.size = 11;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    // Monthly Vendor Payments
    const ctx1 = document.getElementById('chartPayments');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Payments (₹ in Lakhs)',
                    data: [2.8, 3.2, 3.0, 3.5, 4.2, 3.8],
                    backgroundColor: slate,
                    borderRadius: 6,
                    maxBarThickness: 36
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: fontColor } },
                    y: { grid: { color: gridColor }, ticks: { color: fontColor } }
                }
            }
        });
    }

    // Outstanding Trend
    const ctx2 = document.getElementById('chartOutstandingTrend');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Outstanding (₹ in Lakhs)',
                    data: [5.2, 5.8, 5.5, 6.1, 6.8, 6.7],
                    borderColor: navy,
                    backgroundColor: 'rgba(17, 24, 68, 0.10)',
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: navy,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: fontColor } },
                    y: { grid: { color: gridColor }, ticks: { color: fontColor } }
                }
            }
        });
    }

    // Top Vendors by Purchase Value
    const ctx3 = document.getElementById('chartTopVendors');
    if (ctx3) {
        new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Bansal Traders', 'Hindal Metals', 'Sundaram Castings', 'Gupta Steel', 'Rajesh Elec'],
                datasets: [{
                    label: 'Purchase Value (₹ in Lakhs)',
                    data: [4.8, 3.2, 2.5, 2.8, 1.5],
                    backgroundColor: [navy, slate, lavender, '#a78bfa', '#f0c987'],
                    borderRadius: 6,
                    maxBarThickness: 32
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: fontColor } },
                    y: { grid: { color: gridColor }, ticks: { color: fontColor } }
                }
            }
        });
    }

    // Payable Aging Distribution
    const ctx4 = document.getElementById('chartAgingDist');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'doughnut',
            data: {
                labels: ['Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
                datasets: [{
                    data: [21.1, 3.2, 2.0, 0.8, 6.7],
                    backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444', '#7c3aed'],
                    borderColor: '#FFFCFC',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                cutout: '62%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' }
                    }
                }
            }
        });
    }
}

// =====================================================
// RENDER TABLES
// =====================================================

function renderOutstanding() {
    const tbody = document.getElementById('outstandingTbody');
    if (!tbody) return;
    tbody.innerHTML = AP_DATA.outstanding.map(row => `
        <tr>
            <td><span class="font-medium">${row.code}</span></td>
            <td>${row.name}</td>
            <td>${formatCurrency(row.total)}</td>
            <td class="${row.overdue > 0 ? 'text-red-600 font-semibold' : ''}">${formatCurrency(row.overdue)}</td>
            <td>${row.lastInvoice}</td>
            <td>${row.lastPayment}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewLedger('${row.name}')" title="View Ledger"><i class="fas fa-book"></i></button>
                    <button class="btn-icon" onclick="openRecordPayment('${row.name}', ${row.total})" title="Make Payment"><i class="fas fa-money-bill-wave"></i></button>
                    <button class="btn-icon" onclick="viewSupplierInvoices('${row.name}')" title="View Invoices"><i class="fas fa-file-invoice"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderInvoices() {
    const tbody = document.getElementById('invoicesTbody');
    if (!tbody) return;
    tbody.innerHTML = AP_DATA.invoices.map(row => `
        <tr>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.supplier}</td>
            <td>${row.po}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td>${formatCurrency(row.paid)}</td>
            <td class="${row.balance > 0 ? 'font-semibold' : ''}">${formatCurrency(row.balance)}</td>
            <td>${row.dueDate}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewInvoice('${row.number}')" title="View Invoice"><i class="fas fa-eye"></i></button>
                    ${row.balance > 0 ? `<button class="btn-icon" onclick="openRecordPayment('${row.supplier}', ${row.balance})" title="Record Payment"><i class="fas fa-money-bill-wave"></i></button>` : ''}
                    <button class="btn-icon" title="Download"><i class="fas fa-download"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderProcessing() {
    const tbody = document.getElementById('processingTbody');
    if (!tbody) return;
    tbody.innerHTML = AP_DATA.payments.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.supplier}</td>
            <td><span class="badge badge-current">${row.mode}</span></td>
            <td>${row.ref}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewVoucher('PV-${row.ref}')" title="View Voucher"><i class="fas fa-file-invoice"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderVouchers() {
    const tbody = document.getElementById('vouchersTbody');
    if (!tbody) return;
    tbody.innerHTML = AP_DATA.vouchers.map(row => `
        <tr>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.supplier}</td>
            <td>${row.date}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewVoucher('${row.number}')" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon" title="Download PDF"><i class="fas fa-file-pdf"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderDebitNotes() {
    const tbody = document.getElementById('debitNotesTbody');
    if (!tbody) return;
    tbody.innerHTML = AP_DATA.debitNotes.map(row => `
        <tr>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.supplier}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td>${row.date}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewDebitNote('${row.number}')" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-icon" title="Apply Against Invoice"><i class="fas fa-link"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderAging() {
    const tbody = document.getElementById('agingTbody');
    if (!tbody) return;
    const totalCurrent = AP_DATA.aging.reduce((s, r) => s + r.current, 0);
    const total30 = AP_DATA.aging.reduce((s, r) => s + r.days30, 0);
    const total60 = AP_DATA.aging.reduce((s, r) => s + r.days60, 0);
    const total90 = AP_DATA.aging.reduce((s, r) => s + r.days90, 0);
    const total90plus = AP_DATA.aging.reduce((s, r) => s + r.days90plus, 0);
    const totalAll = AP_DATA.aging.reduce((s, r) => s + r.total, 0);

    tbody.innerHTML = AP_DATA.aging.map(row => `
        <tr>
            <td><span class="font-medium">${row.supplier}</span></td>
            <td>${formatCurrency(row.current)}</td>
            <td>${formatCurrency(row.days30)}</td>
            <td>${formatCurrency(row.days60)}</td>
            <td>${formatCurrency(row.days90)}</td>
            <td class="${row.days90plus > 0 ? 'text-red-600 font-semibold' : ''}">${formatCurrency(row.days90plus)}</td>
            <td>${formatCurrency(row.total)}</td>
        </tr>
    `).join('');

    // Add totals row
    tbody.innerHTML += `
        <tr class="bg-[#FAFAFA] font-semibold">
            <td>TOTAL</td>
            <td>${formatCurrency(totalCurrent)}</td>
            <td>${formatCurrency(total30)}</td>
            <td>${formatCurrency(total60)}</td>
            <td>${formatCurrency(total90)}</td>
            <td>${formatCurrency(total90plus)}</td>
            <td>${formatCurrency(totalAll)}</td>
        </tr>
    `;
}

function renderLedger(supplier) {
    const tbody = document.getElementById('ledgerTbody');
    if (!tbody) return;
    const data = AP_DATA.ledger[supplier] || AP_DATA.ledger['Bansal Traders'];
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.transaction}</td>
            <td class="${row.debit > 0 ? 'ledger-debit' : ''}">${row.debit > 0 ? formatCurrency(row.debit) : '-'}</td>
            <td class="${row.credit > 0 ? 'ledger-credit' : ''}">${row.credit > 0 ? formatCurrency(row.credit) : '-'}</td>
            <td class="font-medium">${formatCurrency(row.balance)}</td>
        </tr>
    `).join('');
}

// =====================================================
// MODAL SYSTEM
// =====================================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
}

function initModals() {
    // Close buttons
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.dataset.close);
        });
    });

    // Click overlay to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => {
                m.classList.remove('open');
                document.body.style.overflow = '';
            });
        }
    });
}

// =====================================================
// PAYMENT MODAL
// =====================================================

function initPaymentModal() {
    const btn = document.getElementById('btnNewPayment');
    btn?.addEventListener('click', () => {
        document.getElementById('payDate').value = getToday();
        document.getElementById('payAmount').value = '';
        document.getElementById('payRef').value = '';
        document.getElementById('paySupplier').value = '';
        document.querySelectorAll('.mode-chip').forEach(c => c.classList.remove('selected'));
        openModal('modalPayment');
    });

    // Mode chips
    document.querySelectorAll('.mode-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.mode-chip').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Save Payment
    document.getElementById('btnSavePayment')?.addEventListener('click', function() {
        const supplier = document.getElementById('paySupplier').value;
        const amount = document.getElementById('payAmount').value;
        const date = document.getElementById('payDate').value;
        const ref = document.getElementById('payRef').value;
        const mode = document.querySelector('.mode-chip.selected')?.dataset.mode || 'NEFT';

        if (!supplier || !amount || !date) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        showToast(`Payment of ${formatCurrency(amount)} processed for ${supplier}`, 'success');
        closeModal('modalPayment');
    });

    // Generate Voucher
    document.getElementById('btnGenerateVoucher')?.addEventListener('click', function() {
        const supplier = document.getElementById('paySupplier').value;
        const amount = document.getElementById('payAmount').value;
        if (!supplier || !amount) {
            showToast('Please fill supplier and amount first', 'error');
            return;
        }
        const voucherNo = 'PV-' + String(Math.floor(Math.random() * 9000) + 1000);
        showToast(`Voucher ${voucherNo} generated successfully`, 'success');
        closeModal('modalPayment');
        setTimeout(() => {
            viewVoucher(voucherNo);
        }, 300);
    });
}

// =====================================================
// RECORD PAYMENT MODAL
// =====================================================

function openRecordPayment(supplier, balance) {
    document.getElementById('rpSupplier').value = supplier;
    document.getElementById('rpBalance').value = formatCurrency(balance);
    document.getElementById('rpDate').value = getToday();
    document.getElementById('rpAmount').value = balance;
    document.getElementById('rpRef').value = '';
    document.getElementById('rpMode').value = 'NEFT';
    openModal('modalRecordPayment');
}

function initRecordPaymentModal() {
    document.getElementById('btnSaveRecordPayment')?.addEventListener('click', function() {
        const supplier = document.getElementById('rpSupplier').value;
        const amount = document.getElementById('rpAmount').value;
        const date = document.getElementById('rpDate').value;
        const mode = document.getElementById('rpMode').value;
        const ref = document.getElementById('rpRef').value;

        if (!amount || !date) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        showToast(`Payment of ${formatCurrency(amount)} recorded for ${supplier}`, 'success');
        closeModal('modalRecordPayment');
    });
}

// =====================================================
// VOUCHER DETAILS MODAL
// =====================================================

function viewVoucher(number) {
    const voucher = AP_DATA.vouchers.find(v => v.number === number) || AP_DATA.vouchers[0];
    document.getElementById('vdNumber').textContent = voucher.number;
    document.getElementById('vdSupplier').textContent = voucher.supplier;
    document.getElementById('vdMode').textContent = 'NEFT';
    document.getElementById('vdAmount').textContent = formatCurrency(voucher.amount);
    document.getElementById('voucherDetailTitle').textContent = `Voucher ${voucher.number}`;
    
    // Sample allocations
    const tbody = document.getElementById('vdAllocTbody');
    tbody.innerHTML = `
        <tr><td>VINV-2231</td><td>${formatCurrency(Math.round(voucher.amount * 0.45))}</td></tr>
        <tr><td>VINV-2244</td><td>${formatCurrency(Math.round(voucher.amount * 0.55))}</td></tr>
    `;
    openModal('modalVoucherDetails');
}

// =====================================================
// DEBIT NOTE MODAL
// =====================================================

function initDebitNoteModal() {
    document.getElementById('btnNewDebitNote')?.addEventListener('click', () => {
        document.getElementById('dnNumber').value = 'DN-2026-' + String(AP_DATA.debitNotes.length + 1).padStart(2, '0');
        document.getElementById('dnAmount').value = '';
        document.getElementById('dnSupplier').value = 'Bansal Traders';
        document.getElementById('dnRefInvoice').value = 'VINV-2231';
        document.getElementById('dnReason').value = 'Purchase Return';
        document.getElementById('dnTitle').textContent = 'New Debit Note';
        openModal('modalDebitNote');
    });

    document.getElementById('btnSaveDebitNote')?.addEventListener('click', function() {
        const supplier = document.getElementById('dnSupplier').value;
        const amount = document.getElementById('dnAmount').value;
        const reason = document.getElementById('dnReason').value;
        if (!amount) {
            showToast('Please enter debit amount', 'error');
            return;
        }
        showToast(`Debit Note created for ${supplier}: ${formatCurrency(amount)}`, 'success');
        closeModal('modalDebitNote');
    });

    document.getElementById('btnApplyAgainstInvoice')?.addEventListener('click', function() {
        showToast('Debit note applied against selected invoice', 'success');
        closeModal('modalDebitNote');
    });
}

// =====================================================
// VIEW INVOICE MODAL
// =====================================================

function viewInvoice(number) {
    const invoice = AP_DATA.invoices.find(i => i.number === number) || AP_DATA.invoices[0];
    document.getElementById('viTitle').textContent = `Invoice ${invoice.number}`;
    document.getElementById('viSupplier').textContent = invoice.supplier;
    document.getElementById('viPo').textContent = invoice.po;
    document.getElementById('viAmount').textContent = formatCurrency(invoice.amount);
    document.getElementById('viPaid').textContent = formatCurrency(invoice.paid);
    document.getElementById('viBalance').textContent = formatCurrency(invoice.balance);
    document.getElementById('viDue').textContent = invoice.dueDate;
    document.getElementById('viStatus').textContent = invoice.status;
    document.getElementById('viStatus').className = `badge ${getStatusBadge(invoice.status)}`;
    openModal('modalViewInvoice');
}

// =====================================================
// VIEW LEDGER MODAL
// =====================================================

function viewLedger(supplier) {
    document.getElementById('vlTitle').textContent = `Vendor Ledger — ${supplier}`;
    const data = AP_DATA.ledger[supplier] || AP_DATA.ledger['Bansal Traders'];
    const tbody = document.getElementById('vlTbody');
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.date}</td>
            <td>${row.transaction}</td>
            <td class="${row.debit > 0 ? 'ledger-debit' : ''}">${row.debit > 0 ? formatCurrency(row.debit) : '-'}</td>
            <td class="${row.credit > 0 ? 'ledger-credit' : ''}">${row.credit > 0 ? formatCurrency(row.credit) : '-'}</td>
            <td class="font-medium">${formatCurrency(row.balance)}</td>
        </tr>
    `).join('');
    openModal('modalViewLedger');
}

function viewSupplierInvoices(supplier) {
    showToast(`Viewing invoices for ${supplier}`, 'info');
    // Switch to invoices tab
    document.querySelectorAll('.ap-tab').forEach(t => t.classList.remove('active'));
    document.querySelector('[data-tab="invoices"]')?.classList.add('active');
    document.querySelectorAll('.ap-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-invoices')?.classList.add('active');
}

function viewDebitNote(number) {
    const note = AP_DATA.debitNotes.find(d => d.number === number) || AP_DATA.debitNotes[0];
    showToast(`Debit Note ${note.number}: ${formatCurrency(note.amount)}`, 'info');
}

// =====================================================
// LEDGER SELECTOR
// =====================================================

function initLedgerSelector() {
    const select = document.getElementById('ledgerSupplierSelect');
    select?.addEventListener('change', function() {
        renderLedger(this.value);
    });
}

// =====================================================
// FILTER FUNCTIONALITY
// =====================================================

function initFilters() {
    // Simple search filter for outstanding table
    const searchInput = document.querySelector('#panel-outstanding .filter-input[type="text"]');
    searchInput?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const rows = document.querySelectorAll('#outstandingTbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });

    // Invoice search
    const invSearch = document.querySelector('#panel-invoices .filter-input[type="text"]');
    invSearch?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const rows = document.querySelectorAll('#invoicesTbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

// =====================================================
// EXPORT FUNCTIONALITY
// =====================================================

function initExportButtons() {
    document.querySelectorAll('.btn-secondary .fa-download')?.forEach(btn => {
        btn.closest('.btn-secondary')?.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Export started. File will download shortly.', 'success');
        });
    });
}

// =====================================================
// INITIALIZATION
// =====================================================

function init() {
    // Sidebar & navigation
    initSidebar();
    initTopbar();
    
    // Tabs
    initTabs();
    
    // Charts
    initCharts();
    
    // Render tables
    renderOutstanding();
    renderInvoices();
    renderProcessing();
    renderVouchers();
    renderDebitNotes();
    renderAging();
    renderLedger('Bansal Traders');
    
    // Modals
    initModals();
    initPaymentModal();
    initRecordPaymentModal();
    initDebitNoteModal();
    
    // Other
    initLedgerSelector();
    initFilters();
    initExportButtons();
    
    // Connect "Record Payment" button from View Invoice modal
    document.getElementById('btnViFromRecordPayment')?.addEventListener('click', function() {
        const supplier = document.getElementById('viSupplier').textContent;
        const balance = parseFloat(document.getElementById('viBalance').textContent.replace(/[₹,]/g, ''));
        closeModal('modalViewInvoice');
        setTimeout(() => {
            openRecordPayment(supplier, balance);
        }, 300);
    });

    // Set default date for payment modals
    document.querySelectorAll('#payDate, #rpDate').forEach(el => {
        if (el && !el.value) el.value = getToday();
    });

    console.log('✅ Accounts Payable module initialized');
}

// =====================================================
// DOM READY
// =====================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// =====================================================
// EXPOSE GLOBALS (for inline onclick handlers)
// =====================================================

window.viewLedger = viewLedger;
window.openRecordPayment = openRecordPayment;
window.viewSupplierInvoices = viewSupplierInvoices;
window.viewInvoice = viewInvoice;
window.viewVoucher = viewVoucher;
window.viewDebitNote = viewDebitNote;
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.closeModal = closeModal;
window.openModal = openModal;