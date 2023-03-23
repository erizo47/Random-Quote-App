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

  let quotesData = []
  const qouteBtn = document.querySelector('#new-quote-btn')
  const text = document.getElementById('text')
  const author = document.getElementById('author')
  
  const twitBtn = document.getElementById('tweet-quote')
  const tumblrBtn = document.getElementById('tumblr-quote')

  let currentQuote = ''
  let currentAuthor = ''

  // функция инициализации приложения 
  const init = async () => {
    console.log('init')
    quotesData = await getQoutes()
    swapQuote()
    setTwitUrl()
  }
  //запрос данных с сервера
  async function getQoutes() {
    let result = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        Accept: 'application/json'
      }})
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return data          
      })
      console.log("getQuotes returns: ", result)
      return result 
  }
  
// функция выбора рандомной цитаты
function getRandomQuote() {
  if(quotesData && quotesData.quotes) {
    return quotesData.quotes[
      Math.floor(Math.random() * quotesData.quotes.length)
    ];
  }
}

// функция замены цвета
  function changeColor(color) {
    document.documentElement.style.setProperty('--main-color', color)
  }

// функция анимации замены текста
function changeText(el) {
  el.classList.add('hide')
  setTimeout(function() {
    el.classList.remove('hide')
  }, 400)
}

// функция получения quote , замена текста и цвета
function swapQuote() {
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

// функция генерация url для qoute-buttons-post

function setTwitUrl () {
  const encodeTwit = encodeURIComponent('"' + currentQuote + '"' + ' ' + currentAuthor)
  const encodeAuthorTmblr = encodeURIComponent(currentAuthor)
  const encodeQuoteTmblr = encodeURIComponent(currentQuote)

  const twitUrl = `https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeTwit}`
  const tmblrUrl = `https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${encodeAuthorTmblr}&content=${encodeQuoteTmblr}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`

  twitBtn.setAttribute("href", twitUrl)
  tumblrBtn.setAttribute('href', tmblrUrl)
}


// слушатели событий 


qouteBtn.addEventListener('click', () => {    
  swapQuote()
});

document.addEventListener('DOMContentLoaded', ()=> {
    init()
    
});
