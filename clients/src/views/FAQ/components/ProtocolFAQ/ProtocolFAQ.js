import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppsIcon from '@material-ui/icons/Apps';
import { useTranslation } from 'react-i18next'
import { IntroductionFAQ } from '../IntroductionFAQ'
import { SubscriptioFAQ } from '../SubscriptioFAQ'
import { RedemptionFAQ } from '../RedemptionFAQ'
import { RebalanceFAQ } from '../RebalanceFAQ'
import { TokenMintFAQ } from '../TokenMintFAQ'
import { UnitPriceFAQ } from '../UnitPriceFAQ'
import { XwinTokenFAQ } from '../XwinTokenFAQ'
import { EcoSystemFAQ } from '../EcoSystemFAQ'


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



const ProtocolFAQ = props => {
  
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
                {t('General')}
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
              title={t('General')}
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
                <Typography variant={"h5"} className={classes.heading}>{t('Introduction')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <IntroductionFAQ />
                {/* {getWhatIsXwin()} */}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel9bh-content"
                id="panel9bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Ecosystem')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <EcoSystemFAQ />

              
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Subscription')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <SubscriptioFAQ />
                {/* {getWhatPurpose()} */}
              
              </ExpansionPanelDetails>
            </ExpansionPanel>
            
            <ExpansionPanel expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Redemption')}</Typography>
                {/* <Typography className={classes.secondaryHeading}>
                  Let's do a simulation
                </Typography> */}
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <RedemptionFAQ />
                {/* {getOverview()} */}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            
            <ExpansionPanel expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5bh-content"
                id="panel5h-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Rebalance')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <RebalanceFAQ />
              {/* {getEcosystem()} */}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6bh-content"
                id="panel6h-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Fund Token Distribution')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <TokenMintFAQ />
              {/* {getEcosystem()} */}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel7bh-content"
                id="panel7h-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('Fund Unit Price')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <UnitPriceFAQ />
              {/* {getEcosystem()} */}
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel8bh-content"
                id="panel8bh-header"
              >
                <Typography variant={"h5"} className={classes.heading}>{t('XWI Token')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <XwinTokenFAQ />
              </ExpansionPanelDetails>
            </ExpansionPanel>

            </CardContent>
          </Card>
         
        </Grid>
      </Grid>
    </div>

    
  );
};

ProtocolFAQ.propTypes = {
  className: PropTypes.string,
  symbols: PropTypes.array.isRequired
};

export default ProtocolFAQ;
