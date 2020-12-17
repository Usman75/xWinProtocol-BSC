import React from "react";

const InvestmentFundFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin Investment Vaults (XIV)</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">The basket token is selected based on the business nature of providing various autonomous investment strategies to the eco-system. It could be yield farming or active trading. Investors can access to the benefit of free riding in gaining passive income for their portfolios.</span></p>
<p>&nbsp;</p>
<h3><span style="font-family: 'andale mono', monospace;">Tokens Distribution:</span></h3>
<p>&nbsp;</p>
<ol>
<li><span style="font-size: 14pt; font-family: 'andale mono', monospace;">YFI</span></li>
<li><span style="font-size: 14pt; font-family: 'andale mono', monospace;">SNX</span></li>
<li><span style="font-size: 14pt; font-family: 'andale mono', monospace;">NMR</span></li>
</ol>
<p>&nbsp;</p>
<h3><span style="font-family: 'andale mono', monospace;">Token Weight: </span></h3>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">Market Cap Weighted (60%, 20%, 20%)</span></p>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>YFI</strong></span></h4>
<p><span style="color: #3598db; font-family: 'andale mono', monospace;">YFI is the governance token for Yearn. Finance, a site that performs a variety of functions for DeFi users, moving their assets in and out of different liquidity pools in order to find the best yields. Its name may also be a reference to an unflattering internet acronym</span></p>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>SNX</strong></span></h4>
<p><span style="color: #3598db; font-family: 'andale mono', monospace;">SNX is a cryptocurrency that powers the Synthetix protocol. Synthetix protocol enables trading synthetic assets on Ethereum. Synths are tokens that provide exposure to assets such as gold, Bitcoin, U.S. Dollars, TESLA, and AAPL within the Ethereum blockchain</span></p>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>NMR</strong></span></h4>
<p><span style="font-family: 'andale mono', monospace;"><span style="color: #3598db;">NMR is the digital asset token used to pay for services on the Numeraire network. It is built on Ethereum in accordance with the ERC20 standard for tokens. NMR can be bought and sold for fiat currency or other digital currencies. NMR can be stored in a crypto wallet and custodian like Gemini..</span>&nbsp;</span></p>
`
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default InvestmentFundFAQ;