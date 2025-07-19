<template>
  <footer class="footer">
    <p class="footer-text">
      🤖 Definitely <span class="amazing-right">Amazing right?</span>. 
      Just a guy who codes with juice in hand. Coded with ❤️ and probably juice by<br />
      <strong>Phathutshedzo Rakhunwana</strong>.
    </p>

    <div class="footer-contact">
      📧 Email: <a href="mailto:phathurakhunwana@gmail.com">phathurakhunwana@gmail.com</a><br />
      🔗 Website: 
      <a 
        href="https://phathus-design.netlify.app/" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        www.phathusdesign.com
      </a>
      <div class="social-icons">
        <a href="https://https://www.facebook.com/phathutshedzo.rakhunwana/" 
        target="_blank" rel=" noopener noreferrer" aria-label = "Facebook">
         <i class="fab fa-facebook"></i>
      </a>
        <a href="https://www.instagram.com/phathutshedzorakhunwana/" 
        target="_blank" rel="Instagram" aria-label = "Instagram">
         <span class="sr-only">Instagram</span>
        <i class="fab fa-instagram"></i>
      </a>
        <a href="https://github.com/phathu87" 
        target="_blank" title="GitHub">
          <i class="fab fa-github"></i>
      </a>
        <a href="https://www.linkedin.com/in/phathutshedzo-rakhunwana/" 
        target="_blank" title="LinkedIn">
          <i class="fab fa-linkedin"></i>
      </a>
      </div>
    </div>

    <p class="footer-bottom">
      © {{ new Date().getFullYear() }} <strong>Phathutshedzo Rakhunwana</strong>. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
defineOptions({ name: 'AppFooter' })
// This component is the footer of the application.
</script>

<style scoped>
.footer {
  margin-top: 4rem;
  padding: 1.5rem 2rem;
  background: #f0f0f0;
  border-radius: 10px;
  border-top: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #444;
  text-align: left;
}

.footer-text,
.footer-contact {
  flex: 1 1 300px;
  min-width: 250px;
  line-height: 1.5;
}

.footer-bottom {
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: #666;
}

.social-icons {
  margin-top: 0.75rem;
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;
}

.social-icons a {
  text-decoration: none;
  transition: transform 0.2s ease;
}

.social-icons a:hover {
  transform: scale(1.25);
}

.amazing-right {
  color: #0532c7;
  font-weight: bold;
}

a {
  color: #0077b6;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
  }

  .footer-text,
  .footer-contact {
    flex: unset;
    min-width: 100%;
  }

  .social-icons {
    justify-content: center;
  }
}

.dark .footer {
  background: #333;
  border-top: 1px solid #333;
  color: #ccc;
}

.dark .footer-bottom {
  color: #999;
}

.dark .footer-text,
.dark .footer-contact {
  color: #ccc;
}

.dark .social-icons a {
  color: #ddd;
}

.dark .amazing-right {
  color: #4c8fff; /* softer blue for dark background */
}

.dark a {
  color: #4c9eff;
}
.dark a:hover {
  color: #6abfff; /* lighter blue on hover */
}
</style>

