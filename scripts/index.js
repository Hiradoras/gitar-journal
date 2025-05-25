// ŞARKILAR
fetch('jsons/sarkilar.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('latest-songs');
    const latest = data.slice(-3).reverse(); // Son 3 şarkı
    latest.forEach(song => {
      const audioSrc = song.weeks[0]?.audio || "";
      const el = document.createElement('div');
      el.innerHTML = `
        <h3 class="song-title">${song.title}</h3>
        <h5 class="song-subtitle">${song.artist}</h5>
        ${audioSrc ? `<audio controls src="${audioSrc}"></audio>` : "<p>Ses bulunamadı.</p>"}
        <p><a href="${song.tabUrl}" target="_blank">Tab'ı Görüntüle</a></p>
      `;
      container.appendChild(el);
    });
  });

// RIFFLER
fetch('jsons/riffs.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('latest-riffs');
    const latest = data.slice(-3).reverse(); // Son 3 riff
    latest.forEach(riff => {
      const audioSrc = riff.weeks[0]?.audio || "";
      const el = document.createElement('div');
      el.innerHTML = `
        <h3 class="song-title">${riff.title}</h3>
        <h5 class="song-subtitle">${riff.artist}</h5>
        ${audioSrc ? `<audio controls src="${audioSrc}"></audio>` : "<p>Ses bulunamadı.</p>"}
        <p><a href="${riff.tabUrl}" target="_blank">Tab'ı Görüntüle</a></p>
      `;
      container.appendChild(el);
    });
  });

  //ayni anda calmama kontrolu
  let currentlyPlayingAudioElement = null;

// 'play' olayı document seviyesinde yakalanacak (capturing phase).
// Bu, sayfadaki herhangi bir audio elementi çalmaya başladığında tetiklenir.
document.addEventListener('play', function(event) {
    // Olayın kaynağı (event.target) bir <audio> elementi mi diye kontrol et.
    if (event.target.tagName === 'AUDIO') {
        const newAudio = event.target; // Çalmaya başlayan yeni audio elementi.

        // Eğer daha önce başka bir audio çalıyorsa VE bu yeni başlayan audio değilse,
        // o zaman önceki audio'yu durdur.
        if (currentlyPlayingAudioElement && currentlyPlayingAudioElement !== newAudio) {
            currentlyPlayingAudioElement.pause();
            // İsteğe bağlı: Önceki şarkıyı başa sarmak için.
            currentlyPlayingAudioElement.currentTime = 0; 
        }
        
        // Yeni çalmaya başlayan audio elementini "şu anda çalan" olarak ayarla.
        currentlyPlayingAudioElement = newAudio;
    }
}, true); // 'true' parametresi olayın capturing phase'de yakalanmasını sağlar.
