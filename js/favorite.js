let gallery = document.querySelector('.gallery');
let data = JSON.parse(localStorage.getItem('dataFavorite'));

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