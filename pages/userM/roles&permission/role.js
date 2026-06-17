/* ===========================
   Roles & Permissions — JS
   =========================== */

// ---- DATA ----
const MODULES = [
  { id: 'dashboard',    name: 'Dashboard' },
  { id: 'products',     name: 'Product Master' },
  { id: 'suppliers',    name: 'Supplier Master' },
  { id: 'customers',    name: 'Customer Master' },
  { id: 'warehouse',    name: 'Warehouse Master' },
  { id: 'purchase',     name: 'Purchase Order' },
  { id: 'grn',          name: 'GRN' },
  { id: 'inventory',    name: 'Inventory' },
  { id: 'stock_adj',    name: 'Stock Adjustment' },
  { id: 'sales',        name: 'Sales Orders' },
  { id: 'dispatch',     name: 'Dispatch Planning' },
  { id: 'invoices',     name: 'Invoices' },
  { id: 'returns',      name: 'Returns' },
  { id: 'finance',      name: 'Finance' },
  { id: 'reports',      name: 'Reports' },
  { id: 'audit',        name: 'Audit Logs' },
];

const PERM_KEYS = ['view','add','edit','delete','approve','export','print'];

let rolesData = [
  {
    id: 1, name: 'Super Admin', description: 'Full system access — all modules and permissions',
    status: 'active', createdDate: '2024-01-15', totalUsers: 2, color: '#111844', icon: 'fa-user-shield',
    permissions: { dashboard:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, products:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, suppliers:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, customers:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, warehouse:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, purchase:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, grn:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, inventory:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, stock_adj:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, sales:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, dispatch:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, invoices:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, returns:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, finance:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, reports:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1}, audit:{view:1,add:1,edit:1,delete:1,approve:1,export:1,print:1} },
    users: [{ name: 'Pranjal Sharma', dept: 'IT' }, { name: 'Admin User', dept: 'Management' }]
  },
  {
    id: 2, name: 'Warehouse Manager', description: 'Manage warehouse operations, inventory, and reports',
    status: 'active', createdDate: '2024-01-20', totalUsers: 4, color: '#0891b2', icon: 'fa-warehouse',
    permissions: { dashboard:{view:1,add:0,edit:0,delete:0,approve:0,export:0,print:0}, inventory:{view:1,add:1,edit:1,delete:0,approve:1,export:1,print:1}, warehouse:{view:1,add:1,edit:1,delete:0,approve:1,export:0,print:0}, reports:{view:1,add:0,edit:0,delete:0,approve:0,export:1,print:1} },
    users: [{ name: 'Ravi Kumar', dept: 'Warehouse' }, { name: 'Suresh Singh', dept: 'Warehouse' }, { name: 'Anil Jha', dept: 'Warehouse' }, { name: 'Karan Malhotra', dept: 'Warehouse' }]
  },
  {
    id: 3, name: 'Purchase Manager', description: 'Handle purchase requisitions, orders, GRN and supplier management',
    status: 'active', createdDate: '2024-02-01', totalUsers: 3, color: '#7c3aed', icon: 'fa-shopping-cart',
    permissions: { purchase:{view:1,add:1,edit:1,delete:0,approve:1,export:1,print:1}, grn:{view:1,add:1,edit:1,delete:0,approve:1,export:0,print:1}, suppliers:{view:1,add:1,edit:1,delete:0,approve:0,export:1,print:0}, returns:{view:1,add:1,edit:0,delete:0,approve:0,export:0,print:0} },
    users: [{ name: 'Sneha Patel', dept: 'Purchase' }, { name: 'Mohit Gupta', dept: 'Purchase' }, { name: 'Kavya Nair', dept: 'Purchase' }]
  },
  {
    id: 4, name: 'Inventory Manager', description: 'Manage stock, batches, transfers and inventory adjustments',
    status: 'active', createdDate: '2024-02-10', totalUsers: 3, color: '#059669', icon: 'fa-boxes-stacked',
    permissions: { inventory:{view:1,add:1,edit:1,delete:0,approve:0,export:1,print:0}, stock_adj:{view:1,add:1,edit:1,delete:0,approve:0,export:0,print:0}, warehouse:{view:1,add:0,edit:0,delete:0,approve:0,export:0,print:0} },
    users: [{ name: 'Amit Verma', dept: 'Inventory' }, { name: 'Rekha Tiwari', dept: 'Inventory' }, { name: 'Deepak Rao', dept: 'Inventory' }]
  },
  {
    id: 5, name: 'Sales Executive', description: 'Handle sales orders, dispatch, delivery and customer management',
    status: 'active', createdDate: '2024-02-15', totalUsers: 6, color: '#ea580c', icon: 'fa-truck',
    permissions: { sales:{view:1,add:1,edit:1,delete:0,approve:0,export:1,print:1}, dispatch:{view:1,add:1,edit:1,delete:0,approve:0,export:0,print:1}, invoices:{view:1,add:1,edit:1,delete:0,approve:0,export:1,print:1}, customers:{view:1,add:1,edit:1,delete:0,approve:0,export:0,print:0} },
    users: [{ name: 'Pooja Mehta', dept: 'Sales' }, { name: 'Nikhil Joshi', dept: 'Sales' }, { name: 'Shruti Kapoor', dept: 'Sales' }, { name: 'Raj Patel', dept: 'Sales' }, { name: 'Meena Yadav', dept: 'Sales' }, { name: 'Arjun Bose', dept: 'Sales' }]
  },
  {
    id: 6, name: 'Finance Manager', description: 'Manage receivables, payables, expenses, GST and profitability',
    status: 'active', createdDate: '2024-03-01', totalUsers: 2, color: '#d97706', icon: 'fa-coins',
    permissions: { finance:{view:1,add:1,edit:1,delete:0,approve:1,export:1,print:1}, invoices:{view:1,add:0,edit:0,delete:0,approve:1,export:1,print:1}, reports:{view:1,add:0,edit:0,delete:0,approve:0,export:1,print:1} },
    users: [{ name: 'Vikas Sharma', dept: 'Finance' }, { name: 'Pallavi Desai', dept: 'Finance' }]
  },
  {
    id: 7, name: 'Store Keeper', description: 'Manage GRN, stock movement, putaway, picking and packing',
    status: 'active', createdDate: '2024-03-10', totalUsers: 4, color: '#0369a1', icon: 'fa-dolly',
    permissions: { grn:{view:1,add:1,edit:1,delete:0,approve:0,export:0,print:1}, inventory:{view:1,add:1,edit:0,delete:0,approve:0,export:0,print:0}, warehouse:{view:1,add:0,edit:0,delete:0,approve:0,export:0,print:0} },
    users: [{ name: 'Sanjay More', dept: 'Store' }, { name: 'Laxmi Patil', dept: 'Store' }, { name: 'Ganesh Kamble', dept: 'Store' }, { name: 'Priya Shinde', dept: 'Store' }]
  },
  {
    id: 8, name: 'Auditor', description: 'View-only access to reports, audit logs and financial summaries',
    status: 'inactive', createdDate: '2024-04-01', totalUsers: 0, color: '#6b7280', icon: 'fa-magnifying-glass-chart',
    permissions: { reports:{view:1,add:0,edit:0,delete:0,approve:0,export:1,print:1}, audit:{view:1,add:0,edit:0,delete:0,approve:0,export:1,print:0}, finance:{view:1,add:0,edit:0,delete:0,approve:0,export:1,print:0}, inventory:{view:1,add:0,edit:0,delete:0,approve:0,export:0,print:0} },
    users: []
  }
];

let editingRoleId = null;
let deletingRoleId = null;
let permissionRoleId = null;
let viewingRoleId = null;

// ---- PAGINATION STATE ----
let currentPage = 1;
let rowsPerPage = 5;
let lastFilteredData = [];

// ---- RENDER TABLE ----
function renderRoles(data) {
  lastFilteredData = data;
  currentPage = 1;
  renderPage();
}

function renderPage() {
  const tbody = document.getElementById('roles-tbody');
  tbody.innerHTML = '';

  const total = lastFilteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / rowsPerPage));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * rowsPerPage;
  const pageData = lastFilteredData.slice(start, start + rowsPerPage);

  if (!pageData.length) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center py-10 text-[#7288AE] text-xs">No roles found.</td></tr>`;
  } else {
    pageData.forEach(role => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="role-pill">
            <div class="role-icon" style="background:${role.color}18; color:${role.color}">
              <i class="fas ${role.icon}"></i>
            </div>
            ${role.name}
          </div>
        </td>
        <td class="text-[#7288AE] text-xs max-w-[200px] truncate">${role.description}</td>
        <td class="text-center">
          <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#4B5694]/10 text-[#4B5694] text-xs font-bold">${role.totalUsers}</span>
        </td>
        <td class="text-center">
          <span class="${role.status === 'active' ? 'badge-active' : 'badge-inactive'}">
            <span class="perm-dot" style="background:${role.status === 'active' ? '#10b981' : '#9ca3af'}"></span>
            ${role.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </td>
        <td>
          <div class="flex items-center justify-center gap-1">
            <button class="action-btn action-btn-view" title="View Details" onclick="openRoleDetails(${role.id})"><i class="fas fa-eye"></i></button>
            <button class="action-btn action-btn-edit" title="Edit Role" onclick="openEditRole(${role.id})"><i class="fas fa-pencil"></i></button>
            <button class="action-btn action-btn-perm" title="Permissions" onclick="openPermissions(${role.id})"><i class="fas fa-shield-halved"></i></button>
            <button class="action-btn action-btn-assign" title="Assign User" onclick="openAssignUser(${role.id})"><i class="fas fa-user-plus"></i></button>
            <button class="action-btn action-btn-clone" title="Clone Role" onclick="cloneRole(${role.id})"><i class="fas fa-copy"></i></button>
            <button class="action-btn action-btn-del" title="Delete Role" onclick="openDeleteConfirm(${role.id})" ${role.name === 'Super Admin' ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderPagination(total, totalPages);
}

function renderPagination(total, totalPages) {
  const container = document.getElementById('pagination-container');
  if (!container) return;

  const start = total === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, total);

  // Page number buttons (show max 5 around current)
  let pages = [];
  const delta = 2;
  for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) pages.push(i);

  const pageButtons = pages.map(p => `
    <button onclick="goToPage(${p})" class="pg-btn ${p === currentPage ? 'pg-btn-active' : 'pg-btn-inactive'}">${p}</button>
  `).join('');

  container.innerHTML = `
    <div class="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-[#4B5694]/12 mt-1">
      <div class="flex items-center gap-2 text-xs text-[#7288AE]">
        <span>Rows per page:</span>
        <select id="rows-per-page" class="px-2 py-1 text-xs rounded-lg border border-[#4B5694]/25 bg-[#FAFAFA] text-[#111844] focus:outline-none focus:border-[#111844] cursor-pointer">
          <option value="5"  ${rowsPerPage===5?'selected':''}>5</option>
          <option value="10" ${rowsPerPage===10?'selected':''}>10</option>
          <option value="20" ${rowsPerPage===20?'selected':''}>20</option>
        </select>
        <span class="ml-1">${start}–${end} of ${total} roles</span>
      </div>
      <div class="flex items-center gap-1">
        <button onclick="goToPage(1)" class="pg-btn pg-btn-inactive" ${currentPage===1?'disabled':''} title="First"><i class="fas fa-angles-left text-[10px]"></i></button>
        <button onclick="goToPage(${currentPage - 1})" class="pg-btn pg-btn-inactive" ${currentPage===1?'disabled':''} title="Previous"><i class="fas fa-angle-left text-[10px]"></i></button>
        ${pageButtons}
        <button onclick="goToPage(${currentPage + 1})" class="pg-btn pg-btn-inactive" ${currentPage===totalPages?'disabled':''} title="Next"><i class="fas fa-angle-right text-[10px]"></i></button>
        <button onclick="goToPage(${totalPages})" class="pg-btn pg-btn-inactive" ${currentPage===totalPages?'disabled':''} title="Last"><i class="fas fa-angles-right text-[10px]"></i></button>
      </div>
    </div>
  `;

  // Rows per page change
  document.getElementById('rows-per-page').addEventListener('change', e => {
    rowsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPage();
  });
}

function goToPage(p) {
  const totalPages = Math.max(1, Math.ceil(lastFilteredData.length / rowsPerPage));
  if (p < 1 || p > totalPages) return;
  currentPage = p;
  renderPage();
}

function countPerms(perms) {
  let c = 0;
  for (const mod of Object.values(perms)) for (const v of Object.values(mod)) if (v) c++;
  return c;
}

// ---- SEARCH & FILTER ----
function getFilteredRoles() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const s = document.getElementById('status-filter').value;
  return rolesData.filter(r =>
    (!q || r.name.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) &&
    (!s || r.status === s)
  );
}

document.getElementById('search-input').addEventListener('input', () => renderRoles(getFilteredRoles()));
document.getElementById('status-filter').addEventListener('change', () => renderRoles(getFilteredRoles()));

// ---- CREATE ROLE ----
document.getElementById('create-role-btn').addEventListener('click', () => {
  editingRoleId = null;
  document.getElementById('create-role-title').textContent = 'Create Role';
  document.getElementById('field-role-name').value = '';
  document.getElementById('field-role-desc').value = '';
  document.getElementById('field-role-status').value = 'active';
  openOverlay('overlay-create-role');
});

document.getElementById('save-role-btn').addEventListener('click', () => {
  const name = document.getElementById('field-role-name').value.trim();
  const desc = document.getElementById('field-role-desc').value.trim();
  const status = document.getElementById('field-role-status').value;
  if (!name) { showToast('Role name is required.', 'error'); return; }

  if (editingRoleId) {
    const role = rolesData.find(r => r.id === editingRoleId);
    role.name = name; role.description = desc; role.status = status;
    showToast(`Role "${name}" updated successfully.`, 'success');
  } else {
    const newRole = {
      id: Date.now(), name, description: desc, status,
      createdDate: new Date().toISOString().split('T')[0],
      totalUsers: 0, color: '#4B5694', icon: 'fa-lock',
      permissions: {}, users: []
    };
    rolesData.push(newRole);
    showToast(`Role "${name}" created successfully.`, 'success');
  }
  closeOverlay('overlay-create-role');
  renderRoles(getFilteredRoles());
  updateStats();
});

// ---- EDIT ROLE ----
function openEditRole(id) {
  const role = rolesData.find(r => r.id === id);
  editingRoleId = id;
  document.getElementById('create-role-title').textContent = 'Edit Role';
  document.getElementById('field-role-name').value = role.name;
  document.getElementById('field-role-desc').value = role.description;
  document.getElementById('field-role-status').value = role.status;
  openOverlay('overlay-create-role');
}

// ---- ROLE DETAILS ----
function openRoleDetails(id) {
  const role = rolesData.find(r => r.id === id);
  viewingRoleId = id;
  document.getElementById('detail-role-name').textContent = role.name;
  document.getElementById('detail-view-name').textContent = role.name;
  document.getElementById('detail-view-status').innerHTML = `<span class="${role.status === 'active' ? 'badge-active' : 'badge-inactive'}">${role.status === 'active' ? 'Active' : 'Inactive'}</span>`;
  document.getElementById('detail-view-date').textContent = role.createdDate;
  document.getElementById('detail-view-users').textContent = role.totalUsers;
  document.getElementById('detail-view-desc').textContent = role.description || '—';
  document.getElementById('detail-total-modules').textContent = Object.keys(role.permissions).length;
  document.getElementById('detail-total-perms').textContent = countPerms(role.permissions);

  // Permissions table
  const pb = document.getElementById('detail-perm-body');
  pb.innerHTML = '';
  MODULES.forEach(mod => {
    const p = role.permissions[mod.id] || {};
    const tr = document.createElement('tr');
    tr.className = 'border-b border-[#4B5694]/10';
    tr.innerHTML = `
      <td class="py-2 px-2 font-medium text-[#111844]">${mod.name}</td>
      ${PERM_KEYS.slice(0,6).map(k => `<td class="text-center py-2 px-2">${p[k] ? '<i class="fas fa-check text-emerald-600"></i>' : '<i class="fas fa-times text-[#4B5694]/30"></i>'}</td>`).join('')}
    `;
    pb.appendChild(tr);
  });

  // Users list
  const ul = document.getElementById('detail-users-list');
  ul.innerHTML = '';
  if (!role.users.length) {
    ul.innerHTML = `<p class="text-xs text-[#7288AE] text-center py-6">No users assigned to this role yet.</p>`;
  } else {
    role.users.forEach(u => {
      const initials = u.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
      ul.innerHTML += `
        <div class="flex items-center gap-3 p-2.5 bg-[#FAFAFA] rounded-lg border border-[#4B5694]/10">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-[#FAFAFA] text-xs font-bold flex-shrink-0" style="background:${role.color}">${initials}</div>
          <div>
            <div class="text-xs font-semibold text-[#111844]">${u.name}</div>
            <div class="text-[10px] text-[#7288AE]">${u.dept}</div>
          </div>
        </div>
      `;
    });
  }

  // Switch to overview tab
  switchTab('overview');
  openOverlay('overlay-role-details');
}

function editRoleFromDetails() {
  closeOverlay('overlay-role-details');
  if (viewingRoleId) openEditRole(viewingRoleId);
}

// ---- TABS ----
document.querySelectorAll('.detail-tab').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

function switchTab(tab) {
  document.querySelectorAll('.detail-tab').forEach(b => b.classList.remove('active-tab'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active-tab');
  document.getElementById(`tab-${tab}`).classList.remove('hidden');
}

// ---- PERMISSIONS MATRIX ----
function openPermissions(id) {
  const role = rolesData.find(r => r.id === id);
  permissionRoleId = id;
  document.getElementById('perm-role-label').textContent = `Role: ${role.name}`;

  const tbody = document.getElementById('perm-matrix-body');
  tbody.innerHTML = '';

  MODULES.forEach(mod => {
    const p = role.permissions[mod.id] || {};
    const tr = document.createElement('tr');
    tr.className = 'border-b border-[#4B5694]/10';
    tr.innerHTML = `
      <td class="py-2.5 px-2 font-medium text-[#111844]">${mod.name}</td>
      ${PERM_KEYS.map(k => `
        <td class="text-center py-2.5 px-2">
          <div class="perm-check-wrap">
            <input type="checkbox" class="perm-checkbox" data-module="${mod.id}" data-perm="${k}" ${p[k] ? 'checked' : ''} />
          </div>
        </td>
      `).join('')}
    `;
    tbody.appendChild(tr);
  });

  // Select all row
  const headRow = document.querySelector('#perm-matrix-table thead tr');
  // already static

  openOverlay('overlay-permissions');
}

document.getElementById('save-perm-btn').addEventListener('click', () => {
  const role = rolesData.find(r => r.id === permissionRoleId);
  role.permissions = {};
  document.querySelectorAll('#perm-matrix-body .perm-checkbox').forEach(cb => {
    const mod = cb.dataset.module;
    const perm = cb.dataset.perm;
    if (!role.permissions[mod]) role.permissions[mod] = {};
    role.permissions[mod][perm] = cb.checked ? 1 : 0;
  });
  showToast(`Permissions for "${role.name}" saved.`, 'success');
  closeOverlay('overlay-permissions');
});

// ---- ASSIGN USER ----
function openAssignUser(id) {
  const role = rolesData.find(r => r.id === id);
  document.getElementById('assign-role-select').value = role.name;
  openOverlay('overlay-assign-user');
}

document.getElementById('confirm-assign-btn').addEventListener('click', () => {
  const user = document.getElementById('assign-user-select').value;
  const role = document.getElementById('assign-role-select').value;
  if (!user || !role) { showToast('Please select a user and role.', 'error'); return; }
  showToast(`${user} assigned to ${role}.`, 'success');
  closeOverlay('overlay-assign-user');
});

// ---- CLONE ROLE ----
function cloneRole(id) {
  const role = rolesData.find(r => r.id === id);
  const clone = JSON.parse(JSON.stringify(role));
  clone.id = Date.now();
  clone.name = role.name + ' (Copy)';
  clone.totalUsers = 0;
  clone.users = [];
  clone.createdDate = new Date().toISOString().split('T')[0];
  rolesData.push(clone);
  renderRoles(getFilteredRoles());
  updateStats();
  showToast(`"${role.name}" cloned successfully.`, 'info');
}

// ---- DELETE ----
function openDeleteConfirm(id) {
  deletingRoleId = id;
  const role = rolesData.find(r => r.id === id);
  document.getElementById('delete-role-name-label').textContent = `"${role.name}"`;
  openOverlay('overlay-delete-confirm');
}

document.getElementById('confirm-delete-btn').addEventListener('click', () => {
  const role = rolesData.find(r => r.id === deletingRoleId);
  rolesData = rolesData.filter(r => r.id !== deletingRoleId);
  showToast(`Role "${role.name}" deleted.`, 'error');
  closeOverlay('overlay-delete-confirm');
  renderRoles(getFilteredRoles());
  updateStats();
});

// ---- EXPORT ----
document.getElementById('export-btn').addEventListener('click', () => {
  const rows = [['Role Name','Description','Total Users','Status','Created Date']];
  rolesData.forEach(r => rows.push([r.name, r.description, r.totalUsers, r.status, r.createdDate]));
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = 'roles.csv';
  a.click();
  showToast('Roles exported as CSV.', 'success');
});

// ---- STATS ----
function updateStats() {
  const totalEl = document.querySelector('.chart-card:nth-child(1) .text-lg');
  const activeEl = document.querySelector('.chart-card:nth-child(2) .text-lg');
  if (totalEl) totalEl.textContent = rolesData.length;
  if (activeEl) activeEl.textContent = rolesData.filter(r => r.status === 'active').length;
}

// ---- OVERLAY HELPERS ----
function openOverlay(id) {
  document.getElementById(id).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeOverlay(id) {
  document.getElementById(id).classList.add('hidden');
  document.body.style.overflow = '';
}

// Close on backdrop click
document.querySelectorAll('.overlay-backdrop').forEach(bd => {
  bd.addEventListener('click', (e) => {
    if (e.target === bd) closeOverlay(bd.id);
  });
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay-backdrop:not(.hidden)').forEach(bd => closeOverlay(bd.id));
  }
});

// ---- TOAST ----
function showToast(msg, type = 'success') {
  const tc = document.getElementById('toast-container');
  const t = document.createElement('div');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
  t.className = `toast toast-${type}`;
  t.innerHTML = `<i class="fas ${icons[type]}"></i> ${msg}`;
  tc.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ---- SIDEBAR ----
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
    icon.className = isCollapsed ? 'fas fa-chevron-right text-sm' : 'fas fa-chevron-left text-sm';
  }
});

overlay?.addEventListener('click', () => {
  sidebar?.classList.remove('sidebar-open');
  overlay.classList.add('hidden');
});

// Nav group dropdowns
document.querySelectorAll('.nav-group-header').forEach(header => {
  header.addEventListener('click', function () {
    const items = this.nextElementSibling;
    const chevron = this.querySelector('.fa-chevron-down');
    if (items) {
      items.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
  });
});

// Header dropdowns
const userBtn = document.getElementById('user-menu-btn');
const userMenu = document.getElementById('user-menu');
const notifBtn = document.getElementById('notif-btn');
const notifMenu = document.getElementById('notif-menu');

userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
document.addEventListener('click', e => {
  if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target)) userMenu?.classList.add('hidden');
  if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden');
});

// ---- INIT ----
renderRoles(rolesData);