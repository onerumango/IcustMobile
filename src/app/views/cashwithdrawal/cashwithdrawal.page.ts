import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { BranchPage } from './branch/branch.page';

@Component({
  selector: 'app-cashwithdrawal',
  templateUrl: './cashwithdrawal.page.html',
  styleUrls: ['./cashwithdrawal.page.scss'],
})
export class CashwithdrawalPage implements OnInit {
  title: any = 'Cash Withdrawal';
  savingAccount:any[];
  // maxData : any = (new Date()).getFullYear() + 3;
  minDate = new Date().toISOString();
  slideOneForm: FormGroup;
  currentBalance: any;
  submitted: boolean=true;
  submitted1: boolean=true;
  phoneNumber: string;
  constructor(
    private router: Router,
    private modalController:ModalController,
    private fb: FormBuilder,
    private api: ApiService,  public toastCtrl: ToastController
  ) {}
  transactionAmount:string;
  accountBranch = 'Loita street';
  flag: boolean = true;
  currencyValue: string;
  cashWithdrawResponse: any;
  users :any[];
  customerId:any
  accountNum: string;
  transDate: string
  transTime: string;
  ngOnInit() {
    this.customerId = sessionStorage.getItem('customer_id');
   this.phoneNumber= localStorage.getItem('PhoneNumLogin');
   console.log("phoneNumber",this.phoneNumber)

   this.api.custpomerDetails(this.phoneNumber).subscribe((resp) => {
    console.log('backend resp in home', resp);
    this.savingAccountFun(resp.custAccount);
   })







    console.log("customer_id",this.customerId)
    // this.customerId = sessionStorage.getItem('customer_id');
    //   this.api.accountDropDown(this.customerId).subscribe((dropdown) => {
    //     console.log('backend dropdown', dropdown);
    //     this.users=dropdown;
    //     if(dropdown==null){
    //       this.openToast();
    //     }
    //   });
    this.slideOneForm = this.fb.group({
      id:['', [Validators.required]],
      customerId:['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      accountBalance: ['', [Validators.required]],
      transactionCurrency: ['', [Validators.required]],
      transactionAmount: ['', [Validators.required,Validators.min(0),Validators.pattern(/^[1-9]\d*$/)]],
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
    });
    console.log(this.slideOneForm.value);
    console.log(this.countries);
  }

  countries: CountryType[] = [
    {
      code: 'AF',
      countryName: 'AFGHANISTAN',
      accountCurrency: 'AFN',
      currencyName: 'Afghani',
    },
    {
      code: 'AL',
      countryName: 'ALBANIA',
      accountCurrency: 'ALL',
      currencyName: 'Lek',
    },
    {
      code: 'DZ',
      countryName: 'ALGERIA',
      accountCurrency: 'DZD',
      currencyName: 'Algerian Dinar',
    },
    {
      code: 'AS',
      countryName: 'AMERICAN SAMOA',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'AD',
      countryName: 'ANDORRA ',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'AO',
      countryName: 'ANGOLA',
      accountCurrency: 'AOA',
      currencyName: 'Kwanza',
    },
    {
      code: 'AI',
      countryName: 'ANGUILLA',
      accountCurrency: 'XCD',
      currencyName: 'East Carribbean Dollar',
    },
    {
      code: 'AG',
      countryName: 'ANTIGUA AND BARBUDA',
      accountCurrency: 'XCD',
      currencyName: 'East Carribean Dollar',
    },
    {
      code: 'AR',
      countryName: 'ARGENTINA',
      accountCurrency: 'ARS',
      currencyName: 'Argentine Peso',
    },
    {
      code: 'AM',
      countryName: 'ARMENIA',
      accountCurrency: 'AMD',
      currencyName: 'Armenian Dram',
    },
    {
      code: 'AW',
      countryName: 'ARUBA',
      accountCurrency: 'AWG',
      currencyName: 'Aruban Guilder',
    },
    {
      code: 'AU',
      countryName: 'AUSTRALIA',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'AT',
      countryName: 'AUSTRIA',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'AZ',
      countryName: 'AZERBAIJAN',
      accountCurrency: 'AZM',
      currencyName: 'Azerbaijanian Manat',
    },
    {
      code: 'BS',
      countryName: 'BAHAMAS',
      accountCurrency: 'BSD',
      currencyName: 'Bahamian Dollar',
    },
    {
      code: 'BH',
      countryName: 'BAHRAIN',
      accountCurrency: 'BHD',
      currencyName: 'Bahraini Dinar',
    },
    {
      code: 'BD',
      countryName: 'BANGLADESH',
      accountCurrency: 'BDT',
      currencyName: 'Taka',
    },
    {
      code: 'BB',
      countryName: 'BARBADOS',
      accountCurrency: 'BBD',
      currencyName: 'Barbados Dollar',
    },
    {
      code: 'BY',
      countryName: 'BELARUS',
      accountCurrency: 'BYR',
      currencyName: 'Belarussian Ruble',
    },
    {
      code: 'BE',
      countryName: 'BELGIUM',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'BZ',
      countryName: 'BELIZE',
      accountCurrency: 'BZD',
      currencyName: 'Belize Dollar',
    },
    {
      code: 'BJ',
      countryName: 'BENIN',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'BM',
      countryName: 'BERMUDA',
      accountCurrency: 'BMD',
      currencyName: 'Bermudian Dollar',
    },
    {
      code: 'BT',
      countryName: 'BHUTAN',
      accountCurrency: 'INR',
      currencyName: 'Indian Rupee',
    },
    {
      code: 'BT',
      countryName: 'BHUTAN',
      accountCurrency: 'BTN',
      currencyName: 'Ngultrum',
    },
    {
      code: 'BO',
      countryName: 'BOLIVIA',
      accountCurrency: 'BOB',
      currencyName: 'Boliviano',
    },
    {
      code: 'BO',
      countryName: 'BOLIVIA',
      accountCurrency: 'BOV',
      currencyName: 'Mvdol',
    },
    {
      code: 'BA',
      countryName: 'BOSNIA AND HERZEGOVINA',
      accountCurrency: 'BAM',
      currencyName: 'Convertible Marks',
    },
    {
      code: 'BW',
      countryName: 'BOTSWANA',
      accountCurrency: 'BWP',
      currencyName: 'Pula',
    },
    {
      code: 'BV',
      countryName: 'BOUVET ISLAND',
      accountCurrency: 'NOK',
      currencyName: 'Norvegian Krone',
    },
    {
      code: 'BR',
      countryName: 'BRAZIL',
      accountCurrency: 'BRL',
      currencyName: 'Brazilian Real',
    },
    {
      code: 'IO',
      countryName: 'BRITISH INDIAN OCEAN TERRITORY',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'BN',
      countryName: 'BRUNEI DARUSSALAM',
      accountCurrency: 'BND',
      currencyName: 'Brunei Dollar',
    },
    {
      code: 'BG',
      countryName: 'BULGARIA',
      accountCurrency: 'BGN',
      currencyName: 'Bulgarian Lev',
    },
    {
      code: 'BF',
      countryName: 'BURKINA FASO',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'BI',
      countryName: 'BURUNDI',
      accountCurrency: 'BIF',
      currencyName: 'Burundi Franc',
    },
    {
      code: 'KH',
      countryName: 'CAMBODIA',
      accountCurrency: 'KHR',
      currencyName: 'Riel',
    },
    {
      code: 'CM',
      countryName: 'CAMEROON',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'CA',
      countryName: 'CANADA',
      accountCurrency: 'CAD',
      currencyName: 'Canadian Dollar',
    },
    {
      code: 'CV',
      countryName: 'CAPE VERDE',
      accountCurrency: 'CVE',
      currencyName: 'Cape Verde Escudo',
    },
    {
      code: 'KY',
      countryName: 'CAYMAN ISLANDS',
      accountCurrency: 'KYD',
      currencyName: 'Cayman Islands Dollar',
    },
    {
      code: 'CF',
      countryName: 'CENTRAL AFRICAN REPUBLIC',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'TD',
      countryName: 'CHAD',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'CL',
      countryName: 'CHILE',
      accountCurrency: 'CLP',
      currencyName: 'Chilean Peso',
    },
    {
      code: 'CL',
      countryName: 'CHILE',
      accountCurrency: 'CLF',
      currencyName: 'Unidades de fomento',
    },
    {
      code: 'CN',
      countryName: 'CHINA',
      accountCurrency: 'CNY',
      currencyName: 'Yuan Renminbi',
    },
    {
      code: 'CX',
      countryName: 'CHRISTMAS ISLAND',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'CC',
      countryName: 'COCOS (KEELING) ISLANDS',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'CO',
      countryName: 'COLOMBIA',
      accountCurrency: 'COP',
      currencyName: 'Colombian Peso',
    },
    {
      code: 'CO',
      countryName: 'COLOMBIA',
      accountCurrency: 'COU',
      currencyName: 'Unidad de Valor Real',
    },
    {
      code: 'KM',
      countryName: 'COMOROS',
      accountCurrency: 'KMF',
      currencyName: 'Comoro Franc',
    },
    {
      code: 'CG',
      countryName: 'CONGO',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'CD',
      countryName: 'CONGO, THE DEMOCRATIC REPUBLIC OF',
      accountCurrency: 'CDF',
      currencyName: 'Franc Congolais',
    },
    {
      code: 'CK',
      countryName: 'COOK ISLANDS',
      accountCurrency: 'NZD',
      currencyName: 'New Zealand Dollar',
    },
    {
      code: 'CR',
      countryName: 'COSTA RICA',
      accountCurrency: 'CRC',
      currencyName: 'Costa Rican Colon',
    },
    {
      code: 'CI',
      countryName: 'COTE DIVOIRE',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'HR',
      countryName: 'CROATIA',
      accountCurrency: 'HRK',
      currencyName: 'Croatian kuna',
    },
    {
      code: 'CU',
      countryName: 'CUBA',
      accountCurrency: 'CUP',
      currencyName: 'Cuban Peso',
    },
    {
      code: 'CY',
      countryName: 'CYPRUS',
      accountCurrency: 'CYP',
      currencyName: 'Cyprus Pound',
    },
    {
      code: 'CZ',
      countryName: 'CZECH REPUBLIC',
      accountCurrency: 'CZK',
      currencyName: 'Czech Koruna',
    },
    {
      code: 'DK',
      countryName: 'DENMARK',
      accountCurrency: 'DKK',
      currencyName: 'Danish Krone',
    },
    {
      code: 'DJ',
      countryName: 'DJIBOUTI',
      accountCurrency: 'DJF',
      currencyName: 'Djibouti Franc',
    },
    {
      code: 'DM',
      countryName: 'DOMINICA',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    {
      code: 'DO',
      countryName: 'DOMINICAN REPUBLIC',
      accountCurrency: 'DOP',
      currencyName: 'Dominican Peso',
    },
    {
      code: 'EC',
      countryName: 'ECUADOR',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'EG',
      countryName: 'EGYPT',
      accountCurrency: 'EGP',
      currencyName: 'Egyptian Pound',
    },
    {
      code: 'SV',
      countryName: 'EL SALVADOR',
      accountCurrency: 'SVC',
      currencyName: 'El Salvador Colon',
    },
    {
      code: 'SV',
      countryName: 'EL SALVADOR',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'GQ',
      countryName: 'EQUATORIAL GUINEA',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'ER',
      countryName: 'ERITREA',
      accountCurrency: 'ERN',
      currencyName: 'Nakfa',
    },
    {
      code: 'EE',
      countryName: 'ESTONIA',
      accountCurrency: 'EEK',
      currencyName: 'Kroon',
    },
    {
      code: 'ET',
      countryName: 'ETHIOPIA',
      accountCurrency: 'ETB',
      currencyName: 'Ethiopian Birr',
    },
    {
      code: 'FK',
      countryName: 'FALKLAND ISLANDS (MALVINAS)',
      accountCurrency: 'FKP',
      currencyName: 'Falkland Islands Pound',
    },
    {
      code: 'FO',
      countryName: 'FAROE ISLANDS',
      accountCurrency: 'DKK',
      currencyName: 'Danish Krone',
    },
    {
      code: 'FJ',
      countryName: 'FIJI',
      accountCurrency: 'FJD',
      currencyName: 'Fiji Dollar',
    },
    {
      code: 'FI',
      countryName: 'FINLAND ',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'FR',
      countryName: 'FRANCE',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'GF',
      countryName: 'FRENCH GUIANA ',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'PF',
      countryName: 'FRENCH POLYNESIA',
      accountCurrency: 'XPF',
      currencyName: 'CFP Franc',
    },
    {
      code: 'TF',
      countryName: 'FRENCH SOUTHERN TERRITORIES',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'GA',
      countryName: 'GABON',
      accountCurrency: 'XAF',
      currencyName: 'CFA Franc BEAC',
    },
    {
      code: 'GM',
      countryName: 'GAMBIA',
      accountCurrency: 'GMD',
      currencyName: 'Dalasi',
    },
    {
      code: 'GE',
      countryName: 'GEORGIA',
      accountCurrency: 'GEL',
      currencyName: 'Lari',
    },
    {
      code: 'DE',
      countryName: 'GERMANY',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    { code: 'GH', countryName: 'GHANA', accountCurrency: 'GHC', currencyName: 'Cedi' },
    {
      code: 'GI',
      countryName: 'GIBRALTAR',
      accountCurrency: 'GIP',
      currencyName: 'Gibraltar Pound',
    },
    {
      code: 'GR',
      countryName: 'GREECE',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'GL',
      countryName: 'GREENLAND',
      accountCurrency: 'DKK',
      currencyName: 'Danish Krone',
    },
    {
      code: 'GD',
      countryName: 'GRENADA',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    {
      code: 'GP',
      countryName: 'GUADELOUPE',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'GU',
      countryName: 'GUAM',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'GT',
      countryName: 'GUATEMALA',
      accountCurrency: 'GTQ',
      currencyName: 'Quetzal',
    },
    {
      code: 'GN',
      countryName: 'GUINEA',
      accountCurrency: 'GNF',
      currencyName: 'Guinea Franc',
    },
    {
      code: 'GW',
      countryName: 'GUINEA-BISSAU',
      accountCurrency: 'GWP',
      currencyName: 'Guinea-Bissau Peso',
    },
    {
      code: 'GW',
      countryName: 'GUINEA-BISSAU',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'GY',
      countryName: 'GUYANA',
      accountCurrency: 'GYD',
      currencyName: 'Guyana Dollar',
    },
    {
      code: 'HT',
      countryName: 'HAITI',
      accountCurrency: 'HTG',
      currencyName: 'Gourde',
    },
    {
      code: 'HT',
      countryName: 'HAITI',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'HM',
      countryName: 'HEARD ISLAND AND MCDONALD ISLANDS',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'VA',
      countryName: 'HOLY SEE (VATICAN CITY STATE)',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'HN',
      countryName: 'HONDURAS',
      accountCurrency: 'HNL',
      currencyName: 'Lempira',
    },
    {
      code: 'HK',
      countryName: 'HONG KONG',
      accountCurrency: 'HKD',
      currencyName: 'Hong Kong Dollar',
    },
    {
      code: 'HU',
      countryName: 'HUNGARY',
      accountCurrency: 'HUF',
      currencyName: 'Forint',
    },
    {
      code: 'IS',
      countryName: 'ICELAND',
      accountCurrency: 'ISK',
      currencyName: 'Iceland Krona',
    },
    {
      code: 'IN',
      countryName: 'INDIA',
      accountCurrency: 'INR',
      currencyName: 'Indian Rupee',
    },
    {
      code: 'ID',
      countryName: 'INDONESIA',
      accountCurrency: 'IDR',
      currencyName: 'Rupiah',
    },
    {
      code: 'IR',
      countryName: 'IRAN, ISLAMIC REPUBLIC OF',
      accountCurrency: 'IRR',
      currencyName: 'Iranian Rial',
    },
    {
      code: 'IQ',
      countryName: 'IRAQ',
      accountCurrency: 'IQD',
      currencyName: 'Iraqi Dinar',
    },
    {
      code: 'IE',
      countryName: 'IRELAND',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'IL',
      countryName: 'ISRAEL',
      accountCurrency: 'ILS',
      currencyName: 'New Israeli Sheqel',
    },
    { code: 'IT', countryName: 'ITALY', accountCurrency: 'EUR', currencyName: 'Euro' },
    {
      code: 'JM',
      countryName: 'JAMAICA',
      accountCurrency: 'JMD',
      currencyName: 'Jamaican Dollar',
    },
    { code: 'JP', countryName: 'JAPAN', accountCurrency: 'JPY', currencyName: 'Yen' },
    {
      code: 'JO',
      countryName: 'JORDAN',
      accountCurrency: 'JOD',
      currencyName: 'Jordanian Dinar',
    },
    {
      code: 'KZ',
      countryName: 'KAZAKHSTAN',
      accountCurrency: 'KZT',
      currencyName: 'Tenge',
    },
    {
      code: 'KE',
      countryName: 'KENYA',
      accountCurrency: 'KES',
      currencyName: 'Kenyan Shilling',
    },
    {
      code: 'KI',
      countryName: 'KIRIBATI',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'KP',
      countryName: 'KOREA, DEMOCRATIC PEOPLES REPUBLIC OF',
      accountCurrency: 'KPW',
      currencyName: 'North Korean Won',
    },
    {
      code: 'KR',
      countryName: 'KOREA, REPUBLIC OF',
      accountCurrency: 'KRW',
      currencyName: 'Won',
    },
    {
      code: 'KW',
      countryName: 'KUWAIT',
      accountCurrency: 'KWD',
      currencyName: 'Kuwaiti Dinar',
    },
    {
      code: 'KG',
      countryName: 'KYRGYZSTAN',
      accountCurrency: 'KGS',
      currencyName: 'Som',
    },
    {
      code: 'LA',
      countryName: 'LAO PEOPLES DEMOCRATIC REPUBLIC',
      accountCurrency: 'LAK',
      currencyName: 'Kip',
    },
    {
      code: 'LV',
      countryName: 'LATVIA',
      accountCurrency: 'LVL',
      currencyName: 'Latvian Lats',
    },
    {
      code: 'LB',
      countryName: 'LEBANON',
      accountCurrency: 'LBP',
      currencyName: 'Lebanese Pound',
    },
    {
      code: 'LS',
      countryName: 'LESOTHO',
      accountCurrency: 'ZAR',
      currencyName: 'Rand',
    },
    {
      code: 'LS',
      countryName: 'LESOTHO',
      accountCurrency: 'LSL',
      currencyName: 'Loti',
    },
    {
      code: 'LR',
      countryName: 'LIBERIA',
      accountCurrency: 'LRD',
      currencyName: 'Liberian Dollar',
    },
    {
      code: 'LY',
      countryName: 'LIBYAN ARAB JAMAHIRIYA',
      accountCurrency: 'LYD',
      currencyName: 'Lybian Dinar',
    },
    {
      code: 'LI',
      countryName: 'LIECHTENSTEIN',
      accountCurrency: 'CHF',
      currencyName: 'Swiss Franc',
    },
    {
      code: 'LT',
      countryName: 'LITHUANIA',
      accountCurrency: 'LTL',
      currencyName: 'Lithuanian Litas',
    },
    {
      code: 'LU',
      countryName: 'LUXEMBOURG',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'MO',
      countryName: 'MACAO',
      accountCurrency: 'MOP',
      currencyName: 'Pataca',
    },
    {
      code: 'MK',
      countryName: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF',
      accountCurrency: 'MKD',
      currencyName: 'Denar',
    },
    {
      code: 'MG',
      countryName: 'MADAGASCAR',
      accountCurrency: 'MGA',
      currencyName: 'Ariary',
    },
    {
      code: 'MG',
      countryName: 'MADAGASCAR',
      accountCurrency: 'MGF',
      currencyName: 'Malagasy Franc',
    },
    {
      code: 'MW',
      countryName: 'MALAWI',
      accountCurrency: 'MWK',
      currencyName: 'Kwacha',
    },
    {
      code: 'MY',
      countryName: 'MALAYSIA',
      accountCurrency: 'MYR',
      currencyName: 'Malaysian Ringgit',
    },
    {
      code: 'MV',
      countryName: 'MALDIVES',
      accountCurrency: 'MVR',
      currencyName: 'Rufiyaa',
    },
    {
      code: 'ML',
      countryName: 'MALI',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'MT',
      countryName: 'MALTA',
      accountCurrency: 'MTL',
      currencyName: 'Maltese Lira',
    },
    {
      code: 'MH',
      countryName: 'MARSHALL ISLANDS',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'MQ',
      countryName: 'MARTINIQUE',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'MR',
      countryName: 'MAURITANIA',
      accountCurrency: 'MRO',
      currencyName: 'Ouguiya',
    },
    {
      code: 'MU',
      countryName: 'MAURITIUS',
      accountCurrency: 'MUR',
      currencyName: 'Mauritius Rupee',
    },
    {
      code: 'YT',
      countryName: 'MAYOTTE',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'MX',
      countryName: 'MEXICO',
      accountCurrency: 'MXN',
      currencyName: 'Mexican Peso',
    },
    {
      code: 'MX',
      countryName: 'MEXICO',
      accountCurrency: 'MXV',
      currencyName: 'Mexican Unidad de Inversion (UDI)',
    },
    {
      code: 'FM',
      countryName: 'MICRONESIA, FEDERATED STATES OF',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'MD',
      countryName: 'MOLDOVA, REPUBLIC OF',
      accountCurrency: 'MDL',
      currencyName: 'Moldovan Leu',
    },
    {
      code: 'MC',
      countryName: 'MONACO',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'MN',
      countryName: 'MONGOLIA',
      accountCurrency: 'MNT',
      currencyName: 'Tugrik',
    },
    {
      code: 'MS',
      countryName: 'MONTSERRAT',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    {
      code: 'MA',
      countryName: 'MOROCCO',
      accountCurrency: 'MAD',
      currencyName: 'Moroccan Dirham',
    },
    {
      code: 'MZ',
      countryName: 'MOZAMBIQUE',
      accountCurrency: 'MZM',
      currencyName: 'Metical',
    },
    {
      code: 'MM',
      countryName: 'MYANMAR',
      accountCurrency: 'MMK',
      currencyName: 'Kyat',
    },
    {
      code: 'NA',
      countryName: 'NAMIBIA',
      accountCurrency: 'ZAR',
      currencyName: 'Rand',
    },
    {
      code: 'NA',
      countryName: 'NAMIBIA',
      accountCurrency: 'NAD',
      currencyName: 'Namibia Dollar',
    },
    {
      code: 'NR',
      countryName: 'NAURU',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'NP',
      countryName: 'NEPAL',
      accountCurrency: 'NPR',
      currencyName: 'Nepalese Rupee',
    },
    {
      code: 'NL',
      countryName: 'NETHERLANDS',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'AN',
      countryName: 'NETHERLANDS ANTILLES',
      accountCurrency: 'ANG',
      currencyName: 'Netherlands Antillan Guilder',
    },
    {
      code: 'NC',
      countryName: 'NEW CALEDONIA',
      accountCurrency: 'XPF',
      currencyName: 'CFP Franc',
    },
    {
      code: 'NZ',
      countryName: 'NEW ZEALAND',
      accountCurrency: 'NZD',
      currencyName: 'New Zealand Dollar',
    },
    {
      code: 'NI',
      countryName: 'NICARAGUA',
      accountCurrency: 'NIO',
      currencyName: 'Cordoba Oro',
    },
    {
      code: 'NE',
      countryName: 'NIGER',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'NG',
      countryName: 'NIGERIA',
      accountCurrency: 'NGN',
      currencyName: 'Naira',
    },
    {
      code: 'NU',
      countryName: 'NIUE',
      accountCurrency: 'NZD',
      currencyName: 'New Zealand Dollar',
    },
    {
      code: 'NF',
      countryName: 'NORFOLK ISLAND',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'MP',
      countryName: 'NORTHERN MARIANA ISLANDS',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'NO',
      countryName: 'NORWAY',
      accountCurrency: 'NOK',
      currencyName: 'Norwegian Krone',
    },
    {
      code: 'OM',
      countryName: 'OMAN',
      accountCurrency: 'OMR',
      currencyName: 'Rial Omani',
    },
    {
      code: 'PK',
      countryName: 'PAKISTAN',
      accountCurrency: 'PKR',
      currencyName: 'Pakistan Rupee',
    },
    {
      code: 'PW',
      countryName: 'PALAU',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'PA',
      countryName: 'PANAMA',
      accountCurrency: 'PAB',
      currencyName: 'Balboa',
    },
    {
      code: 'PA',
      countryName: 'PANAMA',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'PG',
      countryName: 'PAPUA NEW GUINEA',
      accountCurrency: 'PGK',
      currencyName: 'Kina',
    },
    {
      code: 'PY',
      countryName: 'PARAGUAY',
      accountCurrency: 'PYG',
      currencyName: 'Guarani',
    },
    {
      code: 'PE',
      countryName: 'PERU',
      accountCurrency: 'PEN',
      currencyName: 'Nuevo Sol',
    },
    {
      code: 'PH',
      countryName: 'PHILIPPINES',
      accountCurrency: 'PHP',
      currencyName: 'Philippine Peso',
    },
    {
      code: 'PN',
      countryName: 'PITCAIRN',
      accountCurrency: 'NZD',
      currencyName: 'New Zealand Dollar',
    },
    {
      code: 'PL',
      countryName: 'POLAND',
      accountCurrency: 'PLN',
      currencyName: 'Zloty',
    },
    {
      code: 'PT',
      countryName: 'PORTUGAL',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'PR',
      countryName: 'PUERTO RICO',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'QA',
      countryName: 'QATAR',
      accountCurrency: 'QAR',
      currencyName: 'Qatari Rial',
    },
    {
      code: 'RE',
      countryName: 'REUNION',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'RO',
      countryName: 'ROMANIA',
      accountCurrency: 'ROL',
      currencyName: 'Leu',
    },
    {
      code: 'RU',
      countryName: 'RUSSIAN FEDERATION',
      accountCurrency: 'RUR',
      currencyName: 'Russian Ruble',
    },
    {
      code: 'RU',
      countryName: 'RUSSIAN FEDERATION',
      accountCurrency: 'RUB',
      currencyName: 'Russian Ruble',
    },
    {
      code: 'RW',
      countryName: 'RWANDA',
      accountCurrency: 'RWF',
      currencyName: 'Rwanda Franc',
    },
    {
      code: 'SH',
      countryName: 'SAINT HELENA',
      accountCurrency: 'SHP',
      currencyName: 'Saint Helena Pound',
    },
    {
      code: 'KN',
      countryName: 'SAINT KITTS AND NEVIS',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    {
      code: 'LC',
      countryName: 'SAINT LUCIA',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    {
      code: 'PM',
      countryName: 'SAINT PIERRE AND MIQUELON',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'VC',
      countryName: 'SAINT VINCENT AND THE GRENADINES',
      accountCurrency: 'XCD',
      currencyName: 'East Caribbean Dollar',
    },
    { code: 'WS', countryName: 'SAMOA', accountCurrency: 'WST', currencyName: 'Tala' },
    {
      code: 'SM',
      countryName: 'SAN MARINO',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'ST',
      countryName: 'SAO TOME AND PRINCIPE',
      accountCurrency: 'STD',
      currencyName: 'Dobra',
    },
    {
      code: 'SA',
      countryName: 'SAUDI ARABIA',
      accountCurrency: 'SAR',
      currencyName: 'Saudi Riyal',
    },
    {
      code: 'SN',
      countryName: 'SENEGAL',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'CS',
      countryName: 'SERBIA & MONTENEGRO',
      accountCurrency: 'EUR',
      currencyName: 'Euro',
    },
    {
      code: 'CS',
      countryName: 'SERBIA & MONTENEGRO',
      accountCurrency: 'CSD',
      currencyName: 'Serbian Dinar',
    },
    {
      code: 'SC',
      countryName: 'SEYCHELLES',
      accountCurrency: 'SCR',
      currencyName: 'Seychelles Rupee',
    },
    {
      code: 'SL',
      countryName: 'SIERRA LEONE',
      accountCurrency: 'SLL',
      currencyName: 'Leone',
    },
    {
      code: 'SG',
      countryName: 'SINGAPORE',
      accountCurrency: 'SGD',
      currencyName: 'Singapore Dollar',
    },
    {
      code: 'SK',
      countryName: 'SLOVAKIA',
      accountCurrency: 'SKK',
      currencyName: 'Slovak Koruna',
    },
    {
      code: 'SI',
      countryName: 'SLOVENIA',
      accountCurrency: 'SIT',
      currencyName: 'Tolar',
    },
    {
      code: 'SB',
      countryName: 'SOLOMON ISLANDS',
      accountCurrency: 'SBD',
      currencyName: 'Solomon Islands Dollar',
    },
    {
      code: 'SO',
      countryName: 'SOMALIA',
      accountCurrency: 'SOS',
      currencyName: 'Somali Shilling',
    },
    {
      code: 'ZA',
      countryName: 'SOUTH AFRICA',
      accountCurrency: 'ZAR',
      currencyName: 'Rand',
    },
    { code: 'ES', countryName: 'SPAIN', accountCurrency: 'EUR', currencyName: 'Euro' },
    {
      code: 'LK',
      countryName: 'SRI LANKA',
      accountCurrency: 'LKR',
      currencyName: 'Sri Lanka Rupee',
    },
    {
      code: 'SD',
      countryName: 'SUDAN',
      accountCurrency: 'SDD',
      currencyName: 'Sudanese Dinar',
    },
    {
      code: 'SR',
      countryName: 'SURINAME',
      accountCurrency: 'SRD',
      currencyName: 'Suriname Dollar',
    },
    {
      code: 'SJ',
      countryName: 'SVALBARD AND JAN MAYEN',
      accountCurrency: 'NOK',
      currencyName: 'Norwegian Krone',
    },
    {
      code: 'SZ',
      countryName: 'SWAZILAND',
      accountCurrency: 'SZL',
      currencyName: 'Lilangeni',
    },
    {
      code: 'SE',
      countryName: 'SWEDEN',
      accountCurrency: 'SEK',
      currencyName: 'Swedish Krona',
    },
    {
      code: 'CH',
      countryName: 'SWITZERLAND',
      accountCurrency: 'CHF',
      currencyName: 'Swiss Franc',
    },
    {
      code: 'SY',
      countryName: 'SYRIAN ARAB REPUBLIC',
      accountCurrency: 'SYP',
      currencyName: 'Syrian Pound',
    },
    {
      code: 'TW',
      countryName: 'TAIWAN, PROVINCE OF CHINA',
      accountCurrency: 'TWD',
      currencyName: 'New Taiwan Dollar',
    },
    {
      code: 'TJ',
      countryName: 'TAJIKISTAN',
      accountCurrency: 'TJS',
      currencyName: 'Somoni',
    },
    {
      code: 'TZ',
      countryName: 'TANZANIA, UNITED REPUBLIC OF',
      accountCurrency: 'TZS',
      currencyName: 'Tanzanian Shilling',
    },
    {
      code: 'TH',
      countryName: 'THAILAND',
      accountCurrency: 'THB',
      currencyName: 'Baht',
    },
    {
      code: 'TL',
      countryName: 'TIMOR-LESTE',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'TG',
      countryName: 'TOGO',
      accountCurrency: 'XOF',
      currencyName: 'CFA Franc BCEAO',
    },
    {
      code: 'TK',
      countryName: 'TOKELAU',
      accountCurrency: 'NZD',
      currencyName: 'New Zealand Dollar',
    },
    {
      code: 'TO',
      countryName: 'TONGA',
      accountCurrency: 'TOP',
      currencyName: 'Pa�anga',
    },
    {
      code: 'TT',
      countryName: 'TRINIDAD AND TOBAGO',
      accountCurrency: 'TTD',
      currencyName: 'Trinidad and Tobago Dollar',
    },
    {
      code: 'TN',
      countryName: 'TUNISIA',
      accountCurrency: 'TND',
      currencyName: 'Tunisian Dinar',
    },
    {
      code: 'TR',
      countryName: 'TURKEY',
      accountCurrency: 'TRL',
      currencyName: 'Turkish Lira',
    },
    {
      code: 'TM',
      countryName: 'TURKMENISTAN',
      accountCurrency: 'TMM',
      currencyName: 'Manat',
    },
    {
      code: 'TC',
      countryName: 'TURKS AND CAICOS ISLANDS',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'TV',
      countryName: 'TUVALU',
      accountCurrency: 'AUD',
      currencyName: 'Australian Dollar',
    },
    {
      code: 'UG',
      countryName: 'UGANDA',
      accountCurrency: 'UGX',
      currencyName: 'Uganda Shilling',
    },
    {
      code: 'UA',
      countryName: 'UKRAINE',
      accountCurrency: 'UAH',
      currencyName: 'Hryvnia',
    },
    {
      code: 'AE',
      countryName: 'UNITED ARAB EMIRATES',
      accountCurrency: 'AED',
      currencyName: 'UAE Dirham',
    },
    {
      code: 'GB',
      countryName: 'UNITED KINGDOM',
      accountCurrency: 'GBP',
      currencyName: 'Pound Sterling',
    },
    {
      code: 'US',
      countryName: 'UNITED STATES',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'US',
      countryName: 'UNITED STATES',
      accountCurrency: 'USS',
      currencyName: 'US Dollar (Same day)',
    },
    {
      code: 'US',
      countryName: 'UNITED STATES',
      accountCurrency: 'USN',
      currencyName: 'US Dollar (Next day)',
    },
    {
      code: 'UM',
      countryName: 'UNITED STATES MINOR OUTLYING ISLANDS',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'UY',
      countryName: 'URUGUAY',
      accountCurrency: 'UYU',
      currencyName: 'Peso Uruguayo',
    },
    {
      code: 'UZ',
      countryName: 'UZBEKISTAN',
      accountCurrency: 'UZS',
      currencyName: 'Uzbekistan Sum',
    },
    {
      code: 'VU',
      countryName: 'VANUATU',
      accountCurrency: 'VUV',
      currencyName: 'Vatu',
    },
    {
      code: 'VE',
      countryName: 'VENEZUELA',
      accountCurrency: 'VEB',
      currencyName: 'Bolivar',
    },
    {
      code: 'VN',
      countryName: 'VIET NAM',
      accountCurrency: 'VND',
      currencyName: 'Dong',
    },
    {
      code: 'VG',
      countryName: 'VIRGIN ISLANDS, BRITISH',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'VI',
      countryName: 'VIRGIN ISLANDS, U.S.',
      accountCurrency: 'USD',
      currencyName: 'US Dollar',
    },
    {
      code: 'WF',
      countryName: 'WALLIS AND FUTUNA',
      accountCurrency: 'XPF',
      currencyName: 'CFP Franc',
    },
    {
      code: 'EH',
      countryName: 'WESTERN SAHARA',
      accountCurrency: 'MAD',
      currencyName: 'Moroccan Dirham',
    },
    {
      code: 'YE',
      countryName: 'YEMEN',
      accountCurrency: 'YER',
      currencyName: 'Yemeni Rial',
    },
    {
      code: 'ZM',
      countryName: 'ZAMBIA',
      accountCurrency: 'ZMK',
      currencyName: 'Kwacha',
    },
    {
      code: 'ZW',
      countryName: 'ZIMBABWE',
      accountCurrency: 'ZWD',
      currencyName: 'Zimbabwe Dollar',
    },
  ];
  isShow: boolean = true;

  selectedCountryCode = 'ad';

  numberOnlyValidation(event: any) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  
  validateDisablebutton(button) {

    this.slideOneForm.valueChanges.subscribe(v => {
      // console.log("v:: ", v);
      if (button === 'disable1') {
        if (v.accountBranch != '' && v.accountNumber != '' && v.transactionAmount != '' && v.transactionCurrency != '') {
          this.submitted = false;
        } else {
          this.submitted = true;
        }
      }

      if (button === 'disable2') {
        if (v.transactionBranch != '' && v.transactionDate != '' && v.transactionTime != '' && v.accountNo != '') {
          this.submitted1 = false;
        } else {
          this.submitted1 = true;
        }
      }

    });
  }
 
  selectCurrencyCode(currency) {
    console.log(currency);
    this.selectedCountryCode = currency.toLowerCase();
  }

  changeSelectedCountryCode(value: string): void {
    // this.selectedCountryCode = value;
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: BranchPage,
      componentProps: {
      }
    });

    modal.onDidDismiss().then((modelData) => {
      if (modelData !== null) {
        let branch = modelData.data;
        console.log('Modal Data for branch: ', modelData.data);
        this.slideOneForm.patchValue({
          transactionBranch:modelData.data['data'].title + ', ' + modelData.data['data'].address
        });
      }
    });

    return await modal.present();
  }

  goToBranch(){
    this.router.navigate(['cashwithdrawal/branch']);
  }

  goToHomepage() {
    this.router.navigate(['/tabs/home']);
  }
  goToNextPage(fb) {
    this.flag = false;
  }
  goToPreviousPage() {
    this.flag = true;
  }
  goToNextScreen(form) {
    form.transactionDate.toString();
this.slideOneForm.reset();
    var date = new Date(form.transactionDate).toLocaleDateString('en-us');
    console.log(date); //4/
    form.transactionDate = date;

    // form.transactionTime=format(new Date(form.transactionTime), "HH:mm");
    form.transactionCurrency = form.transactionCurrency;
  

    form.transactionTime = format(new Date(form.transactionTime), 'hh:mm:ss a');
    form.customerId=this.customerId;
   
    console.log(form);
    this.accountNum=form.accountNumber;
    this.transactionAmount= form.transactionAmount;
    console.log(this.transactionAmount);
    this.transDate = moment(new Date(form.transactionDate)).format("DD-MM-YYYY").toString();
  
    localStorage.setItem("AccountNumber",form.accountNumber);
    localStorage.setItem("TransactionDate",this.transDate);
    localStorage.setItem("TransactionTime",form.transactionTime);
    localStorage.setItem("TransactionAmount",form.transactionAmount);
    localStorage.setItem("TransactionBranch",form.transactionBranch);

    this.api.cashWithdrawalSave(form).subscribe((resp) => {
      console.log('backend resp', resp);
      this.cashWithdrawResponse = resp;
    });
    if(this.cashWithdrawResponse!==null){
      setTimeout(() => {
         this.router.navigate(['token-generation']);
      }, 100);
     
    }
   
  }
  async openToast() {  
    const toast = await this.toastCtrl.create({  
      message: 'Account Number is not existing for this customer Id',  
      duration: 5000  
    });  
    toast.present();  
  }  
  accountEvent(event){
    console.log("event",event.detail.value)
    this.api.accountBalance(event.detail.value).subscribe((accbal) => {
      console.log('backend accbal', accbal.currentBalance);
  this.valueSet(accbal.currentBalance);
  console.log('backend accbal', accbal);
  console.log(this.slideOneForm.controls)
  this.currentBalance=accbal.amount;
  this.slideOneForm.controls.accountBalance.patchValue(accbal.amount);
  this.slideOneForm.controls.accountBranch.patchValue(accbal.accountBranch);
  this.slideOneForm.controls.transactionCurrency.patchValue(accbal.accountCurrency);
      // this.users=dropdown;
    //8042666041 8042666055
    });
   
  }
  valueSet(currentBalance){
    this.currentBalance=currentBalance;

  }
  savingAccountFun(filteredResponseSavingAccount)
  {

 console.log(filteredResponseSavingAccount);
 this.users = filteredResponseSavingAccount.map(a => a.accountId);
 const defaultId = this.users ? this.users[0] : null;
 this.slideOneForm.controls.accountNumber.setValue(defaultId);
 this.currentBalance = this.users[0].amount;
 }
}
interface CountryType {
  code: string;
  countryName: string;
  accountCurrency: string;
  currencyName: string;
}
