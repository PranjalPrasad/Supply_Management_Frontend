/* =============================================
   Vendor Portal — vendor-dashboard.js
   ============================================= */

'use strict';

/* ── Shared theme tokens ── */
const C = {
  navy:     '#111844',
  slate:    '#4B5694',
  lavender: '#7288AE',
  grid:     'rgba(75,86,148,0.12)',
};

/* ============================================================
   SIDEBAR TOGGLE
   ============================================================ */
(function initSidebar() {
  const sidebar   = document.getElementById('sidebar');
  const wrapper   = document.getElementById('main-wrapper');
  const toggleBtn = document.getElementById('sidebar-toggle');
  const overlay   = document.getElementById('sidebar-overlay');
  const mobileBtn = document.getElementById('mobile-menu-btn');

  let collapsed = false;

  function setDesktopCollapsed(yes) {
    collapsed = yes;
    sidebar.classList.toggle('sidebar-collapsed', yes);
    wrapper.classList.toggle('main-expanded', yes);
  }

  function setMobileOpen(open) {
    sidebar.classList.toggle('sidebar-open', open);
    overlay.classList.toggle('active', open);
  }

  toggleBtn?.addEventListener('click', () => {
    if (window.innerWidth < 1024) {
      setMobileOpen(false);
    } else {
      setDesktopCollapsed(!collapsed);
    }
  });

  mobileBtn?.addEventListener('click', () => setMobileOpen(true));
  overlay?.addEventListener('click', () => setMobileOpen(false));

  /* Show/hide mobile hamburger */
  function onResize() {
    if (!mobileBtn) return;
    mobileBtn.style.display = window.innerWidth < 1024 ? 'flex' : 'none';
    if (window.innerWidth >= 1024) {
      setMobileOpen(false);
    }
  }
  window.addEventListener('resize', onResize);
  onResize();
})();


/* ============================================================
   DROPDOWN MENUS (Notification + User)
   ============================================================ */
(function initDropdowns() {
  function toggleMenu(btnId, menuId, others = []) {
    const btn  = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      // close all others first
      others.forEach(id => document.getElementById(id)?.classList.remove('open'));
      menu.classList.toggle('open', !isOpen);
    });
  }

  toggleMenu('notif-btn',    'notif-menu', ['user-menu']);
  toggleMenu('user-menu-btn','user-menu',  ['notif-menu']);

  document.addEventListener('click', () => {
    document.getElementById('notif-menu')?.classList.remove('open');
    document.getElementById('user-menu')?.classList.remove('open');
  });
})();


/* ============================================================
   LOGOUT
   ============================================================ */
document.getElementById('logout-btn')?.addEventListener('click', (e) => {
  e.preventDefault();
  showToast('Logging out…', 'info');
  setTimeout(() => { /* window.location.href = '/login.html'; */ }, 1000);
});


/* ============================================================
   TOAST
   ============================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const iconMap = {
    success: 'fa-circle-check',
    error:   'fa-circle-xmark',
    info:    'fa-circle-info',
  };
  const colorMap = {
    success: '#059669',
    error:   '#dc2626',
    info:    C.navy,
  };

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.style.background = colorMap[type] || C.navy;
  toast.innerHTML = `<i class="fas ${iconMap[type] || 'fa-circle-info'}"></i> ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity .2s, transform .2s';
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}

/* Make showToast globally available (used in HTML onclick) */
window.showToast = showToast;


/* ============================================================
   CHARTS
   ============================================================ */
Chart.defaults.font.family = "'Roboto', sans-serif";
Chart.defaults.font.size   = 11;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

/* ── Monthly PO Bar Chart ── */
(function initPOChart() {
  const ctx = document.getElementById('chart-po');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [{
        label: 'Purchase Orders',
        data: [6, 9, 7, 11, 8, 7],
        backgroundColor: C.slate,
        borderRadius: 6,
        maxBarThickness: 36,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: C.lavender } },
        y: {
          grid: { color: C.grid },
          ticks: { color: C.lavender, stepSize: 2 },
          beginAtZero: true,
        },
      },
    },
  });
})();


/* ── Payment Line Chart ── */
(function initPaymentChart() {
  const ctx = document.getElementById('chart-payment');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Invoiced (₹L)',
          data: [1.2, 1.8, 1.4, 2.0, 1.6, 2.1],
          borderColor: C.navy,
          backgroundColor: 'rgba(17,24,68,0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: C.navy,
          pointRadius: 4,
        },
        {
          label: 'Received (₹L)',
          data: [1.0, 1.5, 1.4, 1.8, 1.4, 1.9],
          borderColor: '#059669',
          backgroundColor: 'rgba(5,150,105,0.08)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#059669',
          pointRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: { color: C.lavender, font: { size: 11 }, usePointStyle: true, pointStyleWidth: 8 },
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: C.lavender } },
        y: { grid: { color: C.grid }, ticks: { color: C.lavender }, beginAtZero: true },
      },
    },
  });
})();


/* ── Payment Donut Chart ── */
(function initDonutChart() {
  const ctx = document.getElementById('chart-payment-donut');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Paid', 'Pending'],
      datasets: [{
        data: [640000, 224000],
        backgroundColor: ['#059669', '#ef4444'],
        borderWidth: 2,
        borderColor: '#FFFCFC',
        hoverOffset: 6,
      }],
    },
    options: {
      responsive: true,
      cutout: '72%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: { color: C.lavender, font: { size: 10 }, usePointStyle: true, pointStyleWidth: 8 },
        },
        tooltip: {
          callbacks: {
            label: (item) => {
              const val = item.raw;
              return ` ₹${(val / 100000).toFixed(2)}L`;
            },
          },
        },
      },
    },
  });
})();


/* ============================================================
   ACTIVE NAV HIGHLIGHTING
   ============================================================ */
(function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href !== '#' && path.includes(href.replace(/^\//, ''))) {
      item.classList.add('nav-active');
    }
  });
})();