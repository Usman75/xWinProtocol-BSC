import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';


import {
  Typography,
} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  }
}));



const TermService = props => {
  const { className, ...rest } = props;
  

  const classes = useStyles();

  return (

    <div className={classes.root}>
      
       <div>
        <Typography variant="h1">
            GENERAL TERMS AND CONDITIONS
        </Typography>
        <br/>
        <Typography variant="h3">
            SCOPE:
            <Typography variant="body1">
              The use of this site is governed by these General Terms and Conditions.
              By logging into the site, you acknowledge having read these General Terms and Conditions and confirm their full acceptance.
              These General Terms and Conditions can be modified at any time. The current General Terms and Conditions cancels and replaces any previous versions, which are no longer usable against xLending.
              xLending can not be held responsible, in any way, for misuse of the service.
              <br/>By using our Services, you agree on behalf of yourself, your users and your attendees, (1) not to modify, prepare derivative works of, or reverse engineer, our Services; (2) knowingly or negligently use our Services in a way that abuses or disrupts our networks, user accounts, or the Services.
              These General Terms and Conditions may be modified at any time without notice by xLending. Users of the site are therefore invited to consult them regularly.
          </Typography>
        </Typography>
        <br/>

        <Typography variant="h3">
          SERVICES:
         </Typography>
        <Typography variant="body1"> 
          <Typography variant="h5">DESCRIPTION OF PROVIDED SERVICES</Typography>
          xLending offers services related to cryptocurrency lending for margin lending. It offers the necessary tools for the user to build and manage his own strategy to maximize margin lending interests in the crypto world. 
          xLending also facilitates monitoring and management in cryptocurrency lending by providing visuals, reports and dashboards. 
          xLending strives to provide an information as accurate as possible. However, xLending can not be held responsible for omissions, inaccuracies and deficiencies in information supplied on the site, 
          whether the information is provided by xLending or third party.
        </Typography>
        <br/>

        <Typography variant="body1"> 
          <Typography variant="h5">HOW IT WORKS</Typography>
            Users of the xLending website may register using an email address, a username and a password.
            The registration confirms the acceptance of these General Terms and Conditions, without reservation.
            The user must have assets on an account in one or more supported exchanges.
            The user must create APIs and inform them on the xLending website.
            Once the user account is created and API informed, the user can access the dashboard to view his account, make decisions in terms of strategy, and configure the strategy that the bot will apply.
            <br/>xLending offers a choice of possible strategies and provides a support on applying the user´s strategies. 
            xLending does not provide any form of financial advice. 
            It is up to the user to define his parameters setup, to set the bot up accordingly and correctly, 
            or to rely on “basic” set-up. xLending invites users to cross-check with other sources any information given via the xLending.
            It is possible to cancel your account at any time.
        </Typography>
        <br/>

        <Typography variant="body1"> 
          <Typography variant="h5">PAYMENT</Typography>
            xLending offers 2 services: "Basic Plan" and "Premium Plan".
            <br/>The prices applied are clearly posted on the xLending website.
            The cost, structure, conditions and content of the services may be changed by xLending at any time, and without notice.
            <br/>Payment is made via a PayPal recurring subscription basis paid by the user or Recurring Payment through MonarchPay by crypto currencies as stated in xLending website
            <br/>xLending can not be held responsible for refunding to fraudulent parties, if the customer space or the user's email has been compromised, due to negligence on the part of the user or other party.
            xLending declines any responsibility related to Paypal or Monarch Pay payment, in case of default of payment of Bitfinex.
        </Typography>
        <br/>

        <Typography variant="body1"> 
          <Typography variant="h5">GENERAL PRECAUTIONS OF USE</Typography>
          xLending strongly recommends using all the precautions available to prevent fraudulent use. Non-exhaustive list:
          <br/><br/>
          <ul>
            <li> Use a unique and complex password.</li>  
            <li> Change your password regularly.</li>  
            <li> Check that the API keys only give the minimum necessary rights to xLending (described in the help).</li>  
            <li> Use IP restrictions features if available.</li>  
            <li> Any other special precautions to avoid an intrusion on the PCs or smartphones used (via virus, trojan, theft etc).</li>  
          </ul>
          <br/>
          Moreover, data are given in dashboard as information only, with no guaranty of correctness and no obligation of supply. 
          This information is not a compulsory service from xLending. The users are responsible for collecting information and for their correctness.

        </Typography>
        <br/>
        <Typography variant="h3">
        LIMITATION OF LIABILITY:
         </Typography>

         <br/>
        <Typography variant="body1"> 
          <Typography variant="h5">ASSETS, CUSTODY AND API</Typography>
            The custodian of the assets to lend remains the exchange, not xLending.
            <ul>
            <li>xLending does not have the user's assets at any time. 
            Counterparty risks are therefore linked to the exchange(s) used. 
            As a result, overall, xLending can not be held responsible for the loss or fraudulent use of assets on the exchange.
            </li>  
            <li> xLending recommends to use all available security features. This applies to xLending account, Exchange accounts, personal devices, APIs etc.
            Non exhaustive guidelines are published on xLending to help the users.</li>  
            <li> Check that the API keys only give the minimum necessary rights to xLending (described in the help).</li>  
            <li> xLending can not be held responsible for the loss or fraudulent use of assets on the exchange related to negligence from the user to implement all security features available to protect from it.
            xLending takes all reasonable measures to protect users data. However due to the sensitivity of the data available, xLending cannot be the sole security level. The user remain responsible to ensure that data and assets are protected even in the unlikely event of a breach of xLending security.</li>  
            <li> >xLending can not be held responsible for direct or indirect consequences related to misuse of data fraudulently acquired from xLending.</li>  
          </ul>
            
        </Typography>
        <br/>
       
        <Typography variant="body1"> 
          <Typography variant="h5">INFORMATION</Typography>
          The information contained on this site is as accurate as possible, 
          and the site is periodically updated, but may contain inaccuracies, 
          omissions or deficiencies. If you notice a deficiency, 
          error or what appears to be a malfunction, 
          thank you to report it by email describing the problem as accurately as possible (page posing problem, triggering action, type of computer and browser used , ...).
        </Typography>
        <br/>

        <Typography variant="body1"> 
          <Typography variant="h5">OTHERS</Typography>
            Any downloaded content is at the user's own risk and under his sole responsibility. Consequently, xLending can not be held responsible for any damage to the user's computer or any loss of data resulting from the download.
            The hyperlinks available on the website, redirecting to other resources on the Internet, do not engage the responsibility of xLending as to their content and use.
            <br/><br/>xLending will in no way be held responsible for any damage of any kind resulting from the interpretation or use of the information and / or documents available on this site.
            <br/><br/>xLending can not be held responsible for material damage related to the use of the site. In addition, the user of the site agrees to access the site using recent equipment, not containing viruses and with a browser last generation updated.
            <br/><br/>xLending can not be held liable for indirect damages (such as for example a loss of market or loss of opportunity) resulting from the use of the site.
            <br/><br/>Interactive spaces (possibility to ask questions in the contact area) are available to users. xLending reserves the right to remove, without prior notice and without justification, any content posted in this space. Where applicable, xLending also reserves the right to prosecute users, particularly in the event of a racist, abusive, defamatory or pornographic message, regardless of the medium used (text , photography…).
            Loans, interest payments, as well as the general management of linking lenders and borrowers are managed and controlled by the exchange. xLending can not be held responsible for any disputes related to these activities. Users are invited to contact the exchanges directly, xLending can not play the role of intermediary.
        </Typography>
        <br/>

        <Typography variant="h3">
          INDEMNITY CLAUSE AND CLASS ACTION WAIVER:
         </Typography>
         <br/>
        <Typography variant="body1"> 
            Except in a case of willful intent, xLending´s total liability under any theory of recovery, whether in contract, tort (in¬clu¬ding negligence and strict liability), warranty, indemnity or otherwise, shall not exceed the total fees paid by the user over the previous 1 year.
            <br/>
            <br/>
            Subject to the above mentioned exception, xLending will under no circumstances be liable for any damages for loss of use, business interruption, lost profits, revenue or opportunity, or for any indirect, special, exemplary, incidental, punitive or consequential loss or damages of any kind or nature.
            <br/>
            xLending and User agree that each other may bring claims against the other only on its or his individual capacity and not as a plaintiff or class member in any class or representative action.
        </Typography>
        <br/>

        <Typography variant="h3">
          ACCESS TO THE SITE:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          xLending endeavors to provide access to the site 24 hours a day, 7 days a week, except in case of “force majeure” or an event beyond the control of xLending, and subject to possible breakdowns. 
          An interruption due to technical maintenance may however be decided by xLending, who will then do its best to communicate to users beforehand the dates and times of the intervention.
          <br/>Therefore, xLending can not guarantee availability of the site and / or services, reliability of transmissions and performance in terms of response time or quality.
          <br/>The responsibility of xLending can not be held in case of impossibility of access to this site and / or use of the services.
          <br/>In addition, xLending may be required to interrupt the site or part of the services, at any time without notice, all without entitlement to compensation. The user acknowledges and agrees that xLending is not responsible for interruptions, and any direct or indirect consequences that may arise for the user or any third party.
        </Typography>
        <br/>

        <Typography variant="h3">
          INTELLECTUAL PROPERTY:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          xLending is the exclusive owner of all intellectual property rights relating to both the structure and content of the Site [and its subsites].
          <br/>All elements appearing on this site (names of strategies, images, databases, brands, illustrations, logos, drawings, models, layout, downloadable documents, etc.) are protected as works of the spirit by international law on copyright and intellectual property. Except with prior written authorization, any reproduction, representation, adaptation, partial or complete modification of any element composing the site, by any means whatsoever, is prohibited under penalty of prosecution.
          <br/>Users and visitors of the website may set up a hyperlink to this site, but only in the direction of the home page, accessible at the following URL: www.xLending.net, provided that this link opens in a new window. In particular, a link to a sub page ("deep link") is prohibited, as well as the opening of this site within a frame ("framing"), except with the express prior authorization of xLending.
        </Typography>
        <br/>

        <Typography variant="h3">
        GOVERNING LAW:
         </Typography>
         <br/>
        <Typography variant="body1"> 
            Both this site and the General Terms and Conditions of its use are governed by Japanese law, regardless of the place of use. In case of any dispute, and after the failure of any attempt to find an amicable solution, any legal proceeding arising shall be brought only to a court in Japan, Tokyo. Users hereby irrevocably and unconditionally submit to the exclusive jurisdiction of such court.
            <br/>The language of dispute resolution is Japanese.
        </Typography>
        <br/>

        <Typography variant="h3">
        SEVERABILITY CLAUSE:
         </Typography>
         <br/>
        <Typography variant="body1"> 
        In the event any provision or part of these General Terms and Condition is found to be invalid or unenforceable, only that particular provision or part so found, and not the entire Agreement, will be inoperative.        
        </Typography>
        <br/>

        <Typography variant="h1">
        PERSONAL AND NOMINATIVE DATA
        </Typography>
        <br/>
        <Typography variant="h3">
          PERSONAL DATA:
            <Typography variant="body1">
            Some data is collected and used for anonymous viewing statistics, to improve the user interface of the site, as well as for anonymous marketing purposes.
            xLending retains the following personal data:
            <ul>
              <li>Username, password, email address</li>
              <li>API keys</li>
              <li>User lending settings</li>
              <li>Historical data related to lending offers, loans, earnings, balances</li>
              <li>Historical data related to communications (via any mean such as emails, Telegram, messengers, message box etc</li>
              <li>The date and time of access to the Internet site, an Internet protocol address (IP address) however not nominative</li>
            </ul>
            <br/>
            This set of data is accessible and visible to users via the xLending interface, after identification.
            These data are processed in order to allow the user:
            <ul>
              <li>to create a customer space</li>
              <li>to access his data in a visual format (dashboard),</li>
              <li>to manage settings for the bot to create loan offers.</li>
              <li>to access our services,</li>
              <li>to be contacted by our service, or to contact us</li>
            </ul>
            <br/><br/>
            This personal data may also be used by xLending for promotional or event information.
            <br/>
            This personal data will not be communicated by xLending to third parties, unless there is a legal obligation to pass on the data, or if the transfer serves the criminal prosecution
          </Typography>
        </Typography>
        <br/>

        <Typography variant="h3">
        RIGHT OF ACCESS AND RECTIFICATION:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          xLending customers have the right to access and correct their personal data.
          <br/>To do this, simply access your personal space to modify your personal information.
          <br/>You can also ask us for the complete deletion of your data by contacting us 
        </Typography>
        <br/>

        <Typography variant="h3">
          CONFIDENTIALITY:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          Your personal data are confidential and will in no case be communicated to third parties except after specifically informing you.
        </Typography>
        <br/>

        <Typography variant="h3">
        PERIODS OF CONSERVATION:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          The personal data mentioned above are kept for as long as necessary or until the user requests to delete them.
          <br/><br/>For your security, accounts that are inactive (no logging, no bot turned on) for more than 365 days, will be automatically considered obsolete, and will be deleted as if requested by user.
        </Typography>
        <br/>

        <Typography variant="h3">
        RESPONSIBILITY:
         </Typography>
         <br/>
        <Typography variant="body1"> 
          xLending declines all responsibility in the event of voluntary or involuntary transmission by the User to a third party of the access codes which it is his responsibility to keep in a safe place and whose use by a third party could result in the disclosure, alteration or the deletion of the personal data of the user.
          <br/>xLending undertakes to guarantee the confidentiality of personal data and to ensure that persons authorized to process personal data undertake to respect confidentiality or are subject to an appropriate legal obligation of confidentiality.
        </Typography>
        <br/>

        <Typography variant="h3">
        DATA SECURITY:
         </Typography>
         <br/>
        <Typography variant="body1"> 
        The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
        </Typography>
        <br/>

        <Typography variant="h3">
        COOKIES:
         </Typography>
         <br/>
        <Typography variant="body1"> 
        For statistical and display purposes, this site uses cookies. These are small text files stored on your hard disk to record technical data about your navigation. Some parts of this site can not be functional without the acceptance of cookies.
        <br/>You can manage the settings for saving cookies from your browsers.
        </Typography>
        <br/>


        </div>

     
    </div>

    
  );
};

TermService.propTypes = {
  className: PropTypes.string,
  symbols: PropTypes.array.isRequired
};

export default TermService;
