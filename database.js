require("dotenv").config();
const mysql = require("mysql2/promise");

const database = mysql.createPool({
  host: process.env.DB_HOST, // address of the server
  port: process.env.DB_PORT, // port of the DB server (mysql), not to be confused with the APP_PORT !
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});



database
  .query("select * from movies")
  .then((result) => {
    const movies = result[0];
    console.log("movies loaded !")
  })
  .catch((err) => {
    console.error(err);
  });

database
  .getConnection()
  .then(() => {
    console.log("Can reach database");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = database;

//   SELECT w.firstname, w.lastname, p.role AS player, t.name AS team
//   FROM wizard AS w 
//   right JOIN player p
//   ON w.id = p.wizard_id
//   RIGHT JOIN team t
//   ON t.id = p.team_id
//   union
//   SELECT w.firstname, w.lastname, p.role AS player, t.name AS team
//   FROM wizard AS w 
//   left JOIN player p
//   ON w.id = p.wizard_id
//   left JOIN team t
//   ON t.id = p.team_id
// ;

// SELECT w.firstname, w.lastname, p.role AS player, t.name AS team
//   FROM wizard AS w 
//   left JOIN player p
//   ON w.id = p.wizard_id
//   left JOIN team t
//   ON t.id = p.team_id
//   where t.id is not null;


// CREATE TABLE `lpecom_examens` (
//   `id` INT NOT NULL AUTO_INCREMENT,
//   `id_examen` INT NOT NULL,
//   `id_etudiant` INT NOT NULL,
//   `matiere` VARCHAR(100) NOT NULL,
//   `note` INT NOT NULL,
//   PRIMARY KEY (`id`)
// );

// insert into lpecom_examens (id, id_examen, id_etudiant, matiere, note) values
// (788,	45,	30,	"Histoire-Geographie",	10.5),
// (789,	87,	33,	"Mathématiques",	14),
// (790,	87,	34,	"Mathématiques",	4),
// (791,	45,	31,	"Histoire-Geographie",	15.5),
// (792,	45,	32,	"Histoire-Geographie",	8),
// (793,	87,	31,	"Mathématiques",	14),
// (794,	45,	33,	"Histoire-Geographie",	9.5),
// (795,	45,	36,	"Histoire-Geographie",	13),
// (796,	45,	34,	"Histoire-Geographie",	17),
// (797,	87,	30,	"Mathématiques",	7.5);

// select w.firstname, w.lastname     
// from wizard w
// left join player p  
// on p.team_id=w.id;

// select w.firstname, w.lastname, p.enrollment_date from wizard w
// inner join player p 
// on p.wizard_id=w.id 
// inner join team t
// on p.team_id=t.id
// where p.team_id=1
// and weekday(p.enrollment_date) = 0
// order by p.enrollment_date asc
// ;

// select firstname, lastname, age, k.name
// from person
// left join kingdom k
// on person.kingdom_id = k.id;

// select avg(age) as moyenne
// from person 
// left join role r 
// on r.id=person.role_id
// where r.role != 'magicien';

// select count(*), k.name
// from person
// left join kingdom k
// on person.kingdom_id = k.id
// group by k.name;

// select avg(age), r.role
// from person
// inner join role r
// on person.role_id = r.id
// group by r.role;

// select firstname, lastname, r.role, k.name  
//     from person
//     left join role r
//     on r.id = person.role_id
//     left join kingdom k
//     on k.id = person.kingdom_id;

//     select count(*) as serf_nb, k.name
//     from person
//     inner join kingdom k
//     on k.id = person.kingdom_id
//     group by k.name
//     having serf_nb > 2