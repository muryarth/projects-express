import mongoose from "mongoose";
// import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: { type: String, required: [true, "O título do livro é obrigatório"] },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O autor é obrigatório"] },
    editora: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "editoras",
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["64b998c5044205d09969d2c7", "64b998e7044205d09969d2c9", "64b99af2502f69d98dbd3ff1"],
        message: "O ID de uma editora deve ser informado. VALOR INFORMADO: {VALUE}"
      }
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. VALOR INFORMADO: {VALUE}"
      }
    }
    // numeroPaginas: { 
    //   type: Number,
    //   min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    //   max: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
    // }
  }
);

// livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export default livros;