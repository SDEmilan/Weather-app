import img from "../src/assets/background1.jpg";
import img1 from "../src/assets/city.jpg"

export const weatherstyle={
    mainbox:{
        width:"100%",
        height:"96vh",
        backgroundColor:"black",
        borderRadius:10
    },
    mainbox2:{
        width:"95%",
        margin:"2.5%",
        height:"100vh",
        
        p:2,
        
    },
    mainimg:{
        height:"91vh",
        width:"810px",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundImage:`url(${img1})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
    },
    maingrid:{
        // margin:10
    },
    leftgrid:{
        backgroundImage:`url(${img})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
       
        height:"91vh",
        width:"100%",
        ml:-4,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        // borderRadius:7
    },
    innerbox:{
        position: "absolute",
        top: "52.5%",
        left: "76.8%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0,0,0, 0.5)", 
        padding: 20,
        width:280,
        height:"48.2vh",
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:1
       
    }

}