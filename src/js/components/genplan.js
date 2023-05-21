import {
    createPopper
} from '@popperjs/core';
import modal from '../modules/modal';
import spollers from "../functions/spollers";


const genplan = () => {
    const container = document.querySelector('.genplan');
    if (!container) return;
    const marks = container.querySelectorAll('.genplan__mark');
    const visualInfo = container.querySelectorAll('.visual-info');
    const innerWidth = 1112;
    if (window.innerWidth > innerWidth) {
        marks.forEach(item => {
            const btn = item.querySelector('button');
            const content = item.querySelector('div');
            createPopper(btn, content, {
                placement: 'auto',
                modifiers: [{
                    name: 'offset',
                    options: {
                        offset: [5, 5]
                    }
                }]
            });
            item.addEventListener('mouseenter', () => item.classList.add('_active'));
            item.addEventListener('mouseleave', () => item.classList.remove('_active'));
        });
        visualInfo.forEach(item => {
            item.addEventListener('mouseenter', () => item.classList.add('_active'));
            item.addEventListener('mouseleave', () => item.classList.remove('_active'));
        })
    } else {

        marks.forEach(item => {
            item.addEventListener('click', () => {
                const card = item.querySelector('.genplan-mark');


                const modalHTML = `
                <div class="genplan-popup-card">
                <div class="genplan-popup-card__container">
                    <button class="btn-reset genplan-popup-card__close" aria-label="Закрыть модальное окно">
                        <span>Закрыть</span>
                    </button>
                     <div class="genplan-popup-card__content">
                        ${card.outerHTML}
                     </div>
                </div>
                </div>
                `;

                modal(modalHTML, '.genplan-popup-card', 300);
                spollers();
            })
        })
        visualInfo.forEach(item => {
            item.addEventListener('click', () => {
                visualInfo.forEach(el => {
                    if (item !== el) el.classList.remove('_active')
                });
                item.classList.toggle('_active');
            });
        })


        const mask = container.querySelector('.genplan__mask');
        mask.addEventListener('touchstart', () => {
            mask.classList.remove('_active');
            setTimeout(() => {
                mask.classList.add('hidden');
            }, 500);
        });
    }


}
export default genplan;
