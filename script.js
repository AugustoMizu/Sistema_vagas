document.addEventListener("DOMContentLoaded", () => {
  loadHeaderAndFooter()
  initMobileMenu()
  initBackToTop()
  initSearchForm()
  initScrollAnimations() // Restaurado para fazer elementos aparecerem
})

/**
 * Carrega header e footer
 */
async function loadHeaderAndFooter() {
  try {
    // Carregar header
    const headerResponse = await fetch("header.html")
    const headerHTML = await headerResponse.text()
    const headerContainer = document.getElementById("header-container")
    if (headerContainer) {
      headerContainer.innerHTML = headerHTML
    }

    // Carregar footer
    const footerResponse = await fetch("footer.html")
    const footerHTML = await footerResponse.text()
    const footerContainer = document.getElementById("footer-container")
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML
    }

    // Reinicializar menu mobile após carregar header
    initMobileMenu()
  } catch (error) {
    console.error("Erro ao carregar header/footer:", error)
  }
}

/**
 * Menu mobile
 */
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuToggle && mobileMenu) {
    // Toggle do menu
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("active")
      mobileMenuToggle.classList.toggle("active")
      document.body.classList.toggle("menu-open")
    })

    // Fechar menu ao clicar em links
    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
        document.body.classList.remove("menu-open")
      })
    })

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove("active")
        mobileMenuToggle.classList.remove("active")
        document.body.classList.remove("menu-open")
      }
    })
  }
}

/**
 * Botão voltar ao topo
 */
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop")

  if (backToTopButton) {
    // Mostrar/esconder botão
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    // Ação do botão
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

/**
 * Formulário de busca
 */
function initSearchForm() {
  const searchBtn = document.querySelector(".search-btn")
  const searchInputs = document.querySelectorAll(".search-input")

  if (searchBtn && searchInputs.length > 0) {
    // Submissão do formulário
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault()

      const cargo = searchInputs[0]?.value.trim()
      const localizacao = searchInputs[1]?.value.trim()

      // Redirecionar para página de vagas
      const params = new URLSearchParams()
      if (cargo) params.append("search", cargo)
      if (localizacao) params.append("location", localizacao)

      const url = params.toString() ? `vagas.html?${params.toString()}` : "vagas.html"
      window.location.href = url
    })

    // Enter nos inputs
    searchInputs.forEach((input) => {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchBtn.click()
        }
      })
    })
  }
}

/**
 * Inicializa as animações ativadas por scroll - RESTAURADO
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[class*="animate-"]')
  
  // Configuração do Intersection Observer para animações
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated')
      }
    })
  }, observerOptions)
  
  // Observar todos os elementos com animação
  animatedElements.forEach(element => {
    observer.observe(element)
  })
}

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (header) {
    if (window.pageYOffset > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  }
})
