const con = require('../database.js');
const app = require('../routes/routes.js');
const { render } = require('../routes/routes.js');

const controller = {
    getHome: function(req, res) {
        res.render('home', {title: 'Tables'})
    },

    getTable1: function(req, res) {
        var tbl1 = 'SELECT m.name, m.year, m.mrank FROM movies AS m WHERE 1850<=year AND year<1900 AND m.mrank IS NOT NULL ORDER BY m.mrank DESC LIMIT 50;';
        var tbl2 = 'SELECT m.name, m.year, m.mrank FROM movies AS m WHERE 1900<=year AND year<1950 AND m.mrank IS NOT NULL ORDER BY m.mrank DESC LIMIT 50;';
        var tbl3 = 'SELECT m.name, m.year, m.mrank FROM movies AS m WHERE 1950<=year AND year<2000 AND m.mrank IS NOT NULL ORDER BY m.mrank DESC LIMIT 50;';
        var tbl4 = 'SELECT m.name, m.year, m.mrank FROM movies AS m WHERE 2000<=year AND year<2050 AND m.mrank IS NOT NULL ORDER BY m.mrank DESC LIMIT 50;';
        
        con.query(tbl1, function(err, data1) {
            con.query(tbl2, function(err, data2) {
                con.query(tbl3, function(err, data3) {
                    con.query(tbl4, function(err, data4) {
                        if (err) throw err;
                        console.log(data2);
                        res.render('table1', { title: 'Movies', moviesData1: data1, moviesData2: data2, moviesData3: data3, moviesData4: data4 });
                    });
                });
            });
        });
    },

    getTable2: function(req, res) {
        var tbl1 = `SELECT COUNT(mmgd.genre) AS total, CONCAT(d.first_name, ' ', d.last_name) AS director_name
        FROM (SELECT mmg.id, mmg.name, mmg.genre, md.director_id 
            FROM 	(SELECT m.id, m.name, mg.genre 
                    FROM movies AS m 
                    INNER JOIN movies_genres AS mg ON m.id = mg.movie_id
                    WHERE mg.genre = 'Action') AS mmg 
            INNER JOIN movies_directors as md ON md.movie_id = mmg.id) AS mmgd
        INNER JOIN directors AS d ON mmgd.director_id = d.id
        GROUP BY director_name
        ORDER BY total DESC
        LIMIT 10;`;
        var tbl2 = `SELECT COUNT(mmgd.genre) AS total, CONCAT(d.first_name, ' ', d.last_name) AS director_name
        FROM (SELECT mmg.id, mmg.name, mmg.genre, md.director_id 
            FROM 	(SELECT m.id, m.name, mg.genre 
                    FROM movies AS m 
                    INNER JOIN movies_genres AS mg ON m.id = mg.movie_id
                    WHERE mg.genre = 'Romance') AS mmg 
            INNER JOIN movies_directors as md ON md.movie_id = mmg.id) AS mmgd
        INNER JOIN directors AS d ON mmgd.director_id = d.id
        GROUP BY director_name
        ORDER BY total DESC
        LIMIT 10;`;
        var tbl3 = `SELECT COUNT(mmgd.genre) AS total, CONCAT(d.first_name, ' ', d.last_name) AS director_name
        FROM (SELECT mmg.id, mmg.name, mmg.genre, md.director_id 
            FROM 	(SELECT m.id, m.name, mg.genre 
                    FROM movies AS m 
                    INNER JOIN movies_genres AS mg ON m.id = mg.movie_id
                    WHERE mg.genre = 'Comedy') AS mmg 
            INNER JOIN movies_directors as md ON md.movie_id = mmg.id) AS mmgd
        INNER JOIN directors AS d ON mmgd.director_id = d.id
        GROUP BY director_name
        ORDER BY total DESC
        LIMIT 10;`;
        var tbl4 = `SELECT COUNT(mmgd.genre) AS total, CONCAT(d.first_name, ' ', d.last_name) AS director_name
        FROM (SELECT mmg.id, mmg.name, mmg.genre, md.director_id 
            FROM 	(SELECT m.id, m.name, mg.genre 
                    FROM movies AS m 
                    INNER JOIN movies_genres AS mg ON m.id = mg.movie_id
                    WHERE mg.genre = 'Fantasy') AS mmg 
            INNER JOIN movies_directors as md ON md.movie_id = mmg.id) AS mmgd
        INNER JOIN directors AS d ON mmgd.director_id = d.id
        GROUP BY director_name
        ORDER BY total DESC
        LIMIT 10;`;
        
        con.query(tbl1, function(err, data1) {
            con.query(tbl2, function(err, data2) {
                con.query(tbl3, function(err, data3) {
                    con.query(tbl4, function(err, data4) {
                        if (err) throw err;
                        console.log(data2);
                        res.render('table2', { title: 'Directors', directorsData1: data1, directorsData2: data2, directorsData3: data3, directorsData4: data4 });
                    })
                });
            });
        });
    },

    getTable3: function(req, res) {
        var tbl = `SELECT COUNT(role) as total_roles, CONCAT(f_name, ' ',  l_name) AS name 
        FROM actors
        GROUP BY name 
        ORDER BY total_roles DESC
        LIMIT 50;`;

        con.query(tbl, function(err, data) {
            console.log(data);
            res.render('table3', { title: 'Actors', actorsData: data })
        });
    }, 

    getTable4: function(req, res) {
        var tbl1 = `SELECT AVG(m.mrank) AS average, mg.genre
        FROM movies AS m
        INNER JOIN movies_genres AS mg ON m.id = mg.movie_id 
        WHERE m.mrank IS NOT NULL AND m.year = 1900
        GROUP BY mg.genre
        ORDER BY average DESC ;`;
        var tbl2 = `SELECT AVG(m.mrank) AS average, mg.genre
        FROM movies AS m
        INNER JOIN movies_genres AS mg ON m.id = mg.movie_id 
        WHERE m.mrank IS NOT NULL AND m.year = 1950
        GROUP BY mg.genre
        ORDER BY average DESC ;`;
        var tbl3 = `SELECT AVG(m.mrank) AS average, mg.genre
        FROM movies AS m
        INNER JOIN movies_genres AS mg ON m.id = mg.movie_id 
        WHERE m.mrank IS NOT NULL AND m.year = 2000
        GROUP BY mg.genre
        ORDER BY average DESC ;`;
        
        con.query(tbl1, function(err, data1) {
            con.query(tbl2, function(err, data2) {
                con.query(tbl3, function(err, data3) {
                    if (err) throw err;
                        console.log(data2);
                        res.render('table4', { title: 'Genres', genresData1: data1, genresData2: data2, genresData3: data3 });
                });
            });
        });
    },
}

module.exports = controller;