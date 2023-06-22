const bookConsultation = () => {
    const container = document.querySelector('.book-consultation');
    if (!container) return;
    const agentToggle = container.querySelector('.toggle-checkbox input');
    const agentsContainer = container.querySelector('.book-consultation__agents');
    const agentsList = container.querySelectorAll('.card-agent');
    agentToggle.addEventListener('input', () => {
        if (agentToggle.checked) {
            agentsContainer.classList.add('_active');
        } else {
            agentsContainer.classList.remove('_active');
        }
    })
    agentsList.forEach(currentAgent => {
        currentAgent.addEventListener('input', () => {
            agentsList.forEach(agent => agent.classList.remove('_active'));
            currentAgent.classList.add('_active');
        });
    })
};

export default bookConsultation;
