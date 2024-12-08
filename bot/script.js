
const UUID = 'FREE-CF-BMGK-XYZ';
const HOSTNAME = 'xvp.bmkg.xyz';
const PORT_TLS = 443;
const PORT_NTLS = 80;
const CLASS_COPY_BTN = 'copy-btn';
const CLASS_PROXY = 'proxy';

function generateVlessUrl(ip, port, negara, penyedia, portOverride = PORT_TLS) {
  return `vless://${UUID}@${HOSTNAME}:${portOverride}?encryption=none&security=tls&sni=${HOSTNAME}&fp=randomized&type=ws&host=${HOSTNAME}&path=/vl%3D${ip}%3A${port}#${negara}+${penyedia}`;
}

function generateTrojanUrl(ip, port, negara, penyedia) {
  return `trojan://${UUID}@${HOSTNAME}:${PORT_TLS}?security=tls&type=ws&host=${HOSTNAME}&sni=${HOSTNAME}&fp=random&path=/tr%3D${ip}%3A${port}#${negara}+${penyedia}`;
}

fetch("proxy_list.txt")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    const proxyList = document.getElementById('proxy-list');
    const proxies = data.split("\n").filter(Boolean);

    proxies.forEach(proxy => {
      const [ip, port, negara, penyedia] = proxy.trim().split(",");
      const proxyElement = document.createElement('div');
      proxyElement.className = CLASS_PROXY;

      const vlessUrl = generateVlessUrl(ip, port, negara, penyedia);
      const trojanUrl = generateTrojanUrl(ip, port, negara, penyedia);
      const vlessUrl80 = generateVlessUrl(ip, port, negara, penyedia, PORT_NTLS);

      proxyElement.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>IP:PORT</th>
              <th>ID | ISP</th>
              <th>VLESS 443</th>
              <th>VLESS 80</th>
              <th>TROJAN 443</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${ip}:${port}</td>
              <td>(${negara}) | ${penyedia}</td>
              <td>${vlessUrl} <button class="${CLASS_COPY_BTN}">Copy</button></td>
              <td>${vlessUrl80} <button class="${CLASS_COPY_BTN}">Copy</button></td>
              <td>${trojanUrl} <button class="${CLASS_COPY_BTN}">Copy</button></td>
            </tr>
          </tbody>
        </table>
      `;

      proxyList.appendChild(proxyElement);

      const copyBtns = proxyElement.querySelectorAll(`.${CLASS_COPY_BTN}`);
      copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          try {
            navigator.clipboard.writeText(`${ip}:${port}`);
            alert('Proxy copied!');
          } catch (error) {
            console.error("Error:", error);
          }
        });
      });
    });
  })
  .catch(error => console.error("Error:", error));
