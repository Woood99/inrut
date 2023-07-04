export const favoritesPage = () => {
    const container = document.querySelector('.favorites__tab--client');
    if (container) {
        const client = container.querySelector('[data-favorite-client-select]');
        const selection = container.querySelector('[data-favorite-selection-select]');

        client.querySelector('.select-secondary').addEventListener('change', () => {
            selection.removeAttribute('hidden');
        })
    }
}

export const favoriteChoicePopup = () => {
    const container = document.querySelector('.favorite-two');
    if (!container) return;

    const myListBtn = container.querySelector('[data-favorite-announcement-btn]');
    const clientBtn = container.querySelector('[data-favorite-client-btn]');

    const announcement = container.querySelector('[data-favorite-announcement-select]');
    const client = container.querySelector('[data-favorite-client-select]');
    const selection = container.querySelector('[data-favorite-selection-select]');
    myListBtn.addEventListener('click', () => {
        clientBtn.classList.remove('_active');
        myListBtn.classList.add('_active');

        announcement.removeAttribute('hidden');
        client.setAttribute('hidden', '');
        selection.setAttribute('hidden', '');
    })
    clientBtn.addEventListener('click', () => {
        myListBtn.classList.remove('_active');
        clientBtn.classList.add('_active');

        announcement.setAttribute('hidden', '');
        client.removeAttribute('hidden');
        if (client.classList.contains('_selected')) {
            selection.removeAttribute('hidden');
        }
    })

    client.addEventListener('change', () => {
        if (client.classList.contains('_selected')) {
            selection.removeAttribute('hidden');
        }
    });
}
