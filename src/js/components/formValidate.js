export const validateRadioText = (formSelector, textareaSelector, btnSelector, radiosSelector) => {
    const form = document.querySelector(formSelector);
    if (!form) return false;
    const textarea = form.querySelector(textareaSelector);
    const btn = form.querySelector(btnSelector);
    const radios = form.querySelectorAll(radiosSelector);

    function checkForm() {
        let flag = false;
        for (let radio of radios) {
            flag = radio.checked ? true : false;
            if (flag) break;
        }
        flag ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
    };

    function clearForm() {
        textarea.value = '';
        btn.setAttribute('disabled', '');
        textarea.classList.remove('active');
        for (let radio of radios) {
            radio.checked = false;
        }
    }
    form.addEventListener('change', (e) => {
        if (e.target.type === 'radio') checkForm();
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearForm();
    });
};
