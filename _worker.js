// worker.js
import { connect } from "cloudflare:sockets";
var listProxy = [
 // { path: "8.215.59.6:443", proxy: "8.215.59.6:443" },  
 // { path: "147.139.245.56:443", proxy: "147.139.245.56:443" },
 // { path: "103.67.79.230:443", proxy: "103.67.79.230:443" },  
  { path: "203.194.112.119:8443", proxy: "203.194.112.119:8443" },
  { path: "111.95.40.14:32414", proxy: "111.95.40.14:32414" },
  { path: "103.186.1.209:8443", proxy: "103.186.1.209:8443" },
  { path: "35.219.50.99:443", proxy: "35.219.50.99:443" },
  { path: "35.219.15.90:443", proxy: "35.219.15.90:443" },
  { path: "210.186.12.244:443", proxy: "210.186.12.244:443" },
  { path: "166.88.35.141:443", proxy: "166.88.35.141:443" },
  { path: "167.71.194.185:8443", proxy: "167.71.194.185:8443" },
  { path: "89.34.227.166:8443", proxy: "89.34.227.166:8443" },
  { path: "45.77.36.40:443", proxy: "45.77.36.40:443" },
  { path: "43.134.34.18:443", proxy: "43.134.34.18:443" },
  { path: "103.180.193.56:443", proxy: "103.180.193.56:443" },
  { path: "164.52.2.100:443", proxy: "164.52.2.100:443" },
  { path: "51.79.254.182:443", proxy: "51.79.254.182:443" },
  { path: "104.248.145.216:443", proxy: "104.248.145.216:443" },
  { path: "185.217.5.3:443", proxy: "185.217.5.3:443" },
  { path: "129.150.50.63:443", proxy: "129.150.50.63:443" },
  { path: "185.114.78.230:443", proxy: "185.114.78.230:443" },
  { path: "194.36.179.237:443", proxy: "194.36.179.237:443" },
  { path: "52.74.101.26:443", proxy: "52.74.101.26:443" },
  { path: "143.42.66.91:443", proxy: "143.42.66.91:443" },
  { path: "178.128.80.43:443", proxy: "178.128.80.43:443" },
  { path: "38.180.165.29:443", proxy: "38.180.165.29:443" },
  { path: "185.103.109.139:443", proxy: "185.103.109.139:443" },
  { path: "31.28.27.38:443", proxy: "31.28.27.38:443" }
//  { path: "146.56.169.198:443", proxy: "146.56.169.198:443" },
 // { path: "158.180.94.12:443", proxy: "158.180.94.12:443" },
// batas
//  { path: "198.13.56.210:443", proxy: "198.13.56.210:443" },
 // { path: "35.73.102.80:443", proxy: "35.73.102.80:443" }
//  { path: "185.103.109.139", proxy: "185.103.109.139" },
//  { path: "178.128.80.43", proxy: "178.128.80.43" },
//  { path: "35.219.15.90", proxy: "35.219.15.90" },
 // { path: "8.223.39.101", proxy: "8.223.39.101" },
//  { path: "175.142.86.195", proxy: "175.142.86.195" },
//  { path: "166.88.35.141", proxy: "166.88.35.141" },
//  { path: "31.28.27.38", proxy: "31.28.27.38" },
//  { path: "203.194.112.119", proxy: "203.194.112.119" },
 // { path: "104.17.159.243", proxy: "104.17.159.243" }
  //tambahin sendiri
];
var proxyIP;
var proxyPort;
var worker_default = {
  async fetch(request, ctx) {
    try {
      proxyIP = proxyIP;
      const url = new URL(request.url);
      const upgradeHeader = request.headers.get("Upgrade");
      for (const entry of listProxy) {
        if (url.pathname === entry.path) {
          [proxyIP, proxyPort] = entry.proxy.split(':');
          break;
        }
      }
      if (upgradeHeader === "websocket" && proxyIP) {
        return await vlessOverWSHandler(request);
      }
      const allConfig = await getAllConfigVless(request.headers.get("Host"));
      return new Response(allConfig, {
        status: 200,
        headers: { "Content-Type": "text/html;charset=utf-8" }
      });
    } catch (err) {
      return new Response(err.toString(), { status: 500 });
    }
  }
};
async function getAllConfigVless(hostName) {
  try {
    let vlessConfigs = "";
    let clashConfigs = "";
    for (const entry of listProxy) {
      const { path, proxy } = entry;
      const [ipOnly] = proxy.split(':');
      const response = await fetch(`http://ip-api.com/json/${ipOnly}`);
      const data = await response.json();
      const pathFixed = encodeURIComponent(path);
      const vlessTls = `vless://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:443?encryption=none&security=tls&sni=xvp.bmkg.xyz&fp=randomized&type=ws&host=xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls1 = `vless://FREE-CF-BMGK-XYZ@ava.game.naver.com:443?encryption=none&security=tls&sni=ava.game.naver.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=ava.game.naver.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls2 = `vless://FREE-CF-BMGK-XYZ@graph.instagram.com:443?encryption=none&security=tls&sni=graph.instagram.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=graph.instagram.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls3 = `vless://FREE-CF-BMGK-XYZ@quiz.int.vidio.com:443?encryption=none&security=tls&sni=quiz.int.vidio.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=quiz.int.vidio.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls4 = `vless://FREE-CF-BMGK-XYZ@live.iflix.com:443?encryption=none&security=tls&sni=live.iflix.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=live.iflix.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls5 = `vless://FREE-CF-BMGK-XYZ@support.zoom.us.:443?encryption=none&security=tls&sni=support.zoom.us.xvp.bmkg.xyz&fp=randomized&type=ws&host=support.zoom.us.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls6 = `vless://FREE-CF-BMGK-XYZ@blog.webex.com:443?encryption=none&security=tls&sni=blog.webex.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=blog.webex.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls7 = `vless://FREE-CF-BMGK-XYZ@investors.spotify.com.:443?encryption=none&security=tls&sni=investors.spotify.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=investors.spotify.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls8 = `vless://FREE-CF-BMGK-XYZ@cache.netflix.com:443?encryption=none&security=tls&sni=cache.netflix.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=cache.netflix.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls9 = `vless://FREE-CF-BMGK-XYZ@zaintest.vuclip.com:443?encryption=none&security=tls&sni=zaintest.vuclip.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=zaintest.vuclip.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessTls10 = `vless://FREE-CF-BMGK-XYZ@io.ruangguru.com:443?encryption=none&security=tls&sni=io.ruangguru.com.xvp.bmkg.xyz&fp=randomized&type=ws&host=io.ruangguru.com.xvp.bmkg.xyz&path=%2Fvl%3D${pathFixed}#${data.isp} (${data.countryCode})`;
      const vlessNtls = `vless://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:80?path=%2Fvl%3D${pathFixed}&security=none&encryption=none&host=xvp.bmkg.xyz&fp=randomized&type=ws&sni=xvp.bmkg.xyz#${data.isp} (${data.countryCode})`;
      const vlessTlsFixed = vlessTls.replace(/ /g, "+");
      const vlessTls1Fixed = vlessTls1.replace(/ /g, "+");
      const vlessTls2Fixed = vlessTls2.replace(/ /g, "+");
      const vlessTls3Fixed = vlessTls3.replace(/ /g, "+");
      const vlessTls4Fixed = vlessTls4.replace(/ /g, "+");
      const vlessTls5Fixed = vlessTls5.replace(/ /g, "+");
      const vlessTls6Fixed = vlessTls6.replace(/ /g, "+");
      const vlessTls7Fixed = vlessTls7.replace(/ /g, "+");
      const vlessTls8Fixed = vlessTls8.replace(/ /g, "+");
      const vlessTls9Fixed = vlessTls9.replace(/ /g, "+");
      const vlessTls10Fixed = vlessTls10.replace(/ /g, "+");
      const vlessNtlsFixed = vlessNtls.replace(/ /g, "+");
      const trojanTls = `trojan://FREE-CF-BMGK-XYZ@xvp.bmkg.xyz:443?security=tls&type=ws&host=xvp.bmkg.xyz&sni=xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls1 = `trojan://FREE-CF-BMGK-XYZ@ava.game.naver.com:443?security=tls&type=ws&host=ava.game.naver.com.xvp.bmkg.xyz&sni=ava.game.naver.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls2 = `trojan://FREE-CF-BMGK-XYZ@graph.instagram.com:443?security=tls&type=ws&host=graph.instagram.com.xvp.bmkg.xyz&sni=graph.instagram.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls3 = `trojan://FREE-CF-BMGK-XYZ@quiz.int.vidio.com:443?security=tls&type=ws&host=quiz.int.vidio.com.xvp.bmkg.xyz&sni=quiz.int.vidio.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls4 = `trojan://FREE-CF-BMGK-XYZ@live.iflix.com:443?security=tls&type=ws&host=live.iflix.com.xvp.bmkg.xyz&sni=live.iflix.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls5 = `trojan://FREE-CF-BMGK-XYZ@support.zoom.us:443?security=tls&type=ws&host=support.zoom.us.xvp.bmkg.xyz&sni=support.zoom.us.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls6 = `trojan://FREE-CF-BMGK-XYZ@blog.webex.com:443?security=tls&type=ws&host=blog.webex.com.xvp.bmkg.xyz&sni=blog.webex.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls7 = `trojan://FREE-CF-BMGK-XYZ@investors.spotify.com:443?security=tls&type=ws&host=investors.spotify.com.xvp.bmkg.xyz&sni=investors.spotify.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls8 = `trojan://FREE-CF-BMGK-XYZ@cache.netflix.com:443?security=tls&type=ws&host=cache.netflix.com.xvp.bmkg.xyz&sni=cache.netflix.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls9 = `trojan://FREE-CF-BMGK-XYZ@zaintest.vuclip.com:443?security=tls&type=ws&host=zaintest.vuclip.com.xvp.bmkg.xyz&sni=zaintest.vuclip.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTls10 = `trojan://FREE-CF-BMGK-XYZ@io.ruangguru.com:443?security=tls&type=ws&host=io.ruangguru.com.xvp.bmkg.xyz&sni=io.ruangguru.com.xvp.bmkg.xyz&fp=random&path=%2Ftr%3D${pathFixed}#${data.isp} (${data.country})`;
      const trojanTlsFixed = trojanTls.replace(/ /g, '+');
      const trojanTlsFixed1 = trojanTls1.replace(/ /g, '+');
      const trojanTlsFixed2 = trojanTls2.replace(/ /g, '+');
      const trojanTlsFixed3 = trojanTls3.replace(/ /g, '+');
      const trojanTlsFixed4 = trojanTls4.replace(/ /g, '+');
      const trojanTlsFixed5 = trojanTls5.replace(/ /g, '+');
      const trojanTlsFixed6 = trojanTls6.replace(/ /g, '+');
      const trojanTlsFixed7 = trojanTls7.replace(/ /g, '+');
      const trojanTlsFixed8 = trojanTls8.replace(/ /g, '+');
      const trojanTlsFixed9 = trojanTls9.replace(/ /g, '+');
      const trojanTlsFixed10 = trojanTls10.replace(/ /g, '+');           
      const clashConfTls = `- name: ${data.isp} (${data.countryCode})
  server: xvp.bmkg.xyz
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: xvp.bmkg.xyz`;
      
      const clashConfTls1 = `- name: ${data.isp} (${data.countryCode})
  server: ava.game.naver.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: ava.game.naver.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: ava.game.naver.com.xvp.bmkg.xyz`;
      
      const clashConfTls2 = `- name: ${data.isp} (${data.countryCode})
  server: graph.instagram.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: graph.instagram.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: graph.instagram.com.xvp.bmkg.xyz`;
      
      const clashConfTls3 = `- name: ${data.isp} (${data.countryCode})
  server: quiz.int.vidio.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: quiz.int.vidio.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: quiz.int.vidio.com.xvp.bmkg.xyz`;
      
      const clashConfTls4 = `- name: ${data.isp} (${data.countryCode})
  server: live.iflix.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: live.iflix.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: live.iflix.com.xvp.bmkg.xyz`;
      
      const clashConfTls5 = `- name: ${data.isp} (${data.countryCode})
  server: support.zoom.us
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: support.zoom.us.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: support.zoom.us.xvp.bmkg.xyz`;
      
      const clashConfTls6 = `- name: ${data.isp} (${data.countryCode})
  server: blog.webex.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: blog.webex.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: blog.webex.com.xvp.bmkg.xyz`;
      
      const clashConfTls7 = `- name: ${data.isp} (${data.countryCode})
  server: investors.spotify.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: investors.spotify.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: investors.spotify.com.xvp.bmkg.xyz`;
      
      const clashConfTls8 = `- name: ${data.isp} (${data.countryCode})
  server: cache.netflix.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: cache.netflix.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: cache.netflix.com.xvp.bmkg.xyz`;
      
      const clashConfTls9 = `- name: ${data.isp} (${data.countryCode})
  server: zaintest.vuclip.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: zaintest.vuclip.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: zaintest.vuclip.com.xvp.bmkg.xyz`;
      
      const clashConfTls10 = `- name: ${data.isp} (${data.countryCode})
  server: io.ruangguru.com
  port: 443
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: true
  udp: true
  skip-cert-verify: true
  network: ws
  servername: io.ruangguru.com.xvp.bmkg.xyz
  ws-opts:
    path: /vl=${path}
    headers:
      Host: io.ruangguru.com.xvp.bmkg.xyz`;
      const clashConfNtls = `- name: ${data.isp} (${data.countryCode})
  server: xvp.bmkg.xyz
  port: 80
  type: vless
  uuid: FREE-CF-BMGK-XYZ
  cipher: auto
  tls: false
  udp: true
  skip-cert-verify: true
  network: ws
  ws-opts:
    path: /vl=${path}
    headers:
      Host: xvp.bmkg.xyz`;
const clashConfTls11 = `- name: ${data.isp} (${data.countryCode})
    server: xvp.bmkg.xyz
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: xvp.bmkg.xyz
    udp: true `;
      const clashConfTls12 = `- name: ${data.isp} (${data.countryCode})
    server: ava.game.naver.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: ava.game.naver.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: ava.game.naver.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls13 = `- name: ${data.isp} (${data.countryCode})
    server: graph.instagram.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: graph.instagram.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: graph.instagram.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls14 = `- name: ${data.isp} (${data.countryCode})
    server: quiz.int.vidio.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: quiz.int.vidio.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: quiz.int.vidio.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls15 = `- name: ${data.isp} (${data.countryCode})
    server: live.iflix.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: live.iflix.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: live.iflix.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls16 = `- name: ${data.isp} (${data.countryCode})
    server: support.zoom.us
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: support.zoom.us.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: support.zoom.us.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls17 = `- name: ${data.isp} (${data.countryCode})
    server: blog.webex.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: blog.webex.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: blog.webex.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls18 = `- name: ${data.isp} (${data.countryCode})
    server: investors.spotify.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: investors.spotify.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: investors.spotify.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls19 = `- name: ${data.isp} (${data.countryCode})
    server: cache.netflix.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: cache.netflix.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: cache.netflix.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls20 = `- name: ${data.isp} (${data.countryCode})
    server: zaintest.vuclip.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: zaintest.vuclip.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: zaintest.vuclip.com.xvp.bmkg.xyz
    udp: true `;
      const clashConfTls21 = `- name: ${data.isp} (${data.countryCode})
    server: io.ruangguru.com
    port: 443
    type: trojan
    password: FREE-CF-BMGK-XYZ
    skip-cert-verify: true
    sni: io.ruangguru.com.xvp.bmkg.xyz
    network: ws
    ws-opts:
      path: /tr=${path}
      headers:
        Host: io.ruangguru.com.xvp.bmkg.xyz
    udp: true `;
      clashConfigs += `<div style="display: none;">
   <textarea id="clashTls%2Fvl%3D${path}">${clashConfTls}</textarea>
   <textarea id="clashTls1%2Fvl%3D${path}">${clashConfTls1}</textarea>
   <textarea id="clashTls2%2Fvl%3D${path}">${clashConfTls2}</textarea>
   <textarea id="clashTls3%2Fvl%3D${path}">${clashConfTls3}</textarea>
   <textarea id="clashTls4%2Fvl%3D${path}">${clashConfTls4}</textarea>
   <textarea id="clashTls5%2Fvl%3D${path}">${clashConfTls5}</textarea>
   <textarea id="clashTls6%2Fvl%3D${path}">${clashConfTls6}</textarea>
   <textarea id="clashTls7%2Fvl%3D${path}">${clashConfTls7}</textarea>
   <textarea id="clashTls8%2Fvl%3D${path}">${clashConfTls8}</textarea>
   <textarea id="clashTls9%2Fvl%3D${path}">${clashConfTls9}</textarea>
   <textarea id="clashTls10%2Fvl%3D${path}">${clashConfTls10}</textarea>
   <textarea id="clashTls11%2Ftr%3D${path}">${clashConfTls11}</textarea>
   <textarea id="clashTls12%2Ftr%3D${path}">${clashConfTls12}</textarea>
   <textarea id="clashTls13%2Ftr%3D${path}">${clashConfTls13}</textarea>
   <textarea id="clashTls14%2Ftr%3D${path}">${clashConfTls14}</textarea>
   <textarea id="clashTls15%2Ftr%3D${path}">${clashConfTls15}</textarea>
   <textarea id="clashTls16%2Ftr%3D${path}">${clashConfTls16}</textarea>
   <textarea id="clashTls17%2Ftr%3D${path}">${clashConfTls17}</textarea>
   <textarea id="clashTls18%2Ftr%3D${path}">${clashConfTls18}</textarea>
   <textarea id="clashTls19%2Ftr%3D${path}">${clashConfTls19}</textarea>
   <textarea id="clashTls20%2Ftr%3D${path}">${clashConfTls20}</textarea>
   <textarea id="clashTls21%2Ftr%3D${path}">${clashConfTls21}</textarea>

   </div>
<div style="display: none;">
   <textarea id="clashNtls%2Fvl%3D${path}">${clashConfNtls}</textarea>
 </div>
<div class="config-section">
    <p><strong>ISP :  ${data.isp} (${data.countryCode})</strong> </p>
    <hr/>
    <div class="config-toggle">
        <button class="button2" onclick="toggleConfig(this, 'Show Trojan', 'Hide Trojan')">Show Trojan</button>
        <div class="config-content">
            <div class="config-block">
                <h3>TROJAN TLS:</h3>
          <p class="config">${trojanTlsFixed}</p>
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed}")'><i class="fa fa-clipboard"></i>Copy</button>
               </div> 
            <p class="config">» ava.game.naver.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed1}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» graph.instagram.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed2}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» quiz.int.vidio.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed3}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» live.iflix.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed4}")'><i class="fa fa-clipboard"></i>Copy</button></p>    
            <p class="config">» support.zoom.us
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed5}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» blog.webex.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed6}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» investors.spotify.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed7}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» cache.netflix.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed8}")'><i class="fa fa-clipboard"></i>Copy</button></p>  
            <p class="config">» zaintest.vuclip.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed9}")'><i class="fa fa-clipboard"></i>Copy</button></p> 
            <p class="config">» io.ruangguru.com
                <button class="button2" onclick='copyToClipboard("${trojanTlsFixed10}")'><i class="fa fa-clipboard"></i>Copy</button></p> 
               
          
            <hr />
            <div class="config-block">
                <h3>TROJAN CLASH TLS:</h3>
                <p class="config">${clashConfTls11}</p>
                <button class="button2" onclick='copyClash("clashTls11%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button>
          </div>
          <p class="config">» ava.game.naver.com
                <button class="button2" onclick='copyClash("clashTls12%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» graph.instagram.com
                <button class="button2" onclick='copyClash("clashTls13%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» quiz.int.vidio.com
                <button class="button2" onclick='copyClash("clashTls14%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» live.iflix.com
                <button class="button2" onclick='copyClash("clashTls15%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» support.zoom.us
                <button class="button2" onclick='copyClash("clashTls16%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» blog.webex.com
                <button class="button2" onclick='copyClash("clashTls17%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» investors.spotify.com
                <button class="button2" onclick='copyClash("clashTls18%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» cache.netflix.com 
                <button class="button2" onclick='copyClash("clashTls19%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» zaintest.vuclip.com
                <button class="button2" onclick='copyClash("clashTls20%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» io.ruangguru.com 
                <button class="button2" onclick='copyClash("clashTls21%2Ftr%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          
                
        </div>
    </div>
</div>
<hr class="config-divider" />
`;
      vlessConfigs += `<div class="config-section">
    <p><strong>ISP  :  ${data.isp} (${data.countryCode}) </strong> </p>
    <hr />
    <div class="config-toggle">
        <button class="button2" onclick="toggleConfig(this, 'Show vless', 'Hide vless')">Show Vless</button>
        <div class="config-content">
            <div class="config-block">
                <h3>VLESS TLS:</h3>
                <p class="config">${vlessTlsFixed}</p>
                <button class="button2" onclick='copyToClipboard("${vlessTlsFixed}")'><i class="fa fa-clipboard"></i>Copy</button>
               </div> 
            <p class="config">» ava.game.naver.com
                <button class="button2" onclick='copyToClipboard("${vlessTls1Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» graph.instagram.com
                <button class="button2" onclick='copyToClipboard("${vlessTls2Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» quiz.int.vidio.com
                <button class="button2" onclick='copyToClipboard("${vlessTls3Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>
            <p class="config">» live.iflix.com
                <button class="button2" onclick='copyToClipboard("${vlessTls4Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>    
            <p class="config">» support.zoom.us
                <button class="button2" onclick='copyToClipboard("${vlessTls5Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» blog.webex.com
                <button class="button2" onclick='copyToClipboard("${vlessTls6Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» investors.spotify.com
                <button class="button2" onclick='copyToClipboard("${vlessTls7Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>   
            <p class="config">» cache.netflix.com
                <button class="button2" onclick='copyToClipboard("${vlessTls8Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p>  
            <p class="config">» zaintest.vuclip.com
                <button class="button2" onclick='copyToClipboard("${vlessTls9Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p> 
            <p class="config">» io.ruangguru.com
                <button class="button2" onclick='copyToClipboard("${vlessTls10Fixed}")'><i class="fa fa-clipboard"></i>Copy</button></p> 
               <div class="config-block">
                <h3>VLESS CLASH TLS:</h3>
            <p class="config">${clashConfTls}</p>
                <button class="button2" onclick='copyClash("clashTls%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button>
          </div>
          <p class="config">» ava.game.naver.com
                <button class="button2" onclick='copyClash("clashTls1%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» graph.instagram.com
                <button class="button2" onclick='copyClash("clashTls2%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» quiz.int.vidio.com
                <button class="button2" onclick='copyClash("clashTls3%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» live.iflix.com
                <button class="button2" onclick='copyClash("clashTls4%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» support.zoom.us
                <button class="button2" onclick='copyClash("clashTls5%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» blog.webex.com
                <button class="button2" onclick='copyClash("clashTls6%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» investors.spotify.com
                <button class="button2" onclick='copyClash("clashTls7%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» cache.netflix.com 
                <button class="button2" onclick='copyClash("clashTls8%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» zaintest.vuclip.com
                <button class="button2" onclick='copyClash("clashTls9%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          <p class="config">» io.ruangguru.com 
                <button class="button2" onclick='copyClash("clashTls10%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button></p>
          
              
            <hr />
            <div class="config-block">
                <h3>VLESS NTLS:</h3>
                <p class="config">${vlessNtlsFixed}</p>
                <button class="button2" onclick='copyToClipboard("${vlessNtlsFixed}")'><i class="fa fa-clipboard"></i>Copy</button>
            </div>
            <div class="config-block">
                <h3>VLESS CLASH NTLS:</h3>
                <p class="config">${clashConfNtls}</p>
                <button class="button2" onclick='copyClash("clashNtls%2Fvl%3D${path}")'><i class="fa fa-clipboard"></i>Copy</button>
            </div>
            <hr />
        </div>
    </div>
</div>
<hr class="config-divider" />
`;
    }
    const htmlConfigs = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Vless | XVPN | CLoudFlare</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="icon" href="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/icon.png" type="image/png">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            color: #f5f5f5;
            background-color: black;
            display: flex;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
            overflow: hidden;
        }
        .containerlogo {
                background-color: #1d1d1d;
                /* Warna gelap dengan nuansa lebih dalam */
                border-radius: 10px;
                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
                padding: 30px;
                width: 100%;
                max-width: 600px;
                border: 1px solid #1d1d1d;
                position: relative;
                /* Untuk positioning watermark */
            }
        .container {
            max-width: 1200px;
            width: 100%;
            margin: 3px;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            animation: fadeIn 1s ease-in-out;
            overflow-y: auto;
            max-height: 100vh;
        }

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 15, 15, 0.4);
            z-index: -1;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            margin-top: 7px;
        }

        .header h1 {
            font-size: 42px;
            color: #448998;
            margin: 0;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 4px;
        }
        .button2 {
                background-color: #ffa500;
                border: none;
                color: #1e1e1e;
                padding: 6px 12px;
                text-align: center;
                text-decoration: none;
                font-size: 20px;
                border: 1px solid #3c3c3c;
                border-radius: 5px;
                animation: slideIn 0.5s ease-in-out;
                box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
                transition: background-color 0.3s ease, transform 0.2s ease;
            }

            .button2:hover {
                background-color: #ff8c00;
                transform: scale(1.05);
            }
        .button877 {
                background-color: #000000;
                border: none;
                color: #000000;
                padding: 6px 12px;
                text-align: center;
                text-decoration: none;
                font-size: 20px;
                border: 1px solid #000000;
                border-radius: 5px;
                animation: slideIn 0.5s ease-in-out;
                box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5);
                transition: background-color 0.3s ease, transform 0.2s ease;
            }

            .button877:hover {
                background-color: #ff8c00;
                transform: scale(1.05);
            }
           .card {
            position: relative;
            width: 100%;
            max-width: 600px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.6);
            border-radius: 12px;
            padding: 15px;
            box-sizing: border-box;
            margin: 15px;
        }
        .card:hover {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.8);
            transform: translateY(-5px);
        }
        .card__top {
            height: auto;
            overflow: hidden;
            border-radius: 8px;
            margin-bottom: 15px;
            position: relative;
        }
        .card__top img {
            width: 100%;
            height: auto;
            object-fit: cover;
            display: block;
        }
        .nav-buttons {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            margin-bottom: 20px;
            gap: 10px;
        }

        .nav-buttons .button {
            background-color: transparent;
            border: 3px solid #448998;
            color: #448998;
            padding: 6px 12px;
            font-size: 20px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        .nav-buttons .button:hover {
            background-color: #448998;
            color: #fff;
            transform: scale(1.05);
        }

        .content {
            display: none;
            opacity: 0;
            transition: opacity 0.5s ease-in-out;
        }

        .content.active {
            display: block;
            opacity: 1;
        }
            .noted877 {
                margin-top: 20px;
                color: #000000;
                font-weight: bold;
                font-style: italic;
            }
            .noted {
                margin-top: 20px;
                color: #ff4500;
                font-weight: bold;
                font-style: italic;
            }

            .noted1 {
                margin-top: 20px;
                color: #ffa500;
                font-weight: bold;
                font-style: italic;
                line-height: 1.5;
            }
        .config-section {
            background: rgba(0, 0, 0, 0.5);
            background-color: #3c3c3c;
            padding: 20px;
            color: #ffffff;
            margin-right: 5px;
            margin-left: 5px;
            border: 2px solid #448998;
            border-radius: 10px;
            position: relative;
            animation: slideIn 0.5s ease-in-out;
            box-shadow: inset 0 10px 20px rgba(0, 0, 0, 0.5);
        }
        .config-sectionlogo {
            background: rgba(0, 0, 0, 0.5);
            background-color: #000000;
            padding: 20px;
            color: #448998;
            margin-right: 5px;
            margin-left: 5px;
            border: 2px solid #000000;
            border-radius: 10px;
            position: relative;
            animation: slideIn 0.5s ease-in-out;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5);
        }
        @keyframes slideIn {
            from { transform: translateX(-30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        .config-section h3 {
            margin-top: 0;
            color: #e1b12c;
            font-size: 28px;
        }

        .config-section p {
            color: #f5f5f5;
            font-size: 16px;
        }

        .config-toggle {
            margin-bottom: 10px;
        }

        .config-content {
            display: none;
        }

        .config-content.active {
            display: block;
        }

        .config-block {
            margin-bottom: 10px;
            padding: 15px;
            border-radius: 10px;
            background-color: rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease;
        }

        .config-block h4 {
            margin-bottom: 8px;
            color: #f39c12;
            font-size: 22px;
            font-weight: 600;
        }

        .config {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 15px;
            border-radius: 5px;
            border: 2px solid #448998;
            color: #f5f5f5;
            word-wrap: break-word;
            white-space: pre-wrap;
            font-family: 'Courier New', Courier, monospace;
            font-size: 15px;
        }
        .button {
            background-color: transparent;
            border: 2px solid #448998;
            color: #448998;
            padding: 4px 8px;
            font-size: 12px;
            border-radius: 3px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            margin-right: 4px;
        }

        .button i {
            margin-right: 3px;
        }

        .button:hover {
            background-color: #448998;
            color: #fff;
            transform: scale(1.0);
        }

        .config-divider {
            border: none;
            height: 1px;
            background: linear-gradient(to right, transparent, #fff, transparent);
            margin: 20px 0;
        }
         .watermarkfooter {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.8rem;
                color: rgba(255, 255, 255, 0.5);
                /* Warna watermark dengan transparansi */
                text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
                /* Bayangan teks untuk keterbacaan */
                font-weight: bold;
                text-align: center;
                /* Pusatkan teks watermark */
            }
        .watermark {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
            font-weight: bold;
            text-align: center;
        }
        .watermark a {
            color: #ffa500;
            text-decoration: none;
            font-weight: bold;
        }
        .watermark a:hover {
            color: #ffa500;
        }

        @media (max-width: 768px) {
            .header h1 {
                font-size: 32px;
            }

            .config-section h3 {
                font-size: 24px;
            }

            .config-block h4 {
                font-size: 20px;
            }

            .domain-list {
                font-size: 10px;
            }
        }
         footer {
            background: rgba(0, 0, 0, 0.9);
            color: #e0e0e0;
            text-align: center;
            padding: 6px;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
            width: 100%;
            position: relative;
            bottom: 0;
            margin: 0;
        }
        footer a {
            color: #f7951e;
            text-decoration: none;
            font-weight: 700;
        }
        footer a:hover {
            text-decoration: underline;
        }
        @media (max-width: 768px) {
            .card {
                width: 100%;
                margin-top: 20px;
                max-height: none;
            }
            .button {
                padding: 10px 40px; /* Adjust padding for smaller screens */
            }
        }
    </style>
</head>
<body><header><p class="noted877"><a href="http://wa.me/6287861167414"><img src="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/social.png" alt="XVPN" style="width:42px;height:42px;"></a>
 &nbsp; &nbsp;<a href="http://t.me/seaker877 "><img src="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/telegram.png" alt="XVPN" style="width:42px;height:42px;"></a>
 &nbsp; &nbsp;<a href="https://chat.whatsapp.com/L9bbkRbzyozEFJHgGc9pPh"><img src="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/pngwing.com.png" alt="XVPN" style="width:42px;height:42px;"></a>
</p></header>
        
    <div class="overlay"></div>
    <div class="container"> 
        <div class="card__top">
          <img src="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/icon.png" alt="XVPN" loading="lazy">
                        
        </div>
        
        
        <div class="nav-buttons">
            <button class="button2" onclick="showContent('vless')">LIST VLESS</button>
            <button class="button2" onclick="showContent('clash')">LIST TROJAN</button>        </div>
            

        <div class="config-section">
        <strong><b>DAFTAR WILCARD:</strong> <button class="button2"><div ID="Showild" VALUE="Click to Showild" ONCLICK=" document.getElementById('Showild').style.display='none'; document.getElementById('Hidewild').style.display='block'; document.getElementById('SectionNamewild').style.display='block'" >SHOW WILDCARD</DIV><div ID="Hidewild" VALUE="Click to Hidewild" ONCLICK=" document.getElementById('Showild').style.display='block'; document.getElementById('Hidewild').style.display='none'; document.getElementById('SectionNamewild').style.display='none'" hidden>HIDE WILDCARD</DIV></button><div ID="SectionNamewild" STYLE="display:none" name="m" rows="5" cols="50" on_click="this.value='Hello\nHow R U?'">
<br>» ava.game.naver.com.xvp.bmkg.xyz
<br>» graph.instagram.com.xvp.bmkg.xyz
<br>» quiz.int.vidio.com.xvp.bmkg.xyz
<br>» live.iflix.com.xvp.bmkg.xyz
<br>» support.zoom.us.xvp.bmkg.xyz
<br>» blog.webex.com.xvp.bmkg.xyz
<br>» investors.spotify.com.xvp.bmkg.xyz
<br>» cache.netflix.com.xvp.bmkg.xyz
<br>» zaintest.vuclip.com.xvp.bmkg.xyz
<br>» io.ruangguru.com.xvp.bmkg.xyz</b></DIV></DIV>
        <hr class="config-divider" />
        <div id="vless" class="content active">
            ${vlessConfigs}
        </div>
        <div id="clash" class="content">
            ${clashConfigs}
            </div><center>
            <p class="noted"> Noted: Pastikan untuk memeriksa konfigurasi dengan teliti sebelum digunakan.</p>
           <p>
             ©Develoved by 
              <a href="https://wa.me/6281335135082"><button class="button877"><img src="https://raw.githubusercontent.com/win877969/NS1/refs/heads/main/img/icon1.png" alt="HTML tutorial" style="width:100px;height:25px;"></button> </a> 
              </p>
            </center><p class="noted877">.<br>.</p>
        
    </div>
     <script>
        function showContent(contentId) {
            const contents = document.querySelectorAll('.content');
            contents.forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(contentId).classList.add('active');
        }
        function salinTeks() {
            var teks = document.getElementById('teksAsli');
            teks.select();
            document.execCommand('copy');
            alert('Teks telah disalin.');
        }
        function copyClash(elementId) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text)
            .then(() => {
            const alertBox = document.createElement('div');
            alertBox.textContent = "Copied to clipboard!";
            alertBox.style.position = 'fixed';
            alertBox.style.bottom = '20px';
            alertBox.style.right = '20px';
            alertBox.style.backgroundColor = 'yellow';
            alertBox.style.color = '#000';
            alertBox.style.padding = '10px 20px';
            alertBox.style.borderRadius = '5px';
            alertBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            alertBox.style.opacity = '0';
            alertBox.style.transition = 'opacity 0.5s ease-in-out';
            document.body.appendChild(alertBox);
            setTimeout(() => {
                alertBox.style.opacity = '1';
            }, 100);
            setTimeout(() => {
                alertBox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(alertBox);
                }, 500);
            }, 2000);
        })
        .catch((err) => {
            console.error("Failed to copy to clipboard:", err);
        });
        }
function fetchAndDisplayAlert(path) {
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(\`HTTP error! Status: \${response.status}\`);
            }
            return response.json();
        })
        .then(data => {
            const proxyStatus = data.proxyStatus || "Unknown status";
            const alertBox = document.createElement('div');
            alertBox.textContent = \`Proxy Status: \${proxyStatus}\`;
            alertBox.style.position = 'fixed';
            alertBox.style.bottom = '20px';
            alertBox.style.right = '20px';
            alertBox.style.backgroundColor = 'yellow';
            alertBox.style.color = '#000';
            alertBox.style.padding = '10px 20px';
            alertBox.style.borderRadius = '5px';
            alertBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            alertBox.style.opacity = '0';
            alertBox.style.transition = 'opacity 0.5s ease-in-out';
            document.body.appendChild(alertBox);
            
            setTimeout(() => {
                alertBox.style.opacity = '1';
            }, 100);
            
            setTimeout(() => {
                alertBox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(alertBox);
                }, 500);
            }, 2000);
        })
        .catch((err) => {
            alert("Failed to fetch data or invalid response.");
        });
}
        function copyToClipboard(text) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    const alertBox = document.createElement('div');
                    alertBox.textContent = "Copied to clipboard!";
                    alertBox.style.position = 'fixed';
                    alertBox.style.bottom = '20px';
                    alertBox.style.right = '20px';
                    alertBox.style.backgroundColor = 'yellow';
                    alertBox.style.color = '#000';
                    alertBox.style.padding = '10px 20px';
                    alertBox.style.borderRadius = '5px';
                    alertBox.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    alertBox.style.opacity = '0';
                    alertBox.style.transition = 'opacity 0.5s ease-in-out';
                    document.body.appendChild(alertBox);
                    setTimeout(() => {
                        alertBox.style.opacity = '1';
                    }, 100);
                    setTimeout(() => {
                        alertBox.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(alertBox);
                        }, 500);
                    }, 2000);
                })
                .catch((err) => {
                    console.error("Failed to copy to clipboard:", err);
                });
        }

        function toggleConfig(button, show, hide) {
            const configContent = button.nextElementSibling;
            if (configContent.classList.contains('active')) {
                configContent.classList.remove('active');
                button.textContent = show;
            } else {
                configContent.classList.add('active');
                button.textContent = hide;
            }
        }
    <\/script>
</body>
</html>`;
    return htmlConfigs;
  } catch (error) {
    return `An error occurred while generating the VLESS configurations. ${error}`;
  }
}
function generateUUIDv4() {
  const randomValues = crypto.getRandomValues(new Uint8Array(16));
  randomValues[6] = randomValues[6] & 15 | 64;
  randomValues[8] = randomValues[8] & 63 | 128;
  return [
    randomValues[0].toString(16).padStart(2, "0"),
    randomValues[1].toString(16).padStart(2, "0"),
    randomValues[2].toString(16).padStart(2, "0"),
    randomValues[3].toString(16).padStart(2, "0"),
    randomValues[4].toString(16).padStart(2, "0"),
    randomValues[5].toString(16).padStart(2, "0"),
    randomValues[6].toString(16).padStart(2, "0"),
    randomValues[7].toString(16).padStart(2, "0"),
    randomValues[8].toString(16).padStart(2, "0"),
    randomValues[9].toString(16).padStart(2, "0"),
    randomValues[10].toString(16).padStart(2, "0"),
    randomValues[11].toString(16).padStart(2, "0"),
    randomValues[12].toString(16).padStart(2, "0"),
    randomValues[13].toString(16).padStart(2, "0"),
    randomValues[14].toString(16).padStart(2, "0"),
    randomValues[15].toString(16).padStart(2, "0")
  ].join("").replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
}
async function vlessOverWSHandler(request) {
  const webSocketPair = new WebSocketPair();
  const [client, webSocket] = Object.values(webSocketPair);
  webSocket.accept();
  let address = "";
  let portWithRandomLog = "";
  const log = (info, event) => {
    console.log(`[${address}:${portWithRandomLog}] ${info}`, event || "");
  };
  const earlyDataHeader = request.headers.get("sec-websocket-protocol") || "";
  const readableWebSocketStream = makeReadableWebSocketStream(webSocket, earlyDataHeader, log);
  let remoteSocketWapper = {
    value: null
  };
  let udpStreamWrite = null;
  let isDns = false;
  readableWebSocketStream.pipeTo(new WritableStream({
    async write(chunk, controller) {
      if (isDns && udpStreamWrite) {
        return udpStreamWrite(chunk);
      }
      if (remoteSocketWapper.value) {
        const writer = remoteSocketWapper.value.writable.getWriter();
        await writer.write(chunk);
        writer.releaseLock();
        return;
      }
      const {
        hasError,
        message,
        portRemote = 443,
        addressRemote = "",
        rawDataIndex,
        vlessVersion = new Uint8Array([0, 0]),
        isUDP
      } = processVlessHeader(chunk);
      address = addressRemote;
      portWithRandomLog = `${portRemote}--${Math.random()} ${isUDP ? "udp " : "tcp "} `;
      if (hasError) {
        throw new Error(message);
        return;
      }
      if (isUDP) {
        if (portRemote === 53) {
          isDns = true;
        } else {
          throw new Error("UDP proxy only enable for DNS which is port 53");
          return;
        }
      }
      const vlessResponseHeader = new Uint8Array([vlessVersion[0], 0]);
      const rawClientData = chunk.slice(rawDataIndex);
      if (isDns) {
        const { write } = await handleUDPOutBound(webSocket, vlessResponseHeader, log);
        udpStreamWrite = write;
        udpStreamWrite(rawClientData);
        return;
      }
      handleTCPOutBound(remoteSocketWapper, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log);
    },
    close() {
      log(`readableWebSocketStream is close`);
    },
    abort(reason) {
      log(`readableWebSocketStream is abort`, JSON.stringify(reason));
    }
  })).catch((err) => {
    log("readableWebSocketStream pipeTo error", err);
  });
  return new Response(null, {
    status: 101,
    webSocket: client
  });
}
async function handleTCPOutBound(remoteSocket, addressRemote, portRemote, rawClientData, webSocket, vlessResponseHeader, log) {
  async function connectAndWrite(address, port) {
    const tcpSocket2 = connect({
      hostname: address,
      port
    });
    remoteSocket.value = tcpSocket2;
    log(`connected to ${address}:${port}`);
    const writer = tcpSocket2.writable.getWriter();
    await writer.write(rawClientData);
    writer.releaseLock();
    return tcpSocket2;
  }
  async function retry() {
    const tcpSocket2 = await connectAndWrite(proxyIP || addressRemote, proxyPort || portRemote);
    tcpSocket2.closed.catch((error) => {
      console.log("retry tcpSocket closed error", error);
    }).finally(() => {
      safeCloseWebSocket(webSocket);
    });
    remoteSocketToWS(tcpSocket2, webSocket, vlessResponseHeader, null, log);
  }
  const tcpSocket = await connectAndWrite(addressRemote, portRemote);
  remoteSocketToWS(tcpSocket, webSocket, vlessResponseHeader, retry, log);
}
function makeReadableWebSocketStream(webSocketServer, earlyDataHeader, log) {
  let readableStreamCancel = false;
  const stream = new ReadableStream({
    start(controller) {
      webSocketServer.addEventListener("message", (event) => {
        if (readableStreamCancel) {
          return;
        }
        const message = event.data;
        controller.enqueue(message);
      });
      webSocketServer.addEventListener(
        "close",
        () => {
          safeCloseWebSocket(webSocketServer);
          if (readableStreamCancel) {
            return;
          }
          controller.close();
        }
      );
      webSocketServer.addEventListener(
        "error",
        (err) => {
          log("webSocketServer has error");
          controller.error(err);
        }
      );
      const { earlyData, error } = base64ToArrayBuffer(earlyDataHeader);
      if (error) {
        controller.error(error);
      } else if (earlyData) {
        controller.enqueue(earlyData);
      }
    },
    pull(controller) {
    },
    cancel(reason) {
      if (readableStreamCancel) {
        return;
      }
      log(`ReadableStream was canceled, due to ${reason}`);
      readableStreamCancel = true;
      safeCloseWebSocket(webSocketServer);
    }
  });
  return stream;
}
function processVlessHeader(vlessBuffer) {
  if (vlessBuffer.byteLength < 24) {
    return {
      hasError: true,
      message: "invalid data"
    };
  }
  const version = new Uint8Array(vlessBuffer.slice(0, 1));
  let isValidUser = true;
  let isUDP = false;
  if (!isValidUser) {
    return {
      hasError: true,
      message: "invalid user"
    };
  }
  const optLength = new Uint8Array(vlessBuffer.slice(17, 18))[0];
  const command = new Uint8Array(
    vlessBuffer.slice(18 + optLength, 18 + optLength + 1)
  )[0];
  if (command === 1) {
  } else if (command === 2) {
    isUDP = true;
  } else {
    return {
      hasError: true,
      message: `command ${command} is not support, command 01-tcp,02-udp,03-mux`
    };
  }
  const portIndex = 18 + optLength + 1;
  const portBuffer = vlessBuffer.slice(portIndex, portIndex + 2);
  const portRemote = new DataView(portBuffer).getUint16(0);
  let addressIndex = portIndex + 2;
  const addressBuffer = new Uint8Array(
    vlessBuffer.slice(addressIndex, addressIndex + 1)
  );
  const addressType = addressBuffer[0];
  let addressLength = 0;
  let addressValueIndex = addressIndex + 1;
  let addressValue = "";
  switch (addressType) {
    case 1:
      addressLength = 4;
      addressValue = new Uint8Array(
        vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
      ).join(".");
      break;
    case 2:
      addressLength = new Uint8Array(
        vlessBuffer.slice(addressValueIndex, addressValueIndex + 1)
      )[0];
      addressValueIndex += 1;
      addressValue = new TextDecoder().decode(
        vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
      );
      break;
    case 3:
      addressLength = 16;
      const dataView = new DataView(
        vlessBuffer.slice(addressValueIndex, addressValueIndex + addressLength)
      );
      const ipv6 = [];
      for (let i = 0; i < 8; i++) {
        ipv6.push(dataView.getUint16(i * 2).toString(16));
      }
      addressValue = ipv6.join(":");
      break;
    default:
      return {
        hasError: true,
        message: `invild  addressType is ${addressType}`
      };
  }
  if (!addressValue) {
    return {
      hasError: true,
      message: `addressValue is empty, addressType is ${addressType}`
    };
  }
  return {
    hasError: false,
    addressRemote: addressValue,
    addressType,
    portRemote,
    rawDataIndex: addressValueIndex + addressLength,
    vlessVersion: version,
    isUDP
  };
}
async function remoteSocketToWS(remoteSocket, webSocket, vlessResponseHeader, retry, log) {
  let remoteChunkCount = 0;
  let chunks = [];
  let vlessHeader = vlessResponseHeader;
  let hasIncomingData = false;
  await remoteSocket.readable.pipeTo(
    new WritableStream({
      start() {
      },
      async write(chunk, controller) {
        hasIncomingData = true;
        if (webSocket.readyState !== WS_READY_STATE_OPEN) {
          controller.error(
            "webSocket.readyState is not open, maybe close"
          );
        }
        if (vlessHeader) {
          webSocket.send(await new Blob([vlessHeader, chunk]).arrayBuffer());
          vlessHeader = null;
        } else {
          webSocket.send(chunk);
        }
      },
      close() {
        log(`remoteConnection!.readable is close with hasIncomingData is ${hasIncomingData}`);
      },
      abort(reason) {
        console.error(`remoteConnection!.readable abort`, reason);
      }
    })
  ).catch((error) => {
    console.error(
      `remoteSocketToWS has exception `,
      error.stack || error
    );
    safeCloseWebSocket(webSocket);
  });
  if (hasIncomingData === false && retry) {
    log(`retry`);
    retry();
  }
}
function base64ToArrayBuffer(base64Str) {
  if (!base64Str) {
    return { error: null };
  }
  try {
    base64Str = base64Str.replace(/-/g, "+").replace(/_/g, "/");
    const decode = atob(base64Str);
    const arryBuffer = Uint8Array.from(decode, (c) => c.charCodeAt(0));
    return { earlyData: arryBuffer.buffer, error: null };
  } catch (error) {
    return { error };
  }
}
var WS_READY_STATE_OPEN = 1;
var WS_READY_STATE_CLOSING = 2;
function safeCloseWebSocket(socket) {
  try {
    if (socket.readyState === WS_READY_STATE_OPEN || socket.readyState === WS_READY_STATE_CLOSING) {
      socket.close();
    }
  } catch (error) {
    console.error("safeCloseWebSocket error", error);
  }
}
async function handleUDPOutBound(webSocket, vlessResponseHeader, log) {
  let isVlessHeaderSent = false;
  const transformStream = new TransformStream({
    start(controller) {
    },
    transform(chunk, controller) {
      for (let index = 0; index < chunk.byteLength; ) {
        const lengthBuffer = chunk.slice(index, index + 2);
        const udpPakcetLength = new DataView(lengthBuffer).getUint16(0);
        const udpData = new Uint8Array(
          chunk.slice(index + 2, index + 2 + udpPakcetLength)
        );
        index = index + 2 + udpPakcetLength;
        controller.enqueue(udpData);
      }
    },
    flush(controller) {
    }
  });
  transformStream.readable.pipeTo(new WritableStream({
    async write(chunk) {
      const resp = await fetch(
        "https://1.1.1.1/dns-query",
        {
          method: "POST",
          headers: {
            "content-type": "application/dns-message"
          },
          body: chunk
        }
      );
      const dnsQueryResult = await resp.arrayBuffer();
      const udpSize = dnsQueryResult.byteLength;
      const udpSizeBuffer = new Uint8Array([udpSize >> 8 & 255, udpSize & 255]);
      if (webSocket.readyState === WS_READY_STATE_OPEN) {
        log(`doh success and dns message length is ${udpSize}`);
        if (isVlessHeaderSent) {
          webSocket.send(await new Blob([udpSizeBuffer, dnsQueryResult]).arrayBuffer());
        } else {
          webSocket.send(await new Blob([vlessResponseHeader, udpSizeBuffer, dnsQueryResult]).arrayBuffer());
          isVlessHeaderSent = true;
        }
      }
    }
  })).catch((error) => {
    log("dns udp has error" + error);
  });
  const writer = transformStream.writable.getWriter();
  return {
    write(chunk) {
      writer.write(chunk);
    }
  };
}
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
