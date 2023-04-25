import inputResize from "../modules/inputResize";
import inputCursorEnd from '../modules/inputCursorEnd';
export const inputPrimary = () => {
    const inputs = document.querySelectorAll('.input-primary');
    const textareas = document.querySelectorAll('.textarea-primary');
    inputs.forEach(input => {
        input.querySelector('.input-primary__input').addEventListener('input', (e) => toggleInputActive(e.target));
    });
    textareas.forEach(textarea => {
        textarea.querySelector('.textarea-primary__input').addEventListener('input', (e) => toggleInputActive(e.target));
    });

    function toggleInputActive(target) {
        target.value.length >= 1 ? target.classList.add('active') : target.classList.remove('active');
    }
};


export const inputText = () => {
    const inputs = document.querySelectorAll('.input-text');
    if (inputs.length >= 1) {
        inputs.forEach(el => {
            if (!el.classList.contains('input-text--auto-width')) return;
            const input = el.querySelector('.input-text__input');
            inputResize(input);
            input.addEventListener('input', () => {
                inputResize(input);
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
