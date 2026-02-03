// =======================
// ① 歴史データ
// =======================
const events = [
  {
    year: 1517,
    title: "ルターの宗教改革",
    description: "ルターが95か条の論題を発表し宗教改革が始まる。",
    lat: 51.866,
    lon: 12.646,
    region: "ヨーロッパ"
  },
  {
    year: 1521,
    title: "アステカ帝国滅亡",
    description: "コルテスがアステカ帝国を征服。",
    lat: 19.4326,
    lon: -99.1332,
    region: "アメリカ"
  },
  {
    year: 1789,
    title: "フランス革命",
    description: "市民革命により絶対王政が崩壊。",
    lat: 48.8566,
    lon: 2.3522,
    region: "ヨーロッパ"
  },
  {
    year: 1914,
    title: "第一次世界大戦",
    description: "サラエボ事件をきっかけに世界大戦が始まる。",
    lat: 43.8563,
    lon: 18.4131,
    region: "ヨーロッパ"
  },
  {
    year: 1945,
    title: "第二次世界大戦終結",
    description: "日本・ドイツが降伏し第二次世界大戦が終結。",
    lat: 35.6895,
    lon: 139.6917,
    region: "東アジア"
  },
  {
    year: 1969,
    title: "アポロ11号 月面着陸",
    description: "アメリカ・フロリダ州から打ち上げられ、人類が初めて月面に到達。",
    lat: 28.5729,
    lon: -80.6490,
    region: "アメリカ"
  },
  {
    year: 2020,
    title: "新型コロナウイルスの世界的流行",
    description: "中国・武漢で確認され、世界的パンデミックとなる。",
    lat: 30.5928,
    lon: 114.3055,
    region: "東アジア"
  }
];

// =======================
// ② 地図初期化
// =======================
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let markers = [];

// =======================
// ③ 表示更新処理
// =======================
function updateMap() {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const selectedYear = Number(yearRange.value);
  const selectedRegion = regionSelect.value;

  events
    .filter(e => e.year <= selectedYear)
    .filter(e => selectedRegion === "all" || e.region === selectedRegion)
    .forEach(e => {
      const marker = L.marker([e.lat, e.lon]).addTo(map);
      marker.bindPopup(
        `<b>${e.title}</b><br>
         年：${e.year}<br>
         ${e.description}`
      );
      markers.push(marker);
    });
}

// =======================
// ④ UIイベント
// =======================
const yearRange = document.getElementById("yearRange");
const yearLabel = document.getElementById("yearLabel");
const regionSelect = document.getElementById("regionSelect");

yearRange.addEventListener("input", () => {
  yearLabel.textContent = yearRange.value;
  updateMap();
});

regionSelect.addEventListener("change", updateMap);

// 初期表示
updateMap();
