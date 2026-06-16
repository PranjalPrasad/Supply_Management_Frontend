/* ===== deliveryc.js ===== */
'use strict';

/* ─── Mock Data ─────────────────────────────────────────────── */
const CHALLANS = [
  { id: 'DC-2039', so: 'SO-3185', customer: 'Ramesh Traders',    date: '12 Jun 2025', vehicle: 'MH12-AB-1234', items: 3, status: 'Delivered'       },
  { id: 'DC-2040', so: 'SO-3186', customer: 'Patel Industries',  date: '13 Jun 2025', vehicle: 'MH14-CD-5678', items: 5, status: 'Dispatched'      },
  { id: 'DC-2041', so: 'SO-3187', customer: 'Kumar Steel Works', date: '14 Jun 2025', vehicle: 'MH12-EF-9012', items: 2, status: 'Ready To Dispatch'},
  { id: 'DC-2042', so: 'SO-3188', customer: 'Sharma Fab',        date: '14 Jun 2025', vehicle: '—',            items: 4, status: 'Draft'           },
  { id: 'DC-2043', so: 'SO-3189', customer: 'Singh & Sons',      date: '15 Jun 2025', vehicle: 'MH04-GH-3456', items: 6, status: 'Generated'      },
  { id: 'DC-2044', so: 'SO-3190', customer: 'Mehta Logistics',   date: '15 Jun 2025', vehicle: '—',            items: 1, status: 'Cancelled'       },
  { id: 'DC-2045', so: 'SO-3191', customer: 'Joshi Enterprises', date: '15 Jun 2025', vehicle: 'MH12-IJ-7890', items: 3, status: 'Dispatched'      },
  { id: 'DC-2046', so: 'SO-3192', customer: 'Desai & Co.',       date: '15 Jun 2025', vehicle: '—',            items: 2, status: 'Draft'           },
];

const SO_DATA = {
  'SO-3187': {
    dp: 'DP-1043',
    customer: 'Kumar Steel Works', contact: 'Anil Kumar', mobile: '+91 99887 76655',
    address: 'Plot C-8, Chakan Industrial Area, Pune 410501',
    warehouse: 'Warehouse B — Chakan', vehicle: 'MH12-EF-9012', driver: 'Ramesh Jadhav', dispDate: '14 Jun 2025',
    products: [
      { name: 'Aluminium Sheets (4mm)', sku: 'SKU-4011', ordQty: 30, dispQty: 30, unit: 'Sheets' },
      { name: 'Industrial Bearings',    sku: 'SKU-2083', ordQty: 15, dispQty: 15, unit: 'Pcs'    },
    ]
  },
  'SO-3188': {
    dp: 'DP-1044',
    customer: 'Patel Industries', contact: 'Nilesh Patel', mobile: '+91 98765 11223',
    address: 'A-5, Bhosari Industrial Zone, Pune 411026',
    warehouse: 'Warehouse A — Bhosari', vehicle: 'MH14-CD-5678', driver: 'Vinod Shinde', dispDate: '13 Jun 2025',
    products: [
      { name: 'Steel Pipes (25mm)',  sku: 'SKU-1041', ordQty: 100, dispQty: 100, unit: 'Pcs'  },
      { name: 'Hydraulic Hoses',     sku: 'SKU-3021', ordQty: 20,  dispQty: 20,  unit: 'Mtrs' },
      { name: 'Motor Coupling Set',  sku: 'SKU-5033', ordQty: 5,   dispQty: 5,   unit: 'Sets' },
      { name: 'Conveyor Belt Roll',  sku: 'SKU-6010', ordQty: 2,   dispQty: 2,   unit: 'Roll' },
      { name: 'Safety Gloves (XL)',  sku: 'SKU-7021', ordQty: 50,  dispQty: 50,  unit: 'Pairs'},
    ]
  },
  'SO-3190': {
    dp: 'DP-1045',
    customer: 'Mehta Logistics', contact: 'Suresh Mehta', mobile: '+91 97654 32109',
    address: '12-B, Hadapsar, Pune 411028',
    warehouse: 'Warehouse C — Hadapsar', vehicle: '—', driver: '—', dispDate: '15 Jun 2025',
    products: [
      { name: 'Packaging Cartons (L)', sku: 'SKU-8014', ordQty: 200, dispQty: 200, unit: 'Pcs' },
    ]
  },
};

/* ─── Pagination State ───────────────────────────────────────── */
let currentPage = 1;
const PAGE_SIZE = 8;
let filteredData = [...CHALLANS];

/* ─── Badge HTML Helper ─────────────────────────────────────── */
function badgeFor(status) {
  const map = {
    'Draft'           : 'dc-badge-draft',
    'Generated'       : 'dc-badge-generated',
    'Ready To Dispatch': 'dc-badge-ready',
    'Dispatched'      : 'dc-badge-dispatched',
    'Delivered'       : 'dc-badge-delivered',
    'Cancelled'       : 'dc-badge-cancelled',
  };
  const cls = map[status] || 'dc-badge-draft';
  return `<span class="${cls}">${status}</span>`;
}

/* ─── Toast ──────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  const colors = { success: 'bg-emerald-600', error: 'bg-red-600', info: 'bg-[#111844]', warn: 'bg-amber-500' };
  const icons  = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-info-circle', warn: 'fa-triangle-exclamation' };
  const el = document.createElement('div');
  el.className = `toast-animate flex items-center gap-3 ${colors[type] || colors.info} text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg min-w-[240px]`;
  el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 3000);
}

/* ─── Table Rendering ────────────────────────────────────────── */
function renderTable() {
  const tbody = document.getElementById('challan-tbody');
  const empty = document.getElementById('empty-state');
  const info  = document.getElementById('pagination-info');
  const pageDisplay = document.getElementById('page-display');

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = filteredData.slice(start, start + PAGE_SIZE);

  if (slice.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    info.textContent = 'No challans found';
    pageDisplay.textContent = '1';
    return;
  }
  empty.classList.add('hidden');
  info.textContent = `Showing ${start + 1}–${start + slice.length} of ${filteredData.length} challans`;
  pageDisplay.textContent = currentPage;

  tbody.innerHTML = slice.map(c => `
    <tr class="hover:bg-[#FAFAFA]/80 transition-colors cursor-pointer" onclick="DC.openDetails('${c.id}')">
      <td class="dc-td font-semibold text-[#111844]">${c.id}</td>
      <td class="dc-td text-[#4B5694]">${c.so}</td>
      <td class="dc-td font-medium">${c.customer}</td>
      <td class="dc-td text-[#7288AE]">${c.date}</td>
      <td class="dc-td text-[#7288AE]">${c.vehicle}</td>
      <td class="dc-td text-center">${c.items}</td>
      <td class="dc-td">${badgeFor(c.status)}</td>
      <td class="dc-td text-center" onclick="event.stopPropagation()">
        <div class="flex items-center justify-center gap-1">
          <button title="View" onclick="DC.openDetails('${c.id}')" class="dc-action-btn text-[#4B5694]"><i class="fas fa-eye"></i></button>
          <button title="Print" onclick="DC.printChallan()" class="dc-action-btn text-[#4B5694]"><i class="fas fa-print"></i></button>
          <button title="Download PDF" onclick="DC.showExportToast()" class="dc-action-btn text-[#4B5694]"><i class="fas fa-download"></i></button>
${c.status === 'Ready To Dispatch' ? `<button title="Dispatch" onclick="DC.openDispatchVerification()" class="dc-action-btn text-indigo-600"><i class="fas fa-truck"></i></button>` : ''}        </div>
      </td>
    </tr>
  `).join('');

  // Inline action button style (tiny)
  document.querySelectorAll('.dc-action-btn').forEach(btn => {
    btn.style.cssText = 'width:26px;height:26px;border-radius:6px;border:1px solid rgba(75,86,148,0.2);background:#FFFCFC;display:inline-flex;align-items:center;justify-content:center;font-size:11px;cursor:pointer;transition:background .1s ease;';
    btn.addEventListener('mouseenter', () => btn.style.background = 'rgba(75,86,148,0.1)');
    btn.addEventListener('mouseleave', () => btn.style.background = '#FFFCFC');
  });
}

/* ─── Filter Logic ───────────────────────────────────────────── */
function applyFilters() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase();
  const status = document.getElementById('filter-status')?.value || '';
  const date   = document.getElementById('filter-date')?.value || '';

  filteredData = CHALLANS.filter(c => {
    const matchSearch = !search || c.id.toLowerCase().includes(search) || c.so.toLowerCase().includes(search) || c.customer.toLowerCase().includes(search);
    const matchStatus = !status || c.status === status;
    // date filter is illustrative
    return matchSearch && matchStatus;
  });
  currentPage = 1;
  renderTable();
}

/* ─── View Switcher ──────────────────────────────────────────── */
function showOnly(viewId) {
  // Hide all overlays first
  document.querySelectorAll('.dc-overlay').forEach(overlay => {
    overlay.classList.remove('active');
  });
  // Show target overlay
  const targetOverlay = document.getElementById(viewId);
  if (targetOverlay) {
    targetOverlay.classList.add('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeOverlay(overlayId) {
  const overlay = document.getElementById(overlayId);
  if (overlay) {
    overlay.classList.remove('active');
  }
  // Show list view after closing
  showOnly('view-list');
  renderTable();
}

/* ─── SO Fill Logic ──────────────────────────────────────────── */
function fillFromSO(val) {
  const data = SO_DATA[val];
  if (!data) {
    // Clear
    ['dp-number','cust-name','cust-contact','cust-mobile','cust-address',
     'disp-warehouse','disp-vehicle','disp-driver','disp-date'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('product-tbody').innerHTML = `
      <tr><td colspan="5" class="py-8 text-center text-[#7288AE]">
        <i class="fas fa-box-open text-2xl mb-2 block"></i>Select a Sales Order to load products
      </td></tr>`;
    document.getElementById('sum-so').textContent = '—';
    document.getElementById('sum-cust').textContent = '—';
    document.getElementById('sum-items').textContent = '—';
    return;
  }
  document.getElementById('dp-number').value    = data.dp;
  document.getElementById('cust-name').value    = data.customer;
  document.getElementById('cust-contact').value = data.contact;
  document.getElementById('cust-mobile').value  = data.mobile;
  document.getElementById('cust-address').value = data.address;
  document.getElementById('disp-warehouse').value = data.warehouse;
  document.getElementById('disp-vehicle').value   = data.vehicle;
  document.getElementById('disp-driver').value    = data.driver;
  document.getElementById('disp-date').value      = data.dispDate;

  document.getElementById('sum-so').textContent   = val;
  document.getElementById('sum-cust').textContent = data.customer;
  document.getElementById('sum-items').textContent = data.products.length + ' products';

  document.getElementById('product-tbody').innerHTML = data.products.map(p => `
    <tr class="hover:bg-[#FAFAFA] transition-colors">
      <td class="dc-td font-medium">${p.name}</td>
      <td class="dc-td text-[#7288AE]">${p.sku}</td>
      <td class="dc-td text-center">${p.ordQty}</td>
      <td class="dc-td text-center">${p.dispQty}</td>
      <td class="dc-td">${p.unit}</td>
    </tr>
  `).join('');
}

/* ─── Detail View Population ─────────────────────────────────── */
function populateDetails(id) {
  const c = CHALLANS.find(x => x.id === id);
  if (!c) return;
  document.getElementById('detail-challan-no').textContent = c.id;
  document.getElementById('d-challan-no').textContent = c.id;
  document.getElementById('d-so').textContent = c.so;
  document.getElementById('d-customer').textContent = c.customer;
  document.getElementById('d-date').textContent = c.date;
  document.getElementById('d-status').innerHTML = badgeFor(c.status);

  const btnDispatch = document.getElementById('btn-dispatch-verify');
  if (btnDispatch) {
    if (c.status === 'Ready To Dispatch') {
      btnDispatch.classList.remove('hidden');
    } else {
      btnDispatch.classList.add('hidden');
    }
  }
}

/* ─── Tab Logic ──────────────────────────────────────────────── */
function initTabs() {
  document.getElementById('detail-tabs')?.querySelectorAll('.dc-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dc-tab').forEach(t => t.classList.remove('dc-tab-active'));
      btn.classList.add('dc-tab-active');
      const tab = btn.dataset.tab;
      ['overview','products','transport','documents','timeline'].forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if (el) el.classList.toggle('hidden', t !== tab);
      });
    });
  });
}

/* ─── Verify Checklist ───────────────────────────────────────── */
function updateVerifyBtn() {
  const all = document.querySelectorAll('#view-verify .dc-check');
  const allChecked = Array.from(all).every(c => c.checked);
  const btn = document.getElementById('btn-verify-dispatch');
  if (!btn) return;
  btn.disabled = !allChecked;
  btn.classList.toggle('opacity-50', !allChecked);
  btn.classList.toggle('cursor-not-allowed', !allChecked);
}

/* ─── Public API (DC namespace) ──────────────────────────────── */
window.DC = {
  // Overlay controls
  closeOverlay(overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.classList.remove('active');
    this.showList();
  },
  
  showList() {
    document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
    document.getElementById('view-list')?.classList.add('active');
    renderTable();
  },
  
  openCreate() {
    document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
    const createOverlay = document.getElementById('overlay-create');
    if (createOverlay) {
      createOverlay.classList.add('active');
      const today = new Date().toISOString().split('T')[0];
      const dateField = document.getElementById('c-date');
      if (dateField) dateField.value = today;
    }
  },
  
  openDetails(id) {
    document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
    const viewOverlay = document.getElementById('overlay-view');
    if (viewOverlay) {
      // Populate data first
      const challan = CHALLANS.find(c => c.id === id);
      if (challan) {
        document.getElementById('ov-challan-no').textContent = challan.id;
        document.getElementById('ov-d-challan').textContent = challan.id;
        document.getElementById('ov-d-so').textContent = challan.so;
        document.getElementById('ov-d-customer').textContent = challan.customer;
        document.getElementById('ov-d-date').textContent = challan.date;
        document.getElementById('ov-d-vehicle').textContent = challan.vehicle;
        document.getElementById('ov-status-badge').innerHTML = badgeFor(challan.status);
        
        // Show/hide dispatch button
        const dispatchBtn = document.getElementById('ov-dispatch-btn');
        if (dispatchBtn) {
          if (challan.status === 'Ready To Dispatch') {
            dispatchBtn.classList.remove('hidden');
          } else {
            dispatchBtn.classList.add('hidden');
          }
        }
      }
      viewOverlay.classList.add('active');
    }
  },
  
  openDispatch() {
    document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
    const dispatchOverlay = document.getElementById('overlay-dispatch');
    if (dispatchOverlay) {
      dispatchOverlay.classList.add('active');
      // Reset checkboxes
      document.querySelectorAll('#overlay-dispatch .dv-check').forEach(cb => cb.checked = false);
      this.updateVerifyBtn();
    }
  },
  
  openExport() {
    this.showExportToast();
  },
  
  openPrint() {
    document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
    const printOverlay = document.getElementById('overlay-print');
    if (printOverlay) {
      // Populate print data
      const challanNo = document.getElementById('ov-challan-no')?.textContent || 'DC-2039';
      const challan = CHALLANS.find(c => c.id === challanNo);
      if (challan) {
        document.getElementById('pr-challan').textContent = challan.id;
        document.getElementById('pr-date').textContent = challan.date;
        document.getElementById('pr-so').textContent = challan.so;
        document.getElementById('pr-cname').textContent = challan.customer;
        document.getElementById('pr-vehicle').textContent = challan.vehicle;
      }
      printOverlay.classList.add('active');
    }
  },
  printChallan() {
  const challanNo = document.getElementById('ov-challan-no')?.textContent;
  if (!challanNo) {
    showToast('No challan selected', 'warn');
    return;
  }
  
  // Open print overlay
  document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
  const printOverlay = document.getElementById('overlay-print');
  if (printOverlay) {
    // Populate print data from current challan
    const challan = CHALLANS.find(c => c.id === challanNo);
    if (challan) {
      document.getElementById('pr-challan').textContent = challan.id;
      document.getElementById('pr-date').textContent = challan.date;
      document.getElementById('pr-so').textContent = challan.so;
      document.getElementById('pr-cname').textContent = challan.customer;
      
      // Get SO data for more details
      const soData = SO_DATA[challan.so];
      if (soData) {
        document.getElementById('pr-contact').textContent = soData.contact || '';
        document.getElementById('pr-mobile').textContent = soData.mobile || '';
        document.getElementById('pr-address').textContent = soData.address || '';
        document.getElementById('pr-vehicle').textContent = soData.vehicle || challan.vehicle;
        document.getElementById('pr-driver').textContent = soData.driver || '';
        document.getElementById('pr-warehouse').textContent = soData.warehouse || '';
        document.getElementById('pr-dispdate').textContent = soData.dispDate || challan.date;
        
        // Populate products table
        const tbody = document.getElementById('pr-products');
        if (tbody && soData.products) {
          tbody.innerHTML = soData.products.map((p, idx) => `
            <tr class="border-b border-[#4B5694]/10">
              <td class="px-3 py-2">${idx + 1}</td>
              <td class="px-3 py-2">${p.name}</td>
              <td class="px-3 py-2">${p.sku}</td>
              <td class="px-3 py-2 text-center">${p.dispQty || p.ordQty}</td>
              <td class="px-3 py-2">${p.unit}</td>
            </tr>
          `).join('');
        }
      }
    }
    printOverlay.classList.add('active');
  }
},
  downloadPDF() {
  const challanNo = document.getElementById('ov-challan-no')?.textContent;
  if (!challanNo) {
    showToast('No challan selected', 'warn');
    return;
  }
  
  // Get print content
  const printContent = document.getElementById('print-doc');
  if (!printContent) {
    showToast('Print content not found', 'error');
    return;
  }
  
  // Clone the print content to avoid modifying original
  const clone = printContent.cloneNode(true);
  clone.style.padding = '20px';
  clone.style.margin = '0';
  clone.style.width = '100%';
  
  // Create a temporary div for PDF generation
  const tempDiv = document.createElement('div');
  tempDiv.appendChild(clone);
  document.body.appendChild(tempDiv);
  
  // Use html2pdf if available, otherwise fallback to print
  if (typeof html2pdf !== 'undefined') {
    html2pdf().set({
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${challanNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }).from(clone).save().then(() => {
      document.body.removeChild(tempDiv);
      showToast('PDF downloaded successfully!', 'success');
    }).catch(() => {
      document.body.removeChild(tempDiv);
      showToast('PDF download failed', 'error');
    });
  } else {
    // Fallback - just show toast
    document.body.removeChild(tempDiv);
    showToast('PDF download - feature coming soon', 'info');
  }
},
  
  filterTable() { applyFilters(); },
  
  clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-status').value = '';
    document.getElementById('filter-date').value = '';
    filteredData = [...CHALLANS];
    currentPage = 1;
    renderTable();
  },
  
  prevPage() {
    const total = Math.ceil(filteredData.length / PAGE_SIZE);
    if (currentPage > 1) { currentPage--; renderTable(); }
  },
  
  nextPage() {
    const total = Math.ceil(filteredData.length / PAGE_SIZE);
    if (currentPage < total) { currentPage++; renderTable(); }
  },
  
  fillFromSO(val) {
    const data = SO_DATA[val];
    if (!data) return;
    document.getElementById('c-dp').value = data.dp || '';
    document.getElementById('c-cname').value = data.customer || '';
    document.getElementById('c-contact').value = data.contact || '';
    document.getElementById('c-mobile').value = data.mobile || '';
    document.getElementById('c-address').value = data.address || '';
    document.getElementById('c-warehouse').value = data.warehouse || '';
    document.getElementById('c-vehicle').value = data.vehicle || '';
    document.getElementById('c-driver').value = data.driver || '';
    document.getElementById('c-dispdate').value = data.dispDate || '';
    
    document.getElementById('sum-so').textContent = val;
    document.getElementById('sum-cust').textContent = data.customer || '—';
    document.getElementById('sum-items').textContent = (data.products?.length || 0) + ' products';
    
    const tbody = document.getElementById('c-product-tbody');
    if (tbody && data.products) {
      tbody.innerHTML = data.products.map(p => `
        <tr>
          <td class="dc-td font-medium">${p.name}</td>
          <td class="dc-td text-[#7288AE]">${p.sku}</td>
          <td class="dc-td text-center">${p.ordQty}</td>
          <td class="dc-td text-center">${p.dispQty}</td>
          <td class="dc-td">${p.unit}</td>
        </tr>
      `).join('');
    }
  },
  
  saveDraft() {
    showToast('Challan saved as draft.', 'info');
    this.closeOverlay('overlay-create');
  },
  
  generateChallan() {
  const so = document.getElementById('c-so')?.value;
  if (!so) { 
    showToast('Please select a Sales Order first.', 'warn'); 
    return; 
  }
  showToast('Challan generated successfully!', 'success');
  DC.closeOverlay('overlay-create');
  DC.showList();
},
  
  showExportToast() {
    showToast('PDF downloaded successfully.', 'success');
  },
  
  updateVerifyBtn() {
    const all = document.querySelectorAll('#overlay-dispatch .dv-check');
    const allChecked = all.length > 0 && Array.from(all).every(cb => cb.checked);
    const btn = document.getElementById('btn-confirm-dispatch');
    if (btn) {
      btn.disabled = !allChecked;
      if (allChecked) {
        btn.classList.remove('opacity-50', 'cursor-not-allowed');
      } else {
        btn.classList.add('opacity-50', 'cursor-not-allowed');
      }
    }
    const checkedCount = Array.from(all).filter(cb => cb.checked).length;
    const countSpan = document.getElementById('dv-count');
    if (countSpan) countSpan.textContent = `${checkedCount}/${all.length}`;
    const bar = document.getElementById('dv-bar');
    if (bar) bar.style.width = `${(checkedCount / all.length) * 100}%`;
  },
  
  confirmDispatch() {
    showToast('Goods dispatched! Shipment tracking started.', 'success');
    this.closeOverlay('overlay-dispatch');
    this.showList();
  },
  
  rejectDispatch() {
    showToast('Dispatch rejected. Challan returned to warehouse.', 'error');
    this.closeOverlay('overlay-dispatch');
  }
  ,
  openDispatchVerification(challanId) {
  const overlay = document.getElementById('overlay-dispatch');
  if (overlay) {
    // Reset checkboxes
    document.querySelectorAll('#overlay-dispatch .dv-check').forEach(cb => cb.checked = false);
    if (typeof DC.updateVerifyBtn === 'function') DC.updateVerifyBtn();
    overlay.classList.add('active');
    showToast('Verify all items before dispatching', 'info');
  } else {
    showToast('Dispatch feature coming soon', 'info');
  }
}
};


/* ─── Sidebar Logic (mirrors dashboard) ─────────────────────── */
(function initSidebar() {
  let isCollapsed = false;
  const sidebar   = document.getElementById('sidebar');
  const mainWrap  = document.getElementById('main-wrapper');
  const toggle    = document.getElementById('sidebar-toggle');
  const overlay   = document.getElementById('sidebar-overlay');

  toggle?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      sidebar.classList.toggle('sidebar-open');
      overlay?.classList.toggle('hidden');
    } else {
      isCollapsed = !isCollapsed;
      sidebar.classList.toggle('sidebar-collapsed', isCollapsed);
      mainWrap.style.marginLeft = isCollapsed ? '68px' : '';
      const icon = toggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-chevron-left',  !isCollapsed);
        icon.classList.toggle('fa-chevron-right',  isCollapsed);
      }
    }
  });

  overlay?.addEventListener('click', () => {
    sidebar?.classList.remove('sidebar-open');
    overlay.classList.add('hidden');
  });

  // Dropdown groups
  document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function () {
      const items   = this.nextElementSibling;
      const chevron = this.querySelector('.fa-chevron-down');
      items?.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items?.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
})();

/* ─── Header dropdowns ───────────────────────────────────────── */
(function initHeader() {
  const userBtn   = document.getElementById('user-menu-btn');
  const userMenu  = document.getElementById('user-menu');
  const notifBtn  = document.getElementById('notif-btn');
  const notifMenu = document.getElementById('notif-menu');

  userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
  notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
  document.addEventListener('click', () => { userMenu?.classList.add('hidden'); notifMenu?.classList.add('hidden'); });
})();

/* ─── Init ───────────────────────────────────────────────────── */
(function init() {
  renderTable();
  initTabs();
})();

// Close overlays when clicking on backdrop
document.querySelectorAll('.dc-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) {
      this.classList.remove('active');
      DC.showList();
    }
  });
});