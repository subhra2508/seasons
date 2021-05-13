import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

 
class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    // constructor(props){
    //     super(props);
        
    //     //This is the only time we do direct assignment to this.state
    //     this.state = {
    //         lat:null,
    //         errorMessage:'',
    //     };
       

    // }
      
    state = {lat:null,errorMessage:''};


    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat:position.coords.latitude}),
            (err) => this.setState({errorMessage:err.message})
        );
    }
    componentDidUpdate(){
        console.log('My component was just updated - it rerendered!');
    }

    renderContent(){
        if(this.state.errorMessage && !this.state.lat){
            return (
                <div>Error:{this.state.errorMessage}</div>
            )
        }
        if(!this.state.errorMessage && this.state.lat){
            return(
                 <SeasonDisplay lat = {this.state.lat}/>
            )
        }
        return <Spinner message="Accept accept location request"/> 
    }



    //React says we have to define render !!
    render(){
      return (
          <div className="border red">
              {this.renderContent()}
          </div>
      )
    }
}


ReactDom.render(<App/>,document.querySelector('#root'));

if(module.hot){
    module.hot.accept();
}
