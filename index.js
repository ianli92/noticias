//index.js
const rp = require('request-promise')
const cheerio = require('cheerio')

const options = {
  uri: 'https://globoesporte.globo.com/futebol/times/flamengo/',
  transform: function (body) {
    return cheerio.load(body)
  }
}

function processarDados(dados){
  //salva no banco de dados
  console.log(JSON.stringify(dados))
}

rp(options)
.then(($) => {
  const times = []
  $('.bastian-feed-item').each((i, item) => {

    const time = {
      noticia: $(item).find('.feed-post-link').text(),
      data: ($(item).find('.feed-post-datetime').text())
    }

    if(time.nome !== "")
      times.push(time)
  })
  processarDados(times)
})
.catch((err) => {
  console.log(err);
})