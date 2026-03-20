document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const progress = document.getElementById('progress');
    const timer = document.querySelector('.timer'); 

    if (!playBtn || !audio) {
        console.error("Элементы плеера не найдены!");
        return;
    }

  
    playBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                playBtn.textContent = '⏸'; 
            }).catch(err => {
                console.error("Ошибка воспроизведения. Нужно кликнуть на страницу:", err);
            });
        } else {
            audio.pause();
            playBtn.textContent = '▶';
        }
    });

   
    audio.addEventListener('timeupdate', function() {
        if (audio.duration) {
            const pos = (audio.currentTime / audio.duration) * 100;
            if (progress) progress.style.width = pos + '%';
            
            let mins = Math.floor(audio.currentTime / 60);
            let secs = Math.floor(audio.currentTime % 60);
            if (secs < 10) secs = '0' + secs;
            if (timer) timer.textContent = mins + ':' + secs;
        }
    });

    
    audio.addEventListener('ended', function() {
        playBtn.textContent = '▶';
        if (progress) progress.style.width = '0%';
    });
});