import { createAction } from "../../utils/reducer/reducer.utils";

import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';

export const setCategories = (categoriesArray) => 
{
    console.log("category.action setCategories = " );
    console.log(categoriesArray);
    return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);

export const fetchCategoriesFailed = (error) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);