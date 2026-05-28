document.addEventListener("DOMContentLoaded", () => {
    // 1. Force Night Mode
    const starsContainer = document.getElementById("stars-container");
    const troupeSpiderEgg = document.getElementById("troupe-spider-egg");
    
    document.body.classList.replace("day-mode", "night-mode");
    if (starsContainer) starsContainer.style.opacity = "1";
    if (troupeSpiderEgg) troupeSpiderEgg.style.display = "block";

    // 2. License Card Flip
    const licenseCards = document.querySelectorAll("#hunter-license-card, .hunter-card-wrapper, .hunter-license-container");
    licenseCards.forEach(card => {
        card.addEventListener("click", (e) => {
            e.stopPropagation();
            card.classList.toggle("flipped");
            document.body.classList.toggle("license-is-flipped");
            const hero = document.querySelector(".hero-section");
            if (hero) hero.classList.toggle("hud-active");
        });


    // Image Modal Logic
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");

    const expImages = document.querySelectorAll(".board-photo-frame img");
    
    if (modal && modalImg && expImages.length > 0) {
        expImages.forEach(img => {
            img.addEventListener("click", function() {
                modal.style.display = "block";
                // Trigger reflow for transition
                setTimeout(() => { modal.classList.add("show"); }, 10);
                modalImg.src = this.src;
            });
        });

        const closeModal = () => {
            modal.classList.remove("show");
            setTimeout(() => { modal.style.display = "none"; }, 300);
        };

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        
        // Close when clicking outside the image
        modal.addEventListener("click", function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    });

    // Guestbook Message Bottle
    const guestbookBtns = [document.getElementById("open-guestbook-btn"), document.getElementById("bottle-interactive")];
    const scrollForm = document.getElementById("scroll-form");
    const scrollCloseBtn = document.getElementById("scroll-close-btn");
    const guestbookForm = document.getElementById("guestbook-form");
    const bottlesSea = document.getElementById("bottles-sea");

    if (scrollForm) {
        guestbookBtns.forEach(btn => {
            if (btn) btn.addEventListener("click", (e) => {
                e.stopPropagation();
                scrollForm.classList.remove("hidden");
            });
        });
        if (scrollCloseBtn) {
            scrollCloseBtn.addEventListener("click", (e) => {
                e.preventDefault();
                scrollForm.classList.add("hidden");
            });
        }
    }

    if (guestbookForm && bottlesSea) {
        let msgs = JSON.parse(localStorage.getItem("guestbookMessages") || "[]");
        if (msgs.length === 0) {
            msgs = [
                { name: "Hệ thống", msg: "Chúc bạn Tùng học tập thật tốt!" }
            ];
            localStorage.setItem("guestbookMessages", JSON.stringify(msgs));
        }

        const renderBottles = () => {
            bottlesSea.innerHTML = "";
            msgs.forEach((m, idx) => {
                const b = document.createElement("div");
                b.className = "message-bottle";
                b.innerHTML = `
                    <button class="bottle-delete-btn" data-index="${idx}" title="Admin Delete">&times;</button>
                    <div class="treasure-map-paper">
                        <div class="bottle-name"><strong>${m.name}</strong></div>
                        <div class="bottle-msg">${m.msg}</div>
                    </div>
                `;
                bottlesSea.appendChild(b);
            });
            
            // Add delete event listeners
            document.querySelectorAll(".bottle-delete-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const pass = prompt("Nhập mật khẩu Admin để xóa chai này:");
                    if (pass === "admin" || pass === "tung123") {
                        const idx = parseInt(btn.getAttribute("data-index"));
                        msgs.splice(idx, 1);
                        localStorage.setItem("guestbookMessages", JSON.stringify(msgs));
                        renderBottles();
                    } else if (pass !== null) {
                        alert("Sai mật khẩu Admin!");
                    }
                });
            });
        };
        renderBottles();

        guestbookForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("visitor-name")?.value;
            const msg = document.getElementById("visitor-msg")?.value;
            if(name && msg) {
                msgs.push({name, msg});
                localStorage.setItem("guestbookMessages", JSON.stringify(msgs));
                renderBottles();
                guestbookForm.reset();
                scrollForm.classList.add("hidden");
            }
        });
    }

    // 3. Spell Cards Flip
        // Avatar Deck Shuffle
    if (typeof initPfpStack === 'function') initPfpStack();
    if (typeof initCarousel === 'function') initCarousel();

    const spellCards = document.querySelectorAll(".gi-spell-card, .gi-card-container");
    spellCards.forEach(card => {
        card.addEventListener("click", () => {
            const inner = card.querySelector(".gi-card-inner");
            if (inner) inner.classList.toggle("flipped");
            else card.classList.toggle("flipped");
        });
    });

    // 4. Memory Modal (Treasure Modal)
    const traitsRow = document.getElementById("traits-row-interactive");
    const memoryModal = document.getElementById("treasure-modal");
    
    if (traitsRow && memoryModal) {
        traitsRow.addEventListener("click", () => {
            memoryModal.classList.remove("hidden");
            memoryModal.classList.add("show");
            memoryModal.style.display = "flex";
            memoryModal.style.opacity = "1";
            memoryModal.style.visibility = "visible";
            
            const carousel = document.getElementById("beach-carousel");
            if (carousel) {
                carousel.classList.remove("hidden");
                if (window.resetCarousel) window.resetCarousel();
            }
            
            const mTitle = document.getElementById("modal-title");
            const mDesc = document.getElementById("modal-description");
            const mNo = document.getElementById("modal-card-no");
            const mRank = document.getElementById("modal-card-rank");
            const mIcon = document.getElementById("modal-icon");
            const effectTitle = document.querySelector(".gi-card-effect-title");
            
            if(mTitle) mTitle.innerText = "Memory Star";
            if(mDesc) mDesc.innerText = "I cherish making lasting memories with those around me, and I have a profound love for golden sandy beaches and breathtaking coastal landscapes.";
            if(mNo) mNo.innerText = "No. 005";
            if(mRank) { mRank.innerText = "Rank S"; mRank.className = "gi-card-rank rank-s"; }
            if(mIcon) mIcon.innerHTML = "🌟";
            if(effectTitle) effectTitle.innerText = "Magical Card Effect:";
        });
        
        const closeBtn = memoryModal.querySelector(".modal-close, .modal-close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                memoryModal.classList.remove("show");
                memoryModal.classList.add("hidden");
                memoryModal.style.display = "none";
                memoryModal.style.opacity = "0";
                memoryModal.style.visibility = "hidden";
                
                const carousel = document.getElementById("beach-carousel");
                if (carousel) carousel.classList.add("hidden");
            });
        }
    }

    // 5. Carousel Logic
    const track = document.getElementById("carousel-track-inner");
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    let currentSlide = 0;
    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide === 0) ? 2 : currentSlide - 1;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide === 2) ? 0 : currentSlide + 1;
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
        });
    }

    // 6. Music Play/Pause
    const musicBtn = document.getElementById("theme-toggle"); // Often reused for music if theme is removed
    const audio = document.getElementById("bg-music");
    const soundOn = document.querySelector(".sound-on");
    const soundOff = document.querySelector(".sound-off");
    
    if (musicBtn && audio) {
        musicBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                if(soundOn) soundOn.classList.remove("hidden");
                if(soundOff) soundOff.classList.add("hidden");
            } else {
                audio.pause();
                if(soundOn) soundOn.classList.add("hidden");
                if(soundOff) soundOff.classList.remove("hidden");
            }
        });
    }

    // 7. Slime Game Initialization
    if (typeof window.initSlimeGame === "function") {
        window.initSlimeGame();
    }
});


/* ==========================================================================
   SLIME SLAM MINI-GAME LOGIC
   ========================================================================== */
function initSlimeGame() {
    const openBtn = document.getElementById("open-slime-game-btn");
    const modal = document.getElementById("slime-game-modal");
    const closeBtn = document.getElementById("slime-close-btn");
    const playArea = document.getElementById("slime-play-area");
    
    const startBtn = document.getElementById("start-slime-btn");
    const restartBtn = document.getElementById("restart-slime-btn");
    const startOverlay = document.getElementById("slime-start-overlay");
    const gameOverOverlay = document.getElementById("slime-game-over-overlay");
    
    const scoreText = document.getElementById("slime-score");
    const timerText = document.getElementById("slime-timer");
    const finalScoreText = document.getElementById("final-slime-score");

    if (!openBtn || !modal) return;

    let score = 0;
    let timeLeft = 30;
    let gameInterval = null;
    let spawnInterval = null;
    let isPlaying = false;
    let activeSlimes = [];

    // Open/Close Modal
    openBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        resetGameUI();
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        endGame();
    });

    // Start buttons
    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);

    function resetGameUI() {
        score = 0;
        timeLeft = 30;
        updateStats();
        startOverlay.classList.remove("hidden");
        gameOverOverlay.classList.add("hidden");
        clearAllSlimes();
    }

    function updateStats() {
        scoreText.textContent = `Score: ${score}`;
        timerText.textContent = `Time: ${timeLeft}s`;
    }

    function startGame() {
        if (isPlaying) return;
        isPlaying = true;
        score = 0;
        timeLeft = 30;
        updateStats();
        
        startOverlay.classList.add("hidden");
        gameOverOverlay.classList.add("hidden");
        clearAllSlimes();

        // Timer Loop
        gameInterval = setInterval(() => {
            timeLeft--;
            updateStats();
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        // Spawn Loop
        spawnInterval = setInterval(spawnSlime, 600); // spawn every 0.6s
    }

    function spawnSlime() {
        if (!isPlaying) return;
        
        const slime = document.createElement("div");
        slime.className = "slime-enemy active";
        slime.textContent = "🦠"; // Slime emoji
        
        // Random position within play area bounds (approx 60x60 size)
        const maxX = playArea.clientWidth - 80;
        const maxY = playArea.clientHeight - 80;
        
        const randomX = Math.max(10, Math.floor(Math.random() * maxX));
        const randomY = Math.max(10, Math.floor(Math.random() * maxY));
        
        slime.style.left = `${randomX}px`;
        slime.style.top = `${randomY}px`;
        
        // Click event to whack
        slime.addEventListener("click", (e) => {
            if (slime.classList.contains("whacked")) return;
            e.stopPropagation(); // don't click anything else
            
            slime.classList.add("whacked");
            score += 10;
            updateStats();
            
            // Floating score text
            const floatText = document.createElement("div");
            floatText.className = "floating-score";
            floatText.textContent = "+10";
            floatText.style.left = `${randomX + 15}px`;
            floatText.style.top = `${randomY}px`;
            playArea.appendChild(floatText);
            
            setTimeout(() => {
                if (playArea.contains(floatText)) playArea.removeChild(floatText);
                if (playArea.contains(slime)) playArea.removeChild(slime);
            }, 800);
        });

        playArea.appendChild(slime);
        activeSlimes.push(slime);
        
        // Auto-remove if not clicked within random time (1s to 2s)
        const lifespan = 1000 + Math.random() * 1000;
        setTimeout(() => {
            if (playArea.contains(slime) && !slime.classList.contains("whacked")) {
                slime.classList.remove("active");
                setTimeout(() => {
                    if (playArea.contains(slime)) playArea.removeChild(slime);
                }, 200);
            }
        }, lifespan);
    }

    function clearAllSlimes() {
        // Remove all dynamically added children from play area except the overlays
        const children = Array.from(playArea.children);
        children.forEach(child => {
            if (!child.classList.contains("slime-overlay")) {
                playArea.removeChild(child);
            }
        });
        activeSlimes = [];
    }

    function endGame() {
        isPlaying = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        
        finalScoreText.textContent = score;
        gameOverOverlay.classList.remove("hidden");
    }
}

function initPfpStack() {
    const stack = document.getElementById("pfp-stack");
    if (!stack) return;
    
    const cards = Array.from(stack.querySelectorAll(".stacked-card"));
    const maxZ = cards.length;
    
    // Initialize z from data-index (1=bottom, maxZ=top)
    cards.forEach(card => {
        const z = parseInt(card.dataset.index) || 1;
        card.dataset.z = z;
        card.style.zIndex = z;
        card.style.setProperty("--z-index", z);
        updateCardClass(card, z, maxZ);
        card.classList.toggle("active", z === maxZ);
    });
    
    stack.addEventListener("click", () => {
        // Find top card (highest z)
        let topCard = cards.reduce((best, c) =>
            parseInt(c.dataset.z) > parseInt(best.dataset.z) ? c : best
        , cards[0]);
        
        // Removed playChime because it might not be defined
        if (typeof playChime === 'function') playChime(440.00, 0.18);
        
        topCard.classList.add("cycle-out");
        
        setTimeout(() => {
            cards.forEach(c => {
                let z = parseInt(c.dataset.z);
                // Rotate z-indices sequentially: top card goes to bottom (1), others move up (+1)
                z = (c === topCard) ? 1 : z + 1;
                c.dataset.z = z;
                c.style.zIndex = z;
                c.style.setProperty("--z-index", z);
                updateCardClass(c, z, maxZ);
                c.classList.toggle("active", z === maxZ);
            });
            topCard.classList.remove("cycle-out");
        }, 450);
    });
}

function updateCardClass(card, z, maxZ) {
    // Remove any existing card-N class
    [...card.classList].forEach(cls => {
        if (/^card-\d+$/.test(cls)) card.classList.remove(cls);
    });
    // z=1  most behind (card-6 CSS), z=maxZ  top (card-1 CSS)
    const map = {1:"card-6", 2:"card-4", 3:"card-3", 4:"card-2", 5:"card-1", 6:"card-1"};
    const cls = map[Math.min(z, 6)];
    if (cls) card.classList.add(cls);
}


let currentSlideIndex = 0;
function initCarousel() {
    const prevBtn = document.getElementById("carousel-prev-btn");
    const nextBtn = document.getElementById("carousel-next-btn");
    const track = document.getElementById("carousel-track-inner");
    const indicator = document.getElementById("carousel-indicator-text");
    
    if (!prevBtn || !nextBtn || !track) return;
    
    function showSlide(index) {
        currentSlideIndex = index;
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        if (indicator) indicator.textContent = `${currentSlideIndex + 1}/3`;
    }
    
    prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if(typeof playChime === 'function') playChime(783.99, 0.1);
        let idx = currentSlideIndex - 1;
        if (idx < 0) idx = 2;
        showSlide(idx);
    });
    
    nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if(typeof playChime === 'function') playChime(783.99, 0.1);
        let idx = currentSlideIndex + 1;
        if (idx > 2) idx = 0;
        showSlide(idx);
    });
    
    window.resetCarousel = () => showSlide(0);
}


    // 5. Wavy Title Animation
    const wavyTexts = document.querySelectorAll(".wavy-text");
    wavyTexts.forEach(el => {
        if (!el.classList.contains("wavy-applied")) {
            const text = el.textContent.trim();
            el.innerHTML = "";
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement("span");
                if (text[i] === " ") {
                    span.innerHTML = "&nbsp;";
                } else {
                    span.innerText = text[i];
                    // Random delay between 0 and 2 seconds
                    span.style.animationDelay = `${Math.random() * 2}s`;
                }
                span.className = "wavy-char";
                el.appendChild(span);
            }
            el.classList.add("wavy-applied");
        }
    
    // 6. Scroll Spy for Navigation Links
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${currentId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(sec => {
        if(sec.id) {
            observer.observe(sec);
        }
    });

    // 7. Nen Provoker Logic
    const provokeNenBtn = document.getElementById("provoke-nen-btn");
    const nenActionContainer = document.getElementById("nen-action-container");
    const nenResultContainer = document.getElementById("nen-result-container");
    const nenResultText = document.getElementById("nen-result-text");
    const nenCardGlow = document.getElementById("nen-card-glow");

    const nenTypes = [
        { name: "Enhancement", class: "nen-enhancement", color: "rgba(74, 222, 128, 0.6)" },
        { name: "Emission", class: "nen-emission", color: "rgba(253, 224, 71, 0.6)" },
        { name: "Manipulation", class: "nen-manipulation", color: "rgba(203, 213, 225, 0.6)" },
        { name: "Specialization", class: "nen-specialization", color: "rgba(96, 165, 250, 0.6)" },
        { name: "Conjuration", class: "nen-conjuration", color: "rgba(248, 113, 113, 0.6)" },
        { name: "Transmutation", class: "nen-transmutation", color: "rgba(192, 132, 252, 0.6)" }
    ];

    if (provokeNenBtn) {
        provokeNenBtn.addEventListener("click", () => {
            // Hide button, show result container
            nenActionContainer.style.display = "none";
            nenResultContainer.style.display = "flex";
            nenResultText.className = "nen-result-text nen-scanning";
            nenCardGlow.style.boxShadow = "none";

            let scanCount = 0;
            const scanInterval = setInterval(() => {
                const randomType = nenTypes[Math.floor(Math.random() * nenTypes.length)];
                nenResultText.textContent = randomType.name;
                nenResultText.className = `nen-result-text nen-scanning ${randomType.class}`;
                scanCount++;

                // Stop scanning after 2.5 seconds (approx 50 loops at 50ms)
                if (scanCount > 50) {
                    clearInterval(scanInterval);
                    
                    // Pick final result
                    const finalType = nenTypes[Math.floor(Math.random() * nenTypes.length)];
                    nenResultText.textContent = finalType.name;
                    nenResultText.className = `nen-result-text nen-final ${finalType.class}`;
                    
                    // Add cool glow to the card
                    nenCardGlow.style.boxShadow = `0 0 40px ${finalType.color}, inset 0 0 20px ${finalType.color}`;
                    
                    // Allow resetting after 3 seconds by showing button again
                    setTimeout(() => {
                        nenActionContainer.style.display = "block";
                        provokeNenBtn.innerHTML = "<span>🔄 Reroll Nen Type</span>";
                    }, 3000);
                }
            }, 50);
        });
    }

    // 8. Background Music Logic
    const soundToggleBtn = document.getElementById('sound-toggle');
    const bgMusic = document.getElementById('bg-music');
    if (soundToggleBtn && bgMusic) {
        const soundOnIcon = soundToggleBtn.querySelector('.sound-on');
        const soundOffIcon = soundToggleBtn.querySelector('.sound-off');
        
        soundToggleBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                soundOnIcon.classList.remove('hidden');
                soundOffIcon.classList.add('hidden');
            } else {
                bgMusic.pause();
                soundOnIcon.classList.add('hidden');
                soundOffIcon.classList.remove('hidden');
            }
        });
    }
});

    // Music Toggle Logic
    const musicBtn = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");
    let isMusicPlaying = false;
    
    if (musicBtn && bgMusic) {
        // Try to play immediately if browser allows, otherwise wait for click
        // But usually browsers block autoplay, so we just wait for interaction
        
        musicBtn.addEventListener("click", () => {
            if (isMusicPlaying) {
                bgMusic.pause();
                musicBtn.textContent = "🔇";
                isMusicPlaying = false;
            } else {
                bgMusic.play().then(() => {
                    musicBtn.textContent = "🔊";
                    isMusicPlaying = true;
                }).catch(err => {
                    console.log("Audio playback failed:", err);
                });
            }
        });
    }
