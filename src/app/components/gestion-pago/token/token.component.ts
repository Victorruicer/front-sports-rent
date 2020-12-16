import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';

import { StripeService, StripeCardComponent, ElementsOptions, ElementOptions } from 'ngx-stripe';


@Component({
  selector: 'token',
  templateUrl: './token.component.html',
})
export class TokenComponent implements OnInit {
paymentForm: FormGroup;
  stripeCardValid: boolean = false;
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  get validForm() {
    return this.paymentForm.valid && this.stripeCardValid;
  }

  elementsOptions: ElementsOptions = {
    locale: 'es'
  };

  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService
  ) { }

  ngOnInit() {
    this.paymentForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onChange({ type, event }) {
    if (type === 'change') {
      this.stripeCardValid = event.complete;
    }
  }

  buy() {
    this.stripeService
      .createToken(this.card.getCard(), { name: this.paymentForm.value.name })
      .subscribe(result => {
        if (result.token) {
          console.log(result.token);
        } else if (result.error) {
          console.log(result.error.message);
        }
      });
  }
}
