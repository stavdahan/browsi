import {Component, Input} from '@angular/core';
import {Domain, Publisher} from "../../../types";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import { DomainFormComponent } from "./domain-form/domain-form.component";

@Component({
  selector: 'app-domain-card',
  standalone: true,
  templateUrl: './domain-card.component.html',
  styleUrl: './domain-card.component.css',
  imports: [CommonModule, FormsModule, DomainFormComponent],
})
export class DomainCardComponent {
  @Input() domain!: Domain;
  @Input() publisher!: Publisher;
  @Input() toggleAdd!: () => void;
  isEdit: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (!this.domain.url.length) {
      this.isEdit = true;
    }
  }

  toggleEdit = () => {
    this.isEdit = !this.isEdit;
  };
}
