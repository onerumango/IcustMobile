import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {format} from "date-fns" 
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cashdeposit',
  templateUrl: './cashdeposit.page.html',
  styleUrls: ['./cashdeposit.page.scss'],
})
export class CashdepositPage implements OnInit {
  title : any = 'Cash Deposit';
   
  depositForm: FormGroup;
  currentBalance: any;
  customerId: string;
    constructor(private router:Router,private fb: FormBuilder,private api: ApiService) {}
    transactionAmount="10,000";
    accountBranch="Loita street";
    flag:boolean=true;
    currencyValue:string;
   
    users=['789045667','8789977889'];
    accountNum: string;
    transDate: string
    transTime: string;
  
    ngOnInit() {
      this.customerId = sessionStorage.getItem('customer_id');
      console.log("customer_id",this.customerId)
      this.customerId = sessionStorage.getItem('customer_id');
        this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
          console.log('backend dropdown', dropdown);
          this.users=dropdown;
        });
      this.depositForm = this.fb.group({
        id:['', [Validators.required]],
        customerId:['', [Validators.required]],
        accountNumber: ['', [Validators.required]],
        accountBalance: ['', [Validators.required]],
        transactionCurrency: ['', [Validators.required]],
        transactionAmount: ['', [Validators.required]],
        branchFlag: ['', [Validators.required]],
        accountBranch: ['', [Validators.required]],
        transactionDate: ['', [Validators.required]],
        transactionBranch: ['', [Validators.required]],
        transactionTime: ['', [Validators.required]],
        exchangeRate: ['', [Validators.required]],
        accountAmount: ['', [Validators.required]],
        totalChargeAmount: ['', [Validators.required]],
        narrative: ['', [Validators.required]],
        denomination: [null, [Validators.required]],
        totalAmount: ['', [Validators.required]],
        createdBy: ['', [Validators.required]],
        createdTime: ['', [Validators.required]],
        modifiedBy: ['', [Validators.required]],
        modifiedTime: ['', [Validators.required]],
        recordStatus: ['', [Validators.required]],
        authStatus: ['', [Validators.required]],
        version: ['', [Validators.required]],
      })
       console.log(this.depositForm.value);
       console.log(this.countries);
    }
     countries :CountryType[] =[
      { code: 'AF', countryName: 'AFGHANISTAN', currency: 'AFN',currencyName:'Afghani' },
      { code: 'AL', countryName: 'ALBANIA', currency: 'ALL',currencyName:'Lek' },
      { code: 'DZ', countryName: 'ALGERIA', currency: 'DZD',currencyName:'Algerian Dinar' },
      { code: 'AS', countryName: 'AMERICAN SAMOA', currency: 'USD',currencyName:'US Dollar' },
      { code: 'AD', countryName: 'ANDORRA ', currency: 'EUR',currencyName:'Euro' },
      { code: 'AO', countryName: 'ANGOLA', currency: 'AOA',currencyName:'Kwanza' },
      { code: 'AI', countryName: 'ANGUILLA', currency: 'XCD',currencyName:'East Carribbean Dollar' },
      { code: 'AG', countryName: 'ANTIGUA AND BARBUDA', currency: 'XCD',currencyName:'East Carribean Dollar' },
      { code: 'AR', countryName: 'ARGENTINA', currency: 'ARS',currencyName:'Argentine Peso' },
      { code: 'AM', countryName: 'ARMENIA', currency: 'AMD',currencyName:'Armenian Dram' },
      { code: 'AW', countryName: 'ARUBA', currency: 'AWG',currencyName:'Aruban Guilder' },
      { code: 'AU', countryName: 'AUSTRALIA', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'AT', countryName: 'AUSTRIA', currency: 'EUR',currencyName:'Euro' },
      { code: 'AZ', countryName: 'AZERBAIJAN', currency: 'AZM',currencyName:'Azerbaijanian Manat' },
      { code: 'BS', countryName: 'BAHAMAS', currency: 'BSD',currencyName:'Bahamian Dollar' },
      { code: 'BH', countryName: 'BAHRAIN', currency: 'BHD',currencyName:'Bahraini Dinar' },
      { code: 'BD', countryName: 'BANGLADESH', currency: 'BDT',currencyName:'Taka' },
      { code: 'BB', countryName: 'BARBADOS', currency: 'BBD',currencyName:'Barbados Dollar' },
      { code: 'BY', countryName: 'BELARUS', currency: 'BYR',currencyName:'Belarussian Ruble' },
      { code: 'BE', countryName: 'BELGIUM', currency: 'EUR',currencyName:'Euro' },
      { code: 'BZ', countryName: 'BELIZE', currency: 'BZD',currencyName:'Belize Dollar' },
      { code: 'BJ', countryName: 'BENIN', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'BM', countryName: 'BERMUDA', currency: 'BMD',currencyName:'Bermudian Dollar' },
      { code: 'BT', countryName: 'BHUTAN', currency: 'INR',currencyName:'Indian Rupee' },
      { code: 'BT', countryName: 'BHUTAN', currency: 'BTN',currencyName:'Ngultrum' },
      { code: 'BO', countryName: 'BOLIVIA', currency: 'BOB',currencyName:'Boliviano' },
      { code: 'BO', countryName: 'BOLIVIA', currency: 'BOV',currencyName:'Mvdol' },
      { code: 'BA', countryName: 'BOSNIA AND HERZEGOVINA', currency: 'BAM',currencyName:'Convertible Marks' },
      { code: 'BW', countryName: 'BOTSWANA', currency: 'BWP',currencyName:'Pula' },
      { code: 'BV', countryName: 'BOUVET ISLAND', currency: 'NOK',currencyName:'Norvegian Krone' },
      { code: 'BR', countryName: 'BRAZIL', currency: 'BRL',currencyName:'Brazilian Real' },
      { code: 'IO', countryName: 'BRITISH INDIAN OCEAN TERRITORY', currency: 'USD',currencyName:'US Dollar' },
      { code: 'BN', countryName: 'BRUNEI DARUSSALAM', currency: 'BND',currencyName:'Brunei Dollar' },
      { code: 'BG', countryName: 'BULGARIA', currency: 'BGN',currencyName:'Bulgarian Lev' },
      { code: 'BF', countryName: 'BURKINA FASO', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'BI', countryName: 'BURUNDI', currency: 'BIF',currencyName:'Burundi Franc' },
      { code: 'KH', countryName: 'CAMBODIA', currency: 'KHR',currencyName:'Riel' },
      { code: 'CM', countryName: 'CAMEROON', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'CA', countryName: 'CANADA', currency: 'CAD',currencyName:'Canadian Dollar' },
      { code: 'CV', countryName: 'CAPE VERDE', currency: 'CVE',currencyName:'Cape Verde Escudo' },
      { code: 'KY', countryName: 'CAYMAN ISLANDS', currency: 'KYD',currencyName:'Cayman Islands Dollar' },
      { code: 'CF', countryName: 'CENTRAL AFRICAN REPUBLIC', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'TD', countryName: 'CHAD', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'CL', countryName: 'CHILE', currency: 'CLP',currencyName:'Chilean Peso' },
      { code: 'CL', countryName: 'CHILE', currency: 'CLF',currencyName:'Unidades de fomento' },
      { code: 'CN', countryName: 'CHINA', currency: 'CNY',currencyName:'Yuan Renminbi' },
      { code: 'CX', countryName: 'CHRISTMAS ISLAND', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'CC', countryName: 'COCOS (KEELING) ISLANDS', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'CO', countryName: 'COLOMBIA', currency: 'COP',currencyName:'Colombian Peso' },
      { code: 'CO', countryName: 'COLOMBIA', currency: 'COU',currencyName:'Unidad de Valor Real' },
      { code: 'KM', countryName: 'COMOROS', currency: 'KMF',currencyName:'Comoro Franc' },
      { code: 'CG', countryName: 'CONGO', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'CD', countryName: 'CONGO, THE DEMOCRATIC REPUBLIC OF', currency: 'CDF',currencyName:'Franc Congolais' },
      { code: 'CK', countryName: 'COOK ISLANDS', currency: 'NZD',currencyName:'New Zealand Dollar' },
      { code: 'CR', countryName: 'COSTA RICA', currency: 'CRC',currencyName:'Costa Rican Colon' },
      { code: 'CI', countryName: 'COTE DIVOIRE', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'HR', countryName: 'CROATIA', currency: 'HRK',currencyName:'Croatian kuna' },
      { code: 'CU', countryName: 'CUBA', currency: 'CUP',currencyName:'Cuban Peso' },
      { code: 'CY', countryName: 'CYPRUS', currency: 'CYP',currencyName:'Cyprus Pound' },
      { code: 'CZ', countryName: 'CZECH REPUBLIC', currency: 'CZK',currencyName:'Czech Koruna' },
      { code: 'DK', countryName: 'DENMARK', currency: 'DKK',currencyName:'Danish Krone' },
      { code: 'DJ', countryName: 'DJIBOUTI', currency: 'DJF',currencyName:'Djibouti Franc' },
      { code: 'DM', countryName: 'DOMINICA', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'DO', countryName: 'DOMINICAN REPUBLIC', currency: 'DOP',currencyName:'Dominican Peso' },
      { code: 'EC', countryName: 'ECUADOR', currency: 'USD',currencyName:'US Dollar' },
      { code: 'EG', countryName: 'EGYPT', currency: 'EGP',currencyName:'Egyptian Pound' },
      { code: 'SV', countryName: 'EL SALVADOR', currency: 'SVC',currencyName:'El Salvador Colon' },
      { code: 'SV', countryName: 'EL SALVADOR', currency: 'USD',currencyName:'US Dollar' },
      { code: 'GQ', countryName: 'EQUATORIAL GUINEA', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'ER', countryName: 'ERITREA', currency: 'ERN',currencyName:'Nakfa' },
      { code: 'EE', countryName: 'ESTONIA', currency: 'EEK',currencyName:'Kroon' },
      { code: 'ET', countryName: 'ETHIOPIA', currency: 'ETB',currencyName:'Ethiopian Birr' },
      { code: 'FK', countryName: 'FALKLAND ISLANDS (MALVINAS)', currency: 'FKP',currencyName:'Falkland Islands Pound' },
      { code: 'FO', countryName: 'FAROE ISLANDS', currency: 'DKK',currencyName:'Danish Krone' },
      { code: 'FJ', countryName: 'FIJI', currency: 'FJD',currencyName:'Fiji Dollar' },
      { code: 'FI', countryName: 'FINLAND ', currency: 'EUR',currencyName:'Euro' },
      { code: 'FR', countryName: 'FRANCE', currency: 'EUR',currencyName:'Euro' },
      { code: 'GF', countryName: 'FRENCH GUIANA ', currency: 'EUR',currencyName:'Euro' },
      { code: 'PF', countryName: 'FRENCH POLYNESIA', currency: 'XPF',currencyName:'CFP Franc' },
      { code: 'TF', countryName: 'FRENCH SOUTHERN TERRITORIES', currency: 'EUR',currencyName:'Euro' },
      { code: 'GA', countryName: 'GABON', currency: 'XAF',currencyName:'CFA Franc BEAC' },
      { code: 'GM', countryName: 'GAMBIA', currency: 'GMD',currencyName:'Dalasi' },
      { code: 'GE', countryName: 'GEORGIA', currency: 'GEL',currencyName:'Lari' },
      { code: 'DE', countryName: 'GERMANY', currency: 'EUR',currencyName:'Euro' },
      { code: 'GH', countryName: 'GHANA', currency: 'GHC',currencyName:'Cedi' },
      { code: 'GI', countryName: 'GIBRALTAR', currency: 'GIP',currencyName:'Gibraltar Pound' },
      { code: 'GR', countryName: 'GREECE', currency: 'EUR',currencyName:'Euro' },
      { code: 'GL', countryName: 'GREENLAND', currency: 'DKK',currencyName:'Danish Krone' },
      { code: 'GD', countryName: 'GRENADA', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'GP', countryName: 'GUADELOUPE', currency: 'EUR',currencyName:'Euro' },
      { code: 'GU', countryName: 'GUAM', currency: 'USD',currencyName:'US Dollar' },
      { code: 'GT', countryName: 'GUATEMALA', currency: 'GTQ',currencyName:'Quetzal' },
      { code: 'GN', countryName: 'GUINEA', currency: 'GNF',currencyName:'Guinea Franc' },
      { code: 'GW', countryName: 'GUINEA-BISSAU', currency: 'GWP',currencyName:'Guinea-Bissau Peso' },
      { code: 'GW', countryName: 'GUINEA-BISSAU', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'GY', countryName: 'GUYANA', currency: 'GYD',currencyName:'Guyana Dollar' },
      { code: 'HT', countryName: 'HAITI', currency: 'HTG',currencyName:'Gourde' },
      { code: 'HT', countryName: 'HAITI', currency: 'USD',currencyName:'US Dollar' },
      { code: 'HM', countryName: 'HEARD ISLAND AND MCDONALD ISLANDS', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'VA', countryName: 'HOLY SEE (VATICAN CITY STATE)', currency: 'EUR',currencyName:'Euro' },
      { code: 'HN', countryName: 'HONDURAS', currency: 'HNL',currencyName:'Lempira' },
      { code: 'HK', countryName: 'HONG KONG', currency: 'HKD',currencyName:'Hong Kong Dollar' },
      { code: 'HU', countryName: 'HUNGARY', currency: 'HUF',currencyName:'Forint' },
      { code: 'IS', countryName: 'ICELAND', currency: 'ISK',currencyName:'Iceland Krona' },
      { code: 'IN', countryName: 'INDIA', currency: 'INR',currencyName:'Indian Rupee' },
      { code: 'ID', countryName: 'INDONESIA', currency: 'IDR',currencyName:'Rupiah' },
      { code: 'IR', countryName: 'IRAN, ISLAMIC REPUBLIC OF', currency: 'IRR',currencyName:'Iranian Rial' },
      { code: 'IQ', countryName: 'IRAQ', currency: 'IQD',currencyName:'Iraqi Dinar' },
      { code: 'IE', countryName: 'IRELAND', currency: 'EUR',currencyName:'Euro' },
      { code: 'IL', countryName: 'ISRAEL', currency: 'ILS',currencyName:'New Israeli Sheqel' },
      { code: 'IT', countryName: 'ITALY', currency: 'EUR',currencyName:'Euro' },
      { code: 'JM', countryName: 'JAMAICA', currency: 'JMD',currencyName:'Jamaican Dollar' },
      { code: 'JP', countryName: 'JAPAN', currency: 'JPY',currencyName:'Yen' },
      { code: 'JO', countryName: 'JORDAN', currency: 'JOD',currencyName:'Jordanian Dinar' },
      { code: 'KZ', countryName: 'KAZAKHSTAN', currency: 'KZT',currencyName:'Tenge' },
      { code: 'KE', countryName: 'KENYA', currency: 'KES',currencyName:'Kenyan Shilling' },
      { code: 'KI', countryName: 'KIRIBATI', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'KP', countryName: 'KOREA, DEMOCRATIC PEOPLES REPUBLIC OF', currency: 'KPW',currencyName:'North Korean Won' },
      { code: 'KR', countryName: 'KOREA, REPUBLIC OF', currency: 'KRW',currencyName:'Won' },
      { code: 'KW', countryName: 'KUWAIT', currency: 'KWD',currencyName:'Kuwaiti Dinar' },
      { code: 'KG', countryName: 'KYRGYZSTAN', currency: 'KGS',currencyName:'Som' },
      { code: 'LA', countryName: 'LAO PEOPLES DEMOCRATIC REPUBLIC', currency: 'LAK',currencyName:'Kip' },
      { code: 'LV', countryName: 'LATVIA', currency: 'LVL',currencyName:'Latvian Lats' },
      { code: 'LB', countryName: 'LEBANON', currency: 'LBP',currencyName:'Lebanese Pound' },
      { code: 'LS', countryName: 'LESOTHO', currency: 'ZAR',currencyName:'Rand' },
      { code: 'LS', countryName: 'LESOTHO', currency: 'LSL',currencyName:'Loti' },
      { code: 'LR', countryName: 'LIBERIA', currency: 'LRD',currencyName:'Liberian Dollar' },
      { code: 'LY', countryName: 'LIBYAN ARAB JAMAHIRIYA', currency: 'LYD',currencyName:'Lybian Dinar' },
      { code: 'LI', countryName: 'LIECHTENSTEIN', currency: 'CHF',currencyName:'Swiss Franc' },
      { code: 'LT', countryName: 'LITHUANIA', currency: 'LTL',currencyName:'Lithuanian Litas' },
      { code: 'LU', countryName: 'LUXEMBOURG', currency: 'EUR',currencyName:'Euro' },
      { code: 'MO', countryName: 'MACAO', currency: 'MOP',currencyName:'Pataca' },
      { code: 'MK', countryName: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', currency: 'MKD',currencyName:'Denar' },
      { code: 'MG', countryName: 'MADAGASCAR', currency: 'MGA',currencyName:'Ariary' },
      { code: 'MG', countryName: 'MADAGASCAR', currency: 'MGF',currencyName:'Malagasy Franc' },
      { code: 'MW', countryName: 'MALAWI', currency: 'MWK',currencyName:'Kwacha' },
      { code: 'MY', countryName: 'MALAYSIA', currency: 'MYR',currencyName:'Malaysian Ringgit' },
      { code: 'MV', countryName: 'MALDIVES', currency: 'MVR',currencyName:'Rufiyaa' },
      { code: 'ML', countryName: 'MALI', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'MT', countryName: 'MALTA', currency: 'MTL',currencyName:'Maltese Lira' },
      { code: 'MH', countryName: 'MARSHALL ISLANDS', currency: 'USD',currencyName:'US Dollar' },
      { code: 'MQ', countryName: 'MARTINIQUE', currency: 'EUR',currencyName:'Euro' },
      { code: 'MR', countryName: 'MAURITANIA', currency: 'MRO',currencyName:'Ouguiya' },
      { code: 'MU', countryName: 'MAURITIUS', currency: 'MUR',currencyName:'Mauritius Rupee' },
      { code: 'YT', countryName: 'MAYOTTE', currency: 'EUR',currencyName:'Euro' },
      { code: 'MX', countryName: 'MEXICO', currency: 'MXN',currencyName:'Mexican Peso' },
      { code: 'MX', countryName: 'MEXICO', currency: 'MXV',currencyName:'Mexican Unidad de Inversion (UDI)' },
      { code: 'FM', countryName: 'MICRONESIA, FEDERATED STATES OF', currency: 'USD',currencyName:'US Dollar' },
      { code: 'MD', countryName: 'MOLDOVA, REPUBLIC OF', currency: 'MDL',currencyName:'Moldovan Leu' },
      { code: 'MC', countryName: 'MONACO', currency: 'EUR',currencyName:'Euro' },
      { code: 'MN', countryName: 'MONGOLIA', currency: 'MNT',currencyName:'Tugrik' },
      { code: 'MS', countryName: 'MONTSERRAT', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'MA', countryName: 'MOROCCO', currency: 'MAD',currencyName:'Moroccan Dirham' },
      { code: 'MZ', countryName: 'MOZAMBIQUE', currency: 'MZM',currencyName:'Metical' },
      { code: 'MM', countryName: 'MYANMAR', currency: 'MMK',currencyName:'Kyat' },
      { code: 'NA', countryName: 'NAMIBIA', currency: 'ZAR',currencyName:'Rand' },
      { code: 'NA', countryName: 'NAMIBIA', currency: 'NAD',currencyName:'Namibia Dollar' },
      { code: 'NR', countryName: 'NAURU', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'NP', countryName: 'NEPAL', currency: 'NPR',currencyName:'Nepalese Rupee' },
      { code: 'NL', countryName: 'NETHERLANDS', currency: 'EUR',currencyName:'Euro' },
      { code: 'AN', countryName: 'NETHERLANDS ANTILLES', currency: 'ANG',currencyName:'Netherlands Antillan Guilder' },
      { code: 'NC', countryName: 'NEW CALEDONIA', currency: 'XPF',currencyName:'CFP Franc' },
      { code: 'NZ', countryName: 'NEW ZEALAND', currency: 'NZD',currencyName:'New Zealand Dollar' },
      { code: 'NI', countryName: 'NICARAGUA', currency: 'NIO',currencyName:'Cordoba Oro' },
      { code: 'NE', countryName: 'NIGER', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'NG', countryName: 'NIGERIA', currency: 'NGN',currencyName:'Naira' },
      { code: 'NU', countryName: 'NIUE', currency: 'NZD',currencyName:'New Zealand Dollar' },
      { code: 'NF', countryName: 'NORFOLK ISLAND', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'MP', countryName: 'NORTHERN MARIANA ISLANDS', currency: 'USD',currencyName:'US Dollar' },
      { code: 'NO', countryName: 'NORWAY', currency: 'NOK',currencyName:'Norwegian Krone' },
      { code: 'OM', countryName: 'OMAN', currency: 'OMR',currencyName:'Rial Omani' },
      { code: 'PK', countryName: 'PAKISTAN', currency: 'PKR',currencyName:'Pakistan Rupee' },
      { code: 'PW', countryName: 'PALAU', currency: 'USD',currencyName:'US Dollar' },
      { code: 'PA', countryName: 'PANAMA', currency: 'PAB',currencyName:'Balboa' },
      { code: 'PA', countryName: 'PANAMA', currency: 'USD',currencyName:'US Dollar' },
      { code: 'PG', countryName: 'PAPUA NEW GUINEA', currency: 'PGK',currencyName:'Kina' },
      { code: 'PY', countryName: 'PARAGUAY', currency: 'PYG',currencyName:'Guarani' },
      { code: 'PE', countryName: 'PERU', currency: 'PEN',currencyName:'Nuevo Sol' },
      { code: 'PH', countryName: 'PHILIPPINES', currency: 'PHP',currencyName:'Philippine Peso' },
      { code: 'PN', countryName: 'PITCAIRN', currency: 'NZD',currencyName:'New Zealand Dollar' },
      { code: 'PL', countryName: 'POLAND', currency: 'PLN',currencyName:'Zloty' },
      { code: 'PT', countryName: 'PORTUGAL', currency: 'EUR',currencyName:'Euro' },
      { code: 'PR', countryName: 'PUERTO RICO', currency: 'USD',currencyName:'US Dollar' },
      { code: 'QA', countryName: 'QATAR', currency: 'QAR',currencyName:'Qatari Rial' },
      { code: 'RE', countryName: 'REUNION', currency: 'EUR',currencyName:'Euro' },
      { code: 'RO', countryName: 'ROMANIA', currency: 'ROL',currencyName:'Leu' },
      { code: 'RU', countryName: 'RUSSIAN FEDERATION', currency: 'RUR',currencyName:'Russian Ruble' },
      { code: 'RU', countryName: 'RUSSIAN FEDERATION', currency: 'RUB',currencyName:'Russian Ruble' },
      { code: 'RW', countryName: 'RWANDA', currency: 'RWF',currencyName:'Rwanda Franc' },
      { code: 'SH', countryName: 'SAINT HELENA', currency: 'SHP',currencyName:'Saint Helena Pound' },
      { code: 'KN', countryName: 'SAINT KITTS AND NEVIS', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'LC', countryName: 'SAINT LUCIA', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'PM', countryName: 'SAINT PIERRE AND MIQUELON', currency: 'EUR',currencyName:'Euro' },
      { code: 'VC', countryName: 'SAINT VINCENT AND THE GRENADINES', currency: 'XCD',currencyName:'East Caribbean Dollar' },
      { code: 'WS', countryName: 'SAMOA', currency: 'WST',currencyName:'Tala' },
      { code: 'SM', countryName: 'SAN MARINO', currency: 'EUR',currencyName:'Euro' },
      { code: 'ST', countryName: 'SAO TOME AND PRINCIPE', currency: 'STD',currencyName:'Dobra' },
      { code: 'SA', countryName: 'SAUDI ARABIA', currency: 'SAR',currencyName:'Saudi Riyal' },
      { code: 'SN', countryName: 'SENEGAL', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'CS', countryName: 'SERBIA & MONTENEGRO', currency: 'EUR',currencyName:'Euro' },
      { code: 'CS', countryName: 'SERBIA & MONTENEGRO', currency: 'CSD',currencyName:'Serbian Dinar' },
      { code: 'SC', countryName: 'SEYCHELLES', currency: 'SCR',currencyName:'Seychelles Rupee' },
      { code: 'SL', countryName: 'SIERRA LEONE', currency: 'SLL',currencyName:'Leone' },
      { code: 'SG', countryName: 'SINGAPORE', currency: 'SGD',currencyName:'Singapore Dollar' },
      { code: 'SK', countryName: 'SLOVAKIA', currency: 'SKK',currencyName:'Slovak Koruna' },
      { code: 'SI', countryName: 'SLOVENIA', currency: 'SIT',currencyName:'Tolar' },
      { code: 'SB', countryName: 'SOLOMON ISLANDS', currency: 'SBD',currencyName:'Solomon Islands Dollar' },
      { code: 'SO', countryName: 'SOMALIA', currency: 'SOS',currencyName:'Somali Shilling' },
      { code: 'ZA', countryName: 'SOUTH AFRICA', currency: 'ZAR',currencyName:'Rand' },
      { code: 'ES', countryName: 'SPAIN', currency: 'EUR',currencyName:'Euro' },
      { code: 'LK', countryName: 'SRI LANKA', currency: 'LKR',currencyName:'Sri Lanka Rupee' },
      { code: 'SD', countryName: 'SUDAN', currency: 'SDD',currencyName:'Sudanese Dinar' },
      { code: 'SR', countryName: 'SURINAME', currency: 'SRD',currencyName:'Suriname Dollar' },
      { code: 'SJ', countryName: 'SVALBARD AND JAN MAYEN', currency: 'NOK',currencyName:'Norwegian Krone' },
      { code: 'SZ', countryName: 'SWAZILAND', currency: 'SZL',currencyName:'Lilangeni' },
      { code: 'SE', countryName: 'SWEDEN', currency: 'SEK',currencyName:'Swedish Krona' },
      { code: 'CH', countryName: 'SWITZERLAND', currency: 'CHF',currencyName:'Swiss Franc' },
      { code: 'SY', countryName: 'SYRIAN ARAB REPUBLIC', currency: 'SYP',currencyName:'Syrian Pound' },
      { code: 'TW', countryName: 'TAIWAN, PROVINCE OF CHINA', currency: 'TWD',currencyName:'New Taiwan Dollar' },
      { code: 'TJ', countryName: 'TAJIKISTAN', currency: 'TJS',currencyName:'Somoni' },
      { code: 'TZ', countryName: 'TANZANIA, UNITED REPUBLIC OF', currency: 'TZS',currencyName:'Tanzanian Shilling' },
      { code: 'TH', countryName: 'THAILAND', currency: 'THB',currencyName:'Baht' },
      { code: 'TL', countryName: 'TIMOR-LESTE', currency: 'USD',currencyName:'US Dollar' },
      { code: 'TG', countryName: 'TOGO', currency: 'XOF',currencyName:'CFA Franc BCEAO' },
      { code: 'TK', countryName: 'TOKELAU', currency: 'NZD',currencyName:'New Zealand Dollar' },
      { code: 'TO', countryName: 'TONGA', currency: 'TOP',currencyName:'Pa�anga' },
      { code: 'TT', countryName: 'TRINIDAD AND TOBAGO', currency: 'TTD',currencyName:'Trinidad and Tobago Dollar' },
      { code: 'TN', countryName: 'TUNISIA', currency: 'TND',currencyName:'Tunisian Dinar' },
      { code: 'TR', countryName: 'TURKEY', currency: 'TRL',currencyName:'Turkish Lira' },
      { code: 'TM', countryName: 'TURKMENISTAN', currency: 'TMM',currencyName:'Manat' },
      { code: 'TC', countryName: 'TURKS AND CAICOS ISLANDS', currency: 'USD',currencyName:'US Dollar' },
      { code: 'TV', countryName: 'TUVALU', currency: 'AUD',currencyName:'Australian Dollar' },
      { code: 'UG', countryName: 'UGANDA', currency: 'UGX',currencyName:'Uganda Shilling' },
      { code: 'UA', countryName: 'UKRAINE', currency: 'UAH',currencyName:'Hryvnia' },
      { code: 'AE', countryName: 'UNITED ARAB EMIRATES', currency: 'AED',currencyName:'UAE Dirham' },
      { code: 'GB', countryName: 'UNITED KINGDOM', currency: 'GBP',currencyName:'Pound Sterling' },
      { code: 'US', countryName: 'UNITED STATES', currency: 'USD',currencyName:'US Dollar' },
      { code: 'US', countryName: 'UNITED STATES', currency: 'USS',currencyName:'US Dollar (Same day)' },
      { code: 'US', countryName: 'UNITED STATES', currency: 'USN',currencyName:'US Dollar (Next day)' },
      { code: 'UM', countryName: 'UNITED STATES MINOR OUTLYING ISLANDS', currency: 'USD',currencyName:'US Dollar' },
      { code: 'UY', countryName: 'URUGUAY', currency: 'UYU',currencyName:'Peso Uruguayo' },
      { code: 'UZ', countryName: 'UZBEKISTAN', currency: 'UZS',currencyName:'Uzbekistan Sum' },
      { code: 'VU', countryName: 'VANUATU', currency: 'VUV',currencyName:'Vatu' },
      { code: 'VE', countryName: 'VENEZUELA', currency: 'VEB',currencyName:'Bolivar' },
      { code: 'VN', countryName: 'VIET NAM', currency: 'VND',currencyName:'Dong' },
      { code: 'VG', countryName: 'VIRGIN ISLANDS, BRITISH', currency: 'USD',currencyName:'US Dollar' },
      { code: 'VI', countryName: 'VIRGIN ISLANDS, U.S.', currency: 'USD',currencyName:'US Dollar' },
      { code: 'WF', countryName: 'WALLIS AND FUTUNA', currency: 'XPF',currencyName:'CFP Franc' },
      { code: 'EH', countryName: 'WESTERN SAHARA', currency: 'MAD',currencyName:'Moroccan Dirham' },
      { code: 'YE', countryName: 'YEMEN', currency: 'YER',currencyName:'Yemeni Rial' },
      { code: 'ZM', countryName: 'ZAMBIA', currency: 'ZMK',currencyName:'Kwacha' },
      { code: 'ZW', countryName: 'ZIMBABWE', currency: 'ZWD',currencyName:'Zimbabwe Dollar' },
      
    ];
  
    isShow : boolean = true;
   
    selectedCountryCode = 'ad';
   
  
    selectCurrencyCode(code){
      //console.log(code);
      console.log(code.detail.value.code);
      this.selectedCountryCode = code.detail.value.code.toLowerCase();
  
    }
  
  
    changeSelectedCountryCode(value: string): void {
     // this.selectedCountryCode = value;
    }
  
    goToHomepage(){
      this.router.navigate(['/tabs/home']);
    }
    goToNextPage(fb){
      this.flag=false;
      
    }
    goToPreviousPage(){
      this.flag=true;
    }
    goToNextScreen(form){
      form.transactionDate.toString();
     

      var date = new Date(form.transactionDate).toLocaleDateString("en-us")
      console.log(date) //4/
      form.transactionDate=date;
      
      // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
      form.transactionCurrency=form.transactionCurrency.currency;
      form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
      form.customerId=this.customerId;
     
      console.log(form);
      this.accountNum=form.accountNumber;
      this.transactionAmount= form.transactionAmount;
      console.log(this.transactionAmount);
      this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();
    
      localStorage.setItem("AccountNumber",this.accountNum);
      localStorage.setItem("TransactionDate",this.transDate);
      localStorage.setItem("TransactionTime",form.transactionTime);
      localStorage.setItem("TransactionAmount",this.transactionAmount);
      console.log(form);
     
      this.api.cashDepositSave(form).subscribe((resp) => {
        console.log('backend resp', resp);
      });
     
            this.router.navigate(['token-generation']);
    }
    accountEvent(event){
      console.log("event",event.detail.value)
      this.api.accountBalance(event.detail.value).subscribe((accbal) => {
        console.log('backend accbal', accbal.currentBalance);
    this.valueSet(accbal.currentBalance);
        // this.users=dropdown;
      
      });
     
    }
    valueSet(currentBalance){
      this.currentBalance=currentBalance;
  
    }
}
interface CountryType {
  code: string;
   countryName: string;
   currency: string;
  currencyName: string;
 
}