const bookConsultation = () => {
    const container = document.querySelector('.book-consultation');
    if (!container) return;
    const form = container.querySelector('.book-consultation__form');
    const agentToggle = container.querySelector('.toggle-checkbox input');
    const agentsContainer = container.querySelector('.book-consultation__agents');
    const agentsList = container.querySelectorAll('.card-agent');
    const button = container.querySelector('.book-consultation__btn');
    agentToggle.addEventListener('input', () => {
        if (agentToggle.checked) {
            agentsContainer.classList.add('_active');
            movingButton();
        } else {
            agentsContainer.classList.remove('_active');
            movingButtonDefault();
        }
    })
    agentsList.forEach(currentAgent => {
        currentAgent.addEventListener('input', () => {
            agentsList.forEach(agent => agent.classList.remove('_active'));
            currentAgent.classList.add('_active');
        });
    })

    function movingButton() {
        form.insertAdjacentElement('beforeend', button);
        button.classList.add('_moving');
    }

    function movingButtonDefault() {
        container.querySelector('.book-consultation__screen-demonstration').insertAdjacentElement('afterend', button);
        button.classList.remove('_moving');
    }
};

export default bookConsultation;
