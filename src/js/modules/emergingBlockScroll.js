const emergingBlockScroll = (targetThemSelector, emergingBlockSelector, screenSize, beforeContainer = false) => {
    const target = document.querySelector(targetThemSelector);
    const block = document.querySelector(emergingBlockSelector);
    if (!(target && block)) return;
    window.addEventListener('scroll', () => {
        if (window.innerWidth >= screenSize) return;
        const pageOffsetTop = window.pageYOffset;
        const targetOffsetTop = target.getBoundingClientRect().top;

        if (beforeContainer) {
            if (targetOffsetTop > innerHeight || pageOffsetTop >= targetOffsetTop + pageOffsetTop) {
                block.classList.add('active-fixed');
            } else {
                block.classList.remove('active-fixed');
            }

        } else {
            if (pageOffsetTop >= targetOffsetTop) {
                block.classList.add('active-fixed');
            } else {
                block.classList.remove('active-fixed');
            }
        }
    })
};
export default emergingBlockScroll;
