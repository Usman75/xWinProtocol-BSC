import React from "react";

const TokenMintFAQ = props => {
  
    const content =  `
    <h2><span style="font-family: 'andale mono', monospace; color: #3598db;">Fund Token Mint Calculation</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">As pool started, the fund manager will subscribe the seeds needed for the fund to get started. As pool is started with zero value. The fund token will be minted based on the following:</span></p>
<p>&nbsp;</p>
<blockquote>
<p><span style="font-family: 'andale mono', monospace; font-size: 10pt; background-color: #fbeeb8;">Quantity Mint token = Fund Value in BNB * 1000</span></p>
<p><span style="font-family: 'andale mono', monospace; font-size: 10pt; background-color: #fbeeb8;">Example: Fund manager subscribe 1 BNB as seeds. He will be granted with fund token of 1000 token as start of the fund.</span></p>
</blockquote>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">Remaining of each subscription, the mint token is calculated as follow:</span></p>
<p>&nbsp;</p>
<blockquote>
<p><span style="font-family: 'andale mono', monospace; background-color: #fbeeb8; font-size: 10pt;">Total Supply After Subscription Amount = Total Fund Value After Subscription * Total Supply Before / Total Fund Value Before Subscription</span></p>
<p><span style="font-family: 'andale mono', monospace; background-color: #fbeeb8; font-size: 10pt;">Mint New Unit = Total Supply After Subscription Amount - Total Supply Before</span></p>
</blockquote>
 `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default TokenMintFAQ;