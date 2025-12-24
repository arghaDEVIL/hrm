(function () {
  "use strict";

  // Touch swipe handler
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let isScrolling = false;

  function handleSwipe() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const minSwipeDistance = 50;

    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    if (typeof Flowtime === 'undefined') {
      console.error('Flowtime is not available');
      return;
    }

    // Swipe right - go to previous slide
    if (deltaX > minSwipeDistance) {
      console.log("Swipe Right - Previous");
      Flowtime.prev();
    }
    // Swipe left - go to next slide
    else if (deltaX < -minSwipeDistance) {
      console.log("Swipe Left - Next");
      Flowtime.next();
    }
  }

  document.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
    isScrolling = false;
  }, { passive: true });

  document.addEventListener("touchmove", function (event) {
    const deltaX = Math.abs(event.changedTouches[0].screenX - touchStartX);
    const deltaY = Math.abs(event.changedTouches[0].screenY - touchStartY);
    if (deltaY > deltaX) {
      isScrolling = true;
    }
  }, { passive: true });

  document.addEventListener("touchend", function (event) {
    if (!isScrolling) {
      touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;
      handleSwipe();
    }
  }, { passive: true });

  function createMobileNav() {
    if (document.getElementById("mobile-nav")) {
      return;
    }

    const style = document.createElement("style");
    style.textContent = `
      .mobile-nav-container {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        background: rgba(0, 0, 0, 0.8);
        padding: 12px 18px;
        border-radius: 35px;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .mobile-nav-btn {
        background: linear-gradient(135deg, #ff6b9d, #ff8e72);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 28px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
        padding: 0;
        min-width: 50px;
        min-height: 50px;
        flex-shrink: 0;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        -webkit-user-select: none;
        outline: none;
      }

      .mobile-nav-btn:active {
        transform: scale(0.95);
        box-shadow: 0 2px 8px rgba(255, 107, 157, 0.3);
      }

      .swipe-hint {
        color: #fff;
        font-size: 12px;
        white-space: nowrap;
        padding: 0 10px;
        animation: fadeInOut 3s infinite;
        font-weight: 500;
      }

      @keyframes fadeInOut {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }

      /* FIX FOR "I LOVE YOU" PAGE (page-54) */
      .page-54 {
        background: transparent !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-height: 100vh !important;
        padding: 20px !important;
      }

      .page-54 .center-img {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 60vh !important;
        font-size: 64px !important;
        font-weight: 900 !important;
        text-align: center !important;
        color: #ff1744 !important;
        text-shadow: 
          3px 3px 8px rgba(0, 0, 0, 0.9), 
          -3px -3px 8px rgba(0, 0, 0, 0.9),
          0 0 30px rgba(255, 23, 68, 0.8) !important;
        padding: 30px !important;
        animation: heartbeat 1.5s ease-in-out infinite !important;
        font-family: 'Arial Black', sans-serif !important;
      }

      @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.08); }
      }

      /* DESKTOP STYLES */
      @media (min-width: 769px) {
        .mobile-nav-container { display: none !important; }
        
        .page-54 .center-img {
          font-size: 72px !important;
        }
      }

      /* TABLET & MOBILE STYLES */
      @media (max-width: 768px) {
        .mobile-nav-container { display: flex; }
        
        .ft-page {
          padding: 15px !important;
          padding-bottom: 90px !important;
        }

        .page-54 {
          min-height: 100vh !important;
          padding: 30px 15px !important;
          background: rgba(0, 0, 0, 0.3) !important;
        }

        .page-54 .center-img {
          font-size: 48px !important;
          min-height: 50vh !important;
          color: #ff1744 !important;
          font-weight: 900 !important;
          text-shadow: 
            2px 2px 6px rgba(0, 0, 0, 1), 
            -2px -2px 6px rgba(0, 0, 0, 1),
            0 0 25px rgba(255, 23, 68, 0.9) !important;
        }
        
        .text1 {
          font-size: 24px !important;
          line-height: 1.3 !important;
          margin: 20px 0 !important;
        }
        
        .text2 {
          font-size: 13px !important;
          display: block !important;
        }
        
        h2 {
          font-size: 20px !important;
          padding: 15px 10px !important;
          margin: 10px 0 !important;
        }
        
        h3 {
          font-size: 16px !important;
          padding: 10px !important;
          line-height: 1.4 !important;
        }
        
        p {
          font-size: 14px !important;
          line-height: 1.5 !important;
          padding: 10px !important;
        }
        
        img {
          max-width: 95% !important;
          height: auto !important;
          margin: 10px auto !important;
          display: block !important;
        }

        /* Fix for final page (page-55) */
        .page-55 {
          padding: 30px 15px 90px 15px !important;
          min-height: 100vh !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
        }
        
        .page-55 img {
          max-width: 80% !important;
          margin: 20px auto !important;
        }
        
        .page-55 .text,
        .page-55 p {
          color: white !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          line-height: 1.8 !important;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8) !important;
          padding: 15px !important;
        }

        .page-55 span {
          display: block !important;
          margin: 10px 0 !important;
        }
      }

      /* SMALL MOBILE */
      @media (max-width: 480px) {
        .mobile-nav-container {
          bottom: 10px;
          padding: 8px 12px;
          gap: 10px;
        }
        
        .mobile-nav-btn {
          width: 45px;
          height: 45px;
          font-size: 24px;
          min-width: 45px;
          min-height: 45px;
        }
        
        .swipe-hint {
          font-size: 10px;
          padding: 0 6px;
        }

        .page-54 {
          padding: 20px 10px !important;
          background: rgba(0, 0, 0, 0.4) !important;
        }

        .page-54 .center-img {
          font-size: 40px !important;
          min-height: 45vh !important;
          padding: 15px !important;
          color: #ff1744 !important;
          font-weight: 900 !important;
          text-shadow: 
            2px 2px 5px rgba(0, 0, 0, 1), 
            -2px -2px 5px rgba(0, 0, 0, 1),
            0 0 20px rgba(255, 23, 68, 1) !important;
        }
        
        .text1 { font-size: 20px !important; }
        .text2 { font-size: 12px !important; }
        h2 { font-size: 18px !important; }
        h3 { font-size: 15px !important; }
        p { font-size: 13px !important; }

        .page-55 {
          padding: 25px 12px 85px 12px !important;
        }

        .page-55 .text,
        .page-55 p {
          font-size: 14px !important;
        }
      }

      /* VERY SMALL MOBILE */
      @media (max-width: 360px) {
        .mobile-nav-container {
          bottom: 8px;
          padding: 6px 10px;
          gap: 8px;
        }

        .mobile-nav-btn {
          width: 42px;
          height: 42px;
          font-size: 22px;
        }

        .page-54 .center-img {
          font-size: 34px !important;
          padding: 12px !important;
        }
        
        .swipe-hint { display: none; }

        .page-55 .text,
        .page-55 p {
          font-size: 13px !important;
        }
      }

      /* Additional utility classes */
      body {
        overflow-x: hidden !important;
      }

      .flowtime {
        overflow-x: hidden !important;
      }

      /* Prevent text selection on mobile */
      @media (max-width: 768px) {
        .ft-page {
          -webkit-user-select: none;
          user-select: none;
        }
      }
    `;
    document.head.appendChild(style);

    const navContainer = document.createElement("div");
    navContainer.id = "mobile-nav";
    navContainer.className = "mobile-nav-container";

    const prevBtn = document.createElement("button");
    prevBtn.id = "mobile-prev";
    prevBtn.className = "mobile-nav-btn prev-btn";
    prevBtn.innerHTML = "&#8249;";
    prevBtn.setAttribute("aria-label", "Previous slide");
    prevBtn.setAttribute("type", "button");
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Previous button clicked");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.prev();
      }
    }, false);

    prevBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Previous button touched");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.prev();
      }
    }, false);

    const nextBtn = document.createElement("button");
    nextBtn.id = "mobile-next";
    nextBtn.className = "mobile-nav-btn next-btn";
    nextBtn.innerHTML = "&#8250;";
    nextBtn.setAttribute("aria-label", "Next slide");
    nextBtn.setAttribute("type", "button");
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Next button clicked");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.next();
      }
    }, false);

    nextBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Next button touched");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.next();
      }
    }, false);

    const hint = document.createElement("div");
    hint.className = "swipe-hint";
    hint.textContent = "← Swipe →";

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(hint);
    navContainer.appendChild(nextBtn);
    document.body.appendChild(navContainer);

    console.log("Mobile navigation created successfully");

    setTimeout(function() {
      if (hint) {
        hint.style.transition = 'opacity 1s';
        hint.style.opacity = '0.5';
      }
    }, 5000);
  }

  function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    const isSmallScreen = window.innerWidth < 768;
    console.log("Mobile check: ", isPhone || isSmallScreen);
    return isPhone || isSmallScreen;
  }

  function init() {
    console.log("Initializing mobile navigation...");
    
    const checkFlowtime = setInterval(function() {
      if (typeof Flowtime !== 'undefined') {
        clearInterval(checkFlowtime);
        console.log("Flowtime loaded successfully");
        
        if (isMobile()) {
          console.log("Mobile device detected - creating nav");
          createMobileNav();
        }
      }
    }, 100);

    setTimeout(function() {
      clearInterval(checkFlowtime);
      if (typeof Flowtime === 'undefined') {
        console.error("Flowtime failed to load within 5 seconds");
      }
    }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.addEventListener("resize", function () {
    if (isMobile() && !document.getElementById("mobile-nav")) {
      createMobileNav();
    } else if (!isMobile() && document.getElementById("mobile-nav")) {
      const nav = document.getElementById("mobile-nav");
      if (nav) nav.remove();
    }
  });
})();