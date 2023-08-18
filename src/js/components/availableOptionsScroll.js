const availableOptionsScroll  = () => {
    const itemsScrolling = document.querySelectorAll('.online-display__item.online-display__item--scroll');
    const headerHeight = document.querySelector('.header-fixed') ? document.querySelector('.header-fixed').offsetHeight : 0;
    const smallGap = 20;
    itemsScrolling.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').replace('#', '');
            if (document.getElementById(sectionId)){
                window.scrollTo({
                    top: document.getElementById(sectionId).offsetTop - headerHeight - smallGap,
                    behavior: 'smooth',
                })
            }
        })
    })
};

export default availableOptionsScroll;