const apiKey = 'AIzaSyC3ingM3PrBedZbXQ979d4O_YhnyVmK3y4'; // 너의 API 키
const channelId = 'UCj0ovgYHqx2UaWBpWVarpXQ'; // 너의 채널 ID
const maxResults = 3;

const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video&maxResults=${maxResults}`;

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const videosContainer = document.getElementById('youtube-videos');
    data.items.forEach(video => {
      const videoId = video.id.videoId;
      const title = video.snippet.title;
      const description = video.snippet.description;
      const thumbnail = video.snippet.thumbnails.medium.url;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      const videoHTML = `
        <div class="video-card">
          <a href="${videoUrl}" target="_blank">
            <div class="video-thumbnail">
              <img src="${thumbnail}" alt="${title}" />
            </div>
          </a>
          <div class="video-info">
            <h3>${title}</h3>
            <p>${description}</p>
          </div>
        </div>
      `;
      videosContainer.innerHTML += videoHTML;
    });
  })
  .catch(error => {
    console.error('유튜브 영상 로딩 실패:', error);
  });
