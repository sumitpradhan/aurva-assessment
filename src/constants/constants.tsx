import { Edge, Node, NodeTypes } from "@xyflow/react";
import CategoryNode from "../components/nodes/CategoryNode";
import ExplorerNode from "../components/nodes/ExplorerNode";
import IngredientNode from "../components/nodes/IngredientNode";
import MealDetailNode from "../components/nodes/mealNodes/MealDetailNode";
import MealNode from "../components/nodes/mealNodes/MealNode";
import ViewDetails from "../components/nodes/viewNodes/ViewDetails";
import ViewIngredients from "../components/nodes/viewNodes/ViewIngredients";
import ViewMealsNode from "../components/nodes/viewNodes/ViewMealsNode";
import ViewTags from "../components/nodes/viewNodes/ViewTags";
import CustomEdge from "../components/edges/CustomEdge";

//this constant file has the inital nodes , intital edges and the node types
export const initialNodes :Node[] = [
    {
      id: "1",
      position: { x: 100, y: 200 },
      data: { label: "Explorer" },
      type: 'explorer',
    },
  ];
export const initialEdges :Edge[] = [];

export const nodeTypes :NodeTypes = {
  explorer: ExplorerNode,
  category: CategoryNode,
  meal: MealNode,
  viewMeal: ViewMealsNode,
  viewIngredient: ViewIngredients,
  viewTag: ViewTags,
  viewDetail: ViewDetails,
  mealDetail:MealDetailNode,
  ingredient:IngredientNode
  
};

export const edgeTypes = {
  custom: CustomEdge,
};
export const mealViewNode=["viewIngredient","viewTag","viewDetail"]

export const CATEGORY_API="https://www.themealdb.com/api/json/v1/1/categories.php"
export const FILTER_API="https://www.themealdb.com/api/json/v1/1/filter.php?";