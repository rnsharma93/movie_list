import React,{useEffect, useState} from 'react';
import { CircularProgress } from '@material-ui/core';

import {getImages} from '../../actions/movieAction';

import {BACKDROP_PATH} from "../../Constants";
import './Backdrop.css';

const Backdrops = ({movieId}) => {
    const [error,setError] = useState();
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(1);
    useEffect(()=>{
       let data = getImages(movieId).then((res)=>{
          setLoading(0);
          if(res.status==1) {
            setData(res.data);
            //console.log(data);
          } else if(res.status==0) {
              setError(res.data);
          }
       });
       
    },[movieId]);
    return(
        <div className="backdrop"> 
            {loading==1 && (<CircularProgress />)}
            {loading==0 && (
                <React.Fragment>
                    { data.backdrops &&
                    data.backdrops.map((item,key)=>{
                        return <img key={key} src={`${BACKDROP_PATH}/${item.file_path}`} />;
                    })
                    }  

                </React.Fragment>       
            )}
            {loading==0 && error && (
                <div>{error}</div>
            )}
        </div>
    );
}

export default Backdrops;