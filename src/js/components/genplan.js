import {
    createPopper
} from '@popperjs/core';

const genplan = () => {
    const container = document.querySelector('.genplan');
    if (!container) return;
    const marks = container.querySelectorAll('.genplan__mark');;
    const innerWidth = 1112;
    if (window.innerWidth > innerWidth) {
        marks.forEach(item => {

            const btn = item.querySelector('button');
            const content = item.querySelector('div');
            createPopper(btn, content, {
                placement: 'auto',
            });
            item.addEventListener('mouseover', () => item.classList.add('_active'));
            item.addEventListener('mouseout', () => item.classList.remove('_active'));
        });
    } else {

    }


}
export default genplan;
