/* ===== deliveryc.js ===== */
'use strict';

/* ─── Mock Data ─────────────────────────────────────────────── */
const CHALLANS = [
  { id: 'DC-2039', so: 'SO-3185', customer: 'Ramesh Traders',    date: '12 Jun 2025', vehicle: 'MH12-AB-1234', items: 3, status: 'Delivered',         dp: 'DP-1042', contact: 'Ramesh Kumar',  mobile: '+91 98765 43210', address: 'B-12, MIDC Bhosari, Pune 411026',           warehouse: 'Warehouse A', driver: 'Suresh Patil',   products: [{name:'Steel Pipes (25mm)',sku:'SKU-1041',qty:20,unit:'Pcs'},{name:'Hydraulic Hoses',sku:'SKU-3021',qty:5,unit:'Mtrs'},{name:'Safety Gloves (XL)',sku:'SKU-7021',qty:30,unit:'Pairs'}] },
  { id: 'DC-2040', so: 'SO-3186', customer: 'Patel Industries',  date: '13 Jun 2025', vehicle: 'MH14-CD-5678', items: 5, status: 'Dispatched',        dp: 'DP-1043', contact: 'Nilesh Patel',  mobile: '+91 98765 11223', address: 'A-5, Bhosari Industrial Zone, Pune 411026',  warehouse: 'Warehouse A', driver: 'Vinod Shinde',  products: [{name:'Steel Pipes (25mm)',sku:'SKU-1041',qty:100,unit:'Pcs'},{name:'Hydraulic Hoses',sku:'SKU-3021',qty:20,unit:'Mtrs'},{name:'Motor Coupling Set',sku:'SKU-5033',qty:5,unit:'Sets'},{name:'Conveyor Belt Roll',sku:'SKU-6010',qty:2,unit:'Roll'},{name:'Safety Gloves (XL)',sku:'SKU-7021',qty:50,unit:'Pairs'}] },
  { id: 'DC-2041', so: 'SO-3187', customer: 'Kumar Steel Works', date: '14 Jun 2025', vehicle: 'MH12-EF-9012', items: 2, status: 'Ready To Dispatch', dp: 'DP-1044', contact: 'Anil Kumar',   mobile: '+91 99887 76655', address: 'Plot C-8, Chakan Industrial Area, Pune 410501', warehouse: 'Warehouse B', driver: 'Ramesh Jadhav', products: [{name:'Aluminium Sheets (4mm)',sku:'SKU-4011',qty:30,unit:'Sheets'},{name:'Industrial Bearings',sku:'SKU-2083',qty:15,unit:'Pcs'}] },
  { id: 'DC-2042', so: 'SO-3188', customer: 'Sharma Fab',        date: '14 Jun 2025', vehicle: '—',            items: 4, status: 'Draft',             dp: 'DP-1045', contact: 'Raj Sharma',   mobile: '+91 91234 56789', address: 'F-7, Ranjangaon MIDC, Pune 412220',          warehouse: 'Warehouse C', driver: '—',             products: [{name:'Steel Sheets',sku:'SKU-1090',qty:40,unit:'Pcs'},{name:'Nuts & Bolts Set',sku:'SKU-2200',qty:100,unit:'Sets'},{name:'Drill Bits (12mm)',sku:'SKU-3300',qty:20,unit:'Pcs'},{name:'Safety Helmets',sku:'SKU-7050',qty:25,unit:'Pcs'}] },
  { id: 'DC-2043', so: 'SO-3189', customer: 'Singh & Sons',      date: '15 Jun 2025', vehicle: 'MH04-GH-3456', items: 6, status: 'Generated',         dp: 'DP-1046', contact: 'Gurpreet Singh',mobile: '+91 93456 78901', address: '22, Talegaon Industrial Belt, Pune 410507',   warehouse: 'Warehouse B', driver: 'Mahesh More',   products: [{name:'Copper Wires (6mm)',sku:'SKU-5010',qty:50,unit:'Rolls'},{name:'PVC Pipes',sku:'SKU-5020',qty:80,unit:'Pcs'},{name:'Electric Motors',sku:'SKU-5030',qty:5,unit:'Pcs'},{name:'Cable Trays',sku:'SKU-5040',qty:10,unit:'Pcs'},{name:'Junction Boxes',sku:'SKU-5050',qty:15,unit:'Pcs'},{name:'Wire Mesh',sku:'SKU-5060',qty:20,unit:'Rolls'}] },
  { id: 'DC-2044', so: 'SO-3190', customer: 'Mehta Logistics',   date: '15 Jun 2025', vehicle: '—',            items: 1, status: 'Cancelled',         dp: 'DP-1047', contact: 'Suresh Mehta', mobile: '+91 97654 32109', address: '12-B, Hadapsar, Pune 411028',                warehouse: 'Warehouse C', driver: '—',             products: [{name:'Packaging Cartons (L)',sku:'SKU-8014',qty:200,unit:'Pcs'}] },
  { id: 'DC-2045', so: 'SO-3191', customer: 'Joshi Enterprises', date: '15 Jun 2025', vehicle: 'MH12-IJ-7890', items: 3, status: 'Dispatched',        dp: 'DP-1048', contact: 'Priya Joshi',  mobile: '+91 96543 21098', address: '45, Kothrud Industrial Area, Pune 411038',    warehouse: 'Warehouse A', driver: 'Santosh Kale',  products: [{name:'Gear Box Units',sku:'SKU-6100',qty:8,unit:'Pcs'},{name:'Shaft Couplings',sku:'SKU-6200',qty:12,unit:'Pcs'},{name:'Bearing Housing',sku:'SKU-6300',qty:10,unit:'Pcs'}] },
  { id: 'DC-2046', so: 'SO-3192', customer: 'Desai & Co.',       date: '15 Jun 2025', vehicle: '—',            items: 2, status: 'Draft',             dp: 'DP-1049', contact: 'Kiran Desai',  mobile: '+91 95432 10987', address: '8, Wakad Business Park, Pune 411057',        warehouse: 'Warehouse B', driver: '—',             products: [{name:'Plastic Granules',sku:'SKU-9010',qty:500,unit:'Kg'},{name:'Mould Release Spray',sku:'SKU-9020',qty:24,unit:'Cans'}] },
];

const SO_DATA = {
  'SO-3187': {
    dp: 'DP-1043', customer: 'Kumar Steel Works', contact: 'Anil Kumar', mobile: '+91 99887 76655',
    address: 'Plot C-8, Chakan Industrial Area, Pune 410501',
    warehouse: 'Warehouse B — Chakan', vehicle: 'MH12-EF-9012', driver: 'Ramesh Jadhav', dispDate: '14 Jun 2025',
    products: [
      { name: 'Aluminium Sheets (4mm)', sku: 'SKU-4011', ordQty: 30, dispQty: 30, unit: 'Sheets' },
      { name: 'Industrial Bearings',    sku: 'SKU-2083', ordQty: 15, dispQty: 15, unit: 'Pcs'    },
    ]
  },
  'SO-3188': {
    dp: 'DP-1044', customer: 'Patel Industries', contact: 'Nilesh Patel', mobile: '+91 98765 11223',
    address: 'A-5, Bhosari Industrial Zone, Pune 411026',
    warehouse: 'Warehouse A — Bhosari', vehicle: 'MH14-CD-5678', driver: 'Vinod Shinde', dispDate: '13 Jun 2025',
    products: [
      { name: 'Steel Pipes (25mm)',  sku: 'SKU-1041', ordQty: 100, dispQty: 100, unit: 'Pcs'   },
      { name: 'Hydraulic Hoses',     sku: 'SKU-3021', ordQty: 20,  dispQty: 20,  unit: 'Mtrs'  },
      { name: 'Motor Coupling Set',  sku: 'SKU-5033', ordQty: 5,   dispQty: 5,   unit: 'Sets'  },
      { name: 'Conveyor Belt Roll',  sku: 'SKU-6010', ordQty: 2,   dispQty: 2,   unit: 'Roll'  },
      { name: 'Safety Gloves (XL)',  sku: 'SKU-7021', ordQty: 50,  dispQty: 50,  unit: 'Pairs' },
    ]
  },
  'SO-3190': {
    dp: 'DP-1045', customer: 'Mehta Logistics', contact: 'Suresh Mehta', mobile: '+91 97654 32109',
    address: '12-B, Hadapsar, Pune 411028',
    warehouse: 'Warehouse C — Hadapsar', vehicle: '—', driver: '—', dispDate: '15 Jun 2025',
    products: [
      { name: 'Packaging Cartons (L)', sku: 'SKU-8014', ordQty: 200, dispQty: 200, unit: 'Pcs' },
    ]
  },
};

/* ─── Pagination State ─────────────────────────────────────── */
let currentPage  = 1;
const PAGE_SIZE  = 8;
let filteredData = [...CHALLANS];
let currentViewId = null; // track which challan is currently open in view

/* ─── Badge Helper ─────────────────────────────────────────── */
function badgeFor(status) {
  const map = {
    'Draft'            : 'dc-badge-draft',
    'Generated'        : 'dc-badge-generated',
    'Ready To Dispatch': 'dc-badge-ready',
    'Dispatched'       : 'dc-badge-dispatched',
    'Delivered'        : 'dc-badge-delivered',
    'Cancelled'        : 'dc-badge-cancelled',
  };
  return `<span class="dc-badge ${map[status] || 'dc-badge-draft'}">${status}</span>`;
}

/* ─── Toast ────────────────────────────────────────────────── */
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const colors = { success:'bg-emerald-600', error:'bg-red-600', info:'bg-[#111844]', warn:'bg-amber-500' };
  const icons  = { success:'fa-circle-check', error:'fa-circle-xmark', info:'fa-info-circle', warn:'fa-triangle-exclamation' };
  const el = document.createElement('div');
  el.className = `toast-animate flex items-center gap-3 ${colors[type]||colors.info} text-white text-xs font-medium px-4 py-3 rounded-xl shadow-lg min-w-[240px]`;
  el.innerHTML = `<i class="fas ${icons[type]||icons.info}"></i><span>${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),300); }, 3000);
}

/* ─── KPI Update ───────────────────────────────────────────── */
function updateKPIs() {
  document.getElementById('kpi-total').textContent     = CHALLANS.length;
  document.getElementById('kpi-ready').textContent     = CHALLANS.filter(c=>c.status==='Ready To Dispatch').length;
  document.getElementById('kpi-dispatched').textContent= CHALLANS.filter(c=>c.status==='Dispatched').length;
  document.getElementById('kpi-delivered').textContent = CHALLANS.filter(c=>c.status==='Delivered').length;
}

/* ─── Table Rendering ──────────────────────────────────────── */
function renderTable() {
  const tbody       = document.getElementById('challan-tbody');
  const empty       = document.getElementById('empty-state');
  const info        = document.getElementById('pagination-info');
  const pageDisplay = document.getElementById('page-display');

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const start = (currentPage - 1) * PAGE_SIZE;
  const slice = filteredData.slice(start, start + PAGE_SIZE);

  if (slice.length === 0) {
    tbody.innerHTML = '';
    empty.classList.remove('hidden');
    info.textContent = 'No challans found';
    pageDisplay.textContent = '1';
    updatePaginationBtns(1, 1);
    return;
  }
  empty.classList.add('hidden');
  info.textContent = `Showing ${start+1}–${start+slice.length} of ${filteredData.length} challans`;
  pageDisplay.textContent = `${currentPage} / ${totalPages}`;
  updatePaginationBtns(currentPage, totalPages);

  tbody.innerHTML = slice.map(c => `
    <tr class="hover:bg-[#FAFAFA]/80 transition-colors cursor-pointer" onclick="DC.openDetails('${c.id}')">
      <td class="dc-td font-semibold text-[#111844]">${c.id}</td>
      <td class="dc-td text-[#4B5694]">${c.so}</td>
      <td class="dc-td font-medium">${c.customer}</td>
      <td class="dc-td text-[#7288AE]">${c.date}</td>
      <td class="dc-td text-[#7288AE]">${c.vehicle}</td>
      <td class="dc-td text-center font-medium">${c.items}</td>
      <td class="dc-td">${badgeFor(c.status)}</td>
      <td class="dc-td text-center" onclick="event.stopPropagation()">
        <div class="flex items-center justify-center gap-1">
          <button title="View" onclick="DC.openDetails('${c.id}')" class="dc-action-btn text-[#4B5694]"><i class="fas fa-eye"></i></button>
          <button title="Print" onclick="DC.printChallanById('${c.id}')" class="dc-action-btn text-[#4B5694]"><i class="fas fa-print"></i></button>
          <button title="Download PDF" onclick="DC.downloadPDFById('${c.id}')" class="dc-action-btn text-[#4B5694]"><i class="fas fa-download"></i></button>
          ${c.status==='Ready To Dispatch'?`<button title="Dispatch" onclick="DC.openDispatchById('${c.id}')" class="dc-action-btn text-indigo-600"><i class="fas fa-truck"></i></button>`:''}
        </div>
      </td>
    </tr>
  `).join('');
}

function updatePaginationBtns(page, total) {
  // Use more specific selectors that target the actual buttons
  const prevBtn = document.querySelector('.dc-page-btn:first-child');
  const nextBtn = document.querySelector('.dc-page-btn:last-child');
  
  if (prevBtn) {
    prevBtn.disabled = page <= 1;
    prevBtn.style.opacity = page <= 1 ? '0.4' : '1';
    prevBtn.style.cursor = page <= 1 ? 'default' : 'pointer';
  }
  if (nextBtn) {
    nextBtn.disabled = page >= total;
    nextBtn.style.opacity = page >= total ? '0.4' : '1';
    nextBtn.style.cursor = page >= total ? 'default' : 'pointer';
  }
}

/* ─── Filter Logic ─────────────────────────────────────────── */
function applyFilters() {
  const search = (document.getElementById('search-input')?.value || '').toLowerCase().trim();
  const status = document.getElementById('filter-status')?.value || '';
  const dateVal= document.getElementById('filter-date')?.value || '';

  filteredData = CHALLANS.filter(c => {
    const matchSearch = !search ||
      c.id.toLowerCase().includes(search) ||
      c.so.toLowerCase().includes(search) ||
      c.customer.toLowerCase().includes(search) ||
      c.vehicle.toLowerCase().includes(search);
    const matchStatus = !status || c.status === status;
    let matchDate = true;
    if (dateVal) {
      const d = new Date(dateVal);
      const formatted = d.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(',','');
      matchDate = c.date === formatted;
    }
    return matchSearch && matchStatus && matchDate;
  });
  currentPage = 1;
  renderTable();
}
/* ─── Populate View Overlay ────────────────────────────────── */
function populateViewOverlay(id) {
  const c = CHALLANS.find(x => x.id === id);
  if (!c) return;
  currentViewId = id;

  // Header strip
  document.getElementById('ov-challan-no').textContent  = c.id;
  document.getElementById('ov-d-challan').textContent   = c.id;
  document.getElementById('ov-d-so').textContent        = c.so;
  document.getElementById('ov-d-customer').textContent  = c.customer;
  document.getElementById('ov-d-date').textContent      = c.date;
  document.getElementById('ov-d-vehicle').textContent   = c.vehicle;
  document.getElementById('ov-status-badge').innerHTML  = badgeFor(c.status);

  // Overview — customer info
  document.getElementById('ov-cname').textContent   = c.customer;
  document.getElementById('ov-contact').textContent = c.contact   || '—';
  document.getElementById('ov-mobile').textContent  = c.mobile    || '—';
  document.getElementById('ov-address').textContent = c.address   || '—';

  // Overview — challan info
  document.getElementById('ov-i-challan').textContent = c.id;
  document.getElementById('ov-i-date').textContent    = c.date;
  document.getElementById('ov-i-so').textContent      = c.so;
  document.getElementById('ov-i-dp').textContent      = c.dp || '—';

  // Products tab
  const prodTbody = document.getElementById('ov-prod-tbody');
  if (prodTbody && c.products) {
    prodTbody.innerHTML = c.products.map(p => `
      <tr class="hover:bg-[#FAFAFA] transition-colors">
        <td class="dc-td font-medium">${p.name}</td>
        <td class="dc-td text-[#7288AE]">${p.sku}</td>
        <td class="dc-td text-center font-semibold">${p.qty}</td>
        <td class="dc-td">${p.unit}</td>
      </tr>
    `).join('');
  }

  // Transport tab
  document.getElementById('ov-t-vehicle').textContent   = c.vehicle    || '—';
  document.getElementById('ov-t-driver').textContent    = c.driver     || '—';
  document.getElementById('ov-t-warehouse').textContent = c.warehouse  || '—';
  document.getElementById('ov-t-date').textContent      = c.date       || '—';

  // Timeline
  const timelineEl = document.getElementById('ov-timeline');
  if (timelineEl) {
    const steps = buildTimeline(c.status);
    timelineEl.innerHTML = steps.map((s,i) => `
      <div class="dc-timeline-item${i===steps.length-1?' last':''}">
        <div class="dc-timeline-dot" style="background:${s.color}"></div>
        <div>
          <div class="text-xs font-semibold text-[#111844]">${s.label}</div>
          <div class="text-[10px] text-[#7288AE] mt-0.5">${s.time}</div>
        </div>
      </div>
    `).join('');
  }

  // Dispatch button visibility
  const dispBtn = document.getElementById('ov-dispatch-btn');
  if (dispBtn) {
    dispBtn.classList.toggle('hidden', c.status !== 'Ready To Dispatch');
  }

  // Reset to overview tab
  switchViewTab('vt-overview');
}

function buildTimeline(status) {
  const all = [
    { label:'Draft Created',         color:'#4B5694', time:'Auto-generated from Sales Order' },
    { label:'Challan Generated',     color:'#4338ca', time:'Reviewed and confirmed' },
    { label:'Ready To Dispatch',     color:'#b45309', time:'Packing verified' },
    { label:'Dispatched',            color:'#1d4ed8', time:'Vehicle assigned & goods loaded' },
    { label:'Delivered',             color:'#047857', time:'Receiver signature collected' },
  ];
  const order = ['Draft','Generated','Ready To Dispatch','Dispatched','Delivered'];
  const idx = order.indexOf(status);
  return all.slice(0, idx === -1 ? 1 : idx+1);
}

/* ─── Tab Switching (View Overlay) ─────────────────────────── */
function switchViewTab(targetTab) {
  const tabs    = ['vt-overview','vt-products','vt-transport','vt-timeline'];
  const tabBtns = document.querySelectorAll('#view-tabs .dc-tab');
  tabs.forEach(t => {
    const el = document.getElementById(t);
    if (el) el.classList.toggle('hidden', t !== targetTab);
  });
  tabBtns.forEach(btn => {
    btn.classList.toggle('dc-tab-active', btn.dataset.tab === targetTab);
  });
}

/* ─── Print / PDF Helpers ──────────────────────────────────── */
function populatePrintDoc(id) {
  const c = CHALLANS.find(x => x.id === id);
  if (!c) return;
  document.getElementById('pr-challan').textContent  = c.id;
  document.getElementById('pr-date').textContent     = c.date;
  document.getElementById('pr-so').textContent       = c.so;
  document.getElementById('pr-cname').textContent    = c.customer;
  document.getElementById('pr-contact').textContent  = c.contact   || '—';
  document.getElementById('pr-mobile').textContent   = c.mobile    || '—';
  document.getElementById('pr-address').textContent  = c.address   || '—';
  document.getElementById('pr-vehicle').textContent  = c.vehicle   || '—';
  document.getElementById('pr-driver').textContent   = c.driver    || '—';
  document.getElementById('pr-warehouse').textContent= c.warehouse || '—';
  document.getElementById('pr-dispdate').textContent = c.date;

  const prodsTbody = document.getElementById('pr-products');
  if (prodsTbody && c.products) {
    prodsTbody.innerHTML = c.products.map((p,i) => `
      <tr class="border-b border-[#4B5694]/10">
        <td class="px-3 py-2">${i+1}</td>
        <td class="px-3 py-2">${p.name}</td>
        <td class="px-3 py-2">${p.sku}</td>
        <td class="px-3 py-2 text-center">${p.qty}</td>
        <td class="px-3 py-2">${p.unit}</td>
      </tr>
    `).join('');
  }
}

function generateAndDownloadPDF(id) {
  populatePrintDoc(id);
  const { jsPDF } = window.jspdf;
  if (!jsPDF) { showToast('PDF library not loaded', 'error'); return; }

  const doc = new jsPDF({ unit:'mm', format:'a4', orientation:'portrait' });
  const c   = CHALLANS.find(x => x.id === id);
  if (!c) return;

  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;

  // Header
  doc.setFillColor(17, 24, 68);
  doc.rect(0, 0, pageW, 28, 'F');
  doc.setTextColor(255,255,255);
  doc.setFontSize(14); doc.setFont('helvetica','bold');
  doc.text('DELIVERY CHALLAN', margin, 12);
  doc.setFontSize(8); doc.setFont('helvetica','normal');
  doc.text('SupplyManager Pvt. Ltd.  |  GSTIN: 27AABCS1429B1ZX', margin, 19);
  doc.text(`Challan No: ${c.id}   |   Date: ${c.date}   |   SO: ${c.so}`, margin, 25);

  // Customer & Transport boxes
  doc.setTextColor(17,24,68);
  doc.setFontSize(8); doc.setFont('helvetica','bold');
  doc.text('SHIP TO', margin, 38);
  doc.setFont('helvetica','normal');
  doc.text(c.customer,          margin, 44);
  doc.text(c.contact   || '—',  margin, 49);
  doc.text(c.mobile    || '—',  margin, 54);
  doc.setFontSize(7);
  doc.text(c.address   || '—',  margin, 59, {maxWidth: 80});

  const col2 = pageW/2 + 5;
  doc.setFontSize(8); doc.setFont('helvetica','bold');
  doc.text('TRANSPORT', col2, 38);
  doc.setFont('helvetica','normal');
  doc.text(`Vehicle : ${c.vehicle   || '—'}`, col2, 44);
  doc.text(`Driver  : ${c.driver    || '—'}`, col2, 49);
  doc.text(`WH      : ${c.warehouse || '—'}`, col2, 54);

  // Products table
  doc.autoTable({
    startY: 70,
    head: [['#','Product','SKU','Qty','Unit']],
    body: (c.products||[]).map((p,i)=>[i+1, p.name, p.sku, p.qty, p.unit]),
    headStyles: { fillColor:[17,24,68], textColor:255, fontSize:8, fontStyle:'bold' },
    bodyStyles: { fontSize:8, textColor:[17,24,68] },
    alternateRowStyles: { fillColor:[245,245,255] },
    margin: { left:margin, right:margin },
  });

  const finalY = doc.lastAutoTable.finalY + 20;
  const sigBoxW = (pageW - margin*2 - 10) / 2;

  // Signature boxes
  doc.setDrawColor(17,24,68);
  doc.rect(margin, finalY, sigBoxW, 20);
  doc.rect(margin + sigBoxW + 10, finalY, sigBoxW, 20);
  doc.setFontSize(7); doc.setFont('helvetica','normal'); doc.setTextColor(100,100,130);
  doc.text('Authorized Signatory', margin + sigBoxW/2, finalY+24, {align:'center'});
  doc.text('Receiver\'s Signature & Stamp', margin + sigBoxW + 10 + sigBoxW/2, finalY+24, {align:'center'});

  // Footer
  doc.setFontSize(7); doc.setTextColor(150,150,170);
  doc.text('This is a computer-generated delivery challan.', pageW/2, doc.internal.pageSize.getHeight()-8, {align:'center'});

  doc.save(`${c.id}.pdf`);
  showToast(`${c.id}.pdf downloaded!`, 'success');
}

/* ─── Dispatch Populate ────────────────────────────────────── */
function populateDispatchOverlay(id) {
  const c = CHALLANS.find(x => x.id === id);
  if (!c) return;
  document.getElementById('dv-challan-ref').textContent = c.id;
  document.getElementById('dv-c-challan').textContent   = c.id;
  document.getElementById('dv-c-cust').textContent      = c.customer;
  document.getElementById('dv-c-addr').textContent      = c.address || '—';
  document.getElementById('dv-c-veh').textContent       = c.vehicle || '—';
  document.getElementById('dv-c-drv').textContent       = c.driver  || '—';
  document.getElementById('dv-c-items').textContent     = `${c.items} product${c.items!==1?'s':''}`;
}

/* ─── Overlay open/close ───────────────────────────────────── */
function openOverlay(id) {
  document.getElementById(id)?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeAllOverlays() {
  document.querySelectorAll('.dc-overlay').forEach(o => o.classList.remove('active'));
  document.body.style.overflow = '';
}

/* ─── Public API ───────────────────────────────────────────── */
window.DC = {
  openCreate() {
  closeAllOverlays();
  // Reset form
  const soSel = document.getElementById('c-so');
  if (soSel) soSel.value = '';
  DC.fillFromSO('');
  const today = new Date().toISOString().split('T')[0];
  const dateField = document.getElementById('c-date');
  if (dateField) dateField.value = today;
  
  // Also set dispatch date to today by default
  const dispDateField = document.getElementById('c-dispdate');
  if (dispDateField) dispDateField.value = today;
  
  openOverlay('overlay-create');
},

  closeOverlay(id) {
    document.getElementById(id)?.classList.remove('active');
    if (!document.querySelector('.dc-overlay.active')) document.body.style.overflow = '';
  },

  openDetails(id) {
    closeAllOverlays();
    populateViewOverlay(id);
    openOverlay('overlay-view');
  },

  openPrint() {
    const id = currentViewId;
    if (!id) { showToast('No challan selected', 'warn'); return; }
    closeAllOverlays();
    populatePrintDoc(id);
    openOverlay('overlay-print');
  },

  printChallanById(id) {
    populatePrintDoc(id);
    openOverlay('overlay-print');
  },

  downloadPDF() {
    const id = currentViewId || document.getElementById('ov-challan-no')?.textContent;
    if (!id) { showToast('No challan selected', 'warn'); return; }
    generateAndDownloadPDF(id);
  },

  downloadPDFById(id) {
    generateAndDownloadPDF(id);
  },

  openDispatch() {
    const id = currentViewId;
    if (!id) return;
    closeAllOverlays();
    populateDispatchOverlay(id);
    document.querySelectorAll('#overlay-dispatch .dv-check').forEach(cb => cb.checked = false);
    DC.updateVerifyBtn();
    openOverlay('overlay-dispatch');
  },

  openDispatchById(id) {
    closeAllOverlays();
    currentViewId = id;
    populateDispatchOverlay(id);
    document.querySelectorAll('#overlay-dispatch .dv-check').forEach(cb => cb.checked = false);
    DC.updateVerifyBtn();
    openOverlay('overlay-dispatch');
  },

  openExport() {
    if (currentViewId) {
      generateAndDownloadPDF(currentViewId);
    } else {
      showToast('Export started — generating report PDF…', 'info');
      setTimeout(() => showToast('Report exported successfully!', 'success'), 1500);
    }
  },

  fillFromSO(val) {
  const data = SO_DATA[val];
  const fields = {
    'c-dp':data?.dp||'','c-cname':data?.customer||'','c-contact':data?.contact||'',
    'c-mobile':data?.mobile||'','c-address':data?.address||'','c-warehouse':data?.warehouse||'',
    'c-vehicle':data?.vehicle||'','c-driver':data?.driver||'','c-dispdate':data?.dispDate||''
  };
  Object.entries(fields).forEach(([id,v])=>{const el=document.getElementById(id);if(el)el.value=v;});

  document.getElementById('sum-so').textContent    = val || '—';
  document.getElementById('sum-cust').textContent  = data?.customer || '—';
  document.getElementById('sum-items').textContent = data ? data.products.length+' products' : '—';

  const tbody = document.getElementById('c-product-tbody');
  if (tbody) {
    if (!data) {
      tbody.innerHTML = `<tr><td colspan="5" class="py-8 text-center text-[#7288AE]"><i class="fas fa-box-open text-2xl mb-2 block"></i>Select a Sales Order to load products</td></tr>`;
    } else {
      tbody.innerHTML = data.products.map(p => `
        <tr class="hover:bg-[#FAFAFA] transition-colors">
          <td class="dc-td font-medium">${p.name}</td>
          <td class="dc-td text-[#7288AE]">${p.sku}</td>
          <td class="dc-td text-center">${p.ordQty}</td>
          <td class="dc-td text-center">${p.dispQty}</td>
          <td class="dc-td">${p.unit}</td>
        </tr>
      `).join('');
    }
  }
},

  generateChallan() {
  const so = document.getElementById('c-so')?.value;
  if (!so) { showToast('Please select a Sales Order first.', 'warn'); return; }
  const date = document.getElementById('c-date')?.value;
  if (!date) { showToast('Please set a challan date.', 'warn'); return; }
  
  // Get the SO data
  const soData = SO_DATA[so];
  if (!soData) { showToast('Sales Order data not found.', 'error'); return; }
  
  // Get customer info from the form (or from SO data)
  const customerName = document.getElementById('c-cname')?.value || soData.customer || '—';
  const contact = document.getElementById('c-contact')?.value || soData.contact || '—';
  const mobile = document.getElementById('c-mobile')?.value || soData.mobile || '—';
  const address = document.getElementById('c-address')?.value || soData.address || '—';
  const warehouse = document.getElementById('c-warehouse')?.value || soData.warehouse || '—';
  const vehicle = document.getElementById('c-vehicle')?.value || soData.vehicle || '—';
  const driver = document.getElementById('c-driver')?.value || soData.driver || '—';
  const dispDate = document.getElementById('c-dispdate')?.value || date;
  
  // Format date for display
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(',','');
  
  // Format dispatch date
  const dispDateObj = new Date(dispDate);
  const formattedDispDate = dispDateObj.toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}).replace(',','');
  
  // Get products from SO data
  const products = soData.products || [];
  
  // Generate new challan ID
  const lastChallan = CHALLANS.length > 0 ? CHALLANS[CHALLANS.length - 1] : null;
  let newId = 'DC-2047';
  if (lastChallan) {
    const lastNum = parseInt(lastChallan.id.split('-')[1]);
    newId = `DC-${lastNum + 1}`;
  }
  
  // Create new challan object
  const newChallan = {
    id: newId,
    so: so,
    customer: customerName,
    date: formattedDispDate,
    vehicle: vehicle,
    items: products.length,
    status: 'Draft',
    dp: soData.dp || '—',
    contact: contact,
    mobile: mobile,
    address: address,
    warehouse: warehouse,
    driver: driver,
    products: products.map(p => ({
      name: p.name,
      sku: p.sku,
      qty: p.dispQty || p.ordQty || 0,
      unit: p.unit
    }))
  };
  
  // Add to CHALLANS array
  CHALLANS.push(newChallan);
  
  // Update filtered data and re-render
  filteredData = [...CHALLANS];
  currentPage = 1;
  renderTable();
  updateKPIs();
  
  showToast(`Challan ${newId} generated successfully!`, 'success');
  DC.closeOverlay('overlay-create');
},

  filterTable() { applyFilters(); },

  clearFilters() {
  const searchInput = document.getElementById('search-input');
  const statusFilter = document.getElementById('filter-status');
  const dateFilter = document.getElementById('filter-date');
  
  if (searchInput) searchInput.value = '';
  if (statusFilter) statusFilter.value = '';
  if (dateFilter) dateFilter.value = '';
  
  filteredData = [...CHALLANS];
  currentPage = 1;
  renderTable();
},

  prevPage() {
  if (currentPage > 1) { 
    currentPage--; 
    renderTable(); 
  }
},
  nextPage() {
  const total = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  if (currentPage < total) { 
    currentPage++; 
    renderTable(); 
  }
},

  updateVerifyBtn() {
    const all          = document.querySelectorAll('#overlay-dispatch .dv-check');
    const checkedCount = Array.from(all).filter(cb => cb.checked).length;
    const allChecked   = all.length > 0 && checkedCount === all.length;
    const btn          = document.getElementById('btn-confirm-dispatch');
    if (btn) {
      btn.disabled = !allChecked;
      btn.classList.toggle('opacity-50', !allChecked);
      btn.classList.toggle('cursor-not-allowed', !allChecked);
    }
    const countSpan = document.getElementById('dv-count');
    if (countSpan) countSpan.textContent = `${checkedCount}/${all.length}`;
    const bar = document.getElementById('dv-bar');
    if (bar) bar.style.width = all.length ? `${(checkedCount/all.length)*100}%` : '0%';
  },

  confirmDispatch() {
    const id = currentViewId;
    if (id) {
      const c = CHALLANS.find(x=>x.id===id);
      if (c) c.status = 'Dispatched';
    }
    showToast('Goods dispatched! Shipment tracking started.', 'success');
    closeAllOverlays();
    updateKPIs();
    renderTable();
  },

  rejectDispatch() {
    showToast('Dispatch rejected. Challan returned to warehouse.', 'error');
    closeAllOverlays();
  },
};

/* ─── Init Tabs (View overlay) ─────────────────────────────── */
function initViewTabs() {
  document.querySelectorAll('#view-tabs .dc-tab').forEach(btn => {
    btn.addEventListener('click', () => switchViewTab(btn.dataset.tab));
  });
}

/* ─── Sidebar ──────────────────────────────────────────────── */
(function initSidebar() {
  let isCollapsed = false;
  const sidebar  = document.getElementById('sidebar');
  const mainWrap = document.getElementById('main-wrapper');
  const toggle   = document.getElementById('sidebar-toggle');
  const overlay  = document.getElementById('sidebar-overlay');

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

  document.querySelectorAll('.nav-group-header').forEach(header => {
    header.addEventListener('click', function () {
      const items   = this.nextElementSibling;
      const chevron = this.querySelector('.fa-chevron-down');
      items?.classList.toggle('hidden');
      if (chevron) chevron.style.transform = items?.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    });
  });
})();

/* ─── Header Dropdowns ─────────────────────────────────────── */
(function initHeader() {
  const userBtn   = document.getElementById('user-menu-btn');
  const userMenu  = document.getElementById('user-menu');
  const notifBtn  = document.getElementById('notif-btn');
  const notifMenu = document.getElementById('notif-menu');
  userBtn?.addEventListener('click', e => { e.stopPropagation(); userMenu.classList.toggle('hidden'); notifMenu?.classList.add('hidden'); });
  notifBtn?.addEventListener('click', e => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
  document.addEventListener('click', () => { userMenu?.classList.add('hidden'); notifMenu?.classList.add('hidden'); });
})();

/* ─── Overlay backdrop click ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dc-overlay').forEach(overlay => {
    overlay.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        if (!document.querySelector('.dc-overlay.active')) document.body.style.overflow = '';
      }
    });
  });
  initViewTabs();
  updateKPIs();
  renderTable();
});