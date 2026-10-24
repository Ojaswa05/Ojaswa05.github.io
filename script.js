// Interactive Portfolio JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Resume Upload Simulation & File Handling
  const resumeInput = document.getElementById('resumeUploadInput');
  const uploadFeedback = document.getElementById('uploadFeedback');
  const downloadResumeBtn = document.getElementById('downloadResumeBtn');

  if (resumeInput) {
    resumeInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        uploadFeedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Success: <strong>${file.name}</strong> (${(file.size / 1024).toFixed(1)} KB) uploaded and ready for review!`;
        uploadFeedback.className = 'upload-feedback success';
        
        // Create an Object URL so downloading will download the newly uploaded file
        const blobUrl = URL.createObjectURL(file);
        downloadResumeBtn.href = blobUrl;
        downloadResumeBtn.download = file.name;
      }
    });
  }

  // 2. Help Accordion Toggle
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('active');

      // Close all
      accordionHeaders.forEach(h => {
        h.classList.remove('active');
        h.nextElementSibling.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        header.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  // 3. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#070913';
        navLinks.style.padding = '20px';
        navLinks.style.borderBottom = '1px solid #333';
      }
    });
  }
});
