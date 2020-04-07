console.log("Client side javascript is running")

const weatherform = document.querySelector('form')
const searchL = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
weatherform.addEventListener('submit', (e) => {
    
    e.preventDefault()

    const L = searchL.value
    
    messageone.textContent = 'Loading...'
    messagetwo.textContent = ' '

    fetch('/weather?address='+L).then( (response) => {
    response.json().then( (data) => {
        if(data.error){
            messageone.textContent = data.Error
        }
        else{
            messageone.textContent = data.Location
            messagetwo.textContent = data.Temperature
        }
    })
})

})