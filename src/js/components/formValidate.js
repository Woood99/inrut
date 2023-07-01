import Inputmask from "inputmask";

const validateTextMap = {
    minLength: 'Минимальное кол-во символов:',
    name: 'Укажите имя',
    surname: 'Укажите фамилию',
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
    const agentToggle = form.querySelector('.toggle-checkbox input');
    const agents = form.querySelector('.book-consultation__agents');
    const cardsAgent = agents.querySelectorAll('.card-agent');

    [nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })
    agentToggle.addEventListener('input', () => {
        if (!agentToggle.checked) {
            cardsAgent.forEach(card => {
                card.classList.remove('_error');
                card.classList.remove('_active');
                card.querySelector('input').checked = false;
            })
        }
    })
    cardsAgent.forEach(card => {
        card.querySelector('input').addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(nameLabel);
        cardsAgent.forEach(card => card.classList.remove('_error'));
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
        if (agents.classList.contains('_active') && !agents.querySelector('.card-agent input:checked')) {
            result = false;
            cardsAgent.forEach(agent => agent.classList.add('_error'));
        }
        return result;
    }

    form.addEventListener('submit', (e) => {
        if (!validate()) e.preventDefault();
    })
};
export const clientFixedValidate = () => {
    const form = document.querySelector('.client-fixed__form');
    if (!form) return;
    let formEventInput = false;
    const surnameLabel = form.querySelector('.client-fixed__label--surname');
    const nameLabel = form.querySelector('.client-fixed__label--name');
    const telLabel = form.querySelector('.client-fixed__label--tel');

    const surnameInput = surnameLabel.querySelector('input');
    const nameInput = nameLabel.querySelector('input');
    const telInput = telLabel.querySelector('input');

    const btn = form.querySelector('.client-fixed__btn');
    [surnameLabel, nameLabel, telInput].forEach(el => {
        el.addEventListener('input', () => {
            if (formEventInput) validate();
        })
    })

    function validate() {
        let result = true;
        formEventInput = true;
        validateRemoveError(telLabel);
        validateRemoveError(surnameLabel);
        validateRemoveError(nameLabel);

        if (surnameLabel.hasAttribute('data-validate-min-length') && surnameInput.value.length < surnameLabel.dataset.validateMinLength) {
            result = false;
            validateCreateError(surnameLabel, `${validateTextMap.minLength} ${surnameLabel.dataset.validateMinLength}`);
        }
        if (surnameLabel.hasAttribute('data-validate-required') && surnameInput.value === '') {
            result = false;
            validateCreateError(surnameLabel, validateTextMap.surname);
        }

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
       e.preventDefault();
       validate();
    })
}

export const inputMask = () => {
    const inputs = document.querySelectorAll('.input-phone-mask');
    const inputMask = new Inputmask('+7 999 999-99-99');
    inputs.forEach(input => inputMask.mask(input));
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
