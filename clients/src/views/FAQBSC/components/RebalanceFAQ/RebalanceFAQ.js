import React from "react";

const RebalanceFAQ = props => {
  
    const content =  `
    <h2><span style="color: #3598db; font-family: 'andale mono', monospace;">Why does rebalance needed?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">This feature can only be accessed by fund owner. As the target is set as fixed weight, the weight in the pool will deviated from the target weight as time goes by due to the volatilities of underlying tokens are differed. Fund owner are allowed to rebalance the fund back to the target weight. It can either maintain the weight as it is or to add new token into the basket as needed.</span></p>
<p>&nbsp;</p>
<h2><span style="color: #3598db; font-family: 'andale mono', monospace;">How it works?</span></h2>
<p><span style="font-family: 'andale mono', monospace;">xWin identity the excess weight and calculate the total quantity need to be sold and bought. Fund manager will consider the liquidity and price impact during the process. Once ready, it will submit the trades to Uniswap and perform the swapping accordingly.</span></p>
<table style="border-collapse: collapse; width: 100%; height: 60px;" border="1">
<tbody>
<tr style="height: 20px;">
<td style="width: 13.2603%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Token</span></td>
<td style="width: 10.4416%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Target %</span></td>
<td style="width: 12.247%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Fund %</span></td>
<td style="width: 15.3392%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Active %</span></td>
<td style="width: 11.782%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Quantity</span></td>
<td style="width: 15.7205%; height: 20px; text-align: center;"><span style="font-family: 'andale mono', monospace;">Action</span></td>
<td style="width: 15.7205%; height: 20px; text-align: center;"><span style="font-family: 'andale mono', monospace;">Action</span></td>
</tr>
<tr style="height: 20px;">
<td style="width: 13.2603%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">BAT</span></td>
<td style="width: 10.4416%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">60%</span></td>
<td style="width: 12.247%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">55.50%</span></td>
<td style="width: 15.3392%; text-align: center; height: 20px;"><span style="color: #e03e2d; font-family: 'andale mono', monospace;">-5.05%</span></td>
<td style="width: 11.782%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">1000</span></td>
<td style="width: 15.7205%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">Overweight</span></td>
<td style="width: 15.7205%; text-align: center; height: 20px;"><span style="background-color: #e03e2d; color: #ecf0f1; font-family: 'andale mono', monospace;">Sell&nbsp;</span></td>
</tr>
<tr style="text-align: center;">
<td style="width: 13.2603%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">DAI</span></td>
<td style="width: 10.4416%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">40%</span></td>
<td style="width: 12.247%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">44.50%</span></td>
<td style="width: 15.3392%; text-align: center; height: 20px;"><span style="font-family: 'andale mono', monospace;">+5.05%</span></td>
<td style="width: 11.782%; height: 20px;"><span style="font-family: 'andale mono', monospace;">200</span></td>
<td style="width: 15.7205%; height: 20px;"><span style="font-family: 'andale mono', monospace;">Underweight</span></td>
<td style="width: 15.7205%; height: 20px;"><span style="background-color: #3598db; color: #ecf0f1; font-family: 'andale mono', monospace;">Buy</span></td>
</tr>
</tbody>
</table>
<p style="text-align: center;">&nbsp;</p>
<p>&nbsp;</p>
    `
    return (

        <div dangerouslySetInnerHTML={{__html:content}} />
      
    );
  };
    
  export default RebalanceFAQ;