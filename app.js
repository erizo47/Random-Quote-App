const colors = [
    '#16a085',
    '#27ae60',
    '#2c3e50',
    '#f39c12',
    '#e74c3c',
    '#9b59b6',
    '#FB6964',
    '#342224',
    '#472E32',
    '#8b6d39',
    '#77B1A9',
    '#54813c'
  ];
  let currentQuote = ''
  let currentAuthor = ''
  
  const qouteBtn = document.querySelector('#new-quote-btn')
  
  
  

  qouteBtn.addEventListener('click', () => {
    
    getQuote()
  })

  function changeColor(color) {
    document.documentElement.style.setProperty('--main-color', color)
  }

  

  let quotesData
  function getQoutes() {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
        headers: {
          Accept: 'application/json'
        }})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            quotesData = data          
        })

    }
  

setTimeout(() => {console.log(quotesData)}, 500)

function getRandomQuote() {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function changeText(el) {
  el.classList.add('hide')
  setTimeout(function() {
    el.classList.remove('hide')
  }, 400)
}

function getQuote() {
    let randomQuote = getRandomQuote()

    currentQuote = randomQuote.quote
    currentAuthor = randomQuote.author

    
    changeText(text)
    setTimeout(()=> {
      text.innerText = currentQuote
    }, 400)

    changeText(author)
    setTimeout(()=> {
      author.innerText = currentAuthor
    }, 400)
    
    let random = Math.floor(Math.random() * colors.length)
    const color = colors[random]
    changeColor(color)
}



const newQuoteBtn = document.getElementById('new-quote-btn')
const text = document.getElementById('text')
const author = document.getElementById('author')




  
document.addEventListener('DOMContentLoaded', ()=> {
    getQoutes()
    setTimeout(() => {
      getQuote()
    }, 100)
    
});

console.log(getRandomQuote())