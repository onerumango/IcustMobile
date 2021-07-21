import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class ShowMessageService {

  constructor() { }


  errorData: { code: any, message: string }[] = [
    { "code": 400, "message": "Bad Request" },
    { "code": 401, "message": "Unauthorized" },
    { "code": 403, "message": "Forbidden" },
    { "code": 404, "message": "Not Found" },
    { "code": 500, "message": "Internal Server Error" },
    { "code": 502, "message": "Bad Gateway" },
    { "code": 503, "message": "Service Unavailable" },
    { "code": 504, "message": "Gateway Timeout" },
    { "code": 0, "message": "Error" }
  ];

  errorMessage(status: any,errorResp) {
    console.log("show msg",status);
    console.log(errorResp);
    console.log("err msg : " + errorResp.error.message);
    var errCode=status.toString();
    var errDesc=errorResp.error.message;
    if (errDesc === null || errDesc === undefined ) {
        let i = 0;
        while (i < this.errorData.length) {
          if (this.errorData[i].code === status) {
            
            // this.toast.error(this.errorData[i].message, '', {
            //   timeOut: 3000,
            //   progressBar: true,
            //   tapToDismiss: true,
            //   closeButton: true,
            //   easeTime: 300,
            //   extendedTimeOut: 1000
            // });
            // Swal.fire('Oops', this.errorData[i].message, 'error');
            // Swal.fire({
              
            //   title: this.errorData[i].message ,
            //   text:"<p style='font-size: 20px>status</p>",
            //   width: 600
            // })
            errDesc = this.errorData[i].message;
          }
          i++;
        }
    } 
    Swal.fire({
      icon: 'error',
      // title:"Error Code : "+this.errorData[i].code ,
    // text:"Error message : "+this.errorData[i].message,
      title:"Error Code : " + errCode ,
      text:"Error message : " + errDesc.substring(0, 200), 
      
      width:500,
      // timer: 10000,
      // timerProgressBar: true,
      confirmButtonText: "OK",
    
      confirmButtonColor:'#456EFE'
      
      
    
    })
  }




}
