document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle input")

  themeToggle.addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("dark-theme")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-theme")
      localStorage.setItem("theme", "light")
    }
  })

  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme")
    themeToggle.checked = false
  } else {
    document.body.classList.add("dark-theme")
    themeToggle.checked = true
  }

  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    navLinks.classList.toggle("active")

    if (navLinks.classList.contains("active")) {
      navLinks.style.display = "flex"
      navLinks.style.flexDirection = "column"
      navLinks.style.position = "absolute"
      navLinks.style.top = "100%"
      navLinks.style.left = "0"
      navLinks.style.width = "100%"
      navLinks.style.backgroundColor = "var(--bg-secondary)"
      navLinks.style.padding = "var(--spacing-md)"
      navLinks.style.boxShadow = "var(--shadow-md)"
    } else {
      navLinks.style.display = ""
    }
  })

  const statNumbers = document.querySelectorAll(".stat-number")

  function animateStats() {
    statNumbers.forEach((stat) => {
      const target = Number.parseInt(stat.getAttribute("data-target"))
      const count = Number.parseInt(stat.innerText)
      const increment = target / 100

      if (count < target) {
        stat.innerText = Math.ceil(count + increment)
        setTimeout(animateStats, 20)
      } else {
        stat.innerText = target
      }
    })
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  let statsAnimated = false

  function checkStatsVisibility() {
    const statsSection = document.querySelector(".impact-stats")
    if (isInViewport(statsSection) && !statsAnimated) {
      animateStats()
      statsAnimated = true
    }
  }

  window.addEventListener("scroll", checkStatsVisibility)
  checkStatsVisibility()

  const contactForm = document.getElementById("contact-form")

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const submitButton = this.querySelector('button[type="submit"]')
    const originalText = submitButton.innerText

    submitButton.innerText = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      const formMessage = document.createElement("div")
      formMessage.className = "form-message success"
      formMessage.innerHTML =
        '<i class="fas fa-check-circle"></i> Thank you for your message! We\'ll get back to you soon.'

      contactForm.appendChild(formMessage)

      contactForm.reset()

      submitButton.innerText = originalText
      submitButton.disabled = false

      setTimeout(() => {
        formMessage.remove()
      }, 5000)
    }, 1500)
  })

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, 
          behavior: "smooth",
        })

        if (navLinks.classList.contains("active")) {
          mobileMenuBtn.click()
        }
      }
    })
  })

  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
      this.style.boxShadow = "var(--shadow-lg)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = ""
      this.style.boxShadow = "var(--shadow-md)"
    })
  })
})

