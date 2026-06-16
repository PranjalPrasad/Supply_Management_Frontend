/* ============================================================
   shipmenttracking.js
   Handles sidebar, table rendering, modals, filters, pagination
   ============================================================ */

// ---- SAMPLE DATA ----
const SHIPMENTS = [
  {
    id: 1,
    shipmentNo: 'SHP-1001', trackingNo: 'TRK-BD-20240601-001', challanNo: 'DC-2041',
    customer: 'Ramesh Traders', courier: 'BlueDart',
    dispatchDate: '2024-06-01', expectedDelivery: '2024-06-04', actualDelivery: '2024-06-04',
    shippingMethod: 'Air Express', status: 'Delivered',
    address: 'Plot 45, MIDC, Pune – 411019\nContact: +91 98765 43210',
    products: [
      { name: 'Steel Pipes (25mm)', qty: 50, unit: 'nos' },
      { name: 'Industrial Bearings', qty: 20, unit: 'nos' }
    ],
    timeline: [
      { time: '10:00 AM · 01 Jun', label: 'Shipment Created', desc: 'Challan DC-2041 generated', state: 'done' },
      { time: '12:30 PM · 01 Jun', label: 'Picked Up',        desc: 'Picked up by BlueDart',   state: 'done' },
      { time: '06:00 PM · 02 Jun', label: 'In Transit',        desc: 'En route to Mumbai Hub',  state: 'done' },
      { time: '09:15 AM · 04 Jun', label: 'Out For Delivery',  desc: 'On vehicle for final mile',state: 'done' },
      { time: '02:10 PM · 04 Jun', label: 'Delivered',         desc: 'Received by Suresh Kumar', state: 'done' }
    ],
    delivery: { date: '04 Jun 2024', time: '02:10 PM', receiver: 'Suresh Kumar', contact: '+91 98765 43210', status: 'Delivered Successfully' },
    exceptions: []
  },
  {
    id: 2,
    shipmentNo: 'SHP-1002', trackingNo: 'TRK-DT-20240602-012', challanNo: 'DC-2042',
    customer: 'Shah Industries', courier: 'DTDC',
    dispatchDate: '2024-06-02', expectedDelivery: '2024-06-05', actualDelivery: null,
    shippingMethod: 'Surface', status: 'In Transit',
    address: '12, Industrial Area, Nashik – 422007\nContact: +91 94321 00009',
    products: [
      { name: 'Hydraulic Hoses', qty: 10, unit: 'rolls' }
    ],
    timeline: [
      { time: '09:00 AM · 02 Jun', label: 'Shipment Created', desc: 'Challan DC-2042 generated',  state: 'done' },
      { time: '11:00 AM · 02 Jun', label: 'Picked Up',        desc: 'Picked up by DTDC agent',    state: 'done' },
      { time: '07:00 PM · 03 Jun', label: 'In Transit',        desc: 'At Nashik transit hub',      state: 'active' },
      { time: '—',                  label: 'Out For Delivery',  desc: 'Awaiting dispatch',          state: 'pending' },
      { time: '—',                  label: 'Delivered',         desc: 'Pending',                    state: 'pending' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Pending' },
    exceptions: []
  },
  {
    id: 3,
    shipmentNo: 'SHP-1003', trackingNo: 'TRK-DL-20240602-033', challanNo: 'DC-2043',
    customer: 'Mehta Exports', courier: 'Delhivery',
    dispatchDate: '2024-06-02', expectedDelivery: '2024-06-05', actualDelivery: null,
    shippingMethod: 'Surface', status: 'Delayed',
    address: '7A, Export Zone, Surat – 395003\nContact: +91 90000 12345',
    products: [
      { name: 'Packaging Cartons (L)', qty: 200, unit: 'nos' },
      { name: 'Safety Gloves (XL)',    qty: 50,  unit: 'pairs' }
    ],
    timeline: [
      { time: '08:00 AM · 02 Jun', label: 'Shipment Created', desc: 'Challan DC-2043 generated',        state: 'done' },
      { time: '10:30 AM · 02 Jun', label: 'Picked Up',        desc: 'Picked up by Delhivery',          state: 'done' },
      { time: '02:00 PM · 03 Jun', label: 'In Transit',        desc: 'Stuck at Surat checkpoint',       state: 'active' },
      { time: '—',                  label: 'Out For Delivery',  desc: 'Expected delay of 2 days',       state: 'pending' },
      { time: '—',                  label: 'Delivered',         desc: 'Pending',                         state: 'pending' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Pending' },
    exceptions: [
      { type: 'Transport Delay', detail: 'Held at Surat checkpoint due to vehicle inspection.', status: 'Open' }
    ]
  },
  {
    id: 4,
    shipmentNo: 'SHP-1004', trackingNo: 'TRK-OV-20240603-004', challanNo: 'DC-2044',
    customer: 'Patel & Co.', courier: 'Own Vehicle',
    dispatchDate: '2024-06-03', expectedDelivery: '2024-06-03', actualDelivery: null,
    shippingMethod: 'Own Vehicle', status: 'Out For Delivery',
    address: 'Plot 9, Phase II, Aurangabad – 431005\nContact: +91 88888 77777',
    products: [
      { name: 'Motor Coupling Set', qty: 5, unit: 'sets' }
    ],
    timeline: [
      { time: '07:30 AM · 03 Jun', label: 'Shipment Created', desc: 'Challan DC-2044 generated',    state: 'done' },
      { time: '08:00 AM · 03 Jun', label: 'Picked Up',        desc: 'Loaded on own vehicle',        state: 'done' },
      { time: '11:00 AM · 03 Jun', label: 'In Transit',        desc: 'Departed from Pune warehouse', state: 'done' },
      { time: '02:00 PM · 03 Jun', label: 'Out For Delivery',  desc: 'Near destination',             state: 'active' },
      { time: '—',                  label: 'Delivered',         desc: 'Pending',                      state: 'pending' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Pending' },
    exceptions: []
  },
  {
    id: 5,
    shipmentNo: 'SHP-1005', trackingNo: 'TRK-EE-20240601-009', challanNo: 'DC-2040',
    customer: 'Gupta Traders', courier: 'Ecom Express',
    dispatchDate: '2024-06-01', expectedDelivery: '2024-06-03', actualDelivery: null,
    shippingMethod: 'Air Economy', status: 'Returned',
    address: '22, Market Road, Nagpur – 440001\nContact: +91 77777 55555',
    products: [
      { name: 'Conveyor Belt Roll', qty: 2, unit: 'nos' }
    ],
    timeline: [
      { time: '09:00 AM · 01 Jun', label: 'Shipment Created', desc: 'Challan DC-2040 generated',     state: 'done' },
      { time: '11:00 AM · 01 Jun', label: 'Picked Up',        desc: 'Picked up by Ecom Express',     state: 'done' },
      { time: '05:00 PM · 02 Jun', label: 'In Transit',        desc: 'En route to Nagpur',            state: 'done' },
      { time: '10:00 AM · 03 Jun', label: 'Out For Delivery',  desc: 'Delivery attempted',            state: 'done' },
      { time: '11:30 AM · 03 Jun', label: 'Delivery Failed',   desc: 'Customer not available',        state: 'failed' },
      { time: '08:00 AM · 04 Jun', label: 'Returned',          desc: 'Shipment returned to warehouse',state: 'done' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Delivery Failed' },
    exceptions: [
      { type: 'Customer Not Available', detail: 'Delivery attempted at 10:00 AM. No one present at address.', status: 'Resolved' },
      { type: 'Wrong Address',          detail: 'Secondary address provided by customer was incorrect.',       status: 'Open' }
    ]
  },
  {
    id: 6,
    shipmentNo: 'SHP-1006', trackingNo: 'TRK-BD-20240604-021', challanNo: 'DC-2045',
    customer: 'Krishna Fabricators', courier: 'BlueDart',
    dispatchDate: '2024-06-04', expectedDelivery: '2024-06-06', actualDelivery: null,
    shippingMethod: 'Air Express', status: 'Picked Up',
    address: 'GIDC, Phase IV, Ahmedabad – 382445\nContact: +91 95555 11111',
    products: [
      { name: 'Aluminium Sheets (4mm)', qty: 30, unit: 'sheets' }
    ],
    timeline: [
      { time: '09:30 AM · 04 Jun', label: 'Shipment Created', desc: 'Challan DC-2045 generated',  state: 'done' },
      { time: '11:00 AM · 04 Jun', label: 'Picked Up',        desc: 'Picked up by BlueDart',      state: 'active' },
      { time: '—',                  label: 'In Transit',        desc: 'Awaiting dispatch',          state: 'pending' },
      { time: '—',                  label: 'Out For Delivery',  desc: 'Pending',                    state: 'pending' },
      { time: '—',                  label: 'Delivered',         desc: 'Pending',                    state: 'pending' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Pending' },
    exceptions: []
  },
  {
    id: 7,
    shipmentNo: 'SHP-1007', trackingNo: 'TRK-DL-20240603-018', challanNo: 'DC-2046',
    customer: 'Joshi & Sons', courier: 'Delhivery',
    dispatchDate: '2024-06-03', expectedDelivery: '2024-06-06', actualDelivery: null,
    shippingMethod: 'Surface', status: 'Ready For Pickup',
    address: '88, Ring Road, Indore – 452001\nContact: +91 93333 22222',
    products: [
      { name: 'Industrial Tools Set', qty: 10, unit: 'sets' }
    ],
    timeline: [
      { time: '10:00 AM · 03 Jun', label: 'Shipment Created', desc: 'Challan DC-2046 generated', state: 'active' },
      { time: '—',                  label: 'Picked Up',        desc: 'Awaiting courier pickup',   state: 'pending' },
      { time: '—',                  label: 'In Transit',        desc: 'Pending',                   state: 'pending' },
      { time: '—',                  label: 'Out For Delivery',  desc: 'Pending',                   state: 'pending' },
      { time: '—',                  label: 'Delivered',         desc: 'Pending',                   state: 'pending' }
    ],
    delivery: { date: '—', time: '—', receiver: '—', contact: '—', status: 'Pending' },
    exceptions: []
  }
];

// ---- STATE ----
let currentPage  = 1;
const PAGE_SIZE  = 10;
let filteredData = [...SHIPMENTS];
let currentShipment = null;

// ---- SIDEBAR ----
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
            mainWrapper.classList.add('main-expanded');
            mainWrapper.style.marginLeft = '68px';
            if (chevron) { chevron.classList.remove('fa-chevron-left'); chevron.classList.add('fa-chevron-right'); }
        } else {
            sidebar.classList.remove('sidebar-collapsed');
            mainWrapper.classList.remove('main-expanded');
            mainWrapper.style.marginLeft = '';
            if (chevron) { chevron.classList.remove('fa-chevron-right'); chevron.classList.add('fa-chevron-left'); }
        }
    }
});
overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
});

// Sidebar dropdowns
document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function (e) {
        e.stopPropagation();
        const groupItems = this.nextElementSibling;
        const chevron    = this.querySelector('.fa-chevron-down');
        if (!groupItems) return;
        groupItems.classList.toggle('hidden');
        if (chevron) chevron.style.transform = groupItems.classList.contains('hidden') ? '' : 'rotate(180deg)';
    });
});

// ---- TOPBAR MENUS ----
const userBtn   = document.getElementById('user-menu-btn');
const userMenu  = document.getElementById('user-menu');
const notifBtn  = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click',  e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click',  e => {
    if (!userBtn?.contains(e.target)  && !userMenu?.contains(e.target))  userMenu?.classList.add('hidden');
    if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ---- STATUS CONFIG ----
const STATUS_MAP = {
    'Ready For Pickup':  { cls: 'ready',     icon: 'fa-box' },
    'Picked Up':         { cls: 'picked',    icon: 'fa-hand-holding-box' },
    'In Transit':        { cls: 'transit',   icon: 'fa-truck' },
    'Out For Delivery':  { cls: 'out',       icon: 'fa-motorcycle' },
    'Delivered':         { cls: 'delivered', icon: 'fa-circle-check' },
    'Delayed':           { cls: 'delayed',   icon: 'fa-clock' },
    'Returned':          { cls: 'returned',  icon: 'fa-rotate-left' },
    'Shipment Created':  { cls: 'created',   icon: 'fa-box-open' },
    'Arrived At Hub':    { cls: 'hub',       icon: 'fa-warehouse' },
    'Failed Delivery':   { cls: 'failed',    icon: 'fa-circle-xmark' },
};

function statusBadge(status) {
    const cfg = STATUS_MAP[status] || { cls: 'created', icon: 'fa-circle' };
    return `<span class="status-badge ${cfg.cls}"><i class="fas ${cfg.icon}"></i>${status}</span>`;
}

// ---- TABLE RENDER ----
function renderTable() {
    const tbody = document.getElementById('shipment-tbody');
    const empty = document.getElementById('empty-state');
    const start = (currentPage - 1) * PAGE_SIZE;
    const slice = filteredData.slice(start, start + PAGE_SIZE);

    if (filteredData.length === 0) {
        tbody.innerHTML = '';
        empty.classList.remove('hidden');
    } else {
        empty.classList.add('hidden');
        tbody.innerHTML = slice.map(s => `
        <tr class="text-xs">
            <td class="px-4 py-3 font-semibold text-[#111844]">${s.shipmentNo}</td>
            <td class="px-4 py-3 text-[#4B5694] font-medium">${s.trackingNo}</td>
            <td class="px-4 py-3 text-[#111844]">${s.customer}</td>
            <td class="px-4 py-3 text-[#7288AE]">${s.courier}</td>
            <td class="px-4 py-3 text-[#7288AE]">${formatDate(s.dispatchDate)}</td>
            <td class="px-4 py-3 text-[#7288AE]">${formatDate(s.expectedDelivery)}</td>
            <td class="px-4 py-3">${statusBadge(s.status)}</td>
            <td class="px-4 py-3">
                <div class="flex items-center gap-1.5">
                    <button class="tbl-btn tbl-btn-view" onclick="openDetail(${s.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="tbl-btn tbl-btn-update" onclick="openAddUpdateModal('${s.trackingNo}')">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
            </td>
        </tr>`).join('');
    }

    // pagination
    const total = filteredData.length;
    const pages = Math.ceil(total / PAGE_SIZE) || 1;
    const s2 = Math.min(start + PAGE_SIZE, total);
    document.getElementById('pagination-info').textContent = total
        ? `Showing ${start + 1}–${s2} of ${total}`
        : 'No results';
    document.getElementById('page-display').textContent = `${currentPage} / ${pages}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage >= pages;
}

function changePage(dir) {
    const pages = Math.ceil(filteredData.length / PAGE_SIZE) || 1;
    currentPage = Math.max(1, Math.min(currentPage + dir, pages));
    renderTable();
}

function formatDate(d) {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- FILTERS ----
function applyFilters() {
    const q       = document.getElementById('search-input').value.trim().toLowerCase();
    const status  = document.getElementById('filter-status').value;
    const courier = document.getElementById('filter-courier').value;

    filteredData = SHIPMENTS.filter(s => {
        const matchQ = !q || s.shipmentNo.toLowerCase().includes(q)
            || s.trackingNo.toLowerCase().includes(q)
            || s.customer.toLowerCase().includes(q);
        const matchS = !status  || s.status  === status;
        const matchC = !courier || s.courier === courier;
        return matchQ && matchS && matchC;
    });
    currentPage = 1;
    renderTable();
}

function resetFilters() {
    document.getElementById('search-input').value  = '';
    document.getElementById('filter-status').value  = '';
    document.getElementById('filter-courier').value = '';
    filteredData = [...SHIPMENTS];
    currentPage  = 1;
    renderTable();
}

document.getElementById('search-input')?.addEventListener('input', applyFilters);

// ---- DETAIL MODAL ----
function openDetail(id) {
    const s = SHIPMENTS.find(x => x.id === id);
    if (!s) return;
    currentShipment = s;

    document.getElementById('detail-modal-title').textContent = `Shipment Details — ${s.shipmentNo}`;
    document.getElementById('detail-modal-sub').textContent   = `${s.shipmentNo} · ${s.trackingNo}`;

    // Overview
    document.getElementById('d-shipment-no').textContent = s.shipmentNo;
    document.getElementById('d-tracking-no').textContent  = s.trackingNo;
    document.getElementById('d-challan-no').textContent   = s.challanNo;
    document.getElementById('d-customer').textContent     = s.customer;
    document.getElementById('d-courier').textContent      = s.courier;
    document.getElementById('d-status').innerHTML         = statusBadge(s.status);
    document.getElementById('d-dispatch').textContent     = formatDate(s.dispatchDate);
    document.getElementById('d-expected').textContent     = formatDate(s.expectedDelivery);
    document.getElementById('d-method').textContent       = s.shippingMethod;
    document.getElementById('d-address').innerHTML        = s.address.replace(/\n/g, '<br>');

    // Products
    document.getElementById('products-tbody').innerHTML = s.products.map((p, i) => `
    <tr class="text-xs">
        <td class="px-4 py-2.5 text-[#7288AE]">${i + 1}</td>
        <td class="px-4 py-2.5 font-medium text-[#111844]">${p.name}</td>
        <td class="px-4 py-2.5 text-[#111844]">${p.qty}</td>
        <td class="px-4 py-2.5 text-[#7288AE]">${p.unit}</td>
    </tr>`).join('');

    // Timeline
    document.getElementById('timeline-container').innerHTML = s.timeline.map(t => `
    <div class="timeline-item">
        <div class="timeline-dot ${t.state}">
            <i class="fas ${t.state === 'done' ? 'fa-check' : t.state === 'active' ? 'fa-circle-dot' : t.state === 'failed' ? 'fa-times' : 'fa-circle'}"></i>
        </div>
        <div>
            <div class="timeline-time">${t.time}</div>
            <div class="timeline-label">${t.label}</div>
            <div class="timeline-desc">${t.desc}</div>
        </div>
    </div>`).join('');

    // Delivery
    const d = s.delivery;
    document.getElementById('d-del-date').textContent        = d.date;
    document.getElementById('d-del-time').textContent        = d.time;
    document.getElementById('d-receiver').textContent        = d.receiver;
    document.getElementById('d-receiver-contact').textContent= d.contact;
    document.getElementById('d-del-status').innerHTML        = statusBadge(d.status === 'Pending' ? 'Ready For Pickup' : d.status === 'Delivered Successfully' ? 'Delivered' : d.status);

    // Exceptions
    const excCont = document.getElementById('exceptions-container');
    if (s.exceptions.length === 0) {
        excCont.innerHTML = `<div class="text-center py-8 text-[#7288AE]">
            <i class="fas fa-check-circle text-2xl text-emerald-400 mb-2"></i>
            <p class="text-sm font-medium">No exceptions recorded</p>
        </div>`;
    } else {
        excCont.innerHTML = s.exceptions.map(ex => `
        <div class="exception-card">
            <div>
                <div class="exception-type"><i class="fas fa-triangle-exclamation mr-1"></i>${ex.type}</div>
                <div class="exception-detail">${ex.detail}</div>
            </div>
            <span class="status-badge ${ex.status === 'Open' ? 'exception' : 'delivered'}">${ex.status}</span>
        </div>`).join('');
    }

    // Reset to first tab
    switchTab('overview', document.querySelector('[data-tab="overview"]'));
    document.getElementById('detail-modal').classList.remove('hidden');
}

// ---- STATUS UPDATE MODAL ----
function openAddUpdateModal(trackingNo = '') {
    document.getElementById('upd-tracking').value = trackingNo;
    document.getElementById('upd-status').value   = '';
    document.getElementById('upd-location').value = '';
    document.getElementById('upd-remarks').value  = '';
    document.getElementById('update-modal').classList.remove('hidden');
}

function saveStatusUpdate() {
    const tracking = document.getElementById('upd-tracking').value.trim();
    const status   = document.getElementById('upd-status').value;
    if (!tracking || !status) {
        showToast('Please fill Tracking Number and Status.', 'warning');
        return;
    }
    showToast(`Status updated to "${status}" for ${tracking}`, 'success');
    closeModal('update-modal');
}

// ---- CONFIRM DELIVERY ----
function showConfirmDelivery() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('cd-date').value    = today;
    document.getElementById('cd-time').value    = '';
    document.getElementById('cd-receiver').value   = '';
    document.getElementById('cd-contact').value    = '';
    document.getElementById('cd-status').value     = 'Delivered Successfully';
    closeModal('detail-modal');
    document.getElementById('confirm-delivery-modal').classList.remove('hidden');
}

function confirmDelivery() {
    const receiver = document.getElementById('cd-receiver').value.trim();
    const date     = document.getElementById('cd-date').value;
    if (!receiver || !date) {
        showToast('Please fill Delivery Date and Receiver Name.', 'warning');
        return;
    }
    showToast(`Delivery confirmed for ${currentShipment?.shipmentNo || 'shipment'}`, 'success');
    closeModal('confirm-delivery-modal');
    if (currentShipment) {
        currentShipment.status = 'Delivered';
        applyFilters();
    }
}

// ---- TABS ----
function switchTab(tabId, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${tabId}`)?.classList.remove('hidden');
    btn?.classList.add('active');
}

// ---- CLOSE MODAL ----
function closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
}
// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.classList.add('hidden');
    });
});

// ---- TOAST ----
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', warning: 'fa-triangle-exclamation', info: 'fa-circle-info' };
    toast.innerHTML = `<i class="fas ${icons[type] || 'fa-circle-info'} mr-2"></i>${msg}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}

// ---- INIT ----
renderTable();