const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
function handleRender(req, res) {
    const indexFile = path.resolve('./frontend/build/index.html');
    fs.readFile(
        indexFile,
        'utf8',
        (err, data)=>renderFullPage(data, req).then((html)=>res.send(html))
    );
}
async function renderFullPage(staticMarkup, req) {
  const url = req.url.split('/');
  let default_title = "";
  let default_description = "";
  switch(url[1]){
    case "":
      default_title = "Отзывы о людях и организациях, мошенниках и лжецах. Оставить отзыв без регистрации!"
      default_description = "Наш сайт даёт Вам возможность найти всю информацию о нечестных людях и организациях, оставляйте отзывы о мошенниках, без регистрации и смс! Выведем всех на чистую воду!"
      break;
    case "post":
      // try{
      //   const response = await fetch('http://localhost:5000/post/renal.company---lokhotron-s-platnoi-registratsiei!/', {
      //     method: 'POST',
      //     body: {
      //       url: 'renal.company---lokhotron-s-platnoi-registratsiei!'
      //     }
      //   })
      //   const json = await response.json();
      //   console.log(json);
      // }
      // catch(e){
      //   console.log(e);
      // }
      console.log('alsa');
      break;
    default:
      break;
  }
  let html = staticMarkup.replace('<div id="root"></div>', `<div id="root">${url}</div>`);
  html = html.replace('{title}', default_title);
  html = html.replace('{description}', default_description);
  return html;
}

module.exports = handleRender;