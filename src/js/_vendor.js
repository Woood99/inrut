// ========================================================================================


// Плагин кастом-скролла
// import 'simplebar';


// ========================================================================================


// Анимации по скроллу
// import AOS from 'aos';
// AOS.init();


// ========================================================================================


// Галерея

// Документация: https://www.lightgalleryjs.com/docs/
// Сниппет(HTML): gallery

// Подключение базового набора функционала
import lightGallery from 'lightgallery';

// Плагины
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, 
// lgShare, lgThumbnail, lgVideo, lgMediumZoom
import lgVideo from 'lightgallery/plugins/video';
import thumbnail from 'lightgallery/plugins/thumbnail';

// Запуск
const galleries = document.querySelectorAll('#object-gallery');
galleries.forEach(gallery => {
    lightGallery(gallery, {
        plugins: [lgVideo, thumbnail],
        licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
        selector: '.object-gallery__item',
        addClass: 'gallery-primary-container',
        speed: 700,
        animateThumb: false,
        zoomFromOrigin: false,
        allowMediaOverlap: true,
        toggleThumb: true,
        download: false,
        videoMaxSize: 'none',
        loadYouTubePoster: false,
    });
});


// ========================================================================================



import Choices from 'choices.js';

const selectPrimary = document.querySelectorAll('.select-primary__body');
if (selectPrimary.length >= 1) {
    selectPrimary.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
            position: 'bottom',
        })
    });
}
