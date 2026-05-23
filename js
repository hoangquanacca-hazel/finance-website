document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize Lucide Vector Icons Instantly
    lucide.createIcons();

    // 1. STICKY HEADER SCROLL LOGIC
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('py-2', 'shadow-lg', 'bg-white', 'dark:bg-navy-950');
            header.classList.remove('h-20');
        } else {
            header.classList.remove('py-2', 'shadow-lg');
            header.classList.add('h-20');
        }
    });

    // 2. MOBILE INTERACTIVE DRAWER MENU
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Toggle burger icon to X if needed (Optional UX enhancement)
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });

    // 3. DARK MODE ENGINE STATE MANAGEMENT
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');

    function toggleDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

    // Check configuration preferences
    if (localStorage.getItem('color-theme') === 'dark' || 
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', toggleDarkMode);
    themeToggleMobileBtn.addEventListener('click', toggleDarkMode);

    // 4. ANIMATED PERFORMANCE COUNTERS ENGINE
    const stats = [
        { id: 'stat-years', target: 18, suffix: '' },
        { id: 'stat-clients', target: 450, suffix: '+' },
        { id: 'stat-assets', target: 1.2, suffix: 'B', isFloat: true }
    ];

    const animateCounters = () => {
        stats.forEach(stat => {
            const el = document.getElementById(stat.id);
            if (!el) return;

            let start = 0;
            const end = stat.target;
            const duration = 2000; // 2 seconds animation time
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // EaseOutQuad function for premium transition weight
                const easeProgress = progress * (2 - progress);
                
                let currentVal = start + easeProgress * (end - start);
                
                if (stat.isFloat) {
                    el.innerText = `$${currentVal.toFixed(1)}${stat.suffix}`;
                } else {
                    el.innerText = `${Math.floor(currentVal)}${stat.suffix}`;
                }

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };
            requestAnimationFrame(updateCounter);
        });
    };

    // Intersection Observer to run statistics counters exactly when scrolling into viewport view
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutSection = document.getElementById('about');
    if(aboutSection) observer.observe(aboutSection);

    // 5. SECURE INTENAL FORM LEAD SIMULATION
    const form = document.getElementById('lead-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerText = "Transmitting Secured Data...";
        submitBtn.disabled = true;

        setTimeout(() => {
            form.innerHTML = `
                <div class="text-center py-8 space-y-3">
                    <div class="inline-flex p-3 rounded-full bg-green-50 text-green-600 mb-2">
                        <i data-lucide="check-circle-2" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-lg font-bold">Secured Connection Authorized</h3>
                    <p class="text-sm text-slate-500">A Senior Wealth Partner will contact you via your corporate address within 4 hours window.</p>
                </div>
            `;
            lucide.createIcons(); // Refresh vectors for response markup card
        }, 1500);
    });
});
