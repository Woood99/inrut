function videoBlock() {
    const videos = document.querySelectorAll('.video-block');
    if (!videos) return;
    videos.forEach(video => {
        const btn = video.querySelector('.video-block__button');
        const content = video.querySelector('.video-block__video');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const contentHTML = `
                <iframe src="${btn.dataset.src}?autoplay=1&mute=0" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen></iframe>
                </iframe>
                `
            content.insertAdjacentHTML('beforeend', contentHTML);
        });
    })
}
videoBlock();
