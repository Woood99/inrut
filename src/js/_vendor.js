// ========================================================================================


// Плагин кастом-скролла
// import 'simplebar';


// ========================================================================================


// Анимации по скроллу
// import AOS from 'aos';
// AOS.init();


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
