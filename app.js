/**
 * MR.TRAVEL - Interactive Frontend Script
 * Handles navigation, search filters, destination showcase, modals, likes, and responsive events.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. DOM Elements ---
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuIcon = document.getElementById('menuIcon');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    const menuBx = document.getElementById('menu_bx');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const navRegisterBtn = document.getElementById('navRegisterBtn');

    const heroSearchBtn = document.getElementById('heroSearchBtn');
    const heroExploreBtn = document.getElementById('heroExploreBtn');

    const searchForm = document.getElementById('searchForm');
    const destInput = document.getElementById('destInput');
    const dateInput = document.getElementById('dateInput');
    const peopleInput = document.getElementById('peopleInput');
    const exploreBtn = document.getElementById('exploreBtn');
    const searchCards = document.querySelectorAll('.search_card');

    const countryCards = document.querySelectorAll('.country_card');
    const packageCards = document.querySelectorAll('.package_card');
    const offerFilterBtns = document.querySelectorAll('.filter_btn');

    const destItems = document.querySelectorAll('.dest_item');
    const destMainImg = document.getElementById('destMainImg');
    const floatImg1 = document.getElementById('floatImg1');
    const floatImg2 = document.getElementById('floatImg2');
    const floatTitle1 = document.getElementById('floatTitle1');
    const floatTitle2 = document.getElementById('floatTitle2');
    const floatPriceTag = document.getElementById('floatPriceTag');
    const floatLikes1 = document.getElementById('floatLikes1');
    const floatChats1 = document.getElementById('floatChats1');
    const activeCountryFlagImg = document.getElementById('activeCountryFlagImg');
    const activeCountryName = document.getElementById('activeCountryName');
    const activeCountryCode = document.getElementById('activeCountryCode');
    const activeCountryDesc = document.getElementById('activeCountryDesc');
    const destMoreInfoBtn = document.getElementById('destMoreInfoBtn');

    const joinCommunityBtn = document.getElementById('joinCommunityBtn');
    const readStoriesBtn = document.getElementById('readStoriesBtn');

    const newsletterBtn = document.getElementById('newsletterBtn');
    const newsletterEmail = document.getElementById('newsletterEmail');

    const backToTopBtn = document.getElementById('backToTop');

    // Modals
    const packageModal = document.getElementById('packageModal');
    const packageModalClose = document.getElementById('packageModalClose');
    const modalCloseActionBtn = document.getElementById('modalCloseActionBtn');
    const modalBookNowBtn = document.getElementById('modalBookNowBtn');

    const modalPkgTitle = document.getElementById('modalPkgTitle');
    const modalPkgImg = document.getElementById('modalPkgImg');
    const modalPkgPrice = document.getElementById('modalPkgPrice');
    const modalPkgDays = document.getElementById('modalPkgDays');
    const modalPkgLocation = document.getElementById('modalPkgLocation');

    const bookingModal = document.getElementById('bookingModal');
    const bookingModalClose = document.getElementById('bookingModalClose');
    const bookingCancelBtn = document.getElementById('bookingCancelBtn');
    const bookingForm = document.getElementById('bookingForm');
    const bookDest = document.getElementById('bookDest');

    const supportModal = document.getElementById('supportModal');
    const supportModalClose = document.getElementById('supportModalClose');
    const supportModalCloseBtn = document.getElementById('supportModalCloseBtn');
    const legalTabBtns = document.querySelectorAll('.legal_tab_btn');
    const legalTabPanes = document.querySelectorAll('.legal_tab_pane');
    const footerLinkBtns = document.querySelectorAll('.footer_link_btn');
    const faqItems = document.querySelectorAll('.legal_faq_item');

    const toastContainer = document.getElementById('toastContainer');

    // Set today as minimum date for date picker
    const today = new Date().toISOString().split('T')[0];
    if (dateInput) dateInput.min = today;
    const bookDate = document.getElementById('bookDate');
    if (bookDate) bookDate.min = today;

    // --- Logo Typing Animation (<JGN.Travel>) in Dynamic Colors ---
    const typedLogoEl = document.getElementById('typedLogo');
    const logoBrackets = document.querySelectorAll('.logo_bracket');
    const logoCursor = document.querySelector('.logo_cursor');

    if (typedLogoEl) {
        const logoPhrases = [
            { text: "JGN.Travel", color: "#c9182b", glow: "rgba(201, 24, 43, 0.45)" }, // Brand Crimson Red
            { text: "JGN.Travel", color: "#0984e3", glow: "rgba(9, 132, 227, 0.45)" }, // Electric Sky Blue
            { text: "JGN.Travel", color: "#00b894", glow: "rgba(0, 184, 148, 0.45)" }, // Emerald Green
            { text: "JGN.Travel", color: "#6c5ce7", glow: "rgba(108, 92, 231, 0.45)" }, // Neon Violet
            { text: "JGN.Travel", color: "#e17055", glow: "rgba(225, 112, 85, 0.45)" }, // Sunset Coral
            { text: "JGN.Travel", color: "#e84393", glow: "rgba(232, 67, 147, 0.45)" }, // Magenta Pink
            { text: "JGN.Travel", color: "#f39c12", glow: "rgba(243, 156, 18, 0.45)" }  // Warm Amber Gold
        ];

        let logoIdx = 0;
        let logoChar = logoPhrases[0].text.length;
        let logoDeleting = false;
        let logoWaiting = true;

        function applyLogoTheme(color, glow) {
            typedLogoEl.style.color = color;
            typedLogoEl.style.textShadow = `0 0 12px ${glow}`;
            logoBrackets.forEach(b => {
                b.style.color = color;
                b.style.textShadow = `0 0 12px ${glow}`;
            });
            if (logoCursor) logoCursor.style.color = color;
        }

        applyLogoTheme(logoPhrases[0].color, logoPhrases[0].glow);

        function logoTick() {
            const currentItem = logoPhrases[logoIdx];
            const fullText = currentItem.text;

            if (logoWaiting) {
                setTimeout(() => {
                    logoWaiting = false;
                    logoDeleting = true;
                    logoTick();
                }, 2400);
                return;
            }

            if (logoDeleting) {
                logoChar--;
                typedLogoEl.textContent = fullText.substring(0, logoChar);

                if (logoChar === 0) {
                    logoDeleting = false;
                    logoIdx = (logoIdx + 1) % logoPhrases.length;
                    const next = logoPhrases[logoIdx];
                    applyLogoTheme(next.color, next.glow);
                    setTimeout(logoTick, 350);
                    return;
                }
                setTimeout(logoTick, 40);
            } else {
                logoChar++;
                typedLogoEl.textContent = fullText.substring(0, logoChar);

                if (logoChar === fullText.length) {
                    logoDeleting = false;
                    logoWaiting = true;
                    setTimeout(logoTick, 2400);
                    return;
                }
                setTimeout(logoTick, 70);
            }
        }

        setTimeout(logoTick, 2500);
    }

    // --- Hero Headline Continuous Typing Animation inside < > ---
    const typedTextEl = document.getElementById('typedText');
    const typingBrackets = document.querySelectorAll('.typing_bracket');

    if (typedTextEl) {
        const phrases = [
            { text: "The Right Destination for you and your Family", color: "#feca57", glow: "rgba(254, 202, 87, 0.7)" }, // Warm Gold
            { text: "The Right Destination for your dream vacation", color: "#48dbfb", glow: "rgba(72, 219, 251, 0.7)" }, // Electric Cyan
            { text: "The Right Destination for you and your Family", color: "#ff6b81", glow: "rgba(255, 107, 129, 0.7)" }, // Radiant Rose Pink
            { text: "The Right Destination for unforgettable memories", color: "#1dd1a1", glow: "rgba(29, 209, 161, 0.7)" }, // Emerald Green
            { text: "The Right Destination for you and your Family", color: "#a55eea", glow: "rgba(165, 94, 234, 0.7)" }, // Neon Violet
            { text: "The Right Destination for exploring the world", color: "#ff9f43", glow: "rgba(255, 159, 67, 0.7)" }  // Sunset Orange
        ];

        let phraseIndex = 0;
        let charIndex = phrases[0].text.length;
        let isDeleting = false;
        let isWaiting = true;

        function applyTheme(color, glow) {
            typedTextEl.style.color = color;
            typedTextEl.style.textShadow = `0 0 18px ${glow}`;
            typingBrackets.forEach(bracket => {
                bracket.style.color = color;
                bracket.style.textShadow = `0 0 18px ${glow}`;
            });
        }

        applyTheme(phrases[0].color, phrases[0].glow);

        function typeTick() {
            const currentItem = phrases[phraseIndex];
            const fullText = currentItem.text;

            if (isWaiting) {
                setTimeout(() => {
                    isWaiting = false;
                    isDeleting = true;
                    typeTick();
                }, 2200);
                return;
            }

            if (isDeleting) {
                charIndex--;
                typedTextEl.textContent = fullText.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    const nextItem = phrases[phraseIndex];
                    applyTheme(nextItem.color, nextItem.glow);
                    setTimeout(typeTick, 350);
                    return;
                }
                setTimeout(typeTick, 30);
            } else {
                charIndex++;
                typedTextEl.textContent = fullText.substring(0, charIndex);

                if (charIndex === fullText.length) {
                    isDeleting = false;
                    isWaiting = true;
                    setTimeout(typeTick, 2000);
                    return;
                }
                setTimeout(typeTick, 55);
            }
        }

        setTimeout(typeTick, 2000);
    }

    // --- 1.1 Hero Background Auto-Slider (Automatic Crossfade Every 5.5 Seconds) ---
    const bgSlides = document.querySelectorAll('.hero_bg_slide');
    if (bgSlides.length > 0) {
        let currentSlideIdx = 0;
        const slideInterval = 5500; // Smooth automatic change every 5.5 seconds

        function nextHeroBackground() {
            bgSlides[currentSlideIdx].classList.remove('active');
            currentSlideIdx = (currentSlideIdx + 1) % bgSlides.length;
            bgSlides[currentSlideIdx].classList.add('active');
        }

        setInterval(nextHeroBackground, slideInterval);
    }

    // --- 2. Toast Notification Helper ---
    function showToast(message, type = 'info') {
        if (!toastContainer) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        let icon = 'bi-info-circle-fill';
        if (type === 'success') icon = 'bi-check-circle-fill';
        if (type === 'heart') icon = 'bi-heart-fill';

        toast.innerHTML = `<i class="bi ${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            if (toast && toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }

    // --- 2.1 Dark / Light Mode Theme System (Dark Mode First Priority, No Toast Notification) ---
    const savedTheme = localStorage.getItem('jgn_theme');
    // First priority is Dark Mode: default is true unless user explicitly set 'light'
    const isInitialDark = savedTheme !== null ? savedTheme === 'dark' : true;

    function applyAppTheme(isDark) {
        document.body.classList.toggle('dark_mode', isDark);
        if (themeIcon) {
            if (isDark) {
                themeIcon.className = 'bi bi-sun-fill';
                themeIcon.style.color = '#feca57';
                themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            } else {
                themeIcon.className = 'bi bi-moon-stars-fill';
                themeIcon.style.color = '';
                themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            }
        }
        localStorage.setItem('jgn_theme', isDark ? 'dark' : 'light');
    }

    // Initialize theme immediately
    applyAppTheme(isInitialDark);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const willBeDark = !document.body.classList.contains('dark_mode');
            applyAppTheme(willBeDark);
        });
    }

    // --- 3. Mobile Bottom Navigation Bar Interaction & Scroll Spy ---
    const bottomNavItems = document.querySelectorAll('.bottom_nav_item');

    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    e.preventDefault();
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Auto highlight active bottom navigation icon on scroll
    const sectionTargets = [
        { id: 'discover', navId: 'bNavDiscover' },
        { id: 'offers', navId: 'bNavDeals' },
        { id: 'destinations', navId: 'bNavDest' },
        { id: 'community', navId: 'bNavCommunity' },
        { id: 'about', navId: 'bNavAbout' }
    ];

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 180;
        
        if (window.scrollY < 200) {
            bottomNavItems.forEach(n => n.classList.remove('active'));
            const homeNav = document.getElementById('bNavHome');
            if (homeNav) homeNav.classList.add('active');
            return;
        }

        sectionTargets.forEach(({ id, navId }) => {
            const section = document.getElementById(id);
            if (section) {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    bottomNavItems.forEach(n => n.classList.remove('active'));
                    const activeNav = document.getElementById(navId);
                    if (activeNav) activeNav.classList.add('active');
                }
            }
        });
    }, { passive: true });

    // --- 4. Interactive Search Bar ---
    searchCards.forEach((card) => {
        card.addEventListener('click', (e) => {
            const input = card.querySelector('input');
            if (input && e.target !== input) {
                input.focus();
                if (input.type === 'date' && typeof input.showPicker === 'function') {
                    try { input.showPicker(); } catch (err) {}
                }
            }
        });

        const input = card.querySelector('input');
        const caret = card.querySelector('.bi-caret-down-fill');
        if (input && caret) {
            input.addEventListener('input', () => {
                if (input.value.trim().length > 0) {
                    caret.style.transform = 'rotate(180deg)';
                    caret.style.color = '#c9182b';
                } else {
                    caret.style.transform = 'rotate(0deg)';
                    caret.style.color = '';
                }
            });
        }
    });

    // Hero Buttons
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener('click', () => {
            destInput.focus();
            destInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            showToast('Enter your destination to start finding packages!', 'info');
        });
    }

    if (heroExploreBtn) {
        heroExploreBtn.addEventListener('click', () => {
            const offersSection = document.getElementById('offers');
            if (offersSection) {
                offersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // "Explore Now" Search Action
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            const dest = destInput ? destInput.value.trim() : '';
            const date = dateInput ? dateInput.value : '';
            const people = peopleInput ? peopleInput.value : '';

            if (!dest) {
                showToast('Please enter a destination to explore offers!', 'info');
                destInput.focus();
                return;
            }

            let msg = `Searching best deals for "${dest}"`;
            if (date) msg += ` on ${date}`;
            if (people) msg += ` for ${people} travelers`;
            msg += '...';

            showToast(msg, 'success');

            // Filter package offers based on query
            const query = dest.toLowerCase();
            let matchCount = 0;

            packageCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const country = card.getAttribute('data-country').toLowerCase();
                if (title.includes(query) || country.includes(query) || query.includes(country)) {
                    card.style.display = 'flex';
                    card.style.border = '2px solid #c9182b';
                    matchCount++;
                } else {
                    card.style.border = '';
                }
            });

            // Smooth scroll to offers section
            const offersSection = document.getElementById('offers');
            if (offersSection) {
                offersSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 5. Interactive Country Cards ("Read Now" & Click) ---
    countryCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const country = card.getAttribute('data-country');
            const city = card.getAttribute('data-city');
            const price = card.getAttribute('data-price');
            const img = card.getAttribute('data-img');

            openPackageModal({
                title: `${city} - ${country} Special`,
                price: price,
                days: '5 Days & 4 Nights',
                location: `${city}, ${country}`,
                img: img
            });
        });
    });

    // --- 6. Offer Package Filter Buttons ---
    offerFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            offerFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            packageCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInTab 0.3s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 7. Package Cards Details & In-Card Actions ---
    packageCards.forEach(card => {
        const moreInfoBtn = card.querySelector('.more_info_btn');
        const imgText = card.querySelector('.img_text');

        const openDetails = () => {
            openPackageModal({
                title: card.getAttribute('data-title'),
                price: card.getAttribute('data-price'),
                days: card.getAttribute('data-days'),
                location: card.getAttribute('data-country'),
                img: card.getAttribute('data-img')
            });
        };

        if (moreInfoBtn) moreInfoBtn.addEventListener('click', (e) => { e.stopPropagation(); openDetails(); });
        if (imgText) imgText.addEventListener('click', (e) => { e.stopPropagation(); openDetails(); });

        // Days badge click
        const daysBadge = card.querySelector('.days');
        if (daysBadge) {
            daysBadge.addEventListener('click', (e) => {
                e.stopPropagation();
                showToast(`${card.getAttribute('data-days')} luxury package in ${card.getAttribute('data-country')}`, 'info');
            });
        }
    });

    // Like buttons across all cards
    document.querySelectorAll('.like_btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const countSpan = btn.querySelector('span');
            let count = parseInt(countSpan.textContent.replace(/,/g, ''), 10) || 0;

            if (btn.classList.contains('liked')) {
                btn.classList.remove('liked');
                count = Math.max(0, count - 1);
                countSpan.textContent = count;
                showToast('Removed from favorites', 'info');
            } else {
                btn.classList.add('liked');
                count += 1;
                countSpan.textContent = count;
                showToast('Added to your favorite trips! ❤️', 'success');
            }
        });
    });

    // Chat buttons across cards
    document.querySelectorAll('.chat_btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openBookingModal('Inquiry / Chat Support');
            showToast('Our 24/7 travel advisor will reach out to you!', 'info');
        });
    });

    // --- 8. Interactive Destination Showcase & Dynamic Country Flag Switcher ---
    const destData = {
        india: {
            name: 'INDIA',
            code: 'IN',
            flag: 'india.png',
            landmarkImg: 'mumbaiN.jpeg',
            landmarkTitle: 'MUMBAI CENTRAL',
            price: '₹460',
            mainImg: 'air3.png',
            desc: 'Rich cultural heritage, iconic royal palaces, and timeless spiritual journeys.',
            likes: '12,554',
            chats: '9,021',
            packageDays: '5 Days & 4 Nights',
            pkgTitle: 'India - Mumbai & Golden Triangle Special',
            msg: 'Showing India 🇮🇳: Official Tricolour Flag, Mumbai Central & Golden Triangle!'
        },
        russia: {
            name: 'RUSSIA',
            code: 'RU',
            flag: 'russia.png',
            landmarkImg: 'sanb.jpeg',
            landmarkTitle: 'ST. PETERSBURG',
            price: '₹660',
            mainImg: 'sanb.jpeg',
            desc: 'Majestic imperial palaces, classical arts, and historic winter wonderlands.',
            likes: '8,420',
            chats: '3,810',
            packageDays: '6 Days & 5 Nights',
            pkgTitle: 'Russia - St. Petersburg & Moscow Imperial Tour',
            msg: 'Showing Russia 🇷🇺: Official National Flag, St. Petersburg & Historic Palaces!'
        },
        dubai: {
            name: 'DUBAI (UAE)',
            code: 'AE',
            flag: 'uae.svg',
            landmarkImg: 'long.jpg',
            landmarkTitle: 'BURJ KHALIFA',
            price: '₹4500',
            mainImg: 'long.jpg',
            desc: 'Futuristic architecture, luxury desert safaris, and dazzling skyline vistas.',
            likes: '16,780',
            chats: '11,240',
            packageDays: '6 Days & 5 Nights',
            pkgTitle: 'Dubai (UAE) - Burj Khalifa & Desert Safari Experience',
            msg: 'Showing Dubai (UAE) 🇦🇪: Official UAE Flag, Burj Khalifa & Luxury Stays!'
        },
        usa: {
            name: 'UNITED STATES',
            code: 'US',
            flag: 'united.png',
            landmarkImg: 'newyork.jpeg',
            landmarkTitle: 'NEW YORK CITY',
            price: '₹870',
            mainImg: 'newyork.jpeg',
            desc: 'Iconic Manhattan skyscrapers, Broadway culture, and world-class attractions.',
            likes: '14,920',
            chats: '9,680',
            packageDays: '7 Days & 6 Nights',
            pkgTitle: 'USA - New York Manhattan & Skyline Explorer',
            msg: 'Showing USA 🇺🇸: Stars & Stripes Flag, New York Manhattan & Central Park!'
        },
        brazil: {
            name: 'BRAZIL',
            code: 'BR',
            flag: 'brazil.svg',
            landmarkImg: 'barce.jpeg',
            landmarkTitle: 'RIO DE JANEIRO',
            price: '₹790',
            mainImg: 'barce.jpeg',
            desc: 'Vibrant carnival rhythm, golden tropical coastlines, and lush landscapes.',
            likes: '7,310',
            chats: '4,150',
            packageDays: '6 Days & 5 Nights',
            pkgTitle: 'Brazil - Rio de Janeiro & Copacabana Carnival Tour',
            msg: 'Showing Brazil 🇧🇷: Official Brazilian Flag, Rio de Janeiro & Tropical Coasts!'
        },
        vietnam: {
            name: 'VIETNAM',
            code: 'VN',
            flag: 'vietnam.svg',
            landmarkImg: 'mountain.jpg',
            landmarkTitle: 'MARBLE MOUNTAIN',
            price: '₹5000',
            mainImg: 'mountain.jpg',
            desc: 'Breathtaking karst peaks, serene ancient pagodas, and emerald waters.',
            likes: '11,460',
            chats: '7,890',
            packageDays: '5 Days & 4 Nights',
            pkgTitle: 'Vietnam - Da Nang Marble Mountain & Scenic Caves Tour',
            msg: 'Showing Vietnam 🇻🇳: Official Star Flag, Marble Mountain & Halong Bay!'
        },
        spain: {
            name: 'SPAIN',
            code: 'ES',
            flag: 'spain.png',
            landmarkImg: 'barce.jpeg',
            landmarkTitle: 'BARCELONA',
            price: '₹730',
            mainImg: 'barce.jpeg',
            desc: 'Gothic masterpiece architecture, sun-kissed beaches, and lively culinary tapas.',
            likes: '13,200',
            chats: '8,430',
            packageDays: '5 Days & 4 Nights',
            pkgTitle: 'Spain - Barcelona Gothic Quarter & Coastline Special',
            msg: 'Showing Spain 🇪🇸: Official Spanish Flag, Barcelona & Sagrada Família!'
        }
    };

    destItems.forEach(item => {
        item.addEventListener('click', () => {
            destItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const key = item.getAttribute('data-dest');
            const data = destData[key];

            if (data) {
                // 1. Update Active Country Flag Card in Details Box
                if (activeCountryFlagImg) {
                    activeCountryFlagImg.classList.remove('flag_pop');
                    void activeCountryFlagImg.offsetWidth; // trigger reflow
                    activeCountryFlagImg.src = data.flag;
                    activeCountryFlagImg.alt = `${data.name} Flag`;
                    activeCountryFlagImg.classList.add('flag_pop');
                }
                if (activeCountryName) activeCountryName.textContent = data.name;
                if (activeCountryCode) activeCountryCode.textContent = data.code;
                if (activeCountryDesc) activeCountryDesc.textContent = data.desc;

                // 2. Update Floating Flag Card (#floatCard1)
                if (floatImg1) {
                    floatImg1.classList.remove('flag_pop');
                    void floatImg1.offsetWidth; // trigger reflow
                    floatImg1.src = data.flag;
                    floatImg1.alt = `${data.name} Flag`;
                    floatImg1.classList.add('flag_pop');
                }
                if (floatTitle1) floatTitle1.textContent = data.name;
                if (floatLikes1) floatLikes1.textContent = data.likes;
                if (floatChats1) floatChats1.textContent = data.chats;

                // 3. Update Floating Landmark Card (#floatCard2)
                if (floatImg2) {
                    floatImg2.src = data.landmarkImg;
                    floatImg2.alt = data.landmarkTitle;
                }
                if (floatTitle2) floatTitle2.textContent = data.landmarkTitle;
                if (floatPriceTag) floatPriceTag.textContent = `From ${data.price}`;

                // 4. Update Main Showcase Image with smooth transition
                if (destMainImg) {
                    destMainImg.style.opacity = '0';
                    destMainImg.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        destMainImg.src = data.mainImg;
                        destMainImg.style.opacity = '1';
                        destMainImg.style.transform = 'scale(1)';
                    }, 180);
                }

                // 5. Toast Feedback
                showToast(data.msg, 'success');
            }
        });
    });

    if (destMoreInfoBtn) {
        destMoreInfoBtn.addEventListener('click', () => {
            const activeItem = document.querySelector('.dest_item.active');
            const key = activeItem ? activeItem.getAttribute('data-dest') : 'india';
            const data = destData[key] || destData.india;
            
            openPackageModal({
                title: data.pkgTitle || `${data.name} Luxury Explorer Package`,
                price: data.price || '₹2999',
                days: data.packageDays || '6 Days & 5 Nights',
                location: `${data.landmarkTitle}, ${data.name}`,
                img: data.landmarkImg || (destMainImg ? destMainImg.src : 'air3.png')
            });
        });
    }

    // --- 9. Community Section Actions ---
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', () => {
            openBookingModal('Community Registration');
            showToast('Welcome to the MR.Travel Global Community! 🌍', 'success');
        });
    }

    if (readStoriesBtn) {
        readStoriesBtn.addEventListener('click', () => {
            showToast('Loading latest traveler reviews and blogs...', 'info');
            const offers = document.getElementById('offers');
            if (offers) offers.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- 10. Modals Management ---
    function openPackageModal({ title, price, days, location, img }) {
        if (!packageModal) return;
        if (modalPkgTitle) modalPkgTitle.textContent = title;
        if (modalPkgPrice) modalPkgPrice.textContent = price;
        if (modalPkgDays) modalPkgDays.innerHTML = `<i class="bi bi-clock-history"></i> ${days}`;
        if (modalPkgLocation) modalPkgLocation.innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${location}`;
        if (modalPkgImg && img) modalPkgImg.src = img;

        packageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePackageModal() {
        if (packageModal) packageModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (packageModalClose) packageModalClose.addEventListener('click', closePackageModal);
    if (modalCloseActionBtn) modalCloseActionBtn.addEventListener('click', closePackageModal);

    if (modalBookNowBtn) {
        modalBookNowBtn.addEventListener('click', () => {
            const title = modalPkgTitle ? modalPkgTitle.textContent : '';
            closePackageModal();
            openBookingModal(title);
        });
    }

    function openBookingModal(preselectedDest = '') {
        if (!bookingModal) return;
        if (bookDest && preselectedDest) {
            // Find closest matching option or set value
            let matched = false;
            for (let i = 0; i < bookDest.options.length; i++) {
                if (bookDest.options[i].text.toLowerCase().includes(preselectedDest.toLowerCase())) {
                    bookDest.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
        }
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeBookingModal() {
        if (bookingModal) bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navRegisterBtn) {
        navRegisterBtn.addEventListener('click', () => {
            openBookingModal();
        });
    }

    if (bookingModalClose) bookingModalClose.addEventListener('click', closeBookingModal);
    if (bookingCancelBtn) bookingCancelBtn.addEventListener('click', closeBookingModal);

    // Close modals on overlay backdrop click
    [packageModal, bookingModal, supportModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // Close modals on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePackageModal();
            closeBookingModal();
            closeSupportModal();
            closeMobileMenu();
        }
    });

    // Booking Form Submit Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('bookName').value.trim();
            const email = document.getElementById('bookEmail').value.trim();
            const dest = document.getElementById('bookDest').value;

            if (!name || !email) {
                showToast('Please fill in your name and email!', 'info');
                return;
            }

            closeBookingModal();
            showToast(`Thank you, ${name}! Your booking for ${dest} is received. Confirmation sent to ${email} 🎉`, 'success');
            bookingForm.reset();
        });
    }

    // --- 11. Newsletter Subscription ---
    function handleNewsletter() {
        if (!newsletterEmail) return;
        const email = newsletterEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            showToast('Please enter a valid email address!', 'info');
            newsletterEmail.focus();
            return;
        }

        newsletterEmail.value = '';
        showToast(`Subscribed! Check ${email} for your 25% discount voucher 🎉`, 'success');
    }

    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', handleNewsletter);
    }

    if (newsletterEmail) {
        newsletterEmail.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletter();
            }
        });
    }

    // --- 12. Support & Legal Modal Functions ---
    function switchLegalTab(targetTab) {
        if (!targetTab) targetTab = 'faq';

        // Update tab buttons
        legalTabBtns.forEach(btn => {
            const isMatch = btn.getAttribute('data-target') === targetTab;
            btn.classList.toggle('active', isMatch);
            btn.setAttribute('aria-selected', isMatch ? 'true' : 'false');
        });

        // Update tab content panes
        legalTabPanes.forEach(pane => {
            const isMatch = pane.id === `pane-${targetTab}`;
            pane.classList.toggle('active', isMatch);
        });

        // Scroll modal body to top on tab change
        const modalBody = document.querySelector('.legal_modal_body');
        if (modalBody) modalBody.scrollTop = 0;
    }

    function openSupportModal(targetTab = 'faq') {
        if (!supportModal) return;
        switchLegalTab(targetTab);
        supportModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSupportModal() {
        if (supportModal) supportModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (supportModalClose) supportModalClose.addEventListener('click', closeSupportModal);
    if (supportModalCloseBtn) supportModalCloseBtn.addEventListener('click', closeSupportModal);

    // Tab buttons click handler inside modal
    legalTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchLegalTab(target);
        });
    });

    // FAQ Accordions toggle
    faqItems.forEach(item => {
        const question = item.querySelector('.faq_question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                // Close all other items for clean accordion UX
                faqItems.forEach(otherItem => otherItem.classList.remove('open'));
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        }
    });

    // Footer Support & Legal Clickable Links
    footerLinkBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab') || 'faq';
            openSupportModal(targetTab);
        });
    });

    // --- 13. Metric Stat Cards Click Navigation ---
    const statCards = document.querySelectorAll('.stat_card');
    statCards.forEach(card => {
        function triggerStatAction() {
            const targetSelector = card.getAttribute('data-target');
            if (targetSelector) {
                const targetElement = document.querySelector(targetSelector);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Visual pulse feedback on target
                    targetElement.classList.add('section-highlight');
                    setTimeout(() => targetElement.classList.remove('section-highlight'), 1200);

                    // If community card clicked, focus newsletter field
                    if (targetSelector === '#community' && newsletterEmail) {
                        setTimeout(() => newsletterEmail.focus(), 600);
                    }
                }
            }
        }

        card.addEventListener('click', triggerStatAction);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerStatAction();
            }
        });
    });

    // --- 14. Back to Top Button ---
    window.addEventListener('scroll', () => {
        if (!backToTopBtn) return;
        if (window.scrollY > 350) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});