// js/script.js

/**
 * Funções de Utilidade (Helpers)
 */
const utils = {
  // Validação de e-mail
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

  // Scroll suave para elementos
  smoothScrollTo: (element) => {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },

  // Mostrar/ocultar elemento
  toggleElement: (element, show) => {
    element.style.display = show ? 'block' : 'none';
  }
};

/**
 * Menu Mobile
 */
const setupMobileMenu = () => {
  const menuToggle = document.getElementById('menu-toggle');
  if (!menuToggle) return;

  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    menuToggle.textContent = isActive ? '✕' : '☰';
  });
};

/**
 * Dark Mode
 */
const setupDarkMode = () => {
  const darkModeBtn = document.getElementById('toggle-dark');
  if (!darkModeBtn) return;

  darkModeBtn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    darkModeBtn.textContent = isDark ? '☀️' : '🌙';
    
    // Opcional: Salvar preferência no localStorage
    localStorage.setItem('darkMode', isDark);
  });

  // Carregar preferência salva
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
  }
};

/**
 * Botão Voltar ao Topo
 */
const setupBackToTop = () => {
  const btnTopo = document.getElementById('voltar-topo');
  if (!btnTopo) return;

  window.addEventListener('scroll', () => {
    utils.toggleElement(btnTopo, window.scrollY > 300);
  });

  btnTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};

/**
 * Animações ao Scroll
 */
const setupScrollAnimations = () => {
  const elementosAnimados = document.querySelectorAll('.animado');
  if (elementosAnimados.length === 0) return;

  const animarScroll = () => {
    elementosAnimados.forEach(el => {
      const posicao = el.getBoundingClientRect().top;
      const visivel = posicao < window.innerHeight - 100;
      if (visivel) el.classList.add('visivel');
    });
  };

  window.addEventListener('scroll', animarScroll);
  window.addEventListener('load', animarScroll);
};

/**
 * Filtro de Projetos
 */
const setupProjectFilter = () => {
  const botoesFiltro = document.querySelectorAll('.btn-filtro');
  if (botoesFiltro.length === 0) return;

  const cards = document.querySelectorAll('.grid-projetos .card');
  
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');

      const filtro = btn.dataset.filtro;
      cards.forEach(card => {
        card.style.display = (filtro === 'todos' || card.classList.contains(filtro)) 
          ? 'block' 
          : 'none';
      });
    });
  });
};

document.addEventListener('DOMContentLoaded', function() {
  // Seleciona os elementos
  const filtroBtns = document.querySelectorAll('.btn-filtro');
  const projetosCards = document.querySelectorAll('.projeto-card');
  const detalhesBtns = document.querySelectorAll('.btn-detalhes');

  // Função para filtrar os projetos
  function filtrarProjetos(filtro) {
    projetosCards.forEach(card => {
      const categoria = card.getAttribute('data-category');
      
      if (filtro === 'todos' || categoria === filtro) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Adiciona eventos aos botões de filtro
  filtroBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove a classe 'ativo' de todos os botões
      filtroBtns.forEach(b => b.classList.remove('ativo'));
      
      // Adiciona a classe 'ativo' ao botão clicado
      this.classList.add('ativo');
      
      // Obtém o valor do filtro
      const filtro = this.getAttribute('data-filtro');
      
      // Aplica o filtro
      filtrarProjetos(filtro);
    });
  });
});

/**
 * Formulário de Contato
 */
const setupContactForm = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const showMessage = (text, color) => {
    const msgElement = document.getElementById('form-msg');
    if (msgElement) {
      msgElement.textContent = text;
      msgElement.style.color = color;
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    // Validação
    if (name.length < 3) {
      showMessage('Nome deve ter pelo menos 3 letras.', 'red');
      return;
    }

    if (!utils.validateEmail(email)) {
      showMessage('Digite um e-mail válido.', 'red');
      return;
    }

    if (!message) {
      showMessage('Mensagem não pode estar vazia.', 'red');
      return;
    }

    showMessage('Enviando mensagem...', 'blue');

    // Envio com EmailJS
    emailjs.send('service_4m4bltu', 'template_5h78lbd', {
      from_name: name,
      from_email: email,
      message: message
    })
    .then(() => {
      showMessage('Mensagem enviada com sucesso!', 'green');
      form.reset();
    })
    .catch((error) => {
      console.error('Erro no envio:', error);
      showMessage('Erro ao enviar. Tente novamente.', 'red');
    });
  });
};

/**
 * Preloader
 */
const setupPreloader = () => {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  window.addEventListener('load', () => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  });
};

/**
 * Scroll Suave para Links Internos
 */
const setupSmoothLinks = () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      utils.smoothScrollTo(target);
    });
  });
};

/**
 * Inicialização
 */
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupDarkMode();
  setupBackToTop();
  setupScrollAnimations();
  setupProjectFilter();
  setupContactForm();
  setupPreloader();
  setupSmoothLinks();
});




















/**
 * Filtro da Galeria
 */
const setupGalleryFilter = () => {
  const botoesFiltro = document.querySelectorAll('.filtros .btn-filtro');
  if (botoesFiltro.length === 0) return;

  const itensGaleria = document.querySelectorAll('.grid-galeria .galeria-item');
  
  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove a classe ativa de todos os botões
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      // Adiciona a classe ativa ao botão clicado
      btn.classList.add('ativo');

      const filtro = btn.dataset.filtro;
      
      // Filtra os itens com animação
      itensGaleria.forEach(item => {
        if (filtro === 'todos' || item.dataset.category === filtro) {
          // Mostra o item com animação
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          // Esconde o item com animação
          item.style.animation = 'fadeOut 0.4s ease forwards';
          setTimeout(() => {
            item.style.display = 'none';
          }, 400);
        }
      });
    });
  });
};

// Adiciona estilos dinâmicos para as animações
const addGalleryStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(10px); }
    }
    
    .galeria-item {
      animation: fadeIn 0.5s ease;
    }
  `;
  document.head.appendChild(style);
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  setupGalleryFilter();
  addGalleryStyles();
});

