let url = "https://striveschool.herokuapp.com/api/movies/"

const getMovies= async () => {
    let response = await fetch(url,  {
        "method": "GET",
        "headers": {
            "Authorization": "Basic " + btoa('user27:ZGDWyFCA8umbgpvZ')}
        })
    try {
        if(response.ok) {
          
             let data = await response.json()
             console.log(data)
            
            
        }
    }catch(error) {

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
        imageUrl: [imgInput.value, imgLgInput.value, logoInput.value].join(' ')
     }
     console.log(movieObj)
    
        let response = await saveMovie(movieObj)
    
        let resp = await response.json()
        console.log(resp)

     
     
 }