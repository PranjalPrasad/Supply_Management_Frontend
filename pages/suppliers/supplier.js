let suppliers = [
    { id: '1', supplierCode: 'SUP-001', supplierName: 'Goyal Metal Industries', businessType: 'Private Limited', contactPerson: 'Rajesh Goyal', mobile: '9876543210', email: 'contact@goyalmetal.com', gst: '27AAACG1234F1Z', pan: 'AAACG1234F', city: 'Mumbai', state: 'Maharashtra', pincode: '400001', country: 'India', address1: 'MIDC Area, Andheri East', address2: '', paymentTerms: 'Net 30', creditDays: 30, bankName: 'HDFC Bank', accountNo: 'XXXX1234', ifsc: 'HDFC0000123', preferred: 'Yes', status: 'Active', notes: 'Major supplier for steel products' },
    { id: '2', supplierCode: 'SUP-002', supplierName: 'Shree Steels', businessType: 'Partnership', contactPerson: 'Amit Shah', mobile: '9988776655', email: 'amit@shreesteels.com', gst: '24AAAAA1234B1Z', pan: 'AAAAA1234B', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', country: 'India', address1: 'GIDC Phase 2', address2: 'Vatva', paymentTerms: 'Net 15', creditDays: 15, bankName: 'ICICI Bank', accountNo: 'XXXX5678', ifsc: 'ICIC0000456', preferred: 'No', status: 'Active', notes: '' },
    { id: '3', supplierCode: 'SUP-003', supplierName: 'Precision Tools Ltd', businessType: 'Private Limited', contactPerson: 'Sanjay Mehta', mobile: '9876541230', email: 'sanjay@precisiontools.com', gst: '27AAAPM1234F1Z', pan: 'AAAPM1234F', city: 'Pune', state: 'Maharashtra', pincode: '411001', country: 'India', address1: 'MIDC Bhosari', address2: '', paymentTerms: 'Net 45', creditDays: 45, bankName: 'Axis Bank', accountNo: 'XXXX9012', ifsc: 'UTIB0000789', preferred: 'Yes', status: 'Inactive', notes: 'High quality industrial tools' }
];

let nextCodeNum = 4;

const purchaseHistoryMap = {
    '1': [{ poNum: 'PO-101', poDate: '2025-02-10', amount: 125000, status: 'Delivered' }, { poNum: 'PO-108', poDate: '2025-02-25', amount: 45000, status: 'Shipped' }],
    '2': [{ poNum: 'PO-102', poDate: '2025-02-15', amount: 78400, status: 'Pending' }],
    '3': [{ poNum: 'PO-105', poDate: '2025-02-18', amount: 225000, status: 'Delivered' }]
};

const paymentHistoryMap = {
    '1': [{ invNo: 'INV-1001', invDate: '2025-02-12', paid: 125000, balance: 0, status: 'Paid' }, { invNo: 'INV-1008', invDate: '2025-02-26', paid: 0, balance: 45000, status: 'Unpaid' }],
    '2': [{ invNo: 'INV-1005', invDate: '2025-02-20', paid: 40000, balance: 38400, status: 'Partially Paid' }],
    '3': [{ invNo: 'INV-1003', invDate: '2025-02-22', paid: 225000, balance: 0, status: 'Paid' }]
};

function generateSupplierCode() { return `SUP-${String(nextCodeNum++).padStart(3, '0')}`; }

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `flex items-center gap-2 bg-white rounded-lg shadow-lg p-3 text-sm animate-slide-in border-l-4 ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle text-green-500' : type === 'error' ? 'fa-exclamation-circle text-red-500' : 'fa-info-circle text-blue-500'}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function updateCityFilter() {
    const cities = [...new Set(suppliers.filter(s => s.city).map(s => s.city))];
    const filterCity = document.getElementById('filter-city');
    filterCity.innerHTML = '<option value="">All Cities</option>' + cities.map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderSuppliers() {
    const searchTerm = document.getElementById('search-supplier').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;
    const cityFilter = document.getElementById('filter-city').value;
    
    let filtered = suppliers.filter(s => {
        const matchesSearch = s.supplierName.toLowerCase().includes(searchTerm) || s.supplierCode.toLowerCase().includes(searchTerm) || (s.gst && s.gst.toLowerCase().includes(searchTerm));
        const matchesStatus = !statusFilter || s.status === statusFilter;
        const matchesCity = !cityFilter || s.city === cityFilter;
        return matchesSearch && matchesStatus && matchesCity;
    });
    
    const tbody = document.getElementById('supplier-table-body');
    const noDataMsg = document.getElementById('no-data-msg');
    
    if (filtered.length === 0) { noDataMsg.classList.remove('hidden'); tbody.innerHTML = ''; }
    else {
        noDataMsg.classList.add('hidden');
        tbody.innerHTML = filtered.map(s => `
            <tr class="border-b border-[#4B5694]/10 hover:bg-[#7288AE]/5 transition-colors">
                <td class="p-3 font-mono text-xs font-medium">${s.supplierCode}</td>
                <td class="p-3 font-semibold text-[#111844]">${s.supplierName}</td>
                <td class="p-3 text-gray-600">${s.contactPerson || '-'}</td>
                <td class="p-3">${s.mobile}</td>
                <td class="p-3 text-xs font-mono">${s.gst || '-'}</td>
                <td class="p-3">${s.city || '-'}</td>
                <td class="p-3">${s.paymentTerms || '-'}</td>
                <td class="p-3"><span class="status-badge ${s.status === 'Active' ? 'status-active' : 'status-inactive'}">${s.status}</span></td>
                <td class="p-3 text-center space-x-2">
                    <button class="view-supplier text-blue-600 hover:text-blue-800 p-1" data-id="${s.id}" title="View"><i class="fas fa-eye"></i></button>
                    <button class="edit-supplier text-green-600 hover:text-green-800 p-1" data-id="${s.id}" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="toggle-status ${s.status === 'Active' ? 'text-orange-600' : 'text-emerald-600'} p-1" data-id="${s.id}" title="${s.status === 'Active' ? 'Deactivate' : 'Activate'}"><i class="fas ${s.status === 'Active' ? 'fa-ban' : 'fa-check-circle'}"></i></button>
                </td>
            </tr>
        `).join('');
    }
    
    document.querySelectorAll('.view-supplier').forEach(btn => btn.addEventListener('click', () => showSupplierDetails(btn.dataset.id)));
    document.querySelectorAll('.edit-supplier').forEach(btn => btn.addEventListener('click', () => openEditForm(btn.dataset.id)));
    document.querySelectorAll('.toggle-status').forEach(btn => btn.addEventListener('click', () => toggleSupplierStatus(btn.dataset.id)));
}

function toggleSupplierStatus(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) { supplier.status = supplier.status === 'Active' ? 'Inactive' : 'Active'; renderSuppliers(); showToast(`Supplier ${supplier.status.toLowerCase()} successfully`, 'success'); }
}

function showSupplierDetails(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) return;
    
    const purchaseHistory = purchaseHistoryMap[id] || [];
    const paymentHistory = paymentHistoryMap[id] || [];
    const totalPurchaseAmount = purchaseHistory.reduce((sum, p) => sum + p.amount, 0);
    const totalPaidAmount = paymentHistory.reduce((sum, p) => sum + p.paid, 0);
    const outstandingAmount = totalPurchaseAmount - totalPaidAmount;
    
    document.getElementById('overview-tab').innerHTML = `
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div><p class="text-gray-500 text-xs">Supplier Name</p><p class="font-semibold text-[#111844]">${supplier.supplierName}</p></div>
            <div><p class="text-gray-500 text-xs">Supplier Code</p><p class="font-mono">${supplier.supplierCode}</p></div>
            <div><p class="text-gray-500 text-xs">GST Number</p><p class="font-mono">${supplier.gst || '-'}</p></div>
            <div><p class="text-gray-500 text-xs">PAN Number</p><p class="font-mono">${supplier.pan || '-'}</p></div>
            <div><p class="text-gray-500 text-xs">Contact Details</p><p>${supplier.contactPerson || '-'}<br>${supplier.mobile}<br>${supplier.email || '-'}</p></div>
            <div><p class="text-gray-500 text-xs">Address</p><p>${supplier.address1 || '-'}<br>${supplier.city || '-'}, ${supplier.state || '-'} - ${supplier.pincode || '-'}<br>${supplier.country || 'India'}</p></div>
            <div><p class="text-gray-500 text-xs">Payment Terms</p><p>${supplier.paymentTerms} (${supplier.creditDays} days)</p></div>
        </div>
        <div class="grid grid-cols-4 gap-3 mt-4 pt-3 border-t border-[#4B5694]/20">
            <div class="text-center p-2 bg-[#FAFAFA] rounded-lg"><div class="text-xs text-gray-500">Total POs</div><div class="text-lg font-bold text-[#111844]">${purchaseHistory.length}</div></div>
            <div class="text-center p-2 bg-[#FAFAFA] rounded-lg"><div class="text-xs text-gray-500">Total Purchase</div><div class="text-lg font-bold text-[#111844]">₹${totalPurchaseAmount.toLocaleString()}</div></div>
            <div class="text-center p-2 bg-[#FAFAFA] rounded-lg"><div class="text-xs text-gray-500">Pending Orders</div><div class="text-lg font-bold text-orange-600">${purchaseHistory.filter(p => p.status !== 'Delivered').length}</div></div>
            <div class="text-center p-2 bg-[#FAFAFA] rounded-lg"><div class="text-xs text-gray-500">Outstanding</div><div class="text-lg font-bold text-red-600">₹${outstandingAmount.toLocaleString()}</div></div>
        </div>
    `;
    
    document.getElementById('purchase-history-tbody').innerHTML = purchaseHistory.map(p => `
        <tr class="border-b"><td class="p-2 font-mono">${p.poNum}<\/td><td>${p.poDate}<\/td><td>₹${p.amount.toLocaleString()}<\/td><td><span class="status-badge ${p.status === 'Delivered' ? 'status-active' : 'bg-yellow-100'}">${p.status}<\/span><\/td><td><button class="text-blue-600 text-xs hover:underline">View PO<\/button> <button class="text-green-600 text-xs hover:underline">Download<\/button><\/td><\/tr>
    `).join('');
    
    document.getElementById('payment-history-tbody').innerHTML = paymentHistory.map(p => `
        <tr class="border-b"><td class="p-2 font-mono">${p.invNo}<\/td><td>${p.invDate}<\/td><td>₹${p.paid.toLocaleString()}<\/td><td>₹${p.balance.toLocaleString()}<\/td><td><span class="status-badge ${p.status === 'Paid' ? 'status-active' : p.status === 'Partially Paid' ? 'bg-yellow-100' : 'status-inactive'}">${p.status}<\/span><\/td><\/tr>
    `).join('');
    
    const modal = document.getElementById('details-modal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function openEditForm(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (!supplier) return;
    
    document.getElementById('supplier-id').value = supplier.id;
    document.getElementById('supplier-code').value = supplier.supplierCode;
    document.getElementById('supplier-name').value = supplier.supplierName;
    document.getElementById('business-type').value = supplier.businessType || 'Individual';
    document.getElementById('contact-person').value = supplier.contactPerson || '';
    document.getElementById('mobile').value = supplier.mobile;
    document.getElementById('email').value = supplier.email || '';
    document.getElementById('gst').value = supplier.gst || '';
    document.getElementById('pan').value = supplier.pan || '';
    document.getElementById('address1').value = supplier.address1 || '';
    document.getElementById('address2').value = supplier.address2 || '';
    document.getElementById('city').value = supplier.city || '';
    document.getElementById('state').value = supplier.state || '';
    document.getElementById('pincode').value = supplier.pincode || '';
    document.getElementById('country').value = supplier.country || 'India';
    document.getElementById('payment-terms').value = supplier.paymentTerms || 'Net 30';
    document.getElementById('credit-days').value = supplier.creditDays || 30;
    document.getElementById('bank-name').value = supplier.bankName || '';
    document.getElementById('account-no').value = supplier.accountNo || '';
    document.getElementById('ifsc').value = supplier.ifsc || '';
    document.getElementById('preferred').value = supplier.preferred || 'No';
    document.getElementById('active-status').value = supplier.status;
    document.getElementById('notes').value = supplier.notes || '';
    
    document.getElementById('form-title').innerText = 'Edit Supplier';
    document.getElementById('supplier-list-view').classList.add('hidden');
    document.getElementById('supplier-form-view').classList.remove('hidden');
}

function resetForm() {
    document.getElementById('supplier-form').reset();
    document.getElementById('supplier-id').value = '';
    document.getElementById('supplier-code').value = generateSupplierCode();
    document.getElementById('country').value = 'India';
    document.getElementById('active-status').value = 'Active';
    document.getElementById('form-title').innerText = 'Register New Supplier';
}

function saveSupplier(event) {
    event.preventDefault();
    const id = document.getElementById('supplier-id').value;
    const supplierName = document.getElementById('supplier-name').value;
    const mobile = document.getElementById('mobile').value;
    if (!supplierName || !mobile) { showToast('Please fill required fields (Supplier Name and Mobile Number)', 'error'); return; }
    
    const supplierData = {
        id: id || Date.now().toString(),
        supplierCode: document.getElementById('supplier-code').value,
        supplierName: supplierName, businessType: document.getElementById('business-type').value,
        contactPerson: document.getElementById('contact-person').value, mobile: mobile, email: document.getElementById('email').value,
        gst: document.getElementById('gst').value, pan: document.getElementById('pan').value,
        address1: document.getElementById('address1').value, address2: document.getElementById('address2').value,
        city: document.getElementById('city').value, state: document.getElementById('state').value,
        pincode: document.getElementById('pincode').value, country: document.getElementById('country').value,
        paymentTerms: document.getElementById('payment-terms').value, creditDays: parseInt(document.getElementById('credit-days').value) || 30,
        bankName: document.getElementById('bank-name').value, accountNo: document.getElementById('account-no').value,
        ifsc: document.getElementById('ifsc').value, preferred: document.getElementById('preferred').value,
        status: document.getElementById('active-status').value, notes: document.getElementById('notes').value
    };
    
    if (id) { const index = suppliers.findIndex(s => s.id === id); if (index !== -1) suppliers[index] = supplierData; showToast('Supplier updated successfully', 'success'); }
    else { suppliers.push(supplierData); showToast('Supplier created successfully', 'success'); }
    
    updateCityFilter(); renderSuppliers();
    document.getElementById('supplier-list-view').classList.remove('hidden');
    document.getElementById('supplier-form-view').classList.add('hidden');
    resetForm();
}

document.addEventListener('DOMContentLoaded', () => {
    renderSuppliers(); updateCityFilter(); resetForm();
    
    // Sidebar toggle
    let isCollapsed = false;
    const sidebar = document.getElementById('sidebar'), mainWrapper = document.getElementById('main-wrapper'), toggleBtn = document.getElementById('sidebar-toggle'), overlay = document.getElementById('sidebar-overlay');
    toggleBtn?.addEventListener('click', () => {
        if (window.innerWidth < 1024) { sidebar.classList.toggle('sidebar-open'); overlay.classList.toggle('hidden'); }
        else { isCollapsed = !isCollapsed; if (isCollapsed) { sidebar.classList.add('sidebar-collapsed'); mainWrapper.classList.add('main-expanded'); mainWrapper.style.marginLeft = '68px'; } else { sidebar.classList.remove('sidebar-collapsed'); mainWrapper.classList.remove('main-expanded'); mainWrapper.style.marginLeft = ''; } }
    });
    overlay?.addEventListener('click', () => { sidebar.classList.remove('sidebar-open'); overlay.classList.add('hidden'); });
    
    // Dropdowns
    document.querySelectorAll('.nav-group-header').forEach(header => {
        header.addEventListener('click', function(e) { e.stopPropagation(); const items = this.nextElementSibling; const chevron = this.querySelector('.fa-chevron-down'); if (items) { items.classList.toggle('hidden'); if (chevron) chevron.style.transform = items.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)'; } });
    });
    
    // User menu
    const userBtn = document.getElementById('user-menu-btn'), userMenu = document.getElementById('user-menu');
    userBtn?.addEventListener('click', (e) => { e.stopPropagation(); userMenu.classList.toggle('hidden'); });
    const notifBtn = document.getElementById('notif-btn'), notifMenu = document.getElementById('notif-menu');
    notifBtn?.addEventListener('click', (e) => { e.stopPropagation(); notifMenu.classList.toggle('hidden'); userMenu?.classList.add('hidden'); });
    document.addEventListener('click', (e) => { if (!userBtn?.contains(e.target) && !userMenu?.contains(e.target)) userMenu?.classList.add('hidden'); if (!notifBtn?.contains(e.target) && !notifMenu?.contains(e.target)) notifMenu?.classList.add('hidden'); });
    
    // Form buttons
    document.getElementById('add-supplier-btn').addEventListener('click', () => { resetForm(); document.getElementById('supplier-list-view').classList.add('hidden'); document.getElementById('supplier-form-view').classList.remove('hidden'); });
    document.getElementById('close-form-btn').addEventListener('click', () => { document.getElementById('supplier-list-view').classList.remove('hidden'); document.getElementById('supplier-form-view').classList.add('hidden'); resetForm(); });
    document.getElementById('cancel-form-btn').addEventListener('click', () => { document.getElementById('supplier-list-view').classList.remove('hidden'); document.getElementById('supplier-form-view').classList.add('hidden'); resetForm(); });
    document.getElementById('supplier-form').addEventListener('submit', saveSupplier);
    document.getElementById('save-draft-btn').addEventListener('click', () => showToast('Draft saved (demo)', 'info'));
    document.getElementById('export-excel-btn').addEventListener('click', () => showToast('Export Excel triggered', 'success'));
    document.getElementById('import-suppliers-btn').addEventListener('click', () => showToast('Import feature (demo)', 'info'));
    document.getElementById('search-supplier').addEventListener('input', renderSuppliers);
    document.getElementById('filter-status').addEventListener('change', renderSuppliers);
    document.getElementById('filter-city').addEventListener('change', renderSuppliers);
    document.getElementById('close-modal-btn').addEventListener('click', () => { const modal = document.getElementById('details-modal'); modal.classList.add('hidden'); modal.style.display = 'none'; });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('tab-active'));
            btn.classList.add('tab-active');
            const tab = btn.dataset.tab;
            document.getElementById('overview-tab').classList.add('hidden');
            document.getElementById('purchase-tab').classList.add('hidden');
            document.getElementById('payment-tab').classList.add('hidden');
            if (tab === 'overview') document.getElementById('overview-tab').classList.remove('hidden');
            if (tab === 'purchase') document.getElementById('purchase-tab').classList.remove('hidden');
            if (tab === 'payment') document.getElementById('payment-tab').classList.remove('hidden');
        });
    });
});