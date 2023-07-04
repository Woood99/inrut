const favoritesPage = () => {
    const container = document.querySelector('.favorites__tab--client');
    if (container) {
        const client = container.querySelector('[data-favorite-client-select]');
        const selection = container.querySelector('[data-favorite-selection-select]');

        client.querySelector('.select-secondary').addEventListener('change',() => {
            selection.removeAttribute('hidden');
        })
    }
}
export default favoritesPage;
