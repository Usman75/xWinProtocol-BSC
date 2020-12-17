import React from "react";

const XwinTokenFAQ = props => {
  
    const content =  `
    <h2><span style="font-family: 'andale mono', monospace; color: #3598db;">What is XWI Token?</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">XWI is the xWin protocol token. It is claimable token for the investor who use the platform. For every subscription in the funds, the token will be accumulated based on the amount and duration of the staking. The token will be distributed during the redemption process.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">For example, wallet A invest 10 ETH into the fund with 10000 unit of fund XXX token received. After 180 days (about 1,170,000 blocks), wallet A plan to redeem all 10000 units from the funds.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">*** Parameters: 1 day equal to 6500 blocks</span></p>
<p>&nbsp;</p>
<blockquote>
<p><span style="font-family: 'andale mono', monospace; background-color: #fbeeb8;">Total XWI token entitled: 1170000 (180 days) / 2372500 (365 days) * 10000 = 4931.50 XWI</span></p>
</blockquote>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">XWI token holders are entitled to receive the platform fees, which will be distributed back to the users who use the platform.</span></p>
<p>&nbsp;</p>
 `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default XwinTokenFAQ;