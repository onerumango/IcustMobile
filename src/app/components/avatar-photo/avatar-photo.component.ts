import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-avatar-photo',
    templateUrl: './avatar-photo.component.html',
    styleUrls: ['./avatar-photo.component.scss'],
})
export class AvatarPhotoComponent implements OnInit {

    @Input()
    public photoUrl: string;

    @Input()
    public name: string;

    public showInitials = false;
    public initials: string;
    public circleColor: string;

    private colors = [
        '#24CCA7',
        '#24CCA7',
        '#24CCA7',
        '#24CCA7', 
    ];
    ngOnInit() {

        if (!this.photoUrl) {
            this.showInitials = true;
            this.createInititals();

            const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
            this.circleColor = this.colors[randomIndex];
        }

    }

    private createInititals(): void {
        let names = this.name.split(' '),
            initials = names[0].substring(0, 1).toUpperCase();

        if (names.length > 1) {
            initials += names[names.length - 1].substring(0, 1).toUpperCase();
        }


        this.initials = initials;
        console.log("this.name", this.name);
        console.log("this.initials", this.initials);
    }
}