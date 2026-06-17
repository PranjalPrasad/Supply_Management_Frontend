// =====================================================
// Profitability Analysis — profit.js
// Complete JavaScript for Profitability Analysis Module
// =====================================================

// =====================================================
// DATA STORE
// =====================================================

const PROFIT_DATA = {
    products: [
        { code: 'PRD-001', name: 'Steel Pipes (25mm)', revenue: 320000, cost: 210000, profit: 110000, qty: 450 },
        { code: 'PRD-002', name: 'Aluminium Sheets (4mm)', revenue: 280000, cost: 190000, profit: 90000, qty: 320 },
        { code: 'PRD-003', name: 'Industrial Bearings', revenue: 220000, cost: 160000, profit: 60000, qty: 180 },
        { code: 'PRD-004', name: 'Packaging Cartons (L)', revenue: 180000, cost: 140000, profit: 40000, qty: 280 },
        { code: 'PRD-005', name: 'Hydraulic Hoses', revenue: 150000, cost: 115000, profit: 35000, qty: 120 },
        { code: 'PRD-006', name: 'Motor Coupling Set', revenue: 120000, cost: 95000, profit: 25000, qty: 90 },
    ],
    customers: [
        { name: 'Ramesh Traders', revenue: 420000, cost: 310000, profit: 110000, orders: 24 },
        { name: 'Gupta Enterprises', revenue: 380000, cost: 280000, profit: 100000, orders: 18 },
        { name: 'Sundaram & Co', revenue: 280000, cost: 210000, profit: 70000, orders: 15 },
        { name: 'Bansal Distributors', revenue: 250000, cost: 190000, profit: 60000, orders: 12 },
        { name: 'Patel Wholesale', revenue: 200000, cost: 155000, profit: 45000, orders: 10 },
    ],
    warehouses: [
        { name: 'Warehouse A', revenue: 850000, expenses: 580000, profit: 270000 },
        { name: 'Warehouse B', revenue: 720000, expenses: 520000, profit: 200000 },
        { name: 'Warehouse C', revenue: 480000, expenses: 420000, profit: 60000 },
        { name: 'Warehouse D', revenue: 620000, expenses: 480000, profit: 140000 },
    ],
    costs: [
        { category: 'Purchase Costs', amount: 850000 },
        { category: 'Warehouse Rent', amount: 180000 },
        { category: 'Transportation', amount: 150000 },
        { category: 'Utilities', amount: 95000 },
        { category: 'Administrative', amount: 75000 },
        { category: 'Fuel & Logistics', amount: 120000 },
    ],
    reports: [
        { name: 'Product Profitability Report - Jun 2026', generated: '2026-06-15' },
        { name: 'Customer Profitability Report - Jun 2026', generated: '2026-06-14' },
        { name: 'Executive Summary - Q2 2026', generated: '2026-06-10' },
    ]
};

// Calculate margin %
function calcMargin(profit, revenue) {
    return revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
}

// Get margin level
function getMarginLevel(margin) {
    if (margin >= 30) return { label: 'Excellent', badge: 'badge-excellent' };
    if (margin >= 20) return { label: 'Good', badge: 'badge-good' };
    if (margin >= 10) return { label: 'Average', badge: 'badge-average' };
    return { label: 'Low', badge: 'badge-low' };
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
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
        product: document.getElementById('panel-product'),
        customer: document.getElementById('panel-customer'),
        warehouse: document.getElementById('panel-warehouse'),
        cost: document.getElementById('panel-cost'),
        margin: document.getElementById('panel-margin'),
        revenue: document.getElementById('panel-revenue'),
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

    // Revenue vs Cost Trend
    const ctx1 = document.getElementById('chartRevenueCost');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Revenue',
                        data: [3.8, 4.2, 4.5, 4.8, 5.2, 5.8],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.10)',
                        fill: true,
                        tension: 0.35,
                        pointBackgroundColor: '#10b981',
                        pointRadius: 4
                    },
                    {
                        label: 'Cost',
                        data: [2.8, 3.0, 3.1, 3.2, 3.5, 3.8],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.10)',
                        fill: true,
                        tension: 0.35,
                        pointBackgroundColor: '#ef4444',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' }
                    }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: fontColor } },
                    y: { grid: { color: gridColor }, ticks: { color: fontColor } }
                }
            }
        });
    }

    // Monthly Profit Trend
    const ctx2 = document.getElementById('chartProfitTrend');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Profit (₹ in Lakhs)',
                    data: [1.0, 1.2, 1.4, 1.6, 1.7, 2.0],
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

    // Cost Breakdown Pie Chart
    const ctx3 = document.getElementById('chartCostBreakdown');
    if (ctx3) {
        const colors = [navy, slate, lavender, '#a78bfa', '#f0c987', '#34d399'];
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: PROFIT_DATA.costs.map(c => c.category),
                datasets: [{
                    data: PROFIT_DATA.costs.map(c => c.amount),
                    backgroundColor: colors,
                    borderColor: '#FFFCFC',
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                cutout: '55%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: fontColor, boxWidth: 12, usePointStyle: true, pointStyle: 'circle' }
                    }
                }
            }
        });
    }

    // Revenue by Product
    const ctx4 = document.getElementById('chartRevenueProduct');
    if (ctx4) {
        new Chart(ctx4, {
            type: 'bar',
            data: {
                labels: PROFIT_DATA.products.map(p => p.name.substring(0, 15) + '...'),
                datasets: [{
                    label: 'Revenue (₹)',
                    data: PROFIT_DATA.products.map(p => p.revenue),
                    backgroundColor: slate,
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
}

// =====================================================
// RENDER TABLES
// =====================================================

function renderProductProfitability() {
    const tbody = document.getElementById('productTbody');
    if (!tbody) return;
    tbody.innerHTML = PROFIT_DATA.products.map(p => {
        const margin = calcMargin(p.profit, p.revenue);
        const level = getMarginLevel(margin);
        return `
            <tr>
                <td><span class="font-medium">${p.code}</span></td>
                <td>${p.name}</td>
                <td>${formatCurrency(p.revenue)}</td>
                <td>${formatCurrency(p.cost)}</td>
                <td>${formatCurrency(p.profit)}</td>
                <td><span class="badge ${level.badge}">${margin}%</span></td>
                <td>${p.qty}</td>
            </tr>
        `;
    }).join('');
}

function renderCustomerProfitability() {
    const tbody = document.getElementById('customerTbody');
    if (!tbody) return;
    tbody.innerHTML = PROFIT_DATA.customers.map(c => {
        const margin = calcMargin(c.profit, c.revenue);
        const level = getMarginLevel(margin);
        return `
            <tr>
                <td><span class="font-medium">${c.name}</span></td>
                <td>${formatCurrency(c.revenue)}</td>
                <td>${formatCurrency(c.cost)}</td>
                <td>${formatCurrency(c.profit)}</td>
                <td><span class="badge ${level.badge}">${margin}%</span></td>
                <td>${c.orders}</td>
            </tr>
        `;
    }).join('');
}

function renderWarehouseProfitability() {
    const tbody = document.getElementById('warehouseTbody');
    if (!tbody) return;
    tbody.innerHTML = PROFIT_DATA.warehouses.map(w => {
        const margin = calcMargin(w.profit, w.revenue);
        const level = getMarginLevel(margin);
        return `
            <tr>
                <td><span class="font-medium">${w.name}</span></td>
                <td>${formatCurrency(w.revenue)}</td>
                <td>${formatCurrency(w.expenses)}</td>
                <td>${formatCurrency(w.profit)}</td>
                <td><span class="badge ${level.badge}">${margin}%</span></td>
            </tr>
        `;
    }).join('');
}

function renderCostAnalysis() {
    const tbody = document.getElementById('costTbody');
    if (!tbody) return;
    const total = PROFIT_DATA.costs.reduce((sum, c) => sum + c.amount, 0);
    tbody.innerHTML = PROFIT_DATA.costs.map(c => {
        const pct = Math.round((c.amount / total) * 100);
        return `
            <tr>
                <td><span class="font-medium">${c.category}</span></td>
                <td>${formatCurrency(c.amount)}</td>
                <td>${pct}%</td>
            </tr>
        `;
    }).join('');
}

function renderMarginAnalysis() {
    const tbody = document.getElementById('marginTbody');
    if (!tbody) return;
    tbody.innerHTML = PROFIT_DATA.products.map(p => {
        const margin = calcMargin(p.profit, p.revenue);
        const level = getMarginLevel(margin);
        return `
            <tr>
                <td><span class="font-medium">${p.name}</span></td>
                <td>${formatCurrency(p.revenue)}</td>
                <td>${formatCurrency(p.profit)}</td>
                <td><span class="badge ${level.badge}">${margin}%</span></td>
                <td><span class="badge ${level.badge}">${level.label}</span></td>
            </tr>
        `;
    }).join('');
}

function renderReports() {
    const tbody = document.getElementById('reportTbody');
    if (!tbody) return;
    tbody.innerHTML = PROFIT_DATA.reports.map(r => `
        <tr>
            <td><span class="font-medium">${r.name}</span></td>
            <td>${r.generated}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="downloadReport('${r.name}')" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn-icon" onclick="viewReport('${r.name}')" title="View"><i class="fas fa-eye"></i></button>
                </div>
            </td>
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
// REPORT MODAL
// =====================================================

function initReportModal() {
    document.getElementById('btnGenerateReport')?.addEventListener('click', () => {
        document.getElementById('reportFrom').value = '';
        document.getElementById('reportTo').value = '';
        openModal('modalReport');
    });

    document.getElementById('btnGenerate')?.addEventListener('click', function() {
        const type = document.getElementById('reportType').value;
        const from = document.getElementById('reportFrom').value;
        const to = document.getElementById('reportTo').value;
        const format = document.getElementById('reportFormat').value;
        
        if (!from || !to) {
            showToast('Please select date range', 'error');
            return;
        }
        
        showToast(`Generating ${type} report in ${format} format...`, 'info');
        setTimeout(() => {
            showToast(`Report generated successfully!`, 'success');
            closeModal('modalReport');
        }, 1500);
    });
}

function downloadReport(name) {
    showToast(`Downloading ${name}...`, 'info');
    setTimeout(() => showToast('Download complete!', 'success'), 1000);
}

function viewReport(name) {
    showToast(`Viewing ${name}`, 'info');
}

// =====================================================
// FILTER FUNCTIONALITY
// =====================================================

function initFilters() {
    // Product search filter
    const productSearch = document.querySelector('#panel-product .filter-input[type="text"]');
    productSearch?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const rows = document.querySelectorAll('#productTbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    });

    // Customer search filter
    const customerSearch = document.querySelector('#panel-customer .filter-input[type="text"]');
    customerSearch?.addEventListener('input', function() {
        const term = this.value.toLowerCase();
        const rows = document.querySelectorAll('#customerTbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
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
    
    renderProductProfitability();
    renderCustomerProfitability();
    renderWarehouseProfitability();
    renderCostAnalysis();
    renderMarginAnalysis();
    renderReports();
    
    initModals();
    initReportModal();
    initFilters();
    initExportButtons();

    console.log('✅ Profitability Analysis module initialized');
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

window.downloadReport = downloadReport;
window.viewReport = viewReport;
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.closeModal = closeModal;
window.openModal = openModal;