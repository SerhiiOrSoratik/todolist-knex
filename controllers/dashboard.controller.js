const knexDb = require('../knex');

class Dashboard { 
    getInfo(req, res) {
        let result = {};
        knexDb('todo')
        .whereBetween('due_date', [new Date(), new Date()])
        .count()
        .then((data) => {
            result.sheduledTasks = data;
        });

        knexDb.select('title', knexDb.raw('COUNT(*)'))
        .from('lists')
        .rightJoin('todo', 'lists.id', 'todo.listid')
        .groupBy('lists.title')
        .then((data) => {
            result.unfulfilledTasks = data;
            res.json(result)
        })

        
    }
}

module.exports = new Dashboard();