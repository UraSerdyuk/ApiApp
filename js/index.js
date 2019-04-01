let input = document.querySelector('#inputSearch');
let gallary = document.querySelector('.gallary');

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
        clearCard(gallary);
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
      //  console.log(data);
        
    })
}

//создание карточки 
function createCards(data){
    for(el of data){
        console.log(el);
        const card = document.createElement('div');
        const cardNameFilm = document.createElement('h1');
        //клас
        card.classList = 'film';
        //текст 
        cardNameFilm.textContent = el.show.name;

        //стили
       (el.show.image !== null)
       ?    card.style.backgroundImage = `url(${el.show.image.medium}) `
       :    card.style.backgroundImage = '';

       cardNameFilm.classList = 'cardName';

   

       //append
        card.append(cardNameFilm);
        gallary.append(card);
    }
}


// очистка карточек
function clearCard(perent) {
(perent.children.length > 0)? remuve(perent) :console.log('пустой');

function remuve(perent){
    perent.innerHTML = '';
}
}