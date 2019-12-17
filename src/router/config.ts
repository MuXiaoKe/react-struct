import TodoList from '../views/todoList/TodoList'
import MainPage from '../views/index/Main'
// import { SFC } from 'react';
interface Iroute {
    path: string;
    component: any;
    exact?: boolean;
    routes?: Iroute;
}
type Troutes =  Array<Iroute>
const routes:Troutes = [
    {
        path: "/",
        exact: true,
        component: MainPage
    },
    {
        path: "/TodoList",
        exact: true,
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
