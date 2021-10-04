import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.scss']
})
export class ReceiptFormComponent implements OnInit {

  recepitForm: FormGroup;
  result: any;
  successMessage = ''
  errorMessage = ''

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    window.scrollTo(0, 0)

    this.recepitForm = this.formBuilder.group({
      vehicle_number: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }
  onSubmit() {
    console.log(this.recepitForm.value);
    this.generatePDF()
  }

  selectType(e) {
    console.log(e.target.value);
    // this.recepitForm.setControl('amount', e.target.value)
    let amount = e.target.value
    this.recepitForm.patchValue({
      amount
    });

  }

  generatePDF() {
    let docDefinition = {
      pageOrientation: 'portrait',
      pageMargins: [5, 10, 5, 10],
      pageSize: { width: 294.803149606, height: 234.330708661 },
      // header: [{ text: 'PWD-NH', alignment: 'center', italics: true }],
      content: [
        {
          text: 'PWD-NH',
          fontSize: 12,
          alignment: 'center',
          // color: '#047886'
          margin: [0, 0, 8, 0]
        },
        {

          columns: [
            [
              {
                text: "Toll Plaza Name", fontSize: 10,
              },
              { text: "Section", fontSize: 10, },
              { text: "Ticket No.", fontSize: 10, },
              { text: "Booth & Operator ID", fontSize: 10, },
              { text: "Date & Time", fontSize: 10, },
              { text: "Vehicle No.", fontSize: 10, },
              { text: "Type Of Vehicle", fontSize: 10, },
              { text: "Type Of Journey", fontSize: 10, },
              { text: "Fee", fontSize: 10, },
            ],
            [
              {
                text: `: ${new Date().toLocaleString()}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: ${this.recepitForm.value.vehicle_number}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: ${((Math.random() * 1000).toFixed(0))}`,
                fontSize: 10,
              },
              {
                text: `: Rs. ${this.recepitForm.value.amount}`,
                fontSize: 10,
              },
            ],

          ],


        },
        {
          text: '--------------Only for overloaded vehicle------------',
          alignment: 'center',
          // color: '#047886'
          margin: [0, 0, 5, 0]
        },
        {

          columns: [
            [
              {
                text: "Standard Wt. Of. Vehicle", fontSize: 10,
              },
              { text: "Actual Wt. Of. Vehicle", fontSize: 10, },
              { text: "Overloaded Vehicle Fees", fontSize: 10, },
              
            ],
            [
              {
                text: `:  0.00 Kg`,
                fontSize: 10,
              },
              {
                text: `:  0.00 Kg`,
                fontSize: 10,
              },
              {
                text: `: Rs. 0.00`,
                fontSize: 10,
              },
              
            ],

          ],


        },
        {
          text: '**** WISH YOU SAFE & HAPPY JOURNEY****',
          alignment: 'center',
          // color: '#047886'
          margin: [0, 5, 5, 0]
        },
      ],
    };

    pdfMake.createPdf(docDefinition).open();
    // pdfMake.createPdf(docDefinition).print()
  }
}
