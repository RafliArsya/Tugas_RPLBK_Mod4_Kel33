import { useContext, useEffect, createContext, useState } from "react";
import NumberFormat from 'react-number-format';
import "./context.css";
import "./App.css";
import "./Card.css"

const themes = {
    light: {
        text: "Terang",
        background: "#DEE4E7"
    },
    dark: {
        text: "Gelap",
        background: "rgb(40,44,52)"
    }
};

const ThemeContext = createContext();

export default function Context(props){
    const {user, isdark, amt} = props;
    const [valueTheme] = useState(isdark?themes.dark:themes.light);
    const [suser] = useState(user);
    const [data, setData] = useState([]);
    const [myamt, setAmt] = useState(amt);
    console.log(myamt);

    const countUp = (e) => {
        console.log(e)
        setAmt(myamt.map((x)=>{
            if(x.id===e&&x.amount<9){
                return {
                    ...x, amount: x.amount+1
                }
            }
            return x;
        }))
    };

    const countDn = (e) => {
        console.log(e)
        setAmt(myamt.map((x)=>{
            if(x.id===e&&x.amount>0){
                return {
                    ...x, amount: x.amount-1
                }
            }
            return x;
        }))
    };

      const handleChangeUserScore = ( id ) => {
        setAmt((prev) =>
          prev.map((userScore) => {
            if (userScore.id === id) {
              return {
                ...userScore,
                amount: userScore.amount + 1
              };
            } else {
              return userScore;
            }
          })
        );
      };

    useEffect(() => {
        fetch("http://localhost:3001/data")
            .then((Response) => Response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return(
        <ThemeContext.Provider value={valueTheme}>
            <div className="contentWrapper" style = {{backgroundColor: `${valueTheme.background}`}}>
            <div className="bg-white shadow">
                <h1 >KATALOG LAPTOP</h1>
                {data.map((data) => {
                    return(
                        <div class="card">
                            <div class="card-header">
                            <img src={data.image} alt="Gambar"/>
                            </div>
                            <div class="card-body">
                            <span class="tag tag-teal">Laptop</span>
                            <h4>{data.nama}<sup>{`${data.isads && data.isads === "True" ? "ads" : ""}`}</sup>
                            </h4>
                            <p>{`${data.isPriceBold && data.isPriceBold==="True" ? "font-bold" : ""} `}</p>
                            <p> <NumberFormat value={data.harga} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />                      
                            </p>
                        </div>
                        {myamt.map((damt) => {if(data.id==damt.id){
                                    return(
                                    <table>
                                    <tr>
                                        <td><button id={damt.id} class="button" onClick={() => countDn(damt.id)}>-</button></td>
                                        <td><p className="text-sm font-medium font-bold text-green-900"></p>{`${damt.amount}`}</td>
                                        <td><button class="button" id={damt.id} onClick={() => countUp(damt.id)}>+</button></td>
                                    </tr>
                                    </table>
                                    )
                                }})}           
                        </div> 
                        
                         )
                })}
                <Content/> 
                </div>
            </div>
        </ThemeContext.Provider>
    )
}

function Content(props){
    return(
        <div>
            <Text />
        </div>
    )
}

function Text(props){
    const theme = useContext(ThemeContext);
    console.log("[context value]", theme);
    return (
        <p className="titleContext" style = {{backgroundColor: `${theme.background}`, color: `${theme.text}`}}>Menerapkan Tema {theme.text} </p>
    )
}