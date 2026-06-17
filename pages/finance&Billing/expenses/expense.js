// =====================================================
// Expense Management — expense.js
// Complete JavaScript for Expense Management Module
// =====================================================

// =====================================================
// DATA STORE
// =====================================================

const EXP_DATA = {
    categories: [
        { code: 'WR-001', name: 'Warehouse Rent', status: 'Active' },
        { code: 'UT-002', name: 'Electricity', status: 'Active' },
        { code: 'UT-003', name: 'Internet', status: 'Active' },
        { code: 'TR-004', name: 'Transportation', status: 'Active' },
        { code: 'TR-005', name: 'Fuel', status: 'Active' },
        { code: 'AD-006', name: 'Office Supplies', status: 'Active' },
    ],
    expenses: [
        { number: 'EXP-2026-1045', date: '2026-06-17', category: 'Warehouse Rent', description: 'Monthly rent for Warehouse A', amount: 25000, status: 'Pending', warehouse: 'Warehouse A', department: 'Operations', vendor: 'ABC Properties' },
        { number: 'EXP-2026-1044', date: '2026-06-16', category: 'Electricity', description: 'Electricity bill - Warehouse B', amount: 8400, status: 'Approved', warehouse: 'Warehouse B', department: 'Warehouse', vendor: 'State Electricity Board' },
        { number: 'EXP-2026-1043', date: '2026-06-15', category: 'Internet', description: 'Broadband connection - HQ', amount: 5600, status: 'Paid', warehouse: 'Warehouse A', department: 'Admin', vendor: 'Tata Communications' },
        { number: 'EXP-2026-1042', date: '2026-06-14', category: 'Transportation', description: 'Goods transport - Chennai to Bangalore', amount: 12500, status: 'Pending', warehouse: 'Warehouse C', department: 'Logistics', vendor: 'FastTrack Logistics' },
        { number: 'EXP-2026-1041', date: '2026-06-13', category: 'Fuel', description: 'Diesel for delivery trucks', amount: 8200, status: 'Approved', warehouse: 'Warehouse D', department: 'Logistics', vendor: 'Indian Oil' },
        { number: 'EXP-2026-1040', date: '2026-06-12', category: 'Office Supplies', description: 'Stationery and printing', amount: 3500, status: 'Paid', warehouse: 'Warehouse A', department: 'Admin', vendor: 'OfficeMart' },
    ],
    payments: [
        { expenseNo: 'EXP-2026-1043', date: '2026-06-16', amount: 5600, mode: 'NEFT', ref: 'NEFT-0045', status: 'Paid' },
        { expenseNo: 'EXP-2026-1040', date: '2026-06-13', amount: 3500, mode: 'UPI', ref: 'UPI-2214', status: 'Paid' },
        { expenseNo: 'EXP-2026-1044', date: '2026-06-17', amount: 8400, mode: 'Bank Transfer', ref: 'BT-0092', status: 'Paid' },
    ],
    budget: [
        { category: 'Warehouse Rent', budget: 120000, actual: 115000 },
        { category: 'Electricity', budget: 60000, actual: 58000 },
        { category: 'Internet', budget: 24000, actual: 22000 },
        { category: 'Transportation', budget: 80000, actual: 75000 },
        { category: 'Fuel', budget: 50000, actual: 48000 },
        { category: 'Office Supplies', budget: 30000, actual: 28000 },
    ]
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

function getStatusBadge(status) {
    const map = {
        'Active': 'badge-active',
        'Inactive': 'badge-inactive',
        'Pending': 'badge-pending',
        'Approved': 'badge-approved',
        'Rejected': 'badge-rejected',
        'Paid': 'badge-paid',
        'Partially Paid': 'badge-partial',
        'Draft': 'badge-draft'
    };
    return map[status] || 'badge-pending';
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

    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Logging out...', 'info');
        setTimeout(() => window.location.href = '/login.html', 500);
    });
}

// =====================================================
// TAB SYSTEM
// =====================================================

function initTabs() {
    const tabs = document.querySelectorAll('.ap-tab');
    const panels = {
        dashboard: document.getElementById('panel-dashboard'),
        categories: document.getElementById('panel-categories'),
        entry: document.getElementById('panel-entry'),
        approval: document.getElementById('panel-approval'),
        payments: document.getElementById('panel-payments'),
        ledger: document.getElementById('panel-ledger'),
        budget: document.getElementById('panel-budget'),
        reports: document.getElementById('panel-reports')
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

    // Monthly Expense Trend
    const ctx1 = document.getElementById('chartExpenseTrend');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Expenses (₹ in Lakhs)',
                    data: [3.8, 4.2, 3.9, 4.5, 4.8, 4.6],
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

    // Category-wise Expenses
    const ctx2 = document.getElementById('chartCategoryExpense');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Warehouse Rent', 'Electricity', 'Internet', 'Transportation', 'Fuel', 'Office Supplies'],
                datasets: [{
                    data: [1.8, 0.9, 0.5, 0.8, 0.6, 0.4],
                    backgroundColor: [navy, slate, lavender, '#a78bfa', '#f0c987', '#34d399'],
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

function renderCategories() {
    const tbody = document.getElementById('categoryTbody');
    if (!tbody) return;
    tbody.innerHTML = EXP_DATA.categories.map(row => `
        <tr>
            <td><span class="font-medium">${row.code}</span></td>
            <td>${row.name}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="editCategory('${row.code}')" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon" onclick="toggleCategory('${row.code}')" title="Toggle Status"><i class="fas fa-toggle-on"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderEntry() {
    const tbody = document.getElementById('entryTbody');
    if (!tbody) return;
    tbody.innerHTML = EXP_DATA.expenses.map(row => `
        <tr>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.date}</td>
            <td>${row.category}</td>
            <td>${row.description}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="viewExpense('${row.number}')" title="View"><i class="fas fa-eye"></i></button>
                    ${row.status === 'Pending' ? `<button class="btn-icon" onclick="editExpense('${row.number}')" title="Edit"><i class="fas fa-edit"></i></button>` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

function renderApproval() {
    const tbody = document.getElementById('approvalTbody');
    if (!tbody) return;
    const pending = EXP_DATA.expenses.filter(e => e.status === 'Pending');
    if (pending.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-[#7288AE] py-6">No pending approvals</td></tr>`;
        return;
    }
    tbody.innerHTML = pending.map(row => `
        <tr>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.category}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td>Admin</td>
            <td><span class="badge badge-pending">Pending</span></td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="openApproveModal('${row.number}')" title="Approve"><i class="fas fa-check-circle text-emerald-600"></i></button>
                    <button class="btn-icon" onclick="viewExpense('${row.number}')" title="View"><i class="fas fa-eye"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderPayments() {
    const tbody = document.getElementById('paymentTbody');
    if (!tbody) return;
    tbody.innerHTML = EXP_DATA.payments.map(row => `
        <tr>
            <td><span class="font-medium">${row.expenseNo}</span></td>
            <td>${row.date}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td><span class="badge badge-active">${row.mode}</span></td>
            <td>${row.ref}</td>
            <td><span class="badge badge-paid">${row.status}</span></td>
        </tr>
    `).join('');
}

function renderLedger() {
    const tbody = document.getElementById('ledgerTbody');
    if (!tbody) return;
    const data = EXP_DATA.expenses.map(e => ({
        date: e.date,
        number: e.number,
        category: e.category,
        amount: e.amount,
        status: e.status
    }));
    tbody.innerHTML = data.map(row => `
        <tr>
            <td>${row.date}</td>
            <td><span class="font-medium">${row.number}</span></td>
            <td>${row.category}</td>
            <td>${formatCurrency(row.amount)}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
        </tr>
    `).join('');
}

function renderBudget() {
    const tbody = document.getElementById('budgetTbody');
    if (!tbody) return;
    tbody.innerHTML = EXP_DATA.budget.map(row => {
        const remaining = row.budget - row.actual;
        const pct = Math.round((row.actual / row.budget) * 100);
        const color = pct > 90 ? 'text-red-600' : pct > 70 ? 'text-amber-600' : 'text-emerald-600';
        return `
            <tr>
                <td><span class="font-medium">${row.category}</span></td>
                <td>${formatCurrency(row.budget)}</td>
                <td>${formatCurrency(row.actual)}</td>
                <td class="${remaining < 0 ? 'text-red-600' : ''}">${formatCurrency(remaining)}</td>
                <td>
                    <div class="flex items-center gap-2">
                        <div class="w-24 h-2 rounded-full bg-[#FAFAFA] overflow-hidden">
                            <div class="h-full rounded-full bg-[#4B5694]" style="width:${Math.min(pct, 100)}%"></div>
                        </div>
                        <span class="${color} text-xs font-semibold">${pct}%</span>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
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
    document.querySelectorAll('[data-close]').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.dataset.close);
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

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
// CATEGORY MODAL
// =====================================================

function initCategoryModal() {
    document.getElementById('btnNewCategory')?.addEventListener('click', () => {
        document.getElementById('catName').value = '';
        document.getElementById('catCode').value = '';
        document.getElementById('catStatus').value = 'Active';
        openModal('modalCategory');
    });

    document.getElementById('btnSaveCategory')?.addEventListener('click', function() {
        const name = document.getElementById('catName').value.trim();
        const code = document.getElementById('catCode').value.trim();
        if (!name || !code) {
            showToast('Please fill all fields', 'error');
            return;
        }
        EXP_DATA.categories.push({ code, name, status: 'Active' });
        renderCategories();
        showToast(`Category "${name}" added successfully`, 'success');
        closeModal('modalCategory');
    });
}

function editCategory(code) {
    const cat = EXP_DATA.categories.find(c => c.code === code);
    if (!cat) return;
    document.getElementById('catName').value = cat.name;
    document.getElementById('catCode').value = cat.code;
    document.getElementById('catStatus').value = cat.status;
    openModal('modalCategory');
}

function toggleCategory(code) {
    const cat = EXP_DATA.categories.find(c => c.code === code);
    if (!cat) return;
    cat.status = cat.status === 'Active' ? 'Inactive' : 'Active';
    renderCategories();
    showToast(`Category "${cat.name}" ${cat.status}`, 'info');
}

// =====================================================
// EXPENSE MODAL
// =====================================================

function initExpenseModal() {
    document.getElementById('btnNewExpense')?.addEventListener('click', () => {
        const count = EXP_DATA.expenses.length + 1;
        document.getElementById('expNumber').value = `EXP-2026-${String(1040 + count).padStart(2, '0')}`;
        document.getElementById('expDate').value = getToday();
        document.getElementById('expAmount').value = '';
        document.getElementById('expDesc').value = '';
        document.getElementById('expVendor').value = '';
        document.getElementById('expCategory').value = 'Warehouse Rent';
        document.getElementById('expWarehouse').value = 'Warehouse A';
        document.getElementById('expDept').value = 'Operations';
        openModal('modalExpense');
    });

    document.getElementById('btnSubmitExpense')?.addEventListener('click', function() {
        const number = document.getElementById('expNumber').value;
        const date = document.getElementById('expDate').value;
        const category = document.getElementById('expCategory').value;
        const amount = document.getElementById('expAmount').value;
        const desc = document.getElementById('expDesc').value;
        const warehouse = document.getElementById('expWarehouse').value;
        const dept = document.getElementById('expDept').value;
        const vendor = document.getElementById('expVendor').value;

        if (!date || !amount || !desc) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        EXP_DATA.expenses.push({
            number, date, category, description: desc,
            amount: parseFloat(amount), status: 'Pending',
            warehouse, department: dept, vendor: vendor || 'N/A'
        });
        renderEntry();
        renderApproval();
        renderLedger();
        showToast(`Expense ${number} submitted for approval`, 'success');
        closeModal('modalExpense');
    });

    document.getElementById('btnDraftExpense')?.addEventListener('click', function() {
        const number = document.getElementById('expNumber').value;
        const date = document.getElementById('expDate').value;
        const category = document.getElementById('expCategory').value;
        const amount = document.getElementById('expAmount').value;
        const desc = document.getElementById('expDesc').value;
        const warehouse = document.getElementById('expWarehouse').value;
        const dept = document.getElementById('expDept').value;
        const vendor = document.getElementById('expVendor').value;

        if (!date || !desc) {
            showToast('Please fill date and description', 'error');
            return;
        }

        EXP_DATA.expenses.push({
            number, date, category, description: desc,
            amount: parseFloat(amount) || 0, status: 'Draft',
            warehouse, department: dept, vendor: vendor || 'N/A'
        });
        renderEntry();
        showToast(`Expense ${number} saved as draft`, 'info');
        closeModal('modalExpense');
    });
}

function viewExpense(number) {
    const exp = EXP_DATA.expenses.find(e => e.number === number);
    if (!exp) return;
    showToast(`${exp.number}: ${exp.description} - ${formatCurrency(exp.amount)} (${exp.status})`, 'info');
}

function editExpense(number) {
    const exp = EXP_DATA.expenses.find(e => e.number === number);
    if (!exp) return;
    document.getElementById('expNumber').value = exp.number;
    document.getElementById('expDate').value = exp.date;
    document.getElementById('expCategory').value = exp.category;
    document.getElementById('expAmount').value = exp.amount;
    document.getElementById('expDesc').value = exp.description;
    document.getElementById('expWarehouse').value = exp.warehouse;
    document.getElementById('expDept').value = exp.department;
    document.getElementById('expVendor').value = exp.vendor;
    openModal('modalExpense');
}

// =====================================================
// APPROVAL MODAL
// =====================================================

function openApproveModal(number) {
    document.getElementById('approveSub').textContent = number;
    document.getElementById('approveRemarks').value = '';
    openModal('modalApprove');
}

function initApprovalModal() {
    document.getElementById('btnApproveYes')?.addEventListener('click', function() {
        const number = document.getElementById('approveSub').textContent;
        const exp = EXP_DATA.expenses.find(e => e.number === number);
        if (exp) {
            exp.status = 'Approved';
            renderApproval();
            renderEntry();
            renderLedger();
            showToast(`Expense ${number} approved`, 'success');
            closeModal('modalApprove');
        }
    });

    document.getElementById('btnApproveReject')?.addEventListener('click', function() {
        const number = document.getElementById('approveSub').textContent;
        const exp = EXP_DATA.expenses.find(e => e.number === number);
        if (exp) {
            exp.status = 'Rejected';
            renderApproval();
            renderEntry();
            renderLedger();
            showToast(`Expense ${number} rejected`, 'error');
            closeModal('modalApprove');
        }
    });
}

// =====================================================
// PAYMENT MODAL
// =====================================================

function initPaymentModal() {
    document.getElementById('btnNewPayment')?.addEventListener('click', () => {
        document.getElementById('payDate').value = getToday();
        document.getElementById('payAmount').value = '';
        document.getElementById('payRef').value = '';
        // Populate expense select with approved expenses
        const select = document.getElementById('payExpenseSelect');
        const approved = EXP_DATA.expenses.filter(e => e.status === 'Approved');
        select.innerHTML = approved.map(e => `<option value="${e.number}">${e.number} - ${formatCurrency(e.amount)}</option>`).join('');
        if (approved.length === 0) {
            select.innerHTML = '<option value="">No approved expenses</option>';
        }
        openModal('modalPayment');
    });

    document.getElementById('btnSavePayment')?.addEventListener('click', function() {
        const expenseNo = document.getElementById('payExpenseSelect').value;
        const date = document.getElementById('payDate').value;
        const amount = document.getElementById('payAmount').value;
        const mode = document.getElementById('payMode').value;
        const ref = document.getElementById('payRef').value;

        if (!expenseNo || !date || !amount) {
            showToast('Please fill all required fields', 'error');
            return;
        }

        // Update expense status
        const exp = EXP_DATA.expenses.find(e => e.number === expenseNo);
        if (exp) exp.status = 'Paid';

        EXP_DATA.payments.push({
            expenseNo, date, amount: parseFloat(amount),
            mode, ref: ref || 'N/A', status: 'Paid'
        });
        renderPayments();
        renderEntry();
        renderLedger();
        showToast(`Payment of ${formatCurrency(amount)} recorded for ${expenseNo}`, 'success');
        closeModal('modalPayment');
    });
}

// =====================================================
// FILTER FUNCTIONALITY
// =====================================================

function initFilters() {
    // Ledger category filter
    const filter = document.getElementById('ledgerCategoryFilter');
    filter?.addEventListener('change', function() {
        const val = this.value;
        const rows = document.querySelectorAll('#ledgerTbody tr');
        rows.forEach(row => {
            const cat = row.children[2]?.textContent || '';
            row.style.display = val === 'All Categories' || cat === val ? '' : 'none';
        });
    });

    // Date filters for ledger
    const from = document.getElementById('ledgerDateFrom');
    const to = document.getElementById('ledgerDateTo');
    [from, to].forEach(el => {
        el?.addEventListener('change', function() {
            const fromVal = from?.value || '';
            const toVal = to?.value || '';
            const rows = document.querySelectorAll('#ledgerTbody tr');
            rows.forEach(row => {
                const date = row.children[0]?.textContent || '';
                let show = true;
                if (fromVal && date < fromVal) show = false;
                if (toVal && date > toVal) show = false;
                row.style.display = show ? '' : 'none';
            });
        });
    });
}

// =====================================================
// EXPORT BUTTONS
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
    initSidebar();
    initTopbar();
    initTabs();
    initCharts();
    
    renderCategories();
    renderEntry();
    renderApproval();
    renderPayments();
    renderLedger();
    renderBudget();
    
    initModals();
    initCategoryModal();
    initExpenseModal();
    initApprovalModal();
    initPaymentModal();
    initFilters();
    initExportButtons();

    // Set default date for expense form
    document.getElementById('expDate').value = getToday();
    document.getElementById('payDate').value = getToday();

    console.log('✅ Expense Management module initialized');
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
// EXPOSE GLOBALS
// =====================================================

window.viewExpense = viewExpense;
window.editExpense = editExpense;
window.openApproveModal = openApproveModal;
window.editCategory = editCategory;
window.toggleCategory = toggleCategory;
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.closeModal = closeModal;
window.openModal = openModal;