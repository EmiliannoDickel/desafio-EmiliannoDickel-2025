import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  let abrigo;

  beforeEach(() => {
    abrigo = new AbrigoAnimais();
  });

  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );
    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });

  test("deve retornar erro se o brinquedosPessoa1 for vazio ou nulo", () => {
    const resultado = abrigo.encontraPessoas("", "RATO,BOLA", "Rex");
    expect(resultado.erro).toBe("os brinquedos não podem ser vazios");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro se o brinquedosPessoa2 for vazio ou nulo", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "", "Rex");
    expect(resultado.erro).toBe("os brinquedos não podem ser vazios");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro se algum brinquedo for inválido (Pessoa 1)", () => {
    const resultado = abrigo.encontraPessoas("RATO,TESTE", "BOLA", "Rex");
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro se algum brinquedo for inválido (Pessoa 2)", () => {
    const resultado = abrigo.encontraPessoas("RATO", "BOLA,TESTE", "Rex");
    expect(resultado.erro).toBe("Brinquedo inválido");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro com brinquedo repetido (Pessoa 1)", () => {
    const resultado = abrigo.encontraPessoas("RATO,RATO", "BOLA", "Rex");
    expect(resultado.erro).toBe("Brinquedo duplicado");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro com brinquedo repetido (Pessoa 2)", () => {
    const resultado = abrigo.encontraPessoas("RATO", "BOLA,BOLA", "Rex");
    expect(resultado.erro).toBe("Brinquedo duplicado");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro se ordemAnimais for vazio ou nulo", () => {
    const resultado = abrigo.encontraPessoas("RATO,BOLA", "BOLA,LASER", "");
    expect(resultado.erro).toBe("ordem animais vazia");
    expect(resultado.lista).toBeNull();
  });

  test("deve retornar erro se animal for duplicado na ordem", () => {
    const resultado = abrigo.encontraPessoas(
      "RATO,BOLA",
      "BOLA,LASER",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("animal duplicado");
    expect(resultado.lista).toBeNull();
  });

  test("deve enviar animal para o abrigo se ambas as pessoas puderem adotar", () => {
    const brinquedosPessoa1 = "RATO,BOLA";
    const brinquedosPessoa2 = "RATO,BOLA";
    const ordemAnimais = "Rex";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual(["Rex - abrigo"]);
    expect(resultado.erro).toBeNull();
  });

  test("deve enviar gato para o abrigo se houver brinquedos em comum e ambas as pessoas coneguirem adotar", () => {
    const brinquedosPessoa1 = "BOLA,RATO,LASER";
    const brinquedosPessoa2 = "BOLA,RATO,LASER";
    const ordemAnimais = "Mimi";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual(["Mimi - abrigo"]);
    expect(resultado.erro).toBeNull();
  });

  test("deve limitar a adoção a 3 animais por pessoa (Pessoa 1)", () => {
    const brinquedosPessoa1 = "RATO,BOLA,LASER,CAIXA,NOVELO";
    const brinquedosPessoa2 = "NOVELO,LASER";
    const ordemAnimais = "Rex,Bebe,Bola,Mimi";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual([
      "Bebe - abrigo",
      "Bola - pessoa 1",
      "Mimi - pessoa 1",
      "Rex - pessoa 1",
    ]);
    expect(resultado.erro).toBeNull();
  });

  test("deve limitar a adoção a 3 animais por pessoa (Pessoa 2)", () => {
    const brinquedosPessoa1 = "NOVELO,LASER";
    const brinquedosPessoa2 = "RATO,BOLA,LASER,CAIXA,NOVELO";
    const ordemAnimais = "Rex,Bebe,Bola,Mimi";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual([
      "Bebe - abrigo",
      "Bola - pessoa 2",
      "Mimi - pessoa 2",
      "Rex - pessoa 2",
    ]);
    expect(resultado.erro).toBeNull();
  });

  test("deve enviar animal para o abrigo se ninguém puder adotar", () => {
    const brinquedosPessoa1 = "CAIXA";
    const brinquedosPessoa2 = "NOVELO";
    const ordemAnimais = "Rex";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual(["Rex - abrigo"]);
    expect(resultado.erro).toBeNull();
  });

  test("deve levar o animal loco para o abrigo, se ninguém tiver os brinquedos", () => {
    const brinquedosPessoa1 = "BOLA,LASER";
    const brinquedosPessoa2 = "CAIXA,NOVELO";
    const ordemAnimais = "Loco";
    const resultado = abrigo.encontraPessoas(
      brinquedosPessoa1,
      brinquedosPessoa2,
      ordemAnimais
    );
    expect(resultado.lista).toEqual(["Loco - abrigo"]);
    expect(resultado.erro).toBeNull();
  });
});
