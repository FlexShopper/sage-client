'use strict';
//
// const xmlParser = require('xml2js');
// const xml = `<x:Envelope xmlns:x="http://schemas.xmlsoap.org/soap/envelope/" xmlns:aut="http://tempuri.org/GETI.eMagnus.WebServices/AuthGateway">
//     <x:Header>
//         <aut:AuthGatewayHeader>
//             <aut:UserName>FlexShopperCert</aut:UserName>
//             <aut:Password>suDPJHnv&amp;REtyVvX</aut:Password>
//             <aut:TerminalID>2310</aut:TerminalID>
//         </aut:AuthGatewayHeader>
//     </x:Header>
//     <x:Body>
//         <aut:ProcessSingleCertificationCheck>
//             <aut:DataPacket>&lt;?xml version="1.0" encoding="utf-8"?&gt;
// &lt;AUTH_GATEWAY REQUEST_ID="4654"&gt;&lt;TRANSACTION&gt;&lt;TRANSACTION_ID&gt;6c46996dc95149ebaa4fcdcd5eb0ecfe&lt;/TRANSACTION_ID&gt;&lt;MERCHANT&gt;&lt;TERMINAL_ID&gt;2310&lt;/TERMINAL_ID&gt;&lt;/MERCHANT&gt;&lt;PACKET&gt;&lt;IDENTIFIER&gt;A&lt;/IDENTIFIER&gt;&lt;ACCOUNT&gt;&lt;ROUTING_NUMBER&gt;490000018&lt;/ROUTING_NUMBER&gt;&lt;ACCOUNT_NUMBER&gt;24413815&lt;/ACCOUNT_NUMBER&gt;&lt;ACCOUNT_TYPE&gt;Checking&lt;/ACCOUNT_TYPE&gt;&lt;/ACCOUNT&gt;&lt;CONSUMER&gt;&lt;FIRST_NAME&gt;Doug&lt;/FIRST_NAME&gt;&lt;LAST_NAME&gt;Fresh&lt;/LAST_NAME&gt;&lt;ADDRESS1&gt;22 West Way&lt;/ADDRESS1&gt;&lt;ADDRESS2&gt;&lt;/ADDRESS2&gt;&lt;CITY&gt;Los Angls Afb&lt;/CITY&gt;&lt;STATE&gt;CA&lt;/STATE&gt;&lt;ZIP&gt;90009&lt;/ZIP&gt;&lt;PHONE_NUMBER&gt;2073331234&lt;/PHONE_NUMBER&gt;&lt;DL_STATE&gt;&lt;/DL_STATE&gt;&lt;DL_NUMBER&gt;&lt;/DL_NUMBER&gt;&lt;COURTESY_CARD_ID&gt;&lt;/COURTESY_CARD_ID&gt;&lt;/CONSUMER&gt;&lt;CHECK&gt;&lt;CHECK_AMOUNT&gt;24.55&lt;/CHECK_AMOUNT&gt;&lt;/CHECK&gt;&lt;/PACKET&gt;&lt;/TRANSACTION&gt;&lt;/AUTH_GATEWAY&gt;</aut:DataPacket>
//         </aut:ProcessSingleCertificationCheck>
//     </x:Body>
// </x:Envelope>
// `;
//
// xmlParser.parseString(xml, (err, result) => {
//     if (err) {
//         console.log('==> err: ', err);
//     } else {
//         console.log('==> result: ', result['x:Envelope']['x:Body'][0]['aut:ProcessSingleCertificationCheck'][0]['aut:DataPacket'][0]);
//     }
// });

module.exports = require('./lib/client');
