/* CyberHub — Main JavaScript */

/* ─── Theme Management ───────────────────────────────── */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('cyberhub-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateToggle(saved);
  },
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cyberhub-theme', next);
    this.updateToggle(next);
  },
  updateToggle(theme) {
    const thumb = document.querySelector('.theme-toggle-thumb');
    if (thumb) thumb.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
};

/* ─── Navigation ─────────────────────────────────────── */
const Nav = {
  init() {
    this.highlightActive();
    this.initMobile();
  },
  highlightActive() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .nav-dropdown a, .nav-overlay-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === path || (path === '' && href === 'index.html') || (path === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  },
  initMobile() {
    const btn = document.querySelector('.nav-mobile-btn');
    const overlay = document.querySelector('.nav-overlay');
    if (!btn || !overlay) return;
    btn.addEventListener('click', () => {
      overlay.classList.toggle('open');
      const spans = btn.querySelectorAll('span');
      btn.classList.toggle('open');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }
};

/* ─── Scroll Animations ──────────────────────────────── */
const ScrollAnimator = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up, .fade-in, .stagger-children').forEach(el => {
      observer.observe(el);
    });
  }
};

/* ─── Tab System ─────────────────────────────────────── */
const Tabs = {
  init() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('[data-tabs]');
        const target = btn.dataset.tab;
        if (!group) return;
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = group.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }
};

/* ─── Difficulty Bars ────────────────────────────────── */
const DifficultyBars = {
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.difficulty-fill').forEach(bar => {
            const width = bar.dataset.width || '0%';
            bar.style.width = width;
          });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.lang-card').forEach(card => observer.observe(card));
  }
};

/* ─── Smooth External Links ──────────────────────────── */
function initExternalLinks() {
  document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ─── Nav Scroll Effect ──────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    if (scroll > 80) {
      nav.style.background = 'var(--glass-bg-strong)';
    } else {
      nav.style.background = '';
    }
    lastScroll = scroll;
  }, { passive: true });
}

/* ─── Inject Navigation HTML ─────────────────────────── */
function buildNav() {
  const navHTML = `
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    <nav class="nav">
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-icon">🛡</div>
        <span class="nav-logo-text">CyberHub</span>
      </a>
      <ul class="nav-links">
        <li class="nav-item">
          <a href="index.html" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <span class="nav-link nav-dropdown-toggle">Operations <span class="chevron">▾</span></span>
          <ul class="nav-dropdown">
            <li><a href="red-team.html">🔴 Red Team</a></li>
            <li><a href="blue-team.html">🔵 Blue Team</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link nav-dropdown-toggle">Learn <span class="chevron">▾</span></span>
          <ul class="nav-dropdown">
            <li><a href="beginners.html">🌱 Beginners</a></li>
            <li><a href="advanced.html">⚡ Advanced</a></li>
            <li><a href="coding.html">💻 Coding</a></li>
            <li><a href="career.html">🎯 Career Paths</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <span class="nav-link nav-dropdown-toggle">Resources <span class="chevron">▾</span></span>
          <ul class="nav-dropdown">
            <li><a href="certifications.html">🏆 Certifications</a></li>
            <li><a href="tools.html">🔧 Tools</a></li>
            <li><a href="resources.html">📚 Resources</a></li>
            <li><a href="ctf-labs.html">🚩 CTF & Labs</a></li>
          </ul>
        </li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" onclick="ThemeManager.toggle()" aria-label="Toggle theme">
          <div class="theme-toggle-thumb">🌙</div>
        </button>
        <div class="nav-mobile-btn">
          <span></span><span></span><span></span>
        </div>
      </div>
    </nav>
    <div class="nav-overlay">
      <div class="nav-overlay-inner">
        <a href="index.html" class="nav-overlay-link">🏠 Home</a>
        <div class="nav-overlay-category">Operations</div>
        <a href="red-team.html" class="nav-overlay-link">🔴 Red Team</a>
        <a href="blue-team.html" class="nav-overlay-link">🔵 Blue Team</a>
        <div class="nav-overlay-category">Learn</div>
        <a href="beginners.html" class="nav-overlay-link">🌱 Beginners Guide</a>
        <a href="advanced.html" class="nav-overlay-link">⚡ Advanced Topics</a>
        <a href="coding.html" class="nav-overlay-link">💻 Coding for CyberSec</a>
        <a href="career.html" class="nav-overlay-link">🎯 Career Paths</a>
        <div class="nav-overlay-category">Resources</div>
        <a href="certifications.html" class="nav-overlay-link">🏆 Certifications</a>
        <a href="tools.html" class="nav-overlay-link">🔧 Tools & Applications</a>
        <a href="resources.html" class="nav-overlay-link">📚 Resources & Links</a>
        <a href="ctf-labs.html" class="nav-overlay-link">🚩 CTF & Labs</a>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', navHTML);
}

/* ─── Inject Footer HTML ─────────────────────────────── */
function buildFooter() {
  const footerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-logo" style="margin-bottom:0">
            <div class="nav-logo-icon">🛡</div>
            <span class="nav-logo-text">CyberHub</span>
          </a>
          <p>Your comprehensive guide to cybersecurity — from first steps to cutting-edge expertise. Built for every level, every path.</p>
        </div>
        <div class="footer-col">
          <h4>Operations</h4>
          <ul>
            <li><a href="red-team.html">Red Team</a></li>
            <li><a href="blue-team.html">Blue Team</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Learn</h4>
          <ul>
            <li><a href="beginners.html">Beginners</a></li>
            <li><a href="advanced.html">Advanced</a></li>
            <li><a href="coding.html">Coding</a></li>
            <li><a href="career.html">Career</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="certifications.html">Certifications</a></li>
            <li><a href="tools.html">Tools</a></li>
            <li><a href="resources.html">Links</a></li>
            <li><a href="ctf-labs.html">CTF & Labs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Levels</h4>
          <ul>
            <li><a href="beginners.html">🌱 Beginner</a></li>
            <li><a href="certifications.html">📈 Intermediate</a></li>
            <li><a href="advanced.html">⚡ Pro</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2025 CyberHub. Built for the community, by the community.</span>
        <span class="footer-copy">Knowledge is the best defense.</span>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

/* ─── Init ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildNav();
  buildFooter();
  ThemeManager.init();
  Nav.init();
  ScrollAnimator.init();
  Tabs.init();
  DifficultyBars.init();
  initExternalLinks();
  initNavScroll();
});
