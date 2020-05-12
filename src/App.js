import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Cards, Chart, CountryPicker } from './components/index';
import styles from './App.module.css'
import { fetchData } from './api';
import coronaImage from './images/image.png'

class App extends React.Component{
  state = {
    data: {},
    country: ''
  }
  async componentDidMount(){
    const fetchedData = await fetchData();
    this.setState({data: fetchedData})
    console.log(fetchedData)
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country)
    this.setState({data: fetchedData, country: country})
    // console.log(fetchedData)
  }

  render() {
    const {data, country} = this.state; 
    return (
      <div className={styles.container}>
        {/* <h1>App</h1> */}
        <img className={styles.image} src={coronaImage} alt='covid19' />
        <Cards data = {data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    );
  }

}

export default App;
