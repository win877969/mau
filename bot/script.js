
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
        <table>
  <thead>
    <tr>
      <th>IP:PORT</th>
      <th> ID | ISP </th>
      <th>VLESS 443</th>
      <th>VLESS 80</th>
      <th>TROJAN 443</th>
      <tr>
        </thead>
  <tbody>
    <tr>
      <td> ${ip}:${port} </td>
      <td>(${negara}) | ${penyedia}</td>
      <td>vless://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:443?encryption=none&security=tls&sni=xvp.bmkg.xyz&fp=randomized&type=ws&host=xvp.bmkg.xyz&path=%2Fvl%3D${ip}%3A${port}#(${negara})+${penyedia} <button class="copy-btn">Copy</button></td>
      <td>vless://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:80?path=%2Fvl%3D${ip}%3A${port}&security=none&encryption=none&host=xvp.bmkg.xyz&fp=randomized&type=ws&sni=xvp.bmkg.xyz#(${negara})+${penyedia} <button class="copy-btn">Copy</button></td>
      <td>trojan://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:443?security=tls&type=ws&host=xvp.bmkg.xyz&sni=xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${ip}%3A${port}#(${negara})+${penyedia} <button class="copy-btn">Copy</button></td>
          </tr>
  </tbody>
</table>`;

      proxyList.appendChild(proxyElement);

      const copyBtn = proxyElement.querySelector('.copy-btn');
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(`${ip}:${port}`);
        alert('Proxy copied!');
      });
    });
  })
  .catch(error => console.error("Error:", error));
