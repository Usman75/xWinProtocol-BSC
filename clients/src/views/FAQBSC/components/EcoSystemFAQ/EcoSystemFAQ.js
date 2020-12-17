import React from "react";

const EcoSystemFAQ = props => {
  
    const content =  `
      
    
`
    return (
    <div>
        <div dangerouslySetInnerHTML={{__html:content}} />
        <div>
                <img alt="" src={"/images/xwin/xwin-protocol-bsc.png"} width="100%"/>
            </div>
        </div>
      
    );
  };
    
  export default EcoSystemFAQ;