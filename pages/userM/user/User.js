/* ============================================================
   User Management — User.js
   ============================================================ */

'use strict';

/* ---- Sample Data ---- */
let users = [
  { id: 1, empId: 'EMP-1001', fname: 'Rahul',    lname: 'Sharma',    email: 'rahul.sharma@supplyco.in',   dept: 'Administration', role: 'Admin',           status: 'Active',   phone: '+91 98001 11001', lastLogin: '17 Jun 2025, 09:14 AM', online: true  },
  { id: 2, empId: 'EMP-1002', fname: 'Priya',    lname: 'Iyer',      email: 'priya.iyer@supplyco.in',     dept: 'Finance',        role: 'Finance',         status: 'Active',   phone: '+91 98001 11002', lastLogin: '17 Jun 2025, 08:55 AM', online: true  },
  { id: 3, empId: 'EMP-1003', fname: 'Amit',     lname: 'Desai',     email: 'amit.desai@supplyco.in',     dept: 'Warehouse',      role: 'Warehouse Staff', status: 'Active',   phone: '+91 98001 11003', lastLogin: '16 Jun 2025, 05:30 PM', online: false },
  { id: 4, empId: 'EMP-1004', fname: 'Sneha',    lname: 'Kulkarni',  email: 'sneha.k@supplyco.in',        dept: 'Sales',          role: 'Sales Executive', status: 'Active',   phone: '+91 98001 11004', lastLogin: '17 Jun 2025, 10:01 AM', online: true  },
  { id: 5, empId: 'EMP-1005', fname: 'Vijay',    lname: 'Menon',     email: 'vijay.menon@supplyco.in',    dept: 'Purchase',       role: 'Purchase Officer',status: 'Active',   phone: '+91 98001 11005', lastLogin: '17 Jun 2025, 07:40 AM', online: false },
  { id: 6, empId: 'EMP-1006', fname: 'Anjali',   lname: 'Nair',      email: 'anjali.nair@supplyco.in',    dept: 'Operations',     role: 'Manager',         status: 'Active',   phone: '+91 98001 11006', lastLogin: '15 Jun 2025, 11:22 AM', online: false },
  { id: 7, empId: 'EMP-1007', fname: 'Kiran',    lname: 'Bose',      email: 'kiran.bose@supplyco.in',     dept: 'Warehouse',      role: 'Warehouse Staff', status: 'Inactive', phone: '+91 98001 11007', lastLogin: '10 Jun 2025, 03:15 PM', online: false },
  { id: 8, empId: 'EMP-1008', fname: 'Deepak',   lname: 'Rao',       email: 'deepak.rao@supplyco.in',     dept: 'Finance',        role: 'Finance',         status: 'Active',   phone: '+91 98001 11008', lastLogin: '17 Jun 2025, 09:50 AM', online: true  },
  { id: 9, empId: 'EMP-1009', fname: 'Lakshmi',  lname: 'Pillai',    email: 'lakshmi.p@supplyco.in',      dept: 'Sales',          role: 'Viewer',          status: 'Pending',  phone: '+91 98001 11009', lastLogin: '—',                    online: false },
  { id: 10, empId: 'EMP-1010', fname: 'Suresh',  lname: 'Joshi',     email: 'suresh.joshi@supplyco.in',   dept: 'Purchase',       role: 'Purchase Officer',status: 'Active',   phone: '+91 98001 11010', lastLogin: '16 Jun 2025, 04:10 PM', online: false },
  { id: 11, empId: 'EMP-1011', fname: 'Meera',   lname: 'Ghosh',     email: 'meera.ghosh@supplyco.in',    dept: 'Operations',     role: 'Manager',         status: 'Active',   phone: '+91 98001 11011', lastLogin: '17 Jun 2025, 08:30 AM', online: true  },
  { id: 12, empId: 'EMP-1012', fname: 'Rohan',   lname: 'Verma',     email: 'rohan.verma@supplyco.in',    dept: 'Warehouse',      role: 'Warehouse Staff', status: 'Locked',   phone: '+91 98001 11012', lastLogin: '01 Jun 2025, 10:00 AM', online: false },
  { id: 13, empId: 'EMP-1013', fname: 'Pooja',   lname: 'Singh',     email: 'pooja.singh@supplyco.in',    dept: 'Administration', role: 'Admin',           status: 'Active',   phone: '+91 98001 11013', lastLogin: '17 Jun 2025, 11:05 AM', online: true  },
  { id: 14, empId: 'EMP-1014', fname: 'Arjun',   lname: 'Mathur',    email: 'arjun.mathur@supplyco.in',   dept: 'Sales',          role: 'Sales Executive', status: 'Active',   phone: '+91 98001 11014', lastLogin: '16 Jun 2025, 06:00 PM', online: false },
  { id: 15, empId: 'EMP-1015', fname: 'Divya',   lname: 'Patel',     email: 'divya.patel@supplyco.in',    dept: 'Finance',        role: 'Finance',         status: 'Inactive', phone: '+91 98001 11015', lastLogin: '05 Jun 2025, 02:00 PM', online: false },
  { id: 16, empId: 'EMP-1016', fname: 'Nikhil',  lname: 'Tiwari',    email: 'nikhil.tiwari@supplyco.in',  dept: 'Purchase',       role: 'Purchase Officer',status: 'Active',   phone: '+91 98001 11016', lastLogin: '17 Jun 2025, 07:55 AM', online: true  },
  { id: 17, empId: 'EMP-1017', fname: 'Sonal',   lname: 'Chaudhary', email: 'sonal.c@supplyco.in',        dept: 'Operations',     role: 'Viewer',          status: 'Active',   phone: '+91 98001 11017', lastLogin: '14 Jun 2025, 01:30 PM', online: false },
  { id: 18, empId: 'EMP-1018', fname: 'Ravi',    lname: 'Kumar',     email: 'ravi.kumar@supplyco.in',     dept: 'Warehouse',      role: 'Warehouse Staff', status: 'Active',   phone: '+91 98001 11018', lastLogin: '17 Jun 2025, 10:40 AM', online: true  },
  { id: 19, empId: 'EMP-1019', fname: 'Tanya',   lname: 'Agarwal',   email: 'tanya.a@supplyco.in',        dept: 'Sales',          role: 'Sales Executive', status: 'Active',   phone: '+91 98001 11019', lastLogin: '16 Jun 2025, 03:25 PM', online: false },
  { id: 20, empId: 'EMP-1020', fname: 'Siddharth', lname: 'Bhat',    email: 'sid.bhat@supplyco.in',       dept: 'Finance',        role: 'Manager',         status: 'Active',   phone: '+91 98001 11020', lastLogin: '17 Jun 2025, 09:00 AM', online: false },
  { id: 21, empId: 'EMP-1021', fname: 'Kavya',   lname: 'Reddy',     email: 'kavya.r@supplyco.in',        dept: 'Administration', role: 'Viewer',          status: 'Pending',  phone: '+91 98001 11021', lastLogin: '—',                    online: false },
  { id: 22, empId: 'EMP-1022', fname: 'Manish',  lname: 'Saxena',    email: 'manish.s@supplyco.in',       dept: 'Purchase',       role: 'Purchase Officer',status: 'Active',   phone: '+91 98001 11022', lastLogin: '17 Jun 2025, 08:10 AM', online: false },
  { id: 23, empId: 'EMP-1023', fname: 'Nandini', lname: 'Hegde',     email: 'nandini.h@supplyco.in',      dept: 'Warehouse',      role: 'Warehouse Staff', status: 'Inactive', phone: '+91 98001 11023', lastLogin: '02 Jun 2025, 12:00 PM', online: false },
  { id: 24, empId: 'EMP-1024', fname: 'Aakash',  lname: 'Trivedi',   email: 'aakash.t@supplyco.in',       dept: 'Operations',     role: 'Manager',         status: 'Active',   phone: '+91 98001 11024', lastLogin: '17 Jun 2025, 11:20 AM', online: true  },
];

/* ---- State ---- */
let filteredUsers = [...users];
let currentPage   = 1;
const PAGE_SIZE   = 10;
let editingId     = null; // null = create, number = edit

/* ============================================================
   SIDEBAR TOGGLE
   ============================================================ */
const sidebar       = document.getElementById('sidebar');
const mainWrapper   = document.getElementById('main-wrapper');
const sidebarToggle = document.getElementById('sidebar-toggle');
const overlay       = document.getElementById('sidebar-overlay');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
let isCollapsed = false;

function setSidebarCollapsed(collapsed) {
  isCollapsed = collapsed;
  if (collapsed) {
    sidebar.classList.add('sidebar-collapsed');
    mainWrapper.classList.add('main-expanded');
  } else {
    sidebar.classList.remove('sidebar-collapsed');
    mainWrapper.classList.remove('main-expanded');
  }
  const icon = sidebarToggle?.querySelector('i');
  if (icon) {
    icon.className = collapsed ? 'fas fa-chevron-right text-sm' : 'fas fa-chevron-left text-sm';
  }
}

sidebarToggle?.addEventListener('click', () => {
  if (window.innerWidth < 1024) {
    sidebar.classList.toggle('sidebar-open');
    overlay.classList.toggle('hidden');
  } else {
    setSidebarCollapsed(!isCollapsed);
  }
});

mobileMenuBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('sidebar-open');
  overlay.classList.toggle('hidden');
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
});

/* ---- Nav group dropdowns ---- */
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function () {
    const items   = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (!items) return;
    const hidden = items.classList.toggle('hidden');
    if (chevron) chevron.style.transform = hidden ? 'rotate(0deg)' : 'rotate(180deg)';
  });
});

/* ---- Dropdowns (user menu / notif) ---- */
const userMenuBtn = document.getElementById('user-menu-btn');
const userMenu    = document.getElementById('user-menu');
const notifBtn    = document.getElementById('notif-btn');
const notifMenu   = document.getElementById('notif-menu');

userMenuBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click',    e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', () => { userMenu?.classList.add('hidden'); notifMenu?.classList.add('hidden'); });

/* ============================================================
   FILTER & SEARCH
   ============================================================ */
const searchInput   = document.getElementById('search-input');
const filterRole    = document.getElementById('filter-role');
const filterStatus  = document.getElementById('filter-status');
const filterDept    = document.getElementById('filter-dept');
const clearFilters  = document.getElementById('clear-filters-btn');

function applyFilters() {
  const q    = (searchInput.value || '').toLowerCase().trim();
  const role = filterRole.value;
  const stat = filterStatus.value;
  const dept = filterDept.value;

  filteredUsers = users.filter(u => {
    const name = `${u.fname} ${u.lname}`.toLowerCase();
    const matchQ    = !q    || name.includes(q) || u.email.toLowerCase().includes(q) || u.empId.toLowerCase().includes(q);
    const matchRole = !role || u.role === role;
    const matchStat = !stat || u.status === stat;
    const matchDept = !dept || u.dept === dept;
    return matchQ && matchRole && matchStat && matchDept;
  });
  currentPage = 1;
  render();
}

[searchInput, filterRole, filterStatus, filterDept].forEach(el => el?.addEventListener('input', applyFilters));
clearFilters?.addEventListener('click', () => {
  searchInput.value = ''; filterRole.value = ''; filterStatus.value = ''; filterDept.value = '';
  applyFilters();
});

/* ============================================================
   KPI COUNTS
   ============================================================ */
function updateKPIs() {
  document.getElementById('kpi-total').textContent   = users.length;
  document.getElementById('kpi-active').textContent  = users.filter(u => u.status === 'Active').length;
  document.getElementById('kpi-inactive').textContent= users.filter(u => u.status === 'Inactive').length;
  document.getElementById('kpi-online').textContent  = users.filter(u => u.online).length;
  document.getElementById('kpi-pending').textContent = users.filter(u => u.status === 'Pending').length;
  document.getElementById('kpi-locked').textContent  = users.filter(u => u.status === 'Locked').length;
}

/* ============================================================
   RENDER TABLE
   ============================================================ */
function statusBadge(status) {
  const map = {
    Active:   'badge-active',
    Inactive: 'badge-inactive',
    Locked:   'badge-locked',
    Pending:  'badge-pending',
  };
  const icons = { Active:'circle-check', Inactive:'circle-minus', Locked:'lock', Pending:'clock' };
  return `<span class="badge ${map[status] || 'badge-inactive'}"><i class="fas fa-${icons[status] || 'circle'} text-[9px]"></i>${status}</span>`;
}

function initials(u) { return (u.fname[0] + u.lname[0]).toUpperCase(); }

function avatarColor(role) {
  const map = { Admin:'bg-[#111844]', Manager:'bg-[#4B5694]', Finance:'bg-emerald-700', 'Warehouse Staff':'bg-amber-700', 'Purchase Officer':'bg-indigo-700', 'Sales Executive':'bg-purple-700', Viewer:'bg-[#7288AE]' };
  return map[role] || 'bg-[#4B5694]';
}

function render() {
  const tbody   = document.getElementById('user-table-body');
  const total   = filteredUsers.length;
  const start   = (currentPage - 1) * PAGE_SIZE;
  const end     = Math.min(start + PAGE_SIZE, total);
  const page    = filteredUsers.slice(start, end);

  if (!page.length) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center py-10 text-xs text-[#7288AE]"><i class="fas fa-users-slash text-lg mb-2 block opacity-40"></i>No users match your filters.</td></tr>`;
  } else {
    tbody.innerHTML = page.map(u => `
      <tr data-id="${u.id}">
        <td><input type="checkbox" class="row-check rounded" data-id="${u.id}" /></td>
        <td class="font-mono text-[11px] text-[#4B5694]">${u.empId}</td>
        <td>
          <div class="flex items-center gap-2">
            <div class="avatar ${avatarColor(u.role)} text-[10px]" style="width:26px;height:26px;">${initials(u)}</div>
            <div>
              <div class="font-medium text-[12px]">${u.fname} ${u.lname}</div>
              <div class="text-[10px] text-[#7288AE]">${u.phone}</div>
            </div>
            ${u.online ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block flex-shrink-0" title="Online"></span>' : ''}
          </div>
        </td>
        <td class="text-[11px] text-[#4B5694]">${u.email}</td>
        <td class="text-[11px]">${u.dept}</td>
        <td>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#111844]/08 text-[#111844]" style="background:rgba(17,24,68,0.08)">${u.role}</span>
        </td>
        <td>${statusBadge(u.status)}</td>
        <td class="text-[11px] text-[#7288AE]">${u.lastLogin}</td>
        <td>
          <div class="flex items-center gap-1">
            <button class="btn-icon btn-view" onclick="viewUser(${u.id})" title="View"><i class="fas fa-eye"></i></button>
            <button class="btn-icon btn-edit" onclick="editUser(${u.id})" title="Edit"><i class="fas fa-pen"></i></button>
            ${u.status === 'Locked'
              ? `<button class="btn-icon btn-unlock" onclick="toggleLock(${u.id})" title="Unlock"><i class="fas fa-lock-open"></i></button>`
              : `<button class="btn-icon btn-lock"   onclick="toggleLock(${u.id})" title="Lock"><i class="fas fa-lock"></i></button>`
            }
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Count
  document.getElementById('table-count').textContent =
    total ? `Showing ${start + 1}–${end} of ${total} user${total !== 1 ? 's' : ''}` : 'No users found';

  renderPagination(total);
  updateKPIs();
}

/* ============================================================
   PAGINATION
   ============================================================ */
function renderPagination(total) {
  const pages  = Math.ceil(total / PAGE_SIZE);
  const pag    = document.getElementById('pagination');
  if (pages <= 1) { pag.innerHTML = ''; return; }

  let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage===1?'disabled style="opacity:.4;cursor:not-allowed"':''}><i class="fas fa-chevron-left text-[9px]"></i></button>`;

  for (let p = 1; p <= pages; p++) {
    if (pages > 7 && p > 2 && p < pages - 1 && Math.abs(p - currentPage) > 1) {
      if (p === 3 || p === pages - 2) html += `<span class="page-btn" style="pointer-events:none;color:#7288AE;">…</span>`;
      continue;
    }
    html += `<button class="page-btn ${p===currentPage?'active':''}" onclick="goPage(${p})">${p}</button>`;
  }

  html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage===pages?'disabled style="opacity:.4;cursor:not-allowed"':''}><i class="fas fa-chevron-right text-[9px]"></i></button>`;
  pag.innerHTML = html;
}

window.goPage = function(p) {
  const pages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  if (p < 1 || p > pages) return;
  currentPage = p;
  render();
};

/* ============================================================
   SELECT ALL
   ============================================================ */
document.getElementById('select-all')?.addEventListener('change', function () {
  document.querySelectorAll('.row-check').forEach(cb => cb.checked = this.checked);
});

/* ============================================================
   VIEW USER (DRAWER)
   ============================================================ */
window.viewUser = function(id) {
  const u = users.find(x => x.id === id);
  if (!u) return;
  const drawerBody = document.getElementById('drawer-body');

  drawerBody.innerHTML = `
    <div class="flex flex-col items-center text-center mb-5">
      <div class="avatar ${avatarColor(u.role)} mb-3" style="width:56px;height:56px;font-size:20px;">${initials(u)}</div>
      <div class="font-bold text-[#111844] text-base">${u.fname} ${u.lname}</div>
      <div class="text-xs text-[#7288AE] mt-0.5">${u.email}</div>
      <div class="mt-2 flex items-center gap-2">${statusBadge(u.status)}${u.online ? '<span class="badge badge-active"><i class="fas fa-circle text-[6px]"></i>Online</span>' : ''}</div>
    </div>
    <div class="space-y-3">
      ${drawerRow('fas fa-id-badge', 'Employee ID', u.empId)}
      ${drawerRow('fas fa-building', 'Department',  u.dept)}
      ${drawerRow('fas fa-user-shield', 'Role',     u.role)}
      ${drawerRow('fas fa-phone', 'Phone',           u.phone)}
      ${drawerRow('fas fa-clock', 'Last Login',      u.lastLogin)}
    </div>
    <div class="mt-5 flex gap-2">
      <button class="btn-primary flex-1" onclick="editUser(${u.id}); closeDrawer();"><i class="fas fa-pen"></i> Edit</button>
      <button class="btn-secondary flex-1" onclick="toggleLock(${u.id}); closeDrawer();">
        <i class="fas fa-${u.status==='Locked'?'lock-open':'lock'}"></i> ${u.status==='Locked'?'Unlock':'Lock'}
      </button>
    </div>
  `;

  document.getElementById('user-drawer').classList.add('open');
};

function drawerRow(icon, label, value) {
  return `
    <div class="flex items-start gap-3 p-3 rounded-lg bg-[#FAFAFA] border border-[#4B5694]/10">
      <div class="w-7 h-7 rounded-lg bg-[#111844]/08 flex items-center justify-center text-[#4B5694] flex-shrink-0" style="background:rgba(17,24,68,0.08);">
        <i class="${icon} text-xs"></i>
      </div>
      <div>
        <div class="text-[10px] text-[#7288AE] font-medium">${label}</div>
        <div class="text-xs font-semibold text-[#111844] mt-0.5">${value}</div>
      </div>
    </div>`;
}

document.getElementById('close-drawer')?.addEventListener('click', closeDrawer);
document.getElementById('user-drawer')?.addEventListener('click', function(e) {
  if (e.target === this) closeDrawer();
});
function closeDrawer() { document.getElementById('user-drawer').classList.remove('open'); }
window.closeDrawer = closeDrawer;

/* ============================================================
   LOCK / UNLOCK
   ============================================================ */
window.toggleLock = function(id) {
  const u = users.find(x => x.id === id);
  if (!u) return;
  if (u.status === 'Locked') {
    u.status = 'Active';
    toast(`${u.fname} ${u.lname}'s account unlocked.`, 'success');
  } else {
    u.status = 'Locked';
    u.online = false;
    toast(`${u.fname} ${u.lname}'s account locked.`, 'error');
  }
  applyFilters();
};

/* ============================================================
   ADD / EDIT MODAL
   ============================================================ */
const modal        = document.getElementById('user-modal');
const modalTitle   = document.getElementById('modal-title');
const closeModalBtn= document.getElementById('close-modal');
const cancelBtn    = document.getElementById('cancel-modal');
const saveBtn      = document.getElementById('save-user-btn');

function openModal(title) { modalTitle.textContent = title; modal.classList.add('open'); }
function closeModal()     { modal.classList.remove('open'); clearModalFields(); editingId = null; }

closeModalBtn?.addEventListener('click', closeModal);
cancelBtn?.addEventListener('click',     closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });

function clearModalFields() {
  ['field-fname','field-lname','field-empid','field-email','field-dept','field-role','field-phone','field-status','field-pwd'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

document.getElementById('add-user-btn')?.addEventListener('click', () => {
  editingId = null;
  document.getElementById('pwd-required').style.display = '';
  openModal('Add New User');
});

window.editUser = function(id) {
  const u = users.find(x => x.id === id);
  if (!u) return;
  editingId = id;

  document.getElementById('field-fname').value  = u.fname;
  document.getElementById('field-lname').value  = u.lname;
  document.getElementById('field-empid').value  = u.empId;
  document.getElementById('field-email').value  = u.email;
  document.getElementById('field-dept').value   = u.dept;
  document.getElementById('field-role').value   = u.role;
  document.getElementById('field-phone').value  = u.phone;
  document.getElementById('field-status').value = u.status;
  document.getElementById('field-pwd').value    = '';
  document.getElementById('pwd-required').style.display = 'none';

  openModal('Edit User');
};

saveBtn?.addEventListener('click', () => {
  const fname  = document.getElementById('field-fname').value.trim();
  const lname  = document.getElementById('field-lname').value.trim();
  const empId  = document.getElementById('field-empid').value.trim();
  const email  = document.getElementById('field-email').value.trim();
  const dept   = document.getElementById('field-dept').value;
  const role   = document.getElementById('field-role').value;
  const phone  = document.getElementById('field-phone').value.trim();
  const status = document.getElementById('field-status').value;
  const pwd    = document.getElementById('field-pwd').value;

  if (!fname || !lname || !empId || !email || !dept || !role) {
    toast('Please fill in all required fields.', 'error'); return;
  }
  if (!editingId && !pwd) {
    toast('Password is required for new users.', 'error'); return;
  }

  if (editingId) {
    const u = users.find(x => x.id === editingId);
    if (u) { Object.assign(u, { fname, lname, empId, email, dept, role, phone, status }); }
    toast(`User "${fname} ${lname}" updated.`, 'success');
  } else {
    const newId = Math.max(...users.map(x => x.id)) + 1;
    users.push({ id: newId, empId, fname, lname, email, dept, role, phone, status, lastLogin: '—', online: false });
    toast(`User "${fname} ${lname}" added.`, 'success');
  }

  closeModal();
  applyFilters();
});

/* ============================================================
   TOAST
   ============================================================ */
function toast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const icons = { success:'circle-check', error:'circle-xmark', info:'circle-info' };
  const div = document.createElement('div');
  div.className = `toast toast-${type}`;
  div.innerHTML = `<i class="fas fa-${icons[type]}"></i><span>${msg}</span>`;
  container.appendChild(div);
  setTimeout(() => div.remove(), 3500);
}

/* ============================================================
   INIT
   ============================================================ */
applyFilters(); // initial render