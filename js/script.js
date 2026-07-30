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

const setupBackToTopo = () => {
  const btnTopo = document.getElementById('voltar-topo2');
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
 * reveals
 */



const reveals = document.querySelectorAll(".reveal");

function revealElements() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealElements);
revealElements();
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
const btn = document.getElementById('button');

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
    
    btn.value = 'Enviar Mensagem';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    // Validação
    if (name.length < 3) {
      showMessage('Nome deve ter pelo menos 3 letras.', 'red');
     btn.value = 'Tentar Novamente';
      return;
    }

    if (!utils.validateEmail(email)) {
      showMessage('Digite um e-mail válido.', 'red');
     btn.value = 'Tentar Novamente';
      return;
    }

    if (!message) {
      showMessage('Mensagem não pode estar vazia.', 'red');
     btn.value = 'Tentar Novamente';
      return;
    }
     btn.value = 'Sending...';
    showMessage('Enviando mensagem...', 'blue');

    // Envio com EmailJS
    emailjs.send('service_4m4bltu', 'template_5h78lbd', {
      name: name,
      email: email,
      message: message
    })
    .then(() => {
      btn.value ='Enviado!!!';
      showMessage('Mensagem enviada com sucesso!', 'green');
      form.reset();
    })
    .catch((error) => {
     btn.value ='Erro no envio:', error;
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
  setupDynamicHeader();
});

/**
 * Cabeçalho Dinâmico (Esconder/Mostrar ao Scroll)
 */
const setupDynamicHeader = () => {
    const header = document.getElementById('main-header');
    if (!header) return; // Garante que o cabeçalho existe

    let lastScrollY = window.scrollY; // Armazena a última posição de rolagem

    window.addEventListener('scroll', () => {
        // Se a rolagem atual for maior que a última (rolando para baixo) E o cabeçalho não estiver oculto
        if (window.scrollY > lastScrollY && window.scrollY > header.offsetHeight) { // Verifica se já rolou mais do que a altura do cabeçalho
            header.classList.add('hidden');
        } 
        // Se a rolagem atual for menor que a última (rolando para cima) OU se voltou para o topo da página
        else if (window.scrollY < lastScrollY || window.scrollY <= 0) {
            header.classList.remove('hidden');
        }
        
        lastScrollY = window.scrollY; // Atualiza a última posição de rolagem
    });
};


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







const tabBtns = document.querySelectorAll('.tab-btn'); 
const tabContents = document.querySelectorAll('.tab-content'); 
 
tabBtns.forEach(btn => { 
  btn.addEventListener('click', () => { 
    tabBtns.forEach(b => b.classList.remove('active')); 
    tabContents.forEach(c => c.classList.remove('active')); 
 
    btn.classList.add('active'); 
    document.getElementById(btn.dataset.tab).classList.add('active'); 
  }); 
}); 
 
const indicator = document.querySelector('.tab-indicator'); 
 
function moveIndicator(btn) { 
  indicator.style.width = `${btn.offsetWidth}px`; 
  indicator.style.left = `${btn.offsetLeft}px`; 
} 
 
tabBtns.forEach(btn => { 
  btn.addEventListener('click', () => { 
    tabBtns.forEach(b => b.classList.remove('active')); 
    tabContents.forEach(c => c.classList.remove('active')); 
 
    btn.classList.add('active'); 
    document.getElementById(btn.dataset.tab).classList.add('active'); 
 
    moveIndicator(btn); 
  }); 
}); 
 
// inicia no primeiro botão 
window.addEventListener('load', () => { 
  const activeBtn = document.querySelector('.tab-btn.active'); 
  moveIndicator(activeBtn); 
}); 























// Scroll com drag
const scrollContainer = document.querySelector('.scroll-container');
let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
  scrollContainer.style.cursor = 'grabbing';
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
  scrollContainer.style.cursor = 'grab';
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.scrollLeft = scrollLeft - walk;
});


















// Tabs dos serviços
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active de todos os botões e conteúdos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Adiciona active ao botão clicado
    this.classList.add('active');
    
    // Mostra o conteúdo correspondente
    const tabId = this.dataset.tab;
    document.getElementById(tabId).classList.add('active');
  });
});