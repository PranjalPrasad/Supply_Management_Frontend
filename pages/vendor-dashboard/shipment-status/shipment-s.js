/* ============================================
   SHIPMENT STATUS — JS
   ============================================ */

'use strict';

// ---- Sample Data ----
let shipments = [
  {
    id: 'SHP-1041',
    vehicle: 'MH-12-AB-4521',
    driver: 'Rajesh Kumar',
    dispatch: '2025-06-10',
    expected: '2025-06-12',
    destination: 'Warehouse B, Pune',
    items: 142,
    status: 'Delivered'
  },
  {
    id: 'SHP-1042',
    vehicle: 'MH-14-CD-7892',
    driver: 'Suresh Patil',
    dispatch: '2025-06-11',
    expected: '2025-06-14',
    destination: 'Warehouse A, Mumbai',
    items: 85,
    status: 'Delayed'
  },
  {
    id: 'SHP-1043',
    vehicle: 'GJ-01-EF-1234',
    driver: 'Arvind Shah',
    dispatch: '2025-06-12',
    expected: '2025-06-15',
    destination: 'Depot C, Ahmedabad',
    items: 60,
    status: 'In Transit'
  },
  {
    id: 'SHP-1044',
    vehicle: 'KA-09-GH-5678',
    driver: 'Manjunath Rao',
    dispatch: '2025-06-13',
    expected: '2025-06-17',
    destination: 'Hub D, Bangalore',
    items: 210,
    status: 'In Transit'
  },
  {
    id: 'SHP-1045',
    vehicle: 'TN-22-IJ-9012',
    driver: 'Venkat Raman',
    dispatch: '2025-06-14',
    expected: '2025-06-18',
    destination: 'Store E, Chennai',
    items: 38,
    status: 'Ready for Dispatch'
  },
  {
    id: 'SHP-1046',
    vehicle: 'UP-16-KL-3456',
    driver: 'Ramesh Sharma',
    dispatch: '2025-06-09',
    expected: '2025-06-11',
    destination: 'Warehouse F, Lucknow',
    items: 175,
    status: 'Delivered'
  },
  {
    id: 'SHP-1047',
    vehicle: 'DL-05-MN-7890',
    driver: 'Pradeep Singh',
    dispatch: '2025-06-15',
    expected: '2025-06-17',
    destination: 'Hub G, Delhi',
    items: 92,
    status: 'Ready for Dispatch'
  },
  {
    id: 'SHP-1048',
    vehicle: 'RJ-14-OP-2345',
    driver: 'Mahesh Gupta',
    dispatch: '2025-06-08',
    expected: '2025-06-10',
    destination: 'Depot H, Jaipur',
    items: 130,
    status: 'Delivered'
  }
];

// Active shipment for modal
let activeShipmentId = null;

// ---- Status Config ----
const statusConfig = {
  'Ready for Dispatch': { badge: 'badge-ready',     icon: 'fa-box',           label: 'Ready for Dispatch' },
  'In Transit':         { badge: 'badge-transit',    icon: 'fa-truck',          label: 'In Transit' },
  'Delivered':          { badge: 'badge-delivered',  icon: 'fa-circle-check',   label: 'Delivered' },
  'Delayed':            { badge: 'badge-delayed',    icon: 'fa-triangle-exclamation', label: 'Delayed' }
};

// ---- Render Table ----
function renderTable(data) {
  const tbody = document.getElementById('shipmentTableBody');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('recordCount');

  tbody.innerHTML = '';

  if (!data.length) {
    empty.classList.remove('hidden');
    empty.style.display = 'flex';
    count.textContent = 'No records found';
    return;
  }

  empty.classList.add('hidden');
  empty.style.display = '';
  count.textContent = `Showing ${data.length} record${data.length !== 1 ? 's' : ''}`;

  data.forEach(s => {
    const cfg = statusConfig[s.status] || statusConfig['Ready for Dispatch'];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="px-4 py-3 font-semibold text-[#111844]">${s.id}</td>
      <td class="px-4 py-3 text-[#4B5694]">${s.vehicle}</td>
      <td class="px-4 py-3 text-[#7288AE]">${formatDate(s.dispatch)}</td>
      <td class="px-4 py-3 text-[#7288AE]">${formatDate(s.expected)}</td>
      <td class="px-4 py-3 text-[#111844]">${s.destination}</td>
      <td class="px-4 py-3 text-[#4B5694] font-medium">${s.items}</td>
      <td class="px-4 py-3">
        <span class="badge ${cfg.badge}">
          <i class="fas ${cfg.icon}"></i>${cfg.label}
        </span>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center justify-center gap-1">
          <button class="action-btn action-btn-view" title="View Details" data-id="${s.id}" data-action="view">
            <i class="fas fa-eye pointer-events-none"></i>
          </button>
          <button class="action-btn action-btn-edit" title="Edit Shipment" data-id="${s.id}" data-action="edit">
            <i class="fas fa-pen pointer-events-none"></i>
          </button>
          <button class="action-btn action-btn-delete" title="Delete Shipment" data-id="${s.id}" data-action="delete">
            <i class="fas fa-trash-alt pointer-events-none"></i>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- Filters ----
function getFilteredData() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const status = document.getElementById('statusFilter').value;
  const date   = document.getElementById('dateFilter').value;

  return shipments.filter(s => {
    const matchSearch = !search ||
      s.id.toLowerCase().includes(search) ||
      s.vehicle.toLowerCase().includes(search) ||
      s.destination.toLowerCase().includes(search) ||
      s.driver.toLowerCase().includes(search);
    const matchStatus = !status || s.status === status;
    const matchDate   = !date || s.dispatch === date;
    return matchSearch && matchStatus && matchDate;
  });
}

function applyFilters() {
  renderTable(getFilteredData());
}

// ---- Detail Modal ----
function openDetailModal(id) {
  const s = shipments.find(x => x.id === id);
  if (!s) return;
  activeShipmentId = id;

  const cfg = statusConfig[s.status];
  document.getElementById('modalShipmentNo').textContent = s.id;
  document.getElementById('dShipmentNo').textContent = s.id;
  document.getElementById('dVehicle').textContent = s.vehicle;
  document.getElementById('dDispatch').textContent = formatDate(s.dispatch);
  document.getElementById('dExpected').textContent = formatDate(s.expected);
  document.getElementById('dDestination').textContent = s.destination;
  document.getElementById('dDriver').textContent = s.driver;
  document.getElementById('dItems').textContent = s.items;
  document.getElementById('dStatus').innerHTML = `<span class="badge ${cfg.badge}"><i class="fas ${cfg.icon}"></i>${cfg.label}</span>`;
  document.getElementById('updateStatusSelect').value = '';

  // Build timeline
  buildTimeline(s.status);

  document.getElementById('detailModal').classList.remove('hidden');
}

function buildTimeline(currentStatus) {
  const steps = [
    { key: 'Ready for Dispatch', label: 'Ready for Dispatch', sub: 'Shipment packed & ready',        icon: 'fa-box' },
    { key: 'In Transit',         label: 'In Transit',         sub: 'Vehicle dispatched',              icon: 'fa-truck' },
    { key: 'Delivered',          label: 'Delivered',          sub: 'Shipment received at destination',icon: 'fa-circle-check' }
  ];

  const order = ['Ready for Dispatch', 'In Transit', 'Delivered', 'Delayed'];
  const currentIdx = order.indexOf(currentStatus);

  const container = document.getElementById('modalTimeline');
  container.innerHTML = '';

  // Handle Delayed separately
  if (currentStatus === 'Delayed') {
    const delayedDiv = `
      <div class="timeline-item">
        <div class="timeline-dot" style="background:#fee2e2;color:#b91c1c"><i class="fas fa-triangle-exclamation"></i></div>
        <div>
          <div class="timeline-title">Delayed</div>
          <div class="timeline-sub">Shipment is experiencing delays</div>
        </div>
      </div>`;
    container.innerHTML = `
      <div class="timeline-item">
        <div class="timeline-dot timeline-dot-done"><i class="fas fa-box"></i></div>
        <div><div class="timeline-title">Ready for Dispatch</div><div class="timeline-sub">Shipment packed & ready</div></div>
      </div>
      ${delayedDiv}`;
    return;
  }

  steps.forEach((step, i) => {
    const stepOrder = ['Ready for Dispatch', 'In Transit', 'Delivered'];
    const stepIdx = stepOrder.indexOf(step.key);
    const curStepIdx = stepOrder.indexOf(currentStatus);

    let dotClass = 'timeline-dot-pending';
    if (stepIdx < curStepIdx) dotClass = 'timeline-dot-done';
    else if (stepIdx === curStepIdx) dotClass = 'timeline-dot-active';

    container.innerHTML += `
      <div class="timeline-item">
        <div class="timeline-dot ${dotClass}"><i class="fas ${step.icon}"></i></div>
        <div>
          <div class="timeline-title">${step.label}</div>
          <div class="timeline-sub">${step.sub}</div>
        </div>
      </div>`;
  });
}

// ---- Update Status ----
function applyStatusUpdate() {
  const newStatus = document.getElementById('updateStatusSelect').value;
  if (!newStatus || !activeShipmentId) {
    showToast('Please select a status to apply.', 'error');
    return;
  }
  const idx = shipments.findIndex(s => s.id === activeShipmentId);
  if (idx === -1) return;

  shipments[idx].status = newStatus;
  closeDetailModal();
  applyFilters();
  showToast(`${activeShipmentId} status updated to "${newStatus}"`, 'success');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.add('hidden');
  activeShipmentId = null;
}

// ---- Add Shipment Modal ----
function openAddModal() {
  document.getElementById('addModal').classList.remove('hidden');
  // Set today as default dispatch date
  document.getElementById('fDispatch').value = new Date().toISOString().split('T')[0];
}

function closeAddModal() {
  document.getElementById('addModal').classList.add('hidden');
  clearAddForm();
}

function clearAddForm() {
  ['fVehicle','fDriver','fDispatch','fExpected','fDestination','fItems'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('fStatus').value = 'Ready for Dispatch';
}

function saveShipment() {
  const vehicle     = document.getElementById('fVehicle').value.trim();
  const driver      = document.getElementById('fDriver').value.trim();
  const dispatch    = document.getElementById('fDispatch').value;
  const expected    = document.getElementById('fExpected').value;
  const destination = document.getElementById('fDestination').value.trim();
  const items       = parseInt(document.getElementById('fItems').value);
  const status      = document.getElementById('fStatus').value;

  if (!vehicle || !driver || !dispatch || !expected || !destination || !items) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }
  if (expected < dispatch) {
    showToast('Expected delivery must be after dispatch date.', 'error');
    return;
  }

  const newId = 'SHP-' + (1049 + shipments.length);
  shipments.unshift({ id: newId, vehicle, driver, dispatch, expected, destination, items, status });

  closeAddModal();
  applyFilters();
  showToast(`Shipment ${newId} added successfully!`, 'success');
}

// ---- Delete ----
function deleteShipment(id) {
  if (!confirm(`Delete shipment ${id}? This action cannot be undone.`)) return;
  shipments = shipments.filter(s => s.id !== id);
  applyFilters();
  showToast(`Shipment ${id} deleted.`, 'info');
}

// ---- Toast ----
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ---- Helpers ----
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ---- Sidebar ----
let isCollapsed = false;
const sidebar      = document.getElementById('sidebar');
const mainWrapper  = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay      = document.getElementById('sidebar-overlay');

function updateChevron() {
  const icon = sidebarToggle?.querySelector('i');
  if (!icon) return;
  if (window.innerWidth < 1024) {
    icon.className = 'fas fa-chevron-left text-sm';
  } else {
    icon.className = isCollapsed ? 'fas fa-chevron-right text-sm' : 'fas fa-chevron-left text-sm';
  }
}

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay?.classList.toggle('hidden');
  } else {
    isCollapsed = !isCollapsed;
    sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
    mainWrapper.style.marginLeft = isCollapsed ? '68px' : '';
  }
  updateChevron();
});

document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
  sidebar.classList.add('sidebar-open');
  overlay?.classList.remove('hidden');
});

overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
  updateChevron();
});

window.addEventListener('resize', () => {
  updateChevron();
  if (window.innerWidth >= 1024) {
    sidebar?.classList.remove('sidebar-open');
    overlay?.classList.add('hidden');
  }
});

// ---- Sidebar Dropdowns ----
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function(e) {
    e.stopPropagation();
    const items   = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (items) {
      items.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});

// Auto-open Sales & Dispatch dropdown since Shipment Tracking is active
document.querySelectorAll('.nav-group').forEach(group => {
  const activeChild = group.querySelector('.nav-active');
  if (activeChild) {
    const items   = group.querySelector('.nav-group-items');
    const chevron = group.querySelector('.fa-chevron-down');
    if (items) {
      items.classList.remove('hidden');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  }
});

// ---- Header Dropdowns ----
const userBtn  = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');
const notifBtn = document.getElementById('notif-btn');
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
  if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target)) userMenu?.classList.add('hidden');
  if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ---- Table Action Delegation ----
document.getElementById('shipmentTableBody').addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;
  const id     = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === 'view')   openDetailModal(id);
  if (action === 'delete') deleteShipment(id);
  if (action === 'edit')   { openDetailModal(id); } // reuse detail modal for quick status edit
});

// ---- Bind Filter & Button Events ----
document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('statusFilter').addEventListener('change', applyFilters);
document.getElementById('dateFilter').addEventListener('change', applyFilters);
document.getElementById('clearFiltersBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('statusFilter').value = '';
  document.getElementById('dateFilter').value = '';
  applyFilters();
});

document.getElementById('addShipmentBtn').addEventListener('click', openAddModal);
document.getElementById('closeAddModalBtn').addEventListener('click', closeAddModal);
document.getElementById('cancelAddBtn').addEventListener('click', closeAddModal);
document.getElementById('saveShipmentBtn').addEventListener('click', saveShipment);

document.getElementById('closeModalBtn').addEventListener('click', closeDetailModal);
document.getElementById('applyStatusBtn').addEventListener('click', applyStatusUpdate);

// Close modals on backdrop click
document.getElementById('detailModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeDetailModal();
});
document.getElementById('addModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeAddModal();
});

// ---- Init ----
updateChevron();
renderTable(shipments);