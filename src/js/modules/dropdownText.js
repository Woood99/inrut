const dropdownText = (containerSelector, dropdownText, btnSelector) => {
    const containers = document.querySelectorAll(containerSelector);
    containers.forEach(container => {
        const dropdownItems = container.querySelectorAll(dropdownText);
        const btn = container.querySelector(btnSelector);
        btn.addEventListener('click', () => {
            dropdownItems.forEach(el => el.classList.remove('is-hidden'));
            btn.remove();
        });
    })
}

export default dropdownText;
