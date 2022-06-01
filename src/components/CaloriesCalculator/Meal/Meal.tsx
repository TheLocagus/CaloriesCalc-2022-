import React, {Dispatch, SetStateAction} from "react";
import {ProductEntity} from "types";
import {MealSummary} from "./MealSummary/MealSummary";
import {MealProducts} from "./MealProducts/MealProducts";
import {MealHeader} from "./MealHeader/MealHeader";
import {MealAddingNewProduct} from "./MealAddingNewProduct/MealAddingNewProduct";
import "./Meal.css"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../store";
import {setMeals} from "../../../actions/caloriesCalclator";

interface Props {
    mealId: number;
    removeMeal: (id: number)=> void;
}

export const Meal = ({ mealId, removeMeal}: Props) => {
    const {productsList, meals} = useSelector((store: RootState) => store.caloriesCalculator);
    const dispatch = useDispatch();
    const addNewProduct = (newProduct: ProductEntity) => {
        const oldMeal = [...meals][mealId]
        const actualMeal = [...oldMeal, newProduct]
        const mealsToUpdate = [...meals].map((meal, i) => {
            if(i !== mealId) return meal
            return actualMeal
        })
        dispatch(setMeals(mealsToUpdate))
    }

    return (
        <div className="meal">
            <MealHeader
                removeMeal={removeMeal}
                mealId={mealId}
            />
            <MealAddingNewProduct
                addNewProduct={addNewProduct}
            />
            <MealProducts
                mealId={mealId}
            />
            <MealSummary
                mealId={mealId}
            />

            {
                meals.length > 1
                    ? <div className="separator"></div>
                    : null
            }
        </div>
    )
}