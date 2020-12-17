import React from "react";

const SubscriptioFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">What It Does with Subscribe?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">Whenever investors subscribe to the vaults, the protocol will swap the BNB into underlying tokens based on the target ratio. It mints the necessary quantity fund token back to the investors. In addition to that, it always checks if the subscription value if it is less than 5% of total locked value in the pool. If it is less than 5%, the BNB subscribed will be retained in the pool as it is. This is to reduce the gas fee of being swapped into the underlying tokens for smaller investors. The BNB as base currency will be accumulated and triggered to swap into underlying once it is more than 5%</span></p>
    `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default SubscriptioFAQ;