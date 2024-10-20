const popup = document.querySelector('.chat-popup');
const chatBtn = document.querySelector('.chat-btn');
const submitBtn = document.querySelector('.submit');//
const chatArea = document.querySelector('.chat-area');//
const inputElm = document.getElementById('chat-text')
const API_KEY = "";

chatBtn.addEventListener('click', () => {
    popup.classList.toggle('show');
});

submitBtn.addEventListener('click', async () => { // add async
    let userInput = inputElm.value;
    let temp = `<div class="out-msg">
    <span class="my-msg">${userInput}</span>
    </div>`;

    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';

    try{
        const botResponse = getApiResponse(userInput);

        let botMessage = `<div class="incoming-msg">
        <img src="https://static.vecteezy.com/system/resources/previews/009/906/521/original/nurse-woman-icon-outline-illustration-vector.jpg" class="avatar" alt="">
        <span class="msg">${botResponse}</span>
        </div>`;
        chatArea.insertAdjacentHTML("beforeend", botMessage);
    }catch(error){
        console.error("Error fetching the response:", error);
        let errorMessage = `<div class="incoming-msg">
        <img src="https://static.vecteezy.com/system/resources/previews/009/906/521/original/nurse-woman-icon-outline-illustration-vector.jpg" class="avatar" alt="">
        <span class="msg">Sorry, I couldn't get a response. Please try again later.</span>
        </div>`;
        chatArea.insertAdjacentHTML("beforeend", errorMessage);
    }
    // let botResponse = getBotResponse(userInput);

    // let botMessage = `<div class="incoming-msg">
    // <img src="https://static.vecteezy.com/system/resources/previews/009/906/521/original/nurse-woman-icon-outline-illustration-vector.jpg" class="avatar" alt="">
    // <span class="msg">${botResponse}</span>
    // </div>`;
    // chatArea.insertAdjacentHTML("beforeend", botMessage);
});

// function getBotResponse(userInput){
//     const responses = {
//         'hi': 'Hello! How can I assist you today?',
//         'help': 'Sure! What do you need help with?',
//         'bye': 'Goodbye! Have a great day!',
//     };

//     return responses[userInput.toLowerCase()] || "I'm not sure how to respond to that.";
// }

async function getApiResponse(userInput) {
    const response = await fetch("https://app.rebrandly.com/account/api", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({message: userInput}),
    });
    if(!response.ok){
        throw new Error("Network response was not ok");
    }
    const data = await response.json();
    //return data.reply;
    return data[0].reply;
}