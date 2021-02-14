import React,{useState, useEffect} from 'react';
import {searchMovie} from '../../actions/movieAction';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';

import { useHistory } from "react-router-dom";

const Search = () => {
    const [value, setValue] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    
    const history = useHistory();

    useEffect(()=>{
        if(inputValue=="") {
            return undefined;
        }
        var movies = searchMovie(inputValue).then((res)=>{
            if(res.status==1) {
                setOptions(res.data.results);
            }
        });
    },[inputValue]);

    const getDetail = (id) => {
        history.push('/detail/'+id);
    }

    return (
        <div style={{marginTop:"10px"}}>
            <Autocomplete
                id="movie_search"
                className="search_input"
                getOptionSelected={(option, value) =>  option.name === value.name}
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.original_title)}
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                    setOptions(newValue ? [newValue, ...options] : options);
                    setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Search Movie" variant="outlined" fullWidth />
                )}
                renderOption={(option) => {
                    return (
                    <Grid onClick={(event)=>getDetail(option.id)} container alignItems="center">
                        <Grid item xs>
                        {option.original_title}

                        
                        </Grid>
                    </Grid>
                    );
                }}
                />

        </div>

    );
}

export default Search;