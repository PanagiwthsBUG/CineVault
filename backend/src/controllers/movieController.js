const pool = require("../db/db");


const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM movies
      ORDER BY title;
      `
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching movies:", error);

    res.status(500).json({
      error: "Internal server error",
    });
  }
};

const {
  searchMovies,
  getMovieDetails,
} = require("../services/omdbService");



const searchMovie = async (req,res)=>{

try {

  const {query}=req.query;


  if(!query){
    return res.status(400).json({
      error:"Query required"
    });
  }


  const movies = await searchMovies(query);


  res.json(movies);


}
catch(error){

 console.error(error);

 res.status(500).json({
   error:"OMDb error"
 });

}

};




const movieDetails = async(req,res)=>{


try{

 const {id}=req.params;


 const movie =
 await getMovieDetails(id);


 res.json(movie);


}
catch(error){

 console.error(error);

 res.status(500).json({
  error:"OMDb error"
 });

}

};

const saveMovie = async (req,res)=>{

try{


const {
  imdbID,
  Title,
  Year,
  Poster
} = req.body;



if(!imdbID || !Title){

 return res.status(400).json({
  error:"Invalid movie data"
 });

}



const existing =
await pool.query(
`
SELECT *
FROM movies
WHERE tmdb_id = $1
`,
[
 imdbID
]
);



if(existing.rows.length > 0){

 return res.json(
  existing.rows[0]
 );

}




const result =
await pool.query(
`
INSERT INTO movies
(
 tmdb_id,
 title,
 release_year,
 poster_url
)

VALUES
(
 $1,
 $2,
 $3,
 $4
)

RETURNING *
`,
[
 imdbID,
 Title,
 parseInt(Year),
 Poster
]
);



res.status(201).json(
 result.rows[0]
);



}catch(error){

console.error(error);

res.status(500).json({
 error:"Database error"
});

}

};

module.exports={
 searchMovie,
 movieDetails,
 saveMovie,
};