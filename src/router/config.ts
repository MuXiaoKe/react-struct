import TodoList from '../views/todoList/TodoList'
import MainPage from '../views/index/Main'
import {BASE_URL} from '../constants/index'
interface Iroute {
    path: string;
    breadcrumbName: string;
    component: any;
    exact?: boolean;
    routes?: Iroute;
}
type Troutes =  Array<Iroute>
const routes:Troutes = [
    {
        path: BASE_URL + "/",
        exact: true,
        breadcrumbName: 'index',
        component: MainPage
    },
    {
        path: BASE_URL + "/todolist",
        exact: true,
        breadcrumbName: 'todolist',
        component: TodoList
    },
    // {
    //     path: "/tacos",
    //     component: Tacos,
    //     routes: [
    //         {
    //             path: "/tacos/bus",
    //             component: Bus
    //         }
    //     ]
    // }
];
export default routes;
