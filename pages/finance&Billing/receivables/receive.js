// =====================================================
// Accounts Receivable — receive.js
// =====================================================

// ---------- Sample data (would come from API) ----------
const customersData = [
    { code: 'CUST-001', name: 'Ramesh Traders', outstanding: 395000, overdue: 86500, creditLimit: 400000, lastPayment: '12 Jun 2026', status: 'overdue' },
    { code: 'CUST-002', name: 'Kapoor Steel Co.', outstanding: 210000, overdue: 0, creditLimit: 500000, lastPayment: '08 Jun 2026', status: 'current' },
    { code: 'CUST-003', name: 'Verma Industries', outstanding: 98500, overdue: 0, creditLimit: 300000, lastPayment: '14 Jun 2026', status: 'duesoon' },
    { code: 'CUST-004', name: 'Sharma Enterprises', outstanding: 452000, overdue: 452000, creditLimit: 400000, lastPayment: '02 May 2026', status: 'credithold' },
    { code: 'CUST-005', name: 'Patel Hardware', outstanding: 64200, overdue: 0, creditLimit: 250000, lastPayment: '15 Jun 2026', status: 'current' },
];

const invoicesData = [
    { no: 'INV-3041', customer: 'Ramesh Traders', amount: 125000, paid: 38500, balance: 86500, due: '01 Jun 2026', status: 'overdue' },
    { no: 'INV-3052', customer: 'Ramesh Traders', amount: 210000, paid: 0, balance: 210000, due: '20 Jun 2026', status: 'unpaid' },
    { no: 'INV-3067', customer: 'Kapoor Steel Co.', amount: 98500, paid: 0, balance: 98500, due: '25 Jun 2026', status: 'unpaid' },
    { no: 'INV-3070', customer: 'Verma Industries', amount: 145000, paid: 145000, balance: 0, due: '10 Jun 2026', status: 'paid' },
    { no: 'INV-3081', customer: 'Sharma Enterprises', amount: 452000, paid: 0, balance: 452000, due: '15 May 2026', status: 'overdue' },
    { no: 'INV-3090', customer: 'Patel Hardware', amount: 64200, paid: 20000, balance: 44200, due: '22 Jun 2026', status: 'partial' },
];

const collectionsData = [
    { date: '12 Jun 2026', customer: 'Ramesh Traders', mode: 'UPI', ref: 'UPI8847221', amount: 125000 },
    { date: '08 Jun 2026', customer: 'Kapoor Steel Co.', mode: 'NEFT/RTGS', ref: 'NEFT772910', amount: 210000 },
    { date: '14 Jun 2026', customer: 'Verma Industries', mode: 'Cheque', ref: 'CHQ004521', amount: 98500 },
];

const receiptsData = [
    { no: 'RCPT-1042', customer: 'Ramesh Traders', date: '12 Jun 2026', amount: 125000 },
    { no: 'RCPT-1038', customer: 'Kapoor Steel Co.', date: '08 Jun 2026', amount: 210000 },
    { no: 'RCPT-1029', customer: 'Verma Industries', date: '14 Jun 2026', amount: 98500 },
];

const creditNotesData = [
    { no: 'CN-0091', customer: 'Ramesh Traders', amount: 8500, date: '05 Jun 2026' },
    { no: 'CN-0088', customer: 'Patel Hardware', amount: 3200, date: '29 May 2026' },
];

const agingData = [
    { customer: 'Ramesh Traders', current: 0, b1: 86500, b2: 0, b3: 0, b4: 0 },
    { customer: 'Kapoor Steel Co.', current: 210000, b1: 0, b2: 0, b3: 0, b4: 0 },
    { customer: 'Verma Industries', current: 98500, b1: 0, b2: 0, b3: 0, b4: 0 },
    { customer: 'Sharma Enterprises', current: 0, b1: 0, b2: 0, b3: 142000, b4: 310000 },
    { customer: 'Patel Hardware', current: 44200, b1: 0, b2: 0, b3: 0, b4: 0 },
];

const ledgerData = [
    { date: '01 Jun 2026', txn: 'Opening Balance', debit: '', credit: '', balance: 140000 },
    { date: '03 Jun 2026', txn: 'Invoice INV-3041 Generated', debit: 125000, credit: '', balance: 265000 },
    { date: '08 Jun 2026', txn: 'Invoice INV-3052 Generated', debit: 210000, credit: '', balance: 475000 },
    { date: '12 Jun 2026', txn: 'Payment Received — UPI', debit: '', credit: 125000, balance: 350000 },
    { date: '15 Jun 2026', txn: 'Credit Note CN-0091 Issued', debit: '', credit: 8500, balance: 341500 },
];

function fmt(n) {
    if (n === '' || n === undefined || n === null) return '—';
    return '₹' + Number(n).toLocaleString('en-IN');
}

function statusBadge(status) {
    const map = {
        current: ['Current', 'badge-current'],
        duesoon: ['Due Soon', 'badge-duesoon'],
        overdue: ['Overdue', 'badge-overdue'],
        credithold: ['Credit Hold', 'badge-credithold'],
        unpaid: ['Unpaid', 'badge-unpaid'],
        partial: ['Partially Paid', 'badge-partial'],
        paid: ['Paid', 'badge-paid'],
    };
    const [label, cls] = map[status] || [status, 'badge-current'];
    return `<span class="badge ${cls}">${label}</span>`;
}

// ---------- Render tables ----------
function renderOutstanding() {
    const tbody = document.getElementById('outstandingTbody');
    if (!tbody) return;
    tbody.innerHTML = customersData.map(c => `
        <tr>
            <td>${c.code}</td>
            <td>${c.name}</td>
            <td>${fmt(c.outstanding)}</td>
            <td>${fmt(c.overdue)}</td>
            <td>${fmt(c.creditLimit)}</td>
            <td>${fmt(Math.max(c.creditLimit - c.outstanding, 0))}</td>
            <td>${c.lastPayment}</td>
            <td>${statusBadge(c.status)}</td>
            <td>
                <button class="btn-icon" title="View Ledger" data-action="viewLedger" data-customer="${c.name}"><i class="fas fa-book"></i></button>
                <button class="btn-icon" title="Record Payment" data-action="recordPayment" data-customer="${c.name}" data-balance="${c.outstanding}"><i class="fas fa-hand-holding-usd"></i></button>
                <button class="btn-icon" title="Send Reminder" data-action="sendReminder" data-customer="${c.name}"><i class="fas fa-bell"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderInvoices() {
    const tbody = document.getElementById('invoicesTbody');
    if (!tbody) return;
    tbody.innerHTML = invoicesData.map(inv => `
        <tr>
            <td>${inv.no}</td>
            <td>${inv.customer}</td>
            <td>${fmt(inv.amount)}</td>
            <td>${fmt(inv.paid)}</td>
            <td>${fmt(inv.balance)}</td>
            <td>${inv.due}</td>
            <td>${statusBadge(inv.status)}</td>
            <td>
                <button class="btn-icon" title="View Invoice" data-action="viewInvoice" data-invoice="${inv.no}"><i class="fas fa-eye"></i></button>
                <button class="btn-icon" title="Record Payment" data-action="recordPayment" data-customer="${inv.customer}" data-balance="${inv.balance}"><i class="fas fa-hand-holding-usd"></i></button>
                <button class="btn-icon" title="Download Invoice" data-action="downloadInvoice"><i class="fas fa-download"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderCollections() {
    const tbody = document.getElementById('collectionTbody');
    if (!tbody) return;
    tbody.innerHTML = collectionsData.map(c => `
        <tr>
            <td>${c.date}</td>
            <td>${c.customer}</td>
            <td>${c.mode}</td>
            <td>${c.ref}</td>
            <td>${fmt(c.amount)}</td>
            <td>
                <button class="btn-icon" title="View Receipt" data-action="viewReceiptFromCollection" data-customer="${c.customer}" data-mode="${c.mode}" data-amount="${c.amount}"><i class="fas fa-receipt"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderReceipts() {
    const tbody = document.getElementById('receiptsTbody');
    if (!tbody) return;
    tbody.innerHTML = receiptsData.map(r => `
        <tr>
            <td>${r.no}</td>
            <td>${r.customer}</td>
            <td>${r.date}</td>
            <td>${fmt(r.amount)}</td>
            <td>
                <button class="btn-icon" title="View" data-action="viewReceipt" data-no="${r.no}" data-customer="${r.customer}" data-amount="${r.amount}"><i class="fas fa-eye"></i></button>
                <button class="btn-icon" title="Print"><i class="fas fa-print"></i></button>
                <button class="btn-icon" title="Email"><i class="fas fa-envelope"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderCreditNotes() {
    const tbody = document.getElementById('creditNotesTbody');
    if (!tbody) return;
    tbody.innerHTML = creditNotesData.map(cn => `
        <tr>
            <td>${cn.no}</td>
            <td>${cn.customer}</td>
            <td>${fmt(cn.amount)}</td>
            <td>${cn.date}</td>
            <td>
                <button class="btn-icon" title="View Details" data-action="viewCreditNote" data-no="${cn.no}" data-customer="${cn.customer}" data-amount="${cn.amount}"><i class="fas fa-eye"></i></button>
                <button class="btn-icon" title="Apply To Invoice" data-action="applyCreditNote"><i class="fas fa-link"></i></button>
            </td>
        </tr>
    `).join('');
}

function renderAging() {
    const tbody = document.getElementById('agingTbody');
    if (!tbody) return;
    tbody.innerHTML = agingData.map(a => {
        const total = a.current + a.b1 + a.b2 + a.b3 + a.b4;
        return `
        <tr>
            <td>${a.customer}</td>
            <td>${fmt(a.current)}</td>
            <td>${fmt(a.b1)}</td>
            <td>${fmt(a.b2)}</td>
            <td>${fmt(a.b3)}</td>
            <td>${fmt(a.b4)}</td>
            <td style="font-weight:600;">${fmt(total)}</td>
        </tr>`;
    }).join('');
}

function renderLedgerInto(tbodyId) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;
    tbody.innerHTML = ledgerData.map(l => `
        <tr>
            <td>${l.date}</td>
            <td>${l.txn}</td>
            <td class="${l.debit ? 'ledger-debit' : ''}">${fmt(l.debit)}</td>
            <td class="${l.credit ? 'ledger-credit' : ''}">${fmt(l.credit)}</td>
            <td style="font-weight:600;">${fmt(l.balance)}</td>
        </tr>
    `).join('');
}

// ---------- Toast ----------
function showToast(message, icon = 'fa-check-circle', color = 'emerald') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast-animate';
    toast.style.cssText = `background:#FFFCFC;border:1px solid rgba(75,86,148,0.2);border-radius:10px;padding:12px 16px;box-shadow:0 8px 20px rgba(17,24,68,0.18);display:flex;align-items:center;gap:10px;font-size:12px;color:#111844;min-width:240px;`;
    toast.innerHTML = `<i class="fas ${icon}" style="color:${color === 'emerald' ? '#10b981' : '#ef4444'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity .3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2600);
}

// ---------- Modal system (all forms = centered overlay) ----------
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('open');
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Sidebar toggle (same behavior as reference) ----------
    let isCollapsed = false;
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarToggleMobile = document.getElementById('sidebar-toggle-mobile');
    const overlay = document.getElementById('sidebar-overlay');

    function updateChevron() {
        const chevronIcon = sidebarToggle?.querySelector('i');
        if (!chevronIcon) return;
        if (window.innerWidth >= 1024) {
            chevronIcon.classList.remove('fa-chevron-left', 'fa-chevron-right');
            chevronIcon.classList.add(isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left');
        }
    }

    function toggleSidebarDesktop() {
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

    sidebarToggle?.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            sidebar.classList.toggle('sidebar-open');
            overlay?.classList.toggle('hidden');
        } else {
            toggleSidebarDesktop();
        }
    });

    sidebarToggleMobile?.addEventListener('click', () => {
        sidebar.classList.toggle('sidebar-open');
        overlay?.classList.toggle('hidden');
    });

    overlay?.addEventListener('click', () => {
        sidebar?.classList.remove('sidebar-open');
        overlay.classList.add('hidden');
    });

    window.addEventListener('resize', () => {
        updateChevron();
        if (window.innerWidth >= 1024 && sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.remove('sidebar-open');
            overlay?.classList.add('hidden');
        }
    });

    updateChevron();

    // ---------- Nav group (collapsible) ----------
    document.querySelectorAll('.nav-group-header').forEach(header => {
        header.addEventListener('click', function (e) {
            e.stopPropagation();
            const groupItems = this.nextElementSibling;
            const chevron = this.querySelector('.fa-chevron-down');
            if (groupItems) {
                groupItems.classList.toggle('hidden');
                if (chevron) chevron.style.transform = groupItems.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    // ---------- User menu / notifications dropdown ----------
    const userBtn = document.getElementById('user-menu-btn');
    const userMenu = document.getElementById('user-menu');
    userBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userMenu.classList.toggle('hidden');
    });

    const notifBtn = document.getElementById('notif-btn');
    const notifMenu = document.getElementById('notif-menu');
    notifBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        notifMenu.classList.toggle('hidden');
        userMenu?.classList.add('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target)) userMenu?.classList.add('hidden');
        if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
    });

    // ---------- Logout ----------
    document.getElementById('logout-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/login.html';
    });

    // ---------- Tabs ----------
    document.querySelectorAll('.ar-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.ar-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.ar-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById('panel-' + tab.dataset.tab);
            target?.classList.add('active');
        });
    });

    // ---------- Render tables ----------
    renderOutstanding();
    renderInvoices();
    renderCollections();
    renderReceipts();
    renderCreditNotes();
    renderAging();
    renderLedgerInto('ledgerTbody');

    // ---------- Modal close handlers (X buttons + click outside) ----------
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.close));
    });
    document.querySelectorAll('.modal-overlay').forEach(overlayEl => {
        overlayEl.addEventListener('click', (e) => {
            if (e.target === overlayEl) overlayEl.classList.remove('open');
        });
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
        }
    });

    // ---------- New Collection Entry ----------
    document.getElementById('btnNewCollection')?.addEventListener('click', () => {
        openModal('modalCollection');
    });
    document.getElementById('btnSaveCollection')?.addEventListener('click', () => {
        closeModal('modalCollection');
        showToast('Collection entry saved successfully');
    });
    document.getElementById('btnGenerateReceipt')?.addEventListener('click', () => {
        closeModal('modalCollection');
        showToast('Receipt generated successfully');
    });

    // ---------- Payment mode chips ----------
    document.querySelectorAll('.mode-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            chip.parentElement.querySelectorAll('.mode-chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
        });
    });

    // ---------- New Credit Note ----------
    document.getElementById('btnNewCreditNote')?.addEventListener('click', () => {
        document.getElementById('cnTitle').textContent = 'New Credit Note';
        document.getElementById('cnNumber').value = 'CN-0' + (90 + creditNotesData.length + 1);
        openModal('modalCreditNote');
    });
    document.getElementById('btnSaveCreditNote')?.addEventListener('click', () => {
        closeModal('modalCreditNote');
        showToast('Credit note saved successfully');
    });
    document.getElementById('btnApplyToInvoice')?.addEventListener('click', () => {
        showToast('Credit note applied to invoice');
    });

    // ---------- Send Reminder ----------
    document.getElementById('btnSendReminder')?.addEventListener('click', () => {
        closeModal('modalReminder');
        showToast('Reminder sent successfully');
    });

    // ---------- Record Payment (manual save) ----------
    document.getElementById('btnSaveRecordPayment')?.addEventListener('click', () => {
        closeModal('modalRecordPayment');
        showToast('Payment recorded successfully');
    });

    // ---------- View Invoice -> Record Payment shortcut ----------
    document.getElementById('btnViFromRecordPayment')?.addEventListener('click', () => {
        closeModal('modalViewInvoice');
        document.getElementById('rpCustomer').value = document.getElementById('viCustomer').textContent;
        document.getElementById('rpBalance').value = document.getElementById('viBalance').textContent;
        document.getElementById('rpSub').textContent = 'Against invoice ' + document.getElementById('viTitle').textContent.replace('Invoice ', '');
        openModal('modalRecordPayment');
    });

    // ---------- Delegated row actions ----------
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;

        if (action === 'viewLedger') {
            document.getElementById('vlTitle').textContent = 'Customer Ledger — ' + btn.dataset.customer;
            renderLedgerInto('vlTbody');
            openModal('modalViewLedger');
        }

        if (action === 'recordPayment') {
            document.getElementById('rpCustomer').value = btn.dataset.customer;
            document.getElementById('rpBalance').value = fmt(btn.dataset.balance);
            document.getElementById('rpSub').textContent = 'For ' + btn.dataset.customer;
            openModal('modalRecordPayment');
        }

        if (action === 'sendReminder') {
            document.getElementById('reminderSub').textContent = 'To: ' + btn.dataset.customer;
            openModal('modalReminder');
        }

        if (action === 'viewInvoice') {
            const inv = invoicesData.find(i => i.no === btn.dataset.invoice);
            if (inv) {
                document.getElementById('viTitle').textContent = 'Invoice ' + inv.no;
                document.getElementById('viCustomer').textContent = inv.customer;
                document.getElementById('viAmount').textContent = fmt(inv.amount);
                document.getElementById('viPaid').textContent = fmt(inv.paid);
                document.getElementById('viBalance').textContent = fmt(inv.balance);
                document.getElementById('viDue').textContent = inv.due;
                document.getElementById('viStatus').innerHTML = statusBadge(inv.status);
                openModal('modalViewInvoice');
            }
        }

        if (action === 'downloadInvoice') {
            showToast('Downloading invoice...', 'fa-download');
        }

        if (action === 'viewReceipt' || action === 'viewReceiptFromCollection') {
            document.getElementById('receiptDetailTitle').textContent = 'Receipt ' + (btn.dataset.no || 'RCPT-NEW');
            document.getElementById('rdNumber').textContent = btn.dataset.no || 'RCPT-NEW';
            document.getElementById('rdCustomer').textContent = btn.dataset.customer;
            document.getElementById('rdMode').textContent = btn.dataset.mode || '—';
            document.getElementById('rdAmount').textContent = fmt(btn.dataset.amount);
            openModal('modalReceiptDetails');
        }

        if (action === 'viewCreditNote') {
            document.getElementById('cnTitle').textContent = 'Credit Note ' + btn.dataset.no;
            document.getElementById('cnNumber').value = btn.dataset.no;
            document.getElementById('cnAmount').value = btn.dataset.amount;
            openModal('modalCreditNote');
        }

        if (action === 'applyCreditNote') {
            showToast('Credit note applied to invoice');
        }
    });

    // ---------- Ledger customer selector (panel) ----------
    document.getElementById('ledgerCustomerSelect')?.addEventListener('change', () => {
        renderLedgerInto('ledgerTbody');
    });

    // ---------- Charts ----------
    const navy = '#111844';
    const slate = '#4B5694';
    const lavender = '#7288AE';
    const cream = '#FAFAFA';
    const gridColor = 'rgba(75, 86, 148, 0.12)';
    const fontColor = '#7288AE';

    Chart.defaults.font.family = "'Roboto', sans-serif";
    Chart.defaults.font.size = 11;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    const cCollections = document.getElementById('chartCollections');
    if (cCollections) {
        new Chart(cCollections, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Collections (₹ in Lakhs)',
                    data: [3.6, 4.0, 3.4, 4.8, 5.1, 4.6],
                    backgroundColor: navy,
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

    const cOutstandingTrend = document.getElementById('chartOutstandingTrend');
    if (cOutstandingTrend) {
        new Chart(cOutstandingTrend, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: 'Outstanding (₹ in Lakhs)',
                    data: [32, 35, 33, 38, 40, 38.6],
                    borderColor: slate,
                    backgroundColor: 'rgba(75, 86, 148, 0.10)',
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: slate,
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

    const cTopCustomers = document.getElementById('chartTopCustomers');
    if (cTopCustomers) {
        new Chart(cTopCustomers, {
            type: 'bar',
            data: {
                labels: customersData.map(c => c.name),
                datasets: [{
                    label: 'Outstanding (₹)',
                    data: customersData.map(c => c.outstanding),
                    backgroundColor: lavender,
                    borderRadius: 6,
                    maxBarThickness: 28
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { color: gridColor }, ticks: { color: fontColor } },
                    y: { grid: { display: false }, ticks: { color: fontColor } }
                }
            }
        });
    }

    const cAgingDist = document.getElementById('chartAgingDist');
    if (cAgingDist) {
        const totals = { current: 0, b1: 0, b2: 0, b3: 0, b4: 0 };
        agingData.forEach(a => { totals.current += a.current; totals.b1 += a.b1; totals.b2 += a.b2; totals.b3 += a.b3; totals.b4 += a.b4; });
        new Chart(cAgingDist, {
            type: 'doughnut',
            data: {
                labels: ['Current', '1-30 Days', '31-60 Days', '61-90 Days', '90+ Days'],
                datasets: [{
                    data: [totals.current, totals.b1, totals.b2, totals.b3, totals.b4],
                    backgroundColor: [navy, slate, lavender, '#a78bfa', '#ef4444'],
                    borderColor: cream,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                cutout: '62%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' } }
                }
            }
        });
    }

});