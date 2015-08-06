
(function(){
  var that = {};

  function isNumber(token) {
    return token !== undefined && token.match(/^[0-9]+(\.[0-9]+)?$/) !== null;
  }

  function isName(token) {
    return token !== undefined && token.match(/^[A-Za-z]+$/) !== null;
  }

  function isCategory(token) {
    return token !== undefined && token.match(/^sub\(\'[a-zA-Z0-9\s-_]+\'\)$/) !== null;
  }

  function isItem(token) {
    return token !== undefined && token.match(/^sub\(\'[a-zA-Z0-9\s-_]+\'\)\.item\(\'[a-zA-Z0-9\s-_]+\'\)$/) !== null;
  }

  that.getValueByName = function(name){
    throw new Error('you should redefine getValueByName')
  }

  that.getGategoryValue = function(categoryLiteral){
    throw new Error('you should redefine getGategoryValue')
  }

  that.getItemValue = function(itemLiteral){
    throw new Error('you should redefine getItemValue')
  }

  function tokenize(code) {
    var results = [];

    // var number = "[0-9]+(\.[0-9]+)?"
    // var name = "\'[a-zA-Z0-9\s-_]+\'";
    // var sub = "sub\("+name+"\)";
    // var item = sub + "\.item\("+name+"\)";

    /*
      Tokenize by priority
        - sub.item
        - sub
        - name literal
        - number or float
    */

    var tokenRegExp = /\s*(sub\(\'[a-zA-Z0-9\s-_]+\'\)\.item\(\'[a-zA-Z0-9\s-_]+\'\)|sub\(\'[a-zA-Z0-9\s-_]+\'\)|[A-Za-z]+|[0-9]+(\.[0-9]+)?|\S)\s*/g;

    var m;
    while ((m = tokenRegExp.exec(code)) !== null)
      results.push(m[1]);

    return results;
  }


  that.parse = function(code) {
    var tokens = tokenize(code);
    var position = 0;
    var result = parseExpr();

    if (position !== tokens.length)
      throw new SyntaxError("unexpected '" + peek() + "'");

    return result;

    function peek() {
      return tokens[position];
    }

    function consume(token) {
      position++;
    }

    /*
      Parse a PrimaryExpr
        that is, tokens matching one of the three syntax rules below.

      PrimaryExpr :
        Number
        Name
        ( Expr )
    */
    function parsePrimaryExpr() {
      var t = peek();

      if (isNumber(t)) {
        consume(t);
        return {type: "number", value: t};
      } else if (isName(t)) {
        consume(t);
        return {type: "name", id: t};
      } else if (isCategory(t)) {
        consume(t);
        return {type: "category", id: t};
      } else if (isItem(t)) {
        consume(t);
        return {type: "item", id: t};
      } else if (t === "(") {
        consume(t);
        var expr = parseExpr();
        if (peek() !== ")")
         throw new SyntaxError("expected )");
        consume(")");
        return expr;
      } else {
        throw new SyntaxError("expected a number, a variable, or parentheses");
      }
    }


    /*
      MulExpr :
        PrimaryExpr ( * PrimaryExpr | / PrimaryExpr )*
    */
    function parseMulExpr() {
      var expr = parsePrimaryExpr();
      var t = peek();
      while (t === "*" || t === "/") {
        consume(t);
        var rhs = parsePrimaryExpr();
        expr = {type: t, left: expr, right: rhs};
        t = peek();
      }
      return expr;
    }

    /*
      Expr :
        MulExpr ( + MulExpr | - MulExpr )*
    */
    function parseExpr() {
      var expr = parseMulExpr();
      var t = peek();
      while (t === "+" || t === "-") {
        consume(t);
        var rhs = parseMulExpr();
        expr = {type: t, left: expr, right: rhs};
        t = peek();
      }
      return expr;
    }
  }


  that.evaluateTree = function(parseTree) {
    function evaluatePart(part) {
      var result;
      switch(part.type){
        case '+':
          result = evaluatePart(part.left) + evaluatePart(part.right);
        break;
        case '-':
          result = evaluatePart(part.left) - evaluatePart(part.right);
        break;
        case '*':
          result = evaluatePart(part.left) * evaluatePart(part.right);
        break;
        case '/':
          var right = evaluatePart(part.right);
          if( right == 0 ) {
            throw new Error('division by zero');
          }
          result = evaluatePart(part.left) / right;
        break;
        case 'number':
          result = part.value*1;
        break;
        case 'name':
          result = that.getValueByName( part.id );
        break;
        case 'category':
          result = that.getGategoryValue( part.id );
        break;
        case 'item':
          result = that.getItemValue( part.id );
        break;
      }
      part.result = result;
      return result;
    }

    return evaluatePart(parseTree);
  }

  that.evaluate = function(formula){
    return that.evaluateTree( that.parse(formula) )
  }

  if(module){
    return module.exports = that;
  }

  window.formulaParser = that;

}());
