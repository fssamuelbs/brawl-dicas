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
