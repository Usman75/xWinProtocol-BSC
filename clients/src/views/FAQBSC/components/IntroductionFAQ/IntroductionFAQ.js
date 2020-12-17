import React from "react";

const IntroductionFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin BSC As Investment Platform</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">xWin is the fund management platform built with Binance Smart Chain blockchain technology. It provides fund manager to launch the funds easily. It also connect individual investors to the world best funds strategies provided by the professionals. Investors invests in BNB token into the world of DEFI tokens hassle free.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">xWin allow fund manager to create own fund in the platform. Investor can subscribe to the fund they prefer to enjoy the returns of someone expertise in trading or wealth management skill. The platform supports primary market creation and redemption by utilizing the token distribution. All funds in the platform automatically distributes the fund unit as token to investors real-time.</span></p>
<p>&nbsp;</p>
<div data-cke-filler-webkit="end" data-cke-temp="1">
<h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin As Sector Select Index</span></h2>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">xWin provide a series of sector index funds in Binance Smart Chain. The index series are:</span></p>
<p>&nbsp;</p>
<ol>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">xWin Defi Investment Index (XIV)</span></li>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">xWin Defi Infra Index (XIF)</span></li>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">xWin Payment Exchange Index (XPM)</span></li>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">xWin Crypto Currency (XCC)</span></li>
</ol>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">Please refer to xWin Sector Select Series FAQ</span></p>
<p>&nbsp;</p>
<h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin As Arbitrage Fund</span></h2>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">xWin continue to provide different investment strategies ultilizing the xWin protocol platform. One of the proposed fund is xWin Arbitrage (XAB).</span></p>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">All the xWin fund including xWin Sector Select funds are BEP20 tokens. Investors subscribe to the funds can put their tokens into BSCSwap liquidity pools to earn extra fee while gaining the exposure to the DEFI sectors. </span></p>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">In order to ensure the price efficiency in secondary and primary market, xWin Arbitrage (XAB) will be monitoring the price difference between both. Once the arbitrage opportunity exists, it executes by sending the transaction to buy and sell in the secondary and primary market.&nbsp;</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p><span style="color: #000000; font-family: 'andale mono', monospace;">Benefits:&nbsp;&nbsp;</span></p>
<ol>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">Ensure the price efficiency of both market.</span></li>
<li><span style="color: #000000; font-family: 'andale mono', monospace;">Capture the profit to the funds and benefit the investors.</span></li>
</ol>
<p>&nbsp;</p>
</div> `
    return (
        <div>
            <div>
                <img alt="" src={"/images/xwin/xwin-protocol-bsc.png"} width="100%"/>
            </div>
            <div dangerouslySetInnerHTML={{__html:content}} />
        </div>
        
      
    );
  };
    
  export default IntroductionFAQ;