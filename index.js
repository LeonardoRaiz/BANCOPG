const { query } = require("express");
const express = require("express");
const app = express();
app.use(express.json());
app.listen(8080);

//Chamar a conexão do banco
const { pool } = require("./src/database/database");

//Teste do banco
app.get("/recive", (req, res) => {
  const testeBanco = async (res) => {
    const query = "SELECT NOW()";
    await pool.query(query).then((res) => {
      if (res.rows[0]) {
        console.table(res.rows[0]);
      } else {
        console.log("erro");
      }
    });
  };

  return testeBanco();
});

//SELECT *
//query = `SELECT * FROM "Nome Tabela"`
app.get("/todosCursos", (req, res) => {
  const todosCursos = async () => {
    const query = `SELECT * FROM "Cursos"`;
    await pool.query(query).then((res) => {
      if (res.rows) {
        // Se for true, retorna os valores do banco
        console.table(res.rows);
      }
    });
  };

  return todosCursos();
});

//SELECT de um unico elemento
//query = `SELECT "nomeCurso" FROM "Nome Tabela" WHERE "id" = ${id}`
app.get("/umCurso/:index", (req, res) => {
  const { index } = req.params;
  //Criar a função que vai chamar o banco
  const umCurso = async () => {
    const query = `SELECT "Nome" FROM "Cursos" WHERE "ID" = ${parseInt(index)}`;
    console.log(index);
    await pool.query(query).then((res) => {
      if (res.rows) {
        console.table(res.rows);
      }
    });
  };

  return umCurso();
});

//--------------------

app.post("/umCurso", (req, res) => {
  const { id } = req.body;

  const umCurso = async () => {
    const query = `SELECT * FROM "Cursos" WHERE "ID" = ${id}`;
    await pool.query(query).then((resp) => {
      if (resp.rows) {
        console.table(resp.rows);
      }
    });
  };

  return umCurso();
});

// UPDATE
//query = `UPDATE "NomeTabela" SET "nomeCurso"=${nome} WHERE "id" = ${id}`
app.put("/update", (req, res) => {
  const { id, nome, tipo } = req.body;
  const Alterar = async () => {
    const query = `UPDATE "Cursos" SET "Nome"='${nome}', "Tipo"='${tipo}'
    WHERE "ID" = ${parseInt(id)}`;
    await pool.query(query).then((res) => {
      if (res.rows) {
        console.log("Foi atualizado");
        //console.table(res.rows); Chamar um SELECT
      }
    });
  };
  return Alterar();
});

//DELETE
//query = `DELETE FROM "Nome Tabela" WHERE "id" = ${id}`

app.post("/register", (req, res) => {
  const { id, nome, tipo } = req.body;
  const inserirBanco = async (res) => {
    const query = `INSERT INTO "Cursos" ("ID", "Nome", "Tipo") 
    VALUES (${id}, '${nome}', '${tipo}')`;
    await pool.query(query).then((res) => {
      console.log(res.rows);
      if (res.rows) {
        console.log("FOI");
      } else {
        console.log("NAO FOI");
      }
    });
  };
  return inserirBanco();
});
