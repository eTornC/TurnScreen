use ETORN;

CREATE TABLE template(
	id INT(6) UNSIGNED PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	layout TEXT
);

CREATE TABLE section (
	id INT(6) UNSIGNED PRIMARY KEY,
	id_store int(11)
);
INSERT INTO section (id,id_store)
VALUES ('1','4'),('2','1'),('3','3'),('4','2'),('5','2');

INSERT INTO section (id,id_store)
VALUES ('6','4'),('7','1'),('8','3'),('9','2'),('10','2'),('11','4'),('12','1'),('13','3');

INSERT INTO template (id,name,layout)
VALUES ('1','plantilla1','{"name":"pantalla1","cols": [{"width": 12,"rows": [{"id": 1 },{ "cols": [ { "width": 6,"id": 2 },{ "width": 6,"rows": [ { "id": 3 },{ "id": 4 } ] } ] },{ "id": 5 }] } ]}');



CREATE TABLE turnScreen(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	layout TEXT
);

INSERT INTO turnScreen (name,layout)
VALUES ('pantalla1','{"name":"plantilla2","cols":[{"width":12,"rows":[{"id":6},{"id":7},{"cols":[{"width":6,"id":8},{"width":6,"id":9}]}]}]}');

CREATE TABLE LAYOUTS (
  ID INTEGER PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(50) NOT NULL,
  DESCRIPTION VARCHAR(50) NOT NULL DEFAULT "",
  LAYOUT TEXT NOT NULL,
  TYPE VARCHAR(15) NOT NULL
);

INSERT INTO LAYOUTS (NAME,LAYOUT,TYPE)
VALUES 
('Pantalla2','{"height":"100","cols":[{"width":12,"height":"100","rows":[{"height":"100","cols":[{"height":"100","width":6,"id":1},{"height":"100","width":6,"rows":[{"height":"50","width":6,"id":1},{"height":"50","width":6,"id":1}]}]}]}]}','TEMPLATE'),

('Pantalla3','{"height":"100","cols":[{"width":12,"height":"100","rows":[{"height":"100","cols":[{"height":"100","width":6,"id":1},{"height":"100","width":6,"id":1}]}]}]}','TEMPLATE'),

('Pantalla4','{"height":"100","cols":[{"width":12,"height":"100","rows":[{"height":"50","width":6,"id":1},{"height":"50","cols":[{"height":"100","width":6,"id":1},{"height":"100","width":6,"id":1}]}]}]}','TEMPLATE');


/*
('Pantalla2','','TEMPLATE');
('TurnScreen','','TURN');
('TotemScreen','','TOTEM');
*/

