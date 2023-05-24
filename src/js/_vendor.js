
import 'focus-visible';

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
        const placeholder = document.createElement('span');
        placeholder.textContent = 'Неважно';
        placeholder.classList.add('select-multiple__placeholder');
        el.closest('.choices').insertAdjacentElement('afterbegin', placeholder);
        el.addEventListener('addItem', (e) => {
            e.target.length ? placeholder.setAttribute('hidden', '') : placeholder.removeAttribute('hidden');
        })
        el.addEventListener('removeItem', (e) => {
            e.target.length ? placeholder.setAttribute('hidden', '') : placeholder.removeAttribute('hidden');
        })
        el.closest('.choices').addEventListener('click', (e) => {
            if ((e.target.classList.contains('choices') || e.target.classList.contains('choices__inner')) && el.closest('.choices').classList.contains('is-open')) {
                choices.hideDropdown();
            }
        })
        el.addEventListener('change', (e) => {
            if (e.target.length >= 1) {
                el.closest('.select-multiple').classList.add('_selected');
            } else {
                el.closest('.select-multiple').classList.remove('_selected');
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
        el.addEventListener('change', () => {
            if (!el.nextElementSibling.querySelector('.choices__item').classList.contains('choices__placeholder')) {
                el.closest('.select-secondary').classList.add('_selected');
            } else {
                el.closest('.select-secondary').classList.remove('_selected');
            }
        })
    });
}
