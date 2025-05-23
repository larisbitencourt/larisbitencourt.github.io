/* eslint-disable max-len*/
/* eslint-disable no-unused-vars */

const assert = require("assert");
const productDetails = require("../src/productDetails");

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe("#productDetails", () => {
  it("tests the function has the correct behaviour", () => {
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    assert.strictEqual(
      Array.isArray(productDetails("Alcool", "Máscara")),
      true
    );
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.strictEqual(productDetails("Alcool", "Máscara").length, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    assert.strictEqual(
      typeof Object.values(productDetails("Alcool", "Máscara")),
      "object"
    );
    // Teste que os dois objetos são diferentes entre si.
    assert.notStrictEqual(
      productDetails("Alcool", "Máscara")[0],
      productDetails("Alcool", "Máscara")[1]
    );
    // (Difícil) Teste que os dois productIds terminam com 123.
    const [{ details: firstProduct }, { details: secondProduct }] = productDetails('Alcool', 'Máscara');

    assert.ok(firstProduct.productId.endsWith("123"));
    assert.ok(secondProduct.productId.endsWith("123"));

    // assert.fail();
  });
});
