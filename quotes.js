const apiUrl = "https://breakingbadapi.com/api/"

/*const fakeQuotes = [
    {
        //ctrl D para seleccionar misma cosa multiple times, ctrl P para buscar extension con >, ctrl alt i para numerar 
        quote: "turip IP IP IP TUrip",
        author:"Authors Name  1",
        id: 1
    },
    {
        quote: "Culpa sunt laborum mollit tempor dolor amet ex ipsum.",
        author:"Authors Name  2",
        id: 2
    },
    {
        quote: "Minim aliquip irure quis proident deserunt dolor minim ipsum in.",
        author:"Authors Name  3",
        id: 3
    },
    {
        quote: "Non fugiat nisi tempor ipsum nostrud fugiat non laborum eu reprehenderit commodo.",
        author:"Authors Name  4",
        id: 4
    },
    {
        quote: "Sint in ipsum quis fugiat voluptate ad officia sunt mollit sunt duis sint sunt.",
        author:"Authors Name  5",
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

function formatQuote(quote){
    return {
        id: quote.quote_id,
        text: quote.quote,
        author: quote.author,
    }
}

function displayQuotes(data){

    console.log("display", data);

    const formattedQuotes = data.map (formatQuote)

    formattedQuotes.forEach(createAppendQuote)


}

function createAppendQuote(quote){

    const body = document.querySelector("body")

    const quoteBox = CreateQuoteHTML(quote)

    body.append(quoteBox)
}

function CreateQuoteHTML(quote){

const quoteBox = document.createElement("blockquote")
const textBox = document.createElement("p")
const authorBox = document.createElement("p")

textBox.classList.add("text")
authorBox.classList.add("author")

textBox.innerHTML = quote.text
authorBox.innerHTML = quote.author

quoteBox.setAttribute("data-id", quote.id)

quoteBox.append(textBox)
quoteBox.append(authorBox)

quoteBox.classList.add("quote")

return quoteBox
}

doQuery("quotes", displayQuotes)
doQuery("characters")
doQuery("episodes")

console.log("Consulta API")

