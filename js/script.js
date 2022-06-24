function searchMov() {
    $('#daftar-film').html('')
    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey':'212a4d7e',
            's':$('#search_input').val()
        },
        success: function (result) {
            if (result.Response === 'True') {
                let movies = result.Search;
                $.each(movies, function (i , data) {
                    
                    $('#daftar-film').append(`
                    <div class="col-md-3">
                    <div class="card">
                        <img src="` + data.Poster +`" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">` + data.Title +  `</h5>
                            <a href="#" class="btn btn-outline-primary "id="see-detail" data-id="`+ data.imdbID +`" data-bs-toggle="modal" data-bs-target="#exampleModal">Take A look!</a>
                        </div>
                        </div>
                  </div>
                    `);

                    $('#search_input').val('');
                });
            } else{
                $('#daftar-film').html(`
                <div class="col text-center mt-5">
                    <h1 class="text-center text-danger">` + result.Error + `</div>
                </div>
                `);
            }
        }
    });

}


$('#button-submit').on('click',function (isi) {
    searchMov();
})
$('#search_input').on('keyup',function (event) {
    if(event.keyCode === 13){
        searchMov();
    }
})
//menggunakan event binding !!
// event binding digunakan ketika kita mau menggunakan elementnya nanti atau setelah di generate

$("#daftar-film").on('click','#see-detail',function() {
    $.ajax({
        url:'http://www.omdbapi.com',
        dataType:'json',
        type:'get',
        data:{
            "apikey":'212a4d7e',
            "i": $(this).data("id"),
        },
        success: function (hasil) {
            
            if (hasil.Response === "True") {
                $("#Title-modal").html(`
                <h5 class="modal-title">` + hasil.Title + `</h5>
                `)
                $("#body-modal").html(`
                <div class="col-md-4">
                <img class="img-fluid" src="` + hasil.Poster + `" alt="">
              </div>
              <div class="col-md-8">
                <ul class="list-group">
                  <li class="list-group-item">
                    <h4 class="fw-bold"><span class="fw-bold text-uppercase">Writer</span> : `+ hasil.Writer +`</h4>
                  </li>
                  <li class="list-group-item"><span class="fw-bold text-uppercase">plot</span> : ` + hasil.Plot + `</li>
                  <li class="list-group-item"><span class="fw-bold text-uppercase">Actor</span> : ` + hasil.Actors +`</li>
                  <li class="list-group-item"><span class="fw-bold text-uppercase">genre</span> : ` + hasil.Genre + `</li>
                  <li class="list-group-item"> <span class="fw-bold text-uppercase">Released</span> : `+ hasil.Released+`</li>
                </ul>
              </div>
                `)
            }else{
                $("#Title-modal").value('NOT FOUND')
            }
        }
    }

    )
})

// "Title": "Harry Potter and the Sorcerer's Stone",
//     "Year": "2001",
//     "Rated": "PG",
//     "Released": "16 Nov 2001",
//     "Runtime": "152 min",
//     "Genre": "Adventure, Family, Fantasy",
//     "Director": "Chris Columbus",
//     "Writer": "J.K. Rowling, Steve Kloves",
//     "Actors": "Daniel Radcliffe, Rupert Grint, Richard Harris",
//     "Plot": "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
//     "Language": "English, Latin",
//     "Country": "United Kingdom, United States",
//     "Awards": "Nominated for 3 Oscars. 17 wins & 69 nominations total",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BMzkyZGFlOWQtZjFlMi00N2YwLWE2OWQtYTgxY2NkNmM1NjMwXkEyXkFqcGdeQXVyNjY1NTM1MzA@._V1_SX300.jpg",