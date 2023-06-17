const tag = () => {
    const tags = document.querySelectorAll('.tag');
    const svgIconHTML = `
        <svg>
            <use xlink:href="img/sprite.svg#x"></use>
        </svg>
    `;
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            if (!tag.classList.contains('_active')) {
                tag.classList.add('_active');
                tag.insertAdjacentHTML('beforeend', svgIconHTML);
            } else {
                tag.classList.remove('_active');
                tag.querySelector('svg').remove();
            }
        })
    })
};
export default tag;
