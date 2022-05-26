import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Injectable({
  providedIn: 'root'
})
export class TrxnPdfDocDownloadService {

  constructor() { }

  head = [['Account Details', '']];
  trxnHeader=[['Date' , 'Transaction Type','Branch','Amount']];

  createPdf(trxnArrayList,customerDetails) {
    console.log('inside create pdf :: ',trxnArrayList);
    var doc = new jsPDF();
    var address =customerDetails.userAddress[0].address1 
    +' '+ customerDetails.userAddress[0].address2
    +' '+ customerDetails.userAddress[0].city
    +' '+ customerDetails.userAddress[0].state
    +' '+ customerDetails.userAddress[0].country
    +' '+ customerDetails.userAddress[0].zipCode;

    var info1= [ ['Name of the Account Holder',`${  customerDetails.firstName}  ${  customerDetails.lastName}`],
    ['Account Number',`${customerDetails.custAccount[0].accountId }`],
    ['Account Type',`${customerDetails.custAccount[0].accountType }`],
    ['CIF Number',`${customerDetails.cifNumber }`],
    ['Account Branch',`${customerDetails.custAccount[0].accountBranch}`],
    ['Address',`${address}`]
  ]
   
  let trxnArr=[];
   trxnArrayList.forEach((element,key) => {
  //  console.log('element :: ',element,' ==> key :: ',key);
   trxnArr.push([`${element.transactionDate}`, `${element.trnType}`, `${element.transactionBranch}`,`${element.transactionAmount}`]);
  //  console.log('trxnArr :: ',trxnArr);
  });

  // var transactionData = trxnArrayList.map(Object.values);
  //   var transactionHeaders = trxnArrayList.map(Object.keys);
  //   console.log('transactionData :: ',transactionData,' ==> transactionHeaders :: ',transactionHeaders);

    doc.setFontSize(22);
    doc.setTextColor(21, 67, 96);
    doc.text("Transaction Details", 12, 12);
    doc.setFontSize(10);
    doc.setTextColor(100);
   

    (doc as any).autoTable({
      head: this.head,
      body: info1,
      theme: 'striped',
      headStyles: {
        fillColor: [128, 139, 150]
        }
      // didDrawCell: data => {
      //   // console.log(data.column.index)
      //   console.log(data);
      // }
    });

    (doc as any).autoTable({
      head: this.trxnHeader,
      body: trxnArr,
      theme: 'striped',
      headStyles: {
        fillColor: [33, 47, 60],
        }
      // didDrawCell: data => {
      //   // console.log(data.column.index)
      //   console.log(data);
      // }
    });


    doc.output('dataurlnewwindow')
    const fileName = `${customerDetails.custAccount[0].accountId}` + new Date().getDate() + '_' + (new Date().getMonth() + 1) + '_' + new Date().getFullYear();
    doc.save(fileName+'.pdf');
  }
}
