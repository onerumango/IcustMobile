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

  createPdf(trxnArrayList,customerDetails,currDate) {
    console.log('inside create pdf :: ',trxnArrayList);
    var doc = new jsPDF();
    var imgData ="data:image/png;base64,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";
    doc.addImage(imgData, 'PNG', 5, 5, 25, 5);
    // var svgAsText = new XMLSerializer().serializeToString(svgText.documentElement);
    //     doc.addSVG(svgAsText, 20, 20, doc.internal.pageSize.width - 20*2)


    var address =customerDetails.userAddress[0].address1 
    +' '+ customerDetails.userAddress[0].address2
    +' '+ customerDetails.userAddress[0].city
    +' '+ customerDetails.userAddress[0].state
    +' '+ customerDetails.userAddress[0].country
    +' '+ customerDetails.userAddress[0].zipCode;
    var id = `${customerDetails.custAccount[0].accountId}`;
    var lastFour = id.substr(id.length - 4); 
    var maskedAccountId = '********'+lastFour;
    var info1= [ ['Name of the Account Holder',`${  customerDetails.firstName}  ${  customerDetails.lastName}`],
    ['Account Number',`${maskedAccountId}`],
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
    // doc.setet
    // doc.setFontSize(22);
    // doc.setTextColor(21, 67, 96);
    // doc.text("Transaction Details                            "+`${currDate}`, 12, 12);
    // doc.setFontSize(10);
    // doc.setTextColor(100);

    var header= [ ['Transaction Details        ','      ',' ','       ',`       ${currDate}`]];
    (doc as any).autoTable({
      head: header,
      theme: 'striped',
      headStyles: {
        fillColor: [253, 254, 254 ],
        textColor:[21, 67, 96]
        }, styles: {
          fontSize: 16,
          font: 'majalla'
      }
      // didDrawCell: data => {
      //   // console.log(data.column.index)
      //   console.log(data);
      // }
    });
   

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
