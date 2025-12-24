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

    // Prevent vertical scroll from triggering swipe
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }

    // Check if Flowtime is available
    if (typeof Flowtime === 'undefined') {
      console.error('Flowtime is not available');
      return;
    }

    // Swipe right - go to previous slide
    if (deltaX > minSwipeDistance) {
      console.log("Swipe Right - Previous");
      Flowtime.prevFragment();
    }
    // Swipe left - go to next slide
    else if (deltaX < -minSwipeDistance) {
      console.log("Swipe Left - Next");
      Flowtime.nextFragment();
    }
  }

  // Touch event listeners
  document.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
      isScrolling = false;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchmove",
    function (event) {
      const deltaX = Math.abs(event.changedTouches[0].screenX - touchStartX);
      const deltaY = Math.abs(event.changedTouches[0].screenY - touchStartY);

      // Check if this is a vertical scroll
      if (deltaY > deltaX) {
        isScrolling = true;
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    function (event) {
      if (!isScrolling) {
        touchEndX = event.changedTouches[0].screenX;
        touchEndY = event.changedTouches[0].screenY;
        handleSwipe();
      }
    },
    { passive: true }
  );

  // Mobile navigation buttons
  function createMobileNav() {
    // Check if already created
    if (document.getElementById("mobile-nav")) {
      return;
    }

    // Add CSS styles
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
        gap: 15px;
        background: rgba(0, 0, 0, 0.7);
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
        0%, 100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
        }
      }

      /* Hide on desktop */
      @media (min-width: 769px) {
        .mobile-nav-container {
          display: none !important;
        }
      }

      /* Adjust for very small screens */
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
          padding: 0 8px;
        }
      }
    `;
    document.head.appendChild(style);

    const navContainer = document.createElement("div");
    navContainer.id = "mobile-nav";
    navContainer.className = "mobile-nav-container";

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.id = "mobile-prev";
    prevBtn.className = "mobile-nav-btn prev-btn";
    prevBtn.innerHTML = "&#8249;"; // Left arrow
    prevBtn.setAttribute("aria-label", "Previous slide");
    prevBtn.setAttribute("type", "button");
    prevBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Previous button clicked");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.prevFragment();
      } else {
        console.error('Flowtime not available');
      }
    }, false);

    // Add touch event for better mobile response
    prevBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Previous button touched");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.prevFragment();
      }
    }, false);

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.id = "mobile-next";
    nextBtn.className = "mobile-nav-btn next-btn";
    nextBtn.innerHTML = "&#8250;"; // Right arrow
    nextBtn.setAttribute("aria-label", "Next slide");
    nextBtn.setAttribute("type", "button");
    nextBtn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Next button clicked");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.nextFragment();
      } else {
        console.error('Flowtime not available');
      }
    }, false);

    // Add touch event for better mobile response
    nextBtn.addEventListener("touchend", function (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Next button touched");
      if (typeof Flowtime !== 'undefined') {
        Flowtime.nextFragment();
      }
    }, false);

    // Swipe hint
    const hint = document.createElement("div");
    hint.className = "swipe-hint";
    hint.textContent = "← Swipe →";

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(hint);
    navContainer.appendChild(nextBtn);
    document.body.appendChild(navContainer);

    console.log("Mobile navigation created");

    // Hide hint after a few seconds
    setTimeout(function() {
      if (hint) {
        hint.style.transition = 'opacity 1s';
        hint.style.opacity = '0.5';
      }
    }, 5000);
  }

  // Detect if mobile
  function isMobile() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isPhone = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );
    const isSmallScreen = window.innerWidth < 768;

    console.log(
      "Device check - UserAgent Mobile: " +
        isPhone +
        ", Small Screen: " +
        isSmallScreen
    );
    return isPhone || isSmallScreen;
  }

  // Initialize - wait for Flowtime to be available
  function init() {
    console.log("Mobile Nav Init Started");
    
    // Wait for Flowtime to be loaded
    const checkFlowtime = setInterval(function() {
      if (typeof Flowtime !== 'undefined') {
        clearInterval(checkFlowtime);
        console.log("Flowtime is ready");
        
        if (isMobile()) {
          console.log("Mobile device detected");
          createMobileNav();
        }
      }
    }, 100);

    // Timeout after 5 seconds
    setTimeout(function() {
      clearInterval(checkFlowtime);
      if (typeof Flowtime === 'undefined') {
        console.error("Flowtime failed to load");
      }
    }, 5000);
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Also check on resize
  window.addEventListener("resize", function () {
    if (isMobile() && !document.getElementById("mobile-nav")) {
      createMobileNav();
    } else if (!isMobile() && document.getElementById("mobile-nav")) {
      const nav = document.getElementById("mobile-nav");
      if (nav) nav.remove();
    }
  });
})();