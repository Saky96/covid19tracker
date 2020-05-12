import React, { useState, useEffect } from 'react'
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2'
import styles from './Chart.module.css'

export default function Chart({data:{confirmed, recovered, deaths}, country}) {

    const [dailyData, setDailyData] = useState([])

    useEffect(() => {
        // (async function (){                           //For showing self calling function
        //     setDailyData(await fetchDailyData());
        // })()

        const fetchApi = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchApi();

    }, [])

    function LineChart() {
        if (dailyData.length) {
            return (
                <Line
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map((data) => data.confirmed),
                            label: 'Infected',
                            borderColor: '#3333ff',
                            fill: true,
                        }, {
                            data: dailyData.map((data) => data.deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: 'rgba(255, 0, 0, 0.5)',
                            fill: true,
                        },
                        ],
                    }}
                />
            )
        }
        else{
            return(<div>Loading...</div>)
        }
    }

    function BarChart(){
        if(confirmed){
            return(
                <Bar 
                    data = {{
                        labels: ['infected', 'recovered', 'deaths'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                            data: [confirmed.value, recovered.value, deaths.value]
                        }]
                    }}
                    options={{
                        legend: {display: false},
                        title: {display: true, text: `Current state in ${country}`}
                    }}
                />
            )
        }
        else{
            return(<div>Loading...</div>)
        }
    }

    // const LineChart = (
    //     dailyData[0] ? (
    //         <Line
    //             data={{
    //                 labels: dailyData.map(({ date }) => date),
    //                 datasets: [{
    //                     data: dailyData.map((data) => data.confirmed),
    //                     label: 'Infected',
    //                     borderColor: '#3333ff',
    //                     fill: true,
    //                 }, {
    //                     data: dailyData.map((data) => data.deaths),
    //                     label: 'Deaths',
    //                     borderColor: 'red',
    //                     backgroundColor: 'rgba(255, 0, 0, 0.5)',
    //                     fill: true,
    //                 },
    //                 ],
    //             }}
    //         />
    //     ) : (<div>ghj</div>)
    // );

    return (
        <div className={styles.container}>
            {/* <LineChart /> */}
            {country ? BarChart() : LineChart()}
        </div>

    )
}
