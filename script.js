// Simple navigation active state
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.navbar a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

