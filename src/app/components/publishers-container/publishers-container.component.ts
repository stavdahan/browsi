import { Component, OnInit } from '@angular/core';
import { PublisherCardComponent } from './publisher-card/publisher-card.component';
import { CommonModule } from '@angular/common';
import { Publisher } from '../../types';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-publishers-container',
  standalone: true,
  imports: [PublisherCardComponent, CommonModule],
  templateUrl: './publishers-container.component.html',
  styleUrl: './publishers-container.component.css',
})
export class PublishersContainerComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  isAddPublisher: boolean = false;
  publisherName: string = '';
  publishers: Array<Publisher> = [];

  ngOnInit(): void {
    this.httpService.getPublishers().subscribe(
      (data) => {
        this.publishers = data;
      },
      (error) => console.error(error)
    );
  }

  onChangeInputPublisher(e: Event): void {
    const inputElement = e.target as HTMLInputElement;
    this.publisherName = inputElement.value;
  }

  addPublisher(e: Event) {
    e.preventDefault();
    if (this.checkPublisherNameIsValid()) {
      const newPublisher: Publisher = {
        publisher: this.publisherName,
        domains: [],
      };
      this.httpService.addPublisher(newPublisher).subscribe(
        (data) => {
          this.publishers.unshift(data);
          this.publisherName = '';
        },
        (error) => {
          alert(error.error.errorMessage);
        }
      );
    } else {
      alert('publisher name length should greater than one character');
    }
  }

  deletePublisher = (publisherName: string) => {
    this.httpService.deletePublisher(publisherName).subscribe(
      () => {
        this.publishers = this.publishers.filter((publisher) => publisher.publisher !== publisherName)
      },
      (error) => alert(error.error.errorMessage)
    );
  }

  checkPublisherNameIsValid(): boolean {
    return this.publisherName.trim().length > 1;
  }
}
