const popup = document.querySelector('.chat-popup');
const chatBtn = document.querySelector('.chat-btn');
const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chat-area');
const inputElm = document.querySelector('input');

//
const API_KEY = "51517890d17a4c9d8dc7b18bb9fbd3c0";
const inputInitHeight = inputElm.scrollHeight;
const createChatDiv = (msg, className) => {
    // create a chat <li> element with passed msg and className
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    let chatContent = className === "out-msg" ? `<p>${msg}</p>` : `<img src="https://static.vecteezy.com/system/resources/previews/009/906/521/original/nurse-woman-icon-outline-illustration-vector.jpg"><span class="material-symbols-outlined"></span></img><p></p>`;
    chatDiv.innerHTML = chatContent;
    chatDiv.querySelector("div").textContent = msg;
    return chatDiv;
};
const generateResponse = (incomingChatDiv) => {
    const API_URL = "https://app.rebrandly.com/account/api";
    inputElm = incomingChatDiv.querySelector("div");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userInput}]
        })
    };
    // send post request to API, get response
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        inputElm.textContent = data.choices[0].msg.content;
        console.log(data);
    }).catch((error) => {
        inputElm.textContent = "Something went wrong. Please try again.";
        console.log(error);
    }).finally(() => chat-area.scrollTo(0, chat-area.scrollHeight));
};
const handleChat = () => {
    userInput = chatArea.value.trim();
    //console.log(userMsg);
    if(!userInput){
        return;
    }
    chatArea.value = "";
    chatArea.style.height = `${inputInitHeight}px`;
    // append the user's msg to the chatbox
    chat-area.appendChild(createChatDiv(userInput, "out-msg"));
    setTimeout(() => {
        // display "Replying..."" while waiting for response
        const incomingChatDiv = createChatDiv("Replying...", "incoming");
        chat-area.appendChild(incomingChatDiv);
        generateResponse(incomingChatDiv);
    }, 600);
};
chatArea.addEventListener("input", () => {
    // adjust the height of the input textarea based on its content
    inputElm.style.height = `${inputInitHeight}px`;
    inputElm.style.height = `${chatArea.scrollHeight}px`;
});
chatArea.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800){
        e.preventDefault();
        handleChat();
    }
});
//

chatBtn.addEventListener('click', () => {
    popup.classList.toggle('show');
});

submitBtn.addEventListener('click', () => {
    let userInput = inputElm.value;
    let temp = `<div class="out-msg">
    <span class="my-msg">${userInput}</span>
    </div>`

    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';
});