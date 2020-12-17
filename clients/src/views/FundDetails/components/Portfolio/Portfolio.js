import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Doughnut  } from 'react-chartjs-2';
import xWinLib from 'xWinLib';

import {
  Card,
  CardContent,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  card: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    minHeight: 350,
    maxHeight: 350
  },
  cardnofixed: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    //maxHeight: 550,
    minHeight: 350
  },
  cardpie: {
    padding: theme.spacing(2,2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1,1)
    },
    height: 450
  },
  chartContainer: {
    height: 350,
    position: 'relative'
  },
  inner: {
    minWidth: 1050
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));


const Portfolio = props => {
  const { className, fundData, tokensMaster, ...rest } = props;

  const classes = useStyles();

  const theme = useTheme();

  const getBalanceDataPercent = () => {
    
    
    let myBalDataPercent = []
    let myPayLabel = []
    let myBalData = []
    
    if(fundData.tokenNames === undefined) return {myBalDataPercent, myPayLabel, myBalData}
    
    // //const ttlBal = getTotal(mainData)
    fundData.tokenNames.forEach(t => {

      let tokenname = xWinLib.getTokenName(tokensMaster, t.address)
      let targetweight = xWinLib.roundTo(t.targetweight / 100,2) //format({prefix: '', suffix: '%'})(xWinLib.roundTo(t.targetweight / 100,2))}

      myPayLabel.push(tokenname)
      myBalDataPercent.push(targetweight)
        
      myBalData.push({
        symbol: tokenname,
        key : tokenname,
        balance: targetweight
      })

    })

    return {myBalDataPercent, myPayLabel, myBalData}
  }

  const {myBalDataPercent, myPayLabel, myBalData} = getBalanceDataPercent()


  const backgroundColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
    theme.palette.warning.main,
    theme.palette.text.primary,
    theme.palette.info.main,
    theme.palette.success.main,
    theme.palette.text.disabled,
    theme.palette.primary.main,
    theme.palette.secondary.main
  ]

  const options = {
    legend: {
      display: true,
      position: 'bottom'
    },
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
      tooltips: {
      enabled: true,
      mode: 'dataset',
      borderWidth: 2,
      callbacks: {
        label: function(tooltipItem, data) { 
          //let bal = getBalanceData(data.labels[tooltipItem.index])
          return data.labels[tooltipItem.index] +" " + data.datasets[0].data[tooltipItem.index] + "%";
        }
      }
    }
  };

  const chartdata = {
    datasets: [
      {
        data: myBalDataPercent,//balanceDataPercent,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: myPayLabel//label
  };

const getLoadingContent = () => {

    return <div className={classes.chartContainer}>
            <Typography variant="h5">
              Pool Targets
              {/* {getPortfolioTotal()} */}
            </Typography> 
            <Doughnut
              options={options}
              data={chartdata}
            />
          </div>
}
  
return (
  <Card
    {...rest}
    className={clsx(classes.cardpie, className)}
  >
    <CardContent>
      {getLoadingContent()}
    </CardContent>
  </Card>
);
};

Portfolio.propTypes = {
  className: PropTypes.string
};

export default Portfolio;
