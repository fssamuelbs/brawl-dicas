document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Animação de Scroll (Fade In nas seções)
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visivel");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".conteudo-secao").forEach(secao => {
    observer.observe(secao);
  });

  // 2. Efeito 3D Interativo nas Imagens com o Mouse
  const imagens = document.querySelectorAll(".bloco-imagem img");

  imagens.forEach(img => {
    img.addEventListener("mousemove", (e) => {
      const rect = img.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Multiplicador para suavizar a rotação
      const rotateX = (-y / 10);
      const rotateY = (x / 10);

      img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    img.addEventListener("mouseleave", () => {
      img.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  // 3. Efeito Ripple (Onda ao clicar nos links/botões)
  const botoes = document.querySelectorAll(".links a");

  botoes.forEach(botao => {
    botao.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

});

document.addEventListener("DOMContentLoaded", () => {
  // Cria o elemento HTML do Modal do Lightbox dinamicamente
  const modal = document.createElement("div");
  modal.classList.add("lightbox-modal");
  
  const imgAmpliada = document.createElement("img");
  modal.appendChild(imgAmpliada);
  document.body.appendChild(modal);

  // Seleciona todas as imagens das seções e do topo que podem ser clicadas
  const imagensClicaveis = document.querySelectorAll(".bloco-imagem img, .topo-banner-imagem img");

  imagensClicaveis.forEach(img => {
    img.addEventListener("click", () => {
      imgAmpliada.src = img.src;
      modal.style.display = "flex";
    });
  });

  // Fecha o modal ao clicar em qualquer lugar da tela escura ou na imagem
  modal.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

// ---------- Funcionalidade do FAQ (Acordeão e Pesquisa) ----------
document.addEventListener("DOMContentLoaded", () => {
  const faqItens = document.querySelectorAll(".faq-item");

  faqItens.forEach(item => {
    const botao = item.querySelector(".faq-pergunta");
    
    botao.addEventListener("click", () => {
      // Fecha os outros abertos (opcional, se quiseres apenas um por vez)
      faqItens.forEach(outroItem => {
        if (outroItem !== item) {
          outroItem.classList.remove("ativo");
          outroItem.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
        }
      });

      // Alterna o atual
      const estaAtivo = item.classList.toggle("ativo");
      botao.setAttribute("aria-expanded", estaAtivo);
    });
  });

  // Barra de Pesquisa Dinâmica do FAQ
  const inputBusca = document.getElementById("inputBuscaFaq");
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => {
      const termo = e.target.value.toLowerCase().trim();
      
      faqItens.forEach(item => {
        const textoPergunta = item.querySelector(".faq-pergunta").innerText.toLowerCase();
        const textoResposta = item.querySelector(".faq-resposta").innerText.toLowerCase();

        if (textoPergunta.includes(termo) || textoResposta.includes(termo)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  }
});
