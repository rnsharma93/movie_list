import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {getDetail} from "../../actions/movieAction";
import {IMAGE_PATH} from '../../Constants';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';

import Backdrops from './Backdrops';

import './Detail.css'; 

const Detail = ({movie:{detail,error,loading},getDetail}) => {
    //detail = {};
    const params = useParams();
    const { id } = params;
    const [movieDetail,setMovieDetail] = useState({});
    useEffect(()=>{
        getDetail(id);
        /*
        if(data.length!=0) {
            checkData();
        } else {
            getDetail(id);
        }
        */
    },[id]);

    /*
    const checkData = () => {
        data.forEach(item => {
            console.log(item);
            if(item.id==id){
                setMovieDetail(item);
            }
        });
    }
    */

    return(
        <div style={{width:"100%"}}>
            {loading && (<CircularProgress />)}
            {!loading && error=='' && detail && (
                <div className="detail" style={{backgroundImage:`url(${IMAGE_PATH}/${detail.backdrop_path})`}}>
                    <div className="detail_bg">
                        <div className="detail_poster">
                            <img src={`${IMAGE_PATH}${detail.poster_path}`} />
                        </div>
                        <div className="detail_detail">
                            <h1 className="heading">{detail.original_title}</h1>
                            <p>
                                <ul>
                                    <li>{detail.release_date} . </li>
                                    {detail.genres && (
                                        <li>
                                        {
                                            detail.genres.map((item)=>{
                                                return item.name +" ";
                                            })
                                        }
                                         . 
                                        </li>
                                    )}
                                    <li>{detail.runtime}M</li>    
                                </ul>    
                            </p>
                            <p className="tagline">
                                {detail.tagline}
                            </p>
                            <h3 className="overview">Overview</h3>
                            <h5>{detail.overview}</h5>
                            {detail.homepage && (
                                <div className="website">
                                    <h3>Website</h3>    
                                    <p><a href={detail.homepage} target="_blank">Click Here</a></p>   
                                </div>
                                
                            )}
                        </div>
                    </div>
                </div>
                

            )}
            {!loading && error=='' && detail && (
                <div className="backdrops_container">
                    <Backdrops movieId={detail.id}/>
                </div>
            )}
            {error && (
                <h1 style={{color:"Red",textAlign:"center"}}>{error}</h1>
            )}
        </div>

    );
}

const mapStateToProps = (state) => ({
    movie: state.movie,    
});

export default connect(mapStateToProps,{getDetail}) (Detail);