let url = "https://striveschool.herokuapp.com/api/movies/"


const getMovies= async (genre) => {
    let response = await fetch(url+genre,  {
        "method": "GET",
        "headers": {
            "Authorization": "Basic " + btoa('user27:ZGDWyFCA8umbgpvZ')}
        })
    try {
        if(response.ok) {
          
             let data = await response.json()
            return data          
        }
    }catch(error) {
        return error;
    }
    
}


const getMovieById =async(genre, id) => {
    let response = await fetch(url+genre, {
        "method": "GET",
        "headers": {
            "Authorization": "Basic " + btoa('user27:ZGDWyFCA8umbgpvZ')}
        })
    try {
        if(response.ok) {
          
             let data = await response.json()
            data.find(movie => movie._id=id)
            return data          
        }
    }catch(error) {
        return error;
    }
}
const saveMovie = async (agendaEvent) => {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(agendaEvent),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa('user27:ZGDWyFCA8umbgpvZ')
      }),
    });
    return response;
  };

  const deleteMovie =async (id) => {
     
    try {
       let response = await fetch(url + id, {
           method: "DELETE",
           "headers": {
               "Authorization": "Basic " + btoa('user27:ZGDWyFCA8umbgpvZ')},
         
       });
       if(response.ok) {
           
       }
    }catch (error) {
        alert ('can not delete')
    }
  
}

  const handleSubmit = async() => {
    event.preventDefault();
    submitMovie();
  }


 const submitMovie = async() => {
     let titleInput = document.querySelector('#title')
     let descInput = document.querySelector('#description')
     let imgInput = document.querySelector('#imgUrl')
     let imgLgInput =document.querySelector('#img_lg_url')
     let logoInput = document.querySelector('#logoUrl')
     let genreInput = document.querySelector('#genre')

     let movieObj = {
        name:titleInput.value,
        description:descInput.value,
        category: genreInput.value,
        imageUrl: [imgInput.value, imgLgInput.value, logoInput.value].join(', ')
     }
     console.log(movieObj)
    
        let response = await saveMovie(movieObj)
    
        let resp = await response.json()
        console.log(resp)

 }

 const displayList= async() => {
   
     let tableBody = document.querySelector('.movie-list tbody')
     let selector =  document.getElementById("filter-by-genres");
     tableBody.innerHTML = ''
     let data
     try {
        data = await getMovies('comedy')
        data.forEach(movie => {
            console.log(_.words(movie.imageUrl, /[^, ]+/g))
            tableBody.innerHTML+=createRow(movie)
        });
        selector.addEventListener('change', async function(event) {
            if(event.target.value==="drama") { 
                tableBody.innerHTML = ''
                data = await getMovies('drama')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, /[^, ]+/g))
                    tableBody.innerHTML+=createRow(movie)
                });
            }else if (event.target.value==="comedy") {
                tableBody.innerHTML = ''
                data = await getMovies('comedy')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, /[^, ]+/g))
                    tableBody.innerHTML+=createRow(movie)
                });
            } else if (event.target.value==="horror") {
                tableBody.innerHTML = ''
                data = await getMovies('horror')
                data.forEach(movie => {
                    console.log(_.words(movie.imageUrl, /[^, ]+/g))
                    tableBody.innerHTML+=createRow(movie)
                });
             } 
        
        
        }) 
       
        console.log(data)  
     } catch(e) {

     }
 }


 const createRow =(movieInfo)=> {
    let row=`
    <tr>
      <th scope="row">${movieInfo._id}</th>
      <td>${movieInfo.name}</a></td>
      <td>${movieInfo.description}</td>
      <td>${movieInfo.category}</td>
      <td ><img src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[0]}" alt="" class="image-fluid" style="max-width: 5rem;"></td>
      <td><img src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[1]}" alt="" class="image-fluid" style="max-width: 5rem;"></td>
      <td><img src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[2]}" alt="" class="image-fluid" style="max-width: 5rem;"></td>
      <td><a type="button"  class="btn btn-primary">Update</a></td>
      <td><button type="button" onclick="deleteMovie('${movieInfo._id}')" class="btn btn-danger">Delete</button></td>
    </tr>
    `
    return row;
  }
 

  const addToCarousel=async() => {
    let filmCarousel= document.querySelector(".recommended .carousel")
    filmCarousel.innerHTML+=''
    let data =await getMovies('comedy')
    data.slice().reverse().forEach(movie=>{
        filmCarousel.innerHTML+=createCarouselItem(movie)
    })
    let films =document.querySelectorAll('.film')
    fullInfo(films)

  }

  const createCarouselItem =(movieInfo) => {
    let element=`
        <div class="film" id="${movieInfo._id}">
            <a href="#"><img src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[0]}" alt=""></a>
            <div class="card-img-overlay imageTitle">
                <i class="fa fa-play" style="position:absolute; left:15px; top:40%; cursor:pointer; font-size:25px; color:white"></i>
            <h5 class="card-title" style=" position:absolute; left:15px; top:70%">${movieInfo.name}</h5>
            <a class="addToList"   style="background-color:transparent; color:whitesmoke; position:absolute; right:15px; top:65%; cursor:pointer">
                <i class="fa fa-plus-square-o" style="font-size:24px"></i>
                </a>
            </div>
        </div>
    `;
    return element;
  }

  const fullInfo = async (films)=> {
    films.forEach((film, index)=> {
        film.addEventListener('click', async function() {
            console.log(film.id)
           let data = await getMovieById('comedy', film.id)
           console.log(data)
            displayFullInfo(data[0])
            
            let filmWrapper=document.querySelectorAll(".film-wrapper")
            let image=document.querySelectorAll(".img-content")
            let closeBtn = document.querySelectorAll(".close")
            closeBtn.forEach((element, index) => {
            element.addEventListener('click', function() {
            
            let filmElement=filmWrapper[index]
            let imgContent = image[index]
            filmElement.remove();
            imgContent.remove()
            })
        });
            
        })
        }); 
  }

const displayFullInfo = (movieInfo)=> {
    let row=document.querySelectorAll(".chosenFilm")
    row[0].innerHTML=''
  
          let element= `
     <div class=" row film-wrapper w-100">
         <div class="col-4">
            
             
                 <div class="px-4">
                     <img class="img-fluid" src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[2]}" />
                   
                 </div>
 
                 <h4 class="mx-4 my-4">2010 <span class="mx-2">8 seasons</span></h4>
                 <p class="mt-4 mx-4" style="flex-wrap: wrap; color:#666666; font-size: 1.4rem; font-weight: 300;">${movieInfo.description}</p>
                     <button type="button" class="btn mx-4" style="background-color:whitesmoke; font-size: 1.1rem; font-weight: bold; padding: 10px 15px;"><i class="fa fa-play" ></i>RESUME</button>
                     <button type="button" class="btn btn-secondary " style="font-size: 1.3rem; font-weight: bold; padding: 10px 15px;" ><i class="fa fa-check-square-o"></i>MY LIST</button>
         </div>
 
             <div class="col-8 img-content w-100" style=" position: relative; box-shadow: inset  130px 0 80px 0px  #141414; "   > 
                 <button type="button " class="close" aria-label="Close" style="position:absolute; z-index:1; right:10px; top:10px; ">
                 <span style="font-size:1.5rem" aria-hidden="true">&times;</span>
                 </button>
                 <img src="${_.words(movieInfo.imageUrl, /[^, ]+/g )[1]}" style="position:relative; z-index: -1; width: 100%; height: 600px; object-fit:cover;" />
             </div>
     </div>
 
     `;
     row[0].innerHTML=element   
   
}

  function displayFilm(films, filmsNames) {

    films.forEach((film, index)=> {
    film.addEventListener('click', function() {
        let filmTitle=filmsNames[index].innerText
        console.log(filmTitle)
        showPickedFilm(filmTitle);
        console.log(filmList[index].description)

            let filmWrapper=document.querySelectorAll(".film-wrapper")
            let image=document.querySelectorAll(".img-content")
            let closeBtn = document.querySelectorAll(".close")
            closeBtn.forEach((element, index) => {
            element.addEventListener('click', function() {
            
            let filmElement=filmWrapper[index]
            let imgContent = image[index]
            filmElement.remove();
            imgContent.remove()
            })
        });
    })
    });
}

function showPickedFilm(filmTitle) {
    let row=document.querySelectorAll(".chosenFilm")
   filmList.forEach(film => {
       if(film.name===filmTitle) {
         let Element= `
    <div class=" row film-wrapper">
        <div class="col-4">
           
            
                <div class="px-4">
                    <img class="img-fluid" src="./img/${film.logo}" />
                  
                </div>

                <h4 class="mx-4 my-4">${film.year} <span class="mx-2">8 seasons</span></h4>
                <p class="mt-4 mx-4" style="flex-wrap: wrap; color:#666666; font-size: 1.4rem; font-weight: 300;">${film.description}</p>
                    <button type="button" class="btn mx-4" style="background-color:whitesmoke; font-size: 1.1rem; font-weight: bold; padding: 10px 15px;"><i class="fa fa-play" ></i>RESUME</button>
                    <button type="button" class="btn btn-secondary " style="font-size: 1.3rem; font-weight: bold; padding: 10px 15px;" ><i class="fa fa-check-square-o"></i>MY LIST</button>
        </div>

            <div class="col-8 img-content" style=" position: relative; box-shadow: inset  130px 0 80px 0px  #141414; "   > 
                <button type="button " class="close" aria-label="Close" style="position:absolute; z-index:1; right:10px; top:10px; ">
                <span style="font-size:1.5rem" aria-hidden="true">&times;</span>
                </button>
                <img src="img/${film.image_lg}" style="position:relative; z-index: -1; width: 100%; height: 600px; object-fit:cover;" />
            </div>
    </div>

    `;
    row[0].innerHTML=Element   
       }
   });
   
    
}