import Inputmask from "inputmask";

const validateTextMap = {
    minLength: 'Минимальное кол-во символов:',
    name: 'Укажите имя',
    tel: 'Введите корректный номер телефона',
}

export const validateRadioPrimary = (formSelector, textareaSelector, btnSelector, radiosSelector) => {
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

export const validateCheckboxPrimary = (formSelector, textareaSelector, btnSelector, checkboxesSelector) => {
    const form = document.querySelector(formSelector);
    if (!form) return false;
    const textarea = form.querySelector(textareaSelector);
    const btn = form.querySelector(btnSelector);
    const checkboxes = form.querySelectorAll(checkboxesSelector);

    function checkForm() {
        let flag = false;
        for (let checkbox of checkboxes) {
            flag = checkbox.checked ? true : false;
            if (flag) break;
        }
        flag ? btn.removeAttribute('disabled') : btn.setAttribute('disabled', '');
    };

    function clearForm() {
        textarea.value = '';
        btn.setAttribute('disabled', '');
        for (let radio of checkboxes) {
            radio.checked = false;
        }
    }
    form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') checkForm();
    })
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearForm();
    });
};

export const bookConsultationValidate = () => {
    const form = document.querySelector('.book-consultation__form');
    if (!form) return;
    let formEventInput = false;
    const nameLabel = form.querySelector('.book-consultation__form--name');
    const telLabel = form.querySelector('.book-consultation__form--tel');
    const nameInput = nameLabel.querySelector('input');
    const telInput = telLabel.querySelector('input');

    inputMask(telInput);

    [nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(nameLabel);
        if (nameLabel.hasAttribute('data-validate-min-length') && nameInput.value.length < nameLabel.dataset.validateMinLength) {
            result = false;
            validateCreateError(nameLabel, `${validateTextMap.minLength} ${nameLabel.dataset.validateMinLength}`);
        }
        if (nameLabel.hasAttribute('data-validate-required') && nameInput.value === '') {
            result = false;
            validateCreateError(nameLabel, validateTextMap.name);
        }
        if (!inputTelValidate(telLabel, telInput)) {
            result = false;
            validateCreateError(telLabel, validateTextMap.tel);
        }
        return result;
    }

    form.addEventListener('submit', (e) => {
        validate();
        e.preventDefault();
        // if (!validate()) e.preventDefault();
    })
};


export const inputMask = (input) => {
    if (!input) return;
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(input);
}
export const inputTelValidate = (label, input) => {
    if (!label || !input) return;
    const inputLength = input.inputmask.unmaskedvalue().length
    return inputLength === 10 ? true : false;
}


function validateCreateError(label, text) {
    validateRemoveError(label);
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('_error-span');
    errorSpan.textContent = text;

    label.append(errorSpan);
    label.classList.add('_error');
}

function validateRemoveError(label) {
    if (!label.classList.contains('_error')) return;
    label.querySelector('._error-span').remove();
    label.classList.remove('_error');
}
