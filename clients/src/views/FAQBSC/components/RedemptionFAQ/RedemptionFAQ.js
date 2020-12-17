import React from "react";

const RedemptionFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">What It Does with Redemption?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">Whenever investors redeem from the vaults, investor can choose to receive the proceeds in underlying token or BNB as base currency. In general, receiving proportional to the underlying position save a bit more on gas fee in general. </span><span style="font-family: 'andale mono', monospace;">The protocol will calculate the proportional weights to be redeemed to the underlying tokens and swap it back to BNB. </span></p>
<p>&nbsp;</p>
    `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default RedemptionFAQ;