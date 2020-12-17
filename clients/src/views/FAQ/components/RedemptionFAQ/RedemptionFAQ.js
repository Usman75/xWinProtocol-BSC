import React from "react";

const RedemptionFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">What It Does with Redemption?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">Whenever investors redeem from the vaults, investor can choose to receive the proceeds in underlying token or ETH as base currency. In general, receiving proportional to the underlying position save a bit more on gas fee in general.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">The protocol will calculate the proportional weights to be redeemed to the underlying tokens and swap it back to ETH. During the redemption, protocol will check the total underlying position if it is enough to return it to investor. In case the underlying total is not sufficient for the redemption, protocol will recall the lending with the following conditions:</span></p>
<p>&nbsp;</p>
<ol>
<li><span style="font-family: 'andale mono', monospace;">If the lending APR % is less than minimum rate setting in the fund, it recalls all the lending positions. Then it converts redemption portion needed into ETH for the investor</span></li>
<li><span style="font-family: 'andale mono', monospace;">If the lending APR % is still greater than minimum rate setting in the fund, it recalls necessary lending amount needed for the redemption purpose and keep the remaining in the lending pool.</span></li>
</ol>
<p>&nbsp;</p>
    `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default RedemptionFAQ;