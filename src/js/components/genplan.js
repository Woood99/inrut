import {
    createPopper
} from '@popperjs/core';
import modal from '../modules/modal';
import spollers from "../functions/spollers";


const genplan = () => {
    const container = document.querySelector('.genplan');
    if (!container) return;
    const infrastructureBtn = container.querySelector('.genplan__infrastructure');
    const marks = container.querySelectorAll('.genplan__mark');
    const visualInfo = container.querySelectorAll('.visual-info');
    const innerWidth = 1212;

    if (window.innerWidth > innerWidth) {
        marks.forEach(item => {
            const btn = item.querySelector('button');
            const content = item.querySelector('div');
            if (btn && content) {
                createPopper(btn, content, {
                    placement: 'auto',
                    modifiers: [{
                        name: 'offset',
                        options: {
                            offset: [5, 5]
                        }
                    }]
                });
            }
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('._static')) {
                    item.classList.add('_active');
                    setTimeout(() => {
                        marks.forEach(mark => {
                            if (item !== mark) mark.classList.add('_small-index');
                        })
                    }, 300);
                }
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('._static')) {
                    item.classList.remove('_active');
                    setTimeout(() => {
                        marks.forEach(mark => {
                            if (item !== mark) mark.classList.remove('_small-index');
                        })
                    }, 300);
                }
            });
        });
        visualInfo.forEach(item => {
            const btn = item.querySelector('.visual-info__btn');
            const content = item.querySelector('.visual-info__content');
            if (btn && content){
                createPopper(btn, content, {
                    placement: 'auto',
                    modifiers: [{
                        name: 'offset',
                        options: {
                            offset: [5, 5]
                        }
                    }]
                });
            }
            item.addEventListener('mouseenter', () => {
                if (!item.classList.contains('._static')) {
                    item.classList.add('_active');
                    setTimeout(() => {
                        visualInfo.forEach(info => {
                            if (item !== info) info.classList.add('_small-index');
                        })
                    }, 300);
                }
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('._static')) {
                    item.classList.remove('_active');
                    setTimeout(() => {
                        visualInfo.forEach(info => {
                            if (item !== info) info.classList.remove('_small-index');
                        })
                    }, 300);
                }
            });
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

    infrastructureBtn.addEventListener('click', () => {
        const checked = infrastructureBtn.querySelector('input').checked;
        if (checked) {
            visualInfo.forEach(item => item.classList.remove('_no-visible'));
        } else {
            visualInfo.forEach(item => item.classList.add('_no-visible'));
        }
    })

}
export default genplan;
