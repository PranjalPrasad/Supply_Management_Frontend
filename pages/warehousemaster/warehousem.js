/* ============================================================
   warehouse.js — Warehouse Master Logic
============================================================ */

'use strict';

/* ─── Seed Data ─────────────────────────────────────────── */
let warehouses = [
    {
        id: 1, code: 'WH-001', name: 'Central Hub A', type: 'Main Warehouse',
        addr1: 'Plot 12, MIDC Industrial Area', addr2: 'Phase 2',
        city: 'Pune', state: 'Maharashtra', country: 'India', pin: '411019',
        contact: 'Rajesh Patil', mobile: '+91 98765 43210', altmobile: '',
        email: 'wh-a@supplyco.com', capacity: 8000, capunit: 'Sq. Ft',
        storage: ['Dry Storage', 'Cold Storage'],
        hours: '08:00 – 20:00', tz: 'IST (UTC+5:30)', manager: 'Anil Sharma',
        utilization: 85, status: 'Active'
    },
    {
        id: 2, code: 'WH-002', name: 'North Regional Hub', type: 'Regional Warehouse',
        addr1: 'Sector 44, Industrial Estate', addr2: '',
        city: 'Nagpur', state: 'Maharashtra', country: 'India', pin: '440018',
        contact: 'Priya Singh', mobile: '+91 87654 32109', altmobile: '+91 77654 32109',
        email: 'wh-b@supplyco.com', capacity: 5000, capunit: 'Sq. Ft',
        storage: ['Dry Storage'],
        hours: '09:00 – 18:00', tz: 'IST (UTC+5:30)', manager: 'Suresh Mehta',
        utilization: 64, status: 'Active'
    },
    {
        id: 3, code: 'WH-003', name: 'West Distribution Centre', type: 'Distribution Center',
        addr1: 'NH-48, Khopoli Industrial Zone', addr2: 'Near Toll Booth',
        city: 'Mumbai', state: 'Maharashtra', country: 'India', pin: '400703',
        contact: 'Kiran Desai', mobile: '+91 76543 21098', altmobile: '',
        email: 'wh-c@supplyco.com', capacity: 12000, capunit: 'Sq. Ft',
        storage: ['Dry Storage', 'Frozen Storage'],
        hours: '06:00 – 22:00', tz: 'IST (UTC+5:30)', manager: 'Deepa Nair',
        utilization: 58, status: 'Active'
    },
    {
        id: 4, code: 'WH-004', name: 'Transit Point South', type: 'Transit Warehouse',
        addr1: 'GST Road, Ambattur', addr2: '',
        city: 'Chennai', state: 'Tamil Nadu', country: 'India', pin: '600053',
        contact: 'Murugan K', mobile: '+91 65432 10987', altmobile: '',
        email: 'wh-d@supplyco.com', capacity: 3000, capunit: 'Sq. Ft',
        storage: ['Dry Storage'],
        hours: '09:00 – 17:00', tz: 'IST (UTC+5:30)', manager: 'Ramkumar S',
        utilization: 81, status: 'Under Maintenance'
    },
    {
        id: 5, code: 'WH-005', name: 'Returns Processing Hub', type: 'Return Warehouse',
        addr1: 'E-Block, Whitefield Industrial', addr2: 'KIADB Area',
        city: 'Bengaluru', state: 'Karnataka', country: 'India', pin: '560066',
        contact: 'Pooja Rao', mobile: '+91 54321 09876', altmobile: '',
        email: 'wh-e@supplyco.com', capacity: 2500, capunit: 'Sq. Ft',
        storage: ['Dry Storage', 'Hazardous Storage'],
        hours: '10:00 – 18:00', tz: 'IST (UTC+5:30)', manager: 'Vikram Nair',
        utilization: 42, status: 'Active'
    },
    {
        id: 6, code: 'WH-006', name: 'East Cold Chain Depot', type: 'Regional Warehouse',
        addr1: '7A Tollygunge Road', addr2: '',
        city: 'Kolkata', state: 'West Bengal', country: 'India', pin: '700046',
        contact: 'Sumit Ghosh', mobile: '+91 43210 98765', altmobile: '',
        email: 'wh-f@supplyco.com', capacity: 6000, capunit: 'Sq. Ft',
        storage: ['Cold Storage', 'Frozen Storage'],
        hours: '08:00 – 18:00', tz: 'IST (UTC+5:30)', manager: 'Ananya Das',
        utilization: 0, status: 'Inactive'
    }
];

let nextId = 7;
let editingId = null;
let viewingId = null;
let currentStep = 1;
const TOTAL_STEPS = 5;

/* ─── Pagination Variables ─────────────────────────────── */
let currentPage = 1;
const ROWS_PER_PAGE = 10;
let totalPages = 1;

/* ─── Utilities ─────────────────────────────────────────── */
function genCode() {
    return 'WH-' + String(nextId).padStart(3, '0');
}

function statusBadge(status) {
    const map = {
        'Active': 'badge-active',
        'Inactive': 'badge-inactive',
        'Under Maintenance': 'badge-maintenance',
        'Draft': 'badge-draft',
        'Operational': 'badge-operational'
    };
    const cls = map[status] || 'badge-inactive';
    return `<span class="badge ${cls}">${status}</span>`;
}

function utilBar(pct) {
    const cls = pct >= 80 ? 'util-high' : pct >= 50 ? 'util-mid' : 'util-low';
    return `<span class="util-bar-wrap"><span class="util-bar ${cls}" style="width:${pct}%"></span></span>${pct}%`;
}

function showToast(msg, type = 'success') {
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${msg}</span>`;
    document.getElementById('toast-container').appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

/* ─── KPI Update ─────────────────────────────────────────── */
function updateKPIs() {
    const total = warehouses.length;
    const active = warehouses.filter(w => w.status === 'Active').length;
    const maint  = warehouses.filter(w => w.status === 'Under Maintenance').length;
    const avgUtil = total ? Math.round(warehouses.reduce((s, w) => s + w.utilization, 0) / total) : 0;

    document.getElementById('kpi-total').textContent = total;
    document.getElementById('kpi-active').textContent = active;
    document.getElementById('kpi-maintenance').textContent = maint;
    document.getElementById('kpi-capacity').textContent = avgUtil + '%';
}

/* ─── Render Table ───────────────────────────────────────── */
function getFiltered() {
    const q      = document.getElementById('search-input').value.toLowerCase().trim();
    const status = document.getElementById('filter-status').value;
    const type   = document.getElementById('filter-type').value;

    return warehouses.filter(w => {
        const matchQ = !q || w.name.toLowerCase().includes(q) ||
                             w.code.toLowerCase().includes(q) ||
                             w.city.toLowerCase().includes(q) ||
                             w.contact.toLowerCase().includes(q);
        const matchS = !status || w.status === status;
        const matchT = !type   || w.type === type;
        return matchQ && matchS && matchT;
    });
}

function getPaginatedData(data) {
    const start = (currentPage - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return data.slice(start, end);
}

function renderTable() {
    const fullData = getFiltered();
    const displayData = getPaginatedData(fullData);
    const tbody = document.getElementById('warehouse-tbody');
    const empty = document.getElementById('empty-state');

    if (!displayData.length) {
        tbody.innerHTML = '';
        empty.classList.add('show');
        document.getElementById('pagination-info').textContent = 'No results';
        return;
    }

    empty.classList.remove('show');
    const start = (currentPage - 1) * ROWS_PER_PAGE + 1;
    const end = Math.min(currentPage * ROWS_PER_PAGE, fullData.length);
    document.getElementById('pagination-info').textContent = 
        `Showing ${start}–${end} of ${fullData.length} warehouse${fullData.length !== 1 ? 's' : ''}`;

    tbody.innerHTML = displayData.map(w => {
        const toggleBtn = w.status === 'Active'
            ? `<button class="action-btn action-btn-deact" title="Deactivate" onclick="toggleStatus(${w.id})"><i class="fas fa-toggle-on"></i></button>`
            : w.status === 'Inactive'
            ? `<button class="action-btn action-btn-act" title="Activate" onclick="toggleStatus(${w.id})"><i class="fas fa-toggle-off"></i></button>`
            : `<button class="action-btn" style="color:#7288AE;cursor:default" title="Under Maintenance"><i class="fas fa-tools"></i></button>`;

        return `
        <tr>
            <td class="px-5 py-3 font-mono text-[11px] text-[#4B5694] font-semibold">${w.code}</td>
            <td class="px-5 py-3">
                <div class="text-xs font-semibold text-[#111844]">${w.name}</div>
                <div class="text-[10px] text-[#7288AE] mt-0.5">${w.type}</div>
            </td>
            <td class="px-5 py-3 text-xs text-[#7288AE]">${w.type}</td>
            <td class="px-5 py-3 text-xs text-[#111844]">${w.city}, ${w.state}</td>
            <td class="px-5 py-3">
                <div class="text-xs text-[#111844]">${w.contact}</div>
                <div class="text-[10px] text-[#7288AE] mt-0.5">${w.mobile}</div>
            </td>
            <td class="px-5 py-3 text-xs text-[#111844]">${w.capacity.toLocaleString()} ${w.capunit}</td>
            <td class="px-5 py-3 text-xs text-[#111844]">${utilBar(w.utilization)}</td>
            <td class="px-5 py-3">${statusBadge(w.status)}</td>
            <td class="px-5 py-3">
                <div class="flex items-center gap-1">
                    <button class="action-btn action-btn-view" title="View" onclick="openViewModal(${w.id})"><i class="fas fa-eye"></i></button>
                    <button class="action-btn action-btn-edit" title="Edit" onclick="openEditModal(${w.id})"><i class="fas fa-pen"></i></button>
                    ${toggleBtn}
                </div>
            </td>
        </tr>`;
    }).join('');

    renderPagination(fullData);
}

function renderPagination(data) {
    const total = data.length;
    totalPages = Math.ceil(total / ROWS_PER_PAGE);
    if (totalPages === 0) totalPages = 1;
    
    const container = document.getElementById('pagination-container');
    if (!container) return;
    
    // Remove all except prev/next
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
    
    if (total === 0 || totalPages <= 1) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
    }
    
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
    
    function insertBeforeNext(el) {
        if (nextBtn) {
            container.insertBefore(el, nextBtn);
        } else {
            container.appendChild(el);
        }
    }
    
    let pages = [];
    if (totalPages <= 5) {
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
            span.className = 'w-7 h-7 flex items-center justify-center rounded-lg text-[#7288AE] text-xs';
            span.textContent = '…';
            span.style.pointerEvents = 'none';
            insertBeforeNext(span);
        } else {
            const btn = document.createElement('button');
            btn.className = `w-7 h-7 flex items-center justify-center rounded-lg text-xs transition-colors ${page === currentPage ? 'bg-[#111844] text-[#FAFAFA]' : 'text-[#7288AE] hover:bg-[#4B5694]/10'}`;
            btn.textContent = page;
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
    renderTable();
}

function changePage(delta) {
    goToPage(currentPage + delta);
}

/* ─── Toggle Status ──────────────────────────────────────── */
function toggleStatus(id) {
    const w = warehouses.find(x => x.id === id);
    if (!w) return;
    if (w.status === 'Active') {
        w.status = 'Inactive';
        showToast(`${w.name} deactivated`, 'info');
    } else if (w.status === 'Inactive') {
        w.status = 'Active';
        showToast(`${w.name} activated`, 'success');
    }
    renderTable();
    updateKPIs();
}
window.toggleStatus = toggleStatus;

/* ─── ADD / EDIT MODAL ───────────────────────────────────── */
function openAddModal() {
    editingId = null;
    currentStep = 1;
    document.getElementById('modal-title').textContent = 'Add Warehouse';
    document.getElementById('modal-sub').textContent = 'Fill in the details to create a new warehouse';
    clearForm();
    document.getElementById('f-code').value = genCode();
    showModal();
}

function openEditModal(id) {
    const w = warehouses.find(x => x.id === id);
    if (!w) return;
    editingId = id;
    currentStep = 1;
    document.getElementById('modal-title').textContent = 'Edit Warehouse';
    document.getElementById('modal-sub').textContent = `Editing ${w.code}`;
    populateForm(w);
    showModal();
}
window.openEditModal = openEditModal;

function showModal() {
    renderSteps();
    showStep(1);
    document.getElementById('modal-overlay').classList.remove('hidden');
}

function clearForm() {
    ['f-name','f-type','f-desc','f-addr1','f-addr2','f-city','f-state','f-pin',
     'f-contact','f-mobile','f-altmobile','f-email','f-capacity','f-capunit',
     'f-hours','f-tz','f-manager'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.querySelectorAll('.storage-chip input').forEach(cb => cb.checked = false);
    document.getElementById('f-country').value = 'India';
    document.getElementById('f-capunit').value = 'Sq. Ft';
    document.getElementById('f-tz').value = 'IST (UTC+5:30)';
}

function populateForm(w) {
    document.getElementById('f-code').value = w.code;
    document.getElementById('f-name').value = w.name;
    document.getElementById('f-type').value = w.type;
    document.getElementById('f-desc').value = w.description || '';
    document.getElementById('f-addr1').value = w.addr1;
    document.getElementById('f-addr2').value = w.addr2;
    document.getElementById('f-city').value = w.city;
    document.getElementById('f-state').value = w.state;
    document.getElementById('f-country').value = w.country;
    document.getElementById('f-pin').value = w.pin;
    document.getElementById('f-contact').value = w.contact;
    document.getElementById('f-mobile').value = w.mobile;
    document.getElementById('f-altmobile').value = w.altmobile || '';
    document.getElementById('f-email').value = w.email;
    document.getElementById('f-capacity').value = w.capacity;
    document.getElementById('f-capunit').value = w.capunit;
    document.getElementById('f-hours').value = w.hours;
    document.getElementById('f-tz').value = w.tz;
    document.getElementById('f-manager').value = w.manager;
    document.querySelectorAll('.storage-chip input').forEach(cb => {
        cb.checked = w.storage.includes(cb.value);
    });
}

function collectForm() {
    const storage = [];
    document.querySelectorAll('.storage-chip input:checked').forEach(cb => storage.push(cb.value));
    return {
        code:      document.getElementById('f-code').value,
        name:      document.getElementById('f-name').value.trim(),
        type:      document.getElementById('f-type').value,
        description: document.getElementById('f-desc').value.trim(),
        addr1:     document.getElementById('f-addr1').value.trim(),
        addr2:     document.getElementById('f-addr2').value.trim(),
        city:      document.getElementById('f-city').value.trim(),
        state:     document.getElementById('f-state').value.trim(),
        country:   document.getElementById('f-country').value.trim(),
        pin:       document.getElementById('f-pin').value.trim(),
        contact:   document.getElementById('f-contact').value.trim(),
        mobile:    document.getElementById('f-mobile').value.trim(),
        altmobile: document.getElementById('f-altmobile').value.trim(),
        email:     document.getElementById('f-email').value.trim(),
        capacity:  parseInt(document.getElementById('f-capacity').value) || 0,
        capunit:   document.getElementById('f-capunit').value,
        storage,
        hours:     document.getElementById('f-hours').value.trim(),
        tz:        document.getElementById('f-tz').value,
        manager:   document.getElementById('f-manager').value.trim(),
        utilization: 0,
        status: 'Active'
    };
}

function validateStep(step) {
    let ok = true;
    const mark = (id, valid) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle('error', !valid);
    };
    if (step === 1) {
        const name = document.getElementById('f-name').value.trim();
        const type = document.getElementById('f-type').value;
        mark('f-name', !!name);
        mark('f-type', !!type);
        ok = !!name && !!type;
    }
    if (step === 2) {
        const a1 = document.getElementById('f-addr1').value.trim();
        const city = document.getElementById('f-city').value.trim();
        const state = document.getElementById('f-state').value.trim();
        mark('f-addr1', !!a1); mark('f-city', !!city); mark('f-state', !!state);
        ok = !!a1 && !!city && !!state;
    }
    if (step === 3) {
        const c = document.getElementById('f-contact').value.trim();
        const m = document.getElementById('f-mobile').value.trim();
        mark('f-contact', !!c); mark('f-mobile', !!m);
        ok = !!c && !!m;
    }
    return ok;
}

/* ─── Step navigation ─────────────────────────────────────── */
function showStep(n) {
    for (let i = 1; i <= TOTAL_STEPS; i++) {
        document.getElementById(`step-${i}`).classList.toggle('hidden', i !== n);
    }
    renderStepPills(n);
    const prevBtn = document.getElementById('btn-prev-step');
    const nextBtn = document.getElementById('btn-next-step');
    const saveBtn = document.getElementById('btn-save');
    prevBtn.classList.toggle('hidden', n === 1);
    nextBtn.classList.toggle('hidden', n === TOTAL_STEPS);
    saveBtn.classList.toggle('hidden', n !== TOTAL_STEPS);
    currentStep = n;
}

function renderStepPills(active) {
    document.querySelectorAll('.step-pill').forEach(pill => {
        const n = parseInt(pill.dataset.step);
        pill.classList.remove('active', 'completed');
        if (n === active) pill.classList.add('active');
        else if (n < active) pill.classList.add('completed');
    });
}

function renderSteps() { renderStepPills(1); }

document.getElementById('btn-next-step').addEventListener('click', () => {
    if (!validateStep(currentStep)) {
        showToast('Please fill required fields', 'error');
        return;
    }
    if (currentStep < TOTAL_STEPS) showStep(currentStep + 1);
});

document.getElementById('btn-prev-step').addEventListener('click', () => {
    if (currentStep > 1) showStep(currentStep - 1);
});

document.getElementById('btn-save').addEventListener('click', () => {
    const data = collectForm();
    if (!data.name || !data.type) {
        showToast('Name and type are required', 'error');
        return;
    }
    if (editingId !== null) {
        const idx = warehouses.findIndex(w => w.id === editingId);
        if (idx !== -1) {
            warehouses[idx] = { ...warehouses[idx], ...data };
            showToast(`${data.name} updated successfully`);
        }
    } else {
        warehouses.push({ id: nextId, ...data });
        nextId++;
        showToast(`${data.name} created successfully`);
    }
    closeModal();
    renderTable();
    updateKPIs();
});

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
    editingId = null;
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('btn-cancel-modal').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
});

document.getElementById('btn-add').addEventListener('click', openAddModal);

/* ─── VIEW MODAL ─────────────────────────────────────────── */
function openViewModal(id) {
    const w = warehouses.find(x => x.id === id);
    if (!w) return;
    viewingId = id;

    document.getElementById('view-title').textContent = 'Warehouse Details';
    document.getElementById('view-code-sub').textContent = w.code;

    document.getElementById('vd-name').textContent = w.name;
    document.getElementById('vd-code').textContent = w.code + ' · ' + w.type;
    document.getElementById('vd-location').innerHTML = `<i class="fas fa-map-marker-alt mr-1"></i>${w.city}, ${w.state}`;
    document.getElementById('vd-manager').textContent = w.manager || '—';
    document.getElementById('vd-mobile').textContent = w.mobile || '—';
    document.getElementById('vd-type').textContent = w.type;
    document.getElementById('vd-status-badge').textContent = w.status;

    document.getElementById('vd-address').textContent = [w.addr1, w.addr2].filter(Boolean).join(', ');
    document.getElementById('vd-city').textContent = w.city;
    document.getElementById('vd-state').textContent = `${w.state}, ${w.country} – ${w.pin}`;
    document.getElementById('vd-hours').textContent = w.hours || '—';
    document.getElementById('vd-email').textContent = w.email || '—';
    document.getElementById('vd-storage').textContent = w.storage.length ? w.storage.join(', ') : '—';

    const avail = Math.round(w.capacity * (1 - w.utilization / 100));
    document.getElementById('vd-total-cap').textContent = `${w.capacity.toLocaleString()} ${w.capunit}`;
    document.getElementById('vd-avail-cap').textContent = `${avail.toLocaleString()} ${w.capunit}`;
    document.getElementById('vd-util-pct').textContent = w.utilization + '%';
    document.getElementById('vd-util-bar').style.width = w.utilization + '%';

    switchViewTab('info');
    document.getElementById('view-modal-overlay').classList.remove('hidden');
}
window.openViewModal = openViewModal;

function closeViewModal() {
    document.getElementById('view-modal-overlay').classList.add('hidden');
    viewingId = null;
}

document.getElementById('view-modal-close').addEventListener('click', closeViewModal);
document.getElementById('view-modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('view-modal-overlay')) closeViewModal();
});

function switchViewTab(tab) {
    document.querySelectorAll('.view-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.vtab === tab);
    });
    document.querySelectorAll('.vtab-panel').forEach(panel => {
        panel.classList.toggle('hidden', panel.id !== `vtab-${tab}`);
    });
}
document.querySelectorAll('.view-tab').forEach(btn => {
    btn.addEventListener('click', () => switchViewTab(btn.dataset.vtab));
});

/* ─── Filters ─────────────────────────────────────────── */
document.getElementById('search-input').addEventListener('input', function() {
    currentPage = 1;
    renderTable();
});

document.getElementById('filter-status').addEventListener('change', function() {
    currentPage = 1;
    renderTable();
});

document.getElementById('filter-type').addEventListener('change', function() {
    currentPage = 1;
    renderTable();
});

/* ─── Export ──────────────────────────────────────────── */
document.getElementById('btn-export').addEventListener('click', function() {
    try {
        const data = getFiltered();
        if (!data.length) {
            showToast('No data to export', 'error');
            return;
        }
        const headers = ['Code', 'Name', 'Type', 'City', 'State', 'Contact', 'Mobile', 'Email', 'Capacity', 'Unit', 'Utilization %', 'Status', 'Manager'];
        const rows = data.map(w => [
            w.code,
            `"${w.name}"`,
            `"${w.type}"`,
            `"${w.city}"`,
            `"${w.state}"`,
            `"${w.contact}"`,
            w.mobile,
            `"${w.email || ''}"`,
            w.capacity,
            w.capunit,
            w.utilization,
            `"${w.status}"`,
            `"${w.manager || ''}"`
        ]);
        const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `warehouses_${new Date().toISOString().slice(0,10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        showToast(`Exported ${data.length} warehouse${data.length !== 1 ? 's' : ''} successfully`, 'success');
    } catch (error) {
        console.error('Export failed:', error);
        showToast('Failed to export data', 'error');
    }
});

/* ─── Pagination Event Listeners ─────────────────────────── */
document.getElementById('btn-prev')?.addEventListener('click', function(e) {
    e.stopPropagation();
    changePage(-1);
});

document.getElementById('btn-next')?.addEventListener('click', function(e) {
    e.stopPropagation();
    changePage(1);
});

/* ─── Sidebar ─────────────────────────────────────────── */
let isCollapsed = false;
const sidebar = document.getElementById('sidebar');
const mainWrapper = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
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

overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
});

document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function () {
        const items = this.nextElementSibling;
        const chevron = this.querySelector('.fa-chevron-down');
        if (items) {
            items.classList.toggle('hidden');
            if (chevron) chevron.style.transform = items.classList.contains('hidden') ? '' : 'rotate(180deg)';
        }
    });
});

const userBtn = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');
const notifBtn = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu?.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu?.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', () => { userMenu?.classList.add('hidden'); notifMenu?.classList.add('hidden'); });

document.querySelectorAll('.step-pill').forEach(pill => {
    pill.addEventListener('click', () => {
        const n = parseInt(pill.dataset.step);
        if (n < currentStep) showStep(n); 
    });
});

/* ─── Init ────────────────────────────────────────────── */
updateKPIs();
renderTable();