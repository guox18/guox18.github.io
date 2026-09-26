(() => {
  const button = document.querySelector('.copy-email');
  const status = document.querySelector('.email-copy-status');
  if (!button || !status) return;

  let resetTimer;
  button.addEventListener('click', async () => {
    clearTimeout(resetTimer);
    const email = button.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      status.classList.remove('copy-failed');
      status.textContent = 'Email copied.';
      resetTimer = setTimeout(() => { status.textContent = ''; }, 4000);
    } catch {
      status.classList.add('copy-failed');
      status.textContent = `Please copy manually: ${email}`;
    }
  });
})();
