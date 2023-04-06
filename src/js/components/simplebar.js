import SimpleBar from 'simplebar';
export const simplebar = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
        new SimpleBar(el)
    });
}
