"use client"; 
import React,{useState,useEffect} from 'react';
import { useForm, Controller } from "react-hook-form"
import response from "./response";
import './page.css';

import {
  FormControl,
  FormLabel,
  TextField,
  MenuItem,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Button
} from "@mui/material";

//import {makeStyles} from '@mui/styles';

const myHelper = {
  required:"Required",
};

const Error = ({children}) => <p style={{ color: "red" }}>{children}</p>;

const Input = ({ value, onChange, type, list, ...rest }) => {
  switch (type) {
    case "TEXT":
      return (
        <TextField
          variant="outlined"
          type="text"
          onChange={onChange}
          value={value}  
          size="small"                
          />
      );
    case "LIST":
      return(
       <Select value={value} onChange={onChange}>
          {list && list.length > 0 && list?.map((val, index) => (
            <MenuItem value={index} key={index}>{val}</MenuItem>
          ))}
        </Select>
        );
    case "RADIO":
      return (
        <RadioGroup
          value={value}
          onChange={onChange}
        >
          {list && list.length > 0 && list?.map((val) => (
            <FormControlLabel
              value={val}
              control={<Radio />}
              label={val}
            />
          ))}
        </RadioGroup>
      );

    default:
      return null;
  }
};

/*const useStyles = makeStyles({
  root: {
    display: "flex",    
   justifyContent: "space-between",
  },
});*/

export default function Home() {

  const [userVal,setUserVal] = useState({});
  const {control,handleSubmit,formState: { errors }} = useForm({reValidateMode:'onBlur'});
  //const classes = useStyles();

  const onSubmit = (data:any) => {
    //data.preventDefault();
    console.log(data);
    console.log(errors);
  }

  const handleChange = (e:any ) =>{
    setUserVal((userVal)=>(
      {...userVal,[e.target.name]:e.target.value}
    )
    )
    console.log(errors);
    console.log("userVal:",userVal);
  }

  return (
    <div className="Signup-form">
    <h1>Sign Up Form</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="grid-container">
      <Grid container>
        {response.data.length > 0 &&
          response.data.map((dataItem) => (
            <React.Fragment key={dataItem.id}>
                <Grid item xs={12} rowSpacing={2}>
                  <FormControl margin="dense" >
                    <FormLabel>{dataItem.name}</FormLabel>
                    <Controller 
                    control={control}
                    name={dataItem.name}
                    rules={{ required: dataItem.required,minLength:dataItem.minLength,maxLength:dataItem.maxLength }}
                    defaultValue={dataItem.fieldType === 'RADIO' ? dataItem.listOfValues1[dataItem.defaultValue] :dataItem.defaultValue}
                    render={({field,fieldState:{error}}) =>(
                      <Input
                      {...field}
                      type={dataItem.fieldType}
                      name={dataItem.name}
                      list={dataItem.listOfValues1}
                      onChange={field.onChange}
                      value={field.value}                  
                    />
                    )}
                    />
                    {errors[dataItem.name]?.type === 'required' ? 
                    <Error>This field is required</Error>: 
                    errors[dataItem.name]?.type === 'minLength' ?
                    <Error>minLength required:{dataItem.minLength}</Error> :
                    errors[dataItem.name]?.type === 'maxLength' ?
                    <Error>maxLength :{dataItem.maxLength}</Error> : ''
                  }
                  </FormControl>
                </Grid>
             
            </React.Fragment>
          ))}
          <Grid item xs={12}>
          <Button variant="outlined" type="submit">Submit</Button>
          </Grid>
           
      </Grid>
    </form>
  </div>
  )
}
