import React from "react";

const UnitPriceFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">Unit Price of the Fund</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">Unit price of the pool is always normalized to 1.00 as starting point. Once the pool is seeded by fund manager, the total supply is 1000 and the fund value in BNB is 1. </span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">The unit price is calculated as Fund Value in BNB / Total Supply / 1000.</span></p>
<p><span style="background-color: #fbeeb8; font-family: 'andale mono', monospace;">Example: UP = 1 BNB / 1000 / 1000 = 1.00</span></p>
<p>&nbsp;</p>
<h2><span style="color: #3598db; font-family: 'andale mono', monospace;">On-Chain Price</span></h2>
<p><span style="font-family: 'andale mono', monospace;">Fund value is calculated based on the on-chain oracle price feed from Band Protocol.&nbsp; When the protocol evaluates total locked value, it gets the on-chain price through Band Protocol (BAND) price feed oracle in BNB basis.&nbsp;</span></p>
<p>&nbsp;</p>
 `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default UnitPriceFAQ;