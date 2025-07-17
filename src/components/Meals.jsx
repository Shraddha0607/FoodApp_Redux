import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem"
import Error from "./Error";
import {API_URL} from '../util/config';

const requestConfig = {};

function Meals() {
    const {data: loadedMeals, isLoading, error 
    } = useHttp(`${API_URL}meals`, requestConfig, []);  

    if (isLoading) {
        return <p className="center"> Fetching meals... </p>
    }

    if (error) {
        return <Error title="Failed to fetch meals!" message={error}/>
    }

    return (
        <ul id="meals">
            {loadedMeals.length > 0 && loadedMeals.map((meal) => (
                <MealItem meal={meal} key={meal.id} />
            ))}
        </ul>
    )
}

export default Meals
