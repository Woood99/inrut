export const complaintValidate = (formSelector, textareaSelector, btnSelector, radiosSelector) => {
    const form = document.querySelector(formSelector),
        textarea = form.querySelector(textareaSelector),
        btn = form.querySelector(btnSelector),
        radios = form.querySelectorAll(radiosSelector);
    if (!form) return false;
    function checkForm() {
        let flag = false;
        for (let radio of radios) {
            flag = radio.checked ? true : false;
            if (flag) break;
        }
        textarea.value.length >= 5 && flag ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
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
    textarea.addEventListener('input', () => checkForm());
};
