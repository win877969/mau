const UUID = 'FREE-CF-BMGK-XYZ';
const HOSTNAME = 'xvp.bmkg.xyz';
const PORT_TLS = 443;
const PORT_NTLS = 80;

function generateVlessUrl(ip, port, negara, penyedia) {
  return `vless://${HOSTNAME}:${PORT_TLS}?encryption=none&security=tls&sni=${HOSTNAME}&fp=randomized&type=ws&host=${HOSTNAME}&path=/vl%3D${ip}%3A${port}#${negara}+${penyedia}`;
}

function generateTrojanUrl(ip, port, negara, penyedia) {
  return `trojan://${HOSTNAME}:${PORT_TLS}?security=tls&type=ws&host=${HOSTNAME}&sni=${HOSTNAME}&fp=random&path=/tr%3D${ip}%3A${port}#${negara}+${penyedia}`;
}

fetch("proxy_list.txt")
  .then(response => response.text())
  .then(data => {
    const proxyList = document.getElementById('proxy-list');
    const proxies = data.split("\n");

    proxies.forEach(proxy => {
      const [ip, port, negara, penyedia] = proxy.split(",");
      const proxyElement = document.createElement('div');
      proxyElement.className = 'proxy';

      const vlessUrl = generateVlessUrl(ip, port, negara, penyedia);
      const trojanUrl = generateTrojanUrl(ip, port, negara, penyedia);

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
              <td>${vlessUrl} <button class="copy-btn">Copy</button></td>
              <td>${generateVlessUrl(ip, port, negara, penyedia, PORT_NTLS)} <button class="copy-btn">Copy</button></td>
              <td>${trojanUrl} <button class="copy-btn">Copy</button></td>
            </tr>
          </tbody>
        </table>
      `;

      proxyList.appendChild(proxyElement);

      const copyBtns = proxyElement.querySelectorAll('.copy-btn');
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
