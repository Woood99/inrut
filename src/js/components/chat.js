const chat = () => {
    const chat = document.querySelector('.popup-chat');
    if (!chat) return;
    const chatBottom = chat.querySelector('.chat__bottom');
    chatBottom.querySelector('.textarea-secondary__input').addEventListener('input', () => {
        chat.style.setProperty('--chat-bottom-height', `${chatBottom.offsetHeight}px`);
    })
};

export default chat;
