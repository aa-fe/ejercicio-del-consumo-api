const apiUrl = "https://breakingbadapi.com/api/"

/*const fakeCharacters = [
    {
        //ctrl D para seleccionar misma cosa multiple times, ctrl P para buscar extension con >, ctrl alt i para numerar 
        character: "turip IP IP IP TUrip",
        nickname:"nicknames Name  1",
        id: 1
    },
    {
        character: "Culpa sunt laborum mollit tempor dolor amet ex ipsum.",
        nickname:"nicknames Name  2",
        id: 2
    },
    {
        character: "Minim aliquip irure quis proident deserunt dolor minim ipsum in.",
        nickname:"nicknames Name  3",
        id: 3
    },
    {
        character: "Non fugiat nisi tempor ipsum nostrud fugiat non laborum eu reprehenderit commodo.",
        nickname:"nicknames Name  4",
        id: 4
    },
    {
        character: "Sint in ipsum quis fugiat voluptate ad officia sunt mollit sunt duis sint sunt.",
        nickname:"nicknames Name  5",
        id: 5
    }
]*/

function doQuery(url, displayFunction){

//mandamos una solicitud y obtenemos una promesa
const request = fetch(apiUrl + url)

//esperar a que resuelva la promesa
request.then(function(response){

    //info sobre nuestra respuesta
    console.log( "response", response )

    //extraer cuerpo de respuesta
    response.json().then (function(data){
        console.log("data", data)

if(typeof displayFunction == "function"){
    displayFunction(data)
}

       
    })

})

console.log("request", request)

}

function formatCharacter(character){
    
    return {
        id: character.char_id,
        name: character.name,
        nickname: character.nickname,
        image: character.img
    }
}

function displayCharacters(data){

    console.log("display", data);

    const formattedCharacters = data.map (formatCharacter)

    formattedCharacters.forEach(createAppendCharacter)


}

function openElement (event){
const el = event.target
console.log("id", el.getAttribute("data-id"))
}

function setupInteraction(element){
    element.addEventListener("click", openElement)
}

function createAppendCharacter(character){

    const container = document.querySelector("#characters")

    const characterBox = CreateCharacterHTML(character)

    setupInteraction(characterBox)

    container.append(characterBox)
}

function CreateCharacterHTML(character){

const model = document.querySelector(".character.model")
const characterBox = model.cloneNode(true)
characterBox.classList.remove("model")

const nameBox = characterBox.querySelector(".name")
const nicknameBox = characterBox.querySelector(".nickname")

const img = characterBox.querySelector(".image img")

//const characterBox = document.createElement("article")
//const textBox = document.createElement("p")
//const nicknameBox = document.createElement("p")

//textBox.classList.add("text")
//nicknameBox.classList.add("nickname")

nameBox.innerHTML = character.name
nicknameBox.innerHTML = character.nickname

img.setAttribute("src", character.image)
characterBox.setAttribute("data-id", character.id)


//characterBox.append(textBox)
//characterBox.append(nicknameBox)

characterBox.classList.add("character")

return characterBox
}

doQuery("characters", displayCharacters)
/* doQuery("characters")
doQuery("episodes")*/

console.log("Consulta API")

