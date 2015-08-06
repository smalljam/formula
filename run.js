var util = require('util');

var parser = require('./parser.js');

console.log(parser)

parser.getValueByName = function(name){
  if(name == 'z')
    return 2;
  
  return 1;
}

/* 
  sub('Deposits')
  sub('Discounts')
  sub('Gross Sales')
  sub('Gross Receipts')
  sub('Net Sales')
  sub('Other Receipts')
  sub('Payouts')
  sub('Sales Taxes')
  sub('Voids')
*/
parser.getGategoryValue = function(categoryLiteral){
  var categoryName = categoryLiteral.replace("sub('",'').replace("')",'');
  switch(categoryName) {
    case 'Deposits':
      return 100;
    case 'Discounts':
      return 10;
    case 'Gross Sales':
      return 1000;
    case 'Gross Receipts':
      return 500;
    case 'Net Sales':
      return 1000;
    case 'Other Receipts':
      return 90;
    case 'Payouts':
      return 80;
    case 'Sales Taxes':
      return 100;
    case 'Voids':
      return 10;
  }
  return 1;
}

/*
  sub('Labor Summary').item('Labor Cost')
  sub('Labor Summary').item('Labor Hours')
*/
parser.getItemValue = function(itemLiteral){
  var t = itemLiteral.split('.');
  var itemName = t[1].replace("item('",'').replace("')",'');
  switch(itemName) {
    case 'Labor Cost':
      return 33;
    case 'Labor Hours':
      return 22;
  }
  return 1;
}

// GO

var expressions = [
  '2 + 2',
  '1 * 2 + 3 * 4 + 5 / 6.0',
  '3 + 1/(7 + 1/(15 + 1/(1 + 1/(292 + 1/(1 + 1/(1 + 1/1))))))',
  '1 / ((z + 1) * (z - 1))',
  "sub('Gross Receipts')-sub('Payouts') \n",
  "sub('Net Sales')+sub('Sales Taxes')          +sub('Other Receipts')",
  "sub('Gross Sales')-sub('Voids')-sub('Discounts')",
  "sub('Deposits')",
  "sub('Labor Summary').item('Labor Cost')   /  \n  sub('Labor Summary').item('Labor Hours')",
  "sub('Labor Summary').item('Labor Cost')/sub('Net Sales')",
  "(sub('Labor Summary').item('Labor Cost')/sub('Net Sales'))*8-2+15*(sub('Gross Receipts')-sub('Payouts')-8)"
];

expressions.forEach(function(v){
  console.log('')
  console.log( v )
  var tree = parser.parse(v);
  var result = parser.evaluateTree( tree );
  console.log( util.inspect( tree , false, null) );
  console.log('RESULT')
  console.log( result );
  console.log('')
})
