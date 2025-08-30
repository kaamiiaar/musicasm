document.addEventListener("DOMContentLoaded", function () {
  const waitlistForms = document.querySelectorAll(
    "#waitlist-signup, .waitlist-signup-secondary"
  );
  const successMessage = document.getElementById("success-message");
  const audioToggle = document.getElementById("audio-toggle");
  const backgroundAudio = document.getElementById("background-audio");

  // Initialize audio controls
  initializeAudioControls();

  waitlistForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]').value;
      const button = form.querySelector('button[type="submit"]');
      const originalButtonText = button.textContent;

      // Validate email
      if (!isValidEmail(email)) {
        showError(form, "Please enter a valid email address");
        return;
      }

      // Show loading state
      button.textContent = "Joining...";
      button.disabled = true;

      // Simulate API call (replace with actual backend integration)
      setTimeout(() => {
        // Store email in localStorage for now (replace with actual backend)
        storeEmail(email);

        // Show success message
        if (form.id === "waitlist-signup") {
          form.style.display = "none";
          successMessage.classList.remove("hidden");
        } else {
          showSuccess(form, "Thank you! You're on the waiting list.");
        }

        // Track conversion (replace with your analytics)
        trackWaitlistSignup(email);
      }, 1000);
    });
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function storeEmail(email) {
    let emails = JSON.parse(localStorage.getItem("musicasm_emails") || "[]");
    if (!emails.includes(email)) {
      emails.push({
        email: email,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem("musicasm_emails", JSON.stringify(emails));
    }
  }

  function showError(form, message) {
    removeMessages(form);
    const errorDiv = document.createElement("div");
    errorDiv.className = "form-message error-message";
    errorDiv.innerHTML = `<p style="color: #ef4444; margin-top: 1rem; text-align: center;">${message}</p>`;
    form.appendChild(errorDiv);

    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  }

  function showSuccess(form, message) {
    removeMessages(form);
    const successDiv = document.createElement("div");
    successDiv.className = "form-message success-message";
    successDiv.innerHTML = `<p style="color: #10b981; margin-top: 1rem; text-align: center;">🎵 ${message}</p>`;
    form.appendChild(successDiv);

    // Reset form
    form.querySelector('input[type="email"]').value = "";
    form.querySelector('button[type="submit"]').textContent =
      "Join Waiting List";
    form.querySelector('button[type="submit"]').disabled = false;

    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }

  function removeMessages(form) {
    const existingMessages = form.querySelectorAll(".form-message");
    existingMessages.forEach((msg) => msg.remove());
  }

  function trackWaitlistSignup(email) {
    // Replace with your analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "signup", {
        event_category: "waitlist",
        event_label: "email_signup",
        value: 1,
      });
    }

    // Console log for development
    console.log("Waitlist signup:", email);
  }

  // Smooth scrolling for any internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Add scroll effect to header
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      // Darker background when scrolled for better contrast
      header.style.background = "rgba(15, 23, 42, 0.95)";
      header.style.backdropFilter = "blur(25px) saturate(200%)";
    } else {
      // Lighter background when at top
      header.style.background = "rgba(15, 23, 42, 0.8)";
      header.style.backdropFilter = "blur(20px) saturate(180%)";
    }
  });

  // Music waves animation variation
  const waves = document.querySelectorAll(".wave");
  waves.forEach((wave, index) => {
    setInterval(() => {
      const randomHeight = Math.random() * 80 + 40;
      wave.style.height = randomHeight + "px";
    }, 6000 + index * 1000);
  });

  // Audio Controls Functions
  function initializeAudioControls() {
    if (!audioToggle || !backgroundAudio) return;

    // Set initial volume
    backgroundAudio.volume = 0.3;

    // Handle audio toggle
    audioToggle.addEventListener("click", toggleAudio);

    // Handle audio events
    backgroundAudio.addEventListener("loadstart", () => {
      console.log("Audio loading started");
    });

    backgroundAudio.addEventListener("canplaythrough", () => {
      console.log("Audio ready to play");
    });

    backgroundAudio.addEventListener("error", (e) => {
      console.error("Audio error:", e);
      updateAudioButton(false, "⚠", "Error");
    });
  }

  function toggleAudio() {
    if (!backgroundAudio) return;

    if (backgroundAudio.paused) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function playAudio() {
    if (!backgroundAudio) return;

    backgroundAudio
      .play()
      .then(() => {
        updateAudioButton(true, "⏸", "Playing");
        audioToggle.classList.add("playing");

        // Sync waves animation with audio
        syncWavesWithAudio(true);
      })
      .catch((error) => {
        console.error("Audio play failed:", error);
        updateAudioButton(false, "", "Click to play");
      });
  }

  function pauseAudio() {
    if (!backgroundAudio) return;

    backgroundAudio.pause();
    updateAudioButton(false, "", "Listen");
    audioToggle.classList.remove("playing");

    // Reset waves animation
    syncWavesWithAudio(false);
  }

  function updateAudioButton(isPlaying, icon, text) {
    const audioIcon = audioToggle.querySelector(".audio-icon");
    const audioText = audioToggle.querySelector(".audio-text");

    if (audioIcon) {
      audioIcon.textContent = icon || "";
    }
    if (audioText) audioText.textContent = text;

    audioToggle.setAttribute(
      "aria-label",
      isPlaying ? "Pause background music" : "Play background music"
    );
  }

  function syncWavesWithAudio(isPlaying) {
    const waves = document.querySelectorAll(".wave");

    if (isPlaying) {
      // Very gentle animation when audio is playing
      waves.forEach((wave, index) => {
        const interval = wave.getAttribute("data-interval");
        if (interval) clearInterval(interval);

        const newInterval = setInterval(() => {
          const randomHeight = Math.random() * 100 + 60;
          wave.style.height = randomHeight + "px";
        }, 5000 + index * 800);

        wave.setAttribute("data-interval", newInterval);
      });
    } else {
      // Extremely calm animation when audio is paused
      waves.forEach((wave, index) => {
        const interval = wave.getAttribute("data-interval");
        if (interval) clearInterval(interval);

        const newInterval = setInterval(() => {
          const randomHeight = Math.random() * 80 + 40;
          wave.style.height = randomHeight + "px";
        }, 8000 + index * 1200);

        wave.setAttribute("data-interval", newInterval);
      });
    }
  }
});
