/* =============================================
   Unit Master — units.js
   All interactivity for units.html
   ============================================= */

// ─── DATA ───────────────────────────────────────────────
let unitsData = [
    { id: 1,  code: 'PCS', name: 'Piece',       short: 'pcs', type: 'Quantity', status: 'Active',   desc: 'Single countable item',     products: 142, purchases: 389, sales: 504, createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '03 Mar 2024' },
    { id: 2,  code: 'BOX', name: 'Box',          short: 'box', type: 'Quantity', status: 'Active',   desc: 'Packaged box unit',         products: 78,  purchases: 210, sales: 190, createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '12 Jan 2024' },
    { id: 3,  code: 'CTN', name: 'Carton',       short: 'ctn', type: 'Quantity', status: 'Active',   desc: 'Master carton packaging',   products: 55,  purchases: 130, sales: 122, createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '14 Feb 2024' },
    { id: 4,  code: 'PKT', name: 'Pack',         short: 'pkt', type: 'Quantity', status: 'Active',   desc: 'Small retail pack',         products: 30,  purchases: 88,  sales: 95,  createdBy: 'Admin', createdDate: '15 Jan 2024', modifiedBy: 'Admin', modifiedDate: '15 Jan 2024' },
    { id: 5,  code: 'KG',  name: 'Kilogram',     short: 'kg',  type: 'Weight',   status: 'Active',   desc: 'Standard weight unit',      products: 64,  purchases: 280, sales: 310, createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '20 Feb 2024' },
    { id: 6,  code: 'GM',  name: 'Gram',         short: 'g',   type: 'Weight',   status: 'Active',   desc: 'Gram weight unit',          products: 12,  purchases: 45,  sales: 38,  createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '12 Jan 2024' },
    { id: 7,  code: 'TON', name: 'Tonne',        short: 'ton', type: 'Weight',   status: 'Active',   desc: 'Metric tonne (1000 kg)',    products: 8,   purchases: 22,  sales: 18,  createdBy: 'Admin', createdDate: '18 Jan 2024', modifiedBy: 'Admin', modifiedDate: '18 Jan 2024' },
    { id: 8,  code: 'MTR', name: 'Meter',        short: 'm',   type: 'Length',   status: 'Active',   desc: 'Standard length unit',      products: 27,  purchases: 96,  sales: 88,  createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '28 Jan 2024' },
    { id: 9,  code: 'CM',  name: 'Centimeter',   short: 'cm',  type: 'Length',   status: 'Active',   desc: 'Centimeter length unit',    products: 5,   purchases: 14,  sales: 10,  createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '12 Jan 2024' },
    { id: 10, code: 'MM',  name: 'Millimeter',   short: 'mm',  type: 'Length',   status: 'Inactive', desc: 'Millimeter length unit',    products: 2,   purchases: 6,   sales: 4,   createdBy: 'Admin', createdDate: '20 Jan 2024', modifiedBy: 'Admin', modifiedDate: '01 Mar 2024' },
    { id: 11, code: 'LTR', name: 'Liter',        short: 'ltr', type: 'Volume',   status: 'Active',   desc: 'Standard volume unit',      products: 19,  purchases: 68,  sales: 72,  createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '10 Feb 2024' },
    { id: 12, code: 'ML',  name: 'Milliliter',   short: 'ml',  type: 'Volume',   status: 'Active',   desc: 'Milliliter volume unit',    products: 7,   purchases: 20,  sales: 24,  createdBy: 'Admin', createdDate: '12 Jan 2024', modifiedBy: 'Admin', modifiedDate: '12 Jan 2024' },
    { id: 13, code: 'DZ',  name: 'Dozen',        short: 'dz',  type: 'Quantity', status: 'Inactive', desc: 'Set of 12 pieces',          products: 3,   purchases: 9,   sales: 7,   createdBy: 'Admin', createdDate: '25 Jan 2024', modifiedBy: 'Admin', modifiedDate: '15 Mar 2024' },
    { id: 14, code: 'SET', name: 'Set',          short: 'set', type: 'Quantity', status: 'Active',   desc: 'Grouped set of items',      products: 14,  purchases: 40,  sales: 36,  createdBy: 'Admin', createdDate: '28 Jan 2024', modifiedBy: 'Admin', modifiedDate: '28 Jan 2024' },
    { id: 15, code: 'ROL', name: 'Roll',         short: 'rol', type: 'Length',   status: 'Active',   desc: 'Roll of material',          products: 9,   purchases: 25,  sales: 22,  createdBy: 'Admin', createdDate: '02 Feb 2024', modifiedBy: 'Admin', modifiedDate: '02 Feb 2024' },
    { id: 16, code: 'SHT', name: 'Sheet',        short: 'sht', type: 'Quantity', status: 'Active',   desc: 'Flat sheet unit',           products: 11,  purchases: 35,  sales: 30,  createdBy: 'Admin', createdDate: '05 Feb 2024', modifiedBy: 'Admin', modifiedDate: '05 Feb 2024' },
    { id: 17, code: 'BDL', name: 'Bundle',       short: 'bdl', type: 'Quantity', status: 'Inactive', desc: 'Bundle of items',           products: 4,   purchases: 12,  sales: 10,  createdBy: 'Admin', createdDate: '08 Feb 2024', modifiedBy: 'Admin', modifiedDate: '20 Mar 2024' },
    { id: 18, code: 'PRS', name: 'Pair',         short: 'pr',  type: 'Quantity', status: 'Active',   desc: 'Pair of matching items',    products: 6,   purchases: 18,  sales: 20,  createdBy: 'Admin', createdDate: '10 Feb 2024', modifiedBy: 'Admin', modifiedDate: '10 Feb 2024' },
];

let conversionsData = [
    { id: 1, base: 'CTN', target: 'BOX', factor: 10 },
    { id: 2, base: 'BOX', target: 'PCS', factor: 20 },
    { id: 3, base: 'KG',  target: 'GM',  factor: 1000 },
    { id: 4, base: 'TON', target: 'KG',  factor: 1000 },
    { id: 5, base: 'LTR', target: 'ML',  factor: 1000 },
    { id: 6, base: 'MTR', target: 'CM',  factor: 100 },
];

let nextId = 19;
let nextConvId = 7;
let editingUnitId = null;

// Pagination state
const PAGE_SIZE = 8;
let currentPage = 1;

// ─── HELPERS ────────────────────────────────────────────
function today() {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function typeBadge(type) {
    const map = { Quantity: 'type-qty', Weight: 'type-wt', Length: 'type-len', Volume: 'type-vol' };
    return `<span class="type-badge ${map[type] || 'type-qty'}">${type}</span>`;
}

function statusBadge(status) {
    const cls = status === 'Active' ? 'badge-active' : 'badge-inactive';
    const icon = status === 'Active' ? 'fa-circle-check' : 'fa-pause-circle';
    return `<span class="badge ${cls}"><i class="fas ${icon} text-[9px]"></i>${status}</span>`;
}

function updateKPIs() {
    document.getElementById('kpi-total').textContent = unitsData.length;
    document.getElementById('kpi-active').textContent = unitsData.filter(u => u.status === 'Active').length;
    document.getElementById('kpi-inactive').textContent = unitsData.filter(u => u.status === 'Inactive').length;
    document.getElementById('kpi-conv').textContent = conversionsData.length;
}

// ─── TABS ────────────────────────────────────────────────
function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active-tab');
        btn.classList.add('text-[#111844]/60', 'hover:text-[#111844]', 'hover:bg-[#7288AE]/10');
    });
    document.getElementById('tab-' + tab)?.classList.remove('hidden');
    const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active-tab');
        activeBtn.classList.remove('text-[#111844]/60', 'hover:text-[#111844]', 'hover:bg-[#7288AE]/10');
    }
    if (tab === 'list') { renderTable(); updateKPIs(); }
    if (tab === 'conversion') renderConversions();
    if (tab === 'create' && !editingUnitId) resetForm();
}

// ─── TABLE ───────────────────────────────────────────────
function getFilteredData() {
    const search = document.getElementById('search-input')?.value.toLowerCase() || '';
    const filterType = document.getElementById('filter-type')?.value || '';
    const filterStatus = document.getElementById('filter-status')?.value || '';
    return unitsData.filter(u => {
        const ms = !search || u.name.toLowerCase().includes(search) || u.code.toLowerCase().includes(search);
        const mt = !filterType || u.type === filterType;
        const mst = !filterStatus || u.status === filterStatus;
        return ms && mt && mst;
    });
}

function renderTable() {
    const data = getFilteredData();
    const totalPages = Math.ceil(data.length / PAGE_SIZE) || 1;
    if (currentPage > totalPages) currentPage = 1;

    const pageData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    const tbody = document.getElementById('units-tbody');
    if (!tbody) return;

    if (!pageData.length) {
        tbody.innerHTML = `<tr><td colspan="6" class="px-4 py-8 text-center text-xs text-[#7288AE]">No units found matching your filters.</td></tr>`;
    } else {
        tbody.innerHTML = pageData.map(u => `
            <tr class="tbl-row">
                <td class="px-4 py-3">
                    <span class="font-mono font-bold text-[#111844] text-xs bg-[#111844]/8 px-2 py-0.5 rounded-md">${u.code}</span>
                </td>
                <td class="px-4 py-3 text-xs font-medium text-[#111844]">${u.name}</td>
                <td class="px-4 py-3 text-xs text-[#7288AE] hide-sm">${u.short}</td>
                <td class="px-4 py-3">${typeBadge(u.type)}</td>
                <td class="px-4 py-3">${statusBadge(u.status)}</td>
                <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                        <button onclick="viewUnit(${u.id})" class="w-7 h-7 flex items-center justify-center rounded-lg text-[#4B5694] hover:bg-[#4B5694]/10 transition-colors" title="View">
                            <i class="fas fa-eye text-xs"></i>
                        </button>
                        <button onclick="openEditUnitOverlay(${u.id})" class="w-7 h-7 flex items-center justify-center rounded-lg text-[#111844] hover:bg-[#111844]/10 transition-colors" title="Edit">
                            <i class="fas fa-pen text-xs"></i>
                        </button>
                        <button onclick="toggleStatus(${u.id})" class="w-7 h-7 flex items-center justify-center rounded-lg ${u.status === 'Active' ? 'text-amber-600 hover:bg-amber-50' : 'text-emerald-600 hover:bg-emerald-50'} transition-colors" title="${u.status === 'Active' ? 'Deactivate' : 'Activate'}">
                            <i class="fas ${u.status === 'Active' ? 'fa-ban' : 'fa-check'} text-xs"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    const start = data.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0;
    const end = Math.min(currentPage * PAGE_SIZE, data.length);
    document.getElementById('table-info').textContent = data.length
        ? `Showing ${start}–${end} of ${data.length} units`
        : 'No units found';

    renderPagination(totalPages, data.length);
}

function renderPagination(totalPages, total) {
    const container = document.getElementById('pagination-container');
    if (!container) return;
    if (total === 0) { container.innerHTML = ''; return; }

    let html = '';
    const prevDisabled = currentPage === 1 ? 'page-btn-disabled' : '';
    const nextDisabled = currentPage === totalPages ? 'page-btn-disabled' : '';

    html += `<button class="page-btn ${prevDisabled}" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left text-[10px]"></i></button>`;

    // Smart page number logic
    const pages = [];
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
        pages.push(1);
        if (currentPage > 3) pages.push('...');
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
        if (currentPage < totalPages - 2) pages.push('...');
        pages.push(totalPages);
    }

    pages.forEach(p => {
        if (p === '...') {
            html += `<span class="page-btn page-btn-disabled border-0">…</span>`;
        } else {
            const active = p === currentPage ? 'page-btn-active' : '';
            html += `<button class="page-btn ${active}" onclick="goToPage(${p})">${p}</button>`;
        }
    });

    html += `<button class="page-btn ${nextDisabled}" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right text-[10px]"></i></button>`;
    container.innerHTML = html;
}

function goToPage(page) {
    const data = getFilteredData();
    const totalPages = Math.ceil(data.length / PAGE_SIZE) || 1;
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable();
}

// ─── VIEW ────────────────────────────────────────────────
function viewUnit(id) {
    const u = unitsData.find(x => x.id === id);
    if (!u) return;
    document.getElementById('modal-title').textContent = `${u.name} (${u.code})`;
    document.getElementById('modal-fields').innerHTML = `
        <div class="detail-row"><div class="detail-row-label">Unit Code</div><div class="detail-row-value font-mono">${u.code}</div></div>
        <div class="detail-row"><div class="detail-row-label">Unit Name</div><div class="detail-row-value">${u.name}</div></div>
        <div class="detail-row"><div class="detail-row-label">Short Name</div><div class="detail-row-value">${u.short}</div></div>
        <div class="detail-row"><div class="detail-row-label">Unit Type</div><div class="detail-row-value">${typeBadge(u.type)}</div></div>
        <div class="detail-row col-span-2"><div class="detail-row-label">Status</div><div class="detail-row-value mt-1">${statusBadge(u.status)}</div></div>
        <div class="detail-row col-span-2"><div class="detail-row-label">Description</div><div class="detail-row-value font-normal text-[#7288AE]">${u.desc || '—'}</div></div>
    `;
    document.getElementById('modal-usage-content').innerHTML = `
        <div class="usage-row"><span class="usage-row-label">Products using this unit</span><span class="usage-row-val">${u.products}</span></div>
        <div class="usage-row"><span class="usage-row-label">Purchase transactions</span><span class="usage-row-val">${u.purchases}</span></div>
        <div class="usage-row"><span class="usage-row-label">Sales transactions</span><span class="usage-row-val">${u.sales}</span></div>
        <div class="usage-row"><span class="usage-row-label">Total transactions</span><span class="usage-row-val">${u.purchases + u.sales}</span></div>
    `;
    document.getElementById('modal-log-content').innerHTML = `
        <div class="usage-row"><span class="usage-row-label">Created By</span><span class="usage-row-val">${u.createdBy}</span></div>
        <div class="usage-row"><span class="usage-row-label">Created Date</span><span class="usage-row-val">${u.createdDate}</span></div>
        <div class="usage-row"><span class="usage-row-label">Last Modified By</span><span class="usage-row-val">${u.modifiedBy}</span></div>
        <div class="usage-row"><span class="usage-row-label">Last Modified Date</span><span class="usage-row-val">${u.modifiedDate}</span></div>
    `;
    document.getElementById('modal-edit-btn').onclick = () => { closeModal(); openEditUnitOverlay(id); };
    switchModalTab('overview');
    document.getElementById('detail-modal').classList.remove('hidden');
}

// ─── TOGGLE STATUS ───────────────────────────────────────
function toggleStatus(id) {
    const u = unitsData.find(x => x.id === id);
    if (!u) return;
    u.status = u.status === 'Active' ? 'Inactive' : 'Active';
    u.modifiedDate = today();
    renderTable();
    updateKPIs();
    showToast(`${u.name} ${u.status === 'Active' ? 'activated' : 'deactivated'}`, u.status === 'Active' ? 'success' : 'info');
}

// ─── OVERLAY: ADD UNIT ───────────────────────────────────
function openAddUnitOverlay() {
    editingUnitId = null;
    document.getElementById('overlay-title').textContent = 'Add New Unit';
    document.getElementById('overlay-subtitle').textContent = 'Fill in the details below';
    document.getElementById('ov-save-label').textContent = 'Save Unit';
    document.getElementById('ov-delete-section').classList.add('hidden');
    ['ov-name','ov-code','ov-short','ov-desc'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    document.getElementById('ov-type').value = '';
    document.querySelectorAll('.ov-type-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('unit-overlay').classList.add('open');
}

function openEditUnitOverlay(id) {
    const u = unitsData.find(x => x.id === id);
    if (!u) return;
    editingUnitId = id;
    document.getElementById('overlay-title').textContent = `Edit Unit — ${u.code}`;
    document.getElementById('overlay-subtitle').textContent = 'Modify the fields and save';
    document.getElementById('ov-save-label').textContent = 'Update Unit';
    document.getElementById('ov-delete-section').classList.remove('hidden');
    document.getElementById('ov-name').value = u.name;
    document.getElementById('ov-code').value = u.code;
    document.getElementById('ov-short').value = u.short;
    document.getElementById('ov-type').value = u.type;
    document.getElementById('ov-desc').value = u.desc || '';
    // Sync type cards
    document.querySelectorAll('.ov-type-card').forEach(c => {
        c.classList.toggle('selected', c.dataset.type === u.type);
    });
    document.getElementById('ov-delete-btn').onclick = () => deleteUnit(id);
    document.getElementById('unit-overlay').classList.add('open');
}

function closeUnitOverlay() {
    document.getElementById('unit-overlay').classList.remove('open');
    editingUnitId = null;
}

function saveOverlayUnit() {
    const name  = document.getElementById('ov-name').value.trim();
    const code  = document.getElementById('ov-code').value.trim().toUpperCase();
    const short = document.getElementById('ov-short').value.trim();
    const type  = document.getElementById('ov-type').value;
    const desc  = document.getElementById('ov-desc').value.trim();

    if (!name || !code || !type) {
        showToast('Please fill required fields (Name, Code, Type)', 'error'); return;
    }

    if (editingUnitId) {
        const u = unitsData.find(x => x.id === editingUnitId);
        if (u) {
            // Check code conflict with other units
            const conflict = unitsData.find(x => x.code === code && x.id !== editingUnitId);
            if (conflict) { showToast(`Unit code "${code}" already exists`, 'error'); return; }
            u.name = name; u.code = code; u.short = short || code.toLowerCase();
            u.type = type; u.desc = desc; u.modifiedDate = today(); u.modifiedBy = 'Admin';
            showToast(`Unit "${name}" updated successfully`, 'success');
        }
    } else {
        if (unitsData.find(u => u.code === code)) { showToast(`Unit code "${code}" already exists`, 'error'); return; }
        unitsData.push({
            id: nextId++, code, name, short: short || code.toLowerCase(),
            type, status: 'Active', desc,
            products: 0, purchases: 0, sales: 0,
            createdBy: 'Admin', createdDate: today(), modifiedBy: 'Admin', modifiedDate: today(),
        });
        showToast(`Unit "${name}" created successfully`, 'success');
    }

    closeUnitOverlay();
    renderTable();
    updateKPIs();
}

function deleteUnit(id) {
    const u = unitsData.find(x => x.id === id);
    if (!u) return;
    if (!confirm(`Delete unit "${u.name} (${u.code})"? This cannot be undone.`)) return;
    unitsData = unitsData.filter(x => x.id !== id);
    closeUnitOverlay();
    renderTable();
    updateKPIs();
    showToast(`Unit "${u.name}" deleted`, 'info');
}

// ─── CREATE UNIT TAB (legacy, keep working) ──────────────
function saveUnit(keepOpen = false) {
    const name = document.getElementById('f-name').value.trim();
    const code = document.getElementById('f-code').value.trim().toUpperCase();
    const short = document.getElementById('f-short').value.trim();
    const type = document.getElementById('f-type').value;
    const desc = document.getElementById('f-desc').value.trim();
    if (!name || !code || !type) { showToast('Please fill required fields', 'error'); return; }
    if (unitsData.find(u => u.code === code)) { showToast(`Code "${code}" already exists`, 'error'); return; }
    unitsData.push({ id: nextId++, code, name, short: short || code.toLowerCase(), type, status: 'Active', desc, products: 0, purchases: 0, sales: 0, createdBy: 'Admin', createdDate: today(), modifiedBy: 'Admin', modifiedDate: today() });
    showToast(`Unit "${name}" created`, 'success');
    if (!keepOpen) { resetForm(); switchTab('list'); } else resetForm();
}
function saveAndContinue() { saveUnit(true); }
function resetForm() {
    ['f-name','f-code','f-short','f-desc'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const sel = document.getElementById('f-type'); if (sel) sel.value = '';
    editingUnitId = null;
    document.querySelectorAll('.type-ref-card').forEach(c => c.classList.remove('selected'));
}

// ─── CONVERSIONS ─────────────────────────────────────────
function renderConversions() {
    const tbody = document.getElementById('conversion-tbody');
    if (!tbody) return;
    if (!conversionsData.length) {
        tbody.innerHTML = `<tr><td colspan="4" class="px-4 py-8 text-center text-xs text-[#7288AE]">No conversions defined yet.</td></tr>`;
    } else {
        tbody.innerHTML = conversionsData.map(c => {
            const bn = unitsData.find(u => u.code === c.base)?.name || '';
            const tn = unitsData.find(u => u.code === c.target)?.name || '';
            return `<tr class="tbl-row">
                <td class="px-4 py-3"><span class="font-mono font-bold text-[#111844] text-xs bg-[#111844]/8 px-2 py-0.5 rounded-md">${c.base}</span> <span class="text-[10px] text-[#7288AE]">${bn}</span></td>
                <td class="px-4 py-3"><span class="font-mono font-bold text-[#4B5694] text-xs bg-[#4B5694]/8 px-2 py-0.5 rounded-md">${c.target}</span> <span class="text-[10px] text-[#7288AE]">${tn}</span></td>
                <td class="px-4 py-3 text-xs font-semibold text-[#111844]">× ${c.factor.toLocaleString()}</td>
                <td class="px-4 py-3"><button onclick="deleteConversion(${c.id})" class="w-7 h-7 flex items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition-colors"><i class="fas fa-trash text-xs"></i></button></td>
            </tr>`;
        }).join('');
    }
    populateConversionSelects();
    updateKPIs();
}

function populateConversionSelects() {
    const activeUnits = unitsData.filter(u => u.status === 'Active');
    ['c-base','c-target'].forEach(id => {
        const sel = document.getElementById(id); if (!sel) return;
        const cur = sel.value;
        sel.innerHTML = `<option value="">Select unit</option>` + activeUnits.map(u => `<option value="${u.code}" ${u.code === cur ? 'selected' : ''}>${u.code} — ${u.name}</option>`).join('');
    });
}

function saveConversion() {
    const base   = document.getElementById('c-base')?.value;
    const target = document.getElementById('c-target')?.value;
    const factor = parseFloat(document.getElementById('c-factor')?.value);
    if (!base || !target || !factor || isNaN(factor)) { showToast('Please fill all conversion fields', 'error'); return; }
    if (base === target) { showToast('Base and target cannot be same', 'error'); return; }
    if (conversionsData.find(c => c.base === base && c.target === target)) { showToast('Conversion already exists', 'error'); return; }
    conversionsData.push({ id: nextConvId++, base, target, factor });
    document.getElementById('c-base').value = '';
    document.getElementById('c-target').value = '';
    document.getElementById('c-factor').value = '';
    document.getElementById('c-preview').classList.add('hidden');
    renderConversions();
    showToast(`Conversion ${base} → ${target} saved`, 'success');
}

function deleteConversion(id) {
    const idx = conversionsData.findIndex(c => c.id === id);
    if (idx === -1) return;
    const c = conversionsData[idx];
    conversionsData.splice(idx, 1);
    renderConversions();
    showToast(`Conversion ${c.base} → ${c.target} deleted`, 'info');
}

function openAddConversion() {
    document.getElementById('conversion-form-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function updateConversionPreview() {
    const base   = document.getElementById('c-base')?.value;
    const target = document.getElementById('c-target')?.value;
    const factor = parseFloat(document.getElementById('c-factor')?.value);
    const preview = document.getElementById('c-preview');
    if (!preview) return;
    if (base && target && factor && !isNaN(factor)) {
        preview.textContent = `1 ${base} = ${factor.toLocaleString()} ${target}`;
        preview.classList.remove('hidden');
    } else {
        preview.classList.add('hidden');
    }
}

// ─── MODAL ───────────────────────────────────────────────
function switchModalTab(tab) {
    document.querySelectorAll('.modal-tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.classList.remove('active-modal-tab');
        btn.classList.add('text-[#111844]/50');
    });
    document.getElementById('modal-' + tab)?.classList.remove('hidden');
    const btn = document.querySelector(`[data-modal-tab="${tab}"]`);
    if (btn) { btn.classList.add('active-modal-tab'); btn.classList.remove('text-[#111844]/50'); }
}
function closeModal() { document.getElementById('detail-modal').classList.add('hidden'); }

// ─── TOAST ───────────────────────────────────────────────
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const icons = { success: 'fa-check-circle text-emerald-600', error: 'fa-times-circle text-red-500', info: 'fa-info-circle text-[#4B5694]' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} pointer-events-auto`;
    toast.innerHTML = `<i class="fas ${icons[type]} text-sm flex-shrink-0"></i><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ─── EXPORT ──────────────────────────────────────────────
function openExport() {
    const rows = ['Unit Code,Unit Name,Short Name,Type,Status'];
    unitsData.forEach(u => rows.push(`${u.code},${u.name},${u.short},${u.type},${u.status}`));
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'units_export.csv';
    a.click();
    showToast('Units exported as CSV', 'success');
}

// ─── SIDEBAR ─────────────────────────────────────────────
let isCollapsed = false;
const sidebar = document.getElementById('sidebar');
const mainWrapper = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay = document.getElementById('sidebar-overlay');
const sidebarToggleMobile = document.getElementById('sidebar-toggle-mobile');

sidebarToggle?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
        sidebar.classList.toggle('sidebar-open');
        overlay?.classList.toggle('hidden');
    } else {
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
        mainWrapper.style.marginLeft = isCollapsed ? '68px' : '260px';
        const icon = sidebarToggle.querySelector('i');
        if (icon) icon.className = isCollapsed ? 'fas fa-chevron-right text-sm' : 'fas fa-chevron-left text-sm';
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

// Nav dropdowns
document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function() {
        const items = this.nextElementSibling;
        const chevron = this.querySelector('.fa-chevron-down');
        items?.classList.toggle('hidden');
        if (chevron) chevron.style.transform = items?.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
});

// User / notif menus
const userBtn = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');
const notifBtn = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');
userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', () => { userMenu?.classList.add('hidden'); notifMenu?.classList.add('hidden'); });

// Tab buttons
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

// Filters
document.getElementById('search-input')?.addEventListener('input', () => { currentPage = 1; renderTable(); });
document.getElementById('filter-type')?.addEventListener('change', () => { currentPage = 1; renderTable(); });
document.getElementById('filter-status')?.addEventListener('change', () => { currentPage = 1; renderTable(); });

// Type ref cards (create tab)
document.querySelectorAll('.type-ref-card:not(.ov-type-card)').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.type-ref-card:not(.ov-type-card)').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const sel = document.getElementById('f-type');
        if (sel) sel.value = card.dataset.type;
    });
});

// Overlay type cards
document.querySelectorAll('.ov-type-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.ov-type-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const sel = document.getElementById('ov-type');
        if (sel) sel.value = card.dataset.type;
    });
});

// Overlay type dropdown sync
document.getElementById('ov-type')?.addEventListener('change', function() {
    document.querySelectorAll('.ov-type-card').forEach(c => {
        c.classList.toggle('selected', c.dataset.type === this.value);
    });
});

// Conversion preview
['c-base','c-target','c-factor'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', updateConversionPreview);
    document.getElementById(id)?.addEventListener('change', updateConversionPreview);
});

// Close modals on backdrop click
document.getElementById('detail-modal')?.addEventListener('click', function(e) { if (e.target === this) closeModal(); });
document.getElementById('unit-overlay')?.addEventListener('click', function(e) { if (e.target === this) closeUnitOverlay(); });

// ─── INIT ────────────────────────────────────────────────
renderTable();
updateKPIs();