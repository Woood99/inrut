export const complaintValidate = () => {
    const form = document.querySelector('.complaint-popup__form'),
        textarea = form.querySelector('.textarea-primary__input'),
        btn = form.querySelector('.complaint-popup__btn'),
        radios = form.querySelectorAll('.radio-primary__input');

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
