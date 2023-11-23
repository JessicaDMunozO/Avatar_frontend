import React, { useState } from 'react'

import axios from 'axios'

import '../../components/MainPage/MainPage.css'
import '../../App.css'

import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const MainPage = () => {
    const baseURL = "http://localhost:4444/db/cryptos_last"
    let data = ""

    // Stored request response
    const [post, setPost] = React.useState(null)

    // GET request
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            data = response.data
            setPost(data)
        })
    }, [])

    let coinsFalse=new Object()
    
    const [selectedCoins, setSelectedCoins] = useState({
        coinsFalse  
    })
    
   const [filterCoins, setFilterCoins] = useState(
    [])

    if (!post) return null

    post[0].cryptocurrencies.forEach((coin) => {
             coinsFalse[coin.name]=false;
     })

    const handleOnCheckbox =(e)=>{
        setSelectedCoins({
            ...selectedCoins, 
            [e.target.value]: e.target.checked, 
        })
        if(e.target.checked){
            const coinsResult= post[0].cryptocurrencies.filter(item=> item.name===e.target.value);
            setFilterCoins([
                ...filterCoins, 
                ...coinsResult
            ]) 
        }else{
            const coinsResult= filterCoins.filter(item=> item.name!==e.target.value);
            setFilterCoins([...coinsResult])
        }  
    }

    // Checkbox per coin 
    const cryptos = post[0].cryptocurrencies.map((coin) => (
        <label className="checkbox-label" key={coin.name}>
            <input type="checkbox" className="checkbox" value={coin.name} id={coin.name} onChange={handleOnCheckbox}/>
            <div className="svg-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                    ></path> 
                </svg>
            </div>
            <span className="containerCheckbox"></span>
            {coin.name}
        </label>
    ))

    // Array with cryptos name and values
    let cryptos_name=[]
    let cryptos_value =[]
    if(filterCoins.length===0){
        cryptos_name = post[0].cryptocurrencies.map((coin) => (coin.name))
        cryptos_value = post[0].cryptocurrencies.map((coin) => (coin.value))

    }else{
        cryptos_name= filterCoins.map((coin) => (coin.name))
        cryptos_value = filterCoins.map((coin) => (coin.value))
    }

    // Bars chart
    let my_data = {
        labels: cryptos_name,
        datasets: [
            {
                label: 'Price',
                data: cryptos_value,
                backgroundColor: 'rgba(0, 40, 143, 1)',
            }
        ]
    }

    let my_options = {
        responsive: true,
        animation: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: 40000,
                ticks: { color: 'rgb(0, 40, 143, 1)' }
            },
            x: {
                ticks: { color: 'rgb(0, 40, 143, 1)' }
            } 
        },
        barThickness: 55,
        
    }

    return (
        <div className='component-specific'>
            <div className='title'>
                <h1>Top 10 cryptos today</h1>
            </div>
            <div className='cryptos'>
                {cryptos}
            </div>
            <div className="chart" >
                <Bar data={my_data} options={my_options}></Bar>
            </div>
        </div>
    )
}

export default MainPage