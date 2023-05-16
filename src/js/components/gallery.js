import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';
import thumbnail from 'lightgallery/plugins/thumbnail';

export const galleryPrimary = () => {
    const items = document.querySelectorAll('#object-gallery');
    if (items.length === 0) return;
    items.forEach(gallery => {
        const galleryContainer = lightGallery(gallery, {
            plugins: [lgVideo, thumbnail],
            licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
            selector: '.object-gallery__item',
            addClass: 'gallery-primary-container gallery-primary-container--object',
            speed: 400,
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
            enableThumbSwipe: true,
            closeOnTap: false,
            appendCounterTo: '.lg-content',
        });
        const closeBtnHTML = `
        <button class="btn btn-reset gallery-primary-container__close">
            <svg>
                <use xlink:href="img/sprite.svg#x"></use>
            </svg>
            <span>Закрыть</span>
        </button>
        `;
        const nextBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--next gallery-primary-container__next">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const prevBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--prev gallery-primary-container__prev">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const container = document.querySelector('.gallery-primary-container--object');

        container.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', closeBtnHTML);
        container.querySelector('.lg-content').insertAdjacentHTML('beforeend', `${prevBtnHTML} ${nextBtnHTML}`);

        container.querySelector('.lg-backdrop').addEventListener('click', () => galleryContainer.closeGallery());
        container.querySelector('.gallery-primary-container__close').addEventListener('click', () => galleryContainer.closeGallery());
        container.querySelector('.gallery-primary-container__prev').addEventListener('click', () => galleryContainer.goToPrevSlide());
        container.querySelector('.gallery-primary-container__next').addEventListener('click', () => galleryContainer.goToNextSlide());
    });
}
