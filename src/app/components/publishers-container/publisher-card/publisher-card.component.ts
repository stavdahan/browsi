import { Component, Input } from '@angular/core';
import { Domain, Publisher } from '../../../types';
import { DomainCardComponent } from '../domain-card/domain-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomainFormComponent } from '../domain-card/domain-form/domain-form.component';

@Component({
  selector: 'app-publisher-card',
  standalone: true,
  templateUrl: './publisher-card.component.html',
  styleUrl: './publisher-card.component.css',
  imports: [
    DomainCardComponent,
    CommonModule,
    FormsModule,
    DomainFormComponent,
  ],
})
export class PublisherCardComponent {
  @Input() publisher!: Publisher;
  @Input() deletePublisher!: (publisherName: string) => void;
  isAdd: boolean = false;

  constructor() {}

  toggleAdd = () => {
    this.isAdd = !this.isAdd;
  };

  addDomainCardToUI() {
    let newDomain: Domain = {
      url: '',
      mobileAds: 0,
      desktopAds: 0,
    };
    this.publisher.domains.unshift(newDomain);
    this.toggleAdd();
  }
}
