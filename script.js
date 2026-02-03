// ===== 歴史データ =====
const wars = {
  medieval: [
    {
      name: "十字軍",
      year: "1096–1291年",
      lat: 31.8,
      lon: 35.2,
      cause: "宗教対立",
      detail: "ヨーロッパ諸国が聖地エルサレムを巡って行った遠征。"
    }
  ],

  early: [
    {
      name: "三十年戦争",
      year: "1618–1648年",
      lat: 50.1,
      lon: 14.4,
      cause: "宗教と国家権力の対立",
      detail: "近代国家体制成立のきっかけとなった戦争。"
    }
  ],

  modern: [
    {
      name: "第二次世界大戦",
      year: "1939–1945年",
      lat: 52.5,
      lon: 13.4,
      cause: "領土拡張とイデオロギー対立",
      detail: "史上最大規模の戦争で、戦後の国際秩序を形成した。"
    }
  ]
};

// ===== 地図初期化 =====
const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let markers = [];

// ===== マーカー色 =====
function getIcon(color) {
  return L.icon({
    iconUrl: `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
    iconSize: [32, 32]
  });
}

const eraColor = {
  medieval: "blue",
  early: "green",
  modern: "red"
};

// ===== 時代切り替え =====
function loadEra(era) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  wars[era].forEach(w => {
    const marker = L.marker([w.lat, w.lon], {
      icon: getIcon(eraColor[era])
    }).addTo(map);

    marker.bindPopup(`
      <h3>${w.name}</h3>
      <p><b>年代：</b>${w.year}</p>
      <p><b>原因：</b>${w.cause}</p>
      <p>${w.detail}</p>
    `);

    markers.push(marker);
  });
}

// 初期表示
loadEra('modern');
