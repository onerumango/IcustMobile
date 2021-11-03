import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.scss'],
})
export class TimeSlotsComponent implements OnInit {
  slots: any = [];
  selected: any;
  @Input() date: any;
  isLoading: boolean;
  TimeSolts=[]
  dateCollection: any=[];
  count: any;
  constructor(private modalCtr: ModalController, 
    public datepipe: DatePipe,private navPramas: NavParams, private api: ApiService, ) { }

  ngOnInit() {
    
    this.callingTimeslots();
    console.log(this.date);
    let date=this.datepipe.transform(this.date ,'yyyy-MM-dd');
    let date1=this.datepipe.transform(date, 'yyyy-MM-dd');
    this.loadtimeSlots(date1);
  }
  loadtimeSlots(date) {
    this.callingTimeslots();
    this.isLoading = true;
    this.api.gettingAvailableSlots(date).subscribe(availableSlotsResp => {
      
      if (availableSlotsResp) {
      this.isLoading=false;  
        availableSlotsResp.bookedSlots.forEach(element => {
          const index = this.TimeSolts.map(x => x.time).indexOf(element);
          if (index > -1) {
            this.TimeSolts[index].available = false;
            this.TimeSolts[index].booked = true;
          }
        });

      }

    }, (err) => {
      this.isLoading = false;
    })
  
  }
  // onSelectTime1(time, i) {
  //   console.log(i);
  //   this.count++;
  //   if (this.count > 1) {
  //     this.dateCollection = [];
  //     console.log(!this.TimeSolts[i].selected);
  //   }
  //   console.log("Time", time, i);

  //   this.TimeSolts[i].selected = !this.TimeSolts[i].selected;
  //   this.TimeSolts[i].available = !this.TimeSolts[i].available;
  //   console.log(this.TimeSolts[i].selected);
  //   const index = this.dateCollection.indexOf(time);
  //   if (index > -1 && !this.TimeSolts[i].selected) {
  //     this.dateCollection.splice(index, 1);
  //   }
  //   else if (index == -1 && this.TimeSolts[i].selected) {
  //     this.dateCollection.push(time);
  //     console.log(this.dateCollection);
  //   }

   

  // }
  onSelectiongTimeSlots(event,time)
  {console.log(time);
    this.selected=time;
  }
  onSelectTime1(time, i) {
    console.log(i);
    this.selected = time;
    this.count++;
    if (this.count > 1) {
      this.dateCollection = [];
      console.log(!this.TimeSolts[i].selected);
    }
    console.log("Time", time, i);

    this.TimeSolts[i].selected = !this.TimeSolts[i].selected;
    this.TimeSolts[i].available = !this.TimeSolts[i].available;
    console.log(this.TimeSolts[i].selected);
    const index = this.dateCollection.indexOf(time);
    console.log("index", this.dateCollection);
    this.TimeSolts.forEach((element, i) => {
      // const index = this.dateCollection.indexOf(element.time);
      console.log(this.TimeSolts, i, element.time);
      // if(!element.booked && element.time == time)
      // {
      //    this.TimeSolts[i].available = false;
      // }
      // else if(!element.booked && element.time != time)
      // {
      //    this.TimeSolts[i].available = true;
      // }
      // if (index > -1) {
      //   //this.TimeSolts[index].available = false;
      //   this.TimeSolts[index].booked = false;
      // }
    });
    if (index > -1 && !this.TimeSolts[i].selected) {
      console.log("in if");
      this.dateCollection.splice(index, 1);
    }
    else if (index == -1 && this.TimeSolts[i].selected) {
      console.log("in else");
    
      this.TimeSolts.forEach((element, i) => {
        // const index = this.dateCollection.indexOf(element.time);
        console.log(this.TimeSolts, i, element.time);
        if(!element.booked && element.time == time)
        {
           this.TimeSolts[i].available = false;
        }
        else if(!element.booked && element.time != time)
        {
           this.TimeSolts[i].available = true;
        }
        // if (index > -1) {
        //   //this.TimeSolts[index].available = false;
        //   this.TimeSolts[index].booked = false;
        // }
      });
      this.dateCollection =[];
      this.dateCollection.push(time);
      console.log(this.dateCollection);
    }

    

  }
 
  format24HrsTo12Hrs(time) {
    var formatted = moment(time, "HH:mm").format("LT");
    return formatted;
  }

  close() {
    this.modalCtr.dismiss(this.selected);
  }
  callingTimeslots() {
    this.TimeSolts = [
      {
        "time": "9:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "9:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:25",
        "available": true,
        "selected": false,
        "booked": false
      },

      {
        "time": "10:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "10:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:15",
        "available": true,
        "selected": false,
        "booked": false
      }, {
        "time": "11:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "11:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "12:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      
      {
        "time": "13:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "13:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "14:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "15:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:00",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:05",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:10",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:15",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:20",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:25",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:30",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:35",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:40",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:45",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:50",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "16:55",
        "available": true,
        "selected": false,
        "booked": false
      },
      {
        "time": "17:00",
        "available": true,
        "selected": false,
        "booked": false
      }
    ];
  }
}
