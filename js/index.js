let input = document.querySelector('#inputSearch');
let gallery = document.querySelector('.gallery');

// заполнение input  с локалхоста
if(input.value === ''){
    input.value = localStorage.getItem('input');
}

// обработчик на input 
let str = '';
input.addEventListener('keydown',(e)=>{
    str = e.target.value;
    localStorage.setItem('input', str);

    //при нажатии на энтер
    if(e.keyCode === 13){
        //очистка галереи от старого поиска
        clearCard(gallery);
        // функция поиска  ;
        search();
    }
});

// Api запрос
function search(){
fetch(`http://api.tvmaze.com/search/shows?q=${str}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        createCards(data);
    })
}

//создание карточки 
function createCards(data){
    if(data.length===0){
         setTimeout(alert(' Nothing found'),1000);
    }

    for(el of data){
        console.log(el);
        const card = document.createElement('div');
        const cardNameFilm = document.createElement('h1');
        const aboutFilm = document.createElement('a');
        //атрибуты
         aboutFilm.setAttribute( 'href', el.show.url);


        //клас
        card.classList = 'film';
        aboutFilm.classList = 'aboutFilm';
        //текст 
        cardNameFilm.textContent = el.show.name;
        aboutFilm.textContent = 'more about film';

        //стили
       (el.show.image !== null)
       ?    card.style.backgroundImage = `url(${el.show.image.medium}) `
       :    card.style.backgroundImage = '';

       cardNameFilm.classList = 'cardName';

   

       //append
        card.append(cardNameFilm,aboutFilm);
        gallery.append(card);
    }
}


// очистка карточек
function clearCard(perent) {
(perent.children.length > 0) ? remuve(perent) : console.log('пустой');

function remuve(perent){
    perent.innerHTML = '';
}
}