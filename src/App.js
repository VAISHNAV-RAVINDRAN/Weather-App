import './App.css';
import React, { useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function App() {
  const [textValue, setTextValue] = useState('');
  const [buttonClickedValue, setButtonClickedValue] = useState(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [place, setplace] = useState('');
  const [lon, setlon] = useState('');
  const [lat, setlat] = useState('');
  const [pressure, setpre] = useState('');
  const [temp, settemp] = useState('');
  const [humidity, sethum] = useState('');
  const [desc, setdesc] = useState('');
  const [main, setmain] = useState('');
  const [windspeed, setspeed] = useState('');
  const textfieldValue = (event) => {
    setTextValue(event.target.value);
  };
  const searchButtonClick = () => {
    setButtonClickedValue(textValue);
    setButtonClicked(true);
  };
  useEffect(() => {
    if(buttonClicked){
      const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+buttonClickedValue+"&appid=c27a543c28abf4196a275066f6aac4c9";
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            var a = JSON.stringify(data);
            var b = JSON.parse(a);
            console.log(b)
            setplace(b.name);
            setlon(b.coord.lon);
            setlat(b.coord.lat);
            sethum(b.main.humidity);
            setpre(b.main.pressure);
            settemp(Math.floor((b.main.temp) - 273.15));
            setdesc(b.weather[0].description);
            setmain(b.weather[0].main);
            setspeed(b.wind.speed);
            console.log(place,lon,lat,humidity,pressure,temp,desc,main,windspeed);
          })
          .catch(error => console.error(error));
    }
  });
    return (
      <Box
      sx={{
        width:'auto',
        maxWidth: '100%',
        padding:'1rem',
        fontFamily:'sans-serif',
        fontWeight:'bolder'
      }}
    >
    <center><h1 style={{color:'dodgerblue',fontWeight:'bolder',fontFamily:'sans-serif'}}>Weather APP</h1></center><br></br>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <TextField id="outlined-basic"  value={textValue} onChange={textfieldValue} label="Search Locations" variant="outlined" sx={{width:300}} />&nbsp;&nbsp;
        <Button variant="contained" onClick={searchButtonClick} sx={{padding:'1rem'}}>Search</Button>
      </div><br></br>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
          <h1 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/glyph-neue/480/FF4500/region-code.png"  width="50px" height="50px"/>&nbsp;{place}</h1>
          <h3 style={{display:'flex',alignItems:'center',justifyContent:'center'}}>Weather : {desc}</h3>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/dusk/480/null/map-editing.png" width="20px" height="20px"/>&nbsp;&nbsp;Longitude : {lon}</h4>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/dusk/480/null/map-editing.png" width="20px" height="20px"/>&nbsp;&nbsp;Latitude : {lat}</h4>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/external-filled-outline-design-circle/480/null/external-Humidity-weather-filled-outline-design-circle.png"  width="20px" height="20px"/>&nbsp;&nbsp;Humidity : {humidity}</h4>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/color/480/null/atmospheric-pressure.png"  width="20px" height="20px"/>&nbsp;&nbsp;Pressure : {pressure}</h4>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/color-glass/480/null/temperature.png" width="20px" height="20px"/>&nbsp;&nbsp;Temparature : {temp} Celsius</h4>
          <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src="https://img.icons8.com/external-flaticons-flat-flat-icons/480/null/external-wind-renewable-energy-flaticons-flat-flat-icons.png" width="20px" height="20px"/>&nbsp;&nbsp;Wind Speed : {windspeed}</h4>
      </CardContent>
    </Card>
    </Box>
    );
  }
export default App;