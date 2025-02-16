document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const playPauseBtn = document.querySelector('.play-pause');
  const skipPreviousBtn = document.querySelector('.skip-previous');
  const skipNextBtn = document.querySelector('.skip-next');
  const volumeSlider = document.querySelector('.volume-slider');
  const volumeIcon = document.querySelector('.volume-control i');

  let isPlaying = false;

  // Play/Pause
  playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
      audio.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
  });

  // Volume Control
  volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    updateVolumeIcon(value);
  });

  function updateVolumeIcon(value) {
    if (value == 0) {
      volumeIcon.className = 'fas fa-volume-mute';
    } else if (value < 50) {
      volumeIcon.className = 'fas fa-volume-down';
    } else {
      volumeIcon.className = 'fas fa-volume-up';
    }
  }
}); 