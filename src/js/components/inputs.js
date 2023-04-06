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
