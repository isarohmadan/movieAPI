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
                            <a href="` + data.imdbID +`" class="btn btn-outline-primary">Take A look!</a>
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