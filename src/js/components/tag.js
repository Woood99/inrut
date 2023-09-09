const tag = () => {
    const tags = document.querySelectorAll('.tag');
    const svgIconHTML = `
        <div>
            <svg>
                <use xlink:href="img/sprite.svg#x"></use>
            </svg>
        </div>
    `;
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (tag.classList.contains('_no-select')) return;
            if (tag.closest('._drag')) return;
            if (!tag.classList.contains('_active')) {
                tag.classList.add('_active');
                tag.insertAdjacentHTML('beforeend', svgIconHTML);
            } else {
                tag.classList.remove('_active');
                tag.querySelector('div').remove();
            }
        })
    })
};
export default tag;
