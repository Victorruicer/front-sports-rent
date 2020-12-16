import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  title = 'Reserva prueba';
  priceId = 'prod_IZs9lO2paTShz0';
  product = {
    title: 'Reserva de pista Voley EXT_VOLEY_1_1',
    subTitle: 'reserva pista',
    description: 'alquiler pista voley',
    price: 10.00
  };
  quantity = 2;
  stripePromise = loadStripe(environment.stripe_key);

  async checkout() {
    // Call your backend to create the Checkout session.

    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await this.stripePromise;
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: this.priceId, quantity: this.quantity }],
      successUrl: `${window.location.href}/success`,
      cancelUrl: `${window.location.href}/failure`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      console.log(error);
    }

  }
}

