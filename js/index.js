let input = document.querySelector('#inputSearch');
let gallery = document.querySelector('.gallery');
let localStorageData = [];
let _data  = [];
// заполнение input  с локалхоста
if(input.value === ''){
    input.value = localStorage.getItem('input');
}

// обработчик на input 
let str = '';
let arr = [];
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


gallery.addEventListener('click',e =>{
    const target = e.target
    if(target.nodeName !== 'BUTTON') {return}

    if(!localStorage.getItem('dataFavorite')){
        localStorage.setItem('dataFavorite','[]');
    }
    let arr = JSON.parse(localStorage.getItem('dataFavorite'));
    console.log(arr);

         addElementToFavorite(target,arr);

  
    //2 
        //    взять карточку 
        //addElementToFavorite();    
        //берет дату и переводит в масив

    //3

  // console.log(_data);
});


// Api запрос
function search(){
fetch(`http://api.tvmaze.com/search/shows?q=${str}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        _data =  data
        createCards(data);
    })
}

//создание карточки 
function createCards(data){
    if(data.length===0){
         setTimeout(alert(' Nothing found'),1000);
    }
    for(el of data){
       // console.log(el.show.id);
        const card = document.createElement('div');
        const cardNameFilm = document.createElement('h1');
        const aboutFilm = document.createElement('a');
        const addToFavorites = document.createElement('button');
        //атрибуты
        card.setAttribute('id',`${el.show.id}`)
         aboutFilm.setAttribute( 'href', el.show.url);
         aboutFilm.setAttribute('target',"_blank");

        //клас
        card.classList = 'film';
        aboutFilm.classList = 'aboutFilm';
        addToFavorites.classList = 'btnFavorites';
        //текст 
        cardNameFilm.textContent = el.show.name;
        aboutFilm.textContent = 'more about film';
        addToFavorites.textContent = 'add to favorites';

        //стили
       (el.show.image !== null)
       ?    card.style.backgroundImage = `url(${el.show.image.medium}) `
       :    card.style.backgroundImage = '';

       cardNameFilm.classList = 'cardName';

   

       //append
        card.append(cardNameFilm,aboutFilm,addToFavorites);
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


// добавляем карточку в список любимые сериалы
function addElementToFavorite(target,arr){
    let id = +target.parentNode.id;
    //поиск элемента в масиве , пришел из fetch запроса
    let elem = _data.find(e=>{
        return e.show.id === id;
    });


    // тут нужно сделать проверка на уже существующий елемент
    const validator =  arr.find(e=>{
        return e.show.id === id;
    });
    if(!validator){
        console.log('добавляем');
        arr.push(elem);
        localStorage.setItem('dataFavorite', JSON.stringify(arr)); 
    }        
}