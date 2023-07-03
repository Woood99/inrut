import lightGallery from 'lightgallery';
import lgVideo from 'lightgallery/plugins/video';
import thumbnail from 'lightgallery/plugins/thumbnail';
import disableScroll from '../modules/disableScroll';
import enableScroll from '../modules/enableScroll';
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
        gallery.addEventListener('lgAfterOpen', () => {
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
        });
        gallery.addEventListener('lgAfterClose', () => {
            enableScroll();
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
        });
        const closeBtnHTML = `
        <button class="btn btn-reset gallery-primary-container__close">
            <svg>
                <use xlink:href="img/sprite.svg#x"></use>
            </svg>
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

        if (container.closest('.page__body').querySelector('.main').classList.contains('object')) {
            const title = document.querySelector('[data-main-info-title]');
            const address = document.querySelector('[data-main-info-address]');
            const price = document.querySelector('[data-main-info-price]');
            const btns = document.querySelectorAll('[data-main-info-btn]');
            let btnsHTML = '';
            if (btns.length) {
                btns.forEach(btn => {
                    btn.classList.add('gallery-info__btn');
                    btnsHTML += btn.outerHTML;
                })
            }
            const infoHTML = `
            <div class="gallery-info">
                <h2 class="gallery-info__title title-2">
                    ${title ? title.innerHTML : ''}
                </h2>
                <div class="gallery-info__price">
                    ${price ? price.innerHTML : ''}
                </div>
                <div class="gallery-info__address">
                    ${address ? address.innerHTML : ''}
                </div>
                ${btnsHTML}
            </div>
            `;
            container.querySelector('.lg-outer').insertAdjacentHTML('beforeend', infoHTML);

        }
    });
}

export const galleryStories = () => {
    const items = document.querySelectorAll('.stories');
    if (items.length === 0) return;
    items.forEach(gallery => {
        const galleryContainer = lightGallery(gallery, {
            licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
            selector: '.stories__item',
            addClass: 'gallery-stories-container',
            speed: 400,
            mode: 'lg-fade',
            enableDrag: false,
            zoomFromOrigin: false,
            allowMediaOverlap: true,

            download: false,
            videoMaxSize: 'none',
            closeOnTap: false,
            appendCounterTo: '.lg-content',
        });
        gallery.addEventListener('lgAfterOpen', () => {
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
        });
        gallery.addEventListener('lgAfterClose', () => {
            enableScroll();
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
        });
        const nextBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--next gallery-stories-container__next">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const prevBtnHTML = `
        <button type="button" class="btn btn-reset nav-arrow-primary nav-arrow-primary--prev gallery-stories-container__prev">
            <div class="nav-arrow-primary__wrapper">
                <svg>
                    <use xlink:href="img/sprite.svg#arrow-right"></use>
                </svg>
            </div>
        </button>
        `;
        const container = document.querySelector('.gallery-stories-container');

        container.querySelector('.lg-content').insertAdjacentHTML('beforeend', `${prevBtnHTML} ${nextBtnHTML}`);
        container.querySelector('.gallery-stories-container__prev').addEventListener('click', () => galleryContainer.goToPrevSlide());
        container.querySelector('.gallery-stories-container__next').addEventListener('click', () => galleryContainer.goToNextSlide());
        container.querySelector('.lg-backdrop').addEventListener('click', () => galleryContainer.closeGallery());
    });
}
