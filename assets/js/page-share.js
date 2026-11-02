(() => {
  const area = document.querySelector('[data-page-share]');
  if (!area) return;
  const field = area.querySelector('[data-share-url]');
  const status = area.querySelector('[data-share-status]');
  const copy = area.querySelector('[data-copy-link]');
  const share = area.querySelector('[data-native-share]');
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!field || !status || !copy || !share || !canonical) return;
  const url = canonical.href;
  field.value = url;
  function manualCopy() {
    field.focus();
    field.select();
    status.textContent = 'Copy the selected link using your device’s copy command.';
  }
  copy.hidden = false;
  copy.addEventListener('click', async () => {
    status.textContent = '';
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        manualCopy();
        return;
      }
      await navigator.clipboard.writeText(url);
      status.textContent = 'Link copied.';
    } catch {
      manualCopy();
    }
  });
  if (typeof navigator.share === 'function') {
    share.hidden = false;
    share.addEventListener('click', async () => {
      status.textContent = '';
      try {
        await navigator.share({ title: document.title, url });
      } catch (error) {
        if (!error || error.name !== 'AbortError') manualCopy();
      }
    });
  }
})();
