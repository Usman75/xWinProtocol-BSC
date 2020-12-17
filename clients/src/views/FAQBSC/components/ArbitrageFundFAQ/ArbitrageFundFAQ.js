import React from "react";

const ArbitrageFundFAQ = props => {
  
    const content =  `
    <div data-cke-filler-webkit="end" data-cke-temp="1">
<h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin As Arbitrage Fund</span></h2>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">xWin continue to provide different investment strategies ultilizing the xWin protocol platform. One of the proposed fund is xWin Arbitrage (XAB).　</span><span style="color: #000000; font-family: 'andale mono', monospace;">Each of the xWin Arbitrage Fund consists of BNB and xWin Sector Fund Token. For example</span></p>
<p>&nbsp;</p>
<ol>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">50% of BNB</span></li>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">50% of XIF (xWin Defi Infra Index)</span></li>
</ol>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">Backend process will monitor and calculate the arbitrage opportunity 24/7 hours. Once the price difference opportunity arise, the process will submit a transaction in BSC onchain to buy and sell in single transaction.&nbsp;</span></p>
<p>&nbsp;</p>
</div>
`
    return (

        <div>
        <div>
            <img alt="" src={"/images/xwin/xwin-arbitrage-fund-bsc.png"} width="100%"/>
        </div>
        <div dangerouslySetInnerHTML={{__html:content}} />
    </div>
      
    );
  };
    
  export default ArbitrageFundFAQ;