import React, { useState, useEffect } from 'react';
import "./RowPost.css";
import { API_KEY, imageUrl } from '../../Constants/constants';
import axios from '../../axios';
import YouTube from 'react-youtube';

const RowPost = (props) => {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url).then(response => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, []);  

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0, // Don't autoplay the video
    }
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
      console.log(response.data);
      if (response.data.results && response.data.results.length > 0) {
        setUrlId(response.data.results[0]);
      } else {
        console.log('No video available');
      }
    });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className="posters">
        
      {movies.map((obj)=>{

        return <img 
        onClick={()=> handleMovie(obj.id)} 
        src={`${imageUrl+obj.backdrop_path}`} alt="poster" 
        className={props.isSmall ? "smallPoster":"poster"} />

        })}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
};

export default RowPost;
