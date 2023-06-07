import inputResize from "../modules/inputResize";
import inputCursorEnd from '../modules/inputCursorEnd';
import numberReplace from "../modules/numberReplace";

export const inputText = () => {
    const inputs = document.querySelectorAll('.input-text');
    if (inputs.length >= 1) {
        inputs.forEach(el => {
            const input = el.querySelector('.input-text__input');
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
                input.value = numberReplace(input.value);
                if (input.value.length >= 1) {
                    el.classList.add('_active')
                } else {
                    el.classList.remove('_active')
                }
            });
            inputCursorEnd(input, 'focus');
        })
    }
}


export const inputOnlyNumber = () => {
    const inputs = document.querySelectorAll('[data-input-only-number]');
    if (inputs.length === 0) return;
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            const value = this.value;
            this.value = value.replace(/\D/g, '');
        })
    });
};

export const textareaSecondary = () => {
    const textareas = document.querySelectorAll('.textarea-secondary');
    textareas.forEach(textarea => {
        const textareaInput = textarea.querySelector('.textarea-secondary__input');
        textareaInput.addEventListener('input', (e) => {
            toggleActive(e.target, textarea);

            textarea.style.height = `45px`;
            textarea.style.height = `${textareaInput.scrollHeight + 2}px`;
        });
    });

    function toggleActive(target, currentTextarea) {
        target.value.length >= 1 ? currentTextarea.classList.add('_active') : currentTextarea.classList.remove('_active');
    }
};
