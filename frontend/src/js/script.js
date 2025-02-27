//Variables globales
var movieList = $('#movieList');
//Obtener el ID de la película de la URL
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var movieId = urlParams.get('id');
//=======================================================================
//Iniciar Fuse.js(Se implementa desde el HTML y sirve para realizar busquedas difuzas, eje: el gato con 'votas')
var options = {
    keys: ["title"],
    threshold: 0.4, // Nivel de tolerancia a errores (0 = exacto, 1 = muy flexible)
    includeScore: true
};
//=======================================================================
//Arreglo descripcion de peliculas
const arrayDescription = [
    "El Gato con Botas es un personaje astuto y valiente de cuentos de hadas, conocido por su habilidad para resolver problemas y su destreza en la caza de ratones. Siempre lleva botas y un sombrero con plumas, y es famoso por su ingenio y astucia.",
    "El Exorcista es una película de terror que cuenta la historia de Regan, una niña poseída por una entidad demoníaca. Un sacerdote y un equipo de exorcistas intentan salvarla a través de un ritual. Es conocida por sus impactantes escenas de posesión y suspenso, y ha dejado una marca indeleble en el género del terror desde su lanzamiento en 1973.",
    "Intensa Mente 2 expande la historia de Riley y sus emociones, explorando su crecimiento y desafíos mientras ofrece una aventura emocionante y reflexiva sobre la mente humana.",
    "La película de Mario Bros. sigue a Mario y Luigi en su misión para rescatar a la princesa Peach del malvado Rey Koopa en el Reino Champiñón.",
    "En La Monja, un sacerdote y una joven monja investigan un suicidio en un monasterio rumano y se enfrentan a una presencia demoníaca en forma de monja.",
    "En Proyecto X, tres amigos de la escuela secundaria organizan una fiesta masiva para ganar popularidad, pero las cosas se salen de control cuando miles de personas se presentan, desatando el caos."
];
//=======================================================================
//Arreglo de objetos informacion de peliculas
const movies = [
    { id: 1, title: "El Gato con botas", resena: "El Gato con Botas, con solo una vida restante debido a su amor por la aventura, busca desesperadamente al Último Deseo para recuperar las vidas perdidas.", sipnosis: "En El Gato con Botas el astuto felino busca desesperadamente al Último Deseo para recuperar las vidas perdidas debido a sus aventuras.", img: "../public/img/cartelera/gato_con_botas.jpg", imgDescription: "../public/img/description/gato-con-botas.png", description: arrayDescription[0], genero: "Infantil"},
    { id: 2, title: "El Exorcista", resena: "El Exorcista sigue la historia de una niña poseída y los intentos de un sacerdote por exorcizarla. Es un clásico del cine de terror.", sipnosis: "En El Exorcista, una niña es poseída por un demonio y un sacerdote realiza un exorcismo para salvarla. La película es conocida por su intensidad y se ha convertido en un clásico del cine de terror.", img: "../public/img/cartelera/exorcista.jpg", imgDescription: "../public/img/description/exorsista.png", description: arrayDescription[1], genero: "Terror"},
    { id: 3, title: "Intensa Mente", resena: "Intensa Mente 2 sigue las aventuras emocionales de Riley mientras crece, con Joy, Tristeza, Ira, Miedo y Asco, sus emociones, ayudándola a navegar por la adolescencia. Ofrece una mirada conmovedora y entretenida sobre el crecimiento personal y la amistad en el mundo de la mente humana.", sipnosis: "Intensa Mente 2 sigue a Riley mientras crece y enfrenta desafíos de la adolescencia, con sus emociones guiándola. Ofrece una perspectiva entretenida sobre el crecimiento personal y la importancia de las emociones.", img: "../public/img/cartelera/intensaMente.jpg", imgDescription: "../public/img/description/intensamente.png", description: arrayDescription[2], genero: "Infantil" },
    { id: 4, title: "Mario Bros", resena: "La película de Mario Bros. sigue a Mario y Luigi en su misión para rescatar a la princesa Peach del malvado Rey Koopa en el Reino Champiñón.", sipnosis: "La película de Mario Bros. sigue a los fontaneros Mario y Luigi en su aventura para rescatar a la princesa Peach del malvado Rey Koopa en el Reino Champiñón.", img: "../public/img/cartelera/mario.jpg", imgDescription: "../public/img/description/marioBross.png", description: arrayDescription[3], genero: "Infantil" },
    { id: 5, title: "La Monja", resena: "La Monja es una película de terror en la que un sacerdote y una joven monja investigan un suicidio en un monasterio rumano, encontrándose con una presencia demoníaca que los atormenta.", sipnosis: "La Monja sigue a un sacerdote y una joven monja que investigan un suicidio en un monasterio rumano, donde se enfrentan a una presencia demoníaca aterradora.", img: "../public/img/cartelera/monja.jpg", imgDescription: "../public/img/description/monja.png", description: arrayDescription[4], genero: "Terror"},
    { id: 6, title: "Proyecto X", resena: "Proyecto X es una película sobre tres amigos que organizan una fiesta masiva, desencadenando el caos cuando miles de personas asisten.", sipnosis: "Proyecto X sigue a tres amigos de la escuela secundaria que organizan una fiesta que rápidamente se sale de control cuando miles de personas asisten, desatando el caos en su vecindario.", img: "../public/img/cartelera/proyectox.jpg", imgDescription: "../public/img/description/project-x-movie-quotes-u1.jpeg", description: arrayDescription[5], genero: "Comedia"},
];
//Inicialización de Fuse.js
var fuse = new Fuse(movies, options);
//=======================================================================
//Nombres y apellidos para los comentarios
const nombres = ["Juan", "María", "Pedro", "Luisa", "Andrés", "Laura", "Carlos", "Ana", "Diego", "Sofía"];
const apellidos = ["García", "Martínez", "López", "González", "Rodríguez", "Pérez", "Sánchez", "Ramírez", "Torres", "Fernández"];
//Mediante la siguiente funcion generamos nombres aletorios para comentarios
function generarNombreAleatorio() {
    const nombreAleatorio = nombres[Math.floor(Math.random() * nombres.length)];
    const apellidoAleatorio = apellidos[Math.floor(Math.random() * apellidos.length)];
    return `${nombreAleatorio} ${apellidoAleatorio}`;
};
//=======================================================================
//Inicio y uso de Jquery
$(document).ready(function() {
    //Función para mostrar la lista de películas en la página inicial
    function displayMovies() {
        $.each (movies, function(index, movie) {
            movieList.append(
                `<div class="card-deck">
                    <div class="card">
                        <div class="card-body">
                            <a href="movie_detail.html?id=${movie.id}" style="text-decoration: none !important;">
                                <div class="card-body">
                                    <img src="${movie.img}" class="card-img-top">
                                    <hr>
                                    <p class="card-text">${movie.sipnosis}</p>
                                </div>
                            </a>
                        </div>                    
                    </div>        
                </div>`
            );
        });
    };
    //Llamar funcion
    displayMovies();
    //=======================================================================
    //Función para mostrar las películas según el género seleccionado    
    function displayMoviesByGenre() {
        $('#selectGenero').on('change', function() {
            var valorSelect = $(this).val(); //Obtener el valor seleccionado del elemento de selección
            //Limpiar el contenedor de películas antes de cambiar de genero
            movieList.empty();
            //Filtrar las películas según el género seleccionado
            var peliculasFiltradas = (valorSelect === "todos") ? movies : movies.filter(function(movie) {
                return movie.genero === valorSelect;
            });
            //Mostrar las cards de las películas filtradas
            $.each(peliculasFiltradas, function(index, movie) {
                movieList.append(
                    `<div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <a href="movie_detail.html?id=${movie.id}" style="text-decoration: none !important;">
                                    <div class="card-body">
                                        <img src="${movie.img}" class="card-img-top">
                                        <hr>
                                        <p class="card-text">${movie.sipnosis}</p>
                                    </div>
                                </a>
                            </div>                    
                        </div>        
                    </div>`
                );
            });
        });
    };
    //Ejecutar funcion para mostrar la o las peliculas filtradas
    displayMoviesByGenre();
    //=======================================================================
    //Boton de busqueda
    $('#searchMovie').on('submit', function(e){
        e.preventDefault();
        var searchValue = $('#search').val().trim().toLowerCase(); //Atrae dato proporcionado del input().Elimina espacios blanco adicionales().Todo a minuscula()
        movieList.empty();
        var resultado = fuse.search(searchValue);
        if(resultado.length > 0){
            $.each(resultado, function(index, item){
                var movie = item.item; //extraer el objeto original desde los resultados de Fuse.js.
                movieList.append(
                    `<div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <a href="movie_detail.html?id=${movie.id}" style="text-decoration: none !important;">
                                    <div class="card-body">
                                        <img src="${movie.img}" class="card-img-top">
                                        <hr>
                                        <p class="card-text">${movie.sipnosis}</p>
                                    </div>
                                </a>
                            </div>                    
                        </div>        
                    </div>`
                );
            }); 
        }else{
            movieList.append(
                `<h1>No se encontro algo relacionado</h1>`
            );
        };
    });
    //=======================================================================
    //PAGINA PARA DETALLES DE PELICULAS
    //Usar el ID de la película para obtener la información de la película correspondiente
    var movie = movies.find(function(movie) {
        return movie.id === parseInt(movieId);
    });
    //Mostrar los detalles de la película en la página SI ES VERDADERA
    if (movie) {
        //Aquí puedes mostrar la información de la película en la página, por ejemplo:
        $('#movieDetails').append(
            `<style>
                body{
                    background-image: url('${movie.imgDescription}');
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                };
            </style>
            <div class="row">
                <div class="col-12 mt-5 mb-4">
                    <h2><strong>${movie.title}</strong></h2>
                    <hr>
                </div>
                <div class="col-12 mt-5 mb-4">
                    <h2>Descripcion</h2>
                    <p>${movie.description}</p>
                </div>
            </div>`
        );
    }
    else {
        //Si no se encuetra pelicula
        $('#movieDetails').append('<p>La película no se encontró.</p>');
    };
    //=======================================================================
    //Comentarios pagina de DESCRIPTION
    $("#registerComment").on("click", function(e){
        e.preventDefault();
        var valorInput = $("#miInput").val();
        var estrHtml = 
        `<div class='card my-3'>
            <div class='card-body'>
                <h5 class='card-title'style="color: black;">${generarNombreAleatorio()}</h5>
                <p class='card-text' style="color: black;">${valorInput}</p>
            </div>
        </div>`;
        $("#comentarios").append(estrHtml);
    });
});