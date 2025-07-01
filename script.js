// ========================================
// ========================================
// ========================================
// ========================================

let vh = window.innerHeight;
window.addEventListener("resize", () => {
    vh = window.innerHeight;
});
window.addEventListener('DOMContentLoaded', () => {
// ======================================== //
// ============== INITIALIZE ============== //
    // Register ScrollTrigger plugin from GSAP
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth Scrolling Menu
    document.querySelectorAll(".menu-link[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = link.getAttribute("href");
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 0 // change this if you have a fixed header (e.g., offsetY: 80)
                },
                ease: "power2.out"
            });
        });
    });
// ========================================
// REFERENCING
    
    // Hero name
    const header = document.querySelector('header');
    const heroWrapper = document.querySelector('.hero-name-wrapper');
    const heroBox = document.querySelector('.hero-name-scale-box');
    const heroName = document.querySelector('.hero-name');
    const heroHeight = getComputedStyle(heroName).getPropertyValue('--image-height').trim();

    // Navbar Control
    const burger = document.querySelector('.burger');
    const headerBackdrop = document.querySelector('.header-backdrop');
        // const closeMenu = document.querySelector('.closeMenu');

    // Cover
    const coverContent = document.querySelector('.cover-content');
    const coverLayer = document.querySelector('.cover-layer');
    
    // Game
    // document.querySelectorAll('.game-content h1').forEach(gameName => {
    //     fitTextToOneLine(gameName);
    // });
    //
    // function fitTextToOneLine(element, maxFontSize = 300, minFontSize = 10) {
    //     let fontSize = maxFontSize;
    //     element.style.whiteSpace = 'nowrap';
    //     element.style.fontSize = fontSize + 'px';
    //
    //     while (element.scrollWidth > element.clientWidth && fontSize > minFontSize) {
    //         fontSize -= 1;
    //         element.style.fontSize = fontSize + 'px';
    //     }
    // }
// ============ END INITIALIZE ============ //
// ======================================== //

// ========================================
// Navbar Control
    function toggleMobileNav() {
        document.getElementById('mobileMenu').classList.toggle('show');
    }
    window.toggleMobileNav = toggleMobileNav;

// ========================================
// Cover Control
    function calculateCover() {
        const viewportHeight = window.innerHeight;
        if (viewportHeight > 1440) return;
        const scaleFactor = viewportHeight / 1440;
        const translateYAmount = 0;
        // const translateYAmount = (1440 - viewportHeight) / 2;
        coverLayer.style.transform = `scale(${scaleFactor})`;
        // coverLayer.style.transformOrigin = 'top left';
        console.log(`${scaleFactor}`);
        // coverLayer.style.transform = `scale(${scaleFactor}) translateY(${translateYAmount}px)`;
    }
    calculateCover();
    window.addEventListener('resize', calculateCover);


    // document.querySelectorAll(".game-content").forEach(contentBlock => {
    //     const bg = contentBlock.querySelector(".background");
    //     if (bg) {
    //         gsap.to(bg, {
    //             scrollTrigger: {
    //                 trigger: contentBlock,
    //                 start: "top top",
    //                 end: "bottom top",
    //                 scrub: true,
    //                 pin: true,
    //                 pinSpacing: false
    //             }
    //         });
    //     }
    // });

    // ========================================
    // Initial Page Load Animation
    function runInitialAnimations() {
        const onLoadTL = gsap.timeline({defaults: {ease: "power2.out"}});
        // onLoadTL
    }

    // ========================================
    // Floating Image Animating
    document.querySelectorAll(".floating-image").forEach(img => {
        const wrapper = img.closest(".about-content");
        gsap.to(img, {
            y: -500, // Adjust depth as desired
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",   // Start when section enters viewport
                end: "bottom top",     // End when section leaves viewport
                scrub: true
            }
        });
    });

    function pinAndAnimate({trigger, endTrigger, pin, animations, markers = false, headerOffset = 0,}){
        // Define scroll end position with header offset
        const end = `top top+=${headerOffset}`;
        // Create a GSAP timeline connected to ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: `top top+=${headerOffset}`,
                endTrigger,
                end,
                scrub: true,
                pin,
                pinSpacing: false,
                markers: markers, // for debugging
                invalidateOnRefresh: true, // ensures recalculation on resize
            },
        });
        // Loop through each animation object
        animations.forEach(({target, vars, position = 0}) => {
            tl.to(target, vars, position);
        });
    }

    // END Initial Page Load Animation
    // ========================================


    // ========================================
    // .hero-name & .cover => GSAP Scroll Trigger  

    let resizeObserverInitialized = false;

    function resizeHeroBox() {
        const heroBox = document.querySelector('.hero-name-scale-box');
        if (!heroBox || !heroBox.parentElement) return;
        const parent = heroBox.parentElement;
        const parentHeight = parent.offsetHeight;
        const vh = window.innerHeight;
        const boxHeight = parentHeight * (vh / 1440);
        heroBox.style.height = `${boxHeight}px`;

        // Initialize observer only once
        if (!resizeObserverInitialized) {
            // Observe parent height changes
            const observer = new ResizeObserver(() => resizeHeroBox());
            observer.observe(parent);

            // Update on viewport resize
            window.addEventListener('resize', resizeHeroBox);

            resizeObserverInitialized = true;
        }
    }


    function setupScrollAnimations() {
        //     const headerBackground = document.querySelector('.header-background');
        //     const wrapper = document.querySelector(".hero-name-wrapper");
        //     const name = document.querySelector(".hero-name");
        //     const headerOffset = 0;
        //
        //     // Reset state
        //     gsap.set(wrapper, { clearProps: "all" });
        //     gsap.set(headerBackground, { clearProps: "all" });
        //     // gsap.set(name, { clearProps: "all" });
        //     wrapper.classList.remove("fixed");
        //     ScrollTrigger.matchMedia({
        //         // Desktop scroll animations
        //         "(min-width: 769px)": function () {
        //             pinAndAnimate({
        //                 trigger: "body",
        //                 endTrigger: ".about",
        //                 pin: "none",
        //                 animations: [
        //                     {
        //                         target: name, vars: {
        //                             top: 0,
        //                             yPercent: -30,
        //                             scale: 0.25,
        //                             ease: "none"
        //                         }
        //                     },
        //                     {
        //                         target: headerBackground, vars: {
        //                             top: 0,
        //                             ease: "none"
        //                         }
        //                     },
        //                 ],
        //                 headerOffset,
        //             });
        //            
        //         },
        //         "(max-width: 768px)": function () {
        //             pinAndAnimate({
        //                 trigger: "body",
        //                 endTrigger: ".about",
        //                 pin: "none",
        //                 animations: [
        //                     {
        //                         target: name, vars: {
        //                             top: 0,
        //                             yPercent: -37.5,
        //                             scale: 0.25,
        //                             ease: "none"
        //                         }
        //                     },
        //                 ],
        //                 headerOffset,
        //             });
        //         }
        //     });
    }

    function setupCoverAnimations() {
        if (!heroWrapper) return;
        const layers = gsap.utils.toArray('.layer');
        const parallaxSpeed = 1.5;
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".cover",
                start: `top top`,
                endTrigger: ".about",
                end: `top top-=60rem`,
                pin: "none",
                pinSpacing: false,
                markers: false,
                scrub: true,
                invalidateOnRefresh: true,
            }
        })

        tl
            .to(heroWrapper, {height: 0, ease: "none"}, 0)
            .to(heroName, {height: 0, ease: "none"}, 0)
            .to(coverContent,
                {
                    scale: () => {
                        const ratio = window.innerWidth / window.innerHeight;
                        const baseAR = 16 / 9;
                        const norm = ratio / baseAR;
                        if (norm > 1) {
                            return norm;
                        } else {
                            return 1 - ((1 - norm) * (1 - norm));
                        }
                    },
                    ease: "power1.out"
                },
                0
            )
        ;
        layers.forEach(layer => {
                const intensity = parseFloat(layer.dataset.intensity);
                const destination = 1440 * intensity * parallaxSpeed;
                tl.to(
                    layer,
                    {
                        y: `+=${destination}`,
                        ease: 'power1.in',
                    },
                    0
                )
            }
        );
    }

    // END .hero-name & .cover => GSAP Scroll Trigger  
    // ========================================
    gsap.set(".text-split", {opacity: 1})

    document.querySelectorAll('.words-slide-up').forEach(element => {
        let timeline = gsap.timeline({paused: true});
        timeline.from(
            element.querySelectorAll(".word"),
            {
                opacity: 0,
                yPercent: 100,
                duration: 0.5,
                ease: "back.out(2)",
                stagger: {amount: 0.35},
            })
        createScrollTrigger(element, element, timeline)
    })

    function aboutTeamAnimation() {
        const corpPhoto = document.querySelector('.corp-photo');
        const twoColumn = document.querySelector('.two-column-counter');
        const pin1 = document.querySelector('#pin-1');
        const pin2 = document.querySelector('#pin-2');
        const counterText1 = document.querySelector('#counter-text-1');
        const counter1 = document.querySelector('#counter-members');
        const counterValue1 = {val: 0};
        const title1 = document.querySelector('#title-members');
        const counterText2 = document.querySelector('#counter-text-2');
        const counter2 = document.querySelector('#counter-nationalities');
        const counterValue2 = {val: 0};
        const title2 = document.querySelector('#title-nationalities');
        const photoRotate = document.querySelector('.corp-photo-rotate');
        if (corpPhoto && pin1 && pin2 && counter1 && counter2 && title1 && title2) {
            let animationTl = gsap.timeline({paused: true});
            animationTl
                .from(
                    corpPhoto,
                    {
                        opacity: 0,
                        yPercent: 100,
                        scale: 3,
                        rotate: -50,
                        duration: 0.3,
                        ease: "power.in(2)",
                    },
                    0
                )
                .from(
                    pin1,
                    {
                        opacity: 0,
                        yPercent: -100,
                        ease: "power.in",
                    },
                    0
                )
                .from(
                    counterText1,
                    {opacity: 0},
                    0.2
                )
                .to(
                    counterValue1,
                    {
                        val: 35,
                        duration: 0.8,
                        ease: "power1.out",
                        onUpdate: function () {
                            counter1.textContent = Math.floor(counterValue1.val);
                        }
                    },
                    0.2
                )
                .from(
                    title1,
                    {
                        opacity: 0,
                        yPercent: -100,
                        ease: "power.in",
                    },
                    0.5
                )
                .from(
                    pin2,
                    {
                        opacity: 0,
                        yPercent: -100,
                        ease: "power.in",
                    },
                    0.8
                )
                .from(
                    counterText2,
                    {opacity: 0},
                    1
                )
                .to(
                    counterValue2,
                    {
                        val: 5,
                        duration: 0.2,
                        ease: "power1.out",
                        onUpdate: function () {
                            counter2.textContent = Math.floor(counterValue2.val);
                        }
                    },
                    1.1
                )
                .from(
                    title2,
                    {
                        opacity: 0,
                        yPercent: -100,
                        ease: "power.in",
                    },
                    1.2
                );
            createScrollTrigger(corpPhoto, twoColumn, animationTl);
            
            let scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: photoRotate,
                    start: `top bottom`,
                    endTrigger: "about-end-gradient",
                    end: `bottom top`,
                    // end: `top top-=60rem`,
                    pin: "none",
                    pinSpacing: false,
                    markers: false,
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            })
            scrollTl.fromTo(
                photoRotate,
                { rotate: -10 }, // FROM
                { rotate: 10, ease: "none" }, // TO
                0);
        }
    }

    function createScrollTrigger(triggerElement, resetElement, timeline) {
        ScrollTrigger.create({
            trigger: resetElement,
            start: 'top bottom',
            onLeaveBack: () => {
                timeline.progress(0).pause();
            }
        });
        ScrollTrigger.create({
            trigger: triggerElement,
            start: 'top 75%',
            onEnter: () => {
                timeline.play();
            }
        });
    }

    
    // ========================================
    // .about => GSAP Scroll Trigger  
    // END .about => GSAP Scroll Trigger  
    // ========================================
// TODO: Implement game-section 250619


    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // ======================================== //
    // function calling section.
    resizeHeroBox();
    setupCoverAnimations();
    aboutTeamAnimation();
    ScrollTrigger.refresh();


    // ======================================== //
    // Navbar Toggle
    if (header && burger) {
        burger.addEventListener("click", function () {
            burger.classList.toggle("is-active");
            header.classList.toggle("menu-is-active");
            document.body.setAttribute("data-lenis-prevent", "");
        });

        headerBackdrop.addEventListener("click", function () {
            burger.classList.remove("is-active");
            header.classList.remove("menu-is-active");
            document.body.removeAttribute("data-lenis-prevent");
        });

    }
})


// ======================================== //
// ======================================== //

// ======================================== //
// ======================================== //
