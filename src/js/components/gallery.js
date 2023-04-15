import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';
import thumbnail from 'lightgallery/plugins/thumbnail';

const galleries = document.querySelectorAll('#object-gallery');
galleries.forEach(gallery => {
    const galleryContainer = lightGallery(gallery, {
        plugins: [lgVideo, thumbnail],
        licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
        selector: '.object-gallery__item',
        addClass: 'gallery-primary-container',
        speed: 500,
        thumbnail: true,

        animateThumb: true,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true,

        download: false,
        videoMaxSize: 'none',
        loadYouTubeThumbnail: false,
        thumbMargin: 10,
        thumbWidth: 90,
        thumbHeight: '90px',
        nextHtml: `
            <svg>
                <use xlink:href="img/sprite.svg#arrow-right"></use>
            </svg>
        `,
        prevHtml: `
            <svg>
                <use xlink:href="img/sprite.svg#arrow-right"></use>
            </svg>
        `,
        enableThumbSwipe: true,
        closeOnTap: false,
    });
    const closeBtnHTML = `
    <button class="btn btn-reset gallery-primary-container__close">
        <svg>
            <use xlink:href="img/sprite.svg#x"></use>
        </svg>
        <span>Закрыть</span>
    </button>
    `;
    document.querySelector('.gallery-primary-container .lg-toolbar').insertAdjacentHTML('beforeend', closeBtnHTML);
    document.querySelector('.gallery-primary-container .lg-backdrop').addEventListener('click', () => {
        galleryContainer.closeGallery();
    })
    document.querySelector('.gallery-primary-container .gallery-primary-container__close').addEventListener('click', () => {
        galleryContainer.closeGallery();
    })
});
