import { TextField, Typography,Button, Box, Paper, Grid, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { weatherstyle } from "./weatherStyle";
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import img3 from "../src/assets/mix weather.gif";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import img4 from "../src/assets/WeatherIcons.gif";
import { ToastContainer, toast } from "react-toastify";
import { css } from "glamor";
import "react-toastify/dist/ReactToastify.css";
import rainy from "../src/assets/rainny.gif";
import winter from "../src/assets/winter weather.gif";
import summer from "../src/assets/sunnyweather.gif";
import clear from "../src/assets/clearweather.gif";
import mix from "../src/assets/mix weather.gif";
import cloud from "../src/assets/cloud.gif"

export default function WeatherApp() {
    const [location, setLocation] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [error, setError] = useState("");
    const [data, setData] = useState<any>({});
    const apiKey = "37182061550743baa4c192300241304";
    const formatDate = (date:any) => {
        const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    const locationChange = (e:any) => {
        setLocation(e.target.value);
        console.log(e.target.value)
    };
    const enteredLocation = location;
    const searchClick = () => {
        
        fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.error) {
                    notifyError()
                    setError("No matching location found ?")
                    setLocation("");
                } else {
                    setError("")
                    setData(data);
                    setError("");
                    setLocation("");
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Error fetching data");
            });
    };
    const getWeatherImage = (conditionText:any) => {
        switch (conditionText) {
            case "Mist":
                return mix;
            case "Sunny":
                return summer;
            case "Clear":
                return clear;
            case "Partly cloudy":
                return winter;
            case "Light rain":
                return rainy;
                case "Partly Cloudy":
                return cloud;
            case "Patchy rain nearby":
                return rainy ;    
            
        }
    };
    
    const notifySuccess = () =>
        toast.success("Sign up Sucess...", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        //   className: css({
        //     background: "#1ab394 !important"
        //   })
        });
        const notifyError = () => {
          toast.error("No matching location found", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            // className: css({
            //   background: "#ed5565 !important"
            // })
          });
        };

    return (
        <>
        <Paper elevation={7} sx={weatherstyle.mainbox}>
            <Box sx={weatherstyle.mainbox2}>
                <Grid container sx={weatherstyle.maingrid}>
                      <Grid item md={7} >

                         <Box sx={weatherstyle.mainimg}>
                           <Box sx={{flexDirection:"column",display:"flex",alignItems:"center",justifyContent:"right",ml:60}}>
                           <Typography sx={{fontSize:30,color:"white",letterSpacing:1,fontWeight:700}}>Connaught Place</Typography>
                           {data.location && (
                          <Typography sx={{color:"white",fontSize:20,ml:17,fontWeight:700}}>{data.location.region}</Typography>
                          )}
                           </Box>

                           <Box>
                            <Box sx={{mt:60,display:"flex",alignItems:"center",justifyContent:"space-around"}}>
                                <Box>
                                    <Typography sx={{fontSize:23,color:"white",fontWeight:600}}>{currentTime.toLocaleTimeString()}</Typography>
                                    <Typography sx={{letterSpacing:1,fontSize:15,color:"white",fontWeight:600}}>{formatDate(currentTime)}</Typography>
                                </Box>
                                <Box>
                                {data.location && (
                                    <Box sx={{display:"flex",alaignItems:"center",justifyContent:"center",gap:2}}>
                                    <Typography sx={{color:"white",fontSize:70,ml:24,fontWeight:700}}>{data.current.temp_c}</Typography>
                                    <PanoramaFishEyeIcon sx={{color:"white",fontSize:20,fontWeight:700,mt:3,ml:-2}}/>
                                    <Typography sx={{fontSize:35,fontWeight:700,mt:4,ml:-2,color:"white"}}>C</Typography>
                                    </Box>
                                    )}  
                                            </Box>  
                            </Box>

                           </Box>
                           
                         </Box>
                      </Grid>
                      <Grid item md={5}  sx={weatherstyle.leftgrid}>
                             <Box sx={weatherstyle.innerbox}>
                               {data.location?<>
                               
                                {data.location && (
                               <Box component={"img"} src={getWeatherImage(data.current.condition.text)} sx={{ height: 130, width: 130, borderRadius: 30 }}></Box>
                                 )} 
                               </>:
                                <Box component={"img"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_VhI45RJ7c5FibgUSiT-e6wMYB_1NUjIDjA&s"} sx={{ height: 130, width: 130, borderRadius: 30 }}></Box>
                               }
                                {data.location && (
                               <Typography sx={{color:"white",fontSize:30,fontWeight:700}}>{data.current.condition.text}</Typography>
                                 )}
                               <hr style={{width:"160%",marginLeft:"-80px"}}/>
                               <TextField
                                id="input-with-icon-textfield"
                                label="Search any city"
                                value={location}
                                sx={{color:"white",ml:1,width:"450px",borderColor:"white","& .MuiOutlinedInput-root": {
                                    "&.MuiInputBase-root fieldset": {
                                      borderColor: "white",
                                    },
                                  },}}
                                onChange={locationChange}
                                InputLabelProps={{
                                    style: { color: 'white',border:"white" },
                                }}
                                InputProps={{
                                    sx: {
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'white',
                                        },
                                        color: 'white',
                                    },
                                    
                                startAdornment: (
                                    <InputAdornment position="end">
                                    <SearchIcon  sx={{position:"absolute",left:420,fontSize:30,color:"white","&:hover":{cursor:"grab"}}} onClick={searchClick}/>
                                    </InputAdornment>
                                ),
                                }}
                                variant="standard"
                                 />
                                 <Typography sx={{color:"red",height:20}}>{error}</Typography>
                                <Box >
                                {data.location && (
                                    <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",gap:2,height:40,width:400}}>
                                         <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>{data.location.name},{data.location.region}</Typography>
                                        <Box component={"img"} src={img4} sx={{height:50,width:60}}></Box>
                                    </Box>    
                                 )}   
                                </Box>
                                <hr style={{width:"160%",marginLeft:"-80px"}}/>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:25,height:30,width:400}}>
                                <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>Temprature</Typography>
                                {data.location && (
                                    <Box >
                                        
                                         <Box sx={{display:"flex",alaignItems:"center",justifyContent:"center",gap:2,ml:3}}>
                                        <Typography sx={{color:"white",fontSize:15,fontWeight:700}}>{data.current.temp_c}</Typography>
                                        <PanoramaFishEyeIcon sx={{color:"white",fontSize:9,fontWeight:700,ml:-2}}/>
                                        <Typography sx={{fontSize:12,fontWeight:700,mt:0.5,ml:-2,color:"white"}}>C</Typography>
                                        <Typography sx={{color:"white"}}>({data.current.condition.text})</Typography>
                                        </Box>
                                        
                                    </Box>    
                                 )}   
                                </Box>
                                <hr style={{width:"160%",marginLeft:"-80px"}}/>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:35,height:30,width:400}}>
                                <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>Humidity</Typography>
                                {data.location && (
                                    <Box >
                                         
                                        <Typography sx={{color:"white"}}>{data.current.humidity}%</Typography> 
                                    </Box>    
                                 )}   
                                </Box>
                                <hr style={{width:"160%",marginLeft:"-80px"}}/>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:35,height:30,width:400}}>
                                <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>Visibility</Typography>
                                {data.location && (
                                    <Box >
                                        
                                        <Typography sx={{color:"white"}}>{data.current.pressure_mb}mb</Typography> 
                                    </Box>    
                                 )}   
                                </Box>
                                <hr style={{width:"160%",marginLeft:"-80px"}}/>
                                <Box  sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:37,height:30,width:400}}>
                                <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>Cloud</Typography>
                                {data.location && (
                                    <Box>
                                         
                                        <Typography sx={{color:"white"}}>{data.current.cloud}%</Typography> 
                                    </Box>    
                                 )}   
                                </Box>
                                <hr style={{width:"160%",marginLeft:"-80px"}}/>
                                <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",gap:30,height:30,width:400}}>
                                <Typography sx={{color:"white",fontSize:20,fontWeight:700}}>WindSpeed</Typography>
                                {data.location && (
                                    <Box >
                                         
                                        <Typography sx={{color:"white"}}>{data.current.wind_kph
                                       }kph</Typography> 
                                    </Box>    
                                 )}   
                                </Box>

                            </Box>

                     
                      </Grid>
                    
                </Grid>

            </Box>
            <ToastContainer/>

        </Paper>
           
        </>
    );
}
