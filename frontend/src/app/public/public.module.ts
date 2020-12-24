import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const modules = [
  BrowserModule, 
  HttpClientModule, 
  ReactiveFormsModule,
  CommonModule,
]

@NgModule({
  declarations: [],
  imports: [modules],
  providers: [ApiService],
  exports: [modules]
})
export class PublicModule { }
