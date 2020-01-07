const {getAllIngredients, addIngredient} = require('../model.js')

module.exports = function validateIngredient(req,res,next) {
    const { ingredient_id } = req.params

    getAllIngredients()
    .then(list => {
        list.ingredients.filter(ing => {
            if(ing.ingredient_id === ingredient_id) {
                next()
            } else null
        })
    })
}