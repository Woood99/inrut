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
const selectSort = document.querySelectorAll('.select-sort__body');
if (selectSort.length >= 1) {
    selectSort.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
            position: 'bottom',
        })
    });
}

const selectMultiple = document.querySelectorAll('.select-multiple__body');
if (selectMultiple.length >= 1) {
    selectMultiple.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
            position: 'bottom',
            noChoicesText: 'Вы выбрали все доступные теги',
            removeItemButton: true,
        })

        el.closest('.choices').addEventListener('click', (e) => {
            if ((e.target.classList.contains('choices') || e.target.classList.contains('choices__inner')) && el.closest('.choices').classList.contains('is-open')) {
                choices.hideDropdown();
            }
        })
    });
}



const selectSecondary = document.querySelectorAll('.select-secondary__body');
if (selectSecondary.length >= 1) {
    selectSecondary.forEach(el => {
        const choices = new Choices(el, {
            searchEnabled: false,
            shouldSort: false,
            itemSelectText: '',
            position: 'bottom',
            placeholder: true,
        })
    });
}