import React, { useState  } from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import Chart from 'kaktana-react-lightweight-charts'

const useStyles = makeStyles(theme => ({
  root: {},
  chartContainer: {
    height: 280,
    position: 'relative'
  },
  contentgraph: {
    marginTop: theme.spacing(1),
    maxHeight: 600,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 300,
    }
  },
  actions: {
    justifyContent: 'flex-end'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  
}));


const TradingViewChart = props => {
  const { className, mainData, ...rest } = props;

  const [options, setOptions] = useState(
    {
      color: 'rgba(255, 44, 128, 1)',
      lineStyle: 3,
      lineWidth: 10,
      crosshairMarkerVisible: false,
      crosshairMarkerRadius: 4,
      lineType: 1,
      autoScale: true,
      alignLabels: true,
      localization: {
        dateFormat: "yyyy/MM/dd",
          // priceFormatter: function(price) {
          //     // add $ sign before price

          //     return '$' + price;
          //     },
        },
      timeScale: {
        rightOffset: 0,
        barSpacing: 50,
        fixLeftEdge: false,
        lockVisibleTimeRangeOnResize: true,
        rightBarStaysOnScroll: true,
        borderVisible: false,
        borderColor: "#fff000",
        visible: true,
        timeVisible: false,
        secondsVisible: false
      },
      layout: {
          //backgroundColor: '#FAEBD7',
          textColor: '#696969',
          fontSize: 12,
          fontFamily: 'Calibri',
      },
      handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
      },
      handleScale: {
          axisPressedMouseMove: true,
          mouseWheel: true,
          pinch: true,
      },
      watermark: {
        color: 'rgba(11, 94, 29, 0.4)',
        visible: true,
        text: 'xWin Fund Price Movement',
        fontSize: 12,
        horzAlign: 'left',
        vertAlign: 'bottom',
    },
    crosshair: {
      vertLine: {
          //color: '#6A5ACD',
          color: 'rgba(32, 38, 46, 0.1)',
          width: 0.5,
          style: 1,
          visible: true,
          labelVisible: false,
      },
      horzLine: {
          color: '#6A5ACD',
          width: 0.5,
          style: 2,
          visible: true,
          labelVisible: true,
      },
      //mode: 1,
    },
  }
)


  
    const getDateFormat = (_date) => {

      let year = _date.substring(0, 4)
      let month = _date.substring(4, 6)
      let day = _date.substring(6, 8)
      //console.log(Date.parse(year + "-" + month + "-" +  day))
      return new Date(year + "-" + month + "-" +  day).toString("yyyy/mm/dd")
    }

    //let myPayLabel = []
    let myPayData = []
    let finalUPData = []

    if(mainData !== undefined){
      Object.keys(mainData).forEach(function (key) {
        myPayData.push({
          time: getDateFormat(key),
          value: mainData[key]
        })
      })
    }
    finalUPData.push({
      data: myPayData
    })

return (
    <div>
      <Chart options={options} areaSeries={finalUPData} autoWidth={true} height={220} darkTheme={false} />
    </div>
  );
};

TradingViewChart.propTypes = {
  className: PropTypes.string
};

export default TradingViewChart;
