class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    try {
      const animais = {
        Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
        Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
        Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
        Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
        Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
        Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
        Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
      };

      const brinquedosValidos = [
        "RATO",
        "BOLA",
        "LASER",
        "CAIXA",
        "NOVELO",
        "SKATE",
      ];

      function validarBrinquedos(brinquedosString) {
        if (!brinquedosString)
          return { erro: "os brinquedos não podem ser vazios" };
        const brinquedos = brinquedosString
          .split(",")
          .map((b) => b.trim().toUpperCase());
        const setBrinquedos = new Set();
        for (const b of brinquedos) {
          if (!brinquedosValidos.includes(b))
            return { erro: "Brinquedo inválido" };
          if (setBrinquedos.has(b)) return { erro: "Brinquedo duplicado" };
          setBrinquedos.add(b);
        }
        return brinquedos;
      }

      const pessoa1 = validarBrinquedos(brinquedosPessoa1);
      if (pessoa1.erro) return { erro: pessoa1.erro, lista: null };

      const pessoa2 = validarBrinquedos(brinquedosPessoa2);
      if (pessoa2.erro) return { erro: pessoa2.erro, lista: null };

      if (!ordemAnimais) return { erro: "ordem animais vazia", lista: null };
      const animaisOrdem = ordemAnimais.split(",").map((a) => a.trim());
      const setAnimais = new Set();
      for (const animal of animaisOrdem) {
        if (!animais[animal]) return { erro: "Animal inválido", lista: null };
        if (setAnimais.has(animal))
          return { erro: "animal duplicado", lista: null };
        setAnimais.add(animal);
      }

      function brinquedosNaOrdem(brinquedosPessoa, brinquedosAnimal) {
        let iAnimal = 0;

        for (let j = 0; j < brinquedosPessoa.length; j++) {
          if (brinquedosPessoa[j] === brinquedosAnimal[iAnimal]) {
            iAnimal++;
          }
          if (iAnimal === brinquedosAnimal.length) {
            return true;
          }
        }

        return false;
      }

      function brinquedosPresentes(brinquedosPessoa, brinquedosAnimal) {
        return brinquedosAnimal.every((b) => brinquedosPessoa.includes(b));
      }

      const animaisAdotadosPessoa1 = [];
      const animaisAdotadosPessoa2 = [];
      const resultados = [];

      for (const animalNome of animaisOrdem) {
        const animal = animais[animalNome];
        let ehPermitidoPessoa1 = false;
        let ehPermitidoPessoa2 = false;

        if (animalNome === "Loco") {
          ehPermitidoPessoa1 =
            brinquedosPresentes(pessoa1, animal.brinquedos) &&
            animaisAdotadosPessoa1.length > 0;
          ehPermitidoPessoa2 =
            brinquedosPresentes(pessoa2, animal.brinquedos) &&
            animaisAdotadosPessoa2.length > 0;
        } else {
          ehPermitidoPessoa1 = brinquedosNaOrdem(pessoa1, animal.brinquedos);
          ehPermitidoPessoa2 = brinquedosNaOrdem(pessoa2, animal.brinquedos);
        }

        if (animal.tipo === "gato") {
          const brinquedosComuns = animal.brinquedos.filter(
            (b) => pessoa1.includes(b) && pessoa2.includes(b)
          );
          if (
            brinquedosComuns.length > 0 &&
            ehPermitidoPessoa1 &&
            ehPermitidoPessoa2
          ) {
            ehPermitidoPessoa1 = false;
            ehPermitidoPessoa2 = false;
          }
        }

        if (ehPermitidoPessoa1 && ehPermitidoPessoa2) {
          resultados.push({ animal: animalNome, destino: "abrigo" });
        } else if (ehPermitidoPessoa1) {
          if (animaisAdotadosPessoa1.length < 3) {
            animaisAdotadosPessoa1.push(animalNome);
            resultados.push({ animal: animalNome, destino: "pessoa 1" });
          } else {
            resultados.push({ animal: animalNome, destino: "abrigo" });
          }
        } else if (ehPermitidoPessoa2) {
          if (animaisAdotadosPessoa2.length < 3) {
            animaisAdotadosPessoa2.push(animalNome);
            resultados.push({ animal: animalNome, destino: "pessoa 2" });
          } else {
            resultados.push({ animal: animalNome, destino: "abrigo" });
          }
        } else {
          resultados.push({ animal: animalNome, destino: "abrigo" });
        }
      }

      resultados.sort((a, b) => {
        if (a.animal < b.animal) {
          return -1;
        }
        if (a.animal > b.animal) {
          return 1;
        }
        return 0;
      });

      const listaFinal = resultados.map((r) => `${r.animal} - ${r.destino}`);

      return { lista: listaFinal, erro: null };
    } catch (e) {
      console.error("Erro:", error.message);
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
