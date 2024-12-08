
fetch("proxy_list.txt")
  .then(response => response.text())
  .then(data => {
    const proxyList = document.getElementById('proxy-list');
    const proxies = data.split("\n");

    proxies.forEach(proxy => {
      const [ip, port, negara, penyedia] = proxy.split(",");

      const proxyElement = document.createElement('div');
      proxyElement.className = 'proxy';

      proxyElement.innerHTML = `
        <span>${ip}:${port} (${negara}, ${penyedia})</span>
        <button class="copy-btn">Copy</button>
      `;

      proxyList.appendChild(proxyElement);

      const copyBtn = proxyElement.querySelector('.copy-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${ip}:${port}`);
        alert('Proxy copied!');
      });
    });
  })
  .catch(error => console.error("Error:", error));
