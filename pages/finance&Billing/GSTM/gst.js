// =====================================================
// GST Management — gst.js
// Complete JavaScript for GST Management Module
// =====================================================

// =====================================================
// DATA STORE
// =====================================================

const GST_DATA = {
    summary: [
        { month: 'Jan 2026', output: 42000, input: 25000, net: 17000, paid: 17000, balance: 0 },
        { month: 'Feb 2026', output: 38000, input: 22000, net: 16000, paid: 16000, balance: 0 },
        { month: 'Mar 2026', output: 45000, input: 28000, net: 17000, paid: 17000, balance: 0 },
        { month: 'Apr 2026', output: 52000, input: 31000, net: 21000, paid: 21000, balance: 0 },
        { month: 'May 2026', output: 48000, input: 29000, net: 19000, paid: 19000, balance: 0 },
        { month: 'Jun 2026', output: 58000, input: 35000, net: 23000, paid: 0, balance: 23000 },
    ],
    reports: [
        { name: 'GSTR-1 - Jun 2026', period: 'Jun 2026', generated: '2026-06-15', actions: 'Download' },
        { name: 'GSTR-3B - May 2026', period: 'May 2026', generated: '2026-05-20', actions: 'Download' },
        { name: 'GST Payment - May 2026', period: 'May 2026', generated: '2026-05-21', actions: 'Download' },
    ],
    compliance: [
        { requirement: 'GST Registration', status: 'Active', dueDate: 'N/A', actions: 'Verified' },
        { requirement: 'GSTR-1 Filing (Jun 2026)', status: 'Pending', dueDate: '2026-07-11', actions: 'File Now' },
        { requirement: 'GSTR-3B Filing (Jun 2026)', status: 'Pending', dueDate: '2026-07-20', actions: 'File Now' },
        { requirement: 'GST Payment (Jun 2026)', status: 'Due', dueDate: '2026-07-20', actions: 'Pay Now' },
    ],
    returns: [
        { type: 'GSTR-1', period: 'Jun 2026', dueDate: '2026-07-11', status: 'Pending' },
        { type: 'GSTR-3B', period: 'May 2026', dueDate: '2026-06-20', status: 'Filed' },
        { type: 'GSTR-1', period: 'May 2026', dueDate: '2026-06-11', status: 'Filed' },
        { type: 'GSTR-3B', period: 'Apr 2026', dueDate: '2026-05-20', status: 'Filed' },
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
        'Draft': 'badge-draft',
        'Filed': 'badge-filed',
        'Due': 'badge-due',
        'Overdue': 'badge-overdue'
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
        summary: document.getElementById('panel-summary'),
        reports: document.getElementById('panel-reports'),
        compliance: document.getElementById('panel-compliance'),
        returns: document.getElementById('panel-returns')
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

    // Monthly GST Summary
    const ctx1 = document.getElementById('chartGstSummary');
    if (ctx1) {
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [
                    {
                        label: 'Output GST',
                        data: [42, 38, 45, 52, 48, 58],
                        backgroundColor: slate,
                        borderRadius: 6,
                        maxBarThickness: 28
                    },
                    {
                        label: 'Input GST',
                        data: [25, 22, 28, 31, 29, 35],
                        backgroundColor: lavender,
                        borderRadius: 6,
                        maxBarThickness: 28
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

    // GST Breakdown
    const ctx2 = document.getElementById('chartGstBreakdown');
    if (ctx2) {
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['CGST', 'SGST', 'IGST'],
                datasets: [{
                    data: [85, 85, 70],
                    backgroundColor: [navy, slate, lavender],
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

function renderSummary() {
    const tbody = document.getElementById('summaryTbody');
    if (!tbody) return;
    tbody.innerHTML = GST_DATA.summary.map(row => `
        <tr>
            <td><span class="font-medium">${row.month}</span></td>
            <td>${formatCurrency(row.output)}</td>
            <td>${formatCurrency(row.input)}</td>
            <td>${formatCurrency(row.net)}</td>
            <td>${formatCurrency(row.paid)}</td>
            <td class="${row.balance > 0 ? 'text-red-600 font-semibold' : 'text-emerald-600'}">${formatCurrency(row.balance)}</td>
        </tr>
    `).join('');
}

function renderReports() {
    const tbody = document.getElementById('reportTbody');
    if (!tbody) return;
    tbody.innerHTML = GST_DATA.reports.map(row => `
        <tr>
            <td><span class="font-medium">${row.name}</span></td>
            <td>${row.period}</td>
            <td>${row.generated}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="downloadReport('${row.name}')" title="Download"><i class="fas fa-download"></i></button>
                    <button class="btn-icon" onclick="viewReport('${row.name}')" title="View"><i class="fas fa-eye"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderCompliance() {
    const tbody = document.getElementById('complianceTbody');
    if (!tbody) return;
    tbody.innerHTML = GST_DATA.compliance.map(row => `
        <tr>
            <td><span class="font-medium">${row.requirement}</span></td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>${row.dueDate}</td>
            <td>
                <div class="flex items-center gap-1">
                    <button class="btn-icon" onclick="handleCompliance('${row.requirement}')" title="Take Action"><i class="fas fa-arrow-right"></i></button>
                    <button class="btn-icon" title="Details"><i class="fas fa-info-circle"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

function renderReturns() {
    const tbody = document.getElementById('returnsTbody');
    if (!tbody) return;
    tbody.innerHTML = GST_DATA.returns.map(row => `
        <tr>
            <td><span class="font-medium">${row.type}</span></td>
            <td>${row.period}</td>
            <td>${row.dueDate}</td>
            <td><span class="badge ${getStatusBadge(row.status)}">${row.status}</span></td>
            <td>
                <div class="flex items-center gap-1">
                    ${row.status === 'Pending' ? `<button class="btn-icon" onclick="fileReturn('${row.type}', '${row.period}')" title="File Now"><i class="fas fa-file-upload text-emerald-600"></i></button>` : ''}
                    <button class="btn-icon" onclick="viewReturn('${row.type}', '${row.period}')" title="View"><i class="fas fa-eye"></i></button>
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
// COMPLIANCE ACTIONS
// =====================================================

function handleCompliance(requirement) {
    showToast(`Action initiated for: ${requirement}`, 'info');
}

// =====================================================
// RETURN MODAL
// =====================================================

function initReturnModal() {
    document.getElementById('btnFileReturn')?.addEventListener('click', () => {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        document.getElementById('returnPeriod').value = `${year}-${month}`;
        document.getElementById('returnRef').value = '';
        openModal('modalReturn');
    });

    document.getElementById('btnSubmitReturn')?.addEventListener('click', function() {
        const type = document.getElementById('returnType').value;
        const period = document.getElementById('returnPeriod').value;
        const ref = document.getElementById('returnRef').value;
        
        if (!ref) {
            showToast('Please enter payment reference', 'error');
            return;
        }
        
        // Add to returns
        const [year, month] = period.split('-');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const periodDisplay = `${monthNames[parseInt(month) - 1]} ${year}`;
        
        GST_DATA.returns.unshift({
            type: type,
            period: periodDisplay,
            dueDate: '2026-07-20',
            status: 'Pending'
        });
        
        renderReturns();
        showToast(`${type} filed successfully for ${periodDisplay}`, 'success');
        closeModal('modalReturn');
    });
}

function fileReturn(type, period) {
    document.getElementById('returnType').value = type;
    const [month, year] = period.split(' ');
    const monthMap = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06','Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};
    document.getElementById('returnPeriod').value = `${year}-${monthMap[month]}`;
    document.getElementById('returnRef').value = '';
    openModal('modalReturn');
}

function viewReturn(type, period) {
    showToast(`Viewing ${type} return for ${period}`, 'info');
}

// =====================================================
// FILTER FUNCTIONALITY
// =====================================================

function initFilters() {
    // Summary date filters
    const from = document.getElementById('sumDateFrom');
    const to = document.getElementById('sumDateTo');
    
    [from, to].forEach(el => {
        el?.addEventListener('change', function() {
            const fromVal = from?.value || '';
            const toVal = to?.value || '';
            const rows = document.querySelectorAll('#summaryTbody tr');
            rows.forEach(row => {
                const month = row.children[0]?.textContent || '';
                // Simple filter - just show/hide based on month range
                let show = true;
                // In real implementation, parse dates properly
                if (fromVal && month < fromVal) show = false;
                if (toVal && month > toVal) show = false;
                row.style.display = show ? '' : 'none';
            });
        });
    });
    
    // Type filter
    const typeFilter = document.getElementById('sumType');
    typeFilter?.addEventListener('change', function() {
        // This would filter by GST type in a real implementation
        showToast(`Filtering by: ${this.value}`, 'info');
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
    
    renderSummary();
    renderReports();
    renderCompliance();
    renderReturns();
    
    initModals();
    initReportModal();
    initReturnModal();
    initFilters();
    initExportButtons();

    console.log('✅ GST Management module initialized');
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
window.handleCompliance = handleCompliance;
window.fileReturn = fileReturn;
window.viewReturn = viewReturn;
window.formatCurrency = formatCurrency;
window.showToast = showToast;
window.closeModal = closeModal;
window.openModal = openModal;