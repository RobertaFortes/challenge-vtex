var total = 0;
var products = {};
var valueDiscount = 0;
alert("Bem-vindo ao Carrinho de Compras!");
alert("Digite o ID do produto que deseja adicionar:");
$( "#addCart" ).focus();
function addToCart () {
  var addCart = document.getElementById('addCart').value;

  $.getJSON( "products.json", function( data ) {
    var items = data.products;
    for( var i = 0; i < items.length; ++i ) {

      var item = items[i];
      var id = item.id;
      var name = item.name;
      var price = item.price;

      if (addCart == item.id) {
        products = {
          id: item.id,
          name: item.name,
          price: item.price
        }

        alert("O produto " + item.name + " foi adicionado!");
        console.log(item.id, item.name,item.price );

        if (confirm("Deseja adicionar outro produto [S/n]?") == true) {
            $('#addCart').val('');
            $( "#addCart" ).focus();
            total += item.price;
        }
        else {
          total += item.price;
          if (confirm("Deseja adicionar cupom [S/n]?") == true) {
            getDiscount();
          }
          console.log("Total: " + total);
        }
      }
    };
  });
}

function getDiscount () {
  $( "#addDiscount" ).focus();
  var addDiscount = document.getElementById('addDiscount').value;
  $.getJSON( "discounts.json", function( data ) {
    var discount = data.discounts;
    for( var i = 0; i < discount.length; ++i ) {
      var item = discount[i];
      var id = item.idDiscount;
      var code = item.code;
      var value = item.value;

      if (addDiscount == item.code) {
        valueDiscount = item.value;
        console.log("Descontos: " + "-" + valueDiscount);
        total = total - valueDiscount;
        console.log("TOTAL: " + total);
      }
    }
  });
}
