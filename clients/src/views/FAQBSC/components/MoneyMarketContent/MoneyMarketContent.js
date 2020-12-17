import React from "react";

const MoneyMarketContent = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">xWin Money Market (XMM)</span></h2>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">The basket token is selected based on the business nature of providing lending or stable coin supply to the eco-system. Investors can access to the exposure or diversify their portfolio more precisely in their investment portfolios.</span></p>
<p>&nbsp;</p>
<h3><span style="font-family: 'andale mono', monospace;">Tokens Distribution:</span></h3>
<ol>
<li><span style="font-family: 'andale mono', monospace;">AAVE</span></li>
<li><span style="font-family: 'andale mono', monospace;">MKR</span></li>
<li><span style="font-family: 'andale mono', monospace;">DMG</span></li>
<li><span style="font-family: 'andale mono', monospace;">Comp</span></li>
</ol>
<p>&nbsp;</p>
<h3><span style="font-family: 'andale mono', monospace;">Token Weight: </span></h3>
<p>&nbsp;</p>
<p><span style="font-family: 'andale mono', monospace;">Equal weight (25% each)</span></p>
<p>&nbsp;</p>
<p><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>AAVE</strong></span></p>
<blockquote>
<p><span style="color: #236fa1; font-family: 'andale mono', monospace;">The Maker Protocol, also known as the Multi-Collateral Dai (MCD) system, allows users to generate Dai by leveraging collateral assets approved by &ldquo;Maker Governance.&rdquo; Maker Governance is the community organized and operated process of managing the various aspects of the Maker Protocol. Dai is a decentralized, unbiased, collateral-backed cryptocurrency<sup>&nbsp;</sup>soft-pegged to the US Dollar. Resistant to hyperinflation due to its low volatility, Dai offers economic freedom and opportunity to anyone, anywhere.</span></p>
</blockquote>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>MKR</strong></span></h4>
<blockquote>
<p><span style="color: #236fa1; font-family: 'andale mono', monospace;">The Maker Protocol, also known as the Multi-Collateral Dai (MCD) system, allows users to generate Dai by leveraging collateral assets approved by &ldquo;Maker Governance.&rdquo; Maker Governance is the community organized and operated process of managing the various aspects of the Maker Protocol. Dai is a decentralized, unbiased, collateral-backed cryptocurrency soft-pegged to the US Dollar. Resistant to hyperinflation due to its low volatility, Dai offers economic freedom and opportunity to anyone, anywhere.&nbsp;</span></p>
</blockquote>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>COMP</strong></span></h4>
<blockquote>
<div><span style="color: #236fa1; font-family: 'andale mono', monospace;">Compound Finance lets you lend and borrow crypto assets without any middlemen. Both lenders and borrowers get even more value from their crypto. Lenders earn interest, while borrowers deposit crypto to gain access to credit without the banking headaches.</span></div>
</blockquote>
<p>&nbsp;</p>
<h4><span style="background-color: #c2e0f4; font-family: 'andale mono', monospace;"><strong>DMG</strong></span></h4>
<blockquote>
<p><span style="color: #236fa1; font-family: 'andale mono', monospace;">Ownership of DMG represents the right to govern the parameters of the DMM Protocol, a claim on the excess revenue generated from the DMM ecosystem, as well as governance over the ability and decisions surrounding the introduction of new assets to the ecosystem in regards to both asset type and asset location. The DMG token is a fork of Compound&rsquo;s COMP governance token (featuring native delegation and vote weighting) with added capability such as meta-transaction support and a native burn function.&nbsp;</span></p>
</blockquote>
<p>&nbsp;</p>
`
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default MoneyMarketContent;