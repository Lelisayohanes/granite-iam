/* ============================================================================
   Granite-IAM Documentation — Vanilla JS
   Handles: theme toggle, mobile sidebar, active nav highlight
   ============================================================================ */

(function () {
    'use strict';

    // --------------------------------------------------------------------------
    // Theme Toggle (Dark / Light)
    // --------------------------------------------------------------------------
    const STORAGE_KEY = 'granite-iam-docs-theme';
    const DARK = 'dark';
    const LIGHT = 'light';

    function getPreferredTheme() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
        updateToggleIcon(theme);
    }

    function updateToggleIcon(theme) {
        const btn = document.querySelector('.theme-toggle');
        if (!btn) return;
        btn.innerHTML = theme === DARK ? '&#9788;' : '&#9790;'; // ☼ sun / ☾ moon
        btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
    }

    function initTheme() {
        applyTheme(getPreferredTheme());
        const btn = document.querySelector('.theme-toggle');
        if (btn) {
            btn.addEventListener('click', function () {
                const current = document.documentElement.getAttribute('data-theme') || LIGHT;
                applyTheme(current === DARK ? LIGHT : DARK);
            });
        }
    }

    // --------------------------------------------------------------------------
    // Mobile Sidebar
    // --------------------------------------------------------------------------
    function initMobileSidebar() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');

        if (!toggle || !sidebar) return;

        function openSidebar() {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        function closeSidebar() {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }

        toggle.addEventListener('click', function () {
            if (sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }

        // Close sidebar when clicking a link on mobile
        sidebar.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeSidebar);
        });
    }

    // --------------------------------------------------------------------------
    // Active Navigation Highlight
    // --------------------------------------------------------------------------
    function initActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';

        document.querySelectorAll('.sidebar-nav a, .header-nav a').forEach(function (link) {
            const href = link.getAttribute('href');
            if (!href) return;

            const linkPage = href.split('/').pop();
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // --------------------------------------------------------------------------
    // Smooth Scroll to Anchors
    // --------------------------------------------------------------------------
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href').slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Update URL without triggering scroll
                    history.pushState(null, '', '#' + targetId);
                }
            });
        });
    }

    // --------------------------------------------------------------------------
    // Copy-to-Clipboard for Code Blocks
    // --------------------------------------------------------------------------
    function initCodeCopy() {
        document.querySelectorAll('pre').forEach(function (pre) {
            const btn = document.createElement('button');
            btn.className = 'copy-btn';
            btn.innerHTML = '&#128203;'; // 📋 clipboard
            btn.setAttribute('aria-label', 'Copy code');
            btn.style.cssText = [
                'position:absolute',
                'top:0.6rem',
                'right:0.6rem',
                'background:var(--bg-card)',
                'border:1px solid var(--border-light)',
                'border-radius:6px',
                'width:32px',
                'height:32px',
                'display:flex',
                'align-items:center',
                'justify-content:center',
                'cursor:pointer',
                'font-size:0.85rem',
                'opacity:0',
                'transition:opacity 0.2s ease',
                'color:var(--text-muted)',
                'padding:0'
            ].join(';');

            pre.style.position = 'relative';
            pre.appendChild(btn);

            pre.addEventListener('mouseenter', function () { btn.style.opacity = '1'; });
            pre.addEventListener('mouseleave', function () { btn.style.opacity = '0'; });

            btn.addEventListener('click', function () {
                const code = pre.querySelector('code');
                const text = code ? code.textContent : pre.textContent;
                navigator.clipboard.writeText(text).then(function () {
                    btn.innerHTML = '&#10003;'; // ✓ check
                    setTimeout(function () { btn.innerHTML = '&#128203;'; }, 2000);
                });
            });
        });
    }

    // --------------------------------------------------------------------------
    // Initialize
    // --------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
        initTheme();
        initMobileSidebar();
        initActiveNav();
        initSmoothScroll();
        initCodeCopy();
    });
})();
