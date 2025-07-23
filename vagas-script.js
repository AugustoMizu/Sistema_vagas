class JobsManager {
  constructor() {
    this.currentJobs = []
    this.filteredJobs = []
    this.currentPage = 1
    this.jobsPerPage = 10
    this.selectedJobId = null
    this.currentFilters = {
      search: "",
      location: "",
      category: "all",
      level: "all",
      remote: false,
      quickApply: false,
      workLocation: "all",
      contractTypes: [],
      experienceLevels: [],
      state: "all",
      salary: "all",
    }

    this.init()
  }

  init() {
    this.loadJobs()
    this.parseURLParams()
    this.setupEventListeners()
    this.populateFilters()
    this.displayJobs()
  }

  parseURLParams() {
    const urlParams = new URLSearchParams(window.location.search)
    const search = urlParams.get("search")
    const location = urlParams.get("location")

    if (search) {
      this.currentFilters.search = search
      const searchInput = document.getElementById("searchInput")
      if (searchInput) searchInput.value = search
    }

    if (location) {
      this.currentFilters.location = location
      const locationInput = document.getElementById("locationInput")
      if (locationInput) locationInput.value = location
    }
    if (locationInput && searchInput) {
      console.log("Parâmetros local e termo de URL aplicados:", this.currentFilters)
      this.performSearch()
    }else {
      console.log("Um parâmetro de URL aplicados:", this.currentFilters)
      this.performSearch()
    }
  }

  loadJobs() {
    this.currentJobs = window.jobsDatabase ? window.jobsDatabase.jobs : []
    this.filteredJobs = [...this.currentJobs]
  }

  setupEventListeners() {
    // PREVENIR TODOS OS SUBMITS DE FORMULÁRIO
    document.addEventListener("submit", (e) => {
      e.preventDefault()
      console.log("Submit prevented")
      return false
    })

    // Busca principal - ULTRA CORRIGIDO
    const searchBtn = document.getElementById("searchBtn")
    const searchInput = document.getElementById("searchInput")
    const locationInput = document.getElementById("locationInput")

    if (searchBtn) {
      // Remover todos os listeners existentes
      const newSearchBtn = searchBtn.cloneNode(true)
      searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn)

      newSearchBtn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log("Botão de busca clicado")
        this.performSearch()
        return false
      })
    }

    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          e.stopPropagation()
          console.log("Enter pressionado no campo de busca")
          this.performSearch()
          return false
        }
      })
    }

    if (locationInput) {
      locationInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          e.stopPropagation()
          console.log("Enter pressionado no campo de localização")
          this.performSearch()
          return false
        }
      })
    }

    // Filtros rápidos
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault()
        e.stopPropagation()
        this.toggleQuickFilter(e.target)
        return false
      })
    })

    // Selects de filtro
    this.setupSelectFilters()
    this.setupSidebarFilters()
    this.setupPagination()
    this.setupSorting()
    this.setupClearFilters()
    this.setupJobDetailsPanel()
  }

  setupSelectFilters() {
    const filters = [
      { id: "categoryFilter", prop: "category" },
      { id: "levelFilter", prop: "level" },
      { id: "salaryFilter", prop: "salary" },
      { id: "stateFilter", prop: "state" },
    ]

    filters.forEach(({ id, prop }) => {
      const element = document.getElementById(id)
      if (element) {
        element.addEventListener("change", (e) => {
          e.preventDefault()
          this.currentFilters[prop] = e.target.value
          console.log(`Filtro ${prop} alterado para:`, e.target.value)
          this.applyFilters()
        })
      }
    })
  }

  setupSidebarFilters() {
    // Radio buttons de local de trabalho
    document.querySelectorAll('input[name="workLocation"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        this.currentFilters.workLocation = e.target.value
        console.log("Local de trabalho alterado para:", e.target.value)
        this.applyFilters()
      })
    })

    // Checkboxes de tipo de contrato
    document
      .querySelectorAll(
        'input[type="checkbox"][value="CLT"], input[type="checkbox"][value="PJ"], input[type="checkbox"][value="Estágio"]',
      )
      .forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          this.updateContractTypeFilters()
          console.log("Tipos de contrato atualizados")
          this.applyFilters()
        })
      })

    // Checkboxes de nível de experiência
    document
      .querySelectorAll(
        'input[type="checkbox"][value="Júnior"], input[type="checkbox"][value="Pleno"], input[type="checkbox"][value="Senior"]',
      )
      .forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          this.updateExperienceLevelFilters()
          console.log("Níveis de experiência atualizados")
          this.applyFilters()
        })
      })
  }

  setupPagination() {
    const prevPage = document.getElementById("prevPage")
    const nextPage = document.getElementById("nextPage")

    if (prevPage) {
      prevPage.addEventListener("click", (e) => {
        e.preventDefault()
        if (this.currentPage > 1) {
          this.currentPage--
          console.log("Página anterior:", this.currentPage)
          this.displayJobs()
        }
      })
    }

    if (nextPage) {
      nextPage.addEventListener("click", (e) => {
        e.preventDefault()
        const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage)
        if (this.currentPage < totalPages) {
          this.currentPage++
          console.log("Próxima página:", this.currentPage)
          this.displayJobs()
        }
      })
    }
  }

  setupSorting() {
    const sortSelect = document.getElementById("sortSelect")
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        console.log("Ordenação alterada para:", e.target.value)
        this.sortJobs(e.target.value)
      })
    }
  }

  setupClearFilters() {
    const clearFilters = document.getElementById("clearFilters")
    if (clearFilters) {
      clearFilters.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("Limpando todos os filtros")
        this.clearAllFilters()
      })
    }
  }

  setupJobDetailsPanel() {
    // Fechar painel com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeJobDetailsPanel()
    })
  }

  populateFilters() {
    if (!window.jobsDatabase) return

    const filterConfigs = [
      { selectId: "categoryFilter", method: "getCategories" },
      { selectId: "levelFilter", method: "getLevels" },
      { selectId: "stateFilter", method: "getLocations" },
    ]

    filterConfigs.forEach(({ selectId, method }) => {
      const select = document.getElementById(selectId)
      if (select) {
        const options = window.jobsDatabase[method]()
        options.forEach((option) => {
          const optionElement = document.createElement("option")
          optionElement.value = option
          optionElement.textContent = option
          select.appendChild(optionElement)
        })
      }
    })
  }

  performSearch() {
    const searchInput = document.getElementById("searchInput")
    const locationInput = document.getElementById("locationInput")

    const searchTerm = searchInput ? searchInput.value.trim() : ""
    const locationTerm = locationInput ? locationInput.value.trim() : ""

    console.log("=== REALIZANDO BUSCA ===")
    console.log("Termo de busca:", searchTerm)
    console.log("Localização:", locationTerm)

    this.currentFilters.search = searchTerm
    this.currentFilters.location = locationTerm

    console.log("Filtros atualizados:", this.currentFilters)

    // Aplicar filtros
    this.applyFilters()
  }

  toggleQuickFilter(button) {
    const filterType = button.dataset.filter
    button.classList.toggle("active")

    console.log(`Filtro rápido ${filterType} toggled`)

    if (filterType === "quickApply") {
      this.currentFilters.quickApply = button.classList.contains("active")
    } else if (filterType === "remote") {
      this.currentFilters.remote = button.classList.contains("active")
    }

    this.applyFilters()
  }

  updateContractTypeFilters() {
    this.currentFilters.contractTypes = Array.from(
      document.querySelectorAll(
        'input[type="checkbox"][value="CLT"]:checked, input[type="checkbox"][value="PJ"]:checked, input[type="checkbox"][value="Estágio"]:checked',
      ),
    ).map((cb) => cb.value)
  }

  updateExperienceLevelFilters() {
    this.currentFilters.experienceLevels = Array.from(
      document.querySelectorAll(
        'input[type="checkbox"][value="Júnior"]:checked, input[type="checkbox"][value="Pleno"]:checked, input[type="checkbox"][value="Senior"]:checked',
      ),
    ).map((cb) => cb.value)
  }

  applyFilters() {
    console.log("=== APLICANDO FILTROS ===")
    console.log("Filtros atuais:", this.currentFilters)
    console.log("Total de vagas:", this.currentJobs.length)

    this.filteredJobs = this.currentJobs.filter((job) => {
      // FILTRO DE BUSCA
      if (this.currentFilters.search) {
        const searchTerm = this.currentFilters.search.toLowerCase()
        const matchesSearch = [job.title || "", job.company || "", job.category || "", job.description || ""].some(
          (field) => String(field).toLowerCase().includes(searchTerm),
        )
        if (!matchesSearch) {
          console.log(`Vaga ${job.title} não passou no filtro de busca`)
          return false
        }
      }

      // Filtro de localização
      if (this.currentFilters.location) {
        const locationTerm = this.currentFilters.location.toLowerCase()
        if (!job.location.toLowerCase().includes(locationTerm)) {
          console.log(`Vaga ${job.title} não passou no filtro de localização`)
          return false
        }
      }

      // Filtros simples
      const simpleFilters = [
        { filter: "category", jobProp: "category" },
        { filter: "level", jobProp: "level" },
      ]

      for (const { filter, jobProp } of simpleFilters) {
        if (this.currentFilters[filter] !== "all" && job[jobProp] !== this.currentFilters[filter]) {
          return false
        }
      }

      // Filtro de estado
      if (this.currentFilters.state !== "all") {
        const jobState = job.location.split(", ")[1]
        if (jobState !== this.currentFilters.state) return false
      }

      // Filtros booleanos
      if (this.currentFilters.remote && !job.remote) return false
      if (this.currentFilters.quickApply && !job.quickApply) return false

      // Filtro de local de trabalho
      if (this.currentFilters.workLocation === "remote" && !job.remote) return false
      if (this.currentFilters.workLocation === "onsite" && job.remote) return false

      // Filtros de array
      if (this.currentFilters.contractTypes.length > 0 && !this.currentFilters.contractTypes.includes(job.type))
        return false
      if (this.currentFilters.experienceLevels.length > 0 && !this.currentFilters.experienceLevels.includes(job.level))
        return false

      // Filtro de salário
      if (this.currentFilters.salary !== "all") {
        const salaryRange = this.extractSalaryRange(job.salary)
        if (!this.matchesSalaryFilter(salaryRange, this.currentFilters.salary)) return false
      }

      return true
    })

    console.log("Vagas após filtros:", this.filteredJobs.length)

    this.currentPage = 1
    this.displayJobs()
    this.updateResultsInfo()
  }

  extractSalaryRange(salaryString) {
    const numbers = salaryString.match(/\d+\.?\d*/g)
    if (numbers && numbers.length >= 2) {
      return {
        min: Number.parseInt(numbers[0].replace(".", "")),
        max: Number.parseInt(numbers[1].replace(".", "")),
      }
    }
    return { min: 0, max: 0 }
  }

  matchesSalaryFilter(salaryRange, filter) {
    const ranges = {
      "0-3000": { min: 0, max: 3000 },
      "3000-6000": { min: 3000, max: 6000 },
      "6000-10000": { min: 6000, max: 10000 },
      "10000+": { min: 10000, max: Number.POSITIVE_INFINITY },
    }

    const range = ranges[filter]
    if (!range) return true

    return filter === "10000+"
      ? salaryRange.min >= range.min
      : salaryRange.min >= range.min && salaryRange.max <= range.max
  }

  sortJobs(sortBy) {
    const sortFunctions = {
      date: (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate),
      salary: (a, b) => {
        const salaryA = this.extractSalaryRange(a.salary)
        const salaryB = this.extractSalaryRange(b.salary)
        return salaryB.max - salaryA.max
      },
      company: (a, b) => a.company.localeCompare(b.company),
      relevance: (a, b) => {
        const scoreA = (a.featured ? 2 : 0) + (a.quickApply ? 1 : 0)
        const scoreB = (b.featured ? 2 : 0) + (b.quickApply ? 1 : 0)
        return scoreB - scoreA
      },
    }

    const sortFunction = sortFunctions[sortBy] || sortFunctions.relevance
    this.filteredJobs.sort(sortFunction)
    this.displayJobs()
  }

  displayJobs() {
    console.log("=== EXIBINDO VAGAS ===")
    console.log("Página atual:", this.currentPage)
    console.log("Vagas filtradas:", this.filteredJobs.length)

    const jobsList = document.getElementById("jobsList")
    if (!jobsList) return

    const startIndex = (this.currentPage - 1) * this.jobsPerPage
    const endIndex = startIndex + this.jobsPerPage
    const jobsToShow = this.filteredJobs.slice(startIndex, endIndex)

    console.log("Vagas a exibir:", jobsToShow.length)

    if (jobsToShow.length === 0) {
      jobsList.innerHTML = `
        <div class="no-results">
          <i class="fas fa-search"></i>
          <h3>Nenhuma vaga encontrada</h3>
          <p>Tente ajustar seus filtros ou termos de busca</p>
        </div>
      `
    } else {
      jobsList.innerHTML = jobsToShow.map((job) => this.createJobCard(job)).join("")
    }

    this.updatePagination()
    this.setupJobCardEvents()
  }

  createJobCard(job) {
    const publishedDate = new Date(job.publishedDate)
    const daysAgo = Math.floor((new Date() - publishedDate) / (1000 * 60 * 60 * 24))
    const dateText = daysAgo === 0 ? "Hoje" : daysAgo === 1 ? "1 dia atrás" : `${daysAgo} dias atrás`
    const isSelected = this.selectedJobId == job.id

    return `
      <div class="job-card ${isSelected ? "selected" : ""}" data-job-id="${job.id}">
        <div class="job-header">
          <div class="job-info">
            <h3 class="job-title">${job.title}</h3>
            <div class="job-company">
              <span class="company-name">${job.company}</span>
              <div class="company-rating">
                <i class="fas fa-star"></i>
                <span>${job.companyRating}</span>
              </div>
            </div>
            <div class="job-location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${job.location}</span>
            </div>
          </div>
          <div class="job-actions">
            <button class="save-job" data-job-id="${job.id}">
              <i class="far fa-bookmark"></i>
            </button>
            <button class="apply-btn ${job.quickApply ? "quick-apply" : ""}">
              ${job.quickApply ? '<i class="fas fa-bolt"></i>' : ""}
              ${job.quickApply ? "Candidatura rápida" : "Candidatar-se"}
            </button>
          </div>
        </div>
        <div class="job-details">
          <p class="job-description">${job.description}</p>
          <div class="job-tags">
            <span class="job-tag salary">${job.salary}</span>
            <span class="job-tag">${job.type}</span>
            <span class="job-tag">${job.level}</span>
            ${job.remote ? '<span class="job-tag remote">Remoto</span>' : ""}
            ${job.quickApply ? '<span class="job-tag quick-apply">Candidatura rápida</span>' : ""}
          </div>
        </div>
        <div class="job-meta">
          <div class="job-date">
            <i class="far fa-clock"></i>
            <span>${dateText}</span>
          </div>
          <div class="job-category">${job.category}</div>
        </div>
      </div>
    `
  }

  setupJobCardEvents() {
    // Salvar vaga
    document.querySelectorAll(".save-job").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        btn.classList.toggle("saved")
        const icon = btn.querySelector("i")
        icon.className = btn.classList.contains("saved") ? "fas fa-bookmark" : "far fa-bookmark"
      })
    })

    // Candidatar-se
    document.querySelectorAll(".apply-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        alert("Funcionalidade de candidatura será implementada em breve!")
      })
    })

    // Clique no card da vaga
    document.querySelectorAll(".job-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        e.preventDefault()
        if (!e.target.closest(".job-actions")) {
          const jobId = card.dataset.jobId
          console.log("Card da vaga clicado:", jobId)
          this.showJobDetails(jobId)
        }
      })
    })
  }

  showJobDetails(jobId) {
    const job = this.currentJobs.find((j) => j.id == jobId)
    if (job) {
      this.selectedJobId = jobId
      this.displayJobDetailsPanel(job)
      this.openJobDetailsPanel()
      this.updateSelectedJobCard()
    }
  }

  updateSelectedJobCard() {
    document.querySelectorAll(".job-card").forEach((card) => {
      card.classList.remove("selected")
    })

    const selectedCard = document.querySelector(`[data-job-id="${this.selectedJobId}"]`)
    if (selectedCard) {
      selectedCard.classList.add("selected")
    }
  }

  displayJobDetailsPanel(job) {
    const jobDetailsContent = document.getElementById("jobDetailsContent")
    if (!jobDetailsContent) return

    const publishedDate = new Date(job.publishedDate)
    const daysAgo = Math.floor((new Date() - publishedDate) / (1000 * 60 * 60 * 24))
    const dateText = daysAgo === 0 ? "Hoje" : daysAgo === 1 ? "1 dia atrás" : `${daysAgo} dias atrás`
    const companyInitial = job.company.charAt(0).toUpperCase()

    const detailsHTML = `
      <div class="job-detail-header">
        <div class="job-detail-company">
          <div class="company-logo">${companyInitial}</div>
          <div class="company-info">
            <h3>${job.company}</h3>
            <div class="company-rating">
              <div class="rating-stars">${this.generateStars(job.companyRating)}</div>
              <span class="rating-number">${job.companyRating}</span>
            </div>
          </div>
        </div>
        
        <h2 class="job-detail-title">${job.title}</h2>
        <div class="job-detail-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${job.location}</span>
        </div>
        
        <div class="job-detail-actions">
          <button class="apply-btn-large ${job.quickApply ? "quick-apply" : ""}" data-job-id="${job.id}">
            ${job.quickApply ? '<i class="fas fa-bolt"></i>' : ""}
            ${job.quickApply ? "Candidatura rápida" : "Candidatar-se"}
          </button>
          <button class="save-btn-large" data-job-id="${job.id}">
            <i class="far fa-bookmark"></i>
          </button>
        </div>
      </div>

      <div class="job-detail-tags">
        <span class="job-detail-tag salary">${job.salary}</span>
        <span class="job-detail-tag">${job.type}</span>
        <span class="job-detail-tag">${job.level}</span>
        ${job.remote ? '<span class="job-detail-tag remote">Remoto</span>' : ""}
        ${job.quickApply ? '<span class="job-detail-tag quick-apply">Candidatura rápida</span>' : ""}
      </div>

      <div class="job-detail-section">
        <h4>Descrição da vaga</h4>
        <div class="job-detail-description collapsed" id="jobDescription">
          ${job.description}
          
          <br><br>
          
          <strong>Responsabilidades:</strong>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Executar atividades relacionadas à função</li>
            <li>Colaborar com a equipe para atingir objetivos</li>
            <li>Manter-se atualizado com as melhores práticas da área</li>
            <li>Participar de reuniões e treinamentos quando necessário</li>
          </ul>
          
          <strong>O que oferecemos:</strong>
          <ul style="margin: 1rem 0; padding-left: 1.5rem;">
            <li>Ambiente de trabalho colaborativo e inovador</li>
            <li>Oportunidades de crescimento profissional</li>
            <li>Pacote de benefícios competitivo</li>
            <li>Flexibilidade e equilíbrio entre vida pessoal e profissional</li>
          </ul>
        </div>
        <button class="show-more-btn" id="showMoreBtn">
          <span>Mostrar mais</span>
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>

      <div class="job-detail-section">
        <h4>Requisitos</h4>
        <div class="requirements-list">
          ${job.requirements.map((req) => `<span class="requirement-item">${req}</span>`).join("")}
        </div>
      </div>

      <div class="job-detail-section">
        <h4>Benefícios</h4>
        <div class="benefits-list">
          ${job.benefits
            .map(
              (benefit) => `
            <div class="benefit-item">
              <i class="fas fa-check"></i>
              <span>${benefit}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

      <div class="company-overview">
        <h4>Visão geral da empresa</h4>
        <p>A ${job.company} é uma empresa líder em seu segmento, comprometida com a excelência e inovação. 
        Oferecemos um ambiente de trabalho dinâmico onde os profissionais podem crescer e desenvolver suas 
        habilidades. Nossa cultura valoriza a diversidade, colaboração e o desenvolvimento contínuo de nossos colaboradores.</p>
      </div>

      <div style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #eee; color: #666; font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span>Publicado ${dateText}</span>
          <span>${job.category}</span>
        </div>
      </div>
    `

    jobDetailsContent.innerHTML = detailsHTML
    this.setupJobDetailsEvents()
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    let starsHTML = ""

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<i class="fas fa-star"></i>'
    }

    if (hasHalfStar) {
      starsHTML += '<i class="fas fa-star-half-alt"></i>'
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<i class="far fa-star"></i>'
    }

    return starsHTML
  }

  openJobDetailsPanel() {
    const panel = document.getElementById("jobDetailsPanel")
    const overlay = this.getOrCreateOverlay()

    if (panel) {
      panel.classList.add("active")
      if (overlay) overlay.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  }

  closeJobDetailsPanel() {
    const panel = document.getElementById("jobDetailsPanel")
    const overlay = document.getElementById("jobDetailsOverlay")

    if (panel) panel.classList.remove("active")
    if (overlay) overlay.classList.remove("active")
    document.body.style.overflow = ""

    this.selectedJobId = null
    this.updateSelectedJobCard()
  }

  getOrCreateOverlay() {
    let overlay = document.getElementById("jobDetailsOverlay")
    if (!overlay) {
      overlay = document.createElement("div")
      overlay.id = "jobDetailsOverlay"
      overlay.className = "job-details-overlay"
      overlay.addEventListener("click", () => this.closeJobDetailsPanel())
      document.body.appendChild(overlay)
    }
    return overlay
  }

  setupJobDetailsEvents() {
    // Botão fechar
    const closeBtn = document.getElementById("closeDetailsPanel")
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault()
        this.closeJobDetailsPanel()
      })
    }

    // Botão mostrar mais/menos
    const showMoreBtn = document.getElementById("showMoreBtn")
    const description = document.getElementById("jobDescription")

    if (showMoreBtn && description) {
      showMoreBtn.addEventListener("click", (e) => {
        e.preventDefault()
        const isCollapsed = description.classList.contains("collapsed")

        if (isCollapsed) {
          description.classList.remove("collapsed")
          showMoreBtn.innerHTML = '<span>Mostrar menos</span><i class="fas fa-chevron-up"></i>'
        } else {
          description.classList.add("collapsed")
          showMoreBtn.innerHTML = '<span>Mostrar mais</span><i class="fas fa-chevron-down"></i>'
        }
      })
    }

    // Botões de ação no painel
    const applyBtn = document.querySelector(".apply-btn-large")
    const saveBtn = document.querySelector(".save-btn-large")

    if (applyBtn) {
      applyBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        alert("Funcionalidade de candidatura será implementada em breve!")
      })
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        e.preventDefault()
        saveBtn.classList.toggle("saved")
        const icon = saveBtn.querySelector("i")
        icon.className = saveBtn.classList.contains("saved") ? "fas fa-bookmark" : "far fa-bookmark"
      })
    }
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredJobs.length / this.jobsPerPage)
    const prevBtn = document.getElementById("prevPage")
    const nextBtn = document.getElementById("nextPage")
    const pageNumbers = document.getElementById("pageNumbers")

    if (prevBtn) prevBtn.disabled = this.currentPage === 1
    if (nextBtn) nextBtn.disabled = this.currentPage === totalPages || totalPages === 0

    if (pageNumbers) {
      pageNumbers.innerHTML = ""
      const maxVisiblePages = 5
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement("button")
        pageBtn.className = `page-number ${i === this.currentPage ? "active" : ""}`
        pageBtn.textContent = i
        pageBtn.addEventListener("click", (e) => {
          e.preventDefault()
          this.currentPage = i
          console.log("Página selecionada:", i)
          this.displayJobs()
        })
        pageNumbers.appendChild(pageBtn)
      }
    }
  }

  updateResultsInfo() {
    const resultsCount = document.getElementById("resultsCount")
    const resultsDescription = document.getElementById("resultsDescription")

    console.log("=== ATUALIZANDO INFO DOS RESULTADOS ===")
    console.log("Total filtrado:", this.filteredJobs.length)

    if (resultsCount) {
      const total = this.filteredJobs.length
      const text = `${total} vaga${total !== 1 ? "s" : ""} encontrada${total !== 1 ? "s" : ""}`
      resultsCount.textContent = text
      console.log("Texto do contador:", text)
    }

    if (resultsDescription) {
      const hasFilters =
        this.currentFilters.search ||
        this.currentFilters.location ||
        this.currentFilters.category !== "all" ||
        this.currentFilters.level !== "all" ||
        this.currentFilters.remote ||
        this.currentFilters.quickApply

      const description = hasFilters ? "resultados filtrados" : "todas as vagas disponíveis"
      resultsDescription.textContent = `Mostrando ${description}`
      console.log("Descrição:", description)
    }
  }

  clearAllFilters() {
    console.log("=== LIMPANDO TODOS OS FILTROS ===")

    // Resetar filtros
    this.currentFilters = {
      search: "",
      location: "",
      category: "all",
      level: "all",
      remote: false,
      quickApply: false,
      workLocation: "all",
      contractTypes: [],
      experienceLevels: [],
      state: "all",
      salary: "all",
    }

    // Limpar campos
    const inputs = ["searchInput", "locationInput"]
    inputs.forEach((id) => {
      const element = document.getElementById(id)
      if (element) element.value = ""
    })

    // Limpar selects
    const selects = ["categoryFilter", "levelFilter", "salaryFilter", "stateFilter"]
    selects.forEach((id) => {
      const element = document.getElementById(id)
      if (element) element.value = "all"
    })

    // Limpar filtros rápidos
    document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"))

    // Limpar radio buttons
    const allRadio = document.querySelector('input[name="workLocation"][value="all"]')
    if (allRadio) allRadio.checked = true

    // Limpar checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => (checkbox.checked = false))

    this.applyFilters()
  }
}

// Inicializar com proteção contra múltiplas instâncias
if (!window.jobsManagerInstance) {
  document.addEventListener("DOMContentLoaded", () => {
    if (window.jobsDatabase) {
      window.jobsManagerInstance = new JobsManager()
      console.log("JobsManager inicializado com sucesso")
    } else {
      setTimeout(() => {
        if (window.jobsDatabase) {
          window.jobsManagerInstance = new JobsManager()
          console.log("JobsManager inicializado com delay")
        } else {
          console.error("jobs-data.js não foi carregado corretamente")
        }
      }, 100)
    }
  })
}
