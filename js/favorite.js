let gallery = document.querySelector('.gallery');
let data = JSON.parse(localStorage.getItem('dataFavorite'));
for(el of data){
    // console.log(el.show.id);
     const card = document.createElement('li');
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
     addToFavorites.textContent = 'remove serial';

     //стили
    (el.show.image !== null)
    ?    card.style.backgroundImage = `url(${el.show.image.medium}) `
    :    card.style.backgroundImage = '';

    cardNameFilm.classList = 'cardName';



    //append
     card.append(cardNameFilm,aboutFilm,addToFavorites);
     gallery.append(card);
 }
 
 gallery.addEventListener('click',removeCard);

 function removeCard(e){
    const target = e.target;
    if(target.nodeName !== 'BUTTON') {return}
     const id =  +target.parentNode.id;

    remuveSerialFromLocalStorege(id);
    target.parentNode.remove();
 }

 //удаление сериала
 function remuveSerialFromLocalStorege(id) {
    let arr =  JSON.parse(localStorage.getItem('dataFavorite'));

    let newArr =  arr.filter(e=>{
        return e.show.id !== id;
    });
    localStorage.setItem('dataFavorite', JSON.stringify(newArr));
 
 }