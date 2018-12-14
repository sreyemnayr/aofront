import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddressComponent } from 'ngx-google-places-autocomplete/objects/addressComponent';

@Component({
  selector: 'formly-field-mat-input',
  template: `
    <mat-form-field>
      <mat-label>{{to.label}}</mat-label>
      <input 
      ngx-google-places-autocomplete
      #placesRef="ngx-places"
      (onAddressChange)="handleAddressChange($event)"
      matInput
      [id]="id"
      [readonly]="to.readonly"
      [type]="type || 'text'"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder">
    </mat-form-field>
    
  `
})
export class AddressInputComponent extends FieldType implements OnInit {
  @ViewChild(MatInput)
  formFieldControl: MatInput;

  @ViewChild('placesRef')
  placesRef: GooglePlaceDirective;
  public handleAddressChange(address: Address) {
    console.log(address);
    const street_number = this.getComponentByType(address, 'street_number')
      .long_name;
    const route = this.getComponentByType(address, 'route').long_name;

    const locality = this.getComponentByType(address, 'locality').long_name;
    const state = this.getComponentByType(
      address,
      'administrative_area_level_1'
    ).long_name;
    const state_code = this.getComponentByType(
      address,
      'administrative_area_level_1'
    ).short_name;
    const county = this.getComponentByType(
      address,
      'administrative_area_level_2'
    ).long_name;
    const country = this.getComponentByType(address, 'country').long_name;
    const country_code = this.getComponentByType(address, 'country').short_name;

    const postal_code = this.getComponentByType(address, 'postal_code')
      .long_name;
    const postal_code_suffix = this.getComponentByType(
      address,
      'postal_code_suffix'
    ).long_name;

    const neighborhood = this.getComponentByType(address, 'neighborhood')
      .long_name;

    const raw = address.formatted_address;

    this.model.address = {
      raw: raw,
      street_number: street_number,
      route: route,
      city: locality,
      state: state,
      state_code: state_code,
      postal_code: postal_code,
      postal_code_suffix: postal_code_suffix,
      country: country,
      country_code: country_code,
      neighborhood: neighborhood,
      parish: county
    };
  }

  public getComponentByType(address: Address, type: string): AddressComponent {
    if (!type) return null;

    if (
      !address ||
      !address.address_components ||
      address.address_components.length === 0
    )
      return null;

    type = type.toLowerCase();

    for (const comp of address.address_components) {
      if (!comp.types || comp.types.length === 0) continue;

      if (comp.types.findIndex(x => x.toLowerCase() === type) > -1) return comp;
    }

    return new class implements AddressComponent {
      long_name: '';
      short_name: '';
      types: string[];
    }();
  }

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    super.ngOnInit();
  }
}
