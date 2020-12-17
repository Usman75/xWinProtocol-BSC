import React from "react";

const InfraFundFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db;">xWin Infrastructure (XIF)</span></h2> <p>&nbsp;</p> <p>The basket token is selected based on the business nature of providing infrastructure to the eco-system. It could be decentralized price oracle or protocol to ease dapps development. Investors can access to the exposure or diversify their portfolio more precisely in their investment portfolios.</p> <p>&nbsp;</p> <h3><span style="color: #3598db;">Tokens Distribution:</span></h3> <p>&nbsp;</p> <ol> <li>LINK</li> <li>BAND</li> <li>ATOM</li> <li>DOT</li> </ol> <p>&nbsp;</p> <h3>Token Weight:</h3> <p>&nbsp;</p> <p>Equal weight: (25% each)</p> <p>&nbsp;</p> <h4><strong>LINK</strong></h4> <p>ChainLink is a decentralized oracle network that provides real-world data to smart contracts on the blockchain. LINK is the digital asset token used to pay for services on the network</p> <p>&nbsp;</p> <h4><strong>BAND</strong></h4> <p>Band Protocol is a cross-chain data oracle platform that is able to take real-world data and supply it to on-chain applications, while also connecting APIs to smart-contracts to facilitate the exchange of information between on-chain and off-chain data sources.</p> <p>By supplying reputable, verifiable real-world data to blockchains, Band Protocol unlocks a range of new use cases for developers to explore &mdash; since they can now use any type of real-world data as part of their decentralized application (DApp) logic, including sports, weather, random numbers, price feed data and more.</p> <p>&nbsp;</p> <h4><strong>ATOM</strong></h4> <p>In a nutshell, Cosmos bills itself as a project that solves some of the &ldquo;hardest problems&rdquo; facing the blockchain industry. It aims to offer an antidote to &ldquo;slow, expensive, unscalable and environmentally harmful&rdquo; proof-of-work protocols, like those used by Bitcoin, by offering an ecosystem of connected blockchains.</p> <p>&nbsp;</p> <h4><strong>DOT</strong></h4> <p>Polkadot is a platform that allows diverse blockchains to transfer messages, including value, in a trust-free fashion; sharing their unique features while pooling their security. In brief, Polkadot is a scalable heterogeneous multi-chain technology.</p>
    
`
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default InfraFundFAQ;