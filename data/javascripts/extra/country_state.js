/*
	Country State Drop Downs v1.1.  

	(c) Copyright 2006 by Down Home Consulting, Inc (www.DownHomeConsulting.com)

	Permission is hereby granted, free of charge, to any person obtaining a
	copy of this software and associated documentation files (the "Software"),
	to deal in the Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish, distribute, sublicense,
	and/or sell copies of the Software, and to permit persons to whom the
	Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included
	in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	ITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
	DEALINGS IN THE SOFTWARE.


	To install, add the following to the top of your page paste the html between the 
   form tags from demo2.html or demo.html into your page.

*/


// State table
// 
// To edit the list, just delete a line or add a line.  Order is important.  The order 
// displayed is the order it appears on the drop down.
//
var state = '\
US:AK:Alaska|\
US:AL:Alabama|\
US:AR:Arkansas|\
US:AS:American Samoa|\
US:AZ:Arizona|\
US:CA:California|\
US:CO:Colorado|\
US:CT:Connecticut|\
US:DC:D.C.|\
US:DE:Delaware|\
US:FL:Florida|\
US:FM:Micronesia|\
US:GA:Georgia|\
US:GU:Guam|\
US:HI:Hawaii|\
US:IA:Iowa|\
US:ID:Idaho|\
US:IL:Illinois|\
US:IN:Indiana|\
US:KS:Kansas|\
US:KY:Kentucky|\
US:LA:Louisiana|\
US:MA:Massachusetts|\
US:MD:Maryland|\
US:ME:Maine|\
US:MH:Marshall Islands|\
US:MI:Michigan|\
US:MN:Minnesota|\
US:MO:Missouri|\
US:MS:Mississippi|\
US:MT:Montana|\
US:NC:North Carolina|\
US:ND:North Dakota|\
US:NE:Nebraska|\
US:NH:New Hampshire|\
US:NJ:New Jersey|\
US:NM:New Mexico|\
US:NV:Nevada|\
US:NY:New York|\
US:OH:Ohio|\
US:OK:Oklahoma|\
US:OR:Oregon|\
US:PA:Pennsylvania|\
US:RI:Rhode Island|\
US:SC:South Carolina|\
US:SD:South Dakota|\
US:TN:Tennessee|\
US:TX:Texas|\
US:UT:Utah|\
US:VA:Virginia|\
US:VI:Virgin Islands|\
US:VT:Vermont|\
US:WA:Washington|\
US:WI:Wisconsin|\
US:WV:West Virginia|\
US:WY:Wyoming|\
CA:AB:Alberta|\
CA:MB:Manitoba|\
CA:AB:Alberta|\
CA:BC:British Columbia|\
CA:MB:Manitoba|\
CA:NB:New Brunswick|\
CA:NL:Newfoundland and Labrador|\
CA:NS:Nova Scotia|\
CA:NT:Northwest Territories|\
CA:NU:Nunavut|\
CA:ON:Ontario|\
CA:PE:Prince Edward Island|\
CA:QC:Quebec|\
CA:SK:Saskatchewan|\
CA:YT:Yukon Territory|\
AU:AAT:Australian Antarctic Territory|\
AU:ACT:Australian Capital Territory|\
AU:NT:Northern Territory|\
AU:NSW:New South Wales|\
AU:QLD:Queensland|\
AU:SA:South Australia|\
AU:TAS:Tasmania|\
AU:VIC:Victoria|\
AU:WA:Western Australia|\
BR:AC:Acre|\
BR:AL:Alagoas|\
BR:AM:Amazonas|\
BR:AP:Amapa|\
BR:BA:Baia|\
BR:CE:Ceara|\
BR:DF:Distrito Federal|\
BR:ES:Espirito Santo|\
BR:FN:Fernando de Noronha|\
BR:GO:Goias|\
BR:MA:Maranhao|\
BR:MG:Minas Gerais|\
BR:MS:Mato Grosso do Sul|\
BR:MT:Mato Grosso|\
BR:PA:Para|\
BR:PB:Paraiba|\
BR:PE:Pernambuco|\
BR:PI:Piaui|\
BR:PR:Parana|\
BR:RJ:Rio de Janeiro|\
BR:RN:Rio Grande do Norte|\
BR:RO:Rondonia|\
BR:RR:Roraima|\
BR:RS:Rio Grande do Sul|\
BR:SC:Santa Catarina|\
BR:SE:Sergipe|\
BR:SP:Sao Paulo|\
BR:TO:Tocatins|\
NL:DR:Drente|\
NL:FL:Flevoland|\
NL:FR:Friesland|\
NL:GL:Gelderland|\
NL:GR:Groningen|\
NL:LB:Limburg|\
NL:NB:Noord Brabant|\
NL:NH:Noord Holland|\
NL:OV:Overijssel|\
NL:UT:Utrecht|\
NL:ZH:Zuid Holland|\
NL:ZL:Zeeland|\
EI:CO ANTRIM:County Antrim|\
EI:CO ARMAGH:County Armagh|\
EI:CO DOWN:County Down|\
EI:CO FERMANAGH:County Fermanagh|\
EI:CO DERRY:County Londonderry|\
EI:CO TYRONE:County Tyrone|\
EI:CO CAVAN:County Cavan|\
EI:CO DONEGAL:County Donegal|\
EI:CO MONAGHAN:County Monaghan|\
EI:CO DUBLIN:County Dublin|\
EI:CO CARLOW:County Carlow|\
EI:CO KILDARE:County Kildare|\
EI:CO KILKENNY:County Kilkenny|\
EI:CO LAOIS:County Laois|\
EI:CO LONGFORD:County Longford|\
EI:CO LOUTH:County Louth|\
EI:CO MEATH:County Meath|\
EI:CO OFFALY:County Offaly|\
EI:CO WESTMEATH:County Westmeath|\
EI:CO WEXFORD:County Wexford|\
EI:CO WICKLOW:County Wicklow|\
EI:CO GALWAY:County Galway|\
EI:CO MAYO:County Mayo|\
EI:CO LEITRIM:County Leitrim|\
EI:CO ROSCOMMON:County Roscommon|\
EI:CO SLIGO:County Sligo|\
EI:CO CLARE:County Clare|\
EI:CO CORK:County Cork|\
EI:CO KERRY:County Kerry|\
EI:CO LIMERICK:County Limerick|\
EI:CO TIPPERARY:County Tipperary|\
EI:CO WATERFORD:County Waterford|\
';

// Country data table
//
// 
// To edit the list, just delete a line or add a line.  Order is important.  The order 
// displayed is the order it appears on the drop down.
//
var country = '\
US:United States|\
CA:Canada|\
UK:United Kingdom|\
AF:Afghanistan|\
AL:Albania|\
DZ:Algeria|\
AS:American Samoa|\
AD:Andorra|\
AO:Angola|\
AI:Anguilla|\
AQ:Antarctica|\
AG:Antigua and Barbuda|\
AR:Argentina|\
AM:Armenia|\
AW:Aruba|\
AU:Australia|\
AT:Austria|\
AZ:Azerbaijan|\
AP:Azores|\
BS:Bahamas|\
BH:Bahrain|\
BD:Bangladesh|\
BB:Barbados|\
BY:Belarus|\
BE:Belgium|\
BZ:Belize|\
BJ:Benin|\
BM:Bermuda|\
BT:Bhutan|\
BO:Bolivia|\
BA:Bosnia And Herzegowina|\
BW:Botswana|\
BV:Bouvet Island|\
BR:Brazil|\
IO:British Indian Ocean|\
VG:British Virgin Islands|\
BN:Brunei Darussalam|\
BG:Bulgaria|\
BF:Burkina Faso|\
BI:Burundi|\
KH:Cambodia|\
CM:Cameroon|\
CA:Canada|\
CV:Cape Verde|\
KY:Cayman Islands|\
CF:Central African Republic|\
TD:Chad|\
CL:Chile|\
CN:China|\
CX:Christmas Island|\
CC:Cocos (Keeling) Islands|\
CO:Colombia|\
KM:Comoros|\
CG:Congo|\
CD:Congo, Republic|\
CK:Cook Islands|\
XE:Corsica|\
CR:Costa Rica|\
CI:Cote d` Ivoire |\
HR:Croatia|\
CU:Cuba|\
CY:Cyprus|\
CZ:Czech Republic|\
DK:Denmark|\
DJ:Djibouti|\
DM:Dominica|\
DO:Dominican Republic|\
TP:East Timor|\
EC:Ecuador|\
EG:Egypt|\
SV:El Salvador|\
GQ:Equatorial Guinea|\
ER:Eritrea|\
EE:Estonia|\
ET:Ethiopia|\
FK:Falkland Islands|\
FO:Faroe Islands|\
FJ:Fiji|\
FI:Finland|\
FR:France|\
FX:France, Metropolitan|\
GF:French Guiana|\
PF:French Polynesia|\
TA:Tahiti|\
TF:French S. Territories|\
GA:Gabon|\
GM:Gambia|\
GE:Georgia|\
DE:Germany|\
GH:Ghana|\
GI:Gibraltar|\
GR:Greece|\
GL:Greenland|\
GD:Grenada|\
GP:Guadeloupe|\
GU:Guam|\
GT:Guatemala|\
GN:Guinea|\
GW:Guinea-Bissau|\
GY:Guyana|\
HT:Haiti|\
HM:Heard Islands|\
VA:Holy See|\
HN:Honduras|\
HK:Hong Kong|\
HU:Hungary|\
IS:Iceland|\
IN:India|\
ID:Indonesia|\
IR:Iran|\
IQ:Iraq|\
IE:Ireland|\
EI:Ireland (Eire)|\
IL:Israel|\
IT:Italy|\
JM:Jamaica|\
JP:Japan|\
JO:Jordan|\
KZ:Kazakhstan|\
KE:Kenya|\
KI:Kiribati|\
KP:Korea|\
KW:Kuwait|\
KG:Kyrgyzstan|\
LA:Laos|\
LV:Latvia|\
LB:Lebanon|\
LS:Lesotho|\
LR:Liberia|\
LY:Libya|\
LI:Liechtenstein|\
LT:Lithuania|\
LU:Luxembourg|\
MO:Macao|\
MK:Macedonia|\
MG:Madagascar|\
ME:Madeira Islands|\
MW:Malawi|\
MY:Malaysia|\
MV:Maldives|\
ML:Mali|\
MT:Malta|\
MH:Marshall Islands|\
MQ:Martinique|\
MR:Mauritania|\
MU:Mauritius|\
YT:Mayotte|\
MX:Mexico|\
FM:Micronesia|\
MD:Moldova|\
MC:Monaco|\
MN:Mongolia|\
MS:Montserrat|\
MA:Morocco|\
MZ:Mozambique|\
MM:Myanmar (Burma)|\
NA:Namibia|\
NR:Nauru|\
NP:Nepal|\
NL:Netherlands|\
AN:Netherlands Antilles|\
NC:New Caledonia|\
NZ:New Zealand|\
NI:Nicaragua|\
NE:Niger|\
NG:Nigeria|\
NU:Niue|\
NF:Norfolk Island|\
MP:Northern Mariana Islands|\
NO:Norway|\
OM:Oman|\
PK:Pakistan|\
PW:Palau|\
PS:Palestinian Territory|\
PA:Panama|\
PG:Papua New Guinea|\
PY:Paraguay|\
PE:Peru|\
PH:Philippines|\
PN:Pitcairn|\
PL:Poland|\
PT:Portugal|\
PR:Puerto Rico|\
QA:Qatar|\
RE:Reunion|\
RO:Romania|\
RU:Russian Federation|\
RW:Rwanda|\
KN:Saint Kitts|\
SM:San Marino|\
ST:Sao Tome|\
SA:Saudi Arabia|\
SN:Senegal|\
XS:Serbia-Montenegro|\
SC:Seychelles|\
SL:Sierra Leone|\
SG:Singapore|\
SK:Slovak Republic|\
SI:Slovenia|\
SB:Solomon Islands|\
SO:Somalia|\
ZA:South Africa|\
GS:South Georgia|\
KR:South Korea|\
ES:Spain|\
LK:Sri Lanka|\
NV:St. Christopher|\
SH:St. Helena|\
LC:St. Lucia|\
PM:St. Pierre |\
VC:St. Vincent|\
SD:Sudan|\
SR:Suriname|\
SJ:Svalbard Islands|\
SZ:Swaziland|\
SE:Sweden|\
CH:Switzerland|\
SY:Syrian Arab Republic|\
TW:Taiwan|\
TJ:Tajikistan|\
TZ:Tanzania|\
TH:Thailand|\
TG:Togo|\
TK:Tokelau|\
TO:Tonga|\
TT:Trinidad and Tobago|\
XU:Tristan da Cunha|\
TN:Tunisia|\
TR:Turkey|\
TM:Turkmenistan|\
TC:Turks Islands|\
TV:Tuvalu|\
UG:Uganda|\
UA:Ukraine|\
AE:United Arab Emirates|\
UK:United Kingdom|\
US:United States|\
UM:United States Minor|\
UY:Uruguay|\
UZ:Uzbekistan|\
VU:Vanuatu|\
XV:Vatican City|\
VE:Venezuela|\
VN:Vietnam|\
VI:Virgin Islands|\
WF:Wallis Islands|\
EH:Western Sahara|\
WS:Western Samoa|\
YE:Yemen|\
YU:Yugoslavia|\
ZR:Zaire|\
ZM:Zambia|\
ZW:Zimbabwe|\
';

// Save the country & state field names
var countryFieldCfgArray = document.getElementById('cs_config_country_field').value.split(' ');
var stateFieldCfgArray   = document.getElementById('cs_config_state_field').value.split(' ');

// Save the names of the fields that hold the country & state default values
var countryDefaultCfgArray = document.getElementById('cs_config_country_default').value.split(' ');
var stateDefaultCfgArray   = document.getElementById('cs_config_state_default').value.split(' ');

var defaultState = false;
var defaultCountry = false;

function TrimString(sInString) {
   if (sInString) {
      sInString = sInString.replace( /^\s+/g, "" );// strip leading
      return sInString.replace( /\s+$/g, "" );// strip trailing
   }
}
// Populates the country select with the counties from the country list
//
function populateCountry(idName) {

   var countryLineArray = country.split('|');      // Split into lines

   var selObj = document.getElementById(idName);

//   selObj.options[0] = new Option('Select Country','');
   selObj.selectedIndex = 0;
   
   var defaultSet = false;
   for (var loop=0; loop<countryLineArray.length; loop++) {
      lineArray = countryLineArray[loop].split(':');

      countryCode = TrimString(lineArray[0]);
      countryName = TrimString(lineArray[1]);
   
      if (countryCode && countryCode != '') {
         selObj.options[loop] = new Option(countryName, countryCode);
         if (loop < 3)
         {
      	 	selObj.options[loop].style.textTransform = 'uppercase';
      	 }
      }

      if (defaultCountry == countryCode && defaultSet == false) {
         selObj.selectedIndex = loop;
         defaultSet = true;
      }
   }
}
function populateState( statestateIdName, countryIdName, isInitialEdit ) {

   var selObj = document.getElementById(stateIdName);
   var foundState = false;
   var countryOfInterest;

   // Empty options just in case new drop down is shorter
   //
   countryOfInterest = document.getElementById(countryIdName).value;
   if (selObj.type == 'select-one') {
      selObj.options.length = 0;

      if (countryOfInterest == 'CA' || countryOfInterest == 'NL') {
      	selObj.options[0] = new Option('Select Province', '');
      } else if (countryOfInterest == 'UK' || countryOfInterest == 'EI') {
      	selObj.options[0] = new Option('Select County', '');
      } else {
      	selObj.options[0] = new Option('Select State', '');
      }
      
      selObj.selectedIndex = 0;
   }
   // Populate the drop down with states from the selected country
   //
   var stateLineArray   = state.split("|");        // Split into lines

   var optionCntr = 1;

   for (var loop = 0; loop < stateLineArray.length; loop++) {

      lineArray = stateLineArray[loop].split(":");

      countryCode  = TrimString(lineArray[0]);
      stateCode    = TrimString(lineArray[1]);
      stateName    = TrimString(lineArray[2]);

      if (document.getElementById(countryIdName).value == countryCode && countryCode != '') {
         // If it's a input element, change it to a select
         if (selObj.type == 'text') {

            parentObj = document.getElementById( stateIdName ).parentNode;
            parentObj.removeChild(selObj);

            var inputSel = document.createElement("SELECT");
            inputSel.setAttribute("name","state"); 
            inputSel.setAttribute("id", stateIdName ); 

            parentObj.appendChild(inputSel) ;

            selObj = document.getElementById( stateIdName );
            selObj.options[0] = new Option('Select State','');
            selObj.selectedIndex = 0;
         }
   
         if (stateCode != '') {

            selObj.options[optionCntr] = new Option(stateName, stateCode);
         }
         // See if it's selected from a previous post
         //
         if (stateCode == defaultState && countryCode == defaultCountry) {

            selObj.selectedIndex = optionCntr;
         }
         foundState = true;
         optionCntr++
      }
   }
   // If the country has no states, change the select to a text box
   if (!foundState)
   {
      parentObj = document.getElementById( stateIdName ).parentNode;
      parentObj.removeChild(selObj);
 
      // Create the Input Field
      var inputEl = document.createElement("INPUT");

      inputEl.setAttribute("id",  stateIdName ); 
      inputEl.setAttribute("type", "text"); 
      inputEl.setAttribute("name", "state"); 
      inputEl.setAttribute("size", 20); 
      inputEl.setAttribute("maxlength", 48);
      // NOTE: Bug #84899 wants to clear the state when it switches to a text box
      // inputEl.setAttribute("value", defaultState);
      
      // Added isInitialEdit check to fix...
      // #85505: Profile - The 2nd Location Field blanks when entering 
      // Edit Mode - Countries outside the USA
      if (isInitialEdit)
      {
          inputEl.setAttribute("value", defaultState);
      }
      parentObj.appendChild(inputEl) ;
   }
}
// Called when state drop down is changed
// 
function updateState(countryIdNameIn) {

   for (var loop=0; loop<countryFieldCfgArray.length; loop++) {
   
      countryIdName  = countryFieldCfgArray[loop];
      stateIdName    = stateFieldCfgArray[loop];

      // Read the default value hidden fields
      defaultCountry = document.getElementById(countryDefaultCfgArray[loop]).value;
      defaultState   = document.getElementById(stateDefaultCfgArray[loop]).value;

      if (countryIdNameIn == countryIdName) {
         populateState(stateIdName, countryIdName, false);
      }
   }
}
// Initialize the drop downs
// 
function initCountry() {

   for (var loop=0; loop<countryFieldCfgArray.length; loop++)
   {
      countryIdName  = countryFieldCfgArray[loop];
      stateIdName    = stateFieldCfgArray[loop];

      // Read the default value hidden fields
      defaultCountry = document.getElementById(countryDefaultCfgArray[loop]).value;
      defaultState   = document.getElementById(stateDefaultCfgArray[loop]).value;

      populateCountry(countryIdName);
      populateState(stateIdName, countryIdName, true);
   }
}

