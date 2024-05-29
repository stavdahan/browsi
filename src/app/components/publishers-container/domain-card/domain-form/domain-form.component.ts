import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  Domain,
  Publisher,
  AddDomain,
  UpdateDomain,
  DeleteDomain,
} from '../../../../types';
import { HttpService } from '../../../../http.service';

const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-domain-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './domain-form.component.html',
  styleUrl: './domain-form.component.css',
  providers: [],
})
export class DomainFormComponent {
  @Input() buttonContent!: string;
  @Input() isEdit!: boolean;
  @Input() domain!: Domain;
  @Input() publisher!: Publisher;
  @Input() toggleEdit!: () => void;
  @Input() toggleAdd!: () => void;

  domainInput!: string;
  mobileAdsInput!: number;
  desktopAdsInput!: number;
  isNewDomain!: boolean;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.resetDomainValues();
    this.isNewDomain = this.domain.url === '';
  }

  handleOnsubmit() {
    const isValid = this.checkDomainIsValid() && this.checkAdsNumbersAreValid();
    if (!isValid) {
      alert('Domain URL or number in Ads fields is invalid');
      return;
    }
    this.isNewDomain ? this.addDomain() : this.updateDomain();
  }

  handleOnDelete(e: Event) {
    e.preventDefault();
    if (!this.isNewDomain) {
      this.deleteDomain();
    } else {
      this.publisher.domains.shift();
      this.toggleAdd();
    }
  }

  handleOnCancel(e: Event) {
    if (this.isNewDomain) {
      this.toggleEdit();
      this.publisher.domains.shift();
    } else {
      this.handleOnDelete(e);
    }
    this.toggleAdd();
  }

  addDomain() {
    const AddDomainFields: AddDomain = {
      url: this.domainInput,
      mobileAds: this.mobileAdsInput,
      desktopAds: this.desktopAdsInput,
      publisherName: this.publisher.publisher,
    };
    this.httpService.addDomain(AddDomainFields).subscribe(
      (createdDomain) => {
        this.domain.url = createdDomain.url;
        this.domain.mobileAds = createdDomain.mobileAds;
        this.domain.desktopAds = createdDomain.desktopAds;
        this.isNewDomain = false;
        this.toggleAdd();
        this.toggleEdit();
      },
      (error) => {
        alert(error.error.errorMessage);
      }
    );
  }

  updateDomain() {
    const updateDomainFields: UpdateDomain = {
      newDomainURL: this.domainInput,
      url: this.domain.url,
      mobileAds: this.mobileAdsInput,
      desktopAds: this.desktopAdsInput,
      publisherName: this.publisher.publisher,
    };
    this.httpService.updateDomain(updateDomainFields).subscribe(
      (updatedDomain) => {
        this.domain.url = updatedDomain.url;
        this.domain.mobileAds = updatedDomain.mobileAds;
        this.domain.desktopAds = updatedDomain.desktopAds;
        this.mobileAdsInput = parseInt(this.mobileAdsInput.toString());
        this.desktopAdsInput = parseInt(this.desktopAdsInput.toString());
        this.toggleEdit();
      },
      (error) => alert(error.error.errorMessage)
    );
  }

  deleteDomain() {
    const deleteDomainFields: DeleteDomain = {
      url: this.domain.url,
      publisherName: this.publisher.publisher,
    };
    this.httpService.deleteDomain(deleteDomainFields).subscribe(
      () => {
        this.deleteDomainFromUI(this.domain.url);
      },
      (error) => console.error(error)
    );
  }

  checkDomainIsValid(): boolean {
    if (this.domainInput.match(domainRegex)) {
      return true;
    }
    this.resetDomainValues();
    return false;
  }

  checkAdsNumbersAreValid = (): boolean => {
    return (
      this.mobileAdsInput >= 0 &&
      this.desktopAdsInput >= 0 &&
      !isNaN(this.mobileAdsInput) &&
      !isNaN(this.desktopAdsInput)
    );
  };

  resetDomainValues(): void {
    this.domainInput = this.domain.url;
    this.mobileAdsInput = this.domain.mobileAds;
    this.desktopAdsInput = this.domain.desktopAds;
  }

  deleteDomainFromUI(domainURL: string) {
    const domains = this.publisher.domains;
    this.publisher.domains = domains.filter((site) => site.url !== domainURL);
  }
}
