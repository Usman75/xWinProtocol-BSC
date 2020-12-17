import React from "react";

const PaymentFundFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin Payment (XPM)</span></h2>
    <p>&nbsp;</p>
    <p><span style="font-family: 'andale mono', monospace;">The basket token is selected based on the business nature of providing payment solution to the eco-system. Investors can access to the benefit of diversification in their portfolios.</span></p>
    <p>&nbsp;</p>
    <h3><span style="font-family: 'andale mono', monospace;">Tokens Distribution</span></h3>
    <p>&nbsp;</p>
    <ol>
    <li><span style="font-family: 'andale mono', monospace; font-size: 14pt;">CRO</span></li>
    <li><span style="font-family: 'andale mono', monospace; font-size: 14pt;">LRC</span></li>
    </ol>
    <p>&nbsp;</p>
    <h3><span style="font-family: 'andale mono', monospace;">Token Weight</span></h3>
    <p>&nbsp;</p>
    <p><span style="font-family: 'andale mono', monospace;">Equal Weighted (50%, 50%)</span></p>
    <p>&nbsp;</p>
    <h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>CRO</strong></span></h4>
    <p><span style="color: #3598db; font-family: 'andale mono', monospace;">CRO Token enables cross-asset intermediary currency settlement for the native Crypto.com Chain. It's available on 22 exchanges globally.</span></p>
    <p>&nbsp;</p>
    <p><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>LRC</strong></span></p>
    <p><span style="color: #3598db; font-family: 'andale mono', monospace;">Loopring (LRC) is an Ethereum token that supports an audited, open-source, and non-custodial exchange protocol. ... As explained in an update by its developers, Loopring is a protocol for building scalable, secure exchanges and payments on Ethereum using zkRollup</span></p>
    
`
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default PaymentFundFAQ;