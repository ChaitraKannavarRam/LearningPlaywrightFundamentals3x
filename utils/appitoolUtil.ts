import { type Page, type Locator, expect } from "@playwright/test";

export async function calculator(page: Page, success:Locator, danger: Locator) {

    let successCount= await success.count();
    let dangerCount = await danger.count();

    let sum: number =0;
    for(let i=0;i<successCount;i++){

         let value = await success.nth(i).innerText();
         value = value.replace(/[^0-9.]/g,'');
          console.log(value);
         sum = sum +  Number(value);
    }

        for(let i=0;i<dangerCount;i++){

         let value = await danger.nth(i).innerText();
         value = value.replace(/[^0-9.]/g,'');
         console.log(value);
         sum = sum -  Number(value);
        
    }
    console.log(sum);
    expect(sum).toBeCloseTo(1996.22,2);
    
}
