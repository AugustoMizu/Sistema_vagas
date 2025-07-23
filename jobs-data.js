// Banco de dados de vagas - jobs-data.js
const jobsDatabase = {
  jobs: [
    {
      id: 1,
      title: "Desenvolvedor Frontend React",
      company: "TechCorp Solutions",
      location: "São Paulo, SP",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 8.000 - R$ 12.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office"],
      description:
        "Desenvolvedor React com experiência em TypeScript, Redux e testes automatizados. Trabalho em equipe ágil com foco em qualidade de código.",
      requirements: ["React", "TypeScript", "Redux", "Jest"],
      publishedDate: "2025-01-15",
      companyRating: 4.5,
      quickApply: true,
      featured: true,
    },
    {
      id: 2,
      title: "Analista de Marketing Digital",
      company: "Marketing Pro",
      location: "Rio de Janeiro, RJ",
      type: "CLT",
      level: "Júnior",
      salary: "R$ 4.000 - R$ 6.000",
      category: "Marketing",
      remote: false,
      benefits: ["Vale Transporte", "Vale Alimentação", "Plano de Saúde"],
      description:
        "Profissional para gerenciar campanhas digitais, análise de métricas e criação de conteúdo para redes sociais.",
      requirements: ["Google Ads", "Facebook Ads", "Analytics", "Excel"],
      publishedDate: "2025-01-14",
      companyRating: 4.2,
      quickApply: false,
      featured: false,
    },
    {
      id: 3,
      title: "Engenheiro de Software Senior",
      company: "InnovaTech",
      location: "Belo Horizonte, MG",
      type: "CLT",
      level: "Senior",
      salary: "R$ 15.000 - R$ 20.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Participação nos Lucros", "Home Office"],
      description:
        "Liderar equipes de desenvolvimento, arquitetura de sistemas e mentoria de desenvolvedores júnior e pleno.",
      requirements: ["Java", "Spring Boot", "Microservices", "AWS", "Docker"],
      publishedDate: "2025-01-13",
      companyRating: 4.8,
      quickApply: true,
      featured: true,
    },
    {
      id: 4,
      title: "Assistente Administrativo",
      company: "Empresa ABC",
      location: "Salvador, BA",
      type: "CLT",
      level: "Júnior",
      salary: "R$ 2.500 - R$ 3.500",
      category: "Administrativo",
      remote: false,
      benefits: ["Vale Transporte", "Vale Alimentação"],
      description:
        "Apoio administrativo geral, atendimento ao cliente, organização de documentos e suporte às equipes.",
      requirements: ["Pacote Office", "Atendimento ao Cliente", "Organização"],
      publishedDate: "2025-01-12",
      companyRating: 3.8,
      quickApply: false,
      featured: false,
    },
    {
      id: 5,
      title: "Designer UX/UI",
      company: "Creative Studio",
      location: "Curitiba, PR",
      type: "PJ",
      level: "Pleno",
      salary: "R$ 6.000 - R$ 9.000",
      category: "Design",
      remote: true,
      benefits: ["Horário Flexível", "Home Office"],
      description: "Criação de interfaces intuitivas, pesquisa com usuários e prototipagem de produtos digitais.",
      requirements: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      publishedDate: "2025-01-11",
      companyRating: 4.6,
      quickApply: true,
      featured: false,
    },
    {
      id: 6,
      title: "Analista Financeiro",
      company: "FinanceMax",
      location: "Brasília, DF",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 7.000 - R$ 10.000",
      category: "Financeiro",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Participação nos Lucros"],
      description:
        "Análise de demonstrações financeiras, elaboração de relatórios e apoio na tomada de decisões estratégicas.",
      requirements: ["Excel Avançado", "Power BI", "Análise Financeira", "SQL"],
      publishedDate: "2025-01-10",
      companyRating: 4.1,
      quickApply: false,
      featured: false,
    },
    {
      id: 7,
      title: "Desenvolvedor Backend Python",
      company: "DataTech Solutions",
      location: "Porto Alegre, RS",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 9.000 - R$ 13.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office", "Cursos"],
      description:
        "Desenvolvimento de APIs REST, integração com bancos de dados e implementação de soluções escaláveis.",
      requirements: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
      publishedDate: "2025-01-09",
      companyRating: 4.4,
      quickApply: true,
      featured: true,
    },
    {
      id: 8,
      title: "Gerente de Vendas",
      company: "SalesForce Pro",
      location: "Fortaleza, CE",
      type: "CLT",
      level: "Senior",
      salary: "R$ 12.000 - R$ 18.000",
      category: "Vendas",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Comissão", "Carro da Empresa"],
      description:
        "Liderança de equipe comercial, desenvolvimento de estratégias de vendas e relacionamento com clientes.",
      requirements: ["Liderança", "CRM", "Negociação", "Gestão de Equipes"],
      publishedDate: "2025-01-08",
      companyRating: 4.0,
      quickApply: false,
      featured: false,
    },
    {
      id: 9,
      title: "Enfermeiro(a)",
      company: "Hospital São Lucas",
      location: "Recife, PE",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 5.000 - R$ 7.000",
      category: "Saúde",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Adicional Noturno"],
      description: "Cuidados diretos ao paciente, administração de medicamentos e apoio à equipe médica.",
      requirements: ["COREN", "Experiência Hospitalar", "Primeiros Socorros"],
      publishedDate: "2025-01-07",
      companyRating: 4.3,
      quickApply: false,
      featured: false,
    },
    {
      id: 10,
      title: "Product Manager",
      company: "StartupTech",
      location: "São Paulo, SP",
      type: "CLT",
      level: "Senior",
      salary: "R$ 16.000 - R$ 22.000",
      category: "Produto",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Stock Options", "Home Office"],
      description:
        "Definição de roadmap de produto, análise de métricas e coordenação entre equipes técnicas e de negócio.",
      requirements: ["Product Management", "Analytics", "Scrum", "SQL", "A/B Testing"],
      publishedDate: "2025-01-06",
      companyRating: 4.7,
      quickApply: true,
      featured: true,
    },
    {
      id: 11,
      title: "Desenvolvedor Mobile Flutter",
      company: "MobileTech",
      location: "São Paulo, SP",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 8.500 - R$ 12.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office", "Gympass"],
      description:
        "Desenvolvimento de aplicativos móveis multiplataforma usando Flutter, integração com APIs e publicação nas stores.",
      requirements: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
      publishedDate: "2025-01-05",
      companyRating: 4.3,
      quickApply: true,
      featured: false,
    },
    {
      id: 12,
      title: "Coordenador de RH",
      company: "People First",
      location: "Rio de Janeiro, RJ",
      type: "CLT",
      level: "Senior",
      salary: "R$ 10.000 - R$ 14.000",
      category: "Recursos Humanos",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Participação nos Lucros", "Carro da Empresa"],
      description: "Coordenação de processos de RH, recrutamento e seleção, treinamentos e desenvolvimento de pessoas.",
      requirements: ["Gestão de Pessoas", "Recrutamento", "Legislação Trabalhista", "Excel Avançado"],
      publishedDate: "2025-01-04",
      companyRating: 4.2,
      quickApply: false,
      featured: false,
    },
    {
      id: 13,
      title: "Cientista de Dados",
      company: "AI Analytics",
      location: "Belo Horizonte, MG",
      type: "CLT",
      level: "Senior",
      salary: "R$ 14.000 - R$ 20.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office", "Cursos", "Participação nos Lucros"],
      description:
        "Análise de grandes volumes de dados, desenvolvimento de modelos de machine learning e insights para negócio.",
      requirements: ["Python", "R", "Machine Learning", "SQL", "Tableau", "Statistics"],
      publishedDate: "2025-01-03",
      companyRating: 4.6,
      quickApply: true,
      featured: true,
    },
    {
      id: 14,
      title: "Contador Sênior",
      company: "Contabilidade Expert",
      location: "Brasília, DF",
      type: "CLT",
      level: "Senior",
      salary: "R$ 8.000 - R$ 12.000",
      category: "Financeiro",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Vale Transporte"],
      description:
        "Responsável pela contabilidade geral, apuração de impostos, elaboração de demonstrações financeiras e compliance fiscal.",
      requirements: ["CRC Ativo", "Experiência Fiscal", "SPED", "ERP", "Legislação Tributária"],
      publishedDate: "2025-01-02",
      companyRating: 3.9,
      quickApply: false,
      featured: false,
    },
    {
      id: 15,
      title: "Estagiário de Marketing",
      company: "Agência Digital",
      location: "Curitiba, PR",
      type: "Estágio",
      level: "Estagiário",
      salary: "R$ 1.200 - R$ 1.800",
      category: "Marketing",
      remote: false,
      benefits: ["Vale Transporte", "Auxílio Alimentação"],
      description:
        "Apoio em campanhas de marketing digital, criação de conteúdo para redes sociais e análise de métricas.",
      requirements: ["Cursando Marketing ou Comunicação", "Conhecimento em Redes Sociais", "Criatividade"],
      publishedDate: "2025-01-01",
      companyRating: 4.1,
      quickApply: false,
      featured: false,
    },
    {
      id: 16,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Porto Alegre, RS",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 11.000 - R$ 16.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office", "Certificações"],
      description: "Automação de infraestrutura, CI/CD, monitoramento de aplicações e gestão de ambientes cloud.",
      requirements: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Linux"],
      publishedDate: "2024-12-30",
      companyRating: 4.5,
      quickApply: true,
      featured: true,
    },
    {
      id: 17,
      title: "Analista de Suporte Técnico",
      company: "TechSupport",
      location: "Fortaleza, CE",
      type: "CLT",
      level: "Júnior",
      salary: "R$ 3.500 - R$ 5.000",
      category: "Tecnologia",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Vale Transporte"],
      description:
        "Suporte técnico a usuários, resolução de problemas de hardware e software, documentação de processos.",
      requirements: ["Windows", "Linux", "Redes", "Hardware", "Atendimento ao Cliente"],
      publishedDate: "2024-12-29",
      companyRating: 3.7,
      quickApply: false,
      featured: false,
    },
    {
      id: 18,
      title: "Arquiteto de Software",
      company: "Enterprise Solutions",
      location: "São Paulo, SP",
      type: "CLT",
      level: "Senior",
      salary: "R$ 18.000 - R$ 25.000",
      category: "Tecnologia",
      remote: true,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Home Office", "Stock Options", "Participação nos Lucros"],
      description:
        "Definição de arquitetura de sistemas, padrões de desenvolvimento, mentoria técnica e tomada de decisões tecnológicas.",
      requirements: ["Arquitetura de Software", "Microservices", "Cloud", "Design Patterns", "Liderança Técnica"],
      publishedDate: "2024-12-28",
      companyRating: 4.8,
      quickApply: true,
      featured: true,
    },
    {
      id: 19,
      title: "Especialista em SEO",
      company: "Digital Growth",
      location: "Rio de Janeiro, RJ",
      type: "PJ",
      level: "Pleno",
      salary: "R$ 7.000 - R$ 11.000",
      category: "Marketing",
      remote: true,
      benefits: ["Horário Flexível", "Home Office"],
      description:
        "Otimização de sites para mecanismos de busca, análise de palavras-chave, link building e relatórios de performance.",
      requirements: ["SEO", "Google Analytics", "Search Console", "Semrush", "Content Marketing"],
      publishedDate: "2024-12-27",
      companyRating: 4.4,
      quickApply: true,
      featured: false,
    },
    {
      id: 20,
      title: "Analista de Qualidade de Software",
      company: "QualityFirst",
      location: "Salvador, BA",
      type: "CLT",
      level: "Pleno",
      salary: "R$ 6.000 - R$ 9.000",
      category: "Tecnologia",
      remote: false,
      benefits: ["Vale Alimentação", "Plano de Saúde", "Vale Transporte", "Cursos"],
      description:
        "Testes manuais e automatizados, elaboração de casos de teste, validação de requisitos e garantia da qualidade.",
      requirements: ["Testes de Software", "Selenium", "Postman", "SQL", "Metodologias Ágeis"],
      publishedDate: "2024-12-26",
      companyRating: 4.0,
      quickApply: false,
      featured: false,
    },
  ],

  // Métodos para filtrar e buscar vagas
  searchJobs: function (searchTerm, location) {
    return this.jobs.filter((job) => {
      const titleMatch = job.title.toLowerCase().includes(searchTerm.toLowerCase())
      const companyMatch = job.company.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch = job.category.toLowerCase().includes(searchTerm.toLowerCase())
      const locationMatch = location ? job.location.toLowerCase().includes(location.toLowerCase()) : true

      return (titleMatch || companyMatch || categoryMatch) && locationMatch
    })
  },

  filterJobs: function (filters) {
    return this.jobs.filter((job) => {
      // Filtro por categoria
      if (filters.category && filters.category !== "all" && job.category !== filters.category) {
        return false
      }

      // Filtro por nível
      if (filters.level && filters.level !== "all" && job.level !== filters.level) {
        return false
      }

      // Filtro por tipo de contrato
      if (filters.type && filters.type !== "all" && job.type !== filters.type) {
        return false
      }

      // Filtro por trabalho remoto
      if (filters.remote === true && !job.remote) {
        return false
      }

      // Filtro por candidatura rápida
      if (filters.quickApply === true && !job.quickApply) {
        return false
      }

      // Filtro por localização
      if (filters.location && filters.location !== "all") {
        const state = job.location.split(", ")[1]
        if (state !== filters.location) {
          return false
        }
      }

      return true
    })
  },

  getCategories: function () {
    const categories = [...new Set(this.jobs.map((job) => job.category))]
    return categories.sort()
  },

  getLevels: function () {
    const levels = [...new Set(this.jobs.map((job) => job.level))]
    return levels.sort()
  },

  getLocations: function () {
    const locations = [...new Set(this.jobs.map((job) => job.location.split(", ")[1]))]
    return locations.sort()
  },

  getFeaturedJobs: function () {
    return this.jobs.filter((job) => job.featured)
  },
}

// Exportar para uso global
window.jobsDatabase = jobsDatabase
