import { useContext, useEffect, createContext, useState } from "react";
import "./context.css";
import "./Card.css"

const themes = {
    light: {
        text: "rgb(97, 218, 251)",
        background: "#DEE4E7"
    },
    dark: {
        text: "#DEE4E7",
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
        //setAmt(myamt.map((item) => ({...item, amount: item.amount +1})))
        //this.setState(this.state.laptop.map((damt) => {if(gid===damt.id && damt.amount<9){
        //    Object.assign(damt, {amount: damt.amount+1})
        //}}))
        //setAmt(myamt.map((item)=>{
        //    if(item.id===e && item.amount<9){
            //({...item, amount: item.amount+1})
            //Object.assign(item, {amount: item.amount+1})
        //}}))
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

    //const clickHandler = (e) => {
    //    setAmt(
    //      myamt.map((x) => {
    //        if (x.id === e.id)
    //          return {
    //            ...x,
    //            amount: x.amount + 1,
    //          };
    //        return x;
    //      })
    //    );
    //  };

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

    //const updated = items.map((item) => ({ ...item, wait: item.wait + 1 }));

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
                <h2 >Daftar Laptop</h2>
                {data.map((data) => {
                    return(
                        <div className="card">
                        <img src={data.image} alt="Gambar"/>
                        <div>
                            <p className="desc">{data.nama}</p>
                            <p>{`${data.isads && data.isads === "True" ? "ads" : ""}`}</p>
                            <h3 className={`${data.isPriceBold && data.isPriceBold==="True" ? "font-bold " : ""} `}>
                                 <span aria-hidden="true" className="absolute inset-0" />{data.harga}
                            </h3>
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
        <p className="titleContext" style = {{backgroundColor: `${theme.background}`, color: `${theme.text}`}}>context value {theme.text}</p>
    )
}