// Theme Change code
const toggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
const body = document.body;


function setTheme(isDark) {
    if (isDark) {
        body.classList.add('dark');
        body.style.backgroundColor = 'var(--bg-dark)';
        body.style.color = 'var(--text-dark)';
        icon.className = 'bx bx-sun'; // Change to sun icon
    } else {
        body.classList.remove('dark');
        body.style.backgroundColor = 'var(--bg-light)';
        body.style.color = 'var(--text-light)';
        icon.className = 'bx bx-moon'; // Change back to moon icon
    }
      localStorage.setItem('darkMode', isDark);
    }

    toggleBtn.addEventListener('click', () => {
      const isDark = body.classList.contains('dark');
      setTheme(!isDark);
    });

    window.addEventListener('DOMContentLoaded', () => {
      const isDark = JSON.parse(localStorage.getItem('darkMode'));
      setTheme(isDark);
    });

//counter-section code
const counters = document.querySelectorAll('.counter');
let started = false; // To make sure counting happens only once

const startCounting = () => {
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / 200;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };

      updateCount();
    });
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        startCounting();
        started = true;
        observer.unobserve(entry.target); // stop observing after triggered
      }
    });
  }, { threshold: 0.5 });

observer.observe(document.getElementById('counter-section'));

// Scroll button logic
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', function() {
  // Show button after 50% scroll
  if (window.scrollY > (document.body.scrollHeight / 2)) {
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to top smoothly
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const multiText = document.querySelector('#navbar-hero #hero .row .Me .multi-text');
const outlinedWords = ["Developer", "Арplication", "Design", "Creative", "Portfolio"];
const letterSpacing = 0.1; // Should match your CSS letter-spacing in em

function typeOutlinedText() {
    if (!multiText) return;
    
    let wordIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 150;
    
    function type() {
        const fullWord = outlinedWords[wordIndex];
        
        if (isDeleting) {
            currentText = fullWord.substring(0, currentText.length - 1);
            typingSpeed = 50;
        } else {
            currentText = fullWord.substring(0, currentText.length + 1);
            typingSpeed = 150;
        }
        
        // Apply letter spacing to each character
        multiText.innerHTML = currentText.split('').map(char => 
            `<span style="display: inline-block; margin-right: ${letterSpacing}em">${char}</span>`
        ).join('');
        
        // Animation logic
        if (!isDeleting && currentText === fullWord) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % outlinedWords.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    typeOutlinedText();
    
    // Theme adaptation
    const isDark = JSON.parse(localStorage.getItem('darkMode'));
    if (isDark && multiText) {
        multiText.style.setProperty('--text-stroke-color', 'var(--text-dark)');
    }
});