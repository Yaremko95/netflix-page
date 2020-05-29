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
 