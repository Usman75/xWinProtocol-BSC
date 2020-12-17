import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import { useTranslation } from 'react-i18next'
import { MoneyMarketContent } from '../MoneyMarketContent'
import { InfraFundFAQ } from '../InfraFundFAQ'
import { InvestmentFundFAQ } from '../InvestmentFundFAQ'
import { PaymentFundFAQ } from '../PaymentFundFAQ'


import {
  Card,
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  CardHeader,
  Avatar,
  
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0)
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(15),
    }
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/automation2.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteText: {
    color: theme.palette.white,
    //fontWeight: 300
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
}));



const WinSeriesFAQ = props => {
  
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(null);
  const { t, i18n } = useTranslation()

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };



  return (

    <div>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={4}
        >
           <div className={classes.quote}>
            <Typography
                className={classes.quoteText}
                variant="h1"
              >
                {t('xWin Sector Select Series')}
              </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.grid}
          item
          lg={8}
          xs={12}
        >
          <Card
          >
            <CardHeader 
              title={t('xWin Sector Select Series')}
              titleTypographyProps={{variant:'h2' }}
              subheaderTypographyProps={{variant:'body1' }}
              avatar={
                <Avatar className={classes.avatar}
                    //src='/images/avatars/xLending.png'
                  >
                    <AppsIcon />
                  </Avatar>  
              }
            />
            <CardContent>
              
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Money Market Index')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <MoneyMarketContent/>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Infrastructure Index')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <InfraFundFAQ />
              
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Investment Vaults Index')}</Typography>
               
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <InvestmentFundFAQ />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            
            <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5h-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Payment Solution Index')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <PaymentFundFAQ />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            </CardContent>
          </Card>
         
        </Grid>
      </Grid>
    </div>

    
  );
};

WinSeriesFAQ.propTypes = {
  className: PropTypes.string,
  symbols: PropTypes.array.isRequired
};

export default WinSeriesFAQ;
