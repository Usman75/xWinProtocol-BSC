import React from "react";

const SubscriptioFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">What It Does with Subscribe?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">Whenever investors subscribe to the vaults, the protocol will swap the ETH into underlying tokens based on the target ratio. It mints the necessary quantity fund token back to the investors. In addition to that, it always checks if the subscription value if it is less than 5% of total locked value in the pool. If it is less than 5%, the ETH subscribed will be retained in the pool as it is. This is to reduce the gas fee of being swapped into the underlying tokens for smaller investors. The ETH as base currency will be accumulated and triggered to swap into underlying once it is more than 5%</span></p>
<p>&nbsp;</p>
<h3><span style="color: #3598db; font-family: 'andale mono', monospace;">Lending</span></h3>
<p><span style="font-family: 'andale mono', monospace;">The fund is configured to set the minimum lending rate at 8%. During the subscription, the protocol will lend 50% of the underlying token to AAVE lending protocol if the underlying token lending APR rate is greater than 8%. The setting can be changed by the fund owner. The purpose of having 50% is to reserve the position for small redemption and not to call lending withdrawal every time of the redemption to save the gas fee.</span></p>
<p>&nbsp;</p>
<h3><span style="color: #3598db; font-family: 'andale mono', monospace;">Lending Rate Threshold</span></h3>
<p><span style="font-family: 'andale mono', monospace;">It is not supply to AAVE lending for every single subscription though. A threshold of lending rate is maintained by the pool. If the total lending rate is in between 25% to 50%, it will not be triggered to the lending for the small subscription. If the total lending ratio is less than 25%, the protocol will adjust the lending position back to 50% of the total position.</span></p>
<p>&nbsp;</p>
    `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default SubscriptioFAQ;