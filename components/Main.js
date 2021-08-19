import React from 'react'
import BuyForm from './BuyForm'
import SellForm from './SellForm'
import styles from './main.module.scss'

function Main() { 
    let content
    
    const [currentForm, setCurrentForm] = React.useState('buy');
   
    function handle() {   
    if (currentForm=="buy") { 
   

    setCurrentForm('sell')

   
   }
   else {

    setCurrentForm('buy')
  }

}
    if(currentForm === 'buy') {
    
        content = <BuyForm/>
   
    } else 
    content= <SellForm />
    //  content = <SellForm/>
    
    
    return (
      
      <div className={styles.card}>

             
        
      <div className="card" style={{borderRadius:"50px", width:"500px" }} >
       
        <div className="card-body" style={{backgroundColor:"#1a2c3f", borderRadius:"50px"}}>
  
<button className={styles.button}
onClick={handle}> ↓ </button>
            {content}
           
            </div>
          </div>
          </div>
    );
  
}

export default Main;