import React,{useEffect, useState} from 'react';
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {API_URL} from '../../Constants';
import {getMovies} from "../../actions/movieAction";

import { useParams } from "react-router-dom";

import { CircularProgress, Grid, Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import Movie from '../Movie/Movie';
import './Home.css';




const Home = ({movie: {cur_page,loading,data,total_page},getMovies}) => {
    const params = useParams();
    let { page } = params ;
    
    if(page==undefined || page<1) {
        page=1;
    } 
    
    if(page>total_page){
        page=total_page;
    }
    
    //const [page,setPage] = useState(params.page);

    useEffect(()=>{
        if(data.length==0) {
            getMovies(page);
        }
    },[data.length]);

    useEffect(()=>{
        getMovies(page);
    },[page]);

    

    return(
        <div>
            <h1 className="home__center">Movies List</h1> 
            {loading && (
               <div className="home__loading">
                   <CircularProgress/>
               </div> 
            )}
            {data.length>0  && (
                <div className="home__container">
                    <div className="movie_list">
                        {
                            data.map((item,key)=>{
                            return (<Movie key={key} details={item} />); 
                            })
                        } 
                    </div>
                    <div className="home__pager">
                        <Grid container  spacing={3}>
                            <Grid item xs={6}>
                                {page>1 && 
                                    (<Link to={`/${page-1}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<ArrowBackIcon />}
                                        >
                                            Prev
                                        </Button>
                                    </Link>)
                                }
                                
                            </Grid>
                            <Grid style={{textAlign:"right"}} item xs={6}>
                                {page<total_page &&
                                    (<Link to={`/${parseInt(page)+1}`}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            endIcon={<ArrowForwardIcon />}
                                        >
                                            Next
                                        </Button>
                                    </Link>)
                                }
                            </Grid>
                        </Grid>     

                    </div>
                    
                </div>    
            )}
           
        </div>
    );

}

const mapStateToProps = (state) => ({
     movie: state.movie,
  });

export default connect(mapStateToProps,{getMovies})(Home);
