`node run.js`

```
2 + 2
{ type: '+',
  left: { type: 'number', value: '2', result: 2 },
  right: { type: 'number', value: '2', result: 2 },
  result: 4 }
RESULT
4


1 * 2 + 3 * 4 + 5 / 6.0
{ type: '+',
  left: 
   { type: '+',
     left: 
      { type: '*',
        left: { type: 'number', value: '1', result: 1 },
        right: { type: 'number', value: '2', result: 2 },
        result: 2 },
     right: 
      { type: '*',
        left: { type: 'number', value: '3', result: 3 },
        right: { type: 'number', value: '4', result: 4 },
        result: 12 },
     result: 14 },
  right: 
   { type: '/',
     left: { type: 'number', value: '5', result: 5 },
     right: { type: 'number', value: '6.0', result: 6 },
     result: 0.8333333333333334 },
  result: 14.833333333333334 }
RESULT
14.833333333333334


3 + 1/(7 + 1/(15 + 1/(1 + 1/(292 + 1/(1 + 1/(1 + 1/1))))))
{ type: '+',
  left: { type: 'number', value: '3', result: 3 },
  right: 
   { type: '/',
     left: { type: 'number', value: '1', result: 1 },
     right: 
      { type: '+',
        left: { type: 'number', value: '7', result: 7 },
        right: 
         { type: '/',
           left: { type: 'number', value: '1', result: 1 },
           right: 
            { type: '+',
              left: { type: 'number', value: '15', result: 15 },
              right: 
               { type: '/',
                 left: { type: 'number', value: '1', result: 1 },
                 right: 
                  { type: '+',
                    left: { type: 'number', value: '1', result: 1 },
                    right: 
                     { type: '/',
                       left: { type: 'number', value: '1', result: 1 },
                       right: 
                        { type: '+',
                          left: { type: 'number', value: '292', result: 292 },
                          right: 
                           { type: '/',
                             left: { type: 'number', value: '1', result: 1 },
                             right: 
                              { type: '+',
                                left: { type: 'number', value: '1', result: 1 },
                                right: 
                                 { type: '/',
                                   left: { type: 'number', value: '1', result: 1 },
                                   right: 
                                    { type: '+',
                                      left: { type: 'number', value: '1', result: 1 },
                                      right: 
                                       { type: '/',
                                         left: { type: 'number', value: '1', result: 1 },
                                         right: { type: 'number', value: '1', result: 1 },
                                         result: 1 },
                                      result: 2 },
                                   result: 0.5 },
                                result: 1.5 },
                             result: 0.6666666666666666 },
                          result: 292.6666666666667 },
                       result: 0.0034168564920273345 },
                    result: 1.0034168564920274 },
                 result: 0.9965947786606129 },
              result: 15.996594778660613 },
           result: 0.06251330447740013 },
        result: 7.0625133044774 },
     result: 0.14159265361893664 },
  result: 3.1415926536189365 }
RESULT
3.1415926536189365


1 / ((z + 1) * (z - 1))
{ type: '/',
  left: { type: 'number', value: '1', result: 1 },
  right: 
   { type: '*',
     left: 
      { type: '+',
        left: { type: 'name', id: 'z', result: 2 },
        right: { type: 'number', value: '1', result: 1 },
        result: 3 },
     right: 
      { type: '-',
        left: { type: 'name', id: 'z', result: 2 },
        right: { type: 'number', value: '1', result: 1 },
        result: 1 },
     result: 3 },
  result: 0.3333333333333333 }
RESULT
0.3333333333333333


sub('Gross Receipts')-sub('Payouts') 

{ type: '-',
  left: { type: 'category', id: 'sub(\'Gross Receipts\')', result: 500 },
  right: { type: 'category', id: 'sub(\'Payouts\')', result: 80 },
  result: 420 }
RESULT
420


sub('Net Sales')+sub('Sales Taxes')          +sub('Other Receipts')
{ type: '+',
  left: 
   { type: '+',
     left: { type: 'category', id: 'sub(\'Net Sales\')', result: 1000 },
     right: { type: 'category', id: 'sub(\'Sales Taxes\')', result: 100 },
     result: 1100 },
  right: { type: 'category', id: 'sub(\'Other Receipts\')', result: 90 },
  result: 1190 }
RESULT
1190


sub('Gross Sales')-sub('Voids')-sub('Discounts')
{ type: '-',
  left: 
   { type: '-',
     left: { type: 'category', id: 'sub(\'Gross Sales\')', result: 1000 },
     right: { type: 'category', id: 'sub(\'Voids\')', result: 10 },
     result: 990 },
  right: { type: 'category', id: 'sub(\'Discounts\')', result: 10 },
  result: 980 }
RESULT
980


sub('Deposits')
{ type: 'category', id: 'sub(\'Deposits\')', result: 100 }
RESULT
100


sub('Labor Summary').item('Labor Cost')   /  
  sub('Labor Summary').item('Labor Hours')
{ type: '/',
  left: 
   { type: 'item',
     id: 'sub(\'Labor Summary\').item(\'Labor Cost\')',
     result: 33 },
  right: 
   { type: 'item',
     id: 'sub(\'Labor Summary\').item(\'Labor Hours\')',
     result: 22 },
  result: 1.5 }
RESULT
1.5


sub('Labor Summary').item('Labor Cost')/sub('Net Sales')
{ type: '/',
  left: 
   { type: 'item',
     id: 'sub(\'Labor Summary\').item(\'Labor Cost\')',
     result: 33 },
  right: { type: 'category', id: 'sub(\'Net Sales\')', result: 1000 },
  result: 0.033 }
RESULT
0.033


(sub('Labor Summary').item('Labor Cost')/sub('Net Sales'))*8-2+15*(sub('Gross Receipts')-sub('Payouts')-8)
{ type: '+',
  left: 
   { type: '-',
     left: 
      { type: '*',
        left: 
         { type: '/',
           left: 
            { type: 'item',
              id: 'sub(\'Labor Summary\').item(\'Labor Cost\')',
              result: 33 },
           right: { type: 'category', id: 'sub(\'Net Sales\')', result: 1000 },
           result: 0.033 },
        right: { type: 'number', value: '8', result: 8 },
        result: 0.264 },
     right: { type: 'number', value: '2', result: 2 },
     result: -1.736 },
  right: 
   { type: '*',
     left: { type: 'number', value: '15', result: 15 },
     right: 
      { type: '-',
        left: 
         { type: '-',
           left: { type: 'category', id: 'sub(\'Gross Receipts\')', result: 500 },
           right: { type: 'category', id: 'sub(\'Payouts\')', result: 80 },
           result: 420 },
        right: { type: 'number', value: '8', result: 8 },
        result: 412 },
     result: 6180 },
  result: 6178.264 }
RESULT
6178.264
```
