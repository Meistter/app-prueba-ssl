import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import eruda from 'eruda';
eruda.init()
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'app-prueba-ssl';


  otpListener(): void{
    if ("OTPCredential" in window) {
      console.log('Explorador valido');
      
  // window.addEventListener("DOMContentLoaded", (e) => {
    const input = document.querySelector('input[autocomplete="one-time-code"]') as HTMLInputElement;
    if (!input) return;
    const ac = new AbortController();
    const form = input.closest("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        ac.abort();
      });
    }
    // Request the OTP via get()
    console.log('esperando OTP');
    console.log('Input Seleccionado:',input);
    input.focus()
    
    
      navigator.credentials.get({
        otp: { transport: ["sms"] },
        signal: ac.signal} as any)
      .then((otp: any) => {        
        input.value = otp.code;
        if (form) form.submit();
      })
      .catch((err) => {
        console.error(err);
      });
  // });
}
  }

  ngAfterViewInit() {
    console.log('Corremos');
    
    this.otpListener()
  }
}
